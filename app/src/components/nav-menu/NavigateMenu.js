
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
            isClicked:false
        };
        this.typesOfLiButton = [
            'home',
            'news',
            'friends',
            'search',
            'settings'
        ]
    }

    // generateLiButtons() {
    //
    //     for (let i in this.typesOfLiButton) {
    //         const li = `
    //         <li class="menu-button-li">
    //         <NavLink to="/${this.typesOfLiButton[i]}">
    //                 <input type="button" class="menu-button btn btn-outline-secondary" id='menu-button-${this.typesOfLiButton[i]}'  value="${this.typesOfLiButton[i].toUpperCase()}" /></NavLink>
    //         </li>`;
    //         document.getElementById('nav-menu').innerHTML += li;
    //
    //     }

    //}

    //componentDidMount() {
        //this.generateLiButtons();
   // }

    render() {


        return (

            <div id='nav-menu-block'>


                <ul id='nav-menu'>

                    <li className="menu-button-li">
                                 <NavLink to={endPointsList.myPage}>
                                         <input type="button" className="menu-button btn btn-outline-secondary"   value='HOME' /></NavLink>
                                </li>`;
                    <li className="menu-button-li">
                        <NavLink to={endPointsList.news}>
                            <input type="button" className="menu-button btn btn-outline-secondary"   value='NEWS' /></NavLink>
                    </li>`;
                    <li className="menu-button-li">
                        <NavLink to={endPointsList.friends}>
                            <input type="button" className="menu-button btn btn-outline-secondary"   value='FRIENDS' /></NavLink>
                    </li>`;
                    <li className="menu-button-li">
                        <NavLink to={endPointsList.search}>
                            <input type="button" className="menu-button btn btn-outline-secondary"   value='SEARCH' /></NavLink>
                    </li>`;
                    <li className="menu-button-li">
                        <NavLink to={endPointsList.settings}>
                            <input type="button" className="menu-button btn btn-outline-secondary"   value='SETTINGS' /></NavLink>
                    </li>`;


                </ul>


            </div>

        );
    }


}

export default NavigateMenu;