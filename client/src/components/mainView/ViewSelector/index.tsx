import { Link } from 'wouter'
import Selector from '@/components/selector'

const ViewSelector = () => {

  return (
    <Selector>
      <Link to='/year/2025'> Year </Link>
      <Link to='/month/2025/3'> Month </Link>
      <Link to='/week/2025/12'> Week </Link>
    </Selector>
  )
}

export default ViewSelector
