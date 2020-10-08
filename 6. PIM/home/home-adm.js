const usuarioLogado = buscarJsonLocalmente('usuario');

async function buscarUsuarios() {
    if (usuarioLogado) {
        try {
            getById('saudacao').innerHTML = `Bem vindo ${usuarioLogado.nome} (Conta ${usuarioLogado.tipo})`;
    
            const response = await fetch('http://127.0.0.1:8080/api/usuarios', {
                method: 'GET',
                headers: { 'Authorization': buscarLocalmente(KEY_TOKEN) }
            });
    
            if (response.ok) {
                // Recupera o container (div) destinado aos usuarios e o deixa vazio (será populado dinamicamente)
                const gridUsuarios = getById('gridUsuarios');
                gridUsuarios.innerHTML = '';

                const usuarios = await response.json();
                usuarios.forEach(usuario => {
                    const id = criarElementoComClasse('div', 'col-1', usuario.id);
                    const nome = criarElementoComClasse('div', 'col-3', usuario.nome);
                    const documento = criarElementoComClasse('div', 'col-2', usuario.documento);
                    const email = criarElementoComClasse('div', 'col-3', usuario.email);
                    const tipo = criarElementoComClasse('div', 'col-1', usuario.tipo);

                    const acoes = criarElementoComClasse('div', 'col-2');
                    const iconeExcluir = criarElemento('img');
                    iconeExcluir.src = '../base/icons/delete.svg';
                    iconeExcluir.onclick = function(){
                        const confirmou = confirm(`Deseja excluir o usuário de ID ${usuario.id}?`);
                        if (confirmou) {
                            excluirUsuario(usuario.id);
                        }
                    };
                    acoes.appendChild(iconeExcluir);

                    const linha = criarElementoComClasse('div', 'row');
                    [id, nome, documento, email, tipo, acoes].forEach(coluna => {
                        linha.appendChild(coluna);
                    });
                    gridUsuarios.appendChild(linha);
                });
            } else {
                const erro = await response.json();
                alert(erro.mensagem);
            }
        } catch (error) {
            console.log(error);
            alert('Ocorreu um erro inesperado!');
            buscarUsuarios();
        }
    } else {
        redirecionarSemHistorico('../login/login.html');
    }
}

async function excluirUsuario(id) {
    try {
        const response = await fetch(`http://127.0.0.1:8080/api/usuarios/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': buscarLocalmente(KEY_TOKEN) }
        });

        if (response.ok) {
            alert('Usuario excluído com sucesso!');
            buscarUsuarios();
        } else {
            const erro = await response.json();
            alert(erro.mensagem);
        }

        } catch (error) {
            console.log(error);
            alert('Ocorreu um erro inesperado!');
        }
}

function criarElementoComClasse(tag, cssClass, text) {
    const elemento = criarElemento(tag);
    elemento.classList.add(cssClass);
    if (text) {
        elemento.innerHTML = text;
    }
    return elemento;
}