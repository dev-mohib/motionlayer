import{r as u,j as m}from"./app-ff33ea2f.js";function p(){const n=u.useRef(null),[e,v]=u.useState(null);return u.useEffect(()=>{let c=!1,o={x:0,y:0},r={x:0,y:0},s=0,i=0;function a(t){c=!0,o={x:t.clientX-s,y:t.clientY-i},r={x:t.clientX-s,y:t.clientY-i}}function d(t){c=!1}function x(t){c&&e&&(o={x:r.x,y:r.y},r={x:t.clientX-s,y:t.clientY-i},e.beginPath(),e.moveTo(o.x,o.y),e.lineTo(r.x,r.y),e.strokeStyle=`#${h()}`,e.lineWidth=3,e.stroke(),e.closePath())}function h(){const t=new Array(6);for(let l=0;l<6;l++){const f=Math.floor(Math.random()*16);f<10?t[l]=f.toString():t[l]=String.fromCharCode(f+87)}return t.join("")}if(n.current){const t=n.current.getContext("2d");t&&(n.current.addEventListener("mousedown",a),n.current.addEventListener("mouseup",d),n.current.addEventListener("mousemove",x),s=n.current.offsetLeft,i=n.current.offsetTop,v(t))}return e&&e.fillRect(5,5,100,100),e&&(e.beginPath(),e.fillStyle="#ff7f50",e.arc(440,60,50,0,Math.PI*2,!0),e.fill(),e.fillStyle="#000",e.closePath()),function(){n.current&&(n.current.removeEventListener("mousedown",a),n.current.removeEventListener("mouseup",d),n.current.removeEventListener("mousemove",x))}},[e]),m.jsx("div",{style:{textAlign:"center"},children:m.jsx("canvas",{id:"canvas",ref:n,width:500,height:500,style:{border:"2px solid #000",marginTop:10}})})}export{p as default};
