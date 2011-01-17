/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.3.0
build: nightly
*/
YUI.add("resize-base",function(t){var v=t.Lang,C=v.isArray,AT=v.isBoolean,p=v.isNumber,AY=v.isString,AE=t.Array,AP=v.trim,M=AE.indexOf,V=",",AC=".",S="",l="{handle}",U=" ",Q="active",o="activeHandle",f="activeHandleNode",Z="all",AI="autoHide",AR="border",AN="bottom",AJ="className",AM="color",AX="defMinHeight",Ac="defMinWidth",a="handle",n="handles",AA="hidden",X="inner",A="left",m="margin",P="node",d="nodeName",u="none",h="offsetHeight",AW="offsetWidth",y="padding",E="parentNode",N="position",K="relative",AH="resize",O="resizing",H="right",Ad="static",G="style",J="top",j="width",AK="wrap",AZ="wrapper",AF="wrapTypes",i="resize:mouseUp",W="resize:resize",b="resize:align",k="resize:end",s="resize:start",w="t",Ab="tr",x="r",AS="br",AG="b",AU="bl",AD="l",Ae="tl",Aa=function(){return Array.prototype.slice.call(arguments).join(U);},AO=function(B){return Math.round(parseFloat(B))||0;},AB=function(B,L){return B.getComputedStyle(L);},Af=function(B){return a+B.toUpperCase();},q=function(B){return(B instanceof t.Node);},r=t.cached(function(B){return B.substring(0,1).toUpperCase()+B.substring(1);}),e=t.cached(function(){var L=[],B=AE(arguments,0,true);AE.each(B,function(R,T){if(T>0){R=r(R);}L.push(R);});return L.join(S);}),c=t.ClassNameManager.getClassName,AQ=c(AH),AL=c(AH,a),z=c(AH,a,Q),F=c(AH,a,X),g=c(AH,a,X,l),Ag=c(AH,a,l),D=c(AH,AA,n),AV=c(AH,AZ);function I(){I.superclass.constructor.apply(this,arguments);}t.mix(I,{NAME:AH,ATTRS:{activeHandle:{value:null,validator:function(B){return t.Lang.isString(B)||t.Lang.isNull(B);}},activeHandleNode:{value:null,validator:q},autoHide:{value:false,validator:AT},defMinHeight:{value:15,validator:p},defMinWidth:{value:15,validator:p},handles:{setter:"_setHandles",value:Z},node:{setter:t.one},resizing:{value:false,validator:AT},wrap:{setter:"_setWrap",value:false,validator:AT},wrapTypes:{readOnly:true,value:/^canvas|textarea|input|select|button|img|iframe|table|embed$/i},wrapper:{readOnly:true,valueFn:"_valueWrapper",writeOnce:true}},RULES:{b:function(B,R,L){var Y=B.info,T=B.originalInfo;Y.offsetHeight=T.offsetHeight+L;},l:function(B,R,L){var Y=B.info,T=B.originalInfo;Y.left=T.left+R;Y.offsetWidth=T.offsetWidth-R;},r:function(B,R,L){var Y=B.info,T=B.originalInfo;Y.offsetWidth=T.offsetWidth+R;},t:function(B,R,L){var Y=B.info,T=B.originalInfo;Y.top=T.top+L;Y.offsetHeight=T.offsetHeight-L;},tr:function(B,R,L){this.t.apply(this,arguments);this.r.apply(this,arguments);},bl:function(B,R,L){this.b.apply(this,arguments);this.l.apply(this,arguments);},br:function(B,R,L){this.b.apply(this,arguments);this.r.apply(this,arguments);},tl:function(B,R,L){this.t.apply(this,arguments);this.l.apply(this,arguments);}},capitalize:e});t.Resize=t.extend(I,t.Base,{ALL_HANDLES:[w,Ab,x,AS,AG,AU,AD,Ae],REGEX_CHANGE_HEIGHT:/^(t|tr|b|bl|br|tl)$/i,REGEX_CHANGE_LEFT:/^(tl|l|bl)$/i,REGEX_CHANGE_TOP:/^(tl|t|tr)$/i,REGEX_CHANGE_WIDTH:/^(bl|br|l|r|tl|tr)$/i,WRAP_TEMPLATE:'<div class="'+AV+'"></div>',HANDLE_TEMPLATE:'<div class="'+Aa(AL,Ag)+'">'+'<div class="'+Aa(F,g)+'">&nbsp;</div>'+"</div>",totalHSurrounding:0,totalVSurrounding:0,nodeSurrounding:null,wrapperSurrounding:null,changeHeightHandles:false,changeLeftHandles:false,changeTopHandles:false,changeWidthHandles:false,delegate:null,info:null,lastInfo:null,originalInfo:null,initializer:function(){this.renderer();},renderUI:function(){var B=this;B._renderHandles();},bindUI:function(){var B=this;B._createEvents();B._bindDD();B._bindHandle();},syncUI:function(){var B=this;this.get(P).addClass(AQ);B._setHideHandlesUI(B.get(AI));},destructor:function(){var B=this,R=B.get(P),T=B.get(AZ),L=T.get(E);t.Event.purgeElement(T,true);B.eachHandle(function(Y){B.delegate.dd.destroy();Y.remove(true);});if(B.get(AK)){B._copyStyles(T,R);if(L){L.insertBefore(R,T);}T.remove(true);}R.removeClass(AQ);R.removeClass(D);},renderer:function(){this.renderUI();this.bindUI();this.syncUI();},eachHandle:function(L){var B=this;t.each(B.get(n),function(Y,R){var T=B.get(Af(Y));L.apply(B,[T,Y,R]);});},_bindDD:function(){var B=this;B.delegate=new t.DD.Delegate({bubbleTargets:B,container:B.get(AZ),dragConfig:{clickPixelThresh:0,clickTimeThresh:0,useShim:true,move:false},nodes:AC+AL,target:false});B.on("drag:drag",B._handleResizeEvent);B.on("drag:dropmiss",B._handleMouseUpEvent);B.on("drag:end",B._handleResizeEndEvent);B.on("drag:start",B._handleResizeStartEvent);},_bindHandle:function(){var B=this,L=B.get(AZ);L.on("mouseenter",t.bind(B._onWrapperMouseEnter,B));L.on("mouseleave",t.bind(B._onWrapperMouseLeave,B));L.delegate("mouseenter",t.bind(B._onHandleMouseEnter,B),AC+AL);L.delegate("mouseleave",t.bind(B._onHandleMouseLeave,B),AC+AL);},_createEvents:function(){var B=this,L=function(R,T){B.publish(R,{defaultFn:T,queuable:false,emitFacade:true,bubbles:true,prefix:AH});};L(s,this._defResizeStartFn);L(W,this._defResizeFn);L(b,this._defResizeAlignFn);L(k,this._defResizeEndFn);L(i,this._defMouseUpFn);},_renderHandles:function(){var B=this,L=B.get(AZ);B.eachHandle(function(R){L.append(R);});},_buildHandle:function(L){var B=this;return t.Node.create(t.substitute(B.HANDLE_TEMPLATE,{handle:L}));},_calcResize:function(){var B=this,T=B.handle,Ah=B.info,Y=B.originalInfo,R=Ah.actXY[0]-Y.actXY[0],L=Ah.actXY[1]-Y.actXY[1];if(T&&t.Resize.RULES[T]){t.Resize.RULES[T](B,R,L);}else{}},_checkSize:function(Ah,L){var B=this,Y=B.info,T=B.originalInfo,R=(Ah==h)?J:A;Y[Ah]=L;if(((R==A)&&B.changeLeftHandles)||((R==J)&&B.changeTopHandles)){Y[R]=T[R]+T[Ah]-L;}},_copyStyles:function(R,Y){var B=R.getStyle(N).toLowerCase(),T=this._getBoxSurroundingInfo(R),L;if(B==Ad){B=K;}L={position:B,left:AB(R,A),top:AB(R,J)};t.mix(L,T.margin);t.mix(L,T.border);Y.setStyles(L);R.setStyles({border:0,margin:0});Y.sizeTo(R.get(AW)+T.totalHBorder,R.get(h)+T.totalVBorder);},_extractHandleName:t.cached(function(R){var L=R.get(AJ),B=L.match(new RegExp(c(AH,a,"(\\w{1,2})\\b")));return B?B[1]:null;}),_getInfo:function(Y,B){var Ah=[0,0],Aj=B.dragEvent.target,Ai=Y.getXY(),T=Ai[0],R=Ai[1],L=Y.get(h),Ak=Y.get(AW);if(B){Ah=(Aj.actXY.length?Aj.actXY:Aj.lastXY);
}return{actXY:Ah,bottom:(R+L),left:T,offsetHeight:L,offsetWidth:Ak,right:(T+Ak),top:R};},_getBoxSurroundingInfo:function(B){var L={padding:{},margin:{},border:{}};if(q(B)){t.each([J,H,AN,A],function(Ah){var T=e(y,Ah),Y=e(m,Ah),R=e(AR,Ah,j),Ai=e(AR,Ah,AM),Aj=e(AR,Ah,G);L.border[Ai]=AB(B,Ai);L.border[Aj]=AB(B,Aj);L.border[R]=AB(B,R);L.margin[Y]=AB(B,Y);L.padding[T]=AB(B,T);});}L.totalHBorder=(AO(L.border.borderLeftWidth)+AO(L.border.borderRightWidth));L.totalHPadding=(AO(L.padding.paddingLeft)+AO(L.padding.paddingRight));L.totalVBorder=(AO(L.border.borderBottomWidth)+AO(L.border.borderTopWidth));L.totalVPadding=(AO(L.padding.paddingBottom)+AO(L.padding.paddingTop));return L;},_syncUI:function(){var B=this,T=B.info,R=B.wrapperSurrounding,Y=B.get(AZ),L=B.get(P);Y.sizeTo(T.offsetWidth,T.offsetHeight);if(B.changeLeftHandles||B.changeTopHandles){Y.setXY([T.left,T.top]);}if(!Y.compareTo(L)){L.sizeTo(T.offsetWidth-R.totalHBorder,T.offsetHeight-R.totalVBorder);}if(t.UA.webkit){L.setStyle(AH,u);}},_updateChangeHandleInfo:function(L){var B=this;B.changeHeightHandles=B.REGEX_CHANGE_HEIGHT.test(L);B.changeLeftHandles=B.REGEX_CHANGE_LEFT.test(L);B.changeTopHandles=B.REGEX_CHANGE_TOP.test(L);B.changeWidthHandles=B.REGEX_CHANGE_WIDTH.test(L);},_updateInfo:function(L){var B=this;B.info=B._getInfo(B.get(AZ),L);},_updateSurroundingInfo:function(){var B=this,T=B.get(P),Y=B.get(AZ),L=B._getBoxSurroundingInfo(T),R=B._getBoxSurroundingInfo(Y);B.nodeSurrounding=L;B.wrapperSurrounding=R;B.totalVSurrounding=(L.totalVPadding+R.totalVBorder);B.totalHSurrounding=(L.totalHPadding+R.totalHBorder);},_setActiveHandlesUI:function(R){var B=this,L=B.get(f);if(L){if(R){B.eachHandle(function(T){T.removeClass(z);});L.addClass(z);}else{L.removeClass(z);}}},_setHandles:function(R){var B=this,L=[];if(C(R)){L=R;}else{if(AY(R)){if(R.toLowerCase()==Z){L=B.ALL_HANDLES;}else{t.each(R.split(V),function(Y,T){var Ah=AP(Y);if(M(B.ALL_HANDLES,Ah)>-1){L.push(Ah);}});}}}return L;},_setHideHandlesUI:function(L){var B=this,R=B.get(AZ);if(!B.get(O)){if(L){R.addClass(D);}else{R.removeClass(D);}}},_setWrap:function(T){var B=this,R=B.get(P),Y=R.get(d),L=B.get(AF);if(L.test(Y)){T=true;}return T;},_defMouseUpFn:function(L){var B=this;B.set(O,false);},_defResizeFn:function(L){var B=this;B._resize(L);},_resize:function(L){var B=this;B._handleResizeAlignEvent(L.dragEvent);B._syncUI();},_defResizeAlignFn:function(L){var B=this;B._resizeAlign(L);},_resizeAlign:function(R){var B=this,T,L,Y;B.lastInfo=B.info;B._updateInfo(R);T=B.info;B._calcResize();if(!B.con){L=(B.get(AX)+B.totalVSurrounding);Y=(B.get(Ac)+B.totalHSurrounding);if(T.offsetHeight<=L){B._checkSize(h,L);}if(T.offsetWidth<=Y){B._checkSize(AW,Y);}}},_defResizeEndFn:function(L){var B=this;B._resizeEnd(L);},_resizeEnd:function(R){var B=this,L=R.dragEvent.target;L.actXY=[];B._syncUI();B._setActiveHandlesUI(false);B.set(o,null);B.set(f,null);B.handle=null;},_defResizeStartFn:function(L){var B=this;B._resizeStart(L);},_resizeStart:function(L){var B=this,R=B.get(AZ);B.handle=B.get(o);B.set(O,true);B._updateSurroundingInfo();B.originalInfo=B._getInfo(R,L);B._updateInfo(L);},_handleMouseUpEvent:function(B){this.fire(i,{dragEvent:B,info:this.info});},_handleResizeEvent:function(B){this.fire(W,{dragEvent:B,info:this.info});},_handleResizeAlignEvent:function(B){this.fire(b,{dragEvent:B,info:this.info});},_handleResizeEndEvent:function(B){this.fire(k,{dragEvent:B,info:this.info});},_handleResizeStartEvent:function(B){if(!this.get(o)){this._setHandleFromNode(B.target.get("node"));}this.fire(s,{dragEvent:B,info:this.info});},_onWrapperMouseEnter:function(L){var B=this;if(B.get(AI)){B._setHideHandlesUI(false);}},_onWrapperMouseLeave:function(L){var B=this;if(B.get(AI)){B._setHideHandlesUI(true);}},_setHandleFromNode:function(L){var B=this,R=B._extractHandleName(L);if(!B.get(O)){B.set(o,R);B.set(f,L);B._setActiveHandlesUI(true);B._updateChangeHandleInfo(R);}},_onHandleMouseEnter:function(B){this._setHandleFromNode(B.currentTarget);},_onHandleMouseLeave:function(L){var B=this;if(!B.get(O)){B._setActiveHandlesUI(false);}},_valueWrapper:function(){var B=this,R=B.get(P),L=R.get(E),T=R;if(B.get(AK)){T=t.Node.create(B.WRAP_TEMPLATE);if(L){L.insertBefore(T,R);}T.append(R);B._copyStyles(R,T);R.setStyles({position:Ad,left:0,top:0});}return T;}});t.each(t.Resize.prototype.ALL_HANDLES,function(L,B){t.Resize.ATTRS[Af(L)]={setter:function(){return this._buildHandle(L);},value:null,writeOnce:true};});},"3.3.0",{requires:["base","widget","substitute","event","oop","dd-drag","dd-delegate","dd-drop"],skinnable:true});YUI.add("resize-proxy",function(C){var N="activeHandleNode",I="cursor",G="dragCursor",L="host",K="parentNode",F="proxy",D="proxyNode",B="resize",A="resize-proxy",J="wrapper",E=C.ClassNameManager.getClassName,M=E(B,F);function H(){H.superclass.constructor.apply(this,arguments);}C.mix(H,{NAME:A,NS:F,ATTRS:{proxyNode:{setter:C.one,valueFn:function(){return C.Node.create(this.PROXY_TEMPLATE);}}}});C.extend(H,C.Plugin.Base,{PROXY_TEMPLATE:'<div class="'+M+'"></div>',initializer:function(){var O=this;O.afterHostEvent("resize:start",O._afterResizeStart);O.beforeHostMethod("_resize",O._beforeHostResize);O.afterHostMethod("_resizeEnd",O._afterHostResizeEnd);},destructor:function(){var O=this;O.get(D).remove(true);},_afterHostResizeEnd:function(Q){var O=this,P=Q.dragEvent.target;P.actXY=[];O._syncProxyUI();O.get(D).hide();},_afterResizeStart:function(P){var O=this;O._renderProxy();},_beforeHostResize:function(Q){var O=this,P=this.get(L);P._handleResizeAlignEvent(Q.dragEvent);O._syncProxyUI();return new C.Do.Prevent();},_renderProxy:function(){var O=this,Q=this.get(L),P=O.get(D);if(!P.inDoc()){Q.get(J).get(K).append(P.hide());}},_syncProxyUI:function(){var O=this,Q=this.get(L),S=Q.info,R=Q.get(N),P=O.get(D),T=R.getStyle(I);P.show().setStyle(I,T);Q.delegate.dd.set(G,T);P.sizeTo(S.offsetWidth,S.offsetHeight);P.setXY([S.left,S.top]);}});C.namespace("Plugin");C.Plugin.ResizeProxy=H;},"3.3.0",{requires:["resize-base","plugin"],skinnable:false});
YUI.add("resize-constrain",function(A){var k=A.Lang,S=k.isBoolean,j=k.isNumber,G=k.isString,Q=A.Resize.capitalize,E=function(Y){return(Y instanceof A.Node);},f=function(Y){return parseFloat(Y)||0;},B="borderBottomWidth",Z="borderLeftWidth",b="borderRightWidth",F="borderTopWidth",d="border",R="bottom",T="con",J="constrain",N="host",O="left",M="maxHeight",H="maxWidth",C="minHeight",g="minWidth",i="node",X="offsetHeight",a="offsetWidth",c="preserveRatio",P="region",e="resizeConstrained",h="right",K="tickX",I="tickY",U="top",D="width",L="view",W="viewportRegion";function V(){V.superclass.constructor.apply(this,arguments);}A.mix(V,{NAME:e,NS:T,ATTRS:{constrain:{setter:function(Y){if(Y&&(E(Y)||G(Y)||Y.nodeType)){Y=A.one(Y);}return Y;}},minHeight:{value:15,validator:j},minWidth:{value:15,validator:j},maxHeight:{value:Infinity,validator:j},maxWidth:{value:Infinity,validator:j},preserveRatio:{value:false,validator:S},tickX:{value:false},tickY:{value:false}}});A.extend(V,A.Plugin.Base,{constrainSurrounding:null,initializer:function(){var Y=this,l=Y.get(N);l.delegate.dd.plug(A.Plugin.DDConstrained,{tickX:Y.get(K),tickY:Y.get(I)});l.after("resize:align",A.bind(Y._handleResizeAlignEvent,Y));l.on("resize:start",A.bind(Y._handleResizeStartEvent,Y));},_checkConstrain:function(m,v,n){var s=this,r,o,p,u,t=s.get(N),Y=t.info,l=s.constrainSurrounding.border,q=s._getConstrainRegion();if(q){r=Y[m]+Y[n];o=q[v]-f(l[Q(d,v,D)]);if(r>=o){Y[n]-=(r-o);}p=Y[m];u=q[m]+f(l[Q(d,m,D)]);if(p<=u){Y[m]+=(u-p);Y[n]-=(u-p);}}},_checkHeight:function(){var Y=this,m=Y.get(N),o=m.info,l=(Y.get(M)+m.totalVSurrounding),n=(Y.get(C)+m.totalVSurrounding);Y._checkConstrain(U,R,X);if(o.offsetHeight>l){m._checkSize(X,l);}if(o.offsetHeight<n){m._checkSize(X,n);}},_checkRatio:function(){var y=this,r=y.get(N),x=r.info,n=r.originalInfo,q=n.offsetWidth,z=n.offsetHeight,p=n.top,AA=n.left,t=n.bottom,w=n.right,m=function(){return(x.offsetWidth/q);},o=function(){return(x.offsetHeight/z);},s=r.changeHeightHandles,Y,AB,u,v,l,AC;if(y.get(J)&&r.changeHeightHandles&&r.changeWidthHandles){u=y._getConstrainRegion();AB=y.constrainSurrounding.border;Y=(u.bottom-f(AB[B]))-t;v=AA-(u.left+f(AB[Z]));l=(u.right-f(AB[b]))-w;AC=p-(u.top+f(AB[F]));if(r.changeLeftHandles&&r.changeTopHandles){s=(AC<v);}else{if(r.changeLeftHandles){s=(Y<v);}else{if(r.changeTopHandles){s=(AC<l);}else{s=(Y<l);}}}}if(s){x.offsetWidth=q*o();y._checkWidth();x.offsetHeight=z*m();}else{x.offsetHeight=z*m();y._checkHeight();x.offsetWidth=q*o();}if(r.changeTopHandles){x.top=p+(z-x.offsetHeight);}if(r.changeLeftHandles){x.left=AA+(q-x.offsetWidth);}A.each(x,function(AE,AD){if(j(AE)){x[AD]=Math.round(AE);}});},_checkRegion:function(){var Y=this,l=Y.get(N),m=Y._getConstrainRegion();return A.DOM.inRegion(null,m,true,l.info);},_checkWidth:function(){var Y=this,n=Y.get(N),o=n.info,m=(Y.get(H)+n.totalHSurrounding),l=(Y.get(g)+n.totalHSurrounding);Y._checkConstrain(O,h,a);if(o.offsetWidth<l){n._checkSize(a,l);}if(o.offsetWidth>m){n._checkSize(a,m);}},_getConstrainRegion:function(){var Y=this,m=Y.get(N),l=m.get(i),o=Y.get(J),n=null;if(o){if(o==L){n=l.get(W);}else{if(E(o)){n=o.get(P);}else{n=o;}}}return n;},_handleResizeAlignEvent:function(m){var Y=this,l=Y.get(N);Y._checkHeight();Y._checkWidth();if(Y.get(c)){Y._checkRatio();}if(Y.get(J)&&!Y._checkRegion()){l.info=l.lastInfo;}},_handleResizeStartEvent:function(m){var Y=this,n=Y.get(J),l=Y.get(N);Y.constrainSurrounding=l._getBoxSurroundingInfo(n);}});A.namespace("Plugin");A.Plugin.ResizeConstrained=V;},"3.3.0",{requires:["resize-base","plugin"],skinnable:false});YUI.add("resize",function(A){},"3.3.0",{use:["resize-base","resize-proxy","resize-constrain"]});