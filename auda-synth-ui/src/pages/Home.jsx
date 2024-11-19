import React, { useEffect } from 'react'
import useUser from '../hooks/useUser'
import { useNavigate } from 'react-router-dom'

function Home() {
  const user = useUser()
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user])

  return (
    <div>{JSON.stringify(user, null, 2)}</div>
  )
}

export default Home