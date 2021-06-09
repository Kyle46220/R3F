import * as THREE from 'three';
import React, { useRef, useState, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Controls, useControl } from 'react-three-gui';
import { useSnapshot, proxy, subscribe } from 'valtio';
import { useStore } from './zusStore';
import DrawerModel from './DrawerGLTFJSX';
import store from './store';

export default function CabSection() {
	const { nodes, materials } = useLoader(GLTFLoader, '/Assembly4.gltf');
	const group = useRef();
	const drawer = useRef();
	const [active, setActive] = useState(false);
	const getCenter = (e) => {
		console.log(e);
		console.log(group.current);
		// group.current.geometry.boundingBox.getCenter();
	};

	const handlePointerOver = (e) => {
		e.stopPropagation();
		group.current.children[0].visible = true;
	};
	const handlePointerOut = (e) => {
		e.stopPropagation();
		group.current.children[0].visible = false;
	};
	const handleClick = (e) => {
		e.stopPropagation();
		setActive(!active);
		console.log(group.current);
	};

	return (
		<group ref={group}>
			<mesh
				name={nodes.Solid33.name}
				material={nodes.Solid33.material}
				geometry={nodes.Solid33.geometry}
				onPointerOver={(e) => handlePointerOver(e)}
				onPointerOut={(e) => handlePointerOut(e)}
				onClick={(e) => handleClick(e)}
				visible={true}
			>
				<meshStandardMaterial
					attach="material"
					color={'#db76d1'}
					transparent={true}
					opacity={0.25}
				/>
			</mesh>
			<mesh
				material={nodes.Solid51.material}
				geometry={nodes.Solid51.geometry}
			></mesh>
			<DrawerModel
				ref={drawer}
				onClick={() => setActive(!active)}
				visible={active ? true : false}
				position={[-300, 200, 520]}
			/>
		</group>
	);
}
