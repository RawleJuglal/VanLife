import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import HostLayout from './components/HostLayout/HostLayout'
import Error from './components/Error/Error'
import Home from './pages/Home/Home'
import About from './pages/About/About'
import { Vans, loader as vansLoader } from './pages/Vans/Vans'
import { VanDetail, loader as vanLoader } from './pages/Vans/VanDetails'
import {Dashboard, loader as dashboardLoader } from './pages/Host/Dashboard/Dashboard'
import Income from './pages/Host/Income/Income'
import { HostVans, loader as hostVansLoader } from './pages/Host/HostVans/HostVans'
import { HostVansDetail, loader as hostVanLoader } from './pages/Host/HostVans/HostVansDetail'
import HostVanPricing from './pages/Host/HostVanPricing/HostVanPricing'
import HostVanPhotos from './pages/Host/HostVanPhotos/HostVanPhotos'
import HostVanInfo from './pages/Host/HostVanInfo/HostVanInfo'
import Reviews from './pages/Host/Reviews/Reviews'
import NotFound from './pages/NotFound/Notfound'
import { Login, loader as loginLoader, action as loginAction } from './pages/Login/Login'
import "./server"
import './index.css'
import { requireAuth } from './utils'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />} errorElement={<Error />}>
    <Route path="host" element={<HostLayout />}>
      <Route 
        index 
        element={<Dashboard />}
        loader={dashboardLoader} 
      /> 
      <Route 
        path="income" 
        element={<Income />}
        loader={async ({request})=> {
          await requireAuth(request)
          return null
        }} 
      />
      <Route 
        path="reviews" 
        element={<Reviews />}
        loader={async ({request})=> {
          await requireAuth(request)
          return null
        }} 
      />
      <Route 
        path="vans" 
        element={<HostVans />} 
        loader={hostVansLoader} 
      />
      <Route 
        path="vans/:id" 
        element={<HostVansDetail />} 
        loader={hostVanLoader}
      >
        <Route 
          index 
          element={<HostVanInfo/>}
          loader={async ({request})=> {
            await requireAuth(request)
            return null
          }}
        />
        <Route 
          path="pricing" 
          element={<HostVanPricing/>}
          loader={async ({request})=> {
            await requireAuth(request)
            return null
          }}
        />
        <Route 
          path="photos" 
          element={<HostVanPhotos/>}
          loader={async ({request})=> {
            await requireAuth(request)
            return null
          }}
        /> 
      </Route>
    </Route>
    <Route
      path="login"
      element={<Login />}
      loader={loginLoader}
      action={loginAction}
      errorElement={<Error />}
    />
    <Route path="about" element={<About />}/>
    <Route path="vans" element={<Vans />} loader={vansLoader}/>
    <Route 
      path="vans/:id" 
      element={<VanDetail />} 
      loader={async({params}) => {
        return vanLoader(params)
      }}
    />
    <Route index element={<Home />}/>
    <Route path="*" element={<NotFound />} />
  </Route>
))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
