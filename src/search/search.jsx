import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './search.css';


class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            val: ""
        }

    }


    render() {
        const railstyles = {
            backgroundColor: 'white',
            height: '50px',
            width: '900'
        }

        return (

            <div className="searcher">
                <input id="search-bar" type="text" placeholder="Search for a phone" style={railstyles}></input>
            </div>

        )
    }

}


export default Search;
