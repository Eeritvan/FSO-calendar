import { Router } from 'wouter'
import SidePanel from './components/sidePanel'
import MainView from './components/mainView'
import Split from 'react-split'

const App = () => {
  return (
    <Router>
      <Split
        className="flex h-screen w-screen"
        direction="horizontal"
        gutterSize={5}
        sizes={[25, 75]}
      >
        <SidePanel />
        <MainView />
      </Split>
    </Router>
  )
}

export default App
