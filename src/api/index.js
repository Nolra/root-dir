const BASE_PATH = 'https://test.vmarmysh.com/';
const GET_PATH = 'api.user.tree.get';
const CREATE_PATH = 'api.user.tree.node.create';
const DELETE_PATH = 'api.user.tree.node.delete';
const RENAME_PATH = 'api.user.tree.node.rename';

const getApi = async (treeName) => {
    return await fetch(`${BASE_PATH}${GET_PATH}?treeName=${treeName}`, {
        method: 'POST',
    })
};

const createApi = async (node) => {
    return await fetch(
        `${BASE_PATH}${CREATE_PATH}?treeName=${node.treeName}&parentNodeId=${node.parentNodeId}&nodeName=${node.nodeName}`, {
        method: 'POST',
    })
};

const deleteApi = async (node) => {
    return await fetch(
            `${BASE_PATH}${DELETE_PATH}?treeName=${node.treeName}&nodeId=${node.nodeId}`, {
        method: 'POST',
    })
};

const renameApi = async (node) => {
    return await fetch(
        `${BASE_PATH}${RENAME_PATH}?treeName=${node.treeName}&nodeId=${node.nodeId}&newNodeName=${node.newNodeName}`, {
        method: 'POST',
    })
};

export {
    getApi,
    createApi,
    deleteApi,
    renameApi
}