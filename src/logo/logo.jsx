import React, { Component } from 'react';
import './logo.css';
import logoimg from './logoimg.webp';


class Logo extends Component {
    
    
    render() {
            return (
            
                <div className="logo-wrapper">
                <img className="logo" src={logoimg}></img>
                </div>
                
            )
    }


}

export default Logo;
