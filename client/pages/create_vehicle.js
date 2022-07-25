import { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/CreateVehicle.module.css'
import { postVehicle } from '../redux/actions/ProductActions'
import { useDispatch, useSelector } from 'react-redux'

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

    //generate inputs from values ex
    //model: {
    //    value: a6,
    //    placeholder: 'Modelis'
    //}

    const [values, setValues] = useState({
        status: 'Pieejams',
        visible: true,
        type: 'automašīna',
        make: '',
        model: '',
        year: undefined,
        engineVolume: undefined,
        fuelType: '',
        gearbox: '',
        doors: undefined,
        seats: undefined,
        cruise: undefined,
        ac: undefined,
        price: undefined,
        images: []
    })
    const { status, visible, type, make, model, year, engineVolume, fuelType, gearbox, doors, seats, cruise, ac, price } = values
    const [images, setImages] = useState([])
    const fileInput = useRef(null)

    //for testing
    const makes = ['Audi', 'Opel', 'Mazda']

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

    const handleSubmit = async () => {
        dispatch(postVehicle(values, images))
        success && setValues(
            {
                status: 'Pieejams',
                visible: true,
                make: '',
                model: '',
                year: undefined,
                engineVolume: undefined,
                fuelType: '',
                gearbox: '',
                doors: undefined,
                seats: undefined,
                cruise: undefined,
                ac: undefined,
                price: undefined,
                images: []
            })
    }

    useEffect(()=>{
        console.log(type)
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
                        <option value={'available'} >Pieejams</option>
                        <option value={'unavailable'} >Nav pieejams</option>
                    </select>
                </div>
            </Section>
            <Section title='Galvenie Parametri'>
                <div className={styles.inputsContainer}>
                    <input value={make} onChange={handleFormInput('make')} placeholder='Marka' className={`${styles.input} ${styles.small}`} type='text' />
                    <input value={year} onChange={handleFormInput('year')} placeholder='Gads' className={`${styles.input} ${styles.small}`} type='text' />
                    <input value={engineVolume} onChange={handleFormInput('engineVolume')} placeholder='Motora Tilpums' className={`${styles.input} ${styles.small}`} type='number' />
                    <select value={gearbox} onChange={handleFormInput('gearbox')} placeholder='Kārbas tips' className={`${styles.input} ${styles.small}`} type='text'>
                        <option >Kārbas tips</option>
                        <option value={'Manuāla'} >Manuāla</option>
                        <option value={'Automātiska'} >Automātiska</option>
                    </select>
                    <input value={seats} onChange={handleFormInput('seats')} placeholder='Sēdvietas' className={`${styles.input} ${styles.small}`} type='number' />
                    <input value={model} onChange={handleFormInput('model')} placeholder='Modelis' className={`${styles.input} ${styles.small}`} type='text' />
                    <select value={fuelType} onChange={handleFormInput('fuelType')} placeholder='Degvielas tips' className={`${styles.input} ${styles.small}`} type='text'>
                        <option >Degvielas tips</option>
                        <option value={'Dīzelis'} >Dīzelis</option>
                        <option value={'Benzīns'} >Benzīns</option>
                        <option value={'Elektrība'} >Elektrība</option>
                        <option value={'Hibrīds'} >Hibrīds</option>
                    </select>
                    <input value={doors} onChange={handleFormInput('doors')} placeholder='Durvis' className={`${styles.input} ${styles.small}`} type='number' />
                    <select value={cruise} onChange={handleFormInput('cruise')} placeholder='Kruīza kontrole' className={`${styles.input} ${styles.small}`} type='text'>
                        <option >Kruīza kontrole</option>
                        <option value={true} >Ir</option>
                        <option value={false} >Nav</option>
                    </select>
                    <select value={ac} onChange={handleFormInput('ac')} placeholder='Kondicionieris' className={`${styles.input} ${styles.small}`} type='text'>
                        <option value={true} >Kondicionieris</option>
                        <option value={true} >Ir</option>
                        <option value={false} >Nav</option>
                    </select>
                    <datalist className={`${styles.input} ${styles.small}`} id='makes'>
                        {makes.map((make, key) => {
                            return <option key={key} value={make} />
                        })}
                    </datalist>
                </div>
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