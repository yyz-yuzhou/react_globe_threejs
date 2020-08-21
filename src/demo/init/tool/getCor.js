import * as THREE from 'three'

export const getCordinate = (longitude, latitude, radius = 55) => {
  var phi = (90 - latitude) * (Math.PI / 180)
  var theta = (longitude + 180) * (Math.PI / 180)

  let x = -(radius * Math.sin(phi) * Math.cos(theta))
  let z = radius * Math.sin(phi) * Math.sin(theta)
  let y = radius * Math.cos(phi)

  return new THREE.Vector3(x, y, z)
}
