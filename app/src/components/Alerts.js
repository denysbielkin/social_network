import React, {Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import {Alert, Button} from 'react-bootstrap';
import {connect} from "react-redux";

class Alerts extends Component {
    constructor(props) {
        super(props);

        this.handleDismiss = this.handleDismiss.bind(this);
    }

    handleDismiss() {
        this.props.toggleAlert({show: false});
    }

    componentDidMount() {
        if (this.props.show) {
            this.props.toggleAlert({key:'show',value:true});
        }
    }

    render() {
        if (this.props.alert.show) {
            return (
                <Alert bsStyle={this.props.alert.type} id='myAlert'>
                    <h4>{this.props.alert.tittle}</h4>
                    <Button className='alertCloseBtn' onClick={this.handleDismiss}>X</Button>
                </Alert>
            );
        } else {
            return ''
        }
    }
}

const mapStateToProps = state => {
    return {
        alert: state.alert
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleAlert: (payload) => dispatch({
            type: 'TOGGLE_ALERT',
            payload
        })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alerts);
