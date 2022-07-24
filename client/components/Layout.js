import Navbar from './Navbar'
import styles from '../styles/Layout.module.css'
import { BannerMain } from '../pages/products/rental_vehicles'

const Layout = ({ children, banner }) => {
    return (
        <>
            <Navbar />
            {banner && <BannerMain />}
            <div className={styles.layoutOuterContainer}>
                <div className={styles.layoutInnerContainer}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout