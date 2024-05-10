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

// import { useEffect, useState } from 'react';
// import { uid } from 'uid';

// export default function Consumer() {
//   const [array, setArray] = useState([]);
//   const [history, setHistory] = useState([]);
//   const [pointer, setPointer] = useState(-1);

//   useEffect(() => {
//     console.log("array ", array);
//   }, [array])

//   useEffect(() => {
//     console.log("pointer ", pointer);
//   }, [pointer])

//   useEffect(() => {
//     console.log("history ", history);
//   }, [history])

//   console.log('================================================================');

//   const pushToArray = (value: any) => {
//     const newArray = [...array, value];
//     const newHistory = [...history.slice(0, pointer + 1), newArray];
//     console.log("newHistory = ", newHistory);

//     setArray(newArray);
//     setHistory(newHistory);
//     setPointer(pointer + 1);
//   };

//   const undo = () => {
//     if (pointer > 0) {
//       setPointer(pointer - 1);
//       setArray(history[pointer - 1]);
//     }

//     if (pointer === 0) {
//       setPointer(-1)
//       setArray([])
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
//       <button onClick={() => pushToArray(`${uid()}-New Value`)}>Push to Array</button>
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
