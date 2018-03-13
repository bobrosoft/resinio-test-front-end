/* tslint:disable:member-ordering */

import {Action} from '@ngrx/store';
import {TreePath} from '../models/tree-path.model';

export class TreeActions {
  
  static ADD_NODE = '[Tree] ADD_NODE';
  static addNode(title: string, path: TreePath): Action {
    return {
      type: this.ADD_NODE,
      payload: {
        title,
        path
      }
    };
  }

  static REMOVE_NODE = '[Tree] REMOVE_NODE';
  static removeNode(path: TreePath): Action {
    return {
      type: this.REMOVE_NODE,
      payload: path
    };
  }

  static TOGGLE_NODE = '[Tree] TOGGLE_NODE';
  static toggleNode(path: TreePath): Action {
    return {
      type: this.TOGGLE_NODE,
      payload: path
    };
  }

}