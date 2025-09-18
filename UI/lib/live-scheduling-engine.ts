export interface LiveTrain {
  id: string
  name: string
  currentLocation: string
  nextStation: string
  scheduledArrival: string
  actualArrival: string
  delay: number
  speed: number
  priority: "High" | "Medium" | "Low"
  status: "On Time" | "Delayed" | "Approaching" | "Departed"
  platform?: string
  route: string[]
  passengers: number
}

export interface ScheduleUpdate {
  trainId: string
  newArrival: string
  newDeparture: string
  platformChange?: string
  reason: string
  timestamp: Date
}

export class LiveSchedulingEngine {
  private trains: LiveTrain[] = []
  private scheduleUpdates: ScheduleUpdate[] = []
  private updateInterval: NodeJS.Timeout | null = null

  constructor() {
    this.initializeLiveTrains()
    this.startLiveUpdates()
  }

  private initializeLiveTrains() {
    this.trains = [
      {
        id: "12001",
        name: "Shatabdi Express",
        currentLocation: "New Delhi Junction",
        nextStation: "Ghaziabad",
        scheduledArrival: "14:30",
        actualArrival: "14:30",
        delay: 0,
        speed: 85,
        priority: "High",
        status: "On Time",
        platform: "Platform 1",
        route: ["New Delhi", "Ghaziabad", "Meerut", "Muzaffarnagar"],
        passengers: 1200,
      },
      {
        id: "12002",
        name: "Rajdhani Express",
        currentLocation: "Mumbai Central",
        nextStation: "Borivali",
        scheduledArrival: "15:45",
        actualArrival: "16:00",
        delay: 15,
        speed: 72,
        priority: "High",
        status: "Delayed",
        platform: "Platform 3",
        route: ["Mumbai Central", "Borivali", "Virar", "Vapi"],
        passengers: 1450,
      },
      {
        id: "22691",
        name: "Rajdhani Express",
        currentLocation: "Kanpur Central",
        nextStation: "Lucknow",
        scheduledArrival: "16:20",
        actualArrival: "16:28",
        delay: 8,
        speed: 78,
        priority: "High",
        status: "Approaching",
        platform: "Platform 2",
        route: ["Kanpur", "Lucknow", "Gonda", "Gorakhpur"],
        passengers: 1350,
      },
      {
        id: "12345",
        name: "Local Passenger",
        currentLocation: "Ghaziabad Junction",
        nextStation: "Meerut City",
        scheduledArrival: "17:10",
        actualArrival: "17:13",
        delay: 3,
        speed: 45,
        priority: "Medium",
        status: "Delayed",
        platform: "Platform 4",
        route: ["Ghaziabad", "Meerut", "Muzaffarnagar", "Saharanpur"],
        passengers: 800,
      },
      {
        id: "56789",
        name: "Freight Express",
        currentLocation: "Tughlakabad Yard",
        nextStation: "Faridabad",
        scheduledArrival: "18:00",
        actualArrival: "18:00",
        delay: 0,
        speed: 35,
        priority: "Low",
        status: "Departed",
        route: ["Tughlakabad", "Faridabad", "Palwal", "Mathura"],
        passengers: 0,
      },
    ]
  }

  private startLiveUpdates() {
    this.updateInterval = setInterval(() => {
      this.updateTrainPositions()
      this.generateScheduleChanges()
    }, 5000) // Update every 5 seconds
  }

  private updateTrainPositions() {
    this.trains = this.trains.map((train) => {
      // Simulate realistic train movement
      const speedVariation = (Math.random() - 0.5) * 10
      const newSpeed = Math.max(20, Math.min(120, train.speed + speedVariation))

      // Simulate delay changes
      let delayChange = 0
      if (Math.random() > 0.8) {
        delayChange = Math.random() > 0.6 ? 1 : -1
      }

      const newDelay = Math.max(0, train.delay + delayChange)

      // Update arrival time based on delay
      const scheduledTime = new Date(`2024-01-01 ${train.scheduledArrival}`)
      const actualTime = new Date(scheduledTime.getTime() + newDelay * 60000)

      // Update status based on delay and time
      let newStatus: LiveTrain["status"] = "On Time"
      if (newDelay > 0) newStatus = "Delayed"
      if (newDelay === 0 && Math.random() > 0.7) newStatus = "Approaching"
      if (Math.random() > 0.95) newStatus = "Departed"

      return {
        ...train,
        speed: Math.round(newSpeed),
        delay: newDelay,
        actualArrival: actualTime.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: newStatus,
      }
    })
  }

  private generateScheduleChanges() {
    // Randomly generate schedule updates
    if (Math.random() > 0.7) {
      const train = this.trains[Math.floor(Math.random() * this.trains.length)]
      const reasons = [
        "Signal clearance delay",
        "Platform availability",
        "Weather conditions",
        "Track maintenance",
        "Passenger boarding delay",
        "Technical inspection",
      ]

      const newArrival = new Date()
      newArrival.setMinutes(newArrival.getMinutes() + Math.floor(Math.random() * 30))

      const update: ScheduleUpdate = {
        trainId: train.id,
        newArrival: newArrival.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
        newDeparture: new Date(newArrival.getTime() + 5 * 60000).toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        }),
        reason: reasons[Math.floor(Math.random() * reasons.length)],
        timestamp: new Date(),
      }

      this.scheduleUpdates.unshift(update)
      this.scheduleUpdates = this.scheduleUpdates.slice(0, 10) // Keep last 10 updates
    }
  }

  getLiveTrains(): LiveTrain[] {
    return this.trains
  }

  getRecentScheduleUpdates(): ScheduleUpdate[] {
    return this.scheduleUpdates
  }

  getThroughputAnalysis() {
    const totalTrains = this.trains.length
    const onTimeTrains = this.trains.filter((t) => t.delay === 0).length
    const delayedTrains = this.trains.filter((t) => t.delay > 0).length
    const avgDelay = this.trains.reduce((sum, t) => sum + t.delay, 0) / totalTrains
    const avgSpeed = this.trains.reduce((sum, t) => sum + t.speed, 0) / totalTrains
    const totalPassengers = this.trains.reduce((sum, t) => sum + t.passengers, 0)

    return {
      totalTrains,
      onTimeTrains,
      delayedTrains,
      punctuality: Math.round((onTimeTrains / totalTrains) * 100),
      avgDelay: Math.round(avgDelay * 10) / 10,
      avgSpeed: Math.round(avgSpeed),
      totalPassengers,
      throughputEfficiency: Math.round((onTimeTrains / totalTrains) * (avgSpeed / 100) * 100),
      peakHourCapacity: Math.round(totalTrains * 1.5), // Simulated peak capacity
      currentUtilization: Math.round((totalTrains / (totalTrains * 1.5)) * 100),
    }
  }

  cleanup() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
    }
  }
}
