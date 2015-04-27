---
title: Swappable mock apis for rapid development

author: admin
mtime: 2015/04/27 22:00:00

slug: swappable-mock-apis-for-rapid-development
layout: 'post'
---

I don't like when test environments are being used for development. This because test environments are usually few and that means with many people on the team you are more likely to run into a unstable test environment and mess up for each other.

I think you should keep what you can local and use the test environments when you really need to. Mock your apis and make it easy to test with real apis in any environment. Like test, staging, production or even a different developer running a local version for you to test his feature.

I will show below one way to do this with connect and express, this is what I usually do:

1. Create mock apis for everything that you use in your single page application
    - Makes the feedback cycle during GUI development so much faster than having to use the real apis, you mock whatever scenario you are developing gui for
    - Are not dependant on the apis being developed yet, online or responsive
    - Easy simulation of uncommon scenarios, like error situations, network latency etc etc.
2. Attach those apis using a proxy
    - Allows you to easily swap those apis with any api of the same kind running on any server
    - Solves any cross domain issues


I have my setup like this:

`grunt connect` Starts the static webserver serving my frontend app with all mocks enabled.

Each API is overridable passing the url in as an option, like so: `grunt connect --defaultApi=http://url-to-test-server.com/api-path`

Example setup in a simple gruntfile with comments below. Or see a full working example at https://github.com/mokkabonna/swappable-mock-apis

This could of course be done in various ways, but this is more or less how I have it, although a bit simplified.

```
module.exports = function(grunt) {
  var _ = require('lodash');
  var express = require('express');
  var url = require('url');
  var proxyMiddleware = require('proxy-middleware');

  //define the apis our app uses and the default module for the express server and what port it should start on
  //Also where it is attached on the local server
  var mockServers = {
    defaultApi: {
      attachTo: '/api',
      port: 9101,
      mockServer: './defaultApi.js'
    },
    usersApi: {
      attachTo: '/otherApi',
      port: 9102,
      mockServer: './usersApi.js'
    }
  };

  /**
   * Iterates all our mock servers and sets up a proxy either to the predefined mock
   * or to the supplied url given in the command line arguments
   */
  function injectProxyMiddlewares(middlewares) {
    _.each(mockServers, function(config, name) {

      var overrideUrl = grunt.option(name);

      if (overrideUrl) {
        //jsut attach the url to the normal path
        attachProxy(middlewares, config.attachTo, overrideUrl);
      } else {
        //start normal mock
        startMock(config, name)
        attachProxy(middlewares, config.attachTo, 'http://localhost:' + config.port);
      }
    });
  }

  /**
   * Injects a proxy middleware catching all the requests to route and forwarding them to apiUrl
   */
  function attachProxy(middlewares, route, apiUrl) {
    var proxyConfig = url.parse(apiUrl);
    proxyConfig.route = route;
    //place before other middlewares
    grunt.log.writeln('Forwarding requests to ' + route + ' to ' + apiUrl);
    middlewares.unshift(proxyMiddleware(proxyConfig));
  }

  /**
   * Start the mock according to the mock config
   */
  function startMock(config, name) {
    var mockServer = require(config.mockServer);
    grunt.log.writeln('Starting mock server ' + name + ' on localhost:' + config.port);
    mockServer.listen(config.port);
  }

  grunt.initConfig({
    connect: {
      devServer: {
        options: {
          port: 9001,
          hostname: 'localhost',
          keepalive: true,
          base: [
            'app'
          ],
          middleware: function(connect, options, middlewares) {
            injectProxyMiddlewares(middlewares);
            return middlewares;
          }
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

};
```


If you have many apis consider making predefined named url maps so that you can override them all easily. I have something similar to this setup:

`grunt connect --allApis=staging`
