import{s as L,w as H,r as A,g as M,b as J,d as f,e as g,u as U,f as V,h as G,n as K,i as q}from"./@vue.4ea92163.js";var X=Object.defineProperty,Y=Object.defineProperties,Z=Object.getOwnPropertyDescriptors,D=Object.getOwnPropertySymbols,k=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable,W=(e,t,n)=>t in e?X(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,te=(e,t)=>{for(var n in t||(t={}))k.call(t,n)&&W(e,n,t[n]);if(D)for(var n of D(t))ee.call(t,n)&&W(e,n,t[n]);return e},ne=(e,t)=>Y(e,Z(t));function Pe(e,t){var n;const o=L();return H(()=>{o.value=e()},ne(te({},t),{flush:(n=t==null?void 0:t.flush)!=null?n:"sync"})),A(o)}var j;const E=typeof window<"u",oe=e=>typeof e<"u",Ie=e=>typeof e=="boolean",re=e=>typeof e=="function",Ee=e=>typeof e=="number",ie=e=>typeof e=="string",S=()=>{};E&&((j=window==null?void 0:window.navigator)==null?void 0:j.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function y(e){return typeof e=="function"?e():U(e)}function z(e,t){function n(...o){e(()=>t.apply(this,o),{fn:t,thisArg:this,args:o})}return n}function se(e,t={}){let n,o;return i=>{const s=y(e),u=y(t.maxWait);if(n&&clearTimeout(n),s<=0||u!==void 0&&u<=0)return o&&(clearTimeout(o),o=null),i();u&&!o&&(o=setTimeout(()=>{n&&clearTimeout(n),o=null,i()},u)),n=setTimeout(()=>{o&&clearTimeout(o),o=null,i()},s)}}function ue(e,t=!0,n=!0){let o=0,r,i=!0;const s=()=>{r&&(clearTimeout(r),r=void 0)};return a=>{const d=y(e),m=Date.now()-o;if(s(),d<=0)return o=Date.now(),a();m>d&&(n||!i)?(o=Date.now(),a()):t&&(r=setTimeout(()=>{o=Date.now(),i=!0,s(),a()},d)),!n&&!r&&(r=setTimeout(()=>i=!0,d)),i=!1}}function ae(e){return e}function F(e){return M()?(J(e),!0):!1}function le(e,t=200,n={}){return z(se(t,n),e)}function Te(e,t=200,n={}){if(t<=0)return e;const o=f(e.value),r=le(()=>{o.value=e.value},t,n);return g(e,()=>r()),o}function Se(e,t=200,n=!1,o=!0){return z(ue(t,n,o),e)}function N(e,t=!0){V()?G(e):t?e():K(e)}function $e(e,t,n={}){const{immediate:o=!0}=n,r=f(!1);let i=null;function s(){i&&(clearTimeout(i),i=null)}function u(){r.value=!1,s()}function a(...d){s(),r.value=!0,i=setTimeout(()=>{r.value=!1,i=null,e(...d)},y(t))}return o&&(r.value=!0,E&&a()),F(u),{isPending:r,start:a,stop:u}}function h(e){var t;const n=y(e);return(t=n==null?void 0:n.$el)!=null?t:n}const P=E?window:void 0,ce=E?window.document:void 0;function b(...e){let t,n,o,r;if(ie(e[0])?([n,o,r]=e,t=P):[t,n,o,r]=e,!t)return S;let i=S;const s=g(()=>h(t),a=>{i(),a&&(a.addEventListener(n,o,r),i=()=>{a.removeEventListener(n,o,r),i=S})},{immediate:!0,flush:"post"}),u=()=>{s(),i()};return F(u),u}function xe(e,t,n={}){const{window:o=P,ignore:r,capture:i=!0,detectIframe:s=!1}=n;if(!o)return;const u=f(!0);let a;const d=l=>{o.clearTimeout(a);const c=h(e);!c||c===l.target||l.composedPath().includes(c)||!u.value||t(l)},m=l=>r&&r.some(c=>{const v=h(c);return v&&(l.target===v||l.composedPath().includes(v))}),_=[b(o,"click",d,{passive:!0,capture:i}),b(o,"pointerdown",l=>{const c=h(e);u.value=!!c&&!l.composedPath().includes(c)&&!m(l)},{passive:!0}),b(o,"pointerup",l=>{if(l.button===0){const c=l.composedPath();l.composedPath=()=>c,a=o.setTimeout(()=>d(l),50)}},{passive:!0}),s&&b(o,"blur",l=>{var c;const v=h(e);((c=document.activeElement)==null?void 0:c.tagName)==="IFRAME"&&!(v!=null&&v.contains(document.activeElement))&&t(l)})].filter(Boolean);return()=>_.forEach(l=>l())}function fe(e,t=!1){const n=f(),o=()=>n.value=Boolean(e());return o(),N(o,t),n}function de(e){return JSON.parse(JSON.stringify(e))}const $=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},x="__vueuse_ssr_handlers__";$[x]=$[x]||{};$[x];function Fe({document:e=ce}={}){if(!e)return f("visible");const t=f(e.visibilityState);return b(e,"visibilitychange",()=>{t.value=e.visibilityState}),t}var C=Object.getOwnPropertySymbols,pe=Object.prototype.hasOwnProperty,ve=Object.prototype.propertyIsEnumerable,me=(e,t)=>{var n={};for(var o in e)pe.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&C)for(var o of C(e))t.indexOf(o)<0&&ve.call(e,o)&&(n[o]=e[o]);return n};function Oe(e,t,n={}){const o=n,{window:r=P}=o,i=me(o,["window"]);let s;const u=fe(()=>r&&"ResizeObserver"in r),a=()=>{s&&(s.disconnect(),s=void 0)},d=g(()=>h(e),_=>{a(),u.value&&r&&_&&(s=new ResizeObserver(t),s.observe(_,i))},{immediate:!0,flush:"post"}),m=()=>{a(),d()};return F(m),{isSupported:u,stop:m}}function Ne(e,t={}){const{reset:n=!0,windowResize:o=!0,windowScroll:r=!0,immediate:i=!0}=t,s=f(0),u=f(0),a=f(0),d=f(0),m=f(0),_=f(0),p=f(0),l=f(0);function c(){const v=h(e);if(!v){n&&(s.value=0,u.value=0,a.value=0,d.value=0,m.value=0,_.value=0,p.value=0,l.value=0);return}const O=v.getBoundingClientRect();s.value=O.height,u.value=O.bottom,a.value=O.left,d.value=O.right,m.value=O.top,_.value=O.width,p.value=O.x,l.value=O.y}return Oe(e,c),g(()=>h(e),v=>!v&&c()),r&&b("scroll",c,{passive:!0}),o&&b("resize",c,{passive:!0}),N(()=>{i&&c()}),{height:s,bottom:u,left:a,right:d,top:m,width:_,x:p,y:l,update:c}}var R;(function(e){e.UP="UP",e.RIGHT="RIGHT",e.DOWN="DOWN",e.LEFT="LEFT",e.NONE="NONE"})(R||(R={}));var be=Object.defineProperty,Q=Object.getOwnPropertySymbols,_e=Object.prototype.hasOwnProperty,he=Object.prototype.propertyIsEnumerable,B=(e,t,n)=>t in e?be(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,we=(e,t)=>{for(var n in t||(t={}))_e.call(t,n)&&B(e,n,t[n]);if(Q)for(var n of Q(t))he.call(t,n)&&B(e,n,t[n]);return e};const ge={easeInSine:[.12,0,.39,0],easeOutSine:[.61,1,.88,1],easeInOutSine:[.37,0,.63,1],easeInQuad:[.11,0,.5,0],easeOutQuad:[.5,1,.89,1],easeInOutQuad:[.45,0,.55,1],easeInCubic:[.32,0,.67,0],easeOutCubic:[.33,1,.68,1],easeInOutCubic:[.65,0,.35,1],easeInQuart:[.5,0,.75,0],easeOutQuart:[.25,1,.5,1],easeInOutQuart:[.76,0,.24,1],easeInQuint:[.64,0,.78,0],easeOutQuint:[.22,1,.36,1],easeInOutQuint:[.83,0,.17,1],easeInExpo:[.7,0,.84,0],easeOutExpo:[.16,1,.3,1],easeInOutExpo:[.87,0,.13,1],easeInCirc:[.55,0,1,.45],easeOutCirc:[0,.55,.45,1],easeInOutCirc:[.85,0,.15,1],easeInBack:[.36,0,.66,-.56],easeOutBack:[.34,1.56,.64,1],easeInOutBack:[.68,-.6,.32,1.6]};we({linear:ae},ge);function De(e,t,n,o={}){var r,i,s;const{clone:u=!1,passive:a=!1,eventName:d,deep:m=!1,defaultValue:_}=o,p=V(),l=n||(p==null?void 0:p.emit)||((r=p==null?void 0:p.$emit)==null?void 0:r.bind(p))||((s=(i=p==null?void 0:p.proxy)==null?void 0:i.$emit)==null?void 0:s.bind(p==null?void 0:p.proxy));let c=d;t||(t="modelValue"),c=d||c||`update:${t.toString()}`;const v=w=>u?re(u)?u(w):de(w):w,O=()=>oe(e[t])?v(e[t]):_;if(a){const w=O(),T=f(w);return g(()=>e[t],I=>T.value=v(I)),g(T,I=>{(I!==e[t]||m)&&l(c,I)},{deep:m}),T}else return q({get(){return O()},set(w){l(c,w)}})}function We({window:e=P}={}){if(!e)return f(!1);const t=f(e.document.hasFocus());return b(e,"blur",()=>{t.value=!1}),b(e,"focus",()=>{t.value=!0}),t}function je(e={}){const{window:t=P,initialWidth:n=1/0,initialHeight:o=1/0,listenOrientation:r=!0,includeScrollbar:i=!0}=e,s=f(n),u=f(o),a=()=>{t&&(i?(s.value=t.innerWidth,u.value=t.innerHeight):(s.value=t.document.documentElement.clientWidth,u.value=t.document.documentElement.clientHeight))};return a(),N(a),b("resize",a,{passive:!0}),r&&b("orientationchange",a,{passive:!0}),{width:s,height:u}}export{Ee as a,Ie as b,je as c,Ne as d,b as e,Oe as f,Se as g,$e as h,E as i,Fe as j,We as k,Pe as l,De as m,xe as o,Te as r,F as t,h as u};