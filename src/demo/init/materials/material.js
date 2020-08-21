import * as THREE from 'three'
import { lineVertex, lineFragment } from './shader'

const textureLoader = new THREE.TextureLoader()
export let lineUniforms = {
  time: {
    type: 'f',
    // value: 0.5,
    value: 1,
  },
}

//太空背景
export const galaxyTexture = textureLoader.load(require('./../../../static/img/starfield.png'))
export const galaxyMaterial = new THREE.MeshBasicMaterial({
  map: galaxyTexture,
  side: THREE.BackSide,
  transparent: true,
  // opacity: 0.4,
  // color: 'pink'
})

export const lineShaderMaterial = new THREE.ShaderMaterial({
  uniforms: lineUniforms,
  vertexShader: lineVertex,
  fragmentShader: lineFragment,
  transparent: true,
  alphaTest: 0.5,
})
