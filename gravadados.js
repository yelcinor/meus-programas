// gravadados.js

// Importar o módulo fs (file system) do Node.js, que permite a manipulação de arquivos
const fs = require('fs');

// Definir a função gravarDadosEmArquivo, que recebe dois parâmetros: dados e nomeArquivo
function gravarDadosEmArquivo(dados, nomeArquivo) {
  // Criar uma string com os dados formatados que serão gravados no arquivo
  const dadosFormatados = `
Nome completo: ${dados.nomeCompleto}
Melhor e-mail: ${dados.melhorEmail}
Telefone celular: ${dados.telefoneCelular}
Data de nascimento: ${dados.dataNascimento}
Gênero selecionado: ${dados.generoSelecionado}
`;

  // Usar o método appendFile do módulo fs para adicionar os dados ao arquivo especificado
  // O método appendFile cria o arquivo se ele não existir e adiciona os dados ao final do arquivo se ele existir
  // A função recebe três parâmetros: o nome do arquivo, os dados formatados e uma função de callback para tratar erros
  fs.appendFile(nomeArquivo, dadosFormatados, (err) => {
    // Verificar se ocorreu algum erro durante a gravação dos dados no arquivo
    if (err) {
      // Se houver erro, exibir mensagem de erro no console
      console.error('Erro ao gravar os dados no arquivo:', err);
    } else {
      // Se não houver erro, exibir mensagem de sucesso no console
      console.log('Dados gravados com sucesso!');
    }
  });
}

// Exportar a função gravarDadosEmArquivo para que ela possa ser utilizada em outros arquivos
module.exports = gravarDadosEmArquivo;
