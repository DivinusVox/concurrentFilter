var angular = require('angular');
import { CfCtrl } from './controllers';
import { DataService, WebWorkerFilter } from './services';
import { comments } from './fixture';

angular.module('concurrentFilter', [])
.controller('cfMainCtrl', CfCtrl)
.service('dataService', DataService)
.factory('wwFilter', ($q) => new WebWorkerFilter($q))
.value('comments', comments);