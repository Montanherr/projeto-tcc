document.getElementById("formCadastro").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio do formulário, para validação

    // Pegando os valores dos campos
    const email = document.getElementById("email").value;
    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("senha").value;
    const confirmacaoSenha = document.getElementById("confirmacaoSenha").value;
    const sexo = document.querySelector('input[name="sexo"]:checked');

    // Validações
    if (!email || !nome || !senha || !confirmacaoSenha || !sexo) {
        alert("Todos os campos devem ser preenchidos.");
        return;
    }

    if (senha !== confirmacaoSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    // Se tudo estiver certo, você pode realizar a ação, por exemplo, salvar os dados ou enviar para um servidor
    alert("Cadastro realizado com sucesso!");
});


