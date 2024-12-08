# js-api-estudos
### simples api RESTful para cadastrar usuários
 - tecnologias usadas\
 node.js\
 express.js\
 sqlite3\
 swagger
 

 como usar:

```markdown
# API de Usuários

Esta é uma API Node.js simples para gerenciar usuários, criada com Express e SQLite. Documentação feita com Swagger.
```

## Instalação

**Clone o Repositório:**
   ```
   git clone <https://github.com/lipesc/js-api-estudos.git>
   
   ```
```
   cd js-api-estudos
   ```

**Instale as Dependências:**
   ```bash
   npm install
   ```

## Executando o Servidor

**Inicie o Servidor:**
   ```bash
   node backend/server.js 
   ```
```
mensagem:  
   *** 
   Server Up on 6969 ... 
   ***
```
   

## Acessando a Documentação do Swagger

** ** [http://localhost:6969/api-docs](http://localhost:6969/api-docs)

## Endpoints da API

* **GET /api/usuarios:** Recupera uma lista de todos os usuários.
* **POST /api/usuarios:** Cria um novo usuário.
* **PUT /api/usuarios/{id}:** Atualiza um usuário existente.
* **DELETE /api/usuarios/{id}:** Exclui um usuário. 


