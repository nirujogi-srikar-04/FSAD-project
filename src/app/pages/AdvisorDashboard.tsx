import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Users, TrendingUp, BarChart3, Search, Mail, Filter, ArrowUpRight, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

// Mock Mutual Fund Distributer Data
const MOCK_CLIENTS = [
  { id: 1, name: 'Rahul Sharma', aum: 12500000, returns: 14.2, risk: 'Aggressive', status: 'Active' },
  { id: 2, name: 'Priya Patel', aum: 8400000, returns: 11.8, risk: 'Moderate', status: 'Review Needed' },
  { id: 3, name: 'Arun Kumar', aum: 4500000, returns: 9.4, risk: 'Conservative', status: 'Active' },
  { id: 4, name: 'Sneha Gupta', aum: 15600000, returns: 16.1, risk: 'Aggressive', status: 'Active' },
  { id: 5, name: 'Vikram Singh', aum: 2100000, returns: 7.2, risk: 'Moderate', status: 'Onboarding' }
];

export function AdvisorDashboard() {
  const { userRole } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const totalAum = MOCK_CLIENTS.reduce((acc, client) => acc + client.aum, 0);
  const avgReturn = (MOCK_CLIENTS.reduce((acc, client) => acc + client.returns, 0) / MOCK_CLIENTS.length).toFixed(1);

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)] dark:border-white/10">
        <div className="container mx-auto max-w-[var(--container-max)] px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">
                Advisor Command Center
              </h1>
              <p className="mt-2 text-[var(--color-text-secondary)]">
                Manage client portfolios, track AUM, and generate mutual fund recommendations.
              </p>
            </div>
            <div className="flex gap-3">
               <Button className="bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent)]/90">
                 + Invite Client
               </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8">
        <div className="container mx-auto max-w-[var(--container-max)] px-4">
          
          {/* Top Level KPIs */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)]">Total Client AUM</p>
                  <p className="mt-2 text-3xl font-bold text-[var(--color-text-primary)]">
                    ₹{(totalAum / 10000000).toFixed(2)}Cr
                  </p>
                </div>
                <div className="rounded-lg bg-emerald-500/10 p-3 text-emerald-500"><TrendingUp className="h-6 w-6" /></div>
              </div>
            </Card>

            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)]">Active Clients</p>
                  <p className="mt-2 text-3xl font-bold text-[var(--color-text-primary)]">{MOCK_CLIENTS.length}</p>
                </div>
                <div className="rounded-lg bg-blue-500/10 p-3 text-blue-500"><Users className="h-6 w-6" /></div>
              </div>
            </Card>

            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-secondary)]">Avg. Portfolio Return</p>
                  <p className="mt-2 text-3xl font-bold text-emerald-600">+{avgReturn}%</p>
                </div>
                <div className="rounded-lg bg-emerald-500/10 p-3 text-emerald-500"><BarChart3 className="h-6 w-6" /></div>
              </div>
            </Card>

            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6">
              <div className="flex items-start justify-between">
                <div>
                   <p className="text-sm font-medium text-[var(--color-text-secondary)]">Action Required</p>
                   <p className="mt-2 text-3xl font-bold text-orange-500">
                     {MOCK_CLIENTS.filter(c => c.status === 'Review Needed').length}
                   </p>
                </div>
                <div className="rounded-lg bg-orange-500/10 p-3 text-orange-500"><ShieldAlert className="h-6 w-6" /></div>
              </div>
            </Card>
          </div>

          {/* Client Management Table */}
          <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] overflow-hidden">
             <div className="border-b border-[var(--color-border-subtle)] p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Client Roster & Monitoring</h2>
                <div className="flex w-full md:w-auto gap-3">
                   <div className="relative w-full md:w-64">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-secondary)]" />
                     <input 
                       type="text" 
                       placeholder="Search clients..." 
                       className="w-full bg-[var(--color-bg)] border border-[var(--color-border-subtle)] text-[var(--color-text-primary)] text-sm rounded-lg pl-9 p-2.5 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                     />
                   </div>
                   <Button variant="outline" className="border-[var(--color-border-subtle)] text-[var(--color-text-primary)]">
                     <Filter className="h-4 w-4 mr-2" /> Filters
                   </Button>
                </div>
             </div>

             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left text-[var(--color-text-secondary)]">
                 <thead className="text-xs uppercase bg-[var(--color-bg)] border-b border-[var(--color-border-subtle)]">
                   <tr>
                     <th className="px-6 py-4">Client Name</th>
                     <th className="px-6 py-4">Total AUM</th>
                     <th className="px-6 py-4">Returns (XIRR)</th>
                     <th className="px-6 py-4">Risk Profile</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {MOCK_CLIENTS.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map((client) => (
                     <tr key={client.id} className="border-b border-[var(--color-border-subtle)] hover:bg-white/5 transition-colors">
                       <td className="px-6 py-4 font-medium text-[var(--color-text-primary)]">{client.name}</td>
                       <td className="px-6 py-4 text-[var(--color-text-primary)] font-semibold">₹{(client.aum / 100000).toFixed(2)}L</td>
                       <td className="px-6 py-4 text-emerald-500 font-medium">+{client.returns}%</td>
                       <td className="px-6 py-4">
                         <Badge variant="outline" className={
                           client.risk === 'Aggressive' ? 'text-orange-500 border-orange-500/40 bg-orange-500/10' :
                           client.risk === 'Moderate' ? 'text-blue-500 border-blue-500/40 bg-blue-500/10' :
                           'text-emerald-500 border-emerald-500/40 bg-emerald-500/10'
                         }>
                           {client.risk}
                         </Badge>
                       </td>
                       <td className="px-6 py-4">
                         {client.status === 'Active' ? (
                           <div className="flex items-center text-emerald-500"><CheckCircle2 className="h-4 w-4 mr-1.5"/> Active</div>
                         ) : client.status === 'Review Needed' ? (
                           <div className="flex items-center text-orange-500"><ShieldAlert className="h-4 w-4 mr-1.5"/> Review</div>
                         ) : (
                           <div className="flex items-center text-blue-500"><Users className="h-4 w-4 mr-1.5"/> Onboarding</div>
                         )}
                       </td>
                       <td className="px-6 py-4 text-right">
                         <Button variant="ghost" size="sm" className="text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 hover:text-[var(--color-accent)]">
                           View Details <ArrowUpRight className="h-4 w-4 ml-1" />
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
  );
}
