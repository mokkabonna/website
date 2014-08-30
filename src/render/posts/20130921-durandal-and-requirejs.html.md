---
title: Durandal and requirejs

author: admin
mtime: 2013/09/21 16:01:39

slug: durandal-and-requirejs
layout: 'default'
---

# Durandal and requirejs

I've had some problems building my durandal project with grunt-contrib-requirejs and using almond Apparently durandal relies on a custom almond that has the onResourceLoad function. Just wanted to post my r.js config here to help others: 
```
 name: '../bower_components/durandal-almond/almond',
 include: [ 'main'], //in addition list all viewmodels and views here like this 'viewmodels/shell', 'text!views/shell.html' //etc
 insertRequire: ['main'],
 stubModules : ['text'], //important to avoid the toUrl error 
 baseUrl: "app",
 optimize : 'uglify2',
 wrap: true, //important for almond 
 mainConfigFile: "app/main.js",
 out: "app/main-built.js" 
```

I am using bower to handle the dependency on bluespire's custom almond. But They have currently not tagged the changes they did for durandal in almond so make sure you use this in your bower file 

```
 "durandal-almond": "git@github.com:BlueSpire/almond.git#master" 
```


## Comments

**[Eugenio](#3472 "2014-07-09 01:13:55"):** It's hard to find your blog in google. I found it on 17 spot, you should build quality backlinks , it will help you to get more visitors. I know how to help you, just search in google - k2 seo tricks

