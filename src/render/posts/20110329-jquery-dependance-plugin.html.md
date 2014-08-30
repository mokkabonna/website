---
title: jQuery checkbox/radiobutton dependence plugin
link: http://martinhansen.no/2011/03/29/jquery-dependance-plugin/
author: admin
description: 
post_id: 208
mtime: 2011/03/29 15:44:57
created_gmt: 2011/03/29 13:44:57
comment_status: open
post_name: jquery-dependance-plugin
status: publish
post_type: post
layout: 'default'
---

# jQuery checkbox/radiobutton dependence plugin

I have made a small jQuery plugin that enables you to have checkboxes and radiobuttons that depends on each other in a nested way. The usage is very simple, just take a collection of radios or checkboxes and define an element they depend on. If you check an element that depends on something, the parent will be checked as well. In the same way, if you uncheck a parent element that have children, then the children will be unchecked as well. The plugin is designed to also work with jQuery UI buttons 
```
 $('#fruitlist>li>input').dependsOn('#fruits');
 $('#citruslist input').dependsOn('#citrus');
 
```
 
```
 

  * books
  * fruits 
	* apples
	* citrus fruits 
	  * lemons
	  * oranges
  * pens

```
 **Demo:**

  * books
  * fruits 
	* apples
	* citrus fruits 
	  * lemons
	  * oranges
  * pens
Here is the code: 
```
  /* jQuery checkbox/radiobutton dependance plugin * By Martin Hansen http://martinhansen.no * MIT Licensed. */
 (function($) {
	 $.fn.dependsOn = function(parent) { // build main options before element iteration 
		 if (parent === undefined) {
			 console.log('Parent is required');
			 return;
		 }
		 var opts = {
			 parent: parent,
			 value: null
		 };
		 //If parent is a radiobutton part of a group, make the group the parent 
		 if ($(opts.parent).attr('type') == 'radio') {
			 opts.origparent = $(opts.parent);
			 opts.parent = 'input[name=' + $(opts.parent).attr('name') + ']';
		 }
		 return this.each(function() {
			 var caller = $(this);
			 $.data(this, 'dependsOnOptions', opts);
			 //Store the dependency options 
			 caller.bind('click iterate', function(event) {
				 var parent = (opts.origparent) ? opts.origparent : $(opts.parent);
				 parent.attr('checked', true).trigger('iterate', ['Iterate', 'Event']);
				 if (jQuery.ui) parent.button('refresh');
				 //If jquery ui is loaded try to refesh button 
			 });
			 $(opts.parent).each(function(i) {
				 var pp = $(this);
				 //Do first time checks 
				 var checked = pp.attr('checked');
				 if (checked) {
					 $.fn.dependsOn.check(pp, caller, opts);
				 } //bind for change 
				 pp.change(function(event) {
					 $.fn.dependsOn.check($(this), caller, opts);
				 });
			 });
		 });
	 };
	 $.fn.dependsOn.check = function(parent, child, opts) {
		 if (!parent.is(':checked') || !$(opts.origparent).is(':checked')) {
			 child.attr('checked', false).change();
			 //uncheck the checked child, and trigger the change event so that any potential grandchildren also gets updated 
			 if (jQuery.ui) parent.button('refresh');
			 //If jquery ui is loaded try to refesh button 
		 }
	 };
 })(jQuery);

 
```
 On github: <https://github.com/mokkabonna/jQuery-dependency> Edit:updated the code to use .is(':checked') instead of .attr('checked'), as jQuery 1.6.3 returns 'checked' instead of true. Thanks to "all" in the comments for making me aware of if.

## Comments

**[all](#2441 "2011-09-09 17:28:44"):** Hello. I've tried the plugin but somehow it doesn't work. Could you please see this page http://web-dev.5bg.info/add_article.php

**[Martin](#2443 "2011-09-11 12:07:13"):** Thanks for letting me know, I have fixed the code and added an edit note.

**[all](#2444 "2011-09-11 12:49:08"):** thanks for the reply but still when i change the category e.g OTHER (and subcat World) to "????????" the World subcat remains checked. On your example that changes also

**[Martin](#2445 "2011-09-13 01:06:37"):** I'm not 100% sure I understand what you mean. In your example you still use the old version of the script. Update and it should work fine.

**[Exercise over 50 Newcastle](#2837 "2012-02-22 12:10:42"):** **... [Trackback]...** [...] Informations on that Topic: martinhansen.no/2011/03/29/jquery-dependance-plugin/ [...]...

**[tatuaggi fiori](#2846 "2012-02-25 15:32:30"):** **... [Trackback]...** [...] Informations on that Topic: martinhansen.no/2011/03/29/jquery-dependance-plugin/ [...]...

