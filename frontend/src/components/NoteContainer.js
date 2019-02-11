import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

const noteAPI = 'http://localhost:3000/api/v1/notes'

class NoteContainer extends Component {
  state={
    notes: [],
    tags: [],
    selectedNoteId: null,
    selectedEdit: false,
    searchInput: "",
    sorted: false
    //you never want to set a state to an empty object, always use null
  }

  //set state to an id so that you're saving the information of which note you saved but not as a reference.
  selectNote = (id) => {
    this.setState({
      selectedNoteId: id,
      selectedEdit: false
      //selectedEdit must always be set to false unless editing, otherwise, it will always show edit form
    })
  }

  findNote = () => {
    return this.state.notes.find(note => note.id === this.state.selectedNoteId)
    //this fn returns the note Object that matches the note id of whichever note we click on.
  }

  findTag = (id) => this.state.tags.find(tag => tag.id == id)

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

  sortNotes = () => {
    const currentFilteredNotes = this.filteredNotes()
    const copyNotes = [...this.state.notes]
    const sortedNotes = copyNotes.sort((a,b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : (b.title.toLowerCase() > a.title.toLowerCase() ? -1 : 0))
    console.log(sortedNotes);
    // return sortedNotes
  }

  handleClickEdit = () => {
    //the selectedEdit will trigger the conditional render of the NoteEditor Component
    this.setState({
      selectedEdit: true
    })
  }

  handleClickCancel = () => { //returns to note view
    this.setState({
      selectedEdit: false
    })
  }

  handleChange = (event) => {//search filter
    this.setState({
      searchInput: event.target.value
    })
  }

  handleClickDelete = () => {
    fetch(`http://localhost:3000/api/v1/notes/${this.state.selectedNoteId}`, {method: "DELETE"})
      .then(r => r.json())
      .then(result => {
        const filteredNotes = [...this.state.notes].filter(note => note.id !== this.state.selectedNoteId)
        this.setState({
          notes: filteredNotes,
          selectedNoteId: null,
          selectedEdit: false
        })
      })
  }

  filteredNotes = () => { //this becomes the new baseline for display since
    return this.state.notes.filter(note => note.title.toLowerCase().includes(this.state.searchInput.toLowerCase()) || note.body.toLowerCase().includes(this.state.searchInput.toLowerCase()))
    //Oh. my. goodness....
  }

  deleteTag = (id) => {
    const tag = this.findTag(id)
    const currentNote = this.findNote() //find the note we are currently looking at.
    const noteCopy = {...currentNote, tags:[...currentNote.tags]}
    noteCopy.tags.filter(tag => tag.id !== id) //this will only return tags that are not the tag we click delete for?


  }

  addTag = (event) => {
    //I have to add a tag to an existing note, I made copies so I wouldn't mutate state.
    const currentNote = this.findNote()
    const tagId = event.target.value
    const tag = this.findTag(tagId)
    const noteCopy = {...currentNote, tags:[...currentNote.tags, tag]} //this copies beyond the first level and also adds the new tag to the copy of the tags. This does not mutate the state.
    //I'm replacing the original note with the new note in the array of notes,
    const noteIndex = this.state.notes.findIndex(note => note === currentNote)
    const notesCopy = [...this.state.notes]
    notesCopy[noteIndex] = noteCopy //Don't be confused by this, I named this poorly. I'm saying within the copied array, at index [noteIndex], I want the value to equal the newly changed noteCopy.

    this.setState({notes: notesCopy})

    fetch(`http://localhost:3000/api/v1/notes/${currentNote.id}/updateTags`, { //this is a custom route you made in the backend
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({tag_id: tagId}) //tag_id has to match the rails object
    })
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

  componentDidMount() { //is this efficient? Two fetch requests in one function?
    fetch(noteAPI)
      .then(r => r.json())
      .then(notes => {
        this.setState({
          notes: notes
        })
      })

    fetch("http://localhost:3000/api/v1/tags")
      .then(r => r.json())
      .then(tags => {
        this.setState({
          tags: tags
        })
      })
  }

  render() {
    return (
      <Fragment>
        <Search
          handleChange={this.handleChange}
          searchInput={this.state.searchInput}/>
        <div className='container'>
          <Sidebar
            notes={this.filteredNotes()}
            selectNote={this.selectNote}
            postNewNote={this.postNewNote}
            sortNotes={this.sortNotes}
            />
          <Content
            findNote={this.findNote()}
            selectedNoteId={this.state.selectedNoteId}
            selectedEdit={this.state.selectedEdit}
            handleClickEdit={this.handleClickEdit}
            handleClickCancel={this.handleClickCancel}
            submittedNote={this.submittedNote}
            handleClickDelete={this.handleClickDelete}
            allTags={this.state.tags}
            deleteTag={this.deleteTag}
            addTag={this.addTag}/>
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;


//Add a delete feature for tags
//add React Routes
//Add a sort feature
//
