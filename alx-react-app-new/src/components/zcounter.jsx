import React from 'react'
import useStore from './store'

function Counter() {
  const { count, increaseCount, decreaseCount } = useStore()

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increaseCount}>+</button>
      <button onClick={decreaseCount}>-</button>
    </div>
  )
}

export default Counter