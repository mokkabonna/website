---
title: Create hierarchical objects from flat data
link: http://martinhansen.no/2012/02/19/create-hierarchical-objects-from-flat-data/
author: admin
description: 
post_id: 279
mtime: 2012/02/19 22:17:23
created_gmt: 2012/02/19 20:17:23
comment_status: open
post_name: create-hierarchical-objects-from-flat-data
status: publish
post_type: post
layout: 'default'
---

# Create hierarchical objects from flat data

Typically when you have a menu or similar, you might have it organized as following, with several levels hierarchical: 
	
	
	Home
	 - Products
	  - Hardware
	 - About us
	

Let's say you get the data from the server in JSON format like this 
```
 var menudata = [{
	id: 1,
	name: 'Frontpage',
	parentId: null
}, {
	id: 2,
	name: 'Products',
	parentId: 1
}, {
	id: 3,
	name: 'Hardware',
	parentId: 2
}, {
	id: 4,
	name: 'About us',
	parentId: 1
}];

```
 To make this structured in the desired way, I added a method ByHierarchy to [linq.js](http://linqjs.codeplex.com/), an excellent javascript library for easy manipulation of data. You use it like this: 
```
 Enumerable.From(menudata).ByHierarchy(function(d) {
	 return d.parentId == null;
 }, function(parent, child) {
	 return parent.id == child.parentId;
 }).ToArray();
 
```
 The first parameter determines what elements should be on the first level. In this example we want all elements that have no parent to be on the first level. The second parameter tells you how to connect the deeper levels. The above code will result in the following: 
```
 [{
	 "item": {
		 "id": 1,
		 "name": "Frontpage",
		 "parentId": null
	 },
	 "level": 1,
	 "children": [{
		 "item": {
			 "id": 2,
			 "name": "Products",
			 "parentId": 1
		 },
		 "level": 2,
		 "children": [{
			 "item": {
				 "id": 3,
				 "name": "Hardware",
				 "parentId": 2
			 },
			 "level": 3,
			 "children": []
		 }]
	 }, {
		 "item": {
			 "id": 4,
			 "name": "About us",
			 "parentId": 1
		 },
		 "level": 2,
		 "children": []
	 }]
 }]
```
 (Note that the object on each level also will have a function called "getParent", that will return the parent if it exists, here it is not visible as this is serialized using JSON.stringify, which excludes functions) You can also use this in other ways, say an array of numbers: 
```
Enumerable.From([2, 4, 5, 9, 3, 25, 16, 64, 8, 81]).ByHierarchy(function(d) {
	return d < 10;
}, function(parent, child) {
	return parent * parent == child;
});
```
 This will result in a root level of all the numbers less than 10 and the children will be any number that is the parent number squared, and their children will be the same etc. until there is no more numbers. ByHierarchy works very well in combination with the already existing methods CascadeDepthFirst and CascadeBreadthFirst. Here is an example with CascadeDepthFirst: 
```
Enumerable.From([2, 4, 5, 9, 3, 25, 16, 64, 8, 81]).ByHierarchy(function(d) {
	return d < 10;
}, function(parent, child) {
	return parent * parent == child;
});
```
 (The first parameter to CascadeDepthFirst is the parameter that holds the children, and the other is what to select from each child) This will produce the following : 
```
 [2, 4, 16, 3, 9, 81, 4, 16, 5, 25, 8, 64, 9, 81] 
```
 Be aware that any method like OrderBy or Where etc is only applied to the top level. Here is an example with Where: 
```
Enumerable.From([2, 4, 5, 9, 3, 25, 16, 64, 8, 81]).ByHierarchy(function(d) {
	return d < 10;
}, function(parent, child) {
	return parent * parent == child;
}).Where('$.item < 4').ToArray();
```
 This will filter so that we only get 2, and 3 at the root level. However the children will still contain 4, 16 and 9, 81. However if you change the code as follows then you will get only children less than 4 (none in this case). 
```
return parent * parent === child && child < 4;
```

## All parameters 

 **firstLevel **\- elements that matches this condition will be on the first level 
 **connectBy **\- if this condition is met the item will be added as a child to the parent, be aware of possible endless loops. returning true always will create endless children and fail. This method receives 2 arguments, parent, and child 
 **orderBy **\- a order expression to apply to the children at the time of creating the hierarchy. This does not sort the top level as well, that you have to do after. 
 **ascending **\- leave out or set to true for ascending sort or false to use descending sort. The method will create new objects that have this structure: 
```
{
	level: indicating the level of the current item,
	item: the original underlying data,
	children: contains any children,
	getParent: a method that returns the parent if any
}
```
 
 Let me know if you have some problem or general feedback and I will try to answer them. I might also submit a pull request to the original project, and maybe they will include it as a standard method. 

## More examples

### jQuery version: 

```
  * Fruits
  * Clothes
  * Citrus fruits
  * Plum fruits
  * Red plum
  * Yellow plum
  * Lemon
  * Lime
  * Orange
```
 
```
$('#flatlists li').toEnumerable().ByHierarchy(function(d) {
	return d.parent().attr('id') == 'categories';
}, function(parent, child) {
	return parent.attr('data-subcategory') == child.parent().attr('id');
}).CascadeDepthFirst('$.children').Select('$').ForEach(function(list) {
	list.item.css('padding-left', list.level * 10 + 'px');
	$('#resultlist').append(list.item);
});
```

Result: ![](../images/listexample.png)

The forked project is hosted at codeplex (since the original is a codeplex project) You can find it here <http://linqjs.codeplex.com/SourceControl/network/forks/mokkabonna/ByHierarchy> The code is inspired by [this](http://stackoverflow.com/a/3758955/94394) similar LINQ C# method in an answer by Thomas Levesque over at stackoverflow.
