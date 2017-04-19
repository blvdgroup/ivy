import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Ivy from '../src/index'

storiesOf('Ivy', module)
  .add('to Storybook', () => (
    <Ivy 
      initialFrame={(panel) => ({
        background: () => (<span>background</span>),
        timeline: [
          () => { console.log(Date.now()) },
          panel.wait(1000),
          () => { console.log(Date.now()) }
        ],
        options: []
      })}/>
  ));
