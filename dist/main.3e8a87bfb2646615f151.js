(()=>{"use strict";var e,t={354:(e,t,n)=>{var o=n(964),a=n(888);const i=new o.Pq0,s=new o.Pq0;let r=!1,d=!1,l=!1,c=!1;const p=document.getElementById("keyA"),m=document.getElementById("keyS"),w=document.getElementById("keyD"),h=document.getElementById("keyW"),u=e=>{e.style.transform="translateY(5px)",e.style.boxShadow="inset -8px 0 8px rgba(0,0,0,0.15), inset 0 -8px 8px rgba(0,0,0,0.25), 0 0 0 0px rgba(0,0,0,0.75), 5px 15px 20px rgba(0,0,0,0.4)"},y=e=>{e.style.transform="translateY(0)",e.style.boxShadow="inset -8px 0 8px rgba(0,0,0,0.15), inset 0 -8px 8px rgba(0,0,0,0.25), 0 0 0 0px rgba(0,0,0,0.75), 10px 20px 25px rgba(0,0,0,0.4)"};document.addEventListener("keydown",(e=>{switch(e.key.toLowerCase()){case"a":u(p),l=!0;break;case"s":u(m),d=!0;break;case"d":u(w),c=!0;break;case"w":u(h),r=!0}})),document.addEventListener("keyup",(e=>{switch(e.key.toLowerCase()){case"a":y(p),l=!1;break;case"s":y(m),d=!1;break;case"d":y(w),c=!1;break;case"w":y(h),r=!1}}));var g=n(318),x=n(74),f=n(558);const b=new o.Z58;b.background=new o.Q1f(0);const v=new o.ubm(70,window.innerWidth/window.innerHeight,.1,1e3);v.position.set(0,1.3,1),v.lookAt(0,1.3,-1);const E=new o.JeP({antialias:!0});E.setSize(window.innerWidth,window.innerHeight),E.setPixelRatio(window.devicePixelRatio),E.shadowMap.enabled=!0;const k=new x.B;k.setSize(window.innerWidth,window.innerHeight),k.domElement.style.position="absolute",k.domElement.style.top="0px",k.domElement.style.pointerEvents="none",document.body.appendChild(k.domElement);const S=document.getElementById("spinner"),z=document.getElementById("blocker"),C=document.getElementById("loading-text");let P=0;const L=setInterval((function(){P=(P+1)%4,C&&(C.textContent="Loading"+".".repeat(P))}),500);!function(){b.add(new o.$p8(16777215,.2));const e=new o.ZyN(16777215,.5);e.position.set(1,5,0),e.target.position.set(0,0,0),e.castShadow=!0,e.shadow.camera.top=.78,e.shadow.camera.bottom=-.7,e.shadow.camera.left=-1.8,e.shadow.camera.right=1,e.shadow.camera.near=.1,e.shadow.camera.far=6,e.shadow.mapSize.width=4096,e.shadow.mapSize.height=4096,e.shadow.bias=-.005,e.shadow.normalBias=.05,b.add(e.target),b.add(e)}();const _=new g.Z(v,E.domElement);b.add(_.getObject());const I=document.createElement("div");I.id="click-to-play-overlay",I.style.position="absolute",I.style.top="0",I.style.left="0",I.style.width="100%",I.style.height="100%",I.style.backgroundColor="rgba(0, 0, 0, 0.3)",I.style.color="white",I.style.display="none",I.style.flexDirection="column",I.style.justifyContent="center",I.style.alignItems="center",I.style.zIndex="0",I.style.fontSize="24px";const O=document.createElement("div");O.style.display="flex",O.style.flexDirection="column",O.style.alignItems="center";const j=document.createElement("p");j.textContent="Click to Play",j.style.margin="0",j.style.padding="0",j.style.color="white",O.appendChild(j);const B=document.createElement("div");B.style.display="flex",B.style.flexDirection="row",B.style.marginTop="10px";const M=document.createElement("a");M.href="https://x.com/ShitSimulator",M.target="_blank",M.style.marginRight="10px",M.addEventListener("click",(e=>{e.stopPropagation()}));const W=document.createElement("img");W.src="/textures/x.svg",W.width=50,W.height=50,W.alt="SVG 1",M.appendChild(W);const A=document.createElement("a");A.href="https://dexscreener.com/",A.target="_blank",A.addEventListener("click",(e=>{e.stopPropagation()}));const D=document.createElement("img");let q;D.src="/textures/dex.svg",D.width=50,D.height=50,D.alt="SVG 2",A.appendChild(D),B.appendChild(M),B.appendChild(A),O.appendChild(B),I.appendChild(O),document.body.appendChild(I),I.addEventListener("click",(()=>{_.isLocked||(_.lock(),q&&q.play())})),_.addEventListener("lock",(()=>{I.style.display="none"})),_.addEventListener("unlock",(()=>{I.style.display="flex"}));const F=document.createElement("div");F.style.color="white",F.textContent="FejPqdCsA1G6Q6EEqcLnonZbJvraR4J7xUDdSVuepump";const H=new x.v(F);H.position.set(0,1,0),b.add(H);const T=(new f.p).setTranscoderPath("/textures/tile/").detectSupport(E);function N(e){return new Promise(((t,n)=>{T.load(e,(e=>{e.wrapS=e.wrapT=o.GJx,e.repeat.set(25,25),e.anisotropy=E.capabilities.getMaxAnisotropy(),t(e)}),void 0,(t=>{console.error(`Error loading texture ${e}:`,t),n(t)}))}))}Promise.all([Promise.all([N("./textures/tile/T_uegoehgfw_4K_B.ktx2"),N("./textures/tile/T_uegoehgfw_4K_N.ktx2"),N("./textures/tile/T_uegoehgfw_4K_H.ktx2"),N("./textures/tile/T_uegoehgfw_4K_ORM.ktx2")]),new Promise(((e,t)=>{(new a.B).load("/models/FINALKRWWWW.gltf",(t=>{const n=t.scene,a=t.animations,i=new o.Iw4(n);a.length>0&&i.clipAction(a[0]).play(),n.traverse((e=>{e instanceof o.eaF&&(e.castShadow=!0,e.receiveShadow=!0,e.frustumCulled=!1)})),n.position.set(0,0,0),n.scale.set(1,1,1),b.add(n);const s=new o.zD7;!function e(){const t=s.getDelta();i.update(t),requestAnimationFrame(e)}(),e()}),void 0,(e=>{console.error("Error loading the model:",e),t(e)}))})),new Promise(((e,t)=>{const n=new Audio("/audio/sound.mp3");n.addEventListener("canplaythrough",(()=>{e(n)}),!1),n.addEventListener("error",(e=>{console.error("Error loading audio:",e),t(e)}),!1),n.load()}))]).then((([[e,t,n,a],i,s])=>{const r=new o._4j({map:e,normalMap:t,displacementMap:n,displacementScale:0,aoMap:a});!function(e){const t=K(80,80,e,new o.Pq0(0,0,0),new o.O9p(-Math.PI/2,0,0));b.add(t)}(r),function(e){const t=K(80,80,e,new o.Pq0(0,2.5,0),new o.O9p(Math.PI/2,0,0));b.add(t)}(r),q=s,z&&(z.style.display="none"),S&&(S.style.display="none"),I.style.display="flex",clearInterval(L)})).catch((e=>{console.error("Error loading resources:",e)}));const R=new o.zD7;function K(e,t,n,a,i){const s=new o.bdM(e,t,512,512),r=new o.eaF(s,n);return r.position.copy(a),r.rotation.copy(i),r.receiveShadow=!0,r}document.body.appendChild(E.domElement),function e(){requestAnimationFrame(e);const t=R.getDelta();if(R.getElapsedTime(),_.isLocked){i.x-=10*i.x*t,i.z-=10*i.z*t,s.z=Number(r)-Number(d),s.x=Number(c)-Number(l),s.normalize();const e=50;(r||d)&&(i.z-=s.z*e*t),(l||c)&&(i.x-=s.x*e*t),_.moveRight(-i.x*t),_.moveForward(-i.z*t);const n=_.getObject().position;n.x=o.cj9.clamp(n.x,-.5,.45),n.z=o.cj9.clamp(n.z,.2,1.5)}E.render(b,v),k.render(b,v)}(),window.addEventListener("resize",(function(){v.aspect=window.innerWidth/window.innerHeight,v.updateProjectionMatrix(),E.setSize(window.innerWidth,window.innerHeight),k.setSize(window.innerWidth,window.innerHeight)})),function(){const e=new o.HiM(16777215,.7,2);e.position.set(0,1,1),e.shadow.mapSize.width=1024,e.shadow.mapSize.height=1024,e.shadow.camera.near=.1,e.shadow.camera.far=4,e.shadow.bias=-.005,e.shadow.normalBias=.05,b.add(e),new o.F1l(e,1)}()}},n={};function o(e){var a=n[e];if(void 0!==a)return a.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.m=t,e=[],o.O=(t,n,a,i)=>{if(!n){var s=1/0;for(c=0;c<e.length;c++){for(var[n,a,i]=e[c],r=!0,d=0;d<n.length;d++)(!1&i||s>=i)&&Object.keys(o.O).every((e=>o.O[e](n[d])))?n.splice(d--,1):(r=!1,i<s&&(s=i));if(r){e.splice(c--,1);var l=a();void 0!==l&&(t=l)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[n,a,i]},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={792:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var a,i,[s,r,d]=n,l=0;if(s.some((t=>0!==e[t]))){for(a in r)o.o(r,a)&&(o.m[a]=r[a]);if(d)var c=d(o)}for(t&&t(n);l<s.length;l++)i=s[l],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(c)},n=self.webpackChunkthreejs_example=self.webpackChunkthreejs_example||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var a=o.O(void 0,[585],(()=>o(354)));a=o.O(a)})();