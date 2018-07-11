import React, {Component} from 'react';
import NavigateMenu from './NavigateMenu';
import UsersDataRequests from "../../common/UsersDataRequests";
import SearchResults from '../SearchResults'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            resultOfSearch: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        this.setState({...this.state, searchInput: event.target.value})
    }

    async handleClick() {
        if(!this.state.searchInput) {
            // todo: show modal with notification
            return;
        }
        const resultOfSearch = await UsersDataRequests.loadUsersForSearch(this.state.searchInput);
        const authorizedUserInfo = await UsersDataRequests.loadUserInfo();
        this.setState({...this.state, resultOfSearch});
        this.setState({...this.state, authorizedUserInfo})
    }

    render() {
        return (
            <div>
                <div id='wrapper'>
                    <div id='search-page'>
                        <div id='nav-menu-block'>
                            <NavigateMenu/>
                        </div>
                        <div id='search-page-result-block'>
                            <div id='search-page-search-block'>
                                <input type="text" id='search-page-search-input' onChange={this.handleChange}
                                       className='form-control'
                                />
                                <button id='search-page-search-button' onClick={this.handleClick}
                                        className='btn btn-secondary'>SEARCH
                                </button>
                            </div>
                            <div id='search-page-result-block-content'>
                                <SearchResults result={this.state.resultOfSearch} authorizedUserInfo={this.state.authorizedUserInfo}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;
