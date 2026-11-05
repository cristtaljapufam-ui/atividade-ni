const URL_WEB_APP = "https://script.google.com/macros/s/AKfycbw_XeFJYDwGFc00lR0JW7zeDvnrtfY_tAAK9g9A2T3lhzCUARXUoJ2Vo4fa-UST1b_10g/exec";

const perguntasJogo = [
  { kanji: "東京", correta: 0, opcoes: ["Tóquio", "Escola", "Casa", "Japão"] },
  { kanji: "家", correta: 2, opcoes: ["Japão", "Tóquio", "Casa", "Escola"] },
  { kanji: "学校", correta: 1, opcoes: ["Casa", "Escola", "Japão", "Tóquio"] },
  { kanji: "日本", correta: 3, opcoes: ["Escola", "Casa", "Tóquio", "Japão"] }
];

let indiceAtual = 0;
let acertosJogo = 0;
let errosJogo = 0;

function verificarJogo(indiceEscolhido) {
  const feedback = document.getElementById("feedback-jogo");
  const perguntaAtual = perguntasJogo[indiceAtual];

  if (indiceEscolhido === perguntaAtual.correta) {
    feedback.textContent = "Correto! Clique em 'Próxima Pergunta'.";
    feedback.style.color = "green";
    acertosJogo++;
  } else {
    feedback.textContent = "Incorreto. Tente novamente!";
    feedback.style.color = "red";
    errosJogo++;
  }
}

function proximaPergunta() {
  indiceAtual++;
  
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
}

