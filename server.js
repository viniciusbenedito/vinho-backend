const express = require('express');
const Pool = require('pg').Pool;


const pool = new Pool({
    user:'eiaxgsukppdhtn',
    password:'f2a4ad85d074123efabac172742aa12270422eb164b5ea90e5aad1dc18808d9a',
    host:'ec2-3-222-30-53.compute-1.amazonaws.com',
    database:'d73usfjf2rnoh5',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

const server = express();

server.use(express.json());

//GET
server.get('/vinho', async function(request, response) {
    const result = await pool.query('SELECT * FROM vinho');
    return response.json(result.rows);
})

server.get('/vinho/:id', async function(request, response) {
    const id = request.params.id;
    const sql = `SELECT * FROM vinho WHERE id = $1`
    const result = await pool.query(sql, [id]);
    return response.json(result.rows);
})

server.get('/vinho/search', async function(request, response) {
    const nome = request.query.nome;
    const sql = `SELECT * FROM vinho WHERE nome ILIKE $1`;
    const result = await pool.query(sql, ["%" + nome + "%"]);
    return response.json(result.rows);
})

//POST
server.post('/vinho', async function(request, response) {
    const nome = request.body.nome;
    const tipo = request.body.tipo;
    const classificacao = request.body.classificacao;
    const safra = request.body.safra;
    const sql= `INSERT INTO vinho (nome, tipo, classificacao, safra) VALUES ($1, $2, $3, $4)`;
    await pool.query(sql, [nome, tipo, classificacao, safra]);
    return response.status(204).send();
})

//PUT
server.put('/vinho/:id', async function(request, response) {
    const id = request.params.id;
    const { nome, tipo, classificacao, safra } = request.body;
    const sql = `UPDATE vinho SET nome = $1, tipo = $2, classificacao = $3, safra = $4  WHERE id = $5`;
    await pool.query(sql, [nome, tipo, classificacao, safra, id]);
    return response.status(204).send();
})

//DELETE
server.delete('/vinho/:id', async function(request, response) {
    const id = request.params.id;
    const sql = `DELETE FROM vinho WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();    
})

server.listen(process.env.PORT || 3000);