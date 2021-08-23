import {createStore} from "redux"
import rootReducer from "./Reducer/index"
import {applyMiddleware,compose} from "redux"
import thunk from "redux-thunk"


const devTools=window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()


const store=createStore(rootReducer,compose(applyMiddleware(thunk),devTools))


export default store;
