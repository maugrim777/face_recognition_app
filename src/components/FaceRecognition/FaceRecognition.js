import React from 'react';
import './FaceRecognition.css'
import Faces from '../test_faces'


const FaceRecognition = ({imageURL, box}) => {
    // console.log(box)
    // console.log(Object.values(box))
	return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imageURL} width='500px' height='auto' />
                {Object.entries(box).map(([key,value]) => {
                    return <Faces box={value} key={key} />;
                })}
                
            </div>
        </div>
	);
}

// const FaceRecognition = ({imageURL, box}) => {
// 	return (
//         <div className='center ma'>
//             <div className='absolute mt2'>
//                 <img id='inputImage' alt='' src={imageURL} width='500px' height='auto' />
//                 <Faces box={box} />
//                 {/* <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div> */}
              
//             </div>
//         </div>
// 	);
// }

export default FaceRecognition;