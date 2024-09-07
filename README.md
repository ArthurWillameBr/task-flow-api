<h1 align="center">Task Flow API</h1>

## Descrição do Projeto 📃

<p align="center">O <strong>Task Flow</strong> é uma API RESTful desenvolvida para gerenciamento de tarefas, oferecendo autenticação de usuários e controle de atividades. Através do Task Flow, os usuários podem criar, editar, atualizar e deletar suas tarefas, além de gerenciar prioridades e filtrar tarefas conforme sua necessidade.</p>

## Padrões e Arquitetura Utilizada 🔨

O Task Flow segue uma arquitetura modular e organizada, dividida em casos de uso, repositórios e controllers, garantindo clareza e manutenção facilitada do código. A arquitetura foi projetada com foco em desacoplamento e flexibilidade, utilizando princípios do SOLID para melhorar a robustez do sistema.

Casos de Uso: Os casos de uso representam a camada mais pura da aplicação, totalmente desacoplada e independente do framework utilizado. Isso garante que a lógica central do negócio possa ser testada e mantida sem dependências diretas de infraestruturas externas. O uso do princípio Single Responsibility (SRP) do SOLID assegura que cada classe possui uma única responsabilidade, tornando o código mais legível e fácil de manter.

Repositórios: A camada de repositório é responsável por interagir com o banco de dados, gerenciando o armazenamento e recuperação de dados. Essa camada também está desacoplada do resto da aplicação, utilizando o Repository Pattern, facilitando a troca ou atualização da infraestrutura de persistência sem afetar o restante do código.

Controllers: Os controllers servem como intermediários entre as requisições HTTP e os casos de uso, cuidando da interface com o cliente (API RESTful) e chamando os casos de uso apropriados para atender as requisições.

## Tecnologias utilizadas 👩‍💻
- [Node.js](https://nodejs.org/pt) - Plataforma backend.
- [Express](https://expressjs.com/pt-br/) - Framework para construção de APIs REST.
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática para maior segurança no desenvolvimento.
- [Prisma ORM](https://www.prisma.io/) - Mapeamento objeto-relacional para manipulação de dados.
- [MySQL](https://www.mysql.com/) - Bancos de dados relacional
- [JWT](https://jwt.io/) - Autenticação baseada em tokens.

## Pré-requisitos ⚠

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

## Rodando a aplicação 🚀

```bash
# Clone este repositório
$ git clone <https://github.com/ArthurWillameBr/task-flow-api.git>

# Acesse a pasta do projeto no terminal/cmd
$ cd task-flow-api

# Instale as dependências
$ npm install

# Configure o arquivo de variáveis de ambiente
# Existe um arquivo chamado .env.example no projeto. Renomeie-o para .env e configure as variáveis de acordo com seu ambiente.

# No arquivo .env, adicione a string de conexão com o banco de dados, como por exemplo:
DATABASE_URL="mysql://user:password@localhost:3306/task_flow_db"

# Execute as migrações do Prisma para criar as tabelas no banco de dados
$ npx prisma migrate dev

# Opcional: Visualize o banco de dados com o Prisma Studio
$ npx prisma studio

# Execute a aplicação em modo de desenvolvimento
$ npm run start:dev

# O servidor inciará na porta:3333 - acesse <http://localhost:3333>
```

## Requisitos funcionais
 - [X] O usuário deve poder se cadastrar;
 - [X] O usuário deve poder se autenticar;
 - [X] O usuário autenticado deve poder visualizar seu perfil;
 - [X] O usuário autenticado deve poder fazer logout;
 - [X] O usuário autenticado deve poder cadastrar uma tarefa com: título, descrição, status (A fazer, Feito, Em progresso, Backlog, Cancelado) e prioridade (Alta, Média, Baixa);
 - [X] O usuário autenticado deve poder atualizar o status de uma tarefa específica;
 - [X] O usuário autenticado deve poder atualizar a prioridade de uma tarefa específica;
 - [X] O usuário autenticado deve poder editar uma tarefa específica;
 - [X] O usuário autenticado deve poder excluir uma tarefa específica;
 - [X] O usuário autenticado deve poder filtrar tarefas por título;
 - [X] O usuário autenticado deve poder filtrar tarefas por status;
 - [X] O usuário autenticado deve poder filtrar tarefas por prioridade;

## Regras de negocios
- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [X] Os status possíveis para uma tarefa são: A fazer Feito, Em progresso, Backlog, Cancelado;
- [X] As prioridades possíveis para uma tarefa são: Alta, Média, Baixa;
      
## Requisitos não funcionais
- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco Mysql;
- [X] O usuário deve ser identificado por um JWT (JSON Web Token);
