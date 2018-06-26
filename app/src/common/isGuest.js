import React from 'react';
import endPointsList from "./endPointsList";
import {Redirect} from 'react-router-dom';

const isGuest = () => {
    const token = localStorage.getItem('auth-tok');
    const isTokenExist = !!token;
    if (isTokenExist) {
        console.log('test');
        return (
            <div>
                <Redirect to={endPointsList.myPage}/>
            </div>
        )
    }else{
        console.log('good');
        return false;
    }
};
export default isGuest;