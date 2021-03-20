import React, {CSSProperties, FC, useEffect, useRef, useState} from 'react'
import { Octadground as NativeOctadground } from 'octadground'
import {Api} from "octadground/api";
import {Config} from "octadground/config";

export interface OctadgroundProps {
  width?: string | number;
  height?: string | number;
  ofen: string;
  orientation?: string;
  turnColor?: string;
  check?: string | boolean;
  lastMove?: string[];
  selected?: string;
  coordinates?: boolean;
  autoCastle?: boolean;
  viewOnly?: boolean;
  disableContextMenu?: boolean;
  resizable?: boolean;
  addPieceZIndex?: boolean;
  highlight?: object;
  animation?: object;
  movable?: object;
  premovable?: object;
  predroppable?: object;
  draggable?: object;
  selectable?: object;
  onChange?: Function;
  onMove?: Function;
  onDropNewPiece?: Function;
  onSelect?: Function;
  items?: object;
  drawable?: object;
  style?: CSSProperties;
}

const Octadground: FC<OctadgroundProps> = (props) => {
  const el = useRef<HTMLElement>(null);
  const [og, setOg] = useState<Api>();

  const defaultProps: Partial<OctadgroundProps> = {
    coordinates: true,
    resizable: true,
    highlight: {
      lastMove: true,
      check: true
    }
  }

  const buildConfigFromProps = (props: OctadgroundProps): Config => {
    const config = { events: {} }
    Object.keys(Octadground.propTypes).forEach(k => {
      const v = props[k]
      if (typeof v !== 'undefined') {
        const match = k.match(/^on([A-Z]\S*)/)
        if (match) {
          config.events[match[1].toLowerCase()] = v
        } else {
          config[k] = v
        }
      }
    })
    return config
  }

  useEffect(() => {
    setOg(
      NativeOctadground(
        el.current,
        buildConfigFromProps(
          Object.assign(defaultProps, props)
        )
      )
    )

    return og.destroy
  }, [])

  useEffect(() => {
    setOg(og => {
      const tempOg = og;
      tempOg.set(
        buildConfigFromProps(props)
      );
      return tempOg;
    })
  }, [props])

  return (
    <div
      ref={ref => el.current = ref}
      style={Object.assign(props.style, {
        height: props.height,
        width: props.width
      })}
    />
  )
}

export default Octadground;
