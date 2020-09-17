async function registrar() {
  try {
    // Cria um JSON (JavaScript Object Notation):
    const cliente = {};
    // Atribui ao JSON os valores dos campos recuperados do HTML (DOM):
    cliente.nome = getById('nome').value;
    cliente.email = getById('email').value;
    cliente.documento = getById('documento').value;
    cliente.senha = getById('senha').value;
    // Realiza um tratamento especifico para os inputs do tipo 'radio':
    const radioPf = getById('radioPf');
    const radioPj = getById('radioPj');
    cliente.tipo = radioPf.checked ? radioPf.value : radioPj.value;

    // Consome a API (rodando localmente) para a inclusão do Usuário/Cliente
    const response = await fetch('http://localhost:8080/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    });

    // Verifica a resposta da API - Sucesso (2XX) ou Falha (4XX)):
    if (response.ok) {
      const usuarioRegistrado = await response.json();
      alert(`Cliente com o ID ${usuarioRegistrado.id} regitrado com sucesso!`);

      //TODO Redirecionar para a tela de Login.
    } else {
      const erro = await response.json();
      alert(erro.mensagem);
    }
  } catch (error) {
    console.log(error);
    alert('Ocorreu um erro inesperado!');
  }

}