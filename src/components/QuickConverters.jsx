import { useState } from 'react';
import { Shuffle, DollarSign, Navigation, Scale, Ruler } from 'lucide-react';

export default function QuickConverters() {
  const [currencyVal, setCurrencyVal] = useState('100');
  const [distanceVal, setDistanceVal] = useState('10');
  const [weightVal, setWeightVal] = useState('5');
  const [lengthVal, setLengthVal] = useState('10');

  // Rates
  const USD_TO_PEN = 3.68;
  const KM_TO_MI = 0.621;
  const KG_TO_LB = 2.205;
  const M_TO_FT = 3.281;

  return (
    <article className="widget-card" aria-labelledby="quick-converters-title">
      <div className="widget-header" id="quick-converters-title">
        <Shuffle size={18} style={{ color: 'var(--accent-blue)' }} aria-hidden="true" />
        <span>Conversores rápidos</span>
      </div>

      <ul className="converter-list" style={{ listStyle: 'none' }}>
        {/* Currency Row */}
        <li className="converter-row">
          <div className="converter-label">
            <div className="converter-icon-circle" style={{ backgroundColor: '#3b82f6' }} aria-hidden="true">
              <DollarSign size={12} />
            </div>
            <span>Monedas (USD → PEN)</span>
          </div>
          <div className="converter-input-wrapper">
            <input 
              type="number" 
              className="converter-input" 
              value={currencyVal}
              onChange={(e) => setCurrencyVal(e.target.value)}
              placeholder="0"
              aria-label="Cantidad en USD (Dólares)"
            />
            <span className="converter-result" aria-live="polite" aria-label={`Equivale a ${(Number(currencyVal) * USD_TO_PEN).toFixed(2)} Soles peruanos`}>
              {(Number(currencyVal) * USD_TO_PEN).toFixed(2)}
            </span>
          </div>
        </li>

        {/* Distance Row */}
        <li className="converter-row">
          <div className="converter-label">
            <div className="converter-icon-circle" style={{ backgroundColor: '#10b981' }} aria-hidden="true">
              <Navigation size={12} />
            </div>
            <span>Unidades (km → mi)</span>
          </div>
          <div className="converter-input-wrapper">
            <input 
              type="number" 
              className="converter-input" 
              value={distanceVal}
              onChange={(e) => setDistanceVal(e.target.value)}
              placeholder="0"
              aria-label="Distancia en kilómetros"
            />
            <span className="converter-result" aria-live="polite" aria-label={`Equivale a ${(Number(distanceVal) * KM_TO_MI).toFixed(2)} Millas`}>
              {(Number(distanceVal) * KM_TO_MI).toFixed(2)}
            </span>
          </div>
        </li>

        {/* Weight Row */}
        <li className="converter-row">
          <div className="converter-label">
            <div className="converter-icon-circle" style={{ backgroundColor: '#f59e0b' }} aria-hidden="true">
              <Scale size={12} />
            </div>
            <span>Peso (kg → lb)</span>
          </div>
          <div className="converter-input-wrapper">
            <input 
              type="number" 
              className="converter-input" 
              value={weightVal}
              onChange={(e) => setWeightVal(e.target.value)}
              placeholder="0"
              aria-label="Peso en kilogramos"
            />
            <span className="converter-result" aria-live="polite" aria-label={`Equivale a ${(Number(weightVal) * KG_TO_LB).toFixed(2)} Libras`}>
              {(Number(weightVal) * KG_TO_LB).toFixed(2)}
            </span>
          </div>
        </li>

        {/* Length Row */}
        <li className="converter-row">
          <div className="converter-label">
            <div className="converter-icon-circle" style={{ backgroundColor: '#ec4899' }} aria-hidden="true">
              <Ruler size={12} />
            </div>
            <span>Longitud (m → ft)</span>
          </div>
          <div className="converter-input-wrapper">
            <input 
              type="number" 
              className="converter-input" 
              value={lengthVal}
              onChange={(e) => setLengthVal(e.target.value)}
              placeholder="0"
              aria-label="Longitud en metros"
            />
            <span className="converter-result" aria-live="polite" aria-label={`Equivale a ${(Number(lengthVal) * M_TO_FT).toFixed(2)} Pies`}>
              {(Number(lengthVal) * M_TO_FT).toFixed(2)}
            </span>
          </div>
        </li>
      </ul>

      <span 
        className="widget-link" 
        onClick={() => alert('Conversor completo en desarrollo')}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') alert('Conversor completo en desarrollo'); }}
      >
        Ver todos los conversores →
      </span>
    </article>
  );
}
