import { useItemContext } from "../Context";

import { Controls } from "./Controls";

export function ScreenContainer() {
  const { selected } = useItemContext();
  return (
    <div className="screen-container">
      <div className="screen"> </div>
      <div className="title-controls">
        <h2 className="screen-title"> {selected} </h2>
        <Controls />
      </div>
    </div>
  );
}
