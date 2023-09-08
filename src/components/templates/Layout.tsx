import { useEffect } from 'react';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'typescript-cookie'

export default function Layout() {
  const navigate = useNavigate()
  const access_token = getCookie('token') || ''
 
  useEffect(() => {
    if (access_token === '')
    navigate('/login')
  }, [access_token])
  return (
    <>
      <Navbar/>
      <main className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 pt-8'>
        <Outlet />
      </main>
    </>
  )
}
