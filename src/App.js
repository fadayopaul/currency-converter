import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [value, setValue] = useState(1);
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [curName, setCurName] = useState("");
  const [rate, setRate] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchCurrency() {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${value}&from=${fromCur}&to=${toCur}`,
          {
            signal: controller.signal
          }
        );
        const data = await res.json();
        setRate(data.rates[toCur]);
      }

      if (fromCur === toCur) return setRate(value);
      if (value < 1) return setRate(0);

      fetchCurrency();
    },
    [value, fromCur, toCur]
  );

  useEffect(
    function () {
      async function currency() {
        const res = await fetch(`https://api.frankfurter.app/currencies`);
        const data = await res.json();
        setCurName(data[toCur]);
      }

      currency();
    },
    [toCur]
  );

  return (
    <>
      <div className="input-div">
        <p>Currency Converter</p>
        <input
          className="input"
          type="Number"
          value={value}
          placeholder="Input amount"
          onChange={(e) => setValue(+e.target.value)}
        />
      </div>

      <div className="box">
        <select value={fromCur} onChange={(e) => setFromCur(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>

        <select value={toCur} onChange={(e) => setToCur(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <br />
      </div>
      <p>
        {rate} {curName}
      </p>
    </>
  );
}
