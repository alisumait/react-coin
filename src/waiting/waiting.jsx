import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'rc-slider/assets/index.css';
import { Link, NavLink, Redirect, Prompt} from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Waiter from './waiting.gif'
import './waiting.css'
const utterance = new SpeechSynthesisUtterance();

class Waiting extends Component {

  constructor(props) {
    super(props);
    this.state = {
      end: false,
      process: false,
      titles: [],
      prices: []
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

  componentDidMount() {
    var that = this;
    setTimeout(
      function () {
        let formData = new FormData();
        formData.append('title', that.props.title);
        formData.append('budget', that.props.budget);
        formData.append('condition', that.props.condition);

            fetch('http://127.0.0.1:5000/', {
              method: "POST",
              body: formData
            }).then(d => {
                console.log(d)
                // that.props.onData({
                //   age: face.age,
                //   gender: face.gender.value,
                //   garments: person.garments.map(a => a.typeName),
                //   styles: person.styles.map(a => a.styleName)
                // })
              }
              );
              that.setState({
                process: true,
              end: true })
          }
        ,
      5000)
  }
    render() {

        if(this.state.end){
            return(
            <Redirect to="/items"></Redirect>
            )
        }

            return (
            <div>
                <img className="wait" src={Waiter}></img>
                    <span>In the works...</span>
            </div>
            )
    }

}

export default Waiting;
