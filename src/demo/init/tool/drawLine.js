import * as THREE from 'three'
import { getCordinate } from './getCor'
import { lineShaderMaterial } from './../materials/material'
export const drawLine = (longitude, latitude, longitude2, latitude2) => {
  let v0 = getCordinate(longitude, latitude, 56)
  let v3 = getCordinate(longitude2, latitude2, 56)
  let { v1, v2 } = getBezierPoint(v0, v3) // 三维二次贝赛尔曲线
  let curve = new THREE.CubicBezierCurve3(v0, v1, v2, v3) //创建曲线
  let geometry = new THREE.TubeGeometry(curve, 40, 0.6, 8, false)
  let line = new THREE.Mesh(geometry, lineShaderMaterial)
  return line
}

// 获取贝塞尔控制点 2个
function getBezierPoint(v0, v3) {
  let angle = (v0.angleTo(v3) * 180) / Math.PI // 0 ~ Math.PI       // 计算向量夹角
  // let ranNum = Math.random() * 0.5 + 0.4
  // let aLen = angle * ranNum,
    let aLen = angle * 0.5,
    // hLen = angle * angle * 50;
    hLen = angle * angle * 120
  let p0 = new THREE.Vector3(0, 0, 0) // 法线向量
  let rayLine = new THREE.Ray(p0, getVCenter(v0.clone(), v3.clone())) // 从远点到中点发射射线
  let vtop = new THREE.Vector3()
  vtop = rayLine.at(hLen / rayLine.at(1, vtop).distanceTo(p0), vtop) // 位置
  // 控制点坐标
  let v1 = getLenVcetor(v0.clone(), vtop, aLen)
  let v2 = getLenVcetor(v3.clone(), vtop, aLen)
  return {
    v1: v1,
    v2: v2,
  }
}

//求两点中的中点 : 将两个向量相加然后除以二
function getVCenter(v1, v2) {
  let v = v1.add(v2)
  // console.log(v, 'v')
  return v.divideScalar(2)
}

//获取两点间指定比例位置坐标
function getLenVcetor(v1, v2, len) {
  //两点间的距离
  let v1v2Len = v1.distanceTo(v2)
  return v1.lerp(v2, len / v1v2Len)
}

// function drawLine(longitude, latitude, longitude2, latitude2) { //传入两个经纬度
//   // let geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
//   let v0 = getCordinate(longitude, latitude, 55);
//   let v3 = getCordinate(longitude2, latitude2, 55);
//   // let {
//   //   v1,
//   //   v2
//   // } = this.getBezierPoint(v0, v3); // 三维二次贝赛尔曲线

//   let hv0 = getCordinate(longitude, latitude, 55 * 2.5);
//   let hv1 = getCordinate(longitude2, latitude2, 55 * 2.5);
//   console.log(hv0, 'hv0');
//   console.log(hv1, 'hv1');
//   let v1 = hv0.add(hv1).divideScalar(2)
//   // let v1 = hv0.add(hv1);
//   // let v2 = hv0.add(hv1).divide(3).dot(2);
//   console.log(v1, 'v1');
//   let curve = new THREE.QuadraticBezierCurve3(v0, v1, v3); //创建曲线
//   let curvePoints = curve.getPoints(100); //获取100个顶点
//   let geometry = new THREE.TubeGeometry(curve, 100, 2, 4, false)
//   console.log(curvePoints, 'curvepoint');
//   geometry.setFromPoints(curvePoints);
//   let material = new THREE.LineBasicMaterial({
//     color: 0x00AAFF,
//     linewidth: 3
//   });
//   let line = new THREE.Line(geometry, material);
//   // this.group.add(line);
//   // this.sport(curvePoints);
//   group.add(line)
//   return line
// }
