const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

/** Format a number as Indian Rupees, e.g. 348500 -> "₹3,48,500". */
export function formatCurrency(value) {
  const n = Number(value)
  return inr.format(Number.isFinite(n) ? n : 0)
}

/** Download an array of flat objects as a CSV file. */
export function downloadCsv(filename, rows) {
  if (!rows?.length) return
  const headers = [...new Set(rows.flatMap((row) => Object.keys(row)))]
  const escape = (value) => {
    const text = value == null ? '' : String(value)
    return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
  }
  const csv = [headers.join(','), ...rows.map((row) => headers.map((h) => escape(row[h])).join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
