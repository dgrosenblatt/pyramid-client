import { format } from "date-fns";

export const dollars = (number) => {
  return new Intl.NumberFormat("us", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(number);
};

export const percent = (decimal) => {
  return `${Math.round(decimal * 100)}%`;
};

export const publicName = ({ id, name }) => {
  return name || `Player ${id * 7}`;
};

export const gameTime = (dateISO8601) => {
  if (!dateISO8601) return ''

  const dt = new Date(dateISO8601);
  return format(dt, "EEE p");
};

export const transactionDate = (dateISO8601) => {
  const dt = new Date(dateISO8601);
  return format(dt, "MMM d");
};

export * as constants from "./constants";
