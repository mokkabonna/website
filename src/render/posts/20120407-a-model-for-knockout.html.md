---
title: A model for Knockout

author: admin
post_id: 329
mtime: 2012/04/07 18:39:05

slug: a-model-for-knockout
status: publish
post_type: post
layout: 'default'
---

# A model for Knockout

I have created a model for knockout inspired/based off of JavaScriptMVC's Model. Go to the github [project page](https://github.com/mokkabonna/knockout-model) for updated code and documentation 

# Knockout Model

A model for [knockout](https://github.com/SteveSanderson/knockout)

Inspired by and partially based on [JavaScriptMVC's Model](http://javascriptmvc.com/docs.html#!jQuery.Model)

Also uses the jQuery.Class from that project. 

Dependencies:

	* jQuery
	* jQuery Class
	* Knockout
	* Knockout mapping

Built with ASP.NET Web API in mind, so it assumes some conventions:

	* by default all url start with /api
	* urls are made up by the lowercase, pluralized name of the model, Person model => /api/persons
	* Built in conversion of ASP.NET JSON date format \/Date(1224043200000)\/ 
	* the id of the model defaults to Id

**All conventions can however be overridden and you can use it with any server side framework**

## Usage
		
		
		$.KnockoutModel('Person', {}, {});

		

This assumes a full REST way of accessing that model on the server:
		
		
		GET /api/persons //Lists all persons
		GET /api/persons/1 //Get person with id 1
		POST /api/persons //Create a new person
		PUT /api/persons/1 //Update person with id 1
		DELETE /api/persons/1 //Delete person with id 1
		

**Find all**
		
		
		Person.findAll().done(function(persons){
				//do things with the persons array
		});

		

query with parameters (OData url conventions in example)
		
		
		var page = 5,
				pagesize = 10,
		Person.findAll({$top: 10, $skip: 20}).done(function(persons){
				//persons 21-30
		});

		

**Find One**
		
		
		Person.findOne({Id : 3}).done(function(person){
				//do things with person
		});

		

**Create new model**
		
		
		var person =  new Person({ Name:'John', Age: 15 });

		

**Save**
		
		
		person.save().done(function(){
				//person is now updated/created on the server
		});

		

**Destroy**
		
		
		person.destroy().done(function(){
				//person is now deleted on the server
		});

		

**Tracking status**

Every instance will have a property _isModified_ (observable as well) that will change whenever any other observable in the model is changed. This also works with save, when something is saved, the modified status is checked up against the new values returned from the database.

**Mapping**

By default all properties are observable and part of the main object. However you can define specific mapping options that follow standard knockout mapping standards. 

The following example doesn't make observables of the Id, Created and Updated properties.
		
		
		$.KnockoutModel('Person', {
				mapping : {
						'copy' : ['Id', 'Created', 'Updated']
				}
		}, {});

		

If the server returns a model with a childmodel you can also combine models like so:
		
		
		$.KnockoutModel('Address', {
				mapping : {
						'copy' : ['Id'] 
				}
		}, {});

		
		$.KnockoutModel('Person', {
				mapping: {
						'Address': {
								create: function(options) {
										return new Address(options.data)
								}
						}
				}
		}, {});

		

This will make the Address property of Person a separate class, with it's own methods like save, destroy etc. Also on Address, we choose to not make observable of the property Id;


This way you can call save on a person's address to only update that if you please.

## Model options

	* findAll
	* findOne
	* create
	* update
	* destroy

_These methods are automatically created from the model name and api prefix as shown above, however they can be overridden with a templated string. For instance: update : 'POST /api/persons/{Id}' to use POST instead of PUT for updates._

	* apiPrefix : '/admin/api'

		* default : '/api'
	* id : 'id'

		* default : 'Id'

_this is important to set if the id of your model is something else than 'Id', as the existence of it determines determines wheter the model creates or updates when calling save._

	* resourceName : 'fishes'
		* default : model name + 's', person => persons

_The model only does simple pluralization (adds an 's'), in cases where other forms is needed or where you simply want to call the model something else than the service url, set the resourceName property._

**Note:** In case of missing pieces in this simple documentation, your best bet is to check out the [documentation for JavaScriptMVC's model](http://javascriptmvc.com/docs.html#!jQuery.Model) and for mapping specifically check out the documentation for the [mapping plugin](http://knockoutjs.com/documentation/plugins-mapping.html).
