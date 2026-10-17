
const formulario = document.getElementById("formPrincesa");
const lista = document.getElementById("listaPrincesas");
const botao = document.getElementById("botao");

let princesas = [];
let editando = null;

try {
    const dados = localStorage.getItem("princesas");
    princesas = dados ? JSON.parse(dados) : [];

    if (!Array.isArray(princesas)) {
        princesas = [];
    }
} catch (erro) {
    princesas = [];
}

princesas = princesas.map(p => ({
    nome: p.nome || "",
    reino: p.reino || "",
    idade: p.idade || ""
}));

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
        aviso.textContent = "Nenhuma princesa cadastrada ainda. 💗";
        lista.appendChild(aviso);
        return;
    }

    princesas.forEach((p, index) => {
        const card = document.createElement("article");
        card.className = "card";

        const titulo = document.createElement("h2");
        titulo.textContent = "👑 " + p.nome;

        const reino = document.createElement("p");
        reino.textContent = "Reino: " + p.reino;

        const idade = document.createElement("p");
        idade.textContent = "Idade: " + p.idade;

        const botoes = document.createElement("div");
        botoes.className = "botoes";

        const editar = document.createElement("button");
        editar.type = "button";
        editar.className = "editar";
        editar.textContent = "Editar";
        editar.onclick = () => editarPrincesa(index);

        const excluir = document.createElement("button");
        excluir.type = "button";
        excluir.className = "excluir";
        excluir.textContent = "Excluir";
        excluir.onclick = () => excluirPrincesa(index);

        const jogar = document.createElement("button");
        jogar.type = "button";
        jogar.className = "jogar";
        jogar.textContent = "Jogar";

        jogar.onclick = () => {
            localStorage.setItem("princesaEscolhida", p.nome);

            // Altere este caminho se o cenário estiver
            // em outro repositório do GitHub.
            window.location.href = "../Cenario-main/index.html";
        };

        botoes.append(editar, excluir, jogar);
        card.append(titulo, reino, idade, botoes);
        lista.appendChild(card);
    });
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const reino = document.getElementById("reino").value.trim();
    const idadeTexto = document.getElementById("idade").value.trim();
    const idade = Number(idadeTexto);

    if (
        nome === "" ||
        reino === "" ||
        idadeTexto === "" ||
        !Number.isInteger(idade) ||
        idade < 1
    ) {
        alert("Preencha nome, reino e idade corretamente!");
        return;
    }

    const princesa = { nome, reino, idade };

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
    const p = princesas[index];

    document.getElementById("nome").value = p.nome;
    document.getElementById("reino").value = p.reino;
    document.getElementById("idade").value = p.idade;

    editando = index;
    botao.textContent = "Salvar alterações";

    formulario.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function excluirPrincesa(index) {
    if (!confirm("Deseja excluir " + princesas[index].nome + "?")) {
        return;
    }

    princesas.splice(index, 1);

    if (editando === index) {
        editando = null;
        formulario.reset();
        botao.textContent = "Cadastrar";
    } else if (editando !== null && editando > index) {
        editando--;
    }

    salvarPrincesas();
    mostrarPrincesas();
}

salvarPrincesas();
mostrarPrincesas();
