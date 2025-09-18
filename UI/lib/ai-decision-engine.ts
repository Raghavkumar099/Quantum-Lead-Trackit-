export interface WeatherData {
  condition: string
  temperature: number
  visibility: number
  windSpeed: number
  impact: "low" | "medium" | "high"
}

export interface SignalData {
  signalId: string
  status: "green" | "yellow" | "red"
  nextClearTime?: number
  blockSection: string
}

export interface PlatformData {
  platformId: string
  occupancy: number
  maxCapacity: number
  estimatedClearTime: number
}

export interface TrackData {
  trackId: string
  condition: "good" | "maintenance" | "blocked"
  speed: number
  maxSpeed: number
}

export interface AIDecision {
  id: string
  type: "routing" | "priority" | "delay_management" | "platform_assignment"
  title: string
  description: string
  confidence: number
  impact: "low" | "medium" | "high"
  estimatedSaving: string
  affectedTrains: string[]
  reasoning: string[]
  action: string
  urgency: "low" | "medium" | "high" | "critical"
}

export class AIDecisionEngine {
  private weatherData: WeatherData = {
    condition: "Clear",
    temperature: 28,
    visibility: 10,
    windSpeed: 12,
    impact: "low",
  }

  private signals: SignalData[] = [
    { signalId: "SIG-001", status: "green", blockSection: "NDL-GZB" },
    { signalId: "SIG-002", status: "yellow", nextClearTime: 3, blockSection: "GZB-MUT" },
    { signalId: "SIG-003", status: "red", nextClearTime: 8, blockSection: "MUT-SRE" },
  ]

  private platforms: PlatformData[] = [
    { platformId: "PF-1", occupancy: 85, maxCapacity: 100, estimatedClearTime: 5 },
    { platformId: "PF-2", occupancy: 45, maxCapacity: 100, estimatedClearTime: 2 },
    { platformId: "PF-3", occupancy: 95, maxCapacity: 100, estimatedClearTime: 12 },
  ]

  private tracks: TrackData[] = [
    { trackId: "TRK-1", condition: "good", speed: 110, maxSpeed: 130 },
    { trackId: "TRK-2", condition: "maintenance", speed: 45, maxSpeed: 130 },
    { trackId: "TRK-3", condition: "good", speed: 125, maxSpeed: 130 },
  ]

  generateDecisions(trains: any[]): AIDecision[] {
    const decisions: AIDecision[] = []

    // Analyze weather impact
    if (this.weatherData.impact === "high") {
      decisions.push({
        id: "weather-001",
        type: "delay_management",
        title: "Weather Speed Restriction",
        description: "Reduce speed limits due to adverse weather conditions",
        confidence: 92,
        impact: "high",
        estimatedSaving: "15-20 min delay prevention",
        affectedTrains: trains.filter((t) => t.priority === "High").map((t) => t.id),
        reasoning: [
          `${this.weatherData.condition} weather with ${this.weatherData.visibility}km visibility`,
          "High wind speed affecting train stability",
          "Preventive speed reduction recommended",
        ],
        action: "Implement 80 km/h speed restriction",
        urgency: "high",
      })
    }

    // Analyze signal conflicts
    const redSignals = this.signals.filter((s) => s.status === "red")
    if (redSignals.length > 0) {
      decisions.push({
        id: "signal-001",
        type: "routing",
        title: "Alternative Route Recommendation",
        description: "Reroute trains to avoid signal conflicts",
        confidence: 88,
        impact: "medium",
        estimatedSaving: "8-12 min delay reduction",
        affectedTrains: trains.filter((t) => t.delay > 5).map((t) => t.id),
        reasoning: [
          `${redSignals.length} signals showing red status`,
          "Alternative routes available with better clearance",
          "Optimal throughput maintenance possible",
        ],
        action: "Reroute via alternate track sections",
        urgency: "medium",
      })
    }

    // Analyze platform congestion
    const congestedPlatforms = this.platforms.filter((p) => p.occupancy > 80)
    if (congestedPlatforms.length > 0) {
      decisions.push({
        id: "platform-001",
        type: "platform_assignment",
        title: "Platform Optimization",
        description: "Reassign trains to less congested platforms",
        confidence: 85,
        impact: "medium",
        estimatedSaving: "5-8 min turnaround time",
        affectedTrains: trains.filter((t) => t.status === "Delayed").map((t) => t.id),
        reasoning: [
          `${congestedPlatforms.length} platforms over 80% capacity`,
          "Alternative platforms available",
          "Reduced dwell time achievable",
        ],
        action: "Reassign to platforms 2 and 4",
        urgency: "medium",
      })
    }

    // Analyze train priorities and delays
    const highPriorityDelayed = trains.filter((t) => t.priority === "High" && t.delay > 0)
    if (highPriorityDelayed.length > 0) {
      decisions.push({
        id: "priority-001",
        type: "priority",
        title: "Priority Train Acceleration",
        description: "Give precedence to delayed high-priority trains",
        confidence: 94,
        impact: "high",
        estimatedSaving: "10-15 min recovery time",
        affectedTrains: highPriorityDelayed.map((t) => t.id),
        reasoning: [
          `${highPriorityDelayed.length} high-priority trains delayed`,
          "Clear path available for priority routing",
          "Minimal impact on other services",
        ],
        action: "Grant priority signals and clear paths",
        urgency: "high",
      })
    }

    // Analyze track conditions
    const maintenanceTracks = this.tracks.filter((t) => t.condition === "maintenance")
    if (maintenanceTracks.length > 0) {
      decisions.push({
        id: "track-001",
        type: "routing",
        title: "Track Maintenance Routing",
        description: "Optimize routing around maintenance sections",
        confidence: 90,
        impact: "medium",
        estimatedSaving: "6-10 min delay prevention",
        affectedTrains: trains.map((t) => t.id),
        reasoning: [
          `${maintenanceTracks.length} tracks under maintenance`,
          "Speed restrictions in effect",
          "Alternative routing available",
        ],
        action: "Use parallel tracks with speed optimization",
        urgency: "medium",
      })
    }

    return decisions.slice(0, 4) // Return top 4 decisions
  }

  updateWeatherData(weather: Partial<WeatherData>) {
    this.weatherData = { ...this.weatherData, ...weather }
  }

  updateSignalData(signals: SignalData[]) {
    this.signals = signals
  }

  updatePlatformData(platforms: PlatformData[]) {
    this.platforms = platforms
  }

  updateTrackData(tracks: TrackData[]) {
    this.tracks = tracks
  }

  getCurrentSystemStatus() {
    return {
      weather: this.weatherData,
      signals: this.signals,
      platforms: this.platforms,
      tracks: this.tracks,
      overallHealth: this.calculateSystemHealth(),
    }
  }

  private calculateSystemHealth(): number {
    const weatherScore = this.weatherData.impact === "low" ? 100 : this.weatherData.impact === "medium" ? 70 : 40
    const signalScore = (this.signals.filter((s) => s.status === "green").length / this.signals.length) * 100
    const platformScore = (this.platforms.filter((p) => p.occupancy < 80).length / this.platforms.length) * 100
    const trackScore = (this.tracks.filter((t) => t.condition === "good").length / this.tracks.length) * 100

    return Math.round((weatherScore + signalScore + platformScore + trackScore) / 4)
  }
}
