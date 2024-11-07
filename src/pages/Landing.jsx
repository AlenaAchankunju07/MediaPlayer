import React from 'react'
import { Link } from 'react-router-dom'
import landingImg from '../assets/Black.png'
import img1 from '../assets/pic1.png'
import img2 from '../assets/pic2.png'
import img3 from '../assets/pic3.png'
import { Card } from 'react-bootstrap'


const Landing = () => {
  return (
    <div style={{paddingTop:'100px'}} className='container'>
      {/* landing part */}
       <div className="row align-items-center">
        <div className="col-lg-5">
          <h3 className='mb-5'>Welcome to <span className='text-warning'>Media player</span></h3>
          <p style={{textAlign:'justify'}}>Media player app will allow user to add or remove their upload video from youtube and also allow them to arrange in different categories by drag and drop</p>
          <Link to={'/home'} className='btn btn-info'>Get Started</Link>
        </div>
        <div className="col"></div>
        <div className="col-lg-6">
          <img className='img-fluid ms-5' src={landingImg}alt="" />
        </div>
       </div>
       {/* features */}
       <div className="my-5">
        <div className="text-center">
          <h3>Features</h3>
          <div className="row mt-5">
            <div className="col-lg-4">
            <Card  className='p-2' style={{ width: '20rem' }}>
      <Card.Img height={'300px'} variant="top" src={img1} />
      <Card.Body>
        <Card.Title>Managing Videos</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
            </div>
            <div className="col-lg-4">
            <Card  className='p-2' style={{ width: '20rem' }}>
      <Card.Img height={'300px'} variant="top" src={img2} />
      <Card.Body>
        <Card.Title>Categories Videos</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
            </div><div className="col-lg-4">
            <Card  className='p-2' style={{ width: '20rem' }}>
      <Card.Img height={'300px'} variant="top" src={img3} />
      <Card.Body>
        <Card.Title>Managing Videos</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
            </div>

        
          </div>
        </div>
       </div>
       {/* last */}
       <div className="my-5 row align-items-center border rounded p-5">
      <div className="col-lg-5">
        <h3 className="text-warning">Simple , Fast and Powerful</h3>
        <p style={{textAlign:'justify'}}><span className='fs-5 fw-bolder'>Play Everything</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nam tenetur autem aut ipsum nihil iste</p>
        <p style={{textAlign:'justify'}}><span className='fs-5 fw-bolder'>Categorise Video</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nam tenetur autem aut ipsum nihil iste</p> <p style={{textAlign:'justify'}}><span className='fs-5 fw-bolder'>Managing History</span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nam tenetur autem aut ipsum nihil iste</p>
      </div>
      <div className="col"></div>
      <div className="col-lg-6">
      <iframe width="100%" height="395" src="https://www.youtube.com/embed/gpv7ayf_tyE" title="Bridgerton | Official Trailer | Netflix" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
       </div>
       </div>
       
  )
}

export default Landing