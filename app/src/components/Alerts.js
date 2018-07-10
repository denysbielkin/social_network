import React, {Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import {Alert, Button} from 'react-bootstrap';
import {connect} from "react-redux";

class Alerts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        };
        this.handleDismiss = this.handleDismiss.bind(this);
    }

    handleDismiss() {
        this.props.toggleAlert({key:'show',value:false})
        console.log(this.props.alert.show)
    }

    componentDidMount() {
        this.setState({show: true});
        if (this.props.alert.show) {
            this.props.toggleAlert({key:'show',value:true})
        }
    }

    render() {
        if (this.props.alert.show) {
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

const mapStateToProps = state => {
    return {
        alert: state
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
)(Alerts)
//export default Alerts;
