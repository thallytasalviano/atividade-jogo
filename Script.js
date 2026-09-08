let princesas = JSON.parse(localStorage.getItem("princesas")) || [];

function mostrar() {

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    princesas.forEach((princesa, index) => {

        lista.innerHTML += `
            <p>
                 ${princesa}

                <button onclick="editar(${index})">
                    Editar
                </button>

                <button onclick="excluir(${index})">
                    Excluir
                </button>
            </p>
        `;
    });
}


function cadastrar() {

    let nome = document.getElementById("nome").value;

    if (nome === "") {
        alert("Digite o nome da princesa!");
        return;
    }

    princesas.push(nome);

    localStorage.setItem(
        "princesas",
        JSON.stringify(princesas)
    );

    document.getElementById("nome").value = "";

    mostrar();
}


function editar(index) {

    let novoNome = prompt(
        "Digite o novo nome:",
        princesas[index]
    );

    if (novoNome) {

        princesas[index] = novoNome;

        localStorage.setItem(
            "princesas",
            JSON.stringify(princesas)
        );

        mostrar();
    }
}


function excluir(index) {

    princesas.splice(index, 1);

    localStorage.setItem(
        "princesas",
        JSON.stringify(princesas)
    );

    mostrar();
}


mostrar();
