import { useCallback, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";

import { useItemContext } from "../Context";

type ItemProps = {
  title: string;
};

export function Item(props: ItemProps) {
  const { title } = props;

  const { attributes, listeners, setNodeRef, transform, node, transition } =
    useSortable({
      id: title,
    });

  const style = transform
    ? {
        transform: `translate3d(0px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;

  const { items, selected, update } = useItemContext();

  const selectItem = useCallback(() => {
    update({ items, selected: title });
  }, [items, title]);

  const itemSelected = selected === title;

  useEffect(() => {
    if (node.current && itemSelected) {
      node.current.scrollIntoView(true);
    }
  }, [itemSelected, node.current]);

  return (
    <div
      onClick={selectItem}
      ref={setNodeRef}
      className={["item", itemSelected ? "selected" : ""].join(" ")}
      style={style}
    >
      <button
        type="button"
        {...listeners}
        {...attributes}
        className="change-order"
      ></button>
      <div className="thumbnail"> </div>
      <h4 className="item-title"> {title} </h4>
    </div>
  );
}
