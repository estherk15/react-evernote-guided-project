import React, { Fragment } from 'react';
import TagList from './TagList'

class NoteViewer extends React.Component{
  state={
    tags: []
  }

  componentDidMount() {
    //insert fetch for the tags
  }

  render() {

    return (
      <Fragment>
        <h2>{this.props.findNote.title}</h2>
        <p>{this.props.findNote.body}</p>
        <button onClick={this.props.handleClickEdit}>Edit</button>
        <TagList tags={this.state.tags}/>
      </Fragment>
    );
  }
}

export default NoteViewer;
