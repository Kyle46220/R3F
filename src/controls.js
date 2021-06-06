import * as THREE from 'three';
import React, { useRef, useState, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Controls, useControl } from 'react-three-gui';
import { useSnapshot, proxy, subscribe } from 'valtio';
import { useStore } from './zusStore';
import DrawerModel from './DrawerGLTFJSX';
import store from './store';

const widthScale = useControl('Width Scale', {
	type: 'number',
	value: 1,
	state: [snap.transforms.scale.x, (e) => (store.transforms.scale.x = e)],
});
const heightScale = useControl('Height Scale', {
	type: 'number',
	value: 1,
	state: [snap.transforms.scale.y, (e) => (store.transforms.scale.y = e)],
});
