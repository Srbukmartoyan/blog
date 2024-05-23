import React from 'react'

export const Button = ({ text, onClick, type='submit' }) => {
  return (
    <button className='bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded mr-2 mt-2 text-sm' type={type} onClick={onClick}>
      {text}
    </button>
  )
}
