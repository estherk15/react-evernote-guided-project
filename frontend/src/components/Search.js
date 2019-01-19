import React from 'react';

const Search = (props) => {

  return (
    <div className="filter">
      <input
        id="search-bar"
        type="text"
        placeholder="Search Notes"
        value={props.searchInput}
        onChange={props.handleChange}
      />
    </div>
  );
}

export default Search;

    // onChange={this.inputSearch()}
