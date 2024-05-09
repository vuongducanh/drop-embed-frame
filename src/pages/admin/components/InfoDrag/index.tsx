import React from 'react';
import './styles.scss';
import { useDragDropElementContext } from '../../../../context/context';

interface Props {
  mouseX?: number
  mouseY?: number
  dragging?: string
  inrances?: number
}

const InfoDrag: React.FC<Props> = ({
  mouseX = 0,
  mouseY = 0,
}) => {

  const { params, dataElementList} = useDragDropElementContext();

  return (
    <div className='info-drag'>
      <p>Mouse: ({mouseX}, {mouseY}) </p>
      <p>Dragging: {params?.draggingElement}</p>
      <p>Intances: {dataElementList.length}</p>
      <p>Config: {params?.dataConfiging ? JSON.stringify(params?.dataConfiging) : ''}</p>
    </div>
  )
}

export default InfoDrag
