import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'
import Step1Strategy from './Step1Strategy'
import Step2TradingStyle from './Step2TradingStyle'
import Step3Roadmap from './Step3Roadmap'
import Step4Checklist from './Step4Checklist'
import { saveStrategy, getStrategy, updateStrategy } from '../services/api'
import type { StrategyData } from '../types'

export default function StrategyBuilder() {
  const { strategyId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [currentStep, setCurrentStep] = useState(1)
  const [strategyData, setStrategyData] = useState<StrategyData>({
    originalDescription: '',
    refinedDescription: '',
    refinedName: '',
    tradingStyle: null,
    roadmap: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [savedStrategyId, setSavedStrategyId] = useState<string | null>(strategyId || null)

  useEffect(() => {
    if (strategyId && user) {
      loadStrategy()
    }
  }, [strategyId, user])

  const loadStrategy = async () => {
    if (!user || !strategyId) return
    
    setIsLoading(true)
    const strategy = await getStrategy(user.id, strategyId)
    
    if (strategy) {
      setStrategyData({
        originalDescription: strategy.originalDescription,
        refinedDescription: strategy.refinedDescription,
        refinedName: strategy.refinedName,
        tradingStyle: strategy.tradingStyle,
        roadmap: strategy.roadmap,
      })
      setSavedStrategyId(strategy.id)
    }
    
    setIsLoading(false)
  }

  const updateStrategyData = (updates: Partial<StrategyData>) => {
    setStrategyData(prev => ({ ...prev, ...updates }))
    // Auto-save after a delay
    if (savedStrategyId && user) {
      const timeoutId = setTimeout(() => {
        autoSave(updates)
      }, 2000)
      return () => clearTimeout(timeoutId)
    }
  }

  const autoSave = async (updates: Partial<StrategyData>) => {
    if (!user || !savedStrategyId) return
    
    setIsSaving(true)
    try {
      await updateStrategy(user.id, savedStrategyId, updates)
    } catch (error) {
      console.error('Auto-save failed:', error)
    }
    setIsSaving(false)
  }

  const handleSave = async () => {
    if (!user) {
      console.error('User not logged in')
      return
    }
    
    setIsSaving(true)
    try {
      if (savedStrategyId) {
        await updateStrategy(user.id, savedStrategyId, strategyData)
      } else {
        const strategyName = strategyData.refinedName || strategyData.originalDescription.split('\n')[0] || 'Untitled Strategy'
        const saved = await saveStrategy(user.id, strategyData, strategyName)
        setSavedStrategyId(saved.id)
      }
    } catch (error) {
      console.error('Save failed:', error)
      alert('Failed to save strategy. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1)
      // Save progress when moving to next step
      if (user && (currentStep === 2 || currentStep === 3)) {
        handleSave()
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
          <p className="text-gray-400 mt-4">Loading strategy...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header currentStep={currentStep} />
      
      {isSaving && (
        <div className="fixed top-20 right-4 bg-teal-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Saving...
        </div>
      )}
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {currentStep === 1 && (
          <Step1Strategy
            strategyData={strategyData}
            updateStrategy={updateStrategyData}
            onNext={nextStep}
          />
        )}
        
        {currentStep === 2 && (
          <Step2TradingStyle
            tradingStyle={strategyData.tradingStyle}
            onSelect={(style) => {
              updateStrategyData({ tradingStyle: style })
              nextStep()
            }}
            onBack={prevStep}
          />
        )}
        
        {currentStep === 3 && (
          <Step3Roadmap
            roadmap={strategyData.roadmap}
            onUpdate={(roadmap) => {
              updateStrategyData({ roadmap })
            }}
            onNext={nextStep}
            onBack={prevStep}
          />
        )}
        
        {currentStep === 4 && (
          <Step4Checklist
            roadmap={strategyData.roadmap}
            tradingStyle={strategyData.tradingStyle}
            strategyName={strategyData.refinedName || strategyData.originalDescription.split('\n')[0] || 'Untitled Strategy'}
            onBack={prevStep}
            onSave={async () => {
              await handleSave()
              navigate('/dashboard')
            }}
          />
        )}
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm">
        TradeMap PRO — Systematic Trading for Serious Traders
      </footer>
    </div>
  )
}