import React, {Component} from 'react'
// import { Field, reduxForm } from 'redux-form'
//
// class SignUpForm extends  Component {
//
//
//     render() {
//         return (
//             <form name='signUpForm'>
//                 <div>
//                     <label htmlFor='sign-up-firstName'>First Name</label>
//                     <Field name="firstName" id='sign-up-firstName'  component="input" type="text" placeholder="First Name"/>
//
//                 </div>
//                 <div>
//                     <label htmlFor='sign-up-lastName'>Last Name</label>
//                     <Field name="lastName" id='sign-up-lastName' component="input" type="text" placeholder="Last Name"/>
//                 </div>
//                 <div>
//                     <label htmlFor="sign-up-email">Email</label>
//                     <Field id='sign-up-email' name="email" component="input" type="email" placeholder="Email"/>
//                 </div>
//                 <div>
//                     <label>Gender</label>
//                     <div>
//                         <label htmlFor='sign-up-gender-male'><Field name="gender" id='sign-up-gender-male'  component="input" type="radio" value="male"/> Male</label>
//                         <label htmlFor='sign-up-gender-female'><Field name="gender" id='sign-up-gender-female' component="input" type="radio" value="female"/> Female</label>
//                     </div>
//                 </div>
//                 <div>
//                     <label htmlFor="sign-up-age">Age</label><Field type="number" id='sign-up-age' component="input" name='age'/>
//                 </div>
//                 <div>
//                     <button type="submit" >Submit</button>
//                 </div>
//             </form>
//         )
//     }
// }
//
// export default (reduxForm({form: 'signUpForm'   }))(SignUpForm);
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            gender: null,
            age: ''
        };

        this.firstNameHandleChange = this.firstNameHandleChange.bind(this);
        this.lastNameHandleChange = this.lastNameHandleChange.bind(this);
        this.emailHandleChange = this.emailHandleChange.bind(this);
        this.genderHandleChange = this.genderHandleChange.bind(this);
        this.ageHandleChange = this.ageHandleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    firstNameHandleChange(event) {
        this.setState({firstName: event.target.value});
    }

    lastNameHandleChange(event) {
        this.setState({lastName: event.target.value});
    }

    emailHandleChange(event) {
        this.setState({email: event.target.value});
    }

    genderHandleChange(event) {
        this.setState({gender: event.target.value});
        console.log(event.target.value)
    }

    ageHandleChange(event) {
        this.setState({age: event.target.value});
    }


    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.firstName);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor='sign-up-firstName'>
                        First name:
                        <input className='form-control' type="text" id='sign-up-firstName' value={this.state.firstName}
                               onChange={this.firstNameHandleChange}/>
                    </label>
                </div>
                <div>
                    <label htmlFor='sign-up-firstName'>
                        Last name:
                        <input className='form-control' type="text" id='sign-up-lastName' value={this.state.lastName}
                               onChange={this.lastNameHandleChange}/>
                    </label>
                </div>
                <div>
                    <label htmlFor='sign-up-firstName'>
                        Email:
                        <input className='form-control' type="email" id='sign-up-email' value={this.state.email}
                               onChange={this.emailHandleChange}/>
                    </label>
                </div>
                <div>
                    <div>Gender</div>
                    <div>
                        <label htmlFor='sign-up-gender-male'><input name="gender" id='sign-up-gender-male'
                                                                    onChange={this.genderHandleChange} type="radio"
                                                                    value="male"/> Male</label>
                        <label htmlFor='sign-up-gender-female'><input name="gender" id='sign-up-gender-female'
                                                                      onChange={this.genderHandleChange}
                                                                      type="radio" value="female"/> Female</label>
                    </div>
                </div>
                <div>
                    <label htmlFor='sign-up-firstName'>
                        Age:
                        <input className='form-control' type="number" id='sign-up-age' value={this.state.age}
                               onChange={this.ageHandleChange}/>
                    </label>
                </div>
                <div>
                    <input className='btn btn-primary' type="submit" value="Submit"/>
                </div>
            </form>
        );
    }
}

export default SignUpForm
