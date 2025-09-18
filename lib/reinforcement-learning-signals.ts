// Reinforcement Learning Engine for Live Signal Allocation
export interface SignalState {
  id: string
  aspect: "green" | "yellow" | "red" | "double-yellow"
  trainId?: string
  position: number
  safetyScore: number
  throughputImpact: number
  lastUpdate: Date
}

export interface RLAction {
  signalId: string
  newAspect: "green" | "yellow" | "red" | "double-yellow"
  confidence: number
  expectedReward: number
  reasoning: string
}

export interface RLMetrics {
  totalReward: number
  averageDelay: number
  safetyViolations: number
  throughputOptimization: number
  learningProgress: number
}

export class ReinforcementLearningSignalEngine {
  private signals: Map<string, SignalState> = new Map()
  private qTable: Map<string, Map<string, number>> = new Map()
  private learningRate = 0.1
  private discountFactor = 0.9
  private explorationRate = 0.1
  private totalReward = 0
  private episodeCount = 0

  constructor() {
    this.initializeSignals()
    this.initializeQTable()
  }

  private initializeSignals() {
    const signalPositions = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500]

    signalPositions.forEach((position, index) => {
      this.signals.set(`SIG-${index + 1}`, {
        id: `SIG-${index + 1}`,
        aspect: "green",
        position,
        safetyScore: 100,
        throughputImpact: 0,
        lastUpdate: new Date(),
      })
    })
  }

  private initializeQTable() {
    const states = ["clear", "approaching", "occupied", "conflict"]
    const actions = ["green", "yellow", "red", "double-yellow"]

    states.forEach((state) => {
      const actionValues = new Map<string, number>()
      actions.forEach((action) => {
        actionValues.set(action, Math.random() * 0.1) // Small random initialization
      })
      this.qTable.set(state, actionValues)
    })
  }

  private getState(signalId: string, trains: any[]): string {
    const signal = this.signals.get(signalId)
    if (!signal) return "clear"

    const nearbyTrains = trains.filter((train) => {
      const distance = Math.abs(train.position - signal.position)
      return distance < 1000 // Within 1km
    })

    if (nearbyTrains.length === 0) return "clear"
    if (nearbyTrains.some((train) => Math.abs(train.position - signal.position) < 100)) return "occupied"
    if (nearbyTrains.some((train) => train.position < signal.position && train.position > signal.position - 500))
      return "approaching"
    if (nearbyTrains.length > 1) return "conflict"

    return "clear"
  }

  private calculateReward(action: string, state: string, safetyScore: number, throughputImpact: number): number {
    let reward = 0

    // Safety reward (highest priority)
    if (safetyScore > 90) reward += 10
    else if (safetyScore > 70) reward += 5
    else reward -= 20

    // Throughput reward
    reward += throughputImpact * 2

    // Action-specific rewards
    switch (action) {
      case "green":
        if (state === "clear") reward += 5
        if (state === "occupied") reward -= 15
        break
      case "red":
        if (state === "occupied" || state === "conflict") reward += 8
        if (state === "clear") reward -= 3
        break
      case "yellow":
        if (state === "approaching") reward += 6
        break
      case "double-yellow":
        if (state === "approaching" && throughputImpact > 0) reward += 4
        break
    }

    return reward
  }

  private selectAction(state: string): string {
    const actionValues = this.qTable.get(state)
    if (!actionValues) return "red" // Safe default

    // Epsilon-greedy exploration
    if (Math.random() < this.explorationRate) {
      const actions = Array.from(actionValues.keys())
      return actions[Math.floor(Math.random() * actions.length)]
    }

    // Exploit: choose best action
    let bestAction = "red"
    let bestValue = Number.NEGATIVE_INFINITY

    actionValues.forEach((value, action) => {
      if (value > bestValue) {
        bestValue = value
        bestAction = action
      }
    })

    return bestAction
  }

  private updateQValue(state: string, action: string, reward: number, nextState: string) {
    const currentQ = this.qTable.get(state)?.get(action) || 0
    const nextStateValues = this.qTable.get(nextState)
    const maxNextQ = nextStateValues ? Math.max(...Array.from(nextStateValues.values())) : 0

    const newQ = currentQ + this.learningRate * (reward + this.discountFactor * maxNextQ - currentQ)

    if (!this.qTable.has(state)) {
      this.qTable.set(state, new Map())
    }
    this.qTable.get(state)!.set(action, newQ)
  }

  public processLiveData(trains: any[]): RLAction[] {
    const actions: RLAction[] = []

    this.signals.forEach((signal, signalId) => {
      const currentState = this.getState(signalId, trains)
      const selectedAction = this.selectAction(currentState)

      // Calculate safety and throughput metrics
      const safetyScore = this.calculateSafetyScore(signalId, trains, selectedAction)
      const throughputImpact = this.calculateThroughputImpact(signalId, trains, selectedAction)

      // Calculate reward and update Q-table
      const reward = this.calculateReward(selectedAction, currentState, safetyScore, throughputImpact)
      const nextState = this.getState(signalId, trains) // Simulate next state

      this.updateQValue(currentState, selectedAction, reward, nextState)
      this.totalReward += reward

      // Update signal state
      signal.aspect = selectedAction as any
      signal.safetyScore = safetyScore
      signal.throughputImpact = throughputImpact
      signal.lastUpdate = new Date()

      // Generate action with confidence
      const confidence = this.calculateConfidence(currentState, selectedAction)

      actions.push({
        signalId,
        newAspect: selectedAction as any,
        confidence,
        expectedReward: reward,
        reasoning: this.generateReasoning(currentState, selectedAction, safetyScore, throughputImpact),
      })
    })

    this.episodeCount++

    // Decay exploration rate over time
    this.explorationRate = Math.max(0.01, this.explorationRate * 0.995)

    return actions
  }

  private calculateSafetyScore(signalId: string, trains: any[], action: string): number {
    const signal = this.signals.get(signalId)
    if (!signal) return 0

    let score = 100

    trains.forEach((train) => {
      const distance = Math.abs(train.position - signal.position)

      if (distance < 100 && action === "green") score -= 30 // Dangerous
      if (distance < 300 && action === "red") score += 10 // Safe
      if (distance < 500 && action === "yellow") score += 5 // Cautious

      // Speed considerations
      if (train.speed > 80 && distance < 500 && action !== "red") score -= 15
      if (train.speed < 40 && action === "green") score += 5
    })

    return Math.max(0, Math.min(100, score))
  }

  private calculateThroughputImpact(signalId: string, trains: any[], action: string): number {
    let impact = 0

    if (action === "green") impact += 3
    if (action === "yellow") impact += 1
    if (action === "red") impact -= 2
    if (action === "double-yellow") impact += 2

    return impact
  }

  private calculateConfidence(state: string, action: string): number {
    const actionValues = this.qTable.get(state)
    if (!actionValues) return 0.5

    const actionValue = actionValues.get(action) || 0
    const maxValue = Math.max(...Array.from(actionValues.values()))
    const minValue = Math.min(...Array.from(actionValues.values()))

    if (maxValue === minValue) return 0.5

    return Math.min(0.95, Math.max(0.1, (actionValue - minValue) / (maxValue - minValue)))
  }

  private generateReasoning(state: string, action: string, safetyScore: number, throughputImpact: number): string {
    const reasons = []

    if (safetyScore > 90) reasons.push("High safety conditions")
    else if (safetyScore < 70) reasons.push("Safety concerns detected")

    if (throughputImpact > 2) reasons.push("Optimizing traffic flow")
    else if (throughputImpact < 0) reasons.push("Prioritizing safety over speed")

    switch (action) {
      case "green":
        reasons.push("Clear path ahead")
        break
      case "yellow":
        reasons.push("Train approaching, prepare to stop")
        break
      case "red":
        reasons.push("Stop required for safety")
        break
      case "double-yellow":
        reasons.push("Caution, reduced speed ahead")
        break
    }

    return reasons.join(", ")
  }

  public getSignals(): SignalState[] {
    return Array.from(this.signals.values())
  }

  public getMetrics(): RLMetrics {
    const signals = Array.from(this.signals.values())

    return {
      totalReward: this.totalReward,
      averageDelay: Math.max(0, 5 - (this.totalReward / Math.max(1, this.episodeCount)) * 0.1),
      safetyViolations: signals.filter((s) => s.safetyScore < 70).length,
      throughputOptimization: signals.reduce((sum, s) => sum + s.throughputImpact, 0),
      learningProgress: Math.min(100, (this.episodeCount / 1000) * 100),
    }
  }

  public cleanup() {
    // Cleanup method for component unmounting
  }
}
