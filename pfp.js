(self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[951], {
    2269: (e, t, s) => {
        "use strict";
        var n = s(9509);
        s(8375);
        var i = s(2115)
          , r = function(e) {
            return e && "object" == typeof e && "default"in e ? e : {
                default: e
            }
        }(i)
          , c = void 0 !== n && n.env && !0
          , a = function(e) {
            return "[object String]" === Object.prototype.toString.call(e)
        }
          , o = function() {
            function e(e) {
                var t = void 0 === e ? {} : e
                  , s = t.name
                  , n = void 0 === s ? "stylesheet" : s
                  , i = t.optimizeForSpeed
                  , r = void 0 === i ? c : i;
                l(a(n), "`name` must be a string"),
                this._name = n,
                this._deletedRulePlaceholder = "#" + n + "-deleted-rule____{}",
                l("boolean" == typeof r, "`optimizeForSpeed` must be a boolean"),
                this._optimizeForSpeed = r,
                this._serverSheet = void 0,
                this._tags = [],
                this._injected = !1,
                this._rulesCount = 0;
                var o = "undefined" != typeof window && document.querySelector('meta[property="csp-nonce"]');
                this._nonce = o ? o.getAttribute("content") : null
            }
            var t, s = e.prototype;
            return s.setOptimizeForSpeed = function(e) {
                l("boolean" == typeof e, "`setOptimizeForSpeed` accepts a boolean"),
                l(0 === this._rulesCount, "optimizeForSpeed cannot be when rules have already been inserted"),
                this.flush(),
                this._optimizeForSpeed = e,
                this.inject()
            }
            ,
            s.isOptimizeForSpeed = function() {
                return this._optimizeForSpeed
            }
            ,
            s.inject = function() {
                var e = this;
                if (l(!this._injected, "sheet already injected"),
                this._injected = !0,
                "undefined" != typeof window && this._optimizeForSpeed) {
                    this._tags[0] = this.makeStyleTag(this._name),
                    this._optimizeForSpeed = "insertRule"in this.getSheet(),
                    this._optimizeForSpeed || (c || console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),
                    this.flush(),
                    this._injected = !0);
                    return
                }
                this._serverSheet = {
                    cssRules: [],
                    insertRule: function(t, s) {
                        return "number" == typeof s ? e._serverSheet.cssRules[s] = {
                            cssText: t
                        } : e._serverSheet.cssRules.push({
                            cssText: t
                        }),
                        s
                    },
                    deleteRule: function(t) {
                        e._serverSheet.cssRules[t] = null
                    }
                }
            }
            ,
            s.getSheetForTag = function(e) {
                if (e.sheet)
                    return e.sheet;
                for (var t = 0; t < document.styleSheets.length; t++)
                    if (document.styleSheets[t].ownerNode === e)
                        return document.styleSheets[t]
            }
            ,
            s.getSheet = function() {
                return this.getSheetForTag(this._tags[this._tags.length - 1])
            }
            ,
            s.insertRule = function(e, t) {
                if (l(a(e), "`insertRule` accepts only strings"),
                "undefined" == typeof window)
                    return "number" != typeof t && (t = this._serverSheet.cssRules.length),
                    this._serverSheet.insertRule(e, t),
                    this._rulesCount++;
                if (this._optimizeForSpeed) {
                    var s = this.getSheet();
                    "number" != typeof t && (t = s.cssRules.length);
                    try {
                        s.insertRule(e, t)
                    } catch (t) {
                        return c || console.warn("StyleSheet: illegal rule: \n\n" + e + "\n\nSee https://stackoverflow.com/q/20007992 for more info"),
                        -1
                    }
                } else {
                    var n = this._tags[t];
                    this._tags.push(this.makeStyleTag(this._name, e, n))
                }
                return this._rulesCount++
            }
            ,
            s.replaceRule = function(e, t) {
                if (this._optimizeForSpeed || "undefined" == typeof window) {
                    var s = "undefined" != typeof window ? this.getSheet() : this._serverSheet;
                    if (t.trim() || (t = this._deletedRulePlaceholder),
                    !s.cssRules[e])
                        return e;
                    s.deleteRule(e);
                    try {
                        s.insertRule(t, e)
                    } catch (n) {
                        c || console.warn("StyleSheet: illegal rule: \n\n" + t + "\n\nSee https://stackoverflow.com/q/20007992 for more info"),
                        s.insertRule(this._deletedRulePlaceholder, e)
                    }
                } else {
                    var n = this._tags[e];
                    l(n, "old rule at index `" + e + "` not found"),
                    n.textContent = t
                }
                return e
            }
            ,
            s.deleteRule = function(e) {
                if ("undefined" == typeof window)
                    return void this._serverSheet.deleteRule(e);
                if (this._optimizeForSpeed)
                    this.replaceRule(e, "");
                else {
                    var t = this._tags[e];
                    l(t, "rule at index `" + e + "` not found"),
                    t.parentNode.removeChild(t),
                    this._tags[e] = null
                }
            }
            ,
            s.flush = function() {
                this._injected = !1,
                this._rulesCount = 0,
                "undefined" != typeof window ? (this._tags.forEach(function(e) {
                    return e && e.parentNode.removeChild(e)
                }),
                this._tags = []) : this._serverSheet.cssRules = []
            }
            ,
            s.cssRules = function() {
                var e = this;
                return "undefined" == typeof window ? this._serverSheet.cssRules : this._tags.reduce(function(t, s) {
                    return s ? t = t.concat(Array.prototype.map.call(e.getSheetForTag(s).cssRules, function(t) {
                        return t.cssText === e._deletedRulePlaceholder ? null : t
                    })) : t.push(null),
                    t
                }, [])
            }
            ,
            s.makeStyleTag = function(e, t, s) {
                t && l(a(t), "makeStyleTag accepts only strings as second parameter");
                var n = document.createElement("style");
                this._nonce && n.setAttribute("nonce", this._nonce),
                n.type = "text/css",
                n.setAttribute("data-" + e, ""),
                t && n.appendChild(document.createTextNode(t));
                var i = document.head || document.getElementsByTagName("head")[0];
                return s ? i.insertBefore(n, s) : i.appendChild(n),
                n
            }
            ,
            t = [{
                key: "length",
                get: function() {
                    return this._rulesCount
                }
            }],
            function(e, t) {
                for (var s = 0; s < t.length; s++) {
                    var n = t[s];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(e, n.key, n)
                }
            }(e.prototype, t),
            e
        }();
        function l(e, t) {
            if (!e)
                throw Error("StyleSheet: " + t + ".")
        }
        var d = function(e) {
            for (var t = 5381, s = e.length; s; )
                t = 33 * t ^ e.charCodeAt(--s);
            return t >>> 0
        }
          , h = {};
        function u(e, t) {
            if (!t)
                return "jsx-" + e;
            var s = String(t)
              , n = e + s;
            return h[n] || (h[n] = "jsx-" + d(e + "-" + s)),
            h[n]
        }
        function f(e, t) {
            "undefined" == typeof window && (t = t.replace(/\/style/gi, "\\/style"));
            var s = e + t;
            return h[s] || (h[s] = t.replace(/__jsx-style-dynamic-selector/g, e)),
            h[s]
        }
        var m = function() {
            function e(e) {
                var t = void 0 === e ? {} : e
                  , s = t.styleSheet
                  , n = void 0 === s ? null : s
                  , i = t.optimizeForSpeed
                  , r = void 0 !== i && i;
                this._sheet = n || new o({
                    name: "styled-jsx",
                    optimizeForSpeed: r
                }),
                this._sheet.inject(),
                n && "boolean" == typeof r && (this._sheet.setOptimizeForSpeed(r),
                this._optimizeForSpeed = this._sheet.isOptimizeForSpeed()),
                this._fromServer = void 0,
                this._indices = {},
                this._instancesCounts = {}
            }
            var t = e.prototype;
            return t.add = function(e) {
                var t = this;
                void 0 === this._optimizeForSpeed && (this._optimizeForSpeed = Array.isArray(e.children),
                this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),
                this._optimizeForSpeed = this._sheet.isOptimizeForSpeed()),
                "undefined" == typeof window || this._fromServer || (this._fromServer = this.selectFromServer(),
                this._instancesCounts = Object.keys(this._fromServer).reduce(function(e, t) {
                    return e[t] = 0,
                    e
                }, {}));
                var s = this.getIdAndRules(e)
                  , n = s.styleId
                  , i = s.rules;
                if (n in this._instancesCounts) {
                    this._instancesCounts[n] += 1;
                    return
                }
                var r = i.map(function(e) {
                    return t._sheet.insertRule(e)
                }).filter(function(e) {
                    return -1 !== e
                });
                this._indices[n] = r,
                this._instancesCounts[n] = 1
            }
            ,
            t.remove = function(e) {
                var t = this
                  , s = this.getIdAndRules(e).styleId;
                if (function(e, t) {
                    if (!e)
                        throw Error("StyleSheetRegistry: " + t + ".")
                }(s in this._instancesCounts, "styleId: `" + s + "` not found"),
                this._instancesCounts[s] -= 1,
                this._instancesCounts[s] < 1) {
                    var n = this._fromServer && this._fromServer[s];
                    n ? (n.parentNode.removeChild(n),
                    delete this._fromServer[s]) : (this._indices[s].forEach(function(e) {
                        return t._sheet.deleteRule(e)
                    }),
                    delete this._indices[s]),
                    delete this._instancesCounts[s]
                }
            }
            ,
            t.update = function(e, t) {
                this.add(t),
                this.remove(e)
            }
            ,
            t.flush = function() {
                this._sheet.flush(),
                this._sheet.inject(),
                this._fromServer = void 0,
                this._indices = {},
                this._instancesCounts = {}
            }
            ,
            t.cssRules = function() {
                var e = this
                  , t = this._fromServer ? Object.keys(this._fromServer).map(function(t) {
                    return [t, e._fromServer[t]]
                }) : []
                  , s = this._sheet.cssRules();
                return t.concat(Object.keys(this._indices).map(function(t) {
                    return [t, e._indices[t].map(function(e) {
                        return s[e].cssText
                    }).join(e._optimizeForSpeed ? "" : "\n")]
                }).filter(function(e) {
                    return !!e[1]
                }))
            }
            ,
            t.styles = function(e) {
                var t, s;
                return t = this.cssRules(),
                void 0 === (s = e) && (s = {}),
                t.map(function(e) {
                    var t = e[0]
                      , n = e[1];
                    return r.default.createElement("style", {
                        id: "__" + t,
                        key: "__" + t,
                        nonce: s.nonce ? s.nonce : void 0,
                        dangerouslySetInnerHTML: {
                            __html: n
                        }
                    })
                })
            }
            ,
            t.getIdAndRules = function(e) {
                var t = e.children
                  , s = e.dynamic
                  , n = e.id;
                if (s) {
                    var i = u(n, s);
                    return {
                        styleId: i,
                        rules: Array.isArray(t) ? t.map(function(e) {
                            return f(i, e)
                        }) : [f(i, t)]
                    }
                }
                return {
                    styleId: u(n),
                    rules: Array.isArray(t) ? t : [t]
                }
            }
            ,
            t.selectFromServer = function() {
                return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e, t) {
                    return e[t.id.slice(2)] = t,
                    e
                }, {})
            }
            ,
            e
        }()
          , p = i.createContext(null);
        p.displayName = "StyleSheetContext";
        var x = r.default.useInsertionEffect || r.default.useLayoutEffect
          , g = "undefined" != typeof window ? new m : void 0;
        function j(e) {
            var t = g || i.useContext(p);
            return t && ("undefined" == typeof window ? t.add(e) : x(function() {
                return t.add(e),
                function() {
                    t.remove(e)
                }
            }, [e.id, String(e.dynamic)])),
            null
        }
        j.dynamic = function(e) {
            return e.map(function(e) {
                return u(e[0], e[1])
            }).join(" ")
        }
        ,
        t.style = j
    }
    ,
    2770: (e, t, s) => {
        "use strict";
        s.d(t, {
            A: () => a
        });
        var n = s(5155)
          , i = s(6874)
          , r = s.n(i)
          , c = s(2115);
        function a() {
            let[e,t] = (0,
            c.useState)(!1);
            return (0,
            n.jsx)("nav", {
                className: "navbar",
                children: (0,
                n.jsxs)("div", {
                    className: "navbar-content",
                    children: [(0,
                    n.jsxs)("div", {
                        className: "navbar-logo-section",
                        children: [(0,
                        n.jsx)(r(), {
                            href: "/",
                            className: "logo",
                            children: "$NEET"
                        }), (0,
                        n.jsx)("button", {
                            className: "mobile-menu-button",
                            onClick: () => {
                                t(!e)
                            }
                            ,
                            "aria-label": "Toggle menu",
                            children: e ? "✕" : "☰"
                        })]
                    }), (0,
                    n.jsxs)("div", {
                        className: "nav-links ".concat(e ? "nav-active" : ""),
                        children: [(0,
                        n.jsx)(r(), {
                            href: "https://x.com/neet_sol",
                            target: "_blank",
                            className: "nav-link",
                            children: "Twitter"
                        }), (0,
                        n.jsx)(r(), {
                            href: "https://dexscreener.com/solana/5wnu5qhdprgrl37ffcd6tmmqzugqgxwafgz477rshthy",
                            target: "_blank",
                            className: "nav-link",
                            children: "Dexscreener"
                        }), (0,
                        n.jsx)(r(), {
                            href: "https://jup.ag/swap/SOL-Ce2gx9KGXJ6C9Mp5b5x1sn9Mg87JwEbrQby4Zqo3pump",
                            target: "_blank",
                            className: "nav-link",
                            children: "Jupiter"
                        }), (0,
                        n.jsx)(r(), {
                            href: "https://www.reddit.com/r/antiwork/",
                            target: "_blank",
                            className: "nav-link",
                            children: "Careers"
                        }), (0,
                        n.jsx)(r(), {
                            href: "https://shop.neetcoin.xyz/",
                            target: "_blank",
                            className: "nav-link",
                            children: "Merch"
                        })]
                    })]
                })
            })
        }
    }
    ,
    4663: (e, t, s) => {
        "use strict";
        s.r(t),
        s.d(t, {
            default: () => h
        });
        var n = s(5155)
          , i = s(9137)
          , r = s.n(i)
          , c = s(2115);
        let a = [{
            id: "neet-hat",
            name: "NEET Hat",
            imagePath: "/IMG_5713.PNG"
        }, {
            id: "neet-hat-jean",
            name: "NEET Hat (jean)",
            imagePath: "/IMG_5939.PNG"
        }]
          , o = () => {
            let[e,t] = (0,
            c.useState)(null)
              , [s,i] = (0,
            c.useState)("#NOTOPENTOWORK")
              , [o,l] = (0,
            c.useState)("#808080")
              , [d,h] = (0,
            c.useState)("#ffffff")
              , [u,f] = (0,
            c.useState)(1.5)
              , [m,p] = (0,
            c.useState)(!0)
              , [x,g] = (0,
            c.useState)(!1)
              , [j,v] = (0,
            c.useState)(a[0].id)
              , [b,y] = (0,
            c.useState)(.5)
              , [S,N] = (0,
            c.useState)({
                x: 0,
                y: -30
            })
              , [_,w] = (0,
            c.useState)(0)
              , [R,C] = (0,
            c.useState)({})
              , [k,E] = (0,
            c.useState)(!1)
              , [F,T] = (0,
            c.useState)({
                x: 0,
                y: 0
            })
              , z = (0,
            c.useRef)(null)
              , O = (0,
            c.useRef)(null)
              , I = (0,
            c.useRef)(null)
              , A = (0,
            c.useRef)(null);
            (0,
            c.useEffect)( () => {
                let e = {};
                a.forEach(t => {
                    let s = new Image;
                    s.src = t.imagePath,
                    s.onload = () => {
                        e[t.id] = s,
                        C(e => ({
                            ...e,
                            [t.id]: s
                        }))
                    }
                    ,
                    s.onerror = e => {
                        console.error("Error loading hat image ".concat(t.imagePath, ":"), e)
                    }
                }
                )
            }
            , []);
            let P = e => {
                p("ring" === e.target.value)
            }
            ;
            (0,
            c.useEffect)( () => {
                let e = e => {
                    k && N({
                        x: e.clientX - F.x,
                        y: e.clientY - F.y
                    })
                }
                  , t = e => {
                    if (k) {
                        let t = e.touches[0];
                        N({
                            x: t.clientX - F.x,
                            y: t.clientY - F.y
                        })
                    }
                }
                  , s = () => {
                    E(!1)
                }
                ;
                return k && (document.addEventListener("mousemove", e),
                document.addEventListener("touchmove", t, {
                    passive: !1
                }),
                document.addEventListener("mouseup", s),
                document.addEventListener("touchend", s)),
                () => {
                    document.removeEventListener("mousemove", e),
                    document.removeEventListener("touchmove", t),
                    document.removeEventListener("mouseup", s),
                    document.removeEventListener("touchend", s)
                }
            }
            , [k, F]);
            let L = ( () => {
                var e;
                if (!R[j])
                    return {
                        width: 0,
                        height: 0
                    };
                let t = R[j]
                  , s = t.height / t.width
                  , n = null == (e = z.current) ? void 0 : e.parentElement;
                if (!n)
                    return {
                        width: 0,
                        height: 0
                    };
                let i = n.clientWidth * b;
                return {
                    width: i,
                    height: i * s
                }
            }
            )();
            return (0,
            n.jsxs)("div", {
                className: "jsx-5fc0c920b9c85885 profile-badge-generator",
                children: [(0,
                n.jsxs)("div", {
                    className: "jsx-5fc0c920b9c85885 badge-editor",
                    children: [(0,
                    n.jsx)("div", {
                        className: "jsx-5fc0c920b9c85885 image-preview",
                        children: (0,
                        n.jsxs)("div", {
                            className: "jsx-5fc0c920b9c85885 relative-container",
                            children: [e ? (0,
                            n.jsx)("img", {
                                ref: z,
                                src: e,
                                alt: "Profile",
                                className: "jsx-5fc0c920b9c85885 source-image"
                            }) : (0,
                            n.jsxs)("div", {
                                className: "jsx-5fc0c920b9c85885 placeholder-image",
                                children: [(0,
                                n.jsx)("p", {
                                    className: "jsx-5fc0c920b9c85885",
                                    children: "No Image Selected"
                                }), (0,
                                n.jsx)("p", {
                                    className: "jsx-5fc0c920b9c85885",
                                    children: "Upload a square image"
                                })]
                            }), e && x && R[j] && (0,
                            n.jsx)("div", {
                                ref: A,
                                style: {
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(calc(-50% + ".concat(S.x, "px), calc(-50% + ").concat(S.y, "px)) rotate(").concat(_, "deg)"),
                                    cursor: k ? "grabbing" : "grab",
                                    zIndex: 10,
                                    width: "".concat(L.width, "px"),
                                    height: "".concat(L.height, "px"),
                                    transition: k ? "none" : "transform 0.1s ease"
                                },
                                onMouseDown: e => {
                                    E(!0),
                                    T({
                                        x: e.clientX - S.x,
                                        y: e.clientY - S.y
                                    })
                                }
                                ,
                                onTouchStart: e => {
                                    E(!0);
                                    let t = e.touches[0];
                                    T({
                                        x: t.clientX - S.x,
                                        y: t.clientY - S.y
                                    })
                                }
                                ,
                                className: "jsx-5fc0c920b9c85885 " + "hat-overlay ".concat(k ? "dragging" : ""),
                                children: (0,
                                n.jsx)("img", {
                                    src: R[j].src,
                                    alt: "Hat overlay",
                                    style: {
                                        width: "100%",
                                        height: "100%",
                                        userSelect: "none",
                                        pointerEvents: "none"
                                    },
                                    className: "jsx-5fc0c920b9c85885"
                                })
                            }), (0,
                            n.jsx)("div", {
                                className: "jsx-5fc0c920b9c85885 svg-container",
                                children: (0,
                                n.jsxs)("svg", {
                                    width: "320",
                                    height: "320",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    xmlnsXlink: "http://www.w3.org/1999/xlink",
                                    ref: O,
                                    className: "jsx-5fc0c920b9c85885 badge-svg",
                                    children: [(0,
                                    n.jsx)("defs", {
                                        className: "jsx-5fc0c920b9c85885",
                                        children: (0,
                                        n.jsxs)("linearGradient", {
                                            id: "profileRingGradient",
                                            x1: "195",
                                            y1: "260",
                                            x2: "234",
                                            y2: "197",
                                            gradientUnits: "userSpaceOnUse",
                                            className: "jsx-5fc0c920b9c85885",
                                            children: [(0,
                                            n.jsx)("stop", {
                                                stopColor: o,
                                                className: "jsx-5fc0c920b9c85885"
                                            }), (0,
                                            n.jsx)("stop", {
                                                offset: "1",
                                                stopColor: "#000000",
                                                stopOpacity: "0",
                                                className: "jsx-5fc0c920b9c85885"
                                            })]
                                        })
                                    }), (0,
                                    n.jsx)("path", {
                                        d: "M 160 160 m -133.75, 0 a 133.75,133.75 0 1,0 267.5,0 a 133.75,133.75 0 1,0 -267.5,0",
                                        id: "profileRingTextPath",
                                        fill: "none",
                                        stroke: "url(#profileRingGradient)",
                                        strokeWidth: "52.5",
                                        className: "jsx-5fc0c920b9c85885"
                                    }), (0,
                                    n.jsx)("text", {
                                        dy: "0.3em",
                                        fontSize: "".concat(u, "em"),
                                        fontFamily: "'Carlito', sans-serif",
                                        fontWeight: "700",
                                        letterSpacing: "0.5px",
                                        className: "jsx-5fc0c920b9c85885",
                                        children: (0,
                                        n.jsx)("textPath", {
                                            style: {
                                                fill: d
                                            },
                                            startOffset: "2%",
                                            xlinkHref: "#profileRingTextPath",
                                            className: "jsx-5fc0c920b9c85885",
                                            children: s
                                        })
                                    })]
                                })
                            })]
                        })
                    }), (0,
                    n.jsxs)("div", {
                        className: "jsx-5fc0c920b9c85885 badge-controls",
                        children: [(0,
                        n.jsxs)("div", {
                            className: "jsx-5fc0c920b9c85885 control-group",
                            children: [(0,
                            n.jsx)("label", {
                                htmlFor: "fileUpload",
                                className: "jsx-5fc0c920b9c85885",
                                children: "Upload Profile Image"
                            }), (0,
                            n.jsx)("input", {
                                id: "fileUpload",
                                type: "file",
                                accept: "image/*",
                                onChange: e => {
                                    var s;
                                    let n = null == (s = e.target.files) ? void 0 : s[0];
                                    if (n) {
                                        let e = new FileReader;
                                        e.onload = e => {
                                            var s;
                                            (null == (s = e.target) ? void 0 : s.result) && t(e.target.result)
                                        }
                                        ,
                                        e.readAsDataURL(n)
                                    }
                                }
                                ,
                                className: "jsx-5fc0c920b9c85885 form-input"
                            })]
                        }), (0,
                        n.jsxs)("div", {
                            className: "jsx-5fc0c920b9c85885 control-group",
                            children: [(0,
                            n.jsx)("label", {
                                htmlFor: "textInput",
                                className: "jsx-5fc0c920b9c85885",
                                children: "Badge Text"
                            }), (0,
                            n.jsx)("input", {
                                type: "text",
                                id: "textInput",
                                value: s,
                                onChange: e => {
                                    i(e.target.value)
                                }
                                ,
                                placeholder: "#NotOpenToWork",
                                className: "jsx-5fc0c920b9c85885 form-input"
                            })]
                        }), (0,
                        n.jsxs)("div", {
                            className: "jsx-5fc0c920b9c85885 control-group",
                            children: [(0,
                            n.jsx)("label", {
                                className: "jsx-5fc0c920b9c85885",
                                children: "Badge Color"
                            }), (0,
                            n.jsxs)("div", {
                                className: "jsx-5fc0c920b9c85885 color-selector",
                                children: [(0,
                                n.jsxs)("div", {
                                    className: "jsx-5fc0c920b9c85885 radio-group",
                                    children: [(0,
                                    n.jsx)("input", {
                                        id: "ringRadio",
                                        type: "radio",
                                        name: "selection",
                                        value: "ring",
                                        checked: m,
                                        onChange: P,
                                        className: "jsx-5fc0c920b9c85885"
                                    }), (0,
                                    n.jsx)("label", {
                                        htmlFor: "ringRadio",
                                        className: "jsx-5fc0c920b9c85885",
                                        children: "Ring"
                                    }), (0,
                                    n.jsx)("input", {
                                        id: "textRadio",
                                        type: "radio",
                                        name: "selection",
                                        value: "text",
                                        checked: !m,
                                        onChange: P,
                                        className: "jsx-5fc0c920b9c85885"
                                    }), (0,
                                    n.jsx)("label", {
                                        htmlFor: "textRadio",
                                        className: "jsx-5fc0c920b9c85885",
                                        children: "Text"
                                    })]
                                }), (0,
                                n.jsx)("input", {
                                    type: "color",
                                    value: m ? o : d,
                                    onChange: e => {
                                        m ? l(e.target.value) : h(e.target.value)
                                    }
                                    ,
                                    className: "jsx-5fc0c920b9c85885 color-picker"
                                })]
                            })]
                        }), (0,
                        n.jsxs)("div", {
                            className: "jsx-5fc0c920b9c85885 control-group",
                            children: [(0,
                            n.jsx)("label", {
                                htmlFor: "fontSizeSlider",
                                className: "jsx-5fc0c920b9c85885",
                                children: "Font Size"
                            }), (0,
                            n.jsx)("input", {
                                type: "range",
                                id: "fontSizeSlider",
                                min: "1",
                                max: "2.5",
                                step: "0.1",
                                value: u,
                                onChange: e => {
                                    f(parseFloat(e.target.value))
                                }
                                ,
                                className: "jsx-5fc0c920b9c85885 slider-input"
                            }), (0,
                            n.jsx)("span", {
                                className: "jsx-5fc0c920b9c85885 slider-value",
                                children: u.toFixed(1)
                            })]
                        }), (0,
                        n.jsx)("div", {
                            className: "jsx-5fc0c920b9c85885 control-group",
                            children: (0,
                            n.jsxs)("div", {
                                className: "jsx-5fc0c920b9c85885 checkbox-label",
                                children: [(0,
                                n.jsx)("input", {
                                    id: "showHatCheckbox",
                                    type: "checkbox",
                                    checked: x,
                                    onChange: e => {
                                        g(e.target.checked)
                                    }
                                    ,
                                    className: "jsx-5fc0c920b9c85885"
                                }), (0,
                                n.jsx)("label", {
                                    htmlFor: "showHatCheckbox",
                                    className: "jsx-5fc0c920b9c85885",
                                    children: "Add Hat Overlay"
                                })]
                            })
                        }), x && (0,
                        n.jsxs)(n.Fragment, {
                            children: [(0,
                            n.jsxs)("div", {
                                className: "jsx-5fc0c920b9c85885 control-group",
                                children: [(0,
                                n.jsx)("label", {
                                    htmlFor: "hatSelector",
                                    className: "jsx-5fc0c920b9c85885",
                                    children: "Hat Style"
                                }), (0,
                                n.jsx)("select", {
                                    id: "hatSelector",
                                    value: j,
                                    onChange: e => {
                                        v(e.target.value)
                                    }
                                    ,
                                    className: "jsx-5fc0c920b9c85885 form-input",
                                    children: a.map(e => (0,
                                    n.jsx)("option", {
                                        value: e.id,
                                        className: "jsx-5fc0c920b9c85885",
                                        children: e.name
                                    }, e.id))
                                })]
                            }), (0,
                            n.jsxs)("div", {
                                className: "jsx-5fc0c920b9c85885 control-group",
                                children: [(0,
                                n.jsx)("label", {
                                    htmlFor: "hatScaleSlider",
                                    className: "jsx-5fc0c920b9c85885",
                                    children: "Hat Size"
                                }), (0,
                                n.jsx)("input", {
                                    type: "range",
                                    id: "hatScaleSlider",
                                    min: "0.2",
                                    max: "0.8",
                                    step: "0.05",
                                    value: b,
                                    onChange: e => {
                                        y(parseFloat(e.target.value))
                                    }
                                    ,
                                    className: "jsx-5fc0c920b9c85885 slider-input"
                                }), (0,
                                n.jsxs)("span", {
                                    className: "jsx-5fc0c920b9c85885 slider-value",
                                    children: [(100 * b).toFixed(0), "%"]
                                })]
                            }), (0,
                            n.jsxs)("div", {
                                className: "jsx-5fc0c920b9c85885 control-group",
                                children: [(0,
                                n.jsx)("label", {
                                    htmlFor: "hatRotationSlider",
                                    className: "jsx-5fc0c920b9c85885",
                                    children: "Hat Rotation"
                                }), (0,
                                n.jsx)("input", {
                                    type: "range",
                                    id: "hatRotationSlider",
                                    min: "-45",
                                    max: "45",
                                    value: _,
                                    onChange: e => {
                                        w(parseInt(e.target.value))
                                    }
                                    ,
                                    className: "jsx-5fc0c920b9c85885 slider-input"
                                }), (0,
                                n.jsxs)("span", {
                                    className: "jsx-5fc0c920b9c85885 slider-value",
                                    children: [_, "\xb0"]
                                })]
                            }), (0,
                            n.jsx)("div", {
                                className: "jsx-5fc0c920b9c85885 hat-positioning-tip",
                                children: (0,
                                n.jsx)("p", {
                                    className: "jsx-5fc0c920b9c85885",
                                    children: (0,
                                    n.jsx)("small", {
                                        className: "jsx-5fc0c920b9c85885",
                                        children: "Tip: Drag the hat to position it. Use the slider to adjust size."
                                    })
                                })
                            })]
                        }), (0,
                        n.jsx)("button", {
                            onClick: () => {
                                if (!I.current || !z.current || !O.current)
                                    return;
                                let e = I.current
                                  , t = e.getContext("2d");
                                if (!t)
                                    return;
                                if (e.width = 500,
                                e.height = 500,
                                t.drawImage(z.current, 0, 0, e.width, e.height),
                                x && R[j]) {
                                    let s = z.current.parentElement;
                                    if (!s)
                                        return;
                                    let n = s.getBoundingClientRect()
                                      , i = e.width / n.width;
                                    t.save();
                                    let r = (n.width / 2 + S.x) * i
                                      , c = (n.height / 2 + S.y) * i;
                                    t.translate(r, c),
                                    t.rotate(_ * Math.PI / 180);
                                    let a = R[j]
                                      , o = n.width * b * i
                                      , l = a.height / a.width * o;
                                    t.drawImage(a, -o / 2, -l / 2, o, l),
                                    t.restore()
                                }
                                let s = new Blob([new XMLSerializer().serializeToString(O.current)],{
                                    type: "image/svg+xml;charset=utf-8"
                                })
                                  , n = URL.createObjectURL(s)
                                  , i = new Image;
                                i.onload = () => {
                                    t.drawImage(i, 0, 0, e.width, e.height);
                                    let s = document.createElement("a");
                                    s.download = "neet-profile-badge.png",
                                    s.href = e.toDataURL("image/png"),
                                    s.click()
                                }
                                ,
                                i.src = n
                            }
                            ,
                            disabled: !e,
                            className: "jsx-5fc0c920b9c85885 download-button buy-button",
                            children: "Download Badge"
                        })]
                    })]
                }), (0,
                n.jsx)("canvas", {
                    ref: I,
                    style: {
                        display: "none"
                    },
                    className: "jsx-5fc0c920b9c85885"
                }), (0,
                n.jsxs)("div", {
                    className: "jsx-5fc0c920b9c85885 badge-instructions",
                    children: [(0,
                    n.jsx)("h4", {
                        className: "jsx-5fc0c920b9c85885",
                        children: "Instructions:"
                    }), (0,
                    n.jsxs)("ol", {
                        className: "jsx-5fc0c920b9c85885",
                        children: [(0,
                        n.jsx)("li", {
                            className: "jsx-5fc0c920b9c85885",
                            children: "Upload your profile picture"
                        }), (0,
                        n.jsx)("li", {
                            className: "jsx-5fc0c920b9c85885",
                            children: "Customize the badge text (default: #NotOpenToWork)"
                        }), (0,
                        n.jsx)("li", {
                            className: "jsx-5fc0c920b9c85885",
                            children: "Adjust colors and font size if needed"
                        }), (0,
                        n.jsx)("li", {
                            className: "jsx-5fc0c920b9c85885",
                            children: "Optionally add a hat by checking the hat option"
                        }), (0,
                        n.jsx)("li", {
                            className: "jsx-5fc0c920b9c85885",
                            children: "Drag to position the hat and use sliders to adjust size/rotation"
                        }), (0,
                        n.jsx)("li", {
                            className: "jsx-5fc0c920b9c85885",
                            children: "Download and use your new NEET profile badge"
                        })]
                    })]
                }), (0,
                n.jsx)(r(), {
                    id: "5fc0c920b9c85885",
                    children: ".hat-overlay.jsx-5fc0c920b9c85885{-ms-touch-action:-ms-none;-ms-touch-action:none;touch-action:none;-webkit-transform-origin:center;-moz-transform-origin:center;-ms-transform-origin:center;-o-transform-origin:center;transform-origin:center}.hat-overlay.dragging.jsx-5fc0c920b9c85885{opacity:.8}.hat-positioning-tip.jsx-5fc0c920b9c85885{margin-top:-5px;margin-bottom:10px;color:#aaa}"
                })]
            })
        }
        ;
        var l = s(8584)
          , d = s(2770);
        function h() {
            return (0,
            n.jsxs)("main", {
                children: [(0,
                n.jsx)(l.A, {}), (0,
                n.jsx)(d.A, {}), (0,
                n.jsxs)("div", {
                    className: "container",
                    children: [(0,
                    n.jsxs)("section", {
                        className: "profile-badge-section",
                        children: [(0,
                        n.jsxs)("h1", {
                            className: "section-title",
                            children: ["$NEET Profile Badge Generator ", (0,
                            n.jsx)("span", {
                                className: "blink",
                                children: "_"
                            })]
                        }), (0,
                        n.jsx)("p", {
                            className: "section-description",
                            children: "Show your anti-work status with a #NotOpenToWork profile badge. Perfect for declaring your NEET lifestyle on LinkedIn and other social media."
                        }), (0,
                        n.jsx)(o, {})]
                    }), (0,
                    n.jsx)("div", {
                        className: "divider"
                    }), (0,
                    n.jsxs)("section", {
                        className: "badge-faq",
                        children: [(0,
                        n.jsx)("h2", {
                            className: "section-title",
                            children: "FAQs"
                        }), (0,
                        n.jsxs)("div", {
                            className: "faq-item",
                            children: [(0,
                            n.jsx)("h3", {
                                children: "Why use a #NOTOPENTOWORK badge?"
                            }), (0,
                            n.jsx)("p", {
                                children: "Reject wage slavery openly by displaying your commitment to the NEET lifestyle. This badge is a clear signal that you've abandoned the rat race in favor of being a NEET."
                            })]
                        }), (0,
                        n.jsxs)("div", {
                            className: "faq-item",
                            children: [(0,
                            n.jsx)("h3", {
                                children: "How do I use this badge?"
                            }), (0,
                            n.jsx)("p", {
                                children: "Upload your profile picture, customize your badge, download it, and then set it as your profile picture on LinkedIn, Twitter, or any social platform where you want to declare your NEET status."
                            })]
                        }), (0,
                        n.jsxs)("div", {
                            className: "faq-item",
                            children: [(0,
                            n.jsx)("h3", {
                                children: "Will this hurt my career prospects?"
                            }), (0,
                            n.jsx)("p", {
                                children: 'Absolutely. That\'s the point. Embrace your NEET identity and stop worrying about "career prospects".'
                            })]
                        })]
                    }), (0,
                    n.jsx)("div", {
                        className: "divider"
                    }), (0,
                    n.jsxs)("footer", {
                        children: [(0,
                        n.jsx)("p", {
                            children: "\xa9 2025 $NEET. No rights reserved."
                        }), (0,
                        n.jsx)("p", {
                            children: "DISCLAIMER: None of the content on this website is financial advice. Every piece of information on this website is a work of satire unless it is specified otherwise. DYOR, don't be a retard."
                        }), (0,
                        n.jsxs)("p", {
                            children: ["Visitor count: ", (0,
                            n.jsx)("span", {
                                style: {
                                    fontFamily: "monospace"
                                },
                                children: "42069"
                            })]
                        })]
                    })]
                })]
            })
        }
    }
    ,
    8375: () => {}
    ,
    8584: (e, t, s) => {
        "use strict";
        s.d(t, {
            A: () => r
        });
        var n = s(5155)
          , i = s(2115);
        function r() {
            let e = "Ce2gx9KGXJ6C9Mp5b5x1sn9Mg87JwEbrQby4Zqo3pump"
              , [t,s] = (0,
            i.useState)(!1);
            return (0,
            n.jsxs)("div", {
                className: "contract-banner",
                onClick: () => {
                    navigator.clipboard.writeText(e),
                    s(!0),
                    setTimeout( () => s(!1), 2e3)
                }
                ,
                children: [(0,
                n.jsxs)("div", {
                    className: "scrolling-text",
                    children: ["CA: ", e, " - CLICK TO COPY"]
                }), t && (0,
                n.jsx)("div", {
                    className: "copy-alert",
                    children: "Copied to clipboard!"
                })]
            })
        }
    }
    ,
    8978: (e, t, s) => {
        Promise.resolve().then(s.bind(s, 4663))
    }
    ,
    9137: (e, t, s) => {
        "use strict";
        e.exports = s(2269).style
    }
}, e => {
    var t = t => e(e.s = t);
    e.O(0, [874, 441, 684, 358], () => t(8978)),
    _N_E = e.O()
}
]);
