import SidePanel from './components/sidePanel'
import MainView from './components/mainView'
import Split from 'react-split'
import usePanelSizeSlice from './store/panelSizeStore'
import { useQuery } from '@tanstack/react-query'
import { loginMutation } from './graphql/mutations'

const App = () => {
  const {
    defaultSize,
    expandedView,
    setDefaultSize,
    setIsDragging
  } = usePanelSizeSlice()

  useQuery({
    queryKey: ['login'],
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const localToken = window.localStorage.getItem('user-token')
      if (!localToken) {
        const data = await loginMutation
          .send({ username: 'test', password: 'test' })
        localStorage.setItem('user-token', JSON.stringify(data))
      }
      return localToken
    }
  })

  return (
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
  )
}

export default App
