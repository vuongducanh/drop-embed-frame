
import { useEffect, useMemo, useState } from 'react';
import { useDragDropElementContext } from '../../../../context/context';
import './styles.scss';
import { ELEMENT_TYPE, renderTextTitle } from '../../../../utils/common';
import { cloneDeep } from 'lodash';
export default function EditElement() {
  const { params, dataElementList, setDataElementList, set } = useDragDropElementContext();
  const [valueTextInput, setValueTextInput] = useState('');
  const [valueMessageInput, setValueMessageInputt] = useState('');

  useEffect(() => {
    setValueTextInput('')
    setValueMessageInputt('')
  }, [params?.selectedElement])

  const selectedElement: any = useMemo(() => {
    return params?.selectedElement
  }, [params?.selectedElement]);

  const handleChangeInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValueTextInput(value);
    let foundIndexOfDataEdit = dataElementList.findIndex(x => x.id == selectedElement.id);
    let dataUpdate = dataElementList.find((el) => el.id == selectedElement.id) as any;
    let cloneData = cloneDeep(dataElementList);

    const data = {
      ...dataUpdate,
      props: {
        message: dataUpdate?.props?.message,
        text: value,
      }
    }

    set('dataConfiging', data);

    cloneData[foundIndexOfDataEdit] = data;

    setDataElementList([...cloneData])
  };

  const handleChangeInputMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setValueMessageInputt(value)
    let foundIndexOfDataEdit = dataElementList.findIndex(x => x.id == selectedElement.id);
    let dataUpdate = dataElementList.find((el) => el.id == selectedElement.id) as any

    const data = {
      ...dataUpdate,
      props: {
        message: value,
        text: dataUpdate?.props?.text,
      }
    }

    set('dataConfiging', data);

    dataElementList[foundIndexOfDataEdit] = data;

    setDataElementList([...dataElementList])
  }

  return (
    <div className='edit-element'>
      {params?.selectedElement && <div className='wrap-edit'>
        <div className='wrap-input'>
          <label className='label' htmlFor="input-text">
            {renderTextTitle(selectedElement.elementType)} text
          </label>
          <input className='input-text' type="text" id='input-text' value={valueTextInput} onChange={(e) => handleChangeInputText(e)} />
        </div>

        {selectedElement?.elementType === ELEMENT_TYPE.BUTTON && <div className='wrap-input'>
          <label className='label' htmlFor="alert-text-message">Alert Message</label>
          <input className='input-text' type="text" id='alert-text-message' value={valueMessageInput} onChange={handleChangeInputMessage} />
        </div>}
      </div>}
    </div>
  )
}
