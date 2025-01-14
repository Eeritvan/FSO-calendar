import SidePanel from './components/sidePanel'
import MainView from './components/mainView'
import AuthTabs from './components/authentication/index'
import Split from 'react-split'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useQuery } from '@tanstack/react-query'
import { Switch, Route, Redirect } from 'wouter'

const App = () => {
  const { getItem } = useLocalStorage('user-info')

  const { data: token } = useQuery({
    queryKey: ['token'],
    refetchOnWindowFocus: false,
    queryFn: () => getItem()
  })

  return (
    <Switch>
      <Route path='/login'>
        {token ? <Redirect to='/' /> : <AuthTabs />}
      </Route>
      <Route path='/register'>
        {token ? <Redirect to='/' /> : <AuthTabs />}
      </Route>
      <Route>
        {!token ? <Redirect to='/login' /> : (
          <Split
            className='flex h-screen'
            gutterSize={5}
            sizes={[30, 100 - 30]}
            minSize={[50, 300]}
            maxSize={[400, Infinity]}
            snapOffset={0}
          >
            <SidePanel />
            <MainView />
          </Split>
        )}
      </Route>
    </Switch>
  )
}

export default App
