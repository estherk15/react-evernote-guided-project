import React from 'react'
import Tag from './Tag'
import TagSelect from './TagSelect'

const TagList = (props) => {

  return(
    <div className="tag-container">
      {props.noteTags.map(tag => {
        return <Tag key={"tag"+tag.id} tag={tag} deleteTag={props.deleteTag}/>
      })}
      <TagSelect allTags={props.allTags} addTag={props.addTag}/>
    </div>
  )

}

export default TagList
