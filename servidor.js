// Importar os módulos http, fs, path e querystring do Node.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring'); // Importar o módulo querystring

// Definir a porta que o servidor irá escutar
const port = 3000;

// Criar um servidor HTTP usando o método createServer
const server = http.createServer((req, res) => {
  // Configurar o cabeçalho da resposta com o tipo de conteúdo sendo "text/html"
  res.setHeader('Content-Type', 'text/html');

  // Verificar se a URL solicitada é para a página index.html
  if (req.url === '/' || req.url === '/index.html') {
    // Ler o arquivo index.html
    fs.readFile(path.join(__dirname, 'index.html'), 'utf-8', (err, content) => {
      if (err) {
        res.writeHead(500); // Se houver um erro ao ler o arquivo, retornar código 500 (Internal Server Error)
        res.end('Error loading index.html'); // Enviar a mensagem de erro como resposta
        return;
      }

      res.writeHead(200); // Se a leitura do arquivo for bem-sucedida, retornar código 200 (OK)
      res.end(content); // Enviar o conteúdo do arquivo como resposta
    });
  } else if (req.url === '/abduzidos.html') {
    // Ler o arquivo abduzidos.html se a URL for "/abduzidos.html"
    fs.readFile(path.join(__dirname, 'abduzidos.html'), 'utf-8', (err, content) => {
      if (err) {
        res.writeHead(500); // Se houver um erro ao ler o arquivo, retornar código 500 (Internal Server Error)
        res.end('Error loading form.html'); // Enviar a mensagem de erro como resposta
        return;
      }

      res.writeHead(200); // Se a leitura do arquivo for bem-sucedida, retornar código 200 (OK)
      res.end(content); // Enviar o conteúdo do arquivo como resposta
    });
  } else if (req.url === '/sobre.html') {
    // Ler o arquivo sobre.html se a URL for "/sobre.html"
    fs.readFile(path.join(__dirname, 'sobre.html'), 'utf-8', (err, content) => {
      if (err) {
        res.writeHead(500); // Se houver um erro ao ler o arquivo, retornar código 500 (Internal Server Error)
        res.end('Error loading sobre.html'); // Enviar a mensagem de erro como resposta
        return;
      }

      res.writeHead(200); // Se a leitura do arquivo for bem-sucedida, retornar código 200 (OK)
      res.end(content); // Enviar o conteúdo do arquivo como resposta
    });
  } else if (req.url === '/form.html') {
    // Ler o arquivo form.html se a URL for "/form.html"
    fs.readFile(path.join(__dirname, 'form.html'), 'utf-8', (err, content) => {
      if (err) {
        res.writeHead(500); // Se houver um erro ao ler o arquivo, retornar código 500 (Internal Server Error)
        res.end('Error loading form.html'); // Enviar a mensagem de erro como resposta
        return;
      }

      res.writeHead(200); // Se a leitura do arquivo for bem-sucedida, retornar código 200 (OK)
      res.end(content); // Enviar o conteúdo do arquivo como resposta
    });
  } else if (req.url === '/submit' && req.method === 'POST') {
    // Se a URL for "/submit" e o método da requisição for POST

    // Criar um array para armazenar os dados enviados pelo formulário
    const formData = [];

    // Capturar os dados enviados pelo formulário (os dados são enviados em chunks)
    req.on('data', (chunk) => {
      formData.push(chunk);
    });

    // Quando a requisição terminar, processar os dados enviados
    req.on('end', () => {
      // Concatenar os chunks de dados e transformá-los em uma string
      const formDataString = Buffer.concat(formData).toString();
    
      // Usar o módulo querystring para analisar os dados do formulário
      const parsedFormData = querystring.parse(formDataString);

      // Extrair os valores dos campos do formulário
      const nomeCompleto = parsedFormData['nomeCompleto'];
      const melhorEmail = parsedFormData['melhorEmail'];
      const telefoneCelular = parsedFormData['telefoneCelular'];
      const dataNascimento = parsedFormData['dataNascimento'];
      const generoSelecionado = parsedFormData['gender'];


      // Imprimir os valores no console
      console.log(`Nome completo: ${nomeCompleto}`);
      console.log(`Melhor e-mail: ${melhorEmail}`);
      console.log(`Telefone celular: ${telefoneCelular}`);
      console.log(`Data de nascimento: ${dataNascimento}`);
      console.log(`Gênero selecionado: ${generoSelecionado}`);

      /* Essa linha está utilizando a função require do Node.js para importar (ou requerer) 
      o módulo definido no arquivo gravadados.js.
      Ao usar require('./gravadados'), o Node.js procura pelo arquivo gravadados.js na mesma 
      pasta em que o arquivo servidor3.js está localizado.
      ## O require retorna o objeto ou função exportada do arquivo gravadados.js 
      para a constante gravarDadosEmArquivo no arquivo servidor3.js. ## */
      const gravarDadosEmArquivo = require('./gravadados');
      // Faz a mesma coisa para a função de grava banco.
      const gravarDadosNoBanco = require('./gravabanco'); // Importe o módulo gravabanco.js

      

      // Criar um objeto com os dados a serem gravados
      const dadosParaGravar = {
        nomeCompleto,
        melhorEmail,
        telefoneCelular,
        dataNascimento,
        generoSelecionado,
     };

     // Chamar a função para gravar os dados no arquivo
     const nomeArquivo = 'dados.txt'; // Nome do arquivo de texto
     gravarDadosEmArquivo(dadosParaGravar, nomeArquivo);

     // Chamar a função para gravar os dados no banco de dados
     gravarDadosNoBanco(dadosParaGravar);

      // Retornar uma resposta para o cliente (pode ser uma página de sucesso ou redirecionamento)
      res.writeHead(200);
      res.end(`<h1>Formulario recebido com sucesso!</h1><p>Obrigado(a) por enviar seus dados.</p>`);
      res.end();
    });
  } else if (req.url.startsWith('/arquivos/')) {
    // Servir arquivos de imagem da pasta 'arquivos'
    const imagePath = path.join(__dirname, req.url);
    const imageStream = fs.createReadStream(imagePath);

    imageStream.on('error', () => {
      res.writeHead(404); // Se a imagem não for encontrada, retornar código 404 (Not Found)
      res.end('Image not found'); // Enviar mensagem de erro como resposta
    });

    res.setHeader('Content-Type', 'image/png'); // Configurar o tipo de conteúdo como 'image/png' (ajustar de acordo com o tipo da imagem)
    imageStream.pipe(res); // Enviar a imagem como resposta usando pipe
  } else if (req.url.startsWith('/estilos/')) {
    // Servir arquivos CSS da pasta 'estilos'
    const cssPath = path.join(__dirname, req.url);
    const cssStream = fs.createReadStream(cssPath);

    cssStream.on('error', () => {
      res.writeHead(404); // Se o arquivo CSS não for encontrado, retornar código 404 (Not Found)
      res.end('CSS file not found'); // Enviar mensagem de erro como resposta
    });

    res.setHeader('Content-Type', 'text/css'); // Configurar o tipo de conteúdo como 'text/css'
    cssStream.pipe(res); // Enviar o arquivo CSS como resposta usando pipe
  } else {
    // Lidar com outras URLs não especificadas acima
    res.writeHead(404); // Retornar código 404 (Not Found) para URLs desconhecidas
    res.end('Page not found'); // Enviar mensagem de erro como resposta
  }
});

// Iniciar o servidor para escutar na porta especificada
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`); // Exibir mensagem no console quando o servidor estiver rodando
});