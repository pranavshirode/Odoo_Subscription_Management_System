import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Download, IndianRupee, ReceiptText, Repeat2, TrendingUp } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { revenueData } from '../data/mockData'
import { downloadCsv, formatCurrency } from '../utils/calculations'
import { Button, Card, PageHeader, Select } from '../components/ui'

export default function Reports({ analytics = false }) {
  const { data, notify } = useApp()
  const [range, setRange] = useState('Last 6 months')
  const chart = analytics ? 'Subscriptions' : 'Revenue'
  return <div className="page-stack"><PageHeader eyebrow="Analytics" title={analytics ? 'Subscription Analytics' : 'Revenue Reports'} description={`Explore ${chart.toLowerCase()} performance and export decision-ready data.`} actions={<><Select value={range} onChange={(e) => setRange(e.target.value)}><option>Last 6 months</option><option>This year</option><option>Last 30 days</option></Select><Button icon={Download} onClick={() => { downloadCsv('brightloop-report.csv', analytics ? data.subscriptions : data.payments); notify('Report exported to CSV') }}>Export CSV</Button></>} />
    <div className="stats-grid"><ReportMetric icon={IndianRupee} label="Total revenue" value={formatCurrency(1814500)} detail="+14.2% this period" /><ReportMetric icon={TrendingUp} label="Average MRR" value={formatCurrency(259214)} detail="+8.4% this period" /><ReportMetric icon={Repeat2} label="Renewal rate" value="92.6%" detail="+2.1% this period" /><ReportMetric icon={ReceiptText} label="Overdue value" value={formatCurrency(48200)} detail="-4.1% this period" /></div>
    <Card className="report-filters"><Select label="Customer"><option>All customers</option>{data.customers.map((c) => <option key={c.id}>{c.company}</option>)}</Select><Select label="Plan"><option>All plans</option>{data.plans.map((p) => <option key={p.id}>{p.name}</option>)}</Select><Select label="Invoice status"><option>All statuses</option><option>Paid</option><option>Outstanding</option><option>Overdue</option></Select><Button variant="secondary" onClick={() => notify('Filters applied')}>Apply filters</Button></Card>
    <div className="chart-grid equal"><Card className="chart-card"><div className="card-heading"><div><h2>{analytics ? 'Subscription growth' : 'Revenue trend'}</h2><p>{range}</p></div></div><ResponsiveContainer width="100%" height={300}><LineChart data={revenueData}><CartesianGrid stroke="var(--chart-grid)" vertical={false} /><XAxis dataKey="month" axisLine={false} tickLine={false} /><YAxis axisLine={false} tickLine={false} /><Tooltip formatter={(v) => analytics ? v : formatCurrency(v)} /><Line type="monotone" dataKey={analytics ? 'subscriptions' : 'revenue'} stroke="var(--primary)" strokeWidth={3} dot={false} /></LineChart></ResponsiveContainer></Card>
      <Card className="chart-card"><div className="card-heading"><div><h2>{analytics ? 'Plan distribution' : 'Payment methods'}</h2><p>Share of total activity</p></div></div><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={analytics ? [{ name: 'Starter', value: 42 }, { name: 'Growth', value: 31 }, { name: 'Scale', value: 19 }, { name: 'Enterprise', value: 8 }] : [{ name: 'UPI', value: 44 }, { name: 'Bank transfer', value: 28 }, { name: 'Cards', value: 21 }, { name: 'Other', value: 7 }]} dataKey="value" nameKey="name" innerRadius={65} outerRadius={105} paddingAngle={3}>{['var(--primary)', 'var(--success)', 'var(--warning)', 'var(--info)'].map((c) => <Cell key={c} fill={c} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></Card></div>
    <Card className="chart-card"><div className="card-heading"><div><h2>Revenue by product</h2><p>Performance across the catalogue</p></div></div><ResponsiveContainer width="100%" height={280}><BarChart data={[{ name: 'Brightloop CRM', value: 842000 }, { name: 'Finance Cloud', value: 621000 }, { name: 'Priority Support', value: 351500 }]} layout="vertical" margin={{ left: 30 }}><CartesianGrid stroke="var(--chart-grid)" horizontal={false} /><XAxis type="number" axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} /><YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={110} /><Tooltip formatter={formatCurrency} /><Bar dataKey="value" fill="var(--primary)" radius={[0, 5, 5, 0]} /></BarChart></ResponsiveContainer></Card>
  </div>
}

function ReportMetric({ icon: Icon, label, value, detail }) {
  return <Card className="report-metric"><Icon size={20} /><span>{label}</span><strong>{value}</strong><small>{detail}</small></Card>
}
