import React from 'react';
import {Segment, Input} from 'semantic-ui-react'

function VideoSearch(props) {
console.log(props.searchTerm)
return(
<Segment textAlign="right" inverted color= "black">
<Input icon='search' type="text" name="search" placeholder='Search Videos' value={props.searchTerm} onChange={props.searchChangeHandler} />
</Segment>
)



}
export default VideoSearch