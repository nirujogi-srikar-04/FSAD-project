import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router';
import { FundComparison } from '../components/FundComparison';
import { SearchBar } from '../components/SearchBar';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { TrendingUp, Wallet, Target, DollarSign, Settings, LogOut } from 'lucide-react';

export function DashboardPage() {
  const { user, userRole } = useApp();
  const navigate = useNavigate();
  const [investmentPortfolio] = useState({
    totalInvestment: 450000,
    currentValue: 487500,
    returns: 37500,
    returnPercentage: 8.33,
    funds: 4,
  });


  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header Banner with Profile Info */}
      <div className="border-b border-[var(--color-border-subtle)] bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)]/80">
        <div className="container mx-auto max-w-[var(--container-max)] px-4 py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            {/* User Info */}
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-3xl text-white">
                {user?.avatar || '👤'}
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold">{user?.name || 'User'}</h1>
                <p className="text-white/70">{user?.email}</p>
                <p className="mt-1 text-sm text-white/60">Member since {new Date().getFullYear()}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 md:py-12">
        <div className="container mx-auto max-w-[var(--container-max)] px-4">
          {/* Role-Based Dashboard Metrics */}
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                {userRole === 'ADMIN' ? 'Admin Overview' : userRole === 'ADVISOR' ? 'Advisor Dashboard' : 'Your Portfolio'}
              </h2>
              <Badge className="bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                {userRole || 'USER'} PORTAL
              </Badge>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {userRole === 'ADMIN' ? (
                // ADMIN METRICS
                <>
                  <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-[var(--color-text-secondary)]">Total Users</p>
                        <p className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">24,592</p>
                      </div>
                      <Target className="h-8 w-8 text-[var(--color-accent)]/50" />
                    </div>
                  </Card>
                  <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-[var(--color-text-secondary)]">Active Advisors</p>
                        <p className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">1,204</p>
                      </div>
                      <Settings className="h-8 w-8 text-[var(--color-accent)]/50" />
                    </div>
                  </Card>
                  <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-[var(--color-text-secondary)]">Platform AUM</p>
                        <p className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">₹5,420Cr</p>
                      </div>
                      <Wallet className="h-8 w-8 text-[var(--color-accent)]/50" />
                    </div>
                  </Card>
                  <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-[var(--color-text-secondary)]">Daily Revenue</p>
                        <p className="mt-2 text-2xl font-bold text-green-600">+₹4.2L</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-500/50" />
                    </div>
                  </Card>
                </>
              ) : userRole === 'ADVISOR' ? (
                // ADVISOR METRICS
                <>
                  <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-[var(--color-text-secondary)]">Active Clients</p>
                        <p className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">142</p>
                      </div>
                      <Target className="h-8 w-8 text-[var(--color-accent)]/50" />
                    </div>
                  </Card>
                  <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-[var(--color-text-secondary)]">Client AUM</p>
                        <p className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">₹12.5Cr</p>
                      </div>
                      <Wallet className="h-8 w-8 text-[var(--color-accent)]/50" />
                    </div>
                  </Card>
                  <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-[var(--color-text-secondary)]">Pending Reviews</p>
                        <p className="mt-2 text-2xl font-bold text-orange-500">8</p>
                      </div>
                      <Settings className="h-8 w-8 text-orange-500/50" />
                    </div>
                  </Card>
                  <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-[var(--color-text-secondary)]">Client Returns (Avg)</p>
                        <p className="mt-2 text-2xl font-bold text-green-600">+14.2%</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-500/50" />
                    </div>
                  </Card>
                </>
              ) : (
                // USER / INVESTOR METRICS
                <>
                  <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-[var(--color-text-secondary)]">Total Investment</p>
                        <p className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">
                          ₹{(investmentPortfolio.totalInvestment / 100000).toFixed(1)}L
                        </p>
                      </div>
                      <Wallet className="h-8 w-8 text-[var(--color-accent)]/50" />
                    </div>
                  </Card>

                  <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-[var(--color-text-secondary)]">Current Value</p>
                        <p className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">
                          ₹{(investmentPortfolio.currentValue / 100000).toFixed(1)}L
                        </p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-green-500/50" />
                    </div>
                  </Card>

                  <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-[var(--color-text-secondary)]">Total Returns</p>
                        <p className="mt-2 text-2xl font-bold text-green-600">
                          +₹{(investmentPortfolio.returns / 1000).toFixed(0)}K
                        </p>
                        <Badge className="mt-2 bg-green-500/20 text-green-700" variant="outline">
                          +{investmentPortfolio.returnPercentage.toFixed(2)}%
                        </Badge>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-500/50" />
                    </div>
                  </Card>

                  <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-[var(--color-text-secondary)]">Invested Funds</p>
                        <p className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">
                          {investmentPortfolio.funds}
                        </p>
                        <p className="mt-2 text-xs text-[var(--color-text-secondary)]">across different categories</p>
                      </div>
                      <Target className="h-8 w-8 text-[var(--color-accent)]/50" />
                    </div>
                  </Card>
                </>
              )}
            </div>
          </div>

          {/* Search & Comparison */}
          <div className="mb-6 md:mb-8">
            <h2 className="mb-4 text-2xl font-bold text-[var(--color-text-primary)]">Find & Compare Funds</h2>
            <SearchBar />
          </div>

          {/* Fund Comparison */}
          <div>
            <h2 className="mb-4 text-2xl font-bold text-[var(--color-text-primary)]">Fund Analysis</h2>
            <FundComparison />
          </div>
        </div>
      </div>
    </div>
  );
}
