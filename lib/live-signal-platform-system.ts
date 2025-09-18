export interface LiveSignal {
  id: string
  aspect: "green" | "yellow" | "red" | "double-yellow"
  location: string
  trainId?: string
  safetyScore: number
  lastUpdate: Date
}

export interface LivePlatform {
  id: string
  status: "occupied" | "available" | "maintenance"
  trainId?: string
  scheduledDeparture?: string
  passengerCount: number
  capacity: number
}

export interface LiveTrain {
  id: string
  name: string
  currentLocation: string
  nextStation: string
  scheduledArrival: string
  actualArrival: string
  status: "On Time" | "Delayed" | "Approaching" | "Departed" | "Running"
  delay: number
  speed: number
  platform?: string
  passengers: number
  priority: "High" | "Medium" | "Low"
}

export interface ThroughputMetrics {
  trainsPerHour: number
  averageSpeed: number
  platformUtilization: number
  punctuality: number
  totalPassengers: number
  efficiency: number
}

export interface Notification {
  id: string
  type: "alert" | "platform" | "arrival" | "departure" | "emergency"
  title: string
  message: string
  timestamp: Date
  acknowledged: boolean
  priority: "low" | "medium" | "high" | "critical"
  trainId?: string
  platformId?: string
}

export class LiveSystemEngine {
  private signals: LiveSignal[] = []
  private platforms: LivePlatform[] = []
  private trains: LiveTrain[] = []
  private notifications: Notification[] = []
  private updateInterval: NodeJS.Timeout | null = null
  private notificationCallbacks: ((notification: Notification) => void)[] = []

  constructor() {
    this.initializeSystem()
    this.startLiveUpdates()
  }

  private initializeSystem() {
    // Initialize signals
    this.signals = [
      { id: "SIG-001", aspect: "green", location: "Platform 1 Entry", safetyScore: 95, lastUpdate: new Date() },
      {
        id: "SIG-002",
        aspect: "yellow",
        location: "Platform 2 Entry",
        trainId: "12002",
        safetyScore: 88,
        lastUpdate: new Date(),
      },
      {
        id: "SIG-003",
        aspect: "red",
        location: "Junction A",
        trainId: "12004",
        safetyScore: 92,
        lastUpdate: new Date(),
      },
      { id: "SIG-004", aspect: "green", location: "Platform 3 Exit", safetyScore: 97, lastUpdate: new Date() },
      {
        id: "SIG-005",
        aspect: "double-yellow",
        location: "Main Line",
        trainId: "12006",
        safetyScore: 85,
        lastUpdate: new Date(),
      },
    ]

    // Initialize platforms
    this.platforms = [
      {
        id: "1",
        status: "occupied",
        trainId: "12002",
        scheduledDeparture: "14:25",
        passengerCount: 180,
        capacity: 200,
      },
      { id: "2", status: "available", passengerCount: 0, capacity: 200 },
      {
        id: "3",
        status: "occupied",
        trainId: "12004",
        scheduledDeparture: "14:30",
        passengerCount: 165,
        capacity: 180,
      },
      { id: "4", status: "maintenance", passengerCount: 0, capacity: 220 },
      { id: "5", status: "available", passengerCount: 0, capacity: 200 },
    ]

    // Initialize trains
    this.trains = [
      {
        id: "12002",
        name: "New Delhi Shatabdi Express",
        currentLocation: "Platform 1",
        nextStation: "New Delhi",
        scheduledArrival: "14:20",
        actualArrival: "14:22",
        status: "Delayed",
        delay: 2,
        speed: 0,
        platform: "1",
        passengers: 180,
        priority: "High",
      },
      {
        id: "12004",
        name: "Lucknow Swarn Shatabdi",
        currentLocation: "Platform 3",
        nextStation: "Lucknow Junction",
        scheduledArrival: "14:25",
        actualArrival: "14:25",
        status: "On Time",
        delay: 0,
        speed: 0,
        platform: "3",
        passengers: 165,
        priority: "High",
      },
      {
        id: "12006",
        name: "Allahabad Shatabdi Express",
        currentLocation: "Approaching",
        nextStation: "Allahabad Junction",
        scheduledArrival: "14:35",
        actualArrival: "14:33",
        status: "Approaching",
        delay: -2,
        speed: 75,
        passengers: 142,
        priority: "High",
      },
      {
        id: "12008",
        name: "Chandigarh Shatabdi",
        currentLocation: "En Route",
        nextStation: "Chandigarh",
        scheduledArrival: "15:10",
        actualArrival: "15:15",
        status: "Running",
        delay: 5,
        speed: 85,
        passengers: 195,
        priority: "Medium",
      },
    ]
  }

  private startLiveUpdates() {
    this.updateInterval = setInterval(() => {
      this.updateSignals()
      this.updatePlatforms()
      this.updateTrains()
    }, 3000)
  }

  private updateSignals() {
    this.signals.forEach((signal) => {
      // Simulate signal changes
      if (Math.random() < 0.1) {
        const aspects: LiveSignal["aspect"][] = ["green", "yellow", "red", "double-yellow"]
        signal.aspect = aspects[Math.floor(Math.random() * aspects.length)]
        signal.safetyScore = 80 + Math.random() * 20
        signal.lastUpdate = new Date()
      }
    })
  }

