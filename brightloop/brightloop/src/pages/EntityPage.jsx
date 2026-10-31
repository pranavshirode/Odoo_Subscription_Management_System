import { useMemo, useState } from 'react'
import { Download, MoreHorizontal, Plus, SlidersHorizontal, Trash2, Pencil, Eye, Send, Play, Pause, Printer, CircleDollarSign } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useApp } from '../context/AppContext'
import { Badge, Button, Card, ConfirmDialog, EmptyState, IconButton, Input, Modal, PageHeader, Pagination, SearchBox, Select } from '../components/ui'
import { downloadCsv, formatCurrency } from '../utils/calculations'

export const entityConfigs = {
  users: { title: 'Users & Staff', eyebrow: 'Team management', description: 'Manage access, roles and account status.', singular: 'staff member', fields: [['name', 'Full name'], ['email', 'Work email'], ['role', 'Role'], ['status', 'Status']], columns: [['name', 'User'], ['email', 'Email'], ['role', 'Role'], ['status', 'Status'], ['joined', 'Joined']] },
  customers: { title: 'Customers', eyebrow: 'Customer management', description: 'A complete view of every customer relationship.', singular: 'customer', fields: [['name', 'Full name'], ['company', 'Company'], ['email', 'Email'], ['phone', 'Phone'], ['status', 'Status']], columns: [['id', 'Customer ID'], ['name', 'Customer'], ['company', 'Company'], ['email', 'Email'], ['subscriptions', 'Subscriptions'], ['status', 'Status']] },
  products: { title: 'Products', eyebrow: 'Product catalogue', description: 'Configure products and commercial pricing.', singular: 'product', fields: [['name', 'Product name'], ['type', 'Product type'], ['price', 'Sales price', 'number'], ['cost', 'Cost price', 'number'], ['status', 'Status']], columns: [['id', 'Product'], ['name', 'Name'], ['type', 'Type'], ['price', 'Sales price', 'currency'], ['cost', 'Cost price', 'currency'], ['status', 'Status']] },
  variants: { title: 'Product Variants', eyebrow: 'Product catalogue', description: 'Manage editions, add-ons and product options.', singular: 'variant', fields: [['name', 'Variant name'], ['product', 'Product'], ['category', 'Brand / category'], ['price', 'Additional price', 'number'], ['status', 'Status']], columns: [['id', 'Variant'], ['name', 'Name'], ['product', 'Product'], ['category', 'Category'], ['price', 'Additional price', 'currency'], ['status', 'Status']] },
  plans: { title: 'Subscription Plans', eyebrow: 'Plan management', description: 'Design recurring offers and billing frequencies.', singular: 'plan', fields: [['name', 'Plan name'], ['product', 'Associated product'], ['price', 'Price', 'number'], ['frequency', 'Billing frequency'], ['status', 'Status']], columns: [['name', 'Plan'], ['product', 'Product'], ['price', 'Price', 'currency'], ['frequency', 'Frequency'], ['subscribers', 'Active subs'], ['status', 'Status']] },
  quotations: { title: 'Quotations', eyebrow: 'Sales operations', description: 'Create, send and convert commercial proposals.', singular: 'quotation', fields: [['customer', 'Customer'], ['plan', 'Plan'], ['amount', 'Total amount', 'number'], ['validUntil', 'Valid until'], ['status', 'Status']], columns: [['id', 'Quotation'], ['customer', 'Customer'], ['plan', 'Plan'], ['amount', 'Amount', 'currency'], ['validUntil', 'Valid until'], ['status', 'Status']] },
  subscriptions: { title: 'Subscriptions', eyebrow: 'Lifecycle management', description: 'Manage activation, renewals, pauses and closures.', singular: 'subscription', fields: [['customer', 'Customer'], ['plan', 'Plan'], ['amount', 'Amount', 'number'], ['start', 'Start date'], ['nextBilling', 'Next billing'], ['status', 'Status']], columns: [['id', 'Subscription'], ['customer', 'Customer'], ['plan', 'Plan'], ['amount', 'Amount', 'currency'], ['nextBilling', 'Next billing'], ['status', 'Status']] },
  invoices: { title: 'Invoices', eyebrow: 'Billing', description: 'Issue, collect and reconcile customer invoices.', singular: 'invoice', fields: [['customer', 'Customer'], ['subscription', 'Subscription'], ['amount', 'Grand total', 'number'], ['due', 'Due date'], ['status', 'Status']], columns: [['id', 'Invoice'], ['customer', 'Customer'], ['subscription', 'Subscription'], ['due', 'Due'], ['amount', 'Amount', 'currency'], ['paid', 'Paid', 'currency'], ['status', 'Status']] },
  discounts: { title: 'Discounts & Coupons', eyebrow: 'Billing configuration', description: 'Create targeted incentives with clear eligibility.', singular: 'discount', fields: [['name', 'Discount name'], ['type', 'Discount type'], ['value', 'Discount value', 'number'], ['minimum', 'Minimum purchase', 'number'], ['status', 'Status']], columns: [['name', 'Discount'], ['type', 'Type'], ['value', 'Value'], ['minimum', 'Minimum purchase', 'currency'], ['usage', 'Usage'], ['status', 'Status']] },
  taxes: { title: 'Tax Management', eyebrow: 'Billing configuration', description: 'Maintain configurable tax rates and applicability.', singular: 'tax rule', fields: [['name', 'Tax name'], ['rate', 'Rate (%)', 'number'], ['appliesTo', 'Applicability'], ['status', 'Status']], columns: [['name', 'Tax'], ['rate', 'Rate'], ['appliesTo', 'Applies to'], ['status', 'Status']] },
  payments: { title: 'Payments', eyebrow: 'Billing', description: 'Record payments and reconcile invoice balances.', singular: 'payment', fields: [['invoice', 'Invoice'], ['customer', 'Customer'], ['method', 'Payment method'], ['amount', 'Amount', 'number'], ['reference', 'Transaction reference'], ['status', 'Status']], columns: [['id', 'Payment'], ['invoice', 'Invoice'], ['customer', 'Customer'], ['method', 'Method'], ['amount', 'Amount', 'currency'], ['date', 'Date'], ['status', 'Status']] },
}

