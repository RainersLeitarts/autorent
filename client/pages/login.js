import { useState } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Login.module.css'

const login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleInput = input => e => {
        switch (input) {
            case 'username':
                setUsername(e.target.value)
                break
            case 'password':
                setPassword(e.target.value)
                break
        }
    }

    return (
        <Layout>
            <div className={styles.loginContainer}>
                <div className={styles.formContainer}>
                    <h1 className={styles.formTitle}>Autorizācija</h1>
                    <input value={username} onChange={handleInput('username')} placeholder='Lietotājvārds' className={styles.formInput} />
                    <input value={password} onChange={handleInput('password')} placeholder='Parole' type='password' className={styles.formInput} />
                    <button className={styles.formButton}>Pieslēgties</button>
                    <p className={styles.loginHelp}>Aizmirsāt paroli?</p>
                </div>
            </div>
        </Layout>
    )
}

export default login