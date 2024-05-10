import { cloneDeep } from 'lodash';
import { useDragDropElementContext } from '../../../../context/context';
import './styles.scss'
import { useCallback } from 'react';

export default function Toolbar() {
  const {
    dataElementList,
    setDataElementList,
    pointerElementList,
    setPointerElementList,
    historyElementList,
    set,
    params,
    setHistoryElementList,
  } = useDragDropElementContext();

  const undo = () => {
    if (pointerElementList > 0) {
      setPointerElementList(pointerElementList - 1);
      setDataElementList(historyElementList[pointerElementList - 1] as any);
    }

    if (pointerElementList === 0) {
      setPointerElementList(-1)
      setDataElementList([])
    }
  };

  const redo = () => {
    if (pointerElementList < historyElementList.length - 1) {
      setPointerElementList(pointerElementList + 1);
      setDataElementList(historyElementList[pointerElementList + 1] as any);
    }
  };

  const handleImport = () => {
    document.getElementById("importInput")?.click();
  }

  const handleChangeImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const jsonData = e.target.result;
      const frames = JSON.parse(jsonData);

      if (frames.data.length > 0) {
        pushDataImport([...frames.data])
      }
    }

    reader.readAsText(file as any);
  }

  const pushDataImport = (data: any) => {
    setDataElementList(data);
    setHistoryElementList([data]);
    setPointerElementList(0);
  }

  const handleExportData = () => {
    const dataExport = {
      data: params?.dataPreview
    }
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const dataTimeExport = `${day}-${month}-${year}-${hours}-${minutes}-${seconds}`;

    const jsonData = JSON.stringify(dataExport, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${dataTimeExport}-json-data.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const handleSaveData = () => {
    const cloneData = cloneDeep(dataElementList);
    set("dataPreview", cloneData);
    handleCancelEdit();
  }

  const handleGotoView = () => {
    localStorage.setItem("dataPreview", JSON.stringify(params?.dataPreview));
    window.open('/consumer', '_blank');
  }

  const handleCancelEdit = () => {
    set("selectedElement", undefined);
    set("dataConfiging", undefined);
  }

  const disableWhenEditting = useCallback(() => {
    return !!params?.selectedElement || !!params?.dataConfiging;
  }, [params?.selectedElement, params?.dataConfiging])

  return (
    <div className='toolbar' id='toolbar'>
      <button onClick={handleSaveData}>Save</button>
      <button onClick={undo} disabled={disableWhenEditting() || pointerElementList === -1 }>Undo</button>
      <button onClick={redo} disabled={disableWhenEditting() || pointerElementList === historyElementList.length - 1}>Redo</button>
      <button onClick={handleExportData} disabled={params?.dataPreview?.length === 0}>Export</button>
      <button onClick={handleImport}>Import</button>
      <button disabled={params?.dataPreview?.length === 0} onClick={handleGotoView}>View</button>
      {params?.selectedElement && <button onClick={handleCancelEdit}>Cancel Edit</button>}

      <input type="file" id="importInput" onChange={handleChangeImportData} style={{ display: "none" }}></input>
    </div>
  )
}
