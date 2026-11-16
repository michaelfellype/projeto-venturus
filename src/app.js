import {
  pegarTarefas,
  adicionarTarefa,
  marcarTarefa,
  removerTarefa,
  restaurarPadrao
} from './state.js';

import { renderizar } from './view.js';

let dataAtual = '';

function formatarHoje() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function atualizar() {
  const tarefas = pegarTarefas(dataAtual);
  renderizar(tarefas, alternar, excluir);
}

function alternar(id) {
  marcarTarefa(dataAtual, id);
  atualizar();
}

function excluir(id) {
  removerTarefa(dataAtual, id);
  atualizar();
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

  // carrega o tema salvo ou usa o claro por padrao
  const temaSalvo = localStorage.getItem('tema') || 'claro';
  aplicarTema(temaSalvo);

  btnTema.addEventListener('click', () => {
    const estaEscuro = document.documentElement.getAttribute('data-tema') === 'escuro';
    const novoTema = estaEscuro ? 'claro' : 'escuro';

    localStorage.setItem('tema', novoTema);
    aplicarTema(novoTema);
  });
}

function configurarData() {
  const inputData = document.getElementById('seletor-data');
  if (!inputData) return;

  dataAtual = formatarHoje();
  inputData.value = dataAtual;

  inputData.addEventListener('change', (e) => {
    // se o usuario limpar o campo de data, mantem a data anterior
    if (!e.target.value) {
      e.target.value = dataAtual;
      return;
    }
    dataAtual = e.target.value;
    atualizar();
  });
}

function configurarForm(idForm, idInput, categoria) {
  const form = document.getElementById(idForm);
  const input = document.getElementById(idInput);
  if (!form || !input) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = input.value.trim();
    if (!texto) return;

    adicionarTarefa(dataAtual, texto, categoria);
    atualizar();

    input.value = '';
    input.focus();
  });
}

function configurarReset() {
  const btn = document.getElementById('btn-resetar');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const confirmou = confirm('Quer mesmo restaurar as tarefas padrão desse dia?');
    if (confirmou) {
      restaurarPadrao(dataAtual);
      atualizar();
    }
  });
}

function inicializar() {
  configurarTema();
  configurarData();

  configurarForm('form-faculdade', 'input-faculdade', 'Faculdade');
  configurarForm('form-estudos', 'input-estudos', 'Estudos');
  configurarForm('form-pessoal', 'input-pessoal', 'Pessoal');
  configurarForm('form-entretenimento', 'input-entretenimento', 'Entretenimento');

  configurarReset();
  atualizar();
}

inicializar();
