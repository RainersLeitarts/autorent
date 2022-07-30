import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import nextIcon from '../public/images/slider/next.png'
import previousIcon from '../public/images/slider/previous.png'
import styles from '../styles/SingleVehicle.module.css'
import Layout from '../components/Layout'
import { InfoElement } from "../components/products/ProductCard";
import acIcon from '../public/images/ac.png'
import cruiseIcon from '../public/images/cruise.png'
import doorsIcon from '../public/images/doors.png'
import engineVolumeIcon from '../public/images/engineVolume.png'
import fuelTypeIcon from '../public/images/fuelType.png'
import gearboxIcon from '../public/images/gearbox.png'
import seatsIcon from '../public/images/seats.png'

const ImageSlider = ({ images }) => {
    //debug images
    //images = ["https://res.cloudinary.com/dmau27ozz/image/upload/v1658845726/vehicle-images/wxs8m00f6ldylfqbbsuq.jpg", "https://res.cloudinary.com/dmau27ozz/image/upload/v1658845728/vehicle-images/sfm9191pmhwjtsxm31hm.jpg", "https://res.cloudinary.com/dmau27ozz/image/upload/v1658845729/vehicle-images/jp6mv3nxkz7dlky0ub2z.jpg"]
    const [shownImage, setShownImage] = useState(0)

    const nextImage = () => {
        if (shownImage === images.length - 1) {
            setShownImage(0)
            return
        }

        setShownImage(prev => {
            return prev + 1
        })
    }

    const previousImage = () => {
        if (shownImage === 0) {
            setShownImage(images.length - 1)
            return
        }

        setShownImage(prev => {
            return prev - 1
        })
    }

    return (
        <div className={styles.ImageSliderContainer}>
            {images?.map((image, index) => {
                return <div className={`${styles.sliderImage} ${index === shownImage ? styles.opacity : ''}`} style={{ backgroundImage: `url(${image})` }} ></div>
            })}

            <div className={styles.imageControlsContainer} >
                <div className={`${styles.controlsButton}`} style={{ backgroundImage: `url(${previousIcon.src})` }} onClick={previousImage} />
                <div className={`${styles.controlsButton}`} style={{ backgroundImage: `url(${nextIcon.src})` }} onClick={nextImage} />
            </div>
        </div>
    )

}

const SingleVehicle = () => {
    const router = useRouter()
    const id = router.query["id"];
    const vehicles = useSelector(state => state.fetchedVehicles)
    //const veh = vehicles?.rental_vehicles?.vehicles?.find(item => item._id === id)
    let vehicle = vehicles?.rental_vehicles?.vehicles?.find(item => item._id === id)


    useEffect(() => {
    }, [vehicles])


    console.log(vehicle)
    return (
        <Layout>
            <div className={styles.singleVehicleContainer}>
                <div className={styles.leftContainer}>
                    <div className={styles.sliderContainer}>{
                        vehicle && <ImageSlider images={vehicle?.images} />
                    }</div>

                    <div className={styles.contentContainer}>
                        <h3 className={styles.cardTitle} >{vehicle?.make} {vehicle?.model}</h3>
                        <div className={styles.statusContainer}>
                            <p className={styles.year}>{vehicle?.year}</p>
                            <div className={`${styles.statusLight} ${vehicle?.status === 'Pieejams' ? styles.available : styles.unavailable}`} />
                            <p className={styles.statusText}>{vehicle?.status}</p>
                        </div>
                        <div className={styles.infoContainer} >
                            <InfoElement icon={doorsIcon} text={`${vehicle?.doors} durvis`} />
                            <InfoElement icon={seatsIcon} text={`${vehicle?.seats} vietas`} />
                            <InfoElement icon={engineVolumeIcon} text={`${vehicle?.engineVolume}l`} />
                            <InfoElement icon={gearboxIcon} text={vehicle?.gearbox} />
                            <InfoElement icon={fuelTypeIcon} text={vehicle?.fuelType} />
                            <InfoElement icon={acIcon} text={vehicle?.ac ? 'Ir' : 'Nav'} />
                            <InfoElement icon={cruiseIcon} text={vehicle?.cruise ? 'Ir' : 'Nav'} />
                        </div>
                    </div>
                </div>

                <div className={styles.rightContainer}>

                </div>
            </div>
        </Layout>
    )
}

export default SingleVehicle