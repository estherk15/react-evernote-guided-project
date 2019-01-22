import React, { Fragment } from 'react';
import TagList from './TagList'

class NoteViewer extends React.Component{

  render() {

    return (
      <Fragment>
        <h2>{this.props.findNote.title}</h2>
        <p>{this.props.findNote.body}</p>
        <TagList
          allTags={this.props.allTags}
          noteTags={this.props.findNote.tags} 
          deleteTag={this.props.deleteTag}
          addTag={this.props.addTag}/>
        <button onClick={this.props.handleClickEdit}>Edit</button>
      </Fragment>
    );
  }
}

export default NoteViewer;

// <TagSelect/>
