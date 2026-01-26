const pgp = require('pg-promise')();

//Montando a conexão com o banco de dados
const db = pgp({
    host: 'localhost', // endereço do servidor do banco de dados
    port: 5432, // porta padrão do PostgreSQL
    database: 'UserDB', // nome do banco de dados
    user: 'dba', // nome de usuário do banco de dados
    password: 'dba' // senha do banco de dados
})

// Função para deletar um usuário pelo email
// none = função do pg-promise que faz uma consulta e não retorna nenhum dado (INSERT, DELETE, UPDATE)
// $1 = placeholder para o primeiro parâmetro passado na array
function deleteUserByEmail(email) {
    return db.none('DELETE FROM public."User" WHERE "email" = $1', [email])
}

module.exports = {
    deleteUserByEmail
}