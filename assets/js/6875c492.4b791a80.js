(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8610,7420],{43146:function(e,a,t){"use strict";t.d(a,{Z:function(){return h}});var r=t(67294),n=t(86010),l=t(3905),s=t(24973),i=t(36742),c=t(3009),o=t(41217),m="blogPostTitle_GeHD",d="blogPostDate_fNvV",u=t(86700);var h=function(e){var a,t,h=(a=(0,u.c2)().selectMessage,function(e){var t=Math.ceil(e);return a(t,(0,s.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:t}))}),g=e.children,p=e.frontMatter,E=e.metadata,v=e.truncated,f=e.isBlogPostPage,b=void 0!==f&&f,N=E.date,_=E.formattedDate,k=E.permalink,Z=E.tags,T=E.readingTime,w=p.author,x=p.title,P=p.image,y=p.keywords,S=p.author_url||p.authorURL,I=p.author_title||p.authorTitle,M=p.author_image_url||p.authorImageURL;return r.createElement(r.Fragment,null,r.createElement(o.Z,{keywords:y,image:P}),r.createElement("article",{className:b?void 0:"margin-bottom--xl"},(t=b?"h1":"h2",r.createElement("header",null,r.createElement(t,{className:(0,n.Z)("margin-bottom--sm",m)},b?x:r.createElement(i.Z,{to:k},x)),r.createElement("div",{className:"margin-vert--md"},r.createElement("time",{dateTime:N,className:d},_,T&&r.createElement(r.Fragment,null," \xb7 ",h(T)))),r.createElement("div",{className:"avatar margin-vert--md"},M&&r.createElement(i.Z,{className:"avatar__photo-link avatar__photo",href:S},r.createElement("img",{src:M,alt:w})),r.createElement("div",{className:"avatar__intro"},w&&r.createElement(r.Fragment,null,r.createElement("h4",{className:"avatar__name"},r.createElement(i.Z,{href:S},w)),r.createElement("small",{className:"avatar__subtitle"},I)))))),r.createElement("div",{className:"markdown"},r.createElement(l.Zo,{components:c.Z},g)),(Z.length>0||v)&&r.createElement("footer",{className:"row margin-vert--lg"},Z.length>0&&r.createElement("div",{className:"col"},r.createElement("strong",null,r.createElement(s.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),Z.map((function(e){var a=e.label,t=e.permalink;return r.createElement(i.Z,{key:t,className:"margin-horiz--sm",to:t},a)}))),v&&r.createElement("div",{className:"col text--right"},r.createElement(i.Z,{to:E.permalink,"aria-label":"Read more about "+x},r.createElement("strong",null,r.createElement(s.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More")))))))}},95601:function(e,a,t){"use strict";t.d(a,{Z:function(){return u}});var r=t(67294),n=t(86010),l=t(36742),s="sidebar_2ahu",i="sidebarItemTitle_2hhb",c="sidebarItemList_2xAf",o="sidebarItem_2UVv",m="sidebarItemLink_1RT6",d="sidebarItemLinkActive_12pM";function u(e){var a=e.sidebar;return 0===a.items.length?null:r.createElement("div",{className:(0,n.Z)(s,"thin-scrollbar")},r.createElement("h3",{className:i},a.title),r.createElement("ul",{className:c},a.items.map((function(e){return r.createElement("li",{key:e.permalink,className:o},r.createElement(l.Z,{isNavLink:!0,to:e.permalink,className:m,activeClassName:d},e.title))}))))}},69404:function(e,a,t){"use strict";t.r(a);var r=t(67294),n=t(48648),l=t(43146),s=t(36742),i=t(95601),c=t(24973),o=t(86700);function m(e){var a,t=e.tagName,n=e.count,l=(a=(0,o.c2)().selectMessage,function(e){return a(e,(0,c.I)({id:"theme.blog.post.plurals",description:'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One post|{count} posts"},{count:e}))});return r.createElement(c.Z,{id:"theme.blog.tagTitle",description:"The title of the page for a blog tag",values:{nPosts:l(n),tagName:t}},'{nPosts} tagged with "{tagName}"')}a.default=function(e){var a=e.metadata,t=e.items,d=e.sidebar,u=a.allTagsPath,h=a.name,g=a.count;return r.createElement(n.Z,{title:'Posts tagged "'+h+'"',description:'Blog | Tagged "'+h+'"',wrapperClassName:o.kM.wrapper.blogPages,pageClassName:o.kM.page.blogTagsPostPage,searchMetadatas:{tag:"blog_tags_posts"}},r.createElement("div",{className:"container margin-vert--lg"},r.createElement("div",{className:"row"},r.createElement("div",{className:"col col--3"},r.createElement(i.Z,{sidebar:d})),r.createElement("main",{className:"col col--7"},r.createElement("h1",null,r.createElement(m,{count:g,tagName:h})),r.createElement(s.Z,{href:u},r.createElement(c.Z,{id:"theme.tags.tagsPageLink",description:"The label of the link targeting the tag list page"},"View All Tags")),r.createElement("div",{className:"margin-vert--xl"},t.map((function(e){var a=e.content;return r.createElement(l.Z,{key:a.metadata.permalink,frontMatter:a.frontMatter,metadata:a.metadata,truncated:!0},r.createElement(a,null))})))))))}},3009:function(e,a,t){"use strict";t.d(a,{Z:function(){return u}});var r=t(67294),n=t(36742),l=t(50210),s=t(79973),i=t(86010),c=t(24973),o=t(86700),m="enhancedAnchor_2LWZ",d=function(e){return function(a){var t,n=a.id,l=(0,s.Z)(a,["id"]),d=(0,o.LU)().navbar.hideOnScroll;return n?r.createElement(e,l,r.createElement("a",{"aria-hidden":"true",tabIndex:-1,className:(0,i.Z)("anchor",(t={},t[m]=!d,t)),id:n}),l.children,r.createElement("a",{className:"hash-link",href:"#"+n,title:(0,c.I)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"#")):r.createElement(e,l)}},u={code:function(e){var a=e.children;return(0,r.isValidElement)(a)?a:a.includes("\n")?r.createElement(l.Z,e):r.createElement("code",e)},a:function(e){return r.createElement(n.Z,e)},pre:function(e){var a,t=e.children;return(0,r.isValidElement)(null==t||null==(a=t.props)?void 0:a.children)?null==t?void 0:t.props.children:r.createElement(l.Z,(0,r.isValidElement)(t)?null==t?void 0:t.props:{children:t})},h1:d("h1"),h2:d("h2"),h3:d("h3"),h4:d("h4"),h5:d("h5"),h6:d("h6")}},6979:function(e,a,t){"use strict";var r=t(67294),n=t(94184),l=t.n(n),s=t(52263),i=t(5977),c=t(2644);a.Z=function(e){var a=(0,r.useState)(!1),n=a[0],o=a[1],m=(0,r.useRef)(null),d=(0,s.default)().siteConfig,u=(void 0===d?{}:d).themeConfig.algolia,h=(0,i.k6)(),g=(0,c.Z)().navigateToSearchPage;var p=function(e){void 0===e&&(e=!0),n||Promise.all([Promise.all([t.e(4362),t.e(5525)]).then(t.t.bind(t,14362,23)),Promise.all([t.e(532),t.e(3343)]).then(t.bind(t,53343))]).then((function(a){var t=a[0].default;o(!0),window.docsearch=t,function(e){window.docsearch({appId:u.appId,apiKey:u.apiKey,indexName:u.indexName,inputSelector:"#search_input_react",algoliaOptions:u.algoliaOptions,autocompleteOptions:{openOnFocus:!0,autoselect:!1,hint:!1},handleSelected:function(e,a,t){a.stopPropagation();var r=document.createElement("a");r.href=t.url;var n="#__docusaurus"===r.hash?""+r.pathname:""+r.pathname+r.hash;h.push(n)}}),e&&m.current.focus()}(e)}))},E=(0,r.useCallback)((function(){p(),n&&m.current.focus(),e.handleSearchBarToggle(!e.isSearchBarExpanded)}),[e.isSearchBarExpanded]),v=(0,r.useCallback)((function(){e.handleSearchBarToggle(!e.isSearchBarExpanded)}),[e.isSearchBarExpanded]),f=(0,r.useCallback)((function(e){var a="mouseover"!==e.type;p(a)})),b=(0,r.useCallback)((function(e){e.defaultPrevented||"Enter"!==e.key||g(e.target.value)}));return r.createElement("div",{className:"navbar__search",key:"search-box"},r.createElement("span",{"aria-label":"expand searchbar",role:"button",className:l()("search-icon",{"search-icon-hidden":e.isSearchBarExpanded}),onClick:E,onKeyDown:E,tabIndex:0}),r.createElement("input",{id:"search_input_react",type:"search",placeholder:"Search","aria-label":"Search",className:l()("navbar__search-input",{"search-bar-expanded":e.isSearchBarExpanded},{"search-bar":!e.isSearchBarExpanded}),onMouseOver:f,onFocus:f,onBlur:v,onKeyDown:b,ref:m}))}}}]);