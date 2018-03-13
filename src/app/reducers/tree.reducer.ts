import {ActionReducer, Action} from '@ngrx/store';
import {TreeActions} from '../actions/tree.actions';
import {TreeNode} from '../models/tree-node.model';
import {TreePath} from '../models/tree-path.model';

export interface TreeState {
  rootNode: TreeNode;
}

const initialState: TreeState = {
  rootNode: {
    title: 'root',
    isRoot: true,
    children: [
      {title: 'page 1', isRoot: false, children: [], isExpanded: false},
      {title: 'page 2', isRoot: false, children: [
        {title: 'page 2.1', isRoot: false, children: [], isExpanded: false},
        {title: 'page 2.2', isRoot: false, children: [], isExpanded: false},
      ], isExpanded: true},
      {title: 'page 3', isRoot: false, children: [], isExpanded: false}
    ],
    isExpanded: true
  }
};

export const TreeReducer: ActionReducer<TreeState> = (state: TreeState = initialState, action: Action): TreeState => {
  /**
   * Doing object full clone
   * @param obj
   * @returns {any}
   */
  const clone = (obj: any): any => {
    return JSON.parse(JSON.stringify(obj));
  };

  /**
   * Returns node by path
   * @param {TreeNode} node
   * @param {TreePath} path
   * @returns {TreeNode}
   */
  const getNodeByPath = (node: TreeNode, path: TreePath): TreeNode => {
    let resultNode = node;
    path.forEach(p => resultNode = resultNode.children[p]);
    
    return resultNode;
  };
  
  switch (action.type) {
    case TreeActions.ADD_NODE: { // using braces here to be able to reuse same variables names later
      const newState = clone(state);
      
      // Let's add new node by path
      getNodeByPath(newState.rootNode, action.payload.path).children.push({
        title: action.payload.title,
        children: [],
        isRoot: false,
        isExpanded: false,
      });
      
      return newState;
    }

    case TreeActions.REMOVE_NODE: {
      const newState = clone(state);
      const parentPath = action.payload.concat([]);
      const indexToRemove = parentPath.pop(); // parentPath will have right value only here
      
      // Need to find parent node from which we're going to delete our node
      const parentNode = getNodeByPath(newState.rootNode, parentPath);
      
      // Remove requested node
      parentNode.children.splice(indexToRemove, 1);
      
      return newState;
    }
    
    case TreeActions.TOGGLE_NODE: {
      const newState = clone(state);
      
      // Toggle visibility
      const node = getNodeByPath(newState.rootNode, action.payload);
      node.isExpanded = !node.isExpanded;
      
      return newState;
    }

    default:
      return state;
  }
};