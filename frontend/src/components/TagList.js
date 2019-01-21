import React from 'react'
import Tag from './Tag'

const TagList = (props) => {

  return(
    <div className="tag-container">
      {props.tags.map(tag => {
        return <Tag key={"tag"+tag.id} tag={tag} deleteTag={props.deleteTag}/>
      })}
      
    </div>
  )

}

export default TagList
