export interface Signal {
  id: string
  location: string
  aspect: "green" | "yellow" | "red" | "double-yellow"
  trackSection: string
  lastUpdate: Date
  safetyStatus: "normal" | "caution" | "danger"
  nextTrain?: string
  clearanceTime?: number
}

export interface TrackSection {
  id: string
  name: string
  status: "clear" | "occupied" | "blocked" | "maintenance"
  occupiedBy?: string
  safetyRating: number
  speedLimit: number
  weatherImpact: "none" | "light" | "moderate" | "severe"
}

export interface SafetyAlert {
  id: string
  type: "signal" | "track" | "weather" | "collision-risk" | "speed-violation"
  severity: "low" | "medium" | "high" | "critical"
  message: string
  location: string
  trainId?: string
  timestamp: Date
  acknowledged: boolean
  autoResolved: boolean
}

export class LiveSignalingSystem {
  private signals: Signal[] = []
  private trackSections: TrackSection[] = []
  private alerts: SafetyAlert[] = []

  constructor() {
    this.initializeSignals()
    this.initializeTrackSections()
  }

  private initializeSignals(): void {
    this.signals = [
      {
        id: "SIG-001",
        location: "New Delhi Junction - Platform 1",
        aspect: "green",
        trackSection: "TRACK-001",
        lastUpdate: new Date(),
        safetyStatus: "normal",
        nextTrain: "12001",
        clearanceTime: 120,
      },
      {
        id: "SIG-002",
        location: "Ghaziabad - Main Line",
        aspect: "yellow",
        trackSection: "TRACK-002",
        lastUpdate: new Date(),
        safetyStatus: "caution",
        nextTrain: "12345",
        clearanceTime: 45,
      },
      {
        id: "SIG-003",
        location: "Kanpur Central - Platform 3",
        aspect: "red",
        trackSection: "TRACK-003",
        lastUpdate: new Date(),
        safetyStatus: "danger",
        nextTrain: "22691",
        clearanceTime: 0,
      },
      {
        id: "SIG-004",
        location: "Mumbai Central - Platform 2",
        aspect: "double-yellow",
        trackSection: "TRACK-004",
        lastUpdate: new Date(),
        safetyStatus: "caution",
        nextTrain: "12002",
        clearanceTime: 90,
      },
    ]
  }

  private initializeTrackSections(): void {
    this.trackSections = [
      {
        id: "TRACK-001",
        name: "New Delhi - Ghaziabad Section",
        status: "clear",
        safetyRating: 95,
        speedLimit: 130,
        weatherImpact: "none",
      },
      {
        id: "TRACK-002",
        name: "Ghaziabad - Meerut Section",
        status: "occupied",
        occupiedBy: "12345",
        safetyRating: 88,
        speedLimit: 110,
        weatherImpact: "light",
      },
      {
        id: "TRACK-003",
        name: "Kanpur - Lucknow Section",
        status: "blocked",
        occupiedBy: "22691",
        safetyRating: 75,
        speedLimit: 90,
        weatherImpact: "moderate",
      },
      {
        id: "TRACK-004",
        name: "Mumbai Central - Borivali Section",
        status: "maintenance",
        safetyRating: 60,
        speedLimit: 60,
        weatherImpact: "severe",
      },
    ]
  }

  generateLiveAlerts(): SafetyAlert[] {
    const newAlerts: SafetyAlert[] = []

    // Check for signal-based alerts
    this.signals.forEach((signal) => {
      if (signal.aspect === "red" && signal.nextTrain) {
        newAlerts.push({
          id: `ALERT-${Date.now()}-${signal.id}`,
          type: "signal",
          severity: "high",
          message: `Red signal at ${signal.location} - Train ${signal.nextTrain} must stop`,
          location: signal.location,
          trainId: signal.nextTrain,
          timestamp: new Date(),
          acknowledged: false,
          autoResolved: false,
        })
      }

      if (signal.clearanceTime && signal.clearanceTime < 30 && signal.aspect !== "green") {
        newAlerts.push({
          id: `ALERT-${Date.now()}-CLEAR-${signal.id}`,
          type: "collision-risk",
          severity: "critical",
          message: `Collision risk: Signal ${signal.id} clearance time ${signal.clearanceTime}s`,
          location: signal.location,
          trainId: signal.nextTrain,
          timestamp: new Date(),
          acknowledged: false,
          autoResolved: false,
        })
      }
    })

    // Check for track-based alerts
    this.trackSections.forEach((track) => {
      if (track.safetyRating < 80) {
        newAlerts.push({
          id: `ALERT-${Date.now()}-${track.id}`,
          type: "track",
          severity: track.safetyRating < 70 ? "critical" : "high",
          message: `Track safety concern: ${track.name} - Safety rating ${track.safetyRating}%`,
          location: track.name,
          trainId: track.occupiedBy,
          timestamp: new Date(),
          acknowledged: false,
          autoResolved: false,
        })
      }

      if (track.weatherImpact === "severe") {
        newAlerts.push({
          id: `ALERT-${Date.now()}-WEATHER-${track.id}`,
          type: "weather",
          severity: "medium",
          message: `Severe weather impact on ${track.name} - Speed limit reduced to ${track.speedLimit}km/h`,
          location: track.name,
          timestamp: new Date(),
          acknowledged: false,
          autoResolved: false,
        })
      }
    })

    return newAlerts
  }

  updateSignals(): void {
    this.signals = this.signals.map((signal) => ({
      ...signal,
      lastUpdate: new Date(),
      clearanceTime: signal.clearanceTime ? Math.max(0, signal.clearanceTime - 5) : undefined,
      aspect: Math.random() > 0.8 ? this.getRandomAspect() : signal.aspect,
    }))
  }

  private getRandomAspect(): "green" | "yellow" | "red" | "double-yellow" {
    const aspects = ["green", "yellow", "red", "double-yellow"] as const
    return aspects[Math.floor(Math.random() * aspects.length)]
  }

  getSignals(): Signal[] {
    return this.signals
  }

  getTrackSections(): TrackSection[] {
    return this.trackSections
  }

  getActiveAlerts(): SafetyAlert[] {
    return this.alerts.filter((alert) => !alert.acknowledged)
  }

  acknowledgeAlert(alertId: string): void {
    this.alerts = this.alerts.map((alert) => (alert.id === alertId ? { ...alert, acknowledged: true } : alert))
  }

  addAlert(alert: SafetyAlert): void {
    this.alerts.push(alert)
  }
}
