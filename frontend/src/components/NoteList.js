import React from 'react';
import NoteItem from './NoteItem';

// const mapNotes = () => {
//   return props.notes.map(note => {
//     return <NoteItem />
//   })
// }
//
// const mapNotes = () => props.notes.map(note => <NoteItem />)

// const notes = props.notes.map(note => {
//   return <NoteItem key={note.id} note={note}/>
// })

// const notes = props.notes.map(note => <NoteItem />)

const NoteList = (props) => {
  return (
    <ul>
      { props.notes.map(note => {
        return <NoteItem key={note.id} note={note} selectNote={props.selectNote}/>
      }) }

    </ul>
  );
}

export default NoteList;
