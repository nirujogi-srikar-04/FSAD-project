import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Menu, X, TrendingUp, User, LogOut, Home, BarChart3, BookOpen, Users, Settings } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function Header() {
  const { user, logout, userRole, setUserRole } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  // Navigation items based on user role
  const getNavItems = () => {
    const commonItems = [{ path: '/', label: 'Home', icon: Home }];

    if (userRole === 'ADMIN') {
      return [
        ...commonItems,
        { path: '/admin-dashboard', label: 'Dashboard', icon: BarChart3 },
        { path: '/education', label: 'Education', icon: BookOpen },
      ];
    }

    if (userRole === 'ADVISOR') {
      return [
        ...commonItems,
        { path: '/advisor-dashboard', label: 'My Clients', icon: Users },
        { path: '/recommendations', label: 'Recommendations', icon: BarChart3 },
        { path: '/education', label: 'Resources', icon: BookOpen },
      ];
    }

    // Regular User
    return [
      ...commonItems,
      { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
      { path: '/recommendations', label: 'Recommendations', icon: BarChart3 },
      { path: '/education', label: 'Learn', icon: BookOpen },
    ];
  };

  const navItems = getNavItems();
  const roleOptions: Array<{ value: typeof userRole; label: string }> = [
    { value: 'USER', label: '👤 Regular User' },
    { value: 'ADVISOR', label: '👩‍💼 Financial Advisor' },
    { value: 'ADMIN', label: '👨‍💼 Administrator' },
  ];

  const getRoleColor = () => {
    switch (userRole) {
      case 'ADMIN':
        return 'bg-red-500/20 text-red-700 border-red-200';
      case 'ADVISOR':
        return 'bg-blue-500/20 text-blue-700 border-blue-200';
      default:
        return 'bg-green-500/20 text-green-700 border-green-200';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[var(--color-primary)]">
      <div className="container mx-auto max-w-[var(--container-max)] px-4">
        <div className="flex h-14 items-center justify-between md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold text-white">FundInsight Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-white'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {location.pathname === item.path && (
                  <div className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[var(--color-accent)]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2">
            {/* User Menu Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-white/20 bg-transparent text-white hover:bg-white/10"
                >
                  <div className="relative flex items-center gap-2">
                    <div className="text-lg">{user?.avatar || '👤'}</div>
                    <div className="hidden flex-col items-start sm:flex">
                      <span className="max-w-[100px] truncate text-xs font-semibold">
                        {user?.name ?? 'User'}
                      </span>
                      <span className="text-xs text-white/60">{userRole}</span>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[16rem] bg-[var(--color-primary)] border-white/15">
                {/* User Info */}
                {user && (
                  <>
                    <div className="px-3 py-3 border-b border-white/10">
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="text-xs text-white/60">{user.email}</p>
                      <Badge className={`mt-2 ${getRoleColor()}`}>{userRole}</Badge>
                    </div>
                  </>
                )}

                {/* Role Switcher (for demo purposes) */}
                <div className="px-2 py-2">
                  <p className="px-1 py-1.5 text-xs font-semibold uppercase text-white/50">Switch Role (Demo)</p>
                  {roleOptions.map((role) => (
                    <DropdownMenuItem
                      key={role.value}
                      onClick={() => {
                        setUserRole(role.value);
                        navigate('/');
                      }}
                      className="cursor-pointer text-white focus:bg-white/10"
                    >
                      {role.label}
                      {userRole === role.value && (
                        <span className="ml-auto text-xs text-[var(--color-accent)]">✓</span>
                      )}
                    </DropdownMenuItem>
                  ))}
                </div>

                <DropdownMenuSeparator className="bg-white/10" />

                {/* Account Details */}
                <DropdownMenuItem 
                  onClick={() => navigate('/profile')}
                  className="cursor-pointer text-white focus:bg-white/10"
                >
                  <User className="h-4 w-4 mr-2" />
                  Account Details
                </DropdownMenuItem>

                {/* Logout */}
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-400 focus:bg-white/10 focus:text-red-400"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white hover:bg-white/10"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="border-t border-white/10 py-4 md:hidden">
            <div className="flex flex-col gap-0.5">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium ${
                    location.pathname === item.path
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
              <DropdownMenuSeparator className="bg-white/10 my-2" />
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm font-medium text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
