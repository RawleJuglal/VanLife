import React,{ useState, useEffect} from "react"
import { useParams, useLoaderData } from "react-router-dom"
import { getVan } from "../../hooks/api"

// export function loader(){
//     // const paramId = useParams()
//     return getVan(paramID)
// }

export function VanDetail() {
    const params = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [van, setVan] = useState(null)

    // const van = useLoaderData()
    useEffect(()=>{
        fetch(`/api/vans/${params.id}`)
            .then(res => res.json())
            .then(data => setVan(data.vans))
    },[params.id])

    return(
        <div className="van-detail-container">
            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>{van.type}</i>
                    <h2>{van.name}</h2>
                    <p className="van-price"><span>${van.price}</span>/day</p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    )
}