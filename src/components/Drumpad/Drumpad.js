import React, { Component } from 'react';
import '../styles.css';


class Drumpad extends Component {
    constructor(props) {
        super(props);
        this.state = {};

    }


    componentDidMount() {
        document.addEventListener('keydown', this.handlekeypress)
    }
    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlekeypress)
    }


    handlekeypress = (event) => {
        if(!this.props.disabled){if (event.keyCode === this.props.keyCode) {
                    event.preventDefault()
                    const button = document.getElementById(this.props.id)
                    button.classList.add("drum-pad-active");
                    setTimeout(()=>button.classList.remove("drum-pad-active"), 100);
                    this.handleButtonClick()
                }}
    }



    handleButtonClick = () => {
    	        const display = this.props.id
    	        this.props.sendData(display)
    	
    	        const audio = document.getElementById(this.props.buttonKey)
    	        this.props.playAudio(audio)}



    render() {
        const { buttonKey, url, id, disabled } = this.props;

        return (
            <div id='button-pad' className="col-md-4 col-4 col-sm-4 px-1 py-2 text-center ">
		                        <button id={id} className='drum-pad' onClick={this.handleButtonClick} disabled={disabled}>{buttonKey}
			                        <audio className='clip' id={buttonKey} src={url}></audio>
		                        </button>
	                        </div>
        )
    }
}

export default Drumpad;