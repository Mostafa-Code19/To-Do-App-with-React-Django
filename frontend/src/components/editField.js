import React, { Component } from 'react';
import axios from 'axios'


class EditField extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    editTaskSubmit = (e) => {
        e.preventDefault()
        const { editId } = this.props
        const updateToThis = e.target[0].value
        e.target[0].placeholder = e.target[0].value
        e.target[0].value = ''
        
        axios
          .get(`/db/todos/${editId}/`)
          .then ((res) => {
            const itemUpdated = {
              'task': updateToThis,
              'completed': res.data.completed
            }
    
            axios
              .put(`/db/todos/${editId}/`, itemUpdated)
              .then((res) => this.props.refreshList())
          })
    }

    render() { 
        return (
            <div className="editField">
                <h2>Edit Field</h2>
                <form onSubmit={(e) => {this.editTaskSubmit(e)}}>
                    <input placeholder={ this.props.editThis ? this.props.editThis : 'Click On Edit Button' } />
                    <button className="button button-purple"type='submit' >Edit</button>
                </form>
            </div>
        );
    }
}
 
export default EditField;