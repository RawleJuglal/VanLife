import React from "react"
import { Link, useLoaderData, defer, Await } from "react-router-dom"
import { getHostVans } from "../../../hooks/api"
import { requireAuth } from "../../../utils"

export async function loader({request}){
    await requireAuth(request)
    return defer({hostvans: getHostVans()})
}

export function HostVans() {
    const dataPromise = useLoaderData()

    

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                <section>
                    <React.Suspense fallback={<h1>Loading Vans...</h1>}>
                        <Await resolve={dataPromise.hostvans}>
                            { vans => {
                                const hostVansEls = vans.map(van => (
                                    <Link
                                        to={van.id}
                                        key={van.id}
                                        className="host-van-link-wrapper"
                                    >
                                        <div className="host-van-single" key={van.id}>
                                            <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                                            <div className="host-van-info">
                                                <h3>{van.name}</h3>
                                                <p>${van.price}/day</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                                return(
                                    <>
                                        {hostVansEls}
                                    </>
                                )
                            }}
                        </Await>
                    </React.Suspense>
                </section>
            </div>
        </section>
    )
}