import React from 'react'
import { Link } from 'react-router-dom'
import { Menu}  from 'semantic-ui-react'


class NavBar extends React.Component {

    state = {
         activeItem: 'home'
    }
    

    handleItemClick = (e, { name, value }) => {

     this.setState({ activeItem: name })
 
     }
    
     render() {

     const {activeItem} = this.state
       
               return(
                    
                    <div className='pusher'>
                        <div className='full height'>
                            <div className='toc'>
                                <Menu className='inverted vertical left fixed' pointing>
                                    {localStorage.token ? 
                                    <Menu.Item
                                        name='Logout'
                                        as={Link}
                                        to='/logout'
                                        onClick={this.props.logout}
                                        />
                                        :
                                        <>
                                        <Menu.Item
                                             name='Login'
                                             as={Link}
                                             to="/login"
                                             active={activeItem === 'Login'}
                                             onClick={this.handleItemClick}
                                             />

                                        <Menu.Item
                                             name='Signup'
                                             as={Link}
                                             to="/signup"
                                             active={activeItem === 'Signup'}
                                             onClick={this.handleItemClick}
                                             />
                                             </>
                                        }

                                             
                                             <Menu.Item
                                             name='Browse Movies'
                                             as={Link}
                                             to="/movies"
                                             active={activeItem === 'Browse Movies'}
                                             onClick={this.handleItemClick}
                                             />
                                         <Menu.Item
                                             name='My Movies'
                                             as={Link}
                                             to="/favorites"
                                             active={activeItem === 'My Gallery'}
                                             onClick={this.handleItemClick}
                                             />   
                                        <Menu.Item
                                             name='Community Videos'
                                             as={Link}
                                             to="/community_videos"
                                             active={activeItem === 'Community Videos'}
                                             onClick={this.handleItemClick}
                                             />   
                                        <Menu.Item
                                             name='Explore Videos'
                                             as={Link}
                                             to="/video_search"
                                             active={activeItem === 'Explore Videos'}
                                             onClick={this.handleItemClick}
                                             />   
                                        </Menu>

                                    </div>
                              </div>
                         </div>
                           
               )
     }

}


export default NavBar


