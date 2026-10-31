import { Navigate, Route, Routes } from 'react-router-dom'
import { useApp } from './context/AppContext'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import EntityPage from './pages/EntityPage'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import { ForgotPasswordPage, LoginPage, RegisterPage } from './pages/Auth'

function ProtectedLayout() {
  const { user } = useApp()
  return user ? <AppLayout /> : <Navigate to="/login" replace />
}

function RoleRoute({ children, roles }) {
  const { user } = useApp()
  return roles.includes(user?.role) ? children : <Navigate to="/" replace />
}

export default function App() {
  return <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    <Route element={<ProtectedLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="users" element={<RoleRoute roles={['Admin']}><EntityPage resource="users" /></RoleRoute>} />
      <Route path="customers" element={<RoleRoute roles={['Admin', 'Staff']}><EntityPage resource="customers" /></RoleRoute>} />
      <Route path="products" element={<RoleRoute roles={['Admin', 'Staff']}><EntityPage resource="products" /></RoleRoute>} />
      <Route path="variants" element={<RoleRoute roles={['Admin', 'Staff']}><EntityPage resource="variants" /></RoleRoute>} />
      <Route path="plans" element={<EntityPage resource="plans" />} />
      <Route path="quotations" element={<RoleRoute roles={['Admin', 'Staff']}><EntityPage resource="quotations" /></RoleRoute>} />
      <Route path="subscriptions" element={<EntityPage resource="subscriptions" />} />
      <Route path="invoices" element={<EntityPage resource="invoices" />} />
      <Route path="discounts" element={<RoleRoute roles={['Admin', 'Staff']}><EntityPage resource="discounts" /></RoleRoute>} />
      <Route path="taxes" element={<RoleRoute roles={['Admin']}><EntityPage resource="taxes" /></RoleRoute>} />
      <Route path="payments" element={<EntityPage resource="payments" />} />
      <Route path="reports" element={<RoleRoute roles={['Admin', 'Staff']}><Reports /></RoleRoute>} />
      <Route path="analytics" element={<RoleRoute roles={['Admin', 'Staff']}><Reports analytics /></RoleRoute>} />
      <Route path="settings" element={<RoleRoute roles={['Admin', 'Staff']}><Settings /></RoleRoute>} />
      <Route path="profile" element={<Settings profile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
}
