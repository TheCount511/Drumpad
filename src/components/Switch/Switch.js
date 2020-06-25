import React from 'react'
import '../styles.css';

const Switch =(props)=>{
	
	let poweroff
	    	const {power, name, run, disabled} = props

	if (props.power === false && props.name === 'Power' ){
		 poweroff = {backgroundColor: 'gray'}
	}

	return(
				<div id='switch-div'>
				<p>{name}</p>
				<label className="switch" style={poweroff}>
					<input id='switch' type="checkbox" onChange={run} checked={power} disabled={disabled}  />
					<span className="switch-slider"></span>
				</label>
				</div>
		)
}


export default Switch;