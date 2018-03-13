export interface TreeNode {
  title: string;
  isRoot: boolean;
  children: TreeNode[];
  isExpanded: boolean;
}