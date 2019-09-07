import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'rc-slider/assets/index.css';
import Item from "../item/item.jsx";
import data from "./result.json";
import $ from "jquery";
import './items.css';

const utterance = new SpeechSynthesisUtterance();

class Items extends Component {

    constructor(props) {
        super(props);

        var arr;

        this.state = {
            age: this.props.age,
            gender: this.props.gender,
            styles: this.props.styles,
            garments: this.props.garments,
            filtered: []
        }
    }

    speak(text) {
        const synth = window.speechSynthesis;
        utterance.text = text;
        synth.speak(utterance);
      }

      startConversation(sentence) {
        this.speak(sentence);
      }

      componentWillMount() {
        setTimeout(()=>this.startConversation('These are phones that might suit your budget'), 500)

      }

    componentDidMount() {
        var that = this;

                that.setState({
                    filtered: data.map((value, index) => {
                        return {
                            name: value.name,
                            price: value.price,
                            url: value.url
                        }
                    })
                });

    }

    render() {

        return (


                this.state.filtered.map((a,index)=>{
             return(
             <Item name={a.name}
                 price={a.price}
                 url={a.url}/>
             )
            })


        )
    }

}

export default Items;
