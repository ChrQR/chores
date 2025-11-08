import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export const recurrenceToDK = (rec: string) => {
  switch (rec) {
    case "DAILY":
      return "dag"
    case "WEEKLY":
      return "uge"
    case "MONTHLY":
      return "måned"
    default:
      return "dag"
  }
}

export const timeOfDayToDK = (rec: string | null) => {
  switch (rec) {
    case null:
      return "hele dagen"
    case "MORNING":
      return "morgen"
    case "AFTERNOON":
      return "eftermiddag"
    case "EVENING":
      return "aften"
    default:
      return rec
  }
}

export const coercedInt = z.preprocess((val) => {
  if (val === "") {
    return undefined
  }
  if (typeof val === "string") {
    return parseInt(val)
  }
}, z.int().optional())

export const emptyStringTransform = (val: string) => {
  if (val === "") {
    return null
  }
  return val
}
