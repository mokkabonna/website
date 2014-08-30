---
title: IIS and skype = trouble
link: http://martinhansen.no/2009/10/20/iis-and-skype-trouble/
author: admin
description: 
post_id: 167
created: 2009/10/20 14:07:30
created_gmt: 2009/10/20 12:07:30
comment_status: open
post_name: iis-and-skype-trouble
status: publish
post_type: post
---

# IIS and skype = trouble

Do you have a problem starting a website on your developer machine but you get an error saying something like: 

> The process cannot access the file because it is being used by another process? 

Is your website set to run on port 80? Then ask yourself, are you running skype? If so, skype is probably the reason for this error. Skype is by default configured to use port 80 and 443 as alternatives to the standard port. Remove that under Settings -> advanced -> connections -> Use port 80 and 443 as alternatives for incoming connections. I always seem to get that error whenever I do a reinstall of windows etc. but it always take me 5-10 min to realize that is the error :P

## Comments

**[Ana](#2326 "2009-10-21 23:00:23"):** I've just ended up in the middle of invalid memory.

**[Martin](#2327 "2009-10-21 23:56:15"):** :)

