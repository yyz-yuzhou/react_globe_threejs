import * as THREE from 'three'
import Orbitcontrols from 'three-orbitcontrols'
// import Stats from './../tool/stats.min'
import { createEarth } from './Earth'
import { createLight } from './light'
import { createSpace } from './space'
import { drawLine } from './tool/drawLine'
import { drawPoint } from './tool/drawPoint'
import { lineUniforms } from './materials/material'
import * as Stats from 'stats.js'
export const init = (props) => {
  //获取父元素的高宽
  console.log(props, 'prop')
  const container = props.current
  const textBox = container.children[0]
  const width = container.clientWidth
  const height = container.clientHeight

  //初始化场景
  const scene = new THREE.Scene()

  //初始化地球组
  const earthGroup = new THREE.Group()

  //添加模型
  const earth = createEarth()
  earthGroup.add(earth)

  const galaxy = createSpace()

  //画线
  let line1 = drawLine(116.23, 39.54, -0.7, 51.3)
  let line2 = drawLine(121.29, 31.14, 139.44, 35.39)
  let line3 = drawLine(2.2, 42.51, -74, 40.43)
  let line4 = drawLine(116.23, 39.54, -58.4, -34.6)
  earthGroup.add(line1, line2, line3, line4)

  //画点
  let pointList = []
  let circleList = []
  let [point1, circle1] = drawPoint(-0.7, 51.3)
  let [point2, circle2] = drawPoint(139.44, 35.39)
  let [point3, circle3] = drawPoint(-74, 40.43)
  let [point4, circle4] = drawPoint(-58.4, -34.6)
  pointList.push(point1, point2, point3, point4)
  circleList.push(circle1, circle2, circle3, circle4)
  earthGroup.add(point1, point2, point3, point4, circle1, circle2, circle3, circle4)

  console.log(scene)
  scene.add(galaxy)
  scene.add(earthGroup)

  //交互
  let raycaster = new THREE.Raycaster()
  let mouse = new THREE.Vector2()
  let INTERSECTED
  container.addEventListener('mousemove', onMouseMove, false)

  //设置照相机

  const whRatio = width / height
  const camera = new THREE.OrthographicCamera(-100 * whRatio, 100 * whRatio, 100, -100, 1, 5000)
  camera.position.set(100, 50, -80)
  // const camera = new THREE.PerspectiveCamera(60, width / height, 80, 2000)
  // camera.position.set(0, 150, 150)
  camera.lookAt(scene.position)

  //设置全景灯
  let lightings = createLight(earth)
  scene.add(lightings)

  //将webgl元素添加到dom上面去
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height) //设置渲染区域尺寸
  renderer.setClearColor(0xb9d3ff, 1) //设置背景颜色
  container.appendChild(renderer.domElement) //body元素中插入canvas对象

  //动画
  function render() {
    renderer.render(scene, camera)
    stats.update()
    // // group.rotateY(0.01)
    circleList.forEach((item) => {
      item.scale.x = item.scale.x + 0.005
      item.scale.y = item.scale.y + 0.005
      if (item.scale.x > 1.1) {
        item.material.opacity = item.material.opacity - 0.005
      }
      if (item.scale.x > 2) {
        item.scale.x = 1
        item.scale.y = 1
        item.material.opacity = 0.8
      }
    })
    galaxy.rotateY(0.005)
    lineUniforms.time.value += 0.01
    requestAnimationFrame(render) //请求再次执行渲染函数render
  }

  // 控制器
  const controls = new Orbitcontrols(camera, renderer.domElement)
  controls.autoRotate = false

  //性能监听
  const stats = new Stats()
  stats.setMode(0)
  container.appendChild(stats.domElement)

  //渲染
  render()

  function onMouseMove(event) {
    INTERSECTED = null
    mouse.x = (event.offsetX / width) * 2 - 1
    mouse.y = -(event.offsetY / height) * 2 + 1
    raycaster.setFromCamera(mouse, camera)

    pointList.forEach((point) => {
      if (point.currentHex) {
        point.material.color.setHex(point.currentHex)
      }
    })
    textBox.style.display = 'none'
    var intersects = raycaster.intersectObjects(pointList, true)

    if (intersects[0]) {
      INTERSECTED = intersects[0].object
      INTERSECTED.currentHex = INTERSECTED.material.color.getHex()
      INTERSECTED.material.color.setHex(0xffffff)
      //将选中物体的三维坐标转化
      var position = new THREE.Vector3(INTERSECTED.position.x, INTERSECTED.position.y, INTERSECTED.position.z)
      console.log(transPosition(position), 'transpos')
      textBox.style.display = 'inline-block'
      textBox.style.left = transPosition(position).x + 'px'
      textBox.style.top = transPosition(position).y + 'px'
      textBox.innerHTML = 'Location: E 166。20℃ W 36.56℃'
    }

    controls.update()
    renderer.render(scene, camera)
  }

  function transPosition(position) {
    let world_vector = new THREE.Vector3(position.x, position.y, position.z)
    let vector = world_vector.project(camera)
    let halfWidth = width / 2,
      halfHeight = height / 2
    return {
      x: Math.round(vector.x * halfWidth + halfWidth),
      y: Math.round(-vector.y * halfHeight + halfHeight),
    }
  }
}
