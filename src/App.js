import React, { Component } from 'react';
import './App.css';
import Switch from './components/Switch/Switch';
import Slider from './components/Slider/Slider';
import Drumpad from './components/Drumpad/Drumpad'

const bankOne = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
}, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
}, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
}, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
}, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
}, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
}, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
}, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
}, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
}];

const bankTwo = [{
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
}, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
}, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
}, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
}, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
}, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
}, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
}, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
}, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
}];

class App extends Component {
    constructor() {
        super();
        this.state = {
            checked: true,
            display: String.fromCharCode(160),
            bank: bankOne,
            disabled: false,
            volume: 0.40
        };
        this.getDisplay = this.getDisplay.bind(this);
        this.playSound = this.playSound.bind(this);
    }

    togglePower = (event) => {
        if (this.state.checked === true) {
            this.setState({ checked: false, disabled: true, display: String.fromCharCode(160) })
        } else {
            this.setState({ checked: true, disabled: false });
        }
    }

    switchBank = (event) => {
        if (this.state.bank === bankOne) {
            this.setState({ bank: bankTwo, display: 'Smooth Piano Kit' })
        } else {
            this.setState({ bank: bankOne, display: 'Heater' });
        }
    }

    volumeChange = (event) => {
        this.setState({ volume: event.target.value, display: `Volume: ${Math.round(event.target.value * 100)}` })
        setTimeout(() => this.clearDisplay(), 1000);
    }

    clearDisplay = () => {
        this.setState({ display: String.fromCharCode(160) })
    }
    
    getDisplay = (data) => {
        this.setState({ display: data })
    }

    playSound = (audio) => {
        audio.currentTime = 0
        const playPromise = audio.play()
        if (playPromise !== undefined) {
            playPromise
                .then(_ => {

                })
                .catch(error => {
                    // Auto-play was prevented
                    // Show paused UI.
                    console.log("playback prevented");
                });
        }
        audio.volume = this.state.volume;
    }


    render() {
        const { checked, volume, disabled, display, bank } = this.state;
        const { togglePower, volumeChange, switchBank, getDisplay, playSound } = this;
        const button = bank.map((item, index) => <Drumpad buttonKey={item.keyTrigger} url={item.url} sendData={getDisplay} keyCode={item.keyCode} id={item.id} key={`item${index}`} playAudio={playSound} disabled={disabled}/>)

        return (
            <div  className='container'>
                    <div id='drum-machine'className="row" >
                        <div className="col-md-7 px-4 py-4">
                            <div className='row text-center mx-n1 my-2'>
                                {button}
                            </div>
                        </div>
                        <div className="col-md-5 text-center m-auto ">
                                <Switch name={'Power'} run={togglePower} power={checked}/>
                                <Slider volumeChange={volumeChange} volume={volume} disabled={disabled}/>
                               <p id="display">{display}</p>
                                <Switch name={'Bank'} run={switchBank} disabled={disabled}/>
                        </div>
                    </div> 
            </div>
        )
    }
}

export default App;