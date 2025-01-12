import { useEffect } from 'react'
import usePanelSizeSlice from '../../store/panelSizeStore'

const AddNew = () => {
  const { setExpandedView } = usePanelSizeSlice()

  useEffect(() => {
    setExpandedView(true)

    return () => {
      setExpandedView(false)
    }
  }, [setExpandedView])

  return (
    <div>
      testing
    </div>
  )
}

export default AddNew
