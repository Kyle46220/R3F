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
import BasicTabe from './BasicTabe';
import { useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import Box from './Box';

import SolidTabe from './SolidTabe';
import BaseRailsLegs from './BaseRailsLegs';

// const state = proxy({ current: null });

extend({ OrbitControls });
const MyCanvas = withControls(Canvas);

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

export default () => {
	const { nodes } = useLoader(GLTFLoader, '/SolidTabe.gltf');
	const getNames = (nodes) => {
		// the below function works perfectly except triggers too many re-renders for some reason.
		Object.entries(nodes).map((i) => {
			const name = i[0];
			store.modelFactors[name] = nodes[
				name
			].geometry.boundingBox.getSize();
		});
	};
	useEffect(() => {
		getNames(nodes);
		const tableBoundingBox = new THREE.Box3();
		tableBoundingBox.expandByObject(nodes.LegFR);
		tableBoundingBox.expandByObject(nodes.CoverL);
		store.modelFactors.table = tableBoundingBox.getSize();
	}, []);
	return (
		<Wrapper>
			{/* <StateViewer /> */}
			<Controls.Provider>
				<MyCanvas
					shadows
					camera={{
						position: [2000, 2000, 2500],
						far: 11000,
						fov: 50,
					}}
				>
					<ambientLight />
					<spotLight
						intensity={1}
						angle={0.3}
						penumbra={1}
						position={[2000, 3000, 2000]}
						castShadow
					/>
					<spotLight
						intensity={1}
						angle={0.3}
						penumbra={1}
						position={[-2000, 3000, -2000]}
						castShadow
					/>

					<pointLight position={[1000, 1000, 1000]} />
					<Suspense fallback={null}>
						<Box />
						{/* <BaseRailsLegs />
						 */}
						<SolidTabe />
					</Suspense>

					<ControlOrbit />
				</MyCanvas>

				<Controls />
			</Controls.Provider>

			<div style={{ display: 'flex' }}></div>
		</Wrapper>
	);
};
