Hello!

I'm back. My goal is to try to do at least an hour of coding nearly everyday to get this thing Built!

Its all coming back to me very quick;y. I was worried I'd forgottenit. Some things are even obviouser.

I'm looking at the the drawer loader.

First Goal - trying to make drawer clickable off. from drawer array in store.
Second Goal - to position drawers based on updateable from sliders

calls to store cause re-renders
when to call from store and when to pass down props

I want to scale a model based on the assembly.

looking at the stuff from drei or drcmda its all declrative and all hooks and there's not so much state being used. I think i will need some state. But it think from the examples of i can get all the individual components working with hooks separately.

components are
gui
https://github.com/birkir/react-three-gui
https://codesandbox.io/s/react-three-fiber-gui-62pvp

scale with gltfx
https://codesandbox.io/s/r3f-drei-transformcontrols-hc8gm?file=/src/index.js:950-957

clicking

https://codesandbox.io/embed/cell-fracture-forked-3rjsl

https://codesandbox.io/s/rrppl0y8l4

Shoe Configurator

https://codesandbox.io/s/qxjoj

Task 1

Get GUI Controls going - COMPLETE

Task 2

Load up shelf model - COMPLETE

ok so getting models from fusion to the right formate is a bit tricky.

1. open fusion model in inventor in reference mode.
2. save as inventor assembly
3. save copy as OBJ
4. use online converter to gltf https://products.aspose.app/3d/conversion/obj-to-gltf
5. save in public folder and npx gltfjsx public/modelname.gltf

I think it was like all the materials and stuff that was stuffing it up.

Task 3

get GUI working with scale controls - Done!

task 4
get clickable on hover negative space boxes - Done!

Task 5

Load drawers on click

Task 6

Drawers scale

task 7

Radio colour changes.
Radio depth choice

Task 8

Height adds layers

Toggle 9

Individual layer height choices

I've just installed Valtio which is something that allows you to subsribe to state changes from anywhere. Because Now I have to fdigure out how to get a drawer to manifest inside cavity,

Error -

THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0

This is from having some scale-x={0} somewhere. likeyl from the GUI controls. maybe i could change the scales on this so they go from 0.000001 to 1, rather than from 0 to 1

So i've figured out how to load just a shelf segment for height.

Next is to add dividers for width. I can re-use some old functions here surely.

I thik everything is going to done with scales for re-sizing. rather than actual dimensions. or maybe not.

just made the functions for the hover. Next I have to figure out the state with valtio. a function to generate the state object from the nodes of each loaded model in a unique way perhaps.

after struggleing for ages ot get the hover on added shelves to work, i realised it need the valtio useSnapshot function inside the main component to workj.

trying to figure out the clickable drawer thing. I'm getting some clue froms ping pong.

I need some state.

Hook keeps track of active or not.
onClick

someState.set(e => e.position) this records the click position

the drawer itself is active or not at the position which can just be normal one. Maybe it will be like
<Drawer>
<drawer>
<drawer>

in the model viewer and the will be turned on or off.

Maybe a good first step will be to make the one drawer that's there jump around depending on clicks and then we can go from there.

there's maybe a ref here as well.

This one

https://codesandbox.io/s/r3f-render-target-qgcrx?file=/src/index.js

is about a thing inside a cube with a portal. it looks like a scene within a scene.

this is about teleporting

https://codesandbox.io/s/0dds3?file=/src/App.js

matrix Auto Update
https://github.com/pmndrs/react-three-fiber/issues/635

useRef tutorial

doens;t aus ecomponent update when it changes

useRef - creates an object with a .current

helps to access a HTML feature - for example for <input ref={myRef}/> console.log(myRef.current) outputs the exact element <input/> so you could do

useREf persists values between redners in fucntional componentes

https://www.youtube.com/watch?v=xy_tbV4pC54 shoe configurator turorial

gltf pipeline package to compress models.

State is what is in common with the 3d and the DOM objects.

They use valtio.

the thing sinside the mesh, are from the state object. eg colour

using a setStsate hook to do the hover on each mesh group. there s a stop propagation here.

OOOOKAY - I think I need to have a reacto componenet that is like a drawer waiting component inside the model viewer. So the compoennet is there, but whether or not it renders the drwaer is what is inside the compoennt. rather than putting the drawer component directly inside the model viewer.

Then this component renders drawers based on clicks.

the picker component will be how I do the pop up for options selction.

state is set from the assembly model.

valtio tutorial

ok so finally got he drawers appearing in position. It was a regular small oversight of just accessing an object with the wrong index. DUH.

next will be to make them change position with the on screen controls. Which I think I can do just by putting a property inside the drwer component when it is loaded inside drawer fill. I might have to have some maths but I think that is pretty straightforward. I just want to avoid having some big state object that has all this data in it.
