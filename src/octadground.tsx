import React, {CSSProperties, FC, useEffect, useRef, useState} from 'react'
import { Octadground as NativeOctadground } from 'octadground'
import {Api} from "octadground/api";
import {Key, Piece, Pieces} from "octadground/types";
import {Config} from "octadground/config";

export { Key, Piece, Pieces };

type PlayPremoveFunction = () => boolean;

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
  highlight?: Config["highlight"];
  animation?: Config["animation"];
  movable?: Config["movable"];
  premovable?: Config["premovable"];
  predroppable?: Config["predroppable"];
  draggable?: Config["draggable"];
  selectable?: Config["selectable"];
  onChange?: () => void;
  onMove?: (orig: Key, dest: Key, pieces: Pieces, capturedPiece?: Piece) => void;
  onDropNewPiece?: (piece: Piece, key: Key) => void;
  onSelect?: (key: Key) => void;
  drawable?: Config["drawable"];
  style?: CSSProperties;
  setPlayPremoveFn: ( fn: PlayPremoveFunction ) => void;
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
    const config: Pick<Config, "events"> = { events: {} }
    Object.keys(props).forEach((propKey: keyof OctadgroundProps) => {
      const propValue = props[propKey]
      if (typeof propValue !== 'undefined') {
        const match: RegExpMatchArray = propKey.match(/^on([A-Z]\S*)/)
        if (match) {
          // @ts-ignore
          config.events[match[1].toLowerCase()] = propValue
        } else {
          // @ts-ignore
          config[propKey] = propValue
        }
      }
    })

    return config
  }

  useEffect(() => {
    const newOctadground = NativeOctadground(
      el.current,
      buildConfigFromProps(
        Object.assign(defaultProps, props)
      )
    );

    setOg(newOctadground)
    props.setPlayPremoveFn(newOctadground.playPremove)

    return () => {
      og?.destroy?.()
    }
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
      style={Object.assign((props.style || {}), {
        height: props.height,
        width: props.width
      })}
    />
  )
}

export default Octadground;
