import { proxy } from 'valtio';

const store = proxy({
	current: null,
	transforms: {
		scale: { x: 1, y: 1, z: 1 },
		shelfQTY: 3,
		widthDensity: 4,
		get pos() {
			return (1000 / this.widthDensity) * this.scale.x < 500
				? --this.widthDensity
				: (1000 / this.widthDensity) * this.scale.x > 800
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
