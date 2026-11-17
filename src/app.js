import {
  pegarTarefas,
  adicionarTarefa,
  marcarTarefa,
  editarTarefa,
  removerTarefa,
  restaurarPadrao,
  trazerPendentes,
  calcularSequencia,
  resumoSemana,
  definirCallbackErroSalvar
} from './state.js';

import { somarDias } from './datas.js';
import { renderizar, renderizarSemana } from './view.js';

let dataAtual = '';

function formatarHoje() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

const DIAS_DA_SEMANA = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
];

function exibirMensagem(texto) {
  const p = document.getElementById('mensagem');
  if (p) p.textContent = texto;
}

function limparMensagem() {
  const p = document.getElementById('mensagem');
  if (p && p.textContent) p.textContent = '';
}

function atualizarDiaSemana() {
  const el = document.getElementById('label-data') || document.querySelector('.label-data');
  if (!el || !dataAtual) return;

  const diaIndex = new Date(dataAtual + 'T00:00:00').getDay();
  el.textContent = DIAS_DA_SEMANA[diaIndex] || '';
}

function atualizar() {
  const tarefas = pegarTarefas(dataAtual);
  renderizar(tarefas, alternar, excluir, editar);
  atualizarSequencia();
  atualizarDiaSemana();

  const resumo = resumoSemana(dataAtual || formatarHoje());
  renderizarSemana(resumo, dataAtual, (novaData) => {
    limparMensagem();
    dataAtual = novaData;
    const inputData = document.getElementById('seletor-data');
    if (inputData) {
      inputData.value = dataAtual;
    }
    atualizar();
  });
}

function alternar(id) {
  limparMensagem();
  marcarTarefa(dataAtual, id);
  atualizar();
}

function excluir(id) {
  limparMensagem();
  removerTarefa(dataAtual, id);
  atualizar();
}

function editar(id, novoTitulo) {
  limparMensagem();
  editarTarefa(dataAtual, id, novoTitulo);
  atualizar();
}

function atualizarSequencia() {
  const el = document.getElementById('sequencia');
  if (!el) return;

  const dias = calcularSequencia(formatarHoje());
  el.textContent = dias === 1 ? 'Sequência: 1 dia' : `Sequência: ${dias} dias`;

  if (dias > 0) {
    el.classList.add('ativa');
  } else {
    el.classList.remove('ativa');
  }
}

function configurarTema() {
  const btnTema = document.getElementById('btn-tema');
  if (!btnTema) return;

  function aplicarTema(tema) {
    if (tema === 'escuro') {
      document.documentElement.setAttribute('data-tema', 'escuro');
      btnTema.textContent = '☀️ Tema claro';
    } else {
      document.documentElement.removeAttribute('data-tema');
      btnTema.textContent = '🌙 Tema escuro';
    }
  }

  let temaSalvo = 'claro';
  try {
    temaSalvo = localStorage.getItem('tema') || 'claro';
  } catch (erro) {
    console.error('Erro ao ler tema do localStorage:', erro);
  }
  aplicarTema(temaSalvo);

  btnTema.addEventListener('click', () => {
    limparMensagem();
    const estaEscuro = document.documentElement.getAttribute('data-tema') === 'escuro';
    const novoTema = estaEscuro ? 'claro' : 'escuro';

    try {
      localStorage.setItem('tema', novoTema);
    } catch (erro) {
      console.error('Erro ao salvar tema:', erro);
      exibirMensagem('Não foi possível salvar a preferência de tema.');
    }
    aplicarTema(novoTema);
  });
}

function configurarData() {
  const inputData = document.getElementById('seletor-data');
  const btnAnterior = document.getElementById('dia-anterior');
  const btnSeguinte = document.getElementById('dia-seguinte');
  const btnHoje = document.getElementById('btn-hoje');

  if (!inputData) return;

  dataAtual = formatarHoje();
  inputData.value = dataAtual;
  atualizarDiaSemana();

  const aoMudarData = (e) => {
    limparMensagem();
    if (!e.target.value) {
      e.target.value = dataAtual;
      return;
    }
    if (e.target.value === dataAtual) return;
    dataAtual = e.target.value;
    atualizar();
  };

  inputData.addEventListener('change', aoMudarData);
  inputData.addEventListener('input', aoMudarData);

  if (btnAnterior) {
    btnAnterior.addEventListener('click', () => {
      if (!inputData.value) return;
      limparMensagem();
      dataAtual = somarDias(dataAtual, -1);
      inputData.value = dataAtual;
      atualizar();
    });
  }

  if (btnSeguinte) {
    btnSeguinte.addEventListener('click', () => {
      if (!inputData.value) return;
      limparMensagem();
      dataAtual = somarDias(dataAtual, 1);
      inputData.value = dataAtual;
      atualizar();
    });
  }

  if (btnHoje) {
    btnHoje.addEventListener('click', () => {
      if (!inputData.value) return;
      limparMensagem();
      dataAtual = formatarHoje();
      inputData.value = dataAtual;
      atualizar();
    });
  }
}

function configurarForm(idForm, idInput, categoria) {
  const form = document.getElementById(idForm);
  const input = document.getElementById(idInput);
  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    limparMensagem();

    const texto = input.value.trim();
    if (!texto) return;

    adicionarTarefa(dataAtual, texto, categoria);
    atualizar();

    input.value = '';
    input.focus();
  });
}

function configurarPendentes() {
  const btn = document.getElementById('btn-pendentes');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const ontem = somarDias(dataAtual, -1);
    const qtd = trazerPendentes(ontem, dataAtual);
    atualizar();

    if (qtd === 1) {
      exibirMensagem('1 tarefa trazida do dia anterior.');
    } else if (qtd > 1) {
      exibirMensagem(`${qtd} tarefas trazidas do dia anterior.`);
    } else {
      exibirMensagem('Nada pendente para trazer do dia anterior.');
    }
  });
}

function configurarReset() {
  const btn = document.getElementById('btn-resetar');
  if (!btn) return;

  btn.addEventListener('click', () => {
    limparMensagem();
    const confirmou = confirm('Quer mesmo restaurar as tarefas padrão desse dia?');
    if (confirmou) {
      restaurarPadrao(dataAtual);
      atualizar();
    }
  });
}

function inicializar() {
  definirCallbackErroSalvar(exibirMensagem);
  configurarTema();
  configurarData();

  configurarForm('form-faculdade', 'input-faculdade', 'Faculdade');
  configurarForm('form-estudos', 'input-estudos', 'Estudos');
  configurarForm('form-pessoal', 'input-pessoal', 'Pessoal');
  configurarForm('form-entretenimento', 'input-entretenimento', 'Entretenimento');

  configurarPendentes();
  configurarReset();
  atualizar();
}

inicializar();
