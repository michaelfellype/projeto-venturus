// =========================================================
// MÓDULO DE INTERFACE VISUAL (src/view.js)
// Responsável por manipular o DOM: desenhar as tarefas na tela,
// atualizar as barras de progresso e atualizar os status dinâmicos.
// =========================================================

// Mapeamento das 4 categorias com seus respectivos elementos no HTML
const CATEGORIAS = [
  { nome: 'Faculdade', sufixo: 'faculdade' },
  { nome: 'Estudos', sufixo: 'estudos' },
  { nome: 'Pessoal', sufixo: 'pessoal' },
  { nome: 'Entretenimento', sufixo: 'entretenimento' }
];

// 1. Função principal que atualiza toda a interface visual
export function renderizarTela(tarefas, onAlternar, onRemover) {
  // Limpa as 4 listas antes de redesenhar
  CATEGORIAS.forEach(cat => {
    const listaUl = document.getElementById(`lista-${cat.sufixo}`);
    if (listaUl) listaUl.innerHTML = '';
  });

  // Insere cada tarefa na lista do seu respectivo cartão
  tarefas.forEach(tarefa => {
    const categoriaInfo = CATEGORIAS.find(cat => cat.nome === tarefa.category);
    if (!categoriaInfo) return;

    const listaUl = document.getElementById(`lista-${categoriaInfo.sufixo}`);
    if (listaUl) {
      const itemLi = criarElementoTarefa(tarefa, onAlternar, onRemover);
      listaUl.appendChild(itemLi);
    }
  });

  // Atualiza as barras de progresso e os status dos 4 cartões
  atualizarProgressoDosCards(tarefas);

  // Atualiza a barra de progresso geral no topo
  atualizarProgressoGeral(tarefas);
}

// 2. Cria o elemento HTML <li> de uma tarefa com botão de check, texto e botão excluir
function criarElementoTarefa(tarefa, onAlternar, onRemover) {
  const li = document.createElement('li');
  li.className = 'tarefa';
  if (tarefa.completed) {
    li.classList.add('concluida');
  }

  // Botão quadrado de marcar / desmarcar a tarefa
  const botaoCheck = document.createElement('button');
  botaoCheck.type = 'button';
  botaoCheck.className = 'tarefa-check';
  botaoCheck.textContent = tarefa.completed ? '✓' : '';
  botaoCheck.title = tarefa.completed ? 'Marcar como pendente' : 'Marcar como concluída';
  botaoCheck.addEventListener('click', () => onAlternar(tarefa.id));

  // Texto descritivo da tarefa
  const spanTexto = document.createElement('span');
  spanTexto.className = 'tarefa-texto';
  spanTexto.textContent = tarefa.title;

  // Botão ✕ para excluir a tarefa
  const botaoExcluir = document.createElement('button');
  botaoExcluir.type = 'button';
  botaoExcluir.className = 'tarefa-remover';
  botaoExcluir.textContent = '✕';
  botaoExcluir.title = 'Excluir tarefa';
  botaoExcluir.addEventListener('click', () => onRemover(tarefa.id));

  // Monta a estrutura do item da lista
  li.appendChild(botaoCheck);
  li.appendChild(spanTexto);
  li.appendChild(botaoExcluir);

  return li;
}

// 3. Atualiza o status dinâmico e a barra de progresso individual de cada um dos 4 cartões
function atualizarProgressoDosCards(tarefas) {
  CATEGORIAS.forEach(cat => {
    // Filtra apenas as tarefas desta categoria
    const tarefasCard = tarefas.filter(t => t.category === cat.nome);
    const total = tarefasCard.length;
    const concluidas = tarefasCard.filter(t => t.completed).length;
    const porcentagem = total === 0 ? 0 : Math.round((concluidas / total) * 100);

    // Atualiza a barra visual e o texto de progresso do cartão (ex: "1/3 (33%)")
    const textoProgresso = document.getElementById(`progresso-texto-${cat.sufixo}`);
    const barraFill = document.getElementById(`progresso-fill-${cat.sufixo}`);
    if (textoProgresso) textoProgresso.textContent = `${concluidas}/${total} (${porcentagem}%)`;
    if (barraFill) barraFill.style.width = `${porcentagem}%`;

    // Atualiza o status dinâmico com a bolinha colorida
    const statusContainer = document.getElementById(`status-${cat.sufixo}`);
    if (statusContainer) {
      atualizarStatusDinamico(statusContainer, total, concluidas);
    }
  });
}

// 4. Define a cor da bolinha e o texto do status conforme o progresso do cartão:
//    - Não iniciado: 0% concluído
//    - Em andamento: pelo menos 1 concluída, mas não todas
//    - Concluído: 100% concluído
function atualizarStatusDinamico(container, total, concluidas) {
  const spanTexto = container.querySelector('.status-texto');

  // Remove as classes de status antigas
  container.classList.remove('status-nao-iniciado', 'status-em-andamento', 'status-concluido');

  if (total > 0 && concluidas === total) {
    // 100% das tarefas concluídas
    container.classList.add('status-concluido');
    if (spanTexto) spanTexto.textContent = 'Concluído';
  } else if (concluidas > 0 && concluidas < total) {
    // Pelo menos uma marcada, mas ainda faltam outras
    container.classList.add('status-em-andamento');
    if (spanTexto) spanTexto.textContent = 'Em andamento';
  } else {
    // 0% concluído ou cartão sem tarefas
    container.classList.add('status-nao-iniciado');
    if (spanTexto) spanTexto.textContent = 'Não iniciado';
  }
}

// 5. Atualiza a barra de progresso geral do dia no topo da tela
function atualizarProgressoGeral(tarefas) {
  const total = tarefas.length;
  const concluidas = tarefas.filter(t => t.completed).length;
  const porcentagem = total === 0 ? 0 : Math.round((concluidas / total) * 100);

  const textoGeral = document.getElementById('progresso-geral-texto');
  const barraGeralFill = document.getElementById('progresso-geral-fill');

  if (textoGeral) textoGeral.textContent = `${concluidas}/${total} (${porcentagem}%)`;
  if (barraGeralFill) barraGeralFill.style.width = `${porcentagem}%`;
}
