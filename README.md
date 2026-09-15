# 🛍️ Projeto Final — React

Projeto final desenvolvido durante o curso de **React da IT STEP**, evoluindo o CRUD desenvolvido anteriormente e reorganizando sua estrutura utilizando a metodologia **Atomic Design**.

A aplicação permite autenticação de usuários, gerenciamento de produtos, filtragem por nome e alternância entre tema claro e escuro.

## 🚀 Tecnologias

<img src="https://skillicons.dev/icons?i=react,vite,tailwind,js,git,github&perline=6" />

**Bibliotecas e recursos:** `React` · `Vite` · `React Router` · `Axios` · `Material UI` · `Tailwind CSS`

**API:** `REST API` · `JWT` · `LocalStorage`

---

## 📌 Sobre o projeto

O projeto foi desenvolvido a partir do CRUD criado na **Aula 11** e posteriormente reorganizado seguindo os princípios do **Atomic Design**.

O objetivo principal foi separar a interface em componentes reutilizáveis e organizar melhor a estrutura da aplicação, mantendo as funcionalidades desenvolvidas anteriormente.

### Funcionalidades

- 🔐 Login de usuários
- 📝 Cadastro de usuários
- 🔑 Autenticação utilizando JWT
- 🛡️ Proteção de rotas
- 👤 Controle de função do usuário
- 📦 Listagem de produtos
- ➕ Criação de produtos
- ✏️ Edição de produtos
- 🗑️ Exclusão de produtos
- 🔎 Filtro de produtos por nome
- ⚡ Autocomplete utilizando Material UI
- 🌙 Tema claro e escuro
- 💾 Persistência do tema utilizando LocalStorage
- 📱 Interface responsiva

---

## 🧩 Atomic Design

A estrutura do projeto final foi organizada utilizando os cinco níveis do Atomic Design:

```
Atoms → Molecules → Organisms → Templates → Pages
```

**Atoms** — os componentes mais básicos da interface.

```
atoms/
├── Button.jsx
├── Input.jsx
└── Label.jsx
```

**Molecules** — combinam diferentes átomos para formar componentes reutilizáveis.

```
molecules/
├── ErrorMessage.jsx
├── FormField.jsx
├── ProductCard.jsx
└── ProductFilter.jsx
```

**Organisms** — formam seções completas da aplicação e concentram comportamentos mais específicos.

```
organisms/
├── Header.jsx
├── LoginForm.jsx
├── ProductForm.jsx
├── ProductList.jsx
└── RegistrarForm.jsx
```

**Templates** — definem a estrutura visual das páginas.

```
templates/
└── PageLayout.jsx
```

**Pages** — combinam os componentes anteriores e representam as telas da aplicação.

```
pages/
├── CriarProduto.jsx
├── EditarProduto.jsx
├── Home.jsx
├── Login.jsx
└── Registrar.jsx
```

---

## 📁 Estrutura do projeto

```
src/
│
├── components/
│   │
│   ├── Aulas/
│   │   ├── Aula01/
│   │   ├── Aula02/
│   │   ├── Aula03/
│   │   ├── Aula04/
│   │   ├── Aula05/
│   │   ├── Aula06/
│   │   ├── Aula07/
│   │   ├── Aula08/
│   │   ├── Aula09/
│   │   ├── Aula10/
│   │   ├── Aula11/
│   │   └── Aula12/
│   │
│   └── projeto-final/
│       │
│       ├── atoms/
│       │   ├── Button.jsx
│       │   ├── Input.jsx
│       │   └── Label.jsx
│       │
│       ├── molecules/
│       │   ├── ErrorMessage.jsx
│       │   ├── FormField.jsx
│       │   ├── ProductCard.jsx
│       │   └── ProductFilter.jsx
│       │
│       ├── organisms/
│       │   ├── Header.jsx
│       │   ├── LoginForm.jsx
│       │   ├── ProductForm.jsx
│       │   ├── ProductList.jsx
│       │   └── RegistrarForm.jsx
│       │
│       ├── templates/
│       │   └── PageLayout.jsx
│       │
│       ├── pages/
│       │   ├── CriarProduto.jsx
│       │   ├── EditarProduto.jsx
│       │   ├── Home.jsx
│       │   ├── Login.jsx
│       │   └── Registrar.jsx
│       │
│       ├── contexts/
│       │   └── ThemeContext.jsx
│       │
│       └── routes/
│           └── PrivateRoute.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

As aulas anteriores permanecem organizadas dentro de `components/Aulas`, enquanto o projeto final possui sua própria estrutura baseada em Atomic Design.

---

## 🔐 Autenticação

A autenticação utiliza JWT. O fluxo de login funciona da seguinte forma:

```
Login
  ↓
