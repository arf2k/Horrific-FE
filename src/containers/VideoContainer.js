import React from 'react'

function VideoContainer ()  {

     const searchYoutube(q) {

     }
     
     const api_key = process.env.REACT_APP_FAKE_API_KEY
     
     
     
     const [query, setQuery] = React.useState('European history');
     const [list, setList] = React.useState(null);
     const search = (e) => {
       e.preventDefault();
       searchYouTube(query).then(setList);
     };
     return (
       <div className="app">
         <form onSubmit={search}>
           <input autoFocus value={query} onChange={e => setQuery(e.target.value)} />
           <button>Search YouTube</button>
         </form>
         {list &&
           (list.length === 0
             ? <p>No results</p>
             : (
               <ul className="items">
                 {list.map(item => (
                   <li className="item" key={item.id}>
                     <div>
                       <b><a href={item.link}>{item.title}</a></b>
                       <p>{item.description}</p>
                     </div>
                     <ul className="meta">
                       <li>By: <a href={item.author.ref}>{item.author.name}</a></li>
                       <li>Views: {item.views}</li>
                       <li>Duration: {item.duration}</li>
                       <li>Uploaded: {item.uploaded_at}</li>
                     </ul>
                     <img alt="" src={item.thumbnail} />
                   </li>
                 ))}
               </ul>
             )
           )
         }
       </div>
     );
   }




export default VideoContainer
