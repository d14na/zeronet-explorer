_initJquery() {
    /* Localize this. */
    const self = this

    const RNFS = require('react-native-fs')
    var path = RNFS.DocumentDirectoryPath + '/jquery.js'

    fetch('https://pastebin.com/raw/Cbx4VPD6')
        .then(result => result.text())
        .then(val => {
            RNFS.writeFile(path, val, 'utf8')
                .then((success) => {
                    self._webview.injectJavaScript(val)
                    console.info('jQuery successfully injected');
                    self._debugLog(self, `jQuery successfully injected`)

                    self._initIdenticon()

                    // Timer.setTimeout(self, 'testJquery', () => {
                    //     self._debugLog(self, `jQuery is STILL working after all this time [5sec]`)
                    //     self._testPastebin()
                    // }, 0)
                })
                .catch((err) => {
                    console.log(err.message);
                })
        })
}

_initIdenticon() {
    /* Localize this. */
    const self = this

    const RNFS = require('react-native-fs')
    var path = RNFS.DocumentDirectoryPath + '/identicon.js'

    fetch('https://pastebin.com/raw/32x72c2K')
        .then(result => result.text())
        .then(val => {
            RNFS.writeFile(path, val, 'utf8')
                .then((success) => {
                    self._webview.injectJavaScript(val)
                    console.info('Identicon successfully injected');
                    // self._debugLog(self, `Identicon successfully injected`)
                    self._initMarked()
                })
                .catch((err) => {
                    console.log(err.message);
                })
        })
}

_initMarked() {
    /* Localize this. */
    const self = this

    const RNFS = require('react-native-fs')
    var path = RNFS.DocumentDirectoryPath + '/marked.js'

    fetch('https://pastebin.com/raw/C6Ln7Sp3')
        .then(result => result.text())
        .then(val => {
            RNFS.writeFile(path, val, 'utf8')
                .then((success) => {
                    self._webview.injectJavaScript(val)
                    console.info('Marked successfully injected');
                    // self._debugLog(self, `Marked successfully injected`)
                    self._initPngLib()
                })
                .catch((err) => {
                    console.log(err.message);
                })
        })
}

_initPngLib() {
    /* Localize this. */
    const self = this

    const RNFS = require('react-native-fs')
    var path = RNFS.DocumentDirectoryPath + '/pnglib.js'

    fetch('https://pastebin.com/raw/57FZ6thh')
        .then(result => result.text())
        .then(val => {
            RNFS.writeFile(path, val, 'utf8')
                .then((success) => {
                    self._webview.injectJavaScript(val)
                    console.info('PngLib successfully injected');
                    // self._debugLog(self, `PngLib successfully injected`)
                    self._initClass()
                })
                .catch((err) => {
                    console.log(err.message);
                })
        })
}

_initClass() {
    /* Localize this. */
    const self = this

    const RNFS = require('react-native-fs')
    var path = RNFS.DocumentDirectoryPath + '/Class.js'

    fetch('https://pastebin.com/raw/BsQabK6M')
        .then(result => result.text())
        .then(val => {
            RNFS.writeFile(path, val, 'utf8')
                .then((success) => {
                    self._webview.injectJavaScript(val)
                    console.info('Class successfully injected');
                    // self._debugLog(self, `Class successfully injected`)
                    self._initText()
                })
                .catch((err) => {
                    console.log(err.message);
                })
        })
}

_initText() {
    /* Localize this. */
    const self = this

    const RNFS = require('react-native-fs')
    var path = RNFS.DocumentDirectoryPath + '/Text.js'

    fetch('https://pastebin.com/raw/0G8fgLn8')
        .then(result => result.text())
        .then(val => {
            RNFS.writeFile(path, val, 'utf8')
                .then((success) => {
                    self._webview.injectJavaScript(val)
                    console.info('Text successfully injected');
                    // self._debugLog(self, `Text successfully injected`)
                    self._initTime()
                })
                .catch((err) => {
                    console.log(err.message);
                })
        })
}

