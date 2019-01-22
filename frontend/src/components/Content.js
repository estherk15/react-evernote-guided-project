import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';

/*
  Advice: If you cannot figure out how to get this component to work,
          move the div and renderContent up into NoteContainer and
          try to get it to work in the parent first.
          Then complete the rest of your app before attempting to
          refactor to get this Content component to work.
*/


class Content extends Component {

  componentDidMount

  renderContent = () => {
    // console.log(this.props)
    if (this.props.selectedEdit) {
      return <NoteEditor
                findNote={this.props.findNote}
                submittedNote={this.props.submittedNote}
                handleClickCancel={this.props.handleClickCancel}
                handleClickDelete={this.props.handleClickDelete}/>;
    } else if (this.props.selectedNoteId) {
      return <NoteViewer
                findNote={this.props.findNote}
                handleClickEdit={this.props.handleClickEdit}
                allTags={this.props.allTags}
                deleteTag={this.props.deleteTag}
                addTag={this.props.addTag}/>;
    } else {
      return <Instructions />;
    }
  }

  render() {
    return (
      <div className='master-detail-element detail'>
        {this.renderContent()}
      </div>
    );
  }
}

export default Content;
