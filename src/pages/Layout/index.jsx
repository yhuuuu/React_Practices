import React, { useEffect } from 'react'
import { request } from '../../utils'

const Layout = () => {
 useEffect(()=>{
  //test if token is retrieve from the request
  request.get('/user/profile')
 },[])
  return (
    <div>Layout</div>
  )
}

export default Layout