export const lineVertex = [
  `varying vec2 vUv;`,
    `  void main()	{`,
      `  vUv = uv;`,
      `	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );`,
      `	gl_Position = projectionMatrix * mvPosition;`,
   `   }`,
].join('\n')

export const lineFragment = [
   `uniform float time;`,
      `varying vec2 vUv;`,
     ` void main( void ) {`,
          `vec3 color =  vec3(0, 0.9, 0.9);`,
          `gl_FragColor = vec4(color,-sin(4.5*(vUv.x*2.5 + (time*0.6))));`,
     ` }`
].join('\n')