import React from 'react'
import '../styles.css';

const Slider = (props) => {
    return (
        <div className="slidecontainer">
          <input type="range" min="0" max="1" step="0.01" onChange={props.volumeChange} value={props.volume} className="slider" id="volume" disabled={props.disabled}/>
        </div>
    )
}

export default Slider; 