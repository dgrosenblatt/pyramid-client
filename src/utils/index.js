export const dollars = (number) => {
  return new Intl.NumberFormat("us", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(number);
};

export const publicName = ({ id, name }) => {
  return name || `Player ${id * 7}`;
};
