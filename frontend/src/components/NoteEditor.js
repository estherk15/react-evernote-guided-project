import React, { Component } from 'react';

class NoteEditor extends Component {

  state={
    title: this.props.findNote.title,
    body: this.props.findNote.body
  }

  handleChange = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmitEdit = (event) => {
    event.preventDefault()
    this.props.submittedNote(this.state.title, this.state.body)
    //I'm passing up current input in the forms to the submittedNote fn in NoteContainer.
  }

  render() {
    // console.log(this.state)
    return (
      <form className="note-editor" onSubmit={this.handleSubmitEdit}>
        <input
          type="text"
          name="title"
          value= {this.state.title}
          onChange={this.handleChange}/>
        <textarea
          name="body"
          value={this.state.body}
          onChange={this.handleChange}/>
        <div className="button-row">
          <input
            className="button"
            type="submit"
            value="Save" />
          <button type="button" onClick={this.props.handleClickCancel}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
