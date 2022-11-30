import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
// import fetch from 'node-fetch';
import Loading from "../Assets/Eclipse-1s-200px.gif";
import NotImage from "../Assets/images.jpeg";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Component } from 'react'
import { Modal } from 'react-bootstrap';
// import { Modal } from 'react-bootstrap';


export class Memeitem extends Component {

  constructor() 
  {
    super();
    this.state = { 
      time: 0,
      open : false,
    }
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
  
  
  render() {
    let {title, url_image, url} = this.props;
    // console.log(title);
    return (
          <>
            <Card className = 'card aling-items-center' onClick={this.openModal}>
              {/* <Card.Img variant="top" src= {url_image} alt = 'Image Not Available' height = '250px'/> */}
              <LazyLoadImage src = {url_image} width = '330px' height = '350px' alt='Image Not Available'  style={{"marginTop":"10px","borderRadius":"10px",marginLeft:"10px"}}
                        placeholderSrc={ this.state.time <= 10 ? Loading : NotImage } />
              <Card.Body>
                    <Card.Title >Title : {title ? title.slice(0,60) : ""}</Card.Title>
                    {/* <Card.Text > */}
                        {/* Subreddit : {description ? description.slice(0,80) : ""} */}
                    {/* </Card.Text> */}
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <div className='row'>
                    <div className='col'>
                      <Button variant="primary" href = {url} target = "_blank" onClick={e => e.stopPropagation()}>Go to the page</Button>
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
                        <ListGroup.Item style={{display:"flex",justifyContent:"center"}}>
                            <LazyLoadImage src = {url_image} style={{maxWidth:"100%"}} height = '450px' alt='Image Not Available' 
                                    placeholderSrc={ this.state.time <= 10 ? Loading : NotImage } />
                            </ListGroup.Item>
                        {/* <ListGroup.Item>Subreddit: {description ? description : ""}</ListGroup.Item> */}
                      </ListGroup>
                {/* <h4>Centered Modal</h4> */}
                {/* <p>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                  dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                  consectetur ac, vestibulum at eros.
                </p> */}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" href = {url} target = "_blank">Go to the page</Button>
                <Button onClick={this.closeModal}>Close</Button>
              </Modal.Footer>
            </Modal>
         </>
        );    

  }
}

export default Memeitem;

