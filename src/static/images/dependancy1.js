/* jQuery checkbox/radiobutton dependance plugin
* By Martin Hansen http://martinhansen.no
* MIT Licensed.
*/
(function($) {
  $.fn.dependsOn = function(parent) {       
    // build main options before element iteration     
    if(parent === undefined){ console.log('Parent is required'); return;   }        

    var opts = {parent: parent, value: null};

     //If parent is a radiobutton part of a group, make the group the parent
    if($(opts.parent).attr('type') == 'radio'){
      opts.origparent  = $(opts.parent);
      opts.parent = 'input[name=' +$(opts.parent).attr('name') +']';          
    }  
   
    return this.each(function() {
    var caller = $(this);
    $.data(this, 'dependsOnOptions', opts);//Store the dependency options
    
    caller.bind('click iterate', function(event){
      var parent = (opts.origparent) ? opts.origparent : $(opts.parent);
      parent.attr('checked', true).trigger('iterate', ['Iterate', 'Event']);
      if (jQuery.ui)parent.button('refresh'); //If jquery ui is loaded try to refesh button
    });              

    $(opts.parent).each(function(i){
      var pp = $(this);
      //Do first time checks
      var checked = pp.attr('checked'); 
      if(checked){
        $.fn.dependsOn.check(pp, caller, opts);            
      }
      //bind for change
      pp.change(function(event){
        $.fn.dependsOn.check($(this), caller, opts);            
      });
    });
   
   });
  };     

   $.fn.dependsOn.check = function(parent, child, opts){
    if (!parent.is(':checked') || !$(opts.origparent).is(':checked')) {
      child.attr('checked', false).change(); //uncheck the checked child, and trigger the change event so that any potential grandchildren also gets updated
      if (jQuery.ui)parent.button('refresh'); //If jquery ui is loaded try to refesh button
    }
   };
})(jQuery);