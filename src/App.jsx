import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import './App.css'

function App() {
  const [selectedFeeling, setSelectedFeeling] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const feelings = [
    { id: 'lonely', label: 'Lonely' },
    { id: 'sad', label: 'Sad' },
    { id: 'happy', label: 'Happy' },
    { id: 'okay', label: 'Okay' },
    { id: 'anxious', label: 'Anxious' }
  ]

  const supportiveMessages = {
    lonely: "You're not alone. Maybe take a walk or call a friend before continuing.",
    sad: "It's okay to pause. Try doing something you enjoy before using the app.",
    happy: "That's great! You can proceed and enjoy the app.",
    okay: "Got it. Feel free to explore or take a moment to relax.",
    anxious: "Take a deep breath. Come back when you feel better."
  }

  const handleFeelingSelect = (feelingId) => {
    setSelectedFeeling(feelingId)
    setShowModal(true)
  }

  const handleTakeBreak = () => {
    alert('Take care of yourself! Come back when you feel ready.')
    setShowModal(false)
    setSelectedFeeling(null)
  }

  const handleProceed = () => {
    const isMobile = window.innerWidth <= 768 && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Create a hidden iframe to test if the app opens
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = 'instagram://';
      document.body.appendChild(iframe);
      
      // Remove iframe after attempt
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 100);
      
      // Fallback to web if app doesn't open
      setTimeout(() => {
        if (!document.hidden) {
          window.open('https://www.instagram.com', '_blank');
        }
      }, 1000);
    } else {
      // Desktop: redirect to Instagram web
      window.location.href = 'https://www.instagram.com';
    }
    
    setShowModal(false);
    setSelectedFeeling(null);
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedFeeling(null)
  }

  return (
    <div className="app-container">
      <div className="main-card">
        <div className="content-container">
          <h1 className="main-question">
            How are you feeling right now?
          </h1>
          
          <div className="feelings-grid">
            {feelings.map((feeling) => (
              <Button
                key={feeling.id}
                onClick={() => handleFeelingSelect(feeling.id)}
                className="feeling-button"
                variant="outline"
              >
                {feeling.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="feeling-label">
                {feelings.find(f => f.id === selectedFeeling)?.label}
              </h2>
              <button 
                onClick={closeModal}
                className="close-button"
              >
                ×
              </button>
            </div>
            
            <div className="supportive-message">
              <p>{supportiveMessages[selectedFeeling]}</p>
            </div>

            <div className="action-buttons">
              <Button 
                onClick={handleTakeBreak}
                className="take-break-btn"
                variant="outline"
              >
                Take a break
              </Button>
              <Button 
                onClick={handleProceed}
                className="proceed-btn"
              >
                Proceed
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

