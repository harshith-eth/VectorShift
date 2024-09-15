import React, { useState } from 'react'
import { Button } from "./components/ui/button"
import { Rocket } from "lucide-react"
import { useStore } from './store'
import PipelineAnalysisCard from './PipelineAnalysisCard'

export default function SubmitButton() {
  const { nodes, edges } = useStore()
  const [analysisResult, setAnalysisResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)
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
      setError('Failed to analyze pipeline. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseAnalysis = () => {
    setAnalysisResult(null)
  }

  return (
    <>
      <Button 
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white dark:text-white h-9 px-4 py-2 text-sm transition-colors duration-200 flex items-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </>
        ) : (
          <>
            <Rocket className="mr-2 h-4 w-4" />
            Submit Pipeline
          </>
        )}
      </Button>
      {analysisResult && !error && (
        <PipelineAnalysisCard
          numNodes={analysisResult.num_nodes}
          numEdges={analysisResult.num_edges}
          isDag={analysisResult.is_dag}
          onClose={handleCloseAnalysis}
        />
      )}
      {error && (
        <div className="fixed top-20 right-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </>
  )
}
