import React,{useState} from 'react'
import { Modal,Button,Form,FloatingLabel } from 'react-bootstrap'
import { saveVideoAPI } from '../services/allAPI'


const Add = ({setAddResponseFromHome}) => {
  const[invalidYouTubeLink,setInvalidYouTubeLink]= useState(false)
  const [videoDetails,SetVideoDetiles] = useState({
    caption:"",imgUrl:"" ,youTubeLink:""
  })
  console.log(videoDetails );
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  const handleUploadVideo = async () => {
    const { caption, imgUrl, youTubeLink } = videoDetails;
  
    // Check if any of the required fields are empty
    if (!caption || !imgUrl || !youTubeLink) {
      alert("Please fill out the form completely!");
      return;
    }
  
    try {
      const result = await saveVideoAPI(videoDetails);
      if (result.status >= 200 && result.status < 300) {
        alert("Video uploaded successfully");
        handleClose();
        //pass result to view component
        setAddResponseFromHome(result)
      } else {
        console.log(result);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  const extractingEmbedLinkFromYoutubeLink=(userInputYouTubeLink)=>{
    //steps creating embed link from youtube link
    if(userInputYouTubeLink.includes("https://www.youtube.com/watch?v=")){
      console.log(userInputYouTubeLink.split("v=")[1].slice(0,11));
      const videoId=userInputYouTubeLink.split("v=")[1].slice(0,11)
      setInvalidYouTubeLink(false)
      SetVideoDetiles({...videoDetails,youTubeLink:`https://www.youtube.com/embed/${videoId}`})
    }else{
      setInvalidYouTubeLink(true)
      SetVideoDetiles({...videoDetails,youTubeLink:""})
    }
  }
  return (
    <>
    <div className="d-flex align-item-center">
      <h5>Upload New Video</h5>
      <button onClick={handleShow} className='btn btn-warning ms-3 rounded-circle fw-bolder fs-5'>+</button>
    </div>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Uploading Video Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border rounded p-3">
          <FloatingLabel controlId="floatingCaption" label="Caption">
            <Form.Control onChange={e=>SetVideoDetiles({...videoDetails,caption:e.target.value})} type="text" placeholder="Caption" />
          </FloatingLabel>
          <FloatingLabel className='mt-2' controlId="floatingUrl" label="Video Image URL">
            <Form.Control onChange={e=>SetVideoDetiles({...videoDetails,imgUrl:e.target.value})} type="text" placeholder="Video Image URL" />
          </FloatingLabel>
          <FloatingLabel className='mt-2' controlId="floatingLink" label="Video Youtube link">
            <Form.Control onChange={e=>extractingEmbedLinkFromYoutubeLink(e.target.value)} type="text" placeholder="Video Youtube link" />
          </FloatingLabel>
          {
            invalidYouTubeLink &&
            <div className='text-danger fw-bolder mt-2'>Invalid youtube link please try other!! </div>
          }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUploadVideo} className='btn btn-info' variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add 