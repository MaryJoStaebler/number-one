import { expect } from 'chai'
import sinon from 'sinon'
import 'mocha'

import { Website } from '../../../chat/commands/website'
import { OnCommandEvent } from '../../../models'
import { EventBus, Events } from '../../../events'

import { activeStream, onCommandExtra, user, viewerFlags } from '../../test-objects'

let onCommandEvent: OnCommandEvent

beforeEach(() => {
  onCommandEvent = new OnCommandEvent(
    user(),
    'website',
    '!website',
    viewerFlags(),
    onCommandExtra(),
    activeStream())
})

afterEach(() => {
  EventBus.eventEmitter.removeAllListeners()
})

describe('Commands: Website', () => {

  it('should send message to chat', () => {
    var spy = sinon.spy()

    const emitter = EventBus.eventEmitter
    emitter.on(Events.OnSay, spy)

    Website(onCommandEvent)

    expect(spy.called).to.equal(true)
  })

})