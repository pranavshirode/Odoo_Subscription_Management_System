import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useApp } from '../context/AppContext'
import { Button, Input } from '../components/ui'

const loginSchema = z.object({ email: z.email('Enter a valid email'), password: z.string().min(6, 'Password must be at least 6 characters') })
const passwordRule = z.string().min(9, 'Use more than 8 characters').regex(/[A-Z]/, 'Include an uppercase letter').regex(/[a-z]/, 'Include a lowercase letter').regex(/[^A-Za-z0-9]/, 'Include a special character')
const registerSchema = z.object({ name: z.string().min(2), company: z.string().min(2), email: z.email(), password: passwordRule, confirmPassword: z.string(), terms: z.literal(true, { error: 'Accept the terms to continue' }) }).refine((v) => v.password === v.confirmPassword, { path: ['confirmPassword'], message: 'Passwords do not match' })

export function LoginPage() {
  const { user, setUser } = useApp()
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(loginSchema), defaultValues: { email: 'admin@brightloop.in', password: 'Brightloop@123' } })
  if (user) return <Navigate to="/" replace />
  const submit = async ({ email }) => {
    await new Promise((r) => setTimeout(r, 500))
    const isCustomer = email.toLowerCase().includes('customer')
    setUser(isCustomer ? { name: 'Priya Sharma', email, role: 'Customer', company: 'Orbit Works' } : { name: 'Aarav Kapoor', email, role: 'Admin' })
    navigate('/')
  }
  return <AuthLayout><div className="auth-heading"><span className="eyebrow">Welcome back</span><h1>Sign in to Brightloop</h1><p>Manage every customer, subscription and payment from one clear workspace.</p></div>
    <form className="auth-form" onSubmit={handleSubmit(submit)}><Input label="Email address" type="email" error={errors.email?.message} {...register('email')} /><div className="password-field"><Input label="Password" type={visible ? 'text' : 'password'} error={errors.password?.message} {...register('password')} /><button type="button" aria-label="Toggle password visibility" onClick={() => setVisible(!visible)}>{visible ? <EyeOff size={18} /> : <Eye size={18} />}</button></div><div className="form-meta"><label><input type="checkbox" /> Remember me</label><Link to="/forgot-password">Forgot password?</Link></div><Button className="btn-full" disabled={isSubmitting}>{isSubmitting ? 'Signing in…' : 'Sign in'}<ArrowRight size={17} /></Button></form>
    <div className="demo-accounts"><strong>Try the customer portal</strong><span>Use <button onClick={() => setUser({ name: 'Priya Sharma', email: 'customer@orbitworks.in', role: 'Customer', company: 'Orbit Works' })}>customer@orbitworks.in</button> with any password.</span></div>
    <p className="auth-switch">New to Brightloop? <Link to="/register">Create a customer account</Link></p>
  </AuthLayout>
}

export function RegisterPage() {
  const { data, setUser } = useApp()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const { register, handleSubmit, setError, formState: { errors } } = useForm({ resolver: zodResolver(registerSchema) })
  const strength = [password.length > 8, /[A-Z]/.test(password), /[a-z]/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length
  const submit = (values) => {
    if (data.customers.some((c) => c.email.toLowerCase() === values.email.toLowerCase())) return setError('email', { message: 'An account already exists for this email' })
    setUser({ name: values.name, company: values.company, email: values.email, role: 'Customer' }); navigate('/')
  }
  return <AuthLayout><div className="auth-heading"><span className="eyebrow">Customer account</span><h1>Start your workspace</h1><p>Create secure access to your subscriptions and billing.</p></div>
    <form className="auth-form" onSubmit={handleSubmit(submit)}><div className="form-grid"><Input label="Full name" error={errors.name?.message} {...register('name')} /><Input label="Company name" error={errors.company?.message} {...register('company')} /></div><Input label="Email address" type="email" error={errors.email?.message} {...register('email')} /><Input label="Password" type="password" error={errors.password?.message} {...register('password', { onChange: (e) => setPassword(e.target.value) })} /><div className="strength"><div>{[0, 1, 2, 3].map((i) => <span key={i} className={i < strength ? 'filled' : ''} />)}</div><small>{strength < 2 ? 'Weak' : strength < 4 ? 'Almost there' : 'Strong password'}</small></div><Input label="Confirm password" type="password" error={errors.confirmPassword?.message} {...register('confirmPassword')} /><label className="terms"><input type="checkbox" {...register('terms')} /><span>I accept the terms and privacy policy.</span></label>{errors.terms && <small className="field-error">{errors.terms.message}</small>}<Button className="btn-full">Create account <ArrowRight size={17} /></Button></form><p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
  </AuthLayout>
}

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(z.object({ email: z.email() })) })
  return <AuthLayout>{sent ? <div className="auth-success"><CheckCircle2 size={40} /><h1>Check your inbox</h1><p>A simulated reset link has been sent. In a production integration, the backend will securely issue this email.</p><Link className="btn btn-primary" to="/login">Return to sign in</Link></div> : <><div className="auth-heading"><span className="eyebrow">Account recovery</span><h1>Reset your password</h1><p>Enter your account email and we’ll send a secure reset link.</p></div><form className="auth-form" onSubmit={handleSubmit(() => setSent(true))}><Input label="Email address" type="email" error={errors.email?.message} {...register('email')} /><Button className="btn-full">Send reset link</Button></form><p className="auth-switch"><Link to="/login">Back to sign in</Link></p></>}</AuthLayout>
}

function AuthLayout({ children }) {
  return <main className="auth-page"><section className="auth-showcase"><div className="auth-brand"><div className="brand-mark"><span /><span /></div><strong>Brightloop</strong></div><div className="showcase-copy"><span className="showcase-pill"><ShieldCheck size={16} />Subscription operations, simplified</span><h2>Turn recurring revenue into clear, confident growth.</h2><p>One connected workspace for the entire customer lifecycle—from quote to renewal.</p><div className="showcase-metrics"><div><strong>₹3.48L</strong><span>Monthly revenue</span></div><div><strong>284</strong><span>Active subscriptions</span></div></div></div><div className="auth-quote">“Brightloop gives our team one reliable view of every account and every rupee.”<span>— Meera, Finance Lead</span></div></section><section className="auth-panel"><div className="auth-card">{children}</div></section></main>
}
