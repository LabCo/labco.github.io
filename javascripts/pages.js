var Lab;!function(e){function t(e){return{scope:{name:"@"},transclude:!0,template:"<div class='page' ng-show='visible' ng-class='{visible:visible}' ng-transclude></div>",restrict:"EA",replace:!0,require:"^pages",link:function(t,i,n,s){t.visible=!1,t.show=function(){e.hash();t.visible=!0},t.hide=function(){t.visible=!1},s.addPage(t)}}}function i(){return{scope:{},template:"<div class='page-next' ng-transclude ng-click='next()'></div>",transclude:!0,restrict:"EA",replace:!0,require:"^pages",link:function(e,t,i,n){e.next=function(){n.next()}}}}function n(e,t){var i=this;return{scope:!0,restrict:"EA",controller:"PagesController",link:function(n,s,o,l){function c(e){return null==d&&t(e.detail<0||e.deltaY>0?function(){l.prev()}:function(){l.next()}),t.cancel(d),d=t(function(){d=null},400),!1}function a(e){null==g&&(e.originalEvent.touches&&(e=e.originalEvent.touches[0]),console.log("start"),u=0,g=e.clientY)}function r(e){return null!=g?(e.originalEvent.touches&&(e=e.originalEvent.touches[0]),u=g-e.clientY,Math.abs(u)>2*p&&h(),!1):void 0}function h(){null!=g&&(g=null,console.log("end delta: "+u),u>p?t(function(){l.next()}):-p>u&&t(function(){l.prev()}))}angular.element(e).on("keydown",function(e){38==e.keyCode||32==e.keyCode&&e.shiftKey||33==e.keyCode?t(function(){l.prev()}):(40==e.keyCode||32==e.keyCode||34==e.keyCode)&&t(function(){l.next()})});var d=(angular.element(i.$window),null),u=0,p=10,g=null;window.addEventListener("mousewheel",c,!1),window.addEventListener("DOMMouseScroll",c,!1),s.on("touchstart",a),s.on("touchmove",r),s.on("touchend",h),n.$on("$destroy",function(){window.removeEventListener("mousewheel",c,!1),window.removeEventListener("DOMMouseScroll",c,!1),s.off("touchstart",a),s.off("touchmove",r),s.off("touchend",h),angular.element(e).off("keydown")})}}}function s(){return{scope:{},restrict:"EA",template:"<div class='page-control'><div class='page-indicator' name='{{indicator}}' ng-repeat='indicator in indicators' ng-click='clickIndicator($index)' ng-class='{selected:selected == $index}'></div></div>",replace:!0,require:"^pages",link:function(e,t,i,n){n.addPageControl(e),e.indicators=[],e.selected=0,e.addIndicator=function(t){e.indicators.push(t)},e.clickIndicator=function(t){e.selected=t,n.select(t)},e.selectIndicator=function(t){e.selected=t}}}}e.SHOWN_CLASS="shownPage";var o=function(){function e(e){this.$location=e,this.selected=0,this.items=[],this.mappings={}}return e.prototype.addPage=function(e){var t=this.items.push(e);this.mappings[t-1]=e.name,this.pageControl&&this.pageControl.addIndicator(e.name);var i=this.$location.hash();i==e.name?(this.selected=t-1,this.items.length>0&&this.items[0].hide(),this.pageControl&&this.pageControl.selectIndicator(this.selected),e.show()):1==this.items.length&&(e.show(),this.pageControl&&this.pageControl.selectIndicator(this.selected))},e.prototype.addPageControl=function(e){this.pageControl=e},e.prototype.next=function(){this.selected+1<this.items.length&&(null!=this.items[this.selected].hide&&this.items[this.selected].hide(),null!=this.items[this.selected+1].show&&this.items[this.selected+1].show(),this.selected+=1,this.rehash())},e.prototype.prev=function(){this.selected-1>=0&&(null!=this.items[this.selected].hide&&this.items[this.selected].hide(),null!=this.items[this.selected-1].show&&this.items[this.selected-1].show(),this.selected-=1,this.rehash())},e.prototype.select=function(e){e<this.items.length&&e>=0&&(null!=this.items[this.selected].hide&&this.items[this.selected].hide(),null!=this.items[e].show&&this.items[e].show(),this.selected=e,this.rehash())},e.prototype.rehash=function(){var e=this.mappings[this.selected];this.$location.hash(e),this.pageControl&&this.pageControl.selectIndicator(this.selected)},e}();e.PagesController=o,e.page=t,e.pageNext=i,e.pages=n,e.pageControl=s}(Lab||(Lab={})),angular.module("pages",[]).controller("PagesController",["$location",Lab.PagesController]).directive("pages",["$window","$timeout",Lab.pages]).directive("page",["$location",Lab.page]).directive("pageNext",["$timeout",Lab.pageNext]).directive("pageControl",[Lab.pageControl]);