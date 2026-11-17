# 📚 Organiza Aí

Aplicativo de gerenciamento de tarefas (To-Do List) desenvolvido com **HTML5**, **CSS3** e **JavaScript puro (Vanilla JavaScript)**, utilizando **módulos ES6**.

> Suas tarefas do dia, em um só lugar.

## 🌐 Aplicativo publicado

Acesse a versão online: [Organiza Aí](https://projeto-venturus-omega.vercel.app/).

## 🎯 Objetivo do Projeto

Projeto desenvolvido para a conclusão do curso de Desenvolvimento Web e Introdução à Programação. O objetivo é demonstrar conceitos fundamentais, como:

- Estruturação de páginas com HTML5 e recursos básicos de acessibilidade, como `aria-label` e navegação por teclado em algumas ações.
- Estilização com CSS Grid, Flexbox e variáveis CSS.
- Criação de temas claro e escuro.
- Manipulação do DOM (Document Object Model) com JavaScript.
- Persistência de tarefas e preferências no navegador com `localStorage`.
- Separação de responsabilidades em módulos para datas, dados, visualização e controle da aplicação.

## 🚀 Funcionalidades

1. **Quatro categorias de tarefas**
   - 📚 **Tarefas da Faculdade**: atividades acadêmicas e trabalhos.
   - ⭐ **Cronograma de Estudos**: revisões, provas e simulados.
   - 🎯 **Metas Pessoais**: exercícios, hábitos e organização pessoal.
   - 🎬 **Entretenimento**: momentos de lazer e descanso.

2. **Tema claro e escuro**
   - Alternância entre os temas claro e escuro.
   - A preferência é salva no `localStorage` do navegador.

3. **Navegação por datas**
   - Escolha uma data pelo calendário ou use os botões **‹**, **›** e **Hoje**.
   - Cada data tem sua própria lista de tarefas.
   - O nome do dia da semana acompanha a data selecionada.

4. **Trazer tarefas pendentes**
   - Copia tarefas não concluídas de ontem para a data selecionada.
   - Evita duplicar tarefas com o mesmo título.
   - Só importa tarefas de um dia anterior que tenha dados salvos.

5. **Adicionar, editar, concluir e excluir tarefas**
   - Adicione tarefas em qualquer categoria.
   - Marque ou desmarque uma tarefa com um clique.
   - Edite pelo botão de lápis, com duplo clique ou pelo teclado.
   - Salve a edição com `Enter` ou ao sair do campo; use `Esc` para cancelar.
   - Exclua uma tarefa pelo botão `✕`.

6. **Status e progresso**
   - Cada categoria mostra o status **Não iniciado**, **Em andamento** ou **Concluído**.
   - Barras mostram o progresso por categoria e do dia.
   - Quando todas as tarefas do dia estão concluídas, aparece **“Dia concluído!”**.

7. **Sequência de dias concluídos**
   - Conta dias completos consecutivos registrados.
   - Um dia conta quando tem tarefas salvas, a lista não está vazia e todas as tarefas estão concluídas.
   - Se hoje ainda não foi concluído, a contagem começa por ontem.
   - A sequência usa a data real de hoje, mesmo que outra data esteja selecionada.

8. **Resumo semanal**
   - Mostra sete dias, terminando na data selecionada.
   - Verde indica 100% concluído; laranja indica progresso parcial; cinza indica zero ou ausência de tarefas salvas.
   - Clique em um dia para abrir essa data.

9. **Restaurar tarefas padrão**
   - Recria as tarefas padrão da data selecionada.
   - O aplicativo pede confirmação antes de restaurar.

## 💾 Armazenamento dos Dados

As tarefas e a preferência de tema são guardadas no `localStorage` do navegador. Os dados permanecem no navegador e dispositivo atuais, não são sincronizados automaticamente com outros aparelhos e podem ser removidos ao limpar os dados do navegador.

## 📁 Estrutura de Arquivos

```text
projeto/
├── index.html       → Estrutura da página
├── style.css        → Estilos, temas e responsividade
├── README.md        → Documentação do projeto
└── src/
    ├── datas.js     → Cálculos de datas
    ├── state.js     → Tarefas, regras e persistência no localStorage
    ├── view.js      → Renderização e atualização da interface
    └── app.js       → Inicialização e controle dos eventos
```

## 💻 Como Executar o Projeto

Como o projeto usa módulos ES6 nativos (`import` e `export`), execute-o por meio de um servidor local.

### Opção 1: Live Server no VS Code

1. Abra a pasta do projeto no VS Code.
2. Clique com o botão direito em `index.html`.
3. Selecione **Open with Live Server**.

### Opção 2: Python

No terminal, dentro da pasta do projeto, execute:

```bash
python -m http.server 8000
```

Depois, acesse `http://localhost:8000` no navegador.

### Opção 3: Node.js

Se tiver Node.js instalado, execute:

```bash
npx serve .
```
