//inject angular file upload directives and services.
var app = angular.module('fileUpload', ['ngFileUpload']);

app.controller('MyController', ['$scope', 'Upload', '$timeout',
  function ($scope, Upload, $timeout) {
    var myCtrl           = this;
    myCtrl.filesToUpload = [];
    myCtrl.progressBar   = {};
    var cont             = 0;

    myCtrl.addToList = function (files) {
      if (!files) return;
      for (var i = 0; i < files.length; i++) {
        files[i].id                     = cont;
        cont++;
        myCtrl.progressBar[files[i].id] = 0;
        myCtrl.filesToUpload.push(files[i]);
      }
    };

    myCtrl.remove = function (index) {
      var arrayTemp = [];
      myCtrl.filesToUpload.forEach(function (item, indice) {
        if (indice === index) return true;
        arrayTemp.push(item);
      });

      myCtrl.filesToUpload = arrayTemp;
    };

    $scope.$watch('myCtrl.files', function () {
      //myCtrl.upload(myCtrl.files);
      myCtrl.addToList(myCtrl.files);
    });

    $scope.$watch('file', function () {
      if (myCtrl.file != null) {
        myCtrl.files = [myCtrl.file];
      }
    });

    $scope.log = '';

    myCtrl.upload = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          if (!file.$error) {
            Upload.upload({
              url : 'https://angular-file-upload-cors-srv.appspot.com/upload',
              data: {
                file: file
              }
            }).then(function (resp) {
              $timeout(function () {
                $scope.log = 'file: ' +
                  resp.config.data.file.name +
                  ', Response: ' + JSON.stringify(resp.data) +
                  '\n' + $scope.log;
              });
            }, null, function (evt) {
              myCtrl.progressBar[evt.config._file.id] = parseInt(100.0 * evt.loaded / evt.total);
              var progressPercentage                  = parseInt(100.0 * evt.loaded / evt.total);
              $scope.log                              = 'progress: ' + progressPercentage + '% ' + evt.config.data.file.name + '\n' +
                $scope.log;
            });
          }
        }
      }
    };
  }]);
