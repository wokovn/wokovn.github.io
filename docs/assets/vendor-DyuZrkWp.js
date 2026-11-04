function He(i){return i&&i.__esModule&&Object.prototype.hasOwnProperty.call(i,"default")?i.default:i}var W={exports:{}},a={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var J;function Ie(){if(J)return a;J=1;var i=Symbol.for("react.transitional.element"),r=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),u=Symbol.for("react.strict_mode"),T=Symbol.for("react.profiler"),A=Symbol.for("react.consumer"),M=Symbol.for("react.context"),x=Symbol.for("react.forward_ref"),k=Symbol.for("react.suspense"),w=Symbol.for("react.memo"),c=Symbol.for("react.lazy"),t=Symbol.for("react.activity"),d=Symbol.for("react.view_transition"),g=Symbol.iterator;function m(e){return e===null||typeof e!="object"?null:(e=g&&e[g]||e["@@iterator"],typeof e=="function"?e:null)}var C={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},z=Object.assign,D={};function R(e,n,o){this.props=e,this.context=n,this.refs=D,this.updater=o||C}R.prototype.isReactComponent={},R.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")},R.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function j(){}j.prototype=R.prototype;function b(e,n,o){this.props=e,this.context=n,this.refs=D,this.updater=o||C}var N=b.prototype=new j;N.constructor=b,z(N,R.prototype),N.isPureReactComponent=!0;var H=Array.isArray;function L(){}var y={H:null,A:null,T:null,S:null},K=Object.prototype.hasOwnProperty;function q(e,n,o){var s=o.ref;return{$$typeof:i,type:e,key:n,ref:s!==void 0?s:null,props:o}}function Pe(e,n){return q(e.type,n,e.props)}function U(e){return typeof e=="object"&&e!==null&&e.$$typeof===i}function $e(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(o){return n[o]})}var X=/\/+/g;function Y(e,n){return typeof e=="object"&&e!==null&&e.key!=null?$e(""+e.key):n.toString(36)}function be(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(L,L):(e.status="pending",e.then(function(n){e.status==="pending"&&(e.status="fulfilled",e.value=n)},function(n){e.status==="pending"&&(e.status="rejected",e.reason=n)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function $(e,n,o,s,f){var h=typeof e;(h==="undefined"||h==="boolean")&&(e=null);var _=!1;if(e===null)_=!0;else switch(h){case"bigint":case"string":case"number":_=!0;break;case"object":switch(e.$$typeof){case i:case r:_=!0;break;case c:return _=e._init,$(_(e._payload),n,o,s,f)}}if(_)return f=f(e),_=s===""?"."+Y(e,0):s,H(f)?(o="",_!=null&&(o=_.replace(X,"$&/")+"/"),$(f,n,o,"",function(je){return je})):f!=null&&(U(f)&&(f=Pe(f,o+(f.key==null||e&&e.key===f.key?"":(""+f.key).replace(X,"$&/")+"/")+_)),n.push(f)),1;_=0;var S=s===""?".":s+":";if(H(e))for(var E=0;E<e.length;E++)s=e[E],h=S+Y(s,E),_+=$(s,n,o,h,f);else if(E=m(e),typeof E=="function")for(e=E.call(e),E=0;!(s=e.next()).done;)s=s.value,h=S+Y(s,E++),_+=$(s,n,o,h,f);else if(h==="object"){if(typeof e.then=="function")return $(be(e),n,o,s,f);throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.")}return _}function I(e,n,o){if(e==null)return e;var s=[],f=0;return $(e,s,"","",function(h){return n.call(o,h,f++)}),s}function Ne(e){if(e._status===-1){var n=e._result,o=n();o.then(function(s){(e._status===0||e._status===-1)&&(e._status=1,e._result=s,o.status===void 0&&(o.status="fulfilled",o.value=s))},function(s){(e._status===0||e._status===-1)&&(e._status=2,e._result=s,o.status===void 0&&(o.status="rejected",o.reason=s))}),e._status===-1&&(e._status=0,e._result=o)}if(e._status===1)return e._result.default;throw e._result}var Z=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function F(e){var n=y.T,o={};o.types=n!==null?n.types:null,y.T=o;try{var s=e(),f=y.S;f!==null&&f(o,s),typeof s=="object"&&s!==null&&typeof s.then=="function"&&s.then(L,Z)}catch(h){Z(h)}finally{n!==null&&o.types!==null&&(n.types=o.types),y.T=n}}function Q(e){var n=y.T;if(n!==null){var o=n.types;o===null?n.types=[e]:o.indexOf(e)===-1&&o.push(e)}else F(Q.bind(null,e))}var Le={map:I,forEach:function(e,n,o){I(e,function(){n.apply(this,arguments)},o)},count:function(e){var n=0;return I(e,function(){n++}),n},toArray:function(e){return I(e,function(n){return n})||[]},only:function(e){if(!U(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};return a.Activity=t,a.Children=Le,a.Component=R,a.Fragment=p,a.Profiler=T,a.PureComponent=b,a.StrictMode=u,a.Suspense=k,a.ViewTransition=d,a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=y,a.__COMPILER_RUNTIME={__proto__:null,c:function(e){return y.H.useMemoCache(e)}},a.addTransitionType=Q,a.cache=function(e){return function(){return e.apply(null,arguments)}},a.cacheSignal=function(){return null},a.cloneElement=function(e,n,o){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var s=z({},e.props),f=e.key;if(n!=null)for(h in n.key!==void 0&&(f=""+n.key),n)!K.call(n,h)||h==="key"||h==="__self"||h==="__source"||h==="ref"&&n.ref===void 0||(s[h]=n[h]);var h=arguments.length-2;if(h===1)s.children=o;else if(1<h){for(var _=Array(h),S=0;S<h;S++)_[S]=arguments[S+2];s.children=_}return q(e.type,f,s)},a.createContext=function(e){return e={$$typeof:M,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:A,_context:e},e},a.createElement=function(e,n,o){var s,f={},h=null;if(n!=null)for(s in n.key!==void 0&&(h=""+n.key),n)K.call(n,s)&&s!=="key"&&s!=="__self"&&s!=="__source"&&(f[s]=n[s]);var _=arguments.length-2;if(_===1)f.children=o;else if(1<_){for(var S=Array(_),E=0;E<_;E++)S[E]=arguments[E+2];f.children=S}if(e&&e.defaultProps)for(s in _=e.defaultProps,_)f[s]===void 0&&(f[s]=_[s]);return q(e,h,f)},a.createRef=function(){return{current:null}},a.forwardRef=function(e){return{$$typeof:x,render:e}},a.isValidElement=U,a.lazy=function(e){return{$$typeof:c,_payload:{_status:-1,_result:e},_init:Ne}},a.memo=function(e,n){return{$$typeof:w,type:e,compare:n===void 0?null:n}},a.startTransition=F,a.unstable_useCacheRefresh=function(){return y.H.useCacheRefresh()},a.use=function(e){return y.H.use(e)},a.useActionState=function(e,n,o){return y.H.useActionState(e,n,o)},a.useCallback=function(e,n){return y.H.useCallback(e,n)},a.useContext=function(e){return y.H.useContext(e)},a.useDebugValue=function(){},a.useDeferredValue=function(e,n){return y.H.useDeferredValue(e,n)},a.useEffect=function(e,n){return y.H.useEffect(e,n)},a.useEffectEvent=function(e){return y.H.useEffectEvent(e)},a.useId=function(){return y.H.useId()},a.useImperativeHandle=function(e,n,o){return y.H.useImperativeHandle(e,n,o)},a.useInsertionEffect=function(e,n){return y.H.useInsertionEffect(e,n)},a.useLayoutEffect=function(e,n){return y.H.useLayoutEffect(e,n)},a.useMemo=function(e,n){return y.H.useMemo(e,n)},a.useOptimistic=function(e,n){return y.H.useOptimistic(e,n)},a.useReducer=function(e,n,o){return y.H.useReducer(e,n,o)},a.useRef=function(e){return y.H.useRef(e)},a.useState=function(e){return y.H.useState(e)},a.useSyncExternalStore=function(e,n,o){return y.H.useSyncExternalStore(e,n,o)},a.useTransition=function(){return y.H.useTransition()},a.version="19.3.1",a}var ee;function re(){return ee||(ee=1,W.exports=Ie()),W.exports}var O=re();const Qe=He(O);var B={exports:{}},v={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var te;function qe(){if(te)return v;te=1;var i=re();function r(c){var t="https://react.dev/errors/"+c;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var d=2;d<arguments.length;d++)t+="&args[]="+encodeURIComponent(arguments[d])}return"Minified React error #"+c+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function p(){}var u={d:{f:p,r:function(){throw Error(r(522))},D:p,C:p,L:p,m:p,X:p,S:p,M:p},p:0,findDOMNode:null},T=Symbol.for("react.portal"),A=Symbol.for("react.recoverable"),M=Symbol.for("react.optimistic_key");function x(c,t,d){var g=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:T,key:g==null?null:g===M?M:""+g,children:c,containerInfo:t,implementation:d}}var k=i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function w(c,t){if(c==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}return v.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=u,v.browser=function(c){return{$$typeof:A,_reason:c}},v.createPortal=function(c,t){var d=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(r(299));return x(c,t,null,d)},v.flushSync=function(c){var t=k.T,d=u.p;try{if(k.T=null,u.p=2,c)return c()}finally{k.T=t,u.p=d,u.d.f()}},v.preconnect=function(c,t){typeof c=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,u.d.C(c,t))},v.prefetchDNS=function(c){typeof c=="string"&&u.d.D(c)},v.preinit=function(c,t){if(typeof c=="string"&&t&&typeof t.as=="string"){var d=t.as,g=w(d,t.crossOrigin),m=typeof t.integrity=="string"?t.integrity:void 0,C=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;d==="style"?u.d.S(c,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:g,integrity:m,fetchPriority:C}):d==="script"&&u.d.X(c,{crossOrigin:g,integrity:m,fetchPriority:C,nonce:typeof t.nonce=="string"?t.nonce:void 0})}},v.preinitModule=function(c,t){if(typeof c=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var d=w(t.as,t.crossOrigin);u.d.M(c,{crossOrigin:d,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}}else t==null&&u.d.M(c)},v.preload=function(c,t){if(typeof c=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var d=t.as,g=w(d,t.crossOrigin);u.d.L(c,d,{crossOrigin:g,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}},v.preloadModule=function(c,t){if(typeof c=="string")if(t){var d=w(t.as,t.crossOrigin);u.d.m(c,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:d,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}else u.d.m(c)},v.requestFormReset=function(c){u.d.r(c)},v.unstable_batchedUpdates=function(c,t){return c(t)},v.useFormState=function(c,t,d){return k.H.useFormState(c,t,d)},v.useFormStatus=function(){return k.H.useHostTransitionStatus()},v.version="19.3.1",v}var ne;function Je(){if(ne)return B.exports;ne=1;function i(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i)}catch(r){console.error(r)}}return i(),B.exports=qe(),B.exports}/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=i=>i==null?void 0:i.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function Ye(i,r,p=[]){if(r==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:Ue(i),size:24,node:r,...p.length>0?{aliases:p}:{}}}/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const We=i=>{let r="",p=!1;for(const u of i){if(u==="-"||u==="_"||u<=" "){p=r.length>0;continue}r.length===0?r+=u.toLowerCase():r+=p?u.toUpperCase():u,p=!1}return r};/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Be=i=>{const r=We(i);return r.charAt(0).toUpperCase()+r.slice(1)};/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=(...i)=>i.filter((r,p,u)=>!!r&&r.trim()!==""&&u.indexOf(r)===p).join(" ").trim();/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function V(i){return i!=null}function Ve(i,r={}){var d,g;const p=r.attributeNames??{},u=m=>p[m]??m,T=i.size??i.width??P.width,A=i.size??i.height??P.height,M=((d=i.aliases)==null?void 0:d.filter(m=>typeof m=="string"&&m.trim()!=="").map(m=>`lucide-${m}`))??[],x=[...i.name?[`lucide-${i.name}`]:[],...M],k=((g=r.className)==null?void 0:g.split(" ").filter(Boolean))??[],w=r.includeDefaultClasses===!1?G(...k):G("lucide",...x,...k),c=r.absoluteStrokeWidth?Number(r.strokeWidth??P["stroke-width"])*Number(i.size??i.width??P.width)/Number(r.size??r.width??P.width):r.strokeWidth??P["stroke-width"];return["svg",{...Object.entries(P).reduce((m,[C,z])=>(m[u(C)]=z,m),{}),..."color"in r&&r.color&&{[u("stroke")]:r.color},..."size"in r&&V(r.size)&&{[u("width")]:r.size,[u("height")]:r.size},..."width"in r&&V(r.width)&&{[u("width")]:r.width},..."height"in r&&V(r.height)&&{[u("height")]:r.height},[u("stroke-width")]:c,...w&&{[u("class")]:w},[u("viewBox")]:`0 0 ${T} ${A}`,...r.hasA11yProp===!1?{[u("aria-hidden")]:"true"}:{},..."attributes"in r&&r.attributes},i.node.map(m=>{const[C,z,D]=m,R=r.nonScalingStroke?{[u("vector-effect")]:"non-scaling-stroke",...z}:z;return D?[C,R,D]:[C,R]})]}/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function Ge(i,r={}){return Ve(i,{...r,attributeNames:{...r.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ke=i=>{for(const r in i)if(r.startsWith("aria-")||r==="role"||r==="title")return!0;return!1},Xe=O.createContext({}),Ze=()=>O.useContext(Xe),Fe=O.forwardRef(({color:i,size:r,width:p,height:u,strokeWidth:T,absoluteStrokeWidth:A,nonScalingStroke:M,className:x="",children:k,iconNode:w=[],icon:c={node:w,aliases:[],size:24},...t},d)=>{const{size:g=24,strokeWidth:m=2,absoluteStrokeWidth:C=!1,nonScalingStroke:z=!1,color:D="currentColor",className:R=""}=Ze()??{},j=!!k||Ke(t),[b,N,H=[]]=Ge(c,{color:i??D,width:p??r??g,height:u??r??g,strokeWidth:T??m,absoluteStrokeWidth:A??C,nonScalingStroke:M??z,className:G(R,x),hasA11yProp:j,attributes:t});return O.createElement(b,{ref:d,...N},[...H.map(([L,y])=>O.createElement(L,y)),...Array.isArray(k)?k:[k]])});/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function l(i,r=[],p=[]){const u=typeof i=="string"?Ye(i,r,p):i,T=O.forwardRef(({className:A,...M},x)=>O.createElement(Fe,{ref:x,icon:u,className:A,...M}));return u.name&&(T.displayName=Be(u.name)),T}/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe={name:"activity",size:24,node:[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",key:"169zse"}]]};oe.node;const et=l(oe);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie={name:"arrow-up-right",size:24,node:[["path",{d:"M7 7h10v10",key:"1tivn9"}],["path",{d:"M7 17 17 7",key:"1vkiza"}]]};ie.node;const tt=l(ie);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se={name:"arrow-up",size:24,node:[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]};se.node;const nt=l(se);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ce={name:"briefcase",size:24,node:[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]};ce.node;const rt=l(ce);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae={name:"calendar",size:24,node:[["path",{d:"M8 2v3",key:"1ioesn"}],["path",{d:"M16 2v3",key:"otl347"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["path",{d:"M3 9h18",key:"1pudct"}]]};ae.node;const ot=l(ae);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ue={name:"chart-column",size:24,node:[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],aliases:["bar-chart-3"]};ue.node;const it=l(ue);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fe={name:"check",size:24,node:[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]};fe.node;const st=l(fe);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de={name:"circle-check",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 9-5.5 5.5L8 12",key:"xofnsj"}]],aliases:["check-circle-2"]};de.node;const ct=l(de);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le={name:"copy",size:24,node:[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]};le.node;const at=l(le);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye={name:"corner-down-left",size:24,node:[["path",{d:"M20 4v7a4 4 0 0 1-4 4H4",key:"6o5b7l"}],["path",{d:"m9 10-5 5 5 5",key:"1kshq7"}]]};ye.node;const ut=l(ye);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he={name:"cpu",size:24,node:[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]]};he.node;const ft=l(he);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe={name:"database",size:24,node:[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]};pe.node;const dt=l(pe);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e={name:"external-link",size:24,node:[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]};_e.node;const lt=l(_e);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me={name:"git-branch",size:24,node:[["path",{d:"M15 6a9 9 0 0 0-9 9V3",key:"1cii5b"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}]]};me.node;const yt=l(me);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge={name:"globe",size:24,node:[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]};ge.node;const ht=l(ge);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve={name:"graduation-cap",size:24,node:[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]]};ve.node;const pt=l(ve);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke={name:"mail",size:24,node:[["path",{d:"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7",key:"132q7q"}],["rect",{x:"2",y:"4",width:"20",height:"16",rx:"2",key:"izxlao"}]]};ke.node;const _t=l(ke);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee={name:"map-pin",size:24,node:[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]};Ee.node;const mt=l(Ee);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce={name:"menu",size:24,node:[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]]};Ce.node;const gt=l(Ce);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we={name:"pause",size:24,node:[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]]};we.node;const vt=l(we);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re={name:"play",size:24,node:[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]};Re.node;const kt=l(Re);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te={name:"radio",size:24,node:[["path",{d:"M16.247 7.761a6 6 0 0 1 0 8.478",key:"1fwjs5"}],["path",{d:"M19.075 4.933a10 10 0 0 1 0 14.134",key:"ehdyv1"}],["path",{d:"M4.925 19.067a10 10 0 0 1 0-14.134",key:"1q22gi"}],["path",{d:"M7.753 16.239a6 6 0 0 1 0-8.478",key:"r2q7qm"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]};Te.node;const Et=l(Te);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me={name:"server",size:24,node:[["rect",{width:"20",height:"8",x:"2",y:"2",rx:"2",ry:"2",key:"ngkwjq"}],["rect",{width:"20",height:"8",x:"2",y:"14",rx:"2",ry:"2",key:"iecqi9"}],["line",{x1:"6",x2:"6.01",y1:"6",y2:"6",key:"16zg32"}],["line",{x1:"6",x2:"6.01",y1:"18",y2:"18",key:"nzw8ys"}]]};Me.node;const Ct=l(Me);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se={name:"shield-check",size:24,node:[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]};Se.node;const wt=l(Se);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ae={name:"terminal",size:24,node:[["path",{d:"M12 19h8",key:"baeox8"}],["path",{d:"m4 17 6-6-6-6",key:"1yngyt"}]]};Ae.node;const Rt=l(Ae);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe={name:"trending-up",size:24,node:[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]]};xe.node;const Tt=l(xe);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ze={name:"volume-2",size:24,node:[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]]};ze.node;const Mt=l(ze);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe={name:"x",size:24,node:[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]};Oe.node;const St=l(Oe);/**
 * @license lucide-react v1.68.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const De={name:"zap",size:24,node:[["path",{d:"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",key:"1v7up4"}]]};De.node;const At=l(De);export{tt as A,rt as B,ft as C,dt as D,lt as E,yt as G,gt as M,vt as P,Et as R,Ct as S,Rt as T,Mt as V,St as X,At as Z,re as a,Je as b,wt as c,st as d,at as e,Tt as f,He as g,ct as h,it as i,kt as j,et as k,pt as l,ot as m,mt as n,_t as o,ht as p,nt as q,O as r,ut as s,Qe as t};
