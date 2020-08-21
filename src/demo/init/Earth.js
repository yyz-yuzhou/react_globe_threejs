import * as THREE from 'three'

export const createEarth = () => {
  // 加载纹理
  const textureLoader = new THREE.TextureLoader()
  const earthTexture = textureLoader.load(require('./../../static/img/arenaEarth.jpg'))
  const earthNormalTexture = textureLoader.load(require('./../../static/img/earthNormalMap.jpg'))
  
  const earthGeometry = new THREE.SphereGeometry(55, 20, 20)
  const earthMaterial = new THREE.MeshLambertMaterial({
    map: earthTexture, //设置纹理贴图
    normalMap: earthNormalTexture,
    transparent: true,
  })
  let earth = new THREE.Mesh(earthGeometry, earthMaterial)
  earth.position.set(0,0,0)
 
  return earth
}
