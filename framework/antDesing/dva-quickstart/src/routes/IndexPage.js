import React from 'react';
//import { connect } from 'dva';
import style from './IndexPage.css';
import { Button } from 'antd';

class IndexPage extends React.Component {
  state = {
    loading: false,
    iconLoading: false,
  }
  
  enterLoading = () => {
    var _this = this;
    
    this.setState({ loading: true });
    
    
    fetch('./src/json/demo.tt')
    .then(function(response) {       
       console.log(response,response.json());
       return response.json();
    })
    .then(function  (json) {
      console.log('111');
      _this.setState({ loading: false });
    })

  }


  render(){
    return (
      <div className={style.d1}>
        <Button type="primary" loading={this.state.loading} onClick={this.enterLoading} size="large" >列表显示</Button>
      </div>
    )
  }
}

//function IndexPage() {
//  let state = {
//    "loading": false,
//    "iconLoading": false,
//  }
//  
//  const listIn = () => {
//    state.loading = true;
//   // _this.setState({ "loading": true })
////    setState{
////      "loading": false      
////    }
//  };
//
//  
//
//  return (
//    <div className={style.d1}>
//      <Button type="primary" loading={state.loading} size="large" >列表显示</Button>
//    </div>
//  );
//}


export default IndexPage;
