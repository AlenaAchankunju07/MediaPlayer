import commonAPI from "./commonAPI"
import SERVERURL from "./serverURL"

//saveVideoAPI - post  http req called ADD Component
export const saveVideoAPI =async(videoDetailes)=>{
   return await commonAPI("POST",`${SERVERURL}/uploadVideos`,videoDetailes)
}

//getAllVideosAPI -get http request called view component when component displayed in browser inside its useeffect hook
 export const getAllVideosAPI =async()=>{
   return await commonAPI("GET",`${SERVERURL}/uploadVideos`,"")
}

//saveHistoryAPI -post http request to http://localhost:3000/history  called by videoCard component when we play vedio
export const saveHistoryAPI =async(historyDetails)=>{
   return await commonAPI("POST",`${SERVERURL}/history`,historyDetails)
}

//getAllHistoryAPI - get http req to  http://localhost:3000/history called by History componet when it opened in browser
export const getAllHistoryAPI =async()=>{
   return await commonAPI("GET",`${SERVERURL}/history`,"")
}

//deleteAllHistoryAPI - delete http req to  http://localhost:3000/history/id called by History componet when user click on delete button
export const deleteHistoryAPI =async(id)=>{
   return await commonAPI("DELETE",`${SERVERURL}/history/${id}`,{})
}

//removeVideoAPI - delete http req called vediocard component when the user click on delete button
export const removeVideoAPI =async(id)=>{
   return await commonAPI("DELETE",`${SERVERURL}/uploadVideos/${id}`,{})
}

//saveCategoryAPI -post http reqeust to http://localhost:3000/categories caled by category component when user click pn add btn
// categoryDetailes={categoryName,AllVideos}
export const saveCategoryAPI = async (categoryDetailes)=>{
   return await commonAPI("POST",`${SERVERURL}/categories`,categoryDetailes)

}

//getAllCategoryAPI -get http reqeust to http://localhost:3000/categories called by category component when component loaded in browser
// categoryDetailes={categoryName,AllVideos}
export const getAllCategoryAPI = async ()=>{
   return await commonAPI("GET",`${SERVERURL}/categories`,{})

}


//removeCategoryAPI = delete http request called Category component when user click on delete button
export const removeCategoryAPI = async (id) =>{
   return await commonAPI("DELETE",`${SERVERURL}/categories/${id}`,{})
}

//updateCategoryAPI :put http req to  http://localhost:3000/categories/id called by category component when vedio drop over the category
export const updateCategoryAPI = async (categoryDetailes) =>{
   return await commonAPI("PUT",`${SERVERURL}/categories/${categoryDetailes. id}`,categoryDetailes)
}
 