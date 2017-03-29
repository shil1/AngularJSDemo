/// <reference path="C:\Users\shsood\Documents\Visual Studio 2015\Projects\AngularJSDemo\AngularJSDemo\default.html" />
(function () {
    'use strict';


    angular
    .module("myApp", ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', registerRoutes])
    .run(function ($state,$rootScope) {
        $rootScope.$state = $state;
    })
    .controller("DemoObject", demoObject);
    function demoObject() {
        var self = this;
        self.friends = [
             { name: 'John', age: 25, gender: 'boy' },
             { name: 'Jessie', age: 30, gender: 'girl' },
             { name: 'Johanna', age: 28, gender: 'girl' },
             { name: 'Joy', age: 15, gender: 'girl' },
             { name: 'Mary', age: 28, gender: 'girl' },
             { name: 'Peter', age: 95, gender: 'boy' },
             { name: 'Sebastian', age: 50, gender: 'boy' },
             { name: 'Erika', age: 27, gender: 'girl' },
             { name: 'Patrick', age: 40, gender: 'boy' },
             { name: 'Samantha', age: 60, gender: 'girl' }
        ];
        self.addName = function () {

            var obj = {
                name: self.name,
                age: self.age,
                gender: self.gender
            }
            self.friends.push(obj);
            self.name = "";
            self.age = "";
            self.gender = "";
        }
        self.remove = function (name) {
            for (var i = 0; i < self.friends.length; i++) {
                if (self.friends[i].name === name) {
                    self.friends.splice(i, 1);
                }
            }

        }

    }
   
    function registerRoutes($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/landing");

        $stateProvider
          .state('landing', {
              url: "/landing",
              templateUrl: "wwwroot/partials/landing.html"
          })
          .state('secondstep', {
              url: "/secondstep",
              templateUrl: "wwwroot/partials/component1.html"
          })
          .state('firststep', {
              url: "/firststep",
              templateUrl: "wwwroot/partial/component2.html"
          })
      
    }

})(angular.module);