import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, RotateCcw, Target, TrendingUp } from 'lucide-react'
import type { RoadmapStep, TradingStyle } from '../types'

interface Step4ChecklistProps {
  roadmap: RoadmapStep[]
  tradingStyle: TradingStyle | null
  strategyName?: string
  onBack: () => void
  onSave?: () => void
}

interface ChecklistItem extends RoadmapStep {
  checked: boolean
}

export default function Step4Checklist({ roadmap, tradingStyle, strategyName, onBack, onSave }: Step4ChecklistProps) {
  const navigate = useNavigate()
  const [items, setItems] = useState<ChecklistItem[]>(
    roadmap.map(step => ({ ...step, checked: false }))
  )

  const score = useMemo(() => {
    const totalWeight = items.reduce((sum, item) => sum + item.importance, 0)
    const checkedWeight = items
      .filter(item => item.checked)
      .reduce((sum, item) => sum + item.importance, 0)
    
    if (totalWeight === 0) return 0
    return Math.round((checkedWeight / totalWeight) * 100)
  }, [items])

  const confirmedSteps = items.filter(item => item.checked).length
  const totalSteps = items.length

  const toggleCheck = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ))
  }

  const resetChecks = () => {
    setItems(items.map(item => ({ ...item, checked: false })))
  }

  const getScoreColor = () => {
    if (score >= 80) return 'from-green-500 to-emerald-500'
    if (score >= 60) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-rose-500'
  }

  const getScoreMessage = () => {
    if (score >= 85) return { text: 'EXCELLENT SETUP', desc: 'All criteria met. Proceed with confidence.' }
    if (score >= 70) return { text: 'GOOD SETUP', desc: 'Most criteria met. Proceed with standard risk.' }
    if (score >= 50) return { text: 'CAUTIOUS SETUP', desc: 'Some criteria missing. Consider reducing position size.' }
    return { text: 'POOR SETUP', desc: 'Critical criteria missing. Wait for better setup.' }
  }

  const message = getScoreMessage()
  const entryReady = score >= 70

  const regularSteps = items.filter(item => !item.isEntry)
  const entryStep = items.find(item => item.isEntry)

  const getTradingStyleName = () => {
    if (!tradingStyle) return 'Not Set'
    return tradingStyle.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Strategy Card */}
        <div className="lg:col-span-3 bg-dark-800 rounded-2xl border border-teal-500/30 p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-teal-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-dark-900" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{strategyName || 'Untitled Strategy'}</h2>
                <p className="text-gray-400">{getTradingStyleName()}</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/builder')}
              className="px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-white hover:bg-dark-600 transition-all"
            >
              New Strategy
            </button>
          </div>
        </div>

        {/* Pre-Entry Checklist */}
        <div className="lg:col-span-2 bg-dark-800 rounded-2xl border border-teal-500/30 p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white">Pre-Entry Checklist</h2>
            <button
              onClick={resetChecks}
              className="flex items-center gap-2 px-4 py-2 bg-dark-700 border border-gray-600 rounded-lg text-gray-300 hover:bg-dark-600 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          <div className="space-y-4">
            {regularSteps.map((item, index) => (
              <ChecklistItemCard
                key={item.id}
                item={item}
                stepNumber={index + 1}
                onToggle={() => toggleCheck(item.id)}
              />
            ))}
            
            {entryStep && (
              <ChecklistItemCard
                item={entryStep}
                stepNumber={totalSteps}
                onToggle={() => toggleCheck(entryStep.id)}
                isEntry
              />
            )}
          </div>
        </div>

        {/* Score & Stats */}
        <div className="space-y-6">
          {/* Score Circle */}
          <div className="bg-dark-800 rounded-2xl border border-teal-500/30 p-8 shadow-2xl text-center">
            <div className={`relative w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br ${getScoreColor()} flex items-center justify-center shadow-2xl`}>
              <div className="absolute inset-0 rounded-full bg-dark-900/20 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white">{score}%</div>
                  <div className="text-xs text-white/80 uppercase tracking-wider">SCORE</div>
                </div>
              </div>
            </div>
            
            {entryReady && (
              <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                <Check className="w-5 h-5" />
                <span className="font-semibold">{message.text}</span>
              </div>
            )}
            <p className="text-gray-400 text-sm">{message.desc}</p>
          </div>

          {/* Quick Stats */}
          <div className="bg-dark-800 rounded-2xl border border-teal-500/30 p-6 shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Quick Stats</h3>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Confirmed Steps:</span>
              <span className="text-white font-semibold">{confirmedSteps}/{totalSteps}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Trading Style:</span>
              <span className="text-white font-semibold">{getTradingStyleName()}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Entry Ready:</span>
              <span className={`font-semibold ${entryReady ? 'text-green-400' : 'text-red-400'}`}>
                {entryReady ? 'YES' : 'NO'}
              </span>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={() => onSave?.()}
            className="w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 shadow-lg shadow-teal-500/50"
          >
            <Target className="w-5 h-5" />
            {onSave ? 'Save & Return to Dashboard' : 'Execute Trade'}
          </button>

          <button
            onClick={onBack}
            className="w-full py-3 bg-dark-700 border border-gray-600 rounded-xl text-white font-semibold hover:bg-dark-600 transition-all"
          >
            ← Back to Roadmap
          </button>
        </div>
      </div>
    </div>
  )
}

interface ChecklistItemCardProps {
  item: ChecklistItem
  stepNumber: number
  onToggle: () => void
  isEntry?: boolean
}

function ChecklistItemCard({ item, stepNumber, onToggle, isEntry }: ChecklistItemCardProps) {
  return (
    <div
      className={`p-4 rounded-xl border-2 transition-all ${
        item.checked
          ? 'bg-teal-500/10 border-teal-500'
          : isEntry
          ? 'bg-dark-700 border-gray-600'
          : 'bg-dark-700 border-gray-600'
      }`}
    >
      <div className="flex items-start gap-4">
        {isEntry ? (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            item.checked ? 'bg-teal-500' : 'bg-gray-600'
          }`}>
            <Target className="w-5 h-5 text-white" />
          </div>
        ) : (
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            item.checked ? 'bg-teal-500' : 'bg-gray-600'
          }`}>
            {item.checked ? (
              <Check className="w-5 h-5 text-white" />
            ) : (
              <span className="text-white font-semibold">{stepNumber}</span>
            )}
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-white">{item.title}</h3>
            <span className="text-orange-400 text-sm font-semibold">{item.importance}</span>
          </div>
          <p className="text-gray-400 text-sm mb-3">{item.description}</p>
        </div>
        
        <button
          onClick={onToggle}
          className={`w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            item.checked
              ? 'bg-teal-500 border-teal-500'
              : 'border-gray-500 bg-transparent hover:border-teal-500'
          }`}
        >
          {item.checked && <Check className="w-4 h-4 text-white" />}
        </button>
      </div>
    </div>
  )
}