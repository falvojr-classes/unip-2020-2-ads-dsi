let usuarioLogado = buscarJsonLocalmente('usuario');
async function inicializar() {
    if (usuarioLogado) {
        try {
            // Preenche a mensagem de saudação para o usuário logado
            getById('saudacao').innerHTML = `Bem vindo ${usuarioLogado.nome} (Conta ${usuarioLogado.tipo})`;
            // Preenche os dados do usuário logado nos campos da tela (HTML)
            getById('nome').value = usuarioLogado.nome;
            getById('email').value = usuarioLogado.email;
            getById('documento').value = usuarioLogado.documento;
            getById('radioPf').checked = usuarioLogado.tipo == 'PF';
            getById('radioPj').checked = usuarioLogado.tipo == 'PJ';
            // Buscar todos os interesses possíveis
            const response = await fetch('http://127.0.0.1:8080/api/interesses', {
                method: 'GET',
                headers: { 'Authorization': buscarLocalmente(KEY_TOKEN) }
            });
            if (response.ok) {
                // Recupera o container (div) destinado aos interesses
                const divInteresses = getById('interesses');
                // Recupera do response a lista de interesses (array de JSON)
                const interesses = await response.json();
                interesses.forEach(interesse => {
                    // Cria um checkbox dinamicamente
                    const checkbox = criarElemento('input');
                    checkbox.id = interesse.descricao;
                    checkbox.name = 'interesse'
                    checkbox.type = 'checkbox';
                    checkbox.value = interesse.id;
                    checkbox.checked = usuarioLogado.interesses.some(item => item['id'] === interesse.id)
                    // Cria uma label dinamicamente
                    const label = criarElemento('label');
                    label.htmlFor = checkbox.id;
                    label.innerHTML = interesse.descricao;
                    // Inclui os elementos no container (div) destinado aos interesses.
                    divInteresses.appendChild(checkbox);
                    divInteresses.appendChild(label);
                });
            } else {
                const erro = await response.json();
                alert(erro.mensagem);
            }
        } catch (error) {
            console.log(error);
            alert('Ocorreu um erro inesperado!');
        }
    } else {
        redirecionarSemHistorico('../login/login.html');
    }
}

async function salvar() {
    try {
        // Atribui ao JSON os valores dos campos recuperados do HTML (DOM):
        usuarioLogado.nome = getById('nome').value;
        usuarioLogado.documento = getById('documento').value;
        // Realiza um tratamento especifico para os inputs do tipo 'radio':
        const radioPf = getById('radioPf');
        const radioPj = getById('radioPj');
        usuarioLogado.tipo = radioPf.checked ? radioPf.value : radioPj.value;
        // Identifica os interesses selecionados e os relaciona com o usuário logado
        usuarioLogado.interesses = []
        document.getElementsByName('interesse').forEach(checkboxInteresse => {
            if (checkboxInteresse.checked) {
                const interesse = {
                    id: checkboxInteresse.value
                }
                usuarioLogado.interesses.push(interesse);
            }
        });
        // Consome a API (rodando localmente) para a alteração do usuario logado.
        const response = await fetch(`http://127.0.0.1:8080/api/usuarios/${usuarioLogado.id}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': buscarLocalmente(KEY_TOKEN)
            },
            body: JSON.stringify(usuarioLogado)
        });

        // Verifica a resposta da API - Sucesso (2XX) ou Falha (4XX)):
        if (response.ok) {
            const usuarioAlterado = await response.json();
            usuarioLogado = usuarioAlterado;
            salvarJsonLocalmente(KEY_USUARIO, usuarioLogado);
            alert('Dados alterados com sucesso!');
        } else {
            const erro = await response.json();
            alert(erro.mensagem);
        }
    } catch (error) {
        console.log(error);
        alert('Ocorreu um erro inesperado!');
    }

}