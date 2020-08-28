const app = angular.module('app', ['ui.router']);
app.config([
  '$stateProvider',
  '$locationProvider',
  '$urlMatcherFactoryProvider',
  '$urlRouterProvider',
  function (
    $stateProvider,
    $locationProvider,
    $urlMatcherFactoryProvider,
    $urlRouterProvider
  ) {
    $urlMatcherFactoryProvider.caseInsensitive(true);
    $urlMatcherFactoryProvider.strictMode(false);

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('/', {
        url: '/',
        templateUrl: 'base.html',
      })
      .state('about', {
        url: '/about',
        views: {
          main: {
            templateUrl: 'about.html',
          },
        },
      })
      .state('todo', {
        url: '/todo',
        views: {
          main: {
            templateUrl: 'todo.html',
          },
        },
      })
      .state('watch', {
        url: '/watch',
        views: {
          main: {
            templateUrl: 'watch.html',
          },
        },
      })
      .state('animate', {
        url: '/animate',
        views: {
          main: {
            templateUrl: 'animate.html',
          },
        },
      });
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false,
    // });
  },
]);
app.controller('navController', [
  '$scope',
  function ($scope) {
    $scope.heading = 'Directive + ui-router';
  },
]);

app.controller('sidebarController', [
  '$scope',
  function ($scope) {
    $scope.heading = 'sidebar';
    $scope.links = [
      {
        state: 'about',
        name: 'about',
      },
      {
        state: 'todo',
        name: 'todo',
      },
      {
        state: 'watch',
        name: 'watch',
      },
      {
        state: 'animate',
        name: 'animate',
      },
    ];
  },
]);

app.directive('sidebar', function () {
  return {
    restrict: 'E',
    templateUrl: 'sidebar.html',
    controller: 'sidebarController',
  };
});

//todos
app.controller('todoController', [
  '$scope',
  function ($scope) {
    $scope.todos = [];
    $scope.submit = function () {
      if (!$scope.name) return;
      let item = {
        index: $scope.todos.length,
        title: $scope.name,
        time: new Date(),
        status: false,
      };
      $scope.todos.push(item);
      $scope.name = '';
    };

    //custom filter function
    $scope.statusFilter = function (val) {
      return function (item) {
        // console.log(item);
        return item.status === val;
      };
    };

    $scope.remove = function (index) {
      $scope.todos[index].status = true;
    };

    $scope.add = function (index) {
      $scope.todos[index].status = false;
    };
  },
]);

// watch

app.controller('watchArrayController', [
  '$scope',
  function ($scope, $timeout) {
    $scope.letters1 = [1, 2, 3];
    $scope.letters2 = [1, 2, 3];
    $scope.letters3 = [1, 2, 3];
    $scope.letters4 = [1, 2, 3];

    $scope.msg1 = null;
    $scope.msg2 = null;
    $scope.msg3 = null;
    $scope.msg4 = null;

    $scope.time1 = null;
    $scope.time2 = null;
    $scope.time3 = null;
    $scope.time4 = null;

    $scope.$watch('letters1', function (newValue, oldValue) {
      $scope.time1 = Date.now();
      $scope.msg1 = `${JSON.stringify(oldValue)} => ${JSON.stringify(
        newValue
      )}`;
    });

    $scope.$watchGroup(['letters2'], function (newValue, oldValue) {
      $scope.time2 = Date.now();
      $scope.msg2 = `${JSON.stringify(oldValue[0])} => ${JSON.stringify(
        newValue[0]
      )}`;
    });

    $scope.$watchCollection('letters3', function (newValue, oldValue) {
      $scope.time3 = Date.now();
      $scope.msg3 = `${JSON.stringify(oldValue)} => ${JSON.stringify(
        newValue
      )}`;
    });

    $scope.$watch(
      'letters4',
      function (newValue, oldValue) {
        $scope.time4 = Date.now();
        $scope.msg4 = `${JSON.stringify(oldValue)} => ${JSON.stringify(
          newValue
        )}`;
      },
      true
    );

    $scope.push = function () {
      const val = Math.floor(Math.random() * 50);
      $scope.letters1.push(val);
      $scope.letters2.push(val);
      $scope.letters3.push(val);
      $scope.letters4.push(val);
    };

    $scope.unshift = function () {
      const val = Math.floor(Math.random() * 50);
      $scope.letters1.unshift(val);
      $scope.letters2.unshift(val);
      $scope.letters3.unshift(val);
      $scope.letters4.unshift(val);
    };

    $scope.change = function () {
      $scope.letters1 = [5, 4, 3, 2, 1];
      $scope.letters2 = [5, 4, 3, 2, 1];
      $scope.letters3 = [5, 4, 3, 2, 1];
      $scope.letters4 = [5, 4, 3, 2, 1];
    };
  },
]);

