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


if (personagens.length === 0) {

  criarPersonagensIniciais();

}


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
// Personagens iniciais
// ========================================

function criarPersonagensIniciais() {

  personagens = [

    {
      id: 1,

      nome: "Ladybug",

      idade: 15,

      identidade: "Marinette Dupain-Cheng",

      miraculous: "Joaninha",

      poder: "Criar objetos",

      tipo: "Heroína",

      imagem: "img/ladybug.jpg"
    },


    {
      id: 2,

      nome: "Cat Noir",

      idade: 15,

      identidade: "Adrien Agreste",

      miraculous: "Gato",

      poder: "Destruição",

      tipo: "Herói",

      imagem: "img/catnoir.jpg"
    },


    {
      id: 3,

      nome: "Rena Rouge",

      idade: 15,

      identidade: "Alya Césaire",

      miraculous: "Raposa",

      poder: "Ilusão",

      tipo: "Heroína",

      imagem: "img/renarouge.jpg"
    },


    {
      id: 4,

      nome: "Carapace",

      idade: 16,

      identidade: "Nino Lahiffe",

      miraculous: "Tartaruga",

      poder: "Proteção",

      tipo: "Herói",

      imagem: "img/carapace.jpg"
    },


    {
      id: 5,

      nome: "Queen Bee",

      idade: 15,

      identidade: "Chloé Bourgeois",

      miraculous: "Abelha",

      poder: "Paralisia",

      tipo: "Heroína",

      imagem: "img/queenbee.jpg"
    },


    {
      id: 6,

      nome: "Hawk Moth",

      idade: "Desconhecida",

      identidade: "Gabriel Agreste",

      miraculous: "Borboleta",

      poder: "Akumatizar",

      tipo: "Vilão",

      imagem: "img/hawkmoth.jpg"
    }

  ];


  salvarPersonagens();
}


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

    tipo: campoTipo.value,

    imagem: "img/ladybug.jpg"

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

  const indice =
    personagens.findIndex(
      function (personagem) {

        return personagem.id ===
          personagemEditando;

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
    "👤 Novo Personagem";


  btnCadastrar.textContent =
    "🐞 Cadastrar Personagem";


  btnCancelar.hidden = true;
}


// ========================================
// Cadastrar ou atualizar
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

    const personagem =
      personagens[i];


    const card =
      document.createElement("div");


    card.classList.add("card");


    card.innerHTML = `

      <div class="card-conteudo">

        <img
          src="${personagem.imagem}"
          alt="${personagem.nome}"
        >


        <div class="informacoes">

          <h3>
            ${personagem.nome}
          </h3>


          <p>
            🎂 <strong>Idade:</strong>
            ${personagem.idade} anos
          </p>


          <p>
            👤 <strong>Identidade:</strong>
            ${personagem.identidade}
          </p>


          <p>
            🐞 <strong>Miraculous:</strong>
            ${personagem.miraculous}
          </p>


          <p>
            ⚡ <strong>Poder:</strong>
            ${personagem.poder}
          </p>


          <p>
            🛡️ <strong>Tipo:</strong>
            ${personagem.tipo}
          </p>

        </div>

      </div>


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
// UPDATE
// Editar personagem
// ========================================

function editarPersonagem(id) {

  const personagem =
    personagens.find(
      function (personagem) {

        return personagem.id === id;

      }
    );


  if (personagem)
