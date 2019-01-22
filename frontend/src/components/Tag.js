import React from 'react'

const Tag = (props) => {

  return(
    <span className='tag'>
      {props.tag.title}
      <span className="tag-delete" onClick={() => props.deleteTag(props.tag.id)}> X </span>
    </span>
  )

}

export default Tag
