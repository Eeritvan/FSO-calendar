import Events from './events'
import CurrentTime from './currentTime'

const SidePanel = () => {
  return (
    <div className='flex flex-col bg-green-400 rounded-xl m-1'>
      <CurrentTime />
      <Events />
    </div>
  )
}

export default SidePanel
