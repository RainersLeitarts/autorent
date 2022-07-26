import styles from '../../styles/CreateVehicle.module.css'

const CarForm = ({handleFormInput, values}) => {
    const { make, model, year, engineVolume, fuelType, gearbox, doors, seats, cruise, ac} = values
    //for testing
    const makes = ['Audi', 'Opel', 'Mazda']

    return (
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
    )
}

export default CarForm