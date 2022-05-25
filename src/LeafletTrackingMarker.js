import { createLayerComponent } from '@react-leaflet/core'
import { BaseMarker } from './BaseMarker'

const defaultPosition = [0, 0]
const computeBearing = (previousPosition = defaultPosition, nexPosition) => {
  let bearing = Math.atan2(nexPosition[0] - previousPosition[0], nexPosition[1] - previousPosition[1])
  bearing = bearing * (180 / Math.PI)
  bearing = (bearing + 360) % 360
  bearing = 360 - bearing
  return bearing
}

const createMarker = ({ position, previousPosition, ...options }, ctx) => {
  const bearingAngle = options.customAngle?options.customAngle:0
  // console.log("create marker",options.customAngle)
  const instance = new BaseMarker(position, { ...options, bearingAngle })
  return { instance, context: { ...ctx, overlayContainer: instance } }
}

const updateMarker = (marker, props, prevProps) => {
  const { position, previousPosition, duration, keepAtCenter, icon, zIndexOffset, opacity, draggable, rotationOrigin } = props
  if (prevProps.position !== position && typeof duration == 'number') {
    marker.slideTo(position, {
      duration,
      keepAtCenter
    })
  }
  if (icon && icon !== prevProps.icon) {
    marker.setIcon(icon)
  }
  if (zIndexOffset && zIndexOffset !== prevProps.zIndexOffset) {
    marker.setZIndexOffset(zIndexOffset)
  }
  if (opacity && opacity !== prevProps.opacity) {
    marker.setOpacity(opacity)
  }
  if (marker.dragging && draggable !== prevProps.draggable) {
    if (draggable === true) {
      marker.dragging.enable()
    } else {
      marker.dragging.disable()
    }
  }
  // if (previousPosition?.[0] !== position[0] && previousPosition?.[1] !== position[1]) {
    // console.log("update marker",props.customAngle);
    //ss
    // -- jodie keep rotate 
    console.log("bangle = ",this.options.prevBangle," bearing = ",this.options.bearingAngle)
    //========================================================
    // Ensure marker keeps rotated during dragging
    const bearingAngle = props.customAngle?props.customAngle:0
    marker.setRotationAngle(bearingAngle)
  // }
  // if (rotationOrigin !== prevProps.rotationOrigin) {
  //   marker.setRotationOrigin(rotationOrigin)
  // }
}

export const LeafletTrackingMarker = createLayerComponent(createMarker, updateMarker)
