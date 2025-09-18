"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Train, User, Lock } from "lucide-react"
import { Logo } from "@/components/logo"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple validation - in real app, this would be proper authentication
    if (username && password) {
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-gray-100 dark:from-gray-900 dark:via-blue-900 dark:to-gray-800 flex items-center justify-center p-4 transition-all duration-500">
      <Card className="w-full max-w-md animate-in slide-in-from-bottom-4 fade-in duration-700 shadow-2xl border-0 bg-white dark:bg-gray-900 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full shadow-lg">
              <Logo className="w-12 h-12 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TrackIt
            </CardTitle>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Smart Railway Operations</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">AI-Powered Traffic Control System</p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Controller Username
              </Label>
              <div className="relative group">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your controller ID"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Security Password
              </Label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 border-0 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Train className="h-4 w-4" />
              Access Control Center
            </button>
          </form>

          <div className="mt-8 text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-xs text-green-600 dark:text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>System Online & Secure</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Authorized Railway Personnel Only</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">TrackIt Railway Control System v3.0</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
