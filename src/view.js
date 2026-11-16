const categorias = ['Faculdade', 'Estudos', 'Pessoal', 'Entretenimento'];

export function renderizar(tarefas, onMarcar, onRemover) {
  // limpa os cards antes de recriar as listas
  categorias.forEach(cat => {
    const lista = document.getElementById('lista-' + cat.toLowerCase());
    if (lista) lista.innerHTML = '';
  });

  tarefas.forEach(tarefa => {
    const lista = document.getElementById('lista-' + tarefa.categoria.toLowerCase());
    if (lista) {
      lista.appendChild(criarItem(tarefa, onMarcar, onRemover));
    }
  });

  atualizarProgresso(tarefas);
}

export const renderizarTela = renderizar;

function criarItem(tarefa, onMarcar, onRemover) {
  const li = document.createElement('li');
  li.className = 'tarefa';
  if (tarefa.concluida) {
    li.classList.add('concluida');
  }

  const btnCheck = document.createElement('button');
  btnCheck.type = 'button';
  btnCheck.className = 'tarefa-check';
  btnCheck.textContent = tarefa.concluida ? '✓' : '';
  btnCheck.setAttribute('aria-label', tarefa.concluida ? 'Marcar como pendente' : 'Marcar como concluída');
  btnCheck.addEventListener('click', () => onMarcar(tarefa.id));

  const span = document.createElement('span');
  span.className = 'tarefa-texto';
  span.textContent = tarefa.titulo;

  const btnRemover = document.createElement('button');
  btnRemover.type = 'button';
  btnRemover.className = 'tarefa-remover';
  btnRemover.textContent = '✕';
  btnRemover.setAttribute('aria-label', 'Excluir tarefa');
  btnRemover.addEventListener('click', () => onRemover(tarefa.id));

  li.appendChild(btnCheck);
  li.appendChild(span);
  li.appendChild(btnRemover);

  return li;
}

function atualizarProgresso(tarefas) {
  // calcula o progresso de cada card
  categorias.forEach(cat => {
    const sufixo = cat.toLowerCase();
    let total = 0;
    let concluidas = 0;

    for (let i = 0; i < tarefas.length; i++) {
      if (tarefas[i].categoria === cat) {
        total++;
        if (tarefas[i].concluida) {
          concluidas++;
        }
      }
    }

    const pct = total === 0 ? 0 : Math.round((concluidas / total) * 100);

    const texto = document.getElementById('progresso-texto-' + sufixo);
    const barra = document.getElementById('progresso-fill-' + sufixo);
    if (texto) texto.textContent = `${concluidas}/${total} (${pct}%)`;
    if (barra) barra.style.width = pct + '%';

    const status = document.getElementById('status-' + sufixo);
    if (status) {
      status.classList.remove('status-nao-iniciado', 'status-em-andamento', 'status-concluido');
      const textoStatus = status.querySelector('.status-texto');

      if (total > 0 && concluidas === total) {
        status.classList.add('status-concluido');
        if (textoStatus) textoStatus.textContent = 'Concluído';
      } else if (concluidas > 0) {
        status.classList.add('status-em-andamento');
        if (textoStatus) textoStatus.textContent = 'Em andamento';
      } else {
        status.classList.add('status-nao-iniciado');
        if (textoStatus) textoStatus.textContent = 'Não iniciado';
      }
    }
  });

  // progresso geral do dia
  let totalGeral = tarefas.length;
  let concluidasGeral = 0;
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].concluida) {
      concluidasGeral++;
    }
  }

  const pctGeral = totalGeral === 0 ? 0 : Math.round((concluidasGeral / totalGeral) * 100);

  const textoGeral = document.getElementById('progresso-geral-texto');
  const barraGeral = document.getElementById('progresso-geral-fill');
  if (textoGeral) textoGeral.textContent = `${concluidasGeral}/${totalGeral} (${pctGeral}%)`;
  if (barraGeral) barraGeral.style.width = pctGeral + '%';
}
