import React, { useRef, useState } from 'react';
import { Controls, useControl, withControls } from 'react-three-gui';
import { subscribe, useSnapshot, proxy } from 'valtio';
import store from './store';
import { MathUtils } from 'three';

export default () => {
	const snap = useSnapshot(store);
	// This reference will give us direct access to the mesh
	const mesh = useRef();
	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);
	// Subscribe this component to the render-loop, rotate the mesh every frame
	// useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
	const border = useControl('Border Width', {
		type: 'number',
		value: 120,
		state: [snap.transforms.border, (e) => (store.transforms.border = e)],
		min: 120,
		max: 250,
	});
	const widthScale = useControl('Width Scale', {
		type: 'number',
		value: 1,
		state: [snap.transforms.scale.x, (e) => (store.transforms.scale.x = e)],
		min: 1,
		max: 6,
	});
	const heightScale = useControl('Height Scale', {
		type: 'number',
		value: 1,
		state: [snap.transforms.scale.y, (e) => (store.transforms.scale.y = e)],
		min: 1,
		max: 6,
	});
	const depthScale = useControl('Depth Scale', {
		type: 'number',
		value: 1,
		state: [snap.transforms.scale.z, (e) => (store.transforms.scale.z = e)],
	});

	// Return view, these are regular three.js elements expressed in JSX
	return (
		<mesh
			ref={mesh}
			// rotation-x={MathUtils.degToRad(-90)}
			scale={[widthScale, heightScale, depthScale]}
			position-y={392}
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}
			visible={true}
		>
			<boxGeometry
				args={[
					snap.modelFactors.backTop.x,
					755,
					snap.modelFactors.leftTop.y,
				]}
			/>
			<meshStandardMaterial
				color={hovered ? 'hotpink' : 'orange'}
				wireframe
			/>
		</mesh>
	);
};
