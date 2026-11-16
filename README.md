# 📚 Meus Dias de Estudante 🤓

Aplicativo de gerenciamento de tarefas (To-Do List) desenvolvido com **HTML5**, **CSS3** e **JavaScript puro (Vanilla JS)** utilizando **Módulos ES6**.

---

## 🎯 Objetivo do Projeto

Projeto criado para a conclusão do curso de Desenvolvimento Web e Introdução à Programação. O objetivo é demonstrar na prática conceitos fundamentais como:
- Estruturação semântica em HTML5.
- Estilização moderna com CSS Grid, Flexbox e Variáveis CSS.
- Manipulação do DOM (Document Object Model) via JavaScript.
- Persistência de dados no navegador com `localStorage`.
- Separação de responsabilidades em arquitetura modular (State, View, Controller).

---

## 🚀 Funcionalidades

1. **4 Cartões Temáticos de Categorias**:
   - 📚 **Tarefas da Faculdade**: atividades acadêmicas e trabalhos.
   - ⭐ **Cronograma de Estudos**: revisões, provas e simulados.
   - 🎯 **Metas Pessoais**: exercícios, hábitos e organização pessoal.
   - 🎬 **Entretenimento**: momentos de lazer e descanso.

2. **Seletor de Datas / Calendário**:
   - Escolha qualquer dia no calendário: as tarefas, o progresso e os status são salvos e carregados de forma independente por data.

3. **Status Dinâmico por Cartão**:
   - 🔴 **Não iniciado**: quando 0% das tarefas do cartão estão concluídas.
   - 🟠 **Em andamento**: quando pelo menos uma tarefa foi marcada, mas ainda faltam outras.
   - 🟢 **Concluído**: quando 100% das tarefas do cartão foram concluídas.

4. **Barras de Progresso**:
   - **Barra Geral**: mostra a porcentagem total de tarefas concluídas no dia.
   - **Barras Individuais**: cada cartão tem seu próprio indicador e barra de progresso proporcional.

5. **Ações Rápidas**:
   - Adicionar nova tarefa em qualquer categoria.
   - Marcar/desmarcar tarefas com um clique.
   - Excluir tarefa no botão `✕`.
   - Botão **Restaurar tarefas padrão** para recarregar as tarefas de exemplo na data atual.

---

## 📁 Estrutura de Arquivos

```
projeto/
├── index.html       → Estrutura semântica e acessível da página
├── style.css        → Estilos organizados por seções com CSS Grid e Flexbox
├── README.md        → Documentação explicativa do projeto
└── src/
    ├── state.js     → Gerenciamento dos dados e persistência no localStorage por data
    ├── view.js      → Renderização visual, manipulação do DOM e status dinâmicos
    ├── app.js       → Controlador principal que conecta os eventos do usuário
    └── api.js       → Exemplo de consumo de API com fetch e async/await (código bônus)
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
