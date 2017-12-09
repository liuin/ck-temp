import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';


class Clock extends React.Component {

  //构造函数定义好属性
  constructor(props){
    super(props);
    this.state = {date: new Date()};    
  }

  //当组件输出到 DOM 后会执行
  componentDidMount() {  
    this.timerID = setInterval(
      ()=>this.tick(),1000
    )
  }

  //生命周期钩子中卸载计时器
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  //自定义一个方法函数
  tick() {
    //第一种形态直接变量赋值
    this.setState({
      date: new Date()
    });

    //第二种形态函数赋值,涉及到有变量操作的时候
    this.setState((prevState, props) => ({
      counter: prevState.counter + props.increment
    }))
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString() + ' ' + Math.random()}.</h2>
      </div>
    );
  }
}


class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}


function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}



function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}


function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}



class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;



    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}




class NameForm extends React.Component {

  //构造函数定义好属性 
  constructor(props){
    super(props);
    this.state = {
      value: 'coconut',
      isGoing:false,
      numberOfGuests:3

    };    

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleChange(event){
    this.setState({value:event.target.value})
  }

  handleSubmit(event){   
    alert(this.state.value);
    event.preventDefault();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(value);
    this.setState({
      [name]: value
    });
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name: <textarea type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <br />
        <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
        </select>
        <input type="submit"  value="提交" />
        {this.state.value}
        <br />

        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            value="isGoing-one"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
          <input
            name="isGoing"
            type="checkbox"
            value="isGoing-two"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>


      </form>
    );
  }
}

ReactDOM.render(
    <NameForm />,
    document.getElementById('root')
);

//ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(element, document.getElementById('root'));
//registerServiceWorker();


