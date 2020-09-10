function somar() {
  // https://stackoverflow.com/a/1133814/3072570
  const a = document.getElementById('a').value;
  const b = document.getElementById('b').value;
  const total = somarValores(a, b);
  alert(total);
}

function somarValores(valor1, valor2) {
  return Number(valor1) + Number(valor2);
}