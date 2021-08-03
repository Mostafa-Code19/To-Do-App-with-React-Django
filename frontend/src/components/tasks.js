import React, { Component } from 'react';

class Tasks extends Component {
    constructor(props) {
      super(props);
      this.state = {
        removeSlide: false,
      }
    }
    
    render() { 
      return (
        <li className={`${this.state.removeSlide ? 'removeSlide' : ''}`} key={this.props.item.id} >
            <span style={{textDecoration: this.props.item.completed ? 'line-through' : ''}} onClick={() => this.props.onComplete(this.props.item)}>
            {this.props.item.task}
            </span>
            <div className="container__buttons">

            <button className='button' style = {{background: 'gray'}} onClick={
                () => this.props.editTask(this.props.item)
            }>Edit
            </button>

            <button className='button' style = {{background: 'rgb(194, 49, 30)'}} onClick={
                () => {
                    this.setState({removeSlide: true})
                    this.props.deleteTask(this.props.item)
            }}>✖
            </button>

            </div>
        </li>
      );
    }
  }
   
  export default Tasks;