import React from 'react';
import './App.css';

import firebase from 'firebase'
import { connect } from 'react-firebase'

import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/ambiance';

import firebase_config_url from './config';

firebase.initializeApp({
    databaseURL: firebase_config_url
});

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numBackspaces: 0,
            wordsPerMin: 0,
            numTypedChars: 0,
            wordCount: 0,
            timer: 0
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        setTimeout(this.setRoom(), 7000);
        this.setTimer();
        this.interval_timer = '';
    }

    componentWillUnmount() {
        clearInterval(this.interval_timer);
    }

    // start the timer
    setTimer() {
        var that = this;
        var timer = 0;
        this.interval_timer = setInterval(function(){
            timer++;
            console.log('timer: ', timer);
            var wordCount = (that.state.numTypedChars / 5);
            var wpm = Math.round(wordCount / (timer / 60));
            that.setState({wordsPerMin: wpm});
            console.log('this.state.wordsPerMin: ', that.state.wordsPerMin);
        }, 1000);
    }

    // add a new room to firebase if one does not currently exist
    setRoom() {
        if (this.props.match.params.room) {
            var mainRef = firebase.database().ref();
            var newRef = mainRef.child(this.props.match.params.room);
            // only set the child ref to blank if it is a new room without any text in it
            if (newRef.child(this.props.match.params.room) === '') {
                newRef.set('');
            }
        }
    }

    handleChange(event) {
        console.log(event.keyCode);
        var keycode = event.keyCode;
        var valid =
            (keycode > 47 && keycode < 58)   || // number keys
            keycode === 32 || keycode === 13 || // spacebar & return key(s)
            (keycode > 64 && keycode < 91)   || // letter keys
            (keycode > 95 && keycode < 112)  || // numpad keys
            // (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
            (keycode > 218 && keycode < 223);   // [\]' (in order)

        if (valid) {
            this.setState({numTypedChars: this.state.numTypedChars + 1});
            console.log('this.numTypedChars : ', this.state.numTypedChars);
        }



        if (event.keyCode === 8) {
            this.setState({numBackspaces: this.state.numBackspaces + 1});
        }
        console.log('this.numBackspaces: ', this.state.numBackspaces);
    }

    render() {
        return (
        <div onKeyUp={this.handleChange}>
            <AceEditor
                mode="javascript"
                theme="ambiance"
                onChange={this.props.setValue}
                name="hackerid"
                height='100vw'
                width='100vw'
                value={this.props.value}
                editorProps={{$blockScrolling: true}}
            />
        </div>
        )
    }

}

export default connect((props, ref) => ({
    value: props.match.params.room,
    setValue: value => ref(props.match.params.room).set(value)
}))(Counter)
