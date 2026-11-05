const perguntasJogo = [
  { 
    kanji: "東京", 
    correta: 0, 
    opcoes: ["Tóquio", "Escola", "Casa", "Japão"] 
  },
  { 
    kanji: "家", 
    correta: 2, 
    opcoes: ["Japão", "Tóquio", "Casa", "Escola"] 
  },
  { 
    kanji: "学校", 
    correta: 1, 
    opcoes: ["Casa", "Escola", "Japão", "Tóquio"] 
  },
  { 
    kanji: "日本", 
    correta: 3, 
    opcoes: ["Escola", "Casa", "Tóquio", "Japão"] 
  }
];

let indiceAtual = 0;
let acertouAtual = false;

function verificarJogo(indiceEscolhido) {
  const feedback = document.getElementById("feedback-jogo");
  const perguntaAtual = perguntasJogo[indiceAtual];

  if (indiceEscolhido === perguntaAtual.correta) {
    feedback.textContent = "Correto! Clique em 'Próxima Pergunta'.";
    feedback.style.color = "green";
    acertouAtual = true;
  } else {
    feedback.textContent = "Incorreto. Tente novamente!";
    feedback.style.color = "red";
    acertouAtual = false;
  }
}

function proximaPergunta() {
  indiceAtual++;
  
  // Trava para não rodar infinitamente
  if (indiceAtual >= perguntasJogo.length) {
    document.getElementById("pergunta-kanji").textContent = "🏁 Fim!";
    document.querySelector(".instrucao-jogo").textContent = "Parabéns! Você completou todas as palavras do mini-jogo.";
    document.querySelector(".game-options").style.display = "none";
    document.getElementById("btn-proxima").style.display = "none";
    document.getElementById("feedback-jogo").textContent = "";
    return;
  }

  const proxima = perguntasJogo[indiceAtual];
  
  document.getElementById("pergunta-kanji").textContent = proxima.kanji;
  
  for (let i = 0; i < 4; i++) {
    document.getElementById(`btn-${i}`).textContent = proxima.opcoes[i];
  }

  document.getElementById("feedback-jogo").textContent = "";
  acertouAtual = false;
}

function verificarTextos() {
  const p1 = document.getElementById("trans-p1").value.toLowerCase();
  const p2 = document.getElementById("trans-p2").value.toLowerCase();
  const p3 = document.getElementById("trans-p3").value.toLowerCase();
  const p4 = document.getElementById("trans-p4").value.toLowerCase();
  const p5 = document.getElementById("trans-p5").value.toLowerCase();
  const feedback = document.getElementById("feedback-textos");

  let acertos = 0;

  if (p1.length > 5) acertos++;
  if (p2.length > 5) acertos++;
  if (p3.length > 5) acertos++;
  if (p4.length > 5) acertos++;
  if (p5.length > 5) acertos++;

  feedback.textContent = `Você preencheu ${acertos} de 5 textos.`;
  feedback.style.color = acertos === 5 ? "green" : "#d35400";
}

function verificarVerbos() {
  const q1 = document.getElementById("q1").value.toLowerCase();
  const q2 = document.getElementById("q2").value.toLowerCase();
  const q3 = document.getElementById("q3").value.toLowerCase();
  const q4 = document.getElementById("q4").value.toLowerCase();
  const feedback = document.getElementById("feedback-verbos");

  let acertos = 0;

  if (q1.includes("tóquio") && (q1.includes("vou") || q1.includes("ir"))) acertos++;
  if (q2.includes("casa") && (q2.includes("volto") || q2.includes("voltar") || q2.includes("casa"))) acertos++;
  if (q3.includes("escola") && (q3.includes("vou") || q3.includes("ir"))) acertos++;
  if (q4.includes("japão") && (q4.includes("volto") || q4.includes("voltar") || q4.includes("ir"))) acertos++;

  feedback.textContent = `Você acertou ${acertos} de 4 frases!`;
  feedback.style.color = acertos === 4 ? "green" : "#e74c3c";
}