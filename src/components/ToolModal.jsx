import { useState, useEffect } from 'react';
import { X, Calculator, Percent, DollarSign, Heart, Lightbulb, TrendingUp, Landmark, RefreshCw, BarChart2, ShieldAlert } from 'lucide-react';

export default function ToolModal({ tool, onClose }) {
  if (!tool) return null;

  // Render correct content depending on tool ID
  const renderCalculator = () => {
    switch (tool.id) {
      case 'descuentos':
        return <DiscountCalculator />;
      case 'interes-compuesto':
        return <CompoundInterestCalculator />;
      case 'monedas':
        return <CurrencyConverter />;
      case 'imc':
        return <BMICalculator />;
      case 'pagos':
        return <PaymentPlanner />;
      case 'consumo-electrico':
        return <ElectricCalculator />;
      case 'ahorro':
        return <SavingsCalculator />;
      case 'amortizacion':
        return <AmortizationCalculator />;
      case 'ofertas':
        return <OfferComparator />;
      case 'eta':
        return <ETACalculator />;
      default:
        return <p>Calculadora en desarrollo.</p>;
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title" id="modal-title">
            <Calculator size={20} style={{ color: 'var(--accent-purple)' }} aria-hidden="true" />
            <span>{tool.title}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            {tool.desc}
          </p>
          {renderCalculator()}
        </div>
      </div>
    </div>
  );
}

// 1. Discount Calculator
function DiscountCalculator() {
  const [price, setPrice] = useState('100');
  const [discount, setDiscount] = useState('20');
  const [savings, setSavings] = useState(20);
  const [finalPrice, setFinalPrice] = useState(80);

  useEffect(() => {
    const p = parseFloat(price) || 0;
    const d = parseFloat(discount) || 0;
    const sav = (p * d) / 100;
    setSavings(sav);
    setFinalPrice(p - sav);
  }, [price, discount]);

  return (
    <div className="calc-form">
      <div className="form-group">
        <label>Precio Original ($)</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Descuento (%)</label>
        <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} />
      </div>
      <div className="calc-output-box">
        <div className="calc-output-title">Precio final con descuento</div>
        <div className="calc-output-value">${finalPrice.toFixed(2)}</div>
        <div className="calc-output-details">
          <div className="calc-output-row">
            <span>Ahorro total:</span>
            <strong>${savings.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Compound Interest Calculator
function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('1000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('10');
  const [frequency, setFrequency] = useState('12'); // Monthly default
  const [futureValue, setFutureValue] = useState(0);
  const [interest, setInterest] = useState(0);

  useEffect(() => {
    const P = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(years) || 0;
    const n = parseFloat(frequency) || 1;

    // Formula: A = P(1 + r/n)^(nt)
    const A = P * Math.pow(1 + r / n, n * t);
    setFutureValue(A);
    setInterest(A - P);
  }, [principal, rate, years, frequency]);

  return (
    <div className="calc-form">
      <div className="form-group">
        <label>Capital Inicial ($)</label>
        <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Tasa de Interés Anual (%)</label>
        <input type="number" value={rate} onChange={e => setRate(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Periodo (Años)</label>
        <input type="number" value={years} onChange={e => setYears(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Frecuencia de Capitalización</label>
        <select value={frequency} onChange={e => setFrequency(e.target.value)}>
          <option value="1">Anual</option>
          <option value="4">Trimestral</option>
          <option value="12">Mensual</option>
          <option value="365">Diaria</option>
        </select>
      </div>
      <div className="calc-output-box">
        <div className="calc-output-title">Monto Acumulado</div>
        <div className="calc-output-value">${futureValue.toFixed(2)}</div>
        <div className="calc-output-details">
          <div className="calc-output-row">
            <span>Interés ganado:</span>
            <strong>${interest.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// 3. Currency Converter
function CurrencyConverter() {
  const [amount, setAmount] = useState('100');
  const [fromCur, setFromCur] = useState('USD');
  const [toCur, setToCur] = useState('PEN');
  const [result, setResult] = useState(0);

  const rates = {
    USD: 1,
    PEN: 3.68,
    EUR: 0.92,
    GBP: 0.78,
    MXN: 18.25
  };

  useEffect(() => {
    const amt = parseFloat(amount) || 0;
    const fromRate = rates[fromCur];
    const toRate = rates[toCur];
    const res = (amt / fromRate) * toRate;
    setResult(res);
  }, [amount, fromCur, toCur]);

  return (
    <div className="calc-form">
      <div className="form-group">
        <label>Monto</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="form-group">
          <label>De</label>
          <select value={fromCur} onChange={e => setFromCur(e.target.value)}>
            <option value="USD">USD - Dólar Estadounidense</option>
            <option value="PEN">PEN - Sol Peruano</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - Libra Esterlina</option>
            <option value="MXN">MXN - Peso Mexicano</option>
          </select>
        </div>
        <div className="form-group">
          <label>A</label>
          <select value={toCur} onChange={e => setToCur(e.target.value)}>
            <option value="PEN">PEN - Sol Peruano</option>
            <option value="USD">USD - Dólar Estadounidense</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - Libra Esterlina</option>
            <option value="MXN">MXN - Peso Mexicano</option>
          </select>
        </div>
      </div>
      <div className="calc-output-box">
        <div className="calc-output-title">Monto Convertido</div>
        <div className="calc-output-value">
          {result.toFixed(2)} {toCur}
        </div>
      </div>
    </div>
  );
}

// 4. BMI Calculator
function BMICalculator() {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('175');
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState('');

  useEffect(() => {
    const w = parseFloat(weight) || 0;
    const h = (parseFloat(height) || 0) / 100; // to meters
    if (h > 0) {
      const b = w / (h * h);
      setBmi(b);

      if (b < 18.5) setCategory('Bajo peso');
      else if (b < 25) setCategory('Peso normal (Saludable)');
      else if (b < 30) setCategory('Sobrepeso');
      else setCategory('Obesidad');
    } else {
      setBmi(0);
      setCategory('-');
    }
  }, [weight, height]);

  return (
    <div className="calc-form">
      <div className="form-group">
        <label>Peso (kg)</label>
        <input type="number" value={weight} onChange={e => setWeight(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Altura (cm)</label>
        <input type="number" value={height} onChange={e => setHeight(e.target.value)} />
      </div>
      <div className="calc-output-box">
        <div className="calc-output-title">Índice de Masa Corporal (IMC)</div>
        <div className="calc-output-value">{bmi.toFixed(1)}</div>
        <div className="calc-output-details">
          <div className="calc-output-row">
            <span>Clasificación:</span>
            <strong style={{ color: bmi >= 18.5 && bmi < 25 ? 'var(--accent-green)' : 'var(--accent-orange)' }}>
              {category}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. Payment Planner (Loan Payment Calculator)
function PaymentPlanner() {
  const [amount, setAmount] = useState('10000');
  const [rate, setRate] = useState('6');
  const [months, setMonths] = useState('24');
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const P = parseFloat(amount) || 0;
    const annualRate = parseFloat(rate) || 0;
    const r = (annualRate / 12) / 100; // monthly rate
    const n = parseFloat(months) || 1;

    if (r > 0) {
      // EMI formula = P * r * (1+r)^n / ((1+r)^n - 1)
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthlyPayment(emi);
      setTotalCost(emi * n);
    } else {
      setMonthlyPayment(P / n);
      setTotalCost(P);
    }
  }, [amount, rate, months]);

  return (
    <div className="calc-form">
      <div className="form-group">
        <label>Monto del Préstamo ($)</label>
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Tasa de Interés Anual (%)</label>
        <input type="number" value={rate} onChange={e => setRate(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Plazo (Meses)</label>
        <input type="number" value={months} onChange={e => setMonths(e.target.value)} />
      </div>
      <div className="calc-output-box">
        <div className="calc-output-title">Pago Mensual Estimado</div>
        <div className="calc-output-value">${monthlyPayment.toFixed(2)}</div>
        <div className="calc-output-details">
          <div className="calc-output-row">
            <span>Costo total del crédito:</span>
            <strong>${totalCost.toFixed(2)}</strong>
          </div>
          <div className="calc-output-row">
            <span>Intereses totales:</span>
            <strong>${(totalCost - (parseFloat(amount) || 0)).toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// 6. Electric Consumption Calculator
function ElectricCalculator() {
  const [watts, setWatts] = useState('100');
  const [hours, setHours] = useState('8');
  const [priceKwh, setPriceKwh] = useState('0.15');
  const [monthlyCost, setMonthlyCost] = useState(0);

  useEffect(() => {
    const w = parseFloat(watts) || 0;
    const h = parseFloat(hours) || 0;
    const price = parseFloat(priceKwh) || 0;

    // Consumption in kWh per day = (W * hours) / 1000
    const kwhPerDay = (w * h) / 1000;
    const costPerDay = kwhPerDay * price;
    setMonthlyCost(costPerDay * 30.4);
  }, [watts, hours, priceKwh]);

  return (
    <div className="calc-form">
      <div className="form-group">
        <label>Potencia del Aparato (Watts)</label>
        <input type="number" value={watts} onChange={e => setWatts(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Horas de uso al día</label>
        <input type="number" value={hours} onChange={e => setHours(e.target.value)} max="24" />
      </div>
      <div className="form-group">
        <label>Costo por kWh ($)</label>
        <input type="number" value={priceKwh} onChange={e => setPriceKwh(e.target.value)} step="0.01" />
      </div>
      <div className="calc-output-box">
        <div className="calc-output-title">Costo Mensual Estimado</div>
        <div className="calc-output-value">${monthlyCost.toFixed(2)}</div>
        <div className="calc-output-details">
          <div className="calc-output-row">
            <span>Costo diario:</span>
            <strong>${(monthlyCost / 30.4).toFixed(3)}</strong>
          </div>
          <div className="calc-output-row">
            <span>Costo anual:</span>
            <strong>${(monthlyCost * 12).toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. Projected Savings Calculator
function SavingsCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState('100');
  const [rate, setRate] = useState('4');
  const [years, setYears] = useState('5');
  const [totalSaved, setTotalSaved] = useState(0);
  const [totalDeposits, setTotalDeposits] = useState(0);

  useEffect(() => {
    const PMT = parseFloat(monthlyDeposit) || 0;
    const annualRate = parseFloat(rate) || 0;
    const r = (annualRate / 12) / 100; // monthly rate
    const t = parseFloat(years) || 0;
    const n = t * 12; // total months

    let total = 0;
    if (r > 0) {
      // Future Value of an Annuity formula: FV = PMT * [((1 + r)^n - 1) / r] * (1 + r) [assuming beginning of month]
      total = PMT * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    } else {
      total = PMT * n;
    }

    setTotalSaved(total);
    setTotalDeposits(PMT * n);
  }, [monthlyDeposit, rate, years]);

  return (
    <div className="calc-form">
      <div className="form-group">
        <label>Depósito Mensual ($)</label>
        <input type="number" value={monthlyDeposit} onChange={e => setMonthlyDeposit(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Tasa de Rentabilidad Anual (%)</label>
        <input type="number" value={rate} onChange={e => setRate(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Plazo (Años)</label>
        <input type="number" value={years} onChange={e => setYears(e.target.value)} />
      </div>
      <div className="calc-output-box">
        <div className="calc-output-title">Ahorro Estimado Proyectado</div>
        <div className="calc-output-value">${totalSaved.toFixed(2)}</div>
        <div className="calc-output-details">
          <div className="calc-output-row">
            <span>Tus aportaciones totales:</span>
            <strong>${totalDeposits.toFixed(2)}</strong>
          </div>
          <div className="calc-output-row">
            <span>Intereses / Rendimiento:</span>
            <strong style={{ color: 'var(--accent-green)' }}>
              ${(totalSaved - totalDeposits).toFixed(2)}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}

// 8. Amortization Table Calculator
function AmortizationCalculator() {
  const [principal, setPrincipal] = useState('5000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('3');
  const [payments, setPayments] = useState([]);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const P = parseFloat(principal) || 0;
    const annualRate = parseFloat(rate) || 0;
    const r = (annualRate / 12) / 100;
    const t = parseFloat(years) || 0;
    const n = t * 12;

    if (P <= 0 || n <= 0) return;

    let emi = 0;
    if (r > 0) {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    } else {
      emi = P / n;
    }
    setMonthlyPayment(emi);

    let balance = P;
    const rows = [];
    for (let i = 1; i <= Math.min(n, 360); i++) {
      const interest = balance * r;
      const principalPaid = emi - interest;
      balance = Math.max(balance - principalPaid, 0);

      rows.push({
        month: i,
        payment: emi,
        interest: interest,
        principal: principalPaid,
        balance: balance
      });
    }
    setPayments(rows);
  }, [principal, rate, years]);

  return (
    <div className="calc-form">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
        <div className="form-group">
          <label>Monto ($)</label>
          <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Interés (%)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Años</label>
          <input type="number" value={years} onChange={e => setYears(e.target.value)} />
        </div>
      </div>
      <div className="calc-output-box" style={{ padding: '14px' }}>
        <div className="calc-output-title">Cuota Mensual: ${monthlyPayment.toFixed(2)}</div>
      </div>

      <div className="amortization-table-wrapper">
        <table className="amortization-table">
          <thead>
            <tr>
              <th>Mes</th>
              <th>Cuota</th>
              <th>Interés</th>
              <th>Principal</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(row => (
              <tr key={row.month}>
                <td>{row.month}</td>
                <td>${row.payment.toFixed(2)}</td>
                <td>${row.interest.toFixed(2)}</td>
                <td>${row.principal.toFixed(2)}</td>
                <td>${row.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 9. Offer Comparator
function OfferComparator() {
  const [priceA, setPriceA] = useState('10');
  const [qtyA, setQtyA] = useState('500');
  const [priceB, setPriceB] = useState('18');
  const [qtyB, setQtyB] = useState('1000');
  const [unitA, setUnitA] = useState(0);
  const [unitB, setUnitB] = useState(0);
  const [verdict, setVerdict] = useState('');

  useEffect(() => {
    const pA = parseFloat(priceA) || 0;
    const qA = parseFloat(qtyA) || 0;
    const pB = parseFloat(priceB) || 0;
    const qB = parseFloat(qtyB) || 0;

    const uA = qA > 0 ? pA / qA : 0;
    const uB = qB > 0 ? pB / qB : 0;

    setUnitA(uA);
    setUnitB(uB);

    if (uA > 0 && uB > 0) {
      if (uA < uB) {
        const diffPercent = ((uB - uA) / uB) * 100;
        setVerdict(`Oferta A es la mejor opción. Es un ${diffPercent.toFixed(1)}% más económica por unidad.`);
      } else if (uB < uA) {
        const diffPercent = ((uA - uB) / uA) * 100;
        setVerdict(`Oferta B es la mejor opción. Es un ${diffPercent.toFixed(1)}% más económica por unidad.`);
      } else {
        setVerdict('Ambas ofertas tienen el mismo precio unitario.');
      }
    } else {
      setVerdict('-');
    }
  }, [priceA, qtyA, priceB, qtyB]);

  return (
    <div className="calc-form">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4>Oferta A</h4>
          <div className="form-group">
            <label>Precio ($)</label>
            <input type="number" value={priceA} onChange={e => setPriceA(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Cantidad (g, ml, unid.)</label>
            <input type="number" value={qtyA} onChange={e => setQtyA(e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4>Oferta B</h4>
          <div className="form-group">
            <label>Precio ($)</label>
            <input type="number" value={priceB} onChange={e => setPriceB(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Cantidad (g, ml, unid.)</label>
            <input type="number" value={qtyB} onChange={e => setQtyB(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="calc-output-box">
        <div className="calc-output-title">Comparación de Precios</div>
        <div style={{ fontSize: '14px', marginBottom: '8px' }}>
          Unidad A: <strong>${unitA.toFixed(4)}</strong> | Unidad B: <strong>${unitB.toFixed(4)}</strong>
        </div>
        <div className="calc-output-value" style={{ fontSize: '16px', color: 'var(--accent-blue)' }}>
          {verdict}
        </div>
      </div>
    </div>
  );
}

// 10. ETA Calculator
function ETACalculator() {
  const [distance, setDistance] = useState('120');
  const [speed, setSpeed] = useState('80');
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const d = parseFloat(distance) || 0;
    const s = parseFloat(speed) || 0;

    if (s > 0) {
      const totalHours = d / s;
      const h = Math.floor(totalHours);
      const m = Math.round((totalHours - h) * 60);
      setHours(h);
      setMinutes(m);
    } else {
      setHours(0);
      setMinutes(0);
    }
  }, [distance, speed]);

  return (
    <div className="calc-form">
      <div className="form-group">
        <label>Distancia a recorrer (km)</label>
        <input type="number" value={distance} onChange={e => setDistance(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Velocidad media (km/h)</label>
        <input type="number" value={speed} onChange={e => setSpeed(e.target.value)} />
      </div>
      <div className="calc-output-box">
        <div className="calc-output-title">Tiempo Estimado de Llegada</div>
        <div className="calc-output-value">
          {hours}h {minutes}m
        </div>
      </div>
    </div>
  );
}
