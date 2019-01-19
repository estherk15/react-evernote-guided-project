import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

const noteAPI = 'http://localhost:3000/api/v1/notes'

class NoteContainer extends Component {
  state={
    notes: [],
    selectedNoteId: null,
    selectedEdit: false,
    searchInput: ""
    //you never want to set a state to an empty object, always use null
  }

  //set state to an id so that you're saving the information of which note you saved but not as a reference.
  selectNote = (id) => {
    this.setState({
      selectedNoteId: id,
      selectedEdit: false //no matter what if you click on a note, the selectedEdit will be false so that if you click a note while editing a note, it will display the note you clicked on.
    })
  }
  //this function will use the state.selectedNoteId to find the selected note from the state.note. there's no duplication of information, there's a single source
  findNote = () => {
    return this.state.notes.find(note => note.id === this.state.selectedNoteId)
  }

  postNewNote = () => {
    const defaultNote = {title: 'Title', body: 'Write a new note'}
    fetch(noteAPI, {
      method: 'POST',
      body: JSON.stringify(defaultNote),
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(r => r.json())
      .then(newNote => {
        this.setState({
          notes: [...this.state.notes, newNote]
        })
      })
  }//postNewNote()

  handleClickEdit = () => {
    //when I click edit on any note, the selectedEdit will trigger the conditional render of the NoteEditor Component
    this.setState({
      selectedEdit: true
    })
  }

  handleClickCancel = () => {
    this.setState({
      selectedEdit: false
    })
  }

  //search filter
  handleChange = (event) => {
    this.setState({
      searchInput: event.target.value
    })
  }

  filteredNotes = () => {
    return this.state.notes.filter(note => note.title.toLowerCase().includes(this.state.searchInput.toLowerCase()) || note.body.toLowerCase().includes(this.state.searchInput.toLowerCase()))
    // console.log(filteredNotes);
  }


  //When I submit the edit form, the updated fields are also updated to the state.
  submittedNote = (title, body) => { //update the notesList with the newly edited note.
    const updatedNote = {title: title, body: body}

    fetch(`http://localhost:3000/api/v1/notes/${this.state.selectedNoteId}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedNote),
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(r => r.json())
      .then(updatedNote => {
        const copyNotes = [...this.state.notes]
        const findEditNote = this.findNote()
        const index = copyNotes.indexOf(findEditNote)
        copyNotes[index] = updatedNote
        this.setState({
          notes: copyNotes,
          selectedEdit: false
        })
      })
  }

  componentDidMount() {
    fetch(noteAPI)
      .then(r => r.json())
      .then(notes => {
        this.setState({
          notes: notes
        })
      })
  }

  render() {
    // console.log(this.state)
    return (
      <Fragment>
        <Search handleChange={this.handleChange} searchInput={this.state.searchInput}/>
        <div className='container'>
          <Sidebar
            notes={this.filteredNotes()}
            selectNote={this.selectNote}
            postNewNote={this.postNewNote}/>
          <Content
            findNote={this.findNote()}
            selectedNoteId={this.state.selectedNoteId}
            selectedEdit={this.state.selectedEdit}
            handleClickEdit={this.handleClickEdit}
            handleClickCancel={this.handleClickCancel}
            submittedNote={this.submittedNote}/>
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
