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

don't have different types of thins in something you want to iterate over. Also put the filter as early as possiblre/.

tryiung to update state with the constrols - did this from inside the react gui hook with state key

then trying to update drawer position from state

something to do would be to antidote the disfiguration that goes from the scale - it could be like, update position by scale, but then cancel the actuul scaling of the part with the opposite of the scale, or by re scaling it smaller.

next is going to be getting the add shelf function working.

OOOKKK so whatever in the bit in the mesh with the = can be accessed from that object later. like with the name. its like props i think.

the function i had in the pointer over thing to get the names was redundant. so why isn't it updating the store? not sure. the hovers will be the clue.

next - to add the shelf from height. make shelf adder function in the model viewer. then have a state item that is quantity of extra shelves added. make a function in shelf adder that reads state and multiplies this.

DONE - i made the heigh control scale and add shelves AND reposition them accurately. just multiplying things by scale a lot.

next

-   change state object to handle changing shelf qty.

-   make drawers work - stop their position scaling with height control.
-   hover still doesn't work
-   adjust width controls. this will be a combination of both qty and scale so I'm glad i figured this out. at this stage the scale is a magic number that i may have to decompose into separate variables later.

its because the drawer position is not being adjusted for height. The position has to come after with a multipler based on the iterator and the shelf height multiplied together. This is getting complicated with knowing how to do the transfomr matrix.

Next handle for multiple sheves - like new shelf adds new state object.

If i changes the opacity of every object to a percetnage then i would be able to tell when objects were overlapped.

make controls change state of shelf qty or just scale. as it already does. then make shelf adder write to new state objects. state will need to already be there when the shelf is added for the hove to work.
ok so it's something to do with names. maybe it would work better if it were arrays of objects?

useEffect the last arg is the listener. when it changes use effect is fired.

i think i need to make sort of state dispatch functions. then these are triggered with subscriptions and use effect. and these are what aters the state object when i bring new objects onto the scene.

fixing the get drawers function

OK so what if when you clicked a drawer you just created a drawer state object that was only new to itself and didn't matter what order it was in in a list?

like tis just a cluster of state objects and they have their own position?

So each object would need to have its own subscription to state changes from the controls. rather than doing render all shelves, render all drawers, all one adter the other as independen things.

so for adding a shelf fro example I would need a function like "find topmost bit of geometry" and then this would need its own subscriptions to state changes.

Like being more asynchronous abou it.

This is the bit I always get to where i start again and get back to this problem.

Or is everything based around one unit of bottom, cavity, left side? and then just some end caps?? Then I just have one component which can contain its own drawer, and then all that's needed is one state object for the position of each unit. All the maths would be here.

THIS would be much simpler. What limitations does it put on the design? Would it still have the same problem of identifying state objects and 3D objects?

Could objects be created with inbuilt subscribers in them? so when the controls are changed, the already rendered componets then update their npositions without having to re-render the whole thing from scratch. Hmm or maybe not. just reading from the state is kind of already like this. read from state happens on every re-render of the component, but maybe you would want to no re-render the whole thing, when you just want little objects in it to move around. IDK.

Thinking atomistically
How doe useREF come into it? if at all.

I'll figure it out. I think I need a state object. I'l stay the course. I am making progress. time to sleep and let my brain figure it out.

so i was thinking when i was asleep that the ref.current goes where i've been using the name to access the state object. Also I thikn I will just be able to output the R#F state object to get what i need as an output for the whole configuration. So the whole valtio state object doesn't need to contain all the data.

So i could also just use regular use State hooks for the hover click events? this had the problem before of making them all one. This would be a perfect problem to put in a code sandbox. maybe its all about them having different meshes?

is there a way to not have to refer to the state object with a unique identifier. YEP! with use ref. Thanks dream. figured this out while i was asleep this morning. hahahah.

next is a thing called instanced geometry and colours, which I think will be very useful fro perfotmance when I get to it.

https://codesandbox.io/s/r3f-instanced-colors-8fo01

