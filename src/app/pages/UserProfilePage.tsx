import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Save, Lock, LogOut, Mail, Phone, User, Calendar } from 'lucide-react';

export function UserProfilePage() {
  const { user, logout, changePassword, deleteAccount } = useApp();
  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'danger'>('profile');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSaveProfile = () => {
    setSuccess('Profile updated successfully');
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      setError('Please fill in both current and new passwords');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    const result = await changePassword(currentPassword, newPassword);
    setLoading(false);
    
    if (result.success) {
      setSuccess('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError(result.error || 'Failed to change password');
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    const result = await deleteAccount();
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.error || 'Failed to delete account');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <div className="border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)]">
        <div className="container mx-auto max-w-[var(--container-max)] px-4 py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-[var(--color-text-primary)]"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Account Settings</h1>
              <p className="text-sm text-[var(--color-text-secondary)]">Manage your profile and preferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-8 md:py-12">
        <div className="container mx-auto max-w-2xl px-4">
          {/* Alert Messages */}
          {error && (
            <div className="mb-6 rounded-lg border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 p-4 text-sm text-[var(--color-danger)]">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-6 rounded-lg border border-green-300/30 bg-green-500/10 p-4 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Tab Navigation */}
          <div className="mb-6 flex gap-2 sm:gap-4">
            <button
              onClick={() => setActiveTab('profile')}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-accent)]/10'
              }`}
            >
              <User className="mr-2 inline h-4 w-4" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                activeTab === 'security'
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-accent)]/10'
              }`}
            >
              <Lock className="mr-2 inline h-4 w-4" />
              Security
            </button>
            <button
              onClick={() => setActiveTab('danger')}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                activeTab === 'danger'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-[var(--color-surface)] text-red-500 hover:bg-red-500/10'
              }`}
            >
              Account Actions
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
              <div className="space-y-6">
                {/* User Avatar & Name */}
                <div className="border-b border-[var(--color-border-subtle)] pb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--color-accent)]/20 text-4xl">
                      {user?.avatar || '👤'}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{user?.name}</h2>
                      <Badge className="mt-2">{user?.role}</Badge>
                    </div>
                  </div>
                </div>

                {/* Profile Information */}
                <div className="space-y-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)]">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] dark:border-white/10"
                    />
                    <p className="text-xs text-[var(--color-text-secondary)]">
                      Email cannot be changed. Contact support if needed.
                    </p>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)]">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      type="tel"
                      value={user?.phoneNumber || 'Not provided'}
                      disabled
                      className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] dark:border-white/10"
                    />
                  </div>

                  {/* Age */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)]">
                      <Calendar className="h-4 w-4" />
                      Age
                    </Label>
                    <Input
                      type="text"
                      value={user?.age || 'Not provided'}
                      disabled
                      className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] dark:border-white/10"
                    />
                  </div>

                  {/* Member Since (Mock as backend doesn't store yet) */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)]">
                      <Calendar className="h-4 w-4" />
                      Member Since
                    </Label>
                    <Input
                      type="text"
                      value={new Date().toLocaleDateString()}
                      disabled
                      className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] dark:border-white/10"
                    />
                  </div>
                </div>

              </div>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
              <div className="space-y-6">
                <div className="border-b border-[var(--color-border-subtle)] pb-4">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-[var(--color-text-primary)]">
                    <Lock className="h-5 w-5" />
                    Change Password
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Current Password */}
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="font-semibold text-[var(--color-text-primary)]">
                      Current Password
                    </Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] dark:border-white/10"
                    />
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="font-semibold text-[var(--color-text-primary)]">
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] dark:border-white/10"
                    />
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="font-semibold text-[var(--color-text-primary)]">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="border-[var(--color-border-subtle)] bg-[var(--color-bg)] dark:border-white/10"
                    />
                  </div>

                  {/* Password Requirements */}
                  <div className="rounded-lg bg-[var(--color-accent)]/10 p-4 text-sm text-[var(--color-text-secondary)]">
                    <p className="font-semibold text-[var(--color-accent)]">Password requirements:</p>
                    <ul className="mt-2 list-inside list-disc space-y-1">
                      <li>At least 6 characters long</li>
                      <li>Mix of uppercase and lowercase letters (recommended)</li>
                      <li>Include numbers and special characters (recommended)</li>
                    </ul>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end gap-2 border-t border-[var(--color-border-subtle)] pt-6">
                  <Button
                    onClick={handleChangePassword}
                    disabled={loading}
                    className="gap-2 bg-[var(--color-accent)] text-white hover:opacity-95"
                  >
                    {loading ? 'Updating...' : <><Lock className="h-4 w-4" /> Update Password</>}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Danger Tab */}
          {activeTab === 'danger' && (
            <div className="space-y-6">
              <Card className="border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-6 dark:border-white/10 dark:bg-white/5">
                <div className="space-y-6">
                  <div className="border-b border-[var(--color-border-subtle)] pb-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-[var(--color-text-primary)]">
                      <LogOut className="h-5 w-5" />
                      Session Control
                    </h3>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Logout from your current session on this device.
                  </p>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full border-white/10 text-white hover:bg-white/5"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout Securely
                  </Button>
                </div>
              </Card>

              <Card className="border-red-500/20 bg-red-500/5 p-6 shadow-sm">
                <div className="space-y-6">
                  <div className="border-b border-red-500/20 pb-4">
                    <h3 className="text-lg font-bold text-red-500">Danger Zone</h3>
                  </div>
                  
                  {!showDeleteConfirm ? (
                    <div className="space-y-4">
                      <p className="text-sm text-red-400">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                      <Button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="w-full bg-red-600 font-bold text-white hover:bg-red-700"
                      >
                        Delete My Account
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-in fade-in zoom-in-95">
                      <p className="text-sm font-bold text-red-500">
                        Are you absolutely sure? This will permanently delete all your data.
                      </p>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setShowDeleteConfirm(false)}
                          className="flex-1 bg-white/10 text-white"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleDeleteAccount}
                          disabled={loading}
                          className="flex-1 bg-red-600 text-white hover:bg-red-700"
                        >
                          {loading ? 'Deleting...' : 'Yes, Delete Account'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
