import{a as w,S as q,i as E}from"./assets/vendor-C7cWR4m5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&l(u)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();let f=15;const H="47345355-bb5adb35ee772e90f4db69f75";w.defaults.baseURL="https://pixabay.com/api/";async function S(e,t){const s=new URLSearchParams({key:H,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:f});return(await w.get(`?${s}`)).data}const P=new q(".gallery a",{captionsData:"alt",captionDelay:250});function h(e,t){t.insertAdjacentHTML("beforeend",B(e)),P.refresh()}function B(e){return e.map(({webformatURL:t,largeImageURL:s,tags:l,likes:r,views:o,comments:u,downloads:M})=>`<li class = 'list-item'>
            <a class='gallery-link' href='${s}'>
                <img
                    class = 'gallery-image'
                    src = '${t}'
                    alt =  '${l}'>
                <ul class = 'description-list'>
                    <li class = 'description-item'>
                        <h3>Likes</h3>
                        <p>${r}</p>
                    </li>
                    <li class = 'description-item'>
                        <h3>Views</h3>
                        <p>${o}</p>
                    </li>
                    <li class = 'description-item'>
                        <h3>Comments</h3>
                        <p>${u}</p>
                    </li>
                    <li class = 'description-item'>
                        <h3>Downloads</h3>
                        <p>${M}</p>
                    </li>
                </ul>
            </a>
        </li>`).join("")}const b=document.querySelector(".search-form"),O=document.querySelector('[name="search"]'),i=document.querySelector(".gallery"),y=document.querySelector(".load-more-images");b.addEventListener("input",$);b.addEventListener("submit",D);y.addEventListener("click",R);c();const L="input-name-image",p=JSON.parse(localStorage.getItem(L)),m={search:""};p&&(O.value=p.search,m.search=p.search);function $(e){m.search=e.target.value.trim(),localStorage.setItem(L,JSON.stringify(m))}let I={totalHits:0},g=1;async function D(e){if(e.preventDefault(),i.innerHTML="",v(),c(),!e.target.elements.search.value.trim()){d(a.info.type,a.info.message),i.innerHTML="",n();return}try{g=1;const s=await S(m.search,g);s.hits.length===0&&(d(a.warningNoSearchImages.type,a.warningNoSearchImages.message),i.innerHTML="",n(),c()),h(s.hits,i),I.totalHits=s.totalHits,s.hits.length<f?c():N(),n()}catch(s){console.error("Error:",s.message),n(),c();return}}async function R(){g+=1,v();try{const e=await S(m.search,g);(g-1)*f+e.hits.length>=I.totalHits?(h(e.hits,i),d(a.warningNoImagesBtn.type,a.warningNoImagesBtn.message),n(),c()):(h(e.hits,i),N(),n(),T())}catch{d(a.error.type,a.error.message),n(),c()}finally{n()}}const a={success:{type:"success",message:"Request completed successfully"},info:{type:"info",message:"The field must be filled"},warningNoSearchImages:{type:"warning",message:"Sorry, there are no images matching your search query. Please try again!"},warningNoImagesBtn:{type:"warning",message:"We're sorry, but you've reached the end of search results."},error:{type:"error",message:"Sorry, but something went wrong. Please try again later!"}};function d(e,t){const s={success:"rgb(0, 255, 128, 0.7)",info:"rgb(76, 153, 255, 0.7)",warning:"rgb(255, 193, 7, 0.7)",error:"rgb(255, 76, 76, 0.7)"};E.show({message:t,messageColor:"white",position:"topRight",backgroundColor:s[e]})}function v(){if(!document.querySelector(".loader")){const t=document.createElement("div");t.className="loader",i.insertAdjacentElement("beforeend",t)}}function n(){const e=document.querySelector(".loader");e&&e.remove()}function N(){y.style.display="block"}function c(){y.style.display="none"}function T(){const t=document.querySelector(".list-item").getBoundingClientRect();window.scrollBy({top:t.height*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
