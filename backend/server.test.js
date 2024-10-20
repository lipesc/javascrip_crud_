const app = require('./server.js');
const request = require('supertest');

describe('API routes', () => {
  describe('GET /api/usuarios', () => {
  it('should respond with an array of users', async () => {
  const response = await request(app).get('/api/usuarios');
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBeGreaterThan(0);
    });
  });
});

describe('POST /api/usuarios', () => {
  it('should create a new user', async () => {
    const newUser = {name: 'Test User'};
    const response = await request(app).post('/api/usuarios').send(newUser);
    expect(response.statusCode).toBe(201);
  });
});

describe('PUT /api/usuarios/:id', () => {
  it('should update a user', async () => {
    const updatedUser = {name: 'Updated User'};
    const response = await request(app).put('/api/usuarios/1').send(updatedUser);
    expect(response.statusCode).toBe(200);
  });
}); 

describe('DELETE /api/usuarios/:id', () => {
  it('should delete a user', async () => {
    const response = await request(app).delete('/api/usuarios/1');
    expect(response.statusCode).toBe(200);
  });
});