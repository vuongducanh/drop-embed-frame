import { useDragDropElementContext } from '../../../../context/context';
import { ELEMENT_TYPE } from '../../../../utils/common';
import { ElementTypeData } from '../../../../utils/type';

interface Props {
  data?: ElementTypeData[] | [];
  mode?: 'VIEW' | 'EDIT'
}

export const ElementView: React.FC<Props> = ({
  data = [],
  mode = 'EDIT',
}) => {
  const { set } = useDragDropElementContext();

  const handleClickElement = (item: ElementTypeData) => {
    if (mode === 'VIEW') return;
    set('selectedElement', item)
    set('dataConfiging', item)
  }

  const handleClickButton = (data: ElementTypeData) => {
    if (mode === 'EDIT') return;

    if(data.props?.message) {
      alert(data.props?.message)
    }
  }

  return (
    <div>
      {Array.from(data).map((el: ElementTypeData) => (
        <div key={el.id} onClick={() => handleClickElement(el)}>
          {el.elementType === ELEMENT_TYPE.BUTTON &&
            (
              <button onClick={() => handleClickButton(el)}>{el.props?.text}</button>
            )
          }

          {el.elementType === ELEMENT_TYPE.PARAGRAPH &&
            (
              <p>{el.props?.text}</p>
            )
          }
        </div>
      ))}
    </div>
  )
}
