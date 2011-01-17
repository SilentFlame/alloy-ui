/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0
build: nightly
*/
YUI.add("node-focusmanager",function(B){var J="activeDescendant",L="id",I="disabled",N="tabIndex",E="focused",A="focusClass",Q="circular",C="UI",F="key",G=J+"Change",O="host",P={37:true,38:true,39:true,40:true},M={"a":true,"button":true,"input":true,"object":true},H=B.Lang,K=B.UA,D=function(){D.superclass.constructor.apply(this,arguments);};D.ATTRS={focused:{value:false,readOnly:true},descendants:{getter:function(R){return this.get(O).all(R);}},activeDescendant:{setter:function(V){var T=H.isNumber,S=B.Attribute.INVALID_VALUE,R=this._descendantsMap,Y=this._descendants,X,U,W;if(T(V)){X=V;U=X;}else{if((V instanceof B.Node)&&R){X=R[V.get(L)];if(T(X)){U=X;}else{U=S;}}else{U=S;}}if(Y){W=Y.item(X);if(W&&W.get("disabled")){U=S;}}return U;}},keys:{value:{next:null,previous:null}},focusClass:{},circular:{value:true}};B.extend(D,B.Plugin.Base,{_stopped:true,_descendants:null,_descendantsMap:null,_focusedNode:null,_lastNodeIndex:0,_eventHandlers:null,_initDescendants:function(){var Y=this.get("descendants"),R={},W=-1,V,U=this.get(J),X,S,T=0;if(H.isUndefined(U)){U=-1;}if(Y){V=Y.size();for(T=0;T<V;T++){X=Y.item(T);if(W===-1&&!X.get(I)){W=T;}if(U<0&&parseInt(X.getAttribute(N,2),10)===0){U=T;}if(X){X.set(N,-1);}S=X.get(L);if(!S){S=B.guid();X.set(L,S);}R[S]=T;}if(U<0){U=0;}X=Y.item(U);if(!X||X.get(I)){X=Y.item(W);U=W;}this._lastNodeIndex=V-1;this._descendants=Y;this._descendantsMap=R;this.set(J,U);if(X){X.set(N,0);}}},_isDescendant:function(R){return(R.get(L) in this._descendantsMap);},_removeFocusClass:function(){var S=this._focusedNode,T=this.get(A),R;if(T){R=H.isString(T)?T:T.className;}if(S&&R){S.removeClass(R);}},_detachKeyHandler:function(){var S=this._prevKeyHandler,R=this._nextKeyHandler;if(S){S.detach();}if(R){R.detach();}},_preventScroll:function(R){if(P[R.keyCode]&&this._isDescendant(R.target)){R.preventDefault();}},_fireClick:function(S){var R=S.target,T=R.get("nodeName").toLowerCase();if(S.keyCode===13&&(!M[T]||(T==="a"&&!R.getAttribute("href")))){R.simulate("click");}},_attachKeyHandler:function(){this._detachKeyHandler();var U=this.get("keys.next"),S=this.get("keys.previous"),T=this.get(O),R=this._eventHandlers;if(S){this._prevKeyHandler=B.on(F,B.bind(this._focusPrevious,this),T,S);}if(U){this._nextKeyHandler=B.on(F,B.bind(this._focusNext,this),T,U);}if(K.opera){R.push(T.on("keypress",this._preventScroll,this));}if(!K.opera){R.push(T.on("keypress",this._fireClick,this));}},_detachEventHandlers:function(){this._detachKeyHandler();var R=this._eventHandlers;if(R){B.Array.each(R,function(S){S.detach();});this._eventHandlers=null;}},_attachEventHandlers:function(){var U=this._descendants,R,S,T;if(U&&U.size()){R=this._eventHandlers||[];S=this.get(O).get("ownerDocument");if(R.length===0){R.push(S.on("focus",this._onDocFocus,this));R.push(S.on("mousedown",this._onDocMouseDown,this));R.push(this.after("keysChange",this._attachKeyHandler));R.push(this.after("descendantsChange",this._initDescendants));R.push(this.after(G,this._afterActiveDescendantChange));T=this.after("focusedChange",B.bind(function(V){if(V.newVal){this._attachKeyHandler();T.detach();}},this));R.push(T);}this._eventHandlers=R;}},_onDocMouseDown:function(U){var W=this.get(O),R=U.target,V=W.contains(R),T,S=function(Y){var X=false;if(!Y.compareTo(W)){X=this._isDescendant(Y)?Y:S.call(this,Y.get("parentNode"));}return X;};if(V){T=S.call(this,R);if(T){R=T;}else{if(!T&&this.get(E)){this._set(E,false);this._onDocFocus(U);}}}if(V&&this._isDescendant(R)){this.focus(R);}else{if(K.webkit&&this.get(E)&&(!V||(V&&!this._isDescendant(R)))){this._set(E,false);this._onDocFocus(U);}}},_onDocFocus:function(W){var U=this._focusTarget||W.target,S=this.get(E),V=this.get(A),T=this._focusedNode,R;if(this._focusTarget){this._focusTarget=null;}if(this.get(O).contains(U)){R=this._isDescendant(U);if(!S&&R){S=true;}else{if(S&&!R){S=false;}}}else{S=false;}if(V){if(T&&(!T.compareTo(U)||!S)){this._removeFocusClass();}if(R&&S){if(V.fn){U=V.fn(U);U.addClass(V.className);}else{U.addClass(V);}this._focusedNode=U;}}this._set(E,S);},_focusNext:function(S,T){var R=T||this.get(J),U;if(this._isDescendant(S.target)&&(R<=this._lastNodeIndex)){R=R+1;if(R===(this._lastNodeIndex+1)&&this.get(Q)){R=0;}U=this._descendants.item(R);if(U){if(U.get("disabled")){this._focusNext(S,R);}else{this.focus(R);}}}this._preventScroll(S);},_focusPrevious:function(S,T){var R=T||this.get(J),U;if(this._isDescendant(S.target)&&R>=0){R=R-1;if(R===-1&&this.get(Q)){R=this._lastNodeIndex;}U=this._descendants.item(R);if(U){if(U.get("disabled")){this._focusPrevious(S,R);}else{this.focus(R);}}}this._preventScroll(S);},_afterActiveDescendantChange:function(R){var S=this._descendants.item(R.prevVal);if(S){S.set(N,-1);}S=this._descendants.item(R.newVal);if(S){S.set(N,0);}},initializer:function(R){this.start();},destructor:function(){this.stop();this.get(O).focusManager=null;},focus:function(R){if(H.isUndefined(R)){R=this.get(J);}this.set(J,R,{src:C});var S=this._descendants.item(this.get(J));if(S){S.focus();if(K.opera&&S.get("nodeName").toLowerCase()==="button"){this._focusTarget=S;}}},blur:function(){var R;if(this.get(E)){R=this._descendants.item(this.get(J));if(R){R.blur();this._removeFocusClass();}this._set(E,false,{src:C});}},start:function(){if(this._stopped){this._initDescendants();this._attachEventHandlers();this._stopped=false;}},stop:function(){if(!this._stopped){this._detachEventHandlers();this._descendants=null;this._focusedNode=null;this._lastNodeIndex=0;this._stopped=true;}},refresh:function(){this._initDescendants();if(!this._eventHandlers){this._attachEventHandlers();}}});D.NAME="nodeFocusManager";D.NS="focusManager";B.namespace("Plugin");B.Plugin.NodeFocusManager=D;},"3.3.0",{requires:["attribute","node","plugin","node-event-simulate","event-key","event-focus"]});