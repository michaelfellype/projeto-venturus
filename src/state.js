// =========================================================
// MÓDULO DE ESTADO (src/state.js)
// Responsável por gerenciar os dados e salvar no localStorage.
// Cada dia possui suas próprias tarefas salvas de forma independente.
// =========================================================

// Prefixo usado para salvar as tarefas no localStorage por data
const PREFIXO_CHAVE = 'tarefas_estudante_';

// Tarefas de exemplo que aparecem quando um dia é aberto pela primeira vez
const TAREFAS_PADRAO = [
  // Categoria: Faculdade
  { id: 'f1', category: 'Faculdade', title: 'Pesquisar tema do artigo de História', completed: false },
  { id: 'f2', category: 'Faculdade', title: 'Completar lista de exercícios do Cap. 5', completed: false },
  { id: 'f3', category: 'Faculdade', title: 'Escrever resenha do livro de literatura', completed: false },

  // Categoria: Estudos
  { id: 'e1', category: 'Estudos', title: 'Revisar anotações da aula e fazer resumo', completed: false },
  { id: 'e2', category: 'Estudos', title: 'Resolver simulado para a prova de sexta', completed: false },
  { id: 'e3', category: 'Estudos', title: 'Reunir com o grupo do projeto de física', completed: false },

  // Categoria: Pessoal
  { id: 'p1', category: 'Pessoal', title: 'Fazer 30 minutos de caminhada ou treino', completed: false },
  { id: 'p2', category: 'Pessoal', title: 'Praticar 15 minutos de vocabulário de inglês', completed: false },
  { id: 'p3', category: 'Pessoal', title: 'Atualizar currículo e perfil do LinkedIn', completed: false },

  // Categoria: Entretenimento
  { id: 'd1', category: 'Entretenimento', title: 'Assistir a um filme ou episódio de série', completed: false },
  { id: 'd2', category: 'Entretenimento', title: 'Jogar um pouco do jogo favorito', completed: false },
  { id: 'd3', category: 'Entretenimento', title: 'Ler um capítulo de um livro por lazer', completed: false }
];

// Monta a chave completa do localStorage para uma data específica (ex: "tarefas_estudante_2026-11-15")
function obterChaveStorage(data) {
  return `${PREFIXO_CHAVE}${data}`;
}

// 1. Busca as tarefas da data informada no localStorage
export function obterTarefas(data) {
  try {
    const chave = obterChaveStorage(data);
    const dadosSalvos = localStorage.getItem(chave);

    // Se ainda não existir registro para este dia, inicializa com as tarefas padrão
    if (dadosSalvos === null) {
      salvarTarefas(data, TAREFAS_PADRAO);
      return TAREFAS_PADRAO.map(tarefa => ({ ...tarefa }));
    }

    // Converte a string JSON de volta para array de objetos
    const tarefas = JSON.parse(dadosSalvos);
    return Array.isArray(tarefas) ? tarefas : [];
  } catch (erro) {
    console.error('Erro ao ler do localStorage:', erro);
    return [];
  }
}

// 2. Salva a lista de tarefas da data informada no localStorage
export function salvarTarefas(data, listaTarefas) {
  try {
    const chave = obterChaveStorage(data);
    // JSON.stringify transforma o array em texto para o localStorage conseguir guardar
    localStorage.setItem(chave, JSON.stringify(listaTarefas));
  } catch (erro) {
    console.error('Erro ao salvar no localStorage:', erro);
  }
}

// 3. Adiciona uma nova tarefa na data informada
export function adicionarTarefa(data, titulo, categoria) {
  const tarefas = obterTarefas(data);

  // Cria um objeto simples para a nova tarefa
  const novaTarefa = {
    id: `tarefa-${Date.now()}`, // ID único gerado a partir do milissegundo atual
    category: categoria,
    title: titulo.trim(),
    completed: false
  };

  // Adiciona no final da lista e salva
  tarefas.push(novaTarefa);
  salvarTarefas(data, tarefas);
  return tarefas;
}

// 4. Marca ou desmarca uma tarefa como concluída (inverte o valor de completed)
export function alternarTarefa(data, idTarefa) {
  const tarefas = obterTarefas(data);

  const tarefasAtualizadas = tarefas.map(tarefa => {
    if (tarefa.id === idTarefa) {
      return { ...tarefa, completed: !tarefa.completed };
    }
    return tarefa;
  });

  salvarTarefas(data, tarefasAtualizadas);
  return tarefasAtualizadas;
}

// 5. Remove uma tarefa da data pelo ID
export function removerTarefa(data, idTarefa) {
  const tarefas = obterTarefas(data);
  const tarefasFiltradas = tarefas.filter(tarefa => tarefa.id !== idTarefa);

  salvarTarefas(data, tarefasFiltradas);
  return tarefasFiltradas;
}

// 6. Restaura as tarefas padrão para a data informada
export function restaurarPadrao(data) {
  const tarefasCopia = TAREFAS_PADRAO.map(tarefa => ({ ...tarefa }));
  salvarTarefas(data, tarefasCopia);
  return tarefasCopia;
}
