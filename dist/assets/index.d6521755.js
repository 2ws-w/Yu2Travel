import{g as C}from"./index.9a10cd72.js";import{u as F}from"./vuex.9ee1927f.js";import{u as E}from"./vue-router.05688416.js";import{u as D}from"./vue-i18n.c908e677.js";import{a as I}from"./element-plus.bed7ca25.js";import{I as R,d as _,c as a,a as i,W as n,Q as h,af as l,o,F as g,a5 as v,P as S,V as f}from"./@vue.4ea92163.js";import"./index.45ee53a6.js";import"./axios.d349c3b3.js";import"./form-data.d1f94bc2.js";import"./lodash-es.599ebd02.js";import"./@vueuse.cd159fc8.js";import"./@element-plus.2c6cd9cb.js";import"./@popperjs.36402333.js";import"./@ctrl.82a509e0.js";import"./dayjs.46f97078.js";import"./async-validator.fb49d0f5.js";import"./memoize-one.4ee5c96d.js";import"./escape-html.e5dfadb9.js";import"./normalize-wheel-es.8aeb3683.js";import"./@floating-ui.f14f28ca.js";import"./@intlify.1cbe17fe.js";const V={class:"record-page"},N={class:"main-wrapper"},$={class:"column-style"},b={key:0,class:"column-style"},q=["onClick"],A={class:"title"},L={class:"price"},ne=R({__name:"index",setup(M){D();const m=F(),u=E(),c=_(),d=_(!0),y=()=>{C().then(t=>{let{success:s,message:r,result:p}=t;d.value=!1,s?c.value=p:I.error(r)})};if(m.state.userStatus)y();else{const{pathname:t}=window.location;u.replace({path:"/login",query:{redirect:t}})}const k=t=>{let{recordId:s}=t;u.push({path:`/detail/${s}`}),m.commit("setRoomId",s)};return(t,s)=>{const r=l("el-skeleton-item"),p=l("el-image"),x=l("el-empty"),w=l("el-skeleton");return o(),a("div",V,[i("div",N,[n(w,{loading:d.value,animated:""},{template:h(()=>[i("div",$,[(o(),a(g,null,v(9,e=>i("div",{class:"item",key:e},[n(r,{variant:"image",style:{width:"315px",height:"240px","boder-raduis":"4px"}}),n(r,{variant:"p",style:{width:"100%","margin-top":"15px"}}),n(r,{variant:"p",style:{width:"30%"}})])),64))])]),default:h(()=>[c.value.length>0?(o(),a("div",b,[(o(!0),a(g,null,v(c.value,(e,B)=>(o(),a("div",{class:"item",key:B,onClick:P=>k(e)},[n(p,{src:e.pictureUrl,alt:e.title},null,8,["src","alt"]),i("p",A,f(e.title),1),i("p",L,"\uFFE5 "+f(e.price),1)],8,q))),128))])):(o(),S(x,{key:1,description:"\u6682\u65E0\u6D4F\u89C8\u8BB0\u5F55\u54E6~"}))]),_:1},8,["loading"])])])}}});export{ne as default};