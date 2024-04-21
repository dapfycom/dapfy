// orderBy function should be able to order data of an array, should handle if the data indicated to order by is a number or string, also receive if order is asc or desc

export const orderBy = (
  data: any[],
  order: "asc" | "desc",
  orderBy: string
) => {
  const sortedData = data.sort((a, b) => {
    if (order === "asc") {
      if (typeof a[orderBy] === "number") {
        return a[orderBy] - b[orderBy];
      } else {
        return a[orderBy].localeCompare(b[orderBy]);
      }
    } else {
      if (typeof a[orderBy] === "number") {
        return b[orderBy] - a[orderBy];
      } else {
        return b[orderBy].localeCompare(a[orderBy]);
      }
    }
  });
  return sortedData;
};

export const copyTextToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    throw new Error("Not able to copy");
  }
};

export function reorderTokens(
  tokens: string[],
  tokenPositions: { token: string; position: number }[]
): string[] {
  // Crear un arreglo del tamaño de `tokens` lleno de `null` para identificar posiciones vacías.
  const reordered: (string | null)[] = new Array(tokens.length).fill(null);

  // Mapear cada token a su posición deseada.
  tokenPositions.forEach(({ token, position }) => {
    // Ajustar para que las posiciones sean base 0, asumiendo que están base 1 en `tokenPositions`.
    reordered[position - 1] = token;
  });

  // Índice para seguir la posición de inserción para tokens no especificados.
  let fillIndex = 0;

  tokens.forEach((token) => {
    const positionDefined = tokenPositions.find((tp) => tp.token === token);
    if (!positionDefined) {
      // Buscar la próxima posición disponible si el token no tiene posición definida.
      while (reordered[fillIndex] !== null) {
        fillIndex++;
      }
      reordered[fillIndex] = token;
    }
  });

  return reordered as string[];
}
