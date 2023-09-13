export interface CSVRow {
  [key: string]: string;
}
export interface CSVPreview {
  headers: string[];
  rows: CSVRow[];
  length: number;
}
export const parseCSV = (text: string): CSVPreview => {
  const rows = text.split("\n").map((row) => row.trim());
  const headers = rows[0]
    .split(",")
    .map((header) => header.trim())
    .slice(0, 3);
  const dataRows = rows
    .slice(1)
    .map((row) => {
      const dataRow: CSVRow = {};
      const fields = row.split(",");
      for (let i = 0; i < fields.length; i++) {
        dataRow[headers[i]] = fields[i];
      }
      return dataRow;
    })
    .slice(0, 3);
  return {
    headers,
    rows: dataRows,
    length: rows.length,
  };
};
