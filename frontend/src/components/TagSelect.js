import React from 'react'

const TagSelect = (props) => {

  return(
    <select onChange={props.addTag}>
      <option>Add a Tag</option>
      {props.allTags.map(tag => {
        return <option key={tag.id} value={tag.id}>{tag.title}</option>
      })}
    </select>
  )

}

export default TagSelect

//props.map(tag => {
// return <option value={tag.id}>{tag.title}</option>
// })
