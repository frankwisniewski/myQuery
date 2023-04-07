"use strict";function fhwMD(e,t=[]){let l=[],r={};function i(e){return e.replaceAll(/[&<>'"]/g,(function(e){return{"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[e]||e}))}const p=e=>{let t=e,l=0;return{g:e=>t[l+e]??!1,i:()=>l<t.length,n:()=>t[l++]??!1,c:()=>t[l]??!1,f:()=>l-=l>0,p:e=>{t.push(e),l=t.length-1},a:()=>t,change:e=>t[l]=e,length:()=>t.length,o:()=>t.pop()??!1,last:()=>t[t.length-1]??!1,after:e=>t.splice(l+1,0,e),e:()=>t[l]?.match(/^ */)[0].length,reset:()=>{l=0},deleteAll:()=>{t=[]},hasData:()=>t.length>0,find:e=>t.includes(e),findIdx:e=>-1!==t.indexOf(e)&&t.indexOf(e),popCount:e=>{let l="";for(let r=0;r<e;r++){let e=t.pop()??!1;l+=e||""}return l},b:()=>l,d:e=>{l=e}}},n=e=>{e=e.replaceAll(/\t/g,"    ");let l=p(e.split(/\r?\n|\r|\n/g)),i=p([]);i.h=(e=0)=>i.g(e).h??!1,i.v=(e=0)=>i.g(e).v??!1,i.e=(e=0)=>i.g(e).k??!1,i.l=(e=0)=>i.g(e).l??!1,i.N=e=>i.c().h=e,i.O=e=>i.c().l=e,i.P=e=>i.c().v=e;let n=[];n.h=(e,t,l)=>{let r=t.match(/#+/)[0].length;r>6&&(r=6);let p=!1,n=/{#(?<id>.+)}/;(t=t.slice(l).trim()).match(n)&&(p=t.match(n).groups.id.replaceAll(" ","-"),t=t.replace(n,"")),i.p({h:e,v:t,k:l,l:r,hId:p})},n.h1=(e,t,l)=>{if("p"==i.h()){t="# "+i.v();let r=1;return e="h",i.o(),void i.p({h:e,v:t,k:l,l:r})}e="p",i.p({h:e,v:t,k:l})},n.h2=(e,t,l)=>{if("p"==i.h()){t="## "+i.v();let r=2;return e="h",i.o(),void i.p({h:e,v:t,k:l,l:r})}e="hr",i.p({h:e,v:t,k:l})},n.hr=(e,t,l)=>{i.p({h:e,v:t,k:l})},n.table=(e,t,r)=>{let p=new RegExp(/^ *[\| ]*.*\|.*/),n=p.exec(i.v()),o=p.exec(l.g(1));if(n&&o)for(i.N("table"),i.p({h:e,v:t,k:r}),l.n();l.i();){if(!p.exec(l.c())){l.f();break}let t=l.c();i.p({h:e,v:t,k:r}),l.n()}else e="p",i.p({h:e,v:t,k:r})},n.blockquote=(e,t,l)=>{let r=t.match(/>+/)[0].length;t=t.slice(l+r+1),i.p({h:e,v:t,k:l,l:r})},n.code=(e,t,l)=>{t=t.slice(4),i.p({h:e,v:t,k:l})},n.fcode=(e,t,r)=>{let p=new RegExp(/^ *```.*/),n=l.e(),o=t.trimStart().slice(3).trim();for(l.n();l.i()&&!p.exec(l.c());){if(l.e()<n){l.f();break}t=l.c().slice(n),r=l.e()-n,i.p({h:"code",v:t,k:r,codeClass:o}),l.n()}},n.blank=(e,t,l)=>{i.h!=e&&i.p({h:e,v:t,k:l})},n.p=(e,t,l)=>{i.p({h:e,v:t,k:l})},n.list=(e,t,r)=>{let p=new RegExp(/^ *[-+*] |^ *\d+\. /),n=0,o=0;for(;l.i();){if(p.exec(l.c())&&(n=l.e()+2),0==l.e()&&!p.exec(l.c())&&""==l.c()){l.f();break}o=l.e()>n?n:l.e(),t=l.c().slice(o),r=l.e(),i.p({h:e,v:t,k:r}),l.n()}"list"==i.h()&&""==i.v()&&i.N("blank")},n.html=(e,t,l)=>{t.match(/<[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*>/)&&(e="p"),t.match(/<https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)>/)&&(e="p"),i.p({h:e,v:t,k:l})},n.deflist=(e,t,r)=>{let p="p"==i.h(),n=l.e(),o="";if(p)for(i.N("deflist"),i.O("dt");l.i();){for(;l.e()>n;)t=l.c(),o="ddchild",i.p({h:e,v:t,l:o,k:r}),l.n();if(!l.c().match(/^ *: /g)){l.f();break}t=l.c().slice(r),o="dd",i.p({h:e,v:t,l:o,k:r}),l.n()}else for(;l.i();){if(!l.c().match(/^ *: /g)){l.f();break}e="p",t=l.c().slice(r),i.p({h:e,v:t,k:r}),l.n()}},n.reflink=(e,l,r)=>{let i="",p="",n="",o=/^\[(?<num>.*)\]: *<*(?<link>.*)$/g.exec(l);o&&(i=o.groups.num,p=o.groups.link.trim());let c=/<*(?<link>.*)[ >]*["'(](?<title>.*)["')] *$/g.exec(o.groups.link);c&&(p=c.groups.link.trim(),n=c.groups.title.trim()),t[i.replaceAll(" ","-")]={linkUrl:p,linkTitel:n}},n.footnote=(e,t,p)=>{let n=new RegExp(/(?<footnote>^ *\[\^(?<bez>[\d\w ]+)\]: )/),o=t.match(n).groups.bez;r[o]=Object.keys(r).length+1,t=t.replace(n,"");let c="parent";i.p({h:e,v:t,k:p,l:c,footName:o});let a=!1;for(l.n();l.i()&&(a||(a=l.e()),""!=l.c())&&!l.c().match(n)&&l.e()>=a&&0!=l.e();)t=l.c().slice(a),c="child",p=l.e()-a,i.p({h:e,v:t,k:p,l:c,footName:o}),l.n();r[o],i.P(i.v()+`[&#9166;](#footnoteret-${o} "zurück")`),l.f()};const o=p([]);o.p("(?<h>^ *#+)"),o.p("(?<h1>^ *===+ *$)"),o.p("(?<h2>^ *---+ *$)"),o.p("(?<hr>^ *[_*]{3,} *$)"),o.p("(?<table>^ *[\\| ]*[ -:]+\\|.*)"),o.p("(?<fcode>^ *```.* *)"),o.p("(?<code>^ {4,})"),o.p("(?<list>^ *[-+*] |^ *\\d+\\. )"),o.p("(?<html>^ *<.*?>)"),o.p("(?<blockquote>^ *>+ *)"),o.p("(?<blank>^ *$)"),o.p("(?<deflist>^ *: )"),o.p("(?<footnote>^ *\\[\\^(?<bez>[\\d\\w ]+)\\]: )"),o.p("(?<reflink>^\\[.*\\]:)"),o.p("(?<p>^.*$)");const c=new RegExp(o.a().join("|")),a=e=>{let t=c.exec(e);return t?Object.keys(t.groups).find((e=>void 0!==t.groups[e])):"p"};for(;l.i();){let e=l.c(),t=a(e),r=l.e();n[t](t,e,r),l.n()}return i.reset(),i},o=e=>{const t=e=>o(n(e));let r=p([]);r.x=e=>r.p(c(e));let a=[];for(a.h=e=>{let t="";e.hId&&(t=` id="${e.hId.replaceAll(" ","-")}"`),r.x(`<h${e.l}${t}>${e.v.slice(e.l).trim()}</h${e.l}>`)},a.blank=()=>{},a.p=t=>{if("p"==e.h(-1)){r.o();let l=e.v(-1).replace(/  $/,"<br>");e.P(l+t.v)}r.x(`<p>${t.v}</p>`)},a.hr=()=>r.p("<hr>"),a.code=t=>{let l="";for(t.codeClass&&(l=` class="language-${t.codeClass}"`),r.p(`<pre><code${l}>${i(t.v)}`),e.n();e.i();){if("code"!==e.h()){e.f();break}r.p(i(e.v())),e.n()}r.p("</code></pre>")},a.list=()=>{let l=[],i=0,n=p([]),o=p([]),c=new RegExp(/^ *[-+*] |^ *\d+\. /),a=new RegExp(/^ *[-\*\+] /),f=new RegExp(/^ *\d+. /),h="";if(a.exec(e.v())&&(h="ul"),f.exec(e.v())&&(h="ol"),r.p(`<${h}>`),o.p(`</${h}>`),n.p(e.e()),e.g(1)){for(l.push(e.v().replace(c,"")),e.n();e.i()&&"list"===e.h();){if(c.exec(e.v())&&(r.p("<li>"),1==l.length?r.x(l[0]):(l.length>1&&l[1]&&l[1].match(c)&&(r.x(l[0]),l.shift()),r.p(t(l.join("\n")))),l=[],e.e()>n.last()&&(a.exec(e.v())&&(h="ul"),f.exec(e.v())&&(h="ol"),r.p(`<${h}>`),o.p(`</${h}>`),n.p(e.e())),e.e()<n.last())){if(n.find(e.e()))i=n.length()-n.findIdx(e.e())-1;else{let t=0;for(;n.g(t)>e.e();)t--;i=-1*t-1}for(let e=0;e<i;e++)n.o(),r.p(o.o())}l.push(e.v().replace(c,"")),e.n()}for(r.p("<li>"),1==l.length?r.x(l[0]):(l.length>1&&l[1]&&l[1].match(c)&&(r.x(l[0]),l.shift()),r.p(t(l.join("\n"))));o.last();)r.p(o.o());e.f()}else r.x("<li>"+e.v().replace(c,"")+o.o())},a.table=()=>{let t=(()=>{let t=e.v(1).replace(/^ *\||\| *$/g,"").split("|");return t.forEach(((e,l)=>{let r=e.trim();t[l]="",r.match(/^:.*:$/)&&(t[l]=' style="text-align: center;"'),r.match(/^:-*$/)&&(t[l]=' style="text-align: left;"'),r.match(/^-*:$/)&&(t[l]=' style="text-align: right;"')})),t})(),l=e.v().replace(/^ *\||\| *$/g,"").split("|");e.n(),e.n();let i=[];for(;e.i();){if("table"!==e.h()){e.f();break}i.push(e.v().replace(/^ *\||\| *$/g,"").split("|")),e.n()}let p=l.length;i.forEach((e=>{e.length>p&&(p=e.length)})),r.p("<table>"),r.p("<thead><tr>");for(let e=0;e<p;e++){let i=l[e]??"",p=t[e]??"";r.p(`<th${p}>`),r.x(i.trim()),r.p("</th>")}r.p("</tr></thead>"),r.p("<tbody>"),i.forEach((e=>{r.p("<tr>");for(let l=0;l<p;l++){let i=e[l]??"",p=t[l]??"";r.p(`<td${p}>`),r.x(i.trim()),r.p("</td>")}r.p("</tr>")})),r.p("</tbody>"),r.p("</table>")},a.blockquote=()=>{let l="",i=p([]);r.p("<blockquote>"),i.p("</blockquote>");let n=e.l();for(;e.i();){if("blockquote"!==e.h()){e.f();break}if(n!==e.l()){r.p(t(l));let p=e.l()-n;if(p>0)for(let e=0;e<p;e++)r.p("<blockquote>"),i.p("</blockquote>");else r.p(i.oCount(p*=-1));n=e.l(),l=""}l+=e.v()+"\n",e.n()}for(r.p(t(l));i.last();)r.p(`${i.o()}`)},a.html=()=>{r.p(e.v())},a.deflist=()=>{for(r.p("<dl>");e.i();){if("blank"==e.h()&&"deflist"!==e.h(1)){e.f();break}if("deflist"!==e.h()&&"blank"!==e.h()){e.f();break}if("blank"!==e.h()&&("dt"==e.l()&&r.x("<dt>"+e.v().replace(/^ *: /,"")+"</dt>"),"dd"==e.l()))if("ddchild"==e.l(1)){let l=[];for(l.push(e.v().replace(/^ *: /,"")),e.n();e.i();){if("ddchild"!==e.l()){r.p("<dd>"),r.p(t(l.join("\n"))),r.p("</dd>"),e.f();break}l.push(e.v()),e.n()}}else r.x("<dd>"+e.v().replace(/^ *: /,"")+"</dd>");e.n()}r.p("</dl>")},a.footnote=()=>{let r=[],i=e.c().footName;for(r.push(e.v()),e.n();e.i()&&"child"===e.c().l;)r.push(e.v()),e.n();i=i.replaceAll(" ","-"),l.push(`<li id="footnote-${i}">`+t(r.join("\n"))),e.f()};e.i();)a[e.h()](e.c()),e.n();return r.a().join("\n")},c=e=>{let l=p(e.split("")),n=e,o=p([]),a=p([]),f=p([]);function h(e){return" "==l.g(-1)&&" "==l.g(e)&&(o.p(l.c()),2==e&&(o.p(l.g(1)),l.n()),!0)}function s(e){if(o.last()==`<${e}>`)return o.o(),void a.o();a.find(e)?function(e){for(;f.last()!==e;)o.p(`</${a.last()}>`),f.p(a.o());for(f.o();f.last();)o.p(`<${f.last()}>`),a.p(f.o())}(e):(o.p(`<${e}>`),a.p(e))}function g(){let e=n.substr(l.b());o.p("<code>"),a.p("code");let t=/^(?<!`)`(?!`)(?<code>.*?)(?<!`)`(?!`)/.exec(e);if(t)return o.p(i(t.groups.code)),l.d(l.b()+t[0].length-1),void o.p(`</${a.o()}>`)}function d(){o.p("<code>"),a.p("code"),l.f();let e=n.substr(l.b()),t=/^(?<!`)``(?!`)(?<code>.*?)(?<!`)``(?!`)/.exec(e);if(t)return o.p(i(t.groups.code)),l.d(l.b()+t[0].length-1),void o.p(`</${a.o()}>`)}function u(){let e=n.substr(l.b()),i=e.match(/\[\^(?<flink>[\d\w ]+)\]/);if(i){let e=i[0].length,t=i.groups.flink,l=r[t]??"error";return t=t.replaceAll(" ","-"),[`<sup id=footnoteret-${t}><a href="#footnote-${t}">${l}</a></sup>`,e]}let p=e.match(/^\[!\[(?<imgAlt>.+?)\]\((?<imgUrl>[^ ]+?)( "(?<imgTitle>.+?)")?\)\]\((?<linkUrl>.+?)\)/);if(p){let e=p.groups.imgTitle;e=e?` title="${e}"`:"";let t=p.groups.imgAlt;return t=t?` alt="${t}"`:"",[`<a href="${p.groups.linkUrl}"><img src="${p.groups.imgUrl}" ${t}${e}></a>`,p[0].length]}let a=e.match(/^\[(?<linktext>.+?)\]\((?<linkUrl>[^ ]+?)( ["'\(](?<title>.+?)["'\)])?\)/);if(a){let e=a.groups.title;return e=e?` title="${e}"`:"",[`<a href="${encodeURI(a.groups.linkUrl.trim())}"${e}>${c(a.groups.linktext)}</a>`,a[0].length]}let f=e.match(/^\[(?<linktext>.+?)\]\((?<linkUrl>#.+?)( ["'\(](?<title>.+?)["'\)])?\)/);if(f){let e=f.groups.title;return e=e?` title="${e}"`:"",[`<a href="${encodeURI(f.groups.linkUrl.trim().replaceAll(" ","-"))}"${e}>${c(f.groups.linktext)}</a>`,f[0].length]}let h=e.match(/\[(?<label>.+?)\] ?\[(?<linkRef>.+?)\]/);if(h){let e=h.groups.linkRef.replaceAll(" ","-").toLowerCase();if(t[e]){let l=t[e].linkUrl,r=t[e].linkTitel;return r=""!==r?` title="${r}"`:"",[`<a href="${encodeURI(l.trim())}"${r}>${c(h.groups.label)}</a>`,h[0].length]}}let s=e.match(/^\[(?<label>.+?)\](?!\[)/);if(s){let e=s.groups.label.replaceAll(" ","-").toLowerCase();if(t[e]){let l=t[e].linkUrl,r=t[e].linkTitel;return r=""!==r?` title="${r}"`:"",[`<a href="${encodeURI(l.trim())}"${r}>${c(s.groups.label)}</a>`,s[0].length]}}return o.p(l.c()),[!1,""]}function k(){let e=n.substr(l.b()).match(/^!\[(?<imgAlt>.+?)\]\((?<imgUrl>[^ ]+?)( "(?<imgTitle>.+?)")?\)/);if(e){let t=e.groups.imgTitle;return t=t?` title="${t}"`:"",[`<img src="${encodeURI(e.groups.imgUrl.trim())}" alt="${e.groups.imgAlt}"${t}>`,e[0].length]}return o.p(l.c()),[!1,""]}function b(){let e="",t=1;return[e,t]=function(e,t){let r="";for(;l.g(e)&&l.g(e)!=t;)r+=l.g(e),e++;return[r,e]}(t,">"),l.g(t)&&""!=e?/\S+@\S+\.\S+/.test(e)?(o.p(`<a href="mailto:${e}">${e}</a>`),void l.d(l.b()+t)):/^(http|https):\/\/[a-zA-Z0-9_.-]+\.[a-zA-Z0-9-]{2,}([a-zA-Z0-9\/+_.-]*)?$/.test(e)?(o.p(`<a href="${e}">${e}</a>`),void l.d(l.b()+t)):void o.p(l.c()):(o.p(i(l.c())),[!1,""])}for(!function(){for(;l.i();){let e=l.c();if("*_^=\\`[!<~".includes(e))switch(e){case"*":case"_":if(h(1))break;if("*"==l.g(1)||"_"==l.g(1)){if(h(2))break;l.n(),s("strong")}else s("em");break;case"^":if(h(1))break;s("sup");break;case"~":if(h(1))break;if("~"==l.g(1)){if(h(2))break;l.n(),s("del")}else s("sub");break;case"=":if("="==l.g(1)){if(h(2))break;l.n(),s("mark")}else o.p(l.c());break;case"\\":l.i()?(l.n(),o.p(i(l.c()))):o.p(l.c());break;case"`":"`"==l.g(1)?(l.n(),d()):g();break;case"[":if(h(1))break;let[e,t]=u();e&&(o.p(e),l.d(l.b()+t-1));break;case"!":if(h(1))break;let[r,p]=k();r&&(o.p(r),l.d(l.b()+p-1));break;case"<":if(h(1))break;b()}else o.p(l.c());l.n()}}();a.last();)o.p(`</${a.o()}>`);return o.a().join("")};let a=n(e);return o(a)+"<hr><ol>"+l.join("\n")+"</ol>"}