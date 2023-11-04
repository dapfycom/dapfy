export const ErrorMessage = (error: any, defaultMessage?: string): string => {
  let finalErrorMessage = "";

  if (error?.response?.data?.message) {
    finalErrorMessage = error?.response?.data?.message;
  } else if (error?.response?.data?.error) {
    finalErrorMessage = error?.response?.data?.error;
  } else if (typeof error === "string") {
    finalErrorMessage = error;
  } else {
    finalErrorMessage = defaultMessage || "Unknown error";
  }

  return finalErrorMessage;
};
