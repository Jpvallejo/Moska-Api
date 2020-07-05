/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "1aaa41b1da3b34f574fc";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\nmodule.exports = function(updatedModules, renewedModules) {\n\tvar unacceptedModules = updatedModules.filter(function(moduleId) {\n\t\treturn renewedModules && renewedModules.indexOf(moduleId) < 0;\n\t});\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tif (unacceptedModules.length > 0) {\n\t\tlog(\n\t\t\t\"warning\",\n\t\t\t\"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)\"\n\t\t);\n\t\tunacceptedModules.forEach(function(moduleId) {\n\t\t\tlog(\"warning\", \"[HMR]  - \" + moduleId);\n\t\t});\n\t}\n\n\tif (!renewedModules || renewedModules.length === 0) {\n\t\tlog(\"info\", \"[HMR] Nothing hot updated.\");\n\t} else {\n\t\tlog(\"info\", \"[HMR] Updated modules:\");\n\t\trenewedModules.forEach(function(moduleId) {\n\t\t\tif (typeof moduleId === \"string\" && moduleId.indexOf(\"!\") !== -1) {\n\t\t\t\tvar parts = moduleId.split(\"!\");\n\t\t\t\tlog.groupCollapsed(\"info\", \"[HMR]  - \" + parts.pop());\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t\tlog.groupEnd(\"info\");\n\t\t\t} else {\n\t\t\t\tlog(\"info\", \"[HMR]  - \" + moduleId);\n\t\t\t}\n\t\t});\n\t\tvar numberIds = renewedModules.every(function(moduleId) {\n\t\t\treturn typeof moduleId === \"number\";\n\t\t});\n\t\tif (numberIds)\n\t\t\tlog(\n\t\t\t\t\"info\",\n\t\t\t\t\"[HMR] Consider using the NamedModulesPlugin for module names.\"\n\t\t\t);\n\t}\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log-apply-result.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var logLevel = \"info\";\n\nfunction dummy() {}\n\nfunction shouldLog(level) {\n\tvar shouldLog =\n\t\t(logLevel === \"info\" && level === \"info\") ||\n\t\t([\"info\", \"warning\"].indexOf(logLevel) >= 0 && level === \"warning\") ||\n\t\t([\"info\", \"warning\", \"error\"].indexOf(logLevel) >= 0 && level === \"error\");\n\treturn shouldLog;\n}\n\nfunction logGroup(logFn) {\n\treturn function(level, msg) {\n\t\tif (shouldLog(level)) {\n\t\t\tlogFn(msg);\n\t\t}\n\t};\n}\n\nmodule.exports = function(level, msg) {\n\tif (shouldLog(level)) {\n\t\tif (level === \"info\") {\n\t\t\tconsole.log(msg);\n\t\t} else if (level === \"warning\") {\n\t\t\tconsole.warn(msg);\n\t\t} else if (level === \"error\") {\n\t\t\tconsole.error(msg);\n\t\t}\n\t}\n};\n\n/* eslint-disable node/no-unsupported-features/node-builtins */\nvar group = console.group || dummy;\nvar groupCollapsed = console.groupCollapsed || dummy;\nvar groupEnd = console.groupEnd || dummy;\n/* eslint-enable node/no-unsupported-features/node-builtins */\n\nmodule.exports.group = logGroup(group);\n\nmodule.exports.groupCollapsed = logGroup(groupCollapsed);\n\nmodule.exports.groupEnd = logGroup(groupEnd);\n\nmodule.exports.setLogLevel = function(level) {\n\tlogLevel = level;\n};\n\nmodule.exports.formatError = function(err) {\n\tvar message = err.message;\n\tvar stack = err.stack;\n\tif (!stack) {\n\t\treturn message;\n\t} else if (stack.indexOf(message) < 0) {\n\t\treturn message + \"\\n\" + stack;\n\t} else {\n\t\treturn stack;\n\t}\n};\n\n\n//# sourceURL=webpack:///(webpack)/hot/log.js?");

/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?100":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?100 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n/*globals __resourceQuery */\nif (true) {\n\tvar hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;\n\tvar log = __webpack_require__(/*! ./log */ \"./node_modules/webpack/hot/log.js\");\n\n\tvar checkForUpdate = function checkForUpdate(fromUpdate) {\n\t\tif (module.hot.status() === \"idle\") {\n\t\t\tmodule.hot\n\t\t\t\t.check(true)\n\t\t\t\t.then(function(updatedModules) {\n\t\t\t\t\tif (!updatedModules) {\n\t\t\t\t\t\tif (fromUpdate) log(\"info\", \"[HMR] Update applied.\");\n\t\t\t\t\t\treturn;\n\t\t\t\t\t}\n\t\t\t\t\t__webpack_require__(/*! ./log-apply-result */ \"./node_modules/webpack/hot/log-apply-result.js\")(updatedModules, updatedModules);\n\t\t\t\t\tcheckForUpdate(true);\n\t\t\t\t})\n\t\t\t\t.catch(function(err) {\n\t\t\t\t\tvar status = module.hot.status();\n\t\t\t\t\tif ([\"abort\", \"fail\"].indexOf(status) >= 0) {\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] Cannot apply update.\");\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] \" + log.formatError(err));\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] You need to restart the application!\");\n\t\t\t\t\t} else {\n\t\t\t\t\t\tlog(\"warning\", \"[HMR] Update failed: \" + log.formatError(err));\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t}\n\t};\n\tsetInterval(checkForUpdate, hotPollInterval);\n} else {}\n\n/* WEBPACK VAR INJECTION */}.call(this, \"?100\"))\n\n//# sourceURL=webpack:///(webpack)/hot/poll.js?");

/***/ }),

/***/ "./serviceAccount.json":
/*!*****************************!*\
  !*** ./serviceAccount.json ***!
  \*****************************/
/*! exports provided: type, project_id, private_key_id, private_key, client_email, client_id, auth_uri, token_uri, auth_provider_x509_cert_url, client_x509_cert_url, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"type\\\":\\\"service_account\\\",\\\"project_id\\\":\\\"moska-fbb04\\\",\\\"private_key_id\\\":\\\"dfecfce2e574f0c19ab444970995b36e0f564359\\\",\\\"private_key\\\":\\\"-----BEGIN PRIVATE KEY-----\\\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCzjE4+HbuzIsZM\\\\nLaYICebgLxezefLhrc40NLxfpJSiUswc9lLSN6U1GyGG+CS1KMecXGmoz8BLoUQs\\\\nXUiLtuywWoQD/s6qYPBpOW+m1+20x5SjBlhmLc2R6cPt4W0gaFIiJmuUctPZfvoe\\\\nkjqnQDwVciATls0sIT7z/1ILlY43w5VmT4APYfMI3LdYw8eJxqq1zXf4oGpJGLkf\\\\nFwpIVjpF6l8GIaUMoM4q9rnzzlBEMTBYXIsHcjWHmH4JEa5bttcnQeHFSP4Ikkxt\\\\nfCIpiSl+1C5F2ME8tfelzU6YLi0G8VfIlPL1NQ9asGSgNYIGI7x/7MHGiqqleKas\\\\nRRDA717ZAgMBAAECggEAAN9/HJDgchqKhExPMQgl9ekaCxFeEPgwtyhFJ4yRUci9\\\\nSAFv8v26RpZ/LzzS+4kwj0i+ase306ZRF+DMPYGs3PP+YwFA2ACTVVpQz1WKyQTq\\\\nFXDZH9tmfdMj1MBH248mTGw2EbQNO6grvIJRhAatRB1t8n/FN6BhwftNLCk/VnNm\\\\n7CVB/L7N3vGy9JHLlHG1FRI+tiGKGPtJBIN7ML+jKNKbuYOwHR28NWJb1a0cBCm3\\\\nK9ZSE+WKeqWXRmxlAFwLSq5RIc0rTEm8HbKek1SUuBNtBQxnN6LXSlgd/ICCGZ0O\\\\nhewfB7kLHlPY6v4AKrGSyPoc4dbGse5Y91QUnBVO0QKBgQDhcvSfUsApFl2Jd8DT\\\\neYE0TeurVYgIzW1m2Rpy9rOsIJIDisReg60ewfPap0XfPbx/H69NyVUGa2Oek367\\\\nSPYg1NmcS7ubClW5B4qWye6hUkvyWqaYm0eMIIUetkd02PQ3aRqG13RLGHZ5iXl/\\\\njZGRTt2nUgNgBSmZ2+7Rx6CzOwKBgQDL4QBCviNvo5QloTY/YskOapCRbEQdDDtj\\\\nkrUQLAQaGCSA33OITI3vUHSBAvANdYiB6ltdvNBL4Tz4FXAQdYcmvl7IDruiFx0w\\\\nPS9zUDbgjNFDCR2X/xu7+XCf2oqnerdkrJ4TVna36RUI8QrgtUxtsfHCqUnO4M9m\\\\ng3IlIpys+wKBgAC0iFlbO+ik/kPo0PyYW7QbLkqJ6PQGGHqC4VdMuEEolOxX6cdV\\\\n6Bu5hZbAgTJykf1fzv+SSqbLfTNIyNOzJbnykH+xqPOSM7RxdpiEJy/v/vbSG8VM\\\\nbwvcKi5vaYfPCeyGcqPLVrzJZc15hZzFh5gJxB263vHU8k1d58BWPIVzAoGBALJZ\\\\nB5NbJUCZxhUM65mTXvI/gmvUW9lVQ/ac9ctJ1eTFzdj2n+hRn7ADn4bj/P6pHFsZ\\\\nmgdsDoLybBVRG5EqXqojymITkUwAEEaMn5+uQfM4/C46ISs/vRE46a7MzJIppZhp\\\\n8HZWItBLE12ZDrz3m/4xtZ1l3e0deBDjV8zodEpVAoGBAJLsQZike53YlesaknH0\\\\n39py7mnTg1t9aQtFD9g5Nsx62S7lZSaxbTqK+tjZ/5YkV85drZfYxHHXKggAUiOt\\\\nE99xYhAODX8Y+4GnnFeM/r1zXB7htt+3Ug4k+zHSakZawfE58YtgSma0W73nxXKF\\\\nZsBDiz2ZLLsnjPHVMVURDeUi\\\\n-----END PRIVATE KEY-----\\\\n\\\",\\\"client_email\\\":\\\"firebase-adminsdk-chg5d@moska-fbb04.iam.gserviceaccount.com\\\",\\\"client_id\\\":\\\"104807160380382024306\\\",\\\"auth_uri\\\":\\\"https://accounts.google.com/o/oauth2/auth\\\",\\\"token_uri\\\":\\\"https://oauth2.googleapis.com/token\\\",\\\"auth_provider_x509_cert_url\\\":\\\"https://www.googleapis.com/oauth2/v1/certs\\\",\\\"client_x509_cert_url\\\":\\\"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-chg5d%40moska-fbb04.iam.gserviceaccount.com\\\"}\");\n\n//# sourceURL=webpack:///./serviceAccount.json?");

/***/ }),

