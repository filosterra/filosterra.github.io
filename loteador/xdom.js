var xdom = {};
xdom.app = {};
xdom.debug = {};
xdom.cache = {};
xdom.browser = {};
xdom.custom = {};
xdom.devTools = {};
xdom.data = {};
xdom.data.source_name = undefined;
xdom.data.documents = {}
xdom.data.binding = {};
xdom.data.binding.sources = {};
xdom.data.binding.requests = {};
xdom.data.filter = {};
xdom.data.history = {};
xdom.data.history.cascade = {};
xdom.data.history.undo = [];
xdom.data.history.redo = [];
xdom.db = {};
xdom.dom = {};
xdom.dom.controls = {};
xdom.listeners = {};
xdom.listeners.keys = {};
xdom.json = {}
xdom.server = {};
xdom.session = {};
xdom.storage = {};
xdom.tools = {};
xdom.xhr = {};
xdom.xhr.cache = {};
xdom.xhr.Requests = {};
xdom.xml = {};
xdom.messages = {}
xdom.namespaces = {}

xdom.datagrid = {}
xdom.datagrid.columns = {}


getGeneratedPageURL = function (config) {
    var html = config["html"];
    var css = config["css"];
    var js = config["js"];
    const getBlobURL = (code, type) => {
        const blob = new Blob([code], { type })
        return URL.createObjectURL(blob)
    }

    const cssURL = getBlobURL(css, 'text/css')
    const jsURL = getBlobURL(js, 'text/javascript')

    const source = `
    <html>
      <head>
        ${(css || "") && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
        ${(js || "") && `<script src="${jsURL}"></script>`}
      </head>
      <body>
        ${html || ''}
      </body>
    </html>
  `

    return getBlobURL(source, 'text/html')
}

function paddingDiff(col) {
    if (getStyleVal(col, 'box-sizing') == 'border-box') {
        return 0;
    }

    var padLeft = getStyleVal(col, 'padding-left');
    var padRight = getStyleVal(col, 'padding-right');
    return (parseInt(padLeft) + parseInt(padRight));
}

function getStyleVal(elm, css) {
    return (window.getComputedStyle(elm, null).getPropertyValue(css))
}

var pageX, curCol, nxtCol, nxtColWidth, nxtColWidth;
xdom.datagrid.columns.resize = {
    mouseover: function (e) {
        if (e.target.className.indexOf("hover") == -1) {
            e.target.className += " hover";
        } else {
            e.target.className = e.target.className.replace(" hover", "");
        }
    }
    , mousedown: function (e) {
        curCol = e.target.parentElement;
        nxtCol = curCol.nextElementSibling;
        pageX = e.pageX;

        var padding = paddingDiff(curCol);

        curColWidth = curCol.offsetWidth - padding;
        if (nxtCol)
            nxtColWidth = nxtCol.offsetWidth - padding;
        console.log("curColWidth: " + curColWidth);
        console.log("nxtColWidth: " + nxtColWidth);
    }
    , mousemove: function (e) {
        if (curCol) {
            var diffX = e.pageX - pageX;

            if (nxtCol) {
                nxtCol.style.width = (nxtColWidth - (diffX)) + 'px';
            }

            curCol.style.width = (curColWidth + diffX) + 'px';
            console.log("curCol: " + curCol.id + ': ' + (nxtColWidth - (diffX)) + 'px');
            console.log("nxtCol: " + nxtCol.id + ': ' + (curColWidth + diffX) + 'px');
        }
    }
    , mouseup: function (e) {
        curCol = undefined;
        nxtCol = undefined;
        pageX = undefined;
        nxtColWidth = undefined;
        curColWidth = undefined;
    }
}

document.addEventListener('mousemove', xdom.datagrid.columns.resize.mousemove);
document.addEventListener('mouseup', xdom.datagrid.columns.resize.mouseup);

var content_type = {}
content_type["json"] = "application/json";
content_type["xml"] = "text/xml";

xdom.devTools.debug = function () {
    xdom.debug = xdom.json.merge(xdom.debug, { debugging: true })
    return;
}

xdom.library = {}
//xdom.library.loading = {}

Object.defineProperty(xdom.library, 'loading', {
    value: {},
    writable: true, enumerable: false, configurable: false
});

Object.defineProperty(xdom.library, 'load', {
    value: function (document_name_or_array, on_complete, xhr_settings) {
        var parent = this
        var parent_arguments = arguments;
        if (!document_name_or_array) return;
        var document_name = document_name_or_array;
        if (document_name_or_array.constructor === [].constructor || document_name_or_array.constructor === {}.constructor) {
            var batch_on_complete = function () {
                for (var document_index in document_name_or_array) {
                    var document_name = document_name_or_array.constructor === {}.constructor ? document_index : document_name_or_array[document_index];
                    if (!(document_name && document_name.indexOf)) {
                        continue;
                    }
                    if (document_name.indexOf(".") == -1) document_name = document_name + ".xslt";
                    if (!xdom.library[document_name]) {
                        return;
                    }
                }
                if (on_complete && on_complete.apply) {
                    on_complete.apply(parent, parent_arguments);
                };
            }
            var all_loaded = true;
            for (var document_index in document_name_or_array) {
                document_name = document_name_or_array.constructor === {}.constructor ? document_index : document_name_or_array[document_index];
                if (!(document_name && document_name.indexOf)) {
                    continue;
                }
                if (document_name.indexOf(".") == -1) document_name = document_name + ".xslt";
                xdom.library[document_name] = xdom.library[document_name];
            }
            for (var document_index in document_name_or_array) {
                document_name = document_name_or_array.constructor === {}.constructor ? document_index : document_name_or_array[document_index];
                if (!(document_name && document_name.indexOf)) continue;
                if (document_name.indexOf(".") == -1) document_name = document_name + ".xslt";
                if (!xdom.library[document_name]) {
                    all_loaded = false;
                    xdom.library.load(document_name, batch_on_complete);
                }
            }
            if (all_loaded) {
                batch_on_complete.apply(parent, parent_arguments)
            }
            return;
        } else {
            if (!document_name.indexOf) return;
            if (document_name.indexOf(".") == -1) document_name = document_name + ".xslt";
        }
        if (document_name.indexOf(".") == -1) document_name = document_name + ".xslt";
        xdom.library[document_name] = (xdom.storage.getDocument(document_name) || xdom.library[document_name]);
        var on_complete = (on_complete || function () {
            xdom.dom.refresh(xdom.dom.target);
        });
        if (xdom.library[document_name]) {
            xdom.json.merge(xdom.namespaces, xdom.xml.getNamespaces(xdom.library[document_name]));
            if (on_complete && on_complete.apply) {
                on_complete.apply(parent, parent_arguments);
            };
            return true;
        } else {
            if (!(xdom.library.loading[document_name] || xdom.library[document_name] && xdom.library[document_name].document)) {
                xdom.library.loading[document_name] = xdom.xhr.loadXMLFile(document_name + '?id=' + Math.random(), xdom.json.merge(xhr_settings, {
                    onSuccess: function (Response, Request) {
                        if (Response.type == 'xml') {
                            xdom.storage.setKey(document_name, Response.responseText);
                            delete xdom.library.loading[document_name];
                            xdom.json.merge(xdom.namespaces, xdom.xml.getNamespaces(Response.document));
                            xdom.xml.Document(Response.document, function () {
                                xdom.library[document_name] = this;
                                if (on_complete && on_complete.apply) {
                                    on_complete.apply(parent, parent_arguments);
                                };
                            });
                        }
                    }
                    , onComplete: function () {
                        delete xdom.library.loading[document_name];
                    }
                }));
            } else {
                var on_success = xdom.library.loading[document_name].onSuccess;
                xdom.library.loading[document_name].onSuccess = function () {
                    on_success.apply(this, arguments)
                    if (on_complete && on_complete.apply) {
                        on_complete.apply(parent, parent_arguments);
                    };
                }
            }
        }
    },
    writable: false, enumerable: false
});

Object.defineProperty(xdom.library, 'reload', {
    value: function (document_name_or_array, on_complete) {
        var document_name_or_array = (document_name_or_array || Object.keys(xdom.library));
        if (typeof (document_name_or_array) == 'string') {
            document_name_or_array = [document_name_or_array];
        }
        for (var document_index = 0; document_index < document_name_or_array.length; document_index++) {
            var document_name = document_name_or_array[document_index];
            if (xdom.library[document_name] !== undefined) {
                xdom.library[document_name] = undefined;
            }
        }
        var storage_enabled = xdom.storage.enabled;
        if (storage_enabled) {
            xdom.storage.disable(document_name_or_array);
        }
        xdom.library.load(document_name_or_array, (on_complete || function () {
            xdom.dom.refresh()
        }));
        if (storage_enabled) {
            xdom.storage.enable();
        }
    },
    writable: false, enumerable: false
});