  private updatePlatforms() {
    this.platforms.forEach((platform) => {
      const wasOccupied = platform.status === "occupied"

      if (platform.status === "occupied" && Math.random() < 0.08) {
        const departingTrain = this.trains.find((t) => t.id === platform.trainId)
        platform.status = "available"
        platform.trainId = undefined
        platform.scheduledDeparture = undefined
        platform.passengerCount = 0

        if (departingTrain) {
          departingTrain.platform = undefined
          departingTrain.status = "Departed"
          departingTrain.currentLocation = "En Route"
          departingTrain.speed = 60 + Math.random() * 40

          this.createNotification(
            "departure",
            "Train Departed",
            `${departingTrain.name} has departed from Platform ${platform.id}`,
            "medium",
            departingTrain.id,
            platform.id,
          )

          this.createNotification(
            "platform",
            "Platform Available",
            `Platform ${platform.id} is now available for next train`,
            "low",
            undefined,
            platform.id,
          )
        }
      } else if (platform.status === "available" && Math.random() < 0.06) {
        const availableTrains = this.trains.filter(
          (t) => !t.platform && (t.status === "Approaching" || t.status === "Running"),
        )
        if (availableTrains.length > 0) {
          const train = availableTrains[0]
          platform.status = "occupied"
          platform.trainId = train.id
          platform.passengerCount = train.passengers
          platform.scheduledDeparture = this.generateDepartureTime()
          train.platform = platform.id
          train.status = "On Time"
          train.currentLocation = `Platform ${platform.id}`
          train.speed = 0

          this.createNotification(
            "arrival",
            "Train Arrived",
            `${train.name} has arrived at Platform ${platform.id}`,
            "medium",
            train.id,
            platform.id,
          )

          this.createNotification(
            "platform",
            "Platform Occupied",
            `Platform ${platform.id} is now occupied by ${train.name}`,
            "high",
            train.id,
            platform.id,
          )
        }
      }
    })
  }

  private generateDepartureTime(): string {
    const now = new Date()
    const departure = new Date(now.getTime() + (10 + Math.random() * 20) * 60000) // 10-30 minutes
    return departure.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" })
  }

  private updateTrains() {
    this.trains.forEach((train) => {
      const previousStatus = train.status

      // Update train positions and times
      if (train.status === "Approaching" && Math.random() < 0.15) {
        train.status = "Running"
        train.currentLocation = "Station Area"
        train.speed = 25 + Math.random() * 15
      } else if (train.status === "Running" && !train.platform && Math.random() < 0.1) {
        train.currentLocation = "En Route"
        train.speed = 85 + Math.random() * 15
      }

      if (Math.random() < 0.04) {
        const delayIncrease = Math.floor(Math.random() * 4) + 1
        train.delay += delayIncrease

        if (train.delay > 0 && previousStatus !== "Delayed") {
          train.status = "Delayed"

          const priority = train.delay > 10 ? "critical" : train.delay > 5 ? "high" : "medium"
          this.createNotification(
            "alert",
            "Train Delayed",
            `${train.name} is delayed by ${train.delay} minutes`,
            priority,
            train.id,
          )
        }
      }

      if (train.speed > 0 && train.speed < 30 && Math.random() < 0.02) {
        this.createNotification(
          "alert",
          "Speed Alert",
          `${train.name} is running at reduced speed: ${Math.round(train.speed)} km/h`,
          "medium",
          train.id,
        )
      }
    })
  }

  getSignals(): LiveSignal[] {
    return [...this.signals]
  }

  getPlatforms(): LivePlatform[] {
    return [...this.platforms]
  }

  getTrains(): LiveTrain[] {
    return [...this.trains]
  }

  getThroughputMetrics(): ThroughputMetrics {
    const activeTrains = this.trains.filter((t) => t.status !== "Departed")
    const onTimeTrains = activeTrains.filter((t) => t.delay <= 0)
    const occupiedPlatforms = this.platforms.filter((p) => p.status === "occupied")

    return {
      trainsPerHour: activeTrains.length * 12, // Simulate hourly rate
      averageSpeed: activeTrains.reduce((sum, t) => sum + t.speed, 0) / activeTrains.length || 0,
      platformUtilization: (occupiedPlatforms.length / this.platforms.length) * 100,
      punctuality: (onTimeTrains.length / activeTrains.length) * 100 || 100,
      totalPassengers: activeTrains.reduce((sum, t) => sum + t.passengers, 0),
      efficiency: Math.min(95, 70 + Math.random() * 25),
    }
  }

  cleanup() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
    }
  }

  onNotification(callback: (notification: Notification) => void) {
    this.notificationCallbacks.push(callback)
  }

  private createNotification(
    type: Notification["type"],
    title: string,
    message: string,
    priority: Notification["priority"],
    trainId?: string,
    platformId?: string,
  ) {
    const notification: Notification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      title,
      message,
      timestamp: new Date(),
      acknowledged: false,
      priority,
      trainId,
      platformId,
    }

    this.notifications.push(notification)
    this.notificationCallbacks.forEach((callback) => callback(notification))

    // Auto-acknowledge low priority notifications after 30 seconds
    if (priority === "low") {
      setTimeout(() => {
        this.acknowledgeNotification(notification.id)
      }, 30000)
    }
  }

  acknowledgeNotification(id: string) {
    const notification = this.notifications.find((n) => n.id === id)
    if (notification) {
      notification.acknowledged = true
      console.log(`[v0] Notification acknowledged: ${notification.title} - Alert sent to Station Master`)
    }
  }

  getNotifications(): Notification[] {
    return [...this.notifications]
  }
}
