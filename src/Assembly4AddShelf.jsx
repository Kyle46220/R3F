/*
auto-generated by: https://github.com/react-spring/gltfjsx
*/

import * as THREE from 'three';
import React, { useRef, useState } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useSnapshot, proxy } from 'valtio';
import store from './store';

export default function AddShelfModel(props) {
	const { nodes, materials } = useLoader(GLTFLoader, '/Assembly4.gltf');
	const snap = useSnapshot(store);

	const handlePointerOver = (e) => {
		e.stopPropagation();
		const array = Object.entries(nodes);
		const result = array.filter((node) => node[1].name === e.object.name);
		const name = result[0][0];

		return (store.items.addedShelves.[name].hover = true);
	};

	const handlePointerOut = (e) => {
		e.stopPropagation();
		const array = Object.entries(nodes);
		const result = array.filter((node) => node[1].name === e.object.name);
		const name = result[0][0];
		console.log(result);

		return (store.items.addedShelves.[name].hover = false);
	};
	const handleClick = (e) => {
		//this function will put the clicked thing into the store object. in its right category
		e.stopPropagation();

		const array = Object.entries(nodes);
		const result = array.filter((node) => node[1].name == e.object.name);
		const name = result[0][0];
		const center = new THREE.Vector3();
		console.log(store.items, name);
		return (store.items.addedShelves[
			name
		].position = e.object.geometry.boundingBox.getCenter(center));
	};
	const group = useRef();

	return (
		<group ref={group} {...props} dispose={null} position-z={-295}>
			<mesh
				material={nodes.Solid1.material}
				geometry={nodes.Solid1.geometry}
			></mesh>
			<mesh
				material={nodes.Solid52.material}
				geometry={nodes.Solid52.geometry}
			/>
			<mesh
				name={nodes.Solid11_1.name}
				material={nodes.Solid11_1.material}
				geometry={nodes.Solid11_1.geometry}
				onPointerOver={(e) => handlePointerOver(e)}
				onPointerOut={(e) => handlePointerOut(e)}
				onClick={(e) => handleClick(e)}
			>
				<meshStandardMaterial
					attach="material"
					color={'blue'}
					transparent={true}
					opacity={snap.items.Solid11_1 ? 0.5 : 0}
				/>
			</mesh>
			<mesh
				name={nodes.Solid12.name}
				material={nodes.Solid12.material}
				geometry={nodes.Solid12.geometry}
			></mesh>

			<mesh
				name={nodes.Solid41.name}
				material={nodes.Solid41.material}
				geometry={nodes.Solid41.geometry}
			></mesh>

			<mesh
				name={nodes.Solid112.name}
				material={nodes.Solid112.material}
				geometry={nodes.Solid112.geometry}
			/>

			<mesh
				material={nodes.Solid6.material}
				geometry={nodes.Solid6.geometry}
				onPointerOver={(e) => handlePointerOver(e)}
				onPointerOut={(e) => handlePointerOut(e)}
				onClick={(e) => handleClick(e)}
			>
				<meshStandardMaterial
					attach="material"
					color={'blue'}
					transparent={true}
					opacity={snap.items.Solid6a ? 0.5 : 0}
				/>
			</mesh>
		</group>
	);
}
