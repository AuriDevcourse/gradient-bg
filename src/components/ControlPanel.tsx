import { useState } from 'react'
import { Settings, ChevronLeft, Square, Sparkles, Download, RotateCcw, MousePointer2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { GradientConfig } from '../types'
import { cn } from '../lib/utils'

interface ControlPanelProps {
  config: GradientConfig
  onChange: (config: GradientConfig) => void
  onReset: () => void
  onExport: () => void
}

export function ControlPanel({ config, onChange, onReset, onExport }: ControlPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const updateConfig = (updates: Partial<GradientConfig>) => {
    onChange({ ...config, ...updates })
  }

  return (
    <motion.div
      className={cn(
        'fixed top-0 left-0 h-screen z-50 flex flex-col',
        'bg-[hsl(0,0%,3.9%)]/80 backdrop-blur-xl border-r border-white/10',
        'transition-transform duration-300 ease-in-out',
        'shadow-2xl shadow-black/50'
      )}
      style={{ width: '320px' }}
      animate={{ x: isCollapsed ? -264 : 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 flex-shrink-0 bg-white/5">
        <div className="flex items-center gap-2.5 text-[hsl(0,0%,98%)]">
          <Settings className="w-5 h-5 text-[hsl(0,0%,63.9%)]" />
          <span className="text-[15px] font-semibold tracking-tight">Gradient Studio</span>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            'w-8 h-8 flex items-center justify-center rounded-md',
            'border border-white/10 text-[hsl(0,0%,63.9%)] bg-white/5',
            'hover:bg-white/10 hover:text-[hsl(0,0%,98%)] hover:border-white/20',
            'transition-all duration-150'
          )}
        >
          <ChevronLeft
            className={cn('w-4 h-4 transition-transform duration-300', isCollapsed && 'rotate-180')}
          />
        </button>
      </div>

      {/* Content */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-y-auto p-5"
          >
            {/* Background Section */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-4 text-[hsl(0,0%,63.9%)] text-xs font-medium uppercase tracking-wider">
                <Square className="w-4 h-4 opacity-70" />
                <span>Background</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <ColorInput
                  label="Primary"
                  value={config.colorBg1}
                  onChange={(value) => updateConfig({ colorBg1: value })}
                />
                <ColorInput
                  label="Secondary"
                  value={config.colorBg2}
                  onChange={(value) => updateConfig({ colorBg2: value })}
                />
              </div>
            </div>

            <div className="h-px bg-white/10 my-5" />

            {/* Gradient Colors */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-4 text-[hsl(0,0%,63.9%)] text-xs font-medium uppercase tracking-wider">
                <Sparkles className="w-4 h-4 opacity-70" />
                <span>Gradient Colors</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {(['color1', 'color2', 'color3', 'color4', 'color5', 'colorInteractive'] as const).map(
                  (key, index) => (
                    <PaletteColor
                      key={key}
                      value={config[key]}
                      label={key === 'colorInteractive' ? 'cursor' : String(index + 1)}
                      isInteractive={key === 'colorInteractive'}
                      onChange={(value) => updateConfig({ [key]: value })}
                    />
                  )
                )}
              </div>
            </div>

            <div className="h-px bg-white/10 my-5" />

            {/* Effects */}
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-4 text-[hsl(0,0%,63.9%)] text-xs font-medium uppercase tracking-wider">
                <Sparkles className="w-4 h-4 opacity-70" />
                <span>Effects</span>
              </div>

              <SliderInput
                label="Circle Size"
                value={config.circleSize}
                onChange={(value) => updateConfig({ circleSize: value })}
                min={50}
                max={150}
                unit="%"
              />

              <SliderInput
                label="Blur Intensity"
                value={config.blurAmount}
                onChange={(value) => updateConfig({ blurAmount: value })}
                min={0}
                max={100}
                unit="px"
              />

              <SliderInput
                label="Noise Texture"
                value={config.noiseOpacity}
                onChange={(value) => updateConfig({ noiseOpacity: value })}
                min={0}
                max={100}
                unit="%"
              />

              <SelectInput
                label="Blend Mode"
                value={config.blendMode}
                onChange={(value) => updateConfig({ blendMode: value })}
                options={[
                  { value: 'hard-light', label: 'Hard Light' },
                  { value: 'overlay', label: 'Overlay' },
                  { value: 'screen', label: 'Screen' },
                  { value: 'multiply', label: 'Multiply' },
                  { value: 'color-dodge', label: 'Color Dodge' },
                  { value: 'soft-light', label: 'Soft Light' },
                ]}
              />

              <ToggleInput
                label="Mouse Interaction"
                value={config.enableInteraction}
                onChange={(value) => updateConfig({ enableInteraction: value })}
                icon={<MousePointer2 className="w-4 h-4" />}
              />
            </div>

            <div className="h-px bg-white/10 my-5" />

            {/* Actions */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={onExport}
                className={cn(
                  'flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg',
                  'bg-[hsl(0,0%,98%)] text-[hsl(0,0%,3.9%)] text-sm font-semibold',
                  'hover:bg-[hsl(0,0%,90%)] hover:-translate-y-0.5',
                  'transition-all duration-150 shadow-sm hover:shadow-md'
                )}
              >
                <Download className="w-4 h-4" />
                Export Code
              </button>
              <button
                onClick={onReset}
                className={cn(
                  'flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg',
                  'bg-white/5 text-white/70 text-sm font-semibold',
                  'border border-white/10',
                  'hover:bg-white/10 hover:text-white hover:border-white/20',
                  'transition-all duration-150'
                )}
              >
                <RotateCcw className="w-4 h-4" />
                Reset Defaults
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Sub-components
function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div>
      <label className="block text-xs text-white/70 font-medium mb-2">{label}</label>
      <div className="group relative flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-2 hover:border-white/20 hover:bg-white/10 transition-all duration-200">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 rounded-lg cursor-pointer border-2 border-white/20 hover:border-white/30 transition-colors"
          />
          <div 
            className="absolute inset-0 rounded-lg pointer-events-none ring-2 ring-white/0 group-hover:ring-white/20 transition-all duration-200"
          />
        </div>
        <span className="text-xs font-mono text-white/60 uppercase tracking-wider">{value}</span>
      </div>
    </div>
  )
}

function PaletteColor({
  value,
  label,
  isInteractive,
  onChange,
}: {
  value: string
  label: string
  isInteractive?: boolean
  onChange: (value: string) => void
}) {
  return (
    <div className="group flex flex-col items-center gap-2">
      <div className="relative w-full">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full aspect-square rounded-xl cursor-pointer border-2 transition-all duration-200',
            'hover:scale-110 hover:shadow-lg hover:shadow-white/20',
            'active:scale-95',
            isInteractive
              ? 'border-blue-400/50 border-dashed hover:border-blue-400/80 shadow-blue-400/20'
              : 'border-white/20 hover:border-white/40'
          )}
        />
        {isInteractive && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <MousePointer2 className="w-5 h-5 text-white drop-shadow-lg" />
          </div>
        )}
        <div className={cn(
          'absolute inset-0 rounded-xl pointer-events-none',
          'ring-2 ring-white/0 group-hover:ring-white/30 transition-all duration-200',
          isInteractive && 'group-hover:ring-blue-400/40'
        )} />
      </div>
      <span className={cn(
        "text-[10px] font-semibold group-hover:text-white/70 transition-colors",
        isInteractive ? "text-blue-400/80" : "text-white/50"
      )}>{label}</span>
    </div>
  )
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  unit,
}: {
  label: string
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  unit: string
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm text-white font-medium">{label}</label>
        <div className="text-xs font-mono text-white/70 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
          {value}
          {unit}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-white/20 [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/30"
      />
    </div>
  )
}

function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <label className="block text-sm text-white font-medium mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full px-3 py-2.5 pr-10 rounded-lg text-sm font-medium',
            'bg-white/10 text-white border border-white/20',
            'hover:border-white/30 hover:bg-white/15 focus:outline-none focus:border-white/40 focus:bg-white/15',
            'appearance-none cursor-pointer transition-all duration-200',
            '[&>option]:bg-[hsl(0,0%,10%)] [&>option]:text-white [&>option]:py-2 [&>option]:px-3',
            '[&>option]:rounded-lg [&>option]:my-1 [&>option]:font-medium',
            '[&>option:checked]:bg-blue-600 [&>option:checked]:text-white'
          )}
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              className="rounded-lg my-1 py-2"
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronLeft className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none rotate-[-90deg]" />
      </div>
    </div>
  )
}

function ToggleInput({
  label,
  value,
  onChange,
  icon,
}: {
  label: string
  value: boolean
  onChange: (value: boolean) => void
  icon?: React.ReactNode
}) {
  return (
    <div className="mt-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <span className="text-white/70">{icon}</span>}
          <label className="text-sm text-white font-medium">{label}</label>
        </div>
        <button
          onClick={() => onChange(!value)}
          className={cn(
            'relative w-12 h-6 rounded-full transition-all duration-200',
            value ? 'bg-blue-500' : 'bg-white/10'
          )}
        >
          <span
            className={cn(
              'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-lg transition-transform duration-200',
              value && 'translate-x-6'
            )}
          />
        </button>
      </div>
      <p className="text-xs text-white/50 mt-2">
        {value ? 'Gradient follows your cursor' : 'Gradient floats freely'}
      </p>
    </div>
  )
}
