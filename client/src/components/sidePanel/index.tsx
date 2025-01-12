import { lazy, Suspense } from 'react'
import { Router, Route, Switch, Link } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'
// import usePanelSizeSlice from '../../store/panelSizeStore'

const Settings = lazy(() => import('../settings'))
const AddNew = lazy(() => import('../addNew'))

const SidePanel = () => {
  // const { dragging, defaultSize, expandedView } = usePanelSizeSlice()

  return (
    // <motion.div
    //   animate={{ width: expandedView ? '25%' : `${defaultSize}%` }}
    //   transition={dragging ? { duration: 0 } : {
    //     type: 'spring',
    //     stiffness: 300,
    //     damping: 20
    //   }}
    //   className='bg-red-600 rounded-lg p-2 m-1'
    // >
    <div>
      <Router hook={useHashLocation}>
        <Link to='#settings'>
          <button>settings</button>
        </Link>
        <Link to='#add-new'>
          <button>add new</button>
        </Link>
        <br />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path='settings' component={Settings} />
            <Route path='add-new' component={AddNew} />
            <Route> 404: No such page! </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  )
}

export default SidePanel