_initTime() {
    /* Localize this. */
    const self = this

    const RNFS = require('react-native-fs')
    var path = RNFS.DocumentDirectoryPath + '/Time.js'

    fetch('https://pastebin.com/raw/kfjK1VPU')
        .then(result => result.text())
        .then(val => {
            RNFS.writeFile(path, val, 'utf8')
                .then((success) => {
                    self._webview.injectJavaScript(val)
                    console.info('Time successfully injected');
                    // self._debugLog(self, `Time successfully injected`)
                    self._initZeroFrame()
                })
                .catch((err) => {
                    console.log(err.message);
                })
        })
}

_initZeroFrame() {
    /* Localize this. */
    const self = this

    let val = `
    window.postMessage('hi, from OUTSIDE ZeroFrame');
    (function() {
      var ZeroFrame,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
        __hasProp = {}.hasOwnProperty;

      ZeroFrame = (function(_super) {
        __extends(ZeroFrame, _super);

        function ZeroFrame(url) {
          this.onCloseWebsocket = __bind(this.onCloseWebsocket, this);
          this.onOpenWebsocket = __bind(this.onOpenWebsocket, this);
          this.onRequest = __bind(this.onRequest, this);
          this.onMessage = __bind(this.onMessage, this);
          this.url = url;
          this.waiting_cb = {};
          this.connect();
          this.next_message_id = 1;
          this.init();
        }

        ZeroFrame.prototype.init = function() {
          return this;
        };

        ZeroFrame.prototype.connect = function() {
          this.target = window;
          /* this.target = window.parent; */
          window.addEventListener("message", this.onMessage, false);
          return this.cmd("innerReady");
        };

        ZeroFrame.prototype.onMessage = function(e) {
          var cmd, message;
          message = e.data;
          cmd = message.cmd;

          if (cmd === "response") {
            if (this.waiting_cb[message.to] != null) {
window.postMessage('\n\n**WEBVIEW** ' + JSON.stringify(message).slice(0, 50));
/*window.postMessage('\n\n**WEBVIEW** ' + typeof(this.waiting_cb[message.to]) + ' | ' + message.to);*/
              return this.waiting_cb[message.to](message.result);
            } else {
              return this.log("Websocket callback not found:", message);
            }
          } else if (cmd === "wrapperReady") {
            return this.cmd("innerReady");
          } else if (cmd === "ping") {
            return this.response(message.id, "pong");
          } else if (cmd === "wrapperOpenedWebsocket") {
            return this.onOpenWebsocket();
          } else if (cmd === "wrapperClosedWebsocket") {
            return this.onCloseWebsocket();
          } else {
            return this.onRequest(cmd, message);
          }
        };

        ZeroFrame.prototype.onRequest = function(cmd, message) {
          return this.log("Unknown request", message);
        };

        ZeroFrame.prototype.cmd = function(cmd, params, cb) {
          if (params == null) {
            params = {};
          }
          if (cb == null) {
            cb = null;
          }
          return this.send({
            "cmd": cmd,
            "params": params
          }, cb);
        };

        ZeroFrame.prototype.send = function(message, cb) {
          if (cb == null) {
            cb = null;
          }
          message.id = this.next_message_id;
          this.next_message_id += 1;

          window.postMessage(JSON.stringify(message));
          /* this.target.postMessage(message, "*"); */
          if (cb) {
            return this.waiting_cb[message.id] = cb;
          }
        };

        ZeroFrame.prototype.onOpenWebsocket = function() {
          return this.log("Websocket open");
        };

        ZeroFrame.prototype.onCloseWebsocket = function() {
          return this.log("Websocket close");
        };

        return ZeroFrame;

      })(Class);

      window.ZeroFrame = ZeroFrame;

    }).call(this);
    `
    self._webview.injectJavaScript(val)
    console.info('ZeroFrame successfully injected');
    // self._debugLog(self, `ZeroFrame successfully injected`)
    self._initZeroBlog()

    return

    const RNFS = require('react-native-fs')
    var path = RNFS.DocumentDirectoryPath + '/ZeroFrame.js'

    fetch('https://pastebin.com/raw/PWjUFVsA')
        .then(result => result.text())
        .then(val => {
            RNFS.writeFile(path, val, 'utf8')
                .then((success) => {
                    self._webview.injectJavaScript(val)
                    console.info('ZeroFrame successfully injected');
                    // self._debugLog(self, `ZeroFrame successfully injected`)
                    self._initZeroBlog()
                })
                .catch((err) => {
                    console.log(err.message);
                })
        })
}