export default function EntityPage({ resource }) {
  const config = entityConfigs[resource]
  const { data, add, update, remove, notify, user } = useApp()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [page, setPage] = useState(1)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [menu, setMenu] = useState(null)
  const pageSize = 7
  const records = user?.role === 'Customer' && ['subscriptions', 'invoices', 'payments'].includes(resource)
    ? data[resource].filter((r) => r.customer === (user.company || 'Orbit Works')) : data[resource]
  const filtered = useMemo(() => records.filter((row) => {
    const matchesSearch = Object.values(row).some((v) => String(v).toLowerCase().includes(search.toLowerCase()))
    return matchesSearch && (filter === 'All' || row.status === filter)
  }), [records, search, filter])
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)
  const statuses = ['All', ...new Set(records.map((r) => r.status).filter(Boolean))]
  const canCreate = user?.role !== 'Customer' && !(resource === 'users' && user?.role !== 'Admin')

  const handleDelete = () => {
    remove(resource, deleting.id); setDeleting(null); notify(`${config.singular} deleted`)
  }
  return <div className="page-stack">
    <PageHeader eyebrow={config.eyebrow} title={config.title} description={config.description} actions={<><Button variant="secondary" icon={Download} onClick={() => { downloadCsv(`${resource}.csv`, filtered); notify('CSV export downloaded') }}>Export</Button>{canCreate && <Button icon={Plus} onClick={() => setEditing({})}>New {config.singular}</Button>}</>} />
    {resource === 'invoices' && <div className="demo-banner"><CircleDollarSign size={17} /><span>Automated recurring billing is simulated. Manual invoice creation remains separate and no gateway is connected.</span><Button variant="text" onClick={() => notify('Scheduled billing simulation completed')}>Simulate billing</Button></div>}
    <Card className="data-card">
      <div className="table-toolbar"><SearchBox value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder={`Search ${config.title.toLowerCase()}…`} /><div className="toolbar-right"><SlidersHorizontal size={16} /><Select value={filter} onChange={(e) => { setFilter(e.target.value); setPage(1) }}>{statuses.map((status) => <option key={status}>{status}</option>)}</Select></div></div>
      {paged.length ? <div className="table-scroll"><table><thead><tr>{config.columns.map(([key, label]) => <th key={key}>{label}</th>)}<th aria-label="Actions" /></tr></thead><tbody>{paged.map((row) => <tr key={row.id}>{config.columns.map(([key, , type]) => <td key={key}>{renderCell(key, row[key], type)}</td>)}<td className="actions-cell"><IconButton label={`Actions for ${row.id}`} onClick={() => setMenu(menu === row.id ? null : row.id)}><MoreHorizontal size={18} /></IconButton>{menu === row.id && <div className="row-menu"><button onClick={() => { setEditing(row); setMenu(null) }}><Eye size={16} />View details</button>{canCreate && <button onClick={() => { setEditing(row); setMenu(null) }}><Pencil size={16} />Edit</button>}{resource === 'quotations' && <button onClick={() => { notify('Quotation sent to customer'); setMenu(null) }}><Send size={16} />Send quotation</button>}{resource === 'subscriptions' && <button onClick={() => { update(resource, { ...row, status: row.status === 'Paused' ? 'Active' : 'Paused' }); notify(row.status === 'Paused' ? 'Subscription resumed' : 'Subscription paused'); setMenu(null) }}>{row.status === 'Paused' ? <Play size={16} /> : <Pause size={16} />}{row.status === 'Paused' ? 'Resume' : 'Pause'}</button>}{resource === 'invoices' && <button onClick={() => { window.print(); setMenu(null) }}><Printer size={16} />Print invoice</button>}{canCreate && <button className="danger" onClick={() => { setDeleting(row); setMenu(null) }}><Trash2 size={16} />Delete</button>}</div>}</td></tr>)}</tbody></table></div> : <EmptyState />}
      <Pagination page={page} pages={Math.max(1, Math.ceil(filtered.length / pageSize))} onChange={setPage} />
    </Card>
    {editing && <EntityForm resource={resource} config={config} initial={editing} onClose={() => setEditing(null)} onSave={(item) => { if (item.id && records.some((r) => r.id === item.id)) update(resource, item); else add(resource, item); setEditing(null); notify(`${config.singular} saved successfully`) }} />}
    {deleting && <ConfirmDialog title={`Delete ${config.singular}?`} message={`This will permanently remove ${deleting.name || deleting.id}. This action cannot be undone.`} onCancel={() => setDeleting(null)} onConfirm={handleDelete} />}
  </div>
}

