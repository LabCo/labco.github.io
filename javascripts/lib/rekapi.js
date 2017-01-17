/*! rekapi - v1.3.2 - 2014-06-29 - http://rekapi.com */
/*!
 * Rekapi - Rewritten Kapi.
 * https://github.com/jeremyckahn/rekapi
 *
 * By Jeremy Kahn (jeremyckahn@gmail.com)
 *
 * Make fun keyframe animations with JavaScript.
 * Dependencies: Underscore.js (https://github.com/documentcloud/underscore),
 *   Shifty.js (https://github.com/jeremyckahn/shifty).
 * MIT License.  This code free to use, modify, distribute and enjoy.
 */
!function(e){/*!
   * Fire an event bound to a Rekapi.
   * @param {Rekapi} rekapi
   * @param {string} eventName
   * @param {Underscore} _ A reference to the scoped Underscore dependency
   * @param {Object=} opt_data Optional event-specific data
   */
function t(e,t,n,r){n.each(e._events[t],function(t){t(e,r)})}/*!
   * @param {Rekapi} rekapi
   * @param {Underscore} _
   */
function n(e,t){var n=[];t.each(e._actors,function(e){n.push(e.getEnd())}),e._animationLength=Math.max.apply(Math,n)}/*!
   * Does nothing.  Absolutely nothing at all.
   */
function r(){}"undefined"==typeof REKAPI_DEBUG&&(REKAPI_DEBUG=!0);var i=[],a=function(r,i,a){"use strict";/*!
     * Determines which iteration of the loop the animation is currently in.
     * @param {Rekapi} rekapi
     * @param {number} timeSinceStart
     */
function o(e,t){var n=Math.floor(t/e._animationLength);return n}/*!
     * Calculate how many milliseconds since the animation began.
     * @param {Rekapi} rekapi
     * @return {number}
     */
function s(e){return g()-e._loopTimestamp}/*!
     * Determines if the animation is complete or not.
     * @param {Rekapi} rekapi
     * @param {number} currentLoopIteration
     * @return {boolean}
     */
function c(e,t){return t>=e._timesToIterate&&-1!==e._timesToIterate}/*!
     * Stops the animation if it is complete.
     * @param {Rekapi} rekapi
     * @param {number} currentLoopIteration
     */
function u(e,n){c(e,n)&&(e.stop(),t(e,"animationComplete",i))}/*!
     * Calculate how far in the animation loop `rekapi` is, in milliseconds,
     * based on the current time.  Also overflows into a new loop if necessary.
     * @param {Rekapi} rekapi
     * @param {number} forMillisecond
     * @param {number} currentLoopIteration
     * @return {number}
     */
function p(e,t,n){var r;return r=c(e,n)?e._animationLength:t%e._animationLength}/*!
     * Calculate the timeline position and state for a given millisecond.
     * Updates the `rekapi` state internally and accounts for how many loop
     * iterations the animation runs for.
     * @param {Rekapi} rekapi
     * @param {number} forMillisecond
     */
function h(e,t){var n=0,r=0;e._animationLength>0&&(r=o(e,t),n=p(e,t,r)),e.update(n),u(e,r)}/*!
     * Calculate how far into the animation loop `rekapi` is, in milliseconds,
     * and update based on that time.
     * @param {Rekapi} rekapi
     */
function f(e){h(e,s(e))}/*!
     * This is the heartbeat of an animation.  This updates `rekapi`'s state and
     * then calls itself continuously.
     * @param {Rekapi} rekapi
     */
function l(t){t._loopId=t._scheduleUpdate.call?t._scheduleUpdate.call(e,t._updateFn,v):setTimeout(t._updateFn,v)}/*!
     * @return {Function}
     */
function m(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||e.mozCancelRequestAnimationFrame&&e.mozRequestAnimationFrame||e.setTimeout}/*!
     * @return {Function}
     */
function d(){return e.cancelAnimationFrame||e.webkitCancelAnimationFrame||e.oCancelAnimationFrame||e.msCancelAnimationFrame||e.mozCancelRequestAnimationFrame||e.clearTimeout}/*!
     * Cancels an update loop.  This abstraction is needed to get around the fact
     * that in IE, clearTimeout is not technically a function
     * (https://twitter.com/kitcambridge/status/206655060342603777) and thus
     * Function.prototype.call cannot be used upon it.
     * @param {Rekapi} rekapi
     */
function y(t){t._cancelUpdate.call?t._cancelUpdate.call(e,t._loopId):clearTimeout(t._loopId)}function _(e){return this.context=e||{},this._actors={},this._playState=k.STOPPED,this._events={animationComplete:[],playStateChange:[],play:[],pause:[],stop:[],beforeUpdate:[],afterUpdate:[],addActor:[],removeActor:[],addKeyframeProperty:[],removeKeyframeProperty:[],addKeyframePropertyTrack:[],timelineModified:[]},this._timesToIterate=-1,this._animationLength=0,this._loopId=null,this._loopTimestamp=null,this._pausedAtTime=null,this._lastUpdatedMillisecond=0,this._scheduleUpdate=m(),this._cancelUpdate=d(),this._updateFn=i.bind(function(){l(this),f(this)},this),i.each(_._rendererInitHook,function(e){e(this)},this),this}var v=1e3/60,g=a.now,k={STOPPED:"stopped",PAUSED:"paused",PLAYING:"playing"};_.Tweenable=a,_._=i,/*!
     * @type {Object.<function>} Contains the context init function to be called
     * in the Rekapi constructor.
     */
_._rendererInitHook={},_.prototype.addActor=function(e){var r;return r=e instanceof _.Actor?e:new _.Actor(e),i.contains(this._actors,r)||("undefined"==typeof r.context&&(r.context=this.context),r.rekapi=this,this._actors[r.id]=r,n(this,i),r.setup(),t(this,"addActor",i,r)),r},_.prototype.getActor=function(e){return this._actors[e]},_.prototype.getActorIds=function(){return i.pluck(this._actors,"id")},_.prototype.getAllActors=function(){return i.clone(this._actors)},_.prototype.getActorCount=function(){return i.size(this._actors)},_.prototype.removeActor=function(e){return delete this._actors[e.id],delete e.rekapi,e.teardown(),n(this,i),t(this,"removeActor",i,e),e},_.prototype.play=function(e){return y(this),this._playState===k.PAUSED?this._loopTimestamp+=g()-this._pausedAtTime:this._loopTimestamp=g(),this._timesToIterate=e||-1,this._playState=k.PLAYING,l(this),t(this,"playStateChange",i),t(this,"play",i),this},_.prototype.playFrom=function(e,t){return this.play(t),this._loopTimestamp=g()-e,this},_.prototype.playFromCurrent=function(e){return this.playFrom(this._lastUpdatedMillisecond,e)},_.prototype.pause=function(){return this._playState===k.PAUSED?this:(this._playState=k.PAUSED,y(this),this._pausedAtTime=g(),t(this,"playStateChange",i),t(this,"pause",i),this)},_.prototype.stop=function(){return this._playState=k.STOPPED,y(this),i.each(this._actors,function(e){e.stop()}),t(this,"playStateChange",i),t(this,"stop",i),this},_.prototype.isPlaying=function(){return this._playState===k.PLAYING},_.prototype.update=function(e){return void 0===e&&(e=this._lastUpdatedMillisecond),t(this,"beforeUpdate",i),i.each(this._actors,function(t){t._updateState(e),"function"==typeof t.render&&t.render(t.context,t.get())}),this._lastUpdatedMillisecond=e,t(this,"afterUpdate",i),this},_.prototype.getLastPositionUpdated=function(){return this._lastUpdatedMillisecond/this._animationLength},_.prototype.getAnimationLength=function(){return this._animationLength},_.prototype.on=function(e,t){return this._events[e]?(this._events[e].push(t),this):void 0},_.prototype.off=function(e,t){return this._events[e]?(this._events[e]=t?i.without(this._events[e],t):[],this):void 0},_.prototype.exportTimeline=function(){var e={duration:this._animationLength,actors:[]};return i.each(this._actors,function(t){e.actors.push(t.exportTimeline())},this),e},_.prototype.importTimeline=function(e){i.each(e.actors,function(e){var t=new _.Actor;t.importTimeline(e),this.addActor(t)},this)},_.util={},REKAPI_DEBUG&&(_._private={calculateLoopPosition:p,updateToCurrentMillisecond:f,tick:l,determineCurrentLoopIteration:o,calculateTimeSinceStart:s,isAnimationComplete:c,updatePlayState:u}),r.Rekapi=_};i.push(function(e){"use strict";/*!
     * Sorts an array numerically, from smallest to largest.
     * @param {Array.<number>} array The Array to sort.
     * @return {Array.<number>} The sorted Array.
     */
function i(e){return e.sort(function(e,t){return e-t})}/*!
     * @param {Rekapi.Actor} actor
     * @param {string} event
     */
function a(e,n){e.rekapi&&t(e.rekapi,n,_)}/*!
     * Retrieves the most recent property cache ID for a given millisecond.
     * @param {Rekapi.Actor} actor
     * @param {number} millisecond
     * @return {number} -1 if there is no property cache for the millisecond
     * (this should never happen).
     */
function o(e,t){var n,r=e._timelinePropertyCacheKeys,i=r.length;if(1===i)return 0;for(n=1;i>n;n++)if(r[n]>=t)return n-1;return-1}/*!
     * Sort all of an Actor's property tracks so they can be cached.
     * @param {Rekapi.Actor} actor
     */
function s(e){_.each(e._propertyTracks,function(e){e.sort(function(e,t){return e.millisecond-t.millisecond})})}/*!
     * Compute and fill all timeline caches.
     * @param {Rekapi.Actor} actor
     */
function c(e){_.each(e._timelinePropertyCache,function(t,n){var r=u(e,n);_.defaults(t,r)})}/*!
     * Gets all of the current and most recent Rekapi.KeyframeProperties for a
     * given millisecond.
     * @param {Rekapi.Actor} actor
     * @param {number} forMillisecond
     * @return {Object} An Object containing Rekapi.KeyframeProperties
     */
function u(e,t){var n={};return _.each(e._propertyTracks,function(e,r){var i,a=e[0]||null,o=0,s=e.length;for(o;s>o&&(i=e[o],i.millisecond>t?n[r]=a:i.millisecond===t&&(n[r]=i),a=i,!n[r]);o++);if(!n[r]){var c=_.last(e);c&&c.millisecond<=t&&(n[r]=c)}}),n}/*!
     * Links each KeyframeProperty to the next one in its respective track.
     *
     * They're linked lists!
     * @param {Rekapi.Actor} actor
     */
function p(e){_.each(e._propertyTracks,function(e){_.each(e,function(t,n){t.linkToNext(e[n+1])})})}/*!
     * Returns a requested KeyframeProperty at a millisecond on a specified
     * track.
     * @param {Rekapi.Actor} actor
     * @param {string} trackName
     * @param {number} millisecond
     * @return {Rekapi.KeyframeProperty|undefined}
     */
function h(e,t,n){return _.findWhere(e._propertyTracks[t],{millisecond:n})}/*!
     * Empty out and rebuild the cache of internal KeyframeProperty data.
     * @param {Rekapi.Actor}
     */
function f(e){e._timelinePropertyCache={};var t,n=e._timelinePropertyCache;_.each(e._keyframeProperties,function(e){t=e.millisecond,n[t]||(n[t]={}),n[t][e.name]=e}),e._timelinePropertyCacheKeys=_.map(n,function(e,t){return+t}),i(e._timelinePropertyCacheKeys),c(e),p(e)}/*!
     * Updates internal Rekapi and Actor data after a KeyframeProperty
     * modification method is called.
     *
     * TODO: This should be moved to core.
     *
     * @param {Rekapi.Actor} actor
     */
function l(e){s(e),f(e),n(e.rekapi,_),a(e,"timelineModified")}var m="linear",d=e.Rekapi,y=d.Tweenable,_=d._;d.Actor=function(e){return e=e||{},y.call(this),_.extend(this,{_propertyTracks:{},_timelinePropertyCache:{},_timelinePropertyCacheKeys:[],_keyframeProperties:{},id:_.uniqueId(),context:e.context,setup:e.setup||r,render:e.render||r,teardown:e.teardown||r,data:{}}),this};var v=d.Actor,g=function(){};g.prototype=y.prototype,v.prototype=new g,v.prototype.keyframe=function(e,t,r){r=r||m;var i=y.composeEasingObject(t,r);return _.each(t,function(t,n){var r=new d.KeyframeProperty(e,n,t,i[n]);this._addKeyframeProperty(r)},this),this.rekapi&&n(this.rekapi,_),f(this),a(this,"timelineModified"),this},v.prototype.hasKeyframeAt=function(e,t){var n=this._propertyTracks;if(t){if(!_.has(n,t))return!1;n=_.pick(n,t)}var r;for(r in n)if(n.hasOwnProperty(r)&&h(this,r,e))return!0;return!1},v.prototype.copyKeyframe=function(e,t){var n={},r={};return _.each(this._propertyTracks,function(e,i){var a=h(this,i,t);a&&(n[i]=a.value,r[i]=a.easing)},this),this.keyframe(e,n,r),this},v.prototype.moveKeyframe=function(e,t){return!this.hasKeyframeAt(e)||this.hasKeyframeAt(t)?!1:(_.each(this._propertyTracks,function(n,r){var i=h(this,r,e);i&&(i.millisecond=t)},this),l(this),!0)},v.prototype.modifyKeyframe=function(e,t,n){return n=n||{},_.each(this._propertyTracks,function(r,i){var a=h(this,i,e);a&&a.modifyWith({value:t[i],easing:n[i]})},this),l(this),this},v.prototype.removeKeyframe=function(e){var t=this._propertyTracks;return _.each(this._propertyTracks,function(n,r){var i=_.findWhere(n,{millisecond:e});i&&(t[r]=_.without(n,i),i.detach())},this),this.rekapi&&n(this.rekapi,_),f(this),a(this,"timelineModified"),this},v.prototype.removeAllKeyframes=function(){return _.each(this._propertyTracks,function(e){e.length=0}),_.each(this._keyframeProperties,function(e){e.detach()},this),this._keyframeProperties={},this.removeKeyframe(0)},v.prototype.getKeyframeProperty=function(e,t){var n=this._propertyTracks[e];return n?_.findWhere(n,{millisecond:t}):void 0},v.prototype.modifyKeyframeProperty=function(e,t,n){var r=this.getKeyframeProperty(e,t);return r&&(r.modifyWith(n),l(this)),this},v.prototype.removeKeyframeProperty=function(e,t){var n=this._propertyTracks;if("undefined"!=typeof n[e]){var r=this.getKeyframeProperty(e,t);return n[e]=_.without(n[e],r),r.detach(),l(this),r}},v.prototype.getTrackNames=function(){return _.keys(this._propertyTracks)},v.prototype.getPropertiesInTrack=function(e){var t=this._propertyTracks[e];return t?t.slice(0):void 0},v.prototype.getStart=function(e){var t=[],n=this._propertyTracks;if(n.hasOwnProperty(e)){var r=n[e][0];r&&t.push(r.millisecond)}else _.each(n,function(e){e.length&&t.push(e[0].millisecond)});0===t.length&&(t=[0]);var i;return i=t.length>0?Math.min.apply(Math,t):0},v.prototype.getEnd=function(e){var t=0,n=this._propertyTracks;return e&&(n={},n[e]=this._propertyTracks[e]),_.each(n,function(e){if(e.length){var n=_.last(e).millisecond;n>t&&(t=n)}},this),t},v.prototype.getLength=function(e){return this.getEnd(e)-this.getStart(e)},v.prototype.wait=function(e){var t=this.getEnd();if(t>=e)return this;var n=this.getEnd(),r=u(this,this.getEnd()),i={},a={};return _.each(r,function(e,t){i[t]=e.value,a[t]=e.easing}),this.removeKeyframe(n),this.keyframe(n,i,a),this.keyframe(e,i,a),this},/*!
     * Associate a `Rekapi.KeyframeProperty` to this actor.  Augments the `Rekapi.KeyframeProperty` to maintain a link between the two objects.
     * @param {Rekapi.KeyframeProperty} keyframeProperty
     * @return {Rekapi.Actor}
     */
v.prototype._addKeyframeProperty=function(e){e.actor=this,this._keyframeProperties[e.id]=e;var n=e.name,r=this._propertyTracks;return"undefined"==typeof this._propertyTracks[n]?(r[n]=[e],this.rekapi&&t(this.rekapi,"addKeyframePropertyTrack",_,e)):r[n].push(e),s(this),this.rekapi&&t(this.rekapi,"addKeyframeProperty",_,e),this},/*!
     * Calculate and set the actor's position at `millisecond` in the animation.
     * @param {number} millisecond
     * @return {Rekapi.Actor}
     */
v.prototype._updateState=function(e){var t=this.getStart(),n=this.getEnd(),i={};e=Math.min(n,e);var a=o(this,e),s=this._timelinePropertyCache[this._timelinePropertyCacheKeys[a]];return t===n?_.each(s,function(e,t){i[t]=e.value}):_.each(s,function(t,n){this._beforeKeyframePropertyInterpolate!==r&&this._beforeKeyframePropertyInterpolate(t),i[n]=t.getValueAt(e),this._afterKeyframePropertyInterpolate!==r&&this._afterKeyframePropertyInterpolate(t,i)},this),this.set(i),this},/*!
     * @param {Rekapi.KeyframeProperty} keyframeProperty
     * @abstract
     */
v.prototype._beforeKeyframePropertyInterpolate=r,/*!
     * @param {Rekapi.KeyframeProperty} keyframeProperty
     * @param {Object} interpolatedObject
     * @abstract
     */
v.prototype._afterKeyframePropertyInterpolate=r,v.prototype.exportTimeline=function(){var e={start:this.getStart(),end:this.getEnd(),trackNames:this.getTrackNames(),propertyTracks:{}};return _.each(this._propertyTracks,function(t,n){var r=e.propertyTracks[n]=[];_.each(t,function(e){r.push(e.exportPropertyData())})}),e},v.prototype.importTimeline=function(e){_.each(e.propertyTracks,function(e){_.each(e,function(e){var t={};t[e.name]=e.value,this.keyframe(e.millisecond,t,e.easing)},this)},this)}}),i.push(function(e){"use strict";var n="linear",r=e.Rekapi,i=r.Tweenable,a=r._,o=i.interpolate;r.KeyframeProperty=function(e,t,r,i){return this.id=a.uniqueId("keyframeProperty_"),this.millisecond=e,this.name=t,this.value=r,this.easing=i||n,this.nextProperty=null,this};var s=r.KeyframeProperty;s.prototype.modifyWith=function(e){var t={};a.each(["millisecond","easing","value"],function(n){t[n]="undefined"==typeof e[n]?this[n]:e[n]},this),a.extend(this,t)},s.prototype.getValueAt=function(e){var t,n={},r={},i=this.nextProperty,a=Math.max(e,this.millisecond);if(i){a=Math.min(a,i.millisecond),n[this.name]=this.value,r[this.name]=i.value;var s=i.millisecond-this.millisecond,c=(a-this.millisecond)/s;t=o(n,r,c,i.easing)[this.name]}else t=this.value;return t},s.prototype.linkToNext=function(e){this.nextProperty=e||null},s.prototype.detach=function(){var e=this.actor;return e&&e.rekapi&&(t(e.rekapi,"removeKeyframeProperty",a,this),delete e._keyframeProperties[this.id],this.actor=null),this},s.prototype.exportPropertyData=function(){return{millisecond:this.millisecond,name:this.name,value:this.value,easing:this.easing}}}),i.push(function(e){"use strict";/*!
     * Gets (and optionally sets) height or width on a canvas.
     * @param {HTMLCanvas} canvas
     * @param {string} heightOrWidth The dimension (either "height" or "width")
     * to get or set.
     * @param {number=} opt_newSize The new value to set for `dimension`.
     * @return {number}
     */
function n(e,t,n){return"undefined"!=typeof n&&(e[t]=n,e.style[t]=n+"px"),e[t]}/*!
     * Takes care of some pre-rendering tasks for canvas animations.
     * @param {Rekapi.CanvasRenderer} canvasRenderer
     */
function r(e){e.clear()}/*!
     * Render all the `Actor`s at whatever position they are currently in.
     * @param {Rekapi}
     * @param {Rekapi.CanvasRenderer} canvasRenderer
     * @return {Rekapi}
     */
function i(e,n){t(e,"beforeRender",c);var r,i=n._renderOrderSorter,a=n._renderOrder.length;if(i){var o=c.sortBy(n._canvasActors,i);r=c.pluck(o,"id")}else r=n._renderOrder;var s,u,p=n._canvasActors;for(u=0;a>u;u++)s=p[r[u]],s.render(s.context,s.get());return t(e,"afterRender",c),e}/*!
     * @param {Rekapi.Actor} actor
     * @param {Rekapi.CanvasRenderer} canvasRenderer
     */
function a(e,t){t._renderOrder.push(e.id),t._canvasActors[e.id]=e}/*!
     * @param {Rekapi.Actor} actor
     * @param {Rekapi.CanvasRenderer} canvasRenderer
     */
function o(e,t){t._renderOrder=c.without(t._renderOrder,e.id),delete t._canvasActors[e.id]}var s=e.Rekapi,c=s._;/*!
     * Sets up an instance of CanvasRenderer and attaches it to a `Rekapi`
     * instance.  Also augments the Rekapi instance with canvas-specific
     * functions.
     * @param {Rekapi} rekapi
     */
s._rendererInitHook.canvas=function(e){"undefined"!=typeof CanvasRenderingContext2D&&e.context instanceof CanvasRenderingContext2D&&(e.renderer=new u(e))},s.CanvasRenderer=function(e,t){this.rekapi=e,this.canvasContext=t||e.context,this._renderOrder=[],this._renderOrderSorter=null,this._canvasActors={},c.extend(e._events,{beforeRender:[],afterRender:[]});var n=this;return e.on("afterUpdate",function(){i(e,n)}),e.on("addActor",function(e,t){a(t,n)}),e.on("removeActor",function(e,t){o(t,n)}),e.on("beforeRender",function(){r(n)}),this};var u=s.CanvasRenderer;u.prototype.height=function(e){return n(this.canvasContext.canvas,"height",e)},u.prototype.width=function(e){return n(this.canvasContext.canvas,"width",e)},u.prototype.clear=function(){return this.canvasContext.clearRect(0,0,this.width(),this.height()),this.rekapi},u.prototype.moveActorToLayer=function(e,t){return t<this._renderOrder.length&&t>-1&&(this._renderOrder=c.without(this._renderOrder,e.id),this._renderOrder.splice(t,0,e.id)),e},u.prototype.setOrderFunction=function(e){return this._renderOrderSorter=e,this.rekapi},u.prototype.unsetOrderFunction=function(){return this._renderOrderSorter=null,this.rekapi}}),i.push(function(e){"use strict";/*!
     * http://stackoverflow.com/a/3886106
     *
     * @param {number} number
     */
function n(e){return e%1===0}/*!
     * @return {string}
     */
function r(){var e=document.body.style;return"-webkit-animation"in e?"webkit":"-moz-animation"in e?"mozilla":"-ms-animation"in e?"microsoft":"-o-animation"in e?"opera":"animation"in e?"w3":""}/*!
     * @param {Rekapi} rekapi
     * @param {string} css The css content that the <style> element should have.
     * @return {HTMLStyleElement} The unique ID of the injected <style> element.
     */
function i(e,t){var n=document.createElement("style"),r="rekapi-"+G++;return n.id=r,n.innerHTML=t,document.head.appendChild(n),a(e),n}/*!
     * Fixes a really bizarre issue that only seems to affect Presto and Blink.
     * In some situations, DOM nodes will not detect dynamically injected <style>
     * elements.  Explicitly re-inserting DOM nodes seems to fix the issue.  Not
     * sure what causes this issue.  Not sure why this fixes it.
     *
     * @param {Rekapi} rekapi
     */
function a(e){var t=document.createElement("div");H.each(e.getAllActors(),function(e){if(1===e.context.nodeType){var n=e.context,r=n.parentElement;r.replaceChild(t,n),r.replaceChild(n,t)}}),t=null}/*!
     * @param {HTMLElement} element
     * @param {string} styleName
     * @param {string|number} styleValue
     */
function o(e,t,n){e.style[t]=n}/*!
     * @param {string} name A transform function name
     * @return {boolean}
     */
function s(e){return H.contains(Q,e)}/*!
     * Builds a concatenated string of given transform property values in order.
     *
     * @param {Array.<string>} orderedTransforms Array of ordered transform
     *     function names
     * @param {Object} transformProperties Transform properties to build together
     * @return {string}
     */
function c(e,t){var n=[];return H.each(e,function(e){t[e]&&n.push(e+"("+t[e]+")")}),n.join(" ")}/*!
     * Sets value for all vendor prefixed transform properties on an element
     *
     * @param {HTMLElement} element The actor's DOM element
     * @param {string} transformValue The transform style value
     */
function u(e,t){H.each(q,function(n){o(e,n,t)})}/*!
     * @param {Rekapi} rekapi
     * @param {Rekapi.Actor} actor
     */
function p(e,t){var n=t.context;if(1===n.nodeType){var r=V.getActorClassName(t);n.className.match(r)||(n.className+=" "+r),t._transformOrder=Q.slice(0),t._beforeKeyframePropertyInterpolate=h,t._afterKeyframePropertyInterpolate=f,t.render=H.bind(l,t,t),t.teardown=H.bind(m,t,t)}}/*!
     * transform properties like translate3d and rotate3d break the cardinality
     * of multi-ease easing strings, because the "3" gets treated like a
     * tweenable value.  Transform "3d(" to "__THREED__" to prevent this, and
     * transform it back in _afterKeyframePropertyInterpolate.
     *
     * @param {Rekapi.KeyframeProperty} keyframeProperty
     */
function h(e){if("transform"===e.name){var t=e.value,n=e.nextProperty;n&&t.match(/3d\(/g)&&(e.value=t.replace(/3d\(/g,"__THREED__"),n.value=n.value.replace(/3d\(/g,"__THREED__"))}}/*!
     * @param {Rekapi.KeyframeProperty} keyframeProperty
     * @param {Object} interpolatedObject
     */
function f(e,t){if("transform"===e.name){var n=e.value,r=e.nextProperty;if(r&&n.match(/__THREED__/g)){e.value=n.replace(/__THREED__/g,"3d("),r.value=r.value.replace(/__THREED__/g,"3d(");var i=e.name;t[i]=t[i].replace(/__THREED__/g,"3d(")}}}/*!
     * @param {Rekapi.Actor} actor
     * @param {HTMLElement} element
     * @param {Object} state
     */
function l(e,t,n){var r=H.keys(n),i=H.filter(r,s),a=H.reject(r,s),p=H.pick(n,a);if(i.length){var h=H.pick(n,i),f=c(e._transformOrder,h);u(t,f)}else n.transform&&u(t,n.transform);H.each(p,function(e,n){o(t,n,e)})}/*!
     * @param {Rekapi.Actor} actor
     */
function m(e){var t=e.context,n=t.className.match(/\S+/g),r=H.without(n,V.getActorClassName(e));t.className=r}/*!
     * Creates the CSS `@keyframes` for an individual actor.
     * @param {Rekapi.Actor} actor
     * @param {Object=} opts Same as opts for Rekapi.prototype.toCSS.
     * @return {string}
     */
function d(e,t){t=t||{};var n=[],r=t.name||V.getActorClassName(e),i=t.fps||Y,a=Math.ceil(e.rekapi.getAnimationLength()/1e3*i),o=!K(e),s=g(e,r,o,t.vendors,t.iterations,t.isCentered),c=y(e,r,a,o,t.vendors);return n.push(s),n.push(c),n.join("\n")}/*!
     * @param {Rekapi.Actor} actor
     * @param {string} animName
     * @param {number} steps
     * @param {boolean} combineProperties
     * @param {Array.<string>=} opt_vendors
     * @return {string}
     */
function y(e,t,n,r,i){var a=e.getTrackNames(),o=[];r?o.push(b(e,n)):H.each(a,function(t){o.push(R(e,n,t))});var s=[];return r?s.push(_(o[0],t,i)):H.each(a,function(e,n){s.push(_(o[n],t+"-"+e,i))}),s=s.join("\n")}/*!
     * @param {string} toKeyframes Generated keyframes to wrap in boilerplates
     * @param {string} animName
     * @param {Array.<string>=} opt_vendors Vendor boilerplates to be applied.
     *     Should be any of the values in Rekapi.util.VENDOR_PREFIXES.
     * @return {string}
     */
function _(e,t,n){n=n||["w3"];var r=[];return H.each(n,function(n){var i=B(et,[J[n],t,e]),a=v(i,n);r.push(a)}),r.join("\n")}/*!
     * @param {string} keyframes
     * @param {vendor} vendor
     * @return {string}
     */
function v(e,t){var n=new RegExp(X,"g"),r=J[t]+"transform",i=new RegExp(Z,"g"),a=J[t],o=e.replace(i,a).replace(n,r);return o}/*!
     * @param {Rekapi.Actor} actor
     * @param {string} animName
     * @param {boolean} combineProperties
     * @param {Array.<string>=} opt_vendors
     * @param {number|string=} opt_iterations
     * @param {boolean=} opt_isCentered
     * @return {string}
     */
function g(e,t,n,r,i,a){r=r||["w3"];var o,s=[];H.each(r,function(r){o=k(e,t,r,n,i,a),s.push(o)});var c=B(tt,[t,s.join("\n")]);return c}/*!
     * @param {Rekapi.Actor} actor
     * @param {string} animName
     * @param {string} vendor
     * @param {boolean} combineProperties
     * @param {number|string=} opt_iterations
     * @param {boolean=} opt_isCentered
     * @return {string}
     */
function k(e,t,n,r,i,a){var o=[],s=J[n];return o.push(T(e,t,s,r)),o.push(P(e,s)),o.push(A(e,s)),o.push(S(s)),o.push(C(s)),o.push(E(e.rekapi,s,i)),a&&o.push(x(s)),o.join("\n")}/*!
     * @param {Rekapi.Actor} actor
     * @param {string} animName
     * @param {string} prefix
     * @param {boolean} combineProperties
     * @return {string}
     */
function T(e,t,n,r){var i=B("  %sanimation-name:",[n]),a=e.getTrackNames();return r?i+=B(" %s-keyframes;",[t]):(H.each(a,function(e){i+=B(" %s-%s-keyframes,",[t,e])}),i=i.slice(0,i.length-1),i+=";"),i}/*!
     * @param {Rekapi.Actor} actor
     * @param {string} animName
     * @return {string}
     */
function P(e,t){return B("  %sanimation-duration: %sms;",[t,e.getEnd()-e.getStart()])}/*!
     * @param {Rekapi.Actor} actor
     * @param {number|string} delay
     * @return {string}
     */
function A(e,t){return B("  %sanimation-delay: %sms;",[t,e.getStart()])}/*!
     * @param {string} prefix
     * @return {string}
     */
function S(e){return B("  %sanimation-fill-mode: forwards;",[e])}/*!
     * @param {string} prefix
     * @return {string}
     */
function C(e){return B("  %sanimation-timing-function: linear;",[e])}/*!
     * @param {Rekapi} rekapi
     * @param {string} prefix
     * @param {number|string=} opt_iterations
     * @return {string}
     */
function E(e,t,n){var r;r=n?n:-1===e._timesToIterate?"infinite":e._timesToIterate;var i="  %sanimation-iteration-count: %s;";return B(i,[t,r])}/*!
     * @param {string} prefix
     * @return {string}
     */
function x(e){return B("  %stransform-origin: 0 0;",[e])}/*!
     * @param {Rekapi.KeyframeProperty} property
     * @return {boolean}
     */
function O(e){var t=!1,n=e.nextProperty;if(n){if(I(e,n))return!0;var r,i=n.easing.split(" "),a=0,o=i.length,s=i[0];for(a;o>a;a++){if(r=i[a],!$[r]||s!==r){t=!1;break}t=!0,s=r}}return t}/*!
     * @param {Rekapi.KeyframeProperty} property
     * @param {Rekapi.KeyframeProperty} nextProperty
     * @return {boolean}
     */
function I(e,t){return e.name===t.name&&e.value===t.value?!0:!1}/*!
     * @param {Rekapi.Actor} actor
     * @return {boolean}
     */
function K(e){return H.any(e._keyframeProperties,O)}/*!
     * @param {Rekapi.KeyframeProperty} property
     * @param {number} fromPercent
     * @param {number} toPercent
     * @return {string}
     */
function w(e,t,r){var i=[],a=e.name;"transform"===e.name&&(a=X);var o=$[e.nextProperty.easing.split(" ")[0]],s=B("cubic-bezier(%s)",[o]),c=n(t)?t:t.toFixed(2),u=n(r)?r:r.toFixed(2);return i.push(B("  %s% {%s:%s;%sanimation-timing-function: %s;}",[c,a,e.value,Z,s])),i.push(B("  %s% {%s:%s;}",[u,a,e.nextProperty.value])),i.join("\n")}/*!
     * @param {Rekapi.Actor} actor
     * @param {number} steps
     * @param {string} track
     * @return {string}
     */
function R(e,t,n){var r=[],i=e.getEnd(),a=e.getStart(),o=e.getLength(),s=M(e,n,a);s&&r.push(s);var c=!1;H.each(e._propertyTracks[n],function(n){var i,s,u,p=L(n,a,o),h=n.nextProperty;if(h){i=L(h,a,o);var f=i-p;s=Math.floor(f/100*t)||1,u=f/s}else i=100,s=1,u=1;var l;if(h&&I(n,h))l=F(e,a,n,h,p,i),c&&l.shift(),c=!1;else if(O(n)){if(l=w(n,p,i),c){var m=r.length,d=r[m-1],y=d.split("\n")[0];r[m-1]=y}c=!0}else l=U(e,s,u,a,p,n),c&&l.shift(),l.length&&(l=l.join("\n")),c=!1;l.length&&r.push(l)});var u=D(e,n,a,i);return u&&r.push(u),r.join("\n")}/*!
     * @param {Rekapi.Actor} actor
     * @param {number} steps
     * @return {string}
     */
function b(e,t){return U(e,t+1,100/t,0,0).join("\n")}/*!
     * @param {Rekapi.Actor} actor
     * @param {string} track
     * @param {number} actorStart
     * @return {string|undefined}
     */
function M(e,t,n){var r=e._propertyTracks[t][0];if("undefined"!=typeof r&&r.millisecond!==n){var i=U(e,1,1,r.millisecond,0,r);return i.join("\n")}}/*!
     * @param {Rekapi.Actor} actor
     * @param {string} track
     * @param {number} actorStart
     * @param {number} actorEnd
     * @return {string|undefined}
     */
function D(e,t,n,r){var i=H.last(e._propertyTracks[t]);if("undefined"!=typeof i&&i.millisecond!==r){var a=U(e,1,1,n,100,i);return a.join("\n")}}/*!
     * @param {Rekapi.KeyframeProperty} property
     * @param {number} actorStart
     * @param {number} actorLength
     * @return {number}
     */
function L(e,t,n){return(e.millisecond-t)/n*100}/*!
     * @param {Rekapi.Actor} actor
     * @param {number} increments
     * @param {number} incrementSize
     * @param {number} actorStart
     * @param {number} fromPercent
     * @param {Rekapi.KeyframeProperty=} opt_fromProp
     * @return {Array.<string>}
     */
function U(e,t,n,r,i,a){var o,s,c,u=[],p=e.getLength();for(o=0;t>o;o++)s=i+o*n,e._updateState(s/100*p+r),c=+s.toFixed(2)+"% ",u.push(a?"  "+c+N(e,a.name):"  "+c+N(e));return u}/*!
     * @param {Rekapi.Actor} actor
     * @param {number} actorStart
     * @param {Rekapi.KeyframeProperty} fromProp
     * @param {Rekapi.KeyframeProperty} toProp
     * @param {number} fromPercent
     * @param {number} toPercent
     * @return {Array.<string>}
     */
function F(e,t,n,r,i,a){var o=U(e,1,a-i,t,i,n);return o}/*!
     * @param {Rekapi.Actor} actor
     * @param {string=} opt_targetProp
     * @return {string}
     */
function N(e,t){var n,r=["{"];if(t){n={};var i=e.get()[t];"undefined"!=typeof i&&(n[t]=i)}else n=e.get();var a;return H.each(n,function(e,t){a=e;var n=t;"transform"===t&&(n=X),r.push(n+":"+a+";")}),r.push("}"),r.join("")}var j=e.Rekapi,H=j._,z=j.Tweenable.now,q=["transform","webkitTransform","MozTransform","oTransform","msTransform"],Q=["translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","skewX","skewY"],W=250,B=function(e,t){var n=e;return H.each(t,function(e){n=n.replace("%s",e)}),n};/*!
     * @param {Rekapi} rekapi
     */
j._rendererInitHook.cssAnimate=function(e){1===e.context.nodeType&&(e.renderer=new V(e))};var G=0;j.DOMRenderer=function(e){return this.rekapi=e,this._playTimestamp=null,this._cachedCSS=null,this._styleElement=null,this._stopSetTimeoutHandle=null,e.on("timelineModified",H.bind(function(){this._cachedCSS=null},this)),e.on("addActor",p),this};var V=j.DOMRenderer;V.prototype.canAnimateWithCSS=function(){return!!r()},V.prototype.play=function(e){this.isPlaying()&&this.stop();var n=this._cachedCSS||this.prerender.apply(this,arguments);if(this._styleElement=i(this.rekapi,n),this._playTimestamp=z(),e){var r=e*this.rekapi.getAnimationLength();this._stopSetTimeoutHandle=setTimeout(H.bind(this.stop,this,!0),r+W)}t(this.rekapi,"play",H)},V.prototype.stop=function(e){if(this.isPlaying()){clearTimeout(this._stopSetTimeoutHandle),this._styleElement.innerHTML="",document.head.removeChild(this._styleElement),this._styleElement=null;var n;n=e?this.rekapi.getAnimationLength():(z()-this._playTimestamp)%this.rekapi.getAnimationLength(),this.rekapi.update(n),t(this.rekapi,"stop",H)}},V.prototype.isPlaying=function(){return!!this._styleElement},V.prototype.prerender=function(e,t){return this._cachedCSS=this.toString({vendors:[r()],fps:t,iterations:e})},V.prototype.setActorTransformOrder=function(e,t){var n=H.reject(t,s);if(n.length)throw"Unknown or unsupported transform functions: "+n.join(", ");return e._transformOrder=H.uniq(t),this.rekapi},V.getActorClassName=function(e){return"actor-"+e.id},j.DOMRenderer.prototype.toString=function(e){e=e||{};var t=[];return H.each(this.rekapi.getAllActors(),function(n){1===n.context.nodeType&&t.push(d(n,e))}),t.join("\n")};var Y=30,X="TRANSFORM",Z="VENDOR",J={microsoft:"-ms-",mozilla:"-moz-",opera:"-o-",w3:"",webkit:"-webkit-"},$={linear:".25,.25,.75,.75",easeInQuad:".55,.085,.68,.53",easeInCubic:".55,.055,.675,.19",easeInQuart:".895,.03,.685,.22",easeInQuint:".755,.05,.855,.06",easeInSine:".47,0,.745,.715",easeInExpo:".95,.05,.795,.035",easeInCirc:".6,.04,.98, .335",easeOutQuad:".25,.46,.45,.94",easeOutCubic:".215,.61,.355,1",easeOutQuart:".165,.84,.44,1",easeOutQuint:".23,1,.32,1",easeOutSine:".39,.575,.565,1",easeOutExpo:".19,1,.22,1",easeOutCirc:".075,.82,.165,1",easeInOutQuad:".455,.03,.515,.955",easeInOutCubic:".645,.045,.355,1",easeInOutQuart:".77,0,.175,1",easeInOutQuint:".86,0.07,1",easeInOutSine:".445,.05,.55,.95",easeInOutExpo:"1,0,0,1",easeInOutCirc:".785,.135,.15,.86"},et=["@%skeyframes %s-keyframes {","%s","}"].join("\n"),tt=[".%s {","%s","}"].join("\n");REKAPI_DEBUG&&(j._private.cssRenderer={TRANSFORM_TOKEN:X,VENDOR_TOKEN:Z,applyVendorBoilerplates:_,applyVendorPropertyPrefixes:v,generateBoilerplatedKeyframes:y,generateCSSClass:g,generateCSSAnimationProperties:k,generateActorKeyframes:R,generateActorTrackSegment:U,serializeActorStep:N,generateAnimationNameProperty:T,generateAnimationDurationProperty:P,generateAnimationDelayProperty:A,generateAnimationFillModeProperty:S,generateAnimationTimingFunctionProperty:C,generateAnimationIterationProperty:E,generateAnimationCenteringRule:x,simulateLeadingWait:M,simulateTrailingWait:D,canOptimizeKeyframeProperty:O,canOptimizeAnyKeyframeProperties:K,generateOptimizedKeyframeSegment:w,getActorCSS:d})});var o=function(e,t){"use strict";var n=t?{}:e,r=t&&t.underscore?t.underscore:n._,o=t&&t.Tweenable?t.Tweenable:n.Tweenable;return a(n,r,o),r.each(i,function(e){e(n)}),n.Rekapi};if("function"==typeof define&&define.amd){var s="undefined"!=typeof _;define(["shifty","underscore"],function(e,t){var n=null!=t,r={Tweenable:e,underscore:n?t:_},i=o({},r);return REKAPI_DEBUG&&(i.underscore_version=r.underscore.VERSION),!s&&n&&(this._=void 0),i})}else o(this)}(this);