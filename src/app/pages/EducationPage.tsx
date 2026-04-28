import React from 'react';
import { useApp } from '../contexts/AppContext';
import { EducationCarousel } from '../components/EducationCarousel';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { BookOpen, TrendingUp, Users, Settings, Plus, FileText, CheckCircle } from 'lucide-react';

export function EducationPage() {
  const { userRole } = useApp();

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-8 md:py-12">
      <div className="container mx-auto max-w-[var(--container-max)] px-4">
        
        {userRole === 'ADMIN' ? (
          // ----------------------------------------------------
          // ADMIN: Content Management view
          // ----------------------------------------------------
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Educational Content Manager</h1>
                <p className="text-[var(--color-text-secondary)] mt-2">Manage all public articles, advisor resources, and AI insights across the platform.</p>
              </div>
              <Button className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Publish New Article
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <Card className="p-6 bg-[var(--color-surface)] border-[var(--color-border-subtle)]">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500/20 text-blue-500 rounded-lg"><FileText className="h-6 w-6" /></div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">142</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">Published Articles</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-[var(--color-surface)] border-[var(--color-border-subtle)]">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/20 text-green-500 rounded-lg"><Users className="h-6 w-6" /></div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">24.5k</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">Monthly Readers</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6 bg-[var(--color-surface)] border-[var(--color-border-subtle)]">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-500/20 text-purple-500 rounded-lg"><CheckCircle className="h-6 w-6" /></div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">89%</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">AI Approval Rating</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="border border-[var(--color-border-subtle)] rounded-xl p-6 bg-[var(--color-surface)]">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Preview Live Feed</h3>
              <EducationCarousel />
            </div>
          </div>

        ) : userRole === 'ADVISOR' ? (
          // ----------------------------------------------------
          // ADVISOR: Resources and Market Strategies view
          // ----------------------------------------------------
          <div className="space-y-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Advisor Resources & Market Intel</h1>
              <p className="text-[var(--color-text-secondary)] mt-2">Curated strategies, fund analysis, and market updates to share with your clients.</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/10 border border-blue-500/20 rounded-xl p-6">
                <TrendingUp className="h-8 w-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Q3 Market Outlook</h3>
                <p className="text-blue-100/70 mb-4 text-sm">Download the latest detailed report on equity market trends to distribute to High Net Worth clients.</p>
                <Button variant="outline" className="w-full text-blue-400 border-blue-400/50 hover:bg-blue-400/10 hover:text-blue-300">Download PDF Report</Button>
              </div>
              <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/10 border border-emerald-500/20 rounded-xl p-6">
                <Users className="h-8 w-8 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Client Acquisition Strategies</h3>
                <p className="text-emerald-100/70 mb-4 text-sm">Actionable templates and email scripts dynamically generated by AI for onboarding new investors.</p>
                <Button variant="outline" className="w-full text-emerald-400 border-emerald-400/50 hover:bg-emerald-400/10 hover:text-emerald-300">View Strategy Hub</Button>
              </div>
            </div>

            <div className="border-t border-[var(--color-border-subtle)] pt-8 mt-8">
               <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Latest Industry Reads</h3>
               <EducationCarousel />
            </div>
          </div>

        ) : (
          // ----------------------------------------------------
          // USER: Standard Education view
          // ----------------------------------------------------
          <div>
            <EducationCarousel />
            <div className="mt-12 bg-gradient-to-r from-[var(--color-primary)]/50 to-[var(--color-accent)]/20 border border-[var(--color-border-subtle)] rounded-2xl p-8 text-center">
               <BookOpen className="h-12 w-12 text-[var(--color-accent)] mx-auto mb-4" />
               <h3 className="text-2xl font-bold text-white mb-2">Ready to level up your portfolio?</h3>
               <p className="text-white/70 max-w-2xl mx-auto mb-6">Our AI analyzes thousands of data points to generate custom mutual fund recommendations based on the financial principles taught in these lessons.</p>
               <Button className="bg-[var(--color-accent)] hover:bg-[var(--color-accent)]/90 text-white px-8 py-6 text-lg rounded-xl">
                 Explore Mutual Funds Now
               </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
