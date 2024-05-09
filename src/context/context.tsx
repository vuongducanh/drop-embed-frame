import { ReactNode, createContext, useContext, useState } from 'react';
import { useMap } from 'react-use';
import { ElementTypeData } from '../utils/type';
import { ELEMENT_TYPE } from '../utils/common';

export interface DragDropParams {
  draging?: boolean;
  selectedElement?: ElementTypeData | undefined;
  dataPreview?: ElementTypeData[];
  draggingElement?: ELEMENT_TYPE;
  dataConfiging: ElementTypeData | undefined;
}

interface SearchHeaderContextProp {
  dataElementList: ElementTypeData[];
  historyElementList: ElementTypeData[];
  setHistoryElementList: React.Dispatch<React.SetStateAction<ElementTypeData[]>>;
  pointerElementList: number; // theo dõi lịch sử người dùng trong lịch sử các hành động
  setPointerElementList: React.Dispatch<React.SetStateAction<number>>;

  setDataElementList: React.Dispatch<React.SetStateAction<ElementTypeData[]>>;
  params?: DragDropParams;
  set: <K extends keyof DragDropParams>(key: K, value: DragDropParams[K]) => void;
}

export const DragDropElementContext = createContext<SearchHeaderContextProp>({
  dataElementList: [],
  setDataElementList: () => {},
  historyElementList: [],
  setHistoryElementList: () => {},
  pointerElementList: 0,
  setPointerElementList: () => {},

  set: () => {},
  params: {
    draging: false,
    selectedElement: undefined,
    dataPreview: [],
    draggingElement: undefined,
    dataConfiging: undefined,
  },
})

export const useDragDropElementContext = () => useContext(DragDropElementContext);

const DragDropProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [dataElementList, setDataElementList] = useState<any>([]);

  const [historyElementList, setHistoryElementList] = useState<any>([]);
  const [pointerElementList, setPointerElementList] = useState<any>(-1);

  const [params, { set }] = useMap<DragDropParams>({
    draging: false,
    selectedElement: undefined,
    dataPreview: [],
    draggingElement: undefined,
    dataConfiging: undefined
  });

  return (
    <DragDropElementContext.Provider
      value={{
        dataElementList,
        setDataElementList,
        params,
        set,
        historyElementList,
        setHistoryElementList,
        pointerElementList,
        setPointerElementList,
      }}
    >
      {children}
    </DragDropElementContext.Provider>
  );
};

export default DragDropProvider;