import React from 'react'
import { motion } from "framer-motion"
import './loader.css'

const Loader = () => {
  return (
    <div className='loader-bg' style={{ background: "rgba(0,0,0,0.5)" }}>
      <motion.div
        style={{ background: "white", padding: "20px"}}
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          repeatCount: Infinity
        }}
        transition={
          {
            repeat: Infinity
          }
        }
      />
    </div>
  )
}

export default Loader