import create from 'zustand';

import React from 'react';

import Slider from './Slider';
import getWidth from './zusWidth';
import getHeight from './zusHeight';

// this sets the state object in zustand and has functions to handle the sliders.

export const [useStore, api] = create((set) => ({
	height: 900,
	width: 900,
	depth: 400,
	// config: [
	// 	{ y: 0, x: [0, 300, 600, 900] },
	// 	{ y: 300, x: [0, 300, 600, 900] },
	// 	{ y: 600, x: [0, 300, 600, 900] },
	// ],
	divsX: [
		[0, 300, 600, 900],
		[0, 300, 600, 900],
		[0, 300, 600, 900],
		[0, 300, 600, 900],
		[0, 300, 600, 900],
	],

	shelvesY: [0, 280, 560, 840, 1120],

	shelfHeights: [180, 280, 380],

	drawers: [{ id: 1, shelf: 0, div: 0, pos: [1000, 500, 500] }],

	drawer: { shelf: 0, div: 0, pos: [500, 500, 500] },
	boxes: [],

	adjustBoxes: (e) =>
		set((state) => {
			return { boxes: e };
		}),

	adjustDrawers: (e) =>
		set((state) => {
			return { drawers: e };
		}),

	// adjustDrawer: (e) =>
	// 	set((state) => {
	// 		return { drawer: e };
	// 	}),

	// addDrawer: (e) =>
	// 	set((state) => {
	// 		return state.drawers.push(e);
	// 	}),

	// removeDrawer: (e) =>
	// 	set((state) => {
	// 		return state.drawers.filter((i) => {
	// 			i.id != e.id;
	// 		});
	// 	}),

	adjustHeight: (e) =>
		set((state) => {
			return { height: e };
		}),

	adjustWidth: (e) =>
		set((state) => {
			return { width: e };
		}),

	changeShelvesY: (e) =>
		set((state) => {
			return { shelvesY: e };
		}),

	changeDivsX: (e) =>
		set((state) => {
			return { divsX: e };
		}),
}));

export function WidthControls() {
	const state = useStore();
	const {
		shelvesY,
		width,
		adjustWidth: newWidth,
		changeDivsX: newDivsX,
		drawers,
		adjustDrawers,
	} = state;
	//

	const handleChange = (e) => {
		const result = getWidth(width, shelvesY);
		newWidth(e.target.value);

		newDivsX(result);

		const newDrawers = drawers.map((drawer) => {
			drawer.pos[0] = e.target.value / 2;

			return drawer; // if i remove this return it breaks it in the other file. Why? beacuse without the return the map creates an empty array which is then ent to state.
		});

		adjustDrawers(newDrawers);
	};

	return (
		<label>
			<Slider
				type="range"
				min={600}
				max={2400}
				step={1}
				onChange={handleChange}
				name={'width'}
				// value={width}
			/>
			<h1>WIDTH:{width}</h1>
		</label>
	);
}

export function HeightControls() {
	const newHeight = useStore((state) => state.adjustHeight);
	const newDivsX = useStore((state) => state.changeDivsX);
	const newShelvesY = useStore((state) => state.changeShelvesY);
	const height = useStore((state) => state.height);
	const shelfHeights = useStore((state) => state.shelfHeights);
	const shelvesY = useStore((state) => state.shelvesY);
	const divsX = useStore((state) => state.divsX);

	const drawers = useStore((state) => state.drawers);
	const adjustDrawers = useStore((state) => state.adjustDrawers);

	const handleChange = (e) => {
		const state = { divsX, shelvesY, shelfHeights };

		const result = getHeight(state, e.target.value);

		const { shelvesY: resultShelvesY, divsX: resultDivsX, height } = result;
		const newDrawers = drawers.filter((drawer) => drawer.pos[1] < height); // this kills drawers that are removed from height reduction.
		// need to make a heigh pos
		newHeight(height);
		newDivsX(resultDivsX);
		newShelvesY(resultShelvesY);
		adjustDrawers(newDrawers);
	};
	return (
		<label>
			<Slider
				type="range"
				min={600}
				max={2400}
				step={1}
				onChange={handleChange}
				name={'height'}
				value={height}
			/>
			<h1>HEIGHT:{height}</h1>
			<h2>{drawers.length}</h2>
		</label>
	);
}
