"use strict";
//Taken from http://cloudmark.github.io/Json-Mapping/
exports.__esModule = true;
exports.jsonMetadataKey = "jsonProperty";
function JsonProperty(metadata) {
    if (metadata instanceof String || typeof metadata === "string") {
        return Reflect.metadata(exports.jsonMetadataKey, {
            name: metadata,
            clazz: undefined
        });
    }
    else {
        var metadataObj = metadata;
        return Reflect.metadata(exports.jsonMetadataKey, {
            name: metadataObj ? metadataObj.name : undefined,
            clazz: metadataObj ? metadataObj.clazz : undefined
        });
    }
}
exports.JsonProperty = JsonProperty;
var MapUtils = (function () {
    function MapUtils() {
    }
    MapUtils.isPrimitive = function (obj) {
        switch (typeof obj) {
            case "string":
            case "number":
            case "boolean":
                return true;
        }
        return !!(obj instanceof String || obj === String ||
            obj instanceof Number || obj === Number ||
            obj instanceof Boolean || obj === Boolean);
    };
    MapUtils.getClazz = function (target, propertyKey) {
        return Reflect.getMetadata("design:type", target, propertyKey);
    };
    MapUtils.getJsonProperty = function (target, propertyKey) {
        return Reflect.getMetadata(exports.jsonMetadataKey, target, propertyKey);
    };
    MapUtils.isArray = function (object) {
        if (object === Array) {
            return true;
        }
        else if (typeof Array.isArray === "function") {
            return Array.isArray(object);
        }
        else {
            return !!(object instanceof Array);
        }
    };
    MapUtils.deserialize = function (clazz, jsonObject) {
        var _this = this;
        if ((clazz === undefined) || (jsonObject === undefined))
            return undefined;
        var obj = new clazz();
        Object.keys(obj).forEach(function (key) {
            var propertyMetadataFn = function (propertyMetadata) {
                var propertyName = propertyMetadata.name || key;
                var innerJson = jsonObject ? jsonObject[propertyName] : undefined;
                //TODO: patch to remove
                if (propertyName == 'client_metrics')
                    return innerJson;
                var clazz = _this.getClazz(obj, key);
                if (_this.isArray(clazz)) {
                    var metadata_1 = _this.getJsonProperty(obj, key);
                    if (metadata_1.clazz || _this.isPrimitive(clazz)) {
                        if (innerJson && _this.isArray(innerJson)) {
                            return innerJson.map(function (item) { return _this.deserialize(metadata_1.clazz, item); });
                        }
                        else {
                            return undefined;
                        }
                    }
                    else {
                        return innerJson;
                    }
                }
                else if (!_this.isPrimitive(clazz)) {
                    return _this.deserialize(clazz, innerJson);
                }
                else {
                    return jsonObject ? jsonObject[propertyName] : undefined;
                }
            };
            var propertyMetadata = _this.getJsonProperty(obj, key);
            if (propertyMetadata) {
                obj[key] = propertyMetadataFn(propertyMetadata);
            }
            else {
                if (jsonObject && jsonObject[key] !== undefined) {
                    obj[key] = jsonObject[key];
                }
            }
        });
        return obj;
    };
    MapUtils.serialize = function (clazz, clazzObject) {
        var _this = this;
        if ((clazz === undefined) || (clazzObject === undefined))
            return undefined;
        var serialObj = {};
        var obj = clazzObject;
        Object.keys(obj).forEach(function (key) {
            var propertyMetadataFn = function (propertyMetadata) {
                var propertyName = propertyMetadata.name || key;
                var innerJson = clazzObject ? clazzObject[key] : undefined;
                //TODO: patch to remove
                if (propertyName == 'client_metrics')
                    return innerJson;
                var clazz = _this.getClazz(obj, key);
                if (_this.isArray(clazz)) {
                    var metadata_2 = _this.getJsonProperty(obj, key);
                    if (metadata_2.clazz || _this.isPrimitive(clazz)) {
                        if (innerJson && _this.isArray(innerJson)) {
                            return innerJson.map(function (item) { return _this.serialize(metadata_2.clazz, item); });
                        }
                        else {
                            return undefined;
                        }
                    }
                    else {
                        return innerJson;
                    }
                }
                else if (!_this.isPrimitive(clazz)) {
                    return _this.serialize(clazz, innerJson);
                }
                else {
                    return clazzObject ? clazzObject[propertyName] : undefined;
                }
            };
            var propertyMetadata = _this.getJsonProperty(obj, key);
            if (propertyMetadata) {
                serialObj[propertyMetadata.name] = propertyMetadataFn(propertyMetadata);
            }
            else {
                if (clazzObject && clazzObject[key] !== undefined) {
                    serialObj[key] = clazzObject[key];
                }
            }
        });
        return serialObj;
    };
    return MapUtils;
}());
exports.MapUtils = MapUtils;
