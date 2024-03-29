import { useState } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Login.module.css'
import { login as loginAction } from '../redux/actions/users/UsersActions'
import { useDispatch, useSelector } from 'react-redux'

const login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const { loading, error, success } = useSelector(state => state.user)

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

    const handleSubmit = () => {
        dispatch(loginAction(username, password))
        if (success) {
            setUsername('')
            setPassword('')
        }
    }

    return (
        <Layout>
            <div className={styles.loginContainer}>
                <div className={styles.formContainer}>
                    {loading && <h3 className={`${styles.status}`}>Autorizējas...</h3>}
                    {error && <h3 className={`${styles.status} ${styles.failed}`}>Nepareizi lietotāja dati...</h3>}
                    {success && <h3 className={`${styles.status} ${styles.success}`}>Autorizācija veiksmīga!</h3>}
                    <h1 className={styles.formTitle}>Autorizācija</h1>
                    <input value={username} onChange={handleInput('username')} placeholder='Lietotājvārds' className={styles.formInput} />
                    <input value={password} onChange={handleInput('password')} placeholder='Parole' type='password' className={styles.formInput} />
                    <button onClick={handleSubmit} className={styles.formButton}>Pieslēgties</button>
                    <p className={styles.loginHelp}>Aizmirsāt paroli?</p>
                </div>
            </div>
        </Layout>
    )
}

export default login