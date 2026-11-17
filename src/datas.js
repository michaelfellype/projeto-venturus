export function somarDias(data, qtd) {
  // usa T00:00:00 para evitar que o fuso horario mude o dia
  const d = new Date(data + 'T00:00:00');
  d.setDate(d.getDate() + qtd);

  const ano = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}