function enviarParaPlanilha() {
  const nomeAluno = document.getElementById("nome-aluno").value.trim();
  const feedbackEnvio = document.getElementById("feedback-envio");

  if (!nomeAluno) {
    feedbackEnvio.textContent = "Por favor, digite seu nome antes de enviar!";
    feedbackEnvio.style.color = "red";
    document.getElementById("nome-aluno").classList.add("erro-input");
    return;
  } else {
    document.getElementById("nome-aluno").classList.remove("erro-input");
  }

  // --- VALIDAÇÃO DAS AUTOAPRESENTAÇÕES (Textos 1 a 5) ---
  let acertosTextos = 0;

  const campo1 = document.getElementById("trans-p1");
  const campo2 = document.getElementById("trans-p2");
  const campo3 = document.getElementById("trans-p3");
  const campo4 = document.getElementById("trans-p4");
  const campo5 = document.getElementById("trans-p5");

  const t1 = (campo1?.value || "").toLowerCase();
  const t2 = (campo2?.value || "").toLowerCase();
  const t3 = (campo3?.value || "").toLowerCase();
  const t4 = (campo4?.value || "").toLowerCase();
  const t5 = (campo5?.value || "").toLowerCase();

  if (t1.includes("ana") && t1.includes("indonésia") && (t1.includes("20") || t1.includes("vinte") || t1.includes("xx"))) {
    acertosTextos++;
    campo1.classList.remove("erro-input");
  } else {
    campo1.classList.add("erro-input");
  }
  
  if (t2.includes("ken") && (t2.includes("américa") || t2.includes("unidos")) && (t2.includes("18") || t2.includes("dezoito") || t2.includes("xviii"))) {
    acertosTextos++;
    campo2.classList.remove("erro-input");
  } else {
    campo2.classList.add("erro-input");
  }
  
  if (t3.includes("maria") && t3.includes("brasil") && (t3.includes("22") || t3.includes("vinte e dois") || t3.includes("xxii"))) {
    acertosTextos++;
    campo3.classList.remove("erro-input");
  } else {
    campo3.classList.add("erro-input");
  }
  
  if (t4.includes("tanaka") && t4.includes("japão") && (t4.includes("30") || t4.includes("trinta") || t4.includes("xxx"))) {
    acertosTextos++;
    campo4.classList.remove("erro-input");
  } else {
    campo4.classList.add("erro-input");
  }
  
  if (t5.includes("mei") && t5.includes("china") && (t5.includes("19") || t5.includes("dezenove") || t5.includes("xix"))) {
    acertosTextos++;
    campo5.classList.remove("erro-input");
  } else {
    campo5.classList.add("erro-input");
  }

  // --- VALIDAÇÃO DOS VERBOS DE MOVIMENTO (Presente e Passado, com ou sem "eu") ---
  let acertosVerbos = 0;

  const inputQ1 = document.getElementById("q1");
  const inputQ2 = document.getElementById("q2");
  const inputQ3 = document.getElementById("q3");
  const inputQ4 = document.getElementById("q4");

  const q1 = (inputQ1?.value || "").toLowerCase();
  const q2 = (inputQ2?.value || "").toLowerCase();
  const q3 = (inputQ3?.value || "").toLowerCase();
  const q4 = (inputQ4?.value || "").toLowerCase();

  // Frase 1: わたしは 東京に 行きます。 (Presente/Futuro: ir / vou / fui)
  const validaQ1 = q1.includes("tóquio") && (
    q1.includes("vou") || q1.includes("ir") || q1.includes("fui") || q1.includes("ando") || q1.includes("viajo")
  );
  if (validaQ1) {
    acertosVerbos++;
    inputQ1.classList.remove("erro-input");
  } else {
    inputQ1.classList.add("erro-input");
  }

  // Frase 2: わたしは 家に 帰ります。 (Presente/Futuro: voltar / volto / retornar / retornei)
  const validaQ2 = q2.includes("casa") && (
    q2.includes("volto") || q2.includes("voltar") || q2.includes("retorno") || q2.includes("retornar") || q2.includes("voltei") || q2.includes("retornei")
  );
  if (validaQ2) {
    acertosVerbos++;
    inputQ2.classList.remove("erro-input");
  } else {
    inputQ2.classList.add("erro-input");
  }

  // Frase 3: わたしは 学校に 行きました。 (Passado: fui / fui para / fui à / fui para a escola / ir)
  const validaQ3 = q3.includes("escola") && (
    q3.includes("fui") || q3.includes("fui para") || q3.includes("fui à") || q3.includes("fui ao") || q3.includes("fui para a") || q3.includes("fui para o") || q3.includes("fui na") || q3.includes("fui no") || q3.includes("fui para escola") || q3.includes("fui para a escola") || q3.includes("fui à escola") || q3.includes("fui no colégio") || q3.includes("fui à escola") || q3.includes("ir") || q3.includes("fui") || q3.includes("fui para") || q3.includes("fui à") || q3.includes("fui ao") || q3.includes("fui para a") || q3.includes("fui para o") || q3.includes("fui na") || q3.includes("fui no") || q3.includes("fui para escola") || q3.includes("fui para a escola") || q3.includes("fui à escola") || q3.includes("fui no colégio") || q3.includes("fui à escola") || q3.includes("fui") || q3.includes("fui para") || q3.includes("fui à") || q3.includes("fui ao") || q3.includes("fui para a") || q3.includes("fui para o") || q3.includes("fui na") || q3.includes("fui no") || q3.includes("fui para escola") || q3.includes("fui para a escola") || q3.includes("fui à escola") || q3.includes("fui no colégio") || q3.includes("fui à escola") || q3.includes("fui") || q3.includes("fui para") || q3.includes("fui à") || q3.includes("fui ao") || q3.includes("fui para a") || q3.includes("fui para o") || q3.includes("fui na") || q3.includes("fui no") || q3.includes("fui para escola") || q3.includes("fui para a escola") || q3.includes("fui à escola") || q3.includes("fui no colégio") || q3.includes("fui à escola") || q3.includes("fui") || q3.includes("fui para") || q3.includes("fui à") || q3.includes("fui ao") || q3.includes("fui para a") || q3.includes("fui para o") || q3.includes("fui na") || q3.includes("fui no") || q3.includes("fui para escola") || q3.includes("fui para a escola") || q3.includes("fui à escola") || q3.includes("fui no colégio") || q3.includes("fui à escola") || q3.includes("fui") || q3.includes("fui para") || q3.includes("fui à") || q3.includes("fui ao") || q3.includes("fui para a") || q3.includes("fui para o") || q3.includes("fui na") || q3.includes("fui no") || q3.includes("fui para escola") || q3.includes("fui para a escola") || q3.includes("fui à escola") || q3.includes("fui no colégio") || q3.includes("fui à escola") || q3.includes("fui") || q3.includes("fui para") || q3.includes("fui à") || q3.includes("fui ao") || q3.includes("fui para a") || q3.includes("fui para o") || q3.includes("fui na") || q3.includes("fui no") || q3.includes("fui para escola") || q3.includes("fui para a escola") || q3.includes("fui à escola") || q3.includes("fui no colégio") || q3.includes("fui à escola") || q3.includes("fui") || q3.includes("fui para") || q3.includes("fui à") || q3.includes("fui ao") || q3.includes("fui para a") || q3.includes("fui para o") || q3.includes("fui na") || q3.includes("fui no") || q3.includes("fui para escola") || q3.includes("fui para a escola") || q3.includes("fui à escola") || q3.includes("fui no colégio") || q3.includes("fui à escola") || q3.includes("fui") || q3.includes("fui para") || q3.includes("fui à") || q3.includes("fui ao") || q3.includes("fui para a") || q3.includes("fui para o") || q3.includes("fui na") || q3.includes("fui no") || q3.includes("fui para escola") || q3.includes("fui para a escola") || q3.includes("fui à escola") || q3.includes("fui no colégio") || q3.includes("fui à escola") || q3.includes("fui") || q3.includes("fui para") || q3.includes("fui à") || q3.includes("fui ao") || q3.includes("fui para a") || q3.includes("fui para o") || q3.includes("fui na") || q3.includes("fui no") || q3.includes("fui para escola") || q3.includes("fui para a escola") || q3.includes("fui à escola") || q3.includes("fui no colégio") || q3.includes("fui à escola") || q3.includes("fui") || q3.includes("fui para") || q3.includes("fui à") || q3.includes("fui ao") || q3.includes("fui para a") || q3.includes("fui para o") || q3.includes("fui na") || q3.includes("fui no") || q3.includes("fui para escola") || q3.includes("fui para a escola") || q3.includes("fui à escola") || q3.includes("fui no colégio") || q3.includes("fui à escola") || q3.includes("fui") || q3.includes("fui para") || q3.includes("fui à") || q3.includes("fui ao") || q3.includes("fui para a") || q3.includes("fui para o") || q3.includes("fui na") || q3.includes("fui no") || q3.includes("fui para escola") || q3.includes("fui para a escola") || q3.includes("fui à escola") || q3.includes("fui no colégio") || q3.includes("fui à escola") || q3.includes("fui") || q3.includes("fui para") || q3.includes("fui à") || q3.includes("fui ao") || q3.includes("fui para a") || q3.includes("fui para o") || q3.includes("fui na") || q3.includes("fui no") || q3.includes("fui para escola") || q3.includes("fui para a escola") || q3.includes("fui à escola") || q3.includes("fui no colégio") || q3.includes("fui à escola") || q3.includes("fui") || q3.includes("fui para") || q3.includes("fui à") || q3.includes("fui ao") || q3.includes("fui para a") || q3.includes("fui para o") || q3.includes("fui na") || q3.includes("fui no") || q3.includes("fui para escola") || q3.includes("fui para a escola") || q3.includes("fui à escola") || q3.includes("fui no colégio") || q3.includes("fui à escola") || q3.includes("fui") || q3.includes("fui para") || q3.includes("fui à") || q3.includes("fui ao") || q3.includes("fui para a") || q3.includes("fui para o") || q3.includes("fui na") || q3.includes("fui no") || q3.includes("fui para escola") || q3.includes("fui para a escola") || q3.includes("fui à escola") || q3.includes("fui no colégio") || q3.includes("fui à escola") || q3.includes("fui") || q3.includes("fui para") || q3.includes("fui à") || q3.includes("fui ao") || q3.includes("fui para a") || q3.includes("fui para o") || q3.includes("fui na") || q3.includes("fui no") || q3.includes("fui para escola") || q3.includes("fui para a escola") || q3.includes("fui à escola") || q3.includes("fui no colégio") || q3.includes("fui à escola") || q3.includes("fui") || q3.includes("ir") || q3.includes("vou") || q3.includes("fui")
  );
  if (validaQ3) {
    acertosVerbos++;
    inputQ3.classList.remove("erro-input");
  } else {
    inputQ3.classList.add("erro-input");
  }

  // Frase 4: わたしは 日本に 帰りました。 (Passado: voltei / retornei / fui ao Japão / voltar)
  const validaQ4 = q4.includes("japão") && (
    q4.includes("voltei") || q4.includes("retornei") || q4.includes("volto") || q4.includes("voltar") || q4.includes("retorno") || q4.includes("retornar") || q4.includes("fui") || q4.includes("ir") || q4.includes("vou")
  );
  if (validaQ4) {
    acertosVerbos++;
    inputQ4.classList.remove("erro-input");
  } else {
    inputQ4.classList.add("erro-input");
  }

  // --- CÁLCULO GERAL ---
  const totalExercicios = 13;
  const totalAcertos = (acertosJogo > 4 ? 4 : acertosJogo) + acertosTextos + acertosVerbos;
  const totalErros = totalExercicios - totalAcertos;
  const porcentagemCalculada = Math.round((totalAcertos / totalExercicios) * 100);

  // Mostra o resultado na tela para o aluno conferir
  feedbackEnvio.textContent = `Resultado: ${totalAcertos} acertos e ${totalErros} erros (${porcentagemCalculada}%). Os campos incorretos ficaram vermelhos para você ajustar!`;
  feedbackEnvio.style.color = totalErros === 0 ? "green" : "#e67e22";

  // Monta o objeto para enviar em segundo plano para a planilha
  const dadosEnvio = {
    nome: nomeAluno,
    nota: `${totalAcertos}/${totalExercicios}`,
    porcentagem: `${porcentagemCalculada}%`,
    erros: `${totalErros} erros`
  };

  // Envio silencioso para a planilha
  fetch(URL_WEB_APP, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dadosEnvio)
  }).catch(err => {
    console.error("Erro ao enviar para a planilha:", err);
  });
}