// =====================================================
// CRUD DE PERSONAGENS - MIRACULOUS
// =====================================================


// =====================================================
// VARIÁVEIS
// =====================================================

let personagens = [];

let personagemEditando = null;


// =====================================================
// PEGANDO ELEMENTOS DO HTML
// =====================================================

const formulario =
    document.getElementById("formPersonagem");

const nome =
    document.getElementById("nome");

const idade =
    document.getElementById("idade");

const identidade =
    document.getElementById("identidade");

const miraculous =
    document.getElementById("miraculous");

const poder =
    document.getElementById("poder");

const tipo =
    document.getElementById("tipo");

const listaPersonagens =
    document.getElementById("listaPersonagens");

const contador =
    document.getElementById("contador");

const btnSalvar =
    document.getElementById("btnSalvar");

const btnCancelar =
    document.getElementById("btnCancelar");

const tituloFormulario =
    document.getElementById("tituloFormulario");


// =====================================================
// CARREGAR PERSONAGENS
// =====================================================

function carregarPersonagens() {

    const dados =
        localStorage.getItem("personagens");

    if (dados) {

        personagens = JSON.parse(dados);

    } else {

        personagens = [];
    }
}


// =====================================================
// SALVAR PERSONAGENS
// =====================================================

function salvarNoLocalStorage() {

    localStorage.setItem(
        "personagens",
        JSON.stringify(personagens)
    );
}


// =====================================================
// CREATE
// =====================================================

function criarPersonagem(evento) {

    evento.preventDefault();


    const novoPersonagem = {

        id: Date.now(),

        nome: nome.value.trim(),

        idade: idade.value,

        identidade: identidade.value.trim(),

        miraculous: miraculous.value,

        poder: poder.value.trim(),

        tipo: tipo.value

    };


    personagens.push(novoPersonagem);


    salvarNoLocalStorage();

    mostrarPersonagens();

    limparFormulario();
}


// =====================================================
// READ
// =====================================================

function mostrarPersonagens() {

    listaPersonagens.innerHTML = "";


    // Se não tiver personagem
    if (personagens.length === 0) {

        listaPersonagens.innerHTML = `
            <div class="sem-personagens">
                Nenhum personagem cadastrado.
            </div>
        `;

        atualizarContador();

        return;
    }


    // Criar um card para cada personagem
    personagens.forEach(function (personagem) {

        const card =
            document.createElement("div");

        card.classList.add("card");


        // Avatar
        let avatar = "🐞";

        if (personagem.tipo === "Vilão") {

            avatar = "😈";

        } else if (personagem.tipo === "Aliado") {

            avatar = "🤝";

        }


        // HTML do card
        card.innerHTML = `

            <div class="card-cabecalho">

                <div class="avatar">
                    ${avatar}
                </div>

                <div>

                    <h3>
                        ${escaparHTML(personagem.nome)}
                    </h3>

                    <span class="tipo">
                        ${escaparHTML(personagem.tipo)}
                    </span>

                </div>

            </div>


            <div class="parametros">

                <p>
                    <strong>🎂 Idade:</strong>
                    ${escaparHTML(personagem.idade)}
                    anos
                </p>

                <p>
                    <strong>👤 Identidade:</strong>
