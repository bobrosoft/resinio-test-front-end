import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TreeNode} from '../../models/tree-node.model';
import {TreePath} from '../../models/tree-path.model';
import {TreeAddItemSubmitEvent} from '../../models/tree-add-item-submit-event.model';

@Component({
  selector: 'tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss']
})
export class TreeNodeComponent implements OnInit {
  @Input() data: TreeNode;
  @Input() index?: number;
  @Input() titleMinLength: number = 1;
  @Input() titleMaxLength: number = 32;
  
  @Output() toggleClick = new EventEmitter<TreePath>();
  @Output() deleteClick = new EventEmitter<TreePath>();
  @Output() addItemSubmit = new EventEmitter<TreeAddItemSubmitEvent>();

  form: FormGroup;

  /**
   * Returns index as array of one element or empty array of index is undefined
   * @returns {number[]}
   */
  get spreadableIndex(): number[] {
    return typeof this.index === 'undefined' ? [] : [this.index];
  }
  
  constructor() {
    // NOTE: this component is a "dumb" component of unidirectional data flow, it doesn't mutate data, only passing events
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(this.titleMinLength), Validators.maxLength(this.titleMaxLength)]),
    });
  }

  /**
   * Tracking function for better DOM reuse because of immutability
   * @param {number} index
   * @param {TreeNode} item
   * @returns {any}
   */
  trackByIndex(index: number, item: TreeNode): any {
    return index + item.title; // not ideal, but allows to go without 
  }
  
  onTitleClick() {
    // Passing path
    this.toggleClick.emit([...this.spreadableIndex]);
  }

  onChildToggleClick(event: TreePath) {
    // Bubble up child event and build proper path
    this.toggleClick.emit([...this.spreadableIndex, ...event]);
  }

  onDeleteClick() {
    // Passing path
    this.deleteClick.emit([...this.spreadableIndex]);
  }

  onChildDeleteClick(event: TreePath) {
    // Bubble up child event and build proper path
    this.deleteClick.emit([...this.spreadableIndex, ...event]);
  }
  
  onAddBtnClick() {
    if (this.form.valid) {
      this.addItemSubmit.emit({
        path: [...this.spreadableIndex],
        title: this.form.value.title
      });
      
      // Clear input field
      this.form.patchValue({title: ''});
      this.form.markAsUntouched();
    } else {
      // NOTE: doing alert here for simplicity, but can be proxied and delegated through events
      alert(`Wrong title (should be between ${this.titleMinLength} and ${this.titleMaxLength} characters long)`);
    }
  }

  onChildAddBtnClick(event: TreeAddItemSubmitEvent) {
    // Bubble up child event and build proper path
    this.addItemSubmit.emit({
      ...event,
      path: [...this.spreadableIndex, ...event.path], // overriding path
    });
  }
}
