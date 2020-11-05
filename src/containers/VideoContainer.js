import React, { useEffect } from 'react';
import VideoPlayer from '../components/VideoPlayer.js';
import {Segment, Input} from 'semantic-ui-react'



let api_key = process.env.REACT_APP_YT_API_KEY
class VideoContainer extends React.Component {


     state = {
      
          searchTerm: "",
          videoList: [],
          videoPick: ""

     }



     searchYoutube() {
          fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${this.state.searchTerm}&key=${api_key}`, {
               method: "GET",
               header: 'Accept: application/json'
          })
               .then(resp => resp.json())
               .then(data => {
                    this.setState({videoList: data.items})
               })
     }


   


     searchChange = (e) => {
          this.setState({ searchTerm: e.target.value })
     }

     keyDown = (e) => {
          if (e.keyCode === 13) {
         
               this.searchYoutube()


          }
     }


     chooseVideo = (item) => {
        this.setState({videoPick: item.id.videoId})
     } 



     render() {
          return (
               <>
                    <p>hello</p>

                    <Segment textAlign="right" inverted color="black">
                         <Input icon='search' type="text" name="search" placeholder='Search Videos' onKeyDown={this.keyDown} value={this.state.searchTerm} onChange={this.searchChange} />
                    </Segment>
                    {/* <VideoSearch searchChange={this.searchChange} searchTerm={this.state.searchTerm} keyDown={this.keyDown}/> */}
                    <VideoPlayer videoPick={this.state.videoPick}/>

<div>
     <>
            {/* {this.state.videoList &&
              (this.state.videoList.length === 0
             ? <p>No results</p>
             : ( */}
            
                 {this.state.videoList.map(item => (
                   <ul key={item.id.videoId}>
                     <div>
                       <b onClick={() => this.chooseVideo(item)}>{item.snippet.title}</b>
                     
                     </div>
                     <img  alt="" src={item.snippet.thumbnails.default.url}/>
                     </ul>
                    
                 ))}
                     </>
                   </div> 
                
     
           
         




               </>
          )
     }




     //     {videoList &&
     //       (videoList.length === 0
     //         ? <p>No results</p>
     //         : (
     //           <ul className="items">
     //             {videoList.map(item => (
     //               <li className="item" key={item.id}>
     //                 <div>
     //                   <b><a href={item.link}>{item.title}</a></b>
     //                   <p>{item.description}</p>
     //                 </div>
     //                 <ul className="meta">
     //                   <li>By: <a href={item.author.ref}>{item.author.name}</a></li>
     //                   <li>Views: {item.views}</li>
     //                   <li>Duration: {item.duration}</li>
     //                   <li>Uploaded: {item.uploaded_at}</li>
     //                 </ul>
     //                 <img alt="" src={item.thumbnail} />
     //               </li>
     //             ))}
     //           </ul>
     //         )
     //       )
     //     }
     //   </div>
     //      );
     //    }


}

export default VideoContainer
