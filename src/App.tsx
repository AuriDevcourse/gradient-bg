import { useState } from 'react'
import { GradientBackground } from './components/GradientBackground'
import { ControlPanel } from './components/ControlPanel'
import { ExportModal } from './components/ExportModal'
import { GradientConfig } from './types'

const defaultConfig: GradientConfig = {
  colorBg1: '#111111',
  colorBg2: '#111111',
  color1: '#ff0028',
  color2: '#ce0f2d',
  color3: '#f48022',
  color4: '#f48022',
  color5: '#f48022',
  colorInteractive: '#f48022',
  circleSize: 80,
  blurAmount: 40,
  noiseOpacity: 0,
  blendMode: 'hard-light',
  enableInteraction: true
}

function App() {
  const [config, setConfig] = useState<GradientConfig>(defaultConfig)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)

  const handleReset = () => {
    setConfig(defaultConfig)
  }

  return (
    <div className="dark">
      <GradientBackground config={config} />
      <ControlPanel
        config={config}
        onChange={setConfig}
        onReset={handleReset}
        onExport={() => setIsExportModalOpen(true)}
      />
      <ExportModal
        config={config}
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  )
}

export default App
