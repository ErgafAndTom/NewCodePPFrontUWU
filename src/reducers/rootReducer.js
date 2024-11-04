import {combineReducers} from "redux";
import counterReducer from "./counterReducer";
// import wordsSlice from './wordsSlice';
import filesReducer from "./filesReducer";
import pricesReducer from "./pricesReducer";
import currentUserReducer from "./CurrentUserReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    prices: pricesReducer,
    files: filesReducer,
    counter: counterReducer,
    currentUser: currentUserReducer,
    auth: authReducer,
    // words: wordsSlice,
})

export default rootReducer;