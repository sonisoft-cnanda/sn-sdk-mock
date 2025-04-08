var Class = {
    create: function() {
      return function() {
          /* This anonymous function will execute in the scope of the caller
             in interpreted mode. The initalize method is a utility we provide
             for giving a hook into the creation of a script include in scope.
             Many global script includes do not have an initialize function, and
             therefore we should only call this.initialize when present.
           */
          if (this.initialize)
              this.initialize.apply(this, arguments);
      };
    }
  };
  
  /* 
   * Old method left here for compatibility purposes. All future extension should use "extendsObject" method.
   */
  Object.extend = function(destination, source) {
    for (var property in source) {
      destination[property] = source[property];
    }
    return destination;
  }
  
  Object.extendsObject = function(destination, source) {
    destination = Object.clone(destination.prototype);
    
    for (var property in source) {
      destination[property] = source[property];
    }
    return destination;
  }
  
  Object.clone = function(obj) {
    var clone = Class.create();
      
    for (var property in obj) {
      clone[property] = obj[property];
    }
      
    return clone;
  }

  module.exports = Class;