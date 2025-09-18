export interface PilotAlert {
  id: string
  trainId: string
  pilotName: string
  message: string
  severity: "critical" | "high" | "medium" | "low"
  location: string
  timestamp: Date
  acknowledged: boolean
  type: "pilot-alert"
}

export class PilotAlertSystem {
  private static alerts: PilotAlert[] = []
  private static listeners: ((alerts: PilotAlert[]) => void)[] = []

  static generatePilotAlert(
    trainId: string,
    pilotName: string,
    message: string,
    severity: "critical" | "high" | "medium" | "low",
    location: string,
  ): PilotAlert {
    const alert: PilotAlert = {
      id: `pilot-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      trainId,
      pilotName,
      message,
      severity,
      location,
      timestamp: new Date(),
      acknowledged: false,
      type: "pilot-alert",
    }

    this.alerts.unshift(alert)
    this.notifyListeners()
    return alert
  }

  static acknowledgeAlert(alertId: string) {
    const alert = this.alerts.find((a) => a.id === alertId)
    if (alert) {
      alert.acknowledged = true
      this.notifyListeners()
    }
  }

  static getActiveAlerts(): PilotAlert[] {
    return this.alerts.filter((alert) => !alert.acknowledged)
  }

  static getAllAlerts(): PilotAlert[] {
    return [...this.alerts]
  }

  static subscribe(callback: (alerts: PilotAlert[]) => void) {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback)
    }
  }

  private static notifyListeners() {
    this.listeners.forEach((listener) => listener(this.alerts))
  }

  // Simulate pilot alerts for demo
  static startSimulation() {
    const scenarios = [
      {
        trainId: "12951",
        pilotName: "Rajesh Kumar",
        message: "Engine overheating detected, requesting immediate maintenance",
        severity: "critical" as const,
        location: "Between Ghaziabad-Modinagar",
      },
      {
        trainId: "12423",
        pilotName: "Amit Singh",
        message: "Unusual vibration in coach B2, need inspection",
        severity: "high" as const,
        location: "Approaching Meerut City",
      },
      {
        trainId: "14217",
        pilotName: "Suresh Yadav",
        message: "Signal visibility poor due to fog, reducing speed",
        severity: "medium" as const,
        location: "Near Saharanpur Junction",
      },
      {
        trainId: "12311",
        pilotName: "Vikram Sharma",
        message: "Passenger medical emergency in coach A1",
        severity: "high" as const,
        location: "Between Delhi-Ghaziabad",
      },
      {
        trainId: "12019",
        pilotName: "Manoj Gupta",
        message: "Track obstruction ahead, applying emergency brakes",
        severity: "critical" as const,
        location: "Approaching Muzaffarnagar",
      },
    ]

    let index = 0
    const interval = setInterval(() => {
      if (index < scenarios.length) {
        const scenario = scenarios[index]
        this.generatePilotAlert(
          scenario.trainId,
          scenario.pilotName,
          scenario.message,
          scenario.severity,
          scenario.location,
        )
        index++
      } else {
        clearInterval(interval)
      }
    }, 8000) // Generate alert every 8 seconds
  }
}
