import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {getAllHistoryAPI}from '../services/allAPI'
import{deleteHistoryAPI} from '../services/allAPI'

const History = () => {
  const[ allVedioHistory,SetAllVedioHistory] = useState()
  console.log(allVedioHistory);
   
  useEffect(()=>{
    getAllHistory()
  },[])


  const getAllHistory = async()=>{
    try{
      const result = await getAllHistoryAPI()
      if(result.status>=200 && result.status<300){
        SetAllVedioHistory(result.data)
      }else{
        console.log(result);
        
      }
    }catch(err){
      console.log(err);
      
    }
  }

  const removeHistory = async(id)=>{
    try {
      await deleteHistoryAPI(id)
      getAllHistory()
    }catch(err)
    {
      console.log(err);
      
    }
  }
  return (
    <div style={{paddingTop:'100px'}}>
      <div className="container d-flex justify-content-between">
        <h3>Watch History</h3>
        <Link to={'/home'}>Back to Home</Link>
      </div>
      <table className=" container table my-5 table">
        <thead>
          <tr>
            <th>#</th>
            <th>Caption</th>
            <th>Link</th>
            <th>Time Stamp</th>
            <th>...</th>
          </tr>
        </thead>
        <tbody>
          {
            allVedioHistory?.length>0?
            allVedioHistory?.map((vedioDetails,index)=>(
              <tr  key={vedioDetails?.id}>
              <td>{index+1}</td>
              <td>{vedioDetails.caption}</td>
              <td><a target='_blank' href={vedioDetails.youTubeLink}>{vedioDetails.youTubeLink}</a></td>
              <td>{vedioDetails.timeStamp}</td>
              <td><button onClick={()=>removeHistory(vedioDetails?.id)} className='btn'><i className="fa-solid fa-trash text-danger"></i></button></td>
            </tr>
            ))
            :
            <div className='f-w bolder text-danger'>history empty</div>
          }
        </tbody>
      </table>
    </div>
  )
}

export default History