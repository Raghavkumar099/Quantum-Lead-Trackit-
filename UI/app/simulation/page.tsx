"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { FlaskConical, Play, RotateCcw, TrendingUp, TrendingDown } from "lucide-react"

const mockTrains = [
  { id: "12001", name: "Shatabdi Express", currentDelay: 0 },
  { id: "12002", name: "Rajdhani Express", currentDelay: 15 },
  { id: "22691", name: "Rajdhani Express", currentDelay: 8 },
  { id: "12345", name: "Local Passenger", currentDelay: 3 },
  { id: "56789", name: "Freight Special", currentDelay: 0 },
]

const beforeData = [
  { metric: "Avg Delay", value: 8.2 },
  { metric: "Throughput", value: 142 },
  { metric: "Punctuality", value: 78 },
  { metric: "Efficiency", value: 85 },
]

const afterData = [
  { metric: "Avg Delay", value: 4.1 },
  { metric: "Throughput", value: 168 },
  { metric: "Punctuality", value: 92 },
  { metric: "Efficiency", value: 94 },
]

const timelineData = [
  { time: "Current", before: 8.2, after: 8.2 },
  { time: "+5min", before: 9.1, after: 6.8 },
  { time: "+10min", before: 10.5, after: 5.2 },
  { time: "+15min", before: 12.2, after: 4.1 },
  { time: "+20min", before: 13.8, after: 3.9 },
  { time: "+30min", before: 15.1, after: 4.1 },
]

export default function SimulationPage() {
  const [selectedTrain, setSelectedTrain] = useState("")
  const [delayTime, setDelayTime] = useState("")
  const [rerouteOption, setRerouteOption] = useState("")
  const [scenario, setScenario] = useState("")
  const [simulationRun, setSimulationRun] = useState(false)

  const handleRunSimulation = () => {
    setSimulationRun(true)
  }

  const handleReset = () => {
    setSimulationRun(false)
    setSelectedTrain("")
    setDelayTime("")
    setRerouteOption("")
    setScenario("")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FlaskConical className="h-6 w-6 text-purple-600" />
            What-if Simulation
          </h1>
          <p className="text-gray-600 mt-1">Test scenarios before applying changes to live traffic</p>
        </div>
        <Badge variant="outline" className="bg-purple-50 text-purple-700">
          AI Simulation Engine
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Scenario Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="train-select">Select Train</Label>
              <Select value={selectedTrain} onValueChange={setSelectedTrain}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a train to simulate" />
                </SelectTrigger>
                <SelectContent>
                  {mockTrains.map((train) => (
                    <SelectItem key={train.id} value={train.id}>
                      {train.id} - {train.name} (Current delay: {train.currentDelay}min)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delay-time">Additional Delay (minutes)</Label>
              <Input
                id="delay-time"
                type="number"
                placeholder="Enter delay in minutes"
                value={delayTime}
                onChange={(e) => setDelayTime(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reroute">Reroute Option</Label>
              <Select value={rerouteOption} onValueChange={setRerouteOption}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reroute option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="track1">Switch to Track 1</SelectItem>
                  <SelectItem value="track2">Switch to Track 2</SelectItem>
                  <SelectItem value="track3">Switch to Track 3</SelectItem>
                  <SelectItem value="bypass">Use Bypass Route</SelectItem>
                  <SelectItem value="none">No Reroute</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scenario">Scenario Description</Label>
              <Textarea
                id="scenario"
                placeholder="Describe the scenario you want to test (e.g., Track maintenance, Weather delay, Signal failure)"
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleRunSimulation} className="flex-1 bg-purple-600 hover:bg-purple-700">
                <Play className="h-4 w-4 mr-2" />
                Run Simulation
              </Button>
              <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Simulation Results</CardTitle>
          </CardHeader>
          <CardContent>
            {!simulationRun ? (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <FlaskConical className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Configure scenario and run simulation to see results</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingDown className="h-4 w-4 text-red-600" />
                      <span className="font-medium text-red-800">Before Changes</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Avg Delay:</span>
                        <span className="font-semibold">8.2 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Throughput:</span>
                        <span className="font-semibold">142/hr</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Punctuality:</span>
                        <span className="font-semibold">78%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">After AI Optimization</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Avg Delay:</span>
                        <span className="font-semibold">4.1 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Throughput:</span>
                        <span className="font-semibold">168/hr</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Punctuality:</span>
                        <span className="font-semibold">92%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Key Improvements</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 50% reduction in average delays</li>
                    <li>• 18% increase in hourly throughput</li>
                    <li>• 14% improvement in punctuality</li>
                    <li>• Estimated savings: ₹2.8L per day</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Implementation Notes</h4>
                  <p className="text-sm text-yellow-700">
                    Rerouting {selectedTrain} with {delayTime} minute delay will require coordination with 3 other
                    trains. Estimated implementation time: 4 minutes.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Comparison Chart */}
      {simulationRun && (
        <Card>
          <CardHeader>
            <CardTitle>Before vs After Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                before: {
                  label: "Before Changes",
                  color: "hsl(var(--chart-2))",
                },
                after: {
                  label: "After AI Optimization",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timelineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="before"
                    stroke="var(--color-before)"
                    strokeWidth={2}
                    name="Before Changes"
                  />
                  <Line
                    type="monotone"
                    dataKey="after"
                    stroke="var(--color-after)"
                    strokeWidth={2}
                    name="After AI Optimization"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
