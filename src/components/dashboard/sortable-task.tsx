import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableTaskProps {
  id: number;
  children: React.ReactNode;
}

export default function SortableTask({ id, children }: SortableTaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <ul ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </ul>
  );
}
