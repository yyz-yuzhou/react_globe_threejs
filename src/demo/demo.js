import React, { useRef, useEffect } from 'react'
import { init } from './init/init'

const Demo = (props) => {
  const container = useRef(null)
  //挂载
  useEffect(()=>{
    init(container)
  },[])
  return (
    <div className="earthContainer" ref={container}>
      <div id="textBox"></div>
    </div>
  )
}

export default Demo

