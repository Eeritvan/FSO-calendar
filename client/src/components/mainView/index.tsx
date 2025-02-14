import { Switch, Route  } from 'wouter'
import Year from './Year'
import Week from './Week'
import Month from './Month'
import ViewSelector from './ViewSelector'

const MainView = () => {
  return (
    <div className='relative bg-blue-600 rounded-xl m-1'>
      <div className='relative overflow-y-auto h-full'>
        <Switch>
          <Route path='/year/:year' component={Year} />
          <Route path='/month/:year/:month' component={Month} />
          <Route path='/week/:year/:week' component={Week} />
        </Switch>
      </div>
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2'>
        <ViewSelector />
      </div>
    </div>
  )
}

export default MainView
