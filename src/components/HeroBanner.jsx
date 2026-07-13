import { Zap, Shield, Users } from 'lucide-react';
import heroImg from '../assets/hero_illustration.png';

export default function HeroBanner() {
  return (
    <section className="hero-banner" aria-labelledby="hero-title">
      <div className="hero-content">
        <h1 id="hero-title" className="hero-title">
          ¡Todo lo que necesitas,<br />
          <span>en un solo lugar!</span>
        </h1>
        <p className="hero-desc">
          Más de 60 herramientas para calcular, convertir, planificar y simplificar tu vida diaria.
        </p>

        <div className="hero-features">
          <div className="hero-feature-item">
            <div className="hero-feature-icon" style={{ color: 'var(--accent-orange)' }} aria-hidden="true">
              <Zap size={16} />
            </div>
            <div>
              <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Rápido y fácil</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Herramientas intuitivas y al instante.</span>
            </div>
          </div>

          <div className="hero-feature-item">
            <div className="hero-feature-icon" style={{ color: 'var(--accent-blue)' }} aria-hidden="true">
              <Shield size={16} />
            </div>
            <div>
              <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Preciso y confiable</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Cálculos precisos para decisiones.</span>
            </div>
          </div>

          <div className="hero-feature-item">
            <div className="hero-feature-icon" style={{ color: 'var(--accent-purple)' }} aria-hidden="true">
              <Users size={16} />
            </div>
            <div>
              <strong style={{ display: 'block', color: 'var(--text-primary)' }}>Para todos</strong>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Estudiantes, profesionales y más.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-image-container">
        <img 
          src={heroImg} 
          alt="Ilustración de calculadora MultiCalc" 
          className="hero-image"
          loading="eager"
        />
      </div>
    </section>
  );
}
