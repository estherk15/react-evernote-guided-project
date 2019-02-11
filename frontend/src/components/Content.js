import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';

class Content extends Component {
  //renderContent is conditional, depending on whether you've clicked edit or not, it will return either the NoteEditor or NoteView or Instructions component.
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
