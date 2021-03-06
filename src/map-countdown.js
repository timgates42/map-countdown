import Countdown from './countdown'
import Map from './map/map'
import { WINDOW_ROUTE_POINTS_KEY } from './constants'
import { ROUTE_OPTIONS_MISSING_ERROR } from './texts'
import './style.css'

export default class MapCountdown {
  constructor ({ selector, key, meta, translations }) {
    if (!window[WINDOW_ROUTE_POINTS_KEY]) {
      console.error(ROUTE_OPTIONS_MISSING_ERROR)
      return
    }
    this.containerElement = document.querySelector(selector)
    this.containerElement.classList.add('map-countdown')
    this.countdown = new Countdown({
      containerElement: this.containerElement,
      meta,
      translations
    })
    this.map = new Map({
      key,
      containerElement: this.containerElement
    })

    this.map.setRoutePoints(window[WINDOW_ROUTE_POINTS_KEY])
    this.attachEvents()

    delete window[WINDOW_ROUTE_POINTS_KEY]
  }
  attachEvents () {
    this.countdown.addEventListener(
      'countdown:recount',
      this.updateMap.bind(this)
    )
  }

  updateMap (ratios) {
    this.map.updatePolygons(...Object.values(ratios))
  }
}
