// Demo data for the Brightloop workspace.
// Shapes match the columns/fields declared in src/pages/EntityPage.jsx.
// Subscriptions, invoices, payments and quotations reference customers by *company name*,
// because the customer portal filters on `user.company` (e.g. "Orbit Works").

export const revenueData = [
  { month: 'Oct', revenue: 262000, subscriptions: 238, cancelled: 9 },
  { month: 'Nov', revenue: 281500, subscriptions: 247, cancelled: 11 },
  { month: 'Dec', revenue: 296000, subscriptions: 259, cancelled: 8 },
  { month: 'Jan', revenue: 318500, subscriptions: 268, cancelled: 10 },
  { month: 'Feb', revenue: 308000, subscriptions: 276, cancelled: 12 },
  { month: 'Mar', revenue: 348500, subscriptions: 284, cancelled: 7 },
]

export const initialData = {
  users: [
    { id: 'USR-1001', name: 'Aarav Kapoor', email: 'admin@brightloop.in', role: 'Admin', status: 'Active', joined: '04 Jan 2024' },
    { id: 'USR-1002', name: 'Neha Iyer', email: 'neha@brightloop.in', role: 'Staff', status: 'Active', joined: '18 Feb 2024' },
    { id: 'USR-1003', name: 'Rohan Mehta', email: 'rohan@brightloop.in', role: 'Staff', status: 'Active', joined: '02 May 2024' },
    { id: 'USR-1004', name: 'Sana Qureshi', email: 'sana@brightloop.in', role: 'Staff', status: 'Inactive', joined: '23 Jul 2024' },
  ],

  customers: [
    { id: 'CUS-2001', name: 'Priya Sharma', company: 'Orbit Works', email: 'customer@orbitworks.in', phone: '+91 98200 11001', subscriptions: 2, status: 'Active' },
    { id: 'CUS-2002', name: 'Vikram Rao', company: 'Nimbus Retail', email: 'vikram@nimbusretail.in', phone: '+91 98200 11002', subscriptions: 1, status: 'Active' },
    { id: 'CUS-2003', name: 'Anjali Desai', company: 'Veda Foods', email: 'anjali@vedafoods.in', phone: '+91 98200 11003', subscriptions: 1, status: 'Active' },
    { id: 'CUS-2004', name: 'Karan Malhotra', company: 'Kite Logistics', email: 'karan@kitelogistics.in', phone: '+91 98200 11004', subscriptions: 1, status: 'Active' },
    { id: 'CUS-2005', name: 'Ishita Nair', company: 'Lumen Health', email: 'ishita@lumenhealth.in', phone: '+91 98200 11005', subscriptions: 1, status: 'Inactive' },
    { id: 'CUS-2006', name: 'Arjun Bose', company: 'Zenith Labs', email: 'arjun@zenithlabs.in', phone: '+91 98200 11006', subscriptions: 1, status: 'Active' },
    { id: 'CUS-2007', name: 'Meera Pillai', company: 'Aster Studio', email: 'meera@asterstudio.in', phone: '+91 98200 11007', subscriptions: 1, status: 'Active' },
    { id: 'CUS-2008', name: 'Dev Patel', company: 'Pixel Harbor', email: 'dev@pixelharbor.in', phone: '+91 98200 11008', subscriptions: 0, status: 'Inactive' },
  ],

  products: [
    { id: 'PRD-3001', name: 'Brightloop CRM', type: 'Service', price: 14999, cost: 6200, status: 'Active' },
    { id: 'PRD-3002', name: 'Finance Cloud', type: 'Service', price: 24999, cost: 10400, status: 'Active' },
    { id: 'PRD-3003', name: 'Priority Support', type: 'Service', price: 7999, cost: 3100, status: 'Active' },
    { id: 'PRD-3004', name: 'Onboarding Package', type: 'Consumable', price: 19999, cost: 8000, status: 'Inactive' },
  ],

  variants: [
    { id: 'VAR-4001', name: 'Standard edition', product: 'Brightloop CRM', category: 'Edition', price: 0, status: 'Active' },
    { id: 'VAR-4002', name: 'Professional edition', product: 'Brightloop CRM', category: 'Edition', price: 5000, status: 'Active' },
    { id: 'VAR-4003', name: 'Extra seats (10)', product: 'Brightloop CRM', category: 'Add-on', price: 2500, status: 'Active' },
    { id: 'VAR-4004', name: 'GST filing module', product: 'Finance Cloud', category: 'Add-on', price: 3500, status: 'Active' },
    { id: 'VAR-4005', name: '24x7 phone line', product: 'Priority Support', category: 'Add-on', price: 4000, status: 'Inactive' },
  ],

  plans: [
    { id: 'PLN-5001', name: 'Starter', product: 'Brightloop CRM', price: 4999, frequency: 'Monthly', subscribers: 91, status: 'Active' },
    { id: 'PLN-5002', name: 'Growth', product: 'Brightloop CRM', price: 14999, frequency: 'Monthly', subscribers: 142, status: 'Active' },
    { id: 'PLN-5003', name: 'Scale', product: 'Finance Cloud', price: 34999, frequency: 'Monthly', subscribers: 84, status: 'Active' },
    { id: 'PLN-5004', name: 'Enterprise', product: 'Finance Cloud', price: 89999, frequency: 'Monthly', subscribers: 31, status: 'Active' },
    { id: 'PLN-5005', name: 'Growth Annual', product: 'Brightloop CRM', price: 149990, frequency: 'Yearly', subscribers: 18, status: 'Active' },
  ],

  quotations: [
    { id: 'QUO-6001', customer: 'Pixel Harbor', plan: 'Growth', amount: 14999, validUntil: '15 Apr 2025', status: 'Sent' },
    { id: 'QUO-6002', customer: 'Nimbus Retail', plan: 'Scale', amount: 34999, validUntil: '20 Apr 2025', status: 'Draft' },
    { id: 'QUO-6003', customer: 'Lumen Health', plan: 'Enterprise', amount: 89999, validUntil: '30 Apr 2025', status: 'Sent' },
    { id: 'QUO-6004', customer: 'Orbit Works', plan: 'Scale', amount: 34999, validUntil: '10 Mar 2025', status: 'Accepted' },
    { id: 'QUO-6005', customer: 'Aster Studio', plan: 'Starter', amount: 4999, validUntil: '05 Mar 2025', status: 'Rejected' },
  ],

  subscriptions: [
    { id: 'SUB-7001', customer: 'Orbit Works', plan: 'Growth', amount: 14999, start: '01 Jun 2024', nextBilling: '01 Apr 2025', status: 'Active' },
    { id: 'SUB-7002', customer: 'Orbit Works', plan: 'Starter', amount: 4999, start: '15 Sep 2024', nextBilling: '15 Apr 2025', status: 'Active' },
    { id: 'SUB-7003', customer: 'Nimbus Retail', plan: 'Scale', amount: 34999, start: '10 Aug 2024', nextBilling: '10 Apr 2025', status: 'Active' },
    { id: 'SUB-7004', customer: 'Veda Foods', plan: 'Growth', amount: 14999, start: '22 Oct 2024', nextBilling: '22 Apr 2025', status: 'Active' },
    { id: 'SUB-7005', customer: 'Kite Logistics', plan: 'Enterprise', amount: 89999, start: '05 Jan 2024', nextBilling: '05 Apr 2025', status: 'Active' },
    { id: 'SUB-7006', customer: 'Lumen Health', plan: 'Growth', amount: 14999, start: '12 Nov 2024', nextBilling: '12 Apr 2025', status: 'Paused' },
    { id: 'SUB-7007', customer: 'Zenith Labs', plan: 'Starter', amount: 4999, start: '28 Dec 2024', nextBilling: '28 Mar 2025', status: 'Active' },
    { id: 'SUB-7008', customer: 'Aster Studio', plan: 'Starter', amount: 4999, start: '03 Feb 2025', nextBilling: '03 Apr 2025', status: 'Closed' },
  ],

  invoices: [
    { id: 'INV-8001', customer: 'Orbit Works', subscription: 'SUB-7001', date: '01 Mar 2025', due: '15 Mar 2025', amount: 14999, paid: 14999, status: 'Paid' },
    { id: 'INV-8002', customer: 'Orbit Works', subscription: 'SUB-7002', date: '15 Mar 2025', due: '29 Mar 2025', amount: 4999, paid: 0, status: 'Outstanding' },
    { id: 'INV-8003', customer: 'Nimbus Retail', subscription: 'SUB-7003', date: '10 Mar 2025', due: '24 Mar 2025', amount: 34999, paid: 34999, status: 'Paid' },
    { id: 'INV-8004', customer: 'Veda Foods', subscription: 'SUB-7004', date: '22 Feb 2025', due: '08 Mar 2025', amount: 14999, paid: 0, status: 'Overdue' },
    { id: 'INV-8005', customer: 'Kite Logistics', subscription: 'SUB-7005', date: '05 Mar 2025', due: '19 Mar 2025', amount: 89999, paid: 50000, status: 'Outstanding' },
    { id: 'INV-8006', customer: 'Lumen Health', subscription: 'SUB-7006', date: '12 Feb 2025', due: '26 Feb 2025', amount: 14999, paid: 0, status: 'Overdue' },
    { id: 'INV-8007', customer: 'Zenith Labs', subscription: 'SUB-7007', date: '28 Feb 2025', due: '14 Mar 2025', amount: 4999, paid: 4999, status: 'Paid' },
    { id: 'INV-8008', customer: 'Aster Studio', subscription: 'SUB-7008', date: '03 Mar 2025', due: '17 Mar 2025', amount: 4999, paid: 4999, status: 'Paid' },
  ],

  discounts: [
    { id: 'DSC-9001', name: 'WELCOME10', type: 'Percentage', value: 10, minimum: 5000, usage: '42 / 100', status: 'Active' },
    { id: 'DSC-9002', name: 'ANNUAL15', type: 'Percentage', value: 15, minimum: 50000, usage: '18 / 50', status: 'Active' },
    { id: 'DSC-9003', name: 'FLAT2000', type: 'Fixed amount', value: 2000, minimum: 20000, usage: '9 / 25', status: 'Active' },
    { id: 'DSC-9004', name: 'DIWALI25', type: 'Percentage', value: 25, minimum: 10000, usage: '100 / 100', status: 'Inactive' },
  ],

  taxes: [
    { id: 'TAX-1001', name: 'GST 18%', rate: 18, appliesTo: 'Services', status: 'Active' },
    { id: 'TAX-1002', name: 'GST 12%', rate: 12, appliesTo: 'Consumables', status: 'Active' },
    { id: 'TAX-1003', name: 'GST 5%', rate: 5, appliesTo: 'Essentials', status: 'Active' },
    { id: 'TAX-1004', name: 'Export (0%)', rate: 0, appliesTo: 'International customers', status: 'Inactive' },
  ],

  payments: [
    { id: 'PAY-1101', invoice: 'INV-8001', customer: 'Orbit Works', method: 'UPI', amount: 14999, date: '04 Mar 2025', reference: 'UPI-48201937', status: 'Paid' },
    { id: 'PAY-1102', invoice: 'INV-8003', customer: 'Nimbus Retail', method: 'Bank transfer', amount: 34999, date: '12 Mar 2025', reference: 'NEFT-90211884', status: 'Paid' },
    { id: 'PAY-1103', invoice: 'INV-8005', customer: 'Kite Logistics', method: 'Bank transfer', amount: 50000, date: '11 Mar 2025', reference: 'NEFT-90211902', status: 'Paid' },
    { id: 'PAY-1104', invoice: 'INV-8007', customer: 'Zenith Labs', method: 'Credit card', amount: 4999, date: '02 Mar 2025', reference: 'CC-77310452', status: 'Paid' },
    { id: 'PAY-1105', invoice: 'INV-8008', customer: 'Aster Studio', method: 'UPI', amount: 4999, date: '05 Mar 2025', reference: 'UPI-48202288', status: 'Paid' },
  ],
}
