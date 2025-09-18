"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Clock, CheckCircle, User, Filter, Bell } from "lucide-react"

const mockAlerts = [
  {
    id: 1,
    title: "Signal Failure at Junction A",
    description: "Automatic signaling system malfunction affecting Track 2 and Track 3",
    severity: "Critical",
    timestamp: "2024-01-15 14:23:45",
    trainsAffected: ["12002", "22691", "12345"],
    status: "Active",
    assignedTo: null,
    estimatedResolution: "45 minutes",
    category: "Technical",
  },
  {
    id: 2,
    title: "Heavy Fog Warning",
    description: "Visibility reduced to 50m in Delhi-Ghaziabad section, speed restrictions in effect",
    severity: "High",
    timestamp: "2024-01-15 13:45:12",
    trainsAffected: ["12001", "12345"],
    status: "Acknowledged",
    assignedTo: "Controller Singh",
    estimatedResolution: "2 hours",
    category: "Weather",
  },
  {
    id: 3,
    title: "Track Maintenance Scheduled",
    description: "Planned maintenance on Track 4 from 15:00 to 17:00",
    severity: "Medium",
    timestamp: "2024-01-15 12:30:00",
    trainsAffected: ["56789"],
    status: "Assigned",
    assignedTo: "Maintenance Team A",
    estimatedResolution: "2 hours",
    category: "Maintenance",
  },
  {
    id: 4,
    title: "Passenger Medical Emergency",
    description: "Medical assistance required at Platform 2, train 12001 delayed",
    severity: "High",
    timestamp: "2024-01-15 14:15:30",
    trainsAffected: ["12001"],
    status: "Resolved",
    assignedTo: "Medical Team",
    estimatedResolution: "Completed",
    category: "Emergency",
  },
  {
    id: 5,
    title: "Cattle on Track",
    description: "Animals reported on Track 1 near KM 45, trains proceeding with caution",
    severity: "Medium",
    timestamp: "2024-01-15 13:20:15",
    trainsAffected: ["22691"],
    status: "Active",
    assignedTo: null,
    estimatedResolution: "30 minutes",
    category: "Safety",
  },
  {
    id: 6,
    title: "Power Supply Fluctuation",
    description: "Intermittent power issues affecting electric trains in Zone B",
    severity: "Low",
    timestamp: "2024-01-15 11:45:22",
    trainsAffected: ["12345"],
    status: "Monitoring",
    assignedTo: "Electrical Team",
    estimatedResolution: "1 hour",
    category: "Technical",
  },
]

export default function AlertsPage() {
  const [selectedSeverity, setSelectedSeverity] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState<number[]>([])

  const handleAcknowledge = (alertId: number) => {
    setAcknowledgedAlerts([...acknowledgedAlerts, alertId])
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-red-100 text-red-800"
      case "Acknowledged":
        return "bg-yellow-100 text-yellow-800"
      case "Assigned":
        return "bg-blue-100 text-blue-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "Monitoring":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Technical":
        return "🔧"
      case "Weather":
        return "🌫️"
      case "Maintenance":
        return "🔨"
      case "Emergency":
        return "🚨"
      case "Safety":
        return "⚠️"
      default:
        return "📋"
    }
  }

  const filteredAlerts = mockAlerts.filter((alert) => {
    const severityMatch = selectedSeverity === "All" || alert.severity === selectedSeverity
    const statusMatch = selectedStatus === "All" || alert.status === selectedStatus
    return severityMatch && statusMatch
  })

  const criticalCount = mockAlerts.filter((a) => a.severity === "Critical").length
  const activeCount = mockAlerts.filter((a) => a.status === "Active").length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-red-600" />
            Alerts & Notifications
          </h1>
          <p className="text-gray-600 mt-1">Real-time disruption alerts and system notifications</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-red-50 text-red-700">
            <Bell className="h-3 w-3 mr-1" />
            {activeCount} Active
          </Badge>
          {criticalCount > 0 && <Badge className="bg-red-600 text-white">{criticalCount} Critical</Badge>}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{criticalCount}</p>
              <p className="text-sm text-gray-600">Critical Alerts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{activeCount}</p>
              <p className="text-sm text-gray-600">Active Alerts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {mockAlerts.filter((a) => a.status === "Resolved").length}
              </p>
              <p className="text-sm text-gray-600">Resolved Today</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {mockAlerts.reduce((acc, alert) => acc + alert.trainsAffected.length, 0)}
              </p>
              <p className="text-sm text-gray-600">Trains Affected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Severity:</label>
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Status:</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Acknowledged">Acknowledged</SelectItem>
                  <SelectItem value="Assigned">Assigned</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const isAcknowledged = acknowledgedAlerts.includes(alert.id)

          return (
            <Card
              key={alert.id}
              className={`${
                alert.severity === "Critical" ? "border-red-200 bg-red-50" : ""
              } transition-all duration-200`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-lg">{getCategoryIcon(alert.category)}</span>
                      <h3 className="font-semibold text-lg">{alert.title}</h3>
                      <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                      <Badge className={getStatusColor(alert.status)}>{alert.status}</Badge>
                    </div>

                    <p className="text-gray-700 mb-3">{alert.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-gray-600">Timestamp:</p>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span>{new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">Trains Affected:</p>
                        <div className="flex gap-1 mt-1">
                          {alert.trainsAffected.map((trainId) => (
                            <Badge key={trainId} variant="outline" className="text-xs">
                              {trainId}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-600">Estimated Resolution:</p>
                        <span>{alert.estimatedResolution}</span>
                      </div>
                    </div>

                    {alert.assignedTo && (
                      <div className="mt-2 flex items-center gap-1 text-sm">
                        <User className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600">Assigned to: {alert.assignedTo}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    {alert.status === "Active" && !isAcknowledged && (
                      <Button
                        onClick={() => handleAcknowledge(alert.id)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Acknowledge
                      </Button>
                    )}
                    {alert.status === "Acknowledged" && (
                      <Button size="sm" variant="outline">
                        <User className="h-4 w-4 mr-2" />
                        Assign to Staff
                      </Button>
                    )}
                    {isAcknowledged && <Badge className="bg-blue-100 text-blue-800">Acknowledged</Badge>}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
