import React, { useState } from 'react';
import { User, Bell, Shield, Palette, Download, Trash2, Globe, Moon, Sun, Save, Camera, Mail, Phone, MapPin, Eye, Smartphone, Key, AlertTriangle, ArrowLeft } from 'lucide-react';
import { ParticleBackground } from '../ui/ParticleBackground';
import { AnimatedBackground } from '../ui/AnimatedBackground';
import Sparkles from '../ui/Sparkles';
import toast from 'react-hot-toast';

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar: string;
}

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userProfile, setUserProfile] = useState<UserProfile>({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    bio: 'Financial enthusiast passionate about smart money management.',
    avatar: ''
  });

  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      budgetAlerts: true,
      expenseReminders: true,
      weeklyReports: false,
      monthlyReports: true,
      goalAchievements: true
    },
    privacy: {
      profileVisibility: 'private',
      dataSharing: false,
      analyticsTracking: true,
      twoFactorAuth: false,
      loginAlerts: true,
      dataEncryption: true
    },
    appearance: {
      theme: 'dark',
      currency: 'INR',
      language: 'en',
      dateFormat: 'DD/MM/YYYY',
      timeFormat: '24h',
      compactMode: false
    },
    data: {
      autoBackup: true,
      backupFrequency: 'weekly',
      exportFormat: 'csv',
      dataRetention: '2years',
      cloudSync: true
    }
  });

  const tabs = [
    { id: 'profile', label: 'User Details', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'data', label: 'Data Management', icon: Download },
    { id: 'account', label: 'Account Settings', icon: Trash2 }
  ];

  const handleBackToDashboard = () => {
    window.location.hash = '#dashboard';
  };

  const handleSaveProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value
      }
    }));
    toast.success('Setting updated!');
  };

  const handleExportData = (format: string) => {
    toast.success(`Data exported as ${format.toUpperCase()}`);
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast.error('Account deletion initiated. You will receive a confirmation email.');
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-black text-2xl font-bold">
            {userProfile.fullName.split(' ').map(n => n[0]).join('')}
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-black hover:bg-yellow-400 transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{userProfile.fullName}</h3>
          <p className="text-gray-400">{userProfile.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={userProfile.fullName}
            onChange={(e) => setUserProfile(prev => ({ ...prev, fullName: e.target.value }))}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="email"
              value={userProfile.email}
              onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
              className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="tel"
              value={userProfile.phone}
              onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={userProfile.location}
              onChange={(e) => setUserProfile(prev => ({ ...prev, location: e.target.value }))}
              className="w-full pl-10 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Bio
        </label>
        <textarea
          value={userProfile.bio}
          onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 resize-none"
          rows={4}
          placeholder="Tell us about yourself..."
        />
      </div>

      <button
        onClick={handleSaveProfile}
        className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
      >
        <Save className="w-4 h-4" />
        Save Changes
      </button>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div>
                <h4 className="text-white font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-gray-400 text-sm">
                  {key === 'emailNotifications' && 'Receive notifications via email'}
                  {key === 'pushNotifications' && 'Receive push notifications on your device'}
                  {key === 'budgetAlerts' && 'Get alerts when approaching budget limits'}
                  {key === 'expenseReminders' && 'Reminders to log daily expenses'}
                  {key === 'weeklyReports' && 'Weekly expense summary reports'}
                  {key === 'monthlyReports' && 'Monthly financial analysis reports'}
                  {key === 'goalAchievements' && 'Notifications when you reach financial goals'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Privacy & Security Settings</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium">Profile Visibility</h4>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) => handleSettingChange('privacy', 'profileVisibility', e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="friends">Friends Only</option>
              </select>
            </div>
            <p className="text-gray-400 text-sm">Control who can see your profile information</p>
          </div>

          {Object.entries(settings.privacy).filter(([key]) => key !== 'profileVisibility').map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div>
                <h4 className="text-white font-medium capitalize flex items-center gap-2">
                  {key === 'twoFactorAuth' && <Key className="w-4 h-4" />}
                  {key === 'dataSharing' && <Globe className="w-4 h-4" />}
                  {key === 'analyticsTracking' && <Eye className="w-4 h-4" />}
                  {key === 'loginAlerts' && <Smartphone className="w-4 h-4" />}
                  {key === 'dataEncryption' && <Shield className="w-4 h-4" />}
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-gray-400 text-sm">
                  {key === 'dataSharing' && 'Share anonymized data for service improvement'}
                  {key === 'analyticsTracking' && 'Allow analytics tracking for better experience'}
                  {key === 'twoFactorAuth' && 'Enable two-factor authentication for enhanced security'}
                  {key === 'loginAlerts' && 'Get notified of new login attempts'}
                  {key === 'dataEncryption' && 'Encrypt sensitive data with advanced algorithms'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value as boolean}
                  onChange={(e) => handleSettingChange('privacy', key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Appearance & Display</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Theme
            </label>
            <div className="flex gap-2">
              {['light', 'dark', 'auto'].map((theme) => (
                <button
                  key={theme}
                  onClick={() => handleSettingChange('appearance', 'theme', theme)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                    settings.appearance.theme === theme
                      ? 'bg-yellow-500 text-black border-yellow-500'
                      : 'bg-gray-700 text-white border-gray-600 hover:border-yellow-500'
                  }`}
                >
                  {theme === 'light' && <Sun className="w-4 h-4" />}
                  {theme === 'dark' && <Moon className="w-4 h-4" />}
                  {theme === 'auto' && <Globe className="w-4 h-4" />}
                  <span className="capitalize">{theme}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Currency
            </label>
            <select
              value={settings.appearance.currency}
              onChange={(e) => handleSettingChange('appearance', 'currency', e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
            >
              <option value="INR">₹ Indian Rupee (INR)</option>
              <option value="USD">$ US Dollar (USD)</option>
              <option value="EUR">€ Euro (EUR)</option>
              <option value="GBP">£ British Pound (GBP)</option>
              <option value="JPY">¥ Japanese Yen (JPY)</option>
            </select>
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Language
            </label>
            <select
              value={settings.appearance.language}
              onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date Format
            </label>
            <select
              value={settings.appearance.dateFormat}
              onChange={(e) => handleSettingChange('appearance', 'dateFormat', e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Time Format
            </label>
            <select
              value={settings.appearance.timeFormat}
              onChange={(e) => handleSettingChange('appearance', 'timeFormat', e.target.value)}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
            >
              <option value="12h">12 Hour</option>
              <option value="24h">24 Hour</option>
            </select>
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Compact Mode</h4>
                <p className="text-gray-400 text-sm">Reduce spacing for more content</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.appearance.compactMode}
                  onChange={(e) => handleSettingChange('appearance', 'compactMode', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Data Management</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium">Backup Frequency</h4>
              <select
                value={settings.data.backupFrequency}
                onChange={(e) => handleSettingChange('data', 'backupFrequency', e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <p className="text-gray-400 text-sm">How often to automatically backup your data</p>
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium">Export Format</h4>
              <select
                value={settings.data.exportFormat}
                onChange={(e) => handleSettingChange('data', 'exportFormat', e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
              >
                <option value="csv">CSV</option>
                <option value="json">JSON</option>
                <option value="xlsx">Excel</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
            <p className="text-gray-400 text-sm">Default format for data exports</p>
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium">Data Retention</h4>
              <select
                value={settings.data.dataRetention}
                onChange={(e) => handleSettingChange('data', 'dataRetention', e.target.value)}
                className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600 focus:border-yellow-500 focus:outline-none"
              >
                <option value="1year">1 Year</option>
                <option value="2years">2 Years</option>
                <option value="5years">5 Years</option>
                <option value="forever">Forever</option>
              </select>
            </div>
            <p className="text-gray-400 text-sm">How long to keep your financial data</p>
          </div>

          {Object.entries(settings.data).filter(([key]) => !['backupFrequency', 'exportFormat', 'dataRetention'].includes(key)).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div>
                <h4 className="text-white font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-gray-400 text-sm">
                  {key === 'autoBackup' && 'Automatically backup your data to the cloud'}
                  {key === 'cloudSync' && 'Synchronize data across all your devices'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value as boolean}
                  onChange={(e) => handleSettingChange('data', key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
              </label>
            </div>
          ))}

          <div className="border-t border-gray-700 pt-4">
            <h4 className="text-white font-medium mb-4">Export Data</h4>
            <div className="flex gap-3">
              {['csv', 'json', 'xlsx', 'pdf'].map((format) => (
                <button
                  key={format}
                  onClick={() => handleExportData(format)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {format.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAccountTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-white font-medium mb-2">Change Password</h4>
            <p className="text-gray-400 text-sm mb-4">Update your account password for better security</p>
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors">
              Change Password
            </button>
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-white font-medium mb-2">Download Account Data</h4>
            <p className="text-gray-400 text-sm mb-4">Download a copy of all your account data</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-400 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Data
            </button>
          </div>

          <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-red-400 font-medium mb-2">Danger Zone</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-500 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-white font-medium mb-2">Account Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Account Created:</span>
                <span className="text-white">January 15, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Last Login:</span>
                <span className="text-white">Today, 2:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Expenses Tracked:</span>
                <span className="text-white">₹1,24,567</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Data Usage:</span>
                <span className="text-white">2.4 MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative p-6">
      <ParticleBackground density={30} color="mixed" size="medium" speed="slow" />
      <AnimatedBackground />
      <Sparkles density={15}>
        <div></div>
      </Sparkles>
      
      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackToDashboard}
            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors rounded-lg hover:bg-gray-800"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-gray-400">Manage your account and application preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-yellow-500 text-black'
                          : 'text-gray-300 hover:bg-gray-800 hover:text-yellow-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-900/50 border border-yellow-500/20 rounded-xl p-6">
              {activeTab === 'profile' && renderProfileTab()}
              {activeTab === 'notifications' && renderNotificationsTab()}
              {activeTab === 'privacy' && renderPrivacyTab()}
              {activeTab === 'appearance' && renderAppearanceTab()}
              {activeTab === 'data' && renderDataTab()}
              {activeTab === 'account' && renderAccountTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;