import type { StrategyData } from '../types'

const STORAGE_KEY_PREFIX = 'trademap_strategy_'

export interface SavedStrategy extends StrategyData {
  id: string
  userId: string
  name: string
  createdAt: string
  updatedAt: string
}

export async function saveStrategy(userId: string, strategyData: StrategyData, strategyName?: string): Promise<SavedStrategy> {
  const id = Date.now().toString()
  const now = new Date().toISOString()
  
  const savedStrategy: SavedStrategy = {
    ...strategyData,
    id,
    userId,
    name: strategyName || strategyData.refinedName || 'Untitled Strategy',
    createdAt: now,
    updatedAt: now,
  }
  
  const key = `${STORAGE_KEY_PREFIX}${userId}`
  const strategies = JSON.parse(localStorage.getItem(key) || '[]')
  strategies.push(savedStrategy)
  localStorage.setItem(key, JSON.stringify(strategies))
  
  return savedStrategy
}

export async function updateStrategy(userId: string, strategyId: string, strategyData: Partial<StrategyData>): Promise<SavedStrategy | null> {
  const key = `${STORAGE_KEY_PREFIX}${userId}`
  const strategies: SavedStrategy[] = JSON.parse(localStorage.getItem(key) || '[]')
  const index = strategies.findIndex(s => s.id === strategyId)
  
  if (index === -1) return null
  
  strategies[index] = {
    ...strategies[index],
    ...strategyData,
    updatedAt: new Date().toISOString(),
  }
  
  localStorage.setItem(key, JSON.stringify(strategies))
  return strategies[index]
}

export async function getStrategies(userId: string): Promise<SavedStrategy[]> {
  const key = `${STORAGE_KEY_PREFIX}${userId}`
  return JSON.parse(localStorage.getItem(key) || '[]')
}

export async function getStrategy(userId: string, strategyId: string): Promise<SavedStrategy | null> {
  const strategies = await getStrategies(userId)
  return strategies.find(s => s.id === strategyId) || null
}

export async function deleteStrategy(userId: string, strategyId: string): Promise<boolean> {
  const key = `${STORAGE_KEY_PREFIX}${userId}`
  const strategies: SavedStrategy[] = JSON.parse(localStorage.getItem(key) || '[]')
  const filtered = strategies.filter(s => s.id !== strategyId)
  localStorage.setItem(key, JSON.stringify(filtered))
  return true
}

// In production, replace these with actual API calls:
/*
export async function saveStrategy(userId: string, strategyData: StrategyData): Promise<SavedStrategy> {
  const response = await fetch('/api/strategies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, ...strategyData }),
  })
  return response.json()
}
*/