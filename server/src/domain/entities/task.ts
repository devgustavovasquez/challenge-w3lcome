export type TaskProps = {
  title: string;
  concluded: boolean;
};

export class Task {
  private _id: number;
  private props: TaskProps;

  constructor(props: TaskProps, id?: number) {
    this.props = props;
    this._id = id || 0;
  }

  get id(): number {
    if (this._id === 0) {
      throw new Error("Task not persisted");
    }

    return this._id;
  }

  get title(): string {
    return this.props.title;
  }

  set title(title: string) {
    if (title.trim() === "") {
      throw new Error("Invalid title");
    }

    this.props.title = title;
  }

  get concluded(): boolean {
    return this.props.concluded;
  }

  set concluded(concluded: boolean) {
    this.props.concluded = concluded;
  }

  markAsConcluded(): void {
    if (this.props.concluded) {
      throw new Error("Task already marked as concluded");
    }

    this.props.concluded = true;
  }
}
