import * as THREE from 'three'
import { getCordinate } from './getCor'
export const drawPoint = (longitude, latitude) => {
  let arcMaterial = new THREE.LineBasicMaterial({
    // color: 0x008080,
    color: 'orange',
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.9,
  })

  let LineMateri = new THREE.LineBasicMaterial({
    // color: 0x20b2aa
    color: 'orange',
    transparent: true,
    side: THREE.FrontSide,
  })

  let shapePoint = new THREE.Shape()
  shapePoint.absarc(0, 0, 2.5, 0, 2 * Math.PI, false)
  let arcGeometry = new THREE.ShapeGeometry(shapePoint)

  let point = new THREE.Mesh(arcGeometry, arcMaterial)

  //draw curve
  let geometryLine = new THREE.Geometry()
  let arc = new THREE.ArcCurve(0, 0, 4, 0, 2 * Math.PI)
  let points = arc.getPoints(40)
  geometryLine.setFromPoints(points)

  let line = new THREE.Line(geometryLine, LineMateri)

  let pos = getCordinate(longitude, latitude, 55)

  point.position.set(pos.x, pos.y, pos.z)
  line.position.set(pos.x, pos.y, pos.z)

  point.lookAt(new THREE.Vector3(0, 0, 0))
  line.lookAt(new THREE.Vector3(0, 0, 0))

  return [point, line]
}
