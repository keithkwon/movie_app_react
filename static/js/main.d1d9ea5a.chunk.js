(this.webpackJsonpmovie_app=this.webpackJsonpmovie_app||[]).push([[0],{43:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var s=n(0),a=n(2),r=n.n(a),c=n(13),i=n.n(c),o=n(4),l=n.n(o),d=n(14),m=n(15),u=n(16),j=n(19),v=n(18),h=n(17),b=n.n(h);n(43);var p=function(e){e.id;var t=e.year,n=e.title,a=e.summary,r=e.poster,c=e.genres,i=e.torrents;return Object(s.jsxs)("div",{className:"movie col-12 col-lg-6",children:[Object(s.jsx)("img",{src:r,alt:n,title:n}),Object(s.jsxs)("div",{className:"movie__data",children:[Object(s.jsx)("h3",{className:"movie__title",children:n}),Object(s.jsx)("h5",{className:"movie__year",children:t}),Object(s.jsxs)("p",{className:"movie__summary",children:[a.slice(0,180),"..."]}),Object(s.jsx)("ul",{className:"genres",children:c.map((function(e,t){return Object(s.jsx)("li",{className:"genres__genre",children:e},t)}))}),Object(s.jsx)("div",{children:i.map((function(e,t){return Object(s.jsxs)("button",{type:"button",onClick:function(t){t.preventDefault(),window.location.href="".concat(e.url)},className:"torrents__torrent__btn btn btn-primary",children:[e.quality," Download"]},t)}))})]})]})},x=(n(44),function(e){Object(j.a)(n,e);var t=Object(v.a)(n);function n(){var e;Object(m.a)(this,n);for(var s=arguments.length,a=new Array(s),r=0;r<s;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).state={isLoading:!0,movies:[]},e.searchMovie=function(e){console.log(e.target.value)},e.getMovies=Object(d.a)(l.a.mark((function t(){var n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,b.a.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating?xt=urn:btih:TORRENT_HASH&dn=Url+Encoded+Movie+Name&tr=http://track.one:1234/announce&tr=udp://track.two:80");case 3:n=t.sent,console.log(n.data.data.movies),e.setState({movies:n.data.data.movies,isLoading:!1}),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(0),console.log(t.t0);case 11:case"end":return t.stop()}}),t,null,[[0,8]])}))),e}return Object(u.a)(n,[{key:"componentDidMount",value:function(){this.getMovies(),console.log("here")}},{key:"render",value:function(){var e=this.state,t=e.isLoading,n=e.movies;e.search;return Object(s.jsxs)("section",{children:[Object(s.jsx)("h1",{className:"header",children:"Download Torrent Movies!"}),Object(s.jsx)("form",{action:"",onSubmit:this.searchMovie}),Object(s.jsx)("input",{type:"text",name:"search",id:"search",onKeyPress:this.searchMovie}),Object(s.jsx)("div",{className:"container",children:t?Object(s.jsx)("div",{className:"loader",children:Object(s.jsx)("span",{className:"loader__text",children:"Loading.."})}):Object(s.jsx)("div",{className:"movies row",children:n.map((function(e){return Object(s.jsx)(p,{id:e.id,year:e.year,title:e.title,summary:e.summary,poster:e.medium_cover_image,genres:e.genres,torrents:e.torrents},e.id)}))})})]})}}]),n}(r.a.Component));i.a.render(Object(s.jsx)(r.a.StrictMode,{children:Object(s.jsx)(x,{})}),document.getElementById("root"))}},[[45,1,2]]]);
//# sourceMappingURL=main.d1d9ea5a.chunk.js.map