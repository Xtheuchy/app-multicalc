import { 
  Home, Star, History, Shuffle, Calculator, DollarSign, Heart, 
  Home as HomeIcon, Hammer, Utensils, Car, BarChart2, Calendar, 
  Briefcase, MoreHorizontal, ChevronLeft, ChevronRight, Rocket, X
} from 'lucide-react';

export default function Sidebar({ 
  activeCategory, 
  setActiveCategory, 
  sidebarCollapsed, 
  setSidebarCollapsed,
  mobileSidebarOpen,
  setMobileSidebarOpen
}) {
  const mainMenu = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'favoritos', label: 'Favoritos', icon: Star },
    { id: 'historial', label: 'Historial', icon: History },
    { id: 'conversores', label: 'Conversores', icon: Shuffle }
  ];

  const categories = [
    { id: 'matematicas', label: 'Matemáticas', icon: Calculator, color: 'matematicas' },
    { id: 'finanzas', label: 'Finanzas', icon: DollarSign, color: 'finanzas' },
    { id: 'salud', label: 'Salud', icon: Heart, color: 'salud' },
    { id: 'hogar', label: 'Hogar', icon: HomeIcon, color: 'hogar' },
    { id: 'construccion', label: 'Construcción', icon: Hammer, color: 'construccion' },
    { id: 'alimentos', label: 'Alimentos', icon: Utensils, color: 'alimentos' },
    { id: 'transporte', label: 'Transporte', icon: Car, color: 'transporte' },
    { id: 'estadistica', label: 'Estadística', icon: BarChart2, color: 'estadistica' },
    { id: 'planificacion', label: 'Planificación', icon: Calendar, color: 'planificacion' },
    { id: 'negocios', label: 'Negocios', icon: Briefcase, color: 'negocios' },
    { id: 'otros', label: 'Otros', icon: MoreHorizontal, color: 'otros' }
  ];

  return (
    <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${mobileSidebarOpen ? 'mobile-open' : ''}`} aria-label="Barra lateral MultiCalc">
      <div className="sidebar-header">
        <div className="sidebar-logo" aria-hidden="true">
          <Calculator size={20} />
        </div>
        {!sidebarCollapsed && <span>MultiCalc</span>}
        <button 
          className="sidebar-close-btn"
          onClick={() => setMobileSidebarOpen(false)}
          aria-label="Cerrar menú lateral"
        >
          <X size={18} aria-hidden="true" />
        </button>
      </div>

      <nav className="sidebar-menu" aria-label="Navegación de categorías">
        {mainMenu.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`sidebar-item ${activeCategory === item.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(item.id)}
            >
              <Icon size={18} />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          );
        })}

        {!sidebarCollapsed && <div className="sidebar-section-title">Categorías</div>}

        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              className={`sidebar-item ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              title={sidebarCollapsed ? cat.label : undefined}
            >
              <Icon size={18} />
              {!sidebarCollapsed && <span>{cat.label}</span>}
            </button>
          );
        })}

        {!sidebarCollapsed && (
          <div className="sidebar-promo-card">
            <Rocket size={24} className="favorite-icon" style={{ margin: '0 auto' }} />
            <h4>Potencia tu día</h4>
            <p>Todas las herramientas que necesitas, en un solo lugar.</p>
            <button 
              className="sidebar-promo-btn"
              onClick={() => alert('¡Guía rápida en desarrollo!')}
            >
              Ver guía rápida
            </button>
          </div>
        )}
      </nav>

      <button 
        className="sidebar-collapse-btn" 
        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
      >
        {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </aside>
  );
}
