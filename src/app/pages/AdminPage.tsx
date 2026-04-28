import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../contexts/AppContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Settings, LogOut, Shield, AlertTriangle, CheckCircle, XCircle, Search, Filter, Server, Eye } from 'lucide-react';

const MOCK_KYC_QUEUE = [
  { id: 'KYC-10492', name: 'Aarav Desai', type: 'Individual', pan: 'ABCDE1234F', riskScore: 'Low', submitted: '2 hours ago' },
  { id: 'KYC-10493', name: 'Nisha Rao', type: 'Corporate', pan: 'XYZXY9876G', riskScore: 'High', submitted: '5 hours ago' },
  { id: 'KYC-10494', name: 'Siddharth Menon', type: 'Individual', pan: 'LMNOA4567H', riskScore: 'Medium', submitted: '1 day ago' },
];

export function AdminPage() {
  const { user, logout, userRole } = useApp();
  const navigate = useNavigate();
  const [showSecurityAlert, setShowSecurityAlert] = useState(true);
  const [kycQueue, setKycQueue] = useState(MOCK_KYC_QUEUE);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const approveKyc = (id: string) => {
    setKycQueue(prev => prev.filter(req => req.id !== id));
  };

  // Only allow Admin role to view this page
  if (userRole !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-8 text-center max-w-md">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Access Denied</h1>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            You do not have permission to access the AMC Admin Terminal. Incident logged.
          </p>
          <Button onClick={() => navigate('/dashboard')} className="mt-6 gap-2">
            Return to Investor Portal
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Admin Header Banner */}
      <div className="border-b border-red-900/30 bg-gradient-to-r from-red-950 via-zinc-900 to-red-950">
        <div className="container mx-auto max-w-[var(--container-max)] px-4 py-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-500">
                <Shield className="h-8 w-8" />
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">
                  AMC Administration Terminal
                </h1>
                <p className="mt-2 text-red-200/60 font-mono text-sm">
                  AUTHORIZED CLEARANCE: LEVEL 5 • SESSION ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={() => navigate('/admin-settings')} variant="outline" size="sm" className="gap-2 border-red-500/30 bg-red-500/10 text-red-100 hover:bg-red-500/20">
                <Settings className="h-4 w-4" /> System Settings
              </Button>
              <Button onClick={handleLogout} variant="destructive" size="sm" className="gap-2">
                <LogOut className="h-4 w-4" /> Terminate Session
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="container mx-auto max-w-[var(--container-max)] px-4">
          {showSecurityAlert && (
            <Alert className="mb-8 border-red-500/50 bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-200 ml-2">
                <strong>SECURE FACILITY:</strong> All terminal actions, including KYC approvals and fund modifications, are immutably logged to the compliance ledger.
                <button onClick={() => setShowSecurityAlert(false)} className="ml-4 text-xs font-bold text-red-400 hover:text-red-300">
                  ACKNOWLEDGE
                </button>
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-8 lg:grid-cols-3">
             
             {/* Left Column: Platform Metrics & NFOs */}
             <div className="lg:col-span-1 space-y-8">
                <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
                   <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-4 flex items-center">
                     <Server className="h-5 w-5 mr-2 text-[var(--color-accent)]" /> Platform Telemetry
                   </h3>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-[var(--color-border-subtle)] pb-2">
                         <span className="text-[var(--color-text-secondary)] text-sm">Trading API Status</span>
                         <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">OPERATIONAL</Badge>
                      </div>
                      <div className="flex justify-between items-center border-b border-[var(--color-border-subtle)] pb-2">
                         <span className="text-[var(--color-text-secondary)] text-sm">Net Inflow (24h)</span>
                         <span className="text-emerald-500 font-mono font-medium">+₹42.5Cr</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-[var(--color-border-subtle)] pb-2">
                         <span className="text-[var(--color-text-secondary)] text-sm">Active Advisors</span>
                         <span className="text-[var(--color-text-primary)] font-mono">1,204</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-[var(--color-text-secondary)] text-sm">Pending Settlements</span>
                         <span className="text-orange-500 font-mono">14 Batch Files</span>
                      </div>
                   </div>
                </Card>

                <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] bg-gradient-to-br from-blue-900/10 to-transparent p-6">
                   <h3 className="text-lg font-bold text-blue-400 mb-2">New Fund Offer (NFO) Publisher</h3>
                   <p className="text-[var(--color-text-secondary)] text-sm mb-4">Draft and queue upcoming mutual fund offerings to the public exchange.</p>
                   <div className="space-y-3">
                      <input type="text" placeholder="Fund Name (e.g., Prime AI Growth)" className="w-full bg-[var(--color-bg)] border border-[var(--color-border-subtle)] text-sm rounded p-2 text-white" />
                      <div className="flex gap-2">
                        <select className="w-1/2 bg-[var(--color-bg)] border border-[var(--color-border-subtle)] text-sm rounded p-2 text-white">
                           <option>Sectoral / Thematic</option>
                           <option>Large Cap</option>
                           <option>Liquid Fund</option>
                        </select>
                        <input type="number" placeholder="Base NAV" defaultValue="10" className="w-1/2 bg-[var(--color-bg)] border border-[var(--color-border-subtle)] text-sm rounded p-2 text-white" />
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2">Publish NFO to Exchange</Button>
                   </div>
                </Card>
             </div>

             {/* Right Column: KYC and Compliance Queue */}
             <div className="lg:col-span-2">
                <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] h-full overflow-hidden flex flex-col">
                   <div className="p-6 border-b border-[var(--color-border-subtle)] flex justify-between items-end">
                      <div>
                        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">KYC / AML Approval Queue</h2>
                        <p className="text-[var(--color-text-secondary)] text-sm mt-1">Review flagged investor verifications and regulatory blocks.</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-[var(--color-border-subtle)]"><Filter className="h-4 w-4 mr-2"/>Filter</Button>
                      </div>
                   </div>

                   <div className="overflow-x-auto flex-1">
                      <table className="w-full text-sm text-left text-[var(--color-text-secondary)]">
                         <thead className="text-xs uppercase bg-[var(--color-bg)] border-b border-[var(--color-border-subtle)]">
                            <tr>
                               <th className="px-6 py-4">Request ID</th>
                               <th className="px-6 py-4">Applicant Data</th>
                               <th className="px-6 py-4">AML Risk</th>
                               <th className="px-6 py-4 text-right">Clearance Action</th>
                            </tr>
                         </thead>
                         <tbody>
                            {kycQueue.length === 0 ? (
                               <tr><td colSpan={4} className="px-6 py-8 text-center text-emerald-500 font-medium">All pending KYC requests cleared!</td></tr>
                            ) : kycQueue.map((req) => (
                               <tr key={req.id} className="border-b border-[var(--color-border-subtle)] hover:bg-white/5 transition-colors">
                                  <td className="px-6 py-4 font-mono font-medium text-[var(--color-text-primary)]">{req.id}</td>
                                  <td className="px-6 py-4">
                                     <div className="font-medium text-white">{req.name}</div>
                                     <div className="text-xs mt-1">PAN: <span className="font-mono text-[var(--color-accent)]">{req.pan}</span> • {req.type}</div>
                                  </td>
                                  <td className="px-6 py-4">
                                     <Badge variant="outline" className={req.riskScore === 'High' ? 'text-red-500 border-red-500/50 bg-red-500/10' : req.riskScore === 'Medium' ? 'text-orange-500 border-orange-500/50 bg-orange-500/10' : 'text-emerald-500 border-emerald-500/50 bg-emerald-500/10'}>
                                        {req.riskScore} Risk
                                     </Badge>
                                  </td>
                                  <td className="px-6 py-4 text-right space-x-2">
                                     <Button variant="ghost" size="icon" className="text-blue-400 hover:text-blue-300 hover:bg-blue-400/10" title="View Documents">
                                        <Eye className="h-5 w-5" />
                                     </Button>
                                     <Button onClick={() => approveKyc(req.id)} variant="ghost" size="icon" className="text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10" title="Approve KYC">
                                        <CheckCircle className="h-5 w-5" />
                                     </Button>
                                     <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-400 hover:bg-red-500/10" title="Reject & Flag">
                                        <XCircle className="h-5 w-5" />
                                     </Button>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </Card>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
}
