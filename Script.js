
const formulario = document.getElementById("formPrincesa");
const lista = document.getElementById("listaPrincesas");
const botao = document.getElementById("botao");

let princesas = [];

try {
    princesas = JSON.parse(
        localStorage.getItem("princesas")
    ) || [];
} catch (erro) {
    princesas = [];
}

// Mantém somente nome, reino e idade
princesas = princesas.map((princesa) => ({
    nome: princesa.nome || "",
    reino: princesa.reino || "",
    idade: princesa.idade || ""
}));

let editando = null;

function salvarPrincesas() {
    localStorage.setItem(
        "princesas",
        JSON.stringify(princesas)
    );
}

function mostrarPrincesas() {
    lista.replaceChildren();

    if (princesas.length === 0) {
        const aviso = document.createElement("p");
        aviso.textContent =
            "Nenhuma princesa cadastrada ainda. 💗";

        lista.appendChild(aviso);
        return;
    }

    princesas.forEach((princesa, index) => {
        const card = document.createElement("article");
        card.className = "card";

        const titulo = document.createElement("h2");
        titulo.textContent = "👑 " + princesa.nome;

        const reino = document.createElement("p");
        reino.textContent = "Reino: " + princesa.reino;

        const idade = document.createElement("p");
        idade.textContent = "Idade: " + princesa.idade;

        const botoes = document.createElement("div");
        botoes.className = "botoes";

        const editar = document.createElement("button");
        editar.type = "button";
        editar.className = "editar";
        editar.textContent = "Editar";

        editar.addEventListener("click", () => {
            editarPrincesa(index);
        });

        const excluir = document.createElement("button");
        excluir.type = "button";
        excluir.className = "excluir";
        excluir.textContent = "Excluir";

        excluir.addEventListener("click", () => {
            excluirPrincesa(index);
        });

        const jogar = document.createElement("button");
        jogar.type = "button";
        jogar.className = "jogar";
        jogar.textContent = "Jogar";

        jogar.addEventListener("click", () => {
            localStorage.setItem(
                "princesaEscolhida",
                princesa.nome
            );

            window.location.href =
                "../Cenario-main/index.html";
        });

        botoes.append(editar, excluir, jogar);

        card.append(
            titulo,
            reino,
            idade,
            botoes
        );

        lista.appendChild(card);
    });
}

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const princesa = {
        nome: document.getElementById("nome").value.trim(),
        reino: document.getElementById("reino").value.trim(),
        idade: Number(
            document.getElementById("idade").value
        )
    };

    if (
        !princesa.nome ||
        !princesa.reino ||
        !Number.isInteger(princesa.idade) ||
        princesa.idade < 1
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    if (editando === null) {
        princesas.push(princesa);
    } else {
        princesas[editando] = princesa;
    }

    salvarPrincesas();
    mostrarPrincesas();

    formulario.reset();
    editando = null;
    botao.textContent = "Cadastrar";
});

function editarPrincesa(index) {
    const princesa = princesas[index];

    document.getElementById("nome").value =
        princesa.nome;

    document.getElementById("reino").value =
        princesa.reino;

    document.getElementById("idade").value =
        princesa.idade;

    editando = index;
    botao.textContent = "Salvar alterações";

    formulario.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function excluirPrincesa(index) {
    const confirmar = confirm(
        `Deseja excluir ${princesas[index].nome}?`
    );

    if (!confirmar) return;

    princesas.splice(index, 1);

    if (editando === index) {
        editando = null;
        formulario.reset();
        botao.textContent = "Cadastrar";
    } else if (
        editando !== null &&
        editando > index
    ) {
        editando--;
    }

    salvarPrincesas();
    mostrarPrincesas();
}

// Salva os registros sem o campo Poder
salvarPrincesas();
mostrarPrincesas();
