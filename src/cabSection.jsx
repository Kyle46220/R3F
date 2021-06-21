import * as THREE from 'three';
import React, { useRef, useState, useEffect, forwardRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Controls, useControl } from 'react-three-gui';
import { useSnapshot, proxy, subscribe } from 'valtio';
import { useStore } from './zusStore';
import DrawerModel from './DrawerGLTFJSX';
import store from './store';
import { MathUtils } from 'three';
// const ForwardDrawer = forwardRef((props, ref) => <DrawerModel ref={ref} />);

export default function CabSection() {
	const { nodes, materials } = useLoader(GLTFLoader, '/Assembly4.gltf');
	const group = useRef();
	const drawer = useRef();
	const center = {};
	const [active, setActive] = useState(false);
	const snap = useSnapshot(store);
	const scale = snap.transforms.scale;
	function getCenter(e) {
		console.log(e);
		console.log(drawer.current);
		// group.current.geometry.boundingBox.getCenter();
	}
	const drawerClick = () => {};
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
	useFrame(() => {
		group.current.updateMatrixWorld();
	});
	console.log(snap.modelFactors.sectionScaleX());

	return (
		<group ref={group} rotation-x={MathUtils.degToRad(90)}>
			<mesh
				// scale-x={
				// 	snap.transforms.scale.x * snap.transforms.widthDensity * 0.1
				// }
				// position-x={
				// 	snap.transforms.scale.x *
				// 		snap.transforms.pos *
				// 		0.1 *
				// 		1000 *
				// 		0.5 -
				// 	snap.transforms.scale.x *
				// 		snap.transforms.pos *
				// 		0.1 *
				// 		1200 *
				// 		0.5
				// }
				scale-x={
					(snap.modelFactors.width * scale.x) /
					snap.transforms.widthDensity /
					(snap.modelFactors.width / 2)
				}
				position-x={
					((1200 * scale.x) /
						snap.transforms.widthDensity /
						600 /
						2) *
						snap.modelFactors.width -
					snap.modelFactors.width / 2
				}
				// scale-x={snap.modelFactors.sectionScaleX()}
				name={nodes.Solid33.name}
				material={nodes.Solid33.material}
				geometry={nodes.Solid33.geometry}
				// onPointerOver={(e) => handlePointerOver(e)}
				// onPointerOut={(e) => handlePointerOut(e)}
				onClick={(e) => handleClick(e)}
				visible={true}
			>
				<meshStandardMaterial
					attach="material"
					color={'#db76d1'}
					transparent={true}
					opacity={0.5}
				/>
			</mesh>
			<mesh
				material={nodes.Solid51.material}
				geometry={nodes.Solid51.geometry}
			></mesh>
			<DrawerModel
				// ref={drawer}

				visible={active ? true : false}
				position={[-300, 200, 520]}
				// position={snap.current}
			/>
		</group>
	);
}
