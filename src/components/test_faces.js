import React from 'react';


const Faces = ({box}) => {

    return (
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
    );
}

export default Faces;