import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Error from './components/Error/Error'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import { Vans, loader as vansLoader } from './pages/Vans/Vans'
import { VanDetail } from './pages/Vans/VanDetails'
import "./server"
import './index.css'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />} errorElement={<Error />}>
    <Route path="about" element={<About />}/>
    <Route path="vans" element={<Vans />} loader={vansLoader}/>
    <Route path="vans/:id" element={<VanDetail />}/>
    <Route index element={<Home />}/>
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
