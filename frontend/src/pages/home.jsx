import {useEffect, useState} from 'react'
import API from '../services/api'
import Booking from './booking'

function Home() {

    const [cars, setCars] = useState([]);

    useEffect( () => {
        API.get("/cars").then(res => {setCars(res.data)})
    }, [])
 
    return(
        <>
        <div>
            <h2>available cars</h2>

            {cars.map(car => (
  <div key={car._id}>
    <h3>{car.brand} {car.model}</h3>
    <p>${car.pricePerDay}/day</p>
    <Booking car={car} />
  </div>
))}
        </div>
        </>
    )
}

export default Home;