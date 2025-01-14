import { useCallback, useState } from 'react'
import Event from './event'
import { closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  restrictToVerticalAxis,
  restrictToParentElement
} from '@dnd-kit/modifiers'
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable'

interface TodoItem {
  id: string;
  name: string;
}

const Events = () => {
  const [events, setEvents] = useState<TodoItem[]>([
    { id: 'todo1', name: 'Todo 1' },
    { id: 'todo2', name: 'Todo 2' },
    { id: 'todo3', name: 'Todo 3' }
  ])

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5
      }
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setEvents((events) => {
        const oldIndex = events.findIndex(item => item.id === active.id)
        const newIndex = events.findIndex(item => item.id === over.id)
        return arrayMove(events, oldIndex, newIndex)
      })
    }
  }, [])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <div className='h-80 overflow-y-auto bg-orange-300'>
        <SortableContext items={events} strategy={verticalListSortingStrategy}>
          {events.map((item) =>
            <Event key={item.id} id={item.id} name={item.name}/>)
          }
        </SortableContext>
      </div>
    </DndContext>
  )
}

export default Events
