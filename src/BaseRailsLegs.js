/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useLoader(GLTFLoader, '/BaseRailsLegs.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh material={materials.Panel_Beige} geometry={nodes.RailB.geometry} />
      <mesh material={materials.Panel_Beige} geometry={nodes.RailR.geometry} />
      <mesh material={materials.Panel_Beige} geometry={nodes.RailF.geometry} />
      <mesh material={materials.Panel_Beige} geometry={nodes.RailL.geometry} />
      <mesh material={materials.Panel_Beige} geometry={nodes.BaseBoard.geometry} />
      <mesh material={materials.Panel_Beige} geometry={nodes.LegBR.geometry} />
      <mesh material={materials.Panel_Beige} geometry={nodes.LegFR.geometry} />
      <mesh material={materials.Panel_Beige} geometry={nodes.LegFL.geometry} />
      <mesh material={materials.Panel_Beige} geometry={nodes.LegBL.geometry} />
      <mesh material={materials.Panel_Beige} geometry={nodes.BRLegBlock.geometry} />
      <mesh material={materials.Panel_Beige} geometry={nodes.BLLegBlock.geometry} />
      <mesh material={materials.Panel_Beige} geometry={nodes.FRLegBlock.geometry} />
      <mesh material={materials.Panel_Beige} geometry={nodes.FLLegBlock.geometry} />
    </group>
  )
}
