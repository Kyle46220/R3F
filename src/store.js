import { proxy } from 'valtio';

const store = proxy({
	current: null,
	transforms: { scale: { x: 2, y: 2, z: 2 } },
	items: {
		mainShelves: {
			Solid11_1: { hover: false, position: null },
			Solid6: { hover: false, position: null },
			Solid7: { hover: false, position: null },
			Solid23: { hover: false, position: null },
			Solid53: { hover: false, position: null },
			Solid10: { hover: false, position: null },
			Solid43: { hover: false, position: null },
			Solid9: { hover: false, position: null },
			Solid33: { hover: false, position: null },
			Solid8: { hover: false, position: null },
		},
		addedShelves: {
			Solid11_1: { hover: false, position: null },
			Solid6: { hover: false, position: null },
		},
	},
});
export default store;
