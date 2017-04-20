import * as React from 'react'

import { Option } from './types'

export interface DefaultOptionsPanelProps {
  options: Option[]
}

class DefaultOptionsPanel extends React.Component<DefaultOptionsPanelProps, any> {
  public render(): JSX.Element {
    return (
      <span>
        {this.props.options.map((o: Option) => (<span onClick={o.onSelect}>{o.text}</span>))}
      </span>
    )
  }
}

export default DefaultOptionsPanel
