import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import styles from '../../styles/ProductsPage.module.css'
import { storeRentalVehicles } from '../../redux/actions/ProductActions'

//make 

const getVehicles = async () => {
    const { data } = await axios.get('http://localhost:3000/api/vehicles/getAll')
    return data
}

export async function getServerSideProps(context) {
    const data = await getVehicles(null, context.params)
    return {
        props: { data }
    }
}

const rental_vehicles = ({ data }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(storeRentalVehicles(data))
    })

    return (
        <Layout>
            <div>{data.vehicles.map(vehicle => {
                return <div>
                    <p>Model: {vehicle.model}</p>
                    <p>Make: {vehicle.make}</p>
                    <br/>
                </div>
            })}</div>
        </Layout>
    )
}

export default rental_vehicles