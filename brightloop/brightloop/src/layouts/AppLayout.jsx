import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, UserRound, Package, Boxes, Layers3, FileText, Repeat2, ReceiptText,
  BadgePercent, Landmark, CreditCard, ChartNoAxesCombined, ChartPie, Settings, CircleUserRound,
  PanelLeftClose, PanelLeftOpen, Search, Bell, Sun, Moon, ChevronDown, LogOut, Menu, X,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { IconButton } from '../components/ui'

const adminSections = [
  { label: 'Overview', items: [{ to: '/', label: 'Dashboard', icon: LayoutDashboard }] },
  { label: 'Management', items: [
    { to: '/users', label: 'Users & Staff', icon: Users, adminOnly: true },
    { to: '/customers', label: 'Customers', icon: UserRound },
    { to: '/products', label: 'Products', icon: Package },
    { to: '/variants', label: 'Product Variants', icon: Boxes },
    { to: '/plans', label: 'Subscription Plans', icon: Layers3 },
    { to: '/quotations', label: 'Quotations', icon: FileText },
    { to: '/subscriptions', label: 'Subscriptions', icon: Repeat2 },
  ] },
  { label: 'Billing', items: [
    { to: '/invoices', label: 'Invoices', icon: ReceiptText },
    { to: '/discounts', label: 'Discounts & Coupons', icon: BadgePercent },
    { to: '/taxes', label: 'Tax Management', icon: Landmark },
    { to: '/payments', label: 'Payments', icon: CreditCard },
  ] },
  { label: 'Analytics', items: [
    { to: '/reports', label: 'Revenue Reports', icon: ChartNoAxesCombined },
    { to: '/analytics', label: 'Subscription Analytics', icon: ChartPie },
  ] },
  { label: 'Account', items: [
    { to: '/settings', label: 'Settings', icon: Settings },
    { to: '/profile', label: 'My Profile', icon: CircleUserRound },
  ] },
]

const customerSections = [
  { label: 'My account', items: [
    { to: '/', label: 'Overview', icon: LayoutDashboard },
    { to: '/subscriptions', label: 'My subscriptions', icon: Repeat2 },
    { to: '/plans', label: 'Browse plans', icon: Layers3 },
    { to: '/invoices', label: 'My invoices', icon: ReceiptText },
    { to: '/payments', label: 'Payment history', icon: CreditCard },
    { to: '/profile', label: 'My profile', icon: CircleUserRound },
  ] },
]

export default function AppLayout() {
  const { user, setUser, theme, setTheme, toast } = useApp()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const sections = user?.role === 'Customer' ? customerSections : adminSections
  const title = [...sections.flatMap((s) => s.items)].find((item) => item.to === location.pathname)?.label || 'Dashboard'

  const logout = () => { setUser(null); navigate('/login') }
  return <div className={`app-shell ${collapsed ? 'is-collapsed' : ''}`}>
    {mobileOpen && <button className="mobile-overlay" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><span /><span /></div><div className="brand-copy"><strong>Brightloop</strong><small>Subscriptions</small></div><IconButton label="Close navigation" className="mobile-close" onClick={() => setMobileOpen(false)}><X size={18} /></IconButton></div>
      <nav className="side-nav">
        {sections.map((section) => <div className="nav-section" key={section.label}>
          <div className="nav-label">{section.label}</div>
          {section.items.filter((item) => !item.adminOnly || user?.role === 'Admin').map(({ to, label, icon: Icon }) =>
            <NavLink key={to} to={to} end={to === '/'} title={collapsed ? label : undefined} onClick={() => setMobileOpen(false)}>
              <Icon size={19} /><span>{label}</span>
            </NavLink>)}
        </div>)}
      </nav>
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>{collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}<span>Collapse sidebar</span></button>
    </aside>
    <div className="workspace">
      <header className="topbar">
        <div className="topbar-left"><IconButton label="Open navigation" className="mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={20} /></IconButton><div className="breadcrumb"><span>Brightloop</span><i>/</i><strong>{title}</strong></div></div>
        <div className="topbar-search"><Search size={17} /><input placeholder="Search anything…" aria-label="Global search" /></div>
        <div className="topbar-actions">
          <IconButton label={theme === 'dark' ? 'Use light theme' : 'Use dark theme'} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}</IconButton>
          <IconButton label="Notifications" className="notification-btn"><Bell size={19} /><span /></IconButton>
          <div className="profile-menu">
            <button className="profile-trigger" onClick={() => setProfileOpen(!profileOpen)}><span className="avatar">{user?.name?.split(' ').map((v) => v[0]).join('').slice(0, 2)}</span><span className="profile-copy"><strong>{user?.name}</strong><small>{user?.role}</small></span><ChevronDown size={15} /></button>
            {profileOpen && <div className="profile-dropdown"><button onClick={() => { navigate('/profile'); setProfileOpen(false) }}><CircleUserRound size={17} />My profile</button><button onClick={logout}><LogOut size={17} />Log out</button></div>}
          </div>
        </div>
      </header>
      <main className="main-content"><Outlet /></main>
    </div>
    {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}
  </div>
}
