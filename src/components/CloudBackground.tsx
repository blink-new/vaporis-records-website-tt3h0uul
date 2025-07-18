import React from 'react'
import { motion } from 'framer-motion'

interface CloudBackgroundProps {
  className?: string
  opacity?: number
  cloudCount?: number
  particleCount?: number
}

export const CloudBackground: React.FC<CloudBackgroundProps> = ({
  className = '',
  opacity = 0.15,
  cloudCount = 6,
  particleCount = 12
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Cloud Background Image from Supabase */}
      <img 
        src={`https://imibplmkkdolghzpmgdl.supabase.co/storage/v1/object/public/teaser/chris-nguyen-lbmrrNgq2lo-unsplash.jpg`}
        alt="Clouds Background"
        className="w-full h-full object-cover mix-blend-overlay"
        style={{ opacity: opacity * 0.5 }}
      />
      
      {/* Animated cloud overlays */}
      <div className="absolute inset-0">
        {/* Large floating clouds */}
        {[...Array(cloudCount)].map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute bg-white/8 rounded-full blur-3xl"
            style={{
              width: Math.random() * 300 + 200,
              height: Math.random() * 150 + 100,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: opacity
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 50 - 25],
              scale: [1, 1.1, 1],
              opacity: [opacity * 0.5, opacity, opacity * 0.5]
            }}
            transition={{
              duration: Math.random() * 25 + 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
        
        {/* Smaller cloud particles */}
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute bg-white/6 rounded-full blur-xl"
            style={{
              width: Math.random() * 80 + 40,
              height: Math.random() * 40 + 20,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: opacity * 0.7
            }}
            animate={{
              x: [0, Math.random() * 150 - 75],
              y: [0, Math.random() * 75 - 35],
              opacity: [opacity * 0.3, opacity * 0.7, opacity * 0.3]
            }}
            transition={{
              duration: Math.random() * 18 + 12,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>
    </div>
  )
}