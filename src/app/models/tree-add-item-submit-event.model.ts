import {TreePath} from './tree-path.model';

export interface TreeAddItemSubmitEvent {
  path: TreePath;
  title: string;
}