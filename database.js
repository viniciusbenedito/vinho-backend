// yarn add pg

const Pool = require('pg').Pool;

// 1 - Abrir a conexão
// 2 - Executar o comando SQL (query, insert) 30ms (índice)
// 3 - Fechar a conexão

const pool = new Pool({
    user:'eiaxgsukppdhtn',
    password:'f2a4ad85d074123efabac172742aa12270422eb164b5ea90e5aad1dc18808d9a',
    host:'ec2-3-222-30-53.compute-1.amazonaws.com',
    database:'d73usfjf2rnoh5',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

//const sql = `
//    CREATE TABLE IF NOT EXISTS vinho
//    (
//        ID serial primary key,
//        nome varchar(50) not null,
//        tipo varchar(30) not null,
//        classificacao varchar(30) not null,
//        safra int not null
//    )
//`;

//pool.query(sql, function(error, result) {
//    if(error)
//        throw error

//    console.log('Tabela criada com sucesso!');
//})

// INSERT
const sql_insert = `
        INSERT INTO vinho (nome, tipo, classificacao, safra)
            VALUES 
                ('Santa Ana', 'Branco', 'Meio Seco', 2017)

`;

pool.query(sql_insert, function(error, result) {
        if(error)
            throw error;
        
        console.log(result.rowCount);
})

// SELECT

//const sql_select = `SELECT * FROM vinho`;

//pool.query(sql_select, function(error, result) {
//        if(error)
//		    throw error;
	
//	    console.log(result.rows);
//})

