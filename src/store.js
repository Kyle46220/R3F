import { proxy } from 'valtio';

const store = proxy({
	current: null,
	functions: {
		getPos: (width, scale) => {
			const result = ((-scale + 1) / 2) * width;

			return result;
		},
		getScale: (currentDimension, desiredDimension) => {
			const result = desiredDimension / currentDimension;
			return result;
		},
		getEdge: (fullDimension, scale) => {
			const result = (fullDimension / 2) * scale - fullDimension / 2;

			return result;
		},
		getPosOffset: (offset, scale) => {
			const result = offset - offset * scale;
			return result;
		},
		// getScaleWithOffset: (total, offset, scale) => {
		// 	const oldDim = total - 2 * offset;

		// 	const newDim = total - 2 * scale * offset;

		// 	const result = store.functions.getScale(oldDim, newDim);

		// 	return result;
		// },
		getScaleWithOffset: (total, offset, scale, scale2) => {
			const result =
				(total * scale2 - offset * 2 * scale) / (total - offset * 2);

			console.log(result);
			return result;
		},
	},
	modelFactors: {
		legs: 'Timber',
		matColour: '#1b1a6a',
		timberColour: '#441e06',
		cups: true,
		topper: 'inset',
		table: 0,
		size: 0,
		width: 1200,
		boxWidth: 600,
		backTop: 0,
		leftTop: 0,
		sectionWidth: () => {
			const result =
				store.modelFactors.width / store.transforms.widthDensity;
			return result;
		},
		sectionScaleX: () => {
			const result =
				(store.modelFactors.width * store.transforms.scale.x) /
				store.transforms.widthDensity /
				(store.modelFactors.width / 2);
			return result;
		},
		sectionPositionX: () => {
			const result =
				((store.modelFactors.width * store.transforms.scale.x) /
					store.transforms.widthDensity /
					store.modelFactors.boxWidth /
					2) *
					store.modelFactors.width -
				store.modelFactors.width / 2;
			return result;
		},
	},
	sectionPositionX: () => {
		const result =
			((store.modelFactors.width * store.transforms.scale.x) /
				store.transforms.widthDensity /
				store.modelFactors.boxWidth /
				2) *
				store.modelFactors.width -
			store.modelFactors.width / 2;
		return result;
	},
	transforms: {
		legs: 'Timber',
		colour: '#ffffff',
		borderScale: 1,
		scale: { x: 1, y: 1, z: 1 },
		shelfQTY: 3,
		shelfHeights: { 0: 195, 1: 295, 2: 395, 3: 495, 4: 595 },
		randShelfHeight: () => {
			const min = Math.ceil(0);
			const max = Math.floor(
				Object.entries(store.transforms.shelfHeights).length
			);
			const result = Math.floor(Math.random() * (max - min) + min);
			console.log(result);
		},
		widthDensity: 4,
		get pos() {
			return (1000 / this.widthDensity) * this.scale.x < 300
				? --this.widthDensity
				: (1000 / this.widthDensity) * this.scale.x > 1000
				? ++this.widthDensity
				: this.widthDensity;
		},
		// the problem below is that its not self correcting because the condition value and consequent value are different.
		// adjustScaleX: (x) => {
		// 	console.log(x);
		// 	return (x * 1000) / store.transforms.widthDensity > 800
		// 		? --store.transforms.scale.x
		// 		: (x * 1000) / store.transforms.widthDensity < 300
		// 		? ++store.transforms.scale.x
		// 		: store.transforms.scale.x;
		// },
		densityCalc: (val) => {
			return (1000 * store.transforms.scale.x) / val;
		},
	},
	items: {
		default: {
			Solid11_1: { hover: false, position: null, height: 300 },
			Solid6: { hover: false, position: null, height: 300 },
		},
		presetModel: {
			mainShelves: {
				Solid11_1: { hover: false, position: null, height: 300 },
				Solid6: { hover: false, position: null, height: 300 },
				Solid7: { hover: false, position: null, height: 300 },
				Solid23: { hover: false, position: null, height: 300 },
				Solid53: { hover: false, position: null, height: 300 },
				Solid10: { hover: false, position: null, height: 300 },
				Solid43: { hover: false, position: null, height: 300 },
				Solid9: { hover: false, position: null, height: 300 },
				Solid33: { hover: false, position: null, height: 300 },
				Solid8: { hover: false, position: null, height: 300 },
			},
		},
		addedShelfModels: {
			// shelf0: {
			// 	Solid11_1: { hover: false, position: null, height: 300 },
			// 	Solid6: { hover: false, position: null, height: 300 },
			// },
			// shelf1: {
			// 	Solid11_1: { hover: false, position: null, height: 300 },
			// 	Solid6: { hover: false, position: null, height: 300 },
			// },
			// shelf2: {
			// 	Solid11_1: { hover: false, position: null, height: 300 },
			// 	Solid6: { hover: false, position: null, height: 300 },
			// },
		},
	},
});
export default store;
