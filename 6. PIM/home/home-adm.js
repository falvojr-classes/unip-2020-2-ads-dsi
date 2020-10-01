function inicializar() {
    const usuarioLogado = buscarJsonLocalmente('usuario');
    getById('saudacao').innerHTML = `Bem vindo ${usuarioLogado.nome} (Conta ${usuarioLogado.tipo})`;
}