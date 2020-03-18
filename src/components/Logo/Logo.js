import React from 'react';
import Tilt from 'react-tilt';
import wolf from './wolf2.png';
import './Logo.css';

const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 175, width: 230 }} >
			 	<div className="Tilt-inner"> 
			 		<img alt = 'logo'src={wolf} style={{ height: 175, width: 170 }}/>
			 	</div>
			</Tilt>
		</div>
	);
};

export default Logo;