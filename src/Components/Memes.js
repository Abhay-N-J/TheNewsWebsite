import {Component, } from "react";
import Memeitem from "./Memeitem";
import { Badge, Button, Spinner } from "react-bootstrap";
import axios from 'axios';
// import PropTypes from 'prop-types'

const Axios = axios.create({
    // baseURL: `https://the-news-website-server.onrender.com/`
    baseURL: 'http://localhost:5000'
  })

class Memes extends Component
{
    // static propTypes = {
    //     country : PropTypes.string,
    //     category : PropTypes.string,
    //     type: PropTypes.string
    // }

    constructor()
    {
        super()
        this.state = {
            isLoaded : false,
            items: [],
            error:false
        }
    }

    apiCall = async () => {
        this.setState({
            isLoaded: false
        })
        // let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.state.apiKey1}&page=${this.state.page + value}&pageSize=20`;
        // let body  = await axios.get(url);
        // console.log(body);
        
        const body = await Axios.get('/memes')
        console.log(body);
        // console.log(this.props.country);
        // console.log(this.props.head);
        return body;
    }

    async componentDidMount()
    {
        let body = await this.apiCall();
        // console.log(body);
        this.setState({
            isLoaded: true,
            items:body?.data?.body,
            // query: this.props.q === '' ? 'programming-humor' : this.props.q,
            error:body?.data?.error
        })
        this.props.onQuery(false)
        // console.log(body);
        // console.log(body);
    }

    refresh = async () => {
        let body = await this.apiCall();
        this.setState({
            isLoaded: true,
            items:body?.data?.body
        }) 
        // console.log(body.data.articles);
    }


    render()
    {
        if(this.state.error !== false) {
            return <h1><Badge>Page not available</Badge></h1> 
        }
        return(
            <div className="container pt-5">
                <h1>
                    <Badge className='m-3' bg="success">Memes</Badge>   
                    <Badge bg="danger" className="m-2">{this.props.q === '' ? '' : this.props.q}</Badge>
                    <Button disabled = {this.state.page <= 1} variant="dark" onClick={this.refresh}>Refresh &#x21bb;</Button> 
                    {/* <Badge bg='primary'>{ this.props.type !== 'head' ? '' : (this.props.country.length === 2 && (this.props.country.toUpperCase() !== this.props.country) ) ? Object.keys(countries).find(key => countries[key] === this.props.country) : this.props.country.charAt(0).toUpperCase() + this.props.country.slice(1) }</Badge> */}
                    <div hidden={this.state.totalPages !== 0}>
                        <Badge>Page not available</Badge> 
                    </div>
                </h1>
                <br/>
                <div className="row d-flex justify-content-around wrapper">
                {this.state.isLoaded ? this.state.items.map((ele) => {
                       if(ele.NSFW) return ""
                       else {
                        return (
                            <div className="col-md-4" key = {ele.url} style = {{ paddingBottom: '40px'}}>
                                <Memeitem 
                                    url = {ele.postLink}
                                    title = {ele.title}
                                    url_image = {ele.image}
                                    // description = {ele.subreddit}
                                /> 
                            </div>
                        ) 
                       }
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
            </div>
        )
    }
}

export default Memes