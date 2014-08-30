---
title: Community server REST API cache bug
link: http://martinhansen.no/2009/06/02/community-server-api-bug/
author: admin
description: 
post_id: 128
mtime: 2009/06/02 18:57:31
created_gmt: 2009/06/02 16:57:31
comment_status: open
post_name: community-server-api-bug
status: publish
post_type: post
layout: 'default'
---

# Community server REST API cache bug

I've been working with the community serverAPI lately and came across this bug: It seems when doing a request for users with search parameters it does not cache correctly on all input parameters.  Specifically the id parameter. I try doing the following request: `GET /api/membership.ashx/users/?id=2100,2200,2201` This gives me the user with id 2100, 2200 and 2201 But if you try something similar again before 30 sec (the time it cache the results), with different userids, then you get the same result as the first query returned: `GET /api/membership.ashx/users/?id=2101,3000,3001` returns the same So what is up with that? The bug is not in the client library (since I did this in fiddler), and neither the server side API component it seems. Using [reflector](http://www.red-gate.com/products/reflector/) I found that the  problem is in the generation of the cachekey in the UserQuery object in CS itself: 
```
 public string Key {
	 get {
		 return string.Format("PI{0}PS{1}SB{2}SO{3}ST{4}SUN{5}S{6}H{7}SID{8}RID{9}SEN{10}JD{11}JC{12}PD{13}PC{14}SCO{15}UN{16}EP{17}",
			 new object[] {
				 this.PageIndex.ToString(),
				 this.PageSize.ToString(),
				 this.SortBy.ToString(),
				 this.Order.ToString(),
				 this.SearchText,
				 this.SearchUsername.ToString(),
				 this.Status.ToString(),
				 this.IncludeHiddenUsers.ToString(),
				 CSContext.Current.SettingsID.ToString(),
				 this.RoleID.ToString(),
				 this.SearchEmail.ToString(),
				 this.JoinedDate.ToString(),
				 this.JoinedDateComparer.ToString(),
				 this.LastPostDate.ToString(),
				 this.LastPostDateComparer.ToString(),
				 this.SortClauseOverride, (this.Usernames == null) ? "" : string.Join(",", this.Usernames),
				 this.ExtendedParameters.ToString()
			 });
	 }
 }
```
 The ID's aren't included. I have [posted](http://dev.communityserver.com/forums/p/506815/648880.aspx) at the community server forums, and they have confirmed the problem, so let's hope it is fixed in the next version. For now if you want several users, you have to either request by name/email i.e. If you have to use the ID, you just have to hit the endpoint `GET /api/membership.ashx/users/[userid]` for each user. Or if you don't need the pagesize component (if you want all anyway) you could supply that uniquely for the 30 sec period of the cache, thus giving you fresh data. This is not completely safe though. See my [post](http://dev.communityserver.com/forums/p/506815/648880.aspx) over at the community server forums for my suggestion.
