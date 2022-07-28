import styles from '../../styles/ProductCard.module.css'
import acIcon from '../../public/images/ac.png'
import cruiseIcon from '../../public/images/cruise.png'
import doorsIcon from '../../public/images/doors.png'
import engineVolumeIcon from '../../public/images/engineVolume.png'
import fuelTypeIcon from '../../public/images/fuelType.png'
import gearboxIcon from '../../public/images/gearbox.png'
import seatsIcon from '../../public/images/seats.png'

import React from 'react'
import Link from 'next/link'

export const InfoElement = ({ icon, text }) => {
  return (
    <div className={styles.infoElementContainer}>
      <img src={icon.src} className={styles.infoElementIcon}></img>
      <p className={styles.infoElementText}>{text}</p>
    </div>
  )
}

const ProductCard = ({ data }) => {
  const { _id, status, visible, make, model, year, engineVolume, fuelType,
    gearbox, doors, seats, cruise, ac, price, images } = data

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageContainer}>
        <img className={styles.cardImage} src={images[0]}></img>
      </div>
      <div className={styles.contentContainer}>
        <h3 className={styles.cardTitle} >{make} {model}</h3>
        <div className={styles.statusContainer}>
          <p className={styles.year}>{year}</p>
          <div className={`${styles.statusLight} ${status === 'Pieejams' ? styles.available : styles.unavailable}`} />
          <p className={styles.statusText}>{status}</p>
        </div>
        <div className={styles.infoContainer} >
          <InfoElement icon={doorsIcon} text={`${doors} durvis`} />
          <InfoElement icon={seatsIcon} text={`${seats} vietas`} />
          <InfoElement icon={engineVolumeIcon} text={`${engineVolume}l`} />
          <InfoElement icon={gearboxIcon} text={gearbox} />
          <InfoElement icon={fuelTypeIcon} text={fuelType} />
          <InfoElement icon={acIcon} text={ac ? 'Ir' : 'Nav'} />
          <InfoElement icon={cruiseIcon} text={cruise ? 'Ir' : 'Nav'} />
        </div>
      </div>
      <Link href={`/${_id}`}>
        <a className={styles.cardButon}>{`Sākot no ${price}€ dienā`}</a>
      </Link>
    </div>
  )
}

export default ProductCard