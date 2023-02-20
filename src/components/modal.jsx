import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { findFirst, findAndModifyFirst, findAndDeleteFirst } from 'obj-traverse/lib/obj-traverse';
import { renderTree } from '../store/actionsCreator';

// requests to the server are disabled because the server responds with json, parsing which results in a syntax error
// import { 
//     createApi,
//     deleteApi,
//     renameApi
//  } from '../api';

export const Modal = ({modal, setModal}) => {
    const dispatch = useDispatch();
    const tree = useSelector(state => state.tree);
    const [name, setName] = useState('');

    async function addNode (event) {
        event.stopPropagation();

        // const responseJSON = await createApi({
        //     treeName: modal.treeName,
        //     parentNodeId: modal.id,
        //     nodeName: name
        // });

        // const response = await responseJSON.json();

        let updTree = {...tree};

        if (updTree.id === modal.id) {
            updTree.children.push({
                children: [],
                id: Math.random(),
                name
            });
        } else {
            const needObj = findFirst(updTree, 'children', {id: modal.id});
            if(needObj) {
                needObj.children.push({
                    children: [],
                    id: Math.random(),
                    name
                })
                updTree = findAndModifyFirst(updTree, 'children', {id: modal.id}, needObj);  
            }
        }

        dispatch(renderTree(updTree));
        setModal({open: false})
    }

    async function renameNode (event) {
        event.stopPropagation();

        // const responseJSON = await renameApi({
        //     treeName: modal.treeName,
        //     nodeId: modal.id,
        //     newNodeName: name
        // });
        // const response = await responseJSON.json();

        let updTree = {...tree};
        const needObj = findFirst(updTree, 'children', {id: modal.id});
        if(needObj) {
            needObj.name = name;
            updTree = findAndModifyFirst(updTree, 'children', {id: modal.id}, needObj);  
        }
        dispatch(renderTree(updTree));
        setModal({open: false})
    }

    async function deleteNode (event) {
        event.stopPropagation();
        
        // const responseJSON = await deleteApi({
        //     treeName: modal.treeName,
        //     nodeId: modal.id,
        // });
        // const response = await responseJSON.json();

        let updTree = {...tree};
        updTree = findAndDeleteFirst(tree, 'children', {id: modal.id});
        dispatch(renderTree(updTree));
        setModal({open: false})
    }

    return (
        <div className="modal-wrapper">
            <div className="modal">
                <header className="modal-header">
                    <h6 className="modal-head">{modal.action}</h6>
                </header>
                <div className="modal-body">
                    {
                        modal.action === 'Add'
                        ? <input placeholder='Node Name' value={name} onChange={(event)=> setName(event.target.value)}/>
                        : modal.action === 'Rename'
                        ? <input placeholder='New Node Name' value={name} onChange={(event)=> setName(event.target.value)}/>
                        : <p>Do you want to delete {modal.name}?</p>
                    }
                </div>
                <footer className="modal-footer">
                    <button className="standart" onClick={() => setModal({open:false})}>Сancel</button>
                    {
                        modal.action === 'Add'
                        ? <button className="blue" onClick={(event) => addNode(event)}>Add</button>
                        : modal.action === 'Rename'
                        ? <button className="blue" onClick={(event) => renameNode(event)}>Rename</button>
                        : <button className="red" onClick={(event) => deleteNode(event)}>Delete</button>
                    }
                </footer>
            </div>
        </div>
    )
}
