export const setItem=(item)=>({
    type:'SET_ITEM',
    payload: item
});
export const submitItem=(item)=>({
    type:'SUBMIT_ITEM',
    payload: item
});
export const deleteItem=(item)=>({
    type:'DELETE_ITEM',
    payload: item
});
export const deleteAll=()=>({
    type:'DELETE_ALL',
});
export const toggle=(id)=>({
    type:'TOGGLE',
    payload:id
});
export const toggleAll=()=>({
    type:'TOGGLE_ALL',
});
export const editData=(item)=>({
    type:'EDIT_DATA',
    payload: item
});