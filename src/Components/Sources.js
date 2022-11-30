import {Component, } from "react";
import Newsitem from "./Newsitem";
import { Badge, Button, Spinner } from "react-bootstrap";
import axios from 'axios';
import './Sources.css'
// import PropTypes from 'prop-types'

const Axios = axios.create({
    baseURL: `https://the-news-website-server.onrender.com/`
  })

class NewsContainerSources extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            isLoaded : false,
            items: [],
            page: 1,
            totalPages: 1,
            error:false,
            source: this.props.source
        }
    }

    apiCall = async (value) => {
        this.setState({
            isLoaded: false
        })
        // let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.state.apiKey1}&page=${this.state.page + value}&pageSize=20`;
        // let body  = await axios.get(url);
        // console.log(body);
        const body =  
            await Axios.get(`/sources`, { params : { query : this.props.q, sources:this.state.source, page: this.state.page + value }})

        return body;
    }
    
    async componentDidMount()
    {
        let body = await this.apiCall(0);
        // console.log(body);
        this.setState({
            isLoaded: true,
            items:body?.data?.body?.articles,
            totalPages: Math.ceil(body?.data?.body?.totalResults / 20),
            query: this.props.q,
            error:body?.data?.error
        })  
        this.props.onQuery(false)
        // console.log(body);
        // console.log(body);
    }

    prevPage = async () => {
        let body = await this.apiCall(-1);
        this.setState({
            page:this.state.page - 1,
            isLoaded: true,
            items:body?.data?.body?.articles,
        }) 
        // console.log(body.data.articles);
    }

    nextPage = async () => {
        let body = await this.apiCall(+1);
        this.setState({
            page:this.state.page + 1,
            isLoaded: true,
            items:body?.data?.body?.articles,
        })
        // console.log(body.data.articles);
    }

    handleSource = async e => {
        this.props.onQuery(false, e.target.name)
        this.setState({
            source:e.target.name
        }, async () => {
            let body = await this.apiCall(0, e.target.name);
            // console.log(body);
            this.setState({
                isLoaded: true,
                items:body?.data?.body?.articles,
                totalPages: Math.ceil(body?.data?.body?.totalResults / 20),
                query: this.props.q === '' ? 'bbc-news' : this.props.q,
                error:body?.data?.error
            })  
        })
        
    }
    

    render()
    {
        if(this.state.error !== false) {
            return this.state.error
        }
        return(
            <div className="container-fluid pt-5">
                <div className="row">
                    <div className="shadow-lg rounded p-3 mb-5 sidebar col-2 ">
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='bbc-news'>BBC-News</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='abc-news'>ABC News</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='axios'>Axios</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='business-insider'>Business Insider</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='al-jazeera-english'>Al Jazeera English</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='medical-news-today'>Medical News Today</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='mtv-news'>MTV News</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='national-geographic'>National Geographic</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='national-review'>National Review</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='nbc-news'>NBC News</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='news24'>News24</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='politico'>Politico</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='reddit-r-all'>Reddit/r/all</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='reuters'>Reuters</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='crypto-coins-news'>Crypto Coins News</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='espn'>ESPN</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='espn-cric-info'>ESPN Cric Info</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='financial-post'>Financial Post</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='focus'>Focus</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='fox-news'>Fox News</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='fox-sports'>Fox Sports</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='google-news'>Google News</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='google-news-in'>Google News (India)</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='the-hindu'>The Hindu</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='the-sport-bible'>The Sport Bible</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='the-times-of-india'>The Times of India</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='the-wall-street-journal'>The Wall Street Journal</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='the-washington-post'>The Washington Post</Button>
                    <Button className = 'mb-2' variant='dark' onClick = {this.handleSource} name='wired'>Wired</Button>
                    </div>
                    <div className="main col">
                        <h1>
                            <Badge className='m-3' bg="success">Top Headlines</Badge>   
                            <Badge className='m-3' bg="danger">{this.state.source === '' ? 'bbc-news' : this.state.source}</Badge>   
                            <Badge className='m-3' bg="primary">{this.props.q}</Badge>   
                            <div hidden={this.state.totalPages !== 0}>
                                <Badge>No News</Badge> 
                            </div>
                        </h1>
                        <br/>
                        <div className="row d-flex justify-content-around wrapper">
                        {this.state.isLoaded ? this.state.items.map((ele) => {
                                return (
                                    <div className="col-md-4" key = {ele.url} style = {{ paddingBottom: '40px'}}>
                                        <Newsitem 
                                            url = {ele.url}
                                            title = {ele.title}
                                            url_image = {ele.urlToImage}
                                            description = {ele.description}
                                            content = {ele.content}
                                        /> 
                                    </div>
                                )
                            }) : <div className="d-flex justify-content-around">
                                    <Button variant="primary" disabled>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            />
                                        Loading...
                                    </Button>
                            </div>
                            }
                        </div>
                        <div className = 'd-flex justify-content-around '>
                            <Button disabled = {this.state.page <= 1} variant="dark" onClick={this.prevPage}>&larr; Previous</Button> 
                            <Button disabled = {this.state.page >= this.state.totalPages } variant="dark" onClick={this.nextPage}>Next &rarr;</Button> 
                        </div>
                    </div>
                </div>    
            </div>
        )
    }
}

export default NewsContainerSources