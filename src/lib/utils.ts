import { Address } from "@multiversx/sdk-core/out";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addressIsValid = (address: string): boolean => {
  try {
    new Address(address);

    return true;
  } catch (error) {
    return false;
  }
};
