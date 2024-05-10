import { ElementView } from '../admin/components/ElementView'
import './styles.scss';

const Consumer = () => {
  const data = localStorage.getItem('dataPreview');
  const parserData = data ? JSON.parse(data) : null;

  return (
    <div className='consumer'>
      {!parserData && <p>No data View</p>}

      {parserData && <ElementView mode='VIEW' data={parserData} />}
    </div>
  )
}

export default Consumer
