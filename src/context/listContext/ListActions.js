export const getListsStart =()=>({
    type:"GET_LISTS_START"//מפעיל את הREDUCER CASE
})
export const getListsSuccess =(lists)=>({
    type:"GET_LISTS_SUCCESS",
    payload:lists
})
export const getListsFail =()=>({
    type:"GET_LISTS_FAILURE"
})
export const createListStart =()=>({
    type:"CREATE_LIST_START"//מפעיל את הREDUCER CASE
})
export const createListSuccess =(list)=>({
    type:"CREATE_LIST_SUCCESS",
    payload:list
})
export const createListFailure =()=>({
    type:"CREATE_LIST_FAILURE"
})

export const updateListStart =()=>({
    type:"UPDATE_LIST_START"//מפעיל את הREDUCER CASE
})
export const updateListSuccess =(list)=>({
    type:"UPDATE_LIST_SUCCESS",
    payload:list
})
export const updateListFailure =()=>({
    type:"UPDATE_LIST_FAILURE"
})

export const deleteListStart =()=>({
    type:"DELETE_LIST_START"
})
export const deleteListSuccess =(id)=>({
    type:"DELETE_LIST_SUCCESS",
    payload:id,
})
export const deleteListFailure =()=>({
    type:"DELETE_LIST_FAILURE"
})