export type Action = () => (Promise<boolean> | void)

export type Frame = (panel: Panel) => FrameOptions

export interface Option {
  text: string,
  onSelect: () => void
}

export interface FrameOptions {
  background: new() => React.Component<any, any>,
  timeline: Action[]
  options: Option[]
}

export interface Panel {
  go: (frame: Frame) => Action,
  showOptions: () => Action,
  wait: (time: number) => Action
}
