import { 
  GET_TREE,
  NODE_CREATE,
  NODE_RENAME,
  NODE_DELETE,
  RENDER_TREE,
  ERROR,
} from './actions';

import { 
  getApi,
  createApi,
  deleteApi,
  renameApi
} from '../api';

function renderTree(tree) {
  return {
    type: RENDER_TREE,
    payload: {
      tree,
    }
  }
}


function showError(error, decsription) {
  return {
    type: ERROR,
    payload: {
      error,
      decsription
    }
  }
}

const getTree = (treeName) => {
  return dispatch => {
    getApi(treeName)
      .then(response => response.json())
      .then(tree => dispatch(renderTree(tree)))
      .catch(error => dispatch(showError(error, 'decsription')))
  }
}

export { 
  getTree,
  showError,
  renderTree,
};