
import React from 'react';

import './styles.scss'
import { ELEMENT_TYPE } from '../../../../utils/common';
import { uid } from 'uid';
import { ElementTypeData } from '../../../../utils/type';
import { useDragDropElementContext } from '../../../../context/context';


export default function Frames() {
  const { set } = useDragDropElementContext();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, type: ELEMENT_TYPE) => {
    set("draggingElement", type);
    const titleElement = (e.target as HTMLDivElement).title as string;

    const dataTransfer: ElementTypeData = {
      elementType: type,
      id: uid(),
      props: {
        text: titleElement,
      }
    }

    e.dataTransfer.setData('dataTransferElement', JSON.stringify(dataTransfer))
  }

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    set("draging", false)
    set("draggingElement", undefined);
  }

  return (
    <div className='frames' id='frames'>
      <div className='square'
        draggable
        onDragEnd={handleDragEnd}
        onDragStart={(e) => handleDragStart(e, ELEMENT_TYPE.PARAGRAPH)}
        title='Paragraphs element'
      >
        Paragraph {'===>'}
      </div>

      <div className='square'
        onDragEnd={handleDragEnd}
        onDragStart={(e) => handleDragStart(e, ELEMENT_TYPE.BUTTON)}
        draggable title='Button Element'>
        Button {'===>'}
      </div>
    </div>
  )
}
