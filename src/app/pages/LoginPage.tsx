import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { LogIn, Lock, Mail, Eye, EyeOff, AlertCircle, UserPlus, FileSignature, ShieldCheck, Phone, Calendar } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, requestOtp, register, user, isAuthenticated } = useApp();
  
  // Tab State
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  
  // Registration Flow States
  const [signupStep, setSignupStep] = useState<1 | 2>(1);
  const [signupRole, setSignupRole] = useState<'USER' | 'ADVISOR' | 'ADMIN'>('USER');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupOtp, setSignupOtp] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupAge, setSignupAge] = useState<string>('');
  const [signupPhone, setSignupPhone] = useState('');

  // Login States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // General States
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      const from = (location.state as any)?.from?.pathname || 
        (user.role === 'ADMIN' ? '/admin-dashboard' : 
         user.role === 'ADVISOR' ? '/advisor-dashboard' : '/dashboard');
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, user, navigate, location]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in both email and password');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    
    if (!result.success) {
      setError(result.error || 'Invalid credentials');
    }
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!signupEmail || !signupName) {
      setError('Please fill in Name and Email correctly');
      return;
    }

    setLoading(true);
    const result = await requestOtp(signupEmail, signupName);
    setLoading(false);

    if (result.success) {
      setSuccess('OTP has been successfully sent to ' + signupEmail);
      setSignupStep(2);
    } else {
      setError(result.error || 'Failed to request OTP');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!signupOtp || !signupPassword) {
      setError('Please fill in OTP and Password');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    const result = await register(signupEmail, signupOtp, signupName, signupPassword, signupRole, signupAge ? parseInt(signupAge) : undefined, signupPhone);
    setLoading(false);

    if (result.success) {
      // Redirect handled by useEffect
    } else {
      setError(result.error || 'Invalid OTP or registration failed');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#001f3f] to-[#0a0e27] px-4 py-12">
      <div className="w-full space-y-6 max-w-md">
        
        {/* Logo/Header */}
        <div className="text-center text-white">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white shadow-xl">
            <Lock className="h-8 w-8" />
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">FundInsight Pro</h1>
          <p className="mt-2 text-white/80">Secure Institutional Platform</p>
        </div>

        {/* Auth Card */}
        <Card className="border-0 bg-[#141829]/95 backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden">
          
          {/* Ambient Lighting inside card */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-[var(--color-accent)] opacity-10 blur-2xl pointer-events-none" />

          {/* Toggle Tabs */}
          <div className="flex mb-8 rounded-lg bg-[#001f3f] p-1 border border-[var(--color-border-subtle)]">
            <button
              type="button"
              className={`flex-1 rounded-md py-2 text-sm font-semibold transition-all ${
                activeTab === 'login' ? 'bg-[var(--color-accent)] text-white shadow-md' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              onClick={() => { setActiveTab('login'); setError(''); setSuccess(''); }}
            >
              Log In
            </button>
            <button
              type="button"
              className={`flex-1 rounded-md py-2 text-sm font-semibold transition-all ${
                activeTab === 'signup' ? 'bg-[var(--color-accent)] text-white shadow-md' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              onClick={() => { setActiveTab('signup'); setError(''); setSuccess(''); }}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message Header */}
          {error && (
            <div className="mb-4 flex gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
              <p className="text-sm text-red-500/90 font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-4 flex gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3">
              <ShieldCheck className="h-5 w-5 flex-shrink-0 text-emerald-500" />
              <p className="text-sm text-emerald-500/90 font-medium">{success}</p>
            </div>
          )}

          {/* LOGIN CONTENT */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-white/90">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                  <Input 
                    id="email" type="email" placeholder="your@email.com" 
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    className="border-white/10 bg-[#0a0e27]/50 pl-10 text-white placeholder:text-white/30 focus:border-[var(--color-accent)]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-white/90">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                  <Input 
                    id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" 
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    className="border-white/10 bg-[#0a0e27]/50 pl-10 text-white placeholder:text-white/30 focus:border-[var(--color-accent)]"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-white/50 hover:text-white">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full gap-2 bg-[var(--color-accent)] py-5 font-semibold mt-4 text-white hover:bg-[var(--color-accent)]/90">
                {loading ? 'Authenticating...' : 'Sign In To Dashboard'}
              </Button>
            </form>
          )}

          {/* SIGNUP CONTENT */}
          {activeTab === 'signup' && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              {signupStep === 1 ? (
                <form onSubmit={handleRequestOtp} className="space-y-5">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-white/90">Select Your Role</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {['USER', 'ADVISOR', 'ADMIN'].map((role) => (
                        <div
                          key={role}
                          onClick={() => setSignupRole(role as any)}
                          className={`cursor-pointer rounded-md border text-center py-2 text-xs font-bold transition-all ${
                            signupRole === role 
                              ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/20 text-[var(--color-accent)]' 
                              : 'border-white/10 bg-transparent text-white/50 hover:bg-white/5'
                          }`}
                        >
                          {role}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupName" className="text-sm font-semibold text-white/90">Full Name</Label>
                    <div className="relative">
                      <UserPlus className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                      <Input 
                        id="signupName" type="text" placeholder="John Doe" 
                        value={signupName} onChange={(e) => setSignupName(e.target.value)}
                        className="border-white/10 bg-[#0a0e27]/50 pl-10 text-white placeholder:text-white/30 focus:border-[var(--color-accent)]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupEmail" className="text-sm font-semibold text-white/90">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                      <Input 
                        id="signupEmail" type="email" placeholder="your@email.com" 
                        value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)}
                        className="border-white/10 bg-[#0a0e27]/50 pl-10 text-white placeholder:text-white/30 focus:border-[var(--color-accent)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signupPhone" className="text-sm font-semibold text-white/90">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                        <Input 
                          id="signupPhone" type="tel" placeholder="+91 98765..." 
                          value={signupPhone} onChange={(e) => setSignupPhone(e.target.value)}
                          className="border-white/10 bg-[#0a0e27]/50 pl-10 text-white placeholder:text-white/30 focus:border-[var(--color-accent)]"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signupAge" className="text-sm font-semibold text-white/90">Age</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                        <Input 
                          id="signupAge" type="number" placeholder="25" min={18} max={100}
                          value={signupAge} onChange={(e) => setSignupAge(e.target.value)}
                          className="border-white/10 bg-[#0a0e27]/50 pl-10 text-white placeholder:text-white/30 focus:border-[var(--color-accent)]"
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full bg-[var(--color-accent)] py-5 font-semibold text-white hover:bg-[var(--color-accent)]/90">
                    {loading ? 'Sending OTP...' : 'Continue'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-5 animate-in slide-in-from-right-4 duration-300">
                  <div className="space-y-2">
                    <Label htmlFor="otp" className="text-sm font-semibold text-white/90">6-Digit Verification OTP</Label>
                    <div className="relative">
                      <ShieldCheck className="absolute left-3 top-3 h-5 w-5 text-[var(--color-warning)]" />
                      <Input 
                        id="otp" type="text" placeholder="Enter OTP from email" maxLength={6}
                        value={signupOtp} onChange={(e) => setSignupOtp(e.target.value)}
                        className="border-white/10 bg-[#0a0e27]/50 pl-10 text-center tracking-[0.5em] font-bold text-white placeholder:text-white/30 placeholder:tracking-normal focus:border-[var(--color-accent)]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupPass" className="text-sm font-semibold text-white/90">Set Secure Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                      <Input 
                        id="signupPass" type={showPassword ? 'text' : 'password'} placeholder="••••••••" 
                        value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)}
                        className="border-white/10 bg-[#0a0e27]/50 pl-10 text-white placeholder:text-white/30 focus:border-[var(--color-accent)]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signupConfirmPass" className="text-sm font-semibold text-white/90">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                      <Input 
                        id="signupConfirmPass" type={showPassword ? 'text' : 'password'} placeholder="••••••••" 
                        value={signupConfirmPassword} onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        className="border-white/10 bg-[#0a0e27]/50 pl-10 text-white placeholder:text-white/30 focus:border-[var(--color-accent)]"
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-white/50 hover:text-white">
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button type="button" variant="outline" disabled={loading} onClick={() => setSignupStep(1)} className="flex-1 border-white/10 bg-transparent text-white hover:bg-white/5 hover:text-white">
                      Back
                    </Button>
                    <Button type="submit" disabled={loading} className="flex-[2] bg-[var(--color-accent)] font-semibold text-white hover:bg-[var(--color-accent)]/90">
                      {loading ? 'Verifying...' : 'Complete Registration'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-white/50 space-y-1 pt-4">
          <p>© {new Date().getFullYear()} FundInsight Pro. Secure framework.</p>
          <p className="text-xs">
            OTP codes are valid for exactly 10 minutes. Please check your inbox.
          </p>
        </div>
      </div>
    </div>
  );
}
