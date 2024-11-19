import React from 'react'

function Input(props) {
  return (
    <input
      {...props}
      className='p-2 bg-[#372f47] border-none text-white text-lg focus:border-none rounded-md ' />
  )
}

export default Input