"use client";

import { JSX, useState } from "react";
import Image from "next/image";
import ArrowLeft from "@/assets/arrow-left.svg";

export default function ConverterForm(): JSX.Element {
  const [fromCurrency, setFromCurrency] = useState("AED");
  const [toCurrency, setToCurrency] = useState("AED");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");

  const currencies: Array<string> = [
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTN",
    "BWP",
    "BYN",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CLP",
    "CNY",
    "COP",
    "CRC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "FOK",
    "GBP",
    "GEL",
    "GGP",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "IMP",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JEP",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KID",
    "KMF",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRU",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLE",
    "SLL",
    "SOS",
    "SRD",
    "SSP",
    "STN",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TVD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "USD",
    "UYU",
    "UZS",
    "VES",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XCD",
    "XCG",
    "XDR",
    "XOF",
    "XPF",
    "YER",
    "ZAR",
    "ZMW",
    "ZWL",
  ];

  function handleFromChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setFromCurrency(value);
    console.log(value);
  }

  function handleToChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setToCurrency(value);
    console.log(value);
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setAmount(value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const CurrencyData = {
        from: fromCurrency,
        to: toCurrency,
        amount: amount,
      };
      const res = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(CurrencyData),
      });

      if (!res.ok) {
        const text = await res.text();
        console.log("TEXT" + text);
        return;
      }
      const data = await res.json();

      console.log(
        "DATA MESSAGE: " + data.message + "DATA RESULT: " + data.result
      );
      setResult(data.result);
    } catch (err) {
      console.log(err);
      return;
    }
  }

  return (
    <>
      <div className="container flex justify-center items-center w-full p-[32px]">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-[32px] flex-col border p-[32px] rounded-2xl">
            <div className="flex justify-between items-center gap-2">
              <div className="flex relative justify-center items-center border w-[200px] h-[60px] rounded-2xl text-lg p-[8px]">
                <select onChange={handleFromChange}>
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
              <Image src={ArrowLeft} alt="arrow" />
              <div className="flex relative justify-center items-center border w-[200px] h-[60px] rounded-2xl text-lg p-[8px]">
                <select onChange={handleToChange}>
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2">
              <input
                className="border w-[200px] h-[60px] rounded-2xl text-lg p-[8px]"
                type="text"
                onChange={handleAmountChange}
                placeholder="Enter Amount"
              />
              <div className="text-3xl"> = </div>
              <input
                className="border w-[200px] h-[60px] rounded-2xl text-lg p-[8px] bg-gray-300 cursor-auto"
                type="text"
                value={result}
                placeholder="Result"
                readOnly
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="rounded-full border px-8 font-bold text-white bg-black cursor-pointer py-2 hover:border hover:bg-white hover:text-black"
              >
                Convert
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
