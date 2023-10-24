const palavraAleatoria = "games";
const palavraSplitted = palavraAleatoria.split("");
const letrasReveladas = Array(palavraAleatoria.length).fill("_");

let tentativas = 5;
let letrasUtilizadas = [];

const palavraElement = document.getElementById("palavra");
const tentativasElement = document.getElementById("tentativas");
const letrasUtilizadasElement = document.getElementById("letras-utilizadas");
const inputLetra = document.getElementById("input-letra");
const btnTentar = document.getElementById("btn-tentar");

function atualizarTela() {
  palavraElement.textContent = letrasReveladas.join(" ");
  tentativasElement.textContent = `Tentativas restantes: ${tentativas}`;
  letrasUtilizadasElement.textContent = `Letras utilizadas: ${letrasUtilizadas.join(
    ", "
  )}`;
}

function encontrarLetra(letra) {
  if (tentativas <= 0) {
    alert("Você perdeu o jogo.");
    return;
  }

  if (!letra.match(/[a-zA-Z]/)) {
    alert("Por favor, digite uma letra válida.");
    return;
  }

  if (letrasUtilizadas.includes(letra)) {
    alert("Você já tentou esta letra.");
    return;
  }

  letrasUtilizadas.push(letra);

  let encontrada = false;
  for (let index = 0; index < palavraSplitted.length; index++) {
    const element = palavraSplitted[index];
    if (element === letra) {
      letrasReveladas[index] = letra;
      encontrada = true;
    }
  }

  if (!encontrada) {
    tentativas--;
  }

  atualizarTela();

  if (letrasReveladas.join("") === palavraAleatoria) {
    alert("Parabéns! Você ganhou o jogo.");
  }

  if (tentativas <= 0) {
    alert("Você perdeu o jogo.");
  }
}

btnTentar.addEventListener("click", function () {
  const letraDigitada = inputLetra.value.toLowerCase();
  inputLetra.value = "";
  encontrarLetra(letraDigitada);
});

atualizarTela();

const tecladoVirtual = "abcdefghijklmnopqrstuvwxyz";
const tecladoElement = document.createElement("div");
tecladoElement.id = "teclado";

for (let i = 0; i < tecladoVirtual.length; i++) {
  const letra = tecladoVirtual[i];
  const letraButton = document.createElement("button");
  letraButton.textContent = letra;
  letraButton.addEventListener("click", function () {
    encontrarLetra(letra);
  });
  tecladoElement.appendChild(letraButton);
}

document.body.appendChild(tecladoElement);
