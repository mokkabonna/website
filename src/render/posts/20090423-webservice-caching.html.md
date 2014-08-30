---
title: Responsive webservice caching using threads

author: admin
post_id: 65
mtime: 2009/04/23 14:15:30


post_name: webservice-caching
status: publish
post_type: post
layout: 'default'
---

# Responsive webservice caching using threads

I worked on a project where I needed to have a user control that got data from a web service, this would slow down the site without proper caching. Usually when I get data from the database I do the caching every  5 minutes, and the person doing the request at that 5 min mark will get a small hit, but this is not a big hit so it's acceptable. 

When dealing with web services though, you will never know how long the request will take, and what about if the service is down? Here is how I did it: In this first code block I check if the cache is in memory and if it is, then just get the object and everything is fine. If not I start a thread and let it  fetch the data for me. 
```
 //Get date from cache or insert in cache 
 if (Page.Cache.Get(fullCacheKey) == null) { //Make sure we just execute 1 thread, so we insert a threadlock value in cache, with a timeout of 1 minute 
		 if (Page.Cache.Get(threadActiveCacheKey) == null) { //Set the threadlock 
				 Page.Cache.Insert(threadActiveCacheKey, true, null, DateTime.Now.AddMinutes(1), System.Web.Caching.Cache.NoSlidingExpiration, System.Web.Caching.CacheItemPriority.Normal, null); //Start a thread to fetch the webservice data, and insert it into cache. 
				 Thread thr = new Thread(delegate() {
						 DoSomeLongstuff();
				 });
				 thr.Start();
		 } //In the meantime show the old cache if (Page.Cache[backupCacheKeyPrefix + fullCacheKey] != null) { someObject = Page.Cache[backupCacheKeyPrefix + fullCacheKey];
 }
 } else {
		 someObject = Page.Cache[fullCacheKey];
		 //Remove the old cache here Page.Cache.Remove(backupCacheKeyPrefix + fullCacheKey);
 } //Now databind or do whatever you want with the object

```
 This means the very first user will not get the user control displayed, in my case that just means me, as this just happens whenever I shut down the server or app-pool. (or if the slidingcache later explained expires) This is acceptable in my case, if not you would have to make sure the very first request waits for the thread with Thread.Join. Next up is the code that takes a while (probably under a sec, but still adds to the load time of the page).

 What I do here is the web service call, I have removed that part for this example. But at the end I insert the result into memory with a 5 minute absolute expiration. I also remove the "threadlock" set earlier, I put this in so that I will not have several requests initiating their own thread trying to accomplish the very same thing. 
```
 private void DoSomeLongstuff() { //Do your Webservice call here, the part that takes time //Create a CacheItemRemovedCallback to be called when the "real" cache is removed CacheItemRemovedCallback onRemove = new CacheItemRemovedCallback(InsertIntoSafetyCache);
 //Insert the result object into cache and remove the "threadlock" Page.Cache.Insert(fullCacheKey, someObject, null, DateTime.Now.AddMinutes(5), System.Web.Caching.Cache.NoSlidingExpiration, System.Web.Caching.CacheItemPriority.Low, onRemove);
 Page.Cache.Remove(threadActiveCacheKey);
 } 
```
 Notice also the last parameter of the Cache.Insert method, this is what get's called whenever the cache is deleted, in other words every 5 minutes. This simply insert the very same cache that was deleted into memory again, with another key. I have set this to a 30 minute sliding expiration. So if it is accessed at least once every 30 minutes it is kept alive. 
```
 //When the "real" cache is removed, insert the object into cache again, but with a different key and different expiration. Used here is sliding expiration of 30 minutes.
 private void InsertIntoSafetyCache(String cacheKey, Object obj, System.Web.Caching.CacheItemRemovedReason reason) {
		Page.Cache.Insert(backupCacheKeyPrefix + cacheKey, obj, null, System.Web.Caching.Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(30), System.Web.Caching.CacheItemPriority.Low, null);
 }
```
 This is what happens: 

	* When the 5 minutes are up I still have the object in memory, but with another name.
	* I show the old cache while the new one is fetching it's new data.
	* When the new one has data, I delete the old one.
	* If the web service is down I will have data in memory for a long time, so I will at least show something. 30 minutes, and long after that because it is refreshed at each access.
	* At each request I will try to access the web service again (well as long as I don't have a thread running)
	* When the web service is up again, I will get it's data and delete the old cache
So what do you think?
