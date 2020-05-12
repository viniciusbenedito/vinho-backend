const express = require('express');

const server = express();

server.use(express.json());

const vinho = [
    {nome: 'Mediterraneo', tipo: 'Tinto', classificacao: 'Seco', safra: 2017},
    {nome: 'Montado Branco', tipo: 'Branco', classificacao: 'Seco', safra: 2018},
    {nome: 'San Ceteo Turandot', tipo: 'Tinto', classificacao: 'Meio Seco', safra: 2018}
]

server.get('/vinho', function(request, response) {
    response.json(vinho);
})

server.post('/vinho', function(request, response) {

    //const nome = request.body.nome;
    //const tipo = request.body.tipo;
    //const classificacao = request.body.classificacao;
    //const safra = request.body.safra;

    const {nome, tipo, classificacao, safra} = request.body;

    vinho.push({nome, tipo, classificacao, safra});
    response.status(204).send();
})

server.put('/vinho/:id', function(request, response) {
    const id = request.params.id;
    const {nome, tipo, classificacao, safra} = request.body;

    for(let i = 0; i < vinho.length; i++) {
        if(vinho[i].nome == id) {
            vinho[i].nome = nome;
            vinho[i].tipo = tipo;
            vinho[i].classificacao = classificacao;
            vinho[i].safra = safra;
            break;
        }
    }

    return response.status(204).send();
})

server.delete('/vinho/:id', function(request, response) {
    const id = request.params.id;

        for(let i = 0; i < vinho.length; i++) {
        if(vinho[i].nome == id) {
            vinho.splice(i, 1);
            break;
        }
    }
    return response.status(204).send();
})

server.listen(process.env.PORT || 3000);