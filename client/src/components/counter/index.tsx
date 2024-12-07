import { useDispatch, useSelector } from 'react-redux'
import { setCounter, increaseCounter, decreaseCounter, resetCounter } from '../../reducers/counterReducer'

const Counter = () => {
  const dispatch = useDispatch()
  const count = useSelector((state) => state.testi)

  const reset = () => dispatch(resetCounter())
  const increase = () => dispatch(increaseCounter())
  const decrease = () => dispatch(decreaseCounter())
  const setCustom = () => dispatch(setCounter(3))

  return (
    <>
      <div>
         This is counter page
      </div>
      <div>
        Counter: {count}
      </div>
      <button onClick={increase}>
        increase
      </button>
      <button onClick={setCustom}>
        reset
      </button>
      <button onClick={decrease}>
        decrease
      </button>
    </>
  )
}

export default Counter