import * as THREE from 'three'
import { galaxyMaterial } from './materials/material'
export const createSpace = () => {
  // Load Galaxy Textures
  const galaxyGeometry = new THREE.SphereGeometry(200, 50, 50)
 
  let galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial)

  return galaxy
}
