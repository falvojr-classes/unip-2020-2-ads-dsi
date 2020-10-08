const KEY_USUARIO = 'usuario';
const KEY_TOKEN = 'token';

function getById(id) {
  return document.getElementById(id);
}

function criarElemento(tag) {
  return document.createElement(tag);
}

function redirecionar(pagina) {
  // https://stackoverflow.com/a/1655081/3072570
  location.href = pagina;
}

function redirecionarSemHistorico(pagina) {
  // https://stackoverflow.com/a/9980166/3072570
  location.replace(pagina);
}

// Funções uteis para salvar e recuperar dados primitivos no localStorage.
// Referência: https://www.w3schools.com/jsref/prop_win_localstorage.asp

function salvarLocalmente(chave, valor) {
  localStorage.setItem(chave, valor);
}

function buscarLocalmente(chave) {
  return localStorage.getItem(chave);
}

// Funções uteis para salvar e recuperar objetos JSON no localStorage.
// Referência: https://stackoverflow.com/a/2010948/3072570

function salvarJsonLocalmente(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

function buscarJsonLocalmente(chave) {
  return JSON.parse(localStorage.getItem(chave));
}

// Função útil para a criação de um Token de Basic Authentication.
// Referência: https://stackoverflow.com/a/51500400/3072570

function gerarTokenBasicAuth(email, senha) {
  let hashBase64 = btoa(`${email}:${senha}`);
  return `Basic ${hashBase64}`;
}