import * as React from 'react'

import { Option, OptionsPanelProps } from './types'

class DefaultOptionsPanel extends React.Component<OptionsPanelProps, any> {
  public render(): JSX.Element {
    return (
      <div style={this.props.defaultStyle}>
        <span>
          {this.props.options.map((o: Option, i: number) => (<span onClick={o.onSelect} key={`option${i}`}>{o.text}</span>))}
        </span>
      </div>
    )
  }
}

export default DefaultOptionsPanel
