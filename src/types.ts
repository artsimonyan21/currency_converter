export type TData = { amount: string; from: string; to: string };

export type TConvertCurrency = {
  amount: string;
  from: string;
  to: string;
};

type TRates = {
  [key: string]: number;
};

export type TResponse = {
  amount: number;
  base: string;
  date: string;
  rates: TRates;
};
