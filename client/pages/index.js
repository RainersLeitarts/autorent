import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../components/Layout'
import styles from '../styles/ProductsPage.module.css'
import { storeRentalVehicles } from '../redux/actions/ProductActions'
import ProductCard from '../components/products/ProductCard'
import bannerImg from '../public/images/banner.png'
import bannerLogo from '../public/images/VZ.png'

//make 

const getVehicles = async () => {
    const { data } = await axios.get('http://localhost:3000/api/vehicles/getAll')
    return data
}

//filter visible
export async function getServerSideProps(context) {
    const data = await getVehicles(null, context.params)
    return {
        props: { data }
    }
}

export const BannerMain = () => {
    return (
        <div style={{ backgroundImage: `url(${bannerImg.src})` }} className={styles.banner}>
            <div className={styles.bannerContent}>
                <h1 className={styles.bannerTitle}>Auto Noma</h1>
                <img src={bannerLogo.src} className={styles.bannerLogo} />
                <h1 className={styles.bannerTitle}>Ātri un ērti</h1>
            </div>
        </div>
    )
}

const rental_vehicles = ({ data }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(storeRentalVehicles(data))
    })

    return (
        <Layout banner={true}>
            <div className={styles.productTypeContainer}>
                <h1 className={`${styles.productTypeTitle} ${styles.first}`}>Vieglās automašīnas</h1>
                <h3 className={styles.productTypeSmallTitle}>Izvēlieties sev nepieciešamo</h3>
            </div>
            <div className={styles.productsContainer}>
                {data.vehicles.map((vehicle, key) => {
                    if (vehicle.type === 'car') {
                        return <div>
                            <ProductCard data={vehicle} key={key} />
                        </div>
                    }
                })}</div>

            <div className={styles.productTypeContainer}>
                <h1 className={styles.productTypeTitle}>Mikroautobusi</h1>
                <h3 className={styles.productTypeSmallTitle}>Izvēlieties sev nepieciešamo</h3>
            </div>
            <div className={styles.productsContainer}>
                {data.vehicles.map((vehicle, key) => {
                    if (vehicle.type === 'bus') {
                        return <div>
                            <ProductCard data={vehicle} key={key} />
                        </div>
                    }
                })}</div>

            <div className={styles.productTypeContainer}>
                <h1 className={styles.productTypeTitle}>Piekabju Noma</h1>
                <h3 className={styles.productTypeSmallTitle}>Izvēlieties sev nepieciešamo</h3>
            </div>
            <div className={styles.productsContainer}>
                {data.vehicles.map((vehicle, key) => {
                    return <div>
                        <ProductCard data={vehicle} key={key} />
                    </div>
                })}</div>
        </Layout>
    )
}

export default rental_vehicles