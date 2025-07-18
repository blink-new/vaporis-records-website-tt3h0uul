import React from 'react'
import { getPublicUrl } from '../lib/supabase'

interface VideoBackgroundProps {
  useSupabaseVideo?: boolean
  supabaseVideoPath?: string
  useLocalVideo?: boolean
  localVideoPath?: string
  youtubeVideoId?: string
  className?: string
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  useSupabaseVideo = false,
  supabaseVideoPath = '',
  useLocalVideo = false,
  localVideoPath = '/vapor-video.mp4',
  youtubeVideoId = 'r3id79qqaro',
  className = ''
}) => {
  if (useSupabaseVideo && supabaseVideoPath) {
    try {
      const videoUrl = getPublicUrl('teaser', supabaseVideoPath)
      return (
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`w-full h-full object-cover ${className}`}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '56.25vw', // 16:9 aspect ratio
            minHeight: '100vh',
            minWidth: '177.78vh', // 16:9 aspect ratio
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}
          onError={() => {
            console.warn('Supabase video failed to load, falling back to YouTube')
          }}
        >
          <source src={videoUrl} type="video/mp4" />
          <p>Your browser does not support the video tag.</p>
        </video>
      )
    } catch (error) {
      console.warn('Error accessing Supabase storage, falling back to YouTube:', error)
      // Fall through to YouTube fallback
    }
  }

  if (useLocalVideo) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        className={`w-full h-full object-cover ${className}`}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100vw',
          height: '56.25vw', // 16:9 aspect ratio
          minHeight: '100vh',
          minWidth: '177.78vh', // 16:9 aspect ratio
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}
      >
        <source src={localVideoPath} type="video/mp4" />
        <p>Your browser does not support the video tag.</p>
      </video>
    )
  }

  return (
    <iframe
      src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1`}
      className={`w-full h-full object-cover ${className}`}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100vw',
        height: '56.25vw', // 16:9 aspect ratio
        minHeight: '100vh',
        minWidth: '177.78vh', // 16:9 aspect ratio
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  )
}