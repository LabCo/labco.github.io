/*! shifty - v1.2.1 - 2014-06-29 - http://jeremyckahn.github.io/shifty */
!function(t){/*!
   * Shifty Core
   * By Jeremy Kahn - jeremyckahn@gmail.com
   */
"undefined"==typeof SHIFTY_DEBUG_NOW&&(SHIFTY_DEBUG_NOW=function(){return+new Date});var n=function(){"use strict";function n(){}/*!
     * Handy shortcut for doing a for-in loop. This is not a "normal" each
     * function, it is optimized for Shifty.  The iterator function only receives
     * the property name, not the value.
     * @param {Object} obj
     * @param {Function(string)} fn
     */
function e(t,n){var e;for(e in t)Object.hasOwnProperty.call(t,e)&&n(e)}/*!
     * Perform a shallow copy of Object properties.
     * @param {Object} targetObject The object to copy into
     * @param {Object} srcObject The object to copy from
     * @return {Object} A reference to the augmented `targetObj` Object
     */
function r(t,n){return e(n,function(e){t[e]=n[e]}),t}/*!
     * Copies each property from src onto target, but only if the property to
     * copy to target is undefined.
     * @param {Object} target Missing properties in this Object are filled in
     * @param {Object} src
     */
function i(t,n){e(n,function(e){"undefined"==typeof t[e]&&(t[e]=n[e])})}/*!
     * Calculates the interpolated tween values of an Object for a given
     * timestamp.
     * @param {Number} forPosition The position to compute the state for.
     * @param {Object} currentState Current state properties.
     * @param {Object} originalState: The original state properties the Object is
     * tweening from.
     * @param {Object} targetState: The destination state properties the Object
     * is tweening to.
     * @param {number} duration: The length of the tween in milliseconds.
     * @param {number} timestamp: The UNIX epoch time at which the tween began.
     * @param {Object} easing: This Object's keys must correspond to the keys in
     * targetState.
     */
function o(t,n,e,r,i,o,a){var s,f=(t-o)/i;for(s in n)n.hasOwnProperty(s)&&(n[s]=u(e[s],r[s],h[a[s]],f));return n}/*!
     * Tweens a single property.
     * @param {number} start The value that the tween started from.
     * @param {number} end The value that the tween should end at.
     * @param {Function} easingFunc The easing curve to apply to the tween.
     * @param {number} position The normalized position (between 0.0 and 1.0) to
     * calculate the midpoint of 'start' and 'end' against.
     * @return {number} The tweened value.
     */
function u(t,n,e,r){return t+(n-t)*e(r)}/*!
     * Applies a filter to Tweenable instance.
     * @param {Tweenable} tweenable The `Tweenable` instance to call the filter
     * upon.
     * @param {String} filterName The name of the filter to apply.
     */
function a(t,n){var r=c.prototype.filter,i=t._filterArgs;e(r,function(e){"undefined"!=typeof r[e][n]&&r[e][n].apply(t,i)})}/*!
     * Handles the update logic for one step of a tween.
     * @param {Tweenable} tweenable
     * @param {number} timestamp
     * @param {number} duration
     * @param {Object} currentState
     * @param {Object} originalState
     * @param {Object} targetState
     * @param {Object} easing
     * @param {Function} step
     * @param {Function(Function,number)}} schedule
     */
function s(t,n,e,r,i,u,s,f,c){m=n+e,y=Math.min(g(),m),v=y>=m,t.isPlaying()&&!v?(c(t._timeoutHandler,_),a(t,"beforeTween"),o(y,r,i,u,e,n,s),a(t,"afterTween"),f(r)):v&&(f(u),t.stop(!0))}/*!
     * Creates a usable easing Object from either a string or another easing
     * Object.  If `easing` is an Object, then this function clones it and fills
     * in the missing properties with "linear".
     * @param {Object} fromTweenParams
     * @param {Object|string} easing
     */
function f(t,n){var r={};return"string"==typeof n?e(t,function(t){r[t]=n}):e(t,function(t){r[t]||(r[t]=n[t]||l)}),r}function c(t,n){this._currentState=t||{},this._configured=!1,this._scheduleFunction=p,"undefined"!=typeof n&&this.setConfig(n)}var h,p,l="linear",w=500,_=1e3/60,d=Date.now?Date.now:function(){return+new Date},g=SHIFTY_DEBUG_NOW?SHIFTY_DEBUG_NOW:d;p="undefined"!=typeof window?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||window.mozCancelRequestAnimationFrame&&window.mozRequestAnimationFrame||setTimeout:setTimeout;var m,y,v;/*!
     * Filters are used for transforming the properties of a tween at various
     * points in a Tweenable's life cycle.  See the README for more info on this.
     */
/*!
     * This object contains all of the tweens available to Shifty.  It is extendible - simply attach properties to the Tweenable.prototype.formula Object following the same format at linear.
     *
     * `pos` should be a normalized `number` (between 0 and 1).
     */
return c.prototype.tween=function(t){return this._isTweening?this:(void 0===t&&this._configured||this.setConfig(t),this._start(this.get()),this.resume())},c.prototype.setConfig=function(t){t=t||{},this._configured=!0,this._pausedAtTime=null,this._start=t.start||n,this._step=t.step||n,this._finish=t.finish||n,this._duration=t.duration||w,this._currentState=t.from||this.get(),this._originalState=this.get(),this._targetState=t.to||this.get(),this._timestamp=g();var e=this._currentState,r=this._targetState;return i(r,e),this._easing=f(e,t.easing||l),this._filterArgs=[e,this._originalState,r,this._easing],a(this,"tweenCreated"),this},c.prototype.get=function(){return r({},this._currentState)},c.prototype.set=function(t){this._currentState=t},c.prototype.pause=function(){return this._pausedAtTime=g(),this._isPaused=!0,this},c.prototype.resume=function(){this._isPaused&&(this._timestamp+=g()-this._pausedAtTime),this._isPaused=!1,this._isTweening=!0;var t=this;return this._timeoutHandler=function(){s(t,t._timestamp,t._duration,t._currentState,t._originalState,t._targetState,t._easing,t._step,t._scheduleFunction)},this._timeoutHandler(),this},c.prototype.stop=function(t){return this._isTweening=!1,this._isPaused=!1,this._timeoutHandler=n,t&&(r(this._currentState,this._targetState),a(this,"afterTweenEnd"),this._finish.call(this,this._currentState)),this},c.prototype.isPlaying=function(){return this._isTweening&&!this._isPaused},c.prototype.setScheduleFunction=function(t){this._scheduleFunction=t},c.prototype.dispose=function(){var t;for(t in this)this.hasOwnProperty(t)&&delete this[t]},c.prototype.filter={},c.prototype.formula={linear:function(t){return t}},h=c.prototype.formula,r(c,{now:g,each:e,tweenProps:o,tweenProp:u,applyFilter:a,shallowCopy:r,defaults:i,composeEasingObject:f}),"function"==typeof SHIFTY_DEBUG_NOW&&(t.timeoutHandler=s),"object"==typeof exports?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):"undefined"==typeof t.Tweenable&&(t.Tweenable=c),c}();!function(){n.shallowCopy(n.prototype.formula,{easeInQuad:function(t){return Math.pow(t,2)},easeOutQuad:function(t){return-(Math.pow(t-1,2)-1)},easeInOutQuad:function(t){return(t/=.5)<1?.5*Math.pow(t,2):-.5*((t-=2)*t-2)},easeInCubic:function(t){return Math.pow(t,3)},easeOutCubic:function(t){return Math.pow(t-1,3)+1},easeInOutCubic:function(t){return(t/=.5)<1?.5*Math.pow(t,3):.5*(Math.pow(t-2,3)+2)},easeInQuart:function(t){return Math.pow(t,4)},easeOutQuart:function(t){return-(Math.pow(t-1,4)-1)},easeInOutQuart:function(t){return(t/=.5)<1?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},easeInQuint:function(t){return Math.pow(t,5)},easeOutQuint:function(t){return Math.pow(t-1,5)+1},easeInOutQuint:function(t){return(t/=.5)<1?.5*Math.pow(t,5):.5*(Math.pow(t-2,5)+2)},easeInSine:function(t){return-Math.cos(t*(Math.PI/2))+1},easeOutSine:function(t){return Math.sin(t*(Math.PI/2))},easeInOutSine:function(t){return-.5*(Math.cos(Math.PI*t)-1)},easeInExpo:function(t){return 0===t?0:Math.pow(2,10*(t-1))},easeOutExpo:function(t){return 1===t?1:-Math.pow(2,-10*t)+1},easeInOutExpo:function(t){return 0===t?0:1===t?1:(t/=.5)<1?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return-(Math.sqrt(1-t*t)-1)},easeOutCirc:function(t){return Math.sqrt(1-Math.pow(t-1,2))},easeInOutCirc:function(t){return(t/=.5)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeOutBounce:function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},easeInBack:function(t){var n=1.70158;return t*t*((n+1)*t-n)},easeOutBack:function(t){var n=1.70158;return(t-=1)*t*((n+1)*t+n)+1},easeInOutBack:function(t){var n=1.70158;return(t/=.5)<1?.5*t*t*(((n*=1.525)+1)*t-n):.5*((t-=2)*t*(((n*=1.525)+1)*t+n)+2)},elastic:function(t){return-1*Math.pow(4,-8*t)*Math.sin(2*(6*t-1)*Math.PI/2)+1},swingFromTo:function(t){var n=1.70158;return(t/=.5)<1?.5*t*t*(((n*=1.525)+1)*t-n):.5*((t-=2)*t*(((n*=1.525)+1)*t+n)+2)},swingFrom:function(t){var n=1.70158;return t*t*((n+1)*t-n)},swingTo:function(t){var n=1.70158;return(t-=1)*t*((n+1)*t+n)+1},bounce:function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},bouncePast:function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?2-(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?2-(7.5625*(t-=2.25/2.75)*t+.9375):2-(7.5625*(t-=2.625/2.75)*t+.984375)},easeFromTo:function(t){return(t/=.5)<1?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},easeFrom:function(t){return Math.pow(t,4)},easeTo:function(t){return Math.pow(t,.25)}})}(),function(){function t(t,n,e,r,i,o){function u(t){return((l*t+w)*t+_)*t}function a(t){return((d*t+g)*t+m)*t}function s(t){return(3*l*t+2*w)*t+_}function f(t){return 1/(200*t)}function c(t,n){return a(p(t,n))}function h(t){return t>=0?t:0-t}function p(t,n){var e,r,i,o,a,f;for(i=t,f=0;8>f;f++){if(o=u(i)-t,h(o)<n)return i;if(a=s(i),h(a)<1e-6)break;i-=o/a}if(e=0,r=1,i=t,e>i)return e;if(i>r)return r;for(;r>e;){if(o=u(i),h(o-t)<n)return i;t>o?e=i:r=i,i=.5*(r-e)+e}return i}var l=0,w=0,_=0,d=0,g=0,m=0;return _=3*n,w=3*(r-n)-_,l=1-_-w,m=3*e,g=3*(i-e)-m,d=1-m-g,c(t,f(o))}/*!
     *  getCubicBezierTransition(x1, y1, x2, y2) -> Function
     *
     *  Generates a transition easing function that is compatible
     *  with WebKit's CSS transitions `-webkit-transition-timing-function`
     *  CSS property.
     *
     *  The W3C has more information about
     *  <a href="http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag">
     *  CSS3 transition timing functions</a>.
     *
     *  @param {number} x1
     *  @param {number} y1
     *  @param {number} x2
     *  @param {number} y2
     *  @return {function}
     */
function e(n,e,r,i){return function(o){return t(o,n,e,r,i,1)}}n.setBezierFunction=function(t,r,i,o,u){var a=e(r,i,o,u);return a.x1=r,a.y1=i,a.x2=o,a.y2=u,n.prototype.formula[t]=a},n.unsetBezierFunction=function(t){delete n.prototype.formula[t]}}(),function(){function t(t,e,r,i,o){return n.tweenProps(i,e,t,r,1,0,o)}var e=new n;e._filterArgs=[],n.interpolate=function(r,i,o,u){var a=n.shallowCopy({},r),s=n.composeEasingObject(r,u||"linear");e.set({});var f=e._filterArgs;f.length=0,f[0]=a,f[1]=r,f[2]=i,f[3]=s,n.applyFilter(e,"tweenCreated"),n.applyFilter(e,"beforeTween");var c=t(r,a,i,o,s);return n.applyFilter(e,"afterTween"),c}}(),function(t){/*!
     * @param {Array.number} rawValues
     * @param {string} prefix
     *
     * @return {Array.<string>}
     */
function n(t,n){S.length=0;var e,r=t.length;for(e=0;r>e;e++)S.push("_"+n+"_"+e);return S}/*!
     * @param {string} formattedString
     *
     * @return {string}
     */
function e(t){var n=t.match(v);return n?1===n.length&&n.unshift(""):n=["",""],n.join(F)}/*!
     * Convert all hex color values within a string to an rgb string.
     *
     * @param {Object} stateObject
     *
     * @return {Object} The modified obj
     */
function r(n){t.each(n,function(t){var e=n[t];"string"==typeof e&&e.match(T)&&(n[t]=i(e))})}/*!
     * @param {string} str
     *
     * @return {string}
     */
function i(t){return s(T,t,o)}/*!
     * @param {string} hexString
     *
     * @return {string}
     */
function o(t){var n=u(t);return"rgb("+n[0]+","+n[1]+","+n[2]+")"}/*!
     * Convert a hexadecimal string to an array with three items, one each for
     * the red, blue, and green decimal values.
     *
     * @param {string} hex A hexadecimal string.
     *
     * @returns {Array.<number>} The converted Array of RGB values if `hex` is a
     * valid string, or an Array of three 0's.
     */
function u(t){return t=t.replace(/#/,""),3===t.length&&(t=t.split(""),t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),b[0]=a(t.substr(0,2)),b[1]=a(t.substr(2,2)),b[2]=a(t.substr(4,2)),b}/*!
     * Convert a base-16 number to base-10.
     *
     * @param {Number|String} hex The value to convert
     *
     * @returns {Number} The base-10 equivalent of `hex`.
     */
function a(t){return parseInt(t,16)}/*!
     * Runs a filter operation on all chunks of a string that match a RegExp
     *
     * @param {RegExp} pattern
     * @param {string} unfilteredString
     * @param {function(string)} filter
     *
     * @return {string}
     */
function s(t,n,e){var r=n.match(t),i=n.replace(t,F);if(r)for(var o,u=r.length,a=0;u>a;a++)o=r.shift(),i=i.replace(F,e(o));return i}/*!
     * Check for floating point values within rgb strings and rounds them.
     *
     * @param {string} formattedString
     *
     * @return {string}
     */
function f(t){return s(O,t,c)}/*!
     * @param {string} rgbChunk
     *
     * @return {string}
     */
function c(t){for(var n=t.match(M),e=n.length,r=t.match(I)[0],i=0;e>i;i++)r+=parseInt(n[i],10)+",";return r=r.slice(0,-1)+")"}/*!
     * @param {Object} stateObject
     *
     * @return {Object} An Object of formatManifests that correspond to
     * the string properties of stateObject
     */
function h(r){var i={};return t.each(r,function(t){var o=r[t];if("string"==typeof o){var u=g(o);i[t]={formatString:e(o),chunkNames:n(u,t)}}}),i}/*!
     * @param {Object} stateObject
     * @param {Object} formatManifests
     */
function p(n,e){t.each(e,function(t){for(var r=n[t],i=g(r),o=i.length,u=0;o>u;u++)n[e[t].chunkNames[u]]=+i[u];delete n[t]})}/*!
     * @param {Object} stateObject
     * @param {Object} formatManifests
     */
function l(n,e){t.each(e,function(t){var r=n[t],i=w(n,e[t].chunkNames),o=_(i,e[t].chunkNames);r=d(e[t].formatString,o),n[t]=f(r)})}/*!
     * @param {Object} stateObject
     * @param {Array.<string>} chunkNames
     *
     * @return {Object} The extracted value chunks.
     */
function w(t,n){for(var e,r={},i=n.length,o=0;i>o;o++)e=n[o],r[e]=t[e],delete t[e];return r}/*!
     * @param {Object} stateObject
     * @param {Array.<string>} chunkNames
     *
     * @return {Array.<number>}
     */
function _(t,n){k.length=0;for(var e=n.length,r=0;e>r;r++)k.push(t[n[r]]);return k}/*!
     * @param {string} formatString
     * @param {Array.<number>} rawValues
     *
     * @return {string}
     */
function d(t,n){for(var e=t,r=n.length,i=0;r>i;i++)e=e.replace(F,+n[i].toFixed(4));return e}/*!
     * Note: It's the duty of the caller to convert the Array elements of the
     * return value into numbers.  This is a performance optimization.
     *
     * @param {string} formattedString
     *
     * @return {Array.<string>|null}
     */
function g(t){return t.match(M)}/*!
     * @param {Object} easingObject
     * @param {Object} tokenData
     */
function m(n,e){t.each(e,function(t){for(var r=e[t],i=r.chunkNames,o=i.length,u=n[t].split(" "),a=u[u.length-1],s=0;o>s;s++)n[i[s]]=u[s]||a;delete n[t]})}/*!
     * @param {Object} easingObject
     * @param {Object} tokenData
     */
function y(n,e){t.each(e,function(t){for(var r=e[t],i=r.chunkNames,o=i.length,u="",a=0;o>a;a++)u+=" "+n[i[a]],delete n[i[a]];n[t]=u.substr(1)})}/*!
     * @typedef {{
     *   formatString: string
     *   chunkNames: Array.<string>
     * }}
     */
var v=/([^\-0-9\.]+)/g,M=/[0-9.\-]+/g,O=new RegExp("rgb\\("+M.source+/,\s*/.source+M.source+/,\s*/.source+M.source+"\\)","g"),I=/^.*\(/,T=/#([0-9]|[a-f]){3,6}/gi,F="VAL",S=[],b=[],k=[];t.prototype.filter.token={tweenCreated:function(t,n,e){r(t),r(n),r(e),this._tokenData=h(t)},beforeTween:function(t,n,e,r){m(r,this._tokenData),p(t,this._tokenData),p(n,this._tokenData),p(e,this._tokenData)},afterTween:function(t,n,e,r){l(t,this._tokenData),l(n,this._tokenData),l(e,this._tokenData),y(r,this._tokenData)}}}(n)}(this);