import Toolbar from './components/Toolbar'
import Frames from './components/Frames/index'
import './styles.scss'
import TargetDrop from './components/TargetDrop'
import EditElement from './components/EditElement'

export default function Admin() {
  return (
    <div className='drag-element'>
      <Toolbar/>

      <div className='content'>
        <Frames/>
        <div className='content-drop'>
          <TargetDrop/>
          <EditElement/>
        </div>
      </div>
    </div>
  )
}
