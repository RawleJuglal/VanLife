import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import HostLayout from './components/HostLayout/HostLayout'
import Error from './components/Error/Error'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import { Vans, loader as vansLoader } from './pages/Vans/Vans'
import { VanDetail } from './pages/Vans/VanDetails'
import Dashboard from './pages/Host/Dashboard/Dashboard'
import Income from './pages/Host/Income/Income'
import HostVans from './pages/Host/HostVans/HostVans'
import HostVansDetail from './pages/Host/HostVans/HostVansDetail'
import HostVanPricing from './pages/Host/HostVanPricing/HostVanPricing'
import HostVanPhotos from './pages/Host/HostVanPhotos/HostVanPhotos'
import HostVanInfo from './pages/Host/HostVanInfo/HostVanInfo'
import Reviews from './pages/Host/Reviews/Reviews'
import "./server"
import './index.css'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />} errorElement={<Error />}>
    <Route path="host" element={<HostLayout />}> 
      <Route path="income" element={<Income />} />
      <Route path="vans" element={<HostVans />} />
      <Route path="vans/:id" element={<HostVansDetail />}>
        <Route path="pricing" element={<HostVanPricing/>}/>
        <Route path="photos" element={<HostVanPhotos/>}/>
        <Route index element={<HostVanInfo/>}/>
      </Route>
      <Route path="reviews" element={<Reviews />} />
      <Route index element={<Dashboard />} />
  </Route>
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
