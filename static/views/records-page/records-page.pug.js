function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function recordsPageTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug":"tr\n    th User\n    th Number\n    th Score\neach user in locals\n    tr\n        td= user.login\n        td= user.numberOfGames\n        td= user.record\n\n"};
;pug_debug_line = 1;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 2;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 2;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + "User\u003C\u002Fth\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 3;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + "Number\u003C\u002Fth\u003E";
;pug_debug_line = 4;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + "\u003Cth\u003E";
;pug_debug_line = 4;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + "Score\u003C\u002Fth\u003E\u003C\u002Ftr\u003E";
;pug_debug_line = 5;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
// iterate locals
;(function(){
  var $$obj = locals;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var user = $$obj[pug_index0];
;pug_debug_line = 6;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 7;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 7;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = user.login) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 8;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 8;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = user.numberOfGames) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 9;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 9;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = user.record) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var user = $$obj[pug_index0];
;pug_debug_line = 6;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + "\u003Ctr\u003E";
;pug_debug_line = 7;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 7;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = user.login) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 8;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 8;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = user.numberOfGames) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E";
;pug_debug_line = 9;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + "\u003Ctd\u003E";
;pug_debug_line = 9;pug_debug_filename = ".\u002Fstatic\u002Fviews\u002Frecords-page\u002Frecords-page.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = user.record) ? "" : pug_interp)) + "\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E";
    }
  }
}).call(this);
} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}