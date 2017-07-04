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
    ComponentDidMount() {
        this.setRoom();
    }

    // add a new room to firebase if one does not currently exist
    setRoom() {
        if(this.props.match.params.room) {
            var mainRef = firebase.database().ref();
            var newRef = mainRef.child(this.props.match.params.room);
            newRef.set('');
        }
    }

    render() {
        return (
        <div>
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
