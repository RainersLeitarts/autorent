import { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/CreateVehicle.module.css'
import { postVehicle } from '../redux/actions/ProductActions'
import { useDispatch } from 'react-redux'



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
    const [values, setValues] = useState({
        make: 'Audi',
        model: 'A6',
        year: 2005,
        engineVolume: 2.0,
        fuelType: 'Diesel',
        gearbox: 'Automatic',
        doors: 4,
        seats: 5,
        cruise: true,
        images: []
    })
    const { make, model, engineVolume, fuelType, gearbox, doors, seats, cruise } = values
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

        console.log(files)

        setImages(prev => {
            return [...prev, ...files]
        })
    }

    const handleFormInput = input => e => {
        setValues({ ...values, [input]: e.target.value })
    }

    const handleSubmit = async () => {
        // const formData = new FormData()
        // formData.append('upload_preset', 'vehicle-images')

        // //Try n not use state
        // await Promise.all(images.map(image => {
        //     formData.append('file', image)
        //     uploadImages(formData).then(response => {
        //         console.log(response)
        //         setImgUrls(curr =>{
        //             return [...curr, response.toString()]
        //         })
        //     })
        // }))

        dispatch(postVehicle(values, images))
    }


    return (
        <Layout>
            <h1 className={styles.createTitle}>Pievienot Jaunu Piedāvājumu</h1>
            <div className={styles.controls}>
                <select className={`${styles.input} ${styles.types}`}>
                    <option value={'automašīna'} >Automašīna</option>
                    <option value={'piekabe'} >Piekabe</option>
                </select>

                <button onClick={handleSubmit} className={`${styles.input} ${styles.saveBtn}`}>Saglabāt</button>
            </div>
            <Section title='Statuss'>
                <div className={styles.status}>
                    <select className={`${styles.input} ${styles.statusInput}`}>
                        <option value={'enabled'} >Redzams</option>
                        <option value={'disabled'} >Paslēpts</option>
                    </select>
                    <select className={`${styles.input} ${styles.statusInput}`}>
                        <option value={'available'} >Pieejams</option>
                        <option value={'unavailable'} >Nav pieejams</option>
                    </select>
                </div>
            </Section>
            <Section title='Galvenie Parametri'>
                <div className={styles.inputsContainer}>
                    <input value={make} onChange={handleFormInput('make')} placeholder='Marka' className={`${styles.input} ${styles.small}`} type='text' />
                    <input value={engineVolume} onChange={handleFormInput('engineVolume')} placeholder='Motora Tilpums' className={`${styles.input} ${styles.small}`} type='number' list='makes' />
                    <input value={gearbox} onChange={handleFormInput('gearbox')} placeholder='Kārbas tips' className={`${styles.input} ${styles.small}`} type='text' list='makes' />
                    <input value={seats} onChange={handleFormInput('seats')} placeholder='Sēdvietas' className={`${styles.input} ${styles.small}`} type='number' list='makes' />
                    <input value={model} onChange={handleFormInput('model')} placeholder='Modelis' className={`${styles.input} ${styles.small}`} type='text' list='makes' />
                    <input value={fuelType} onChange={handleFormInput('fuelType')} placeholder='Degvielas tips' className={`${styles.input} ${styles.small}`} type='text' list='makes' />
                    <input value={doors} onChange={handleFormInput('doors')} placeholder='Durvis' className={`${styles.input} ${styles.small}`} type='number' list='makes' />
                    <input value={cruise} onChange={handleFormInput('cruise')} placeholder='Kruīza kontrole' className={`${styles.input} ${styles.small}`} type='text' list='makes' />
                    <datalist className={`${styles.input} ${styles.small}`} id='makes'>
                        {makes.map((make, key) => {
                            return <option key={key} value={make} />
                        })}
                    </datalist>
                </div>
            </Section>
            <Section title='Izcenojums'>
                <input placeholder='Cena' className={`${styles.input} ${styles.small}`} type='' list='makes' />
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