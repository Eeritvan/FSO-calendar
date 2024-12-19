import { useEffect } from 'react'
import { motion } from 'motion/react'
import usePanelSizeSlice from '../../store/panelSizeStore'

const addNew = () => {
  const { setExpandedView } = usePanelSizeSlice()

  useEffect(() => {
    setExpandedView(true)

    return () => {
      setExpandedView(false)
    }
  }, [])

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        testing
      </motion.button>
    </div>
  )
}

export default addNew
