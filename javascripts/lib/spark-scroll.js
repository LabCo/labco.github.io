(function(){var n;angular.module("gilbox.sparkScroll",[]).factory("sparkAnimator",["$document",function(n){return{instance:function(){return Rekapi&&new Rekapi(n[0].body)}}}]).constant("sparkFormulas",{topTop:function(n,t,e,r,o){return~~(e.top-r.top+o)},topCenter:function(n,t,e,r,o){return~~(e.top-r.top-t.clientHeight/2+o)},topBottom:function(n,t,e,r,o){return~~(e.top-r.top-t.clientHeight+o)},centerTop:function(n,t,e,r,o){return~~(e.top+e.height/2-r.top+o)},centerCenter:function(n,t,e,r,o){return~~(e.top+e.height/2-r.top-t.clientHeight/2+o)},centerBottom:function(n,t,e,r,o){return~~(e.top+e.height/2-r.top-t.clientHeight+o)},bottomTop:function(n,t,e,r,o){return~~(e.bottom-r.top+o)},bottomBottom:function(n,t,e,r,o){return~~(e.bottom-r.top-t.clientHeight+o)},bottomCenter:function(n,t,e,r,o){return~~(e.bottom-r.top-t.clientHeight/2+o)}}).constant("sparkActionProps",{onDown:{down:function(n){return _.isString(n.val)?this.scope.$eval(n.val)(this,"onDown",n):n.val(this,"onDown",n)}},onUp:{up:function(n){return _.isString(n.val)?this.scope.$eval(n.val)(this,"onUp",n):n.val(this,"onUp",n)}},downAddClass:{down:function(n){return this.element.addClass(n.val)}},upAddClass:{up:function(n){return this.element.addClass(n.val)}},downRemoveClass:{down:function(n){return this.element.removeClass(n.val)}},upRemoveClass:{up:function(n){return this.element.removeClass(n.val)}},downBroadcast:{down:function(n){return this.scope.$broadcast(n.val,this)}},upBroadcast:{up:function(n){return this.scope.$broadcast(n.val,this)}},downEmit:{down:function(n){return this.scope.$emit(n.val,this)}},upEmit:{up:function(n){return this.scope.$emit(n.val,this)}}}).service("sparkSetup",["$interval","$rootScope",function(n,t){var e;return e=0,this.enableInvalidationInterval=function(r){return null==r&&(r=1e3),e&&n.cancel(e),e=n(function(){return t.$broadcast("sparkInvalidate")},r,0,!1)},this.disableInvalidationInterval=function(){return n.cancel(e)},this.disableSparkScrollAnimate=!1,this.disableSparkScroll=!1,this.debug=!1,this}]).service("sparkId",function(){return this.elements={},this.registerElement=function(n,t){return this.elements[n]=t},this}).directive("sparkId",["sparkId",function(n){return function(t,e,r){return n.registerElement(r.sparkId,e),t.$on("$destroy",function(){return delete n.elements[r.sparkId]})}}]),n=function(n,t,e,r,o,i,a){return function(s,l,u){var c,p,f,d,m,h,v,g,k,S,w,b,A,$,C,y,I,B,T,R,O,E,F,H,P,x,K,q,D,M,U;return b=u.hasOwnProperty("sparkScrollAnimate"),A=b,b&&a.disableSparkScrollAnimate||!b&&a.disableSparkScroll?void 0:(v=!1,R=0,C=0,$=0,h=b&&o.instance(),d=A&&h.addActor({context:l[0]}),U=0,O=0,H=0,m=AnimationFrame&&new AnimationFrame,D=!1,k=null,x=null,p=[],c=-1,g=document.documentElement,K=l,u.sparkTrigger&&(P=function(){return i.elements[u.sparkTrigger]?(K=i.elements[u.sparkTrigger],E?E():void 0):t(P,0,!1)})(),f=function(){var n,t,e,o,i,a,s,l,u,f,d,m,h,v,g;if(o=U-O,0>o&&c>=0)for(i=c>=p.length?c-1:c;i>=0&&U<p[i];){e=x[p[i]],m=e.actions;for(n in m)for(a=m[n],h=a.props,l=0,f=h.length;f>l;l++)s=h[l],t=r[s],t.up&&t.up.call(e,a);c=--i}if(o>=0&&c<p.length)for(i=0>c?0:c;i<p.length&&U>p[i];){e=x[p[i]],v=e.actions;for(n in v)for(a=v[n],g=a.props,u=0,d=g.length;d>u;u++)s=g[u],t=r[s],t.down&&t.down.call(e,a);c=++i}return O=U,D=!1},q=u.hasOwnProperty("sparkScrollEase")?function(){var n,t;return t=H-U,n=Math.abs(t),v&&w(),f(),1.5>n?(U=H,h.update(U)):(D=!0,U+=n>8?.25*t:t>0?1:-1,h.update(~~U),m.request(q))}:function(){return U=H,h.update(U),v&&w(),f()},u.hasOwnProperty("sparkScrollCallback")&&u.$observe("sparkScrollCallback",function(n){return v=s.$eval(n),_.isFunction(v)||(v=!1),$?void 0:F()}),F=function(){var n,t,e;n=0,e=[];for(t in x)t=~~t,e.push(n++?t>$?$=t:C>t?C=t:void 0:$=C=t);return e},w=function(){var n;return n=Math.max(0,Math.min(U/($-C),1)),n!==R&&v(n),R=n},E=function(){var n,t,e,r,o,i,a;if(x){n=!1,i=K[0].getBoundingClientRect(),t=g.getBoundingClientRect();for(a in x)e=x[a],e.formula&&(o=e.formula.fn(K,g,i,t,e.formula.offset),o!==~~a&&(n=!0,e.anims&&b&&d.moveKeyframe(~~a,o),x[o]=e,delete x[a]));if(n){v&&F(),p=[];for(a in x)r=x[a],r.actionCount&&p.push(~~a);return p.sort(function(n,t){return n>t}),B()}}else if(T(),x)return E()},T=function(){var t,o,i,c,m,h,S,w,$,C,y,I,B,T,R,E;if(k){b&&d.removeAllKeyframes(),h=k.ease||"linear",delete k.ease,o=0,x={},p=[],T=K[0].getBoundingClientRect(),c=g.getBoundingClientRect();for(R in k){if($=k[R],$=_.clone($),t=0,i=R.charCodeAt(0),(48>i||i>57)&&(B=R.match(/^(\w+)(.*)$/),S={fn:e[B[1]],offset:~~B[2]},R=S.fn(K,g,T,c,S.offset),x[R]))return a.debug&&console.log("warning: spark-scroll failed to calculate formulas",u.sparkScroll||u.sparkScrollAnimate),void(x=null);m={},C=h,null!=$.ease&&(angular.isObject($.ease)?m=$.ease:C=$.ease,delete $.ease);for(w in $)E=$[w],y=w.split(","),r[y[0]]?($.actions||($.actions={}),$.actions[w]={props:y,val:E},delete $[w],t++):($.anims||($.anims={}),angular.isArray(E)||(E=[E,C]),I={},I[w]=E[1],angular.extend(m,I),$.anims[w]=E[0],delete $[w]);$.anims&&b&&(d.keyframe(R,$.anims,m),o++),$.formula=S,$.element=l,$.scope=s,$.actionCount=t,x[R]=$,t&&p.push(~~R)}return A=b&&!!o,A&&d.finishedAddingKeyframes&&d.finishedAddingKeyframes(),p.sort(function(n,t){return n>t}),v&&F(),U=O=H=n.pageYOffset,A&&q(),f()}},M=s.$watch(u[b?"sparkScrollAnimate":"sparkScroll"],function(n){return n?(k=_.clone(n),null!=u.sparkScrollBindOnce&&M(),T()):void 0},!0),y=function(){return v&&w(),f()},B=function(){return H=n.pageYOffset,D?void 0:(D=!0,A?m.request(q):(U=H,m.request(y)))},S=function(n,t){var e,r;return r=0,e=function(){var e,o,i;return o=this,e=arguments,i=function(){return r=null,n.apply(o,e)},clearTimeout(r),r=setTimeout(i,t)},e.cancel=function(){return clearTimeout(r)},e},I=S(E,100),angular.element(n).on("scroll",B),angular.element(n).on("resize",I),s.$on("sparkInvalidate",I),s.$on("$destroy",function(){return A&&h.removeActor(d),angular.element(n).off("scroll",B),angular.element(n).off("resize",I),I.cancel()}))}},angular.module("gilbox.sparkScroll").directive("sparkScroll",["$window","$timeout","sparkFormulas","sparkActionProps","sparkAnimator","sparkId","sparkSetup",n]).directive("sparkScrollAnimate",["$window","$timeout","sparkFormulas","sparkActionProps","sparkAnimator","sparkId","sparkSetup",n])}).call(this);