POST /login
  ↓
JWT recebido
  ↓
Token armazenado no LocalStorage
  ↓
GET /me
  ↓
Role do usuário armazenada
  ↓
Acesso à área protegida
```

As rotas protegidas utilizam o componente `PrivateRoute`:

```
Usuário
   │
   ├── Sem token ──────→ /login
   │
   └── Com token ──────→ Área protegida
```

---

## 🛡️ Rotas

**Rotas públicas**

| Rota | Página |
|---|---|
| `/` | Redireciona para Login |
| `/login` | Login |
| `/registrar` | Cadastro |

**Rotas protegidas**

| Rota | Página |
|---|---|
| `/user/home` | Lista de produtos |
| `/user/novo-produto` | Criar produto |
| `/user/produtos/editar/:id` | Editar produto |

---

## 📦 CRUD de produtos

O gerenciamento de produtos utiliza a API Node disponibilizada durante o curso.

**Operações utilizadas**

```
GET     /produtos
GET     /produtos/:id
POST    /produtos
PUT     /produtos/:id
DELETE  /produtos/:id
```

As requisições são realizadas utilizando Axios.

**Fluxo de listagem**

```
API
 ↓
ProductList
 ↓
ProductCard
```

**Fluxo de criação e edição**

```
Page
 ↓
ProductForm
 ↓
Axios
 ↓
API
```

O mesmo `ProductForm` é reutilizado nos dois modos:

```jsx
<ProductForm modo="criar" />
<ProductForm modo="editar" id={id} />
```

---

## 🔎 Filtro de produtos

O filtro foi desenvolvido como um componente reutilizável: `ProductFilter`, utilizando o componente `Autocomplete` do Material UI.

**Fluxo**

```
API
 ↓
ProductList
 ↓
Home
 ↓
ProductFilter
 ↓
Nome selecionado
 ↓
ProductList
 ↓
Produtos filtrados
```

O componente possui dois controles:

- **Filtrar** — aplica o produto selecionado.
- **Limpar** — remove o filtro e exibe novamente todos os produtos.

---

## 🌙 Tema claro e escuro

A aplicação possui suporte a tema claro e escuro através de um contexto global: `ThemeContext`.

O tema é compartilhado pela aplicação utilizando a React Context API e sincronizado entre **Tailwind CSS** e **Material UI**.

A preferência do usuário também é armazenada no LocalStorage, permitindo manter o tema após recarregar a página.

---

## 🎨 Interface

A interface foi desenvolvida utilizando:

- Tailwind CSS
- Material UI
- Layout responsivo
- Componentes reutilizáveis
- Dark Mode

O `PageLayout` é utilizado para manter uma estrutura visual consistente entre as páginas.

---

## ⚙️ Como executar o projeto

**1. Clone o repositório**

```bash
git clone https://github.com/devstoks/projeto-react-step.git
```

**2. Entre na pasta do projeto**

```bash
cd projeto-react-step/exemplo
```

**3. Instale as dependências**

```bash
npm install
```

**4. Execute o projeto**

```bash
npm run dev
```

A aplicação será disponibilizada pelo Vite no endereço local informado no terminal.

---

## 🏗️ Build de produção

Para gerar a versão de produção:

```bash
npm run build
```

Para visualizar o build localmente:

```bash
npm run preview
```

---

## 🌐 Deploy

O projeto foi publicado na Vercel, utilizando o Vite como ferramenta de build.

**Configuração**

- Framework: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

**Aplicação online:** [projeto-react-step-iota.vercel.app](https://projeto-react-step-iota.vercel.app/login)

---

## 🎥 Apresentação

Vídeo de apresentação do projeto: [link/arquivo do vídeo aqui]

O vídeo apresenta:

- Organização do projeto com Atomic Design
- Funcionamento da aplicação
- Autenticação
- CRUD de produtos
- Filtro com Material UI
- Tema claro e escuro
- Aplicação publicada

---

## 📚 Objetivo acadêmico

Este projeto faz parte do Projeto Final de React da formação e teve como objetivo aplicar na prática conceitos estudados durante as aulas, principalmente:

- Componentização
- Props
- Estado
- Hooks
- React Router
- Context API
- Consumo de APIs REST
- Axios
- Autenticação
- CRUD
- Material UI
- Tailwind CSS
- Atomic Design
- Deploy de aplicações React

---

## 👨‍💻 Autor

**Matheus Camilo Borba**

Desenvolvedor Full Stack em formação, com foco em desenvolvimento web e backend Java.

---

## 📄 Status

Projeto final concluído e publicado na Vercel.

Projeto desenvolvido para fins acadêmicos durante a formação em desenvolvimento Full Stack.