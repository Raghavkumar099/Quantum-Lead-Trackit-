"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, AlertTriangle, Send } from "lucide-react"
import { PilotAlertSystem } from "@/lib/pilot-alerts"

export function PilotInterface() {
  const [trainId, setTrainId] = useState("")
  const [pilotName, setPilotName] = useState("")
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState<"critical" | "high" | "medium" | "low">("medium")
  const [location, setLocation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitAlert = async () => {
    if (!trainId || !pilotName || !message || !location) {
      alert("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    try {
      PilotAlertSystem.generatePilotAlert(trainId, pilotName, message, severity, location)

      // Reset form
      setTrainId("")
      setPilotName("")
      setMessage("")
      setSeverity("medium")
      setLocation("")

      alert("Alert sent to control room successfully!")
    } catch (error) {
      alert("Failed to send alert. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4">
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <User className="h-5 w-5" />
            Pilot Alert System
            <Badge variant="outline" className="ml-auto">
              Emergency
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="trainId">Train ID</Label>
              <Input
                id="trainId"
                placeholder="e.g., 12951"
                value={trainId}
                onChange={(e) => setTrainId(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="pilotName">Pilot Name</Label>
              <Input
                id="pilotName"
                placeholder="Your name"
                value={pilotName}
                onChange={(e) => setPilotName(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Current Location</Label>
            <Input
              id="location"
              placeholder="e.g., Between Delhi-Ghaziabad"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="severity">Severity Level</Label>
            <Select value={severity} onValueChange={(value: any) => setSeverity(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="critical">🔴 Critical - Immediate Action Required</SelectItem>
                <SelectItem value="high">🟠 High - Urgent Attention Needed</SelectItem>
                <SelectItem value="medium">🟡 Medium - Monitor Situation</SelectItem>
                <SelectItem value="low">🔵 Low - Information Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="message">Alert Message</Label>
            <Textarea
              id="message"
              placeholder="Describe the situation in detail..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>

          <Button onClick={handleSubmitAlert} disabled={isSubmitting} className="w-full" size="lg">
            {isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Alert to Control Room
              </>
            )}
          </Button>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-xs text-yellow-800">
                <p className="font-medium">Emergency Use Only</p>
                <p>Use this system only for serious operational issues that require immediate controller attention.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
