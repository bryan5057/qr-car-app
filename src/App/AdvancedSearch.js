import React, { Component } from 'react';

function Menu(){
  return(
    <form htmlFor = "adv-car-choice">
      <label>Name</label>
      < input id = "adv-car-choice"
        name = "name"
        type = "text" / >
      <br/>
      <label>Location</label>
      < input id = "adv-car-choice"
        name = "location"
        type = "text" / >
      <br/>
      <label>Rating</label>
      < input id = "adv-car-choice"
        name = "rating"
        type = "number" 
        min = "0"
        max = "5"/ >
      <br/>
      <label>Color</label>
      < input id = "adv-car-choice"
        name = "color"
        type = "text" / >
    </form>
  )
}

class AdvancedSearch extends Component {
  constructor(props){
    super(props);
    this.state = {
      showMenu: false,
    }
    this.showMenu = this.showMenu.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  showMenu(e){
    e.preventDefault();

    const curMenu = this.state.showMenu;

    this.setState({showMenu:!curMenu,})
  }
  handleChange(e){
    const text = e.target.value;
    this.props.onChange(this.props.id, text);
  }
  renderMenu(){
    return(
      <form htmlFor = "adv-hotel-choice" >
        {this.props.choices}
      </form>
    )
  }
  render(){
    // const choices = this.props.fields.map(choice => (
    //   <label>{choice}</label>
    //   <input
    //     id={choice}
    //     onChange={this.handleChange}
    //     value={this.}
    // ))
    return(
      <div>
        <label style={{ fontSize: '12px', }}>Advanced Search</label>
        <button className="dropDownButton" onClick={this.showMenu}>>></button>
        {
          this.state.showMenu ? ( this.renderMenu ) : (null)
        }
      </div>
    )
  }
}

export default AdvancedSearch
