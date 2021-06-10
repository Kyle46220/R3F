import * as THREE from 'three';
import React, { useRef, useState, useEffect, forwardRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { useSnapshot, proxy, subscribe } from 'valtio';
import store from './store';
import { MathUtils } from 'three';
// const ForwardDrawer = forwardRef((props, ref) => <DrawerModel ref={ref} />);

export default function Panel() {
	const { nodes, materials } = useLoader(GLTFLoader, '/Assembly4.gltf');
	const group = useRef();

	const [active, setActive] = useState(false);

	return (
		<group ref={group} rotation-x={MathUtils.degToRad(90)}>
			<mesh
				name={nodes.Solid11.name}
				material={nodes.Solid11.material}
				geometry={nodes.Solid11.geometry}
				visible={true}
			>
				<meshStandardMaterial
					attach="material"
					color={'#db76d1'}
					// transparent={true}
					// opacity={0.25}
				/>
			</mesh>
		</group>
	);
}
