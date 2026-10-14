const formulario = document.getElementById("formPrincesa");
const lista = document.getElementById("listaPrincesas");
const botao = document.getElementById("botao");

let princesas = JSON.parse(localStorage.getItem("princesas")) || [];
let editando = null;

function salvarPrincesas() {
    localStorage.setItem("princesas", JSON.stringify(princesas));
}

function mostrarPrincesas() {
    lista.replaceChildren();

    princesas.forEach((princesa, index) => {
        const card = document.createElement("article");
        card.className = "card";

        const titulo = document.createElement("h2");
        titulo.textContent = "👑 " + princesa.nome;

        const reino = document.createElement("p");
        reino.textContent = "Reino: " + princesa.reino;

        const idade = document.createElement("p");
        idade.textContent = "Idade: " + princesa.idade;

        const poder = document.createElement("p");
        poder.textContent = "Poder: " + princesa.poder;

        const botoes = document.createElement("div");
        botoes.className = "botoes";

        const editar = document.createElement("button");
        editar.type = "button";
        editar.className = "editar";
        editar.textContent = "Editar";
        editar.addEventListener("click", () => editarPrincesa(index));

        const excluir = document.createElement("button");
        excluir.type = "button";
        excluir.className = "excluir";
        excluir.textContent = "Excluir";
        excluir.addEventListener("click", () => excluirPrincesa(index));

        const jogar = document.createElement("button");
        jogar.type = "button";
        jogar.className = "jogar";
        jogar.textContent = "Jogar";
        jogar.addEventListener("click", () => jogarPrincesa(index));

        botoes.append(editar, excluir, jogar);
        card.append(titulo, reino, idade, poder, botoes);
        lista.appendChild(card);
    });
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const princesa = {
        nome: document.getElementById("nome
