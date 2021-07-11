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
import Box from './Box';

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
	return (
		<Wrapper>
			{/* <StateViewer /> */}
			<Controls.Provider>
				<MyCanvas camera={{ position: [2000, 2000, 2500], far: 11000 }}>
					<ambientLight />
					<pointLight position={[10, 10, 10]} />
					<Suspense fallback={null}>
						<Box />
						<BasicTabe />
					</Suspense>

					<ControlOrbit />
				</MyCanvas>

				<Controls />
			</Controls.Provider>

			<div style={{ display: 'flex' }}></div>
		</Wrapper>
	);
};
