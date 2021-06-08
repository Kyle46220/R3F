import React from 'react';
import store from './store';
import { useSnapshot } from 'valtio';

export default function StateViewer() {
	const snap = useSnapshot(store);
	return (
		<>
			<div
				style={{
					fontFamily: 'sans-serif',
					fontSize: '9px',
					// color: 'teal',
					overflowX: 'scroll',
					position: 'fixed',
					left: '0px',
					top: '0px',
				}}
			>
				<pre>{JSON.stringify(snap.items.presetModel, null, 4)}</pre>
			</div>
			<div
				style={{
					fontFamily: 'sans-serif',
					fontSize: '10px',
					// color: 'navy',
					overflowX: 'scroll',
					position: 'fixed',
					left: '200px',
					bottom: '0px',
				}}
			>
				<pre>
					{JSON.stringify(snap.items.addedShelfModels, null, 4)}
				</pre>
			</div>
			<div
				style={{
					fontFamily: 'sans-serif',
					fontSize: '10px',
					// color: 'teal',
					// overflowX: 'scroll',
					position: 'fixed',
					right: '10px',
					bottom: '10px',
				}}
			>
				<pre>{JSON.stringify(snap.transforms, null, 4)}</pre>
			</div>
		</>
	);
}
