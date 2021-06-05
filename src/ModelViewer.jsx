import React, { useRef, useEffect, Suspense, useState } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

import { useStore, WidthControls, HeightControls, api } from './zusStore';

// import { Canvas, useFrame, useThree, extend } from 'react-three-fiber';
import { Canvas, useFrame, useThree, extend } from '@react-three/fiber';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import Model from './BasicShelf.js';
import DrawerModel from './DrawerGLTFJSX';
import AddShelfModel from './Assembly4AddShelf';
// import Model from './BasicTable';
import Model from './Assembly4';
import { Controls, useControl, withControls } from 'react-three-gui';
import { subscribe, useSnapshot, proxy } from 'valtio';
import { Vector3 } from 'three';
import store from './store';

// const state = proxy({ current: null });

extend({ OrbitControls });
const MyCanvas = withControls(Canvas);
// const unsubscribe = subscribe(state, () =>
// 	console.log('state has changed to', state)
// );

const Wrapper = styled.section`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin: 3em;
`;
// const handleClick = (e) => {
// 	e.stopPropagation();
// 	// 	const box = getSize(e.object.geometry.boundingBox);
// 	console.log(e.intersections);

// 	return (
// 		<mesh>
// 			<boxGeometry args={[1000, 1000, 1000]} />
// 			<meshStandardMaterial colour="hotpink" />
// 		</mesh>
// 	);
// };

const ControlOrbit = () => {
	const orbitRef = useRef();

	const { camera, gl } = useThree();

	useFrame(() => {
		//this runs every animation loop
		orbitRef.current.update();
	});

	return <orbitControls args={[camera, gl.domElement]} ref={orbitRef} />;
};

// function Picker() {
// 	const snap = useSnapshot(state);
// 	return (
// 		<div style={{ display: snap.current ? 'block' : 'none' }}>
// 			<HexColorPicker
// 				className="picker"
// 				color={snap.items[snap.current]}
// 				onChange={(color) => (state.items[snap.current] = color)}
// 			/>
// 			<h1>{snap.current}</h1>
// 		</div>
// 	);
// }
function DrawerFill() {
	const snap = useSnapshot(store);
	console.log(Object.entries(snap.items));

	//putndrawers where state says drawers should go
	// if
	// for (var item in snap.items) {
	// 	if (snap.items.hasOwnProperty(item)) {
	// 		<DrawerModel
	// 			position={snap.current}
	// 			onClick={(store.current = null)}
	// 		/>;
	// 	}
	// }
	// const mapFunc = Object.entries(snap.items).map((item) => {
	// 	console.log(item.position);
	// 	return (
	// 		<Suspense fallback={null}>
	// 			<DrawerModel position={item.position} />;
	// 		</Suspense>
	// 	);
	// });

	return (
		<>
			{Object.entries(snap.items).map((item) => {
				let position = item[1].position;
				if (position !== null) {
					console.log(position);
					return (
						<DrawerModel
							//I think I can just put the scale from the constrols in here and it might work
							rotation-x={-1.5}
							position={[position.x, position.y, position.z]}
							localToWorld={[position.x, position.y, position.z]}
						/>
					);
				} else {
					return null;
				}
			})}
		</>
	);
}

export default () => {
	const [clicked, setClicked] = useState(false);
	const mesh = useRef();
	// unsubscribe();

	// const handleClick = (e) => {
	// 	// const intersect = e.stopPropagation();
	// 	//using the ref here to make it so that we can do stuff to the mesh that'sno in here. Whewn the ref is called, whatever happenend to mesh in here will happen to it. I think. So how do I get from here to a functional component?

	// 	// mesh.matrixAutoUpdate(false);
	// 	console.log(e.intersections[0]);
	// 	const vector = new THREE.Vector3();
	// 	const intersect = e.intersections[0];
	// 	const matrix = intersect.object.matrixWorld;

	// 	vector.setFromMatrixPosition(matrix);
	// 	console.log(vector, matrix);
	// 	// const scale = { x: 0, y: 0, z: 0 };
	// 	// const quarternion = { x: 0, y: 0, z: 0 };
	// 	// matrix.decompose();
	// 	console.log(vector.setFromMatrixPosition(matrix));
	// 	// clicked.set(position);
	// 	// const centerPoint = e.intersections[0];
	// };
	return (
		<Wrapper>
			<h1 style={{ margin: '1rem' }}>
				Built with React-Three-Fiber and Zustand and Valtio with
				functional components and hooks.
			</h1>

			<Controls.Provider>
				<MyCanvas camera={{ position: [700, 1000, 2500], far: 11000 }}>
					<ambientLight />
					<pointLight position={[10, 10, 10]} />
					<Suspense fallback={null}>
						{/* <Model onClick={(e) => handleClick(e)}></Model> */}

						<Model />

						<AddShelfModel></AddShelfModel>
					</Suspense>
					<Suspense fallback={null}>
						<DrawerFill />
					</Suspense>

					<ControlOrbit />
				</MyCanvas>
				{/* <Controls /> */}
				{/* <Picker /> */}
			</Controls.Provider>
			<div style={{ display: 'flex' }}>
				<HeightControls />
				<WidthControls />
			</div>
		</Wrapper>
	);
};
