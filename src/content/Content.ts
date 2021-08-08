import { browser } from 'webextension-polyfill-ts'
import { Channel, ChannelModifiers } from '@src/shared/types'

interface FormattedChannel {
  value: string
  method: 'regex' | 'includes' | 'exact'
  modifiers: 'i' | 'g' | 'gi' | ''
}

interface Settings {
  quickblock: boolean
}

interface VideoElement extends HTMLElement {
  __ytblckaddon__quickblock: boolean
}

const videosSelector =
  'ytd-rich-grid-video-renderer, ytd-video-renderer, ytd-grid-video-renderer, ytp-videowall-still, ytd-compact-video-renderer'

export default class Content {
  container: HTMLElement
  observer: MutationObserver
  channels: FormattedChannel[]
  // @ts-ignore
  rawChannels: Channel[]
  // @ts-ignore
  settings: Settings

  constructor() {
    this.mutationCallback = this.mutationCallback.bind(this)
    this.channels = []
    // @ts-ignore
    this.container = document.querySelector('ytd-page-manager')
    this.observer = new MutationObserver(this.mutationCallback)

    this.observer.observe(this.container, { childList: true, subtree: true })
  }

  public mount(channels: Channel[], settings: Settings): void {
    this.setChannels(channels)
    this.settings = settings
  }

  public update(channels?: Channel[], quickblock?: boolean): void {
    if (channels !== null) {
      // @ts-ignore
      this.setChannels(channels)
      this.mutationCallback()
    }

    if (quickblock !== null) {
      const videos = this.container.querySelectorAll(videosSelector)

      if (quickblock) {
        if (quickblock !== this.settings.quickblock) {
          this.createQuickBlockButtons(videos)
        }
      } else {
        this.removeQuickBlockButtons(videos)
      }
      // @ts-ignore
      this.settings = {
        // @ts-ignore
        quickblock,
      }
    }
  }

  private setChannels(channels: Channel[]): void {
    this.channels = Content.format(channels)
    this.rawChannels = channels
  }

  private removeQuickBlockButtons(videos: NodeList): void {
    for (let i = 0; i < videos.length; i += 1) {
      const video = videos.item(i) as VideoElement
      video.__ytblckaddon__quickblock = false

      const button = video.querySelector('.ytbck-quickblock')

      if (button) {
        button.remove()
      }
    }
  }

  private createQuickBlockButtons(videos: NodeList): void {
    for (let i = 0; i < videos.length; i += 1) {
      const video = videos.item(i) as VideoElement

      if (video.__ytblckaddon__quickblock) {
        continue
      }

      const button = document.createElement('button')
      button.setAttribute('type', 'button')
      button.setAttribute('title', 'Block channel')
      button.innerHTML =
        '<svg fill="#fff" width="10px" height="10px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path d="M.293 1.707A1 1 0 111.707.293L7 5.586 12.293.293a1 1 0 111.414 1.414L8.414 7l5.293 5.293a1 1 0 01-1.414 1.414L7 8.414l-5.293 5.293a1 1 0 01-1.414-1.414L5.586 7 .293 1.707z"/></svg>'
      button.classList.add('ytbck-quickblock')

      button.style.position = 'absolute'
      button.style.top = '5px'
      button.style.left = '5px'
      button.style.border = '0'
      button.style.borderRadius = '2px'
      button.style.background = '#eb003f'
      button.style.padding = '0'
      button.style.cursor = 'pointer'
      button.style.outline = 'none'
      button.style.width = '20px'
      button.style.height = '20px'
      button.style.marginRight = '5px'
      button.style.zIndex = '1'
      button.style.display = 'flex'
      button.style.justifyContent = 'center'
      button.style.alignItems = 'center'

      button.addEventListener('click', () => this.blockChannel(video))

      // @ts-ignore
      video.querySelector('ytd-thumbnail').prepend(button)
      video.__ytblckaddon__quickblock = true
    }
  }

  private blockChannel(video: VideoElement): void {
    const channelNameElement = video.querySelector(
      'ytd-channel-name yt-formatted-string'
    )
    const channelName = channelNameElement
      ? channelNameElement.textContent
      : null

    if (channelName === null) {
      return
    }

    const blockedChannel = {
      mode: 'text',
      modifiers: {
        caseInsensitive: false,
        global: false,
      },
      value: channelName,
    }

    const channels = [...this.rawChannels, blockedChannel]

    browser.storage.local.set({ channels })
  }

  private mutationCallback(): void {
    const videos = this.container.querySelectorAll(videosSelector)

    if (this.settings.quickblock) {
      this.createQuickBlockButtons(videos)
    }

    for (let i = 0; i < videos.length; i += 1) {
      const video = videos.item(i) as HTMLElement
      const name = video.querySelector('ytd-channel-name yt-formatted-string')

      if (!name) break

      for (let j = 0; j < this.channels.length; j += 1) {
        const channel = this.channels[j]
        // @ts-ignore
        this[channel.method](name.textContent, video, channel)
      }
    }
  }

  private includes(
    name: string,
    video: HTMLElement,
    channel: FormattedChannel
  ): void {
    if (Content.transform(channel, name).includes(channel.value)) {
      video.remove()
    }
  }

  private exact(
    name: string,
    video: HTMLElement,
    channel: FormattedChannel
  ): void {
    if (Content.transform(channel, name) === channel.value) {
      video.remove()
    }
  }

  private regex(
    name: string,
    video: HTMLElement,
    channel: FormattedChannel
  ): void {
    const regexp = new RegExp(channel.value, channel.modifiers)
    if (regexp.test(name)) {
      video.remove()
    }
  }

  private static transform(channel: FormattedChannel, name: string): string {
    return channel.modifiers === 'i' ? name.toLowerCase() : name
  }

  private static format(channels: Channel[]): FormattedChannel[] {
    return channels.map((channel) => {
      if (channel.mode === 'regex') {
        return {
          method: channel.mode,
          value: channel.value,
          modifiers: Content.createRegexModifiers(channel.modifiers),
        } as FormattedChannel
      } else {
        let value = channel.value
        let modifiers = ''

        if (channel.modifiers.caseInsensitive) {
          value = value.toLowerCase()
          modifiers = 'i'
        }

        return {
          method: channel.modifiers.global ? 'includes' : 'exact',
          value,
          modifiers,
        } as FormattedChannel
      }
    })
  }

  private static createRegexModifiers(modifiers: ChannelModifiers): string {
    let str = ''

    if (modifiers.global) {
      str += 'g'
    }

    if (modifiers.caseInsensitive) {
      str += 'i'
    }

    return str
  }
}
