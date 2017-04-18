import * as React from 'react'

export interface Action {
  execute: Promise<void>
}

export interface Option {
  text: string,
  onSelect: () => void
}

export interface FrameOptions {
  background: React.Component<any, any>,
  timeline: Action[]
  options: Option[]
}

export interface Panel {
  go: (frame: Frame) => Action,
  showOptions: () => Action,
  wait: (time: number) => Action
}

export type Frame = (panel: Panel) => FrameOptions

export interface IvyProps {
  initialFrame: Frame
}

export interface IvyState {
  frame: Frame
}

class Ivy extends React.Component<IvyProps, IvyState> {
  public componentWillMount(): void {
    this.setState({
      frame: this.props.initialFrame
    })
  }

  public render(): JSX.Element {
    return (
      <span>Ivy Initial Commit</span>
    )
  }
}

export default Ivy
