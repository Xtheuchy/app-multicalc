import { Menu, Search, Bell, Moon, Sun, User } from 'lucide-react';
import { useState } from 'react';

export default function Header({ searchQuery, setSearchQuery, mobileSidebarOpen, setMobileSidebarOpen }) {
  const [notifications, setNotifications] = useState(true);

  return (
    <header className="header">
      <button 
        className="mobile-menu-btn" 
        onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        aria-label="Abrir menú de navegación"
      >
        <Menu size={20} aria-hidden="true" />
      </button>

      <form className="header-search" role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search-input" style={{ display: 'none' }}>Buscar herramienta</label>
        <Search size={18} className="search-icon" aria-hidden="true" />
        <input 
          id="search-input"
          type="search" 
          placeholder="Buscar herramienta..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Buscar herramientas de cálculo"
        />
        <span className="search-shortcut" aria-hidden="true">Ctrl + K</span>
      </form>

      <div className="header-actions">
        <button 
          className="header-btn" 
          onClick={() => {
            setNotifications(false);
            alert('No tienes notificaciones pendientes');
          }}
          style={{ position: 'relative' }}
        >
          <Bell size={18} />
          {notifications && (
            <span style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-pink)'
            }} />
          )}
        </button>

        <button className="header-btn" onClick={() => alert('Modo claro/oscuro en desarrollo')}>
          <Moon size={18} />
        </button>

        <div className="user-profile" onClick={() => alert('Perfil del usuario')}>
          <div className="user-avatar">A</div>
          <span className="user-name">Hola, Alex</span>
        </div>
      </div>
    </header>
  );
}
