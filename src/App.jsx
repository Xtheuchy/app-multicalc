import { useState, useMemo, useEffect } from 'react';
import { 
  Percent, TrendingUp, RefreshCw, Heart, Calendar, 
  Lightbulb, Landmark, BarChart2, Navigation, Star, 
  DollarSign, Calculator, Calculator as CalcIcon, Shuffle,
  HelpCircle, ChevronRight
} from 'lucide-react';
// Core components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import QuickCalculator from './components/QuickCalculator';
import QuickConverters from './components/QuickConverters';
import ToolModal from './components/ToolModal';
import Footer from './components/Footer';

const ALL_TOOLS = [
  {
    id: 'descuentos',
    title: 'Descuentos',
    desc: 'Calcula el precio final con descuentos',
    category: 'matematicas',
    icon: Percent,
    color: '#10b981'
  },
  {
    id: 'interes-compuesto',
    title: 'Interés compuesto',
    desc: 'Calcula el crecimiento de tu inversión',
    category: 'finanzas',
    icon: TrendingUp,
    color: '#8b5cf6'
  },
  {
    id: 'monedas',
    title: 'Conversión de monedas',
    desc: 'Convierte entre más de 150 monedas',
    category: 'finanzas',
    icon: RefreshCw,
    color: '#3b82f6'
  },
  {
    id: 'imc',
    title: 'IMC',
    desc: 'Calcula tu índice de masa corporal',
    category: 'salud',
    icon: Heart,
    color: '#ec4899'
  },
  {
    id: 'pagos',
    title: 'Planificador de pagos',
    desc: 'Organiza y planifica tus pagos',
    category: 'finanzas',
    icon: Calendar,
    color: '#f59e0b'
  },
  {
    id: 'consumo-electrico',
    title: 'Consumo eléctrico',
    desc: 'Calcula tu consumo y costo eléctrico',
    category: 'hogar',
    icon: Lightbulb,
    color: '#f59e0b'
  },
  {
    id: 'ahorro',
    title: 'Ahorro proyectado',
    desc: 'Proyecta tu ahorro en el tiempo',
    category: 'finanzas',
    icon: TrendingUp,
    color: '#10b981'
  },
  {
    id: 'amortizacion',
    title: 'Amortización',
    desc: 'Tabla de amortización de préstamos',
    category: 'finanzas',
    icon: Landmark,
    color: '#3b82f6'
  },
  {
    id: 'ofertas',
    title: 'Comparador de ofertas',
    desc: 'Compara y elige la mejor opción',
    category: 'otros',
    icon: BarChart2,
    color: '#ec4899'
  },
  {
    id: 'eta',
    title: 'ETA',
    desc: 'Tiempo estimado de llegada',
    category: 'transporte',
    icon: Navigation,
    color: '#06b6d4'
  }
];

