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

const ControlOrbit = () => {
	const orbitRef = useRef();

	const { camera, gl } = useThree();

	useFrame(() => {
		//this runs every animation loop
		orbitRef.current.update();
	});

	return <orbitControls args={[camera, gl.domElement]} ref={orbitRef} />;
};

// const widthScale = useControl('Width Scale', {
// 	type: 'number',
// 	value: 1,
// 	state: [snap.transforms.scale.x, (e) => (store.transforms.scale.x = e)],
// });

// const heightScale = useControl('Height Scale', {
// 	type: 'number',
// 	value: 1,
// 	state: [snap.transforms.scale.y, (e) => (store.transforms.scale.y = e)],
// });
const updateShelfState = (snap) => {
	const newShelf = {
		addedShelfDefault: {
			Solid11_1: { hover: false, position: null, height: 300 },
			Solid6: { hover: false, position: null, height: 300 },
		},
	};
	//i need to overwrite the add shelf items when the scale changes
	// object.assign will add new ones.
	// a filter will get rid of the old ones.
	// based on scale.y, if needed creates more, gtes rid of ones that aren't there.
	Array.from({ length: snap.transforms.scale.y }, (x, i) => {
		//this loop adds a new state object item that is named with number
		const newKey = `Shelf${i}`;
		Object.assign(store.items, newShelf);
		store.items.addedShelfModels[newKey] = store.items.Default;
		delete store.items.addedShelfDefault;
	});
};

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
			{/* should this be iterating from an array or directly from state? could i use a listener subscriptsion? i.e wait for change, when changed, addShelf? */}
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
		// {Array.from({ length: snap.transforms.scale.y }, (x, i) => {
		// 	return (
		// 		<AddShelfModel
		// 			shelfNumber={i}
		// 			key={`shelf${i}`}
		// 			position-z={-295 * (i + 1)}
		// 		/>
		// 	);
		// })}
	);
};

const DrawerFill = () => {
	const snap = useSnapshot(store);
	const mesh = useRef();

	// a function that gets the drawers

	const getDrawers = () => {};
	//the loop below is a mess and needs to be fixed. There is a much simpler way to do this.

	// the positions are already set.
	return (
		<>
			{Object.entries(snap.items).map((set) => {
				console.log(Object.entries(snap.items));
				return Object.entries(set[1]).map((row, ii) => {
					return Object.entries(row[1]).map((item, i) => {
						console.log(item);
						if (item[1].position !== null || false) {
							let position = item[1].position;

							return (
								<group ref={mesh} key={`drawer${ii}${i}`}>
									<DrawerModel
										//I think I can just put the scale from the constrols in here and it might work
										rotation-x={-1.5}
										position={[
											position.x *
												snap.transforms.scale.x,
											position.y,
											position.z,
											// position.z +
											// 	-(ii + 1) * item[1].height, // the height here is to copy the transform that has be done to each shelf.
										]}
									/>
								</group>
							);
						} else {
							return null;
						}
					});
				});
			})}
		</>
	);
};

export default () => {
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
						<DrawerFill />
						{/* <AddShelfModel></AddShelfModel> */}
						<ShelfAdder />
					</Suspense>
					<Suspense fallback={null}></Suspense>

					<ControlOrbit />
				</MyCanvas>
				<Controls />
				{/* <Picker /> */}
			</Controls.Provider>
			<div style={{ display: 'flex' }}></div>
		</Wrapper>
	);
};
