const express = require('express');
const app = express();
const sqlite3 = require('sqlite3');
const PORT = 6969;
const db = new sqlite3.Database('database.db');
app.use(express.json());

db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');

app.get('/api/usuarios', (req, res) => {
  db.all('SELECT id, name FROM users', (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});


app.post('/api/usuarios', (req, res) => {
  const novoUsuario = req.body;
  db.run('INSERT INTO users (name) VALUES (?)', [novoUsuario.name], (err) => {
    if (err) throw err;
    res.status(201).send(`Usuário ${novoUsuario.name} criado`);
  });
});

app.put('/api/usuarios/:id', (req, res) => {
  const id = req.params.id;
  const usuarioUpdate = req.body;
  db.run('UPDATE users SET name = ? WHERE id = ?', [usuarioUpdate.name, id], (err) => {
    if (err) throw err;
    res.send(`Usuário ${id} atualizado`);
  });
});

app.delete('/api/usuarios/:id', (req, res) => {
  const id = req.params.id;
  db.run('DELETE FROM users WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.send(`Usuário ${id} removido`);
  });
})
module.exports = app;
if (require.main === module) {
    app.listen(PORT, () => {
      console.log(`*** \nServer Up on ${PORT} ...\n***`)
    });
}

app.on('close', () => {
  db.close();
});
