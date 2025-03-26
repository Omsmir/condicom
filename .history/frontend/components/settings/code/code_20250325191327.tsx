"use client"
import React from 'react'
import CodeGeneration from './codeGeneration'
import CodeLayout from './codeLayout'

const code = () => {
  const {con}
  return (
    <div className="grid grid-cols-12 w-full pt-0 p-6">
      <CodeGeneration />
      <CodeLayout />
    </div>
  )
}

export default code
