import { useMemo, useState } from 'react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowDownRight, ArrowUpRight, CalendarDays, ChevronRight, CircleAlert, CreditCard, IndianRupee, ReceiptText, Repeat2, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { revenueData } from '../data/mockData'
import { formatCurrency } from '../utils/calculations'
import { Badge, Button, Card, PageHeader, Select } from '../components/ui'

const chartColors = ['var(--primary)', 'var(--success)', 'var(--warning)', 'var(--danger)']

function StatCard({ label, value, change, icon: Icon, tone = 'primary' }) {
  const positive = !String(change).startsWith('-')
  return <Card className="stat-card"><div className={`stat-icon stat-${tone}`}><Icon size={20} /></div><div className="stat-body"><span>{label}</span><strong>{value}</strong><small className={positive ? 'positive' : 'negative'}>{positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}{change} <em>vs last month</em></small></div></Card>
}

function TableBlock({ title, subtitle, columns, rows, onViewAll }) {
  return <Card className="table-card"><div className="card-heading"><div><h2>{title}</h2><p>{subtitle}</p></div><Button variant="text" onClick={onViewAll}>View all <ChevronRight size={15} /></Button></div>
    <div className="table-scroll"><table><thead><tr>{columns.map((c) => <th key={c.key}>{c.label}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.id}>{columns.map((c) => <td key={c.key}>{c.render ? c.render(row[c.key], row) : row[c.key]}</td>)}</tr>)}</tbody></table></div>
  </Card>
}

