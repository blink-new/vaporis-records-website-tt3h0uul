import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Play, Pause, Volume2, Instagram, Facebook, Youtube, Twitter, Music, Mail, MapPin, Phone, Heart, Share2, Download, ExternalLink } from 'lucide-react'
import { TikTokIcon } from './components/TikTokIcon'
import { TeaserGallery } from './components/TeaserGallery'
import { VideoBackground } from './components/VideoBackground'
import { CloudBackground } from './components/CloudBackground'
import { Button } from './components/ui/button'
import { Card, CardContent } from './components/ui/card'
import { Badge } from './components/ui/badge'

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 200], [1, 0])

  const tracks = [
    { title: "Hold Me Close", duration: "3:24", isTitle: true },
    { title: "Hold Me Close (Summer)", duration: "3:42", isTitle: false }
  ]

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/vaporisrecords", label: "Instagram" },
    { icon: Facebook, href: "https://facebook.com/vaporisrecords", label: "Facebook" },
    { icon: Youtube, href: "https://www.youtube.com/@VaporisRecords", label: "YouTube" },
    { icon: TikTokIcon, href: "https://www.tiktok.com/@vaporisrecords", label: "TikTok" },
    { icon: Twitter, href: "https://x.com/vaporisrecords", label: "Twitter" }
  ]

  // Interactive enhancements
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-50 to-accent/20 relative overflow-x-hidden">
      {/* Custom cursor effect */}
      <motion.div
        className="fixed w-6 h-6 bg-primary/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 2 : 1
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-black font-vonca"
            >
              Vaporis Records
            </motion.div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-foreground/80 hover:text-primary transition-colors font-vonca">Home</a>
              <a href="#artist" className="text-foreground/80 hover:text-primary transition-colors font-vonca">Artist</a>
              <a href="#album" className="text-foreground/80 hover:text-primary transition-colors font-vonca">Album</a>
              <a href="#contact" className="text-foreground/80 hover:text-primary transition-colors font-vonca">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video Background */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Supabase Teaser Video Background */}
        <div className="absolute inset-0 z-0">
          <VideoBackground
            useSupabaseVideo={true}
            supabaseVideoPath="teaser-video.mp4"
          />
          {/* Video overlay effects */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-background/40" />
        </div>
        
        <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
            style={{ opacity }}
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium font-vonca">
              Independent Music Label
            </Badge>
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight font-vonca">
              Vaporis
              <span className="block text-white">Records</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-vonca">
              Crafting ethereal soundscapes that linger like melodies unfinished.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="px-8 py-3 text-lg font-vonca group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => {
                document.getElementById('album')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <Music className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Discover Music
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-lg font-vonca group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onClick={() => {
                document.getElementById('artist')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <ExternalLink className="mr-2 h-5 w-5 group-hover:rotate-45 transition-transform" />
              Meet the Artist
            </Button>
          </motion.div>

          {/* Interactive social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-6 mt-12"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          style={{ y: y2 }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          style={{ y: y1 }}
          className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-accent/20 rounded-full blur-lg"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </section>

      {/* Artist Section */}
      <section id="artist" className="relative py-24 bg-card/50 overflow-hidden">
        <CloudBackground opacity={0.1} cloudCount={4} particleCount={8} />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-vonca">
              Meet Vapor
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-vonca">
              An artist whose presence lingers in every note, crafting immersive soundscapes 
              that embody quiet confidence and timeless elegance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <Card className="overflow-hidden border-0 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                <div className="aspect-square relative">
                  <img 
                    src="/vapor-artist.png" 
                    alt="Vapor - Artist" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-4 font-vonca">Vapor</h3>
                <p className="text-lg text-muted-foreground leading-relaxed font-vonca">
                  Emerging from the depths of electronic music, Vapor creates atmospheric 
                  tropical house that captures the essence of summer dreams and endless horizons. 
                  Each track is a journey through ethereal soundscapes designed for both 
                  contemplation and celebration.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="font-vonca">Tropical House</Badge>
                <Badge variant="secondary" className="font-vonca">Electronica</Badge>
                <Badge variant="secondary" className="font-vonca">Ambient</Badge>
                <Badge variant="secondary" className="font-vonca">Chillout</Badge>
              </div>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Album Section */}
      <section id="album" className="relative py-24 overflow-hidden">
        <CloudBackground opacity={0.12} cloudCount={5} particleCount={10} />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-vonca">
              Hold Me Close
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-vonca">
              An upcoming album that captures the warmth of summer nights and the gentle 
              embrace of tropical house rhythms.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <Card className="overflow-hidden border-0 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                <div className="aspect-square relative">
                  <img 
                    src="/hold-me-close.jpg" 
                    alt="Hold Me Close - Album Art" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Interactive album controls */}
                  <div className="absolute bottom-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="backdrop-blur-sm bg-white/20"
                      onClick={() => setIsLiked(!isLiked)}
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="backdrop-blur-sm bg-white/20"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <Badge variant="outline" className="mb-4 font-vonca">Coming Soon</Badge>
                <h3 className="text-3xl font-bold text-foreground mb-4 font-vonca">Album Details</h3>
                <div className="space-y-3 text-muted-foreground font-vonca">
                  <p><span className="font-medium text-foreground">Artist:</span> Vapor</p>
                  <p><span className="font-medium text-foreground">Genre:</span> Tropical House / Electronica</p>
                  <p><span className="font-medium text-foreground">Label:</span> Vaporis Records</p>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-foreground mb-4 font-vonca">Track Listing</h4>
                <div className="space-y-3">
                  {tracks.map((track, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center justify-between p-4 bg-card rounded-lg border hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setCurrentTrack(index)
                            setIsPlaying(!isPlaying)
                          }}
                          className="p-2 group-hover:bg-primary/10"
                          onMouseEnter={() => setIsHovering(true)}
                          onMouseLeave={() => setIsHovering(false)}
                        >
                          {isPlaying && currentTrack === index ? 
                            <Pause className="h-4 w-4" /> : 
                            <Play className="h-4 w-4" />
                          }
                        </Button>
                        <div>
                          <p className="font-medium text-foreground font-vonca">{track.title}</p>
                          {track.isTitle && (
                            <Badge variant="secondary" className="text-xs mt-1 font-vonca">Title Track</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-muted-foreground text-sm font-vonca">{track.duration}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <Button 
                className="w-full font-vonca group" 
                size="lg"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Volume2 className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Get Notified on Release
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Teaser Gallery Section - Hidden for now */}
      {/* <section id="teasers" className="relative py-24 bg-card/50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <TeaserGallery />
        </div>
      </section> */}

      {/* Contact Section */}
      <section id="contact" className="relative py-24 bg-background/50 overflow-hidden">
        <CloudBackground opacity={0.08} cloudCount={3} particleCount={6} />
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-vonca">
              Get in Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-vonca">
              Interested in working with Vaporis Records? We're always looking for 
              talented artists and meaningful collaborations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6 font-vonca">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground font-vonca">Email</p>
                      <p className="text-muted-foreground font-vonca">vaporisrecords@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4 font-vonca">Follow Us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-primary/10 rounded-full text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                    >
                      <social.icon className="h-5 w-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-xl font-bold text-foreground mb-6 font-vonca">Send us a Message</h3>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2 font-vonca">Name</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors font-vonca"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2 font-vonca">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors font-vonca"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2 font-vonca">Subject</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors font-vonca"
                      placeholder="What's this about?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2 font-vonca">Message</label>
                    <textarea 
                      rows={5}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none font-vonca"
                      placeholder="Tell us more..."
                    />
                  </div>
                  <Button 
                    className="w-full font-vonca group" 
                    size="lg"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    <Mail className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                    Send Message
                  </Button>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 bg-foreground/5 border-t border-border/50 overflow-hidden">
        <CloudBackground opacity={0.05} cloudCount={2} particleCount={4} />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-primary mb-2 font-vonca">Vaporis Records</h3>
              <p className="text-muted-foreground font-vonca">
                Independent music label crafting ethereal soundscapes
              </p>
            </div>
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 text-center text-muted-foreground font-vonca">
            <p>&copy; 2025 Vaporis Records. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App