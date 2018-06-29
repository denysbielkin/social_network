
// /*import React, {Component} from 'react'
// import endPointsList from "../../common/endPointsList";
// import {Redirect} from 'react-router-dom';
//
// class NavigateMenu extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoggedIn:true
//         };
//         this.typesOfLiButton = [
//             'home',
//             'news',
//             'friends',
//             'search',
//             'settings'
//         ];
//         this.onSignOut=this.onSignOut.bind(this);
//     }
//     onSignOut() {
//         localStorage.removeItem('auth-tok');
//         this.setState({isLoggedIn: false});
//     }
//
//
//     isTokenGood() {
//         // const checkToken = await UsersDataRequests.isTokenExist(endPointsList.myPage);
//         const checkToken = localStorage.getItem('auth-tok');
//
//         if (checkToken) {
//
//             this.setState({isLoggedIn: true});
//
//         } else {
//             this.setState({isLoggedIn: false});
//
//         }
//
//     }
//
//
//
//
//
//
//     generateLiButtons() {
//
//         for (let i in this.typesOfLiButton) {
//             const li = `
//             <li class="menu-button-li">
//             <NavLink to="/${this.typesOfLiButton[i]}">
//                     <input type="button" class="menu-button btn btn-outline-secondary" id='menu-button-${this.typesOfLiButton[i]}'  value="${this.typesOfLiButton[i].toUpperCase()}" /></NavLink>
//
//             </li>`;
//
//
//             document.getElementById('nav-menu').innerHTML += li;
//
//         }
//         document.getElementById('nav-menu').innerHTML +=`<button id='sign-out-btn' class='btn btn-outline-danger' onClick='${this.onSignOut}'>Sign out</button>`
//     }
//     /*  navRedirect(path){
//            this.setState({isClicked:true, path});
//
//        }
//        deactivate(){
//            this.setState({...this.state,isClicked:false})
//        }
//        generateLiButtons() {
//
//            for (let i in this.typesOfLiButton) {
//                const valueOfLi = this.typesOfLiButton[i].toUpperCase();
//                const li = `
//                <li class="menu-button-li">
//
//                        <input type="button" onclick='${()=>{this.navRedirect(${this.typesOfLiButton[i]})}}' class="menu-button btn btn-outline-secondary" id='menu-button-${this.typesOfLiButton[i]}'  value='${valueOfLi}' />
//
//                </li>`;
//                document.getElementById('nav-menu').innerHTML += li;
//
//            }*/
//
// componentWillMount() {
//     this.isTokenGood();
// }
// componentDidMount() {
//     this.generateLiButtons();
// }
//
//
// render() {
//     if (!this.state.isLoggedIn) {
//
//         return (
//             <div>
//                 <Redirect to={endPointsList.signIn} />
//             </div>
//         )
//     }
//
//     return (
//
//         <div id='nav-menu-block'>
//
//
//             <ul id='nav-menu'>
//
//             </ul>
//
//
//         </div>
//
//     );
// }
//
//
// }
//
// export default NavigateMenu;*/
import React, {Component} from 'react'
import endPointsList from "../../common/endPointsList";
import {NavLink} from 'react-router-dom';


class NavigateMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true
        };
        this.typesOfLiButton = [
            'home',
            'news',
            'friends',
            'search',
            'settings'
        ];
    }
    generateLiButtons() {
        let allLinks= [];
        for (let i in this.typesOfLiButton) {
            const id = `menu-button-${this.typesOfLiButton[i]}`;
            const value = `${this.typesOfLiButton[i].toUpperCase()}`;
            const path = `/${this.typesOfLiButton[i]}`;
            allLinks.push(

            <NavLink to={path} key={i}>
                <li className='menu-button-li'>
                    <input type="button" className="menu-button btn btn-outline-secondary" id={id}  value={value} />
                </li>
            </NavLink>

            );

        }

        //allLinks.push(

        //);
        return (<div>{allLinks}</div>)

    }

    render() {
        return (
            <ul id='nav-menu'>
                {this.generateLiButtons()}
            </ul>
        );
    }


}

export default NavigateMenu;