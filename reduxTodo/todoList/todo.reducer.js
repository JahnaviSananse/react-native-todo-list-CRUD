const INITIAL_STATE = {
    item: '',
    todoList: [],
    checked: false,
    //[{id:1,text:'sds',tmestamip:'sds'},{id:2,text:'tas'}]
};
const deleteTodo = (existingList, id) => {
    const updatedList = existingList.filter((item) => { return item.id !== id });
    // console.log("deleteItem");
    return updatedList
};

const toggleTodo = (existingList, id) => {
    return existingList.map((item) => {
        // console.log("hjgdjaedae",item);
        return item.id === id ? { ...item, isChecked: !item.isChecked } : item
    });

};

const selectedDelete = (existingList) => {
    const updatedList = existingList.filter((item) => {
        return item.isChecked == false
    });
    return updatedList

};

const allToggle = (existingList) => {

    return existingList.map((item) => {
        return { ...item, isChecked: !item.isChecked }
    });
};


const editTodo = (existingList, editData) => {
    return existingList.map((item) => {
        return item.id === editData.id ? { ...item, text: editData.text } : item
    })
}

const TodoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_ITEM':
            return {
                ...state,
                item: action.payload
            }

        case 'SUBMIT_ITEM':
            return {
                ...state,
                todoList: [...state.todoList, action.payload]
            }
        case 'DELETE_ITEM':
            return {
                ...state,
                todoList: deleteTodo(state.todoList, action.payload)
            }
        case 'DELETE_ALL':
            return {
                ...state,
                todoList: selectedDelete(state.todoList)
            }
        case 'TOGGLE':
            return {
                ...state,
                todoList: toggleTodo(state.todoList, action.payload)
            }
        case 'TOGGLE_ALL':
            return {
                ...state,
                todoList: allToggle(state.todoList),
                checked: !state.checked,
            }
        case 'EDIT_DATA':
            return {
                ...state,
                todoList: editTodo(state.todoList, action.payload)

            }
        default:
            return state;

    }
};
export default TodoReducer;