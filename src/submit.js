import React, { useState } from 'react'
import { Button } from "./components/ui/button"
import { Rocket } from "lucide-react"
import { useStore } from './store'
import PipelineAnalysisCard from './PipelineAnalysisCard'

export default function SubmitButton() {
  const { nodes, edges } = useStore()
  const [analysisResult, setAnalysisResult] = useState(null)

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      setAnalysisResult(data)
    } catch (error) {
      console.error('Error:', error)
      setAnalysisResult({ error: 'Failed to analyze pipeline. Please try again.' })
    }
  }

  const handleCloseAnalysis = () => {
    setAnalysisResult(null)
  }

  return (
    <>
      <Button 
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white dark:text-white h-8 px-3 text-sm transition-colors duration-200"
      >
        <Rocket className="mr-2 h-3 w-3" />
        Submit Pipeline
      </Button>
      {analysisResult && !analysisResult.error && (
        <PipelineAnalysisCard
          numNodes={analysisResult.num_nodes}
          numEdges={analysisResult.num_edges}
          isDag={analysisResult.is_dag}
          onClose={handleCloseAnalysis}
        />
      )}
      {analysisResult && analysisResult.error && (
        <div className="fixed top-20 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {analysisResult.error}
        </div>
      )}
    </>
  )
}
