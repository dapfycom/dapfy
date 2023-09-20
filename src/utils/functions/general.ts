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
