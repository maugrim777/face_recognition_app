import React from 'react';

const Rank = ({name, entries, faces}) => {
	return (
        <div>
            <div className='white f3'>                
                {`Hello, ${name}! Your current entries count is...`}
            </div>
            <div className='white f1'>
                {entries}
            </div>
            <div className='white f3'>                
                {`and you have detected a total of...`}
            </div>
            <div className='white f1'>
                {faces}
            </div>
            <div className='white f3'>                
                {"faces!"}
            </div>
        </div>
	);
}

export default Rank;