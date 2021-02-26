import React from 'react'
import {Input, Segment} from 'semantic-ui-react'
import styled from 'styled-components'

const SearchForm = ({searchTerm, searchChangeHandler}) => {
     return (
      <>
      <Background>
     <Segment textAlign="right" inverted color= "black">
     <Input icon='search' type="text" name="search" placeholder='Search Movies' value={searchTerm} onChange={searchChangeHandler} />
     </Segment>
     </Background>
     </>
     )
}

export default SearchForm

const Background= styled.div`
background-color: black;
`