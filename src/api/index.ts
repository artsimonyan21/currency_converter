import axios from "axios";
import { TConvertCurrency } from "../types";

export const fetchCurrencies = async () => {
  try {
    return (await axios.get("https://api.frankfurter.app/latest")).data;
  } catch (err) {
    console.log(err);
  }
};

export const convertCurrency = async ({
  amount,
  from,
  to,
}: TConvertCurrency) => {
  try {
    return await axios.get(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
    );
  } catch (err) {
    console.log(err);
  }
};
