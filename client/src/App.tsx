import SidePanel from './components/sidePanel'
import MainView from './components/mainView'
import Split from 'react-split'
import usePanelSizeSlice from './store/panelSizeStore'

const App = () => {
  const {
    defaultSize,
    expandedView,
    setDefaultSize,
    setIsDragging
  } = usePanelSizeSlice()

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
