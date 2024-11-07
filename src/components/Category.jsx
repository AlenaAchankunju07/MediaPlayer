import React,{useEffect, useState} from 'react'
import { Modal,Form,FloatingLabel,Button } from 'react-bootstrap'
import { removeVideoAPI, saveCategoryAPI, updateCategoryAPI } from '../services/allAPI';
import {getAllCategoryAPI} from '../services/allAPI';
import {removeCategoryAPI} from '../services/allAPI';
import VideoCard from './VideoCard';

const Category = ({setDeleteResponseFromCategory,deleteResponseFromView}) => {
  const [allCategories,SetAllCategories] = useState([])
  const [categoryName,setategoryName] = useState("")
  const [show, setShow] = useState(false);


useEffect(()=>{
  getAllCategories()
},[deleteResponseFromView])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSaveCategory= async()=>{
    if(categoryName){
      const categoryDetailes={categoryName,allVideos:[]}
       try{
        const result = await saveCategoryAPI(categoryDetailes)
        if(result.status>=200 && result.status<300){
        alert("category created")
        getAllCategories()
        handleClose()
        }
       }catch(err){
        console.log(err);
        
       }
      
    }else{
      alert("please fill your category name")
    }
  }

const getAllCategories = async()=>{
  try{
    const result = await getAllCategoryAPI()
    if(result.status>=200 && result.status<300){
      SetAllCategories(result.data)
    }
  } catch(err){
console.log(err);

  }
}
console.log(allCategories);

const deleteCategory = async (id)=>{
  try{
      await  removeCategoryAPI(id)
      getAllCategories()
  }
  catch(err){
    console.log(err);
    
  }
}
const dragOverCategory=(e)=>{
  e.preventDefault()

}

const vediocardDropOverCategory = async(e, categoryDetailes)=>{
  console.log("inside vediocardDropOverCategory ");
  console.log(categoryDetailes);
const videoDetails = JSON.parse(e.dataTransfer.getData("videoDetails"))
console.log(videoDetails);
//update category by add video to its allVideo
categoryDetailes.allVideos.push(videoDetails)
console.log(categoryDetailes);
//api call  to make uodate the category
await updateCategoryAPI (categoryDetailes)
getAllCategories()
const result = await removeVideoAPI(videoDetails.id)
setDeleteResponseFromCategory(result)
}

const categoryVideoDragStarted = (e,dragVideoDetails,categoryDetailes )=>{
  console.log(" inside categoryVideoDragStarted !!" );
  let dragData= {video:dragVideoDetails,categoryDetailes}
  e.dataTransfer.setData ("dragData",JSON.stringify(dragData))
  
}
  return (
<>
<div className="d-flex justify-content-around align-items-center">
  <h3>All Categories</h3>
  <button onClick={handleShow} className='btn btn-warning ms-3 rounded-circle fw-bolder fs-5'>+</button>
</div>
{/* display category */}
<div className="container-fluid mt-3">
      {/* Single Category View */}
        {
          allCategories?.length>0?
            allCategories?.map(categoryDetails=>(
              <div droppable="true" onDragOver={dragOverCategory} onDrop={e=>vediocardDropOverCategory(e,categoryDetails)} key={categoryDetails?.id} className="border rounded p-3 mb-3">
              <div className="d-flex justify-content-between">
                <h5>{categoryDetails?.categoryName}</h5>
                <button onClick={() => deleteCategory(categoryDetails?.id)} className="btn"><i className="fa-solid fa-trash text-danger"></i></button>
              </div>
              {/* Display Category Videos */}
              <div className="row mt-2">
                {
                  categoryDetails?.allVideos?.length>0 &&
                  categoryDetails?.allVideos?.map(video=>(
                    <div draggable={true} onDragStart={e=>categoryVideoDragStarted(e,video,categoryDetails)} key ={video?.id} className="col-lg-4">
                    <VideoCard insideCategory={true} dispalyData={video}/>
                  </div>
                  ))
                }
              </div>
            </div>
            ))
        :
        <div className='fw-bolder text-danger fs-5'> No Categories are added yet!!!</div>
        }
    </div>
<Modal centered show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel controlId="floatingCategoryName" label="Category Name">
        <Form.Control onChange={e=>setategoryName(e.target.value)} type="text" placeholder="Category Name" />
      </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveCategory} variant="primary">Add</Button>
        </Modal.Footer>
</Modal>
</>
  )

}

export default Category