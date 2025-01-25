export interface Task {
  _id: string
  title: string
  checklist: CheckList[]
}

export interface CheckList { text: string; isCompleted: boolean, icon: string}