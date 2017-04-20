import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Ivy from '../src/index'

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

storiesOf('Ivy', module)
  .add('to Storybook', () => (
    <Ivy 
      initialFrame={frame1}/>
  ));
