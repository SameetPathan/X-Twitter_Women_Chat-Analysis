import React from 'react'
import '../Background.css'

function BackgroundC() {
  return (
    <div className="background-container">
      <img
      style={{ 
          width: '100%', 
          height:"600px",
          objectFit: 'cover' 
        }} 
        src="bg2.jpg"
        alt="Background Image"
        className="background-image"
      />
      <div className="text-overlay">
        <h1>X - Twitter Advance Analysis Application</h1>
      </div>
    </div>
  )
}

export default BackgroundC