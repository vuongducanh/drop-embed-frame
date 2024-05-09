
import React, { useState } from 'react';
import './styles.scss'
import { useDragDropElementContext } from '../../../../context/context';
import { ElementView } from '../ElementView';
import cx from 'classnames';
import { ElementTypeData } from '../../../../utils/type';
import InfoDrag from '../InfoDrag';

export default function TargetDrop() {
  const {
    setDataElementList,
    dataElementList,
    params,
    set,
    pointerElementList,
    setPointerElementList,
    historyElementList,
    setHistoryElementList,
  } = useDragDropElementContext();

  const [mouseClientX, setMouseClientX] = useState<number>(0);
  const [mouseClientY, setMouseClientY] = useState<number>(0);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    handleMouseMoveAndDragOver(e.clientX, e.clientY)
    e.preventDefault();
    set("draging", true);
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    set("draging", false);
  }


  const handleDropEvent = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const dataTransferElement = e.dataTransfer.getData("dataTransferElement");
    const parseDataTransferElement = dataTransferElement ? JSON.parse(dataTransferElement) : '';

    if (parseDataTransferElement) {
      const data = {
        id: parseDataTransferElement.id,
        elementType: parseDataTransferElement.elementType,
        props: {
          text: parseDataTransferElement.props?.text,
        }
      }

      pushToArrayData(data);

      // const newArray = [...dataElementList, data]
      // const newHistory = [...historyElementList.slice(0, pointerElementList + 1), newArray];
      // setDataElementList(newArray);
      // setHistoryElementList([...newHistory] as any)
      // setPointerElementList(pointerElementList + 1)
    }
  };

  const pushToArrayData = (data: ElementTypeData) => {
    const newArray = [...dataElementList, data]
    const newHistory = [...historyElementList.slice(0, pointerElementList + 1), newArray];

    setDataElementList(newArray);
    setHistoryElementList([...newHistory] as any)
    setPointerElementList(pointerElementList + 1)
  }

  const handleEventMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMouseMoveAndDragOver(e.clientX, e.clientY)
  }

  const handleMouseMoveAndDragOver = (x: number, y: number) => {
    const frames = document.getElementById("frames");
    const framesClientWidth = frames ? frames?.clientWidth : 0

    setMouseClientX(x - framesClientWidth)
    setMouseClientY(y - (60 - 1)) // 60 is height of tooolbar, 1 is 1px border of tooolbar
  }

  return (
    <div
      className={cx('drop', params?.draging && 'draging-active')}
      id='target'
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onMouseMove={handleEventMouseMove}
      onDrop={handleDropEvent}>

      <div className='wrap-content-drag'>
        <InfoDrag mouseX={mouseClientX} mouseY={mouseClientY} />
        <ElementView data={dataElementList} />
      </div>
    </div>
  )
}
