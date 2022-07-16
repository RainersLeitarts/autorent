import axios from 'axios'
import React from 'react'
import Layout from '../components/Layout'

const getVehicles = async (key, name) => {
    const { data, status } = await axios.get('http://localhost:3000/api/vehicles/getAll')
    return data
}

export async function getServerSideProps(context) {
    console.log('Params: ' + context.params)
    const data = await getVehicles(null, context.params)
    return {
        props: { data }
    }
}

const rental_vehicles = ({ data }) => {
    console.log(data)
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