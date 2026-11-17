import { somarDias } from './datas.js';

const PREFIXO = 'tarefas_';

const PADRAO_SEMANA = {
  // 0 = domingo
  0: [
    ['Estudos', 'Revisar a matéria da semana'],
    ['Pessoal', 'Preparar as marmitas'],
    ['Pessoal', 'Separar a mochila de segunda'],
    ['Entretenimento', 'Ver um filme com a família']
  ],
  // 1 = segunda
  1: [
    ['Faculdade', 'Ler o capítulo da aula de hoje'],
    ['Faculdade', 'Entregar o trabalho em grupo'],
    ['Estudos', 'Revisar HTML e CSS por 30 minutos'],
    ['Estudos', 'Fazer os exercícios do curso'],
    ['Pessoal', 'Planejar a semana'],
    ['Pessoal', 'Caminhada de 30 minutos'],
    ['Entretenimento', 'Um episódio de série']
  ],
  // 2 = terça
  2: [
    ['Faculdade', 'Resolver a lista de exercícios'],
    ['Faculdade', 'Fazer o resumo da aula'],
    ['Estudos', 'Praticar funções e arrays em JavaScript'],
    ['Estudos', 'Assistir uma aula do curso'],
    ['Pessoal', 'Treino na academia'],
    ['Pessoal', 'Estudar inglês por 15 minutos'],
    ['Entretenimento', 'Jogar com os amigos']
  ],
  // 3 = quarta
  3: [
    ['Faculdade', 'Estudar para a prova de sexta'],
    ['Faculdade', 'Reunião do grupo do projeto'],
    ['Estudos', 'Resolver um simulado'],
    ['Estudos', 'Revisar DOM e eventos'],
    ['Pessoal', 'Lavar roupa'],
    ['Entretenimento', 'Ler um capítulo do livro']
  ],
  // 4 = quinta
  4: [
    ['Faculdade', 'Fazer o fichamento do texto'],
    ['Faculdade', 'Montar os slides da apresentação'],
    ['Estudos', 'Praticar localStorage no projeto'],
    ['Estudos', 'Revisar as anotações da semana'],
    ['Pessoal', 'Treino na academia'],
    ['Pessoal', 'Pagar as contas do mês'],
    ['Entretenimento', 'Assistir um filme']
  ],
  // 5 = sexta
  5: [
    ['Faculdade', 'Fazer a prova'],
    ['Faculdade', 'Entregar a lista de exercícios'],
    ['Estudos', 'Revisão rápida antes da prova'],
    ['Pessoal', 'Organizar o quarto'],
    ['Entretenimento', 'Sair com os amigos']
  ],
  // 6 = sábado
  6: [
    ['Estudos', 'Terminar o projeto do curso'],
    ['Estudos', 'Testar o app em outro navegador'],
    ['Pessoal', 'Corrida de manhã'],
    ['Pessoal', 'Compras da semana'],
    ['Entretenimento', 'Maratonar uma série'],
    ['Entretenimento', 'Almoço em família']
  ]
};

export function padraoDoDia(data) {
  const diaSemana = new Date(data + 'T00:00:00').getDay();
  const tarefas = PADRAO_SEMANA[diaSemana] || [];

  return tarefas.map(([categoria, titulo], posicao) => ({
    id: 'p' + diaSemana + '_' + posicao,
    categoria,
    titulo,
    concluida: false
  }));
}

const CATEGORIAS_VALIDAS = ['Faculdade', 'Estudos', 'Pessoal', 'Entretenimento'];

let contadorId = 0;

export function gerarId() {
  contadorId = (contadorId + 1) % 1000000;
  const timestamp = Date.now();
  const aleatorio = Math.random().toString(36).substring(2, 8);
  return `t_${timestamp}_${contadorId}_${aleatorio}`;
}

export function validarTarefa(t) {
  if (!t || typeof t !== 'object') return null;
  if (t.id === undefined || t.id === null || String(t.id).trim() === '') return null;
  if (typeof t.categoria !== 'string' || !CATEGORIAS_VALIDAS.includes(t.categoria)) return null;
  if (typeof t.titulo !== 'string' || t.titulo.trim() === '') return null;

  return {
    id: String(t.id),
    categoria: t.categoria,
    titulo: t.titulo.trim(),
    concluida: Boolean(t.concluida)
  };
}

let callbackErroSalvar = null;

export function definirCallbackErroSalvar(cb) {
  callbackErroSalvar = cb;
}

function salvar(data, lista) {
  try {
    localStorage.setItem(PREFIXO + data, JSON.stringify(lista));
    return true;
  } catch (erro) {
    console.error('Erro ao salvar tarefas no localStorage:', erro);
    if (typeof callbackErroSalvar === 'function') {
      callbackErroSalvar('Não foi possível salvar as tarefas no armazenamento local.');
    }
    return false;
  }
}

