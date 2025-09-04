import { AbrigoAnimais } from "./abrigo-animais";

describe("Abrigo de Animais", () => {
  test("Deve rejeitar animal inválido", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "CAIXA,RATO",
      "RATO,BOLA",
      "Lulu"
    );
    expect(resultado.erro).toBe("Animal inválido");
    expect(resultado.lista).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Fofo"
    );
    expect(resultado.lista[0]).toBe("Fofo - abrigo");
    expect(resultado.lista[1]).toBe("Rex - pessoa 1");
    expect(resultado.lista.length).toBe(2);
    expect(resultado.erro).toBeFalsy();
  });

  test("Deve encontrar pessoa para um animal intercalando brinquedos", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,NOVELO,RATO,LASER",
      "Mimi,Fofo,Rex,Bola"
    );
    expect(resultado.lista[0]).toBe("Bola - abrigo");
    expect(resultado.lista[1]).toBe("Fofo - pessoa 2");
    expect(resultado.lista[2]).toBe("Mimi - abrigo");
    expect(resultado.lista[3]).toBe("Rex - abrigo");
    expect(resultado.lista.length).toBe(4);
    expect(resultado.erro).toBeFalsy();
  });
});

describe("Abrigo de Animais - testes extras", () => {
  test("Pessoa não pode adotar mais de 3 animais", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA,LASER,CAIXA,NOVELO,SKATE",
      "RATO,BOLA",
      "Rex,Bola,Bebe,Mimi"
    );
    const p1Count = resultado.lista.filter((a) =>
      a.includes("pessoa 1")
    ).length;
    expect(p1Count).toBeLessThanOrEqual(3);
  });

  test("Gato com duas pessoas aptas vai para abrigo", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "BOLA,LASER",
      "BOLA,LASER",
      "Mimi"
    );
    expect(resultado.lista[0]).toBe("Mimi - abrigo");
  });

  test("Animal duplicado na lista gera erro", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BOLA",
      "RATO,NOVELO",
      "Rex,Rex"
    );
    expect(resultado.erro).toBe("Animal inválido");
  });

  test("Brinquedo inválido gera erro", () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      "RATO,BANANA",
      "RATO,BOLA",
      "Rex"
    );
    expect(resultado.erro).toBe("Brinquedo inválido");
  });
});
