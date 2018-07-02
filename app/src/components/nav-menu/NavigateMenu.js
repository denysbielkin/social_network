import React, {Component} from 'react'
import {NavLink} from 'react-router-dom';

class NavigateMenu extends Component {

    constructor(props) {
        super(props);

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
