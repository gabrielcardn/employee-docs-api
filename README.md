======================================
API DE GERENCIAMENTO DE DOCUMENTOS
======================================

Este projeto é uma solução para o desafio técnico de Desenvolvedor Back-End da INMETA.
Trata-se de uma API RESTful para gerenciar o ciclo de vida da documentação obrigatória de colaboradores, desde a atribuição de uma pendência até o seu envio.

---

## Funcionalidades Principais

- Gerenciamento de Colaboradores (Criar, Ler, Atualizar, Deletar).
- Gerenciamento de Tipos de Documento (Criar, Ler).
- Atribuição de documentos obrigatórios a um colaborador.
- Envio de um documento (alteração de status de 'PENDENTE' para 'ENVIADO').
- Desvinculação de um documento de um colaborador.
- Consulta do status completo da documentação de um colaborador específico.
- Listagem de todos os documentos pendentes com suporte a paginação e filtros.

---

## Qualidade e Robustez

Além das funcionalidades principais, o projeto implementa práticas de engenharia para garantir maior qualidade e estabilidade:

- Tratamento de Erros Global: Um filtro de exceção global foi implementado para padronizar todas as respostas de erro da API e para realizar o log detalhado de erros inesperados (erros 500), facilitando a depuração e manutenção.

- Testes Unitários: Foram escritos testes unitários para o `DocumentsService` utilizando Jest, garantindo que a lógica de negócio crítica (envio e remoção de documentos) funcione como esperado e esteja protegida contra regressões.

- Documentação Interativa (Swagger): A API é autodocumentada usando a especificação OpenAPI (Swagger). Isso gera uma interface web interativa para explorar e testar os endpoints em tempo real.

---

## Tecnologias Utilizadas

- Backend: Node.js, NestJS, TypeScript
- Documentação: Swagger (OpenAPI)
- Testes: Jest
- ORM: TypeORM
- Banco de Dados: MySQL
- Conteinerização: Docker e Docker Compose

---

## Pré-requisitos

Antes de começar, garanta que você tenha os seguintes softwares instalados:

- Node.js (versão 18 ou superior é recomendada)
- npm (ou outro gerenciador de pacotes como Yarn)
- Docker e Docker Compose

---

## Instalação e Configuração

Siga os passos abaixo para configurar e executar o projeto localmente.

1. Clone o repositório:

   `git clone https://github.com/gabrielcardn/employee-docs-api.git`

2. Acesse a pasta do projeto:

   `cd employee-docs-api`

3. Inicie o banco de dados:
   Este comando irá iniciar um contêiner Docker com o banco de dados MySQL em segundo plano.

   `docker-compose up -d`

4. Instale as dependências da API:
   Navegue até a pasta da API e instale os pacotes necessários.

   `cd api`

   `npm install`

5. Configure as variáveis de ambiente:
   Existe um arquivo de exemplo chamado '.env.example'. Crie uma cópia dele com o nome '.env'.

   `cp .env.example .env`
   (Os valores padrão já estão configurados para o banco de dados Docker.)

6. Execute as migrações do banco de dados:
   Este comando criará todas as tabelas necessárias.

   `npm run migration:run`

---

## Executando a Aplicação

A aplicação pode ser executada em dois modos a partir da pasta `api`.

1. Modo de Desenvolvimento:
   Este modo utiliza o ts-node para rodar a aplicação e reinicia o servidor automaticamente a cada alteração de código (hot-reloading). Ideal para desenvolver.

   ```npm run start:dev```

2. Modo de Produção:
   Este modo simula como a aplicação rodaria em um servidor real. É mais performático, mas não atualiza automaticamente com as mudanças no código.

   Primeiro, compile o projeto:

   `npm run build`

   Depois, inicie o servidor de produção:

   `npm run start:prod`

Em ambos os modos, a API estará disponível no endereço: http://localhost:3000

---

## Documentação da API (Swagger)

Com a aplicação em execução, a documentação interativa da API pode ser acessada no seu navegador através do seguinte endereço:

http://localhost:3000/api-docs

Nesta página, você pode visualizar todos os endpoints, seus parâmetros, schemas de resposta e executar requisições de teste diretamente pela interface.

---

## Executando os Testes

Para rodar a suíte de testes unitários, execute o seguinte comando na pasta `api`:

```npm run test```

---

## Endpoints da API

Abaixo estão os principais endpoints disponíveis, que também podem ser explorados em detalhe através da documentação do Swagger.

- Documentos:

  - GET /documents/pending -> Lista documentos pendentes (com filtros opcionais ?page, ?limit, ?employeeId, ?documentTypeId)
  - PATCH /documents/:id/submit -> Altera o status de um documento para 'SUBMITTED'
  - DELETE /documents/:id -> Remove a pendência de um documento

- Tipos de Documento:

  - POST /document-types -> Cria um novo tipo de documento
  - GET /document-types -> Lista todos os tipos de documento

- Colaboradores:
  - POST /employees -> Cria um novo colaborador
  - GET /employees -> Lista todos os colaboradores
  - GET /employees/:id -> Busca um colaborador específico
  - PATCH /employees/:id -> Atualiza um colaborador
  - DELETE /employees/:id -> Deleta um colaborador
  - GET /employees/:id/documentation -> Busca o status de todos os documentos de um colaborador
  - POST /employees/:id/documents -> Vincula tipos de documento a um colaborador
