# GoStack 9.0 - Desafio 02/03
***
Esse projeto foi desenvolvido como resposta ao segundo e terceiro desafio do bootcamp GoStack 9.0

## Principais pontos

- Diferente do primeiro desafio, agora a aplicação possui um banco de dados. O banco de dados utilizado foi o **Postgres**, rodando em um container no **Docker**.

- Essa aplicação possui um sistema de autenticação que utiliza **Bearer Token**, construído com a biblioteca _**JsonWebToken**_.

- Para maior controle da estrutura do banco de dados, estou utilizando migrations para a criação das tabelas e campos.

## Como executar o projeto?

#### Banco de Dados
Conforme citado anteriormente, para o banco de dados foi utilizada uma imagem do Postgres, versão 11, para o Docker. Caso você já tenha o Docker instalado, basta executar o seguinte comando:
```bash
 docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
```
**Obs:** O parâmetro: **-e POSTGRES_PASSWORD=docker** definem a senha do banco como **docker**, que é a senha configurada por padrão no projeto.
Caso deseje alterá-la, será necessário alterar também no arquivo /src/config/database.js.

Se você não conhece o Docker, recomendo ler a documentação oficial clicando na imagem abaixo :)

<div style="width:200px">

[![Docker](https://docs.docker.com/images/docs@2x.png)](https://docs.docker.com/)

</div>

Para verificar se o container está rodando, execute:

```bash
docker ps
```

Você deverá ver algo assim:

    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                      NAMES
    6812ddf98848        postgres:11         "docker-entrypoint.s…"   8 days ago          Up 13 hours         0.0.0.0:5432->5432/tcp     postgres

#### Aplicação

Primeiramente, você deverá clonar esse repositório. Então navegue para a pasta desejada pelo terminal e execute o seguinte comando:

```bash
git clone https://github.com/mendes-jc/gostack_02.git
```

Agora precisamos baixar as dependências. Para isso, navegue até a pasta do projeto e execute:

```bash
yarn
```

Após isso, já será possível executar o projeto :). Para isso:

```bash
yarn dev
```

### Em breve a documentação de todas as rotas...
