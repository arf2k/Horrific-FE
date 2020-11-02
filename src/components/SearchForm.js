import React from 'react'
import {Input, Segment} from 'semantic-ui-react'

function SearchForm(props) {
     return (
      <>
     <Segment textAlign="right">
     <Input icon='search' type="text" name="search" placeholder='Search Movies' value={props.searchTerm} onChange={props.searchChangeHandler} />
     </Segment>
     </>
     )
}

export default SearchForm