import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Tasks from './tasks'
import EditField from './editField';
import axios from 'axios'

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [],
      addFieldShow: false,
      hideCompleted: '',
    }
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("/db/todos/")
      .then((res) => this.setState({ todoItems: res.data }))
      .catch((err) => console.log(err));
  };

  addNewTask = (e) => {
    e.preventDefault();
    const task = e.target[0].value
    const item = {
      'task': task,
      'completed': false
    }
    axios
      .post("/db/todos/", item)
      .then((res) => this.refreshList());
      
    e.target[0].value = ''
    e.target[1].value = ''
    this.setState({addFieldShow: false})
  }

  deleteTask = (item) => {
    setTimeout(() => {
      axios
        .delete(`/db/todos/${item.id}/`)
        .then((res) => this.refreshList());
    }, 1000)
  }

  addField = () => {
    return (
      <div className={`addField ${this.state.addFieldShow ? 'fadeIn' : 'fadeOut'}`}>
        <button className='addField__closeBtn' onClick={() => {this.setState({addFieldShow: false})}}>
          ❌
        </button>
        <h2>Add Field</h2>
        <form onSubmit={(e) => {
          this.addNewTask(e)
        }}>
          <input placeholder={'task'} />
          <button className='button button-purple' type='submit' >Add</button>
        </form>
      </div>
    )
  }

  editTask = (item) => {
    console.log(item)
    this.setState({editThis: item.task})
    this.setState({editId: item.id})
  }

  HideShowCompletedTask = () => {
    if (this.state.hideCompleted) {
      this.setState({hideCompleted: ''});
    } else {
      this.setState({hideCompleted: true})
    }
  }

  completeManager = () => {
    return (
      <div className='completeManager'>
        <button onClick={this.HideShowCompletedTask} className='button' style={this.state.hideCompleted ? {background: '#4a3ea9', color: 'white'} : {background: 'white', color: 'black'}}> Hide Completed </button>
      </div>
    )
  }

  setCompleted = (item) =>{
    axios
      .get(`/db/todos/${item.id}/`)
      .then ((res) => {
        const itemUpdated = {
          'task': res.data.task,
          'completed': res.data.completed ? false : true
        }

        axios
          .put(`/db/todos/${item.id}/`, itemUpdated)
          .then((res) => this.refreshList())
      })
  }

  render() {
    return (
      <React.Fragment>

        <h1>ToDo App</h1>
        <div className="container">
          <button onClick={() => {this.setState({addFieldShow: (this.state.addFieldShow ? false : true)})}} className='button addTask'>
            Add Task
          </button>
          <span className='taskCounter'>{this.state.todoItems.length}</span>
          {this.addField()}
          {this.completeManager()}
          <ul>
            {this.state.todoItems.length > 0 && (this.state.todoItems.filter(item => item.completed !== this.state.hideCompleted).map(item => (
              
              <Tasks
                item={item}
                editTask={this.editTask}
                deleteTask={this.deleteTask}
                onComplete={this.setCompleted}
              />

            )))}
          </ul>
        </div>

        <EditField
          editThis={this.state.editThis}
          editId={this.state.editId}
          refreshList={this.refreshList}
        />

      </React.Fragment>
    );
  }
}
 
export default Todo;

ReactDOM.render(
  <Todo />,
  document.getElementById('root')
);