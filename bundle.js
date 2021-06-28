(()=>{class e{constructor(){this.clickSound=new Audio("./sounds/clicksound.wav"),this.connectSuccess=new Audio("./sounds/connect.mp3"),this.win=new Audio("./sounds/winning.mp3"),this.fail=new Audio("./sounds/fail.mp3"),this.background=new Audio("./sounds/backgroundmusic.mp3")}playClick(){this.clickSound.currentTime=0,this.clickSound.volume=.3,this.clickSound.play()}playConnect(){this.connectSuccess.currentTime=0,this.connectSuccess.volume=.3,this.connectSuccess.play()}playSuccess(){this.win.currentTime=0,this.win.volume=.3,this.win.play()}playbackground(){this.background.loop=!0,this.background.play()}pauseBackground(){this.background.pause(),this.background.currentTime=0}playfail(){this.fail.currentTime=0,this.fail.volume=.3,this.fail.play()}toggleMute(){this.win.muted=!this.win.muted,this.background.muted=!this.background.muted,this.fail.muted=!this.fail.muted,this.connectSuccess.muted=!this.connectSuccess.muted,this.clickSound.muted=!this.clickSound.mutedd,this.background.muted?document.getElementById("audioButton").innerHTML='<i class="bi bi-volume-mute-fill" style="font-size: 35px"></i>':document.getElementById("audioButton").innerHTML='<i class="bi bi-volume-up-fill"  style="font-size: 35px"></i>'}}function t(e,n,l,o=[],i=null,d=0){if(o.includes(e))return!1;if(d>=3)return!1;if(e===n)return!0;o.push(e);let s=[Math.floor(e/l.length),e%l.length];console.log(s[0]+","+s[1]);let u=[[s[0]+1,s[1]],[s[0],s[1]+1],[s[0]-1,s[1]],[s[0],s[1]-1]];for(let e=0;e<u.length;e++){let c=u[e][0],a=u[e][1],m=c*l.length+a;if(c<l.length&&c>=0&&a<l.length&&a>=0&&(0===l[c][a]||m===n))if(null!==i&&i[0]-c!=0&&i[1]-a!=0){if(console.log(),t(m,n,l,o,s,d+1))return o.pop(),!0}else if(t(m,n,l,o,s,d))return o.pop(),!0}return o.pop(),!1}document.addEventListener("DOMContentLoaded",(()=>{let n=new e;document.getElementById("instruction").addEventListener("click",(e=>{document.getElementById("instruction-pop-up").style.display="block"})),document.getElementById("close-instruction").addEventListener("click",(e=>{document.getElementById("instruction-pop-up").style.display="none"})),document.getElementById("start-game-btn").addEventListener("click",(e=>{n.playClick(),n.playbackground(),document.getElementById("welcome").style.display="none",document.getElementById("instruction").style.display="none",function(){const e=document.getElementById("board"),l=document.getElementById("score"),o=[];let d=0,s=90;const u=document.getElementById("countdown"),c=document.getElementById("pop-up-content");u.innerHTML="",c.innerHTML="",e.innerHTML="",l.innerHTML="Score: 0";let a=!1,m={},r=setInterval((function(){if(a)return;s--;const e=Math.floor(s/60);let t=s%60;t=t<10?"0"+t:t,u.innerHTML=`${e}: ${t}`,0===s&&(n.playfail(),clearInterval(r),document.getElementById("pop-up").style.display="block",c.innerHTML=`<h4>You failed</h4> <br><br><br> <h5>Your Score: ${d} </h5>`)}),1e3);document.getElementById("pause").addEventListener("click",(e=>{e.preventDefault(),a=!0,document.getElementById("pause-pop-up").style.display="block",n.pauseBackground()})),document.getElementById("pop-up-play").addEventListener("click",(e=>{e.preventDefault(),a=!1,document.getElementById("pause-pop-up").style.display="none",n.playbackground()}));let g=function(e){for(i=e.length-1;i>0;i--){let t=Math.floor(Math.random()*(i+1)),n=e[i];e[i]=e[t],e[t]=n}return e}(function(e){let t=[];for(;t.length<64;){let n=Math.floor(Math.random()*e.length);t.push(e[n]),t.push(e[n])}return t}(["url(./images/img1.png)","url(./images/img2.png)","url(./images/img3.png)","url(./images/img4.png)","url(./images/img5.png)","url(./images/img6.png)","url(./images/img7.png)","url(./images/img8.png)","url(./images/img9.png)","url(./images/img10.png)","url(./images/img11.png)","url(./images/img12.png)","url(./images/img13.png)","url(./images/img14.png)","url(./images/img15.png)","url(./images/img16.png)"]));(function(){for(let t=0;t<64;t++){const n=document.createElement("div");n.setAttribute("id",t),m[t]=g[t],n.style.backgroundImage=g[t],e.appendChild(n),o.push(n)}})(),o.forEach((e=>e.addEventListener("click",p)));let y=null;function p(e){e.preventDefault(),n.playClick();let i=e.target.id;if(null!==y){if(y[0]===m[i]){let u=[Math.floor(y[1]/8),y[1]%8],a=[Math.floor(i/8),i%8],m=10*(u[0]+1)+(u[1]+1),g=10*(a[0]+1)+(a[1]+1),p=Array(10).fill(null).map((()=>Array(10).fill(0)));for(let e=0;e<8;e++)for(let t=0;t<8;t++)""!==o[8*e+t].style.backgroundImage&&(p[e+1][t+1]=1);m!==g&&t(m,g,p)?(d+=4,l.innerHTML=`Score: ${d}`,o[y[1]].style.backgroundImage="",e.target.style.backgroundImage="",n.playConnect(),document.getElementById("happy-face").style.display="block",document.getElementById("sad-face").style.display="none",o.every((e=>""===e.style.backgroundImage))&&(n.playSuccess(),document.getElementById("pop-up").style.display="block",clearInterval(r),d+=10*s,l.innerHTML=`Score: ${d}`,c.innerHTML=`<div>You won the game!</div> <br><br><br> <h5> Score: ${d}</h5>`)):(document.getElementById("happy-face").style.display="none",document.getElementById("sad-face").style.display="block")}else document.getElementById("happy-face").style.display="none",document.getElementById("sad-face").style.display="block";document.getElementById(y[1]).classList.remove("square-with-board"),y=null}else""!==e.target.style.backgroundImage&&(e.target.classList.add("square-with-board"),y=[m[i],i])}}(),document.getElementById("board").style.display="flex",document.getElementById("score-board").style.display="block",document.getElementById("countdown").style.display="block",document.getElementById("audioButton").style.display="block",document.getElementById("happy-face").style.display="block",document.getElementById("pause").style.display="block"})),document.getElementById("audioButton").addEventListener("click",(e=>{n.toggleMute()})),document.getElementById("end-game").addEventListener("click",(e=>{n.playClick(),n.pauseBackground(),document.getElementById("welcome").style.display="block",document.getElementById("instruction").style.display="block",document.getElementById("board").style.display="none",document.getElementById("score-board").style.display="none",document.getElementById("pop-up").style.display="none",document.getElementById("countdown").style.display="none",document.getElementById("audioButton").style.display="none",document.getElementById("happy-face").style.display="none",document.getElementById("sad-face").style.display="none",document.getElementById("pause").style.display="none"}))}))})();
//# sourceMappingURL=bundle.js.map