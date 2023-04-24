import React,{ useState, useEffect, Suspense} from "react"
import { Link, useParams, useLocation, useLoaderData, defer, Await } from "react-router-dom"
import { getVans } from "../../hooks/api"

export function loader(params) {
    return defer({vans: getVans(params.id)})
}

export function VanDetail() {
    // const params = useParams()
    const location =useLocation()
    const dataPromise = useLoaderData()

    const search = location.state?.search || ''
    const type = location.state?.type || 'all'

    return(
        <div className="van-detail-container">
            <Suspense fallback={<h1>Loading Van...</h1>}>
                <Await resolve={dataPromise.vans}>
                    { van =>{
                        return(
                            <>
                            <Link
                                to={`..${search}`}
                                relative="path"
                                className="back-button"
                            >&larr; <span>Back to {type} vans</span></Link>
                            <div className="van-detail">
                                <img src={van.imageUrl} />
                                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                                <h2>{van.name}</h2>
                                <p className="van-price"><span>${van.price}</span>/day</p>
                                <p>{van.description}</p>
                                <button className="link-button">Rent this van</button>
                            </div>
                            </>
                        ) 
                    }}
                </Await>
            </Suspense>
            
        </div>
    )
}