/***/ "./src/account/moskaAccount.database.ts":
/*!**********************************************!*\
  !*** ./src/account/moskaAccount.database.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar firebase_admin_1 = __importDefault(__webpack_require__(/*! firebase-admin */ \"firebase-admin\"));\nvar moskaAccount_model_1 = __webpack_require__(/*! ./moskaAccount.model */ \"./src/account/moskaAccount.model.ts\");\nvar lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nvar AccountDatabase = /** @class */ (function () {\n    function AccountDatabase() {\n        var _this = this;\n        this.db = firebase_admin_1.default.database();\n        this.accountsRef = this.db.ref(\"server/saving-data/accounts\");\n        var aa = {};\n        this.accountsRef.on('value' || false, function (snap) {\n            snap && snap.val() &&\n                lodash_1.default.map(snap.val(), function (val, key) {\n                    aa[key] = moskaAccount_model_1.MoskaAccount.fromApiResponse(val);\n                });\n            _this.accounts = aa; // Keep the local user object synced with the Firebase userRef \n        });\n    }\n    AccountDatabase.prototype.get = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.accounts];\n            });\n        });\n    };\n    AccountDatabase.prototype.getById = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.accounts[id]];\n            });\n        });\n    };\n    AccountDatabase.prototype.getByUser = function (userId) {\n        return __awaiter(this, void 0, void 0, function () {\n            var filtered;\n            var _this = this;\n            return __generator(this, function (_a) {\n                filtered = Object.keys(this.accounts).reduce(function (filtered, key) {\n                    if (_this.accounts[key].userId == userId)\n                        filtered[key] = _this.accounts[key];\n                    return filtered;\n                }, {});\n                return [2 /*return*/, filtered];\n            });\n        });\n    };\n    AccountDatabase.prototype.create = function (account) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.accountsRef.push({\n                        currentBalance: account.currentBalance.toDecimal(),\n                        currency: account.currentBalance.currency,\n                        userId: account.userId,\n                        name: account.name,\n                    }).toString()];\n            });\n        });\n    };\n    AccountDatabase.prototype.update = function (id, account) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.accountsRef.child(id).set({\n                        currentBalance: account.currentBalance.toDecimal(),\n                        currency: account.currentBalance.currency,\n                        userId: account.userId,\n                        name: account.name,\n                    })];\n            });\n        });\n    };\n    AccountDatabase.prototype.updateBalance = function (id, amount, operation) {\n        return __awaiter(this, void 0, void 0, function () {\n            var account, newAmount;\n            return __generator(this, function (_a) {\n                account = this.accounts[id];\n                console.log(account);\n                newAmount = operation === \"add\" ? account.currentBalance.add(amount) : account.currentBalance.subtract(amount);\n                return [2 /*return*/, this.accountsRef.child(id).set({\n                        currentBalance: newAmount.toDecimal(),\n                        currency: account.currentBalance.currency,\n                        userId: account.userId,\n                        name: account.name,\n                    })];\n            });\n        });\n    };\n    AccountDatabase.prototype.remove = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.accountsRef.child(id).set(null)];\n            });\n        });\n    };\n    return AccountDatabase;\n}());\nexports.AccountDatabase = AccountDatabase;\n\n\n//# sourceURL=webpack:///./src/account/moskaAccount.database.ts?");

/***/ }),

/***/ "./src/account/moskaAccount.model.ts":
/*!*******************************************!*\
  !*** ./src/account/moskaAccount.model.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar ts_money_1 = __webpack_require__(/*! ts-money */ \"ts-money\");\nvar MoskaAccount = /** @class */ (function () {\n    function MoskaAccount(currentBalance, name, currency, userId) {\n        this.currentBalance = currentBalance;\n        this.name = name;\n        this.currency = currency;\n        this.userId = userId;\n    }\n    MoskaAccount.fromApiRequest = function (request, userId) {\n        var balance = ts_money_1.Money.fromDecimal(request.currentBalance, request.currency);\n        var name = request.name;\n        return new MoskaAccount(balance, name, balance.currency, userId);\n    };\n    MoskaAccount.fromApiResponse = function (request) {\n        var balance = ts_money_1.Money.fromDecimal(request.currentBalance, request.currency);\n        var name = request.name;\n        var userId = request.userId;\n        return new MoskaAccount(balance, name, balance.currency, userId);\n    };\n    return MoskaAccount;\n}());\nexports.MoskaAccount = MoskaAccount;\n\n\n//# sourceURL=webpack:///./src/account/moskaAccount.model.ts?");

/***/ }),

/***/ "./src/account/moskaAccount.router.ts":
/*!********************************************!*\
  !*** ./src/account/moskaAccount.router.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Required External Modules and Interfaces\n */\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar moskaAccount_service_1 = __webpack_require__(/*! ./moskaAccount.service */ \"./src/account/moskaAccount.service.ts\");\nvar moskaAccount_model_1 = __webpack_require__(/*! ./moskaAccount.model */ \"./src/account/moskaAccount.model.ts\");\nvar auth_service_1 = __webpack_require__(/*! ../auth/services/auth.service */ \"./src/auth/services/auth.service.ts\");\n/**\n * Router Definition\n */\nexports.accountsRouter = express_1.default.Router();\n/**\n *  Service Definition\n */\nvar accountsService = new moskaAccount_service_1.AccountService();\nvar authService = new auth_service_1.AuthService();\n/**\n * Controller Definitions\n */\n// GET \nexports.accountsRouter.get(\"/\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var authHeader, authToken, userId, accounts, e_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 3, , 4]);\n                authHeader = req.header('X-JWT-Token');\n                authToken = authHeader ? authHeader : '';\n                return [4 /*yield*/, authService.getUserIdFromToken(authToken)];\n            case 1:\n                userId = _a.sent();\n                return [4 /*yield*/, accountsService.getByUser(userId)];\n            case 2:\n                accounts = _a.sent();\n                res.status(200).send(accounts);\n                return [3 /*break*/, 4];\n            case 3:\n                e_1 = _a.sent();\n                res.status(404).send(e_1.message);\n                return [3 /*break*/, 4];\n            case 4: return [2 /*return*/];\n        }\n    });\n}); });\n// // GET :id\nexports.accountsRouter.get(\"/:id\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var account, e_2;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, accountsService.get(req.params.id)];\n            case 1:\n                account = _a.sent();\n                res.status(200).send(account);\n                return [3 /*break*/, 3];\n            case 2:\n                e_2 = _a.sent();\n                res.status(404).send(e_2.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// // GET :userId\nexports.accountsRouter.get(\"/byUser/:userId\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var accounts, e_3;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, accountsService.getByUser(req.params.userId)];\n            case 1:\n                accounts = _a.sent();\n                res.status(200).send(accounts);\n                return [3 /*break*/, 3];\n            case 2:\n                e_3 = _a.sent();\n                res.status(404).send(e_3.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// POST \nexports.accountsRouter.post(\"/\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var authHeader, authToken, userId, account, e_4;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 3, , 4]);\n                authHeader = req.header('X-JWT-Token');\n                authToken = authHeader ? authHeader : '';\n                return [4 /*yield*/, authService.getUserIdFromToken(authToken)];\n            case 1:\n                userId = _a.sent();\n                account = moskaAccount_model_1.MoskaAccount.fromApiRequest(req.body, userId);\n                return [4 /*yield*/, accountsService.create(account).then(function (id) {\n                        res.sendStatus(201).send(id);\n                    })];\n            case 2:\n                _a.sent();\n                return [3 /*break*/, 4];\n            case 3:\n                e_4 = _a.sent();\n                res.status(404).send(e_4.message);\n                return [3 /*break*/, 4];\n            case 4: return [2 /*return*/];\n        }\n    });\n}); });\n// PUT \nexports.accountsRouter.put(\"/:id\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var account, e_5;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                account = req.body.account;\n                return [4 /*yield*/, accountsService.update(req.params.id, account)];\n            case 1:\n                _a.sent();\n                res.sendStatus(200);\n                return [3 /*break*/, 3];\n            case 2:\n                e_5 = _a.sent();\n                res.status(500).send(e_5.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// DELETE\nexports.accountsRouter.delete(\"/:id\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var e_6;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, accountsService.remove(req.params.id)];\n            case 1:\n                _a.sent();\n                res.sendStatus(200);\n                return [3 /*break*/, 3];\n            case 2:\n                e_6 = _a.sent();\n                res.status(500).send(e_6.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n\n\n//# sourceURL=webpack:///./src/account/moskaAccount.router.ts?");

/***/ }),

