import { useState } from 'react'

function App() {
  const [counter, setCounter] = useState(0)

  const handleEvent = (e) => {
    e.preventDefault()
    setCounter(prevCounter => prevCounter + 1)
  }

  return (
    <form>
      <div>{counter}</div>
      <button onClick={e => handleEvent(e)}> test</button>
    </form>
  )
}

export default App
