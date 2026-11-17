# 📚 Organiza Aí

Aplicativo de gerenciamento de tarefas (To-Do List) desenvolvido com **HTML5**, **CSS3** e **JavaScript puro (Vanilla JS)** utilizando **Módulos ES6**.

> Suas tarefas do dia, em um só lugar.

---

## 🎯 Objetivo do Projeto

Projeto criado para a conclusão do curso de Desenvolvimento Web e Introdução à Programação. O objetivo é demonstrar na prática conceitos fundamentais como:
- Estruturação semântica em HTML5 e acessibilidade (`aria-label`, títulos).
- Estilização com CSS Grid, Flexbox e Variáveis CSS (suporte completo a tema claro e escuro).
- Manipulação do DOM (Document Object Model) via JavaScript.
- Persistência de dados e preferências no navegador com `localStorage`.
- Separação de responsabilidades em arquitetura modular (Datas, State, View, Controller).

---

## 🚀 Funcionalidades

1. **4 Cartões Temáticos de Categorias**:
   - 📚 **Tarefas da Faculdade**: atividades acadêmicas e trabalhos.
   - ⭐ **Cronograma de Estudos**: revisões, provas e simulados.
   - 🎯 **Metas Pessoais**: exercícios, hábitos e organização pessoal.
   - 🎬 **Entretenimento**: momentos de lazer e descanso.

2. **Tema Claro e Escuro**:
   - Botão para alternar entre os temas claro e escuro, com preferência salva no `localStorage`.

3. **Navegação por Datas e Calendário**:
   - Escolha o dia no calendário ou use os botões rápidos **‹ (anterior)**, **› (próximo)** e **Hoje**.
   - As tarefas de cada data são salvas e mantidas de forma independente.

4. **Trazer Pendentes de Ontem**:
   - Botão que identifica tarefas não concluídas do dia anterior e as traz para o dia selecionado (sem duplicar tarefas com o mesmo título).

5. **Edição com Duplo Clique**:
   - Dê um duplo clique no texto de qualquer tarefa para editar diretamente no card. Salve com `Enter` ou clicando fora, e cancele com `Esc`.

6. **Status Dinâmico e Dia Concluído (100%)**:
   - Indicadores de status em cada cartão: *Não iniciado*, *Em andamento* e *Concluído*.
   - Ao atingir 100% das tarefas no dia, o cabeçalho de progresso comemora com **"Dia concluído!"** em destaque verde.

7. **Sequência de Dias Concluídos**:
   - Contador de ofensiva (*streak*) no topo da página, calculando quantos dias consecutivos completos o estudante conseguiu manter.

8. **Resumo da Semana**:
   - Faixa com os últimos 7 dias, cada um colorido (verde para dia 100% concluído, laranja para parcial, cinza para sem tarefas ou 0%), com clique para ir até o dia.

9. **Ações Rápidas**:
   - Adicionar nova tarefa em qualquer categoria.
   - Marcar/desmarcar tarefas com um clique.
   - Excluir tarefa no botão `✕`.
   - Botão **Restaurar tarefas padrão** com confirmação de segurança.

---

## 📁 Estrutura de Arquivos

```
projeto/
├── index.html       → Estrutura semântica e acessível da página
├── style.css        → Estilos com CSS Grid, Flexbox, temas e responsividade
├── README.md        → Documentação explicativa do projeto
└── src/
    ├── datas.js     → Funções utilitárias para cálculo e formatação de datas
    ├── state.js     → Gerenciamento dos dados e persistência no localStorage por data
    ├── view.js      → Renderização visual, manipulação do DOM e edição inline
    └── app.js       → Controlador principal conectando eventos, tema e navegação
```

---

## 💻 Como Rodar o Projeto

Como o projeto usa **Módulos ES6 nativos** (`import` / `export`), é necessário executá-lo através de um servidor local:

### Opção 1: Extensão Live Server (VS Code)
1. Abra a pasta do projeto no VS Code.
2. Clique com o botão direito no arquivo `index.html`.
3. Selecione **"Open with Live Server"**.

### Opção 2: Terminal (Python ou Node)
```bash
# Com Python:
python -m http.server 8000

# Ou com Node.js:
npx serve .
```
Acesse `http://localhost:8000` no seu navegador.
