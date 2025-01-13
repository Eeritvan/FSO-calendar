// import { lazy, Suspense } from 'react'
// import { Router, Route, Switch, Link } from 'wouter'
// import { useHashLocation } from 'wouter/use-hash-location'
import Events from './events'

// const Settings = lazy(() => import('../settings'))
// const AddNew = lazy(() => import('../addNew'))

const SidePanel = () => {
  return (
    <div className='bg-green-400 rounded-xl'>
      <Events />
    </div>
  )
}

export default SidePanel
