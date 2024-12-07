import { Router } from 'wouter'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import SidePanel from './components/sidePanel'
import MainView from './components/mainView'

const App = () => {
  return (
    <Router>
      <div className='flex h-screen w-screen'>
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel className='bg-red-600 rounded-lg p-2 m-1'>
            <SidePanel />
          </ResizablePanel>
          <ResizableHandle className='my-3 w-1 rounded-sm' withHandle/>
          <ResizablePanel className='bg-blue-600 rounded-lg p-2 m-1'>
            <MainView />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </Router>
  )
}

export default App