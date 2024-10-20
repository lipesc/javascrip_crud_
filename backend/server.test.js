const request = require('supertest');
const app = require('./server');

describe('Testes da API de Usuários', () => {
    it('GET /api/usuarios deve retornar a lista de usuários', async () => {
        const response = await request(app).get('/api/usuarios');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Lista de usuários');
    });

    it('POST /api/usuarios deve criar um novo usuário', async () => {
        const novoUsuario = { name: 'João' };
        const response = await request(app)
            .post('/api/usuarios')
            .send(novoUsuario);
        
        expect(response.status).toBe(201);
        expect(response.text).toBe('Usuário João criado');
    });
});