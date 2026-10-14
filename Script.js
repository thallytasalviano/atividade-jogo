
const formulario = document.getElementById("formPrincesa");
const lista = document.getElementById("listaPrincesas");
const botao = document.getElementById("botao");

let princesas = JSON.parse(localStorage.getItem("princesas")) || [];
let editando = null;

mostrarPrincesas();

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const princesa = {
        nome: document.getElementById("nome").value,
        reino: document.getElementById("reino").value,
        idade: document.getElementById("idade").value,
        poder: document.getElementById("poder").value
    };

    if (editando !== null) {
        princesas[editando] = princesa;
        editando = null;
        botao.innerText = "Cadastrar";
    } else {
        princesas.push(princesa);
    }

    localStorage.setItem("princesas", JSON.stringify(princesas));

    formulario.reset();
    mostrarPrincesas();
});

function mostrarPrincesas() {
    lista.innerHTML = "";

    princesas.forEach(function(princesa, index) {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h2>👑 ${princesa.nome}</h2>
            <p><strong>Reino:</strong> ${princesa.reino}</p>
            <p><strong>Idade:</strong> ${princesa.idade}</p>
            <p><strong>✨ Poder:</strong> ${princesa.poder}</p>

            <div class="botoes">
                <button class="editar"
                    onclick="editarPrincesa(${index})">
                    Editar
                </button>

                <button class="excluir"
                    onclick="excluirPrincesa(${index})">
                    Excluir
                </button>

                <button onclick="jogarPrincesa(${index})">
                    Jogar
                </button>
            </div>
        `;

        lista.appendChild(card);
    });
}

function editarPrincesa(index) {
    const princesa = princesas[index];

    document.getElementById("nome").value = princesa.nome;
    document.getElementById("reino").value = princesa.reino;
    document.getElementById("idade").value = princesa.idade;
    document.getElementById("poder").value = princesa.poder;

    editando = index;
    botao.innerText = "Salvar alteração";

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function excluirPrincesa(index) {
    if (confirm("Deseja realmente excluir esta princesa?")) {
        princesas.splice(index, 1);
        localStorage.setItem("princesas", JSON.stringify(princesas));
        mostrarPrincesas();
    }
}

function jogarPrincesa(index) {
    localStorage.setItem(
        "princesaSelecionada",
        JSON.stringify(princesas[index])
    );

    window.location.href =
        "https://thallytasalviano.github.io/Cenario/";
}
