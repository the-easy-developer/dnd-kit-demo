import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Header } from "./components/Header";
import { Content } from "./components/Content";

type ItemsContextType = {
  items: string[];
  selected: string;
};

type UpdateItemsContextType = {
  update: (obj: Partial<ItemsContextType>) => void;
};

const defaultItemsContext = {
  items: [],
  selected: "",
};

const ItemsContext = createContext<ItemsContextType & UpdateItemsContextType>({
  ...defaultItemsContext,
  update: () => undefined,
});

export default function Context() {
  const [itemsContext, setItemsContext] =
    useState<ItemsContextType>(defaultItemsContext);

  const update = useCallback(
    (obj: Partial<ItemsContextType>) => {
      setItemsContext({ ...itemsContext, ...obj });
    },
    [itemsContext]
  );

  const itemsContextValue = useMemo(
    () => ({ ...itemsContext, update }),
    [itemsContext, update]
  );

  useEffect(() => {
    setItemsContext({
      items: Array.from({ length: 10 }).map((_, i) => `Title ${i + 1}`),
      selected: "Title 1",
    });
  }, []);

  return (
    <ItemsContext value={itemsContextValue}>
      <Header />
      <Content />
    </ItemsContext>
  );
}

export function useItemContext() {
  return useContext(ItemsContext);
}
