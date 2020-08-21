import * as THREE from 'three'
export const createLight = (earth) => {
  const lightGroup = new THREE.Group()
  //环境灯
  var ambient = new THREE.AmbientLight(0x444444)
  lightGroup.add(ambient)

  var hemLight = new THREE.HemisphereLight(0xffffff, 0x080820, 1.3)
  hemLight.target = earth
  lightGroup.add(hemLight)
  return lightGroup
}
