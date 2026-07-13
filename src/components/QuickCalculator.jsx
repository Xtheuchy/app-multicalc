import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function QuickCalculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('0.00');

  const evaluateExpression = (expr) => {
    try {
      // Replace custom operators
      let formattedExpr = expr
        .replace(/x/g, '*')
        .replace(/÷/g, '/');

      // Safety check: Only allow mathematical characters
      if (/[^0-9.+\-*/%() ]/g.test(formattedExpr)) {
        return 'Error';
      }

      // Safe evaluation using Function
      const evalResult = new Function(`return (${formattedExpr})`)();
      
      if (evalResult === Infinity || evalResult === -Infinity) {
        return 'Error: Div / 0';
      }

      // Format result: limit decimals to 2 or 4 if needed
      return Number.isInteger(evalResult) 
        ? evalResult.toString() 
        : Number(evalResult.toFixed(4)).toString();
    } catch (e) {
      return 'Error';
    }
  };

  const handleButtonClick = (value) => {
    if (value === 'C') {
      setExpression('');
      setResult('0.00');
    } else if (value === '=') {
      if (!expression) return;
      const res = evaluateExpression(expression);
      setResult(res);
    } else if (value === '()') {
      // Smart parentheses logic
      const openCount = (expression.match(/\(/g) || []).length;
      const closeCount = (expression.match(/\)/g) || []).length;
      const lastChar = expression.slice(-1);

      if (openCount > closeCount && lastChar !== '(' && !['+', '-', 'x', '÷'].includes(lastChar)) {
        setExpression(prev => prev + ')');
      } else {
        setExpression(prev => prev + '(');
      }
    } else {
      // Avoid starting with operators except minus
      if (expression === '' && ['+', 'x', '÷', '%'].includes(value)) {
        return;
      }
      setExpression(prev => prev + value);
    }
  };

  const buttons = [
    { label: 'C', className: 'clear' },
    { label: '()', className: 'op' },
    { label: '%', className: 'op' },
    { label: '÷', className: 'op' },
    { label: '7' },
    { label: '8' },
    { label: '9' },
    { label: 'x', className: 'op' },
    { label: '4' },
    { label: '5' },
    { label: '6' },
    { label: '-', className: 'op' },
    { label: '1' },
    { label: '2' },
    { label: '3' },
    { label: '+', className: 'op' },
    { label: '0', className: 'zero' },
    { label: '.' },
    { label: '=', className: 'equals' }
  ];

  return (
    <article className="widget-card" aria-labelledby="quick-calc-title">
      <div className="widget-header" id="quick-calc-title">
        <Calculator size={18} style={{ color: 'var(--accent-purple)' }} aria-hidden="true" />
        <span>Calculadora rápida</span>
      </div>

      <div 
        className="calc-display" 
        aria-live="polite" 
        aria-label={`Expresión de cálculo: ${expression || 'vacía'}. Resultado: ${result}`}
      >
        <div className="calc-expression" aria-hidden="true">{expression || '0'}</div>
        <div className="calc-result" aria-hidden="true">{result}</div>
      </div>

      <div className="calc-buttons">
        {buttons.map((btn, index) => (
          <button
            key={index}
            className={`calc-btn ${btn.className || ''}`}
            onClick={() => handleButtonClick(btn.label)}
            aria-label={
              btn.label === 'C' 
                ? 'Limpiar expresión' 
                : btn.label === '=' 
                  ? 'Calcular expresión' 
                  : btn.label === '÷'
                    ? 'Dividido por'
                    : btn.label === 'x'
                      ? 'Multiplicado por'
                      : btn.label === '()'
                        ? 'Paréntesis'
                        : btn.label === '%'
                          ? 'Porcentaje'
                          : `Número ${btn.label}`
            }
          >
            {btn.label}
          </button>
        ))}
      </div>
    </article>
  );
}
