import { useItemContext } from "../Context";

export function Controls() {
  const { update, items, selected } = useItemContext();

  const handleNextPrevBtns = (i: 1 | -1) => {
    const currentIndex = items.findIndex((i) => i === selected);
    const newIndex = currentIndex + i;
    if (newIndex >= 0 && newIndex < items.length) {
      update({ selected: items[newIndex] });
    }
  };

  return (
    <div className="control-container">
      <button
        type="button"
        className="control first"
        onClick={() => update({ selected: items[0] })}
      ></button>
      <button
        type="button"
        className="control prev"
        onClick={() => handleNextPrevBtns(-1)}
      ></button>
      <button
        type="button"
        className="control next"
        onClick={() => handleNextPrevBtns(1)}
      ></button>
      <button
        type="button"
        className="control last"
        onClick={() => update({ selected: items[items.length - 1] })}
      ></button>
    </div>
  );
}
