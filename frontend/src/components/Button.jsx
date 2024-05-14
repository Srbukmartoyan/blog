import React from 'react'

export const Button = ({ text, onClick, type='submit' }) => {
  return (
    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mt-2' type={type} onClick={onClick}>
      {text}
    </button>
  )
}
