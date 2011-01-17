/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0
build: nightly
*/
YUI.add("widget-base",function(b){var g=b.Lang,r=b.Node,e=b.ClassNameManager,w=e.getClassName,M,s=b.cached(function(L){return L.substring(0,1).toUpperCase()+L.substring(1);}),F="content",P="visible",K="hidden",y="disabled",B="focused",d="width",A="height",N="boundingBox",v="contentBox",k="parentNode",m="ownerDocument",x="auto",j="srcNode",I="body",H="tabIndex",q="id",i="render",J="rendered",n="destroyed",a="strings",o="<div></div>",z="Change",p="loading",E="_uiSet",D="",G=function(){},u=true,O=false,t,l={},f=[P,y,A,d,B],C=b.UA.webkit,h={};function c(Q){var T=this,L,S,R=T.constructor;T._strs={};T._cssPrefix=R.CSS_PREFIX||w(R.NAME.toLowerCase());c.superclass.constructor.apply(T,arguments);S=T.get(i);if(S){if(S!==u){L=S;}T.render(L);}}c.NAME="widget";t=c.UI_SRC="ui";c.ATTRS=l;l[q]={valueFn:"_guid",writeOnce:u};l[J]={value:O,readOnly:u};l[N]={value:null,setter:"_setBB",writeOnce:u};l[v]={valueFn:"_defaultCB",setter:"_setCB",writeOnce:u};l[H]={value:null,validator:"_validTabIndex"};l[B]={value:O,readOnly:u};l[y]={value:O};l[P]={value:u};l[A]={value:D};l[d]={value:D};l[a]={value:{},setter:"_strSetter",getter:"_strGetter"};l[i]={value:O,writeOnce:u};c.CSS_PREFIX=w(c.NAME.toLowerCase());c.getClassName=function(){return w.apply(e,[c.CSS_PREFIX].concat(b.Array(arguments),true));};M=c.getClassName;c.getByNode=function(L){var R,Q=M();L=r.one(L);if(L){L=L.ancestor("."+Q,true);if(L){R=h[b.stamp(L,u)];}}return R||null;};b.extend(c,b.Base,{getClassName:function(){return w.apply(e,[this._cssPrefix].concat(b.Array(arguments),true));},initializer:function(L){h[b.stamp(this.get(N))]=this;if(this._applyParser){this._applyParser(L);}},destructor:function(){var Q=this.get(N),L=this.get(v),R=b.stamp(Q,u);if(R in h){delete h[R];}if(this.UI_EVENTS){this._destroyUIEvents();}this._unbindUI(Q);if(L){L.remove(u);}Q.remove(u);},render:function(L){if(!this.get(n)&&!this.get(J)){this.publish(i,{queuable:O,fireOnce:u,defaultTargetOnly:u,defaultFn:this._defRenderFn});this.fire(i,{parentNode:(L)?r.one(L):null});}return this;},_defRenderFn:function(L){this._parentNode=L.parentNode;this.renderer();this._set(J,u);this._removeLoadingClassNames();},renderer:function(){var L=this;L._renderUI();L.renderUI();L._bindUI();L.bindUI();L._syncUI();L.syncUI();},bindUI:G,renderUI:G,syncUI:G,hide:function(){return this.set(P,O);},show:function(){return this.set(P,u);},focus:function(){return this._set(B,u);},blur:function(){return this._set(B,O);},enable:function(){return this.set(y,O);},disable:function(){return this.set(y,u);},_uiSizeCB:function(L){this.get(v).toggleClass(M(F,"expanded"),L);},_renderBox:function(L){var T=this,Q=T.get(v),R=T.get(N),V=T.get(j),S=T.DEF_PARENT_NODE,U=(V&&V.get(m))||R.get(m)||Q.get(m);if(V&&!V.compareTo(Q)&&!Q.inDoc(U)){V.replace(Q);}if(!R.compareTo(Q.get(k))&&!R.compareTo(Q)){if(Q.inDoc(U)){Q.replace(R);}R.appendChild(Q);}L=L||(S&&r.one(S));if(L){L.appendChild(R);}else{if(!R.inDoc(U)){r.one(I).insert(R,0);}}},_setBB:function(L){return this._setBox(this.get(q),L,this.BOUNDING_TEMPLATE);},_setCB:function(L){return(this.CONTENT_TEMPLATE===null)?this.get(N):this._setBox(null,L,this.CONTENT_TEMPLATE);},_defaultCB:function(L){return this.get(j)||null;},_setBox:function(R,Q,L){Q=r.one(Q)||r.create(L);if(!Q.get(q)){Q.set(q,R||b.guid());}return Q;},_renderUI:function(){this._renderBoxClassNames();this._renderBox(this._parentNode);},_renderBoxClassNames:function(){var S=this._getClasses(),L,Q=this.get(N),R;Q.addClass(M());for(R=S.length-3;R>=0;R--){L=S[R];Q.addClass(L.CSS_PREFIX||w(L.NAME.toLowerCase()));}this.get(v).addClass(this.getClassName(F));},_removeLoadingClassNames:function(){var R=this.get(N),L=this.get(v),Q=this.getClassName(p),S=M(p);R.removeClass(S).removeClass(Q);L.removeClass(S).removeClass(Q);},_bindUI:function(){this._bindAttrUI(this._UI_ATTRS.BIND);this._bindDOM();},_unbindUI:function(L){this._unbindDOM(L);},_bindDOM:function(){var L=this.get(N).get(m);this._hDocFocus=L.on("focus",this._onDocFocus,this);if(C){this._hDocMouseDown=L.on("mousedown",this._onDocMouseDown,this);}},_unbindDOM:function(L){if(this._hDocFocus){this._hDocFocus.detach();}if(C&&this._hDocMouseDown){this._hDocMouseDown.detach();}},_syncUI:function(){this._syncAttrUI(this._UI_ATTRS.SYNC);},_uiSetHeight:function(L){this._uiSetDim(A,L);this._uiSizeCB((L!==D&&L!==x));},_uiSetWidth:function(L){this._uiSetDim(d,L);},_uiSetDim:function(L,Q){this.get(N).setStyle(L,g.isNumber(Q)?Q+this.DEF_UNIT:Q);},_uiSetVisible:function(L){this.get(N).toggleClass(this.getClassName(K),!L);},_uiSetDisabled:function(L){this.get(N).toggleClass(this.getClassName(y),L);},_uiSetFocused:function(R,Q){var L=this.get(N);L.toggleClass(this.getClassName(B),R);if(Q!==t){if(R){L.focus();}else{L.blur();}}},_uiSetTabIndex:function(Q){var L=this.get(N);if(g.isNumber(Q)){L.set(H,Q);}else{L.removeAttribute(H);}},_onDocMouseDown:function(L){if(this._domFocus){this._onDocFocus(L);}},_onDocFocus:function(L){this._domFocus=this.get(N).contains(L.target);this._set(B,this._domFocus,{src:t});},toString:function(){return this.name+"["+this.get(q)+"]";},DEF_UNIT:"px",DEF_PARENT_NODE:null,CONTENT_TEMPLATE:o,BOUNDING_TEMPLATE:o,_guid:function(){return b.guid();},_validTabIndex:function(L){return(g.isNumber(L)||g.isNull(L));},_bindAttrUI:function(Q){var R,L=Q.length;for(R=0;R<L;R++){this.after(Q[R]+z,this._setAttrUI);}},_syncAttrUI:function(R){var S,Q=R.length,L;for(S=0;S<Q;S++){L=R[S];this[E+s(L)](this.get(L));}},_setAttrUI:function(L){this[E+s(L.attrName)](L.newVal,L.src);},_strSetter:function(L){return b.merge(this.get(a),L);},getString:function(L){return this.get(a)[L];},getStrings:function(){return this.get(a);},_UI_ATTRS:{BIND:f,SYNC:f.concat(H)}});b.Widget=c;},"3.3.0",{requires:["attribute","event-focus","base-base","base-pluginhost","node-base","node-style","node-event-delegate","classnamemanager"]});YUI.add("widget-uievents",function(g){var f="boundingBox",e=g.Widget,d="render",a=g.Lang,c=":",b=g.Widget._uievts=g.Widget._uievts||{};g.mix(e.prototype,{_destroyUIEvents:function(){var h=g.stamp(this,true);
g.each(b,function(j,i){if(j.instances[h]){delete j.instances[h];if(g.Object.isEmpty(j.instances)){j.handle.detach();if(b[i]){delete b[i];}}}});},UI_EVENTS:g.Node.DOM_EVENTS,_getUIEventNode:function(){return this.get(f);},_createUIEvent:function(i){var l=this._getUIEventNode(),h=(g.stamp(l)+i),k=b[h],j;if(!k){j=l.delegate(i,function(m){var n=e.getByNode(this);n.fire(m.type,{domEvent:m});},"."+g.Widget.getClassName());b[h]=k={instances:{},handle:j};}k.instances[g.stamp(this)]=1;},_getUIEvent:function(j){if(a.isString(j)){var k=this.parseType(j)[1],h,i;if(k){h=k.indexOf(c);if(h>-1){k=k.substring(h+c.length);}if(this.UI_EVENTS[k]){i=k;}}return i;}},_initUIEvent:function(i){var j=this._getUIEvent(i),h=this._uiEvtsInitQueue||{};if(j&&!h[j]){this._uiEvtsInitQueue=h[j]=1;this.after(d,function(){this._createUIEvent(j);delete this._uiEvtsInitQueue[j];});}},on:function(h){this._initUIEvent(h);return e.superclass.on.apply(this,arguments);},publish:function(i,h){var j=this._getUIEvent(i);if(j&&h&&h.defaultFn){this._initUIEvent(j);}return e.superclass.publish.apply(this,arguments);}},true);},"3.3.0",{requires:["widget-base","node-event-delegate"]});YUI.add("widget-htmlparser",function(f){var e=f.Widget,c=f.Node,d=f.Lang,a="srcNode",b="contentBox";e.HTML_PARSER={};e._buildCfg={aggregates:["HTML_PARSER"]};e.ATTRS[a]={value:null,setter:c.one,getter:"_getSrcNode",writeOnce:true};f.mix(e.prototype,{_getSrcNode:function(g){return g||this.get(b);},_applyParsedConfig:function(i,g,h){return(h)?f.mix(g,h,false):g;},_applyParser:function(g){var i=this,j=i.get(a),h=i._getHtmlParser(),l,k;if(h&&j){f.Object.each(h,function(n,m,p){k=null;if(d.isFunction(n)){k=n.call(i,j);}else{if(d.isArray(n)){k=j.all(n[0]);if(k.isEmpty()){k=null;}}else{k=j.one(n);}}if(k!==null&&k!==undefined){l=l||{};l[m]=k;}});}g=i._applyParsedConfig(j,g,l);},_getHtmlParser:function(){var h=this._getClasses(),k={},g,j;for(g=h.length-1;g>=0;g--){j=h[g].HTML_PARSER;if(j){f.mix(k,j,true);}}return k;}});},"3.3.0",{requires:["widget-base"]});YUI.add("widget-skin",function(e){var d="boundingBox",b="contentBox",a="skin",c=e.ClassNameManager.getClassName;e.Widget.prototype.getSkinName=function(){var f=this.get(b)||this.get(d),h=new RegExp("\\b"+c(a)+"-(\\S+)"),g;if(f){f.ancestor(function(i){g=i.get("className").match(h);return g;});}return(g)?g[1]:null;};},"3.3.0",{requires:["widget-base"]});YUI.add("widget",function(a){},"3.3.0",{use:["widget-base","widget-uievents","widget-htmlparser","widget-skin"]});