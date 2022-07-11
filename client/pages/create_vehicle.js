import { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/CreateVehicle.module.css'

const create_vehicle = () => {
    const [images, setImages] = useState([])
    const fileInput = useRef(null)

    const makes = ['Audi', 'Opel', 'Mazda']

    const handleClick = (e) => {
        fileInput.current.click()
    }

    const handleRemoveImage = e => {
        setImages(prev => {
            return prev.filter(image => image.name !== e.target.dataset.name)
        })
    }

    const handleChange = e => {
        const file = e.target.files[0]

        setImages(prev => {
            return prev.concat(file)
        })
    }

    const Section = ({ children, title }) => {
        return (
            <div className={styles.sectionContainer}>
                <h1 className={styles.sectionTitle}>{title}</h1>
                {children}
            </div>
        )
    }

    useEffect(() => {
        console.log(images)
    }, [images])

    return (
        <Layout>
            <h1 className={styles.createTitle}>Pievienot Jaunu Piedāvājumu</h1>
            <div className={styles.controls}>
                <input placeholder='Marka' className={`${styles.input} ${styles.small}`} type='select' />
                <input placeholder='Marka' className={`${styles.input} ${styles.small}`} type='' />
            </div>
            <Section title='Galvenie Parametri'>
                <div className={styles.inputsContainer}>
                    <input placeholder='Marka' className={`${styles.input} ${styles.small}`} type='text' list='makes' />
                    <input placeholder='Motora Tilpums' className={`${styles.input} ${styles.small}`} type='text' list='makes' />
                    <input placeholder='Kārbas tips' className={`${styles.input} ${styles.small}`} type='text' list='makes' />
                    <input placeholder='Sēdvietas' className={`${styles.input} ${styles.small}`} type='text' list='makes' />
                    <input placeholder='Modelis' className={`${styles.input} ${styles.small}`} type='text' list='makes' />
                    <input placeholder='Degvielas tips' className={`${styles.input} ${styles.small}`} type='text' list='makes' />
                    <input placeholder='Durvis' className={`${styles.input} ${styles.small}`} type='text' list='makes' />
                    <input placeholder='Kruīza kontrole' className={`${styles.input} ${styles.small}`} type='text' list='makes' />
                    <datalist className={`${styles.input} ${styles.small}`} id='makes'>
                        {makes.map((make, key) => {
                            return <option key={key} value={make} />
                        })}
                    </datalist>
                </div>
            </Section>
            <Section title='Attēli'>
                <div className={styles.imagesContainer}>
                    <input ref={fileInput} onChange={handleChange} hidden type='file' id='add'></input>
                    <button className={styles.addImgBtn} onClick={handleClick}>+</button>
                    {images.map((image, key) => {
                        return <div onClick={handleRemoveImage} data-name={image.name} key={key} className={styles.image} style={{ backgroundImage: `url(${URL.createObjectURL(image)})` }}  ></div>
                    })}
                </div>
            </Section>
        </Layout>
    )
}

export default create_vehicle