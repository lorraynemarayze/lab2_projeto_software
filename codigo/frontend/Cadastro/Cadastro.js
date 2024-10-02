document.getElementById('Cadastrar').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        RG: document.getElementById('RG').value,
        endereco: document.getElementById('endereco').value
    };

    try {
        const response = await fetch('http://seu-backend-url.com/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('message').textContent = 'Cadastro realizado com sucesso!';
            console.log('Dados do formulário:', data);
        } else {
            document.getElementById('message').textContent = 'Erro ao realizar cadastro.';
            console.error('Erro ao realizar cadastro:', response.statusText);
        }
    } catch (error) {
        document.getElementById('message').textContent = 'Erro ao realizar cadastro.';
        console.error('Erro ao realizar cadastro:', error);
    }
});