/***/ "./src/account/moskaAccount.service.ts":
/*!*********************************************!*\
  !*** ./src/account/moskaAccount.service.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar moskaAccount_database_1 = __webpack_require__(/*! ./moskaAccount.database */ \"./src/account/moskaAccount.database.ts\");\nvar lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nvar AccountService = /** @class */ (function () {\n    function AccountService() {\n        this.db = new moskaAccount_database_1.AccountDatabase();\n    }\n    AccountService.prototype.create = function (account) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.create(account)];\n            });\n        });\n    };\n    AccountService.prototype.update = function (id, account) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.update(id, account)];\n            });\n        });\n    };\n    AccountService.prototype.updateBalance = function (id, amount, operation) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.updateBalance(id, amount, operation)];\n            });\n        });\n    };\n    AccountService.prototype.remove = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.remove(id)];\n            });\n        });\n    };\n    AccountService.prototype.getAll = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.get()];\n            });\n        });\n    };\n    AccountService.prototype.get = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.getById(id)];\n            });\n        });\n    };\n    AccountService.prototype.getByUser = function (userId) {\n        return __awaiter(this, void 0, void 0, function () {\n            var map;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        map = {};\n                        return [4 /*yield*/, this.db.getByUser(userId).then(function (accounts) {\n                                lodash_1.default.map(accounts, function (account, key) {\n                                    map[key] =\n                                        {\n                                            \"currentBalance\": account.currentBalance.toDecimal(),\n                                            \"name\": account.name,\n                                            \"userId\": account.userId,\n                                            \"currency\": account.currentBalance.currency\n                                        };\n                                });\n                            })];\n                    case 1:\n                        _a.sent();\n                        return [2 /*return*/, map];\n                }\n            });\n        });\n    };\n    return AccountService;\n}());\nexports.AccountService = AccountService;\n\n\n//# sourceURL=webpack:///./src/account/moskaAccount.service.ts?");

/***/ }),

/***/ "./src/auth/auth.router.ts":
/*!*********************************!*\
  !*** ./src/auth/auth.router.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar jwt_service_1 = __webpack_require__(/*! ./services/jwt.service */ \"./src/auth/services/jwt.service.ts\");\nvar auth_service_1 = __webpack_require__(/*! ./services/auth.service */ \"./src/auth/services/auth.service.ts\");\nvar authService = new auth_service_1.AuthService();\n/**\n * Router Definition\n */\nexports.authRouter = express_1.default.Router();\n/**\n * Controller Definitions\n */\nexports.authRouter.post(\"/\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var requestedUser, user, jwtToken, session, err_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                requestedUser = {\n                    email: req.body['email'],\n                    displayName: req.body['displayName']\n                };\n                return [4 /*yield*/, authService.getUser(requestedUser)];\n            case 1:\n                user = _a.sent();\n                jwtToken = process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : 'gmOfLtMS1/6zdF4j18+5[]@OT\"IWj>xd';\n                session = jwt_service_1.encodeSession(jwtToken, __assign(__assign({}, user), { dateCreated: Date.now() }));\n                res.status(200).json(session);\n                return [3 /*break*/, 3];\n            case 2:\n                err_1 = _a.sent();\n                console.log(err_1.message);\n                res.status(400);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n\n\n//# sourceURL=webpack:///./src/auth/auth.router.ts?");

/***/ }),

/***/ "./src/auth/services/auth.service.ts":
/*!*******************************************!*\
  !*** ./src/auth/services/auth.service.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar users_service_1 = __webpack_require__(/*! ./users.service */ \"./src/auth/services/users.service.ts\");\nvar jwt_service_1 = __webpack_require__(/*! ./jwt.service */ \"./src/auth/services/jwt.service.ts\");\nvar AuthService = /** @class */ (function () {\n    function AuthService() {\n        this.usersService = new users_service_1.UsersService();\n    }\n    AuthService.prototype.getUser = function (user) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.usersService.getUser(user)];\n            });\n        });\n    };\n    AuthService.prototype.getUserIdFromToken = function (token) {\n        return __awaiter(this, void 0, void 0, function () {\n            var jwtToken, decoded;\n            return __generator(this, function (_a) {\n                jwtToken = process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : 'gmOfLtMS1/6zdF4j18+5[]@OT\"IWj>xd';\n                decoded = jwt_service_1.decodeSession(jwtToken, token);\n                return [2 /*return*/, decoded.session.id];\n            });\n        });\n    };\n    return AuthService;\n}());\nexports.AuthService = AuthService;\n\n\n//# sourceURL=webpack:///./src/auth/services/auth.service.ts?");

/***/ }),

/***/ "./src/auth/services/jwt.service.ts":
/*!******************************************!*\
  !*** ./src/auth/services/jwt.service.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nfunction encodeSession(secretKey, partialSession) {\n    // Determine when the token should expire\n    var issued = Date.now();\n    var oneDayInMs = 1140 * 60 * 1000;\n    var expires = issued + oneDayInMs;\n    var session = __assign(__assign({}, partialSession), { issued: issued, expires: expires });\n    var encodedToken = jsonwebtoken_1.default.sign(session, secretKey, { expiresIn: expires });\n    return {\n        token: encodedToken,\n        issued: issued,\n        expires: expires\n    };\n}\nexports.encodeSession = encodeSession;\nfunction decodeSession(secretKey, sessionToken) {\n    var result;\n    try {\n        result = jsonwebtoken_1.default.verify(sessionToken, secretKey);\n    }\n    catch (_e) {\n        var e = _e;\n        // These error strings can be found here:\n        // https://github.com/hokaccha/node-jwt-simple/blob/c58bfe5e5bb049015fcd55be5fc1b2d5c652dbcd/lib/jwt.js\n        if (e.message === \"No token supplied\" || e.message === \"Not enough or too many segments\") {\n            return {\n                type: \"invalid-token\"\n            };\n        }\n        if (e.message === \"Signature verification failed\" || e.message === \"Algorithm not supported\") {\n            return {\n                type: \"integrity-error\"\n            };\n        }\n        // Handle json parse errors, thrown when the payload is nonsense\n        if (e.message.indexOf(\"Unexpected token\") === 0) {\n            return {\n                type: \"invalid-token\"\n            };\n        }\n        throw e;\n    }\n    return {\n        type: \"valid\",\n        session: result\n    };\n}\nexports.decodeSession = decodeSession;\nfunction checkExpirationStatus(token) {\n    var now = Date.now();\n    if (token.expires > now)\n        return \"active\";\n    // Find the timestamp for the end of the token's grace period\n    var threeHoursInMs = 3 * 60 * 60 * 1000;\n    var threeHoursAfterExpiration = token.expires + threeHoursInMs;\n    if (threeHoursAfterExpiration > now)\n        return \"grace\";\n    return \"expired\";\n}\nexports.checkExpirationStatus = checkExpirationStatus;\n\n\n//# sourceURL=webpack:///./src/auth/services/jwt.service.ts?");

/***/ }),

/***/ "./src/auth/services/users.service.ts":
/*!********************************************!*\
  !*** ./src/auth/services/users.service.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar user_database_1 = __webpack_require__(/*! ../user.database */ \"./src/auth/user.database.ts\");\nvar uuid_1 = __webpack_require__(/*! uuid */ \"uuid\");\nvar UsersService = /** @class */ (function () {\n    function UsersService() {\n        this.db = new user_database_1.UserDatabase();\n    }\n    UsersService.prototype.create = function (partialUser) {\n        return __awaiter(this, void 0, void 0, function () {\n            var user;\n            return __generator(this, function (_a) {\n                user = __assign(__assign({}, partialUser), { id: uuid_1.v4() });\n                return [2 /*return*/, this.db.create(user)];\n            });\n        });\n    };\n    UsersService.prototype.getUser = function (user) {\n        return __awaiter(this, void 0, void 0, function () {\n            var userId, newId;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0: return [4 /*yield*/, this.db.getUserId(user)];\n                    case 1:\n                        userId = _a.sent();\n                        if (!!userId) return [3 /*break*/, 3];\n                        return [4 /*yield*/, this.create(user)];\n                    case 2:\n                        newId = _a.sent();\n                        return [2 /*return*/, this.db.getById(newId)];\n                    case 3: return [2 /*return*/, this.db.getById(userId)];\n                }\n            });\n        });\n    };\n    UsersService.prototype.getUserId = function (user) {\n        return __awaiter(this, void 0, void 0, function () {\n            var _this = this;\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.getUserId(user).then(function (userId) {\n                        if (!userId) {\n                            return _this.create(user);\n                        }\n                        else {\n                            return userId;\n                        }\n                    })];\n            });\n        });\n    };\n    return UsersService;\n}());\nexports.UsersService = UsersService;\n\n\n//# sourceURL=webpack:///./src/auth/services/users.service.ts?");

/***/ }),

/***/ "./src/auth/user.database.ts":
/*!***********************************!*\
  !*** ./src/auth/user.database.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar firebase_service_1 = __importDefault(__webpack_require__(/*! ../services/firebase-service */ \"./src/services/firebase-service.ts\"));\nvar UserDatabase = /** @class */ (function () {\n    function UserDatabase() {\n        var _this = this;\n        this.db = firebase_service_1.default.database();\n        this.usersRef = this.db.ref(\"server/saving-data/users\");\n        this.usersRef.on('value', function (snap) {\n            _this.users = snap && snap.val(); // Keep the local user object synced with the Firebase userRef \n        });\n    }\n    UserDatabase.prototype.create = function (user) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.usersRef.push(user).toString()];\n            });\n        });\n    };\n    UserDatabase.prototype.getUserId = function (requested) {\n        return __awaiter(this, void 0, void 0, function () {\n            var _this = this;\n            return __generator(this, function (_a) {\n                if (!this.users) {\n                    return [2 /*return*/, undefined];\n                }\n                return [2 /*return*/, Object.keys(this.users).find(function (key) { return _this.findUserId(key, requested); })];\n            });\n        });\n    };\n    UserDatabase.prototype.getById = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.users[id]];\n            });\n        });\n    };\n    UserDatabase.prototype.findUserId = function (key, userToFind) {\n        var actualUser = this.users[key];\n        return actualUser.email === userToFind.email;\n        // this.users[key].email === requested.email &&\n        // this.users[key].firstName === requested.firstName &&\n        // this.users[key].email === requested.lastName\n    };\n    ;\n    return UserDatabase;\n}());\nexports.UserDatabase = UserDatabase;\n\n\n//# sourceURL=webpack:///./src/auth/user.database.ts?");

/***/ }),

