// ======================================================
// Miraculous
// Cadastro de Personagens
// CRUD Completo
// ======================================================


// ========================================
// Variáveis globais
// ========================================

let personagens = [];

let personagemEditando = null;


// ========================================
// Elementos do HTML
// ========================================

const formulario =
  document.getElementById("formPersonagem");

const campoNome =
  document.getElementById("nome");

const campoIdade =
  document.getElementById("idade");

const campoIdentidade =
  document.getElementById("identidade");

const campoMiraculous =
  document.getElementById("miraculous");

const campoPoder =
  document.getElementById("poder");

const campoTipo =
  document.getElementById("tipo");

const listaPersonagens =
  document.getElementById("listaPersonagens");

const contador =
  document.getElementById("contador");

const tituloFormulario =
  document.getElementById("tituloFormulario");

const btnCadastrar =
  document.getElementById("btnCadastrar");

const btnCancelar =
  document.getElementById("btnCancelar");


// ========================================
// Inicialização
// ========================================

carregarPersonagens();

renderizarPersonagens();


// ========================================
// Eventos
// ========================================

formulario.addEventListener(
  "submit",
  salvarPersonagem
);

btnCancelar.addEventListener(
  "click",
  cancelarEdicao
);


// ========================================
// CREATE
// Cadastrar personagem
// ========================================

function cadastrarPersonagem() {

  const personagem = {

    id: Date.now(),

    nome: campoNome.value,

    idade: campoIdade.value,

    identidade: campoIdentidade.value,

    miraculous: campoMiraculous.value,

    poder: campoPoder.value,

    tipo: campoTipo.value

  };

  personagens.push(personagem);

  salvarPersonagens();

  renderizarPersonagens();

  limparFormulario();
}


// ========================================
// UPDATE
// Atualizar personagem
// ========================================

function atualizarPersonagem() {

  const indice = personagens.findIndex(
    function (personagem) {

      return personagem.id === personagemEditando;

    }
  );


  if (indice !== -1) {

    personagens[indice].nome =
      campoNome.value;

    personagens[indice].idade =
      campoIdade.value;

    personagens[indice].identidade =
      campoIdentidade.value;

    personagens[indice].miraculous =
      campoMiraculous.value;

    personagens[indice].poder =
      campoPoder.value;

    personagens[indice].tipo =
      campoTipo.value;
  }


  salvarPersonagens();

  renderizarPersonagens();

  limparFormulario();


  personagemEditando = null;


  tituloFormulario.textContent =
    "Novo Personagem";


  btnCadastrar.textContent =
    "Cadastrar Personagem";


  btnCancelar.hidden = true;
}


// ========================================
// Verificar cadastro ou atualização
// ========================================

function salvarPersonagem(evento) {

  evento.preventDefault();


  if (personagemEditando === null) {

    cadastrarPersonagem();

  } else {

    atualizarPersonagem();

  }
}


// ========================================
// READ
// Mostrar personagens
// ========================================

function renderizarPersonagens() {

  listaPersonagens.innerHTML = "";


  for (
    let i = 0;
    i < personagens.length;
    i++
  ) {

    const personagem = personagens[i];


    const card =
      document.createElement("div");


    card.classList.add("card");


    card.innerHTML = `

      <h3>🐞 ${personagem.nome}</h3>

      <p>
        <strong>Idade:</strong>
        ${personagem.idade} anos
      </p>

      <p>
        <strong>Identidade:</strong>
        ${personagem.identidade}
      </p>

      <p>
        <strong>Miraculous:</strong>
        ${personagem.miraculous}
      </p>

      <p>
        <strong>Poder:</strong>
        ${personagem.poder}
      </p>

      <p>
        <strong>Tipo:</strong>
        ${personagem.tipo}
      </p>

      <div class="botoes-card">

        <button
          class="btn-editar"
          onclick="editarPersonagem(${personagem.id})"
        >
          ✏️ Editar
        </button>

        <button
          class="btn-excluir"
          onclick="excluirPersonagem(${personagem.id})"
        >
          🗑️ Excluir
        </button>

      </div>

    `;


    listaPersonagens.appendChild(card);
  }


  atualizarContador();
}


// ========================================
// EDITAR
// Colocar os dados no formulário
// ========================================

function editarPersonagem(id) {

  const personagem = personagens.find(
    function (personagem) {

      return personagem.id === id;

    }
  );


  if (personagem) {

    campoNome.value =
      personagem.nome;

    campoIdade.value =
      personagem.idade;

    campoIdentidade.value =
      personagem.identidade;

    campoMiraculous.value =
      personagem.miraculous;

    campoPoder.value =
      personagem.poder;

    campoTipo.value =
      personagem.tipo;


    personagemEditando = id;


    tituloFormulario.textContent =
      "Editar Personagem";


    btnCadastrar.textContent =
      "Salvar Alterações";


    btnCancelar.hidden = false;


    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });
  }
}


// ========================================
// DELETE
// Excluir personagem
// ========================================

function excluirPersonagem(id) {

  const confirmar =
    confirm(
      "Tem certeza que deseja excluir este personagem?"
    );


  if (confirmar) {

    personagens = personagens.filter(
      function (personagem) {

        return personagem.id !== id;

      }
    );


    salvarPersonagens();

    renderizarPersonagens();
  }
}


// ========================================
// LocalStorage
// Salvar
// ========================================

function salvarPersonagens() {

  localStorage.setItem(
    "personagens",
    JSON.stringify(personagens)
  );
}


// ========================================
// LocalStorage
// Carregar
// ========================================

function carregarPersonagens() {

  const dados =
    localStorage.getItem("personagens");


  if (dados != null) {

    personagens = JSON.parse(dados);

  }
}


// ========================================
// Contador
// ========================================

function atualizarContador() {

  contador.textContent =
    "Total: " + personagens.length;
}


// ========================================
// Limpar formulário
// ========================================

function limparFormulario() {

  formulario.reset();
}


// ========================================
// Cancelar edição
// ========================================

function cancelarEdicao() {

  personagemEditando = null;


  limparFormulario();


  tituloFormulario.textContent =
    "Novo Personagem";


  btnCadastrar.textContent =
    "Cadastrar Personagem";


  btnCancelar.hidden = true;
}
