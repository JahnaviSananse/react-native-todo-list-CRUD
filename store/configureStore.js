import { createStore, combineReducers } from 'redux';
import TodoReducer from '../reduxTodo/todoList/todo.reducer';
const rootReducer = combineReducers(
    { todo: TodoReducer }
);
const configureStore = () => {
    return createStore(rootReducer);
}
export default configureStore;