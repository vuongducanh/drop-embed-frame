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

// import { useState } from 'react';

// export default function Consumer() {
//   const [array, setArray] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [pointer, setPointer] = useState(-1);

//   console.log("pointer = ", pointer);

//   const pushToArray = (value) => {
//     const newArray = [...array, value];
//     const newHistory = [...history.slice(0, pointer + 1), newArray];
//     setArray(newArray);
//     setHistory(newHistory);
//     setPointer(pointer + 1);
//   };

//   const undo = () => {
//     if (pointer > 0) {
//       setPointer(pointer - 1);
//       setArray(history[pointer - 1]);
//     }
//   };

//   const redo = () => {
//     if (pointer < history.length - 1) {
//       setPointer(pointer + 1);
//       setArray(history[pointer + 1]);
//     }
//   };

//   return (
//     <div>
//       <button onClick={() => pushToArray('New Value')}>Push to Array</button>
//       <button onClick={undo}>Undo</button>
//       <button onClick={redo}>Redo</button>
//       <ul>
//         {array.map((item, index) => (
//           <li key={index}>{item}{index}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