const CATEGORIES_DATA = [
  { id: 'matematicas', name: 'Matemáticas', count: 20, className: 'matematicas' },
  { id: 'finanzas', name: 'Finanzas', count: 25, className: 'finanzas' },
  { id: 'salud', name: 'Salud', count: 8, className: 'salud' },
  { id: 'hogar', name: 'Hogar', count: 10, className: 'hogar' },
  { id: 'construccion', name: 'Construcción', count: 9, className: 'construccion' },
  { id: 'alimentos', name: 'Alimentos', count: 6, className: 'alimentos' },
  { id: 'transporte', name: 'Transporte', count: 9, className: 'transporte' },
  { id: 'estadistica', name: 'Estadística', count: 7, className: 'estadistica' },
  { id: 'planificacion', name: 'Planificación', count: 8, className: 'planificacion' }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('inicio');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [favorites, setFavorites] = useState(['interes-compuesto', 'pagos', 'ahorro']);
  const [selectedTool, setSelectedTool] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Close mobile sidebar when category changes
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [activeCategory]);

  // Toggle favorite helper
  const handleToggleFavorite = (toolId, e) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(toolId) 
        ? prev.filter(id => id !== toolId) 
        : [...prev, toolId]
    );
  };

  // Filter tools based on search query and category
  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter(tool => {
      const matchesSearch = 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (activeCategory === 'inicio') {
        return matchesSearch;
      }
      if (activeCategory === 'favoritos') {
        return favorites.includes(tool.id) && matchesSearch;
      }
      if (activeCategory === 'conversores') {
        return ['monedas', 'eta'].includes(tool.id) && matchesSearch;
      }
      if (activeCategory === 'historial') {
        // Return first 3 tools just as a placeholder for history
        return ['descuentos', 'imc', 'pagos'].includes(tool.id) && matchesSearch;
      }
      return tool.category === activeCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, favorites]);

  // Favorite tools objects mapping
  const favoriteToolsList = useMemo(() => {
    return ALL_TOOLS.filter(t => favorites.includes(t.id));
  }, [favorites]);

  return (
    <div className="app-layout">
      {/* Collapsible Sidebar */}
      <Sidebar 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
      />

      {/* Overlay backdrop for mobile sidebar */}
      {mobileSidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />

        <div className="content-container">
          {/* Main Dashboard view */}
          {activeCategory === 'inicio' && (
            <>
              {/* Hero Banner Component */}
              <HeroBanner />

              {/* Category Grid Section */}
              <section aria-labelledby="categories-heading">
                <h2 id="categories-heading" className="section-title">Explora por categoría</h2>
                <div className="category-grid">
                  {CATEGORIES_DATA.map(cat => (
                    <div 
                      key={cat.id} 
                      className="category-card"
                      onClick={() => setActiveCategory(cat.id)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Ver herramientas de ${cat.name}`}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveCategory(cat.id); }}
                    >
                      <div className={`category-icon-wrapper ${cat.className}`} aria-hidden="true">
                        <Calculator size={20} />
                      </div>
                      <span className="category-name">{cat.name}</span>
                      <span className="category-count">{cat.count} herramientas</span>
                    </div>
                  ))}
                  <div 
                    className="category-card" 
                    onClick={() => setActiveCategory('inicio')}
                    role="button"
                    tabIndex={0}
                    aria-label="Ver todas las categorías de herramientas"
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveCategory('inicio'); }}
                  >
                    <div className="category-icon-wrapper ver-todas" aria-hidden="true">
                      <Shuffle size={20} />
                    </div>
                    <span className="category-name">Ver todas</span>
                    <span className="category-count">60+ herramientas</span>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* Featured Tools Grid */}
          <section aria-labelledby="tools-heading">
            <h2 id="tools-heading" className="section-title">
              {activeCategory === 'inicio' ? 'Herramientas destacadas' : `Resultados: ${activeCategory}`}
            </h2>
            {filteredTools.length > 0 ? (
              <div className="tools-grid">
                {filteredTools.map(tool => {
                  const ToolIcon = tool.icon;
                  const isFav = favorites.includes(tool.id);
                  return (
                    <article 
                      key={tool.id} 
                      className="tool-card"
                      onClick={() => setSelectedTool(tool)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Usar herramienta ${tool.title}`}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedTool(tool); }}
                    >
                      <button 
                        className={`tool-favorite-btn ${isFav ? 'active' : ''}`}
                        onClick={(e) => handleToggleFavorite(tool.id, e)}
                      >
                        <Star size={16} fill={isFav ? 'currentColor' : 'none'} />
                      </button>

                      <div className="tool-icon-wrapper" style={{ backgroundColor: tool.color }}>
                        <ToolIcon size={20} />
                      </div>

                      <h3 className="tool-title">{tool.title}</h3>
                      <p className="tool-desc">{tool.desc}</p>
                      
                      <button className="tool-action-btn" tabIndex={-1}>
                        Usar
                      </button>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="favorites-empty">
                <HelpCircle size={32} />
                <p style={{ marginTop: '8px' }}>No se encontraron herramientas en esta sección.</p>
              </div>
            )}
          </section>

          {/* Bottom Grid: Quick Calculator, Quick Converters, and Favorites List */}
          {activeCategory === 'inicio' && (
            <section className="widgets-container" aria-label="Herramientas rápidas y accesos directos">
              {/* Left Widget: Live Calculator */}
              <QuickCalculator />

              {/* Middle Widget: Inline Unit and Currency Converter */}
              <QuickConverters />

              {/* Right Widget: Active Favorites list */}
              <div className="widget-card">
                <div className="widget-header">
                  <Star size={18} style={{ color: 'var(--accent-orange)' }} />
                  <span>Mis herramientas favoritas</span>
                </div>

                <div className="favorites-list">
                  {favoriteToolsList.length > 0 ? (
                    favoriteToolsList.map(t => (
                      <div 
                        key={t.id} 
                        className="favorite-row"
                        onClick={() => setSelectedTool(t)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Abrir favorita ${t.title}`}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedTool(t); }}
                      >
                        <div className="favorite-label">
                          <Star size={14} className="favorite-icon" fill="currentColor" />
                          <span>{t.title}</span>
                        </div>
                        <ChevronRight size={14} className="favorite-arrow" />
                      </div>
                    ))
                  ) : (
                    <div className="favorites-empty">
                      <Star size={24} />
                      <p style={{ marginTop: '8px' }}>No tienes herramientas marcadas como favoritas aún.</p>
                    </div>
                  )}
                </div>

                <span 
                  className="widget-link" 
                  onClick={() => setActiveCategory('favoritos')}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveCategory('favoritos'); }}
                >
                  Ver todas mis favoritas →
                </span>
              </div>
            </section>
          )}

          {/* Bottom Promotion Stats Banner */}
          {activeCategory === 'inicio' && (
            <div className="bottom-promo-banner">
              <div className="bottom-promo-content">
                <h3 className="bottom-promo-title">¡Haz más, con menos esfuerzo!</h3>
                <p className="bottom-promo-desc">
                  MultiCalc te ayuda a tomar mejores decisiones con herramientas prácticas y precisas.
                </p>
                <button 
                  className="bottom-promo-btn"
                  onClick={() => alert('Próximamente disponible')}
                >
                  Explorar todas las herramientas
                </button>
              </div>

              <div className="bottom-stats">
                <div className="stat-item">
                  <div className="stat-number">60+</div>
                  <div className="stat-label">Herramientas</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Categorías</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Gratuito</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Soporte</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer component */}
        <Footer />
      </div>

      {/* Floating Modal Window for active tool operations */}
      {selectedTool && (
        <ToolModal 
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </div>
  );
}
