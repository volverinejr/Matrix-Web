export class MenuModel {
  label?: string;
  items?: any;
  command?: (event?: any) => void;

  constructor(label: string, items: any, command:  (event?: any)=> void) {
    this.label = label;
    this.items = items;
    this.command = command;
  }
}
