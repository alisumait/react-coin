import React, { Component } from 'react';
import './item.css';


class Item extends Component {


    render() {
            return (

                <div className="img-wrapper">
                    <div className="words">
                        <h1>{this.props.name}</h1>
                        <h4><p>RM</p>{this.props.price}</h4>
                        <a className="item" href={this.props.url}>Get the deal!</a>
                    </div>
                </div>

            )
    }


}

export default Item;
