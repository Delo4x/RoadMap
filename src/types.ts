export type TradingStyle = 'scalper' | 'day-trader' | 'swing-trader' | 'position-trader' | null

export interface RoadmapStep {
  id: string
  title: string
  description: string
  importance: number // 1-5
  isEntry?: boolean
}

export interface StrategyData {
  originalDescription: string
  refinedDescription: string
  refinedName: string
  tradingStyle: TradingStyle
  roadmap: RoadmapStep[]
}