# 📘 Documentação – Testes Automatizados Webdojo (Cypress)

Este projeto contém testes automatizados **End-to-End (E2E)** desenvolvidos com **Cypress** para a aplicação **Webdojo**.

A aplicação Webdojo está localizada **no mesmo repositório** e precisa estar em execução para que os testes automatizados funcionem corretamente.

---

## 🛠️ Tecnologias Utilizadas

* Node.js
* Cypress
* JavaScript
* NPM

---

## 📂 Estrutura do Projeto

Estrutura da pasta `cypress`:

```
cypress/
├── e2e/
│   └── login.cy.js
│
├── fixtures/
│   ├── cep.json
│   ├── consultancy.json
│   └── document.pdf
│
├── support/
│   ├── actions/
│   │   └── consultancy.actions.js
│   ├── commands.js
│   ├── e2e.js
│   └── utils.js
```

### 📁 Descrição das Pastas e Arquivos

#### `cypress/e2e`

Contém os arquivos de testes E2E.

* **login.cy.js**: testes relacionados ao fluxo de login da aplicação.

#### `cypress/fixtures`

Arquivos utilizados como massa de dados para os testes.

* **cep.json**: dados de CEP
* **consultancy.json**: dados de consultoria
* **document.pdf**: arquivo usado em testes de upload

#### `cypress/support`

Arquivos de suporte e reutilização de código.

* **actions/consultancy.actions.js**: ações reutilizáveis relacionadas à consultoria
* **commands.js**: comandos customizados do Cypress
* **e2e.js**: carregado automaticamente antes da execução dos testes
* **utils.js**: funções utilitárias auxiliares

---

## ▶️ Pré-requisitos

Antes de executar os testes, é necessário:

* Node.js instalado
* Instalar as dependências do projeto:

```bash
npm install
```

---

## 🚀 Executando a Aplicação Webdojo

Como a aplicação Webdojo está no mesmo repositório, **é obrigatório iniciá-la antes de rodar os testes**.

Execute o comando:

```bash
npm run dev
```

A aplicação será iniciada em:

```
http://localhost:3000
```

---

## 🧪 Executando os Testes Automatizados

Os testes utilizam resolução padrão de **1440x900**, exceto quando especificado.

### ▶️ Executar todos os testes (headless)

```bash
npm run test
```

---

### 🖥️ Executar os testes no modo interativo (UI do Cypress)

```bash
npm run test:ui
```

---

### 🔐 Executar apenas os testes de login (desktop)

```bash
npm run test:login
```

---

### 📱 Executar testes de login em resolução mobile

```bash
npm run test:login:mobile
```

**Resolução mobile utilizada:**

* Largura: `414`
* Altura: `896`

---

## 📜 Scripts Disponíveis

```json
{
  "dev": "serve -s dist -p 3000",
  "test": "npx cypress run --config viewportWidth=1440,viewportHeight=900",
  "test:ui": "npx cypress open --config viewportWidth=1440,viewportHeight=900",
  "test:login": "npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=1440,viewportHeight=900",
  "test:login:mobile": "npx cypress run --spec cypress/e2e/login.cy.js --config viewportWidth=414,viewportHeight=896"
}
```

---

## ✅ Boas Práticas Adotadas

* Organização por responsabilidade (e2e, actions, utils)
* Uso de fixtures para dados de teste
* Comandos customizados para reutilização de código
* Testes em diferentes resoluções (desktop e mobile)

---

## ⚠️ Observações Importantes

* Certifique-se de que a aplicação Webdojo esteja rodando antes de executar os testes
* Caso a URL ou porta da aplicação mude, será necessário ajustar a configuração do Cypress
* Novos testes devem ser adicionados na pasta `cypress/e2e`

---

## 📄 Autor

Projeto de testes automatizados desenvolvido para a aplicação **Webdojo** utilizando **Cypress**.

---

Se quiser, posso:

* Ajustar para um **padrão corporativo**
* Criar uma versão **mais enxuta**
* Incluir **exemplos de testes Cypress**
* Documentar **padrões de escrita de testes** (Given/When/Then, Page Actions, etc.)
