import { useEffect, useRef } from 'react'

function generateHexagons(cols, rows, size) {
  const hexes = []
  const w = size * 2
  const h = Math.sqrt(3) * size
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * w * 0.75 + size
      const y = row * h + (col % 2 === 0 ? 0 : h / 2) + h / 2
      const points = []
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 180) * (60 * i - 30)
        points.push([x + size * 0.92 * Math.cos(angle), y + size * 0.92 * Math.sin(angle)])
      }
      hexes.push({ x, y, points: points.map(p => p.join(',')).join(' ') })
    }
  }
  return hexes
}

export default function HexPattern({ mousePos }) {
  const svgRef = useRef(null)
  const hexes = generateHexagons(10, 8, 48)

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hexGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#b8973e" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#b8973e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {hexes.map((hex, i) => {
        const dx = mousePos.x - hex.x / 800
        const dy = mousePos.y - hex.y / 600
        const dist = Math.sqrt(dx * dx + dy * dy)
        const proximity = Math.max(0, 1 - dist * 2.5)
        const opacity = 0.08 + proximity * 0.28
        const strokeWidth = 0.6 + proximity * 1.2

        return (
          <polygon
            key={i}
            points={hex.points}
            fill="none"
            stroke="white"
            strokeWidth={strokeWidth}
            opacity={opacity}
            style={{ transition: 'opacity 0.35s ease, stroke-width 0.35s ease' }}
          />
        )
      })}
    </svg>
  )
}