export default function Dashboard() {
  const { data, user, notify } = useApp()
  const [period, setPeriod] = useState('Last 6 months')
  const navigate = useNavigate()
  const stats = useMemo(() => {
    const activeSubs = data.subscriptions.filter((s) => s.status === 'Active')
    const received = data.payments.reduce((sum, p) => sum + p.amount, 0)
    const outstanding = data.invoices.reduce((sum, i) => sum + Math.max(0, i.amount - i.paid), 0)
    return { activeSubs, received, outstanding }
  }, [data])

  if (user?.role === 'Customer') return <CustomerDashboard />

  return <div className="page-stack">
    <PageHeader eyebrow="Overview" title="Good morning, Aarav" description="Here’s what’s happening across your subscription business today." actions={<><Select value={period} onChange={(e) => setPeriod(e.target.value)}><option>Last 6 months</option><option>This year</option><option>Last 30 days</option></Select><Button icon={Repeat2} onClick={() => notify('Recurring billing simulation completed for 4 subscriptions')}>Run billing</Button></>} />
    <div className="demo-banner"><CircleAlert size={17} /><span><strong>Demonstration workspace.</strong> Figures shown are realistic sample data and no real payment processing occurs.</span></div>
    <div className="stats-grid">
      <StatCard label="Total customers" value={data.customers.length + 244} change="+12.5%" icon={Users} />
      <StatCard label="Active subscriptions" value={stats.activeSubs.length + 280} change="+8.2%" icon={Repeat2} tone="success" />
      <StatCard label="Monthly recurring revenue" value={formatCurrency(348500)} change="+14.2%" icon={IndianRupee} tone="violet" />
      <StatCard label="Outstanding amount" value={formatCurrency(stats.outstanding)} change="-4.1%" icon={ReceiptText} tone="warning" />
    </div>
    <div className="chart-grid">
      <Card className="chart-card chart-main"><div className="card-heading"><div><h2>Monthly revenue</h2><p>Recurring and one-time revenue</p></div><div className="chart-total"><small>Mar revenue</small><strong>{formatCurrency(348500)}</strong></div></div>
        <ResponsiveContainer width="100%" height={280}><LineChart data={revenueData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}><CartesianGrid stroke="var(--chart-grid)" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} /><Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }} formatter={(v) => formatCurrency(v)} /><Line type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} dot={false} activeDot={{ r: 5 }} /></LineChart></ResponsiveContainer>
      </Card>
      <Card className="chart-card"><div className="card-heading"><div><h2>Payment status</h2><p>March invoice value</p></div></div>
        <div className="donut-wrap"><ResponsiveContainer width="100%" height={210}><PieChart><Pie data={[{ name: 'Paid', value: 68 }, { name: 'Outstanding', value: 22 }, { name: 'Overdue', value: 10 }]} dataKey="value" innerRadius={65} outerRadius={88} paddingAngle={3}>{chartColors.slice(1).map((color) => <Cell key={color} fill={color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer><div className="donut-label"><strong>82%</strong><span>collected</span></div></div>
        <div className="legend-row"><span><i className="dot success" />Paid</span><span><i className="dot warning" />Outstanding</span><span><i className="dot danger" />Overdue</span></div>
      </Card>
    </div>
    <div className="chart-grid equal">
      <Card className="chart-card"><div className="card-heading"><div><h2>Subscription health</h2><p>Active versus cancelled</p></div></div><ResponsiveContainer width="100%" height={230}><AreaChart data={revenueData} margin={{ left: -20 }}><defs><linearGradient id="activeFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25} /><stop offset="100%" stopColor="var(--primary)" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="var(--chart-grid)" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} /><Tooltip /><Area type="monotone" dataKey="subscriptions" stroke="var(--primary)" fill="url(#activeFill)" /><Area type="monotone" dataKey="cancelled" stroke="var(--danger)" fill="transparent" /></AreaChart></ResponsiveContainer></Card>
      <Card className="chart-card"><div className="card-heading"><div><h2>Revenue by plan</h2><p>Current monthly contribution</p></div></div><ResponsiveContainer width="100%" height={230}><BarChart data={[{ name: 'Starter', value: 91 }, { name: 'Growth', value: 142 }, { name: 'Scale', value: 84 }, { name: 'Enterprise', value: 31 }]}><CartesianGrid stroke="var(--chart-grid)" vertical={false} /><XAxis dataKey="name" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} /><Tooltip /><Bar dataKey="value" fill="var(--primary)" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></Card>
    </div>
    <div className="table-grid">
      <TableBlock title="Recent subscriptions" subtitle="Latest customer activity" onViewAll={() => navigate('/subscriptions')} rows={data.subscriptions.slice(0, 4)} columns={[{ key: 'id', label: 'Subscription' }, { key: 'customer', label: 'Customer' }, { key: 'plan', label: 'Plan' }, { key: 'amount', label: 'Amount', render: formatCurrency }, { key: 'status', label: 'Status', render: (v) => <Badge>{v}</Badge> }]} />
      <TableBlock title="Recent invoices" subtitle="Latest issued invoices" onViewAll={() => navigate('/invoices')} rows={data.invoices.slice(0, 4)} columns={[{ key: 'id', label: 'Invoice' }, { key: 'customer', label: 'Customer' }, { key: 'amount', label: 'Amount', render: formatCurrency }, { key: 'status', label: 'Status', render: (v) => <Badge>{v}</Badge> }]} />
    </div>
  </div>
}

function CustomerDashboard() {
  const { data, user, notify } = useApp()
  const customerName = user?.company || 'Orbit Works'
  const subscriptions = data.subscriptions.filter((s) => s.customer === customerName)
  const invoices = data.invoices.filter((i) => i.customer === customerName)
  return <div className="page-stack"><PageHeader eyebrow="Customer portal" title={`Welcome back, ${user.name.split(' ')[0]}`} description="Manage your subscriptions, invoices and billing details." />
    <div className="stats-grid customer-stats"><StatCard label="Active subscriptions" value={subscriptions.length} change="+0%" icon={Repeat2} /><StatCard label="Next payment" value={formatCurrency(subscriptions[0]?.amount || 0)} change="Due Apr 1" icon={CalendarDays} tone="violet" /><StatCard label="Outstanding" value={formatCurrency(invoices.reduce((s, i) => s + i.amount - i.paid, 0))} change="1 invoice" icon={CreditCard} tone="warning" /></div>
    <Card className="portal-hero"><div><span className="eyebrow">Current plan</span><h2>{subscriptions[0]?.plan || 'Growth'} plan</h2><p>Your subscription is active and renews automatically on {subscriptions[0]?.nextBilling || '01 Apr 2025'}.</p></div><Button onClick={() => notify('Your change request has been sent to support')}>Request a change</Button></Card>
    <TableBlock title="Your invoices" subtitle="Your latest billing activity" onViewAll={() => {}} rows={invoices} columns={[{ key: 'id', label: 'Invoice' }, { key: 'date', label: 'Issued' }, { key: 'due', label: 'Due' }, { key: 'amount', label: 'Amount', render: formatCurrency }, { key: 'status', label: 'Status', render: (v) => <Badge>{v}</Badge> }]} />
  </div>
}
