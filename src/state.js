const PREFIXO = 'tarefas_';

const TAREFAS_PADRAO = [
  { id: 'f1', categoria: 'Faculdade', titulo: 'Pesquisar tema do artigo de História', concluida: false },
  { id: 'f2', categoria: 'Faculdade', titulo: 'Completar lista de exercícios do Cap. 5', concluida: false },
  { id: 'f3', categoria: 'Faculdade', titulo: 'Escrever resenha do livro de literatura', concluida: false },

  { id: 'e1', categoria: 'Estudos', titulo: 'Revisar anotações da aula e fazer resumo', concluida: false },
  { id: 'e2', categoria: 'Estudos', titulo: 'Resolver simulado para a prova de sexta', concluida: false },
  { id: 'e3', categoria: 'Estudos', titulo: 'Reunir com o grupo do projeto de física', concluida: false },

  { id: 'p1', categoria: 'Pessoal', titulo: 'Fazer 30 minutos de caminhada ou treino', concluida: false },
  { id: 'p2', categoria: 'Pessoal', titulo: 'Praticar 15 minutos de vocabulário de inglês', concluida: false },
  { id: 'p3', categoria: 'Pessoal', titulo: 'Atualizar currículo e perfil do LinkedIn', concluida: false },

  { id: 'd1', categoria: 'Entretenimento', titulo: 'Assistir a um filme ou episódio de série', concluida: false },
  { id: 'd2', categoria: 'Entretenimento', titulo: 'Jogar um pouco do jogo favorito', concluida: false },
  { id: 'd3', categoria: 'Entretenimento', titulo: 'Ler um capítulo de um livro por lazer', concluida: false }
];

function salvar(data, lista) {
  try {
    localStorage.setItem(PREFIXO + data, JSON.stringify(lista));
  } catch (erro) {
    console.error('Erro ao salvar tarefas:', erro);
  }
}

// apenas le os dados salvos ou retorna a lista padrao sem gravar nada no storage
export function pegarTarefas(data) {
  try {
    const dados = localStorage.getItem(PREFIXO + data);

    if (!dados) {
      return TAREFAS_PADRAO.map(t => ({ ...t }));
    }

    const lista = JSON.parse(dados);
    return Array.isArray(lista) ? lista : [];
  } catch (erro) {
    console.error('Erro ao ler tarefas:', erro);
    return [];
  }
}

export const obterTarefas = pegarTarefas;

export function adicionarTarefa(data, titulo, categoria) {
  const tarefas = pegarTarefas(data);

  tarefas.push({
    id: 't_' + Date.now(),
    categoria: categoria,
    titulo: titulo.trim(),
    concluida: false
  });

  salvar(data, tarefas);
  return tarefas;
}

export function marcarTarefa(data, id) {
  const tarefas = pegarTarefas(data);

  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id === id) {
      tarefas[i].concluida = !tarefas[i].concluida;
      break;
    }
  }

  salvar(data, tarefas);
  return tarefas;
}

export const alternarTarefa = marcarTarefa;

export function removerTarefa(data, id) {
  const tarefas = pegarTarefas(data);
  const novaLista = [];

  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id !== id) {
      novaLista.push(tarefas[i]);
    }
  }

  salvar(data, novaLista);
  return novaLista;
}

export function restaurarPadrao(data) {
  const padrao = TAREFAS_PADRAO.map(t => ({ ...t }));
  salvar(data, padrao);
  return padrao;
}
