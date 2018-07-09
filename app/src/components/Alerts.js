import React, {Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import {Alert, Button} from 'react-bootstrap'

class Alerts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        };
        this.handleDismiss = this.handleDismiss.bind(this);
    }

    handleDismiss() {
        this.setState({show: false});
    }

    componentDidMount() {
        if (this.props.show) {
            this.setState({show: true});
        }
    }

    render() {
        if (this.state.show) {
            return (
                <Alert bsStyle={this.props.type} id='myAlert'>
                    <h4>{this.props.tittle}</h4>
                    <p>
                        {this.props.message}
                    </p>
                    <Button className='alertCloseBtn' onClick={this.handleDismiss}>X</Button>
                </Alert>
            );
        } else {
            return <div></div>
        }
    }
}

export default Alerts;