app.controller('watchObjectController', [
  '$scope',
  function ($scope) {
    $scope.msg1 = null;
    $scope.msg2 = null;
    $scope.msg3 = null;
    $scope.msg4 = null;

    $scope.time1 = null;
    $scope.time2 = null;
    $scope.time3 = null;
    $scope.time4 = null;

    $scope.obj1 = { val: -1 };
    $scope.obj2 = { val: -1 };
    $scope.obj3 = { val: -1, subField: { val: null } };
    $scope.obj4 = { val: -1 };

    $scope.$watch('obj1', function (newValue, oldValue) {
      $scope.time1 = Date.now();
      $scope.msg1 = `${JSON.stringify(oldValue)} => ${JSON.stringify(
        newValue
      )}`;
    });

    $scope.$watch(
      'obj4',
      function (newValue, oldValue) {
        $scope.time4 = Date.now();
        $scope.msg4 = `${JSON.stringify(oldValue)} => ${JSON.stringify(
          newValue
        )}`;
      },
      true
    );

    $scope.$watchGroup(['obj2'], function (newValue, oldValue) {
      $scope.time2 = Date.now();
      $scope.msg2 = `${JSON.stringify(oldValue[0])} => ${JSON.stringify(
        newValue[0]
      )}`;
    });

    $scope.$watchCollection('obj3', function (newValue, oldValue) {
      $scope.time3 = Date.now();
      $scope.msg3 = `${JSON.stringify(oldValue)} => ${JSON.stringify(
        newValue
      )}`;
    });

    $scope.changeVal = function () {
      const val = Math.floor(Math.random() * 50);
      $scope.obj1.val = val;
      $scope.obj2.val = val;
      // $scope.obj3.val = val;
      $scope.obj3.subField.val = val;
      $scope.obj4.val = val;
    };

    $scope.changeWholeObject = function () {
      const val = -1;
      $scope.obj1 = { val };
      $scope.obj2 = { val };
      $scope.obj3 = { val, subField: { val: null } };
      // $scope.obj3 = { val, subField: -2 };
      // $scope.obj4 = {val};
      $scope.obj4 = { val, subField: { val: null } };
    };
  },
]);

// Animate Controller and directive

app.controller('animateController', [
  '$scope',
  function ($scope) {
    $scope.xaxis = true;
    $scope.yaxis = true;

    let args;
    $scope.foo = function (key) {
      // console.log($scope.xaxis, $scope.yaxis);
      switch (key) {
        case 'L':
          args = { marginLeft: '0px' };
          $scope.xaxis = !$scope.xaxis;
          break;
        case 'R':
          args = { marginLeft: '100px' };
          $scope.xaxis = !$scope.xaxis;
          break;
        case 'U':
          args = { marginTop: '0px' };
          $scope.yaxis = !$scope.yaxis;
          break;
        case 'D':
          args = { marginTop: '100px' };
          $scope.yaxis = !$scope.yaxis;
          break;
      }
      // console.log($scope.xaxis, $scope.yaxis);
      $scope.$broadcast('change', args);
    };
  },
]);

app.directive('animateDir', function () {
  function linker(scope, element, attributes) {
    function func(event, args) {
      element.css(args);
    }
    scope.$on('change', func);
  }
  return {
    restrict: 'A',
    link: linker,
  };
});

app.directive('myHide', function () {
  return {
    restrict: 'A',
    link: function (scope, elem) {
      elem.css({ display: 'none' });
    },
  };
});

app.directive('myShow', function () {
  function linker($scope, $element, $attr) {
    $scope.$watch($attr.myShow, function (value) {
      if (value) $element.removeClass('my-hide');
      else $element.addClass('my-hide');
    });
  }
  return {
    restrict: 'A',
    link: linker,
  };
});
