"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ZoomIn, ZoomOut, RotateCcw, Train, Circle, AlertCircle, CheckCircle, Clock } from "lucide-react"

interface TrainPosition {
  id: string
  name: string
  section: string
  x: number
  y: number
  direction: "east" | "west"
  status: "moving" | "stopped" | "delayed"
  speed: number
}

interface Signal {
  id: string
  name: string
  x: number
  y: number
  status: "red" | "yellow" | "green"
  type: "main" | "distant" | "shunt"
}

export default function LiveSignalingPage() {
  const [zoomLevel, setZoomLevel] = useState(1)
  const [selectedSection, setSelectedSection] = useState("all")
  const [trains, setTrains] = useState<TrainPosition[]>([
    {
      id: "T001",
      name: "Rajdhani Express",
      section: "A-B",
      x: 150,
      y: 100,
      direction: "east",
      status: "moving",
      speed: 85,
    },
    {
      id: "T002",
      name: "Shatabdi Express",
      section: "B-C",
      x: 300,
      y: 150,
      direction: "west",
      status: "moving",
      speed: 92,
    },
    {
      id: "T003",
      name: "Local Passenger",
      section: "C-D",
      x: 450,
      y: 200,
      direction: "east",
      status: "stopped",
      speed: 0,
    },
    {
      id: "T004",
      name: "Freight Train",
      section: "D-E",
      x: 600,
      y: 100,
      direction: "west",
      status: "delayed",
      speed: 45,
    },
  ])

  const [signals, setSignals] = useState<Signal[]>([
    { id: "S001", name: "Signal A1", x: 100, y: 90, status: "green", type: "main" },
    { id: "S002", name: "Signal B1", x: 250, y: 140, status: "yellow", type: "main" },
    { id: "S003", name: "Signal C1", x: 400, y: 190, status: "red", type: "main" },
    { id: "S004", name: "Signal D1", x: 550, y: 90, status: "green", type: "distant" },
  ])

  // Animate train positions
  useEffect(() => {
    const interval = setInterval(() => {
      setTrains((prev) =>
        prev.map((train) => {
          if (train.status === "moving") {
            const newX = train.direction === "east" ? (train.x + 2) % 800 : train.x - 2 < 0 ? 800 : train.x - 2
            return { ...train, x: newX }
          }
          return train
        }),
      )
    }, 100)

    return () => clearInterval(interval)
  }, [])

  // Animate signal blinking
  useEffect(() => {
    const interval = setInterval(() => {
      setSignals((prev) =>
        prev.map((signal) => {
          if (signal.status === "yellow") {
            return { ...signal, status: Math.random() > 0.5 ? "yellow" : ("red" as "red" | "yellow" | "green") }
          }
          return signal
        }),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getTrainColor = (status: string) => {
    switch (status) {
      case "moving":
        return "text-green-600"
      case "stopped":
        return "text-yellow-600"
      case "delayed":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getSignalColor = (status: string) => {
    switch (status) {
      case "green":
        return "text-green-500"
      case "yellow":
        return "text-yellow-500"
      case "red":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Live Signaling & Track View</h1>
          <p className="text-muted-foreground">Real-time track monitoring and signal control</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium px-2">{Math.round(zoomLevel * 100)}%</span>
          <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.min(2, zoomLevel + 0.1))}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setZoomLevel(1)}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Control Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Circle className="h-5 w-5 text-blue-600" />
            Track Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Section:</span>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="all">All Sections</option>
                <option value="A-B">Section A-B</option>
                <option value="B-C">Section B-C</option>
                <option value="C-D">Section C-D</option>
                <option value="D-E">Section D-E</option>
              </select>
            </div>

            <div className="flex items-center gap-4 ml-8">
              <div className="flex items-center gap-2">
                <Circle className="h-3 w-3 text-green-500 animate-pulse" />
                <span className="text-sm">Clear</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="h-3 w-3 text-yellow-500 animate-pulse" />
                <span className="text-sm">Caution</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="h-3 w-3 text-red-500 animate-pulse" />
                <span className="text-sm">Stop</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Track Diagram */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Track Diagram - Real-time View</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="relative bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-auto"
            style={{
              height: "400px",
              transform: `scale(${zoomLevel})`,
              transformOrigin: "top left",
            }}
          >
            {/* Track Lines */}
            <svg className="absolute inset-0 w-full h-full">
              <line x1="50" y1="100" x2="750" y2="100" stroke="#374151" strokeWidth="4" />
              <line x1="50" y1="150" x2="750" y2="150" stroke="#374151" strokeWidth="4" />
              <line x1="50" y1="200" x2="750" y2="200" stroke="#374151" strokeWidth="4" />

              {/* Station markers */}
              {[100, 250, 400, 550, 700].map((x, i) => (
                <g key={i}>
                  <rect x={x - 10} y="80" width="20" height="140" fill="#6B7280" opacity="0.3" />
                  <text x={x} y="75" textAnchor="middle" className="text-xs fill-gray-600">
                    Station {String.fromCharCode(65 + i)}
                  </text>
                </g>
              ))}
            </svg>

            {/* Signals */}
            {signals.map((signal) => (
              <div
                key={signal.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: signal.x, top: signal.y }}
              >
                <div className="flex flex-col items-center">
                  <Circle
                    className={`h-4 w-4 ${getSignalColor(signal.status)} ${signal.status === "yellow" ? "animate-pulse" : ""}`}
                    fill="currentColor"
                  />
                  <span className="text-xs text-gray-600 mt-1">{signal.name}</span>
                </div>
              </div>
            ))}

            {/* Trains */}
            {trains.map((train) => (
              <div
                key={train.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-linear"
                style={{ left: train.x, top: train.y }}
              >
                <div className="flex flex-col items-center">
                  <Train
                    className={`h-6 w-6 ${getTrainColor(train.status)} ${train.status === "moving" ? "animate-pulse" : ""}`}
                    style={{
                      transform: train.direction === "west" ? "scaleX(-1)" : "scaleX(1)",
                    }}
                  />
                  <div className="bg-white dark:bg-gray-800 rounded px-2 py-1 shadow-sm border mt-1">
                    <span className="text-xs font-medium">{train.id}</span>
                    <div className="text-xs text-gray-500">{train.speed} km/h</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trains.map((train) => (
          <Card key={train.id} className="animate-in slide-in-from-bottom duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{train.id}</span>
                <Badge
                  variant={
                    train.status === "moving" ? "default" : train.status === "delayed" ? "destructive" : "secondary"
                  }
                >
                  {train.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{train.name}</p>
              <p className="text-sm">Section: {train.section}</p>
              <p className="text-sm">Speed: {train.speed} km/h</p>
              <div className="flex items-center gap-1 mt-2">
                {train.status === "moving" && <CheckCircle className="h-4 w-4 text-green-500" />}
                {train.status === "delayed" && <AlertCircle className="h-4 w-4 text-red-500" />}
                {train.status === "stopped" && <Clock className="h-4 w-4 text-yellow-500" />}
                <span className="text-xs capitalize">{train.status}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
