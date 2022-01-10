import React, { Component } from 'react';
import './App.css';


class App extends Component{
  state = { 
    maxNo: 3,
    boards: [ 
      { 
        brdno: 1, 
        brdwriter: '고현준', 
        brdtitle: '헥사곤 개못함', 
        brddate: new Date()
      }, 
      { 
        brdno: 2, 
        brdwriter: '이수민', 
        brdtitle: '개이쁨', 
        brddate: new Date() 
      } 
    ] 
  } 
  
  handleSaveData = (data) => {
    this.setState({
      boards: this.state.boards.concat({
        brdno: this.state.maxNo++,
        brddate: new Date(),
        ...data //a:b 로???
      })
    });
  }

  handleRemove = (brdno) => {
    this.setState({
      boards: this.state.boards.filter(row => row.brdno !== brdno)
    })
  }



  render() { 
    // js
    const { boards } = this.state;
    
    return ( //html
      <div>
        <BoardForm onSaveData={this.handleSaveData}/>
        <table border = "1">
          <tbody> 
            <tr align = "center"> 
              <td width = "50">No.</td> 
              <td width="300">Title</td> 
              <td width = "100">Name</td> 
              <td width="100">Date</td> 
            </tr>
            {
              boards.map(row => (<BoardItem key={row.brdno} row={row} />))
            }
          </tbody> 
        </table > 
      </div>
    ); 
  }
}

class BoardForm extends Component {
  state = {}

  handleChange = (e) => {
    this.setState({
      //e.target => 입력칸
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault(); //서버로 보낼 것이 아니기 때문에 중지
    this.props.onSaveData(this.state);
    this.setState({});
  }


  render() {
    const { states } = this.state;
    return (
      <div>
        <form onSubmit = {this.handleSubmit}>
          <input placeholder = "title" name = "brdtitle" onChange = {this.handleChange} />
          <input placeholder="name" name="brdwriter" onChange={this.handleChange} />
          <button type = "submit">Save</button>
        </form >
      </div>
      
    );
  }
}

class BoardItem extends React.Component {
  render() {
    return ( 
      <tr>
        <td>{this.props.row.brdno}</td> 
        <td>{this.props.row.brdtitle}</td> 
        <td>{this.props.row.brdwriter}</td> 
        <td>{this.props.row.brddate.toLocaleDateString('ko-KR')}</td> 
      </tr>
    ); 
  } 
}

export default App;
