import { useState } from 'react'
import Layout from '../components/Layout'
import styles from '../styles/Login.module.css'
import { signup } from '../redux/actions/users/UsersActions'
import { useDispatch, useSelector } from 'react-redux'

const login = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const { loading, error, success } = useSelector(state => state.user)


    const handleInput = input => e => {
        switch (input) {
            case 'email':
                setEmail(e.target.value)
                break
            case 'username':
                setUsername(e.target.value)
                break
            case 'password':
                setPassword(e.target.value)
                break
        }
    }

    const handleSubmit = () => {
        dispatch(signup(email, username, password))
        if(success){
            setEmail('')
            setUsername('')
            setPassword('')
        }
    }

    return (
        <Layout>
            <div className={styles.loginContainer}>
                <div className={styles.formContainer}>
                    {loading && <h3 className={`${styles.status}`}>Pievieno lietotāju...</h3>}
                    {error && <h3 className={`${styles.status} ${styles.failed}`}>Notikusi kļūda...</h3>}
                    {success && <h3 className={`${styles.status} ${styles.success}`}>Lietotājs veiksmīgi pievienots!</h3>}
                    <h1 className={styles.formTitle}>Reģistrācija</h1>
                    <input value={email} onChange={handleInput('email')} placeholder='E-pasts' className={styles.formInput} />
                    <input value={username} onChange={handleInput('username')} placeholder='Lietotājvārds' className={styles.formInput} />
                    <input value={password} onChange={handleInput('password')} placeholder='Parole' type='password' className={styles.formInput} />
                    <button onClick={handleSubmit} className={styles.formButton}>Pieslēgties</button>
                    <p className={styles.loginHelp}>Jums jau izveidots profils?</p>
                </div>
            </div>
        </Layout>
    )
}

export default login