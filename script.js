
class Pessoa {
    constructor(nome, cpf, telefone) {
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
    }

    getInfo() {
        return `Nome: ${this.nome}, CPF: ${this.cpf}, Telefone: ${this.telefone}`;
    }
}


class Cliente extends Pessoa {
    constructor(nome, cpf, telefone, valorDevido) {
        super(nome, cpf, telefone); 
        this.valorDevido = valorDevido;
    }

    getInfo() {
        return `${super.getInfo()}, Valor Devido: R$ ${this.valorDevido}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {

    if (document.getElementById('registroForm')) {
        document.getElementById('registroForm').addEventListener('submit', (event) => {
            event.preventDefault();

            const nome = document.getElementById('nome').value;
            const cpf = document.getElementById('cpf').value;
            const telefone = document.getElementById('telefone').value;
            const valorDevido = document.getElementById('valorDevido').value;

            const cliente = new Cliente(nome, cpf, telefone, valorDevido);
            let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
            clientes.push(cliente);
            localStorage.setItem('clientes', JSON.stringify(clientes));

            alert('Cliente registrado com sucesso!');
            document.getElementById('registroForm').reset();
        });
    }

    if (document.getElementById('listaDevedores')) {
        const lista = document.getElementById('listaDevedores');
        let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

        lista.innerHTML = '';

        if (clientes.length === 0) {
            lista.innerHTML = '<li>Nenhum devedor registrado.</li>';
        } else {
            clientes.forEach((clienteData, index) => {
                const cliente = new Cliente(clienteData.nome, clienteData.cpf, clienteData.telefone, clienteData.valorDevido);
                const item = document.createElement('li');
                item.textContent = cliente.getInfo();

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remover';
                removeButton.className = 'removeButton';
                removeButton.addEventListener('click', () => {
                    clientes.splice(index, 1);
                    localStorage.setItem('clientes', JSON.stringify(clientes));
                    item.remove();
                });

                item.appendChild(removeButton);
                lista.appendChild(item);
            });
        }
    }

    // Voltar para a página de registro
    if (document.getElementById('voltarButton')) {
        document.getElementById('voltarButton').addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});
