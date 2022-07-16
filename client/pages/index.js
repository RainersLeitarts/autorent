import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import { decrement, increment, incrementValue } from '../redux/slices/testSlice'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [input, setInput] = useState()
  const dispatch = useDispatch()
  const count = useSelector(state => state.counter.value)
  
  const inputHandler = (e) => {
    setInput(e.target.value)
    console.log(e.target.value)
  }

  return (
    <>
      <Layout>
        <h1>{count}</h1>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <input value={input} placeholder='Increment By' onChange={inputHandler}/>
        <button onClick={() => dispatch(incrementValue(parseInt(input)))}>Submit</button>
      </Layout>
    </>
  )
}
