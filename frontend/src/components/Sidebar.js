import React, { Component } from 'react';
import NoteList from './NoteList';

class Sidebar extends Component {
  render() {
    return (
      <div className='master-detail-element sidebar'>
        <button onClick={this.props.sortNotes}>Sort A-Z</button>
        <NoteList notes={this.props.notes} selectNote={this.props.selectNote}/>
        <button onClick={this.props.postNewNote}>New</button>
      </div>
    );
  }
}

export default Sidebar;

//button will get an onClick
