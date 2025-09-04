class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    // Checa a lista de animais com tipo e brinquedos favoritos
    const animais = {
      Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
      Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
      Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
      Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
      Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
      Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
      Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
    };

    // Checa os brinquedos válidos que podem aparecer
    const brinquedosValidos = [
      "RATO",
      "BOLA",
      "LASER",
      "CAIXA",
      "NOVELO",
      "SKATE",
    ];

    // Checa e separa as listas de brinquedos e a ordem dos animais
    const p1 = brinquedosPessoa1.split(",");
    const p2 = brinquedosPessoa2.split(",");
    const animaisOrdem = ordemAnimais.split(",");

    // Checa duplicatas e itens inválidos
    const validarLista = (lista, validos) => {
      const set = new Set();
      for (let item of lista) {
        if (!validos.includes(item)) return false; // checa se o brinquedo é válido
        if (set.has(item)) return false; // checa duplicata
        set.add(item);
      }
      return true;
    };

    // Checa se os brinquedos das pessoas estão ok
    if (
      !validarLista(p1, brinquedosValidos) ||
      !validarLista(p2, brinquedosValidos)
    ) {
      return { erro: "Brinquedo inválido" };
    }

    // Checa animais e checa duplicatas
    const setAnimais = new Set();
    for (let animal of animaisOrdem) {
      if (!animais[animal]) return { erro: "Animal inválido" }; // checa animal inexistente
      if (setAnimais.has(animal)) return { erro: "Animal inválido" }; // checa duplicado
      setAnimais.add(animal);
    }

    // Checa se a pessoa segue a ordem dos brinquedos do animal (pode intercalar outros)
    const confereOrdem = (animalBrinquedos, pessoaBrinquedos) => {
      let idx = 0;
      for (let brinquedo of pessoaBrinquedos) {
        if (brinquedo === animalBrinquedos[idx]) idx++; // checa se encontrou o próximo brinquedo
        if (idx === animalBrinquedos.length) break; // checa se já terminou a sequência
      }
      return idx === animalBrinquedos.length; // checa se completou a ordem
    };

    let adotadosP1 = 0;
    let adotadosP2 = 0;
    const resultado = [];

    for (let animal of animaisOrdem) {
      const info = animais[animal];
      let dono = "abrigo"; // checa default

      const p1Pode = confereOrdem(info.brinquedos, p1); // checa pessoa 1
      const p2Pode = confereOrdem(info.brinquedos, p2); // checa pessoa 2

      if (info.tipo === "gato") {
        // checa regra dos gatos: não divide
        if (p1Pode && !p2Pode && adotadosP1 < 3) dono = "pessoa 1";
        else if (p2Pode && !p1Pode && adotadosP2 < 3) dono = "pessoa 2";
      } else if (info.tipo === "jabuti") {
        // checa regra do Loco: só vai pra pessoa se houver outro animal adotado
        if (adotadosP1 + adotadosP2 > 0) dono = "pessoa 1";
      } else {
        // checa regras dos cães
        if (p1Pode && !p2Pode && adotadosP1 < 3) dono = "pessoa 1";
        else if (p2Pode && !p1Pode && adotadosP2 < 3) dono = "pessoa 2";
        else if (p1Pode && p2Pode) dono = "abrigo"; // checa empate
      }

      // checa quem adotou e incrementa contagem
      if (dono === "pessoa 1") adotadosP1++;
      if (dono === "pessoa 2") adotadosP2++;

      resultado.push(`${animal} - ${dono}`); // checa resultado do animal
    }

    // checa ordenação final
    resultado.sort((a, b) => a.localeCompare(b));
    return { lista: resultado };
  }
}

export { AbrigoAnimais as AbrigoAnimais };
