import * as React from 'react';
import { ButtonGroup, SIZE, MODE } from 'baseui/button-group';
import { Button } from 'baseui/button';
import store from './store';
import { useSnapshot } from 'valtio';

export default (props) => {
	const [selected, setSelected] = React.useState(0);
	const [selected2, setSelected2] = React.useState(0);
	const snap = useSnapshot(store);
	return (
		<>
			<ButtonGroup
				size={SIZE.mini}
				mode={MODE.radio}
				selected={selected}
				onClick={(event, index) => {
					setSelected(index);
				}}
			>
				<Button onClick={() => (store.modelFactors.legs = 'Timber')}>
					Timber
				</Button>
				<Button onClick={() => (store.modelFactors.legs = 'Steel')}>
					Steel
				</Button>
			</ButtonGroup>
			<ButtonGroup
				size={SIZE.mini}
				mode={MODE.radio}
				selected={selected2}
				onClick={(event, index) => {
					setSelected2(index);
				}}
			>
				<Button onClick={() => (store.modelFactors.topper = 'cover')}>
					Cover
				</Button>
				<Button onClick={() => (store.modelFactors.topper = 'inset')}>
					Inset
				</Button>
			</ButtonGroup>
		</>
	);
};
