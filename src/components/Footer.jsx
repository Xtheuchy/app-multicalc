export default function Footer() {
  return (
    <footer className="footer" aria-label="Pie de página">
      <div>© 2026 MultiCalc. Todas las herramientas que necesitas, en un solo lugar.</div>
      <div className="footer-links">
        <button 
          className="footer-link" 
          onClick={() => alert('Sobre Nosotros')} 
          aria-label="Acerca de MultiCalc"
        >
          Acerca de
        </button>
        <button 
          className="footer-link" 
          onClick={() => alert('Política de Privacidad')} 
          aria-label="Política de privacidad"
        >
          Privacidad
        </button>
        <button 
          className="footer-link" 
          onClick={() => alert('Términos de servicio')} 
          aria-label="Términos de servicio"
        >
          Términos
        </button>
        <button 
          className="footer-link" 
          onClick={() => alert('Contacto')} 
          aria-label="Contacto de soporte"
        >
          Contacto
        </button>
      </div>
    </footer>
  );
}
