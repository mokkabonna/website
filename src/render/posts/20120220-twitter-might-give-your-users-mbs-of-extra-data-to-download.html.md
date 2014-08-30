---
title: Twitter might give your users MB's of extra data to download
link: http://martinhansen.no/2012/02/20/twitter-might-give-your-users-mbs-of-extra-data-to-download/
author: admin
description: 
post_id: 315
created: 2012/02/20 14:31:17
created_gmt: 2012/02/20 12:31:17
comment_status: open
post_name: twitter-might-give-your-users-mbs-of-extra-data-to-download
status: publish
post_type: post
---

# Twitter might give your users MB's of extra data to download

When someone uploads their profile picture to twitter, twitter has a limitation of 700 KB. Ok. Twitter then compresses the image to something smaller, like a 48x48 px image. The size can typically be a few KB's. Good! 

However twitter does not remove any thumbnail data that is embedded in the image (typically photoshop's fault). This might result in images much much bigger than a few KB's. Fail! This of course causes problems for websites that embed twitter widgets, or any twitter client for that matter, even the twitter website itself. 

I've seen in the wild 48x48 px images that is 500 KB+, if you are unlucky and many people in your twitter widget on your website have used photoshop to crop their images without using "save for web" (which removes the thumbnail data) then your users might end up downloading MB's of unnecessary data. Not to mention that twitter's bandwidth bill goes up because of many images being 100+ times bigger than they need to be. Please fix this twitter. Kthxbye :)
