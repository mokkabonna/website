---
title: IIS and skype = trouble

author: admin
mtime: 2009/10/20 14:07:30

slug: iis-and-skype-trouble
layout: 'default'
---

# IIS and skype = trouble

Do you have a problem starting a website on your developer machine but you get an error saying something like: 

> The process cannot access the file because it is being used by another process? 

Is your website set to run on port 80? Then ask yourself, are you running skype? If so, skype is probably the reason for this error. Skype is by default configured to use port 80 and 443 as alternatives to the standard port. Remove that under Settings -> advanced -> connections -> Use port 80 and 443 as alternatives for incoming connections. I always seem to get that error whenever I do a reinstall of windows etc. but it always take me 5-10 min to realize that is the error :P

## Comments

**[Ana](#2326 "2009-10-21 23:00:23"):** I've just ended up in the middle of invalid memory.

**[Martin](#2327 "2009-10-21 23:56:15"):** :)

