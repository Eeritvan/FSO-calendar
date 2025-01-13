import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface TodoItem {
  id: string;
  name: string;
}

const Event = ({ id, name }: TodoItem) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id,
    transition: { duration: 200, easing: 'cubic-bezier(0.25, 1, 0.5, 1)' }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return (
    <div
      key={name}
      ref={ setNodeRef }
      {...attributes}
      {...listeners}
      style={style}
      className='bg-red-400 h-20 rounded-xl m-2'
    >
      { name }
    </div>
  )
}

export default Event