So I gotta make sure ach event handles is specific to the object inside a react component.

So a few things got done today. Really starting to get the hang of the declarative stuff.

Happy with the way the drawers are loading. and resizing is being done.

I think state will handle the style options (grid, gradient etc) coming from the user input, and the the impoerative maths that is done to get the positions from these will be inside the code. possible inside useEffect. the ternary operators i am trying to unse to calculate the positions at the moment I feel like are the right IDea, but I don't think I can do it all inside the property definition. its seems to not change based on the control inputs which is weird. has to be its position in ther ender cyle. I thin k if use effetc calcualtes this matsh every time there is a input change this will be good.

Then the next thing willbe the hover box to get the from inputs it. I think the DOM import from R3F is what i'll end up using here.

Anyways. Off to bed!

ok so back inside useEFFeCt trying to come up with some logci for the positions using only scale and density.

there needs to be some arbitrary number. Width etc from the box?

width = 1000, scale = 1, density =2, sectionwidth = 500
width= 1000, scale =1 density = 3, section widtrh = 333

width = 1000, scale = 2, density = 3, secion width = 666

width/density x scale x iterator

if this result gets lower or higher than a certain value, change the density.
sort of got this on the low end, but not the high end. ,aybe will hvae to not use the Gui slider cos can't find the ghost control thing where it slides based on other inputs.

Okay so if i can use functions in objects, can I use them in store object? I think so.

maybe that's where I can put the logic for the width pos calc. it works!!

so for anything that i don't want to have to calculate a million times in the main code, i can just write a getter function for in the store object. This is a large boon. easier thatn writing functions that i then have to access between components. is there something like this written into valtio?

so subscribers actually EXECUTE when something is published. I'm sp use tp the render loop, that i forget not everything is listening already.
maybe it would be easier to change the max and min of the sliders rather than change the actual value for stopping the bad input. yes. the density slider has no numeric value that is relvant so this will just change.

its useful to know that i can pass arguments into actions in the state object.

So ive got the problem now Of lining things up. I might need an array of positions after. Just scaling things doesn't work without a common refernce point, which might be me not understanding transform matrixes or local and work transfroms.

This is important - scaling is confused by the initial model dimensions. 1200 wide. Sheves are probably 300 or something tall.

Also a solve for the density width problem, could be that, in liue of making the slider reactive, just have 2 increment, decrement buttons.

can i get center of the cavity.

position formula = (scale*percentage of width * 1000)/2 - 1200\* percentage of width

i need to find a way to position objects from other objects maybe. OR maybe not. Onve i've got the maths worked out, it should be pretty easy to put in formulas. there's gotta be some more methods out ther though.

scale and position affect each other. beause of how each piece is positioned at not 0,0,0,

I think the position doens't work on mmy own components - its a nonrmal prop there, whereas on r3f base componenets like mesh, group etc, its edited the three.js object.

at the end i should be able to calculate price by calculateing the volume of all the objects in the scene.

{scale.x \* 1000 - 1200} - this is the basic formula except you diivdide things by pecetnages of width and of 1200.
\

so 10 divisions at 6m is the right scale for the hover box

how much bigger does it need to be for 9 divisions?

mergeing and adding geometry in three.js

https://stackoverflow.com/questions/8322759/three-js-bind-two-shapes-together-as-one/8328984

property binding - think this is going to be similar to a ref idea.

https://threejs.org/docs/?q=bind#api/en/animation/PropertyBinding

This looks epic https://buerli.io/#react

So loggina function without the brackets will return the code of the function, loggin with the bracket runs the code, and returns the return.

so where I'm at is trying to get the scaling consistent. I've writting some functions in the store, but these need fixing. They're not giving the right results at the moment. I suspect its just a regular maths mistake.

Ij think there's also a mistake with the scaling of the horiontal shelf panels in model viewer VS the way its been scaled in cab section. Which is why there's an overlap. I would like to get both of these scaling functions to come from the same function in the store.

