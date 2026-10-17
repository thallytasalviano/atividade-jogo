const formulario = document.getElementById("formPrincesa");
const lista = document.getElementById("listaPrincesas");
const botao = document.getElementById("botao");

const CHAVE = "princesas";
let princesas = [];
let editando = null;

try {
  const dados = JSON.parse(localStorage.getItem(CHAVE));
  princesas = Array.isArray(dados) ? dados : [];
} catch (erro) {
  princesas = [];
}

function salvarPrincesas() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(princesas));
  } catch (erro) {
    alert("Não foi possível salvar os dados neste navegador.");
  }
}

function mostrarPrincesas() {
  lista.replaceChildren();

  if (princesas.length === 0) {
    const aviso = document.createElement("p");
    aviso.textContent = "Nenhuma princesa cadastrada ainda.";
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

    jogar.addEventListener("click", () => {
      localStorage.setItem("princesaEscolhida", princesa.nome);

      // Coloque aqui o link publicado do repositório Cenario-main.
      window.location.href =
        "COLE_AQUI_O_LINK_PUBLICADO_DO_CENARIO";
    });

    botoes.append(editar, excluir, jogar);
    card.append(titulo, reino, idade, poder, botoes);
    lista.appendChild(card);
  });
}

formulario.addEventListener("submit", function(evento) {
  evento.preventDefault();

  const princesa = {
    nome: document.getElementById("nome").value.trim(),
    reino: document.getElementById("reino").value.trim(),
    idade: Number(document.getElementById("idade").value),
    poder: document.getElementById("poder").value.trim()
  };

  if (
    !princesa.nome ||
    !princesa.reino ||
    !princesa.idade ||
    !princesa.poder
  ) {
    alert("Preencha todos os campos.");
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

  document.getElementById("nome").value = princesa.nome;
  document.getElementById("reino").value = princesa.reino;
  document.getElementById("idade").value = princesa.idade;
  document.getElementById("poder").value = princesa.poder;

  editando = index;
  botao.textContent = "Salvar alterações";

  formulario.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function excluirPrincesa(index) {
  if (!confirm(`Deseja excluir ${princesas[index].nome}?`)) {
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

mostrarPrincesas();
