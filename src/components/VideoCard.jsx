import React,{useState} from 'react'
import { Card ,Modal} from 'react-bootstrap'
import { saveHistoryAPI } from '../services/allAPI';
import{removeVideoAPI} from '../services/allAPI'

const VideoCard = ({dispalyData,setDeleteVideoResponseFromVideoCard,insideCategory}) => {  //destructuring is used here for props
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async () =>{ 
    //display modal
    setShow(true);
    //store history in json
    const {caption,youTubeLink}=dispalyData
    const sysDateTime = new Date()
    console.log(sysDateTime.toLocaleString('en-US',{timeZoneName:'short'}));
    const timeStamp = sysDateTime.toLocaleString('en-US',{timeZoneName:'short'})
    const historyDetails = {caption,youTubeLink,timeStamp}
    try{
      await saveHistoryAPI(historyDetails)
    }
    catch(err){
      console.log(err);
      
    }
    

  }

const deleteVedio = async(id)=>{
  try{
   const result= await removeVideoAPI(id)
    setDeleteVideoResponseFromVideoCard(result)
  }catch(err){
    console.log(err);
    
  }
}
const videoCardDragStarted = (e,dragVideoDetails) =>{
  console.log("Inside videoCardDragStarted with videoId : " +dragVideoDetails?.id);
  //share data using event drag start
  e.dataTransfer.setData("videoDetails",JSON.stringify(dragVideoDetails))
  
}

  return (
   <>
    <Card draggable={true} onDragStart={e=>videoCardDragStarted(e,dispalyData)} style={{ height:'300px' }}>
      <Card.Img onClick={handleShow} variant="top" height={'220px'} src={dispalyData?.imgUrl} />
      <Card.Body>
        <Card.Text className='d-flex justify-content-between'>
         <p>{dispalyData?.caption}</p>
        {!  <button onClick={()=>deleteVedio(dispalyData?.id)} className="btn"><i className="fa-solid fa-trash text-danger"></i></button>}
        </Card.Text>
      </Card.Body>
    </Card>
    <Modal size='lg' centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Caption</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width="100%" height="395" src={`${ dispalyData?.youTubeLink}?autoplay=1`} title="caption" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

        </Modal.Body>
       
      </Modal>
   </>
  )
}

export default VideoCard