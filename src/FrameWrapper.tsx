import * as React from 'react'

import { FrameOptions, OptionsPanelComponent } from './types'
import EventHandler from 'ev-emitter'

export interface FrameWrapperProps extends FrameOptions {
  optionsVisible: boolean,
  optionsComponent: OptionsPanelComponent,
  events: EventHandler
}

const FrameWrapper = (props: FrameWrapperProps): JSX.Element => (
  <div style={{
    height: '100%',
    width: '100%',
    background: 'grey',
    position: 'relative',
    overflow: 'hidden'
  }}>
    {/* Background */}
    <div style={{
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      zindex: 10
    }}>
      <props.background events={props.events} />
    </div>

    {/* Options panel */}
    <div style={{
      height: '100px',
      width: 'calc(100% - 50px)',
      bottom: props.optionsVisible ? 0 : '-100px',
      left: '25px',
      zIndex: 20,
      position: 'absolute',
      transition: 'bottom 0.5s ease-in',
      background: 'white',
      opacity: props.optionsVisible ? 1 : 0
    }}>
      <props.optionsComponent options={props.options} />
    </div>
  </div>
)

export default FrameWrapper
