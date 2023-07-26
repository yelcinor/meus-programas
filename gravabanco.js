// gravabanco.js
const mysql = require('mysql');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: '89.116.214.253',
  user: 'aluno',
  password: 'apeti2023',
  database: 'BANCO_TESTE',
  port: 3306,
  ssl: true
});

// Função para gravar os dados no banco de dados
function gravarDadosNoBanco(dados) {
  const sql = `INSERT INTO formulario (origem, nome_completo, email, telefone, data_nascimento, genero) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [
    dados.origem = 'teste',
    dados.nomeCompleto,
    dados.melhorEmail,
    dados.telefoneCelular,
    dados.dataNascimento,
    dados.generoSelecionado,
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao gravar os dados no banco de dados:', err);
    } else {
      console.log('Dados gravados no banco de dados com sucesso!');
    }
  });
}

module.exports = gravarDadosNoBanco;
