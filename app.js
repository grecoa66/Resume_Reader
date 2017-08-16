'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

const ngRoute = require('angular-route');

import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';
import ngFileUpload from 'ng-file-upload';

import {
  routeConfig
} from './app.config';

import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import upload from '../components/upload/upload.component';
import keywords from '../components/keywords/keywords.component';
import analyzer from './main/main.service';

import './app.css';

angular.module('resumeReaderApp', [ngCookies, ngResource, ngSanitize, ngRoute, uiBootstrap, ngFileUpload, navbar,
  footer, main, constants, util, upload, keywords, analyzer
])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['resumeReaderApp'], {
      strictDi: true
    });
  });
