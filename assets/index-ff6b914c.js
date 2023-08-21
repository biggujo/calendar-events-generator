import{r as p,a as I,t as f,b as T,g as L,f as _,J as k,n as c,c as S,s as E,d as r,e as F,h as m,i as y,j as N,k as x}from"./notiflix-aio-3.2.6.min-495b74d4.js";var R=6e4;function u(e,t){p(2,arguments);var a=f(t);return I(e,a*R)}function C(e,t){var a;if(arguments.length<1)throw new TypeError("1 argument required, but only none provided present");var n=f((a=t==null?void 0:t.nearestTo)!==null&&a!==void 0?a:1);if(n<1||n>30)throw new RangeError("`options.nearestTo` must be between 1 and 30");var i=T(e),v=i.getSeconds(),l=i.getMinutes()+v/60,h=L(t==null?void 0:t.roundingMethod),b=h(l/n)*n,w=l%n,M=Math.round(w/n)*n;return new Date(i.getFullYear(),i.getMonth(),i.getDate(),i.getHours(),b+M)}const g=({element:e,givenInitialDate:t=new Date,onChange:a})=>{const n=A(t);return _(e,{dateFormat:"d.m.Y о H:i",defaultDate:n,minDate:n,enableTime:!0,minuteIncrement:15,time_24hr:!0,monthSelectorType:"static",onChange:a})};function A(e){return C(e,{nearestTo:30,roundingMethod:"ceil"})}function P(e){return new k(e).addField("#title",[{rule:"required"},{rule:"minLength",value:3},{rule:"maxLength",value:90}]).addField("#location",[{rule:"minLength",value:2},{rule:"maxLength",value:90}]).addField("#url",[{rule:"minLength",value:2},{rule:"maxLength",value:90},{rule:"customRegexp",value:/(http|ftp|https):\/\/([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?/g}])}function U(){return function(t){t.preventDefault()}}function V({target:e}){q(e)}function q(e){e.disabled||(e.blur(),navigator.clipboard.writeText(e.value).then(()=>c.Notify.success("Copied to clipboard!")).catch(()=>c.Notify.failure("Error writing to clipboard!")))}const o=30;S();E();P(r.form).onSuccess(()=>{const e=Object.fromEntries(new FormData(r.form)),t=new Date(O.selectedDates[0]),a=new Date(s.selectedDates[0]),n=F({data:{...e},startDate:t,endDate:a});m(n),y({element:r.resultData,data:{...e},startDate:t,endDate:a,shouldShowEmpty:!0,isDebug:!0}),r.form.elements.result.removeAttribute("disabled")}).onFail(()=>{N({element:r.resultData}),m(""),r.form.elements.result.setAttribute("disabled","true")});const{elements:d}=r.form,D=new Date,O=g({element:d.start,givenInitialDate:D,onChange:j}),s=g({element:d.end,givenInitialDate:u(D,o)});function j([e]){const[t]=s.selectedDates;x(t,e)<o&&(s.config.minDate=u(e,o),s.setDate(u(e,o)))}r.form.addEventListener("submit",U);d.result.addEventListener("click",V);
