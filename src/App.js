import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import StyledLink from './style';
import NewsContainer from './Components/NewsContainer';
import Home from './Components/Home';
import NavBar from './Components/Navbar';
import {Component} from 'react';
// import Login from '../server/login';
// import SideBar from './Components/Sidebar'
import { setToken, getToken } from './Login/useToken.js'
import Login from './Login/login';
import NewsContainerSources from './Components/Sources';
import Collection from './Components/UserCollection';
import Memes from './Components/Memes';

export class App extends Component {
  constructor() {
    super();
      this.state = {
          token:getToken(),
          head:true,
          country:'India',
          query:'',
          source:''
      }
    // console.log(getToken());
  }
  handleToken = userToken => {
    setToken(userToken);
    this.setState({
      token:getToken()
    })
  }

  logOut = () => {
    sessionStorage.clear()
    this.setState({
      token:false
    })
  }

  handleSearch = (nation, q) => {
    if(nation !== '') {
      this.setState({
        country:nation,
      })
      // console.log(this.state.country);

    }
    else if (q !== '') {
      this.setState({
        query:q
      })
    }
  }
  
  onQuery = (b, source='') => {
    this.setState({
      head:b,
      source: source
    })
    
  }

  render() {
    if(!this.state.token?.token || !this.state.token?.userid || this.state.token?.error ) {
      return <Login setToken = {this.handleToken}/>
    }
    return (
      <Router>
              <NavBar logOut = {this.logOut} handleSearch = {this.handleSearch} type= {this.state.head} />
              {/* <div style={{marginTop:'40px'}}>

              <SideBar/>
              </div> */}
        {/* <StyledLink to='/'>Home</StyledLink>
        <StyledLink to='/Comp'>Component</StyledLink> */}
              <Routes>
                    <Route exact path = '/' element = {<Home/>} />
                    <Route exact path = '/collection' element = {<Collection/>} />
                    <Route exact path = '/memes' element = {<Memes key = {this.state.query} q = {this.state.query} onQuery = {this.onQuery} />} />
                    <Route exact path = '/sources' element = {<NewsContainerSources key = {this.state.query} q = {this.state.query} onQuery = {this.onQuery} source = {this.state.source} /> } />
                    <Route exact path = '/login' element = {<Login setToken = {this.handle}/>} />
                    <Route exact path = '/everything' element = {<NewsContainer key = {this.state.query} type='everything' q = {this.state.query} onQuery = {this.onQuery} />} />
                    <Route exact path = '/head' element = {<NewsContainer key = {this.state.country} country = {this.state.country} category = 'general' onQuery = {this.onQuery} />} />
                    <Route exact path = '/head/business' element = {<NewsContainer key = {this.state.country} country = {this.state.country} category = 'business' onQuery = {this.onQuery} />} />
                    <Route exact path = '/head/tech' element = {<NewsContainer key = {this.state.country} country = {this.state.country} category = 'technology' onQuery = {this.onQuery} />} />
                    <Route exact path = '/head/entertainment' element = {<NewsContainer key = {this.state.country} country = {this.state.country} category = 'entertainment' onQuery = {this.onQuery} />} />
                    <Route exact path = '/head/sports' element = {<NewsContainer key = {this.state.country} country = {this.state.country} category = 'sports' onQuery = {this.onQuery} />} />
                    <Route exact path = '/head/health' element = {<NewsContainer key = {this.state.country} country = {this.state.country} category = 'health' onQuery = {this.onQuery} />} />
                    <Route exact path = '/head/sci' element = {<NewsContainer key = {this.state.country} country = {this.state.country} category = 'science' onQuery = {this.onQuery} />} />
              </Routes> 
      </Router>
    )
      
  }
}

export default App

