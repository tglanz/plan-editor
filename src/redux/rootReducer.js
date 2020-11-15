import {combineReducers} from 'redux';

import * as ui from './uiDuck';
import * as graph from './graphDuck';

export default combineReducers({
    ui: ui.reducer,
    graph: graph.reducer
});