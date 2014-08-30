---
title: Dual screen flash fullscreen fix

author: admin
post_id: 52
mtime: 2009/04/21 19:14:06

slug: dual-monitor-flash-fullscreen-fix
status: publish
post_type: post
layout: 'default'
---

# Dual screen flash fullscreen fix

If you have 2 monitors connected to your PC you have probably tried to look at youtube, or any other flash based video site, in fullscreen on the one monitor and then do something else on the other monitor. If you try this then flash exits fullscreen. Bummer. But do not despair, here is a youtube video that shows you how to fix that. 

You would need to know what a HEX editor is and how to use it, if not leave me a comment and I'll elaborate. This is great!

## Comments

**[sherifffruitfly](#2301 "2009-06-13 22:25:36"):** I went to 00136340h in ultraedit's hex editor, and don't find the value you mentioned. Any idea what I'm doing wrong?

**[Martin](#2302 "2009-06-15 16:58:01"):** What version of flash do you have? You can find that out by going [here](http://www.adobe.com/software/flash/about/). Also what browser are you using, and where was the .dll file you edited located?

**[Ed](#2308 "2009-06-26 22:28:42"):** Ok - Couldn't find npswf32.dll at first. Did a search and foung it in the common files folder. Did the edit, saved, and restarted. Still wouldn't work (fullscreen went away on 2nd monitor when click on 1st monitor). Uninstalled all Adobe products and restarted, ran my registry cleaner and restarted, then when to adobe's site and installed Flash player. Now the npswf32.dll file is not anywhere. I am running IE8 and I don't know if that makes a dif or not. Got rid of cable and hooked up 32" CRT as second monitor so can watch TV programs and such online. Any help is appreciated.

**[Walkar](#2304 "2009-06-18 04:00:06"):** Okay, I have flash version 10,0,2,54, I'm using Firefox version 3.0.11, the site I'm getting the video from is Megavideo, and the .dll file is located at C:\WINDOWS\system32\macromed\flash\NPSWF32.dll, but the string located at $136340(I'm using the open source hex editor XVI32) is 09. Now, there is an instance of the hex string 74 at the location $13633A. So, do I edit the 74, the 09, or do I not do anything at all? Can anyone help?

**[Martin](#2305 "2009-06-18 11:11:26"):** Well, you should probably upgrade first then, as the video says, it need to be either 10.0.22.87 or 9.0.124.0 I didn't make the video, just blogged about it. First try to update your flash to the latest version (which is 10.2.22.87)

**[Walkar](#2306 "2009-06-18 18:11:03"):** Thank you very much, I'll be trying that now.

