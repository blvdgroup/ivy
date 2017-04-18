# ivy

a tool for building interactive stories across platforms using react.

## Usage

We render passing the initial frame to Ivy.

```jsx
import initialFrame from './frames/initial'

render(
  <Ivy initialFrame={initialFrame} />
)
```

What's a frame? This is a frame:

```jsx
import bob from '../characters/bob'

import steamyFrame from './steamy'
import devestatedFrame from './devestated'

export default (panel) => {
  background: () => (<img src={'/pictureOfBeach.jpg'} />),
  charLeft: bob,
  timeline: [
    bob.say('Jane, I love you.'),
    panel.showOptions()
  ],
  options: [
    { text: 'Profess your love.', onSelect: () => { panel.go(steamyFrame) } },
    { text: 'Deny your true feelings.', onSelect: () => { panel.go(devestatedFrame) } }
  ]
}
```

It's sort of like twine, but with the flexibility of react. Say instead of using the character features you just want to play a video then show the options. That's fine too. Here's a frame to do that.

```jsx
import bloodyFrame from './bloody'
import friendshipFrame from './frienship'

import vidProps from '../videos/dramatic'

export default (panel) => {
  background: () => (<YouTubeVideo {...vidProps} />),
  timeline: [
    panel.wait(16000) // Length of the video in milliseconds
    panel.showOptions({ timer: 500, onTimeout: () => { panel.go(bloodyFrame) } })
  ],
  options: [
    { text: 'Shoot the traitor.', onSelect: () => { panel.go(bloodyFrame) } },
    { text: 'Befriend the traitor.' onSelect: () => { panel.go(friendshipFrame) }
  ]
}
```

The background could be stateful, if you wanted. Or it can depend on some props that we pass down. Those are both cool. You could style the options by passing a prop to the root `Ivy` component. You can really just go nuts. It's ok. You're cool.

## getting started

Ivy is best used with the help of an editor. Unfortunately for you, editors don't exist yet. But I'll make one eventually.

In the meantime, the best way to use Ivy is to install it from yarn. I mean, you can use npm too, but we prefer yarn. They're both cool. Note that we're not listed in the npm registry under `ivy`. We're `ivy-stories`.

```shell
yarn add ivy-stories
```

The rest is up to you, dude.
