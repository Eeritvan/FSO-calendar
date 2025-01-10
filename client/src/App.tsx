import SidePanel from './components/sidePanel'
import MainView from './components/mainView'
import Login from './components/authentication/login'
import Split from 'react-split'
import usePanelSizeSlice from './store/panelSizeStore'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useQuery } from '@tanstack/react-query'
import { Switch, Route, Redirect } from 'wouter'

const App = () => {
  const { getItem } = useLocalStorage('user-info')

  const {
    defaultSize,
    expandedView,
    setDefaultSize,
    setIsDragging
  } = usePanelSizeSlice()

  const { data: token } = useQuery({
    queryKey: ['token'],
    refetchOnWindowFocus: false,
    queryFn: () => getItem()
  })

  return (
    <Switch>
      <Route path="/login">
        {token ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/">
        {!token ? <Redirect to="/login" /> : (
          <Split
            className="flex h-screen w-screen"
            gutterSize={5}
            sizes={[defaultSize, 100 - defaultSize]}
            minSize={[50, 300]}
            maxSize={[400, Infinity]}
            snapOffset={0}
            dragInterval={expandedView ? Infinity : 1}
            cursor={expandedView ? 'default' : 'col-resize'}
            onDragStart={() => !expandedView && setIsDragging(true)}
            onDragEnd={() => !expandedView && setIsDragging(false)}
            onDrag={(sizes) =>
              !expandedView && setDefaultSize(sizes[0])
            }
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
