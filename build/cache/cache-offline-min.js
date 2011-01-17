/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0
build: nightly
*/
YUI.add("cache-offline",function(E){function D(){D.superclass.constructor.apply(this,arguments);}var A=null,C=E.JSON;try{A=E.config.win.localStorage;}catch(B){}E.mix(D,{NAME:"cacheOffline",ATTRS:{sandbox:{value:"default",writeOnce:"initOnly"},expires:{value:86400000},max:{value:null,readOnly:true},uniqueKeys:{value:true,readOnly:true,setter:function(){return true;}}},flushAll:function(){var F=A,G;if(F){if(F.clear){F.clear();}else{for(G in F){if(F.hasOwnProperty(G)){F.removeItem(G);delete F[G];}}}}else{}}});E.extend(D,E.Cache,A?{_setMax:function(F){return null;},_getSize:function(){var H=0,G=0,F=A.length;for(;G<F;++G){if(A.key(G).indexOf(this.get("sandbox"))===0){H++;}}return H;},_getEntries:function(){var F=[],I=0,H=A.length,G=this.get("sandbox");for(;I<H;++I){if(A.key(I).indexOf(G)===0){F[I]=C.parse(A.key(I).substring(G.length));}}return F;},_defAddFn:function(K){var J=K.entry,I=J.request,H=J.cached,F=J.expires;J.cached=H.getTime();J.expires=F?F.getTime():F;try{A.setItem(this.get("sandbox")+C.stringify({"request":I}),C.stringify(J));}catch(G){this.fire("error",{error:G});}},_defFlushFn:function(H){var G,F=A.length-1;for(;F>-1;--F){G=A.key(F);if(G.indexOf(this.get("sandbox"))===0){A.removeItem(G);}}},retrieve:function(I){this.fire("request",{request:I});var H,F,G;try{G=this.get("sandbox")+C.stringify({"request":I});try{H=C.parse(A.getItem(G));}catch(K){}}catch(J){}if(H){H.cached=new Date(H.cached);F=H.expires;F=!F?null:new Date(F);H.expires=F;if(this._isMatch(I,H)){this.fire("retrieve",{entry:H});return H;}}return null;}}:{_setMax:function(F){return null;}});E.CacheOffline=D;},"3.3.0",{requires:["cache-base","json"]});