import React, { useRef, useEffect, Suspense, useState } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

import { useStore, WidthControls, HeightControls, api } from './zusStore';

// import { Canvas, useFrame, useThree, extend } from 'react-three-fiber';
import { Canvas, useFrame, useThree, extend, Dom } from '@react-three/fiber';

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
import StateViewer from './StateViewer';
import CabSection from './cabSection';
import Slider from './Slider';
import Panel from './HorizontalPanels';
import EndSection from './EndSection';

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
	flex-direction: column
	margin: 3em;
`;

const ControlOrbit = () => {
	const orbitRef = useRef();

	const { camera, gl } = useThree();

	useFrame(() => {
		//this runs every animation loop
		orbitRef.current.update();
	});

	return <orbitControls args={[camera, gl.domElement]} ref={orbitRef} />;
};

const updateShelfState = (snap) => {
	const newShelf = {
		addedShelfDefault: {
			Solid11_1: { hover: false, position: null, height: 300 },
			Solid6: { hover: false, position: null, height: 300 },
		},
	};
	const snapModels = snap.items.addedShelfModels;
	const storeModels = store.items.addedShelfModels;
	//i need to overwrite the add shelf items when the scale changes
	// object.assign will add new ones.
	// a filter will get rid of the old ones.
	// based on scale.y, if needed creates more, gtes rid of ones that aren't there.
	if (snap.transforms.scale.y > Object.entries(snapModels).length) {
		Array.from({ length: snap.transforms.scale.y }, (x, i) => {
			//this loop adds a new state object item that is named with number

			const newKey = `Shelf${i}`;
			Object.assign(store.items, newShelf);
			store.items.addedShelfModels[newKey] = store.items.default;
			delete store.items.addedShelfDefault;
		});
	} else {
		// chop off the last item
		store.items.addedShelfModels = Object.fromEntries(
			Object.entries(store.items.addedShelfModels).slice(-1)
		);
	}
};
function Picker() {
	const snap = useSnapshot(store);
	return (
		<div
			style={{
				display: snap.current ? 'block' : 'none',
				width: '100px',
				height: '100px',
				backgroundColor: 'fuchsia',
				position: 'fixed',
				top: '0px',
				margin: 'auto',
				overflowY: 'wrap',
			}}
		>
			{JSON.stringify(snap.current)}
		</div>
	);
}

const ShelfAdder = () => {
	const snap = useSnapshot(store);
	// to put a thing that takes the shelf height quantity and creates the corresposnding state object.
	console.log(snap, store);
	const ref = useRef(snap);

	useEffect(() => {
		updateShelfState(snap);
	}, [snap.transforms.scale.y]);

	return (
		<>
			{Object.entries(snap.items.addedShelfModels).map((x, i) => {
				return (
					<AddShelfModel
						shelfNumber={i}
						key={`shelf${i}`}
						position-z={-295 * (i + 1)}
					/>
				);
			})}
		</>
	);
};

function Box(props) {
	const snap = useSnapshot(store);
	// This reference will give us direct access to the mesh
	const mesh = useRef();
	// Set up state for the hovered and active state
	const [hovered, setHover] = useState(false);
	const [active, setActive] = useState(false);
	// Subscribe this component to the render-loop, rotate the mesh every frame
	// useFrame((state, delta) => (mesh.current.rotation.x += 0.01));

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
			{...props}
			ref={mesh}
			scale={[widthScale, heightScale, depthScale]}
			onClick={(event) => setActive(!active)}
			onPointerOver={(event) => setHover(true)}
			onPointerOut={(event) => setHover(false)}
			visible={false}
		>
			<boxGeometry args={[1000, 1000, 1000]} />
			<meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
		</mesh>
	);
}
const SectionFiller = () => {
	const [hovered, setHovered] = useState(null);
	const snap = useSnapshot(store);
	const group = useRef();
	const panel = useRef();
	const scale = snap.transforms.scale;
	// const density = useControl('density Scale', {
	// 	type: 'custom',
	// 	value: 1,
	// 	min: store.transforms.densityCalc(1000),
	// 	max: store.transforms.densityCalc(500),

	// 	component: Slider,
	// 	state: [
	// 		snap.transforms.widthDensity,
	// 		(e) => (store.transforms.widthDensity = e),
	// 	],
	// });
	const densityUP = useControl('More Shelves', {
		type: 'button',
		onClick: () => ++store.transforms.widthDensity,
	});
	const densityDown = useControl('Less Shelves', {
		type: 'button',

		onClick: () => --store.transforms.widthDensity,
	});

	useEffect(() => {
		// console.log(panel.current.parent);
		//I need to make an imperative calc here or in store for the positions doing like getCenter etc.
		//update each shelf row pos after render but without a re-render - try valtio subscribe
	});

	const rand = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	};

	return (
		<group
			ref={group}
			name={'wholeShelf'}
			onPointerOver={(e) => (e.stopPropagation(), setHovered(e.object))}
			onPointerDown={(e) => (
				e.stopPropagation(),
				(store.current = e.object.geometry.boundingBox),
				console.log(store.current)
			)}
		>
			<group
				position-y={300 * Math.floor(scale.y)}
				scale-x={snap.transforms.scale.x}
				position-x={
					(snap.transforms.scale.x * snap.modelFactors.width) / 2 -
					snap.modelFactors.boxWidth
				}
			>
				<Panel />
			</group>
			{Array.from({ length: scale.y }, (x, j) => {
				//Height
				return (
					<>
						<group position-y={j * 300} name={'verticalRow'}>
							{Array.from(
								{ length: snap.transforms.pos },
								(x, i) => {
									//Width
									return (
										<group
											position-x={
												(snap.modelFactors.width /
													snap.transforms.pos) *
												snap.transforms.scale.x *
												i
											}
											name={'horizontalColumn'}
										>
											<CabSection />;
										</group>
									);
								}
							)}
							<group
								ref={panel}
								// scale-x={
								// 	(snap.transforms.scale.x * 1000) / 1200
								// }
								scale-x={snap.transforms.scale.x}
								// position-x={
								// 	(snap.transforms.scale.x * 1000) / 2 - 600
								// }
								position-x={
									(snap.transforms.scale.x *
										snap.modelFactors.width) /
										2 -
									snap.modelFactors.boxWidth
								}
							>
								<Panel />
							</group>
							<group
								position-x={
									scale.x * snap.modelFactors.width -
									snap.modelFactors.width
								}
							>
								<EndSection />
							</group>
						</group>
					</>
				);
			})}
		</group>
	);
};

export default () => {
	return (
		<Wrapper>
			{/* <h1 style={{ margin: '1rem' }}>
				Built with React-Three-Fiber and Zustand and Valtio with
				functional components and hooks.
			</h1> */}
			<StateViewer />
			<Controls.Provider>
				<MyCanvas camera={{ position: [2000, 2000, 2500], far: 11000 }}>
					<ambientLight />
					<pointLight position={[10, 10, 10]} />
					<Suspense fallback={null}>
						{/* <Model /> */}
						{/* <DrawerFill />
						<ShelfAdder /> */}
						<Box />

						<SectionFiller />
						{/* <Panel /> */}
					</Suspense>

					<ControlOrbit />
				</MyCanvas>

				<Controls />
				{/* <Slider
					// value={store.transforms.widthDensity}
					min={0}
					max={6}
					onChange={(e) =>
						(store.transforms.widthDensity = e.currentTarget.value)
					}
				/> */}
			</Controls.Provider>

			<Picker />
			<div style={{ display: 'flex' }}></div>
		</Wrapper>
	);
};
