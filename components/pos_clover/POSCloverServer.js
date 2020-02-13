'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var PageComponent = _interopDefault(require('ds.base/PageComponent'));

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var interopRequireDefault = createCommonjsModule(function (module) {
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;
});

unwrapExports(interopRequireDefault);

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var arrayWithHoles = _arrayWithHoles;

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

var iterableToArrayLimit = _iterableToArrayLimit;

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var nonIterableRest = _nonIterableRest;

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

var slicedToArray = _slicedToArray;

var createServer_1 = createCommonjsModule(function (module, exports) {



Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createServer = void 0;

var _slicedToArray2 = interopRequireDefault(slicedToArray);



var verifyIndexRoute = function verifyIndexRoute(serverName, routes) {
  var hasIndexRoute = routes.some(function (_ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 1),
        routePath = _ref2[0];

    return routePath === '/';
  });
  if (!hasIndexRoute) throw Error("".concat(serverName, ".routes has no \"/\" route."));
};

var boundHandler = function boundHandler(routeHandler) {
  return function (attributes, variables) {
    return routeHandler(this, attributes, variables);
  };
};

var applyRoute = function applyRoute(_final, _ref3) {
  var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
      routePath = _ref4[0],
      routeHandler = _ref4[1];

  _final[routePath] = boundHandler(routeHandler);
  return _final;
};

var createServer = function createServer(serverName) {
  var withRoutes = function withRoutes(routes) {
    verifyIndexRoute(serverName, routes);
    var serverConfig = routes.reduce(applyRoute, {
      type: serverName
    });
    return PageComponent.create(serverConfig);
  };

  return {
    withRoutes: withRoutes
  };
};

exports.createServer = createServer;
});

unwrapExports(createServer_1);
var createServer_2 = createServer_1.createServer;

var getBucket_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBucket = void 0;

var addEncodedSearch = function addEncodedSearch(bucket, options) {
  if (options.addEncodedSearch) {
    bucket.addEncodedSearch(options.addEncodedSearch);
  }
};

var securityChecks = function securityChecks(bucket, options) {
  if (typeof options.securityChecks === 'boolean') {
    bucket.setSecurityChecks(options.securityChecks);
  }
};

var getBucket = function getBucket(name) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var bucket = new FRecord(name);
  addEncodedSearch(bucket, options);
  securityChecks(bucket, options);
  bucket.search();	
  return bucket.toJSON();
};

exports.getBucket = getBucket;
});

unwrapExports(getBucket_1);
var getBucket_2 = getBucket_1.getBucket;

var server = createServer_2('POSCloverServer');

var indexRoute = function indexRoute(self, attributes, variables) {
  return new StatusResponse('good', {});
};

var getInventoryList = function getInventoryList(self, attributes, variables) {
  var cloverInventoryList = getBucket_2('clover_inventory_list');
  return new StatusResponse("good", {
    inventoryList: cloverInventoryList.rows
  });
};

var getOrderList = function getOrderList(self, attributes, variables) {
  var cloverOrderList = getBucket_2('order_list');
  return new StatusResponse("good", {
    orderList: cloverOrderList.rows
  });
};

var index = server.withRoutes([['/', indexRoute], ['/ajax/getInventoryList', getInventoryList], ['/ajax/getOrderList', getOrderList]]);

module.exports = index;
