var env = {};

if(window){
    Object.assign(env, window.__env);
}

var ngModule =  angular.module("moviesModule",[
    "ngRoute","ui-notification"
]);

ngModule.constant('__env', env);
