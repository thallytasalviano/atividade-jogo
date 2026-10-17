const formulario = document.getElementById("formPrincesa");
const lista = document.getElementById("listaPrincesas");
const botao = document.getElementById("botao");

let princesas = [];
let editando = null;

try {
  const dados = JSON.parse(localStorage.getItem("princesas"));
  princesas = Array.isArray(dados)
    ? dados.map(p => ({
        nome: p.nome || "",
        reino: p.reino || "",
        idade: p.idade || ""
      }))
    : [];
} catch (erro) {
  princesas = [];
}

function salvar() {
  try {
    localStorage.setItem("princesas", JSON.stringify(princesas));
    return true;
  } catch (erro) {
    alert("Não foi possível salvar os cadastros neste navegador.");
    return false;
  }
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

    const botoes = document.createElement("div");
    botoes.className = "botoes";

    const editar = document.createElement("button");
    editar.type = "button";
    editar.className = "editar";
    editar.textContent = "Editar";

    editar.addEventListener("click", () => {
      document.getElementById("nome").value = princesa.nome;
      document.getElementById("reino").value = princesa.reino;
      document.getElementById("idade").value = princesa.idade;
      editando = index;
      botao.textContent = "Salvar alterações";
      formulario.scrollIntoView({ behavior: "smooth" });
    });

    const excluir = document.createElement("button");
    excluir.type = "button";
    excluir.className = "excluir";
    excluir.textContent = "Excluir";

    excluir.addEventListener("click", () => {
      if (!confirm("Deseja excluir esta princesa?")) return;

      princesas.splice(index, 1);
      editando = null;
      formulario.reset();
      botao.textContent = "Cadastrar";

      if (salvar()) mostrarPrincesas();
    });

    botoes.append(editar, excluir);
    card.append(titulo, reino, idade, botoes);
    lista.appendChild(card);
  });

  if (princesas.length === 0) {
    const aviso = document.createElement("p");
    aviso.textContent = "Nenhuma princesa cadastrada ainda.";
    lista.appendChild(aviso);
  }
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const reino = document.getElementById("reino").value.trim();
  const idade = Number(document.getElementById("idade").value);

  if (!nome || !reino || !Number.isInteger(idade) || idade < 1) {
    alert("Preencha corretamente os três campos.");
    return;
  }

  const princesa = { nome, reino, idade };

  if (editando === null) {
    princesas.push(princesa);
  } else {
    princesas[editando] = princesa;
  }

  if (salvar()) {
    formulario.reset();
    editando = null;
    botao.textContent = "Cadastrar";
    mostrarPrincesas();
  }
});

mostrarPrincesas();
        
