import React, { Component } from 'react';
import logo from '../images/logo.svg';
import './App.css';
import AdvancedSearch from './AdvancedSearch'
import axios from 'axios';

function CarInput(props) {
  // render() {
  return (
    <form onSubmit={props.handleSubmit} id="car-form">
        <label htmlFor="car-choice">
          Please enter the name of a car that you are interested in:
        </label>
        {/* <p> */}
          < input id="car-choice" name="car" type="text"
          /*onChange = {
            props.handleChange
          }
          value = {
            props.text
          }*/
          />
          <button>
            Search
          </button>
        {/* </p> */}
      </form>
    );
  // }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      rating: '0',
      img: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to Quick Reaction</h1>
        </header>
        <CarInput text={this.state.text} /*handleChange={(e) => this.handleChange(e)}*/ handleSubmit={(e) => this.handleSubmit(e)}/>
        {/* <AdvancedSearch /> */}
        {
          this.state.img.length ? this.renderImages() : null
        }
      </div>
    );
  }
  renderImages(){
    return (
      <img src={this.state.img[1]} alt=":("/>
    )
  }
  handleChange(e){
    this.setState({text: e.target.value})
  }
  handleSubmit(e){
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data.get('car'));
    fetch('https://www.googleapis.com/customsearch/v1?q='+data.get('car')+'&searchType=image&size=medium&cx=013523228459583098939:dcw2-mrqkug&key=AIzaSyDe5hQO9eHd8BLyrms3wljArZfLBnb_Fzc')
      .then(res => res.json())
      .then((response)  => {
        const tempImg = []
        response.items.map(result => {
          tempImg.push(result.link);
        })
        this.setState({img: tempImg});
      })
      .catch(function (error) {
        console.log(error);
      });
    document.getElementById('car-form').reset();
  }
}

export default App;
