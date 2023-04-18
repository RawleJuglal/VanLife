import React,{ useState, useEffect} from "react"
import { Link, useParams, useLocation, useLoaderData } from "react-router-dom"
import { getVan } from "../../hooks/api"

export function loader(id){
    return getVan(id)
}

export function VanDetail() {
    const params = useParams()
    const location =useLocation()
    const van = useLoaderData()

    const search = location.state?.search || ''
    const type = location.state?.type || 'all'
    return(
        <div className="van-detail-container">
            <Link
                to={`..${search}`}
                relative="path"
                className="back-button"
            >&larr; <span>Back to {type} vans</span></Link>
            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : <h2>No van data</h2>}
        </div>
    )
}