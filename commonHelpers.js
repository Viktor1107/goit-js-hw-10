import"./assets/styles-950172c5.js";import{f as y,i as S}from"./assets/vendor-77e16229.js";const t=document.querySelector("[data-start]"),o=document.querySelector("#datetime-picker"),p=document.querySelector("[data-days]"),b=document.querySelector("[data-hours]"),g=document.querySelector("[data-minutes]"),q=document.querySelector("[data-seconds]");let d=null,a=null;t.disabled=!0;const D={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose:T};y(o,D);function T(e){e[0]<=new Date?(S.error({message:"Please choose a date in the future",position:"topRight",timeout:5e3,messageSize:20}),t.disabled=!0):(a=e[0],t.disabled=!1)}t.addEventListener("click",k);function k(){a&&(t.disabled=!0,o.disabled=!0,d=setInterval(v,1e3))}function v(){const e=a-new Date;e<=0?(clearInterval(d),u(0),o.disabled=!1):u(e)}function u(e){const{days:r,hours:s,minutes:i,seconds:c}=C(e);p.textContent=n(r),b.textContent=n(s),g.textContent=n(i),q.textContent=n(c)}function C(e){const l=Math.floor(e/864e5),m=Math.floor(e%864e5/36e5),f=Math.floor(e%864e5%36e5/6e4),h=Math.floor(e%864e5%36e5%6e4/1e3);return{days:l,hours:m,minutes:f,seconds:h}}function n(e){return String(e).padStart(2,"0")}
//# sourceMappingURL=commonHelpers.js.map
