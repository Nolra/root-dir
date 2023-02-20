import { 
    AddIcon,
    RenameIcon,
    DeleteIcon,
    ArrowIcon
} from '../images/svg.jsx';

import { findFirst, findAndModifyFirst } from 'obj-traverse/lib/obj-traverse';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { renderTree } from '../store/actionsCreator';
import { Modal } from './modal';

export const Node = ({node, child}) => {
    const dispatch = useDispatch();
    const tree = useSelector(state => state.tree);

    const [modal, setModal] = useState({open:false});

    const name = node.name;
    const id = node.id;
    const children = node.children || [];
    const open = node.open || false;
    const active = node.active || false;


    function nodeToggleOpen(event) {
        event.stopPropagation();
        let updTree = {...tree}
        if (updTree.id === id) {
            updTree.open = !open;
        } else {
            const needObj = findFirst(updTree, 'children', {id: id});
            if(needObj) {
                needObj.open = !open;
                updTree = findAndModifyFirst(updTree, 'children', {id: id}, needObj);  
            }
        }
        dispatch(renderTree(updTree));
    }

    function nodeToggleActive(event) {
        event.stopPropagation();

        let updTree = {...tree}
        const activeObj = findFirst(updTree, 'children', {active: true});
        updTree.active = false;

        if (activeObj) {
            activeObj.active = false;
            let findActive = findAndModifyFirst(updTree, 'children', {active: true}, activeObj);
            if(findActive) updTree = findActive;
        }         

        if (updTree.id === id) {
            updTree.active = true;
        } else {
            const needObj = findFirst(updTree, 'children', {id: id});
            if(needObj) {
                needObj.active = true;
                updTree = findAndModifyFirst(updTree, 'children', {id: id}, needObj);  
            }
        }

        dispatch(renderTree(updTree));
    }

    function addModal(event){
        event.stopPropagation();
        setModal({
            action: 'Add',
            open: true,
            treeName: tree.name,
            id,
        })
    }

    function renameModal(event){
        event.stopPropagation();
        setModal({
            action: 'Rename',
            open: true,
            treeName: tree.name,
            id,
        })
    }

    function deleteModal(event){
        event.stopPropagation();
        setModal({
            action: 'Delete',
            open: true,
            treeName: tree.name,
            id,
            name
        })
    }

    return (
        <div className={child ? 'child' : undefined}>
            <div 
                className={
                    open && active ? 'node open active' 
                    : open ? 'node open'
                    : active ? 'node active'
                    : 'node'
                }
                onClick={(event) => nodeToggleActive(event)}
            >
                <button className="arrow" onClick={(event) => nodeToggleOpen(event)}><ArrowIcon/></button>
                <div className="text">{name}</div>
                <button className="add" onClick={(event) => addModal(event) }><AddIcon/></button>
                <button className="rename" onClick={(event) => renameModal(event) }><RenameIcon/></button>
                <button className="delete" onClick={(event) => deleteModal(event) }><DeleteIcon/></button>
            </div>
            {
                children.length
                    ? node.children?.map( (elem) => <Node key={elem.id} node={elem} child/> )
                    : undefined
            }
            {
                modal.open ? <Modal modal={modal} setModal={setModal} /> : undefined
            }
        </div>
    )

}

