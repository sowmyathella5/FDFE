import React from 'react';
import { LogOut } from 'lucide-react';

const Sidebar = ({ 
  brandIcon: BrandIcon, 
  brandName, 
  brandColor,
  subtitle, 
  menuItems, 
  activeTab, 
  setActiveTab, 
  onFooterClick,
  footerLabel = "Logout",
  footerIcon: FooterIcon = LogOut,
  footerColor = "var(--danger)"
}) => {
  return (
    <aside className="sidebar">
      <div className="logo" style={{ color: brandColor || 'inherit' }}>
        {BrandIcon && <BrandIcon className="text-primary" size={24} style={{ color: brandColor }} />} 
        {brandName}
      </div>
      
      {subtitle && (
        <p className="text-muted mb-2" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', paddingLeft: '0.5rem' }}>
          {subtitle}
        </p>
      )}
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div 
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon && <item.icon size={20} />}
            {item.label}
          </div>
        ))}
      </nav>

      {onFooterClick && (
        <div className="nav-footer">
          <div className="nav-item" onClick={onFooterClick} style={{ color: footerColor }}>
            <FooterIcon size={20} />
            {footerLabel}
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
