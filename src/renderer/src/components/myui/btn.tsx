import React from 'react'

interface BtnProps {
    text: string
    onClick?: () => void
}

const Btn = ({ text, onClick }: BtnProps) => {
  return (
    <button onClick={onClick} className="px-6 py-2 bg-neutral-200 text-neutral-700 hover:text-neutral-950 rounded-lg hover:bg-white transition-colors font-medium">{text}</button>
  )
}

export default Btn