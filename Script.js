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
