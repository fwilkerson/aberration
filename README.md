# Aberration

After evaluating my second version of [muve](https://github.com/fwilkerson/muve) I realized I had nothing more than [preact](https://preactjs.com/) without the component class. Which lead me towards using more preact and even embracing the class components. Plus keeping all of your state in a global store gets tedious. But... Sometimes I get an itch to try something new, and I do think there was some merit to what I was doing with muve.

So every year around google io I listen to all the greats talks on the web platform and web components ([polymer](https://www.polymer-project.org/)) in particular. After doing my yearly evaluation of web components I found they were pretty great, but a couple things were a bit uncomfortable after spending so much time in the (p)react space.

* Sometimes you just want global styles
* I couldn't easily use scss within my web component (probably not necessary)
* Typescript wasn't nearly as helpful since your web components are used as html (no type checking on passed in props).

Of course one of the great things about polymer is you can just use the polymer cli skip all the babel/webpack nonsense and just get to work. The polymer team has definitely done a good job of making it feel less awkward to use. Even so it may be a bit of a leap to get a bunch of (p)react developers to make the switch. Though it's a challenge I'd be interested in pursuing, if nothing else than to see/experience the results.

So what does Aberration have to do with polymer? Well this year polymer was making use of a library that had caught my eye a while back, lit-html. I quite liked the idea of how it went about rendering updates. Essentially it makes use of a tagged template literal to split your views into two piles; static and dynamic. When an update occurs it only needs to diff the dynamic pile.

Aberration is my rather pointless endeavour to take another crack at the model update view principal (that muve was based on). This time however, my update is redux and my view is lit-html. I have two main questions I want to answer with this project;

* Can an es6 module be a proper substitute for a component class?
* How does the developer experience of lit-html stack up to jsx?

## Demo Project: The Over-Engineered Todo App

I've broken the application down into a few major areas;

* _Components_ - These are simple functions for generating lit-html's TemplateResult which it uses to render the DOM.
* _Modules_ - The logic for a section of an application. It is connected to the redux store and is responsible for passing down properties to components.
* _Services_ - The data tier of the application. Modules will make use of services for fetching and manipulating data. For extra fun I'm keeping services in a _web worker_.
* _Store_ - Here be redux. This would house reducers, action types, and perhaps flow/typescript models.

I'm still hammering a few things out. I'd like to explore the lazy reducer concept as a way of keeping all module logic in one place. I'd also like to implement a router to see if I can handle the most common life cycle hooks.
