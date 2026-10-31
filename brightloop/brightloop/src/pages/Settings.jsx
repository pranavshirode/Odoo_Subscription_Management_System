import { useState } from 'react'
import { Bell, Building2, CircleUserRound, KeyRound, Palette, Save } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Button, Card, Input, PageHeader, Select } from '../components/ui'

export default function Settings({ profile = false }) {
  const { user, theme, setTheme, notify } = useApp()
  const [tab, setTab] = useState(profile ? 'Profile' : 'Company')
  const tabs = profile ? [{ name: 'Profile', icon: CircleUserRound }, { name: 'Password', icon: KeyRound }, { name: 'Notifications', icon: Bell }] : [{ name: 'Company', icon: Building2 }, { name: 'Appearance', icon: Palette }, { name: 'Notifications', icon: Bell }]
  return <div className="page-stack"><PageHeader eyebrow="Account" title={profile ? 'My Profile' : 'Settings'} description="Manage your workspace preferences and account details." />
    <div className="settings-layout"><Card className="settings-nav">{tabs.map(({ name, icon: Icon }) => <button className={tab === name ? 'active' : ''} key={name} onClick={() => setTab(name)}><Icon size={18} />{name}</button>)}</Card>
      <Card className="settings-panel"><div className="card-heading"><div><h2>{tab}</h2><p>Update your {tab.toLowerCase()} preferences below.</p></div></div>
        {tab === 'Company' && <div className="form-grid"><Input label="Company name" defaultValue="Brightloop Technologies Pvt. Ltd." /><Input label="Billing email" defaultValue="finance@brightloop.in" /><Input label="GSTIN" defaultValue="27AABCB1234C1Z5" /><Select label="Base currency" defaultValue="INR"><option value="INR">Indian Rupee (₹)</option><option value="USD">US Dollar ($)</option></Select><Input label="Registered address" className="span-2" defaultValue="Bandra Kurla Complex, Mumbai, Maharashtra" /></div>}
        {tab === 'Profile' && <div className="form-grid"><Input label="Full name" defaultValue={user.name} /><Input label="Email" defaultValue={user.email} /><Input label="Role" value={user.role} disabled /><Input label="Phone" defaultValue="+91 98765 43210" /></div>}
        {tab === 'Password' && <div className="form-grid one-column"><Input label="Current password" type="password" /><Input label="New password" type="password" /><Input label="Confirm new password" type="password" /></div>}
        {tab === 'Appearance' && <div className="theme-options"><button className={theme === 'light' ? 'active' : ''} onClick={() => setTheme('light')}><span className="theme-preview light-preview" /><strong>Light</strong><small>Bright and clean</small></button><button className={theme === 'dark' ? 'active' : ''} onClick={() => setTheme('dark')}><span className="theme-preview dark-preview" /><strong>Dark</strong><small>Easy on the eyes</small></button></div>}
        {tab === 'Notifications' && <div className="preference-list">{['Invoice paid', 'Payment overdue', 'Subscription renewal due', 'Weekly revenue summary'].map((item) => <label key={item}><span><strong>{item}</strong><small>Receive an email when this event occurs.</small></span><input type="checkbox" defaultChecked /></label>)}</div>}
        <div className="settings-footer"><Button icon={Save} onClick={() => notify(`${tab} settings saved`)}>Save changes</Button></div>
      </Card>
    </div>
  </div>
}
