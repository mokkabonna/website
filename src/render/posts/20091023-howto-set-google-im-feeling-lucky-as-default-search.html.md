---
title: HowTo: Set google "I'm Feeling Lucky" as default search
link: http://martinhansen.no/2009/10/23/howto-set-google-im-feeling-lucky-as-default-search/
author: admin
description: 
post_id: 163
created: 2009/10/23 18:43:01
created_gmt: 2009/10/23 16:43:01
comment_status: open
post_name: howto-set-google-im-feeling-lucky-as-default-search
status: publish
post_type: post
---

# HowTo: Set google "I'm Feeling Lucky" as default search

URL's suck. When I want to go to Google calendar I want to type just that, or even google cal. Instead of Google dot com slash calendar. When I want to see today's episode of Colbert report, I should be able to type that in the address bar even though the address is colbertnation dot com. Enter Google's "I'm Feeling Lucky" search. Below is a guide to set Google's "I feel lucky" as default search in various browsers: Opera: 

	* Open Google.com, or your favorite Google page.
	* Right click the search field and select "Add custom search"
	* Click details, in the address field you will see something like this:

> http://www.google.com/search?hl=en&source=hp&q=%s&btnG=Google+Search&aq=f&oq=&aqi=

	* Now, change btnG=Google+Search to btnI, so it looks like this:

> http://www.google.com/search?hl=en&source=hp&q=%s&btnI&aq=f&oq=&aqi=

	* Finally check "Use this as default search engine"
Chrome: 
	* Enter options -> Basics ->Default search section, click manage.
	* Select the already existing Google search, click edit, copy the URL.
	* Close, and add new.
	* Type a name and, leave keyword empty, and paste into the URL that which you copied and add &btnI, it should be something like this:

> {google:baseURL}search?{google:RLZ}{google:acceptedSuggestion}{google:originalQueryForSuggestion}sourceid=chrome&ie={inputEncoding}&q=%s&btnI

	* Click ok, and then set as default.
	* You can still search with Google by typing  the keyword (google.com) and then you'll see the search appear under the address bar.

## Comments

**[Roxanna Kreitlow](#2863 "2012-03-08 03:05:47"):** **Websites you should visit......** [...]below you’ll find the link to some sites that we think you should visit[...]...

