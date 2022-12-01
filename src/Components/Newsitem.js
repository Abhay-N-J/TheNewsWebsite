import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// import fetch from 'node-fetch';
import Loading from "../Assets/Eclipse-1s-200px.gif";
import NotImage from "../Assets/images.jpeg";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Styles from '../Login/snackbar.module.css'
import { Component, createRef, PureComponent } from 'react'
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { getToken } from '../Login/useToken'
// import { Modal } from 'react-bootstrap';


const Axios = axios.create({
  baseURL: `https://the-news-website-server.onrender.com/`
})
export class Newsitem extends Component {

  constructor() 
  {
    super();
    this.state = { 
      time: 0,
      open : false,
    }
    this.snackbarRef = createRef();

  }

  _showSnackbarHandler = (message) => {
    this.snackbarRef.current.openSnackBar(message);
  }

  componentDidMount() {
    setInterval(() => {
      if(this.state.time <= 10) {
        this.setState({
          time: this.state.time + 1
        }) 
      }
    }, 1000)
  }
  
  openModal = () => {
    this.setState({
     open:true
    })
  }

  closeModal = () => {
    this.setState({
      open:false
    })
  }
  
  save = async e => {
    e.stopPropagation()
    let {title, url_image, description, url, content } = this.props;
    // console.log(getToken());
    const body = {
      user:getToken().userid,
      title:title,
      url_image:url_image,
      url:url,
      description:description,
      content:content
    }
    // console.log(body);
    const response = await Axios.post('/save', body, { 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }      
    })
    console.log(response);
    this._showSnackbarHandler(response.data.error ? response.data.error : response.data.message)

  }

  render() {
    let {title, url_image, description, url, content } = this.props;
    // console.log(title);
    return (
          <>
            <Snackbar ref = {this.snackbarRef} />
            <Card className = 'card aling-items-center' onClick={this.openModal}>
              {/* <Card.Img variant="top" src= {url_image} alt = 'Image Not Available' height = '250px'/> */}
              <LazyLoadImage src = {url_image} width = '330px' height = '250px' alt='Image Not Available'  style={{"marginTop":"10px","borderRadius":"10px",marginLeft:"10px"}}
                        placeholderSrc={ this.state.time <= 10 ? Loading : NotImage } />
              <Card.Body>
                    <Card.Title >{title ? title.slice(0,60) + "..." : ""}</Card.Title>
                    <Card.Text >
                      {description ? description.slice(0,80)+"...":""}
                    </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item >{content ? content.slice(0,140) + "..." : ""}</ListGroup.Item>
                <ListGroup.Item>
                  <div className='row'>
                    <div className='col'>
                      <Button variant="primary" href = {url} target = "_blank" onClick={e => e.stopPropagation()}>Read Full News</Button>
                    </div>
                    <div className='col-2'>
                      <Button title='Click to add this article in collection' onClick={this.save}>+</Button>
                    </div>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            <Modal
              show={this.state.open}
              onHide={this.closeModal}
              keyboard={true} 
              size='lg'
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title ? title : ""}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                      <ListGroup>
                        <ListGroup.Item>Description: {description ? description : ""}</ListGroup.Item>
                        <ListGroup.Item>Content: {content ? content : ""}</ListGroup.Item>
                      </ListGroup>
                {/* <h4>Centered Modal</h4> */}
                {/* <p>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                  dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                  consectetur ac, vestibulum at eros.
                </p> */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" href = {url} target = "_blank">Read Full News</Button>
                <Button onClick={this.closeModal}>Close</Button>
              </Modal.Footer>
            </Modal>
         </>
        );    

  }
}

export default Newsitem;

class Snackbar extends PureComponent {
  message = ''

  state = {
    isActive: false,
  }

  openSnackBar = (message = 'Something went wrong...') => {
    this.message = message;
    this.setState({ isActive: true }, () => {
      setTimeout(() => {
        this.setState({ isActive: false });
      }, 3000);
    });
  }

  render() {
    const { isActive } = this.state;
    return (
      <div className = {isActive ? [Styles.snackbar, Styles.show].join(" ") : Styles.snackbar}>
        {this.message}
      </div>
    )
  }
}