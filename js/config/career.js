// Um item por setor do circuito, na mesma ordem dos <article class="sector"> em html/partials/career.html.
// A posição de cada setor na pista vem do atributo data-at do HTML.
export const SECTORS = [
  { marker: "S1 Estagiário", hudCode: "S1", hudName: "Estagiário" },
  { marker: "S2 Júnior", hudCode: "S2", hudName: "Júnior" },
  { marker: "S3 Pleno", hudCode: "S3", hudName: "Pleno" },
  { marker: "S4 Sênior", hudCode: "S4", hudName: "Sênior" },
  { marker: "Arquiteto", hudCode: "FIM", hudName: "Arquiteto" },
];

// Fração da pista onde o carro começa (Estagiário). A linha de largada/chegada fica em 0 (e 1),
// então início e fim ficam afastados dela e entre si.
export const CAR_START = 0.08;
// Fração final: último marcador (Arquiteto), antes da linha de chegada.
export const CAR_END = 0.99;
