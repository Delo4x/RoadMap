import { useState, useEffect } from 'react'
import { Plus, Trash2, Target } from 'lucide-react'
import type { RoadmapStep } from '../types'

interface Step3RoadmapProps {
  roadmap: RoadmapStep[]
  onUpdate: (roadmap: RoadmapStep[]) => void
  onNext: () => void
  onBack: () => void
}

export default function Step3Roadmap({ roadmap, onUpdate, onNext, onBack }: Step3RoadmapProps) {
  const [steps, setSteps] = useState<RoadmapStep[]>(roadmap.length > 0 ? roadmap : [
    { id: '1', title: 'Market Bias', description: 'Determine overall market direction', importance: 5 },
    { id: '2', title: 'Key Levels', description: 'Identify support and resistance zones', importance: 4 },
    { id: '3', title: 'Setup', description: 'Look for your setup patterns', importance: 3 },
  ])

  useEffect(() => {
    // Ensure entry step exists
    const hasEntry = steps.some(s => s.isEntry)
    if (!hasEntry) {
      setSteps([...steps, {
        id: String(steps.length + 1),
        title: 'Entry Execution',
        description: 'Execute trade with predefined parameters',
        importance: 5,
        isEntry: true,
      }])
    }
  }, [])

  useEffect(() => {
    onUpdate(steps)
  }, [steps, onUpdate])

  const updateStep = (id: string, updates: Partial<RoadmapStep>) => {
    setSteps(steps.map(s => s.id === id ? { ...s, ...updates } : s))
  }

  const deleteStep = (id: string) => {
    if (steps.length <= 1) return
    const step = steps.find(s => s.id === id)
    if (step?.isEntry) return // Don't delete entry step
    setSteps(steps.filter(s => s.id !== id).map((s, idx) => ({ ...s, id: String(idx + 1) })))
  }

  const addStep = () => {
    const newStep: RoadmapStep = {
      id: String(steps.length + 1),
      title: 'New Step',
      description: 'Describe this step',
      importance: 3,
    }
    // Insert before entry step
    const entryIndex = steps.findIndex(s => s.isEntry)
    if (entryIndex >= 0) {
      const newSteps = [...steps]
      newSteps.splice(entryIndex, 0, newStep)
      setSteps(newSteps.map((s, idx) => ({ ...s, id: String(idx + 1) })))
    } else {
      setSteps([...steps, newStep])
    }
  }

  const getImportanceLabel = (importance: number) => {
    if (importance >= 5) return 'Critical'
    if (importance === 4) return 'High'
    if (importance === 3) return 'Medium'
    if (importance === 2) return 'Low'
    return 'Optional'
  }

  const getImportanceColor = (importance: number) => {
    if (importance >= 5) return 'bg-green-500'
    if (importance === 4) return 'bg-green-400'
    if (importance === 3) return 'bg-orange-500'
    if (importance === 2) return 'bg-yellow-500'
    return 'bg-gray-500'
  }

  const entryStep = steps.find(s => s.isEntry)
  const regularSteps = steps.filter(s => !s.isEntry)

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
          Build Your Trading Roadmap
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Define each step of your strategy. The last step should be your entry criteria.
        </p>
      </div>

      <div className="bg-dark-800 rounded-2xl border border-teal-500/30 p-8 shadow-2xl space-y-6">
        {regularSteps.map((step, index) => (
          <StepCard
            key={step.id}
            step={step}
            stepNumber={index + 1}
            onUpdate={(updates) => updateStep(step.id, updates)}
            onDelete={() => deleteStep(step.id)}
            getImportanceLabel={getImportanceLabel}
            getImportanceColor={getImportanceColor}
          />
        ))}

        <button
          onClick={addStep}
          className="w-full p-4 bg-dark-700 border border-dashed border-gray-600 rounded-xl text-gray-400 hover:border-teal-500 hover:text-teal-400 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Step Before Entry
        </button>

        {entryStep && (
          <div className="relative">
            <div className="absolute inset-0 bg-teal-500/20 rounded-xl blur-xl"></div>
            <StepCard
              step={entryStep}
              stepNumber={steps.length}
              onUpdate={(updates) => updateStep(entryStep.id, updates)}
              onDelete={() => {}} // Entry step cannot be deleted
              getImportanceLabel={getImportanceLabel}
              getImportanceColor={getImportanceColor}
              isEntry
            />
          </div>
        )}

        <div className="flex items-center justify-between pt-6 border-t border-gray-700">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-dark-700 border border-gray-600 rounded-xl text-white font-semibold hover:bg-dark-600 transition-all"
          >
            ← Back
          </button>
          
          <button
            onClick={onNext}
            disabled={steps.length < 2}
            className="px-8 py-4 bg-teal-500 hover:bg-teal-600 rounded-xl text-white font-semibold transition-all flex items-center gap-2 shadow-lg shadow-teal-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Complete Roadmap
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

interface StepCardProps {
  step: RoadmapStep
  stepNumber: number
  onUpdate: (updates: Partial<RoadmapStep>) => void
  onDelete: () => void
  getImportanceLabel: (importance: number) => string
  getImportanceColor: (importance: number) => string
  isEntry?: boolean
}

function StepCard({ step, stepNumber, onUpdate, onDelete, getImportanceLabel, getImportanceColor, isEntry }: StepCardProps) {
  return (
    <div className={`p-6 rounded-xl border-2 ${isEntry ? 'border-teal-500 bg-dark-700/50' : 'border-gray-600 bg-dark-700'} transition-all`}>
      <div className="flex items-start gap-4 mb-4">
        {isEntry ? (
          <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
            <Target className="w-6 h-6 text-dark-900" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">{stepNumber}</span>
          </div>
        )}
        
        <div className="flex-1 space-y-3">
          <input
            type="text"
            value={step.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="w-full bg-transparent border-none text-white text-xl font-bold focus:outline-none focus:ring-0"
            placeholder="Step title"
          />
          
          <textarea
            value={step.description}
            onChange={(e) => onUpdate({ description: e.target.value })}
            className="w-full bg-dark-800 border border-gray-600 rounded-lg p-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-teal-500 resize-none"
            placeholder="Describe this step"
            rows={2}
          />
          
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">IMPORTANCE:</span>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => onUpdate({ importance: level })}
                  className={`w-8 h-8 rounded-lg font-semibold text-xs transition-all ${
                    step.importance >= level
                      ? `${getImportanceColor(step.importance)} text-white`
                      : 'bg-gray-700 text-gray-500 hover:bg-gray-600'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <span className="text-gray-400 text-sm ml-2">
              {getImportanceLabel(step.importance)}
            </span>
          </div>
        </div>
        
        {!isEntry && (
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  )
}