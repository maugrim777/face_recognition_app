import React from 'react';
import './FaceRecognition.css';
import Faces from '../Faces/Faces'


const FaceRecognition = ({imageURL, box}) => {
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

export default FaceRecognition;