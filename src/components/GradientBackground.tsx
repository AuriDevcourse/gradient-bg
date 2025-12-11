import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { GradientConfig } from '../types'

interface GradientBackgroundProps {
  config: GradientConfig
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? `${parseInt(result[1]!, 16)}, ${parseInt(result[2]!, 16)}, ${parseInt(result[3]!, 16)}`
    : '0, 0, 0'
}

export function GradientBackground({ config }: GradientBackgroundProps) {
  const interactiveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!config.enableInteraction) return

    let curX = 0
    let curY = 0
    let tgX = 0
    let tgY = 0
    let animationFrameId: number

    function move() {
      curX += (tgX - curX) / 20
      curY += (tgY - curY) / 20
      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
      }
      animationFrameId = requestAnimationFrame(move)
    }

    function handleMouseMove(event: MouseEvent) {
      tgX = event.clientX
      tgY = event.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)
    move()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [config.enableInteraction])

  const gradientStyle = {
    '--color-bg1': config.colorBg1,
    '--color-bg2': config.colorBg2,
    '--color1': hexToRgb(config.color1),
    '--color2': hexToRgb(config.color2),
    '--color3': hexToRgb(config.color3),
    '--color4': hexToRgb(config.color4),
    '--color5': hexToRgb(config.color5),
    '--color-interactive': hexToRgb(config.colorInteractive),
    '--circle-size': `${config.circleSize}%`,
    '--blending': config.blendMode,
  } as React.CSSProperties

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{
        background: `linear-gradient(40deg, ${config.colorBg1}, ${config.colorBg2})`,
        ...gradientStyle,
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
        </defs>
      </svg>
      
      {/* Noise overlay */}
      {config.noiseOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            opacity: config.noiseOpacity / 100,
            mixBlendMode: 'overlay',
            background: 'white',
            filter: 'url(#noise) contrast(200%) brightness(100%)',
          }}
        />
      )}

      <div
        className="w-full h-full"
        style={{
          filter: `url(#goo) blur(${config.blurAmount}px)`,
        }}
      >
        <motion.div
          className="absolute w-[var(--circle-size)] h-[var(--circle-size)] opacity-100"
          style={{
            background: 'radial-gradient(circle at center, rgba(var(--color1), 0.8) 0, rgba(var(--color1), 0) 50%)',
            mixBlendMode: config.blendMode as any,
            top: 'calc(50% - var(--circle-size) / 2)',
            left: 'calc(50% - var(--circle-size) / 2)',
            transformOrigin: 'center center',
          }}
          animate={{
            translateY: ['-50%', '50%', '-50%'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute w-[var(--circle-size)] h-[var(--circle-size)] opacity-100"
          style={{
            background: 'radial-gradient(circle at center, rgba(var(--color2), 0.8) 0, rgba(var(--color2), 0) 50%)',
            mixBlendMode: config.blendMode as any,
            top: 'calc(50% - var(--circle-size) / 2)',
            left: 'calc(50% - var(--circle-size) / 2)',
            transformOrigin: 'calc(50% - 400px)',
          }}
          animate={{
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
            direction: 'reverse',
          }}
        />

        <motion.div
          className="absolute w-[var(--circle-size)] h-[var(--circle-size)] opacity-100"
          style={{
            background: 'radial-gradient(circle at center, rgba(var(--color3), 0.8) 0, rgba(var(--color3), 0) 50%)',
            mixBlendMode: config.blendMode as any,
            top: 'calc(50% - var(--circle-size) / 2 + 200px)',
            left: 'calc(50% - var(--circle-size) / 2 - 500px)',
            transformOrigin: 'calc(50% + 400px)',
          }}
          animate={{
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div
          className="absolute w-[var(--circle-size)] h-[var(--circle-size)] opacity-70"
          style={{
            background: 'radial-gradient(circle at center, rgba(var(--color4), 0.8) 0, rgba(var(--color4), 0) 50%)',
            mixBlendMode: config.blendMode as any,
            top: 'calc(50% - var(--circle-size) / 2)',
            left: 'calc(50% - var(--circle-size) / 2)',
            transformOrigin: 'calc(50% - 200px)',
          }}
          animate={{
            translateX: ['-50%', '50%', '-50%'],
            translateY: ['-10%', '10%', '-10%'],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute opacity-100"
          style={{
            background: 'radial-gradient(circle at center, rgba(var(--color5), 0.8) 0, rgba(var(--color5), 0) 50%)',
            mixBlendMode: config.blendMode as any,
            width: 'calc(var(--circle-size) * 2)',
            height: 'calc(var(--circle-size) * 2)',
            top: 'calc(50% - var(--circle-size))',
            left: 'calc(50% - var(--circle-size))',
            transformOrigin: 'calc(50% - 800px) calc(50% + 200px)',
          }}
          animate={{
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div
          ref={interactiveRef}
          className="absolute w-full h-full opacity-70"
          style={{
            background:
              'radial-gradient(circle at center, rgba(var(--color-interactive), 0.8) 0, rgba(var(--color-interactive), 0) 50%)',
            mixBlendMode: config.blendMode as any,
            top: '-50%',
            left: '-50%',
          }}
        />
      </div>
    </div>
  )
}
