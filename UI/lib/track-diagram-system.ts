export interface TrackDiagram {
  id: string
  name: string
  sections: TrackSection[]
  crossings: Crossing[]
  platforms: Platform[]
  signals: Signal[]
}

export interface TrackSection {
  id: string
  name: string
  startKm: number
  endKm: number
  status: "clear" | "occupied" | "blocked" | "maintenance"
  occupiedBy?: string
  speedLimit: number
  signalId?: string
}

export interface Crossing {
  id: string
  name: string
  km: number
  status: "open" | "closed" | "warning"
  safetyLevel: "high" | "medium" | "low"
  lastUpdate: Date
  trafficCount: number
}

export interface Platform {
  id: string
  number: string
  status: "available" | "occupied" | "maintenance"
  assignedTrain?: string
  scheduledArrival?: string
  scheduledDeparture?: string
  length: number
}

export interface Signal {
  id: string
  km: number
  aspect: "green" | "yellow" | "red" | "double-yellow"
  nextSignalDistance: number
  controlledBy: "auto" | "manual"
}

export class TrackDiagramSystem {
  private diagram: TrackDiagram
  private automatedScheduling = true

  constructor() {
    this.diagram = this.initializeDiagram()
  }

  private initializeDiagram(): TrackDiagram {
    return {
      id: "northern-zone-main",
      name: "Northern Zone Main Line",
      sections: [
        {
          id: "SEC-001",
          name: "Delhi Junction - Ghaziabad",
          startKm: 0,
          endKm: 25,
          status: "occupied",
          occupiedBy: "12001",
          speedLimit: 110,
          signalId: "SIG-001",
        },
        {
          id: "SEC-002",
          name: "Ghaziabad - Meerut",
          startKm: 25,
          endKm: 45,
          status: "clear",
          speedLimit: 100,
          signalId: "SIG-002",
        },
        {
          id: "SEC-003",
          name: "Meerut - Muzaffarnagar",
          startKm: 45,
          endKm: 75,
          status: "occupied",
          occupiedBy: "12345",
          speedLimit: 90,
          signalId: "SIG-003",
        },
        {
          id: "SEC-004",
          name: "Muzaffarnagar - Saharanpur",
          startKm: 75,
          endKm: 105,
          status: "clear",
          speedLimit: 110,
          signalId: "SIG-004",
        },
      ],
      crossings: [
        {
          id: "CROSS-001",
          name: "NH-58 Crossing",
          km: 15,
          status: "closed",
          safetyLevel: "high",
          lastUpdate: new Date(),
          trafficCount: 45,
        },
        {
          id: "CROSS-002",
          name: "State Highway Crossing",
          km: 35,
          status: "open",
          safetyLevel: "medium",
          lastUpdate: new Date(),
          trafficCount: 23,
        },
        {
          id: "CROSS-003",
          name: "Village Road Crossing",
          km: 65,
          status: "warning",
          safetyLevel: "low",
          lastUpdate: new Date(),
          trafficCount: 12,
        },
      ],
      platforms: [
        {
          id: "PF-001",
          number: "1",
          status: "occupied",
          assignedTrain: "12001",
          scheduledArrival: "14:30",
          scheduledDeparture: "14:35",
          length: 400,
        },
        {
          id: "PF-002",
          number: "2",
          status: "available",
          length: 350,
        },
        {
          id: "PF-003",
          number: "3",
          status: "occupied",
          assignedTrain: "22691",
          scheduledArrival: "15:15",
          scheduledDeparture: "15:20",
          length: 450,
        },
        {
          id: "PF-004",
          number: "4",
          status: "maintenance",
          length: 300,
        },
      ],
      signals: [
        {
          id: "SIG-001",
          km: 5,
          aspect: "yellow",
          nextSignalDistance: 20,
          controlledBy: "auto",
        },
        {
          id: "SIG-002",
          km: 25,
          aspect: "green",
          nextSignalDistance: 20,
          controlledBy: "auto",
        },
        {
          id: "SIG-003",
          km: 45,
          aspect: "red",
          nextSignalDistance: 30,
          controlledBy: "auto",
        },
        {
          id: "SIG-004",
          km: 75,
          aspect: "green",
          nextSignalDistance: 30,
          controlledBy: "auto",
        },
      ],
    }
  }

  updateLiveData() {
    // Simulate live train movements
    this.diagram.sections.forEach((section) => {
      if (Math.random() > 0.9) {
        if (section.status === "clear" && Math.random() > 0.7) {
          section.status = "occupied"
          section.occupiedBy = `TRAIN-${Math.floor(Math.random() * 9999)}`
        } else if (section.status === "occupied" && Math.random() > 0.8) {
          section.status = "clear"
          section.occupiedBy = undefined
        }
      }
    })

    // Update signal aspects based on track occupancy
    this.diagram.signals.forEach((signal) => {
      const nearbySection = this.diagram.sections.find((s) => s.signalId === signal.id)
      if (nearbySection) {
        if (nearbySection.status === "occupied") {
          signal.aspect = "red"
        } else if (nearbySection.status === "clear") {
          signal.aspect = Math.random() > 0.7 ? "green" : "yellow"
        }
      }
    })

    // Update crossing status
    this.diagram.crossings.forEach((crossing) => {
      if (Math.random() > 0.95) {
        const statuses: Array<"open" | "closed" | "warning"> = ["open", "closed", "warning"]
        crossing.status = statuses[Math.floor(Math.random() * statuses.length)]
        crossing.lastUpdate = new Date()
      }
    })
  }

  autoAllocatePlatforms(trains: any[]) {
    if (!this.automatedScheduling) return

    const availablePlatforms = this.diagram.platforms.filter((p) => p.status === "available")
    const incomingTrains = trains.filter((t) => t.status === "Approaching")

    incomingTrains.forEach((train) => {
      const platform = availablePlatforms.find((p) => !p.assignedTrain)
      if (platform) {
        platform.status = "occupied"
        platform.assignedTrain = train.id
        platform.scheduledArrival = new Date(Date.now() + Math.random() * 3600000).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })
        platform.scheduledDeparture = new Date(Date.now() + Math.random() * 3600000 + 300000).toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",
            minute: "2-digit",
          },
        )
      }
    })
  }

  getDiagram(): TrackDiagram {
    return this.diagram
  }

  getCrossingSafety(): { safe: number; warning: number; critical: number } {
    const crossings = this.diagram.crossings
    return {
      safe: crossings.filter((c) => c.safetyLevel === "high" && c.status !== "warning").length,
      warning: crossings.filter((c) => c.safetyLevel === "medium" || c.status === "warning").length,
      critical: crossings.filter((c) => c.safetyLevel === "low" && c.status === "warning").length,
    }
  }

  getOptimizationMetrics() {
    const totalSections = this.diagram.sections.length
    const occupiedSections = this.diagram.sections.filter((s) => s.status === "occupied").length
    const utilization = (occupiedSections / totalSections) * 100

    const greenSignals = this.diagram.signals.filter((s) => s.aspect === "green").length
    const totalSignals = this.diagram.signals.length
    const signalEfficiency = (greenSignals / totalSignals) * 100

    return {
      trackUtilization: Math.round(utilization),
      signalEfficiency: Math.round(signalEfficiency),
      averageSpeed: Math.round(this.diagram.sections.reduce((sum, s) => sum + s.speedLimit, 0) / totalSections),
      crossingSafety: this.getCrossingSafety(),
    }
  }
}
