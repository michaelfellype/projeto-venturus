// =========================================================
// CONTROLADOR PRINCIPAL (src/app.js)
// Coordena os eventos do usuário, comunica com o módulo de estado
// (state.js) e solicita a atualização visual (view.js).
// =========================================================

import {
  obterTarefas,
  adicionarTarefa,
  alternarTarefa,
  removerTarefa,
  restaurarPadrao
} from './state.js';

import { renderizarTela } from './view.js';

// Guarda a data selecionada atualmente no calendário (formato YYYY-MM-DD)
let dataSelecionada = '';

// 1. Retorna a data de hoje no formato YYYY-MM-DD para inicializar o calendário
function obterHojeFormatado() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

// 2. Atualiza a tela com as tarefas do dia atualmente selecionado
function atualizarAplicativo() {
  const tarefasDoDia = obterTarefas(dataSelecionada);
  renderizarTela(tarefasDoDia, lidarComAlternar, lidarComRemover);
}

// 3. Callback executado quando o usuário clica para marcar ou desmarcar uma tarefa
function lidarComAlternar(idTarefa) {
  alternarTarefa(dataSelecionada, idTarefa);
  atualizarAplicativo();
}

// 4. Callback executado quando o usuário clica no ✕ para remover uma tarefa
function lidarComRemover(idTarefa) {
  removerTarefa(dataSelecionada, idTarefa);
  atualizarAplicativo();
}

// 5. Configura o envio de formulário para adicionar tarefa em um cartão
function configurarFormulario(idForm, idInput, categoria) {
  const form = document.getElementById(idForm);
  const input = document.getElementById(idInput);

  if (!form || !input) return;

  form.addEventListener('submit', (evento) => {
    evento.preventDefault(); // Impede o recarregamento da página

    const texto = input.value.trim();
    if (!texto) return;

    // Adiciona a tarefa na data selecionada e atualiza a visualização
    adicionarTarefa(dataSelecionada, texto, categoria);
    atualizarAplicativo();

    // Limpa o campo e foca novamente nele para digitação rápida
    input.value = '';
    input.focus();
  });
}

// 6. Configura o seletor de data (calendário)
function configurarSeletorData() {
  const inputData = document.getElementById('seletor-data');
  if (!inputData) return;

  // Define o valor inicial como hoje
  dataSelecionada = obterHojeFormatado();
  inputData.value = dataSelecionada;

  // Ao trocar a data no calendário, recarrega as tarefas específicas daquele dia
  inputData.addEventListener('change', (evento) => {
    dataSelecionada = evento.target.value;
    atualizarAplicativo();
  });
}

// 7. Configura o botão de restaurar tarefas padrão
function configurarBotaoResetar() {
  const botaoResetar = document.getElementById('btn-resetar');
  if (!botaoResetar) return;

  botaoResetar.addEventListener('click', () => {
    restaurarPadrao(dataSelecionada);
    atualizarAplicativo();
  });
}

// 8. Inicialização do aplicativo assim que a página é carregada
function inicializar() {
  configurarSeletorData();

  // Configura os formulários dos 4 cartões
  configurarFormulario('form-faculdade', 'input-faculdade', 'Faculdade');
  configurarFormulario('form-estudos', 'input-estudos', 'Estudos');
  configurarFormulario('form-pessoal', 'input-pessoal', 'Pessoal');
  configurarFormulario('form-entretenimento', 'input-entretenimento', 'Entretenimento');

  // Configura o botão de restauração
  configurarBotaoResetar();

  // Primeira renderização na tela
  atualizarAplicativo();
}

// Executa a inicialização
inicializar();
