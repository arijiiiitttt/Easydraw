import React from 'react'
import ColorPicker from './ColorPicker'
import DrawingCanvas from './DrawingCanvas'
import Toolbar from './Toolbar'

const h = () => {
  return (
    <>
    <DrawingCanvas/>
    <Toolbar/>
    <ColorPicker/>

    </>
  )
}

export default h