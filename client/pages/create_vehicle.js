import { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/CreateVehicle.module.css'
import { postVehicle } from '../redux/actions/ProductActions'
import { useDispatch, useSelector } from 'react-redux'
import CarForm from '../components/forms/carForm'

const Section = ({ children, title }) => {
    return (
        <div className={styles.sectionContainer}>
            <h1 className={styles.sectionTitle}>{title}</h1>
            {children}
        </div>
    )
}

const create_vehicle = () => {
    const dispatch = useDispatch()
    const { loading, error, success } = useSelector(state => state.vehicle)

    const [values, setValues] = useState({
        status: 'Pieejams',
        visible: true,
        type: 'automašīna',
        price: undefined,
    })
    const { status, visible, type, price } = values

    const [images, setImages] = useState([])
    const fileInput = useRef(null)

    const handleClick = () => {
        fileInput.current.click()
    }

    const handleRemoveImage = e => {
        setImages(prev => {
            return prev.filter(image => image.name !== e.target.dataset.name)
        })
    }

    const handleChange = e => {
        const files = e.target.files

        setImages(prev => {
            return [...prev, ...files]
        })
    }

    const handleFormInput = input => e => {
        setValues({ ...values, [input]: e.target.value })
    }

    const grabValues = (values) => {
        //each form stores its relevant state in its component
        //OnChange form state is merged into create_vehicle state
        //this will ensure easier introduction of new types of products, I think
        setValues(prev => {
            return {...prev, ...values}
        })
    }

    const handleSubmit = async () => {
        //dispatches post action
        dispatch(postVehicle(values, images))
    }

    useEffect(()=>{
        //console.log(values)
    })

    return (
        <Layout>
            <h1 className={styles.createTitle}>Pievienot Jaunu Piedāvājumu</h1>
            {loading && <h3>Augšupielādē datus...</h3>}
            {error && <h3>Notikusi kļūda...</h3>}
            {success && <h3>Piedāvājums veiksmīgi izveidots!</h3>}
            <div className={styles.controls}>
                <select value={type} onChange={handleFormInput('type')} className={`${styles.input} ${styles.types}`}>
                    <option value={'automašīna'} >Automašīna</option>
                    <option value={'piekabe'} >Piekabe</option>
                </select>

                <button onClick={handleSubmit} className={`${styles.input} ${styles.saveBtn}`}>Saglabāt</button>
            </div>
            <Section title='Statuss'>
                <div className={styles.status}>
                    <select value={visible} onChange={handleFormInput('visible')} className={`${styles.input} ${styles.statusInput}`}>
                        <option value={true} >Redzams</option>
                        <option value={false} >Paslēpts</option>
                    </select>
                    <select value={status} onChange={handleFormInput('status')} className={`${styles.input} ${styles.statusInput}`}>
                        <option value={'Pieejams'} >Pieejams</option>
                        <option value={'Nav Pieejams'} >Nav pieejams</option>
                    </select>
                </div>
            </Section>
            <Section title='Galvenie Parametri'>
                <CarForm grabValues={grabValues}/>
            </Section>
            <Section title='Izcenojums'>
                <input value={price} onChange={handleFormInput('price')} placeholder='Cena' className={`${styles.input} ${styles.small}`} type='' />
            </Section>
            <Section title='Attēli'>
                <div className={styles.imagesContainer}>
                    <input ref={fileInput} onChange={handleChange} hidden accept='image/*' multiple type='file' id='add'></input>
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