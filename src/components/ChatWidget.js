'use client'

import { useEffect } from 'react'

export default function ChatWidget() {
  useEffect(() => {
    // Function to force chat widget position
    const forceChatWidgetPosition = () => {
      // Try to find the chat widget using various selectors
      const selectors = [
        'div[style*="position: fixed"]',
        'iframe[src*="chatbase"]',
        '#chatbase-widget',
        '.chatbase-chat-widget',
        'div[class*="chat"]',
        'div[id*="chat"]'
      ]
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector)
        elements.forEach(el => {
          // Check if it's positioned at bottom (likely chat widget)
          const style = window.getComputedStyle(el)
          if (style.position === 'fixed' && parseInt(style.bottom) <= 30) {
            // Check screen size
            const isMobile = window.innerWidth < 768
            
            // Apply new position
            el.style.bottom = isMobile ? '120px' : '30px'
            el.style.zIndex = '99999'
            
            // Add custom class for additional styling
            el.classList.add('chat-widget-adjusted')
            
            console.log('✅ Adjusted chat widget position:', {
              element: el,
              isMobile,
              newBottom: el.style.bottom
            })
          }
        })
      })
    }
    
    // Use MutationObserver to watch for when Chatbase adds elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          forceChatWidgetPosition()
        }
      })
    })
    
    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
    
    // Also run periodically in case it loads slowly
    const interval = setInterval(forceChatWidgetPosition, 1000)
    
    // Run on resize
    const handleResize = () => forceChatWidgetPosition()
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => {
      observer.disconnect()
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return null
}