function renderCell(key, value, type) {
  if (key === 'status' || key === 'frequency' || key === 'role') return <Badge>{value}</Badge>
  if (type === 'currency') return <strong className="amount">{formatCurrency(value)}</strong>
  if (key === 'rate') return `${value}%`
  if (key === 'value') return value
  return value ?? '—'
}

function EntityForm({ resource, config, initial, onClose, onSave }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initial })
  const submit = (values) => {
    const normalized = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, ['price', 'cost', 'amount', 'paid', 'value', 'minimum', 'rate', 'subscribers'].includes(key) ? Number(value) : value]))
    onSave({ ...initial, ...normalized, id: initial.id || `${resource.slice(0, 3).toUpperCase()}-${String(Date.now()).slice(-5)}`, joined: initial.joined || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), date: initial.date || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }), paid: initial.paid || 0, subscribers: initial.subscribers || 0 })
  }
  return <Modal wide title={`${initial.id ? 'Edit' : 'Create'} ${config.singular}`} description="Changes are saved to this demonstration workspace." onClose={onClose} footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button onClick={handleSubmit(submit)}>Save {config.singular}</Button></>}>
    <form className="form-grid" onSubmit={handleSubmit(submit)}>{config.fields.map(([key, label, type]) => {
      const selectOptions = key === 'status' ? ['Active', 'Inactive', 'Draft', 'Sent', 'Paid', 'Outstanding', 'Available'] : key === 'role' ? ['Admin', 'Staff', 'Customer'] : key === 'frequency' ? ['Daily', 'Weekly', 'Monthly', 'Yearly'] : key === 'method' ? ['UPI', 'Credit card', 'Debit card', 'Bank transfer', 'Cash', 'Other'] : null
      return selectOptions ? <Select key={key} label={label} {...register(key, { required: true })}>{selectOptions.map((o) => <option key={o}>{o}</option>)}</Select> : <Input key={key} label={label} type={type || 'text'} error={errors[key] && `${label} is required`} {...register(key, { required: true })} />
    })}</form>
  </Modal>
}
