// Seleciona o formulário
const contatoFormulario = document.querySelector('.contato__formulario');

// Adiciona o evento de envio ao formulário
contatoFormulario.addEventListener('submit', (event) => {
    // Previne o comportamento padrão do formulário
    event.preventDefault();

    // Seleciona os campos do formulário
    const nomeInput = document.querySelector('input[name="nome"]');
    const emailInput = document.querySelector('input[name="email"]');
    const mensagemInput = document.querySelector('textarea[name="mensagem"]');

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const mensagem = mensagemInput.value.trim();

    // Limpa mensagens de erro anteriores
    limparErros([nomeInput, emailInput, mensagemInput]);

    // Validação de campos
    const erros = [];

    if (!nome) {
        erros.push({ campo: nomeInput, mensagem: 'O campo nome é obrigatório.' });
    }

    if (!email) {
        erros.push({ campo: emailInput, mensagem: 'O campo e-mail é obrigatório.' });
    } else if (!validarEmail(email)) {
        erros.push({ campo: emailInput, mensagem: 'Por favor, insira um e-mail válido.' });
    }

    if (!mensagem) {
        erros.push({ campo: mensagemInput, mensagem: 'O campo mensagem é obrigatório.' });
    }

    // Se houver erros, exiba-os e interrompa o envio
    if (erros.length > 0) {
        exibirErros(erros);
        return;
    }

    // Se tudo estiver válido, exibe uma mensagem de sucesso
    exibirMensagemSucesso('Obrigado! Sua mensagem foi enviada com sucesso.');

    // Limpa o formulário após o envio
    contatoFormulario.reset();
});

// Função para validar o formato do e-mail
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Função para exibir mensagens de erro ao lado dos campos
function exibirErros(erros) {
    erros.forEach(({ campo, mensagem }) => {
        const erroMensagem = document.createElement('span');
        erroMensagem.className = 'erro-mensagem';
        erroMensagem.textContent = mensagem;
        erroMensagem.style.color = 'red';
        erroMensagem.style.fontSize = '0.9rem';
        erroMensagem.style.marginTop = '5px';
        campo.parentElement.appendChild(erroMensagem);
    });
}

// Função para limpar mensagens de erro anteriores
function limparErros(campos) {
    campos.forEach((campo) => {
        const mensagensErro = campo.parentElement.querySelectorAll('.erro-mensagem');
        mensagensErro.forEach((mensagem) => mensagem.remove());
    });
}

// Função para exibir uma mensagem de sucesso
function exibirMensagemSucesso(mensagem) {
    const sucessoMensagem = document.createElement('div');
    sucessoMensagem.className = 'sucesso-mensagem';
    sucessoMensagem.textContent = mensagem;
    sucessoMensagem.style.color = 'green';
    sucessoMensagem.style.fontSize = '1rem';
    sucessoMensagem.style.marginTop = '10px';
    sucessoMensagem.style.textAlign = 'center';

    // Insere a mensagem antes do formulário
    contatoFormulario.parentElement.insertBefore(sucessoMensagem, contatoFormulario);

    // Remove a mensagem de sucesso após 5 segundos
    setTimeout(() => sucessoMensagem.remove(), 5000);
}
