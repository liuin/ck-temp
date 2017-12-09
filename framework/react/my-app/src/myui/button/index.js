import React from 'react';

class Button extends React.Component {

  //构造函数定义好属性 
  constructor(props){
    super(props);
    this.opts = {
      type: '',
      htmlType: 'button',
      icon: '',
      shape: '',
      size: '',
      onClick: '',
      onMouseUp: '',
      onMouseDown: '',
      loading:false,
      disabled: false,
      style: '',
      prefixCls: '',
      className: '',
      ghost: false
    }

    
    
    for (var i in props) {
      
      this.opts[i] = props[i];      
    }

    console.log(this.opts);
    
  }

  //当组件输出到 DOM 后会执行
  componentDidMount() {  
  }

  //生命周期钩子中卸载计时器
  componentWillUnmount() {
  }

  //自定义一个方法函数 setState可以更新状态
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
        <button type={this.opts.htmlType} className={'ant-btn' + ' ant-btn-' + this.opts.type}>{this.opts.children}</button>        
    );
  }
}

export default Button;