---
title: Format your json with userscript
link: http://martinhansen.no/2011/09/08/format-your-json-with-userscript/
author: admin
description: 
post_id: 254
created: 2011/09/08 20:56:02
created_gmt: 2011/09/08 18:56:02
comment_status: open
post_name: format-your-json-with-userscript
status: publish
post_type: post
---

# Format your json with userscript

I have created a very small userscript for opera (might work ok with other browsers) that formats /indents/ beautifies the JSON data in a document if it's only JSON there. For opera to open the JSON by itself and this to work (the default is to present it as a download), you will have to enable that in opera. Go to preferences -> advanced -> downloads -> Add Mimetype: application/json Select open with opera That will result in your JSON looking like this in the browser: ![](../images/large.png) 
```
 //== UserScript == 
 // @name JSON formatter 
 // @version 1.0 
 // @description Formats JSON if the document only contains JSON 
 // @compability Only tested with Opera, might work with others 
 // @author Martin Hansen 
 // @website http://martinhansen.no 
 // ==/UserScript== 
 
 (function(){ var indentation = 4; //Change this to vary the indentation
	 var pre = document.querySelector('body pre:only-child');
	 if (!pre) return; //Don't do anything if this don't seem to be a json only document
	 try {
		 pre.innerHTML = JSON.stringify(JSON.parse(pre.innerHTML), null, indentation);
	 } catch (e) {
		 console.log(e);
	 }
 })();
 
```
   
Either save the sourcecode directly from here, or get it from [userscripts.org](http://userscripts.org/scripts/show/112472)

## Comments

**[Paul Fenwick](#3133 "2012-12-04 14:26:23"):** Works perfectly in Firefox/Greasemonkey, and just made my life much, much easier! Thank you!

