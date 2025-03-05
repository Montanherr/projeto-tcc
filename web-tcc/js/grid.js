
// Função para buscar os dados da fake API (JSONPlaceholder)
async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        // Preencher a grid com os dados de usuários
        const userGrid = document.getElementById('userGrid');
        userGrid.innerHTML = ''; // Limpar a grid antes de adicionar novos elementos

        users.forEach(user => {
            // Criar um card para cada usuário
            const userCard = document.createElement('div');
            userCard.classList.add('card');
            
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
                <p>Telefone: ${user.phone}</p>
                <p>Website: <a href="http://${user.website}" target="_blank">${user.website}</a></p>
            `;

            // Adicionar o card à grid
            userGrid.appendChild(userCard);
        });

    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

// Chamar a função para carregar os dados ao carregar a página
fetchUsers();