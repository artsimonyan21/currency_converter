import { useForm } from "react-hook-form";
import { TConvertCurrency, TData, TResponse } from "../../types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { convertCurrency, fetchCurrencies } from "../../api";
import { useState } from "react";

const ConvertCurrency = () => {
  const { handleSubmit, register } = useForm<TData>();
  const [convertResult, setConvertResult] = useState<TResponse | undefined>(
    undefined
  );

  const { data: currencies } = useQuery({
    queryFn: () => fetchCurrencies(),
    queryKey: ["currencies"],
  });

  const { mutate: convert } = useMutation({
    mutationFn: (data: TConvertCurrency) => convertCurrency(data),
    onSuccess: (result) => {
      if (result && result.data) {
        console.log("Converted result:", result.data);
        setConvertResult(result.data);
      } else {
        console.warn("No data returned from the conversion");
      }
    },
    onError: (error) => {
      console.error("Error converting currency:", error);
    },
  });

  const onSubmit = (formData: TData) => {
    const { amount, from, to } = formData;
    convert({ amount, from, to });
  };

  return (
    <div className="w-full h-full flex flex-col gap-10 justify-center items-center">
      <h1 className="text-white font-bold text-5xl">Currency Convert</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-fit flex flex-col">
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
          <input
            type="number"
            className="py-2 px-3 h-12 w-full sm:w-60 rounded-md text-black"
            placeholder="Amount"
            {...register("amount", { required: true, min: 0 })}
          />
          <div className="flex gap-4 w-full sm:w-auto">
            <div className="flex flex-col w-full">
              <label className="text-white mb-1" htmlFor="from">
                From
              </label>
              <select
                id="from"
                className="py-2 px-3 w-full h-12 rounded-md text-black"
                {...register("from", { required: true })}
              >
                <option value="" disabled>
                  Select currency
                </option>
                {currencies &&
                  Object.entries(currencies.rates).map(([currency], idx) => (
                    <option key={idx} value={currency as string}>
                      {currency}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-white" htmlFor="to">
                To
              </label>
              <select
                id="to"
                className="py-2 px-3 w-full h-12 rounded-md text-black"
                {...register("to", { required: true })}
              >
                <option value="" disabled>
                  Select currency
                </option>
                {currencies &&
                  Object.entries(currencies.rates).map(([currency], idx) => (
                    <option key={idx} value={currency as string}>
                      {currency}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-white text-black rounded-md mt-4 sm:self-end"
        >
          Convert
        </button>
      </form>
      {convertResult && (
        <div className="absolute right-4 bottom-4 p-4 bg-gray-800 text-white rounded-md">
          <h2 className="text-xl font-bold">Conversion Result</h2>
          <p>
            <strong>Amount:</strong> {convertResult.amount}
          </p>
          <p>
            <strong>From:</strong> {convertResult.base}
          </p>
          <div>
            <h3 className="font-semibold">Rates:</h3>
            <ul>
              {Object.entries(convertResult.rates).map(([currency, rate]) => (
                <li key={currency}>
                  {currency}: {rate}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConvertCurrency;
