import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../slices/counterslice'

const Hello = () => {

    const data = useSelector((state)=> state)
    let dispatch = useDispatch()


  return (
    <>
    <button onClick={()=>dispatch(increment(2))} >+</button>
    <h1>{data.counter.value}</h1>
    <button onClick={()=>dispatch(decrement())} >-</button>
    </>
  )
}

export default Hello