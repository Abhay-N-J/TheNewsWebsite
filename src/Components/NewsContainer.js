import {Component, } from "react";
import Newsitem from "./Newsitem";
import { Badge, Button, Spinner } from "react-bootstrap";
import axios from 'axios';
// import PropTypes from 'prop-types'

const Axios = axios.create({
    baseURL: `https://the-news-website-server.onrender.com/`
  })

const countries = {
    'Argentina': 'ar',
    'Australia': 'au',
    'Austria': 'at',
    'Belgium': 'be',
    'Brazil': 'br',
    'Britain':'gb',
    'Bulgaria': 'bg',
    'Canada': 'ca',
    'China': 'cn',
    'Colombia': 'co',
    'Cuba': 'cu',
    'Czech Republic': 'cz',
    'Egypt': 'eg',
    'France': 'fr',
    'Germany': 'de',
    'Greece': 'gr',
    'Hong Kong': 'hk',
    'Hungary': 'hu',
    'India': 'in',
    'Indonesia': 'id',
    'Ireland': 'ie',
    'Israel': 'il',
    'Italy': 'it',
    'Japan': 'jp',
    'Latvia': 'lv',
    'Lithuania': 'lt',
    'Malaysia': 'my',
    'Mexico': 'mx',
    'Morocco': 'ma',
    'Netherlands': 'nl',
    'New Zealand': 'nz',
    'Nigeria': 'ng',
    'Norway': 'no',
    'Philippines': 'ph',
    'Poland': 'pl',
    'Portugal': 'pt',
    'Romania': 'ro',
    'Russia': 'ru',
    'Saudi Arabia': 'sa',
    'Serbia': 'rs',
    'Singapore': 'sg',
    'Slovakia': 'sk',
    'Slovenia': 'si',
    'South Africa': 'za',
    'South Korea': 'kr',
    'Sweden': 'se',
    'Switzerland': 'ch',
    'Taiwan': 'tw',
    'Thailand': 'th',
    'Turkey': 'tr',
    'UAE': 'ae',
    'Ukraine': 'ua',
    'United Kingdom': 'gb',
    'United States': 'us',
    'US':'us',
    'UK':'gb',
    'Venuzuela': 've'
}

class NewsContainer extends Component
{
        static defaultProps = {
        country : 'United States',
        category : 'general',
        type: 'head',
        q: 'bbc-news'
    }

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
            page: 1,
            totalPages: 1,
            error:false
        }
    }

    apiCall = async (value) => {
        this.setState({
            isLoaded: false
        })
        // let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&country=${this.props.country}&apiKey=${this.state.apiKey1}&page=${this.state.page + value}&pageSize=20`;
        // let body  = await axios.get(url);
        // console.log(body);

        const country = (this.props.country.length === 2 && (this.props.country.toUpperCase() !== this.props.country) ) ? this.props.country : countries[`${this.props.country.charAt(0).toUpperCase() + this.props.country.slice(1)}`]
        
        const body = this.props.type === 'head'? 
            await Axios.get(`/${this.props.type}`, { params : { country: country, category: this.props.category, page: this.state.page + value }})
        : 
            await Axios.get(`/${this.props.type}`, { params : { query: this.props.q, page: this.state.page + value }})

        // console.log(this.props.country);
        // console.log(this.props.head);
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
            query: this.props.q === '' ? 'bbc-news' : this.props.q,
            error:body?.data?.error
        })  

        if(this.props.type === 'head') {
            this.props.onQuery(true)
        }
        else 
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

    render()
    {
        if(this.state.error !== false) {
            return this.state.error
        }
        return(
            <div className="container pt-5">
                <h1>
                    <Badge className='m-3' bg="success">Top Headlines</Badge>   
                    <Badge bg="danger" className="m-2">{this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}</Badge>
                    <Badge bg='primary'>{ this.props.type !== 'head' ? '' : (this.props.country.length === 2 && (this.props.country.toUpperCase() !== this.props.country) ) ? Object.keys(countries).find(key => countries[key] === this.props.country) : this.props.country.charAt(0).toUpperCase() + this.props.country.slice(1) }</Badge>
                    <div hidden={this.state.totalPages !== 0}>
                        <Badge>Country is wrong</Badge> 
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
        )
    }
}

export default NewsContainer