_initZeroBlog() {
    /* Localize this. */
    const self = this

    let val = `
    (function() {
      var ZeroBlog,
        __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
        __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
        __hasProp = {}.hasOwnProperty;

      ZeroBlog = (function(_super) {
        __extends(ZeroBlog, _super);

        function ZeroBlog() {
          this.setSiteinfo = __bind(this.setSiteinfo, this);
          this.actionSetSiteInfo = __bind(this.actionSetSiteInfo, this);
          this.submitPostVote = __bind(this.submitPostVote, this);
          this.saveContent = __bind(this.saveContent, this);
          this.getContent = __bind(this.getContent, this);
          this.getObject = __bind(this.getObject, this);
          this.onOpenWebsocket = __bind(this.onOpenWebsocket, this);
          this.publish = __bind(this.publish, this);
          this.pageLoaded = __bind(this.pageLoaded, this);
          return ZeroBlog.__super__.constructor.apply(this, arguments);
        }

        ZeroBlog.prototype.init = function() {
            this.data = null;
            this.site_info = null;
            this.server_info = null;
            this.page = 1;
            this.my_post_votes = {};
/*
            this.event_site_info = $.Deferred();

            $.when(this.event_site_info).done((function(_this) {
window.postMessage('HEY HEY HEY, Deferred IS WORKING!!!');
                return function() {
                    var imagedata;
                    _this.log("event site info");
                    imagedata = new Identicon(_this.site_info.address, 70).toString();
                    $("body").append("<style>.avatar { background-image: url(data:image/png;base64," + imagedata + ") }</style>");
                    return _this.initFollowButton();
                };
            })(this));
*/

            return this.log("inited!");
        };

        ZeroBlog.prototype.initFollowButton = function() {};

        ZeroBlog.prototype.loadData = function(query) {
            query = "SELECT key, value FROM json LEFT JOIN keyvalue USING (json_id) WHERE directory = '' AND file_name = 'data.json'";

            return this.cmd("dbQuery", [query], (function(_this) {
                return function(res) {
                    var row, _i, _len;

                    _this.data = {};

                    if (res) {
                        for (_i = 0, _len = res.length; _i < _len; _i++) {
                            row = res[_i];
                            _this.data[row.key] = row.value;
                        }

                        if (_this.data.title) {
                            $(".left h1 a:not(.editable-edit)").html(_this.data.title).data("content", _this.data.title);
                        }

                        if (_this.data.description) {
                            $(".left h2").html(Text.renderMarked(_this.data.description)).data("content", _this.data.description);
                        }

                        if (_this.data.links) {
                            return $(".left .links").html(Text.renderMarked(_this.data.links)).data("content", _this.data.links);
                        }
                    }
                };
            })(this));
        };

        ZeroBlog.prototype.loadLastcomments = function(type, cb) {};

        ZeroBlog.prototype.applyPagerdata = function(page, limit, has_next) {};

        ZeroBlog.prototype.routeUrl = function(url) {
            $("body").addClass("page-main");
            return this.pageMain();
        };

        ZeroBlog.prototype.pageMain = function() {
            var limit, query;

            limit = 15;

            query = "SELECT\n	post.*, COUNT(comment_id) AS comments,\n	(SELECT COUNT(*) FROM post_vote WHERE post_vote.post_id = post.post_id) AS votes\nFROM post\nLEFT JOIN comment USING (post_id)\nGROUP BY post_id\nORDER BY date_published DESC\nLIMIT " + ((this.page - 1) * limit) + ", " + (limit + 1);

            return this.cmd("dbQuery", [query], (function(_this) {
                return function(res) {
                    var parse_res;

window.postMessage('HEY HEY HEY, FINAL dbQuery ' + JSON.stringify(res).length);
                    parse_res = function(res) {
                        var elem, post, s, _i, _len;
                        s = +(new Date);
                        if (res.length > limit) {
                            res.pop();
                            _this.applyPagerdata(_this.page, limit, true);
                        } else {
                            _this.applyPagerdata(_this.page, limit, false);
                        }

                        res.reverse();

                        for (_i = 0, _len = res.length; _i < _len; _i++) {
                            post = res[_i];
                            elem = $("#post_" + post.post_id);

                            if (elem.length === 0) {
                                elem = $(".post.template").clone().removeClass("template").attr("id", "post_" + post.post_id);
                                elem.prependTo(".posts");
                                elem.find(".like").attr("id", "post_like_" + post.post_id).off("click").on("click", _this.submitPostVote);
                            }

                            _this.applyPostdata(elem, post);
                        }

                        _this.pageLoaded();
                    };

                    if (res.error) {
                        query = "SELECT\n	post.*, COUNT(comment_id) AS comments,\n	-1 AS votes\nFROM post\nLEFT JOIN comment USING (post_id)\nGROUP BY post_id\nORDER BY date_published DESC\nLIMIT " + ((_this.page - 1) * limit) + ", " + (limit + 1);
                        return _this.cmd("dbQuery", [query], parse_res);
                    } else {
                        return parse_res(res);
                    }
                };
            })(this));
        };

        ZeroBlog.prototype.pageLoaded = function() {
            $("body").addClass("loaded");
            /* return this.cmd("innerLoaded", true); */
        };

        ZeroBlog.prototype.addImageZoom = function(parent) {};

        ZeroBlog.prototype.applyPostdata = function(elem, post, full) {
            var body, date_published, title_hash;

            if (full == null) {
                full = false;
            }

            title_hash = post.title.replace(/[#?& ]/g, "+").replace(/[+]+/g, "+");

            elem.data("object", "Post:" + post.post_id);

            $(".title .editable", elem).html(post.title).attr("href", "?Post:" + post.post_id + ":" + title_hash).data("content", post.title);

            date_published = Time.since(post.date_published);

            if (post.body.match(/^---/m)) {
                date_published += " &middot; " + (Time.readtime(post.body));
                $(".more", elem).css("display", "inline-block").attr("href", "?Post:" + post.post_id + ":" + title_hash);
            }

            $(".details .published", elem).html(date_published).data("content", post.date_published);

            if (post.comments > 0) {
                $(".details .comments-num", elem).css("display", "inline").attr("href", "?Post:" + post.post_id + ":" + title_hash + "#Comments");

                if (post.comments > 1) {
                    $(".details .comments-num .num", elem).text(post.comments + " comments");
                } else {
                    $(".details .comments-num .num", elem).text(post.comments + " comment");
                }
            } else {
                $(".details .comments-num", elem).css("display", "none");
            }

            if (post.votes > 0) {
                $(".like .num", elem).text(post.votes);
            } else if (post.votes === -1) {
                $(".like", elem).css("display", "none");
            } else {
                $(".like .num", elem).text("");
            }

            if (this.my_post_votes[post.post_id]) {
                $(".like", elem).addClass("active");
            }

            if (full) {
                body = post.body;
            } else {
                body = post.body.replace(/^([\s\S]*?)\n---\n[\s\S]*$/, "$1");
            }

            if ($(".body", elem).data("content") !== post.body) {
                $(".body", elem).html(Text.renderMarked(body)).data("content", post.body);
                return this.addImageZoom(elem);
            }
        };

        ZeroBlog.prototype.onOpenWebsocket = function(e) {
            this.loadData();

            return this.cmd("siteInfo", {}, (function(_this) {
                return function(site_info) {
/* window.postMessage('HEY HEY HEY, THIS IS siteInfo'); */
                    var query_my_votes;

                    _this.setSiteinfo(site_info);
/* window.postMessage('HEY HEY HEY, LOOKS LIKE EVERYTHING IS SET!'); */
                    query_my_votes = "SELECT\n	'post_vote' AS type,\n	post_id AS uri\nFROM json\nLEFT JOIN post_vote USING (json_id)\nWHERE directory = 'users/" + _this.site_info.auth_address + "' AND file_name = 'data.json'";

/* window.postMessage('HEY HEY HEY, siteInfo is calling dbQuery with ' + JSON.stringify([query_my_votes])); */
                    _this.cmd("dbQuery", [query_my_votes], function(res) {
/*window.postMessage('HEY HEY HEY, siteInfo IS BACK from its 2nd query!');*/
                        var row, _i, _len;

                        for (_i = 0, _len = res.length; _i < _len; _i++) {
                            row = res[_i];
                            _this.my_post_votes[row["uri"]] = 1;
                        }

                        return _this.routeUrl(window.location.search.substring(1));
                    });

                    return _this.loadLastcomments("noanim");
                };
            })(this));
        };

        ZeroBlog.prototype.setSiteinfo = function(site_info) {
            var mentions_menu_elem, _ref, _ref1, _ref2;

            this.site_info = site_info;

window.postMessage('HEY HEY HEY, this.event_site_info.resolve(site_info)');
            /*this.event_site_info.resolve(site_info);*/

            (function(_this) {
                return function() {
                    var imagedata;
                    _this.log("event site info");
                    imagedata = new Identicon(_this.site_info.address, 70).toString();
                    $("body").append("<style>.avatar { background-image: url(data:image/png;base64," + imagedata + ") }</style>");
                    return _this.initFollowButton();
                };
            })(this);

            if ($("body").hasClass("page-post")) {
                Comments.checkCert();
            }

            if (((_ref = site_info.event) != null ? _ref[0] : void 0) === "file_done" && site_info.event[1].match(/.*users.*data.json$/)) {
                if ($("body").hasClass("page-post")) {
                    this.pagePost();
                    Comments.loadComments();
                    this.loadLastcomments();
                }

                if ($("body").hasClass("page-main")) {
                    return RateLimit(500, (function(_this) {
                        return function() {
                            _this.pageMain();
                            return _this.loadLastcomments();
                        };
                    })(this));
                }
            } else if (((_ref1 = site_info.event) != null ? _ref1[0] : void 0) === "file_done" && site_info.event[1] === "data/data.json") {
                this.loadData();

                if ($("body").hasClass("page-main")) {
                    this.pageMain();
                }

                if ($("body").hasClass("page-post")) {
                    return this.pagePost();
                }
            } else if (((_ref2 = site_info.event) != null ? _ref2[0] : void 0) === "cert_changed" && site_info.cert_user_id) {
                this.initFollowButton();

                mentions_menu_elem = this.follow.feeds["Username mentions"][1];

                return setTimeout(((function(_this) {
                    return function() {
                        if (!mentions_menu_elem.hasClass("selected")) {
                            return mentions_menu_elem.trigger("click");
                        }
                    };
                })(this)), 100);
            }
        };

        return ZeroBlog;

      })(ZeroFrame);

      window.Page = new ZeroBlog();

    }).call(this);
    `
    self._webview.injectJavaScript(val)
    console.info('ZeroBlog successfully injected');
    // self._debugLog(self, `ZeroBlog successfully injected`)

    return

    const RNFS = require('react-native-fs')
    var path = RNFS.DocumentDirectoryPath + '/ZeroBlog.js'

    fetch('https://pastebin.com/raw/WqYH9exp')
        .then(result => result.text())
        .then(val => {
            RNFS.writeFile(path, val, 'utf8')
                .then((success) => {
                    self._webview.injectJavaScript(val)
                    console.info('ZeroBlog successfully injected');
                    self._debugLog(self, `ZeroBlog successfully injected`)
                    // self._initNext()
                })
                .catch((err) => {
                    console.log(err.message);
                })
        })
}

_testPastebin() {
    /* Localize this. */
    const self = this

    const RNFS = require('react-native-fs')
    var path = RNFS.DocumentDirectoryPath + '/Pastebin.js'

    fetch('https://pastebin.com/raw/AAmuGGXP')
        .then(result => result.text())
        .then(val => {
            RNFS.writeFile(path, val, 'utf8')
                .then((success) => {
                    self._webview.injectJavaScript(val)
                    console.log('Pastebin successfully injected');
                    self._debugLog(self, `Pastebin successfully injected`)
                    // self._initNext()
                })
                .catch((err) => {
                    console.log(err.message);
                })
        })
}
