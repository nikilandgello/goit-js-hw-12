import{a as h,S as q,i as E}from"./assets/vendor-C7cWR4m5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))c(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();let y=15;const H="47345355-bb5adb35ee772e90f4db69f75";h.defaults.baseURL="https://pixabay.com/api/";async function w(e,t){const o=new URLSearchParams({key:H,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:y});return(await h.get(`?${o}`)).data}const P=new q(".gallery a",{captionsData:"alt",captionDelay:250});function S(e,t){t.insertAdjacentHTML("beforeend",B(e)),P.refresh()}function B(e){return e.map(({webformatURL:t,largeImageURL:o,tags:c,likes:r,views:s,comments:l,downloads:M})=>`<li class = 'list-item'>
            <a class='gallery-link' href='${o}'>
                <img
                    class = 'gallery-image'
                    src = '${t}'
                    alt =  '${c}'>
                <ul class = 'description-list'>
                    <li class = 'description-item'>
                        <h3>Likes</h3>
                        <p>${r}</p>
                    </li>
                    <li class = 'description-item'>
                        <h3>Views</h3>
                        <p>${s}</p>
                    </li>
                    <li class = 'description-item'>
                        <h3>Comments</h3>
                        <p>${l}</p>
                    </li>
                    <li class = 'description-item'>
                        <h3>Downloads</h3>
                        <p>${M}</p>
                    </li>
                </ul>
            </a>
        </li>`).join("")}const b=document.querySelector(".search-form"),O=document.querySelector('[name="search"]'),i=document.querySelector(".gallery"),f=document.querySelector(".load-more-images");b.addEventListener("input",$);b.addEventListener("submit",D);f.addEventListener("click",R);d();const L="input-name-image",p=JSON.parse(localStorage.getItem(L)),m={search:""};p&&(O.value=p.search,m.search=p.search);function $(e){m.search=e.target.value.trim(),localStorage.setItem(L,JSON.stringify(m))}let I={totalHits:0},u=1;async function D(e){if(e.preventDefault(),i.innerHTML="",v(),d(),!e.target.elements.search.value.trim()){g(a.info.type,a.info.message),i.innerHTML="",n();return}try{u=1;const o=await w(m.search,u);o.hits.length===0&&(g(a.warningNoSearchImages.type,a.warningNoSearchImages.message),i.innerHTML="",n()),S(o.hits,i),I.totalHits=o.totalHits,N(),n()}catch(o){console.error("Error:",o.message),n(),d();return}}async function R(){u+=1,v();try{const e=await w(m.search,u);u*y>=I.totalHits?(g(a.warningNoImagesBtn.type,a.warningNoImagesBtn.message),n(),d()):(S(e.hits,i),N(),T()),n()}catch{g(a.error.type,a.error.message),n(),d()}finally{n()}}const a={success:{type:"success",message:"Request completed successfully"},info:{type:"info",message:"The field must be filled"},warningNoSearchImages:{type:"warning",message:"Sorry, there are no images matching your search query. Please try again!"},warningNoImagesBtn:{type:"warning",message:"We're sorry, but you've reached the end of search results."},error:{type:"error",message:"Sorry, but something went wrong. Please try again later!"}};function g(e,t){const o={success:"rgb(0, 255, 128, 0.7)",info:"rgb(76, 153, 255, 0.7)",warning:"rgb(255, 193, 7, 0.7)",error:"rgb(255, 76, 76, 0.7)"};E.show({message:t,messageColor:"white",position:"topRight",backgroundColor:o[e]})}function v(){if(!document.querySelector(".loader")){const t=document.createElement("div");t.className="loader",i.insertAdjacentElement("beforeend",t)}}function n(){const e=document.querySelector(".loader");e&&e.remove()}function N(){f.style.display="block"}function d(){f.style.display="none"}function T(){const t=document.querySelector(".list-item").getBoundingClientRect();window.scrollBy({top:t.height*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
