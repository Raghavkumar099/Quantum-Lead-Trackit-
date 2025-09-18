"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { FileText, Download, Calendar, TrendingUp, Clock, Train, Users } from "lucide-react"

const performanceData = [
  { date: "Jan 8", punctuality: 85, avgDelay: 6.2, throughput: 142 },
  { date: "Jan 9", punctuality: 88, avgDelay: 5.1, throughput: 156 },
  { date: "Jan 10", punctuality: 82, avgDelay: 7.8, throughput: 138 },
  { date: "Jan 11", punctuality: 91, avgDelay: 4.2, throughput: 168 },
  { date: "Jan 12", punctuality: 87, avgDelay: 5.9, throughput: 152 },
  { date: "Jan 13", punctuality: 93, avgDelay: 3.8, throughput: 174 },
  { date: "Jan 14", punctuality: 89, avgDelay: 4.9, throughput: 161 },
]

const trainTypeData = [
  { type: "Express", count: 45, color: "#3b82f6" },
  { type: "Local", count: 78, color: "#10b981" },
  { type: "Freight", count: 23, color: "#f59e0b" },
  { type: "Maintenance", count: 8, color: "#8b5cf6" },
]

const auditTrail = [
  {
    id: 1,
    timestamp: "2024-01-15 14:23:45",
    controller: "Controller Singh",
    action: "Accepted AI Recommendation",
    details: "Rerouted Express 12002 to Track 1",
    impact: "Reduced delay by 12 minutes",
  },
  {
    id: 2,
    timestamp: "2024-01-15 13:45:12",
    controller: "Controller Sharma",
    action: "Manual Override",
    details: "Delayed Local 12345 by 3 minutes",
    impact: "Improved platform utilization",
  },
  {
    id: 3,
    timestamp: "2024-01-15 13:20:30",
    controller: "Controller Singh",
    action: "Emergency Response",
    details: "Activated emergency protocol for medical assistance",
    impact: "Ensured passenger safety",
  },
  {
    id: 4,
    timestamp: "2024-01-15 12:55:18",
    controller: "Controller Patel",
    action: "Schedule Adjustment",
    details: "Modified freight schedule due to weather",
    impact: "Maintained safety standards",
  },
  {
    id: 5,
    timestamp: "2024-01-15 12:30:45",
    controller: "Controller Sharma",
    action: "Accepted AI Recommendation",
    details: "Implemented priority lane for Shatabdi",
    impact: "Maintained premium service punctuality",
  },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly")
  const [selectedReport, setSelectedReport] = useState("performance")

  const handleExportPDF = () => {
    // In a real app, this would generate and download a PDF
    alert("PDF report would be generated and downloaded")
  }

  const handleExportCSV = () => {
    // In a real app, this would generate and download a CSV
    alert("CSV data would be generated and downloaded")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            Reports & Performance Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Performance analytics and operational reports</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleExportPDF} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={handleExportCSV} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Calendar className="h-5 w-5 text-gray-500" />
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Period:</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Report Type:</label>
              <Select value={selectedReport} onValueChange={setSelectedReport}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="safety">Safety</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Punctuality</p>
                <p className="text-2xl font-bold text-green-600">87.8%</p>
                <p className="text-xs text-green-600">+2.3% from last week</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Delay</p>
                <p className="text-2xl font-bold text-orange-600">5.4 min</p>
                <p className="text-xs text-green-600">-1.2 min from last week</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Daily Throughput</p>
                <p className="text-2xl font-bold text-blue-600">156/hr</p>
                <p className="text-xs text-green-600">+8% from last week</p>
              </div>
              <Train className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AI Acceptance</p>
                <p className="text-2xl font-bold text-purple-600">94.2%</p>
                <p className="text-xs text-green-600">+1.8% from last week</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                punctuality: {
                  label: "Punctuality %",
                  color: "hsl(var(--chart-1))",
                },
                avgDelay: {
                  label: "Avg Delay (min)",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="punctuality"
                    stroke="var(--color-punctuality)"
                    strokeWidth={2}
                    name="Punctuality %"
                  />
                  <Line
                    type="monotone"
                    dataKey="avgDelay"
                    stroke="var(--color-avgDelay)"
                    strokeWidth={2}
                    name="Avg Delay (min)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Train Type Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Count",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trainTypeData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="count"
                    label={({ type, count }) => `${type}: ${count}`}
                  >
                    {trainTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Throughput Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Throughput Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              throughput: {
                label: "Trains per Hour",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="throughput" fill="var(--color-throughput)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Audit Trail */}
      <Card>
        <CardHeader>
          <CardTitle>Controller Decision Audit Trail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditTrail.map((entry) => (
              <div key={entry.id} className="border-l-4 border-blue-200 pl-4 py-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{entry.action}</Badge>
                      <span className="text-sm text-gray-500">{entry.controller}</span>
                    </div>
                    <p className="text-sm font-medium">{entry.details}</p>
                    <p className="text-xs text-gray-600 mt-1">{entry.impact}</p>
                  </div>
                  <div className="text-xs text-gray-500">{new Date(entry.timestamp).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
