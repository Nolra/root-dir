import { 
  GET_TREE,
  NODE_CREATE,
  NODE_RENAME,
  NODE_DELETE,
  RENDER_TREE,
  ERROR
} from './actions';

const initialState = {
  tree: {},
  error: {},
}

export const reducer = (state = initialState, {type, payload}) => {
  
  switch (type) {
    case RENDER_TREE:
      return {
      	...state,
      	tree: payload.tree
      }
    case ERROR:
      return {
      	...state,
      	error: {
			    errorType: payload.type,
			    errorDescription: payload.decsription,
      	}
      }
    default: 
    	return state
  }
}

export default reducer;