But his is a great amount of progress! its all about these store scaling functions for positioning.

Thinking of making this code reusable for other models - I wonder If I could write a more general function which has like a reference to the original model size, actually I think this is just regular scaling neverminds.

Ok starting to get the hang of the sacaling functions - need to next write a function for the horizpanel scaling.

Its good to have to close to working for the first time ever.
I Think I'd be able to reuse this code without too much hassle for a different model as well.

next will be to position and scale the drawers, and to add in a cupboard. I don't think this will be very hard.

Then - change the row Height. where the slider causes a re-render of the whole shelf, I wonder if I can use transient updating to not cause a whole component rerender and then avoid the [roblem of the shelves jumping up and down because the shelf height changes on every render.

So an idea is to change the imported 3D Model so that the dimensions are all relevant to 1. eg make the table 1m by 1m with 0.1m border etc. Another idea might be to make a function that takes the original size as a param and then makes it uniform for later scaling

Working on the table configurator now.

to swap out the legs etc. Make allthe different changes that aren't scaling - eg - cups, topper, legs. and then just import the gltf's the same, so they're all positioned in the same way. Then you can just load the part of the model that you need.

one question - in fusion, if i hide all except the part i want to upload, will this still keep the position of the solid, the same in world space? or will the world space change to only contain this solid? I hope it keeps the position otherwise I will have to load up 8 different models.

actually- also where there's extrusions holes, I could just have little lids in there that turn on or off- eg cups or leds, or legs could all be in the same model overlapping and then we jsut don't show that.

so in starting to get my head around this model for the tabe. its gonne be more of the same - calculating positions and scale. the easiest way to do this would just be in inside the component built from the GLtf, there was just some tags i could put in because really, there's only a few ways I wan't thinfgs to change

they would be called for example

"change position on width scale"
"change width scale on width scale"
'change position on depth scale"
'justify width position (L, Centre, R) on width scale"

then i can just label each node mesh in the gltfjsx to plug it in.

This would also be transferrable to many other models.

I would put this all in the store. keeps the code very clean. need to input the original model params. I coud even label these in a particular way from inventor, to make thes uato import to the configurator via CSV. There's jquerytoCSV plugin.

I coud even write a "wishLIST" code where i put comments in with thins like 'getPositionJustifyCenter(Item)', put it in the GLTFJSX code and then right the function after.

if i have functions for

-   get model part dimensions in mm (this could be from th gltf file) https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/figures/gltfOverview-2.0.0b.png
-   scale part in each axis
-   justify part start, centre, end (based on scale)
-   get position from model dimensions (this could be under primitives in the gltf file)

So I just need different functions in the store to calculate position and scale.

Get Mesh dimensions

var box = new THREE.Box3().setFromObject( colladaModel );
console.log( box.min, box.max, box.getSize() );

So the position always seems to be at zero for the objects because it includes the negative space.

figure out the functions for edge justification is to offset the position by (distance from 0/center \* scale) - distance from 0

Ok So really struggling to get the gltf's to lead. I think the file is too big. I might have to break it down into separate files. This might not be so bad.

ok So after heaps of fucking around. I figured hoew to load the asset. The Bin file needed to be included. The Bin file must be the machine code part that describes the geometry. The human part of the gltf file will then access this.

Best Process is to direct export the model from fusion in OBJ format then use wings 3D to convert to GLTF. Making sure to flip axis and specify GLTF not GLB.

The benefit here is that it keeps the names of the solids.

I adjusted the model in fusion to have no components and be all solids. This is done by selecting all the solids inside the various components.

How to group the parts of the model?
Still need to have sections where transfroms of greoup are relevant eg front, side legs. Things like on/of colour can be done with state.

with my scaling functions. if i passed each of them an object, instead of 4 separate args. I could destructure them inside the function. Then I could generate objects for each mesh from the nodes. or I could even just put the nodes in. This would make it way more universal.

Transient updates might be the solution to component will mount for legs etc.
