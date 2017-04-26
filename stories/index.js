import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Ivy from '../src/index'
import BuiltIvy from '../build/index'

const frame1 = (panel) => ({
  background: () => (<span>panel 1</span>),
  timeline: [
    () => { console.log(Date.now()) },
    panel.wait(1000),
    () => { console.log(Date.now()) },
    panel.showOptions()
  ],
  options: [
    { text: 'option 1', onSelect: () => { console.log('option 1'); panel.go(frame2)() } },
    { text: 'option 2', onSelect: () => { console.log('option 2') } }
  ]
})

const frame2 = (panel) => ({
  background: () => (<span>panel 2</span>),
  timeline: [
    () => { console.log('Panel 2') },
    () => { console.log(Date.now()) },
    panel.wait(1000),
    () => { console.log(Date.now()) },
    panel.showOptions()
  ],
  options: [
    { text: 'option 3', onSelect: () => { console.log('option 3') } },
    { text: 'option 4', onSelect: () => { console.log('option 4') } }
  ]
})

const optsPanel = ({ options }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
    <div style={{
      width: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      position: 'absolute',
      textAlign: 'center'
    }}>
      {options.map((o, i) => (
        <span
          style={{
            margin: '0 10px'
          }}
          onClick={o.onSelect}
          key={`option${i}`}>{o.text}</span>
      ))}
    </div>
  </div>
)

storiesOf('Ivy', module)
  .add('default options panel', () => (
    <Ivy initialFrame={frame1} />
  ))
  .add('custom options panel', () => (
    <Ivy initialFrame={frame1} optionsPanel={optsPanel} />
  ))
  .add('built ivy', () => (
    <BuiltIvy initialFrame={frame1} />
  ));
