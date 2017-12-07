import React, { Component } from 'react';
import  Button  from './myui/button/index';
import './App.css';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      iconLoading: false
    };
  }

  toggleLoading = () => {
    this.setState({ loading: true });
    
    setTimeout(
      ()=>(this.setState({loading:false}))
      , 2000)
  }


  render() {
    return (
      <div className="App">
        <Button type="primary">button1</Button>
        <Button type="dashed">button2</Button>
      </div>
    );
  }
}

export default App;


