import {
  DndContext,
  DragEndEvent,
  useDroppable,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useItemContext } from "../Context";

import { Item } from "./Item";

type ListProps = {
  list: string[];
};

function _List(props: ListProps) {
  const { list } = props;

  const { setNodeRef } = useDroppable({ id: "list" });

  return (
    <div className="list" ref={setNodeRef}>
      {list.map((l) => (
        <Item key={l} title={l} />
      ))}
    </div>
  );
}

export function List() {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { items, update } = useItemContext();

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <_List list={items} />
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id as string);
      const newIndex = items.indexOf(over.id as string);

      update({ items: arrayMove(items, oldIndex, newIndex) });
    }
  }
}
