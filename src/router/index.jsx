
import React from 'react'
import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import AuthRoute from '@/components/AuthRoute'
import Home from '../pages/Home'
import Article from '../pages/Article'
import Publish from '../pages/Publish'
import { Route } from 'react-router-dom'


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <AuthRoute> <Layout /> </AuthRoute>,
//     children: [
//       {
//         path: "home",
//         element: <Home />
//       },
//       {
//         path: "article",
//         element: <Article />
//       },
//       {
//         path: "publish",
//         element: <Publish />
//       }
//     ]
//   },
//   {
//     path: "/login",
//     element: <Login />

//   }
// ])
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AuthRoute> <Layout /> </AuthRoute>}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="article" element={<Article />} />
        <Route path="publish" element={<Publish />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </>
  )
);

export default router