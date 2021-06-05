import { proxy } from 'valtio';

const store = proxy({
	current: null,
	items: {
		Solid11_1: { hover: true, position: null },
		Solid6: { hover: true, position: null },
		Solid7: { hover: true, position: null },
		Solid23: { hover: true, position: null },
		Solid53: { hover: true, position: null },
		Solid10: { hover: true, position: null },
		Solid43: { hover: true, position: null },
		Solid9: { hover: true, position: null },
		Solid33: { hover: true, position: null },
		Solid8: { hover: true, position: null },
	},
});
export default store;
