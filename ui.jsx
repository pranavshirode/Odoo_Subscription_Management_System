import { X, Search, ChevronLeft, ChevronRight, AlertTriangle, LoaderCircle, Inbox } from 'lucide-react'

export function Button({ children, variant = 'primary', icon: Icon, className = '', ...props }) {
  return <button className={`btn btn-${variant} ${className}`} {...props}>{Icon && <Icon size={16} />}{children}</button>
}

export function IconButton({ label, children, className = '', ...props }) {
  return <button aria-label={label} title={label} className={`icon-btn ${className}`} {...props}>{children}</button>
}

export function Input({ label, error, icon: Icon, className = '', ...props }) {
  return <label className={`field ${className}`}>{label && <span>{label}</span>}<div className="input-wrap">{Icon && <Icon size={17} />}<input {...props} /></div>{error && <small className="field-error">{error}</small>}</label>
}

export function Select({ label, children, className = '', ...props }) {
  return <label className={`field ${className}`}>{label && <span>{label}</span>}<div className="input-wrap"><select {...props}>{children}</select></div></label>
}

export function Textarea({ label, className = '', ...props }) {
  return <label className={`field ${className}`}>{label && <span>{label}</span>}<div className="input-wrap"><textarea {...props} /></div></label>
}

export function Badge({ children, tone }) {
  const normalized = String(children).toLowerCase()
  const statusTone = tone || (['active', 'paid', 'accepted', 'completed', 'available', 'confirmed'].includes(normalized) ? 'success' : ['overdue', 'inactive', 'rejected', 'cancelled', 'closed'].includes(normalized) ? 'danger' : ['outstanding', 'paused', 'sent', 'draft'].includes(normalized) ? 'warning' : 'neutral')
  return <span className={`badge badge-${statusTone}`}>{children}</span>
}

export function Card({ children, className = '' }) {
  return <section className={`card ${className}`}>{children}</section>
}

export function PageHeader({ eyebrow, title, description, actions }) {
  return <header className="page-header"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1>{description && <p>{description}</p>}</div>{actions && <div className="page-actions">{actions}</div>}</header>
}

export function Modal({ title, description, children, onClose, footer, wide = false }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <section className={`modal ${wide ? 'modal-wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
      <header className="modal-header"><div><h2>{title}</h2>{description && <p>{description}</p>}</div><IconButton label="Close" onClick={onClose}><X size={20} /></IconButton></header>
      <div className="modal-body">{children}</div>{footer && <footer className="modal-footer">{footer}</footer>}
    </section>
  </div>
}

export function ConfirmDialog({ title, message, onCancel, onConfirm }) {
  return <Modal title={title} onClose={onCancel} footer={<><Button variant="secondary" onClick={onCancel}>Cancel</Button><Button variant="danger" onClick={onConfirm}>Delete</Button></>}>
    <div className="confirm-message"><span><AlertTriangle size={22} /></span><p>{message}</p></div>
  </Modal>
}

export function SearchBox({ value, onChange, placeholder = 'Search...' }) {
  return <div className="search-box"><Search size={18} /><input aria-label={placeholder} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} /></div>
}

export function Pagination({ page, pages, onChange }) {
  return <div className="pagination"><span>Page {page} of {pages}</span><div><IconButton label="Previous page" disabled={page === 1} onClick={() => onChange(page - 1)}><ChevronLeft size={17} /></IconButton><IconButton label="Next page" disabled={page === pages} onClick={() => onChange(page + 1)}><ChevronRight size={17} /></IconButton></div></div>
}

export function EmptyState({ title = 'No records found', description = 'Try changing your search or filters.' }) {
  return <div className="empty-state"><Inbox size={28} /><strong>{title}</strong><p>{description}</p></div>
}

export function LoadingState() {
  return <div className="empty-state"><LoaderCircle className="spin" size={28} /><strong>Loading your workspace</strong></div>
}
