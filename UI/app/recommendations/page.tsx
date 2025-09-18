"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, CheckCircle, Edit, X, Clock, TrendingUp, Train } from "lucide-react"

const mockRecommendations = [
  {
    id: 1,
    title: "Reroute Rajdhani Express 12002",
    description: "Switch from Track 3 to Track 1 to avoid congestion at Mumbai Central junction",
    trainsInvolved: ["12002", "12345"],
    confidence: 94,
    priority: "High",
    impact: "Reduces delay by 12 minutes, improves overall punctuality by 8%",
    estimatedSavings: "₹2.4L in operational costs",
    type: "Route Optimization",
    timeToImplement: "3 minutes",
  },
  {
    id: 2,
    title: "Adjust Local Train Schedule",
    description: "Delay Local Passenger 12345 by 4 minutes to create optimal platform spacing",
    trainsInvolved: ["12345", "56789"],
    confidence: 87,
    priority: "Medium",
    impact: "Improves platform utilization by 15%, reduces passenger waiting time",
    estimatedSavings: "₹85K in efficiency gains",
    type: "Schedule Adjustment",
    timeToImplement: "1 minute",
  },
  {
    id: 3,
    title: "Priority Lane for Freight",
    description: "Clear Track 4 for incoming Freight Special 56789 to maintain cargo schedule",
    trainsInvolved: ["56789", "11111"],
    confidence: 91,
    priority: "Medium",
    impact: "Maintains freight schedule, prevents cargo delays",
    estimatedSavings: "₹1.2L in penalty avoidance",
    type: "Priority Management",
    timeToImplement: "5 minutes",
  },
  {
    id: 4,
    title: "Express Train Precedence",
    description: "Give Shatabdi Express 12001 priority over maintenance work on Track 7",
    trainsInvolved: ["12001", "11111"],
    confidence: 96,
    priority: "High",
    impact: "Ensures premium service punctuality, maintains customer satisfaction",
    estimatedSavings: "₹3.1L in service credits avoided",
    type: "Priority Management",
    timeToImplement: "2 minutes",
  },
  {
    id: 5,
    title: "Weather Contingency Plan",
    description: "Preemptively slow down trains in fog-affected zones to prevent signal overruns",
    trainsInvolved: ["22691", "12002"],
    confidence: 89,
    priority: "High",
    impact: "Prevents safety incidents, maintains schedule integrity",
    estimatedSavings: "Safety compliance",
    type: "Safety Optimization",
    timeToImplement: "Immediate",
  },
]

export default function AIRecommendationsPage() {
  const [acceptedRecommendations, setAcceptedRecommendations] = useState<number[]>([])
  const [rejectedRecommendations, setRejectedRecommendations] = useState<number[]>([])

  const handleAccept = (id: number) => {
    setAcceptedRecommendations([...acceptedRecommendations, id])
  }

  const handleReject = (id: number) => {
    setRejectedRecommendations([...rejectedRecommendations, id])
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Route Optimization":
        return "bg-blue-100 text-blue-800"
      case "Schedule Adjustment":
        return "bg-purple-100 text-purple-800"
      case "Priority Management":
        return "bg-orange-100 text-orange-800"
      case "Safety Optimization":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600"
    if (confidence >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            AI Recommendations
          </h1>
          <p className="text-gray-600 mt-1">AI-powered suggestions for optimal train traffic management</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">{mockRecommendations.length}</span> active recommendations
          </div>
          <Badge variant="outline" className="bg-green-50 text-green-700">
            <TrendingUp className="h-3 w-3 mr-1" />
            System Learning
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{mockRecommendations.length}</p>
              <p className="text-sm text-gray-600">Total Recommendations</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">
                {mockRecommendations.filter((r) => r.priority === "High").length}
              </p>
              <p className="text-sm text-gray-600">High Priority</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{acceptedRecommendations.length}</p>
              <p className="text-sm text-gray-600">Accepted Today</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">₹8.7L</p>
              <p className="text-sm text-gray-600">Potential Savings</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockRecommendations.map((recommendation) => {
          const isAccepted = acceptedRecommendations.includes(recommendation.id)
          const isRejected = rejectedRecommendations.includes(recommendation.id)

          return (
            <Card
              key={recommendation.id}
              className={`${
                isAccepted
                  ? "border-green-200 bg-green-50"
                  : isRejected
                    ? "border-red-200 bg-red-50"
                    : "border-gray-200"
              } transition-all duration-200`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold">{recommendation.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getPriorityColor(recommendation.priority)}>{recommendation.priority}</Badge>
                      <Badge className={getTypeColor(recommendation.type)}>{recommendation.type}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getConfidenceColor(recommendation.confidence)}`}>
                      {recommendation.confidence}%
                    </div>
                    <div className="text-xs text-gray-500">Confidence</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700">{recommendation.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-600">Trains Involved:</p>
                    <div className="flex gap-1 mt-1">
                      {recommendation.trainsInvolved.map((trainId) => (
                        <Badge key={trainId} variant="outline" className="text-xs">
                          <Train className="h-3 w-3 mr-1" />
                          {trainId}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Implementation Time:</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-sm">{recommendation.timeToImplement}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="font-medium text-gray-700 mb-1">Expected Impact:</p>
                  <p className="text-sm text-gray-600">{recommendation.impact}</p>
                  <p className="text-sm font-medium text-green-600 mt-1">{recommendation.estimatedSavings}</p>
                </div>

                {!isAccepted && !isRejected && (
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handleAccept(recommendation.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      size="sm"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Accept
                    </Button>
                    <Button onClick={() => {}} variant="outline" className="flex-1" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Modify
                    </Button>
                    <Button
                      onClick={() => handleReject(recommendation.id)}
                      variant="outline"
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                      size="sm"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}

                {isAccepted && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-100 p-2 rounded-md">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Recommendation Accepted & Implemented</span>
                  </div>
                )}

                {isRejected && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-100 p-2 rounded-md">
                    <X className="h-4 w-4" />
                    <span className="text-sm font-medium">Recommendation Rejected</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
