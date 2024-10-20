const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const PORT = 6969;
const db = new sqlite3.Database('database.db');

db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
      openapi: '3.0.0',
      info: {
          title: 'API de Usuários',
          version: '1.0.0',
          description: 'API para gerenciar usuários',
      },
      servers: [
          {
              url: 'http://localhost:6969',
          },
      ],
  },
  apis: ['backend/server.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Retorna a lista de usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
app.get('/api/usuarios', (req, res) => {
  db.all('SELECT id, name FROM users', (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});
/**
* @swagger
* /api/usuarios:
*   post:
*     summary: Cria um novo usuário
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               name:
*                 type: string
*     responses:
*       201:
*         description: Usuário criado com sucesso
*/
app.post('/api/usuarios', (req, res) => {
  const novoUsuario = req.body;
  db.run('INSERT INTO users (name) VALUES (?)', [novoUsuario.name], (err) => {
    if (err) throw err;
    res.status(201).send(`Usuário ${novoUsuario.name} criado`);
  });
});

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer 
 *         required: true
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 */
app.put('/api/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const usuarioUpdate = req.body;
  db.run('UPDATE users SET name = ? WHERE id = ?', [usuarioUpdate.name, id], (err) => {
    if (err) throw err;
    res.send(`Usuário ${id} atualizado`);
  });
});

/**
* @swagger
* /api/usuarios/{id}:
*   delete:
*     summary: Deletar usuário
*     parameters:
*        - in: path
*          name: id
*          schema:
*            type: integer
*          require: true
*          description: ID do usario para deletar
*     responses:
*       200:
*         description: Usuário deletado com sucesso
*/
app.delete('/api/usuarios/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.send(`Usuário ${id} removido`);
  });
});

module.exports = app;
if (require.main === module) {
    app.listen(PORT, () => {
      console.log(`*** \nServer Up on ${PORT} ...\n***`)
    });
}

app.on('close', () => {
  db.close();
});
