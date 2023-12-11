export const arrayToCsv = ({
  data = null,
  columnDelimiter = ",",
  lineDelimiter = "\n",
}: {
  data: any[] | null;
  columnDelimiter?: string;
  lineDelimiter?: string;
}) => {
  let result: any, ctr: any, keys: any;

  if (data === null || !data.length) {
    return null;
  }

  keys = Object.keys(data[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach((item) => {
    ctr = 0;
    keys.forEach((key: string) => {
      if (ctr > 0) {
        result += columnDelimiter;
      }

      result +=
        typeof item[key] === "string" && item[key].includes(columnDelimiter)
          ? `"${item[key]}"`
          : item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  // (B) CREATE BLOB OBJECT
  var blob = new Blob([result], { type: "text/csv" });

  // (C) CREATE DOWNLOAD LINK
  var url = window.URL.createObjectURL(blob);
  var anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "demo.csv";

  // (D) "FORCE DOWNLOAD"
  // NOTE: MAY NOT ALWAYS WORK DUE TO BROWSER SECURITY
  // BETTER TO LET USERS CLICK ON THEIR OWN
  anchor.click();
  window.URL.revokeObjectURL(url);
  anchor.remove();
};
