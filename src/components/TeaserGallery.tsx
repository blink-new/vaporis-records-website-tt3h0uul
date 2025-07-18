import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, Download, ExternalLink, Image as ImageIcon, Film } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { supabase, getPublicUrl, listFiles } from '../lib/supabase'

interface TeaserFile {
  name: string
  id: string
  updated_at: string
  created_at: string
  last_accessed_at: string
  metadata: {
    eTag: string
    size: number
    mimetype: string
    cacheControl: string
    lastModified: string
    contentLength: number
    httpStatusCode: number
  }
}

interface TeaserGalleryProps {
  className?: string
}

export const TeaserGallery: React.FC<TeaserGalleryProps> = ({ className = '' }) => {
  const [teaserFiles, setTeaserFiles] = useState<TeaserFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)

  useEffect(() => {
    loadTeaserFiles()
  }, [])

  const loadTeaserFiles = async () => {
    try {
      setLoading(true)
      const files = await listFiles('teaser')
      
      // Filter out system files and folders
      const validFiles = files.filter(file => 
        file.name && 
        !file.name.startsWith('.') && 
        file.metadata?.mimetype
      )
      
      setTeaserFiles(validFiles)
      setError(null)
    } catch (err) {
      console.error('Error loading teaser files:', err)
      setError('Failed to load teaser content')
    } finally {
      setLoading(false)
    }
  }

  const getFileType = (mimetype: string) => {
    if (mimetype.startsWith('image/')) return 'image'
    if (mimetype.startsWith('video/')) return 'video'
    if (mimetype.startsWith('audio/')) return 'audio'
    return 'file'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return ImageIcon
      case 'video': return Film
      case 'audio': return Volume2
      default: return ExternalLink
    }
  }

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground font-vonca">Loading teaser content...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-12">
          <p className="text-red-500 font-vonca">{error}</p>
          <Button 
            onClick={loadTeaserFiles} 
            variant="outline" 
            className="mt-4 font-vonca"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  if (teaserFiles.length === 0) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-12">
          <p className="text-muted-foreground font-vonca">No teaser content available yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-vonca">
          Exclusive Teasers
        </h3>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-vonca">
          Get a glimpse behind the scenes and exclusive content from Vapor's creative process.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teaserFiles.map((file, index) => {
          const fileType = getFileType(file.metadata.mimetype)
          const publicUrl = getPublicUrl('teaser', file.name)
          const FileIcon = getFileIcon(fileType)

          return (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-video relative bg-gradient-to-br from-primary/10 to-accent/10">
                  {fileType === 'image' && (
                    <img
                      src={publicUrl}
                      alt={file.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  )}
                  
                  {fileType === 'video' && (
                    <div className="relative w-full h-full">
                      <video
                        src={publicUrl}
                        className="w-full h-full object-cover"
                        controls={playingVideo === file.name}
                        muted
                        loop
                        poster={publicUrl}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                        <Button
                          size="lg"
                          variant="secondary"
                          className="backdrop-blur-sm bg-white/20 hover:bg-white/30"
                          onClick={() => setPlayingVideo(playingVideo === file.name ? null : file.name)}
                        >
                          {playingVideo === file.name ? (
                            <Pause className="h-6 w-6" />
                          ) : (
                            <Play className="h-6 w-6" />
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {fileType === 'audio' && (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Volume2 className="h-12 w-12 text-primary mx-auto mb-4" />
                        <audio
                          src={publicUrl}
                          controls
                          className="w-full max-w-xs"
                        />
                      </div>
                    </div>
                  )}
                  
                  {fileType === 'file' && (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <FileIcon className="h-12 w-12 text-primary mx-auto mb-4" />
                        <p className="text-sm text-muted-foreground font-vonca">
                          {file.metadata.mimetype}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* File type badge */}
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="backdrop-blur-sm bg-white/20 font-vonca">
                      {fileType.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Action buttons */}
                  <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="backdrop-blur-sm bg-white/20 hover:bg-white/30"
                      onClick={() => window.open(publicUrl, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="backdrop-blur-sm bg-white/20 hover:bg-white/30"
                      onClick={() => {
                        const link = document.createElement('a')
                        link.href = publicUrl
                        link.download = file.name
                        link.click()
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground truncate font-vonca">
                      {file.name.replace(/\.[^/.]+$/, "")} {/* Remove file extension */}
                    </h4>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="font-vonca">{formatFileSize(file.metadata.size)}</span>
                      <span className="font-vonca">
                        {new Date(file.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Refresh button */}
      <div className="text-center mt-8">
        <Button
          onClick={loadTeaserFiles}
          variant="outline"
          className="font-vonca"
        >
          Refresh Content
        </Button>
      </div>
    </div>
  )
}