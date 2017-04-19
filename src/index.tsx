import * as React from 'react'

import { Action, Frame, FrameOptions } from './types'
import FrameWrapper from './FrameWrapper'
import { timeout } from './utils'

export interface IvyProps {
  initialFrame: Frame
}

export interface IvyState {
  frame: FrameOptions,
  optionsVisible: boolean,
  currentTimelineIndex: number,
  activeTimeline: string
}

class Ivy extends React.Component<IvyProps, IvyState> {
  constructor(props: IvyProps) {
    super(props)
    this.state = {
      frame: this.makeFrame(props.initialFrame),
      optionsVisible: false,
      currentTimelineIndex: 0,
      activeTimeline: 'abc'
    }
  }

  public componentDidMount(): void {
    this.runTimeline().then(() => { console.log('Ran the mount timeline') })
  }

  public updateFrame(f: Frame): void {
    this.setState({
      frame: this.makeFrame(f),
      currentTimelineIndex: 0
    }, () => {
      this.runTimeline()
    })
  }

  public render(): JSX.Element {
    return (
      <div style={{
        width: '600px',
        height: '400px',
        backgroundColor: 'green'
      }}>
        <FrameWrapper
          {...this.state.frame}
          currentTimelineIndex={this.state.currentTimelineIndex} />
      </div>
    )
  }

  private makeFrame(f: Frame): FrameOptions {
    return f({
      go: (frame: Frame) => () => { this.updateFrame(frame) },
      showOptions: () => () => { this.setState({ optionsVisible: true }) },
      wait: (num: number) => async (): Promise<boolean> => {
        await timeout(num)
        return true
      }
    })
  }

  private runTimeline(): Promise<any> {
    const timeline = this.state.frame.timeline

    // this is a magic way to run an array of promises sequentially
    // we reduce the array into a single promise by taking the previous promise, and returning a promise
    // equivalent to that promise but with the next item in the array attached via a then call

    // this stuff is to prevent two timelines running in parallel
    const timelineId = Math.round(Math.random() * 10000).toString(16)
    this.setState({ activeTimeline: timelineId })
    console.log('Kicking off timeline ' + timelineId)

    // ok here we go the one promise to rule them all
    return timeline.reduce((a: Promise<any>, b: Action): Promise<any> => {
      return a.then(() => {
        // code placed here will be run BEFORE every promise
        console.log('Attempting to run ' + this.state.currentTimelineIndex + ' from timeline ' + timelineId)

        // this is to prevent multiple timelines running at the same time
        if (this.state.activeTimeline !== timelineId) {
          return Promise.reject('Timeline exited early. Attempted to run timeline '
            + timelineId + ' when ' + this.state.activeTimeline + ' is active.')
        }

        // this is frankly a really dumb line
        return Promise.resolve(b() || true).then(() => {
          // code placed here will be run AFTER every promise
          console.log('Successfully ran ' + this.state.currentTimelineIndex + ' from timeline ' + timelineId)

          // we also bump the timeline index
          this.setState({ currentTimelineIndex: this.state.currentTimelineIndex + 1 })

          // hey remember when "this" could be basically anything at this point in your nested functions
          // good times
        })
      })
      //                and if you don't love me now, you will never love me again
    }, Promise.resolve('i can stilllllll hear you sayin, you would never break the chain')) // (never break the chain)
      .catch(console.log)
  }
}

export default Ivy
