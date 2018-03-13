import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/map';
import {AppState} from '../../reducers/index';
import {Store} from '@ngrx/store';
import {TreeState} from '../../reducers/tree.reducer';
import {TreePath} from '../../models/tree-path.model';
import {TreeAddItemSubmitEvent} from '../../models/tree-add-item-submit-event.model';
import {TreeActions} from '../../actions/tree.actions';
import {Observable} from 'rxjs/Observable';
import {TreeNode} from '../../models/tree-node.model';

@Component({
  selector: 'tree-page',
  templateUrl: './tree-page.component.html',
  styleUrls: ['./tree-page.component.scss']
})
export class TreePageComponent implements OnInit {
  treeRoot: Observable<TreeNode>;

  constructor(
    protected store: Store<AppState>,
  ) {
  }

  ngOnInit() {
    // Let's watch for three changes
    this.treeRoot = this.store.select('tree').map((s: TreeState) => s.rootNode); // reactivity used here directly
  }

  onNodeToggleClick(event: TreePath) {
    this.store.dispatch(TreeActions.toggleNode(event));
  }

  onNodeDeleteClick(event: TreePath) {
    this.store.dispatch(TreeActions.removeNode(event));
  }

  onNodeAddItemSubmit(event: TreeAddItemSubmitEvent) {
    this.store.dispatch(TreeActions.addNode(event.title, event.path));
  }
}
