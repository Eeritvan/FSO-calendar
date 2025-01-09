import { Switch, Route, Link  } from 'wouter'
import Day from './Day'
import Week from './Week'
import Month from './Month'

const MainView = () => {
  return (
    <div className='bg-blue-600 rounded-lg p-2 m-1'>
      <Link to='/month'>
        <button>month</button>
        <br />
      </Link>
      <Link to='/week'>
        <button>week</button>
        <br />
      </Link>
      <Link to='/date'>
        <button>date</button>
        <br />
      </Link>
      <Switch>
        <Route path='/month/:year/:month' component={Month} />
        <Route path='/week/:year/:week' component={Week} />
        <Route path='/date/:year/:week/:day' component={Day} />
      </Switch>
    </div>
  )
}

export default MainView