/***/ "./src/credit-card/cc-spending/cc-spending.model.ts":
/*!**********************************************************!*\
  !*** ./src/credit-card/cc-spending/cc-spending.model.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar ts_money_1 = __webpack_require__(/*! ts-money */ \"ts-money\");\nvar CreditCardSpending = /** @class */ (function () {\n    function CreditCardSpending(amount, description, date, creditCardId) {\n        this.amount = amount;\n        this.description = description;\n        this.date = date;\n        this.creditCardId = creditCardId;\n    }\n    CreditCardSpending.fromApiResponse = function (response) {\n        var amount = ts_money_1.Money.fromDecimal(response.amount, response.currency);\n        var description = response.description;\n        var date = new Date(Date.parse(response.date));\n        var creditCardId = response.creditCardId;\n        return new CreditCardSpending(amount, description, date, creditCardId);\n    };\n    return CreditCardSpending;\n}());\nexports.CreditCardSpending = CreditCardSpending;\n\n\n//# sourceURL=webpack:///./src/credit-card/cc-spending/cc-spending.model.ts?");

/***/ }),

/***/ "./src/credit-card/cc-spending/spendings.database.ts":
/*!***********************************************************!*\
  !*** ./src/credit-card/cc-spending/spendings.database.ts ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar firebase_service_1 = __importDefault(__webpack_require__(/*! ../../services/firebase-service */ \"./src/services/firebase-service.ts\"));\nvar lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nvar cc_spending_model_1 = __webpack_require__(/*! ./cc-spending.model */ \"./src/credit-card/cc-spending/cc-spending.model.ts\");\nvar CreditCardSpendingsDatabase = /** @class */ (function () {\n    function CreditCardSpendingsDatabase() {\n        var _this = this;\n        this.db = firebase_service_1.default.database();\n        this.spendingsRef = this.db.ref(\"server/saving-data/cc-spendings\");\n        var aa = {};\n        this.spendingsRef.on('value' || false, function (snap) {\n            console.log('Updated');\n            snap && snap.val() &&\n                lodash_1.default.map(snap.val(), function (val, key) {\n                    aa[key] = cc_spending_model_1.CreditCardSpending.fromApiResponse(val);\n                });\n            _this.spendings = aa; // Keep the local user object synced with the Firebase userRef \n        });\n    }\n    CreditCardSpendingsDatabase.prototype.get = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.spendings];\n            });\n        });\n    };\n    CreditCardSpendingsDatabase.prototype.getById = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.spendings[id]];\n            });\n        });\n    };\n    CreditCardSpendingsDatabase.prototype.getByAccount = function (accountId, month, year) {\n        return __awaiter(this, void 0, void 0, function () {\n            var filtered;\n            var _this = this;\n            return __generator(this, function (_a) {\n                console.log(month + '/' + year);\n                filtered = Object.keys(this.spendings).reduce(function (toFilter, key) {\n                    var spending = _this.spendings[key];\n                    if (spending.creditCardId == accountId &&\n                        (spending.date.getMonth() + 1) == month &&\n                        spending.date.getFullYear() == year) {\n                        toFilter[key] = spending;\n                    }\n                    ;\n                    return toFilter;\n                }, {});\n                return [2 /*return*/, filtered];\n            });\n        });\n    };\n    CreditCardSpendingsDatabase.prototype.create = function (spending) {\n        return __awaiter(this, void 0, void 0, function () {\n            var dateString;\n            return __generator(this, function (_a) {\n                try {\n                    dateString = spending.date.toLocaleDateString();\n                    return [2 /*return*/, this.spendingsRef.push({\n                            amount: spending.amount.toDecimal(),\n                            currency: spending.amount.currency,\n                            creditCardId: spending.creditCardId,\n                            description: spending.description,\n                            date: dateString\n                        }).toString()];\n                }\n                catch (e) {\n                    console.log(e);\n                    throw e;\n                }\n                return [2 /*return*/];\n            });\n        });\n    };\n    CreditCardSpendingsDatabase.prototype.update = function (id, spending) {\n        return __awaiter(this, void 0, void 0, function () {\n            var dateString;\n            return __generator(this, function (_a) {\n                dateString = spending.date.toLocaleDateString();\n                return [2 /*return*/, this.spendingsRef.child(id).set({\n                        amount: spending.amount.toDecimal(),\n                        currency: spending.amount.currency,\n                        creditCardId: spending.creditCardId,\n                        description: spending.description,\n                        date: dateString\n                    })];\n            });\n        });\n    };\n    CreditCardSpendingsDatabase.prototype.remove = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                delete this.spendings[id];\n                return [2 /*return*/, this.spendingsRef.child(id).set(null).then(function () {\n                    }).catch(function (error) { throw error; })];\n            });\n        });\n    };\n    return CreditCardSpendingsDatabase;\n}());\nexports.CreditCardSpendingsDatabase = CreditCardSpendingsDatabase;\n\n\n//# sourceURL=webpack:///./src/credit-card/cc-spending/spendings.database.ts?");

/***/ }),

/***/ "./src/credit-card/cc-spending/spendings.router.ts":
/*!*********************************************************!*\
  !*** ./src/credit-card/cc-spending/spendings.router.ts ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Required External Modules and Interfaces\n */\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar cc_spending_model_1 = __webpack_require__(/*! ./cc-spending.model */ \"./src/credit-card/cc-spending/cc-spending.model.ts\");\nvar spendings_service_1 = __webpack_require__(/*! ./spendings.service */ \"./src/credit-card/cc-spending/spendings.service.ts\");\n/**\n * Router Definition\n */\nexports.ccSpendingsRouter = express_1.default.Router();\n/**\n *  Service Definition\n */\nvar ccSpendingsService = new spendings_service_1.CreditCardSpendingsService();\n/**\n * Controller Definitions\n */\n// GET expenses/\nexports.ccSpendingsRouter.get(\"/\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var expenses, e_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, ccSpendingsService.getAll()];\n            case 1:\n                expenses = _a.sent();\n                res.status(200).send(expenses);\n                return [3 /*break*/, 3];\n            case 2:\n                e_1 = _a.sent();\n                res.status(404).send(e_1.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// // GET expenses/:id\nexports.ccSpendingsRouter.get(\"/:id\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var expense, e_2;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, ccSpendingsService.get(req.params.id)];\n            case 1:\n                expense = _a.sent();\n                res.status(200).send(expense);\n                return [3 /*break*/, 3];\n            case 2:\n                e_2 = _a.sent();\n                res.status(404).send(e_2.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// // GET expenses/:accountId\nexports.ccSpendingsRouter.get(\"/byAccount/:accountId\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var expenses, e_3;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, ccSpendingsService.getByAccount(req.params.accountId, req.query.month, req.query.year)];\n            case 1:\n                expenses = _a.sent();\n                console.log(JSON.stringify(expenses));\n                res.status(200).send(expenses);\n                return [3 /*break*/, 3];\n            case 2:\n                e_3 = _a.sent();\n                res.status(404).send(e_3.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// POST expenses/\nexports.ccSpendingsRouter.post(\"/\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var expense, e_4;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                expense = cc_spending_model_1.CreditCardSpending.fromApiResponse(req.body);\n                return [4 /*yield*/, ccSpendingsService.create(expense).then(function (id) {\n                        return res.sendStatus(201).send(id);\n                    })];\n            case 1:\n                _a.sent();\n                return [3 /*break*/, 3];\n            case 2:\n                e_4 = _a.sent();\n                return [2 /*return*/, res.status(404).send(e_4.message)];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\nexports.ccSpendingsRouter.post(\"/payments\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var payments, e_5;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                payments = req.body.payments;\n                return [4 /*yield*/, ccSpendingsService.createWithPayments(req.body.spending, payments).then(function (spendings) {\n                        res.sendStatus(201).send(spendings);\n                    })];\n            case 1:\n                _a.sent();\n                return [3 /*break*/, 3];\n            case 2:\n                e_5 = _a.sent();\n                res.status(404).send(e_5.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// PUT expenses/\nexports.ccSpendingsRouter.put(\"/:id\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var expense, e_6;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                expense = req.body.expense;\n                return [4 /*yield*/, ccSpendingsService.update(req.params.id, expense)];\n            case 1:\n                _a.sent();\n                res.sendStatus(200);\n                return [3 /*break*/, 3];\n            case 2:\n                e_6 = _a.sent();\n                res.status(500).send(e_6.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// DELETE expenses/:id\nexports.ccSpendingsRouter.delete(\"/:id\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var e_7;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, ccSpendingsService.remove(req.params.id)];\n            case 1:\n                _a.sent();\n                res.sendStatus(200);\n                return [3 /*break*/, 3];\n            case 2:\n                e_7 = _a.sent();\n                res.status(500).send(e_7.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n\n\n//# sourceURL=webpack:///./src/credit-card/cc-spending/spendings.router.ts?");

/***/ }),

/***/ "./src/credit-card/cc-spending/spendings.service.ts":
/*!**********************************************************!*\
  !*** ./src/credit-card/cc-spending/spendings.service.ts ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar cc_spending_model_1 = __webpack_require__(/*! ./cc-spending.model */ \"./src/credit-card/cc-spending/cc-spending.model.ts\");\nvar spendings_database_1 = __webpack_require__(/*! ./spendings.database */ \"./src/credit-card/cc-spending/spendings.database.ts\");\nvar ts_date_1 = __webpack_require__(/*! ts-date */ \"ts-date\");\nvar lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nvar CreditCardSpendingsService = /** @class */ (function () {\n    function CreditCardSpendingsService() {\n        this.db = new spendings_database_1.CreditCardSpendingsDatabase();\n    }\n    CreditCardSpendingsService.prototype.create = function (record) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.create(record)];\n            });\n        });\n    };\n    CreditCardSpendingsService.prototype.createWithPayments = function (record, payments) {\n        return __awaiter(this, void 0, void 0, function () {\n            var spending, rawDescription, initialDate, amount, i;\n            return __generator(this, function (_a) {\n                spending = cc_spending_model_1.CreditCardSpending.fromApiResponse(record);\n                rawDescription = spending.description;\n                initialDate = spending.date;\n                amount = spending.amount.divide(payments);\n                for (i = 0; i < payments; i++) {\n                    spending.date = ts_date_1.addMonth(initialDate, i);\n                    spending.amount = amount;\n                    spending.description = rawDescription + (\" (\" + (i + 1) + \"/\" + payments + \")\");\n                    this.db.create(spending);\n                }\n                return [2 /*return*/];\n            });\n        });\n    };\n    CreditCardSpendingsService.prototype.update = function (id, record) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.update(id, record)];\n            });\n        });\n    };\n    CreditCardSpendingsService.prototype.remove = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.remove(id)];\n            });\n        });\n    };\n    CreditCardSpendingsService.prototype.getAll = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.get()];\n            });\n        });\n    };\n    CreditCardSpendingsService.prototype.get = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.getById(id)];\n            });\n        });\n    };\n    CreditCardSpendingsService.prototype.getByAccount = function (accountId, month, year) {\n        return __awaiter(this, void 0, void 0, function () {\n            var map;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        map = {};\n                        return [4 /*yield*/, this.db.getByAccount(accountId, month, year).then(function (spendings) {\n                                lodash_1.default.map(spendings, function (spending, key) {\n                                    map[key] =\n                                        {\n                                            \"amount\": spending.amount.toDecimal(),\n                                            \"description\": spending.description,\n                                            \"date\": spending.date,\n                                            \"creditCardId\": spending.creditCardId,\n                                            \"currency\": spending.amount.currency\n                                        };\n                                });\n                            })];\n                    case 1:\n                        _a.sent();\n                        return [2 /*return*/, map];\n                }\n            });\n        });\n    };\n    return CreditCardSpendingsService;\n}());\nexports.CreditCardSpendingsService = CreditCardSpendingsService;\n\n\n//# sourceURL=webpack:///./src/credit-card/cc-spending/spendings.service.ts?");

