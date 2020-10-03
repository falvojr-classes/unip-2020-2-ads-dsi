async function logar() {
  try {
    const usuario = {};
    usuario.email = getById('email').value;
    usuario.senha = getById('senha').value;

    // Consome a API (rodando localmente) para a inclusão do Usuário/Cliente
    const response = await fetch('http://127.0.0.1:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(usuario)
    });

    // Verifica a resposta da API - Sucesso (2XX) ou Falha (4XX)):
    if (response.ok) {
      const usuarioLogado = await response.json();
      
      salvarJsonLocalmente('usuario', usuarioLogado);

      let tokenBasic = gerarTokenBasicAuth(usuario.email, usuario.senha);
      salvarLocalmente('token', tokenBasic);

      let ehAdm = usuarioLogado.tipo == 'ADM';
      redirecionarSemHistorico(`../home/home${ehAdm ? '-adm' : ''}.html`);

    } else {
      const erro = await response.json();
      alert(erro.mensagem);
    }
  } catch (error) {
    console.log(error);
    alert('Ocorreu um erro inesperado!');
  }
}