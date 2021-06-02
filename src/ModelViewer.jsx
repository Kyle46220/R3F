import React, { useRef, useEffect, Suspense } from 'react';
// import * as THREE from 'three';
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
const handleClick = (e) => {
	e.stopPropagation();
	// 	const box = getSize(e.object.geometry.boundingBox);
	console.log(e.intersections);
	return (
		<mesh>
			<boxGeometry args={[1000, 1000, 1000]} />
			<meshStandardMaterial colour="hotpink" />
		</mesh>
	);
};

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

export default () => {
	const ref = useRef();
	// unsubscribe();
	return (
		<Wrapper>
			<h1 style={{ margin: '1rem' }}>
				Built with React-Three-Fiber and Zustand and Valtio with
				functional components and hooks.
			</h1>

			<Controls.Provider>
				<MyCanvas
					onClick={(e) => handleClick(e)}
					ref={ref}
					camera={{ position: [700, 1000, 2500], far: 11000 }}
				>
					<ambientLight />
					<pointLight position={[10, 10, 10]} />
					<Suspense fallback={null}>
						<Model onClick={(e) => handleClick(e)}></Model>
						<DrawerModel />
						<AddShelfModel></AddShelfModel>
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
