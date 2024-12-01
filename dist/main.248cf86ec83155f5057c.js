(()=>{"use strict";var e,t={354:(e,t,n)=>{var o=n(964),a=n(888);const i=new o.Pq0,s=new o.Pq0;let d=!1,r=!1,l=!1,c=!1;const p=document.getElementById("keyA"),w=document.getElementById("keyS"),m=document.getElementById("keyD"),h=document.getElementById("keyW"),u=e=>{e.style.transform="translateY(5px)",e.style.boxShadow="inset -8px 0 8px rgba(0,0,0,0.15), inset 0 -8px 8px rgba(0,0,0,0.25), 0 0 0 0px rgba(0,0,0,0.75), 5px 15px 20px rgba(0,0,0,0.4)"},y=e=>{e.style.transform="translateY(0)",e.style.boxShadow="inset -8px 0 8px rgba(0,0,0,0.15), inset 0 -8px 8px rgba(0,0,0,0.25), 0 0 0 0px rgba(0,0,0,0.75), 10px 20px 25px rgba(0,0,0,0.4)"};document.addEventListener("keydown",(e=>{switch(e.key.toLowerCase()){case"a":u(p),l=!0;break;case"s":u(w),r=!0;break;case"d":u(m),c=!0;break;case"w":u(h),d=!0}})),document.addEventListener("keyup",(e=>{switch(e.key.toLowerCase()){case"a":y(p),l=!1;break;case"s":y(w),r=!1;break;case"d":y(m),c=!1;break;case"w":y(h),d=!1}}));var g=n(318),x=n(74);const b=new o.Z58;b.background=new o.Q1f(0);const f=new o.ubm(70,window.innerWidth/window.innerHeight,.1,1e3);f.position.set(0,1.3,1),f.lookAt(0,1.3,-1);const v=new o.JeP({antialias:!0});v.setSize(window.innerWidth,window.innerHeight),v.setPixelRatio(window.devicePixelRatio),v.shadowMap.enabled=!0;const k=new x.B;k.setSize(window.innerWidth,window.innerHeight),k.domElement.style.position="absolute",k.domElement.style.top="0px",k.domElement.style.pointerEvents="none",document.body.appendChild(k.domElement),function(){b.add(new o.$p8(16777215,.2));const e=new o.ZyN(16777215,.5);e.position.set(1,5,0),e.target.position.set(0,0,0),e.castShadow=!0,e.shadow.camera.top=.78,e.shadow.camera.bottom=-.7,e.shadow.camera.left=-1.8,e.shadow.camera.right=1,e.shadow.camera.near=.1,e.shadow.camera.far=6,e.shadow.mapSize.width=4096,e.shadow.mapSize.height=4096,e.shadow.bias=-.005,e.shadow.normalBias=.05,b.add(e.target),b.add(e)}();const E=new g.Z(f,v.domElement);b.add(E.getObject());const z=document.createElement("div");z.id="click-to-play-overlay",z.style.position="absolute",z.style.top="0",z.style.left="0",z.style.width="100%",z.style.height="100%",z.style.backgroundColor="rgba(0, 0, 0, 0.3)",z.style.color="white",z.style.display="flex",z.style.justifyContent="center",z.style.alignItems="center",z.style.zIndex="0",z.style.fontSize="24px",z.style.cursor="pointer",z.textContent="Click to Play",document.body.appendChild(z),z.addEventListener("click",(()=>{E.isLocked||(E.lock(),P.play())})),E.addEventListener("lock",(()=>{z.style.display="none"})),E.addEventListener("unlock",(()=>{z.style.display="flex"}));const S=document.createElement("div");S.style.color="white",S.textContent="$SHITsim";const O=new x.v(S);O.position.set(0,1,0),b.add(O);const C=new o.Tap,I={sandBaseColor:C.load("./textures/tile/T_uegoehgfw_4K_B.png"),sandNormalMap:C.load("./textures/tile/T_uegoehgfw_4K_N.png"),sandHeightMap:C.load("./textures/tile/T_uegoehgfw_4K_H.png"),sandAmbientOcclusion:C.load("./textures/tile/T_uegoehgfw_4K_ORM.png")},M=v.capabilities.getMaxAnisotropy();Object.values(I).forEach((e=>{e.wrapS=e.wrapT=o.GJx,e.repeat.set(25,25),e.anisotropy=M,e.encoding=o.S2Q,e.minFilter=o.NZq}));const _=new o._4j({map:I.sandBaseColor,normalMap:I.sandNormalMap,displacementMap:I.sandHeightMap,displacementScale:0,aoMap:I.sandAmbientOcclusion});!function(){const e=new o.Pq0(0,0,0),t=new o.O9p(-Math.PI/2,0,0),n=B(80,80,_,e,t);b.add(n)}(),function(){const e=new o.Pq0(0,2.5,0),t=new o.O9p(Math.PI/2,0,0),n=B(80,80,_,e,t);b.add(n)}();const j=new o.zD7;function B(e,t,n,a,i){const s=new o.bdM(e,t,512,512),d=new o.eaF(s,n);return d.position.copy(a),d.rotation.copy(i),d.receiveShadow=!0,d}document.body.appendChild(v.domElement),function e(){requestAnimationFrame(e);const t=j.getDelta();if(j.getElapsedTime(),E.isLocked){i.x-=10*i.x*t,i.z-=10*i.z*t,s.z=Number(d)-Number(r),s.x=Number(c)-Number(l),s.normalize();const e=50;(d||r)&&(i.z-=s.z*e*t),(l||c)&&(i.x-=s.x*e*t),E.moveRight(-i.x*t),E.moveForward(-i.z*t);const n=E.getObject().position;n.x=o.cj9.clamp(n.x,-.5,.45),n.z=o.cj9.clamp(n.z,.2,1.5)}v.render(b,f),k.render(b,f)}(),window.addEventListener("resize",(function(){f.aspect=window.innerWidth/window.innerHeight,f.updateProjectionMatrix(),v.setSize(window.innerWidth,window.innerHeight),k.setSize(window.innerWidth,window.innerHeight)})),function(){const e=new o.HiM(16777215,.7,2);e.position.set(0,1,1),e.shadow.mapSize.width=1024,e.shadow.mapSize.height=1024,e.shadow.camera.near=.1,e.shadow.camera.far=4,e.shadow.bias=-.005,e.shadow.normalBias=.05,b.add(e),new o.F1l(e,1)}(),function(){const e=new a.B,t=document.getElementById("spinner"),n=document.getElementById("blocker");e.load("/models/FINALKRWWWW.gltf",(e=>{const a=e.scene,i=e.animations,s=new o.Iw4(a);i.length>0&&s.clipAction(i[0]).play(),a.traverse((e=>{e instanceof o.eaF&&(e.castShadow=!0,e.receiveShadow=!0,e.frustumCulled=!1)})),a.position.set(0,0,0),a.scale.set(1,1,1),b.add(a);const d=new o.zD7;!function e(){const t=d.getDelta();s.update(t),requestAnimationFrame(e)}(),n&&(n.style.display="none"),t&&(t.style.display="none")}),void 0,(e=>{console.error("Error loading the model:",e)}))}();const P=new Audio("/audio/sound.mp3"),L=document.getElementById("loading-text");let H=0;setInterval((function(){H=(H+1)%4,L&&(L.textContent="Loading"+".".repeat(H))}),500)}},n={};function o(e){var a=n[e];if(void 0!==a)return a.exports;var i=n[e]={exports:{}};return t[e](i,i.exports,o),i.exports}o.m=t,e=[],o.O=(t,n,a,i)=>{if(!n){var s=1/0;for(c=0;c<e.length;c++){for(var[n,a,i]=e[c],d=!0,r=0;r<n.length;r++)(!1&i||s>=i)&&Object.keys(o.O).every((e=>o.O[e](n[r])))?n.splice(r--,1):(d=!1,i<s&&(s=i));if(d){e.splice(c--,1);var l=a();void 0!==l&&(t=l)}}return t}i=i||0;for(var c=e.length;c>0&&e[c-1][2]>i;c--)e[c]=e[c-1];e[c]=[n,a,i]},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={792:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var a,i,[s,d,r]=n,l=0;if(s.some((t=>0!==e[t]))){for(a in d)o.o(d,a)&&(o.m[a]=d[a]);if(r)var c=r(o)}for(t&&t(n);l<s.length;l++)i=s[l],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(c)},n=self.webpackChunkthreejs_example=self.webpackChunkthreejs_example||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var a=o.O(void 0,[834],(()=>o(354)));a=o.O(a)})();