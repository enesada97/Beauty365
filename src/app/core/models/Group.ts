export class Group {
  id: number;
  groupName: string;
  constructor(group) {
    {
      this.id = group.id || 0;
      this.groupName = group.groupName || "";
    }
  }
}
