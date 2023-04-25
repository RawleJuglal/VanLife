import React, { useState, useEffect } from "react"
import { useParams, Link, NavLink, Outlet, useLoaderData, defer, Await } from "react-router-dom"
import { getVan } from "../../../hooks/api"
import { requireAuth } from "../../../utils"

export async function loader({params, request}){
    await requireAuth(request)
    return defer({currentVan:getVan(params.id)})
}

export function HostVansDetail() {
    const {id} = useParams()
    const dataPromise = useLoaderData()

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    return (
        <section>
            <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span></Link>
            <React.Suspense fallback={<h1>Loading Van..</h1>}> 
                <Await resolve={dataPromise.currentVan}>
                    {currentVan => {
                        return(
                            <>
                                <div className="host-van-detail-layout-container">
                                    <div className="host-van-detail">
                                        <img src={currentVan.imageUrl} />
                                        <div className="host-van-detail-info-text">
                                            <i
                                                className={`van-type van-type-${currentVan.type}`}
                                            >
                                                {currentVan.type}
                                            </i>
                                            <h3>{currentVan.name}</h3>
                                            <h4>${currentVan.price}/day</h4>
                                        </div>
                                    </div>

                                    <nav className="host-van-detail-nav">
                                        <NavLink
                                            to="."
                                            end
                                            style={({ isActive }) => isActive ? activeStyles : null}
                                        >
                                            Details
                                        </NavLink>
                                        
                                        <NavLink
                                            to="pricing"
                                            style={({ isActive }) => isActive ? activeStyles : null}
                                        >
                                            Pricing
                                        </NavLink>
                                        
                                        <NavLink
                                            to="photos"
                                            style={({ isActive }) => isActive ? activeStyles : null}
                                        >
                                            Photos
                                        </NavLink>
                                        
                                    </nav>

                                    <Outlet context={{currentVan}}/>
                                </div>
                            </>
                        )
                    }}
                </Await>
            </React.Suspense>
            
        </section>
    )
}