// apenas le os dados salvos ou retorna a lista padrao sem gravar nada no storage
export function pegarTarefas(data) {
  try {
    const dados = localStorage.getItem(PREFIXO + data);

    if (!dados) {
      return padraoDoDia(data);
    }

    const lista = JSON.parse(dados);
    if (!Array.isArray(lista)) {
      return [];
    }

    const listaValida = [];
    for (let i = 0; i < lista.length; i++) {
      const tarefa = validarTarefa(lista[i]);
      if (tarefa) {
        listaValida.push(tarefa);
      }
    }
    return listaValida;
  } catch (erro) {
    console.error('Erro ao ler tarefas:', erro);
    return [];
  }
}

export function adicionarTarefa(data, titulo, categoria) {
  const tarefas = pegarTarefas(data);

  tarefas.push({
    id: gerarId(),
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

export function editarTarefa(data, id, novoTitulo) {
  const tarefas = pegarTarefas(data);

  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id === id) {
      tarefas[i].titulo = novoTitulo.trim();
      break;
    }
  }

  salvar(data, tarefas);
  return tarefas;
}

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
  const padrao = padraoDoDia(data);
  salvar(data, padrao);
  return padrao;
}

export function trazerPendentes(dataOrigem, dataDestino) {
  let dadosOrigem = null;
  try {
    dadosOrigem = localStorage.getItem(PREFIXO + dataOrigem);
  } catch (erro) {
    console.error('Erro ao ler tarefas de ontem:', erro);
    return 0;
  }

  // Se o dia de ontem nunca foi salvo/usado, nao importa tarefas padrao
  if (!dadosOrigem) {
    return 0;
  }

  let listaOrigem = [];
  try {
    const parsed = JSON.parse(dadosOrigem);
    if (Array.isArray(parsed)) {
      listaOrigem = parsed.map(validarTarefa).filter(Boolean);
    }
  } catch {
    return 0;
  }

  const destino = pegarTarefas(dataDestino);
  let trazidas = 0;

  for (let i = 0; i < listaOrigem.length; i++) {
    const t = listaOrigem[i];
    if (!t.concluida) {
      // checa se ja existe uma tarefa com esse mesmo titulo no dia de destino
      let jaExiste = false;
      for (let j = 0; j < destino.length; j++) {
        if (destino[j].titulo.trim().toLowerCase() === t.titulo.trim().toLowerCase()) {
          jaExiste = true;
          break;
        }
      }

      if (!jaExiste) {
        destino.push({
          id: gerarId(),
          categoria: t.categoria,
          titulo: t.titulo,
          concluida: false
        });
        trazidas++;
      }
    }
  }

  if (trazidas > 0) {
    salvar(dataDestino, destino);
  }

  return trazidas;
}

function diaEstaCompleto(data) {
  try {
    const dados = localStorage.getItem(PREFIXO + data);
    if (!dados) return false;

    const lista = JSON.parse(dados);
    if (!Array.isArray(lista) || lista.length === 0) return false;

    const listaValida = lista.map(validarTarefa).filter(Boolean);
    if (listaValida.length === 0) return false;

    for (let i = 0; i < listaValida.length; i++) {
      if (!listaValida[i].concluida) return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function calcularSequencia(hojeFormatado) {
  let contador = 0;
  let dataAtual = hojeFormatado;

  // se o dia de hoje ainda nao foi concluido, avalia a sequencia a partir de ontem
  if (!diaEstaCompleto(dataAtual)) {
    dataAtual = somarDias(hojeFormatado, -1);
  }

  while (diaEstaCompleto(dataAtual)) {
    contador++;
    dataAtual = somarDias(dataAtual, -1);
  }

  return contador;
}

export function resumoSemana(dataReferencia) {
  const resumo = [];

  for (let i = 6; i >= 0; i--) {
    const data = somarDias(dataReferencia, -i);
    let percentual = -1;

    try {
      const dados = localStorage.getItem(PREFIXO + data);
      if (dados) {
        const lista = JSON.parse(dados);
        if (Array.isArray(lista) && lista.length > 0) {
          const listaValida = lista.map(validarTarefa).filter(Boolean);
          if (listaValida.length > 0) {
            let concluidas = 0;
            for (let j = 0; j < listaValida.length; j++) {
              if (listaValida[j].concluida) {
                concluidas++;
              }
            }
            percentual = Math.round((concluidas / listaValida.length) * 100);
          }
        }
      }
    } catch (erro) {
      console.error('Erro ao ler tarefas da semana:', erro);
      percentual = -1;
    }

    resumo.push({ data, percentual });
  }

  return resumo;
}

