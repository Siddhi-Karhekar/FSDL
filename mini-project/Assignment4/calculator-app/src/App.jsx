import { useState } from 'react';
import './App.css';

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = value => {
    // Prevent starting with an operator or double operators
    if (
      (ops.includes(value) && calc === '') ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }

    setCalc(calc + value);

    // Provide a real-time preview of the result
    if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }
  };

  const calculate = () => {
    try {
      setCalc(eval(calc).toString());
      setResult("");
    } catch (err) {
      setCalc("Error");
    }
  };

  const deleteLast = () => {
    if (calc === "") return;
    const value = calc.slice(0, -1);
    setCalc(value);
  };

  const clearAll = () => {
    setCalc("");
    setResult("");
  };

  return (
    <div className="calc-wrapper">
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ''}
          {calc || "0"}
        </div>

        <div className="operators">
          <button onClick={() => updateCalc('/')}>÷</button>
          <button onClick={() => updateCalc('*')}>×</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={deleteLast}>DEL</button>
          <button onClick={clearAll}>AC</button>
        </div>

        <div className="digits">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'].map((num) => (
            <button key={num} onClick={() => updateCalc(num.toString())}>
              {num}
            </button>
          ))}
          <button className="equal" onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;