xdom.init = function (settings) {
    var current_hash = window.location.hash;
    var settings = (settings || {});
    xdom.modernize();
    for (var hashtag in sessionStorage) {
        if (hashtag.indexOf("#") != -1) {
            xdom.data.documents[hashtag] = xdom.session.getKey(hashtag)
        }
    }
    if (xdom.session.getLocation() != window.location.pathname) {
        xdom.data.clear()
        xdom.session.saveLocation();
    }
    if (xdom.session.getKey("userId") == null) {
        xdom.session.setKey("userId", undefined)
    }
    xdom.data.source_name = (xdom.data.source_name || settings["data_source"]);
    xdom.dom.target = (xdom.dom.target || settings["target"] || document.querySelector("main") || document.body);

    xdom.storage.enabled = xdom.storage.getKey("xdom.storage.enabled");
    if (xdom.storage.enabled == undefined) {
        xdom.storage.enable();
    }

    xdom.library.load(["resources/session.xslt", "resources/prepare_data.xslt"], function (document_name_or_array) {
        xdom.library.load(["default.xml", "login.xslt", "resources/datagrid.xslt", "resources/form.xslt", "resources/post.xslt", "resources/reset_record.xslt", "resources/normalize_namespaces.xslt", "resources/remove_for_deletion.xslt", "resources/databind.xslt", "resources/databind_cleanup.xslt", "resources/test_node.xslt", "resources/commands.xslt"], function (document_name_or_array) {
            xdom.data.load(xdom.data.source_name, function () {
                xdom.session.checkStatus({ async: false });
                //xdom.session.updateSession("status", (xdom.data.document.documentElement.selectSingleNode("//@session:status") || {}).value);
                if (window.location.hash && xdom.session.getKey(window.location.hash)) {
                    if (xdom.session.getKey("#sitemap")) {
                        xdom.data.document = xdom.session.getKey("#sitemap")
                        xdom.dom.refresh();
                    }
                    xdom.dom.target = document.querySelector("main") || document.body;
                    xdom.data.document = xdom.session.getKey(current_hash);
                } else if (window.location.hash.indexOf("#") != -1) {
                    window.location = window.location.href.replace(/#.*$/g, '');
                }
                if (!xdom.data.source_name) {
                    return;
                }
            });
        });
    })
}

xdom.db.Parameter = function (name, value, output) {
    Object.defineProperty(this, 'name', {
        value: name,
        writable: true, enumerable: false, configurable: false
    });
    Object.defineProperty(this, 'value', {
        value: value,
        writable: true, enumerable: false, configurable: false
    });
    Object.defineProperty(this, 'output', {
        value: output,
        writable: true, enumerable: false, configurable: false
    });
}

//xdom.server.Procedure = function (settings) {
//    if (!(this instanceof xdom.server.Procedure)) return new xdom.server.Procedure(settings);
//    settings = arguments[0];
//    this.routine_name = settings["name"];
//    this.on_success = (settings["on_success"] || function () { });
//    Object.defineProperty(this, 'request', {
//        value: this.routine_name,
//        writable: false, enumerable: false, configurable: false
//    });
//    Object.defineProperty(this, 'parameters', {
//        value: (settings["parameters"] || {}),
//        writable: false, enumerable: false, configurable: false
//    });
//    Object.defineProperty(this, 'load', {
//        value: function () {
//            var procedure = this;
//            var _parameters = procedure.parameters
//            if (procedure.parameters && procedure.parameters.constructor === {}.constructor) {
//                _parameters = "&" + xdom.json.join(procedure.parameters, { "separator": "&", "quote": "" });
//            }
//            xdom.server.request(xdom.json.merge({
//                "request": procedure.request
//                , "parameters": _parameters
//                , "xhr": {
//                    "async": true
//                    , "type": "procedure"
//                    , "contentType": content_type.xml
//                }
//                , "onSuccess": function (Response, Request) {
//                    if (procedure.on_success && procedure.on_success.apply) {
//                        procedure.on_success.apply(this, arguments)
//                    }
//                }
//            }, settings));
//        },
//        writable: false, enumerable: false, configurable: false
//    });
//}

xdom.data.Binding = function (node) {
    if (!(this instanceof xdom.data.Binding)) return new xdom.data.Binding();
    Object.defineProperty(this, 'id', {
        value: node.getAttribute("x:id"),
        writable: false, enumerable: false, configurable: false
    });
    Object.defineProperty(this, 'node', {
        get: function () {
            return xdom.xml.createDocument(xdom.data.document).selectSingleNode('//*[@x:id="' + this.id + '"]');
        }
    });
    Object.defineProperty(this, 'nodeName', {
        get: function () {
            return this.node.nodeName
        }
        , enumerable: false, configurable: false
    });
    Object.defineProperty(this, 'value', {
        get: function () {
            return this.node.getAttribute('x:value')
        }
        , enumerable: false, configurable: false
    });
    Object.defineProperty(this, 'text', {
        get: function () {
            return this.node.getAttribute('x:text')
        }
        , enumerable: false, configurable: false
    });
    Object.defineProperty(this, 'dependants', {
        value: {},
        writable: true, enumerable: false, configurable: false
    });

    Object.defineProperty(this, 'formulas', {
        value: {},
        writable: true, enumerable: false, configurable: false
    });
    this.updated = true;
    return this;
}

xdom.data.Dependency = function () {
    if (!(this instanceof xdom.data.Dependency)) return new xdom.data.Dependency();
    Object.defineProperty(this, 'attributes', {
        value: {},
        writable: true, enumerable: false, configurable: false
    });
    Object.defineProperty(this, 'sources', {
        value: {},
        writable: true, enumerable: false, configurable: false
    });
    this.updated = false;
    return this;
}

xdom.data.EmptyXML = function () {
    this.selectSingleNode = function () {
        return [];
    }
    this.setAttribute = function () {
        return undefined;
    }
    this.getAttribute = function () {
        return undefined;
    }
    this.nodeValue = undefined
}
//xdom.xhr.loadDataSource = function (settings) {
//    var target = settings["target"];
//    var target_attribute = settings["target_attribute"];
//    var request = settings["request"];
//    var on_complete = settings["on_complete"];
//    var xml_document = xdom.cache[request];
//    if (xdom.cache[request]) {
//        return xdom.cache[request];
//    } else {
//        if (xdom.xhr.Requests[target.getAttribute("x:id") + '::' + request]) {
//            return false;
//        }
//        xdom.xhr.Requests[target.getAttribute("x:id") + '::' + request] = true;
//        xdom.server.request({
//            "request": request.replace(/^\w+:/, '')
//            , "xhr": xdom.json.merge({
//                "async": true
//                , "target": target
//                , "onComplete": function (Response) {
//                    if (Response.xml && Response.xml.documentElement) {
//                        xml_document = Response.xml.documentElement;
//                        xdom.cache[request] = xdom.xml.createDocument(xml_document);
//                        xdom.data.update({ "uid": target.getAttribute('x:id'), "attribute": target_attribute, "value": xml_document, "cascade": true, "action": "replace" });
//                        return xml_document;
//                    }
//                    if (on_complete && on_complete.apply) {
//                        on_complete.apply(this, arguments);
//                    };
//                    delete xdom.xhr.Requests[target.getAttribute("x:id") + '::' + request];
//                }
//            }, settings["xhr"])
//        });
//    }
//    //}
//}

xdom.devTools.live = function () {/* OVERCHARGED:
    xdom.devTools.live() ;                          //Refresh every document with default values
    xdom.devTools.live(true) ;                      //Refresh every document
    xdom.devTools.live(false);                      //Stops refreshing
    xdom.devTools.live(5);                          //Refresh every 5 seconds every document
    xdom.devTools.live(5, 'file.xml');              //Refresh every 5 seconds file.xml 
    xdom.devTools.live('file.xml');                 //Refresh file.xml with default values
    xdom.devTools.live(['file1.xml','file2.xml']);  //Refresh file1.xml and file2.xml with default values
*/
    var refresh_rate, document_name_or_array;
    var a = 0;
    if (this.Check) window.clearInterval(this.Check);
    if (arguments.length != 0) {
        if (typeof (arguments[a]) == 'boolean') {
            if (arguments[a++] == false) {
                return false;
            }
        }
        if (typeof (arguments[a]) == "number") {
            refresh_rate = arguments[a++];
        }
        if (typeof (arguments[a]) == "string" || typeof (arguments[a]) == "object") {
            document_name_or_array = arguments[a++];
        }
    }

    //xdom.storage.disable();
    refresh_rate = (refresh_rate || 3);
    refresh_rate = (refresh_rate * 1000);
    var refresh = function () {
        window.console.info('Checking for changes in documents...');
        xdom.library.reload(document_name_or_array);
    };

    this.Check = setInterval(function () { refresh() }, refresh_rate);
}

xdom.session.live = function (live) {
    xdom.session.live.running = live;
    var refresh_rate, document_name_or_array;
    var a = 0;
    if (this.Interval) window.clearInterval(this.Interval);
    if (!live) return;

    refresh_rate = (refresh_rate || 5);
    refresh_rate = (refresh_rate * 1000);
    var refresh = function () {
        window.console.info('Checking for changes in session...');
        xdom.session.loadSession();
    };

    this.Interval = setInterval(function () { refresh() }, refresh_rate);
}

xdom.data.load = function (file_name_or_document, custom_on_complete) {
    if (!file_name_or_document) return null;
    var _parent = this;
    var _parent_arguments = this;
    on_complete = function () {
        ////var transforms = xdom.data.getTransformationFileName().split(";");
        ////var dom;
        ////var layout_transform = transforms.pop();
        ////for (var t = 0; t < transforms.length; t++) {
        ////    dom = xdom.xml.transform((dom || xdom.data.document), xdom.library[transforms[t]]);
        ////}
        ////xdom.data.document = xdom.xml.createDocument(dom || xdom.data.document);
        //for (var d in xdom.library) {
        //    if (!xdom.library[d]) {
        //        console.info("Document " + d + " not ready");
        //        return;
        //    }
        //}
        xdom.data.reseed();
        if (custom_on_complete && custom_on_complete.apply) {
            custom_on_complete.apply(this, arguments);
        }; //xdom.dom.refresh
        xdom.dom.refresh(xdom.dom.target, function () {
            xdom.data.history.undo = [xdom.data.document];
            xdom.data.history.redo = [];
        });
    };
    if (typeof (file_name_or_document) == 'object') {
        if (typeof (file_name_or_document.selectSingleNode) == 'undefined') return;
        xdom.data.document = file_name_or_document;
        xdom.data.loadDependencies(xdom.data.document, on_complete);
        xdom.session.setData(xdom.xml.toString(xdom.data.document));
        if (on_complete && on_complete.apply) {
            on_complete.apply(this, arguments);
        }; //xdom.dom.refresh
    } else if (typeof (file_name_or_document) == 'function') {
        file_name_or_document.call(this)
        return;
    } else {
        file_name_or_document = (file_name_or_document || xdom.data.source_name);
        //if (typeof (Storage) !== "undefined") {
        //    if (xdom.session.getKey("xdom.data")) {
        //        xdom.data.document = xdom.session.getKey("xdom.data");
        //        xdom.data.loadDependencies(xdom.data.document, on_complete);
        //        if (on_complete && on_complete.apply) {
        //            on_complete.apply(this, arguments);
        //        }; //xdom.dom.refresh(xdom.dom.target);
        //    }
        //} else {
        //    console.log('No support for client storage, go ahead with caution');
        //}
    }

    if (!xdom.data.document) {
        if (typeof (file_name_or_document) == "string") {
            xdom.xhr.loadXMLFile(file_name_or_document + (file_name_or_document.indexOf('?') != -1 ? '&' : '?') + 'id=' + Math.random(), {
                onSuccess: function (Response) {
                    if (Response.type == "xml") {
                        xdom.xml.Document(Response.responseText, function () {
                            xdom.data.document = this.document;
                            if (on_complete && on_complete.apply) {
                                on_complete.apply(_parent, _parent_arguments);
                            };
                            //xdom.session.setData(this);
                        });
                    }
                }
            });
        } else { //Reubicar esta llamada
            xdom.data.load('default.xml');
            xdom.data.reseed();
            //xdom.session.getUserId();
        }
    } else {
        if (on_complete && on_complete.apply) {
            on_complete.apply(this, arguments);
        }; //xdom.dom.refresh
    }
}

xdom.data.getStylesheets = function (xml_document) {
    var stylesheets = xml_document.selectNodes("processing-instruction('xml-stylesheet')");
    for (var s = 0; s < stylesheets.length; ++s) {
        stylesheet = JSON.parse('{' + (stylesheets[s].data.match(/(\w+)=(["'])([^\2]+?)\2/ig) || []).join(", ").replace(/(\w+)=(["'])([^\2]+?)\2/ig, '"$1":$2$3$2') + '}');
        if (!xdom.library[stylesheet.href] && !xdom.xhr.Requests[stylesheet.href]) {
            var oData = new xdom.xhr.Request(stylesheet.href);
            //oData.onComplete = element.onComplete;
            //oData.onSuccess = element.onSuccess;
            //oData.onException = element.onException;
            oData.load();
            return;
        }
    }
}

xdom.data.getTransformations = function (xml_document) {
    var xml_document = (xml_document || xdom.data.document || {});
    if (typeof (xml_document.selectSingleNode) == 'undefined') return {};
    if (!xml_document.selectSingleNode("*")) return {};
    var library = {};
    if (typeof (xml_document.setProperty) != "undefined") {
        var current_namespaces = xdom.xml.getNamespaces(xml_document.getProperty("SelectionNamespaces"));
        if (!current_namespaces["xmlns:x"]) {
            current_namespaces["xmlns:x"] = "http://panax.io/xdom";
            xml_document.setProperty("SelectionNamespaces", xdom.json.join(current_namespaces, { "separator": " " }));
        }
    }
    var transform_collection = xml_document.selectNodes('.//@*[local-name()="transforms" and contains(namespace-uri(), "http://panax.io/xdom") or namespace-uri()="http://panax.io/transforms"]');
    if (transform_collection.length) {
        for (var s = 0; s < transform_collection.length; ++s) {
            var transforms = transform_collection[s].value.split(/\s*;+\s*/)
            for (var t = 0; t < transforms.length; ++t) {
                if (!transforms[t]) {
                    continue;
                }
                library[transforms[t]] = xdom.library[transforms[t]];
            }
        }
    }
    //else {
    //    var file_name = ((window.location.pathname.match(/[^\/]+$/g) || []).join('').split(/\.[^\.]+$/).join('') || "default") + ".xslt";
    //    library[file_name] = xdom.library[file_name];
    //}
    var stylesheets = xml_document.selectNodes("processing-instruction('xml-stylesheet')");
    for (var s = 0; s < stylesheets.length; ++s) {
        stylesheet = JSON.parse('{' + (stylesheets[s].data.match(/(\w+)=(["'])([^\2]+?)\2/ig) || []).join(", ").replace(/(\w+)=(["'])([^\2]+?)\2/ig, '"$1":$2$3$2') + '}');
        library[stylesheet.href] = xdom.library[stylesheet.href];
    }
    return library;
}

xdom.data.getTransformationFileName = function (xml_document) {
    var xml_document = (xml_document || xdom.data.document || {});
    if (typeof (xml_document.selectSingleNode) == 'undefined') return '';
    //if (!xml_document.selectSingleNode("*")) return '';
    //var transform_collection = xml_document.selectNodes(".//@x:transforms|.//@*[namespace-uri()='http://panax.io/transforms']");// || window.location.pathname.match(/\w+\.\w+$/).toString().replace(/\.\w+$/, '') + ".xslt"
    var transform_collection = xml_document.selectNodes('.//@*[local-name()="transforms" and contains(namespace-uri(), "http://panax.io/xdom")]'); //xml_document.selectNodes(".//@x:transforms");// || window.location.pathname.match(/\w+\.\w+$/).toString().replace(/\.\w+$/, '') + ".xslt"
    var transforms = ''
    var stylesheets = xml_document.selectNodes("processing-instruction('xml-stylesheet')");
    if (transform_collection.length || stylesheets.length) {
        for (var s = 0; s < transform_collection.length; ++s) {
            transforms = transform_collection[s].value + ';' + transforms;
        }
        for (var s = 0; s < stylesheets.length; ++s) {
            stylesheet = JSON.parse('{' + (stylesheets[s].data.match(/(\w+)=(["'])([^\2]+?)\2/ig) || []).join(", ").replace(/(\w+)=(["'])([^\2]+?)\2/ig, '"$1":$2$3$2') + '}');
            transforms = stylesheet.href + ';' + transforms;
        }
    } /*else {
        transforms = ((window.location.pathname.match(/[^\/]+$/g) || []).join('').split(/\.[^\.]+$/).join('') || "shell") + ".xslt";
    }*/
    return transforms.replace(/\s*;+\s*/gi, ';').replace(/;\s*$/gi, '');
}

xdom.data.loadDependencies = function (xml_document, on_complete) {
    var dependencies = xdom.data.getTransformations(xml_document);
    xdom.library.load(dependencies, on_complete);
}

xdom.data.reload = function (settings) {
    /*var settings = (settings || {})
    xdom.xhr.loadXMLFile('data.xml?id=' + Math.random(), {
        onSuccess: function () {
            xdom.data.document = xdom.xml.createDocument(this.responseXML);
            if (settings.onSuccess) { settings.onSuccess.apply(this, [this.response, this.xhr]); }
            xdom.dom.refresh(xdom.dom.target);
        }
    });*/
    xdom.data.clear();
    xdom.data.load();
}

xdom.xml.safeEntities = {
    "<": "&lt;"
}

xdom.xml.encodeEntities = function (text) {
    new_text = text;
    new_text = new_text.replace(/</g, xdom.xml.safeEntities["<"]);
    return new_text;
}

xdom.datagrid.columns.toggleVisibility = function (column_name) {
    var transforms = xdom.data.getTransformationFileName(xdom.data.document).split(";");
    var layout_transform = transforms.pop();
    var xsl = (xdom.library[layout_transform].document || xdom.library[layout_transform]);

    //var root_node = xsl.documentElement.selectSingleNode('//xsl:key[@name="hidden"][@match="/"]');
    //if (!root_node) {
    //    console.error((xdom.messages["datagrid.columns.toggleVisibility.error"] || "Error: datagrid.columns.toggleVisibility"));
    //    return false;
    //}
    if (column_name) {
        var key_node = xsl.documentElement.selectSingleNode('//xsl:key[@name="hidden"][@use="generate-id()"][@match="' + column_name + '"]');
        if (!key_node) {
            var new_key = xdom.xml.createDocument('<key xmlns="http://www.w3.org/1999/XSL/Transform" name="hidden" match="' + column_name + '" use="generate-id()"/>');
            //xdom.dom.insertAfter(new_key.documentElement, root_node);
            xsl.selectSingleNode('*').appendChild(new_key.documentElement);
        } else {
            xdom.data.remove(key_node);
        }
    }

    xdom.dom.refresh();
}

xdom.datagrid.columns.groupBy = function (column_name) {
    var transforms = xdom.data.getTransformationFileName(xdom.data.document).split(";");
    var layout_transform = transforms.pop();
    var xsl = (xdom.library[layout_transform].document || xdom.library[layout_transform]);

    //var root_node = xsl.documentElement.selectSingleNode('//xsl:key[@name="groupBy"][@match="/"]');
    //if (!root_node) {
    //    console.error((xdom.messages["datagrid.columns.groupBy.error"] || "Error: datagrid.columns.groupBy"));
    //    return false;
    //}
    if (column_name) {
        var key_node = xsl.documentElement.selectSingleNode('//xsl:key[@name="groupBy"][@use="concat(name(..),\'::\',.)"][@match="' + column_name + '/@x:value"]');
        if (!key_node) {
            var new_key = xdom.xml.createDocument('<key xmlns="http://www.w3.org/1999/XSL/Transform" name="groupBy" match="' + column_name + '/@x:value" use="concat(name(..),\'::\',.)"/>');
            //xdom.dom.insertAfter(new_key.documentElement, root_node);
            xsl.selectSingleNode('*').appendChild(new_key.documentElement);
        } else {
            xdom.data.remove(key_node);
        }
    }

    xdom.dom.refresh();
}

xdom.datagrid.columns.groupCollapse = function (column_name, value) {
    var transforms = xdom.data.getTransformationFileName(xdom.data.document).split(";");
    var layout_transform = transforms.pop();
    var xsl = (xdom.library[layout_transform].document || xdom.library[layout_transform]);

    //var root_node = xsl.documentElement.selectSingleNode('//xsl:key[@name="groupBy"][@match="/"]');
    //if (!root_node) {
    //    console.error((xdom.messages["datagrid.columns.groupCollapse.error"] || "Error: datagrid.columns.groupCollapse"));
    //    return false;
    //}
    value = value.replace(/</g, '&lt;');
    if (column_name) {
        var key_node = xsl.documentElement.selectSingleNode('//xsl:key[@name="groupCollapse"][@use="concat(name(..),\'::\',.)"][@match="' + column_name + '/@x:value[.=\'' + value + '\']"]');
        if (!key_node) {
            var new_key = xdom.xml.createDocument('<key xmlns="http://www.w3.org/1999/XSL/Transform" name="groupCollapse" match="' + column_name + '/@x:value[.=\'' + value + '\']" use="concat(name(..),\'::\',.)"/>');
            //xdom.dom.insertAfter(new_key.documentElement, root_node);
            xsl.selectSingleNode('*').appendChild(new_key.documentElement);
        } else {
            xdom.data.remove(key_node);
        }
    }

    xdom.dom.refresh();
}

xdom.data.filterBy = function (settings) {//filter_by, value, attribute, exclusive
    var coalesce = xdom.data.coalesce;
    var settings = (settings || {});
    if (arguments.length > 0 && !(arguments.length == 1 && arguments[0].constructor === {}.constructor)) {
        var new_settings = {}
        new_settings["filter_by"] = arguments[0]
        new_settings["value"] = arguments[1]
        new_settings["attribute"] = arguments[2]
        new_settings["exclusive"] = arguments[3]
        new_settings["row_path"] = arguments[4]
        xdom.data.filterBy(new_settings);
        if (xdom.data.filterBy.caller != xdom.data.filterBy) {
            xdom.dom.refresh();
        }
        return;
    }
    var filter_by = settings["filter_by"]
    if (filter_by && filter_by.constructor == [].constructor) {
        if (filter_by.length == 1) {
            filter_by = filter_by[0];
        } else {
            for (var a = filter_by.length - 1; a >= 0; --a) {
                xdom.data.filterBy(filter_by.pop(), value, attribute, exclusive, row_path)
            }
            if (xdom.data.filterBy.caller != xdom.data.filterBy) {
                xdom.dom.refresh();
            }
            return;
        }
    }
    var transforms = xdom.data.getTransformationFileName(xdom.data.document).split(";");
    var layout_transform = transforms.pop();
    var xsl = (xdom.library[layout_transform].document || xdom.library[layout_transform]);
    var filter_node = xsl.documentElement.selectSingleNode('//xsl:key[@name="filterBy"][starts-with(@match,"*")]');
    var row_path
    if (filter_node) {
        row_path = (settings["row_path"] || filter_node.getAttribute("match").match(/^[^\[]+/)[0])
    }
    row_path = (row_path || '*');

    var filters = {};
    if (filter_by) {
        var value = settings["value"]
        var exclusive = settings["exclusive"]
        var full_path = filter_by.split(/\//ig)
        var root_node = full_path.shift();
        var attribute = full_path.join('/');//full_path.pop()

        var attribute = (attribute || "@x:value");
        var exclusive = coalesce(exclusive, false);

        if (exclusive) {
            xdom.data.clearFilterOption(filter_by)
        }
        //var filter_column = xsl.documentElement.selectSingleNode('//xsl:key[@name="filterBy"][@use="name()"][@match="' + root_node + '"]');
        //if (!filter_column) {
        //    var new_key = xdom.xml.createDocument('<key xmlns="http://www.w3.org/1999/XSL/Transform" name="filterBy" match="' + root_node + '" use="name()"/>');
        //    xsl.selectSingleNode('*').appendChild(new_key.documentElement);
        //}
        var filter_column = xsl.documentElement.selectSingleNode('//xsl:key[@name="filterBy"][@use="name()"][@match="' + root_node + '[' + attribute + ']"]');
        if (!filter_column) {
            var new_key = xdom.xml.createDocument('<key xmlns="http://www.w3.org/1999/XSL/Transform" name="filterBy" match="' + root_node + '[' + attribute + ']" use="name()"/>');
            filter_column = xsl.selectSingleNode('*').appendChild(new_key.documentElement);
        }

        if (value !== undefined) {
            var filter_definition;
            //filter_definition = "@x:value='" + Encoder.htmlEncode(value) + "'";
            filter_definition = attribute + "='" + xdom.xml.encodeEntities(value) + "'";

            //var new_key = xdom.xml.createDocument('<key xmlns="http://www.w3.org/1999/XSL/Transform" name="filterBy" match="' + root_node + '[' + filter_definition + ']" use="concat(name(),\'::\',' + attribute + ')"/>');
            //xdom.dom.insertAfter(new_key.documentElement, filter_column);
            var new_key = xdom.xml.createDocument('<key xmlns="http://www.w3.org/1999/XSL/Transform" name="filterBy" match="' + root_node + '[' + filter_definition + ']" use="generate-id()"/>');
            xdom.dom.insertAfter(new_key.documentElement, filter_column);

            //var filter_column = xsl.documentElement.selectSingleNode('//xsl:key[@name="filterBy"][@use="name()"][@match="' + filter_by + '"]');
            //var new_key = xdom.xml.createDocument('<key xmlns="http://www.w3.org/1999/XSL/Transform" name="filterBy" match="' + filter_by + '[' + filter_definition + ']" use="\'all\'"/>')
            //xdom.dom.insertAfter(new_key.documentElement, filter_column);
        }
    }

    var filter_keys = xsl.selectNodes('//xsl:key[@name="filterBy"][@use="generate-id()" or @use="name()" or starts-with(@use,"concat(name(),\'::\',")]')
    for (var f in filter_keys) {
        var field = filter_keys[f];
        var match_parts = field.getAttribute("match").split(/\[|\]|=/)
        var field_name = match_parts.shift();
        var attr = match_parts.shift()//field.getAttribute("match").replace(/^[^\[]+\[|]$/g, '');
        var condition_value = match_parts.join('');
        filters[field_name] = (filters[field_name] || {})
        if (field_name == '*') {
            attr = "self::*";
        }
        if (attr) {//field.getAttribute("use") == "name()") {
            filters[field_name][attr] = (filters[field_name][attr] || []);
        }
        if (!condition_value) {//field.getAttribute("use") != "generate-id()") {
            continue;
        }
        var filter_column = xsl.documentElement.selectSingleNode('//xsl:key[@name="filterBy"][@use="name()"][@match="' + field_name + '[' + attr + ']"]');
        if (!filter_column) {
            delete filter_keys[f];
            continue;
        }
        filters[field_name][attr] = (filters[field_name][attr] || []);
        filters[field_name][attr].push(condition_value);//field_condition.substr(field_condition.indexOf('=') + 1));
    }

    var other_filters_nodes = xsl.documentElement.selectNodes('//xsl:key[starts-with(@name,"other_filters_")]');
    xdom.data.remove(other_filters_nodes);
    for (var key in filters) {
        for (var attr in filters[key]) {
            var other_filters = JSON.parse(JSON.stringify(filters))//Object.assign({}, filters);
            delete other_filters[key][attr];
            var other_filters_definition = xdom.data.filter.createFilters(other_filters);
            var new_key = xdom.xml.createDocument('<key xmlns="http://www.w3.org/1999/XSL/Transform" name="other_filters_' + (key + '/' + attr).replace(/[^\d\sa-zA-Z\u00C0-\u017F]/ig, '_') + '" match="' + row_path + (other_filters_definition.length ? "[" + other_filters_definition + "]" : "") + '" use="generate-id(' + (key == '*' ? '/*' : '') + ')"/>');
            xsl.selectSingleNode('*').appendChild(new_key.documentElement);
        }
    }

    var new_filters = xdom.data.filter.createFilters(filters);
    if (!filter_node) {
        var new_key = xdom.xml.createDocument('<key xmlns="http://www.w3.org/1999/XSL/Transform" name="other_filters_' + (key + '/' + attribute).replace(/[^\d\sa-zA-Z\u00C0-\u017F]/ig, '_') + '" match="' + row_path + (new_filters.length ? "[" + new_filters + "]" : "") + '" use="generate-id(' + (key == '*' ? '/*' : '') + ')"/>'); //revisar si está bien esta nodo, porque se crea con other_fields si no existe el nodo de filtros
        xsl.selectSingleNode('*').appendChild(new_key.documentElement);
    } else {
        filter_node.setAttribute("match", row_path + (new_filters.length ? "[" + new_filters + "]" : ""));
    }
    if (xdom.data.filterBy.caller != xdom.data.filterBy) {
        xdom.dom.refresh();
    }
}

xdom.data.filter.createFilters = function (filters) {
    var filter_definition = xdom.json.join(filters, {
        separator: " and "
        , for_each: function (element, index, array) {
            if (!(element.value && Object.keys(element.value).length)) {
                array[index] = undefined;
            } else {
                var field = element.key
                var value_definition = xdom.json.join(element.value, {
                    separator: " and "
                    , for_each: function (_element, _index, _array) {
                        if (!_element.value.length) {
                            _array[_index] = undefined;
                        } else {
                            var values = []
                            for (var e = 0; e < _element.value.length; ++e) {
                                values.push(_element.key + ' = ' + _element.value[e])
                            }
                            _array[_index] = field + "[" + values.join(" or ") + "]";
                        }
                    }
                });
                if (value_definition != '') {
                    array[index] = value_definition;
                } else {
                    array[index] = undefined;
                }
            }
        }
    });
    return filter_definition;
}

xdom.data.clearFilter = function (filter_by) {
    //xdom.data.document.selectSingleNode("/*[1]").removeAttribute('filterBy');
    //xdom.data.document.selectSingleNode("/*[1]").removeAttribute('filterByValue');
    var filter_node;
    var transforms = xdom.data.getTransformationFileName(xdom.data.document).split(";");
    var layout_transform = transforms.pop();
    var xsl = (xdom.library[layout_transform].document || xdom.library[layout_transform]);

    if (filter_by === undefined) {
        filter_node = xsl.documentElement.selectNodes('//xsl:key[@name="filterBy"][not(starts-with(@match,"*"))]');
    } else {
        filter_node = xsl.documentElement.selectNodes('//xsl:key[@name="filterBy"][@use="name()" or @use="local-name()"][contains(concat("^",@match,"["),"^' + filter_by + '[")]');

    }
    xdom.data.remove(filter_node)
    xdom.data.filterBy();
}

xdom.data.clearFilterOption = function (filter_by, value) {
    var attribute = (attribute || "@x:value");
    var filter_definition = "";
    var filter_nodes;
    var full_path = filter_by.split(/\//ig)
    var root_node = full_path.shift();
    var attribute = full_path.join('/');//full_path.pop()
    if (value !== undefined) {
        //filter_definition = '[@match="' + root_node + "[@x:value='" + Encoder.HTML2Numerical(Encoder.htmlEncode(value) + "']\"]";
        filter_definition = '[@match="' + root_node + "[" + attribute + "='" + value + "']\"]";
    }
    var transforms = xdom.data.getTransformationFileName(xdom.data.document).split(";");
    var layout_transform = transforms.pop();
    var xsl = (xdom.library[layout_transform].document || xdom.library[layout_transform]);
    filter_nodes = xsl.documentElement.selectNodes('//xsl:key[@name="filterBy"][contains(concat("^",@match,"["),"^' + root_node + '[")]' + filter_definition);
    xdom.data.remove(filter_nodes)
    if (xdom.data.clearFilterOption.caller != xdom.data.filterBy) {
        xdom.data.filterBy();
    }
}

xdom.data.clear = function (filter_by) {
    xdom.data.document = null;
    xdom.data.binding.sources = {};
    xdom.session.setData(null);
    xdom.dom.refresh();
}

xdom.data.sortBy = function (sort_by, is_number, sort_order) {
    var sort_order = (sort_order || 'ascending')
    var start_date = new Date();
    var xsl_transform = xdom.xml.createDocument('\
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:x="http://panax.io/xdom">                 \
  <xsl:output method="xml" indent="no"/>                                                        \
  <xsl:template match="@* | node()">                                                            \
      <xsl:copy>                                                                                \
          <xsl:apply-templates select="@* | node()"/>                                           \
      </xsl:copy>                                                                               \
  </xsl:template>                                                                               \
  <xsl:template match="/*">                                                                     \
    <xsl:copy>                                                                                  \
      <xsl:copy-of select="@*"/>                                                                \
      <xsl:attribute name="sortBy">' + sort_by + '</xsl:attribute>                              \
      <xsl:attribute name="sortOrder">' + sort_order + '</xsl:attribute>                        \
        <xsl:apply-templates select="*">                                                        \
          <xsl:sort select="*[@ref=\'' + sort_by + '\']/@x:value" order="' + sort_order + '" data-type="' + (is_number ? 'number' : 'text') + '"/>\
          <xsl:sort select="*[local-name()=\'' + sort_by + '\']/@x:value" order="' + sort_order + '" data-type="' + (is_number ? 'number' : 'text') + '"/>\
        </xsl:apply-templates>                                                                   \
    </xsl:copy>                                                                                 \
  </xsl:template>                                                                               \
</xsl:stylesheet>                                                                               \
', 'text/xml');
    xdom.data.document = xdom.xml.transform(xdom.data.document, xsl_transform);
    if (xdom.debug["xdom.data.sortBy"]) {
        console.log("@sort#Transformation Time: " + (new Date().getTime() - start_date.getTime()));
    }
    var e = event;
    if (typeof e.stopPropagation != "undefined") {
        e.stopPropagation();
    } else if (typeof e.cancelBubble != "undefined") {
        e.cancelBubble = true;
    }
    xdom.dom.refresh();
}

xdom.data.removeDeletingNodes = function (context) {
    context = xdom.xml.transform(context, xdom.library["resources/remove_for_deletion.xslt"]);
    return context;
}

xdom.data.getValue = function (element) {
    if (!element || !(element instanceof HTMLElement)) return undefined;
    var element_value = '';
    if ((typeof element) == 'object') {
        /*if ($(element).is('.texto, .text')) {
            element_value = trimAll(element.value !== undefined ? element.value : (element.innerText !== undefined ? element.innerText : element));
            return element_value;
        }
        else */if (element.length && element[0].nodeName.toLowerCase() == 'input' && (element[0].type == "radio" || element[0].type == "checkbox")) {
            for (s = 0; s < element.length; ++s) {
                element_value += (element(s).checked ? (element_value != '' ? ',' : '') + (element(s).value) : '')
            }
        }
        else if (element.options && element.nodeName.toLowerCase() == 'select') {
            for (s = 0; s < element.options.length; ++s) {
                element_value += (element.options[s].selected ? (element_value != '' ? ', ' : '') + (element.className == 'catalog' && (element.value.toUpperCase() == 'TODOS' || element.value.toUpperCase() == 'TODAS') ? 'all' : element.options[s].value) : '')
            }
        }
        else if (element.length) {
            return element
        }
        else if (element.nodeName.toLowerCase() == 'input' && element.type == "checkbox" && element.id != 'identifier') {
            element_value = (element.checked || element.DefaultIfUnchecked && eval(element.DefaultIfUnchecked)) ? element.value : '';
        }
        else if (element.nodeName.toLowerCase() == 'div') {
            element_value = element.innerHTML;
        }
        else {
            element_value = xdom.string.trim(element.value !== undefined ? element.value : (element.innerText !== undefined ? element.innerText : element));
        }
    }
    else {
        element_value = element;
    }
    if (element.className && element.className.match(/\bmoney\b/gi)) {
        element_value = element_value.replace(/[^\d\.-]/gi, '');
    }
    //if (isDateType(element_value)) element_value = fillDate(element_value);
    //if (isNumericOrMoney(element_value) || element_value.isPercent()) element_value = unformat_currency(element_value);
    //if (isNumber(element_value) && !esVacio(element_value)) element_value = parseFloat(element_value)

    return element_value;
}

xdom.data.binding.trigger = function (context) {
    if (!(context && typeof (context.selectSingleNode) != 'undefined')) {
        return; //*** Revisar si en vez de salir, revisar todo el documento
    }
    //if (!context.selectSingleNode('//@source:*') || context.selectSingleNode('.//@request:*[local-name()!="init"]')) {
    //    return;
    //}
    var new_bindings = 0;
    var bindings_transform = (context.selectSingleNode("ancestor-or-self::*[@transforms:bindings]/@transforms:bindings") || {}).value
    do {
        context = xdom.data.applyTransforms(context, ["resources/databind.xslt", bindings_transform]);
    } while (context && context.selectSingleNode("//*[@bind:pending]") && ++new_bindings <= 15)
    //context = xdom.data.applyTransforms(context, ["resources/databind_cleanup.xslt"]);

    if (!context) return;
    var requests = context.selectNodes('.//@request:*[local-name()!="init"]');
    if (new_bindings) {
        xdom.data.history.saveState();
    }
    if (context.documentElement) {
        xdom.data.document = context;
    }
    if (requests.length && (new_bindings || !(Object.keys(xdom.data.binding.requests).length))) {
        for (var b = 0; b < requests.length; b++) {
            var attribute_src = requests[b];
            var attribute = requests[b];
            var node = xdom.xml.createDocument((attribute.ownerElement || attribute).selectSingleNode('ancestor-or-self::*[not(contains(namespace-uri(), "http://panax.io/xdom"))][1]')).documentElement;
            var node_id = node.getAttribute("x:id");
            var attribute_base_name = (attribute.baseName || attribute.localName)
            var attribute_name = attribute.prefix.replace(/^request$/, "source") + ":" + attribute_base_name;
            var command = node.getAttribute(attribute_name);
            var request_id = node.getAttribute("x:id") + "::" + command.replace(/^\w+:/, '');
            if (command && (node && !command.match("{{") /*&& !(xdom.xhr.Requests[node.getAttribute("x:id") + "::" + command])*/ && !node.selectSingleNode(attribute.name + '[@for="' + command + '"]'))) {
                console.log("Binding " + command)
                xdom.data.binding.requests[node_id] = (xdom.data.binding.requests[node_id] || {});
                if (xdom.data.binding.requests[node_id][attribute_base_name] && xdom.data.binding.requests[node_id][attribute_base_name].parameters["command"] != command.replace(/^\w+:/, '')) {
                    xdom.data.binding.requests[node_id][attribute_base_name].abort();
                    console.log("Se canceló una solicitud en curso")
                }
                xdom.data.binding.requests[node_id][attribute_base_name] = (xdom.data.binding.requests[node_id][attribute_base_name] || {});
                xdom.data.binding.requests[node_id][attribute_base_name] = xdom.data.binding.handleRequest({
                    "request": command
                    , "src": attribute_src
                    //, "target_attribute": attribute_name//.replace(/^\w+:/, "source:")
                    , "xhr": {
                        "async": true
                        , "request_id": request_id
                        , "target": node
                        //, "type": (attribute_name.match("^source:") ? "table" : "scalar")
                        , "headers": {
                            "Cache-Response": (eval(node.getAttribute("cache" + ":" + (attribute.baseName || attribute.localName))) || false)
                            , "Accept": content_type.xml
                            , "Root-Node": attribute_name
                        }
                    }
                });
                xdom.data.binding.requests[node_id][attribute_base_name].subscribe(attribute_src, {
                    onComplete: function (Response, Request) {
                        var that = this;
                        var attribute = this;
                        var node_id = attribute.ownerElement.getAttribute("x:id")
                        if (!xdom.data.binding.requests[node_id]) {
                            console.warn('El arreglo no existe');
                            return;
                        }
                        if (this.interval) {
                            window.clearInterval(that.interval);
                            delete that.interval;
                        }
                        if (xdom.data.find(attribute) && xdom.data.find(attribute).ownerElement.getAttribute("interval:" + (attribute.baseName || attribute.localName))) {
                            this.interval = setInterval(function () {
                                window.clearInterval(that.interval);
                                delete that.interval;
                                xdom.data.binding.requests[node_id][(attribute.baseName || attribute.localName)].load();
                            }, xdom.data.find(attribute).ownerElement.getAttribute("interval:" + (attribute.baseName || attribute.localName)));
                        } else {
                            delete xdom.data.binding.requests[node_id][(attribute.baseName || attribute.localName)];
                        }
                        if (xdom.data.binding.requests && !(Object.keys(xdom.data.binding.requests[node_id]).length)) {
                            delete xdom.data.binding.requests[node_id];
                        }
                    }
                });
            }
        }
        xdom.data.binding.updateSources();
    }
}

xdom.data.binding.updateSources = function () {
    for (var request in xdom.data.binding.requests) {
        for (var command in xdom.data.binding.requests[request]) {
            var xhr = xdom.data.binding.requests[request][command];
            if (xhr) {
                xhr.get();
            }
        }
    }
}

xdom.data.binding.handleRequest = function (settings) {
    var target = settings.xhr.target;
    var target_attribute = settings["target_attribute"];
    var src = settings.xhr.src;
    var request = settings["request"]; delete settings["request"];
    var on_complete = settings["on_complete"]; delete settings["on_complete"];
    var from_cache = xdom.data.coalesce(settings["from_cache"], true); delete settings["from_cache"];
    var cache_results = xdom.data.coalesce(settings["cache_results"], true); delete settings["cache_results"];
    var xml_document;
    var result;

    var on_success = function (Response, Request) {
        var target = xdom.data.find((Request.requester || {}).ownerElement)
        if (!(target)) {
            return;
        }
        var src = target.selectSingleNode('@' + Request.requester.name);
        if (!(src && Request.parameters.command == target.getAttribute('source:' + Request.requester.localName).replace(/^\w+\:/, ''))) {
            return;
        }
        switch (Response.type) {
            case "xml":
                var attribute_name = src.name.split(':', 2);
                var attr = attribute_name.pop();
                var prefix = attribute_name.pop();
                var new_prefix = 'source';
                var new_attribute_name = new_prefix + ':' + attr;
                xml_document = Response.document.selectSingleNode("./" + src.name);
                if (!xml_document) {
                    var xsl = xdom.xml.createDocument('\
                        <xsl:stylesheet version="1.0" \
                             xmlns:xsl="http://www.w3.org/1999/XSL/Transform"'+ ((new_prefix ? ' xmlns:' + new_prefix + '="' + xdom.namespaces["xmlns:" + new_prefix] + '"' : '')) + '>                     \
                              <xsl:output method="xml" indent="no"/>\
                            <xsl:template match="/*">              \
                                <xsl:element name="' + new_attribute_name + '">  \
                                <xsl:copy-of select="@*" />                     \
                                <xsl:attribute name="for">'+ request + '</xsl:attribute>                     \
                                <xsl:copy-of select="*|text()" />                     \
                          </xsl:element></xsl:template>                                      \
                            </xsl:stylesheet>');
                    xml_document = xdom.xml.transform(Response.document, xsl);

                    //var children = Response.document.selectNodes("//x:response[1]/*");
                    //if (children) {
                    //    var attribute = src.name.split(':', 2);
                    //    var attr = attribute.pop();
                    //    var prefix = attribute.pop();
                    //    var attribute_node = xdom.xml.createDocument('<' + src.name + ((prefix ? ' xmlns:' + prefix + '="' + xdom.namespaces["xmlns:" + prefix] + '"' : '')) + '/>');
                    //    for (var x = 0; x < children.length; x++) {
                    //        attribute_node.documentElement.appendChild(children[x]);
                    //    }
                    //    xml_document = xdom.xml.createDocument(attribute_node);
                    //    if (xml_document.documentElement) {
                    //        xml_document.documentElement.setAttribute("for", request);
                    //    }
                    //} else {
                    //    xml_document = Response.document;
                    //}
                } else {
                    xml_document = xdom.xml.createDocument(xml_document);
                }
                //if (xml_document.selectSingleNode("./" + new_attribute_name) && xml_document.documentElement) {
                //    xml_document.documentElement.setAttribute("for", request);
                //}

                //if (xml_document) {
                //    if (cache_results) {
                //        xdom.cache[request] = xml_document;
                //    }
                //}
                //Request.unsubscribe(src)
                //xdom.data.remove(src);
                xdom.data.update({ "uid": target.getAttribute('x:id'), "attribute": new_attribute_name, "value": xml_document, "cascade": true, "action": "replace", "refresh": true });

                result = xml_document;
                console.log("\tCompleted: (" + request + ')');
                break;
            case "json":
            case "script":
                var object = Response.value;
                if (object && object.recordSet) {
                    value = object.recordSet[0].Result;
                    var namespaces = xdom.xml.createNamespaceDeclaration(xdom.data.document);
                    var node = xdom.xml.createDocument('<' + src.name + ' ' + namespaces + ' for="' + request + '">' + String(value) + '</' + src.name + '>');

                    //if (cache_results) {
                    //    xdom.cache[request] = node;
                    //}
                    xdom.data.update(target.getAttribute("x:id"), src.name, node);
                    if (xdom.debug["xdom.data.binding.handleRequest"]) {
                        console.log("\tCompleted: (" + request + ') = ' + value);
                    }
                }
                break;
            default:
                console.log(Response.document)
        }

        //if (Response.status == 200 && Response.json) {
        //    if (Response.json.status) {
        //        if (Response.json.status == 'unauthorized') {
        //            console.error(Response.json.message || xdom.messages.unauthorized || "Unauthorized user")
        //            xdom.data.update(xdom.data.document.selectSingleNode("/*[1]").getAttribute("x:id"), '@session:user_id', null);
        //        } else if (Response.json.recordSet) {
        //            value = Response.json.recordSet[0].Result;
        //            var namespaces = xdom.xml.createNamespaceDeclaration(xdom.data.document);
        //            var node = xdom.xml.createDocument('<' + target_attribute + ' ' + namespaces + ' for="' + request + '">' + String(value) + '</' + target_attribute + '>');

        //            if (cache_results) {
        //                xdom.cache[request] = node;
        //            }
        //            xdom.data.update(target.getAttribute("x:id"), target_attribute, node);
        //            if (xdom.debug) {
        //                console.log("\tCompleted: (" + request + ') = ' + value);
        //            }
        //        }
        //    }
        //} else if (Response.xml !== undefined) {
        //    xml_document = Response.xml;
        //    xml_document.documentElement.setAttribute("for", request)
        //    if (xml_document) {
        //        if (cache_results) {
        //            xdom.cache[request] = xml_document;
        //        }
        //    }
        //    xdom.data.update({ "uid": target.getAttribute('x:id'), "attribute": target_attribute, "value": xml_document, "cascade": true, "action": "replace" });
        //    result = xml_document;
        //    console.log("\tCompleted: (" + request + ')');
        //}
        if (on_complete && on_complete.apply) {
            on_complete.apply(this, arguments);
        };
    }
    result = xdom.server.request(xdom.json.merge({
        "request": request.replace(/^\w+:/, '')
        , "src": src
        , "exec": false
        , "xhr": {
            "async": true
        }
        , "onSuccess": function (Response, Request) {
            on_success.apply(this.requester, arguments)
        }
    }, settings));
    return result;
}


xdom.data.update = function (target, attribute, value, refreshDOM, action, cascade) {
    var coalesce = xdom.data.coalesce;
    var trigger = (event && xdom.data.update.caller != xdom.data.cascade ? event.srcElement : undefined);
    var settings = {}
    if (refreshDOM !== undefined) {
        settings["refresh"] = refreshDOM;
    }

    if (arguments.length == 0) {
        refreshDOM = true;
    } else if (arguments.length == 1 && arguments[0].constructor === {}.constructor) {
        settings = xdom.json.merge(settings, arguments[0]);
        target = settings["target"];
        if (!settings.hasOwnProperty("target") && !settings.hasOwnProperty("attributes") && !settings.hasOwnProperty("uid") && !settings.hasOwnProperty("refresh")) {
            var attributes = settings;
            settings = {};
            settings["attributes"] = [attributes];
        }
    } else if (arguments.length == 1 && typeof (arguments[0]) == 'boolean') {
        refreshDOM = arguments[0];
        target = undefined;
    }

    if (value && typeof (value) == 'object' && !value.documentElement) { return false; }

    var uid = coalesce(settings["uid"], typeof (target) == "string" ? target : undefined);
    var attribute = coalesce(settings["attribute"], attribute, '@x:value');
    var value = settings.hasOwnProperty("value") ? settings["value"] : coalesce(value, (attribute == '@x:value' ? xdom.data.getValue(trigger) : undefined));

    var action = coalesce(settings["action"], action, 'replace'); //[replace | append]
    var cascade = coalesce(settings["cascade"], cascade, true);
    var src;
    trigger = trigger && trigger.id ? xdom.data.document.selectSingleNode("//*[@x:id='" + trigger.id + "']") : undefined;

    if (target && typeof (target.selectSingleNode) != 'undefined') {
        src = target;
        uid = target.getAttribute("x:id")
    } else if (uid) {
        src = xdom.data.document.selectSingleNode("//*[@x:id='" + uid + "']");
    } else if (event && event.srcElement) {
        uid = (xdom.dom.findClosestElementWithId(event.srcElement) || event.srcElement).id;
        src = xdom.data.document.selectSingleNode("//*[@x:id='" + uid + "']/ancestor-or-self::*[not(contains(namespace-uri(),'http://panax.io/xdom'))][1]");
    }
    if (!src) {
        console.warn("Reference to a record is needed");
        return;
    }
    //if (uid) {
    //    xdom.dom.activeElementId = uid
    //    xdom.data.document.selectSingleNode("/*").setAttribute("x:focus", uid)
    //}
    if (!uid) {
        var uid = Math.random().toString();
        if (!src.getAttribute("xmlns:x")) {
            src.setAttribute("xmlns:x", xdom.namespaces["xmlns:x"]);
        }
        src.setAttribute("x:id", uid);
    }
    var start_date = new Date();
    if (!src) {
        console.error("Couldn't update data, the source might have changed. Trying to reload.");
        xdom.dom.refresh();
        return;
    }
    if (xdom.data.document.selectSingleNode('//*[@x:id="' + src.getAttribute("x:id") + '"]') && xdom.data.document.selectSingleNode('//*[@x:id="' + src.getAttribute("x:id") + '"]') !== src) {
        src = xdom.data.document.selectSingleNode('//*[@x:id="' + src.getAttribute("x:id") + '"]');
    }
    var $bindings = xdom.data.binding.sources;
    var dependants = {};
    var attributes;
    if (settings["attributes"]) {
        attributes = settings["attributes"];
    } else {
        attributes = [];
        attributes.push(new Object().push(attribute, value));
    }
    var changed = false;
    for (var item = 0; item < attributes.length; ++item) {
        attribute = Object.keys(attributes[item]).join("");
        value = attributes[item][attribute];
        if (xdom.debug["xdom.data.update"]) {
            console.log("uid: " + uid)
            console.log("\tAttribute: " + attribute)
            console.log("\tValue: " + value)
        }
        if (attribute == '@x:value') {
            if (xdom.data.update.caller.name.match(/onchange|onblur|onpropertychange/)) {
                xdom.data.history.undo.push(xdom.xml.createDocument(xdom.data.document));
                xdom.data.history.redo = [];
            }
        }
        var regex = new RegExp(xdom.string.trim(attribute) + '\\b', 'g');
        if (typeof (src.ownerDocument.setProperty) != "undefined") {
            var current_namespaces = xdom.xml.getNamespaces(src.ownerDocument.getProperty("SelectionNamespaces"));
            if (!current_namespaces["xmlns:x"]) {
                current_namespaces["xmlns:x"] = "http://panax.io/xdom";
                src.ownerDocument.setProperty("SelectionNamespaces", xdom.json.join(current_namespaces, { "separator": " " }));
            }
        }
        //if (src.selectSingleNode('self::x:*') || src.getAttribute("x:readonly") == 'true()' || src.getAttribute("x:readonly") != 'false()' && ((src.getAttribute("x:readonly") || '').match(regex))) {
        //    //if (xdom.debug) {
        //        console.warn('Attribute ' + attribute + ' in ' + src.nodeName + ' can\'t be modified.')
        //    //}
        //    return false;
        //}
        var prefix = attribute.match(/^(@?)([^:]+)/).pop();
        if (xdom.namespaces["xmlns:" + prefix] && !xdom.xml.lookupNamespaceURI(src.ownerDocument.documentElement, xdom.namespaces["xmlns:" + prefix])) {
            src.ownerDocument.documentElement.setAttribute("xmlns:" + prefix, xdom.namespaces["xmlns:" + prefix]);
            if (typeof (src.ownerDocument.setProperty) != "undefined") {
                var xml_namespaces = xdom.xml.transform(src.ownerDocument, xdom.library["resources/normalize_namespaces.xslt"]);
                src.ownerDocument.setProperty("SelectionNamespaces", xdom.xml.createNamespaceDeclaration(xml_namespaces));
            }
        }

        if (attribute == 'data()') {
            if (value) {
                if (action == 'append') {
                    src.appendChild(value.documentElement);
                } else {
                    src.innerHTML = value.documentElement.outerHTML;
                }
            }
            refreshDOM = true;
        } else if (attribute == 'text()') {
            if (String(value).match(/^=/g).length > 0) {
                src.setAttribute('formula', value);
            }
            src.innerHTML = value;
            refreshDOM = true;
        } else if (attribute.match("^@")) {
            if (value && src.getAttribute('x:format') == 'money') {
                value = value.replace(/[^\d\.-]/gi, '');
            }
            var attribute_ref = (src.selectSingleNode(attribute) || {});
            if (attribute_ref.value == null || attribute_ref.value != (value || String(value)) || value && !String(value).match("{{") && attribute.match("^@(source):") && (!(src.selectSingleNode(attribute.replace(/^@/, ""))) || !$bindings[src.getAttribute("x:id")].formulas[value].updated)) {
                dependants = xdom.json.merge(dependants, ($bindings[src.getAttribute("x:id")] || { "dependants": {} }).dependants[attribute]);
                if (attribute_ref.value && attribute_ref.namespaceURI == "http://panax.io/xdom") {
                    src.setAttribute("prev:" + (attribute_ref.baseName || attribute_ref.localName), attribute_ref.value);
                }
                src.setAttribute(attribute.substring(1), (value || String(value)));//(value || "") //(value || "null"));
                changed = true;

                if (attribute.match("^@(source):")) {
                    if ((value || '').match("{{")) {
                        value = "";
                    } else {
                        var request = value.replace(/^\w+:/, '');
                        value = xdom.data.binding.handleRequest({
                            "request": request
                            , "target_attribute": attribute.replace(/^@/, "")
                            , "xhr": {
                                "async": true
                                , "target": src
                                , "type": (attribute.match("^@source:") ? "table" : "scalar")
                            }
                        });
                    }
                    attributes.push(new Object().push(attribute.replace(/^@/, ""), value));
                } else if (attribute == ("@x:value")) {
                    var catalog = src.selectSingleNode(attribute.replace(/^@\w+:/, 'source:'));
                    if (catalog) {
                        attributes.push(new Object().push("@x:text", (catalog.selectSingleNode('*[normalize-space(' + attribute + ')="' + String(value).replace(/"/, '\\"') + '"]/@x:text') || {}).value || ""));
                    } else if (trigger && trigger.selectSingleNode('self::x:r')) {
                        attributes.push(new Object().push("@x:text", (trigger.getAttribute((trigger.getAttribute("x:text_field") || '').substring(1) || 'x:text') || (value || "") || "")));
                    }
                }
                refreshDOM = refreshDOM !== undefined ? refreshDOM : undefined;
            }
        } else {
            dependants = xdom.json.merge(dependants, ($bindings[src.getAttribute("x:id")] || { "dependants": {} }).dependants[attribute]);
            if (action == 'append') {
                xdom.dom.insertAfter(value);
            } else {
                //if (src.selectSingleNode('@' + attribute)) {
                //    var node_exists = xdom.data.remove(src.selectSingleNode(attribute));
                //}
                if (!value && (typeof (value) != "boolean")) {
                    var node_exists = xdom.data.remove(src.selectSingleNode(attribute));
                }
                if (value != undefined && value !== '' && typeof (value.selectSingleNode) == 'undefined') {
                    var node = src.selectSingleNode(attribute);
                    if (!node) {
                        var namespaces = xdom.xml.createNamespaceDeclaration(xdom.data.document)
                        node = xdom.xml.createDocument("<" + attribute + " " + namespaces + ">" + String(value) + "</" + attribute + ">");
                    }
                    value = node;
                }
                if (value && value.documentElement) {
                    //var attrs = value.documentElement.selectNodes('@*');
                    //for (var attr in attrs) {
                    //    attrs[attr] 
                    //}
                    //xdom.data.remove(src.selectSingleNode(value.selectSingleNode("//*[1]").nodeName));
                    var for_value = value.documentElement.getAttribute("for");
                    var node_name = value.documentElement.nodeName;
                    var node = src.selectSingleNode(node_name + '[@for="' + for_value + '"]')
                    if (for_value && node) {
                        node.parentNode.replaceChild(value.documentElement, node);
                    } else {
                        xdom.dom.appendChild(src, value);
                    }
                    var source_transform = src.selectSingleNode("ancestor-or-self::*[@transforms:sources]/@transforms:sources");
                    if (source_transform && source_transform.value) {
                        xdom.data.applyTransforms(src, [source_transform.value]);
                        src = xdom.data.document.selectSingleNode('//*[@x:id="' + uid + '"]');
                    }
                }
            }
            changed = true;
            if (attribute.match("^source:")) {
                var target_attribute = attribute.replace(/^source:/, "@x:");
                var source_record = null;
                var target_value = (src.getAttribute("x:value") || src.getAttribute("prev:value"))
                if (String(parseFloat(target_value)) != 'NaN') {
                    source_record = src.selectSingleNode(attribute + '/*[number(' + target_attribute + ')="' + parseFloat(target_value) + '"]/' + target_attribute)
                } else {
                    source_record = (src.selectSingleNode(attribute + '/*[' + target_attribute + '="' + target_value + '"]/' + target_attribute) || new xdom.data.EmptyXML());
                }
                if (source_record) {
                    attributes.push(new Object().push(target_attribute, (source_record.value || "")));
                    attributes.push(new Object().push("@x:text", (source_record.selectSingleNode("../@x:text").value || "")));
                }
            }
            refreshDOM = refreshDOM !== undefined ? refreshDOM : undefined;
        }
    }
    if (settings["refresh"] !== false && (changed || refreshDOM)) {
        //xdom.data.history.redo = [];
        src = xdom.data.find(src);
        //if (!xdom.data.document.contains(src)) {
        //    xdom.data.document = xdom.xml.createDocument(xdom.data.document);
        //    src = xdom.data.document.selectSingleNode('//*[@x:id="' + uid + '"]');
        //}
        var context = src.selectSingleNode("ancestor-or-self::*[@x:transforms]");
        context = xdom.data.applyTransforms(context);

        if (xdom.data.update.caller.name.match(/onchange|onblur|onpropertychange/)) {
            if (this.delayRefresh != undefined) {
                window.clearTimeout(this.delayRefresh); this.delayRefresh = undefined;
            }
            this.delayRefresh = setTimeout(function () {
                xdom.dom.refresh();
            }, 5);
        } else {
            xdom.dom.refresh();
        }

    }
    if (xdom.session.live.running) xdom.session.saveSession();
    //xdom.session.setData(xdom.data.document);
}


xdom.xml.update = function (settings) {
    var coalesce = xdom.data.coalesce;
    var trigger = (event && xdom.data.update.caller != xdom.data.cascade ? event.srcElement : undefined);
    var settings = (settings || {});
    var refreshDOM = false;
    if (arguments.length == 0) {
        refreshDOM = true;
    } else if (arguments.length == 1 && arguments[0].constructor === {}.constructor) {
    }

    if (settings.hasOwnProperty("target")) {
        if (typeof (settings["target"].selectSingleNode) != 'undefined') {
            settings["target"] = settings["target"];
        } else if (settings.hasOwnProperty("target") && typeof (settings["target"]) == 'string') {
            settings["target"] = xdom.data.document.selectSingleNode("//*[@x:id='" + settings["target"] + "']");
        }
    }

    if (trigger && trigger.id) {
        settings["target"] = (settings["target"] || xdom.data.document.selectSingleNode("//*[@x:id='" + trigger.id + "']/ancestor-or-self::*[not(contains(namespace-uri(),'http://panax.io/xdom'))][1]"));
        if (!settings.hasOwnProperty("attributes")) {
            settings["attributes"] = {}
            settings["attributes"]["@x:value"] = xdom.data.getValue(trigger);
        }
    }
    var target = settings["target"];

    var src;

    if (target && typeof (target.selectSingleNode) != 'undefined') {
        src = target;
        uid = target.getAttribute("x:id")
    } else if (uid) {
        src = xdom.data.document.selectSingleNode("//*[@x:id='" + uid + "']");
    } else if (event && event.srcElement) {
        uid = event.srcElement.id;
        src = xdom.data.document.selectSingleNode("//*[@x:id='" + uid + "']/ancestor-or-self::*[not(contains(namespace-uri(),'http://panax.io/xdom'))][1]");
    }
    if (!src) {
        console.error("Reference to a record is needed");
        return;
    }
    if (!uid) {
        var uid = Math.random().toString();
        if (!src.getAttribute("xmlns:x")) {
            src.setAttribute("xmlns:x", xdom.namespaces["xmlns:x"]);
        }
        src.setAttribute("x:id", uid);
    }
    var start_date = new Date();
    if (!src) {
        console.error("Couldn't update data, the source might have changed. Trying to reload.");
        xdom.dom.refresh();
        return;
    }
    if (xdom.data.document.selectSingleNode('//*[@x:id="' + src.getAttribute("x:id") + '"]') && xdom.data.document.selectSingleNode('//*[@x:id="' + src.getAttribute("x:id") + '"]') !== src) {
        src = xdom.data.document.selectSingleNode('//*[@x:id="' + src.getAttribute("x:id") + '"]');
    }
    var attributes = settings["attributes"]
    var changed = false;
    for (var item = 0; item < attributes.length; ++item) {
        attribute = (typeof (attributes[item].selectSingleNode) != 'undefined' ? (attributes[item].nodeType == 2 ? '@' : '') + attributes[item].name : Object.keys(attributes[item]).join(""));
        value = (typeof (attributes[item].selectSingleNode) != 'undefined' ? attributes[item].value : attributes[item][attribute]);
        var action = "replace";
        if (attribute == '@x:value') {
            xdom.data.history.undo.push(xdom.data.document);
            xdom.data.history.redo = [];
        }
        var regex = new RegExp(xdom.string.trim(attribute) + '\\b', 'g');
        if (typeof (src.ownerDocument.setProperty) != "undefined") {
            var current_namespaces = xdom.xml.getNamespaces(src.ownerDocument.getProperty("SelectionNamespaces"));
            if (!current_namespaces["xmlns:x"]) {
                current_namespaces["xmlns:x"] = "http://panax.io/xdom";
                src.ownerDocument.setProperty("SelectionNamespaces", xdom.json.join(current_namespaces, { "separator": " " }));
            }
        }
        if (src.selectSingleNode('self::x:*') || src.getAttribute("x:readonly") == 'true()' || src.getAttribute("x:readonly") != 'false()' && ((src.getAttribute("x:readonly") || '').match(regex))) {
            if (xdom.debug["xdom.xml.update"]) {
                console.warn('Attribute ' + attribute + ' in ' + src.nodeName + ' can\'t be modified.')
            }
            return false;
        }
        var prefix = attribute.match(/^(@?)([^:]+)/).pop();
        if (xdom.namespaces["xmlns:" + prefix] && !xdom.xml.lookupNamespaceURI(src.ownerDocument.documentElement, xdom.namespaces["xmlns:" + prefix])) {
            src.ownerDocument.documentElement.setAttribute("xmlns:" + prefix, xdom.namespaces["xmlns:" + prefix]);
            if (typeof (src.ownerDocument.setProperty) != "undefined") {
                var xml_namespaces = xdom.xml.transform(src.ownerDocument, xdom.library["resources/normalize_namespaces.xslt"]);
                src.ownerDocument.setProperty("SelectionNamespaces", xdom.xml.createNamespaceDeclaration(xml_namespaces));
            }
        }

        if (attribute == 'data()') {
            if (value) {
                if (action == 'append') {
                    src.appendChild(value.documentElement);
                } else {
                    src.innerHTML = value.documentElement.outerHTML;
                }
            }
            refreshDOM = true;
        } else if (attribute == 'text()') {
            if (String(value).match(/^=/g).length > 0) {
                src.setAttribute('formula', value);
            }
            src.innerHTML = value;
            refreshDOM = true;
        } else if (attribute.match("^@")) {
            if (value && src.getAttribute('x:format') == 'money') {
                value = value.replace(/[^\d\.-]/gi, '');
            }
            var attribute_ref = (src.selectSingleNode(attribute) || {});
            if (attribute_ref.value == null || attribute_ref.value != (value || "") || value && !value.match("{{") && attribute.match("^@(source):") && !(src.selectSingleNode(attribute.replace(/^@/, "")))) {
                if (attribute_ref.value && attribute_ref.namespaceURI == "http://panax.io/xdom") {
                    src.setAttribute("prev:" + (attribute_ref.baseName || attribute_ref.localName), attribute_ref.value);
                }
                src.setAttribute(attribute.substring(1), (value || ""));//(value || "null"));
                changed = true;

                if (attribute.match("^@(source):")) {
                    if ((value || '').match("{{")) {
                        value = "";
                    } else {
                        var request = value.replace(/^\w+:/, '');
                        value = xdom.data.binding.handleRequest({
                            "request": request
                            , "target_attribute": attribute.replace(/^@/, "")
                            , "xhr": {
                                "async": true
                                , "target": src
                                , "type": (attribute.match("^@source:") ? "table" : "scalar")
                            }
                        });
                    }
                    attributes.push(new Object().push(attribute.replace(/^@/, ""), value));
                } else if (attribute == ("@x:value")) {
                    if (trigger && trigger.selectSingleNode('self::x:r')) {
                        attributes.push(new Object().push("@x:text", (trigger.getAttribute((trigger.getAttribute("x:text_field") || '').substring(1) || 'x:text') || (value || "") || "")));
                    }
                }
                refreshDOM = refreshDOM !== undefined ? refreshDOM : undefined;
            }
        } else {
            if (action == 'append') {
                xdom.dom.insertAfter(value);
            } else {
                //if (src.selectSingleNode('@' + attribute)) {
                //    var node_exists = xdom.data.remove(src.selectSingleNode(attribute));
                //}
                if (!value && (typeof (value) != "boolean")) {
                    var node_exists = xdom.data.remove(src.selectSingleNode(attribute));
                }
                if (value != undefined && value !== '' && typeof (value.selectSingleNode) == 'undefined') {
                    var node = src.selectSingleNode(attribute);
                    if (!node) {
                        var namespaces = xdom.xml.createNamespaceDeclaration(xdom.data.document)
                        node = xdom.xml.createDocument("<" + attribute + " " + namespaces + ">" + String(value) + "</" + attribute + ">");
                    }
                    value = node;
                }
                if (value && value.documentElement) {
                    //var attrs = value.documentElement.selectNodes('@*');
                    //for (var attr in attrs) {
                    //    attrs[attr] 
                    //}
                    //xdom.data.remove(src.selectSingleNode(value.selectSingleNode("//*[1]").nodeName));
                    var for_value = value.documentElement.getAttribute("for");
                    var node_name = value.documentElement.nodeName;
                    if (for_value && src.selectSingleNode(node_name + '[@for="' + for_value + '"]')) {
                        continue;
                    }
                    xdom.dom.appendChild(src, value);
                    var source_transform = src.selectSingleNode("ancestor-or-self::*[@transforms:sources]/@transforms:sources");
                    if (source_transform && source_transform.value) {
                        xdom.data.applyTransforms(src, [source_transform.value]);
                        src = xdom.data.document.selectSingleNode('//*[@x:id="' + uid + '"]');
                    }
                }
            }
            changed = true;
            if (attribute.match("^source:")) {
                var target_attribute = attribute.replace(/^source:/, "@x:");
                var source_record = null;
                var target_value = (src.getAttribute("x:value") || src.getAttribute("prev:value"))
                if (String(parseFloat(target_value)) != 'NaN') {
                    source_record = src.selectSingleNode(attribute + '/*[number(' + target_attribute + ')="' + parseFloat(target_value) + '"]/' + target_attribute)
                } else {
                    source_record = (src.selectSingleNode(attribute + '/*[' + target_attribute + '="' + target_value + '"]/' + target_attribute) || new xdom.data.EmptyXML());
                }
                if (source_record) {
                    attributes.push(new Object().push(target_attribute, (source_record.value || "")));
                    attributes.push(new Object().push("@x:text", (source_record.selectSingleNode("../@x:text").value || "")));
                }
            }
            refreshDOM = refreshDOM !== undefined ? refreshDOM : undefined;
        }
    }
    if (settings["refresh"] !== false && (changed || refreshDOM)) {
        xdom.data.document = xdom.xml.createDocument(xdom.data.document);
        xdom.data.history.redo = [];
        src = xdom.data.document.selectSingleNode('//*[@x:id="' + uid + '"]');
        var context = src.selectSingleNode("ancestor-or-self::*[@x:transforms]");
        context = xdom.data.applyTransforms(context);
        xdom.dom.refresh();
        xdom.data.binding.trigger(context);
    }
    //}
    //setTimeout(function () {//uses a small delay to catch the current selected element
    //    xdom.data.binding.trigger(context);
    //}, 5);
    if (xdom.session.live.running) xdom.session.saveSession();
    //xdom.session.setData(xdom.data.document);
}

xdom.data.applyTransforms = function (context, transforms) {
    var original_context = context;
    if (context) {
        ////context = context.selectSingleNode("ancestor-or-self::*[@x:transforms]");
        //context = (context.nodeName == "#document" ? context.documentElement : context);
        var target_id = (context.documentElement || context).getAttribute("x:id");
        if (!transforms) {
            transforms = xdom.data.getTransformationFileName(context).split(";");
            transforms.pop();
        }

        if (transforms.length) {
            for (var t = 0; t < transforms.length; t++) {
                transforms[t] = (transforms[t] || '').replace(/;\s*$/, '');
                if (!transforms[t]) continue;
                if (!xdom.library[transforms[t]]) {
                    console.error("xdom.data.applyTransforms: File " + transforms[t] + " is not ready.");
                    xdom.library.load(transforms[t], function () {
                        xdom.data.applyTransforms(context, transforms)
                    })
                    return;
                }
                context = xdom.xml.transform(context, xdom.library[transforms[t]]);//, context);
            }
            if (target_id) {
                context = context.selectSingleNode('//*[@x:id="' + target_id + '"]');
                var target_node = xdom.data.document.selectSingleNode('//*[@x:id="' + target_id + '"]')
                if (target_node && target_node.parentNode && context !== target_node) {
                    target_node.parentNode.replaceChild(context, target_node);
                    //xdom.dom.insertBefore(context, target_node);
                    //xdom.data.remove(target_node);
                    xdom.data.reseed(); //??
                }
            }
        }
    }
    return (xdom.data.find(context) || context);
}

xdom.data.findById = function (id) {
    return xdom.data.document.selectSingleNode('//*[@x:id="' + id + '"]')
}

xdom.data.findByName = function (name) {
    var nodes = xdom.data.document.selectNodes('//*[name()="' + name + '"]');
    if (nodes && nodes.length == 1) {
        nodes = nodes[0];
    }
    return nodes;
}

xdom.data.coalesce = function () {
    for (var i in arguments) {
        if (arguments[i] !== undefined) {
            return arguments[i];
        }
    }
    return;
}

xdom.dom.insertAfter = function (i, e, p) {
    if (e && e.nextElementSibling) {
        e.parentNode.insertBefore(i, e.nextElementSibling);
    } else {
        ((e || {}).parentNode || p).appendChild(i);
    }
}

xdom.dom.insertBefore = function (i, e, p) {
    if (e) {
        e.parentNode.insertBefore(i, e);
    } else {
        ((e || {}).parentNode || p).appendChild(i);
    }
}

xdom.data.addRecord = function (ref_node, target_node, target_position, how_many) {
    var how_many = (how_many == undefined ? 1 : how_many)
    if (how_many <= 0) return;
    var ref_node = (ref_node || '/*/*[1]');
    var target_node = (target_node || '/*');
    var target_position = (target_position || 'first')
    var start_date = new Date();
    //xdom.data.clearSelection();
    xdom.data.history.undo.push(xdom.data.document);
    var xNew;
    try {
        xNew = xdom.data.document.selectSingleNode(ref_node).cloneNode(true)
    } catch (e) {
        xNew = xdom.data.getFirstRecord(xdom.data.document).cloneNode(true);
    }
    xNew = xdom.xml.transform(xdom.xml.toString(xNew), xdom.library["resources/reset_record.xslt"]).selectSingleNode("*");
    var timestamp = Math.random().toString();
    xNew.setAttribute("timestamp", timestamp);
    xNew.setAttribute("editing", "true");
    xNew.setAttribute("x:selected", "true");
    xNew.removeAttribute("x:deleting");
    xdom.data.removeAttribute(xNew.selectNodes('*[@x:value]'), '@x:value');
    xdom.data.removeAttribute(xNew.selectNodes('*[@prev:value]'), '@prev:value');
    //div.innerHTML = xNew.outerHTML;
    //xdom.data.document.appendChild(div.childNodes)
    ////xdom.data.document.firstElementChild.insertAdjacentHTML('beforebegin', xNew); //Este método cambia las mayúsculas por minúsculas
    try {
        //var data = xdom.xml.createDocument(xdom.data.document);
        var target = xdom.data.document.selectSingleNode(target_node);
        if (target_position == 'first') {
            target.insertBefore(xNew, target.firstElementChild);
        } else if (target_position == 'previous') {
            target = xdom.data.document.selectSingleNode(ref_node);
            xdom.dom.insertBefore(xNew, target);
        } else if (target_position == 'next') {
            target = xdom.data.document.selectSingleNode(ref_node);
            xdom.dom.insertAfter(xNew, target);
        } else {
            xdom.dom.insertAfter(xNew, target.lastElementChild, target);
        }
        ////data.selectSingleNode('/*').appendChild(xNew, data.selectSingleNode('/*/*[1]'));
        //xdom.data.document = xdom.xml.createDocument(data);
    } catch (e) {
        console.log(e.message);
        return;
    }
    if (xdom.debug["xdom.data.addRecord"]) {
        console.log("@addRecord#Transformation Time: " + (new Date().getTime() - start_date.getTime()));
    }
    var new_record_uid;
    if (--how_many > 0) {
        new_record_uid = xdom.data.addRecord(ref_node, target_node, target_position, how_many);
    }
    xdom.session.setData(xdom.data.document);
    xdom.data.history.redo = [];
    if (!new_record_uid) {
        xdom.data.reseed();
        var new_record = xdom.data.document.selectSingleNode('//*[@timestamp="' + timestamp + '"]')
        var new_record_uid = new_record.getAttribute("x:id");
        xdom.data.applyTransforms(new_record);
        xdom.data.binding.trigger(new_record);
        xdom.dom.refresh();
    }
    return new_record_uid;
}

xdom.data.addRecord = function (ref_node, target_node, target_position, how_many) {
    var ref_id = xdom.data.document.selectSingleNode(ref_node).getAttribute("x:id");
    xdom.data.history.undo.push(xdom.data.document);
    xdom.data.update(ref_id, '@copy:after', (target_node || 'this()'), false);
    xdom.data.document = xdom.xml.transform(xdom.data.document, xdom.library["resources/commands.xslt"]);
    xdom.data.applyTransforms(xdom.data.document.selectSingleNode(ref_node).selectSingleNode("ancestor-or-self::*[@x:transforms]"));
    xdom.dom.refresh()
}

xdom.data.deleteRecord = function (uid) {
    var uid = (uid || event.srcElement.id);
    target = xdom.data.findById(uid);
    xdom.data.update(uid, '@x:deleting', 'true');
}

xdom.data.removeRecord = function (uid) {
    var uid = (uid || event.srcElement.id);
    target = xdom.data.findById(uid);
    xdom.data.remove(target);
    xdom.dom.refresh();
}

xdom.data.undo = function () {
    if (xdom.data.history.undo.length == 0) return;
    xdom.data.history.redo.push(xdom.data.document);
    xdom.data.document = xdom.xml.createDocument(xdom.data.history.undo.pop());
    //xdom.data.document.update = xdom.data.update;
    xdom.dom.refresh({ trigger_bindings: false }); //trigger bindings is disabled because it may modify xdom.data.history
}

xdom.data.redo = function () {
    if (xdom.data.history.redo.length == 0) return;
    xdom.data.history.undo.push(xdom.data.document);
    xdom.data.document = xdom.xml.createDocument(xdom.data.history.redo.pop());
    //xdom.data.document.update = xdom.data.update;
    xdom.dom.refresh();
}

xdom.data.reseed = function (data) {
    var start_date = new Date();
    var data = (data || xdom.data.document);
    if (!(data && data.selectSingleNode('/*'))) {
        return data;
    }

    data = xdom.xml.transform(data, xdom.library["resources/normalize_namespaces.xslt"]);
    data = xdom.xml.transform(data, xdom.library["resources/prepare_data.xslt"]);
    //JSON.parse('{' + (data.selectNodes("processing-instruction('xml-stylesheet')")[0].data.match(/(\w+)=(["'])([^\2]+?)\2/ig) || []).join(", ").replace(/(\w+)=(["'])([^\2]+?)\2/ig, '"$1":$2$3$2') + '}')
    if (xdom.debug["xdom.data.reseed"]) {
        console.log("@reseed#Transformation Time: " + (new Date().getTime() - start_date.getTime()));
    }

    if (arguments.length == 0) {
        xdom.data.document = data;
    }

    return data;
}

xdom.data.clearCache = function (cache_name, src) {
    var url = "server/clearCache.asp?file_name=" + cache_name.replace(/^[^:]+:/, '');
    var src = xdom.data.find((src || xdom.dom.findClosestElementWithId(event.srcElement).id.replace(/container_/i, '')));
    var oData = new xdom.xhr.Request(url);
    oData.onSuccess = function (Response, Request) {
        if (src) {
            xdom.data.remove(src.selectSingleNode('source:value'))
        }
        delete xdom.xhr.cache[Request.parameters["file_name"]];
        xdom.dom.refresh();
    }
    oData.onException = function (Response, Request) {
        result = Response;

    }
    oData.load();
}

xdom.dom.getRelativePath = function (element, path) {
    path = (path || [])
    if (element.id) {
        path.unshift(element.tagName + "#" + element.id);
        return path;
    } else if (element.parentElement) {
        path.unshift(element.tagName);
        return xdom.dom.getRelativePath(element.parentElement, path);
    } else {
        path.unshift(element.tagName);
        return path;
    }
}

xdom.dom.findClosestElementWithId = function (element) {
    if (!element) return element;
    if (element.id && !element.id.startsWith("_")) {
        return element;
    } else if (element.parentElement) {
        return xdom.dom.findClosestElementWithId(element.parentElement);
    } else {
        return undefined;
    }
}

xdom.dom.saveState = function () {
    xdom.dom.position = xdom.dom.getScrollPosition(document.getElementsByClassName("w3-responsive")[0]);
    //console.log(JSON.stringify(xdom.dom.position))
    var active_element = (xdom.dom.findClosestElementWithId(document.activeElement) || document.activeElement);
    if (document.activeElement/* && active_element.id && xdom.dom.activeElementId != document.activeElement.id*/) {
        xdom.dom.activeElement = document.activeElement//document.activeElement.id;
        xdom.dom.activeElementId = active_element.id//document.activeElement.id;
        //if xdom.dom.activeElement.parentElement.id==document.getElementById(xdom.dom.activeElementId).id
        if (xdom.dom.activeElement) {
            xdom.dom.activeElementCaretPosition = xdom.dom.getCaretPosition(xdom.dom.activeElement);
        }
    }
}

xdom.dom.restoreState = function () {
    var activeElement
    if (xdom.dom.activeElementId && (document.getElementById(xdom.dom.activeElementId) || xdom.dom.activeElement).id != xdom.dom.activeElement.id) {
        activeElement = document.getElementById(xdom.dom.activeElementId).querySelector(xdom.dom.getRelativePath(xdom.dom.activeElement).join(" > "));
    } else {
        activeElement = document.getElementById(xdom.dom.activeElementId);
    }
    xdom.dom.setCaretPosition(activeElement, xdom.dom.activeElementCaretPosition);
}

xdom.dom.delay = function (fn, ms) {
    var caller = xdom.dom.delay.caller;
    var that = this;
    if (caller.keyInterval !== undefined) {
        window.clearTimeout(caller.keyInterval); caller.keyInterval = undefined;
    }
    caller.keyInterval = window.setTimeout(function () {
        if (fn && fn.apply) {
            fn.apply(that, arguments);
        }
        caller.keyInterval = undefined;
    }, (ms || 500));
}

xdom.dom.refresh = function (target, after, trigger_bindings) {
    var target, after, node, trigger_bindings;
    if (arguments.length == 1 && arguments[0].constructor === {}.constructor) {
        var settings = arguments[0];
        target = settings["target"];
        after = settings["after"];
        node = settings["node"];
        trigger_bindings = settings["trigger_bindings"]
    }
    trigger_bindings = xdom.data.coalesce(trigger_bindings, true)

    if (keyInterval != undefined) {
        window.clearTimeout(keyInterval); keyInterval = undefined;
    }
    keyInterval = window.setTimeout(function () {
        if (onkeyup && onkeyup.apply) {
            onkeyup.apply(input, [input]);
        }
    }, /*sDataSourceType == 'remote' ? 500 : */300);

    xdom.data.document = xdom.xml.transform(xdom.data.document, xdom.library["resources/session.xslt"]);
    var data = xdom.data.document;
    if (trigger_bindings) {
        xdom.data.binding.trigger(xdom.data.document);
    }

    if (!(xdom.data.document)) {
        if (!xdom.dom.refresh.caller || xdom.dom.refresh.caller == xdom.data.clear) {
            xdom.dom.clear(target || xdom.dom.target);
        }
        return;
    }
    var hashtag = "#" + data.selectSingleNode("/*[1]").localName.toLowerCase()
    xdom.data.documents[hashtag] = data;
    //xdom.session.setKey(hashtag, data);
    window.location = window.location.href.replace(/#.*$/g, '') + hashtag;
    if (document.getElementById("main_title")) {
        document.getElementById("main_title").innerText = (xdom.titles[window.location.hash] || "")
    }

    //if (xdom.dom.refresh.caller !== xdom.data.filterBy && xdom.dom.refresh.caller !== xdom.dom.refresh.after) {
    //    xdom.data.filterBy();
    //}

    var start_date = new Date();
    if (data.selectSingleNode("/*").namespaceURI == "http://panax.io/sitemap" || data.selectSingleNode("/*").namespaceURI == "http://panax.io/shell") {
        target = document.body;
    } else if (document.contains(xdom.dom.target)) {
        target = (target || xdom.dom.target);
    } else {
        target = document.querySelector("main") || document.body;
    }
    var after = (after !== undefined ? after : (xdom.dom.refresh.caller !== xdom.dom.refresh.after ? xdom.dom.refresh.after : null)); //after can be null but not undefined //if an after function is not defined, the caller should be different from xdom.dom.refresh.after to avoid infinte recursion

    var _arguments = arguments;
    var _this = this
    //var _refresh_dom = function () {//uses a small delay to catch the current selected element
    console.log("Refreshing async...")
    //for (var d in xdom.library) {
    //    if (!d || d.startsWith('#')) {
    //        continue;
    //    }
    //    if (!xdom.library[d]) {
    //        console.info("Document " + d + " not ready");
    //        return;
    //    }
    //}

    xdom.dom.saveState();
    data = xdom.data.removeDeletingNodes(xdom.data.document);
    var dom;
    var stylesheets = data.selectNodes("processing-instruction('xml-stylesheet')");
    for (var s = 0; s < stylesheets.length; ++s) {
        stylesheet = JSON.parse('{' + (stylesheets[s].data.match(/(\w+)=(["'])([^\2]+?)\2/ig) || []).join(", ").replace(/(\w+)=(["'])([^\2]+?)\2/ig, '"$1":$2$3$2') + '}');
        if (!xdom.library[stylesheet.href]) {
            xdom.library.load(stylesheet.href, function () { xdom.dom.refresh(target, after) });
            return;
        }
        dom = xdom.xml.transform(xdom.data.document, xdom.library[stylesheet.href]);
        if (stylesheet.href.indexOf("login") != -1) {
            target = document.body;
        }

        if (dom.documentElement.tagName.toLowerCase() == "html") {//dom.documentElement.namespaceURI == "http://www.w3.org/1999/xhtml"
            //target = document.body;
            var meta_encoding = dom.selectSingleNode('//*[local-name()="meta" and @http-equiv="Content-Type" and not(contains(@content,"utf-7"))]');
            if (meta_encoding) {
                meta_encoding.setAttribute("content", "text/html; charset=utf-7");
            }
            xdom.dom.clear(target);
            var iframe = document.createElement('iframe')
            iframe.width = "100%"
            iframe.height = "1000"
            iframe.style.backgroundColor = 'white';
            iframe = target.appendChild(iframe);
            var url = getGeneratedPageURL({
                html: (dom.documentElement || dom).outerHTML,
                css: dom.querySelector('style').innerHTML
            })
            iframe.src = url;
        } else {
            xdom.dom.clear(target);
            xdom.dom.appendChild(target, dom);
            xdom.dom.restoreState();
        }
        return;
    }

    var transforms = xdom.data.getTransformationFileName(data).split(";");
    if (transforms == "") {
        xdom.dom.clear(target);
        window.location = window.location.href.replace(/#.*$/g, '') + "#sitemap";
        return
    }
    var layout_transform = transforms.pop();
    if (!xdom.library[layout_transform]) {
        //window.clearTimeout(deferred);
        xdom.library.load(layout_transform, function () { xdom.dom.refresh(target, after) });
        return;
        console.error("Transformation file not loaded: " + layout_transform)
    }
    dom = xdom.xml.transform(data, xdom.library[layout_transform]);
    xdom.dom.clear(target);
    xdom.dom.appendChild(target, dom);
    if (xdom.debug["xdom.dom.refresh"]) {
        console.log("@refresh#Transformation Time: " + (new Date().getTime() - start_date.getTime()));
    }
    try {
        xdom.dom.restoreState();
    } catch (e) { }
    if (after && after.apply && xdom.dom.refresh.caller != xdom.dom.refresh.after) {
        after.apply(_this, _arguments);
    };
    //}
    //var deferred = setTimeout(_refresh_dom, 5);
    //this.deferred = deferred;
}

xdom.dom.refresh.after = function () {
    // to be extended by user
}

xdom.data.getSelections = function (data_source) {
    var data_source = (data_source || xdom.data.document);
    return data_source.selectNodes('//*[@*[name()="x:selected"]]')
}

xdom.data.clearSelection = function (targetId, refresh) {
    try {
        var oXML = xdom.xml.createDocument(xdom.data.document);
        var oNode = oXML.selectSingleNode('/*/*[@x:selected="true"]');
        if (!oNode) return;
        xdom.data.update(oNode.getAttribute("x:id"), '@x:selected', null, refresh);
    } catch (e) {
        throw (e.message);
    }

}

xdom.data.unselectRecord = function (targetId, clearSelection) {
    xdom.data.update(targetId, '@x:selected', null, true);
}

xdom.data.selectRecord = function (targetId, on_complete) {
    if (!xdom.listeners.keys.ctrlKey) {
        xdom.data.removeSelections(xdom.data.document.selectNodes('//*[@x:id="' + targetId + '"]/../*[@*[name()="x:selected"]]'));
        //xdom.data.removeSelections(xdom.data.document.selectNodes('//*[@x:id="' + targetId + '"]/../*[@x:selected]')); //This part is buggy in IE and some times in Chrome, Edge, and probably other browsers. The workaround is adding little more verbosity in the predicate.
    }
    xdom.data.update(targetId, '@x:selected', 'true', true);
    if (on_complete && on_complete.apply) {
        on_complete.apply(this, arguments);
    };
}

xdom.data.previousRecord = function () {
    var oXML = xdom.xml.createDocument(xdom.data.document);
    var oNode = oXML.selectSingleNode('/*/*[@x:selected="true"]');
    var oNodeNext = (oNode || {});

    do {
        var oNodeNext = oNodeNext.previousSibling;
    } while (oNodeNext && oNodeNext.nodeName == "#text")

    if (oNodeNext) {
        xdom.data.update(oNode.getAttribute("x:id"), '@x:selected', null, false);
        xdom.data.update(oNodeNext.getAttribute("x:id"), '@x:selected', 'true', true);
    }
}

xdom.data.nextRecord = function () {
    var oXML = xdom.xml.createDocument(xdom.data.document);
    var oNode = oXML.selectSingleNode('/*/*[@x:selected="true"]');
    var oNodeNext = (oNode || {});
    do {
        var oNodeNext = oNodeNext.nextSibling;
    } while (oNodeNext && oNodeNext.nodeName == "#text")

    if (oNodeNext) {
        xdom.data.update(oNode.getAttribute("x:id"), '@x:selected', null, false);
        xdom.data.update(oNodeNext.getAttribute("x:id"), '@x:selected', 'true', true);
    }
}

xdom.dom.appendChild = function (target, sHTML) {
    if (!sHTML) return;
    try {
        target.appendChild(sHTML);
    } catch (e) {
        try {
            target.appendChild(xdom.xml.createDocument(sHTML).documentElement);
        } catch (e) {
            var div = document.createElement('div');
            div.innerHTML = xdom.xml.toString(sHTML);
            target.appendChild(div.children[0]);
        }
    }
}

xdom.dom.clear = function (target) {
    if (!(target && target.innerHTML)) return;
    target.innerHTML = '';
}

xdom.xml.createDocument = function (xml, notify_error) {
    if (xml === null) return null;
    var new_namespaces = ""
    //if (xml.ownerDocument /*|| xml.documentElement*/) {
    //if (xml.ownerDocument && xml.ownerDocument.documentElement === xml) {
    //new_namespaces = xdom.json.toArray(xdom.json.difference(xdom.xml.getNamespaces(xml.ownerDocument.documentElement), xdom.xml.getNamespaces(xml.cloneNode(false)))).join(" ");
    //} else if (xml.documentElement && xml.documentElement.ownerDocument === xml) {
    //    new_namespaces = xdom.json.toArray(xdom.json.difference(xdom.xml.getNamespaces(xml.documentElement.ownerDocument.documentElement), xdom.xml.getNamespaces(xml.cloneNode(false)))).join(" ");
    //}
    //}
    var sXML = xdom.xml.toString(xml);
    //    sXML = xdom.xml.toString(sXML).replace("xmlns:", new_namespaces + " xmlns:")
    if (window.ActiveXObject || "ActiveXObject" in window) {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        //xmlDoc = xdom.xml.createFromActiveX();
        xmlDoc.async = "false";
        xmlDoc.setProperty("SelectionLanguage", "XPath");
        var namespaces = xdom.xml.createNamespaceDeclaration(xdom.library["resources/prepare_data.xslt"], sXML);
        xmlDoc.setProperty("SelectionNamespaces", namespaces);
        if (sXML) { xmlDoc.loadXML(sXML); }
        if (xmlDoc.parseError.errorCode != 0) {
            var exception = xmlDoc.parseError;
            if (xdom.xml.createDocument.caller != xdom.xml.createDocument) {
                //new_namespaces = xdom.json.toArray(xdom.json.difference(xdom.xml.getNamespaces(xdom.library["resources/prepare_data.xslt"]), xdom.xml.getNamespaces(typeof (xml.cloneNode) != 'undefined' ? (xml.documentElement || xml).cloneNode(false) : sXML))).join(" ");
                new_namespaces = xdom.json.join(xdom.json.difference(xdom.xml.getNamespaces(xdom.library["resources/prepare_data.xslt"]), xdom.xml.getNamespaces(typeof (xml.cloneNode) != 'undefined' ? (xml.documentElement || xml).cloneNode(false) : sXML)));
                sXML = sXML.replace("xmlns:", new_namespaces + " xmlns:")
                return xdom.xml.createDocument(sXML);
            } else {
                if (notify_error !== false) {
                    throw ("Exception creating xml document: " + exception.reason);
                }
                return null;
            }
        }
    } else {
        xmlDoc = new DOMParser();
        if (!sXML) {
            xmlDoc = document.implementation.createDocument("", "", null);
        } else {
            xmlDoc = xmlDoc.parseFromString(sXML, "text/xml");
            if (sXML && xmlDoc.getElementsByTagName && (xmlDoc.getElementsByTagName('parsererror').length || 0) > 0) {
                if (xdom.xml.createDocument.caller != xdom.xml.createDocument && String(xmlDoc.getElementsByTagName('parsererror')[0].innerHTML).match(/prefix|prefijo/)) {
                    new_namespaces = xdom.json.join(xdom.json.difference(xdom.xml.getNamespaces(xdom.library["resources/prepare_data.xslt"]), xdom.xml.getNamespaces(typeof (xml.cloneNode) != 'undefined' ? (xml.documentElement || xml).cloneNode(false) : sXML)), { "separator": " " })
                    sXML = sXML.replace("xmlns:", new_namespaces + " xmlns:")
                    return xdom.xml.createDocument(sXML);
                }
                if (notify_error !== false) {
                    throw (xmlDoc.getElementsByTagName('parsererror')[0].outerText || xmlDoc.getElementsByTagName('parsererror')[0].innerHTML);
                }
                return null;
            }
        }
    }
    return xmlDoc;
}


xdom.xml.createFromActiveX = function () {
    if (typeof arguments.callee.activeXString != "string") {
        var versions = ["MSXML2.DOMDocument"];

        for (var i = 0, len = versions.length; i < len; i++) {
            try {
                var xmldom = new ActiveXObject(versions[i]);
                arguments.callee.activeXString = versions[i];
                return xmldom;
            } catch (ex) {
                //skip
            }
        }
    }
    return new ActiveXObject(arguments.callee.activeXString);
}

//xdom.xml.getNamespaces = function () {
//    var namespaces = {};
//    for (var a = 0; a < arguments.length; ++a) {
//        var sXML = xdom.xml.toString(arguments[a]);
//        if (sXML) {
//            namespaces = xdom.json.merge(namespaces, JSON.parse('{' + (sXML.match(/(xmlns:\w+)=(["'])([^\2]+?)\2/ig) || []).join(", ").replace(/(xmlns:\w+)=(["'])([^\2]+?)\2/ig, '"$1":"$1=\\$2$3\\\$2"') + '}'))
//        }
//    }
//    return namespaces;
//}


//xdom.xml.createNSResolver = function () {
//    var namespaces = xdom.xml.getNamespaces.apply(this, arguments);
//    return function (prefix) {
//        return (namespaces["xmlns:" + prefix] || "").replace(/^[^"]*"|"$/ig, '') || null;
//    };
//}

//xdom.xml.createNamespaceDeclaration = function () {
//    var namespace_declaration = [];
//    var namespaces = xdom.xml.getNamespaces.apply(this, arguments);
//    for (var key in namespaces) {
//        namespace_declaration.push(namespaces[key]);
//    }
//    return namespace_declaration.join(" ");
//}

xdom.xml.getNamespaces = function () {
    var namespaces = {};
    for (var a = 0; a < arguments.length; ++a) {
        if (!arguments[a]) {
            continue;
        }
        var sXML = xdom.xml.toString((arguments[a].document || arguments[a]));
        if (sXML) {
            namespaces = xdom.json.merge(namespaces, JSON.parse('{' + (sXML.match(/(xmlns:\w+)=(["'])([^\2]+?)\2/ig) || []).join(", ").replace(/(xmlns:\w+)=(["'])([^\2]+?)\2/ig, '"$1":$2$3$2') + '}'))
        }
    }
    return namespaces;
}

xdom.xml.lookupNamespaceURI = function (node, namespace_uri) {
    if (!(node && typeof (node.selectSingleNode) != "undefined")) {
        return;
    }
    return node.selectSingleNode("namespace::*[.='" + namespace_uri + "']");
}
xdom.xml.createNSResolver = function () {
    var namespaces = xdom.xml.getNamespaces.apply(this, arguments);
    return function (prefix) {
        return (namespaces["xmlns:" + prefix] || "") || null;
    };
}

xdom.xml.createNamespaceDeclaration = function () {
    var namespace_declaration = [];
    var namespaces = xdom.xml.getNamespaces.apply(this, arguments);
    return xdom.json.join(namespaces, { "separator": " " });
}

xdom.xhr.loadXMLFile = function (sXmlFile, settings) {
    var settings = (settings || {});
    var xhttp = new xdom.xhr.Request(sXmlFile);
    xhttp.method = (settings.method || 'GET');
    xhttp.async = (settings.async == undefined ? true : settings.async);
    xhttp.onSuccess = function () {
        if (settings.onSuccess) {
            settings.onSuccess.apply(this, [this.Response, this]);
        }
    }
    xhttp.onException = function () {
        console.error('Error al descargar contenido XML ' + this.requestFile + ':\n\n ' + this.document + '\n\n')
    };
    xhttp.load();
    return xhttp;
}

xdom.xml.fromString = function (xmlString) {
    if (window.DOMParser) {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(xmlString, "text/xml");
    }
    else // Internet Explorer
    {
        xmlDoc = xdom.xml.createDocument();
        xmlDoc.loadXML(xmlString);
        xmlDoc.setProperty("SelectionLanguage", "XPath");
    }
    return xmlDoc
}

xdom.xml.toString = function (xml) {
    if (!xml) return '';
    if (typeof xml == "string" || typeof xml == "boolean" || typeof xml == "number") {
        return xml
    } else {
        return (xml.xml !== undefined ? xml.xml : new XMLSerializer().serializeToString(xml)); //(xml.documentElement || xml)
    }
}

xdom.LoadXMLString = function (xmlString) {
    return xdom.xml.fromString(xmlString);
}

xdom.xml.transform = function (xml, xsl, target) {
    var xmlDoc;
    var result = undefined;
    if (xml && !xsl && xdom.xml.transform.caller != xdom.xml.transform) {
        var stylesheets = xml.selectNodes("processing-instruction('xml-stylesheet')");
        for (var s = 0; s < stylesheets.length; ++s) {
            stylesheet = JSON.parse('{' + (stylesheets[s].data.match(/(\w+)=(["'])([^\2]+?)\2/ig) || []).join(", ").replace(/(\w+)=(["'])([^\2]+?)\2/ig, '"$1":$2$3$2') + '}');
            if (xdom.library[stylesheet.href]) {
                xml = xdom.xml.transform(xml, xdom.library[stylesheet.href]);
            }
        }
    }
    if (typeof (xsl) == "string") {
        if (!xdom.library[xsl]) {
            xdom.library.load(xsl, function () { }, { async: false });
        }
        xsl = xdom.library[xsl];
    }
    if (!(xml && xsl)) {
        return xml;//false;
    }
    if (xml instanceof xdom.xml.Document) {
        xml = xml.document;
    }
    if (xsl instanceof xdom.xml.Document) {
        xsl = xsl.document;
    }
    if (!xsl.selectSingleNode('*')) {
        throw ("XSL document is empty");
        return xml;//null;
    }
    if (typeof (xml) == "string") {
        xml = xdom.xml.createDocument(xml);
    }
    if (window.ActiveXObject || "ActiveXObject" in window) {
        var xslt = new ActiveXObject("Msxml2.XSLTemplate.3.0");
        var xslDoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument.3.0");
        var xslProc;
        xslDoc.async = false;
        xslDoc.loadXML(xdom.xml.toString(xsl));
        xslDoc.setProperty("SelectionLanguage", "XPath");
        var namespaces = xdom.xml.createNamespaceDeclaration(xml, xsl);
        xslDoc.setProperty("SelectionNamespaces", namespaces);
        if (xslDoc.parseError.errorCode != 0) {
            var myErr = xslDoc.parseError;
            throw ("xsl: You have an error in transform: " + myErr.reason);
            return null;
        } else {
            if (target) {
                xmlDoc = target
            } else {
                xmlDoc = new ActiveXObject("Msxml2.DOMDocument.3.0");
                xmlDoc.async = false;
                xmlDoc.setProperty("SelectionLanguage", "XPath");
                xmlDoc.setProperty("SelectionNamespaces", namespaces);
            }
            if (typeof (xml.transformNodeToObject) != "undefined") {
                //xml.loadXML(xml.xml)
                //xmlDoc = xml//xdom.xml.createDocument(xml);//xml.selectSingleNode(".");
            } else {
                xmlDoc.loadXML(xdom.xml.toString(xml));
                if (xmlDoc.parseError.errorCode != 0) {
                    var myErr = xmlDoc.parseError;
                    throw ("doc: You have an error in transform: " + myErr.reason);
                    return null;
                } /*else {
                xslProc = xslt.createProcessor();
                xslProc.input = xmlDoc;
                xslProc.addParameter("param1", "Hello");
                xslProc.transform();
                console.log(xslProc.output);
            }*/
            }
        }
        //result = xdom.xml.createDocument(xmlDoc.transformNode(xslDoc))
        try {
            xml.transformNodeToObject(xslDoc, xmlDoc);
        } catch (e) {
            xdom.xhr.upload(xdom.xml.toString(xml));
            xdom.xhr.upload(xdom.xml.toString(xslDoc));
            console.error("xdom.xml.transform: " + xmlDoc.parseError.reason);
            return xml;
        }
        result = xmlDoc;
    }
    else if (document.implementation && document.implementation.createDocument) {
        var xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        //target = (target || xml.ownerDocument)
        //if (target) {
        //    result = xsltProcessor.transformToFragment(xml, xml.ownerDocument).firstElementChild;
        //} else {
        result = xsltProcessor.transformToDocument(xml);
        //}
        if (!result) {
            console.error(xdom.messages.transform_exception || "There must be a problem with the transformation file.");
            result = xml;
        }
        else if (typeof (result.selectSingleNode) == "undefined" && result.documentElement) {
            result = xdom.xml.createDocument(result.documentElement);
        }
        else if (result.getElementsByTagName && (result.getElementsByTagName('parsererror').length || 0) > 0) {
            if (String(result.getElementsByTagName('parsererror')[0].innerHTML).match(/prefix|prefijo/)) {
                var prefix = (result.getElementsByTagName('parsererror')[0].innerHTML).match(/(?:prefix|prefijo)\s+([^\s]+\b)/).pop()
                if (!xdom.namespaces["xmlns:" + prefix]) {
                    return null;
                }
                xml.setAttribute("xmlns:" + prefix, xdom.namespaces["xmlns:" + prefix]);
                result = xdom.xml.transform(xml, xsl, target);
                return result;
            }
        }
        ////result = result.getFirstElementNode ? result.getFirstElementNode : result;
    }
    return result
}

xdom.data.getFirstRecord = function (xml) {
    var oXML = xdom.xml.createDocument(xdom.data.document);
    try {
        return oXML.selectSingleNode('/*/*[1]');
    } catch (e) {
        for (var nodeItem = oXML.childNodes.length; nodeItem > 0; --nodeItem) {
            var nodeElement = oXML.childNodes[nodeItem - 1];
            if (nodeElement.nodeType == 1) {
                return nodeElement.firstElementChild; //Equivalente a /*/*[1]
            }
        }
    }
}

function hashHandler() { //Source https://stackoverflow.com/questions/6390341/how-to-detect-url-change-in-javascript
    this.oldHash = window.location.hash;
    this.Check;

    var that = this;
    var detect = function () {
        if (window.location.hash != "" && window.location.hash != "#" && that.oldHash != window.location.hash) {
            if (xdom.data.document) {
                eval((xdom.data.document || document.createElement('p')).documentElement.getAttribute('x:onunload') || function () { })();
            }
            xdom.data.document = (xdom.data.documents[window.location.hash] || xdom.data.document);
            that.oldHash = window.location.hash;
            xdom.dom.refresh((document.querySelector("main") || document.body));
            //window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
    };
    this.Check = setInterval(function () {
        if (xdom.debug.debugging) { clearInterval(that.Check) }
        detect()
    }, 100);
}

var hashDetection = new hashHandler();

xdom.xhr.Exception = function (xhr) {
    this.message = 'Exception';
}

xdom.xml.Document = function (xml, on_complete) {
    if (!(this instanceof xdom.xml.Document)) return new xdom.xml.Document(xml, on_complete);
    var _this = this;
    var _this_arguments = arguments;
    this.status = "loading"
    this.document = xdom.xml.createDocument(xml);
    this.dependencies = {}
    this.onLoad = function () {
        console.log("Do nothing");
    }
    this.onComplete = function () {
        for (var d in this.dependencies) {
            if (!xdom.library[d]) {
                alert("A dependency couldn't be loaded");
                return;
            }
        }
        this.status = "ready"
        if (on_complete && on_complete.apply) {
            on_complete.apply(_this, _this_arguments);
        };
    }
    this.loadDependencies = function () {
        this.dependencies = xdom.data.getTransformations(this.document);
        if (this.dependencies && Object.keys(this.dependencies).length) {
            this.status = "loading dependencies"
            xdom.library.load.call(this, this.dependencies, this.onComplete);
        } else {
            this.onComplete();
        }
    }
    this.loadDependencies()
    return this;
}

xdom.xhr.Response = function (xhr) {
    if (!(this instanceof xdom.xhr.Response)) return new xdom.xhr.Response(xhr);
    this.responseText = xhr.responseText;
    this.responseXML = xhr.responseXML;
    var value;
    Object.defineProperty(this, 'headers', {
        get: function get() {
            var _all_headers = xhr.getAllResponseHeaders().split(/[\r\n]+/);
            _headers = {}
            for (var h in _all_headers) {
                var header = _all_headers[h].split(/\s*:\s*/);
                if (!(header.length > 1)) {
                    continue;
                }
                _headers[header.shift().toLowerCase()] = header.join(":");
            }
            return _headers;
        }
    });
    Object.defineProperty(this, 'status', {
        get: function get() {
            return xhr.status;
        }
    });
    Object.defineProperty(this, 'document', {
        get: function get() {
            switch (this.type) {
                case "xml":
                case "html":
                    return xdom.xml.createDocument(this.responseXML || this.responseText);
                    break;
                default:
                    return this.responseText;
            }
        }
    });
    Object.defineProperty(this, 'value', {
        get: function get() {
            switch (this.type) {
                case "json":
                    var json
                    try {
                        json = JSON.parse(this.responseText);
                    } catch (e) {
                        json = eval("(" + this.responseText + ")");
                    }
                    return json
                    break;
                case "xml":
                case "html":
                    return this.document;
                    break;
                case "script":
                    try {
                        var return_value;
                        eval('return_value = new function(){' + this.responseText + '\nreturn this;}()');
                        return return_value;
                    } catch (e) {
                        return null;
                    }
                default:
            }
        }
    });
    Object.defineProperty(this, 'type', {
        get: function get() {
            if ((this.headers["content-type"] || "").indexOf("json") != -1 || xdom.tools.isJSON(this.responseText)) {
                return "json";
            } else if ((this.headers["content-type"] || "").indexOf("xml") != -1 || this.responseXML && this.responseXML.documentElement || this.responseText.indexOf("<?xml ") >= 0) {
                return "xml"
            } else {
                if (this.responseText.toUpperCase().indexOf("<HTML") != -1) {
                    return "html";
                } else {
                    return "script";
                }
            }
        }
    });
    Object.defineProperty(this, 'contentType', {
        get: function get() {
            return this.headers["content-type"].split(";")[0];
        }
    });
    Object.defineProperty(this, 'charset', {
        get: function get() {
            return this.headers["content-type"].split(";")[1];
        }
    });
    switch (this.type) {
        case "json":
            Object.defineProperty(this, 'json', {
                get: function get() {
                    var json
                    try {
                        json = JSON.parse(this.responseText);
                    } catch (e) {
                        json = eval("(" + this.responseText + ")");
                    }
                    return json;
                }
            });
            break;
        case "script":
            Object.defineProperty(this, 'object', {
                get: function get() {
                    try {
                        var return_value;
                        eval('return_value = new function(){' + this.responseText + '\nreturn this;}()');
                        return return_value;
                    } catch (e) {
                        return null;
                    }
                }
            });
        default:
    }
    return this;
}

xdom.xhr.checkStatus = function () {
    var attributes = xdom.data.document.selectNodes('//@*[namespace-uri()!="http://panax.io/xdom/xhr"]');
    if (Object.keys(xdom.xhr.Requests).length == 0) {
        xdom.data.remove(attributes);
        xdom.dom.refresh();
    }
}

xdom.xhr.Request = function (request, settings) {
    if (!(this instanceof xdom.xhr.Request)) return new xdom.xhr.Request(request, settings);
    var element = this
    var settings = (settings || {});
    this.settings = settings;
    this.xhr = null;

    var _onSuccess = function () {
        //if (this.subscribers_ARRAY.length) {
        //    for (var s = this.subscribers_ARRAY.length - 1; s >= 0; s--) {
        //        var src = this.subscribers_ARRAY.pop()
        //        this.requester = src["subscriber"]
        //        this.onSuccess.apply(this, [this.Response, this]);
        //        if (src.onSuccess && src.onSuccess.apply) {
        //            src.onSuccess.apply(src["subscriber"], [this.Response, this]);
        //        }
        //        //if (src && src.nodeType == 2 && src.namespaceURI == "http://panax.io/xdom/binding/request") {
        //        //    xdom.data.remove(src);
        //        //}
        //    }
        //} else {

        //}
        if (Object.keys((this.subscribers || {})).length) {
            for (var s in this.subscribers) {
                var src = this.subscribers[s];
                this.requester = src["subscriber"]
                this.onSuccess.apply(this, [this.Response, this]);
                if (src && src.settings && src.settings.onSuccess && src.settings.onSuccess.apply) {
                    src.settings.onSuccess.apply(src["subscriber"], [this.Response, this]);
                }
            }
        } else {
            this.onSuccess.apply(this, [this.Response, this]);
        }
    };

    var _onComplete = function () {
        delete this.srcElement.xhr;
        /*onComplete will do a final chante to perform any action with the subscriber even if it doesn't exist anymore in the current document. In such case it will be unsubscribed automatically*/
        if (Object.keys((this.subscribers || {})).length) {
            for (var s in this.subscribers) {
                var src = this.subscribers[s];
                this.requester = src["subscriber"];
                this.onComplete.apply(this, [this.Response, this]);
                if (src && src.settings && src.settings.onComplete && src.settings.onComplete.apply) {
                    src.settings.onComplete.apply(src["subscriber"], [this.Response, this]);
                }
                //if (src["subscriber"] && !(xdom.data.find(this.requester))) {
                //    this.unsubscribe(src);
                //}
            }
        } else {
            this.onComplete.apply(this, [this.Response, this.xhr]);
        }
    };

    var _onAbort = function () {
        if (Object.keys((this.subscribers || {})).length) {
            for (var s in this.subscribers) {
                var src = this.subscribers[s];
                this.requester = src["subscriber"]
                this.onAbort.apply(this, [this.Response, this]);
                if (src.onAbort && src.onAbort.apply) {
                    src.onAbort.apply(src["subscriber"], [this.Response, this]);
                }
            }
        } else {
            this.onAbort.apply(this, [this.Response, this.xhr]);
        }
    };

    var _Subscriber = function (subscriber, id, settings) {
        Object.defineProperty(this, 'subscriber', {
            value: subscriber,
            writable: true, enumerable: false, configurable: false
        });
        Object.defineProperty(this, 'id', {
            value: id,
            writable: true, enumerable: false, configurable: false
        });
        Object.defineProperty(this, 'settings', {
            value: settings,
            writable: true, enumerable: false, configurable: false
        });
    }

    this.srcElement = (settings["srcElement"] || (event || {}).srcElement || {});
    this.src = settings["src"];
    this.subscribers = (settings["subscribers"] || {});
    this.target = (settings["target"] || {})
    this.request = request;
    this.headers = (settings["headers"] || {})
    this.method = (settings["method"] || "GET");
    this.contentType = settings["contentType"];
    this.argumentSeparator = (settings["argumentSeparator"] || "&");
    this.url = (settings["url"] || "");
    this.encodeURIString = (settings["encodeURIString"] !== undefined ? settings["encodeURIString"] : true);
    this.parameters = (settings["parameters"] || new Object());
    this.async = (settings["async"] !== undefined ? settings["async"] : true);
    this.request_id = xdom.data.coalesce(settings["request_id"]);
    if (this.advise) element.advise.removeNode(true);
    this.advise = null;

    this.resetData = function () {
        this.url = (this.settings["url"] || "");
        this.status = 'initialized';
        this.responseStatus = new Array(2);
        this.document = undefined;
        this.Response = {};
        this.Request = this;
    };

    this.getResultType = function () { return (element.xmlDocument ? 'xml' : (element.htmlDocument ? 'html' : (element.script ? 'script' : undefined))) }

    var _onSubscribe = function (subscription) {
        if (subscription && subscription.onSubscribe && subscription.onSubscribe.apply) {
            subscription.onSubscribe.apply(subscription["subscriber"], [this.Response, this]);
        }
    };

    this.subscribe = function (subscriber, settings) {
        if (!subscriber) return false;
        var s
        if (subscriber.constructor === {}.constructor) { //is an object
            s = new _Subscriber(subscriber, subscriber.id, settings);
        } else if (typeof (subscriber.selectSingleNode) != 'undefined') { //is a node or an attribute
            if (subscriber.nodeType == 2) {
                s = new _Subscriber(subscriber, (subscriber.ownerElement || document.createElement('p')).getAttribute("x:id") + '/@' + subscriber.name, settings)
            } else {
                s = new _Subscriber(subscriber, (subscriber || document.createElement('p')).getAttribute("x:id"), settings);
            }
        }
        this.subscribers[s.id] = s;
        _onSubscribe(this.subscribers[s.id]);
        return this.subscribers[s.id];
    }

    var _onUnsubscribe = function (subscription) {
        if (subscription && subscription.onUnsubscribe && subscription.onUnsubscribe.apply) {
            subscription.onUnsubscribe.apply(subscription["subscriber"], [this.Response, this]);
        }
    };

    this.unsubscribe = function (subscription) {
        if (!subscription) return false;
        var id;
        if (subscription instanceof _Subscriber) {
            id = subscription["id"];
        } else {
            if (subscription.constructor === {}.constructor) { //is an object
                id = subscription["id"];
            } else if (typeof (subscription.selectSingleNode) != 'undefined') { //is a node or an attribute
                id = (subscription.ownerElement || document.createElement('p')).getAttribute("x:id") + '/@' + subscription.name;
            }
        }
        _onUnsubscribe(this.subscribers[id]);
        delete this.subscribers[id];
    }

    this.abort = function () {
        if (this.xhr) {
            this.xhr.abort();
        }
    }

    this.onLoading = function () { };
    this.onLoaded = function () { };
    this.onInteractive = function () { };
    this.onComplete = (settings.onComplete || function () { });
    this.onAbort = (settings.onAbort || function () { });
    this.onSuccess = (settings.onSuccess || function () { });
    this.onException = (settings.onException || function () {
        console.error((this.Response.json || {}).message || this.responseStatus[1]);
    });
    this.onFail = function () {
        console.warn('Server responded: ' + this.request);
    };

    this.createXHR = function () {
        try {
            this.xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e1) {
            try {
                this.xhr = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e2) {
                this.xhr = null;
            }
        }

        if (!this.xhr) {
            if (typeof XMLHttpRequest != "undefined") {
                this.xhr = new XMLHttpRequest();
            } else {
                this.failed = true;
            }
        }
        var element = this;

        this.xhr.onabort = function () {
            this.status = 'aborted';
            _onAbort.apply(element, [element.Response, element]);
            _onComplete.apply(element, [element.Response, element]);
        }

        this.xhr.onreadystatechange = function () {
            switch (element.xhr.readyState) {
                case 1:
                    element.status = 'loading';
                    element.onLoading();
                    break;
                case 2:
                    element.status = 'loaded';
                    element.onLoaded();
                    break;
                case 3:
                    element.status = 'interactive';
                    element.onInteractive();
                    break;
                case 4:
                    element.status = 'complete';
                    element.document = this.payload;

                    var success = (element.xhr.status < 300);

                    element.Response = new xdom.xhr.Response(element.xhr);

                    //if (element.response.type == "xml") {
                    //    var stylesheets = element.response.document.selectNodes("processing-instruction('xml-stylesheet')");
                    //    for (var s = 0; s < stylesheets.length; ++s) {
                    //        stylesheet = JSON.parse('{' + (stylesheets[s].data.match(/(\w+)=(["'])([^\2]+?)\2/ig) || []).join(", ").replace(/(\w+)=(["'])([^\2]+?)\2/ig, '"$1":$2$3$2') + '}');
                    //        if (!xdom.library[stylesheet.href] && !xdom.xhr.Requests[stylesheet.href]) {
                    //            var oData = new xdom.xhr.Request(stylesheet.href);
                    //            oData.onComplete = element.onComplete;
                    //            oData.onSuccess = element.onSuccess;
                    //            oData.onException = element.onException;
                    //            oData.load();
                    //            return;
                    //        }
                    //    }
                    //}

                    if (success) {
                        _onSuccess.apply(element, [element.Response, element]);
                    } else {
                        switch (element.xhr.status) {
                            case 404:
                                element.onFail.apply(element, [element.Response, element]);
                                break;
                            case 500:
                            case 401:
                                element.onException.apply(element, [element.Response, element]);
                                break;
                            default:
                                element.onException.apply(element, [element.Response, element]);
                                break;
                        }
                        element.createXHR(); //recreate xhr request
                    }

                    //element.url = "";
                    _onComplete.apply(element, [element.Response, element]);
                    break;
            }
        };
    };

    this.setParameter = function (name, value) {
        this.parameters[name] = value;//Array(value, false);
    };

    this.encParameter = function (name, value, returnparameters) {
        if (true == returnparameters) {
            return Array(Encoder.urlEncode(name), Encoder.urlEncode(value));
        } else {
            this.parameters[Encoder.urlEncode(name)] = Array(Encoder.urlEncode(value), true);
        }
    }

    this.processURLString = function (string, encode) {
        encoded = Encoder.urlEncode(this.argumentSeparator);
        regexp = new RegExp(this.argumentSeparator + "|" + encoded);
        parameterArray = string.split(regexp);
        for (var i = 0; i < parameterArray.length; i++) {
            urlParameters = parameterArray[i].split("=");
            if (true == encode) {
                this.encParameter(urlParameters[0], urlParameters[1]);
            } else {
                this.setParameter(urlParameters[0], urlParameters[1]);
            }
        }
    }

    this.createURLString = function (urlstring) {
        if (this.encodeURIString && this.url.length) {
            this.processURLString(this.url, true);
        }

        var originalURL = this.request
        var urlName = this.request.match(/(.*?)(?=\?)/);
        if (urlName == null) {
            urlName = this.request
        }
        else {
            this.request = urlName[0]
        }

        if (urlstring) {
            if (this.url.length) {
                this.url += this.argumentSeparator + urlstring;
            } else {
                this.url = urlstring;
            }
        }

        var m = (originalURL + "&").match(/(?:[&\?])(@?\w+)=(.*?)(?=&)/g);
        if (m == null) {
            //alert("No match");
        } else {
            var s = "Match at position " + m.index + ":\n";
            for (var i = 0; i < m.length; i++) {
                var parameterName = (m[i] + "&").replace(/(?:[&\?])(@?\w+)=(.*?)[\&\?]/g, '$1');
                var parameterValue = (m[i] + "&").replace(/(?:[&\?])(@?\w+)=(.*?)[\&\?]/g, '$2');
                // alert(m[i]+'\n'+parameterName+'\n'+parameterValue)
                this.setParameter(parameterName, parameterValue);
            }
        }

        // prevents caching of URLString
        this.setParameter("rndval", new Date().getTime());

        urlstringtemp = new Array();
        for (key in this.parameters) {
            if (this.parameters[key].constructor === [].constructor) {
                //if (false == this.parameters[key][1] && true == this.encodeURIString) {
                //    encoded = this.encParameter(key, this.parameters[key][0], true);
                //    delete this.parameters[key];
                //    this.parameters[encoded[0]] = Array(encoded[1], true);
                //    key = encoded[0];
                //}
                urlstringtemp[urlstringtemp.length] = Encoder.urlEncode(key) + "=" + Encoder.urlEncode(this.parameters[key][0]);
            }
            else {
                urlstringtemp[urlstringtemp.length] = Encoder.urlEncode(key) + "=" + Encoder.urlEncode(this.parameters[key]);
            }
        }

        if (urlstring) {
            this.url += this.argumentSeparator + urlstringtemp.join(this.argumentSeparator);
        } else {
            this.url += urlstringtemp.join(this.argumentSeparator);
        }
    }

    this.send = function (payload) {
        this.payload = payload;
        this.load(payload);
    }

    this.post = function (payload) {
        this.method = "POST";
        this.send(payload);
    }

    this.get = function (settings) {
        this.settings = xdom.json.merge(this.settings, settings);
        this.method = "GET";
        if (this.xhr && this.xhr.onreadystatechange && this.xhr.status > 0) {
            this.xhr.onreadystatechange();
        } else {
            this.send();
        }
    }

    this.load = function (payload) {
        this.payload = xdom.xml.toString(payload || this.payload).replace(/[^<]*<\?[^>]+\?>[^<]*/ig, '');
        this.resetData();
        this.createXHR();
        if (this.failed) {
            this.onFail();
        } else {
            //if (this.target.constructor != {}.constructor && (this.target.xml || this.target.ownerDocument)) {
            //    var target = xdom.data.document.selectSingleNode('//*[@x:id="' + (this.target.documentElement || this.target).getAttribute("x:id") + '"]');
            //    if (this.src && typeof (this.src.selectSingleNode) != 'undefined') {
            //        var request_src = (xdom.data.find(this.src) || xdom.data.EmptyXML())
            //        if (request_src && !request_src.selectSingleNode('../@requesting:' + this.src.localName)) {
            //            (request_src.ownerElement || request_src.selectSingleNode('..')).setAttribute('requesting:' + this.src.localName, 'true');
            //        }
            //    }
            //    //if (target) {
            //    //    target.removeAttribute("xhr:exception");
            //    //    target.setAttribute("xhr:loading", true)
            //    //}
            //    xdom.dom.refresh();
            //}
            this.createURLString();
            /*if (this.id) {
                this.context = document.getElementById(this.id);
            }*/
            if (this.xhr) {
                var element = this;
                var url_post

                if (!this.payload) {
                    this.contentType = (this.headers["Content-Type"] || this.contentType || "application/x-www-form-urlencoded")
                } else if (xdom.tools.isJSON(this.payload)) {
                    this.contentType = (this.headers["Content-Type"] || this.contentType || "application/json")
                } else {
                    this.contentType = (this.headers["Content-Type"] || this.contentType || "text/xml")
                }

                if (this.payload) {
                    url_post = this.payload;
                    this.xhr.open("POST", this.request, this.async);
                    this.xhr.setRequestHeader("Content-Type", this.contentType)
                } else if (this.method.toUpperCase() == "POST") {
                    url_post = this.url;
                    //url_post=encodeURI(url_post)
                    this.xhr.open("POST", this.request, this.async);
                    this.xhr.setRequestHeader('Content-Type', this.contentType);
                } else {
                    url_post = null;
                    var totalurlstring = this.request + '?' + this.url;
                    this.xhr.open(this.method, totalurlstring, this.async);
                    this.xhr.setRequestHeader("Content-Type", this.contentType)
                    /*try {
                        
                    } catch (e) { }*/
                }
                if (xdom.debug.debugging) {
                    this.xhr.setRequestHeader("X-Debugging", xdom.debug.debugging);
                }
                var _request_headers = this.headers;
                for (var h in _request_headers) {
                    if (h == "Content-Type") continue;
                    this.xhr.setRequestHeader(h, _request_headers[h])
                }

                if (this.payload || this.method == "POST")
                    this.xhr.send(url_post);
                else
                    this.xhr.send(this.url);

                //this.xhr.upload.onprogress = p => {
                //    console.log(Math.round((p.loaded / p.total) * 100) + '%');
                //}
            }
        }
    };

    this.eval = function (Context) {
        var return_value;
        if (this.script) {
            try {
                eval('return_value = new function(){' + this.script + '\nreturn this;}()');
            } catch (e) {
                return null;
            }
            this.Response["json"] = return_value;
            return return_value;
        }
    }
}

xdom.tools.isNullOrEmpty = function (string_or_object) {
    var sValue = xdom.string.trim(xdom.data.getValue(string_or_object))
    return (sValue == '' || sValue == null || sValue == undefined);
}


xdom.json.merge = function () {
    var response = (arguments[0] || {})
    for (var a = 1; a < arguments.length; a++) {
        var object = arguments[a]
        if (object && object.constructor == {}.constructor) {
            for (var key in object) {
                if (object[key] && object[key].constructor == {}.constructor) {
                    response[key] = xdom.json.merge(response[key], object[key]);
                } else {
                    response[key] = object[key];
                }
            }
        }
    }
    return response;
}

xdom.json.difference = function () {
    var response = (arguments[0] || {})
    for (var a = 1; a < arguments.length; a++) {
        var object = arguments[a]
        if (object && object.constructor == {}.constructor) {
            for (var key in object) {
                if (response.hasOwnProperty(key)) {
                    delete response[key];
                }
            }
        }
    }
    return response;
}

xdom.json.toArray = function (json) {
    var array = []
    for (var key in json) {
        array.push(json[key]);
    }
    return array;
}

xdom.json.join = function (json, settings) {
    if (!(json && json.constructor == {}.constructor)) {
        return json;
    }
    var result = []
    var settings = (settings || {});
    var equal_sign = (settings["equal_sign"] || '=');
    var separator = (settings["separator"] || ' ');
    var for_each = (settings["for_each"] || function (element, index, array) {
        var quote = (settings["quote"] !== undefined ? settings["quote"] : '"');
        var regex = new RegExp(quote, "ig");
        if (element.value && quote) {
            element.value = quote + String(element.value).replace(regex, "\\$&") + quote;
        }
        array[index] = element.key + equal_sign + element.value;
    })
    for (var key in json) {
        result.push({ "key": key, "value": (json[key] || "DEFAULT") });
    }
    result.forEach(for_each)
    var filter_function = (settings["filter_function"] || function (value, index, arr) {
        return value !== undefined;
    })
    return result.filter(filter_function).join(separator);
}

xdom.server.request = function () {
    //if (event && event.srcElement && (event.srcElement.updated || event.srcElement.xhr)) return; //Revisar cómo implementar para varias solicitudes desde el mismo elemento
    var a = 0;
    var ajaxSettings = { async: false }
    var request, parameters, src;
    var cached;
    var settings;
    if (arguments.length == 1 && arguments[0].constructor === {}.constructor) {
        settings = arguments[0];
        request = settings["request"];
        src = settings["src"];
        exec = xdom.data.coalesce(settings["exec"], true);
        parameters = (settings["parameters"] || {});
        ajaxSettings = xdom.json.merge(ajaxSettings, (settings["xhr"] || {}));
        ajaxSettings["parameters"] = parameters;
        var on_success = (ajaxSettings["onSuccess"] || settings["onSuccess"]);
        var on_complete = (ajaxSettings["onComplete"] || settings["onComplete"]);
        var on_exception = ajaxSettings["onException"];
        var type = xdom.data.coalesce(ajaxSettings["type"], "table");
        var target = (ajaxSettings["target"] || (ajaxSettings["xhr"] || {})["target"]);
    } else {
        var sSQLQuery = String(arguments[a++]);
        var sParameters = ""
        if (arguments.length > 1) {
            sSQLQuery += '('
            for (; a < arguments.length; ++a) {
                sParameters += ((sParameters.length > 0 ? ', ' : '') + (isObject(arguments[a]) ? arguments[a] : (isEmpty(arguments[a]) || String(arguments[a]) == 'null' || String(arguments[a]) == 'NaN' ? 'NULL' : (isNumericOrMoney(arguments[a]) ? arguments[a] : "'" + arguments[a] + "'"))))
            }
            sSQLQuery += sParameters
            sSQLQuery += ')';
        }
        if (!sSQLQuery.match(/\)$/g)) {
            request = sSQLQuery + '(' + sParameters + ')'
        }
    }
    ajaxSettings["method"] = (ajaxSettings["method"] || "GET");

    var result;
    var url = "server/request.asp?command=" + request //+ (parameters?'&parameters=' + parameters:"");

    //switch (type) {
    //    case "auto":
    //        url = "server/request.asp?sql_query=" + request + '&parameters=' + parameters;
    //        break;
    //    case "procedure":
    //        url = "server/procedure.asp?RoutineName=" + request + '&parameters=' + parameters;
    //        break;
    //    case "scalar":
    //        url = "server/scalar.asp?strSQL=" + request + '&parameters=' + parameters;
    //        break;
    //    default:
    //        url = "server/table_function.asp?strSQL=" + request + '&parameters=' + parameters;
    //}
    //for (param in settings["parameters"]) {
    //    url = url + '&' + param + '=' + settings["parameters"][param];
    //}
    //ajaxSettings["src"] = src;
    src = (src || xdom.data.find((src || (xdom.dom.findClosestElementWithId(event.srcElement).id || '').replace(/container_/i, ''))));

    var oData = (xdom.xhr.cache[request] || new xdom.xhr.Request(url, ajaxSettings));
    if (ajaxSettings && ajaxSettings.headers && ajaxSettings.headers["Cache-Response"]) {
        xdom.xhr.cache[request] = oData;
    }
    oData.subscribe(src);
    oData.onSuccess = function (Response, Request) {
        this.srcElement.updated = true;
        //for (var s = Request.subscribers.length - 1; s >= 0; s--) {
        //    //var src = xdom.data.find((this.src || xdom.dom.findClosestElementWithId(this.srcElement).id.replace(/container_/i, '')));
        //    var src = (Request.subscribers.pop() || {})["subscriber"]
        //    var src = xdom.data.find((src || xdom.dom.findClosestElementWithId(this.srcElement).id.replace(/container_/i, '')))
        //    if (src && src.nodeType == 2) xdom.data.remove(src);
        //}
        result = Response;
        if (Response.status != 401 && !xdom.session.getUserId()) {
            xdom.session.setUserId(undefined);
            xdom.session.updateSession("status", "unauthorized");
            //xdom.session.getUserId();
        }
        if (Request.headers["Cache-Response"]) {
            xdom.xhr.cache[request] = this;
        }

        if (on_success) {
            on_success.apply(this, arguments);
        }
        if (Response.value && Response.value.message) {
            if (Response.value.status == 'exception') {
                //if (target) {
                //    //target = xdom.data.document.selectSingleNode('//*[@x:id="' + target.getAttribute('x:id') + '"]');
                //    target.setAttribute("xhr:exception", Response.value.message)
                //}
                console.error(Response.value.message);//throw (response.message);
                xdom.dom.refresh({ after: function () { return null; } });
            } else {
                console.warn(Response.value.message);
            }
        }
        if (on_complete && on_complete.apply) {
            on_complete.apply(this, arguments)
        }
    }
    oData.onException = function (Response, Request) {
        result = Response;
        this.srcElement.updated = true;
        for (var s in this.subscribers) {
            var src = xdom.data.find(this.subscribers[s].subscriber);
            if (Response.type == "xml") {
                if (src) {
                    src.appendChild(Response.value.documentElement)
                }
                xdom.data.reseed();
                xdom.dom.refresh();
            }
        }

        if (on_exception) { on_exception.apply(this, arguments); }
        if (Response.status == 401) {
            xdom.data.document = (xdom.data.document || xdom.library["default.xml"].document || xdom.library["default.xml"]);
            xdom.session.setUserId(null);
            xdom.session.updateSession("status", "unauthorized");
            if (!xdom.data.document) {
                alert(xdom.messages.unauthorized);
                return
            }
            xdom.data.reseed();
            xdom.dom.refresh({ after: function () { return null; } });
        }
        else if (Response.type == "json") {
            if (Response.value.status == 'exception' || Response.value.status == 'unauthorized') {
                console.error(Response.status + ' ' + Response.statusMessage + ': ' + Response.value.message);
                xdom.dom.refresh({ after: function () { return null; } });
            } else {
                console.warn(Response.value.message);
            }
        }
        if (on_complete && on_complete.apply) {
            on_complete.apply(this, arguments)
        }
    }
    //if (ajaxSettings && ajaxSettings.headers && ajaxSettings.headers["Cache-Response"] && xdom.xhr.cache[request]) {
    //    oData.Response = xdom.xhr.cache[request].Response;
    //}
    //if (ajaxSettings.headers["Cache-Response"]) {
    //    xdom.xhr.cache[request] = oData;
    //}
    if (exec) {
        oData.load();
    }
    return oData;
}

xdom.data.find = function (ref, dataset) {
    var dataset = (dataset || xdom.data.document)
    if (typeof (ref) == "string") {
        ref = dataset.selectSingleNode('//*[@x:id="' + ref + '"]')
    }
    if (!ref) return;
    var exists = false;
    var return_value;
    if (dataset.contains(ref) || ref.nodeType == 2 && dataset.contains(ref.selectSingleNode('..'))) {
        return ref;
    }
    if (ref.nodeType == 2) {
        return dataset.selectSingleNode('//*[@x:id="' + (ref.selectSingleNode('..') || document.createElement('p')).getAttribute("x:id") + '"]/@' + ref.name);
    } else {
        return dataset.selectSingleNode('//*[@x:id="' + (ref.documentElement || ref || document.createElement('p')).getAttribute("x:id") + '"]');
    }
}

xdom.dom.allowDrop = function (ev) {
    ev.preventDefault();
}

xdom.dom.drag = function (ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

xdom.dom.drop = function (ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

xdom.data.selectNode = function (uid) {
    xdom.data.removeSelections(xdom.data.document.selectNodes('//*[@x:id="' + uid + '"]/..//*[@x:selected]'));
    xdom.data.setAttribute(xdom.data.document.selectNodes('//*[@x:id="' + uid + '"]|//*[@x:id="' + uid + '"]//*[count(preceding-sibling::*)=0 and count(following-sibling::*[@x:selected])=0]'), '@x:selected', 'true');
    xdom.data.document = xdom.xml.createDocument(xdom.data.document);
    xdom.dom.refresh();
}

xdom.data.self = {}

xdom.data.self = function () {
    var uid = event.srcElement.id;
    var _self = xdom.data.document.selectSingleNode('//*[@x:id="' + uid + '"]')
    _self.remove = function (str) {
        nodes = _self.selectNodes(str);
        xdom.data.remove(nodes);
        xdom.dom.refresh();
    }
    return _self;
}

xdom.data.getNode = function (uid) {
    return xdom.data.document.selectSingleNode("//*[@x:id='" + uid + "']/ancestor-or-self::*[namespace-uri()!='http://panax.io/xdom'][1]");
}

xdom.data.getCurrent = function () {
    var uid = event.srcElement.id;
    return xdom.data.document.selectSingleNode("//*[@x:id='" + uid + "']/ancestor-or-self::*[namespace-uri()!='http://panax.io/xdom'][1]");
}

xdom.data.remove = function (target) {
    if (!target) return;
    if (typeof (target) == "string") {
        target = xdom.data.document.selectSingleNode('//*[@x:id="' + target + '"]')
    }
    if (target.length !== undefined) {
        for (var node = 0; node < target.length; ++node) {
            xdom.data.remove(target[node]);
        }
    } else {
        if (target instanceof Element) {
            target.remove();
        } else if (target.nodeType == 2/*attribute*/) {
            var attribute_name = target.nodeName;
            var ownerElement = (target.ownerElement || target.selectSingleNode('..'))
            ownerElement.removeAttribute(attribute_name);
        } else {
            target.parentNode.removeChild(target);
        }
    }
    return !target;
}

xdom.xml.appendChild = function (target, child) {
    var namespaces = xdom.xml.createNamespaceDeclaration(target.ownerDocument);
    var xsl_transform = xdom.xml.createDocument('\
<xsl:stylesheet version="1.0" \
     xmlns:xsl="http://www.w3.org/1999/XSL/Transform"\
     '+ namespaces + '>                     \
      <xsl:output method="xml" indent="no"/>\
      <xsl:template match="@* | node() | text()">\
        <xsl:copy>\
          <xsl:apply-templates select="@*"/>\
          <xsl:apply-templates select="node() | text()"/>\
        </xsl:copy>\
      </xsl:template>\
    <xsl:template match="/*">              \
        <xsl:copy >                                    \
        <xsl:apply-templates select="@*" />         '+
        xdom.xml.toString(child)
        + '    <xsl:apply-templates select="node()|text()" />\
        </xsl:copy >                                        \
  </xsl:template >                                      \
    </xsl:stylesheet>');
    return xdom.xml.transform(target, xsl_transform);
}

xdom.data.removeSelections = function (nodes) {
    /*USE FOR DEMOSTRATION*/
    //    var xsl_transform = xdom.xml.createDocument('\
    //<xsl:stylesheet version="1.0" \
    // xmlns:xsl="http://www.w3.org/1999/XSL/Transform"\
    // xmlns:x="http://panax.io/xdom">\
    //  <xsl:output method="xml" indent="no"/>\
    //  <xsl:template match="@* | node() | text()">\
    //    <xsl:copy>\
    //      <xsl:apply-templates select="@*"/>\
    //      <xsl:apply-templates select="node() | text()"/>\
    //    </xsl:copy>\
    //  </xsl:template>\
    //  <xsl:template match="@x:selected"/>\
    //</xsl:stylesheet>');
    //    xdom.updateData(xdom.xml.transform(xdom.data.document, xsl_transform));

    for (var node = 0; node < nodes.length; ++node) {
        nodes[node].removeAttribute('x:selected');
        //    //xdom.data.removeSelections(nodes[node].selectNodes('../*[@x:selected]'))
    }
}

xdom.updateData = function (xdoc) {
    if (!xdoc) {
        throw ("Data can't be set to null");
        return false;
    }
    xdom.data.document = xdoc
    return true
}

xdom.data.setAttribute = function (nodes, attribute, value) {
    for (var node = 0; node < nodes.length; ++node) {
        nodes[node].setAttribute(attribute.substring(1), value);
    }
}

xdom.data.removeAttribute = function (nodes, attribute) {
    for (var node = 0; node < nodes.length; ++node) {
        nodes[node].removeAttribute(attribute.substring(1));
    }
}

xdom.data.submit = function (settings) { }
xdom.data.submit = function (data, xhr_settings) {
    if (arguments.length == 1 && arguments[0].constructor === {}.constructor) {
        settings = arguments[0];
    } else if (arguments.length == 1 && typeof arguments[0] == 'string') {
        var uid = arguments[0];
        xdom.data.document = xdom.xml.transform(xdom.data.document, xdom.library["resources/normalize_namespaces.xslt"]);
        data = xdom.data.document.selectSingleNode('//*[@x:id="' + uid + '"]');
    }
    var data = (data || xdom.data.document)

    this.prepareData = function (data) {
        if (settings["prepareData"] && settings["prepareData"].apply) {
            settings["prepareData"].apply(this, [data])
        };
        return data;
    }

    var settings = (settings || {});
    //settings = xdom.json.merge(settings, { contentType: 'application/json' });
    var xhr_settings = xdom.json.merge({ headers: { "Accept": 'text/xml', "Content-Type": 'text/xml' } }, (xhr_settings || settings["xhr"]));
    var onsuccess = (xhr_settings["onsuccess"] || function () { });
    if (data) {
        this.prepareData(data);

        data.setAttribute("session:user_id", (data.getAttribute("session:user_id") || xdom.session.getUserId()));
        data.setAttribute("session:status", (xdom.session.getUserId() ? "authorized" : "unauthorized"));

        data = xdom.xml.createDocument(data).documentElement;
        var submit_data = xdom.xml.transform(data.ownerDocument, data.getAttribute("transforms:submit"));
        var xhr = new xdom.xhr.Request('server/post.asp', xdom.json.merge(xhr_settings, {
            onSuccess: function (Response, Request) {
                if (Response.type == 'json' || Response.type == 'script') {
                    var results = Response.value;
                    xdom.data.update(data.getAttribute("x:id"), "@x:submitting", "false");
                    xdom.data.update(data.getAttribute("x:id"), "@x:trid", results.recordSet[0][""]);
                }
                if (results.message) {
                    alert(results.message);
                }
            }
            , onException: function (Response, Request) {
                alert("No se pudo guardar la información, intente de nuevo");
                xdom.data.update(data.getAttribute("x:id"), "@x:submitting", "false");
                xdom.session.checkStatus();
            }
        }));
        var payload = xdom.xml.createDocument('<x:post xmlns:x="http://panax.io/xdom"><x:source>' + xdom.xml.toString(data) + '</x:source><x:submit>' + xdom.xml.toString(submit_data) + '</x:submit></x:post>');
        //var nodes = payload.selectNodes('//source:value|//@source:value');
        //xdom.data.remove(nodes);
        xdom.data.update(data.getAttribute("x:id"), "@x:submitting", "true");
        xhr.send(payload);
        //xhr.upload.onprogress = p => {
        //    console.log(Math.round((p.loaded / p.total) * 100) + '%');
        //}
    }
}

xdom.session.loadSession = function () {
    session_id = prompt("Introduzca el id de la sesión", (xdom.session.last_id || ""));
    if (!session_id) return;
    xdom.session.last_id = session_id;
    xdom.data.clear();
    xdom.data.load("server/load_session.asp" + (session_id ? "?sessionId=" + session_id : ""), function () {
        var selections = xdom.data.document.selectNodes("//Operacion[@x:selected]");
        for (var s = 0; s < selections.length; ++s) {
            xdom.data.binding.trigger(selections[s]);
        }
    });
}

xdom.session.saveSession = function (data, settings) {
    var data = (data || xdom.data.document)

    this.prepareData = function (data) {
        if (settings["prepareData"] && settings["prepareData"].apply) {
            settings["prepareData"].apply(this, [data])
        };
        return data;
    }

    var settings = (settings || {});
    //settings = xdom.json.merge(settings, { contentType: 'application/json' });
    var xhr_settings = xdom.json.merge({ headers: { "Accept": 'application/json', "Content-Type": 'text/xml' } }, (xhr_settings || settings["xhr"]));
    var onsuccess = (xhr_settings["onsuccess"] || function () { });
    if (data) {
        this.prepareData(data);
        var xhr = new xdom.xhr.Request('server/saveSession.asp', xdom.json.merge(xhr_settings, {
            onSuccess: function () {
                console.log(xdom.xml.toString(this.xmlDocument));
            }
        }));
        var payload = xdom.xml.createDocument(xdom.xml.toString(data));
        var nodes = payload.selectNodes('//source:value|//@source:value');
        //var nodes = payload.selectNodes('//Option|//source:value');
        //xdom.data.remove(nodes);
        xhr.send(payload);
        //xhr.upload.onprogress = p => {
        //    console.log(Math.round((p.loaded / p.total) * 100) + '%');
        //}

    }
}

xdom.xhr.upload = function (data) {
    if (!data) return
    if (data) {
        var xhr = new xdom.xhr.Request('server/upload_xml.asp', {
            headers: {
                "Content-Type": 'text/xml'
                , "Accept": 'text/xml'
            }
            , onSuccess: function () {
                console.log("Uploaded file");
            }
        });
        xhr.send(xdom.xml.createDocument(xdom.xml.toString(data)));
        //xhr.upload.onprogress = p => {
        //    console.log(Math.round((p.loaded / p.total) * 100) + '%');
        //}
    }
}

xdom.session.saveLocation = function (key, value) {
    xdom.session.setKey("xdom.current_location", window.location.pathname);
}

xdom.session.getLocation = function () {
    return xdom.session.getKey("xdom.current_location");
}

xdom.session.setKey = function (key, value) {
    if (typeof (Storage) !== "undefined") {
        if (value && value.documentElement) {
            value = xdom.xml.toString(value);
        }
        if (value === undefined) {
            sessionStorage.removeItem(key);
        } else {
            sessionStorage.setItem(key, value);
        }
    } else {
        console.error('Storage is not supported by your browser')
    }
}

xdom.session.getKey = function (key) {
    if (typeof (Storage) !== "undefined") {
        var value = sessionStorage.getItem(key);
        if (value == "null" || value == "undefined") {
            return eval(value);
        } else if (value) {
            return (xdom.xml.createDocument(value, false) || value);
        }
    } else {
        console.error('Storage is not supported by your browser')
    }
}

xdom.session.setData = function (data) {
    if (typeof (Storage) !== "undefined") {
        if (data && data.documentElement) {
            data = data.documentElement.outerHTML;
        }
        xdom.session.setKey("xdom.data", data);
    }
}

xdom.storage.getData = function () {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem("xdom.data")) {
            xdom.data.document = xdom.xml.createDocument(localStorage.getItem("xdom.data"));
        }
    } else {
        console.error('Storage is not supported by your browser')
    }
}

xdom.storage.setKey = function (key, value) {
    if (typeof (Storage) !== "undefined") {
        if (!xdom.storage.enabled) {
            console.warn("xdom.storage is disabled")
            return;
        }

        if (value && value.documentElement) {
            value = value.documentElement.outerHTML;
        }
        if (value == null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, value);
        }
    } else {
        console.error('Storage is not supported by your browser')
    }
}

xdom.storage.getKey = function (key) {
    if (!eval(xdom.storage.enabled) && key != 'xdom.storage.enabled') return;
    if (typeof (Storage) !== "undefined") {
        var document = localStorage.getItem(key);
        if (document) {
            return localStorage.getItem(key);
        }
    } else {
        console.error('Storage is not supported by your browser')
    }
}

xdom.storage.getDocument = function (key) {
    if (!eval(xdom.storage.enabled) && key != 'xdom.storage.enabled') return;
    if (typeof (Storage) !== "undefined") {
        var document = localStorage.getItem(key);
        if (document) {
            return xdom.xml.createDocument(localStorage.getItem(key));
        }
    } else {
        console.error('Storage is not supported by your browser')
    }
}

xdom.storage.disable = function (document_name_or_array) {
    xdom.storage.enabled = false;
    if (document_name_or_array) {
        xdom.storage.setKey(document_name_or_array, null);
    } else {
        localStorage.clear();
        localStorage.setItem("xdom.storage.enabled", "0");
    }

    xdom.library.reload(document_name_or_array);
}

xdom.storage.enable = function () {
    xdom.storage.enabled = true;
    localStorage.setItem("xdom.storage.enabled", "1");
}

xdom.storage.clearCache = function (document_name) {
    if (typeof (Storage) !== "undefined") {
        localStorage.clear();
    } else {
        console.error('Storage is not supported by your browser');
    }
}

xdom.session.clearCache = function (document_name) {
    if (typeof (Storage) !== "undefined") {
        sessionStorage.clear();
        xdom.data.document = null;
        xdom.data.load();
    } else {
        console.error('Storage is not supported by your browser')
    }
}

xdom.listeners.keys = function (e) {
    xdom.listeners.keys.ctrlKey = e.ctrlKey;
    xdom.listeners.keys.shiftKey = e.shiftKey;
    xdom.listeners.keys.altKey = e.altKey;
    if (xdom.debug["xdom.listeners.keys"]) {
        console.log(String.fromCharCode(e.keyCode) + " --> " + e.keyCode)
    }
}

xdom.listeners.keys.last_key = undefined;
xdom.listeners.keys.streak_count = 0;

xdom.listeners.keys.keydown = function (event) {
    if (event.keyCode == xdom.listeners.keys.last_key) {
        ++xdom.listeners.keys.streak_count;
    } else {
        xdom.listeners.keys.last_key = event.keyCode;
        xdom.listeners.keys.streak_count = 1;
    }
    if (xdom.debug["xdom.listeners.keys.keydown"]) {
        console.log("xdom.listeners.keys.streak_count: " + xdom.listeners.keys.streak_count)
    }
    xdom.listeners.keys(event);
    if (xdom.listeners.keys.altKey || xdom.listeners.keys.shiftKey || xdom.listeners.keys.ctrlKey) return; //if combined with alt/shift/ctrl keys 
    // in grids, this function will allow move up and down between elements
    var srcElement = event.srcElement;
    if (event.keyCode == 40) {
        if (srcElement.nodeName.toLowerCase() == 'select' && (srcElement.size || xdom.browser.isIE() || xdom.browser.isEdge())) return;
        currentNode = xdom.data.getCurrent();
        if (!currentNode) return false;
        nextNode = currentNode.selectSingleNode('../following-sibling::*[not(@x:deleting="true")][1]/*[local-name()="' + currentNode.nodeName + '"]')
        if (nextNode) {
            document.getElementById(nextNode.getAttribute('x:id')).focus();
        }
        event.preventDefault();
    } else if (event.keyCode == 38) {
        if (srcElement.nodeName.toLowerCase() == 'select' && (srcElement.size || xdom.browser.isIE() || xdom.browser.isEdge())) return;
        currentNode = xdom.data.getCurrent();
        if (!currentNode) return false;
        nextNode = currentNode.selectSingleNode('../preceding-sibling::*[not(@x:deleting="true")][1]/*[local-name()="' + currentNode.nodeName + '"]')
        if (nextNode) {
            document.getElementById(nextNode.getAttribute('x:id')).focus();
        }
        event.preventDefault();
    }
    if (srcElement.nodeName.toLowerCase() == 'select') {//disable behaviour that changes options with arrows, preventing unwanted changes
        var key = event.which || event.keyCode;
        if (key == 37) {
            event.preventDefault();
        } else if (key === 39) {
            event.preventDefault();
        }
    }
    //if (event.keyCode == 8 &&
    //    !(event.target || event.srcElement).isContentEditable) {
    //    if (navigator.userAgent.toLowerCase().indexOf("msie") == -1) {
    //        event.stopPropagation();
    //    } else {
    //        console.info("Backspace navigation prevented");
    //        event.returnValue = false;
    //    }
    //    return false;
    //}
    if ((document.activeElement || {}).value) {
        xdom.dom.activeElementCaretPosition = parseFloat(String(xdom.dom.getCaretPosition(document.activeElement)).split(",").pop()) + 1;
    }
}

xdom.listeners.keys.keyup = function (e) {
    xdom.listeners.keys.last_key = e.keyCode;
    xdom.listeners.keys(e);
}

document.onkeydown = xdom.listeners.keys.keydown;

document.onkeyup = xdom.listeners.keys.keyup;

var keyInterval = undefined;
xdom.dom.controls.comboBox = {}
xdom.dom.controls.comboBox.showOptions = function (input, onkeyup) {
    if (keyInterval != undefined) {
        window.clearTimeout(keyInterval); keyInterval = undefined;
    }
    keyInterval = window.setTimeout(function () {
        if (onkeyup && onkeyup.apply) {
            var current_request = (xdom.data.binding.requests[xdom.dom.findClosestElementWithId(input).id] || {})["value"];
            if (current_request && current_request.xhr) {
                current_request.xhr.abort()
            }
            onkeyup.apply(input, [input]);
        }
    }, /*sDataSourceType == 'remote' ? 500 : */300);
}

xdom.dom.controls.comboBox.onBlur = function (src) {
    if (!src) return;
    var combo = document.getElementById(src.id);
    var node_id = src.id.replace(/^_\[^_]+_/, '');
    if (combo == this) { combo.style.display = 'none'; xdom.data.update({ target: node_id, attributes: [{ '@x:value': (combo[combo.selectedIndex] || {}).value }] }) }
    xdom.dom.delay(function () {
        if ((xdom.dom.findClosestElementWithId(document.activeElement) || {}).id != node_id) {
            combo.style.display = 'none';
            xdom.data.remove(xdom.data.document.selectNodes('//@state:combo_selection'));
        }
    }, 100)

}

window.addEventListener("beforeunload", function (e) {
    // check to cancel
    for (hashtag in xdom.data.documents) {
        xdom.session.setKey(hashtag, xdom.data.documents[hashtag]);
    }
    console.log("checking if we should display confirmation dialog");
    var shouldCancel = true;
    if (shouldCancel) {
        console.log("displaying confirmation dialog");
        e.preventDefault(); // this will display the confirmation dialog
    }
    // Chrome requires returnValue to be set
    e.returnValue = "";
});

window.addEventListener("unload", function (event) {
    // user confirmed they are sure
    // perform cleanup
    console.log("cleaning up");
});

xdom.dom.print = function () {
    var iframe = document.querySelector('iframe');
    if (iframe) {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
    } else {
        window.print()
    }

}

//window.addEventListener("beforeprint", function (event) {
//    event.preventDefault();
//    event.returnValue = "";
//    xdom.dom.print();
//});

//if ('matchMedia' in window) {
//    window.matchMedia('print').addListener(function (media) {
//        xdom.dom.print()
//    });
//} else {
//    window.onbeforeprint = function () {
//        xdom.dom.print()
//    }
//}

/**
 * A Javascript object to encode and/or decode html characters
 * @Author R Reid
 * source: http://www.strictly-software.com/htmlencode
 * Licence: GPL
 * 
 * Revision:
 *  2011-07-14, Jacques-Yves Bleau: 
 *       - fixed conversion error with capitalized accentuated characters
 *       + converted arr1 and arr2 to object property to remove redundancy
 */

Encoder = {

    // When encoding do we convert characters into html or numerical entities
    EncodeType: "entity",  // entity OR numerical

    isEmpty: function (val) {
        if (val) {
            return ((val === null) || val.length == 0 || /^\s+$/.test(val));
        } else {
            return true;
        }
    },
    arr1: new Array('&nbsp;', '&iexcl;', '&cent;', '&pound;', '&curren;', '&yen;', '&brvbar;', '&sect;', '&uml;', '&copy;', '&ordf;', '&laquo;', '&not;', '&shy;', '&reg;', '&macr;', '&deg;', '&plusmn;', '&sup2;', '&sup3;', '&acute;', '&micro;', '&para;', '&middot;', '&cedil;', '&sup1;', '&ordm;', '&raquo;', '&frac14;', '&frac12;', '&frac34;', '&iquest;', '&Agrave;', '&Aacute;', '&Acirc;', '&Atilde;', '&Auml;', '&Aring;', '&Aelig;', '&Ccedil;', '&Egrave;', '&Eacute;', '&Ecirc;', '&Euml;', '&Igrave;', '&Iacute;', '&Icirc;', '&Iuml;', '&ETH;', '&Ntilde;', '&Ograve;', '&Oacute;', '&Ocirc;', '&Otilde;', '&Ouml;', '&times;', '&Oslash;', '&Ugrave;', '&Uacute;', '&Ucirc;', '&Uuml;', '&Yacute;', '&THORN;', '&szlig;', '&agrave;', '&aacute;', '&acirc;', '&atilde;', '&auml;', '&aring;', '&aelig;', '&ccedil;', '&egrave;', '&eacute;', '&ecirc;', '&euml;', '&igrave;', '&iacute;', '&icirc;', '&iuml;', '&eth;', '&ntilde;', '&ograve;', '&oacute;', '&ocirc;', '&otilde;', '&ouml;', '&divide;', '&Oslash;', '&ugrave;', '&uacute;', '&ucirc;', '&uuml;', '&yacute;', '&thorn;', '&yuml;', '&quot;', '&amp;', '&lt;', '&gt;', '&oelig;', '&oelig;', '&scaron;', '&scaron;', '&yuml;', '&circ;', '&tilde;', '&ensp;', '&emsp;', '&thinsp;', '&zwnj;', '&zwj;', '&lrm;', '&rlm;', '&ndash;', '&mdash;', '&lsquo;', '&rsquo;', '&sbquo;', '&ldquo;', '&rdquo;', '&bdquo;', '&dagger;', '&dagger;', '&permil;', '&lsaquo;', '&rsaquo;', '&euro;', '&fnof;', '&alpha;', '&beta;', '&gamma;', '&delta;', '&epsilon;', '&zeta;', '&eta;', '&theta;', '&iota;', '&kappa;', '&lambda;', '&mu;', '&nu;', '&xi;', '&omicron;', '&pi;', '&rho;', '&sigma;', '&tau;', '&upsilon;', '&phi;', '&chi;', '&psi;', '&omega;', '&alpha;', '&beta;', '&gamma;', '&delta;', '&epsilon;', '&zeta;', '&eta;', '&theta;', '&iota;', '&kappa;', '&lambda;', '&mu;', '&nu;', '&xi;', '&omicron;', '&pi;', '&rho;', '&sigmaf;', '&sigma;', '&tau;', '&upsilon;', '&phi;', '&chi;', '&psi;', '&omega;', '&thetasym;', '&upsih;', '&piv;', '&bull;', '&hellip;', '&prime;', '&prime;', '&oline;', '&frasl;', '&weierp;', '&image;', '&real;', '&trade;', '&alefsym;', '&larr;', '&uarr;', '&rarr;', '&darr;', '&harr;', '&crarr;', '&larr;', '&uarr;', '&rarr;', '&darr;', '&harr;', '&forall;', '&part;', '&exist;', '&empty;', '&nabla;', '&isin;', '&notin;', '&ni;', '&prod;', '&sum;', '&minus;', '&lowast;', '&radic;', '&prop;', '&infin;', '&ang;', '&and;', '&or;', '&cap;', '&cup;', '&int;', '&there4;', '&sim;', '&cong;', '&asymp;', '&ne;', '&equiv;', '&le;', '&ge;', '&sub;', '&sup;', '&nsub;', '&sube;', '&supe;', '&oplus;', '&otimes;', '&perp;', '&sdot;', '&lceil;', '&rceil;', '&lfloor;', '&rfloor;', '&lang;', '&rang;', '&loz;', '&spades;', '&clubs;', '&hearts;', '&diams;'),
    arr2: new Array('&#160;', '&#161;', '&#162;', '&#163;', '&#164;', '&#165;', '&#166;', '&#167;', '&#168;', '&#169;', '&#170;', '&#171;', '&#172;', '&#173;', '&#174;', '&#175;', '&#176;', '&#177;', '&#178;', '&#179;', '&#180;', '&#181;', '&#182;', '&#183;', '&#184;', '&#185;', '&#186;', '&#187;', '&#188;', '&#189;', '&#190;', '&#191;', '&#192;', '&#193;', '&#194;', '&#195;', '&#196;', '&#197;', '&#198;', '&#199;', '&#200;', '&#201;', '&#202;', '&#203;', '&#204;', '&#205;', '&#206;', '&#207;', '&#208;', '&#209;', '&#210;', '&#211;', '&#212;', '&#213;', '&#214;', '&#215;', '&#216;', '&#217;', '&#218;', '&#219;', '&#220;', '&#221;', '&#222;', '&#223;', '&#224;', '&#225;', '&#226;', '&#227;', '&#228;', '&#229;', '&#230;', '&#231;', '&#232;', '&#233;', '&#234;', '&#235;', '&#236;', '&#237;', '&#238;', '&#239;', '&#240;', '&#241;', '&#242;', '&#243;', '&#244;', '&#245;', '&#246;', '&#247;', '&#248;', '&#249;', '&#250;', '&#251;', '&#252;', '&#253;', '&#254;', '&#255;', '&#34;', '&#38;', '&#60;', '&#62;', '&#338;', '&#339;', '&#352;', '&#353;', '&#376;', '&#710;', '&#732;', '&#8194;', '&#8195;', '&#8201;', '&#8204;', '&#8205;', '&#8206;', '&#8207;', '&#8211;', '&#8212;', '&#8216;', '&#8217;', '&#8218;', '&#8220;', '&#8221;', '&#8222;', '&#8224;', '&#8225;', '&#8240;', '&#8249;', '&#8250;', '&#8364;', '&#402;', '&#913;', '&#914;', '&#915;', '&#916;', '&#917;', '&#918;', '&#919;', '&#920;', '&#921;', '&#922;', '&#923;', '&#924;', '&#925;', '&#926;', '&#927;', '&#928;', '&#929;', '&#931;', '&#932;', '&#933;', '&#934;', '&#935;', '&#936;', '&#937;', '&#945;', '&#946;', '&#947;', '&#948;', '&#949;', '&#950;', '&#951;', '&#952;', '&#953;', '&#954;', '&#955;', '&#956;', '&#957;', '&#958;', '&#959;', '&#960;', '&#961;', '&#962;', '&#963;', '&#964;', '&#965;', '&#966;', '&#967;', '&#968;', '&#969;', '&#977;', '&#978;', '&#982;', '&#8226;', '&#8230;', '&#8242;', '&#8243;', '&#8254;', '&#8260;', '&#8472;', '&#8465;', '&#8476;', '&#8482;', '&#8501;', '&#8592;', '&#8593;', '&#8594;', '&#8595;', '&#8596;', '&#8629;', '&#8656;', '&#8657;', '&#8658;', '&#8659;', '&#8660;', '&#8704;', '&#8706;', '&#8707;', '&#8709;', '&#8711;', '&#8712;', '&#8713;', '&#8715;', '&#8719;', '&#8721;', '&#8722;', '&#8727;', '&#8730;', '&#8733;', '&#8734;', '&#8736;', '&#8743;', '&#8744;', '&#8745;', '&#8746;', '&#8747;', '&#8756;', '&#8764;', '&#8773;', '&#8776;', '&#8800;', '&#8801;', '&#8804;', '&#8805;', '&#8834;', '&#8835;', '&#8836;', '&#8838;', '&#8839;', '&#8853;', '&#8855;', '&#8869;', '&#8901;', '&#8968;', '&#8969;', '&#8970;', '&#8971;', '&#9001;', '&#9002;', '&#9674;', '&#9824;', '&#9827;', '&#9829;', '&#9830;'),

    // Convert HTML entities into numerical entities
    HTML2Numerical: function (s) {
        return this.swapArrayVals(s, this.arr1, this.arr2);
    },

    // Convert Numerical entities into HTML entities
    NumericalToHTML: function (s) {
        return this.swapArrayVals(s, this.arr2, this.arr1);
    },


    // Numerically encodes all unicode characters
    numEncode: function (s) {

        if (this.isEmpty(s)) return "";

        var e = "";
        for (var i = 0; i < s.length; i++) {
            var c = s.charAt(i);
            if (c < " " || c > "~") {
                c = "&#" + c.charCodeAt() + ";";
            }
            e += c;
        }
        return e;
    },

    // HTML Decode numerical and HTML entities back to original values
    htmlDecode: function (s) {

        var c, m, d = s;

        if (this.isEmpty(d)) return "";

        // convert HTML entites back to numerical entites first
        d = this.HTML2Numerical(d);

        // look for numerical entities &#34;
        arr = d.match(/&#[0-9]{1,5};/g);

        // if no matches found in string then skip
        if (arr != null) {
            for (var x = 0; x < arr.length; x++) {
                m = arr[x];
                c = m.substring(2, m.length - 1); //get numeric part which is refernce to unicode character
                // if its a valid number we can decode
                if (c >= -32768 && c <= 65535) {
                    // decode every single match within string
                    d = d.replace(m, String.fromCharCode(c));
                } else {
                    d = d.replace(m, ""); //invalid so replace with nada
                }
            }
        }

        return d;
    },

    // encode an input string into either numerical or HTML entities
    htmlEncode: function (s, dbl) {

        if (this.isEmpty(s)) return "";

        // do we allow double encoding? E.g will &amp; be turned into &amp;amp;
        dbl = dbl || false; //default to prevent double encoding

        // if allowing double encoding we do ampersands first
        if (dbl) {
            if (this.EncodeType == "numerical") {
                s = s.replace(/&/g, "&#38;");
            } else {
                s = s.replace(/&/g, "&amp;");
            }
        }

        // convert the xss chars to numerical entities ' " < >
        s = this.XSSEncode(s, false);

        if (this.EncodeType == "numerical" || !dbl) {
            // Now call function that will convert any HTML entities to numerical codes
            s = this.HTML2Numerical(s);
        }

        // Now encode all chars above 127 e.g unicode
        s = this.numEncode(s);

        // now we know anything that needs to be encoded has been converted to numerical entities we
        // can encode any ampersands & that are not part of encoded entities
        // to handle the fact that I need to do a negative check and handle multiple ampersands &&&
        // I am going to use a placeholder

        // if we don't want double encoded entities we ignore the & in existing entities
        if (!dbl) {
            s = s.replace(/&#/g, "##AMPHASH##");

            if (this.EncodeType == "numerical") {
                s = s.replace(/&/g, "&#38;");
            } else {
                s = s.replace(/&/g, "&amp;");
            }

            s = s.replace(/##AMPHASH##/g, "&#");
        }

        // replace any malformed entities
        s = s.replace(/&#\d*([^\d;]|$)/g, "$1");

        if (!dbl) {
            // safety check to correct any double encoded &amp;
            s = this.correctEncoding(s);
        }

        // now do we need to convert our numerical encoded string into entities
        if (this.EncodeType == "entity") {
            s = this.NumericalToHTML(s);
        }

        return s;
    },

    // Encodes the basic 4 characters used to malform HTML in XSS hacks
    XSSEncode: function (s, en) {
        if (!this.isEmpty(s)) {
            en = en || true;
            // do we convert to numerical or html entity?
            if (en) {
                s = s.replace(/\'/g, "&#39;"); //no HTML equivalent as &apos is not cross browser supported
                s = s.replace(/"/g, "&quot;");
                s = s.replace(/</g, "&lt;");
                s = s.replace(/>/g, "&gt;");
            } else {
                s = s.replace(/\'/g, "&#39;"); //no HTML equivalent as &apos is not cross browser supported
                s = s.replace(/"/g, "&#34;");
                s = s.replace(/</g, "&#60;");
                s = s.replace(/>/g, "&#62;");
            }
            return s;
        } else {
            return "";
        }
    },

    // returns true if a string contains html or numerical encoded entities
    hasEncoded: function (s) {
        if (/&#[0-9]{1,5};/g.test(s)) {
            return true;
        } else if (/&[A-Z]{2,6};/gi.test(s)) {
            return true;
        } else {
            return false;
        }
    },

    // will remove any unicode characters
    stripUnicode: function (s) {
        return s.replace(/[^\x20-\x7E]/g, "");

    },

    // corrects any double encoded &amp; entities e.g &amp;amp;
    correctEncoding: function (s) {
        return s.replace(/(&amp;)(amp;)+/, "$1");
    },


    // Function to loop through an array swaping each item with the value from another array e.g swap HTML entities with Numericals
    swapArrayVals: function (s, arr1, arr2) {
        if (this.isEmpty(s)) return "";
        var re;
        if (arr1 && arr2) {
            //ShowDebug("in swapArrayVals arr1.length = " + arr1.length + " arr2.length = " + arr2.length)
            // array lengths must match
            if (arr1.length == arr2.length) {
                for (var x = 0, i = arr1.length; x < i; x++) {
                    re = new RegExp(arr1[x], 'g');
                    s = s.replace(re, arr2[x]); //swap arr1 item with matching item from arr2	
                }
            }
        }
        return s;
    },

    inArray: function (item, arr) {
        for (var i = 0, x = arr.length; i < x; i++) {
            if (arr[i] === item) {
                return i;
            }
        }
        return -1;
    }

    // Extended by Uriel Gómez	
    , urlEncode: function (url) {
        return Encoder.swapArrayVals(escape(url), ['\/', '\@', '\\\+'], ['%2F', '%40', '%2B'])
    }
}

xdom.session.setUserId = function (user_id, data) {
    data = (data || xdom.data.document);
    xdom.session.setKey("userId", user_id);
    if (data) {
        data = xdom.xml.transform(data, xdom.library["resources/normalize_namespaces.xslt"]);
        if ((user_id == data.selectSingleNode('//*[@session:status][1]/@session:user_id') || {}).value) {
            return;
        }

        //xdom.data.update({
        //    "target": data.selectSingleNode("/*[1]")
        //    , "attributes": [
        //        { "@session:user_id": (user_id || "") }
        //        , { "@session:status": user_id ? 'authorized' : ((data.selectSingleNode("//*[@session:status='authorizing']/@session:status") || {}).value || 'unauthorized') }
        //    ]
        //});
    }
}

xdom.data.history.saveState = function () {
    xdom.data.history.undo.push(xdom.xml.createDocument(xdom.data.document));
    xdom.data.history.redo = [];
}

xdom.session.getUserId = function () {
    var user_id = xdom.session.getKey("userId");
    //var on_complete = function () {
    //    xdom.session.setUserId(user_id);
    //}
    if (user_id === undefined) {
        var oData = new xdom.xhr.Request("server/session.asp", { method: 'GET', async: false });
        oData.onSuccess = function (Response, Request) {
            user_id = null;
            if (Response.type == "json") {
                user_id = (Response.value.userId || null);
            }
            if (Response.value.message) {
                console.error(Response.value.message);
            }
            //on_complete.apply(this, arguments);
        }
        oData.load();
    }
    //on_complete.apply(this, arguments);

    return user_id;
}

xdom.session.updateSession = function (attribute, value) {
    var xsl = (xdom.library["resources/session.xslt"] ? (xdom.library["resources/session.xslt"].document || xdom.library["resources/session.xslt"]) : undefined);
    if (!xsl) {
        console.warn(xdom.messages["xdom.session.updateSession.error"] || "Can't find session file or variable " + attribute + " in it");
        return;
    }
    xsl.documentElement.selectSingleNode('//xsl:variable[@name="' + attribute + '"]').textContent = value;
}

xdom.session.checkStatus = function (settings) {
    var oData = new xdom.xhr.Request("server/session.asp", xdom.json.merge({ method: 'GET', async: true }, settings));

    //Estandarizar las variables de json
    oData.onSuccess = function (Response, Request) {
        xdom.session.updateSession("status", "authorized");
        xdom.session.updateSession("user_id", Response.json.userId);
        xdom.session.updateSession("user_login", (Response.json.UserName || '').toLowerCase());
        xdom.session.updateSession("user_name", (Response.json.Nombre || '').toLowerCase()) + ' ' + (Response.json.Apellidos || '').toLowerCase();
        xdom.session.setKey("userId", (Response.value.userId || null));
        xdom.dom.refresh();
    }

    oData.onException = function (Response, Request) {
        xdom.session.updateSession("status", "unauthorized");
        xdom.session.setKey("userId", null)
        xdom.dom.refresh();
    }
    oData.load();
}

xdom.session.login = function (username, password, connection_id, target_node) {
    target_node = (target_node || xdom.data.document.selectSingleNode('//*[@session:status][1]') || xdom.data.document.selectSingleNode('/*'));
    var oData = new xdom.xhr.Request("server/login.asp?UserName=" + username + "&Password=" + password + "&Connection_id=" + connection_id, { method: 'POST', async: true });
    xdom.session.updateSession("status", "authorizing");
    xdom.session.updateSession("user_login", username);
    xdom.dom.refresh();

    oData.onSuccess = function (Response, Request) {
        if (Response.status == 200 && Response.json) {
            if (Response.json.status) {
                if (Response.json.status == 'unauthorized') {
                    alert(Response.json.message || xdom.messages.unauthorized || "Unauthorized user")
                } else if (Response.json.recordSet) {
                    result = Response.json.recordSet[0].Result;
                    //if (cache_results) {
                    //    xdom.cache[request] = result;
                    //}
                    xdom.data.update(target.getAttribute("x:id"), target_attribute, result);
                    if (xdom.debug["xdom.session.login"]) {
                        console.log("\tCompleted: (" + request + ') = ' + result);
                    }
                }
            }
        }
        //implementar batchUpdate
        xdom.session.updateSession("status", "authorized");
        xdom.session.updateSession("user_id", Response.json.userId);
        xdom.session.updateSession("user_name", (Response.json.UserName || '').toLowerCase());

        if (Response.json.success) {
            xdom.session.setKey("userId", Response.json.userId)
            if ((target_node.documentElement || target_node).tagName == 'x:empty') {
                xdom.data.document = null;
            }
            xdom.init();
            xdom.data.binding.trigger();
            console.info('Welcome to your session!')
        } else if (!Response.json.success && Response.json.message) {
            console.error(Response.json.message);
            xdom.session.updateSession("status", "unauthorized");
        }
        xdom.data.reseed();
        xdom.dom.refresh();
        return true;
    }

    oData.onException = function (Response, Request) {
        if (Response.json) {
            if (Response.json.status == 'unauthorized') {
                alert(Response.json.message || xdom.messages.unauthorized || "Unauthorized user")
            } else if (Response.json.recordSet) {
                result = Response.json.recordSet[0].Result;
            }
            xdom.session.updateSession("status", "unauthorized");

            if (Response.json.message) {
                var message = xdom.xml.createDocument('<x:message x:id="xhr_message_' + Math.random() + '" xmlns:xhr="http://panax.io/xdom/xhr" xmlns:x="http://panax.io/xdom" type="exception">' + Response.json.message + '</x:message>');
                xdom.dom.appendChild(target_node, message);
            }
            //}
        }
        xdom.session.setKey("userId", null)
        xdom.dom.refresh();
    }
    oData.load();
}

xdom.session.logout = function (target_node) {
    target_node = (target_node || xdom.data.document.selectSingleNode('//*[@session:status][1]') || xdom.data.document.selectSingleNode('/*'));
    var oData = new xdom.xhr.Request("server/logout.asp", { method: 'POST', async: false, headers: { "Accept": 'application/json' } });
    oData.onSuccess = function (Response) {
        xdom.session.saveSession(xdom.data.document, { "xhr": { "async": false } });
        if (Response.json && Response.json.success) {
            xdom.session.setKey("userId", null)
            //if (xdom.data.document) {
            //    xdom.data.update({
            //        "target": target_node
            //        , "attributes": [
            //            { "@session:user_id": "" }
            //            , { "@session:status": 'unauthorized' }
            //        ]
            //    });
            //}
            xdom.session.updateSession("status", "unauthorized");
            xdom.data.document = null;
            xdom.dom.target = document.body;
            xdom.session.clearCache();
            xdom.xhr.cache = {}
            //xdom.data.load("empty.xml")
            xdom.data.load(xdom.xml.createDocument("<login/>"))
            console.info('Session ended. Goodbye!')
        } else if (!Response.json.success && Response.json.message) {
            console.error(Response.json.message);
        }
        //        xdom.dom.refresh();
        window.location.href.replace(/#.*$/g, '');
        window.location.reload(true);
        return true;
    }
    oData.load();
}

xdom.tools.isJSON = function (str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

xdom.string = {}
xdom.string.trim = function (text) {
    if (typeof (text) != "string") return text;
    return text.replace(/\s+$/, '').replace(/^\s+/, '')
}

xdom.browser.isIE = function () {
    var ua = window.navigator.userAgent;
    return /MSIE|Trident/.test(ua) && !xdom.browser.isEdge();
}

xdom.browser.isEdge = function () {
    var ua = window.navigator.userAgent;
    return /Edge/.test(ua);
}

function isNumericOrMoney(sValue) {
    var sCurrencyPath = /^(?:\$)?(?:\-)?\d{1,3}((?:\,)\d{3})*\.?\d*$/
    return (String(sValue).search(sCurrencyPath) != -1)
}

function isFunction(a) {
    return typeof a == 'function';
}

function isObject(a) {
    return (a && typeof a == 'object') || isFunction(a);
}

function isEmpty(str) {
    return (!str || /^\s*$/.test(str));
}

xdom.dom.getCaretPosition = function (elem) {
    var caret_pos = "0";
    var caret_start = "0";
    var caret_end = "0";
    if (!(elem && elem.value)) return;
    if (elem.isContentEditable || (elem.selectionStart || elem.selectionStart == 0)) {
        caret_start = elem.selectionStart;
        caret_end = elem.selectionEnd;
        if (caret_start != caret_end) {
            caret_pos = caret_start + ',' + caret_end;
        } else {
            caret_pos = caret_start;
        }
    }
    else if (document.selection) {
        elem.focus();
        var selection = document.selection.createRange();
        selection.moveStart('character', -elem.value.length);
        caret_pos = selection.text.length;
    }
    //console.log(elem.id + ': ' + caret_pos);
    return caret_pos;
}

xdom.dom.setCaretPosition = function (elem, caret_pos) {
    if (elem) {
        if (elem != null && !(elem.isContentEditable || (elem.selectionStart || elem.selectionStart == 0) || document.selection)) {
            elem.focus();
        }
        else if (typeof (elem.value) != "undefined") {
            if (elem.createTextRange) {
                var range = elem.createTextRange();
                caret_pos = (String(caret_pos) || "0");
                if (caret_pos.indexOf(",") != -1) {
                    var start = caret_pos.split(",")[0];
                    var end = caret_pos.split(",")[1];
                    if (start > end) {
                        elem.setSelectionRange(end, start, "backward");
                    } else {
                        elem.setSelectionRange(start, end);
                    }
                } else {
                    range.move('character', caret_pos);
                    range.select();
                }
            }
            else {
                if (elem.setSelectionRange && caret_pos != 0) {
                    elem.focus();
                    var start = String(caret_pos).split(",")[0];
                    var end = (String(caret_pos).split(",")[1] || start);
                    if (start > end) {
                        elem.setSelectionRange(end, start, "backward");
                    } else {
                        elem.setSelectionRange(start, end);
                    }
                }
                else
                    elem.focus();
            }
        }
    }
    xdom.dom.setScrollPosition(document.getElementsByClassName("w3-responsive")[0], xdom.dom.position);
}

xdom.dom.elementVisible = function (el, container) {
    if (container.scrollTop > el.offsetTop || container.scrollLeft > el.offsetLeft) {
        return false;
    }
    return true;
}

xdom.dom.getScrollPosition = function (el) {
    var el = (el || window);
    var coordinates =
    {
        x: (el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft),
        y: (el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop)
    }
    return coordinates;
}


xdom.dom.setScrollPosition = function (el, coordinates) {
    var el = (el || window);
    if (el.pageXOffset !== undefined) {
        el.pageXOffset = coordinates.x;
    } else {
        el.scrollLeft = coordinates.x;
    }
    if (el.pageYOffset !== undefined) {
        el.pageYOffset = coordinates.y;
    } else {
        el.scrollTop = coordinates.y;
    }
}

xdom.dom.focusNextElement = function () {
    //add all elements we want to include in our selection
    var focussableElements = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])';
    if (document.activeElement && document.activeElement.form) {
        var focussable = Array.prototype.filter.call(document.activeElement.form.querySelectorAll(focussableElements),
            function (element) {
                //check for visibility while always include the current activeElement 
                return element.offsetWidth > 0 || element.offsetHeight > 0 || element === document.activeElement
            });
        var index = focussable.indexOf(document.activeElement);
        if (index > -1) {
            var nextElement = focussable[index + 1] || focussable[0];
            nextElement.focus();
        }
    }
}

xdom.modernize = function () {
    // mozXPath [http://km0ti0n.blunted.co.uk/mozxpath/] km0ti0n@gmail.com
    // Code licensed under Creative Commons Attribution-ShareAlike License
    // http://creativecommons.org/licenses/by-sa/2.5/

    //IXMLDOMSelection.prototype.each = function (method) {
    //    for (var a = 0; a < aResult.length; ++a) {
    //        method.call(aResult[a], a, aResult[a]) //index, element
    //    }
    //};
    if (xdom.modernized) return;

    Object.defineProperty(Object.prototype, 'push', {
        value: function (key, value) {
            this[key] = value;
            return this;
        },
        writable: false, enumerable: false, configurable: false
    });

    if (document.implementation.hasFeature("XPath", "3.0")) {
        if (typeof XMLDocument == "undefined") { XMLDocument = Document; }
        XMLDocument.prototype.selectNodes = function (cXPathString, xNode) {
            if (!xNode) { xNode = this; }
            var oNSResolver = xdom.xml.createNSResolver(this.documentElement, xdom.library["resources/prepare_data.xslt"]);
            oNSResolver.lookupNamespaceURI = oNSResolver;

            var aResult = new Array;
            try {
                var aItems = this.evaluate(cXPathString, xNode, oNSResolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
                for (var i = 0; i < aItems.snapshotLength; i++) { aResult[i] = aItems.snapshotItem(i); }

                //aResult.__proto__.each = function (method) {
                //    for (var a = 0; a < aResult.length; ++a) {
                //        method.call(aResult[a], a, aResult[a]) //index, element
                //    }
                //};
            } catch (e) {
                console.info(e.message);
            }
            return aResult;
        }
        //Array.prototype.each = function (method) {
        //    //for (var a in aResult) {
        //    //    method.call(aResult[a], a, aResult[a]) //index, element
        //    //}
        //    return;
        //};
        XMLDocument.prototype.selectSingleNode = function (cXPathString, xNode) {
            if (!xNode) { xNode = this; }
            var xItems = this.selectNodes(cXPathString, xNode);
            if (xItems.length > 0) { return xItems[0]; }
            else { return null; }
        }
        Attr.prototype.selectSingleNode = function (cXPathString) {
            if (this.ownerDocument.selectSingleNode) { return this.ownerDocument.selectSingleNode(cXPathString, this); }
            else { throw "For XML Elements Only"; }
        }
        Element.prototype.selectNodes = function (cXPathString) {
            if (this.ownerDocument.selectNodes) { return this.ownerDocument.selectNodes(cXPathString, this); }
            else { throw "For XML Elements Only"; }
        }
        Element.prototype.selectSingleNode = function (cXPathString) {
            if (this.ownerDocument.selectSingleNode) { return this.ownerDocument.selectSingleNode(cXPathString, this); }
            else { throw "For XML Elements Only"; }
        }
    }

    // Production steps of ECMA-262, Edition 5, 15.4.4.18
    // Reference: http://es5.github.com/#x15.4.4.18
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function forEach(callback, thisArg) {
            'use strict';
            var T, k;

            if (this == null) {
                throw new TypeError("this is null or not defined");
            }

            var kValue,
                // 1. Let O be the result of calling ToObject passing the |this| value as the argument.
                O = Object(this),

                // 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
                // 3. Let len be ToUint32(lenValue).
                len = O.length >>> 0; // Hack to convert O.length to a UInt32

            // 4. If IsCallable(callback) is false, throw a TypeError exception.
            // See: http://es5.github.com/#x9.11
            if ({}.toString.call(callback) !== "[object Function]") {
                throw new TypeError(callback + " is not a function");
            }

            // 5. If thisArg was supplied, let T be thisArg; else let T be undefined.
            if (arguments.length >= 2) {
                T = thisArg;
            }

            // 6. Let k be 0
            k = 0;

            // 7. Repeat, while k < len
            while (k < len) {

                // a. Let Pk be ToString(k).
                //   This is implicit for LHS operands of the in operator
                // b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
                //   This step can be combined with c
                // c. If kPresent is true, then
                if (k in O) {

                    // i. Let kValue be the result of calling the Get internal method of O with argument Pk.
                    kValue = O[k];

                    // ii. Call the Call internal method of callback with T as the this value and
                    // argument list containing kValue, k, and O.
                    callback.call(T, kValue, k, O);
                }
                // d. Increase k by 1.
                k++;
            }
            // 8. return undefined
        };
    }
    xdom.modernized = true;
}


//sessionStorage = (sessionStorage || {});

//var tabID = sessionStorage.tabID && sessionStorage.closedLastTab !== '2' ? sessionStorage.tabID : sessionStorage.tabID = Math.random();
//sessionStorage.closedLastTab = '2';
//$(window).on('unload beforeunload', function () {
//    sessionStorage.closedLastTab = '1';
//});

xdom.modernize();