/***/ }),

/***/ "./src/credit-card/credit-card.database.ts":
/*!*************************************************!*\
  !*** ./src/credit-card/credit-card.database.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar firebase_admin_1 = __importDefault(__webpack_require__(/*! firebase-admin */ \"firebase-admin\"));\nvar CreditCardDatabase = /** @class */ (function () {\n    function CreditCardDatabase() {\n        var _this = this;\n        this.db = firebase_admin_1.default.database();\n        this.accountsRef = this.db.ref(\"server/saving-data/credit-cards\");\n        this.accountsRef.on('value', function (snap) {\n            _this.accounts = snap && snap.val(); // Keep the local user object synced with the Firebase userRef \n        });\n    }\n    CreditCardDatabase.prototype.get = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.accounts];\n            });\n        });\n    };\n    CreditCardDatabase.prototype.getById = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.accounts[id]];\n            });\n        });\n    };\n    CreditCardDatabase.prototype.getByUser = function (userId) {\n        return __awaiter(this, void 0, void 0, function () {\n            var filtered;\n            var _this = this;\n            return __generator(this, function (_a) {\n                filtered = Object.keys(this.accounts).reduce(function (filtered, key) {\n                    if (_this.accounts[key].user == userId)\n                        filtered[key] = _this.accounts[key];\n                    return filtered;\n                }, {});\n                return [2 /*return*/, filtered];\n            });\n        });\n    };\n    CreditCardDatabase.prototype.create = function (account) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.accountsRef.push(account).toString()];\n            });\n        });\n    };\n    CreditCardDatabase.prototype.update = function (id, account) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.accountsRef.child(id).set(account)];\n            });\n        });\n    };\n    CreditCardDatabase.prototype.remove = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.accountsRef.child(id).set(null)];\n            });\n        });\n    };\n    return CreditCardDatabase;\n}());\nexports.CreditCardDatabase = CreditCardDatabase;\n\n\n//# sourceURL=webpack:///./src/credit-card/credit-card.database.ts?");

/***/ }),

/***/ "./src/credit-card/credit-card.model.ts":
/*!**********************************************!*\
  !*** ./src/credit-card/credit-card.model.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar ts_money_1 = __webpack_require__(/*! ts-money */ \"ts-money\");\nvar CreditCard = /** @class */ (function () {\n    function CreditCard(user, name, hasLimit, closingDay, paymentDay, limit) {\n        this.user = user;\n        this.name = name;\n        this.hasLimit = hasLimit;\n        this.closingDay = closingDay;\n        this.paymentDay = paymentDay;\n        this.limit = limit;\n    }\n    CreditCard.fromApiRequest = function (response, userId) {\n        var closingDay = response.closingDay;\n        var paymentDay = response.paymentDay;\n        var hasLimit = response.hasLimit;\n        var name = response.name;\n        if (hasLimit) {\n            var limit = new ts_money_1.Money(response.limitAmount, response.currency);\n            return new CreditCard(userId, name, hasLimit, closingDay, paymentDay, limit);\n        }\n        return new CreditCard(userId, name, hasLimit, closingDay, paymentDay);\n    };\n    return CreditCard;\n}());\nexports.CreditCard = CreditCard;\n\n\n//# sourceURL=webpack:///./src/credit-card/credit-card.model.ts?");

/***/ }),

/***/ "./src/credit-card/credit-card.router.ts":
/*!***********************************************!*\
  !*** ./src/credit-card/credit-card.router.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Required External Modules and Interfaces\n */\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar credit_card_service_1 = __webpack_require__(/*! ./credit-card.service */ \"./src/credit-card/credit-card.service.ts\");\nvar auth_service_1 = __webpack_require__(/*! ../auth/services/auth.service */ \"./src/auth/services/auth.service.ts\");\nvar credit_card_model_1 = __webpack_require__(/*! ./credit-card.model */ \"./src/credit-card/credit-card.model.ts\");\n/**\n * Router Definition\n */\nexports.ccAccountsRouter = express_1.default.Router();\n/**\n *  Service Definition\n */\nvar accountsService = new credit_card_service_1.CreditCardService();\nvar authService = new auth_service_1.AuthService();\n/**\n * Controller Definitions\n */\n// GET \nexports.ccAccountsRouter.get(\"/\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var authHeader, authToken, userId, accounts, e_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 3, , 4]);\n                authHeader = req.header('X-JWT-Token');\n                authToken = authHeader ? authHeader : '';\n                return [4 /*yield*/, authService.getUserIdFromToken(authToken)];\n            case 1:\n                userId = _a.sent();\n                return [4 /*yield*/, accountsService.getByUser(userId)];\n            case 2:\n                accounts = _a.sent();\n                res.status(200).send(accounts);\n                return [3 /*break*/, 4];\n            case 3:\n                e_1 = _a.sent();\n                res.status(404).send(e_1.message);\n                return [3 /*break*/, 4];\n            case 4: return [2 /*return*/];\n        }\n    });\n}); });\n// // GET :id\nexports.ccAccountsRouter.get(\"/:id\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var account, e_2;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, accountsService.get(req.params.id)];\n            case 1:\n                account = _a.sent();\n                res.status(200).send(account);\n                return [3 /*break*/, 3];\n            case 2:\n                e_2 = _a.sent();\n                res.status(404).send(e_2.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// // GET :userId\nexports.ccAccountsRouter.get(\"/byUser/:userId\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var accounts, e_3;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, accountsService.getByUser(req.params.userId)];\n            case 1:\n                accounts = _a.sent();\n                res.status(200).send(accounts);\n                return [3 /*break*/, 3];\n            case 2:\n                e_3 = _a.sent();\n                res.status(404).send(e_3.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// POST \nexports.ccAccountsRouter.post(\"/\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var authHeader, authToken, userId, account, e_4;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 3, , 4]);\n                authHeader = req.header('X-JWT-Token');\n                authToken = authHeader ? authHeader : '';\n                return [4 /*yield*/, authService.getUserIdFromToken(authToken)];\n            case 1:\n                userId = _a.sent();\n                account = credit_card_model_1.CreditCard.fromApiRequest(req.body, userId);\n                return [4 /*yield*/, accountsService.create(account).then(function (id) {\n                        res.sendStatus(201).send(id);\n                    })];\n            case 2:\n                _a.sent();\n                return [3 /*break*/, 4];\n            case 3:\n                e_4 = _a.sent();\n                res.status(400).send(e_4.message);\n                return [3 /*break*/, 4];\n            case 4: return [2 /*return*/];\n        }\n    });\n}); });\n// PUT \nexports.ccAccountsRouter.put(\"/:id\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var account, e_5;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                account = req.body.account;\n                return [4 /*yield*/, accountsService.update(req.params.id, account)];\n            case 1:\n                _a.sent();\n                res.sendStatus(200);\n                return [3 /*break*/, 3];\n            case 2:\n                e_5 = _a.sent();\n                res.status(500).send(e_5.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// DELETE\nexports.ccAccountsRouter.delete(\"/:id\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var e_6;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, accountsService.remove(req.params.id)];\n            case 1:\n                _a.sent();\n                res.sendStatus(200);\n                return [3 /*break*/, 3];\n            case 2:\n                e_6 = _a.sent();\n                res.status(500).send(e_6.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n\n\n//# sourceURL=webpack:///./src/credit-card/credit-card.router.ts?");

/***/ }),

