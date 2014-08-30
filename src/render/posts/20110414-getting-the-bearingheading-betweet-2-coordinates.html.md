---
title: Getting the bearing/heading betweet 2 coordinates

author: admin
post_id: 242
mtime: 2011/04/14 12:33:07

slug: getting-the-bearingheading-betweet-2-coordinates
status: publish
post_type: post
layout: 'default'
---

# Getting the bearing/heading betweet 2 coordinates

Thanks to [rjsteward](http://stackoverflow.com/users/76639/rjsteward) with his [answer](http://stackoverflow.com/questions/1971585/mapping-math-and-javascript) over at stackoverflow.com I have now a simple function for getting the bearing between to coordinates: The function is meant to be used with google maps, so the parameters are google.maps.LatLng objects 
```
 function getBearing(from, to) {
	var lat1 = from.lat() * Math.PI / 180;
	var lon1 = from.lng();
	var lat2 = to.lat() * Math.PI / 180;
	var lon2 = to.lng();
	var dLon = (lon2 - lon1) * Math.PI / 180;
	var y = Math.sin(dLon) * Math.cos(lat2);
	var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
	var bearing = Math.atan2(y, x) * 180 / Math.PI;
	if (bearing < 0) {
	    bearing = bearing + 360;
	}
	return bearing;
 }
```
 This allows you to easily set the heading in the streetview, between your "streetviewman" and the actual position you are trying to see. So that you are looking to that direction from the street. 
```
 map.getStreetView().setPov({
	heading: getBearing(streetViewManPosition, myLocationPosition),
	zoom: 1,
	pitch: 0
 }); 
```
 Resulting in something like this: 
 ![](../images/streetview-heading.png)

## Comments

**[Jonnas Fonini](#2974 "2012-09-11 15:48:49"):** Very useful. Thank you so much!

**[Josef](#3475 "2014-07-17 22:19:37"):** I see a lot of interesting content on your blog. You have to spend a lot of time writing, i know how to save you a lot of time, there is a tool that creates unique, SEO friendly articles in couple of minutes, just search in google - k2 unlimited content

