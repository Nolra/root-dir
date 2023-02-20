import { useDispatch, useSelector } from 'react-redux';
import { getTree, showError } from './store/actionsCreator';

import { Node } from './components/node.jsx';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  useEffect( ()=>{
    dispatch( getTree("Root") );
  }, [] );

  return (
    <div>
      {
        state.tree ? <Node node={state.tree}/> : undefined
      }
    </div>
  );
}

export default App;