/***/ "./src/credit-card/credit-card.service.ts":
/*!************************************************!*\
  !*** ./src/credit-card/credit-card.service.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar credit_card_database_1 = __webpack_require__(/*! ./credit-card.database */ \"./src/credit-card/credit-card.database.ts\");\nvar CreditCardService = /** @class */ (function () {\n    function CreditCardService() {\n        this.db = new credit_card_database_1.CreditCardDatabase();\n    }\n    CreditCardService.prototype.create = function (account) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.create(account)];\n            });\n        });\n    };\n    CreditCardService.prototype.update = function (id, account) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.update(id, account)];\n            });\n        });\n    };\n    CreditCardService.prototype.remove = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.remove(id)];\n            });\n        });\n    };\n    CreditCardService.prototype.getAll = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.get()];\n            });\n        });\n    };\n    CreditCardService.prototype.get = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.getById(id)];\n            });\n        });\n    };\n    CreditCardService.prototype.getByUser = function (userId) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.getByUser(userId)];\n            });\n        });\n    };\n    return CreditCardService;\n}());\nexports.CreditCardService = CreditCardService;\n\n\n//# sourceURL=webpack:///./src/credit-card/credit-card.service.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Required External Modules\n */\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar dotenv = __importStar(__webpack_require__(/*! dotenv */ \"dotenv\"));\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\nvar auth_middleware_1 = __webpack_require__(/*! ./middleware/auth.middleware */ \"./src/middleware/auth.middleware.ts\");\nvar error_middleware_1 = __webpack_require__(/*! ./middleware/error.middleware */ \"./src/middleware/error.middleware.ts\");\nvar notFound_middleware_1 = __webpack_require__(/*! ./middleware/notFound.middleware */ \"./src/middleware/notFound.middleware.ts\");\nvar expenses_router_1 = __webpack_require__(/*! ./transactions/expense/expenses.router */ \"./src/transactions/expense/expenses.router.ts\");\nvar incomes_router_1 = __webpack_require__(/*! ./transactions/income/incomes.router */ \"./src/transactions/income/incomes.router.ts\");\nvar spendings_router_1 = __webpack_require__(/*! ./credit-card/cc-spending/spendings.router */ \"./src/credit-card/cc-spending/spendings.router.ts\");\nvar credit_card_router_1 = __webpack_require__(/*! ./credit-card/credit-card.router */ \"./src/credit-card/credit-card.router.ts\");\nvar moskaAccount_router_1 = __webpack_require__(/*! ./account/moskaAccount.router */ \"./src/account/moskaAccount.router.ts\");\nvar auth_router_1 = __webpack_require__(/*! ./auth/auth.router */ \"./src/auth/auth.router.ts\");\ndotenv.config();\n/**\n * App Variables\n */\nif (!process.env.PORT) {\n    process.exit(1);\n}\nvar PORT = parseInt(process.env.PORT, 10);\nvar app = express_1.default();\n/**\n *  App Configuration\n */\napp.use(helmet_1.default());\napp.use(cors_1.default());\napp.use(express_1.default.json());\napp.use(\"/auth\", auth_router_1.authRouter);\napp.use(auth_middleware_1.requireJwtMiddleware);\napp.use(\"/expenses\", expenses_router_1.expensesRouter);\napp.use(\"/incomes\", incomes_router_1.incomesRouter);\napp.use(\"/ccSpendings\", spendings_router_1.ccSpendingsRouter);\napp.use(\"/creditCards\", credit_card_router_1.ccAccountsRouter);\napp.use(\"/accounts\", moskaAccount_router_1.accountsRouter);\napp.use(error_middleware_1.errorHandler);\napp.use(notFound_middleware_1.notFoundHandler);\n/**\n * Server Activation\n */\nvar server = app.listen(PORT, function () {\n    console.log(\"Listening on port \" + PORT);\n});\nif (true) {\n    module.hot.accept();\n    module.hot.dispose(function () { return server.close(); });\n}\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/middleware/auth.middleware.ts":
/*!*******************************************!*\
  !*** ./src/middleware/auth.middleware.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __assign = (this && this.__assign) || function () {\n    __assign = Object.assign || function(t) {\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\n            s = arguments[i];\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\n                t[p] = s[p];\n        }\n        return t;\n    };\n    return __assign.apply(this, arguments);\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar jwt_service_1 = __webpack_require__(/*! ../auth/services/jwt.service */ \"./src/auth/services/jwt.service.ts\");\n/**\n * Express middleware, checks for a valid JSON Web Token and returns 401 Unauthorized if one isn't found.\n */\nvar jwtKey = process.env.JWT_SECRET_KEY ? process.env.JWT_SECRET_KEY : 'gmOfLtMS1/6zdF4j18+5[]@OT\"IWj>xd';\nfunction requireJwtMiddleware(request, response, next) {\n    var unauthorized = function (message) { return response.status(401).json({\n        ok: false,\n        status: 401,\n        message: message\n    }); };\n    var requestHeader = \"X-JWT-Token\";\n    var responseHeader = \"X-Renewed-JWT-Token\";\n    var header = request.header(requestHeader);\n    if (!header) {\n        return unauthorized(\"Required \" + requestHeader + \" header not found.\");\n    }\n    var decodedSession = jwt_service_1.decodeSession(jwtKey, header);\n    if (decodedSession.type === \"integrity-error\" || decodedSession.type === \"invalid-token\") {\n        return unauthorized(\"Failed to decode or validate authorization token. Reason: \" + decodedSession.type + \".\");\n    }\n    var expiration = jwt_service_1.checkExpirationStatus(decodedSession.session);\n    if (expiration === \"expired\") {\n        return unauthorized(\"Authorization token has expired. Please create a new authorization token.\");\n    }\n    var session;\n    if (expiration === \"grace\") {\n        // Automatically renew the session and send it back with the response\n        var _a = jwt_service_1.encodeSession(jwtKey, decodedSession.session), token = _a.token, expires = _a.expires, issued = _a.issued;\n        session = __assign(__assign({}, decodedSession.session), { expires: expires, issued: issued });\n        response.setHeader(responseHeader, token);\n    }\n    else {\n        session = decodedSession.session;\n    }\n    // Set the session on response.locals object for routes to access\n    response.locals = __assign(__assign({}, response.locals), { session: session });\n    // Request has a valid or renewed session. Call next to continue to the authenticated route handler\n    next();\n}\nexports.requireJwtMiddleware = requireJwtMiddleware;\n\n\n//# sourceURL=webpack:///./src/middleware/auth.middleware.ts?");

/***/ }),

/***/ "./src/middleware/error.middleware.ts":
/*!********************************************!*\
  !*** ./src/middleware/error.middleware.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.errorHandler = function (error, request, response, next) {\n    var status = error.statusCode || 500;\n    var message = error.message || \"It's not you. It's us. We are having some problems.\";\n    response.status(status).send(message);\n};\n\n\n//# sourceURL=webpack:///./src/middleware/error.middleware.ts?");

/***/ }),

/***/ "./src/middleware/notFound.middleware.ts":
/*!***********************************************!*\
  !*** ./src/middleware/notFound.middleware.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.notFoundHandler = function (request, response, next) {\n    var message = \"Resource not found\";\n    response.status(404).send(message);\n};\n\n\n//# sourceURL=webpack:///./src/middleware/notFound.middleware.ts?");

/***/ }),

/***/ "./src/services/firebase-service.ts":
/*!******************************************!*\
  !*** ./src/services/firebase-service.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];\n    result[\"default\"] = mod;\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar firebase_admin_1 = __importDefault(__webpack_require__(/*! firebase-admin */ \"firebase-admin\"));\nvar serviceAccount = __importStar(__webpack_require__(/*! ../../serviceAccount.json */ \"./serviceAccount.json\"));\nfirebase_admin_1.default.initializeApp({\n    credential: firebase_admin_1.default.credential.cert({\n        privateKey: serviceAccount.private_key,\n        projectId: serviceAccount.project_id,\n        clientEmail: serviceAccount.client_email\n    }),\n    databaseURL: 'https://moska-fbb04.firebaseio.com/'\n});\nexports.default = firebase_admin_1.default;\n\n\n//# sourceURL=webpack:///./src/services/firebase-service.ts?");

/***/ }),

/***/ "./src/transactions/expense/expense.model.ts":
/*!***************************************************!*\
  !*** ./src/transactions/expense/expense.model.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar ts_money_1 = __webpack_require__(/*! ts-money */ \"ts-money\");\nvar Expense = /** @class */ (function () {\n    function Expense(amount, description, date, accountId) {\n        this.amount = amount;\n        this.description = description;\n        this.date = date;\n        this.accountId = accountId;\n    }\n    Expense.fromApiResponse = function (response) {\n        var amount = ts_money_1.Money.fromDecimal(response.amount, response.currency);\n        var description = response.description;\n        var date = new Date(Date.parse(response.date));\n        var accountId = response.accountId;\n        return new Expense(amount, description, date, accountId);\n    };\n    return Expense;\n}());\nexports.Expense = Expense;\n\n\n//# sourceURL=webpack:///./src/transactions/expense/expense.model.ts?");

/***/ }),

/***/ "./src/transactions/expense/expenses.database.ts":
/*!*******************************************************!*\
  !*** ./src/transactions/expense/expenses.database.ts ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar firebase_service_1 = __importDefault(__webpack_require__(/*! ../../services/firebase-service */ \"./src/services/firebase-service.ts\"));\nvar expense_model_1 = __webpack_require__(/*! ./expense.model */ \"./src/transactions/expense/expense.model.ts\");\nvar lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nvar ExpensesDatabase = /** @class */ (function () {\n    function ExpensesDatabase() {\n        var _this = this;\n        this.db = firebase_service_1.default.database();\n        this.expensesRef = this.db.ref(\"server/saving-data/expenses\");\n        var aa = {};\n        this.expensesRef.on('value' || false, function (snap) {\n            snap && snap.val() &&\n                lodash_1.default.map(snap.val(), function (val, key) {\n                    aa[key] = expense_model_1.Expense.fromApiResponse(val);\n                });\n            _this.expenses = aa; // Keep the local user object synced with the Firebase userRef \n        });\n    }\n    ExpensesDatabase.prototype.get = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.expenses];\n            });\n        });\n    };\n    ExpensesDatabase.prototype.getById = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.expenses[id]];\n            });\n        });\n    };\n    ExpensesDatabase.prototype.getByAccount = function (accountId, month, year) {\n        return __awaiter(this, void 0, void 0, function () {\n            var filtered;\n            var _this = this;\n            return __generator(this, function (_a) {\n                console.log(month + '/' + year);\n                filtered = Object.keys(this.expenses).reduce(function (toFilter, key) {\n                    var spending = _this.expenses[key];\n                    if (spending.accountId == accountId &&\n                        (spending.date.getMonth() + 1) == month &&\n                        spending.date.getFullYear() == year) {\n                        toFilter[key] = spending;\n                    }\n                    ;\n                    return toFilter;\n                }, {});\n                return [2 /*return*/, filtered];\n            });\n        });\n    };\n    ExpensesDatabase.prototype.create = function (spending) {\n        return __awaiter(this, void 0, void 0, function () {\n            var dateString;\n            return __generator(this, function (_a) {\n                try {\n                    dateString = spending.date.toLocaleDateString();\n                    return [2 /*return*/, this.expensesRef.push({\n                            amount: spending.amount.toDecimal(),\n                            currency: spending.amount.currency,\n                            accountId: spending.accountId,\n                            description: spending.description,\n                            date: dateString\n                        }).toString()];\n                }\n                catch (e) {\n                    console.log(e);\n                    throw e;\n                }\n                return [2 /*return*/];\n            });\n        });\n    };\n    ExpensesDatabase.prototype.update = function (id, spending) {\n        return __awaiter(this, void 0, void 0, function () {\n            var dateString;\n            return __generator(this, function (_a) {\n                dateString = spending.date.toLocaleDateString();\n                return [2 /*return*/, this.expensesRef.child(id).set({\n                        amount: spending.amount.toDecimal(),\n                        currency: spending.amount.currency,\n                        accountId: spending.accountId,\n                        description: spending.description,\n                        date: dateString\n                    })];\n            });\n        });\n    };\n    ExpensesDatabase.prototype.remove = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                delete this.expenses[id];\n                return [2 /*return*/, this.expensesRef.child(id).set(null).then(function () {\n                    }).catch(function (error) { throw error; })];\n            });\n        });\n    };\n    return ExpensesDatabase;\n}());\nexports.ExpensesDatabase = ExpensesDatabase;\n\n\n//# sourceURL=webpack:///./src/transactions/expense/expenses.database.ts?");

