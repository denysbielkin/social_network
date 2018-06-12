import React, {Component} from 'react';
import axios from 'axios';

class App extends Component {

    componentDidMount() {
        axios.get('http://localhost:3005/get-my-data').then(res => console.log(res.data));
    }

    render() {
        return (
            <div>
                <h1>Hello world!</h1>
            </div>
        );
    }
}


export default App;
