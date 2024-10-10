import { createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import AuthRoute from '@/components/AuthRoute'
// import Home from '../pages/Home'
// import Article from '../pages/Article'
// import Publish from '../pages/Publish'
import { Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const Home = lazy(() => import('@/pages/Home'))
const Article = lazy(() => import('@/pages/Article'))
const Publish = lazy(() => import('@/pages/Publish'))
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
        <Route index element={
          <Suspense fallback={'Loading...'}><Home /></Suspense>
        } />
        <Route path="home" element={
          <Suspense fallback={'Loading...'}><Home /></Suspense>
        } />
        <Route path="article" element={
          <Suspense fallback={'Loading...'}><Article /></Suspense>
        } />
        <Route path="publish" element={
          <Suspense fallback={'Loading...'}><Publish /></Suspense>
        } />
      </Route >
      
      <Route path="/login" element={<Login />} />
    </>
  )
);

export default router