/***/ }),

/***/ "./src/transactions/expense/expenses.router.ts":
/*!*****************************************************!*\
  !*** ./src/transactions/expense/expenses.router.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Required External Modules and Interfaces\n */\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar expense_model_1 = __webpack_require__(/*! ./expense.model */ \"./src/transactions/expense/expense.model.ts\");\nvar expenses_service_1 = __webpack_require__(/*! ./expenses.service */ \"./src/transactions/expense/expenses.service.ts\");\nvar moskaAccount_service_1 = __webpack_require__(/*! ../../account/moskaAccount.service */ \"./src/account/moskaAccount.service.ts\");\n/**\n * Router Definition\n */\nexports.expensesRouter = express_1.default.Router();\n/**\n *  Service Definition\n */\nvar expensesService = new expenses_service_1.ExpensesService();\nvar accountService = new moskaAccount_service_1.AccountService();\n/**\n * Controller Definitions\n */\n// GET expenses/\nexports.expensesRouter.get(\"/\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var expenses, e_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, expensesService.getAll()];\n            case 1:\n                expenses = _a.sent();\n                res.status(200).send(expenses);\n                return [3 /*break*/, 3];\n            case 2:\n                e_1 = _a.sent();\n                res.status(404).send(e_1.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// // GET expenses/:id\nexports.expensesRouter.get(\"/:id\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var expense, e_2;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, expensesService.get(req.params.id)];\n            case 1:\n                expense = _a.sent();\n                res.status(200).send(expense);\n                return [3 /*break*/, 3];\n            case 2:\n                e_2 = _a.sent();\n                res.status(404).send(e_2.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// // GET expenses/:accountId\nexports.expensesRouter.get(\"/byAccount/:accountId\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var records, e_3;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, expensesService.getByAccount(req.params.accountId, req.query.month, req.query.year)];\n            case 1:\n                records = _a.sent();\n                console.log(JSON.stringify(records));\n                res.status(200).send(records);\n                return [3 /*break*/, 3];\n            case 2:\n                e_3 = _a.sent();\n                res.status(404).send(e_3.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// // GET expenses/:userId\n// expensesRouter.get(\"/:userId\", async (req: Request, res: Response) => {\n//     const userId = parseInt(req.params.userId, 10);\n//     try {\n//         const expenses: Expenses = await expensesService.findByAccount(userId);\n//         res.status(200).send(expenses);\n//     } catch (e) {\n//         res.status(404).send(e.message);\n//     }\n// });\n// POST expenses/\nexports.expensesRouter.post(\"/\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var expense_1, e_4;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                expense_1 = expense_model_1.Expense.fromApiResponse(req.body);\n                return [4 /*yield*/, expensesService.create(expense_1).then(function (id) { return __awaiter(void 0, void 0, void 0, function () {\n                        return __generator(this, function (_a) {\n                            switch (_a.label) {\n                                case 0: return [4 /*yield*/, accountService.updateBalance(expense_1.accountId, expense_1.amount, \"sub\")];\n                                case 1:\n                                    _a.sent();\n                                    res.sendStatus(201).send(id);\n                                    return [2 /*return*/];\n                            }\n                        });\n                    }); })];\n            case 1:\n                _a.sent();\n                return [3 /*break*/, 3];\n            case 2:\n                e_4 = _a.sent();\n                res.status(404).send(e_4.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// PUT expenses/\nexports.expensesRouter.put(\"/:id\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var expense, e_5;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                expense = req.body.expense;\n                return [4 /*yield*/, expensesService.update(req.params.id, expense)];\n            case 1:\n                _a.sent();\n                res.sendStatus(200);\n                return [3 /*break*/, 3];\n            case 2:\n                e_5 = _a.sent();\n                res.status(500).send(e_5.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// DELETE expenses/:id\nexports.expensesRouter.delete(\"/:id\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var e_6;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, expensesService.get(req.params.id).then(function (expense) { return __awaiter(void 0, void 0, void 0, function () {\n                        return __generator(this, function (_a) {\n                            switch (_a.label) {\n                                case 0: return [4 /*yield*/, expensesService.remove(req.params.id).then(function (id) { return __awaiter(void 0, void 0, void 0, function () {\n                                        return __generator(this, function (_a) {\n                                            switch (_a.label) {\n                                                case 0: return [4 /*yield*/, accountService.updateBalance(expense.accountId, expense.amount, \"add\")];\n                                                case 1:\n                                                    _a.sent();\n                                                    res.sendStatus(201);\n                                                    return [2 /*return*/];\n                                            }\n                                        });\n                                    }); })];\n                                case 1:\n                                    _a.sent();\n                                    return [2 /*return*/];\n                            }\n                        });\n                    }); })];\n            case 1:\n                _a.sent();\n                return [3 /*break*/, 3];\n            case 2:\n                e_6 = _a.sent();\n                res.status(500).send(e_6.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n\n\n//# sourceURL=webpack:///./src/transactions/expense/expenses.router.ts?");

/***/ }),

/***/ "./src/transactions/expense/expenses.service.ts":
/*!******************************************************!*\
  !*** ./src/transactions/expense/expenses.service.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar expenses_database_1 = __webpack_require__(/*! ./expenses.database */ \"./src/transactions/expense/expenses.database.ts\");\nvar lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nvar ExpensesService = /** @class */ (function () {\n    function ExpensesService() {\n        this.db = new expenses_database_1.ExpensesDatabase();\n    }\n    ExpensesService.prototype.create = function (expense) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.create(expense)];\n            });\n        });\n    };\n    ExpensesService.prototype.update = function (id, expense) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.update(id, expense)];\n            });\n        });\n    };\n    ExpensesService.prototype.remove = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.remove(id)];\n            });\n        });\n    };\n    ExpensesService.prototype.getAll = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.get()];\n            });\n        });\n    };\n    ExpensesService.prototype.get = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.getById(id)];\n            });\n        });\n    };\n    ExpensesService.prototype.getByAccount = function (accountId, month, year) {\n        return __awaiter(this, void 0, void 0, function () {\n            var map;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        map = {};\n                        return [4 /*yield*/, this.db.getByAccount(accountId, month, year).then(function (expenses) {\n                                lodash_1.default.map(expenses, function (spending, key) {\n                                    map[key] =\n                                        {\n                                            \"amount\": spending.amount.toDecimal(),\n                                            \"description\": spending.description,\n                                            \"date\": spending.date,\n                                            \"accountId\": spending.accountId,\n                                            \"currency\": spending.amount.currency\n                                        };\n                                });\n                            })];\n                    case 1:\n                        _a.sent();\n                        return [2 /*return*/, map];\n                }\n            });\n        });\n    };\n    return ExpensesService;\n}());\nexports.ExpensesService = ExpensesService;\n\n\n//# sourceURL=webpack:///./src/transactions/expense/expenses.service.ts?");

/***/ }),

/***/ "./src/transactions/income/income.model.ts":
/*!*************************************************!*\
  !*** ./src/transactions/income/income.model.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar ts_money_1 = __webpack_require__(/*! ts-money */ \"ts-money\");\nvar Income = /** @class */ (function () {\n    function Income(amount, description, date, accountId) {\n        this.amount = amount;\n        this.description = description;\n        this.date = date;\n        this.accountId = accountId;\n    }\n    Income.fromApiResponse = function (response) {\n        var amount = ts_money_1.Money.fromDecimal(response.amount, response.currency);\n        var description = response.description;\n        var date = new Date(Date.parse(response.date));\n        var accountId = response.accountId;\n        return new Income(amount, description, date, accountId);\n    };\n    return Income;\n}());\nexports.Income = Income;\n\n\n//# sourceURL=webpack:///./src/transactions/income/income.model.ts?");

/***/ }),

