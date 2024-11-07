/**
 * 小数点以下n桁までの数値を返す
 */
export default function roundN(v: number, n: number) {
  return Math.round(v * Math.pow(10, n)) / Math.pow(10, n);
}
