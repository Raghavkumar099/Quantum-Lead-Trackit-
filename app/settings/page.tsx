"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, User, Bell, Palette, Shield, Save } from "lucide-react"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "Controller Singh",
    email: "singh@indianrailways.gov.in",
    employeeId: "IR001234",
    department: "Traffic Control",
    shift: "morning",
  })

  const [notifications, setNotifications] = useState({
    criticalAlerts: true,
    delayNotifications: true,
    systemUpdates: false,
    emailReports: true,
    smsAlerts: true,
  })

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: "english",
    timezone: "IST",
    refreshRate: "30",
    autoAcceptLowRisk: false,
  })

  const handleSaveProfile = () => {
    alert("Profile settings saved successfully!")
  }

  const handleSaveNotifications = () => {
    alert("Notification preferences saved!")
  }

  const handleSavePreferences = () => {
    alert("System preferences saved!")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Settings className="h-6 w-6 text-gray-600" />
            Settings
          </h1>
          <p className="text-gray-600 mt-1">Manage your profile and system preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Controller Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input
                id="employeeId"
                value={profile.employeeId}
                onChange={(e) => setProfile({ ...profile, employeeId: e.target.value })}
                disabled
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={profile.department}
                onChange={(e) => setProfile({ ...profile, department: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shift">Preferred Shift</Label>
              <Select value={profile.shift} onValueChange={(value) => setProfile({ ...profile, shift: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (6 AM - 2 PM)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (2 PM - 10 PM)</SelectItem>
                  <SelectItem value="night">Night (10 PM - 6 AM)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSaveProfile} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Profile
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="critical-alerts">Critical Alerts</Label>
                <p className="text-sm text-gray-600">Immediate notifications for critical issues</p>
              </div>
              <Switch
                id="critical-alerts"
                checked={notifications.criticalAlerts}
                onCheckedChange={(checked) => setNotifications({ ...notifications, criticalAlerts: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="delay-notifications">Delay Notifications</Label>
                <p className="text-sm text-gray-600">Alerts for train delays over 5 minutes</p>
              </div>
              <Switch
                id="delay-notifications"
                checked={notifications.delayNotifications}
                onCheckedChange={(checked) => setNotifications({ ...notifications, delayNotifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="system-updates">System Updates</Label>
                <p className="text-sm text-gray-600">Notifications about system maintenance</p>
              </div>
              <Switch
                id="system-updates"
                checked={notifications.systemUpdates}
                onCheckedChange={(checked) => setNotifications({ ...notifications, systemUpdates: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-reports">Email Reports</Label>
                <p className="text-sm text-gray-600">Daily performance reports via email</p>
              </div>
              <Switch
                id="email-reports"
                checked={notifications.emailReports}
                onCheckedChange={(checked) => setNotifications({ ...notifications, emailReports: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="sms-alerts">SMS Alerts</Label>
                <p className="text-sm text-gray-600">Emergency alerts via SMS</p>
              </div>
              <Switch
                id="sms-alerts"
                checked={notifications.smsAlerts}
                onCheckedChange={(checked) => setNotifications({ ...notifications, smsAlerts: checked })}
              />
            </div>

            <Button onClick={handleSaveNotifications} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Notifications
            </Button>
          </CardContent>
        </Card>

        {/* System Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              System Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <p className="text-sm text-gray-600">Switch to dark theme</p>
              </div>
              <Switch
                id="dark-mode"
                checked={preferences.darkMode}
                onCheckedChange={(checked) => setPreferences({ ...preferences, darkMode: checked })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={preferences.language}
                onValueChange={(value) => setPreferences({ ...preferences, language: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                  <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
                  <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={preferences.timezone}
                onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IST">IST (Indian Standard Time)</SelectItem>
                  <SelectItem value="UTC">UTC (Coordinated Universal Time)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="refresh-rate">Data Refresh Rate (seconds)</Label>
              <Select
                value={preferences.refreshRate}
                onValueChange={(value) => setPreferences({ ...preferences, refreshRate: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 seconds</SelectItem>
                  <SelectItem value="30">30 seconds</SelectItem>
                  <SelectItem value="60">1 minute</SelectItem>
                  <SelectItem value="300">5 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-accept">Auto-accept Low Risk AI Recommendations</Label>
                <p className="text-sm text-gray-600">Automatically implement low-risk suggestions</p>
              </div>
              <Switch
                id="auto-accept"
                checked={preferences.autoAcceptLowRisk}
                onCheckedChange={(checked) => setPreferences({ ...preferences, autoAcceptLowRisk: checked })}
              />
            </div>

            <Button onClick={handleSavePreferences} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security & Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" placeholder="Enter current password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" placeholder="Enter new password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" placeholder="Confirm new password" />
            </div>

            <div className="bg-yellow-50 p-3 rounded-md">
              <h4 className="font-medium text-yellow-800 mb-2">Security Guidelines</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Password must be at least 8 characters long</li>
                <li>• Include uppercase, lowercase, numbers, and symbols</li>
                <li>• Change password every 90 days</li>
                <li>• Never share credentials with others</li>
              </ul>
            </div>

            <Button className="w-full">
              <Shield className="h-4 w-4 mr-2" />
              Update Password
            </Button>

            <div className="pt-4 border-t">
              <div className="space-y-2">
                <Label>Session Information</Label>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Last Login: Jan 15, 2024 at 08:30 AM</p>
                  <p>IP Address: 192.168.1.100</p>
                  <p>Session Expires: Jan 15, 2024 at 08:30 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
