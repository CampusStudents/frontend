const s = (n: number) => n * 1000;
const m = (n: number) => n * 60 * 1000;
const h = (n: number) => n * 60 * 60 * 1000;
const d = (n: number) => n * 24 * 60 * 60 * 1000;

export const time = { s, m, h, d };
