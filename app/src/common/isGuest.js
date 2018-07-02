import React from 'react';
import endPointsList from "./endPointsList";
import {Redirect} from 'react-router-dom';

const isGuest = () => {
    const token = localStorage.getItem('auth-tok');
    const isTokenExist = !!token;
    if (isTokenExist) {
        return (
            <div>
                <Redirect to={endPointsList.myPage}/>
            </div>
        )
    } else {
        return false;
    }
};
export default isGuest;
