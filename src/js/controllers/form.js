'use strict';

/* Controllers */

  // Form controller
app.controller('FormDemoCtrl', ['$scope', function($scope) {
    $scope.pesoMermaPesos=1.00;
    $scope.pesoKilosNetosHumedosFactores=2.2046223;
    $scope.pesoHumedadFactores=32.15073;
    $scope.contenidoAgExternoFactores=32.00;
    $scope.pesoMermaFactores=6.96;
    $scope.contenidoZnTipoDeCambioFactores=6.96;
    // $scope.contenidoZnLeyes=52.55;
    // $scope.contenidoAgLeyes=466.00;
    // $scope.baseZnCotizaciones=0.95;
    // $scope.baseAgCotizaciones=19.05;
    // $scope.impuestoZnAlicuota=5.00;
    // $scope.impuestoAgAlicuota=6.00;

    $scope.calcular = function(){
      $scope.pesoHumedadPeso=($scope.pesoHumedadPesos*$scope.pesoKilosNetosHumedosPeso)/100;
      $scope.pesoMermaPeso=(($scope.pesoKilosNetosHumedosPeso-$scope.pesoHumedadPeso)*$scope.pesoMermaPesos)/100;
      $scope.pesoKilosNetosSecosPeso=$scope.pesoKilosNetosHumedosPeso-$scope.pesoHumedadPeso-$scope.pesoMermaPeso;
      $scope.contenidoZnPesokg=$scope.pesoKilosNetosSecosPeso*$scope.contenidoZnLeyes/100;
      $scope.contenidoZnPesolf=$scope.contenidoZnPesokg*$scope.pesoKilosNetosHumedosFactores;
      $scope.contenidoAgPesokg=$scope.pesoKilosNetosSecosPeso*$scope.contenidoAgLeyes/1000000;
      $scope.contenidoAgPesoot=$scope.contenidoAgPesokg*$scope.pesoHumedadFactores;
      $scope.contenidoAgFleteTotalFactores=$scope.contenidoAgInternoFactores*1+$scope.contenidoAgExternoFactores*1;
      $scope.baseZnSus=$scope.contenidoZnPesolf*$scope.baseZnCotizaciones;
      $scope.baseAgSus=$scope.contenidoAgPesoot*$scope.baseAgCotizaciones;
      $scope.baseTotalSus=$scope.baseZnSus*1+$scope.baseAgSus*1;
      $scope.basePromedioSus=$scope.baseTotalSus*45/100;
      $scope.baseDiferenciaSus=$scope.baseTotalSus-$scope.basePromedioSus;
      $scope.impuestoZnSus=$scope.baseZnSus*$scope.impuestoZnAlicuota/100;
      $scope.impuestoAgSus=$scope.baseAgSus*$scope.impuestoAgAlicuota/100;
      $scope.impuestoTotalSusSus=$scope.impuestoZnSus*1+$scope.impuestoAgSus*1;
      $scope.impuestoTotalBsSus=$scope.impuestoTotalSusSus*$scope.pesoMermaFactores;
      $scope.baseAgTaraTotalFactores=$scope.baseZnContenedoresFactores*2050;
      $scope.baseTotalPesoBrutoFactores=$scope.pesoKilosNetosHumedosPeso*1+$scope.baseAgTaraTotalFactores*1;
      $scope.impuestoZnValorConcentradoFactores=$scope.baseTotalSus/$scope.pesoKilosNetosHumedosPeso;
      return "";
    }

    $scope.notBlackListed = function(value) {
      var blacklist = ['bad@domain.com','verybad@domain.com'];
      return blacklist.indexOf(value) === -1;
    }

    $scope.val = 15;
    var updateModel = function(val){
      $scope.$apply(function(){
        $scope.val = val;
      });
    };
    angular.element("#slider").on('slideStop', function(data){
      updateModel(data.value);
    });

    $scope.select2Number = [
      {text:'First',  value:'One'},
      {text:'Second', value:'Two'},
      {text:'Third',  value:'Three'}
    ];

    $scope.list_of_string = ['tag1', 'tag2']
    $scope.select2Options = {
        'multiple': true,
        'simple_tags': true,
        'tags': ['tag1', 'tag2', 'tag3', 'tag4']  // Can be empty list.
    };

    angular.element("#LinkInput").bind('click', function (event) {
      event.stopPropagation();
    });

  }])
 ;