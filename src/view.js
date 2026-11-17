const categorias = ['Faculdade', 'Estudos', 'Pessoal', 'Entretenimento'];

export function renderizar(tarefas, onMarcar, onRemover, onEditar) {
  // limpa os cards antes de recriar as listas
  categorias.forEach(cat => {
    const lista = document.getElementById('lista-' + cat.toLowerCase());
    if (lista) lista.innerHTML = '';
  });

  tarefas.forEach(tarefa => {
    const lista = document.getElementById('lista-' + tarefa.categoria.toLowerCase());
    if (lista) {
      lista.appendChild(criarItem(tarefa, onMarcar, onRemover, onEditar));
    }
  });

  atualizarProgresso(tarefas);
}

function criarItem(tarefa, onMarcar, onRemover, onEditar) {
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
  span.title = 'Clique duas vezes para editar';

  // edicao com duplo clique
  span.addEventListener('dblclick', () => {
    const inputEdicao = document.createElement('input');
    inputEdicao.type = 'text';
    inputEdicao.className = 'input-edicao';
    inputEdicao.value = tarefa.titulo;
    inputEdicao.maxLength = 80;

    let finalizado = false;

    function salvarEdicao() {
      if (finalizado) return;
      finalizado = true;

      const novoTexto = inputEdicao.value.trim();
      if (novoTexto && novoTexto !== tarefa.titulo) {
        onEditar(tarefa.id, novoTexto);
      } else {
        li.replaceChild(span, inputEdicao);
      }
    }

    function cancelarEdicao() {
      if (finalizado) return;
      finalizado = true;
      li.replaceChild(span, inputEdicao);
    }

    inputEdicao.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        salvarEdicao();
      } else if (e.key === 'Escape') {
        cancelarEdicao();
      }
    });

    inputEdicao.addEventListener('blur', () => {
      salvarEdicao();
    });

    li.replaceChild(inputEdicao, span);
    inputEdicao.focus();
    inputEdicao.select();
  });

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

  // atualiza o titulo quando todas as tarefas estiverem feitas
  const secaoProgresso = document.querySelector('.secao-progresso-geral');
  const tituloProgresso = document.getElementById('progresso-titulo');

  if (secaoProgresso && tituloProgresso) {
    if (totalGeral > 0 && concluidasGeral === totalGeral) {
      secaoProgresso.classList.add('feito');
      tituloProgresso.textContent = 'Dia concluído!';
    } else {
      secaoProgresso.classList.remove('feito');
      tituloProgresso.textContent = 'Progresso do dia';
    }
  }
}

export function renderizarSemana(resumo, dataSelecionada, aoClicar) {
  const container = document.getElementById('semana');
  if (!container) return;
  container.innerHTML = '';

  const concluidos = resumo.filter(item => item.percentual === 100).length;
  const textoSemana = document.getElementById('semana-texto');
  if (textoSemana) {
    textoSemana.textContent = `${concluidos} de 7 dias concluídos`;
  }

  const letras = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

  resumo.forEach(item => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn-dia-semana';

    if (item.data === dataSelecionada) {
      btn.classList.add('selecionado');
    }

    const [ano, mes, dia] = item.data.split('-');
    const dataFormatada = `${dia}/${mes}/${ano}`;
    const situacao = item.percentual === -1 ? 'sem tarefas' : `${item.percentual}% concluído`;
    btn.setAttribute('aria-label', `${dataFormatada} - ${situacao}`);

    const quadrado = document.createElement('span');
    quadrado.className = 'quadrado-dia';
    if (item.percentual === 100) {
      quadrado.classList.add('verde');
    } else if (item.percentual > 0 && item.percentual < 100) {
      quadrado.classList.add('laranja');
    } else {
      quadrado.classList.add('cinza');
    }

    const diaSemanaIndex = new Date(item.data + 'T00:00:00').getDay();
    const spanLetra = document.createElement('span');
    spanLetra.className = 'letra-dia';
    spanLetra.textContent = letras[diaSemanaIndex];

    btn.appendChild(quadrado);
    btn.appendChild(spanLetra);

    btn.addEventListener('click', () => {
      aoClicar(item.data);
    });

    container.appendChild(btn);
  });
}