/***/ "./src/transactions/income/incomes.database.ts":
/*!*****************************************************!*\
  !*** ./src/transactions/income/incomes.database.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar firebase_service_1 = __importDefault(__webpack_require__(/*! ../../services/firebase-service */ \"./src/services/firebase-service.ts\"));\nvar income_model_1 = __webpack_require__(/*! ./income.model */ \"./src/transactions/income/income.model.ts\");\nvar lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nvar IncomesDatabase = /** @class */ (function () {\n    function IncomesDatabase() {\n        var _this = this;\n        this.db = firebase_service_1.default.database();\n        this.incomesRef = this.db.ref(\"server/saving-data/incomes\");\n        var aa = {};\n        this.incomesRef.on('value' || false, function (snap) {\n            snap && snap.val() &&\n                lodash_1.default.map(snap.val(), function (val, key) {\n                    aa[key] = income_model_1.Income.fromApiResponse(val);\n                });\n            _this.incomes = aa; // Keep the local user object synced with the Firebase userRef \n        });\n    }\n    IncomesDatabase.prototype.get = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.incomes];\n            });\n        });\n    };\n    IncomesDatabase.prototype.getById = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.incomes[id]];\n            });\n        });\n    };\n    IncomesDatabase.prototype.getByAccount = function (accountId, month, year) {\n        return __awaiter(this, void 0, void 0, function () {\n            var filtered;\n            var _this = this;\n            return __generator(this, function (_a) {\n                console.log(month + '/' + year);\n                filtered = Object.keys(this.incomes).reduce(function (toFilter, key) {\n                    var spending = _this.incomes[key];\n                    if (spending.accountId == accountId &&\n                        (spending.date.getMonth() + 1) == month &&\n                        spending.date.getFullYear() == year) {\n                        toFilter[key] = spending;\n                    }\n                    ;\n                    return toFilter;\n                }, {});\n                return [2 /*return*/, filtered];\n            });\n        });\n    };\n    IncomesDatabase.prototype.create = function (spending) {\n        return __awaiter(this, void 0, void 0, function () {\n            var dateString;\n            return __generator(this, function (_a) {\n                try {\n                    dateString = spending.date.toLocaleDateString();\n                    return [2 /*return*/, this.incomesRef.push({\n                            amount: spending.amount.toDecimal(),\n                            currency: spending.amount.currency,\n                            accountId: spending.accountId,\n                            description: spending.description,\n                            date: dateString\n                        }).toString()];\n                }\n                catch (e) {\n                    console.log(e);\n                    throw e;\n                }\n                return [2 /*return*/];\n            });\n        });\n    };\n    IncomesDatabase.prototype.update = function (id, spending) {\n        return __awaiter(this, void 0, void 0, function () {\n            var dateString;\n            return __generator(this, function (_a) {\n                dateString = spending.date.toLocaleDateString();\n                return [2 /*return*/, this.incomesRef.child(id).set({\n                        amount: spending.amount.toDecimal(),\n                        currency: spending.amount.currency,\n                        accountId: spending.accountId,\n                        description: spending.description,\n                        date: dateString\n                    })];\n            });\n        });\n    };\n    IncomesDatabase.prototype.remove = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                delete this.incomes[id];\n                return [2 /*return*/, this.incomesRef.child(id).set(null).then(function () {\n                    }).catch(function (error) { throw error; })];\n            });\n        });\n    };\n    return IncomesDatabase;\n}());\nexports.IncomesDatabase = IncomesDatabase;\n\n\n//# sourceURL=webpack:///./src/transactions/income/incomes.database.ts?");

/***/ }),

/***/ "./src/transactions/income/incomes.router.ts":
/*!***************************************************!*\
  !*** ./src/transactions/income/incomes.router.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar incomes_service_1 = __webpack_require__(/*! ./incomes.service */ \"./src/transactions/income/incomes.service.ts\");\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar income_model_1 = __webpack_require__(/*! ./income.model */ \"./src/transactions/income/income.model.ts\");\nvar moskaAccount_service_1 = __webpack_require__(/*! ../../account/moskaAccount.service */ \"./src/account/moskaAccount.service.ts\");\n/**\n * Router Definition\n */\nexports.incomesRouter = express_1.default.Router();\nvar incomesService = new incomes_service_1.IncomesService();\nvar accountService = new moskaAccount_service_1.AccountService();\n/**\n * Controller Definitions\n */\n// GET Incomes/\nexports.incomesRouter.get(\"/\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var incomes, e_1;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, incomesService.getAll()];\n            case 1:\n                incomes = _a.sent();\n                res.status(200).send(incomes);\n                return [3 /*break*/, 3];\n            case 2:\n                e_1 = _a.sent();\n                res.status(404).send(e_1.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// GET Incomes/:id\nexports.incomesRouter.get(\"/:id\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var income, e_2;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, incomesService.get(req.params.id)];\n            case 1:\n                income = _a.sent();\n                res.status(200).send(income);\n                return [3 /*break*/, 3];\n            case 2:\n                e_2 = _a.sent();\n                res.status(404).send(e_2.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// // GET incomes/:accountId\nexports.incomesRouter.get(\"/byAccount/:accountId\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var records, e_3;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, incomesService.getByAccount(req.params.accountId, req.query.month, req.query.year)];\n            case 1:\n                records = _a.sent();\n                console.log(JSON.stringify(records));\n                res.status(200).send(records);\n                return [3 /*break*/, 3];\n            case 2:\n                e_3 = _a.sent();\n                res.status(404).send(e_3.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// POST Incomes/\nexports.incomesRouter.post(\"/\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var income_1, e_4;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                income_1 = income_model_1.Income.fromApiResponse(req.body);\n                return [4 /*yield*/, incomesService.create(income_1).then(function (id) { return __awaiter(void 0, void 0, void 0, function () {\n                        return __generator(this, function (_a) {\n                            switch (_a.label) {\n                                case 0: return [4 /*yield*/, accountService.updateBalance(income_1.accountId, income_1.amount, \"add\")];\n                                case 1:\n                                    _a.sent();\n                                    res.sendStatus(201).send(id);\n                                    return [2 /*return*/];\n                            }\n                        });\n                    }); })];\n            case 1:\n                _a.sent();\n                return [3 /*break*/, 3];\n            case 2:\n                e_4 = _a.sent();\n                res.status(404).send(e_4.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// PUT Incomes/\nexports.incomesRouter.put(\"/:id\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var income, e_5;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                income = req.body;\n                return [4 /*yield*/, incomesService.update(req.params.id, income)];\n            case 1:\n                _a.sent();\n                res.sendStatus(200);\n                return [3 /*break*/, 3];\n            case 2:\n                e_5 = _a.sent();\n                res.status(500).send(e_5.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n// DELETE Incomes/:id\nexports.incomesRouter.delete(\"/:id\", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {\n    var e_6;\n    return __generator(this, function (_a) {\n        switch (_a.label) {\n            case 0:\n                _a.trys.push([0, 2, , 3]);\n                return [4 /*yield*/, incomesService.get(req.params.id).then(function (income) { return __awaiter(void 0, void 0, void 0, function () {\n                        return __generator(this, function (_a) {\n                            switch (_a.label) {\n                                case 0: return [4 /*yield*/, incomesService.remove(req.params.id).then(function (id) { return __awaiter(void 0, void 0, void 0, function () {\n                                        return __generator(this, function (_a) {\n                                            switch (_a.label) {\n                                                case 0: return [4 /*yield*/, accountService.updateBalance(income.accountId, income.amount, \"add\")];\n                                                case 1:\n                                                    _a.sent();\n                                                    res.sendStatus(200);\n                                                    return [2 /*return*/];\n                                            }\n                                        });\n                                    }); })];\n                                case 1:\n                                    _a.sent();\n                                    ;\n                                    return [2 /*return*/];\n                            }\n                        });\n                    }); })];\n            case 1:\n                _a.sent();\n                return [3 /*break*/, 3];\n            case 2:\n                e_6 = _a.sent();\n                res.status(500).send(e_6.message);\n                return [3 /*break*/, 3];\n            case 3: return [2 /*return*/];\n        }\n    });\n}); });\n\n\n//# sourceURL=webpack:///./src/transactions/income/incomes.router.ts?");

/***/ }),

/***/ "./src/transactions/income/incomes.service.ts":
/*!****************************************************!*\
  !*** ./src/transactions/income/incomes.service.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (this && this.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar incomes_database_1 = __webpack_require__(/*! ./incomes.database */ \"./src/transactions/income/incomes.database.ts\");\nvar lodash_1 = __importDefault(__webpack_require__(/*! lodash */ \"lodash\"));\nvar IncomesService = /** @class */ (function () {\n    function IncomesService() {\n        this.db = new incomes_database_1.IncomesDatabase();\n    }\n    IncomesService.prototype.create = function (income) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.create(income)];\n            });\n        });\n    };\n    IncomesService.prototype.update = function (id, income) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.update(id, income)];\n            });\n        });\n    };\n    IncomesService.prototype.remove = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.remove(id)];\n            });\n        });\n    };\n    IncomesService.prototype.getAll = function () {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.get()];\n            });\n        });\n    };\n    IncomesService.prototype.getByAccount = function (accountId, month, year) {\n        return __awaiter(this, void 0, void 0, function () {\n            var map;\n            return __generator(this, function (_a) {\n                switch (_a.label) {\n                    case 0:\n                        map = {};\n                        return [4 /*yield*/, this.db.getByAccount(accountId, month, year).then(function (incomes) {\n                                lodash_1.default.map(incomes, function (spending, key) {\n                                    map[key] =\n                                        {\n                                            \"amount\": spending.amount.toDecimal(),\n                                            \"description\": spending.description,\n                                            \"date\": spending.date,\n                                            \"accountId\": spending.accountId,\n                                            \"currency\": spending.amount.currency\n                                        };\n                                });\n                            })];\n                    case 1:\n                        _a.sent();\n                        return [2 /*return*/, map];\n                }\n            });\n        });\n    };\n    IncomesService.prototype.get = function (id) {\n        return __awaiter(this, void 0, void 0, function () {\n            return __generator(this, function (_a) {\n                return [2 /*return*/, this.db.getById(id)];\n            });\n        });\n    };\n    return IncomesService;\n}());\nexports.IncomesService = IncomesService;\n\n\n//# sourceURL=webpack:///./src/transactions/income/incomes.service.ts?");

/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi webpack/hot/poll?100 ./src/index.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! webpack/hot/poll?100 */\"./node_modules/webpack/hot/poll.js?100\");\nmodule.exports = __webpack_require__(/*! ./src/index.ts */\"./src/index.ts\");\n\n\n//# sourceURL=webpack:///multi_webpack/hot/poll?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "firebase-admin":
/*!*********************************!*\
  !*** external "firebase-admin" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"firebase-admin\");\n\n//# sourceURL=webpack:///external_%22firebase-admin%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jsonwebtoken\");\n\n//# sourceURL=webpack:///external_%22jsonwebtoken%22?");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash\");\n\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ }),

/***/ "ts-date":
/*!**************************!*\
  !*** external "ts-date" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ts-date\");\n\n//# sourceURL=webpack:///external_%22ts-date%22?");

/***/ }),

/***/ "ts-money":
/*!***************************!*\
  !*** external "ts-money" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"ts-money\");\n\n//# sourceURL=webpack:///external_%22ts-money%22?");

/***/ }),

/***/ "uuid":
/*!***********************!*\
  !*** external "uuid" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"uuid\");\n\n//# sourceURL=webpack:///external_%22uuid%22?");

/***/ })

/******/ });