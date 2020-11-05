import React, { useEffect } from 'react'
import VideoPlayer from '../components/VideoPlayer.js'
import VideoSearch from '../components/VideoSearch.js'

let searchTerm = "horrormovie"
let api_key = process.env.REACT_APP_YT_API_KEY
class VideoContainer extends React.Component {


     state = {
          videoId: "",
          searchTerm: ""
     }



     componentDidMount() {
          fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${api_key}`, {
               method: "GET",
               header: 'Accept: application/json'
          })
               .then(resp => resp.json())
               .then(data => {
                    console.log(data)
               })
     }


     searchChangeHandler = (e) => {

          this.setState({searchTerm : e.target.value})
     }



     render() {


          return (
               <>
               <p>hello</p>
               <VideoSearch searchChangeHandler={this.searchChangeHandler} searchTerm={this.state.searchTerm}/>
               <VideoPlayer videoId={this.state.videoId}/>


</>
          )
     }

     // componentDidMount() {
     //      fetch(`https://youtube.googleapis.com/youtube/v3/search?q=${searchTerm}&key=${api_key}`, {
     //           method: "GET",
     //           header: 'Accept: application/json'
     //      })
     //           .then(resp => resp.json())
     //           .then(data => {
     //                this.setState({ videoId: data.items[3].id.videoId })
     //           })
     // }


     // const [query, setQuery] = React.useState('European history');
     // const [list, setList] = React.useState(null);
     // const search = (e) => {
     //   e.preventDefault();
     //   searchYouTube(query).then(setList);
     // };
     // return (
     //   <div className="app">
     //     <form onSubmit={search}>
     //       <input autoFocus value={query} onChange={e => setQuery(e.target.value)} />
     //       <button>Search YouTube</button>
     //     </form>
     //     {list &&
     //       (list.length === 0
     //         ? <p>No results</p>
     //         : (
     //           <ul className="items">
     //             {list.map(item => (
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
