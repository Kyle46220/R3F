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
