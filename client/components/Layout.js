import Navbar from './Navbar'
import styles from '../styles/Layout.module.css'

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className={styles.layoutOuterContainer}>
                <div className={styles.layoutInnerContainer}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout