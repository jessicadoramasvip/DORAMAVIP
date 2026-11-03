// Valores em centavos para evitar arredondamentos no desconto.
function calculateCart(count) {
  if (!Number.isSafeInteger(count) || count < 0) throw new RangeError('Quantidade inválida');
  const groups = Math.floor(count / 3);
  const subtotal = count * 500;
  const total = groups * 1100 + (count % 3) * 500;
  return { groups, subtotal, total, discount: subtotal - total };
}
if (typeof module !== 'undefined') module.exports = { calculateCart };
