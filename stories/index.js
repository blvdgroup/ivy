import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Ivy from '../src/index'

storiesOf('Ivy', module)
  .add('to Storybook', () => (
    <Ivy />
  ));
