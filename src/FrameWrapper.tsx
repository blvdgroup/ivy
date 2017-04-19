import * as React from 'react'

import { FrameOptions } from './types'

export interface FrameWrapperProps extends FrameOptions {
  currentTimelineIndex: number
}

class FrameWrapper extends React.Component<FrameWrapperProps, any> {
  public render(): JSX.Element {
    return (
      <this.props.background />
    )
  }
}

export default FrameWrapper
