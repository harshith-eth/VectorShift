import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "./components/ui/card"
import { Button } from "./components/ui/button"

function PipelineAnalysisCard({ numNodes, numEdges, isDag, onClose }) {
  return (
    <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
      <Card className="w-[300px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Pipeline Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Nodes:</span>
            <span className="text-sm">{numNodes}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Edges:</span>
            <span className="text-sm">{numEdges}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Is Directed Acyclic Graph :</span>
            <span className="text-sm">{isDag ? 'Yes' : 'No'}</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={onClose}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Close
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PipelineAnalysisCard