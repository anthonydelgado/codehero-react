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

const Counter = ({ value, setValue }) => (
    <div>
        <AceEditor
            mode="javascript"
            theme="ambiance"
            onChange={setValue}
            name="hackerid"
            height='100vw'
            width='100vw'
            value={value}
            editorProps={{$blockScrolling: true}}
        />
    </div>
)
export default connect((props, ref) => ({
    value: 'hackathon',
    setValue: value => ref('hackathon').set(value)
}))(Counter)
