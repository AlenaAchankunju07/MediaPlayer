import React, { useEffect, useState } from 'react'
import { Row,Col } from 'react-bootstrap'
import VideoCard from'./VideoCard'
import { getAllVideosAPI,updateCategoryAPI,saveVideoAPI } from '../services/allAPI'

const view = ({addResponseFromHome,deleteResponseFromCategory,setDeleteResponseFromView}) => {
  const [deleteVideoResponseFromVideoCard,setDeleteVideoResponseFromVideoCard] = useState("")
  const [allVideos,setAllVideos] = useState([])

  useEffect(()=>{
    getAllVideos()
  },[addResponseFromHome,deleteVideoResponseFromVideoCard,deleteResponseFromCategory])
  console.log(allVideos);

  const getAllVideos= async()=>{
    try{
      const result = await getAllVideosAPI()
      console.log(result);
      if(result.status>=200 && result.status<300){
        setAllVideos(result.data)
      }
    }
    catch(err){
      console.log(err);
      
    }
  }
  

  const dragOverView= (e)=>{
    e.preventDefault()
  }
  const categoryVideoDropOverView =async (e)=>{
    console.log('inside categoryVideoDropOverView!');
    const {video,categoryDetailes}=JSON.parse(e.dataTransfer.getData("dragData"))
    console.log(video,categoryDetailes);
    const updatedCategoryVideoList = categoryDetailes?.allVideos?.filter(item=>item.id!=video?.id)
    const updatedCategory={...categoryDetailes,allVideos:updatedCategoryVideoList}
    console.log(updatedCategory);
    
    // updating the category by delete video from category
    const result = await updateCategoryAPI(updatedCategory)
    // use state lifting to communicate data from view to category
    setDeleteResponseFromView(result)
    // use api to upload video
    await saveVideoAPI(video)
    // call getAllVideo function
    getAllVideos()
  }

  return (
    <>
    <Row droppable="true" onDragOver={dragOverView} onDrop={e=>categoryVideoDropOverView(e)}>
     {  
     allVideos?.length>0?
     allVideos?.map(vedio=>(
      <Col  key={vedio?.id} className='mb-2' sm={12} md={6} lg={4}>
      <VideoCard setDeleteVideoResponseFromVideoCard={setDeleteVideoResponseFromVideoCard} dispalyData={vedio}/>
      </Col>
     ))
     :
    <div className="fw-bolder text-danger fs-5">No vedio are uploaded</div>
      }
    </Row>
    </>
  )
}

export default view