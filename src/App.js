import React, { Component } from 'react';
import { Link, NavLink, Redirect, Prompt } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Fader from 'react-fader';
import Switch from 'react-router-transition-switch';
import Logo from './logo/logo.jsx';
import Pricer from './pricer/pricer.jsx';
import Waiting from "./waiting/waiting.jsx";
import Items from "./items/items.jsx";
import Search from "./search/search.jsx";
import Item from "./item/item.jsx";
import './App.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
const utterance = new SpeechSynthesisUtterance();

class App extends Component {
    constructor(props) {

        super(props);

        this.PricerDone = this.PricerDone.bind(this);
        this.handleDataPricer = this.handleDataPricer.bind(this);
        this.handleSpeech = this.handleSpeech.bind(this)
        this.search = this.search.bind(this);

        this.state = {
            value: 50,
            title: "",
            budget: [],
            condition: ""
        };

        this.pricerChild = React.createRef();
    }

    handleDataPricer(data){
        this.state.minPrice = parseInt(data[0]) ;
        this.state.maxPrice = parseInt(data[1]);
    }



    search(){
      let searchVal = document.getElementById("search-bar").value;
      let budgetStart = document.getElementsByClassName("rc-slider-handle-1")[0].getAttribute("aria-valuenow");
      let budgetEnd = document.getElementsByClassName("rc-slider-handle-2")[0].getAttribute("aria-valuenow");
      let condition = document.querySelector('input[name="condition"]:checked').value;

      this.setState({
        title: searchVal,
        budget: [budgetStart, budgetEnd],
        condition: condition
      })
    }

    startConversation(sentence) {
        this.speak(sentence);
        setTimeout(() => recognition.start(), 1000);
    }

    PricerDone() {
        this.startConversation('Now, shall we start?');
    }

    handleSpeech(r) {
        if (r.toLowerCase().includes('y')) {
            console.log('djdfhjsfdjkfaskk   ')
            this.setState({
                start: true

            });
            // this.pricerChild.current.sendData()
            console.log(this.state)
            console.log(this.pricerChild)
        } else {
            this.startConversation('Why not, we gotta go. Do you want to start?');
        }

    }

    componentWillMount() {
        recognition.addEventListener('result', (e) => {
            let last = e.results.length - 1;
            let lastResult = e.results[last][0]
            let text = lastResult.transcript;

            this.handleSpeech(text);
        })

        recognition.addEventListener('speechend', () => {
            recognition.stop();
        })

        recognition.addEventListener('error', (e) => {
            console.log(e)
        });
    }


  render() {

      let value = this.state.value;

    return (

        <Router>
        <Switch component={Fader}>

       <Route exact strict path="/" render={
                        () => {
                            if (this.state.start) {
                                return (
                                    <Redirect to="/start"></Redirect>
                                )
                            }
                            return (
                                <div className="main">
                                    <Logo></Logo>
                                    <Search />
                                    <Pricer ref={this.pricerChild} onPricerDone={this.PricerDone} onData={this.handleDataPricer}/>
                                    <form action="">
  <input type="radio" name="condition" value="used" checked/> Used Phone
  <input type="radio" name="condition" value="new"/> New Phone
  </form>

                                    <Link to="/processing"><input id="link-btn" type="button" className="btn btn-primary" value="Search" onClick={this.search}></input></Link>
                                </div>
                            )
                        }
                    } />
                    <Route exact strict path="/processing" render={
                        () => {
                            return (
                                 <Waiting title={this.state.title} budget={this.state.budget} condition={this.state.condition}></Waiting>
                             )
                        }
                    } />

<Route exact strict path="/items" render={
            ()=> {
            return(

    <Items age={this.state.age} gender={this.state.gender} styles={this.state.styles} garments={this.state.garments} minPrice={this.state.minPrice} maxPrice={this.state.maxPrice} />
            )
        }} />



        </Switch>
        </Router>

    );
  }
}

export default App;
