import React, { Fragment } from 'react';

const NoteViewer = (props) => {

  return (
    <Fragment>
      <h2>{props.findNote.title}</h2>
      <p>{props.findNote.body}</p>
      <button onClick={props.handleClickEdit}>Edit</button>
    </Fragment>
  );
}

export default NoteViewer;
