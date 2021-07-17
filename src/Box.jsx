import React, { useEffect, useRef, useState } from 'react';
import { Controls, useControl, withControls } from 'react-three-gui';
import { subscribe, useSnapshot, proxy } from 'valtio';
import store from './store';
import { MathUtils } from 'three';
import ButtonGroup from './ButtonGroup';
import { HexColorPicker } from 'react-colorful';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { useLoader } from 'react-three-fiber';
import { useTexture } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ColourPicker = (item) => {
	const snap = useSnapshot(store);
	console.log(snap.modelFactors.timberColour);
	return (
		<>
			<h4>Mat Colour</h4>
			<HexColorPicker
				style={{ height: '100px' }}
				color={snap.modelFactors.matColour}
				onChange={(e) => (store.modelFactors.matColour = e)}
			/>
			<h4>Timber Colour</h4>
			<HexColorPicker
				style={{ height: '100px' }}
				color={snap.modelFactors.timberColour}
				onChange={(e) => (store.modelFactors.timberColour = e)}
			/>
		</>
	);
};

export default () => {
	const box = useRef();
	const { nodes } = useLoader(GLTFLoader, '/blenderSmallTabe.gltf');

	useEffect(() => {
		console.log(box.current);
		console.log(nodes.BaseBoard);
	});

	const [colourMap, displacementMap, normalMap, roughnessMap] = useTexture([
		'./Wood051_1K_Color.jpg',
		'./Wood051_1K_Displacement.jpg',
		'./Wood051_1K_Normal.jpg',
		'./Wood051_1K_Roughness.jpg',
	]);
	const snap = useSnapshot(store);
	const { scale } = snap.transforms;
	// This reference will give us direct access to the mesh
	const mesh = useRef();
	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);
	// Subscribe this component to the render-loop, rotate the mesh every frame
	// useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
	const border = useControl('Border Width', {
		type: 'number',
		value: 1,
		state: [
			snap.transforms.borderScale,
			(e) => (store.transforms.borderScale = e),
		],
		min: 0,
		max: 1.5,
	});
	const widthScale = useControl('Width Scale', {
		type: 'number',
		value: 1,
		state: [snap.transforms.scale.x, (e) => (store.transforms.scale.x = e)],
		min: 0.66,
		max: 1.35,
	});
	// const heightScale = useControl('Height Scale', {
	// 	type: 'number',
	// 	value: 1,
	// 	state: [snap.transforms.scale.y, (e) => (store.transforms.scale.y = e)],
	// 	min: 1,
	// 	max: 6,
	// });
	const depthScale = useControl('Depth Scale', {
		type: 'number',
		value: 1,
		state: [snap.transforms.scale.z, (e) => (store.transforms.scale.z = e)],
		min: 0.8,
		max: 1.26,
	});
	const legType = useControl('Legs', {
		type: 'custom',
		component: ButtonGroup,
	});
	const colour = useControl('Colour', {
		type: 'custom',
		component: ColourPicker,
	});

	// Return view, these are regular three.js elements expressed in JSX
	return (
		<mesh
			ref={mesh}
			// rotation-x={MathUtils.degToRad(-90)}
			scale={[scale.x, scale.y, scale.z]}
			position-y={392}
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}
			visible={true}
			// geometry={nodes.BaseBoard.geometry}
		>
			<boxGeometry
				ref={box}
				args={[
					snap.modelFactors.table.x,
					snap.modelFactors.table.y,
					snap.modelFactors.table.z,
				]}
			/>
			<meshStandardMaterial
				displacementScale={snap.transforms.borderScale}
				color={snap.modelFactors.matColour}
				map={colourMap}
				// displacementMap={displacementMap}
				// normalMap={normalMap}
				// roughnessMap={roughnessMap}
			/>
		</mesh>
	);
};
