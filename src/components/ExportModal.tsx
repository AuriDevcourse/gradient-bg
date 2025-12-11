import { X, Copy, Check, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { GradientConfig } from '../types'
import { cn } from '../lib/utils'

interface ExportModalProps {
  config: GradientConfig
  isOpen: boolean
  onClose: () => void
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `${parseInt(result[1]!, 16)}, ${parseInt(result[2]!, 16)}, ${parseInt(result[3]!, 16)}`
    : '0, 0, 0'
}

function generateCode(config: GradientConfig) {
  const htmlCode = `<!-- Animated Gradient Background -->
<!-- Place this anywhere in your HTML - it will stay in the background -->
<div class="gradient-bg">
  <svg xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
      </filter>
    </defs>
  </svg>${config.noiseOpacity > 0 ? `
  <div class="noise-overlay"></div>` : ''}
  <div class="gradients-container">
    <div class="g1"></div>
    <div class="g2"></div>
    <div class="g3"></div>
    <div class="g4"></div>
    <div class="g5"></div>
    <div class="interactive"></div>
  </div>
</div>

<!-- Your content goes here - it will appear on top of the gradient -->
<div style="position: relative; z-index: 1;">
  <!-- Add your content here -->
</div>`

  const cssCode = `:root {
  --color-bg1: ${config.colorBg1};
  --color-bg2: ${config.colorBg2};
  --color1: ${hexToRgb(config.color1)};
  --color2: ${hexToRgb(config.color2)};
  --color3: ${hexToRgb(config.color3)};
  --color4: ${hexToRgb(config.color4)};
  --color5: ${hexToRgb(config.color5)};
  --color-interactive: ${hexToRgb(config.colorInteractive)};
  --circle-size: ${config.circleSize}%;
  --blending: ${config.blendMode};
}

@keyframes moveInCircle {
  0% { transform: rotate(0deg); }
  50% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}

@keyframes moveVertical {
  0% { transform: translateY(-50%); }
  50% { transform: translateY(50%); }
  100% { transform: translateY(-50%); }
}

@keyframes moveHorizontal {
  0% { transform: translateX(-50%) translateY(-10%); }
  50% { transform: translateX(50%) translateY(10%); }
  100% { transform: translateX(-50%) translateY(-10%); }
}

.gradient-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(40deg, var(--color-bg1), var(--color-bg2));
  z-index: -1;
  pointer-events: none;
}

.gradient-bg svg {
  display: none;
}

${config.noiseOpacity > 0 ? `.gradient-bg .noise-overlay {
  position: absolute;
  inset: 0;
  opacity: ${config.noiseOpacity / 100};
  mix-blend-mode: overlay;
  background: white;
  filter: url(#noise) contrast(200%) brightness(100%);
  pointer-events: none;
  z-index: 10;
}

` : ''}.gradient-bg .gradients-container {
  filter: url(#goo) blur(${config.blurAmount}px);
  width: 100%;
  height: 100%;
}

.gradient-bg .g1 {
  position: absolute;
  background: radial-gradient(circle at center, rgba(var(--color1), 0.8) 0, rgba(var(--color1), 0) 50%) no-repeat;
  mix-blend-mode: var(--blending);
  width: var(--circle-size);
  height: var(--circle-size);
  top: calc(50% - var(--circle-size) / 2);
  left: calc(50% - var(--circle-size) / 2);
  transform-origin: center center;
  animation: moveVertical 30s ease infinite;
  opacity: 1;
}

.gradient-bg .g2 {
  position: absolute;
  background: radial-gradient(circle at center, rgba(var(--color2), 0.8) 0, rgba(var(--color2), 0) 50%) no-repeat;
  mix-blend-mode: var(--blending);
  width: var(--circle-size);
  height: var(--circle-size);
  top: calc(50% - var(--circle-size) / 2);
  left: calc(50% - var(--circle-size) / 2);
  transform-origin: calc(50% - 400px);
  animation: moveInCircle 20s reverse infinite;
  opacity: 1;
}

.gradient-bg .g3 {
  position: absolute;
  background: radial-gradient(circle at center, rgba(var(--color3), 0.8) 0, rgba(var(--color3), 0) 50%) no-repeat;
  mix-blend-mode: var(--blending);
  width: var(--circle-size);
  height: var(--circle-size);
  top: calc(50% - var(--circle-size) / 2 + 200px);
  left: calc(50% - var(--circle-size) / 2 - 500px);
  transform-origin: calc(50% + 400px);
  animation: moveInCircle 40s linear infinite;
  opacity: 1;
}

.gradient-bg .g4 {
  position: absolute;
  background: radial-gradient(circle at center, rgba(var(--color4), 0.8) 0, rgba(var(--color4), 0) 50%) no-repeat;
  mix-blend-mode: var(--blending);
  width: var(--circle-size);
  height: var(--circle-size);
  top: calc(50% - var(--circle-size) / 2);
  left: calc(50% - var(--circle-size) / 2);
  transform-origin: calc(50% - 200px);
  animation: moveHorizontal 40s ease infinite;
  opacity: 0.7;
}

.gradient-bg .g5 {
  position: absolute;
  background: radial-gradient(circle at center, rgba(var(--color5), 0.8) 0, rgba(var(--color5), 0) 50%) no-repeat;
  mix-blend-mode: var(--blending);
  width: calc(var(--circle-size) * 2);
  height: calc(var(--circle-size) * 2);
  top: calc(50% - var(--circle-size));
  left: calc(50% - var(--circle-size));
  transform-origin: calc(50% - 800px) calc(50% + 200px);
  animation: moveInCircle 20s ease infinite;
  opacity: 1;
}

.gradient-bg .interactive {
  position: absolute;
  background: radial-gradient(circle at center, rgba(var(--color-interactive), 0.8) 0, rgba(var(--color-interactive), 0) 50%) no-repeat;
  mix-blend-mode: var(--blending);
  width: 100%;
  height: 100%;
  top: -50%;
  left: -50%;
  opacity: 0.7;
}`

  const jsCode = `const interBubble = document.querySelector('.interactive');
let curX = 0;
let curY = 0;
let tgX = 0;
let tgY = 0;

function move() {
  curX += (tgX - curX) / 20;
  curY += (tgY - curY) / 20;
  interBubble.style.transform = \`translate(\${Math.round(curX)}px, \${Math.round(curY)}px)\`;
  requestAnimationFrame(move);
}

window.addEventListener('mousemove', (event) => {
  tgX = event.clientX;
  tgY = event.clientY;
});

move();`

  return { htmlCode, cssCode, jsCode }
}

export function ExportModal({ config, isOpen, onClose }: ExportModalProps) {
  const [copiedSection, setCopiedSection] = useState<string | null>(null)
  const { htmlCode, cssCode, jsCode } = generateCode(config)

  const aiPrompt = `Create an animated gradient background for my website with the following specifications:

HTML Structure:
${htmlCode}

CSS Styling:
${cssCode}

${config.enableInteraction ? `JavaScript (Mouse Interaction):
${jsCode}` : 'No JavaScript needed - pure CSS animations only.'}

Requirements:
- The gradient should be a fixed background layer (z-index: -1) that doesn't interfere with page content
- All content should appear on top of the gradient
- The gradient uses SVG filters for the "goo" effect${config.noiseOpacity > 0 ? ' and noise texture' : ''}
- Background colors: ${config.colorBg1} and ${config.colorBg2}
- Gradient colors: ${config.color1}, ${config.color2}, ${config.color3}, ${config.color4}, ${config.color5}
- Interactive color: ${config.colorInteractive}
- Circle size: ${config.circleSize}%
- Blur amount: ${config.blurAmount}px${config.noiseOpacity > 0 ? `
- Noise texture opacity: ${config.noiseOpacity}%` : ''}
- Blend mode: ${config.blendMode}
- Mouse interaction: ${config.enableInteraction ? 'Enabled' : 'Disabled'}

Please implement this exactly as specified above.`

  const copyToClipboard = async (text: string, section: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 flex items-center justify-center p-5 z-[101] pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[hsl(0,0%,3.9%)] border border-[hsl(0,0%,14.9%)] rounded-xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl pointer-events-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-[hsl(0,0%,14.9%)]">
                <h2 className="text-lg font-semibold text-[hsl(0,0%,98%)] tracking-tight">
                  Export Gradient Background
                </h2>
                <button
                  onClick={onClose}
                  className={cn(
                    'w-8 h-8 flex items-center justify-center rounded-md',
                    'border border-[hsl(0,0%,14.9%)] text-[hsl(0,0%,63.9%)]',
                    'hover:bg-[hsl(0,0%,14.9%)] hover:text-[hsl(0,0%,98%)] hover:border-[hsl(0,0%,20%)]',
                    'transition-all duration-150'
                  )}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <p className="text-sm text-[hsl(0,0%,63.9%)] mb-5">
                  Copy the code below to use this gradient background in your project:
                </p>

                {/* AI Prompt Section */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-white mb-1">AI Assistant Prompt</h3>
                      <p className="text-xs text-white/60">
                        Copy this complete prompt and paste it into any AI code editor (Cursor, Windsurf, etc.) to instantly implement this gradient
                      </p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(aiPrompt, 'ai-prompt')}
                      className={cn(
                        'flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold',
                        'bg-blue-500 text-white',
                        'hover:bg-blue-600',
                        'transition-all duration-150 active:scale-95'
                      )}
                    >
                      {copiedSection === 'ai-prompt' ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Prompt
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="h-px bg-white/10 my-6" />

                <CodeSection
                  title="HTML"
                  code={htmlCode}
                  onCopy={() => copyToClipboard(htmlCode, 'html')}
                  isCopied={copiedSection === 'html'}
                />

                <CodeSection
                  title="CSS"
                  code={cssCode}
                  onCopy={() => copyToClipboard(cssCode, 'css')}
                  isCopied={copiedSection === 'css'}
                />

                {config.enableInteraction && (
                  <CodeSection
                    title="JavaScript (Optional - for interactive effect)"
                    code={jsCode}
                    onCopy={() => copyToClipboard(jsCode, 'js')}
                    isCopied={copiedSection === 'js'}
                  />
                )}
                
                {!config.enableInteraction && (
                  <div className="text-sm text-white/50 bg-white/5 border border-white/10 rounded-lg p-4">
                    💡 <strong>Mouse interaction is disabled.</strong> No JavaScript needed - your gradient will float freely with pure CSS animations!
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

function CodeSection({
  title,
  code,
  onCopy,
  isCopied,
}: {
  title: string
  code: string
  onCopy: () => void
  isCopied: boolean
}) {
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold text-[hsl(0,0%,63.9%)] uppercase tracking-wider">
          {title}
        </h3>
        <button
          onClick={onCopy}
          className={cn(
            'inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold',
            'bg-white/5 text-white/70 border border-white/10',
            'hover:bg-white/10 hover:text-white hover:border-white/20',
            'transition-all duration-150 active:scale-95'
          )}
        >
          {isCopied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="relative bg-[hsl(0,0%,9%)] border border-[hsl(0,0%,14.9%)] rounded-lg p-4 overflow-x-auto">
        <code className="text-xs font-mono text-[hsl(0,0%,80%)] leading-relaxed whitespace-pre">
          {code}
        </code>
      </pre>
    </div>
  )
}
