import React, {Component} from 'react';
import NavigateMenu from './NavigateMenu';

class News extends Component{
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <div id='wrapper'>
                    <div id='settings-page-display-flex'>
                        <NavigateMenu/>
                            <div className='user-page-data-block'>
                                <img src="../../../../app/public/construction.jpg" alt="We are under construction"/>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default News;
