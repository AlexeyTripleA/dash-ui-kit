'use strict';

var tslib = require('tslib');
var jsxRuntime = require('react/jsx-runtime');
var reactNative = require('react-native');
var classVarianceAuthority = require('class-variance-authority');
var react = require('react');
var Svg = require('react-native-svg');

function getAddedUtilities(plugins) {
    var _a;
    return ((_a = plugins === null || plugins === void 0 ? void 0 : plugins.reduce((utils, plugin) => ({ ...utils, ...callPluginFunction(plugin.handler) }), {})) !== null && _a !== void 0 ? _a : {});
}
function callPluginFunction(pluginFn) {
    let added = {};
    pluginFn({
        addUtilities: (utilities) => {
            added = utilities;
        },
        ...core,
    });
    return added;
}
function notImplemented(fn) {
    throw new Error(`tailwindcss plugin function argument object prop "${fn}" not implemented`);
}
const core = {
    addComponents: notImplemented,
    addBase: notImplemented,
    addVariant: notImplemented,
    e: notImplemented,
    prefix: notImplemented,
    theme: notImplemented,
    variants: notImplemented,
    config: notImplemented,
    corePlugins: notImplemented,
    matchUtilities: notImplemented,
    postcss: null,
};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var resolveConfig$2 = {};

var resolveConfig$1 = {};

var negateValue = {};

var hasRequiredNegateValue;

function requireNegateValue () {
	if (hasRequiredNegateValue) return negateValue;
	hasRequiredNegateValue = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "default", {
		    enumerable: true,
		    get: function() {
		        return negateValue;
		    }
		});
		function negateValue(value) {
		    value = `${value}`;
		    if (value === "0") {
		        return "0";
		    }
		    // Flip sign of numbers
		    if (/^[+-]?(\d+|\d*\.\d+)(e[+-]?\d+)?(%|\w+)?$/.test(value)) {
		        return value.replace(/^[+-]?/, (sign)=>sign === "-" ? "" : "-");
		    }
		    // What functions we support negating numeric values for
		    // var() isn't inherently a numeric function but we support it anyway
		    // The trigonometric functions are omitted because you'll need to use calc(…) with them _anyway_
		    // to produce generally useful results and that will be covered already
		    let numericFunctions = [
		        "var",
		        "calc",
		        "min",
		        "max",
		        "clamp"
		    ];
		    for (const fn of numericFunctions){
		        if (value.includes(`${fn}(`)) {
		            return `calc(${value} * -1)`;
		        }
		    }
		} 
	} (negateValue));
	return negateValue;
}

var corePluginList = {};

var hasRequiredCorePluginList;

function requireCorePluginList () {
	if (hasRequiredCorePluginList) return corePluginList;
	hasRequiredCorePluginList = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "default", {
		    enumerable: true,
		    get: function() {
		        return _default;
		    }
		});
		const _default = [
		    "preflight",
		    "container",
		    "accessibility",
		    "pointerEvents",
		    "visibility",
		    "position",
		    "inset",
		    "isolation",
		    "zIndex",
		    "order",
		    "gridColumn",
		    "gridColumnStart",
		    "gridColumnEnd",
		    "gridRow",
		    "gridRowStart",
		    "gridRowEnd",
		    "float",
		    "clear",
		    "margin",
		    "boxSizing",
		    "lineClamp",
		    "display",
		    "aspectRatio",
		    "size",
		    "height",
		    "maxHeight",
		    "minHeight",
		    "width",
		    "minWidth",
		    "maxWidth",
		    "flex",
		    "flexShrink",
		    "flexGrow",
		    "flexBasis",
		    "tableLayout",
		    "captionSide",
		    "borderCollapse",
		    "borderSpacing",
		    "transformOrigin",
		    "translate",
		    "rotate",
		    "skew",
		    "scale",
		    "transform",
		    "animation",
		    "cursor",
		    "touchAction",
		    "userSelect",
		    "resize",
		    "scrollSnapType",
		    "scrollSnapAlign",
		    "scrollSnapStop",
		    "scrollMargin",
		    "scrollPadding",
		    "listStylePosition",
		    "listStyleType",
		    "listStyleImage",
		    "appearance",
		    "columns",
		    "breakBefore",
		    "breakInside",
		    "breakAfter",
		    "gridAutoColumns",
		    "gridAutoFlow",
		    "gridAutoRows",
		    "gridTemplateColumns",
		    "gridTemplateRows",
		    "flexDirection",
		    "flexWrap",
		    "placeContent",
		    "placeItems",
		    "alignContent",
		    "alignItems",
		    "justifyContent",
		    "justifyItems",
		    "gap",
		    "space",
		    "divideWidth",
		    "divideStyle",
		    "divideColor",
		    "divideOpacity",
		    "placeSelf",
		    "alignSelf",
		    "justifySelf",
		    "overflow",
		    "overscrollBehavior",
		    "scrollBehavior",
		    "textOverflow",
		    "hyphens",
		    "whitespace",
		    "textWrap",
		    "wordBreak",
		    "borderRadius",
		    "borderWidth",
		    "borderStyle",
		    "borderColor",
		    "borderOpacity",
		    "backgroundColor",
		    "backgroundOpacity",
		    "backgroundImage",
		    "gradientColorStops",
		    "boxDecorationBreak",
		    "backgroundSize",
		    "backgroundAttachment",
		    "backgroundClip",
		    "backgroundPosition",
		    "backgroundRepeat",
		    "backgroundOrigin",
		    "fill",
		    "stroke",
		    "strokeWidth",
		    "objectFit",
		    "objectPosition",
		    "padding",
		    "textAlign",
		    "textIndent",
		    "verticalAlign",
		    "fontFamily",
		    "fontSize",
		    "fontWeight",
		    "textTransform",
		    "fontStyle",
		    "fontVariantNumeric",
		    "lineHeight",
		    "letterSpacing",
		    "textColor",
		    "textOpacity",
		    "textDecoration",
		    "textDecorationColor",
		    "textDecorationStyle",
		    "textDecorationThickness",
		    "textUnderlineOffset",
		    "fontSmoothing",
		    "placeholderColor",
		    "placeholderOpacity",
		    "caretColor",
		    "accentColor",
		    "opacity",
		    "backgroundBlendMode",
		    "mixBlendMode",
		    "boxShadow",
		    "boxShadowColor",
		    "outlineStyle",
		    "outlineWidth",
		    "outlineOffset",
		    "outlineColor",
		    "ringWidth",
		    "ringColor",
		    "ringOpacity",
		    "ringOffsetWidth",
		    "ringOffsetColor",
		    "blur",
		    "brightness",
		    "contrast",
		    "dropShadow",
		    "grayscale",
		    "hueRotate",
		    "invert",
		    "saturate",
		    "sepia",
		    "filter",
		    "backdropBlur",
		    "backdropBrightness",
		    "backdropContrast",
		    "backdropGrayscale",
		    "backdropHueRotate",
		    "backdropInvert",
		    "backdropOpacity",
		    "backdropSaturate",
		    "backdropSepia",
		    "backdropFilter",
		    "transitionProperty",
		    "transitionDelay",
		    "transitionDuration",
		    "transitionTimingFunction",
		    "willChange",
		    "contain",
		    "content",
		    "forcedColorAdjust"
		]; 
	} (corePluginList));
	return corePluginList;
}

var configurePlugins = {};

var hasRequiredConfigurePlugins;

function requireConfigurePlugins () {
	if (hasRequiredConfigurePlugins) return configurePlugins;
	hasRequiredConfigurePlugins = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "default", {
		    enumerable: true,
		    get: function() {
		        return _default;
		    }
		});
		function _default(pluginConfig, plugins) {
		    if (pluginConfig === undefined) {
		        return plugins;
		    }
		    const pluginNames = Array.isArray(pluginConfig) ? pluginConfig : [
		        ...new Set(plugins.filter((pluginName)=>{
		            return pluginConfig !== false && pluginConfig[pluginName] !== false;
		        }).concat(Object.keys(pluginConfig).filter((pluginName)=>{
		            return pluginConfig[pluginName] !== false;
		        })))
		    ];
		    return pluginNames;
		} 
	} (configurePlugins));
	return configurePlugins;
}

var colors = {};

var log = {};

var picocolors_browser = {exports: {}};

var hasRequiredPicocolors_browser;

function requirePicocolors_browser () {
	if (hasRequiredPicocolors_browser) return picocolors_browser.exports;
	hasRequiredPicocolors_browser = 1;
	var x=String;
	var create=function() {return {isColorSupported:false,reset:x,bold:x,dim:x,italic:x,underline:x,inverse:x,hidden:x,strikethrough:x,black:x,red:x,green:x,yellow:x,blue:x,magenta:x,cyan:x,white:x,gray:x,bgBlack:x,bgRed:x,bgGreen:x,bgYellow:x,bgBlue:x,bgMagenta:x,bgCyan:x,bgWhite:x,blackBright:x,redBright:x,greenBright:x,yellowBright:x,blueBright:x,magentaBright:x,cyanBright:x,whiteBright:x,bgBlackBright:x,bgRedBright:x,bgGreenBright:x,bgYellowBright:x,bgBlueBright:x,bgMagentaBright:x,bgCyanBright:x,bgWhiteBright:x}};
	picocolors_browser.exports=create();
	picocolors_browser.exports.createColors = create;
	return picocolors_browser.exports;
}

var hasRequiredLog;

function requireLog () {
	if (hasRequiredLog) return log;
	hasRequiredLog = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    dim: function() {
		        return dim;
		    },
		    default: function() {
		        return _default;
		    }
		});
		const _picocolors = /*#__PURE__*/ _interop_require_default(/*@__PURE__*/ requirePicocolors_browser());
		function _interop_require_default(obj) {
		    return obj && obj.__esModule ? obj : {
		        default: obj
		    };
		}
		let alreadyShown = new Set();
		function log(type, messages, key) {
		    if (typeof process !== "undefined" && process.env.JEST_WORKER_ID) return;
		    if (key && alreadyShown.has(key)) return;
		    if (key) alreadyShown.add(key);
		    console.warn("");
		    messages.forEach((message)=>console.warn(type, "-", message));
		}
		function dim(input) {
		    return _picocolors.default.dim(input);
		}
		const _default = {
		    info (key, messages) {
		        log(_picocolors.default.bold(_picocolors.default.cyan("info")), ...Array.isArray(key) ? [
		            key
		        ] : [
		            messages,
		            key
		        ]);
		    },
		    warn (key, messages) {
		        log(_picocolors.default.bold(_picocolors.default.yellow("warn")), ...Array.isArray(key) ? [
		            key
		        ] : [
		            messages,
		            key
		        ]);
		    },
		    risk (key, messages) {
		        log(_picocolors.default.bold(_picocolors.default.magenta("risk")), ...Array.isArray(key) ? [
		            key
		        ] : [
		            messages,
		            key
		        ]);
		    }
		}; 
	} (log));
	return log;
}

var hasRequiredColors;

function requireColors () {
	if (hasRequiredColors) return colors;
	hasRequiredColors = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "default", {
		    enumerable: true,
		    get: function() {
		        return _default;
		    }
		});
		const _log = /*#__PURE__*/ _interop_require_default(requireLog());
		function _interop_require_default(obj) {
		    return obj && obj.__esModule ? obj : {
		        default: obj
		    };
		}
		function warn({ version , from , to  }) {
		    _log.default.warn(`${from}-color-renamed`, [
		        `As of Tailwind CSS ${version}, \`${from}\` has been renamed to \`${to}\`.`,
		        "Update your configuration file to silence this warning."
		    ]);
		}
		const _default = {
		    inherit: "inherit",
		    current: "currentColor",
		    transparent: "transparent",
		    black: "#000",
		    white: "#fff",
		    slate: {
		        50: "#f8fafc",
		        100: "#f1f5f9",
		        200: "#e2e8f0",
		        300: "#cbd5e1",
		        400: "#94a3b8",
		        500: "#64748b",
		        600: "#475569",
		        700: "#334155",
		        800: "#1e293b",
		        900: "#0f172a",
		        950: "#020617"
		    },
		    gray: {
		        50: "#f9fafb",
		        100: "#f3f4f6",
		        200: "#e5e7eb",
		        300: "#d1d5db",
		        400: "#9ca3af",
		        500: "#6b7280",
		        600: "#4b5563",
		        700: "#374151",
		        800: "#1f2937",
		        900: "#111827",
		        950: "#030712"
		    },
		    zinc: {
		        50: "#fafafa",
		        100: "#f4f4f5",
		        200: "#e4e4e7",
		        300: "#d4d4d8",
		        400: "#a1a1aa",
		        500: "#71717a",
		        600: "#52525b",
		        700: "#3f3f46",
		        800: "#27272a",
		        900: "#18181b",
		        950: "#09090b"
		    },
		    neutral: {
		        50: "#fafafa",
		        100: "#f5f5f5",
		        200: "#e5e5e5",
		        300: "#d4d4d4",
		        400: "#a3a3a3",
		        500: "#737373",
		        600: "#525252",
		        700: "#404040",
		        800: "#262626",
		        900: "#171717",
		        950: "#0a0a0a"
		    },
		    stone: {
		        50: "#fafaf9",
		        100: "#f5f5f4",
		        200: "#e7e5e4",
		        300: "#d6d3d1",
		        400: "#a8a29e",
		        500: "#78716c",
		        600: "#57534e",
		        700: "#44403c",
		        800: "#292524",
		        900: "#1c1917",
		        950: "#0c0a09"
		    },
		    red: {
		        50: "#fef2f2",
		        100: "#fee2e2",
		        200: "#fecaca",
		        300: "#fca5a5",
		        400: "#f87171",
		        500: "#ef4444",
		        600: "#dc2626",
		        700: "#b91c1c",
		        800: "#991b1b",
		        900: "#7f1d1d",
		        950: "#450a0a"
		    },
		    orange: {
		        50: "#fff7ed",
		        100: "#ffedd5",
		        200: "#fed7aa",
		        300: "#fdba74",
		        400: "#fb923c",
		        500: "#f97316",
		        600: "#ea580c",
		        700: "#c2410c",
		        800: "#9a3412",
		        900: "#7c2d12",
		        950: "#431407"
		    },
		    amber: {
		        50: "#fffbeb",
		        100: "#fef3c7",
		        200: "#fde68a",
		        300: "#fcd34d",
		        400: "#fbbf24",
		        500: "#f59e0b",
		        600: "#d97706",
		        700: "#b45309",
		        800: "#92400e",
		        900: "#78350f",
		        950: "#451a03"
		    },
		    yellow: {
		        50: "#fefce8",
		        100: "#fef9c3",
		        200: "#fef08a",
		        300: "#fde047",
		        400: "#facc15",
		        500: "#eab308",
		        600: "#ca8a04",
		        700: "#a16207",
		        800: "#854d0e",
		        900: "#713f12",
		        950: "#422006"
		    },
		    lime: {
		        50: "#f7fee7",
		        100: "#ecfccb",
		        200: "#d9f99d",
		        300: "#bef264",
		        400: "#a3e635",
		        500: "#84cc16",
		        600: "#65a30d",
		        700: "#4d7c0f",
		        800: "#3f6212",
		        900: "#365314",
		        950: "#1a2e05"
		    },
		    green: {
		        50: "#f0fdf4",
		        100: "#dcfce7",
		        200: "#bbf7d0",
		        300: "#86efac",
		        400: "#4ade80",
		        500: "#22c55e",
		        600: "#16a34a",
		        700: "#15803d",
		        800: "#166534",
		        900: "#14532d",
		        950: "#052e16"
		    },
		    emerald: {
		        50: "#ecfdf5",
		        100: "#d1fae5",
		        200: "#a7f3d0",
		        300: "#6ee7b7",
		        400: "#34d399",
		        500: "#10b981",
		        600: "#059669",
		        700: "#047857",
		        800: "#065f46",
		        900: "#064e3b",
		        950: "#022c22"
		    },
		    teal: {
		        50: "#f0fdfa",
		        100: "#ccfbf1",
		        200: "#99f6e4",
		        300: "#5eead4",
		        400: "#2dd4bf",
		        500: "#14b8a6",
		        600: "#0d9488",
		        700: "#0f766e",
		        800: "#115e59",
		        900: "#134e4a",
		        950: "#042f2e"
		    },
		    cyan: {
		        50: "#ecfeff",
		        100: "#cffafe",
		        200: "#a5f3fc",
		        300: "#67e8f9",
		        400: "#22d3ee",
		        500: "#06b6d4",
		        600: "#0891b2",
		        700: "#0e7490",
		        800: "#155e75",
		        900: "#164e63",
		        950: "#083344"
		    },
		    sky: {
		        50: "#f0f9ff",
		        100: "#e0f2fe",
		        200: "#bae6fd",
		        300: "#7dd3fc",
		        400: "#38bdf8",
		        500: "#0ea5e9",
		        600: "#0284c7",
		        700: "#0369a1",
		        800: "#075985",
		        900: "#0c4a6e",
		        950: "#082f49"
		    },
		    blue: {
		        50: "#eff6ff",
		        100: "#dbeafe",
		        200: "#bfdbfe",
		        300: "#93c5fd",
		        400: "#60a5fa",
		        500: "#3b82f6",
		        600: "#2563eb",
		        700: "#1d4ed8",
		        800: "#1e40af",
		        900: "#1e3a8a",
		        950: "#172554"
		    },
		    indigo: {
		        50: "#eef2ff",
		        100: "#e0e7ff",
		        200: "#c7d2fe",
		        300: "#a5b4fc",
		        400: "#818cf8",
		        500: "#6366f1",
		        600: "#4f46e5",
		        700: "#4338ca",
		        800: "#3730a3",
		        900: "#312e81",
		        950: "#1e1b4b"
		    },
		    violet: {
		        50: "#f5f3ff",
		        100: "#ede9fe",
		        200: "#ddd6fe",
		        300: "#c4b5fd",
		        400: "#a78bfa",
		        500: "#8b5cf6",
		        600: "#7c3aed",
		        700: "#6d28d9",
		        800: "#5b21b6",
		        900: "#4c1d95",
		        950: "#2e1065"
		    },
		    purple: {
		        50: "#faf5ff",
		        100: "#f3e8ff",
		        200: "#e9d5ff",
		        300: "#d8b4fe",
		        400: "#c084fc",
		        500: "#a855f7",
		        600: "#9333ea",
		        700: "#7e22ce",
		        800: "#6b21a8",
		        900: "#581c87",
		        950: "#3b0764"
		    },
		    fuchsia: {
		        50: "#fdf4ff",
		        100: "#fae8ff",
		        200: "#f5d0fe",
		        300: "#f0abfc",
		        400: "#e879f9",
		        500: "#d946ef",
		        600: "#c026d3",
		        700: "#a21caf",
		        800: "#86198f",
		        900: "#701a75",
		        950: "#4a044e"
		    },
		    pink: {
		        50: "#fdf2f8",
		        100: "#fce7f3",
		        200: "#fbcfe8",
		        300: "#f9a8d4",
		        400: "#f472b6",
		        500: "#ec4899",
		        600: "#db2777",
		        700: "#be185d",
		        800: "#9d174d",
		        900: "#831843",
		        950: "#500724"
		    },
		    rose: {
		        50: "#fff1f2",
		        100: "#ffe4e6",
		        200: "#fecdd3",
		        300: "#fda4af",
		        400: "#fb7185",
		        500: "#f43f5e",
		        600: "#e11d48",
		        700: "#be123c",
		        800: "#9f1239",
		        900: "#881337",
		        950: "#4c0519"
		    },
		    get lightBlue () {
		        warn({
		            version: "v2.2",
		            from: "lightBlue",
		            to: "sky"
		        });
		        return this.sky;
		    },
		    get warmGray () {
		        warn({
		            version: "v3.0",
		            from: "warmGray",
		            to: "stone"
		        });
		        return this.stone;
		    },
		    get trueGray () {
		        warn({
		            version: "v3.0",
		            from: "trueGray",
		            to: "neutral"
		        });
		        return this.neutral;
		    },
		    get coolGray () {
		        warn({
		            version: "v3.0",
		            from: "coolGray",
		            to: "gray"
		        });
		        return this.gray;
		    },
		    get blueGray () {
		        warn({
		            version: "v3.0",
		            from: "blueGray",
		            to: "slate"
		        });
		        return this.slate;
		    }
		}; 
	} (colors));
	return colors;
}

var defaults = {};

var hasRequiredDefaults;

function requireDefaults () {
	if (hasRequiredDefaults) return defaults;
	hasRequiredDefaults = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "defaults", {
		    enumerable: true,
		    get: function() {
		        return defaults;
		    }
		});
		function defaults(target, ...sources) {
		    for (let source of sources){
		        for(let k in source){
		            var _target_hasOwnProperty;
		            if (!(target === null || target === void 0 ? void 0 : (_target_hasOwnProperty = target.hasOwnProperty) === null || _target_hasOwnProperty === void 0 ? void 0 : _target_hasOwnProperty.call(target, k))) {
		                target[k] = source[k];
		            }
		        }
		        for (let k of Object.getOwnPropertySymbols(source)){
		            var _target_hasOwnProperty1;
		            if (!(target === null || target === void 0 ? void 0 : (_target_hasOwnProperty1 = target.hasOwnProperty) === null || _target_hasOwnProperty1 === void 0 ? void 0 : _target_hasOwnProperty1.call(target, k))) {
		                target[k] = source[k];
		            }
		        }
		    }
		    return target;
		} 
	} (defaults));
	return defaults;
}

var toPath = {};

/**
 * Parse a path string into an array of path segments.
 *
 * Square bracket notation `a[b]` may be used to "escape" dots that would otherwise be interpreted as path separators.
 *
 * Example:
 * a -> ['a']
 * a.b.c -> ['a', 'b', 'c']
 * a[b].c -> ['a', 'b', 'c']
 * a[b.c].e.f -> ['a', 'b.c', 'e', 'f']
 * a[b][c][d] -> ['a', 'b', 'c', 'd']
 *
 * @param {string|string[]} path
 **/

var hasRequiredToPath;

function requireToPath () {
	if (hasRequiredToPath) return toPath;
	hasRequiredToPath = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "toPath", {
		    enumerable: true,
		    get: function() {
		        return toPath;
		    }
		});
		function toPath(path) {
		    if (Array.isArray(path)) return path;
		    let openBrackets = path.split("[").length - 1;
		    let closedBrackets = path.split("]").length - 1;
		    if (openBrackets !== closedBrackets) {
		        throw new Error(`Path is invalid. Has unbalanced brackets: ${path}`);
		    }
		    return path.split(/\.(?![^\[]*\])|[\[\]]/g).filter(Boolean);
		} 
	} (toPath));
	return toPath;
}

var normalizeConfig = {};

var featureFlags = {};

var hasRequiredFeatureFlags;

function requireFeatureFlags () {
	if (hasRequiredFeatureFlags) return featureFlags;
	hasRequiredFeatureFlags = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    flagEnabled: function() {
		        return flagEnabled;
		    },
		    issueFlagNotices: function() {
		        return issueFlagNotices;
		    },
		    default: function() {
		        return _default;
		    }
		});
		const _picocolors = /*#__PURE__*/ _interop_require_default(/*@__PURE__*/ requirePicocolors_browser());
		const _log = /*#__PURE__*/ _interop_require_default(requireLog());
		function _interop_require_default(obj) {
		    return obj && obj.__esModule ? obj : {
		        default: obj
		    };
		}
		let defaults = {
		    optimizeUniversalDefaults: false,
		    generalizedModifiers: true,
		    disableColorOpacityUtilitiesByDefault: false,
		    relativeContentPathsByDefault: false
		};
		let featureFlags = {
		    future: [
		        "hoverOnlyWhenSupported",
		        "respectDefaultRingColorOpacity",
		        "disableColorOpacityUtilitiesByDefault",
		        "relativeContentPathsByDefault"
		    ],
		    experimental: [
		        "optimizeUniversalDefaults",
		        "generalizedModifiers"
		    ]
		};
		function flagEnabled(config, flag) {
		    if (featureFlags.future.includes(flag)) {
		        var _config_future;
		        var _config_future_flag, _ref;
		        return config.future === "all" || ((_ref = (_config_future_flag = config === null || config === void 0 ? void 0 : (_config_future = config.future) === null || _config_future === void 0 ? void 0 : _config_future[flag]) !== null && _config_future_flag !== void 0 ? _config_future_flag : defaults[flag]) !== null && _ref !== void 0 ? _ref : false);
		    }
		    if (featureFlags.experimental.includes(flag)) {
		        var _config_experimental;
		        var _config_experimental_flag, _ref1;
		        return config.experimental === "all" || ((_ref1 = (_config_experimental_flag = config === null || config === void 0 ? void 0 : (_config_experimental = config.experimental) === null || _config_experimental === void 0 ? void 0 : _config_experimental[flag]) !== null && _config_experimental_flag !== void 0 ? _config_experimental_flag : defaults[flag]) !== null && _ref1 !== void 0 ? _ref1 : false);
		    }
		    return false;
		}
		function experimentalFlagsEnabled(config) {
		    if (config.experimental === "all") {
		        return featureFlags.experimental;
		    }
		    var _config_experimental;
		    return Object.keys((_config_experimental = config === null || config === void 0 ? void 0 : config.experimental) !== null && _config_experimental !== void 0 ? _config_experimental : {}).filter((flag)=>featureFlags.experimental.includes(flag) && config.experimental[flag]);
		}
		function issueFlagNotices(config) {
		    if (process.env.JEST_WORKER_ID !== undefined) {
		        return;
		    }
		    if (experimentalFlagsEnabled(config).length > 0) {
		        let changes = experimentalFlagsEnabled(config).map((s)=>_picocolors.default.yellow(s)).join(", ");
		        _log.default.warn("experimental-flags-enabled", [
		            `You have enabled experimental features: ${changes}`,
		            "Experimental features in Tailwind CSS are not covered by semver, may introduce breaking changes, and can change at any time."
		        ]);
		    }
		}
		const _default = featureFlags; 
	} (featureFlags));
	return featureFlags;
}

var hasRequiredNormalizeConfig;

function requireNormalizeConfig () {
	if (hasRequiredNormalizeConfig) return normalizeConfig;
	hasRequiredNormalizeConfig = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "normalizeConfig", {
		    enumerable: true,
		    get: function() {
		        return normalizeConfig;
		    }
		});
		const _featureFlags = requireFeatureFlags();
		const _log = /*#__PURE__*/ _interop_require_wildcard(requireLog());
		function _getRequireWildcardCache(nodeInterop) {
		    if (typeof WeakMap !== "function") return null;
		    var cacheBabelInterop = new WeakMap();
		    var cacheNodeInterop = new WeakMap();
		    return (_getRequireWildcardCache = function(nodeInterop) {
		        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
		    })(nodeInterop);
		}
		function _interop_require_wildcard(obj, nodeInterop) {
		    if (obj && obj.__esModule) {
		        return obj;
		    }
		    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
		        return {
		            default: obj
		        };
		    }
		    var cache = _getRequireWildcardCache(nodeInterop);
		    if (cache && cache.has(obj)) {
		        return cache.get(obj);
		    }
		    var newObj = {};
		    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
		    for(var key in obj){
		        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
		            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
		            if (desc && (desc.get || desc.set)) {
		                Object.defineProperty(newObj, key, desc);
		            } else {
		                newObj[key] = obj[key];
		            }
		        }
		    }
		    newObj.default = obj;
		    if (cache) {
		        cache.set(obj, newObj);
		    }
		    return newObj;
		}
		function normalizeConfig(config) {
		    // Quick structure validation
		    /**
		   * type FilePath = string
		   * type RawFile = { raw: string, extension?: string }
		   * type ExtractorFn = (content: string) => Array<string>
		   * type TransformerFn = (content: string) => string
		   *
		   * type Content =
		   *   | Array<FilePath | RawFile>
		   *   | {
		   *       files: Array<FilePath | RawFile>,
		   *       extract?: ExtractorFn | { [extension: string]: ExtractorFn }
		   *       transform?: TransformerFn | { [extension: string]: TransformerFn }
		   *   }
		   */ let valid = (()=>{
		        // `config.purge` should not exist anymore
		        if (config.purge) {
		            return false;
		        }
		        // `config.content` should exist
		        if (!config.content) {
		            return false;
		        }
		        // `config.content` should be an object or an array
		        if (!Array.isArray(config.content) && !(typeof config.content === "object" && config.content !== null)) {
		            return false;
		        }
		        // When `config.content` is an array, it should consist of FilePaths or RawFiles
		        if (Array.isArray(config.content)) {
		            return config.content.every((path)=>{
		                // `path` can be a string
		                if (typeof path === "string") return true;
		                // `path` can be an object { raw: string, extension?: string }
		                // `raw` must be a string
		                if (typeof (path === null || path === void 0 ? void 0 : path.raw) !== "string") return false;
		                // `extension` (if provided) should also be a string
		                if ((path === null || path === void 0 ? void 0 : path.extension) && typeof (path === null || path === void 0 ? void 0 : path.extension) !== "string") {
		                    return false;
		                }
		                return true;
		            });
		        }
		        // When `config.content` is an object
		        if (typeof config.content === "object" && config.content !== null) {
		            // Only `files`, `relative`, `extract`, and `transform` can exist in `config.content`
		            if (Object.keys(config.content).some((key)=>![
		                    "files",
		                    "relative",
		                    "extract",
		                    "transform"
		                ].includes(key))) {
		                return false;
		            }
		            // `config.content.files` should exist of FilePaths or RawFiles
		            if (Array.isArray(config.content.files)) {
		                if (!config.content.files.every((path)=>{
		                    // `path` can be a string
		                    if (typeof path === "string") return true;
		                    // `path` can be an object { raw: string, extension?: string }
		                    // `raw` must be a string
		                    if (typeof (path === null || path === void 0 ? void 0 : path.raw) !== "string") return false;
		                    // `extension` (if provided) should also be a string
		                    if ((path === null || path === void 0 ? void 0 : path.extension) && typeof (path === null || path === void 0 ? void 0 : path.extension) !== "string") {
		                        return false;
		                    }
		                    return true;
		                })) {
		                    return false;
		                }
		                // `config.content.extract` is optional, and can be a Function or a Record<String, Function>
		                if (typeof config.content.extract === "object") {
		                    for (let value of Object.values(config.content.extract)){
		                        if (typeof value !== "function") {
		                            return false;
		                        }
		                    }
		                } else if (!(config.content.extract === undefined || typeof config.content.extract === "function")) {
		                    return false;
		                }
		                // `config.content.transform` is optional, and can be a Function or a Record<String, Function>
		                if (typeof config.content.transform === "object") {
		                    for (let value of Object.values(config.content.transform)){
		                        if (typeof value !== "function") {
		                            return false;
		                        }
		                    }
		                } else if (!(config.content.transform === undefined || typeof config.content.transform === "function")) {
		                    return false;
		                }
		                // `config.content.relative` is optional and can be a boolean
		                if (typeof config.content.relative !== "boolean" && typeof config.content.relative !== "undefined") {
		                    return false;
		                }
		            }
		            return true;
		        }
		        return false;
		    })();
		    if (!valid) {
		        _log.default.warn("purge-deprecation", [
		            "The `purge`/`content` options have changed in Tailwind CSS v3.0.",
		            "Update your configuration file to eliminate this warning.",
		            "https://tailwindcss.com/docs/upgrade-guide#configure-content-sources"
		        ]);
		    }
		    // Normalize the `safelist`
		    config.safelist = (()=>{
		        var _purge_options;
		        let { content , purge , safelist  } = config;
		        if (Array.isArray(safelist)) return safelist;
		        if (Array.isArray(content === null || content === void 0 ? void 0 : content.safelist)) return content.safelist;
		        if (Array.isArray(purge === null || purge === void 0 ? void 0 : purge.safelist)) return purge.safelist;
		        if (Array.isArray(purge === null || purge === void 0 ? void 0 : (_purge_options = purge.options) === null || _purge_options === void 0 ? void 0 : _purge_options.safelist)) return purge.options.safelist;
		        return [];
		    })();
		    // Normalize the `blocklist`
		    config.blocklist = (()=>{
		        let { blocklist  } = config;
		        if (Array.isArray(blocklist)) {
		            if (blocklist.every((item)=>typeof item === "string")) {
		                return blocklist;
		            }
		            _log.default.warn("blocklist-invalid", [
		                "The `blocklist` option must be an array of strings.",
		                "https://tailwindcss.com/docs/content-configuration#discarding-classes"
		            ]);
		        }
		        return [];
		    })();
		    // Normalize prefix option
		    if (typeof config.prefix === "function") {
		        _log.default.warn("prefix-function", [
		            "As of Tailwind CSS v3.0, `prefix` cannot be a function.",
		            "Update `prefix` in your configuration to be a string to eliminate this warning.",
		            "https://tailwindcss.com/docs/upgrade-guide#prefix-cannot-be-a-function"
		        ]);
		        config.prefix = "";
		    } else {
		        var _config_prefix;
		        config.prefix = (_config_prefix = config.prefix) !== null && _config_prefix !== void 0 ? _config_prefix : "";
		    }
		    // Normalize the `content`
		    config.content = {
		        relative: (()=>{
		            let { content  } = config;
		            if (content === null || content === void 0 ? void 0 : content.relative) {
		                return content.relative;
		            }
		            return (0, _featureFlags.flagEnabled)(config, "relativeContentPathsByDefault");
		        })(),
		        files: (()=>{
		            let { content , purge  } = config;
		            if (Array.isArray(purge)) return purge;
		            if (Array.isArray(purge === null || purge === void 0 ? void 0 : purge.content)) return purge.content;
		            if (Array.isArray(content)) return content;
		            if (Array.isArray(content === null || content === void 0 ? void 0 : content.content)) return content.content;
		            if (Array.isArray(content === null || content === void 0 ? void 0 : content.files)) return content.files;
		            return [];
		        })(),
		        extract: (()=>{
		            let extract = (()=>{
		                var _config_purge, _config_content, _config_purge1, _config_purge_extract, _config_content1, _config_content_extract, _config_purge2, _config_purge_options, _config_content2, _config_content_options;
		                if ((_config_purge = config.purge) === null || _config_purge === void 0 ? void 0 : _config_purge.extract) return config.purge.extract;
		                if ((_config_content = config.content) === null || _config_content === void 0 ? void 0 : _config_content.extract) return config.content.extract;
		                if ((_config_purge1 = config.purge) === null || _config_purge1 === void 0 ? void 0 : (_config_purge_extract = _config_purge1.extract) === null || _config_purge_extract === void 0 ? void 0 : _config_purge_extract.DEFAULT) return config.purge.extract.DEFAULT;
		                if ((_config_content1 = config.content) === null || _config_content1 === void 0 ? void 0 : (_config_content_extract = _config_content1.extract) === null || _config_content_extract === void 0 ? void 0 : _config_content_extract.DEFAULT) return config.content.extract.DEFAULT;
		                if ((_config_purge2 = config.purge) === null || _config_purge2 === void 0 ? void 0 : (_config_purge_options = _config_purge2.options) === null || _config_purge_options === void 0 ? void 0 : _config_purge_options.extractors) return config.purge.options.extractors;
		                if ((_config_content2 = config.content) === null || _config_content2 === void 0 ? void 0 : (_config_content_options = _config_content2.options) === null || _config_content_options === void 0 ? void 0 : _config_content_options.extractors) return config.content.options.extractors;
		                return {};
		            })();
		            let extractors = {};
		            let defaultExtractor = (()=>{
		                var _config_purge, _config_purge_options, _config_content, _config_content_options;
		                if ((_config_purge = config.purge) === null || _config_purge === void 0 ? void 0 : (_config_purge_options = _config_purge.options) === null || _config_purge_options === void 0 ? void 0 : _config_purge_options.defaultExtractor) {
		                    return config.purge.options.defaultExtractor;
		                }
		                if ((_config_content = config.content) === null || _config_content === void 0 ? void 0 : (_config_content_options = _config_content.options) === null || _config_content_options === void 0 ? void 0 : _config_content_options.defaultExtractor) {
		                    return config.content.options.defaultExtractor;
		                }
		                return undefined;
		            })();
		            if (defaultExtractor !== undefined) {
		                extractors.DEFAULT = defaultExtractor;
		            }
		            // Functions
		            if (typeof extract === "function") {
		                extractors.DEFAULT = extract;
		            } else if (Array.isArray(extract)) {
		                for (let { extensions , extractor  } of extract !== null && extract !== void 0 ? extract : []){
		                    for (let extension of extensions){
		                        extractors[extension] = extractor;
		                    }
		                }
		            } else if (typeof extract === "object" && extract !== null) {
		                Object.assign(extractors, extract);
		            }
		            return extractors;
		        })(),
		        transform: (()=>{
		            let transform = (()=>{
		                var _config_purge, _config_content, _config_purge1, _config_purge_transform, _config_content1, _config_content_transform;
		                if ((_config_purge = config.purge) === null || _config_purge === void 0 ? void 0 : _config_purge.transform) return config.purge.transform;
		                if ((_config_content = config.content) === null || _config_content === void 0 ? void 0 : _config_content.transform) return config.content.transform;
		                if ((_config_purge1 = config.purge) === null || _config_purge1 === void 0 ? void 0 : (_config_purge_transform = _config_purge1.transform) === null || _config_purge_transform === void 0 ? void 0 : _config_purge_transform.DEFAULT) return config.purge.transform.DEFAULT;
		                if ((_config_content1 = config.content) === null || _config_content1 === void 0 ? void 0 : (_config_content_transform = _config_content1.transform) === null || _config_content_transform === void 0 ? void 0 : _config_content_transform.DEFAULT) return config.content.transform.DEFAULT;
		                return {};
		            })();
		            let transformers = {};
		            if (typeof transform === "function") {
		                transformers.DEFAULT = transform;
		            } else if (typeof transform === "object" && transform !== null) {
		                Object.assign(transformers, transform);
		            }
		            return transformers;
		        })()
		    };
		    // Validate globs to prevent bogus globs.
		    // E.g.: `./src/*.{html}` is invalid, the `{html}` should just be `html`
		    for (let file of config.content.files){
		        if (typeof file === "string" && /{([^,]*?)}/g.test(file)) {
		            _log.default.warn("invalid-glob-braces", [
		                `The glob pattern ${(0, _log.dim)(file)} in your Tailwind CSS configuration is invalid.`,
		                `Update it to ${(0, _log.dim)(file.replace(/{([^,]*?)}/g, "$1"))} to silence this warning.`
		            ]);
		            break;
		        }
		    }
		    return config;
		} 
	} (normalizeConfig));
	return normalizeConfig;
}

var isPlainObject = {};

var hasRequiredIsPlainObject;

function requireIsPlainObject () {
	if (hasRequiredIsPlainObject) return isPlainObject;
	hasRequiredIsPlainObject = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "default", {
		    enumerable: true,
		    get: function() {
		        return isPlainObject;
		    }
		});
		function isPlainObject(value) {
		    if (Object.prototype.toString.call(value) !== "[object Object]") {
		        return false;
		    }
		    const prototype = Object.getPrototypeOf(value);
		    return prototype === null || Object.getPrototypeOf(prototype) === null;
		} 
	} (isPlainObject));
	return isPlainObject;
}

var cloneDeep = {};

var hasRequiredCloneDeep;

function requireCloneDeep () {
	if (hasRequiredCloneDeep) return cloneDeep;
	hasRequiredCloneDeep = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "cloneDeep", {
		    enumerable: true,
		    get: function() {
		        return cloneDeep;
		    }
		});
		function cloneDeep(value) {
		    if (Array.isArray(value)) {
		        return value.map((child)=>cloneDeep(child));
		    }
		    if (typeof value === "object" && value !== null) {
		        return Object.fromEntries(Object.entries(value).map(([k, v])=>[
		                k,
		                cloneDeep(v)
		            ]));
		    }
		    return value;
		} 
	} (cloneDeep));
	return cloneDeep;
}

var pluginUtils = {};

var escapeCommas = {};

var hasRequiredEscapeCommas;

function requireEscapeCommas () {
	if (hasRequiredEscapeCommas) return escapeCommas;
	hasRequiredEscapeCommas = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "default", {
		    enumerable: true,
		    get: function() {
		        return escapeCommas;
		    }
		});
		function escapeCommas(className) {
		    return className.replace(/\\,/g, "\\2c ");
		} 
	} (escapeCommas));
	return escapeCommas;
}

var withAlphaVariable = {};

var color$1 = {};

var colorNames = {};

var hasRequiredColorNames;

function requireColorNames () {
	if (hasRequiredColorNames) return colorNames;
	hasRequiredColorNames = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "default", {
		    enumerable: true,
		    get: function() {
		        return _default;
		    }
		});
		const _default = {
		    aliceblue: [
		        240,
		        248,
		        255
		    ],
		    antiquewhite: [
		        250,
		        235,
		        215
		    ],
		    aqua: [
		        0,
		        255,
		        255
		    ],
		    aquamarine: [
		        127,
		        255,
		        212
		    ],
		    azure: [
		        240,
		        255,
		        255
		    ],
		    beige: [
		        245,
		        245,
		        220
		    ],
		    bisque: [
		        255,
		        228,
		        196
		    ],
		    black: [
		        0,
		        0,
		        0
		    ],
		    blanchedalmond: [
		        255,
		        235,
		        205
		    ],
		    blue: [
		        0,
		        0,
		        255
		    ],
		    blueviolet: [
		        138,
		        43,
		        226
		    ],
		    brown: [
		        165,
		        42,
		        42
		    ],
		    burlywood: [
		        222,
		        184,
		        135
		    ],
		    cadetblue: [
		        95,
		        158,
		        160
		    ],
		    chartreuse: [
		        127,
		        255,
		        0
		    ],
		    chocolate: [
		        210,
		        105,
		        30
		    ],
		    coral: [
		        255,
		        127,
		        80
		    ],
		    cornflowerblue: [
		        100,
		        149,
		        237
		    ],
		    cornsilk: [
		        255,
		        248,
		        220
		    ],
		    crimson: [
		        220,
		        20,
		        60
		    ],
		    cyan: [
		        0,
		        255,
		        255
		    ],
		    darkblue: [
		        0,
		        0,
		        139
		    ],
		    darkcyan: [
		        0,
		        139,
		        139
		    ],
		    darkgoldenrod: [
		        184,
		        134,
		        11
		    ],
		    darkgray: [
		        169,
		        169,
		        169
		    ],
		    darkgreen: [
		        0,
		        100,
		        0
		    ],
		    darkgrey: [
		        169,
		        169,
		        169
		    ],
		    darkkhaki: [
		        189,
		        183,
		        107
		    ],
		    darkmagenta: [
		        139,
		        0,
		        139
		    ],
		    darkolivegreen: [
		        85,
		        107,
		        47
		    ],
		    darkorange: [
		        255,
		        140,
		        0
		    ],
		    darkorchid: [
		        153,
		        50,
		        204
		    ],
		    darkred: [
		        139,
		        0,
		        0
		    ],
		    darksalmon: [
		        233,
		        150,
		        122
		    ],
		    darkseagreen: [
		        143,
		        188,
		        143
		    ],
		    darkslateblue: [
		        72,
		        61,
		        139
		    ],
		    darkslategray: [
		        47,
		        79,
		        79
		    ],
		    darkslategrey: [
		        47,
		        79,
		        79
		    ],
		    darkturquoise: [
		        0,
		        206,
		        209
		    ],
		    darkviolet: [
		        148,
		        0,
		        211
		    ],
		    deeppink: [
		        255,
		        20,
		        147
		    ],
		    deepskyblue: [
		        0,
		        191,
		        255
		    ],
		    dimgray: [
		        105,
		        105,
		        105
		    ],
		    dimgrey: [
		        105,
		        105,
		        105
		    ],
		    dodgerblue: [
		        30,
		        144,
		        255
		    ],
		    firebrick: [
		        178,
		        34,
		        34
		    ],
		    floralwhite: [
		        255,
		        250,
		        240
		    ],
		    forestgreen: [
		        34,
		        139,
		        34
		    ],
		    fuchsia: [
		        255,
		        0,
		        255
		    ],
		    gainsboro: [
		        220,
		        220,
		        220
		    ],
		    ghostwhite: [
		        248,
		        248,
		        255
		    ],
		    gold: [
		        255,
		        215,
		        0
		    ],
		    goldenrod: [
		        218,
		        165,
		        32
		    ],
		    gray: [
		        128,
		        128,
		        128
		    ],
		    green: [
		        0,
		        128,
		        0
		    ],
		    greenyellow: [
		        173,
		        255,
		        47
		    ],
		    grey: [
		        128,
		        128,
		        128
		    ],
		    honeydew: [
		        240,
		        255,
		        240
		    ],
		    hotpink: [
		        255,
		        105,
		        180
		    ],
		    indianred: [
		        205,
		        92,
		        92
		    ],
		    indigo: [
		        75,
		        0,
		        130
		    ],
		    ivory: [
		        255,
		        255,
		        240
		    ],
		    khaki: [
		        240,
		        230,
		        140
		    ],
		    lavender: [
		        230,
		        230,
		        250
		    ],
		    lavenderblush: [
		        255,
		        240,
		        245
		    ],
		    lawngreen: [
		        124,
		        252,
		        0
		    ],
		    lemonchiffon: [
		        255,
		        250,
		        205
		    ],
		    lightblue: [
		        173,
		        216,
		        230
		    ],
		    lightcoral: [
		        240,
		        128,
		        128
		    ],
		    lightcyan: [
		        224,
		        255,
		        255
		    ],
		    lightgoldenrodyellow: [
		        250,
		        250,
		        210
		    ],
		    lightgray: [
		        211,
		        211,
		        211
		    ],
		    lightgreen: [
		        144,
		        238,
		        144
		    ],
		    lightgrey: [
		        211,
		        211,
		        211
		    ],
		    lightpink: [
		        255,
		        182,
		        193
		    ],
		    lightsalmon: [
		        255,
		        160,
		        122
		    ],
		    lightseagreen: [
		        32,
		        178,
		        170
		    ],
		    lightskyblue: [
		        135,
		        206,
		        250
		    ],
		    lightslategray: [
		        119,
		        136,
		        153
		    ],
		    lightslategrey: [
		        119,
		        136,
		        153
		    ],
		    lightsteelblue: [
		        176,
		        196,
		        222
		    ],
		    lightyellow: [
		        255,
		        255,
		        224
		    ],
		    lime: [
		        0,
		        255,
		        0
		    ],
		    limegreen: [
		        50,
		        205,
		        50
		    ],
		    linen: [
		        250,
		        240,
		        230
		    ],
		    magenta: [
		        255,
		        0,
		        255
		    ],
		    maroon: [
		        128,
		        0,
		        0
		    ],
		    mediumaquamarine: [
		        102,
		        205,
		        170
		    ],
		    mediumblue: [
		        0,
		        0,
		        205
		    ],
		    mediumorchid: [
		        186,
		        85,
		        211
		    ],
		    mediumpurple: [
		        147,
		        112,
		        219
		    ],
		    mediumseagreen: [
		        60,
		        179,
		        113
		    ],
		    mediumslateblue: [
		        123,
		        104,
		        238
		    ],
		    mediumspringgreen: [
		        0,
		        250,
		        154
		    ],
		    mediumturquoise: [
		        72,
		        209,
		        204
		    ],
		    mediumvioletred: [
		        199,
		        21,
		        133
		    ],
		    midnightblue: [
		        25,
		        25,
		        112
		    ],
		    mintcream: [
		        245,
		        255,
		        250
		    ],
		    mistyrose: [
		        255,
		        228,
		        225
		    ],
		    moccasin: [
		        255,
		        228,
		        181
		    ],
		    navajowhite: [
		        255,
		        222,
		        173
		    ],
		    navy: [
		        0,
		        0,
		        128
		    ],
		    oldlace: [
		        253,
		        245,
		        230
		    ],
		    olive: [
		        128,
		        128,
		        0
		    ],
		    olivedrab: [
		        107,
		        142,
		        35
		    ],
		    orange: [
		        255,
		        165,
		        0
		    ],
		    orangered: [
		        255,
		        69,
		        0
		    ],
		    orchid: [
		        218,
		        112,
		        214
		    ],
		    palegoldenrod: [
		        238,
		        232,
		        170
		    ],
		    palegreen: [
		        152,
		        251,
		        152
		    ],
		    paleturquoise: [
		        175,
		        238,
		        238
		    ],
		    palevioletred: [
		        219,
		        112,
		        147
		    ],
		    papayawhip: [
		        255,
		        239,
		        213
		    ],
		    peachpuff: [
		        255,
		        218,
		        185
		    ],
		    peru: [
		        205,
		        133,
		        63
		    ],
		    pink: [
		        255,
		        192,
		        203
		    ],
		    plum: [
		        221,
		        160,
		        221
		    ],
		    powderblue: [
		        176,
		        224,
		        230
		    ],
		    purple: [
		        128,
		        0,
		        128
		    ],
		    rebeccapurple: [
		        102,
		        51,
		        153
		    ],
		    red: [
		        255,
		        0,
		        0
		    ],
		    rosybrown: [
		        188,
		        143,
		        143
		    ],
		    royalblue: [
		        65,
		        105,
		        225
		    ],
		    saddlebrown: [
		        139,
		        69,
		        19
		    ],
		    salmon: [
		        250,
		        128,
		        114
		    ],
		    sandybrown: [
		        244,
		        164,
		        96
		    ],
		    seagreen: [
		        46,
		        139,
		        87
		    ],
		    seashell: [
		        255,
		        245,
		        238
		    ],
		    sienna: [
		        160,
		        82,
		        45
		    ],
		    silver: [
		        192,
		        192,
		        192
		    ],
		    skyblue: [
		        135,
		        206,
		        235
		    ],
		    slateblue: [
		        106,
		        90,
		        205
		    ],
		    slategray: [
		        112,
		        128,
		        144
		    ],
		    slategrey: [
		        112,
		        128,
		        144
		    ],
		    snow: [
		        255,
		        250,
		        250
		    ],
		    springgreen: [
		        0,
		        255,
		        127
		    ],
		    steelblue: [
		        70,
		        130,
		        180
		    ],
		    tan: [
		        210,
		        180,
		        140
		    ],
		    teal: [
		        0,
		        128,
		        128
		    ],
		    thistle: [
		        216,
		        191,
		        216
		    ],
		    tomato: [
		        255,
		        99,
		        71
		    ],
		    turquoise: [
		        64,
		        224,
		        208
		    ],
		    violet: [
		        238,
		        130,
		        238
		    ],
		    wheat: [
		        245,
		        222,
		        179
		    ],
		    white: [
		        255,
		        255,
		        255
		    ],
		    whitesmoke: [
		        245,
		        245,
		        245
		    ],
		    yellow: [
		        255,
		        255,
		        0
		    ],
		    yellowgreen: [
		        154,
		        205,
		        50
		    ]
		}; 
	} (colorNames));
	return colorNames;
}

var hasRequiredColor;

function requireColor () {
	if (hasRequiredColor) return color$1;
	hasRequiredColor = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    parseColor: function() {
		        return parseColor;
		    },
		    formatColor: function() {
		        return formatColor;
		    }
		});
		const _colorNames = /*#__PURE__*/ _interop_require_default(requireColorNames());
		function _interop_require_default(obj) {
		    return obj && obj.__esModule ? obj : {
		        default: obj
		    };
		}
		let HEX = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
		let SHORT_HEX = /^#([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
		let VALUE = /(?:\d+|\d*\.\d+)%?/;
		let SEP = /(?:\s*,\s*|\s+)/;
		let ALPHA_SEP = /\s*[,/]\s*/;
		let CUSTOM_PROPERTY = /var\(--(?:[^ )]*?)(?:,(?:[^ )]*?|var\(--[^ )]*?\)))?\)/;
		let RGB = new RegExp(`^(rgba?)\\(\\s*(${VALUE.source}|${CUSTOM_PROPERTY.source})(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${ALPHA_SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?\\s*\\)$`);
		let HSL = new RegExp(`^(hsla?)\\(\\s*((?:${VALUE.source})(?:deg|rad|grad|turn)?|${CUSTOM_PROPERTY.source})(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?(?:${ALPHA_SEP.source}(${VALUE.source}|${CUSTOM_PROPERTY.source}))?\\s*\\)$`);
		function parseColor(value, { loose =false  } = {}) {
		    var _match_, _match__toString;
		    if (typeof value !== "string") {
		        return null;
		    }
		    value = value.trim();
		    if (value === "transparent") {
		        return {
		            mode: "rgb",
		            color: [
		                "0",
		                "0",
		                "0"
		            ],
		            alpha: "0"
		        };
		    }
		    if (value in _colorNames.default) {
		        return {
		            mode: "rgb",
		            color: _colorNames.default[value].map((v)=>v.toString())
		        };
		    }
		    let hex = value.replace(SHORT_HEX, (_, r, g, b, a)=>[
		            "#",
		            r,
		            r,
		            g,
		            g,
		            b,
		            b,
		            a ? a + a : ""
		        ].join("")).match(HEX);
		    if (hex !== null) {
		        return {
		            mode: "rgb",
		            color: [
		                parseInt(hex[1], 16),
		                parseInt(hex[2], 16),
		                parseInt(hex[3], 16)
		            ].map((v)=>v.toString()),
		            alpha: hex[4] ? (parseInt(hex[4], 16) / 255).toString() : undefined
		        };
		    }
		    var _value_match;
		    let match = (_value_match = value.match(RGB)) !== null && _value_match !== void 0 ? _value_match : value.match(HSL);
		    if (match === null) {
		        return null;
		    }
		    let color = [
		        match[2],
		        match[3],
		        match[4]
		    ].filter(Boolean).map((v)=>v.toString());
		    // rgba(var(--my-color), 0.1)
		    // hsla(var(--my-color), 0.1)
		    if (color.length === 2 && color[0].startsWith("var(")) {
		        return {
		            mode: match[1],
		            color: [
		                color[0]
		            ],
		            alpha: color[1]
		        };
		    }
		    if (!loose && color.length !== 3) {
		        return null;
		    }
		    if (color.length < 3 && !color.some((part)=>/^var\(.*?\)$/.test(part))) {
		        return null;
		    }
		    return {
		        mode: match[1],
		        color,
		        alpha: (_match_ = match[5]) === null || _match_ === void 0 ? void 0 : (_match__toString = _match_.toString) === null || _match__toString === void 0 ? void 0 : _match__toString.call(_match_)
		    };
		}
		function formatColor({ mode , color , alpha  }) {
		    let hasAlpha = alpha !== undefined;
		    if (mode === "rgba" || mode === "hsla") {
		        return `${mode}(${color.join(", ")}${hasAlpha ? `, ${alpha}` : ""})`;
		    }
		    return `${mode}(${color.join(" ")}${hasAlpha ? ` / ${alpha}` : ""})`;
		} 
	} (color$1));
	return color$1;
}

var hasRequiredWithAlphaVariable;

function requireWithAlphaVariable () {
	if (hasRequiredWithAlphaVariable) return withAlphaVariable;
	hasRequiredWithAlphaVariable = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    withAlphaValue: function() {
		        return withAlphaValue;
		    },
		    default: function() {
		        return withAlphaVariable;
		    }
		});
		const _color = requireColor();
		function withAlphaValue(color, alphaValue, defaultValue) {
		    if (typeof color === "function") {
		        return color({
		            opacityValue: alphaValue
		        });
		    }
		    let parsed = (0, _color.parseColor)(color, {
		        loose: true
		    });
		    if (parsed === null) {
		        return defaultValue;
		    }
		    return (0, _color.formatColor)({
		        ...parsed,
		        alpha: alphaValue
		    });
		}
		function withAlphaVariable({ color , property , variable  }) {
		    let properties = [].concat(property);
		    if (typeof color === "function") {
		        return {
		            [variable]: "1",
		            ...Object.fromEntries(properties.map((p)=>{
		                return [
		                    p,
		                    color({
		                        opacityVariable: variable,
		                        opacityValue: `var(${variable}, 1)`
		                    })
		                ];
		            }))
		        };
		    }
		    const parsed = (0, _color.parseColor)(color);
		    if (parsed === null) {
		        return Object.fromEntries(properties.map((p)=>[
		                p,
		                color
		            ]));
		    }
		    if (parsed.alpha !== undefined) {
		        // Has an alpha value, return color as-is
		        return Object.fromEntries(properties.map((p)=>[
		                p,
		                color
		            ]));
		    }
		    return {
		        [variable]: "1",
		        ...Object.fromEntries(properties.map((p)=>{
		            return [
		                p,
		                (0, _color.formatColor)({
		                    ...parsed,
		                    alpha: `var(${variable}, 1)`
		                })
		            ];
		        }))
		    };
		} 
	} (withAlphaVariable));
	return withAlphaVariable;
}

var dataTypes = {};

var mathOperators = {};

var hasRequiredMathOperators;

function requireMathOperators () {
	if (hasRequiredMathOperators) return mathOperators;
	hasRequiredMathOperators = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    hasMathFn: function() {
		        return hasMathFn;
		    },
		    addWhitespaceAroundMathOperators: function() {
		        return addWhitespaceAroundMathOperators;
		    }
		});
		const LOWER_A = 0x61;
		const LOWER_Z = 0x7a;
		const UPPER_A = 0x41;
		const UPPER_Z = 0x5a;
		const LOWER_E = 0x65;
		const UPPER_E = 0x45;
		const ZERO = 0x30;
		const NINE = 0x39;
		const ADD = 0x2b;
		const SUB = 0x2d;
		const MUL = 0x2a;
		const DIV = 0x2f;
		const OPEN_PAREN = 0x28;
		const CLOSE_PAREN = 0x29;
		const COMMA = 0x2c;
		const SPACE = 0x20;
		const PERCENT = 0x25;
		const MATH_FUNCTIONS = [
		    "calc",
		    "min",
		    "max",
		    "clamp",
		    "mod",
		    "rem",
		    "sin",
		    "cos",
		    "tan",
		    "asin",
		    "acos",
		    "atan",
		    "atan2",
		    "pow",
		    "sqrt",
		    "hypot",
		    "log",
		    "exp",
		    "round"
		];
		function hasMathFn(input) {
		    return input.indexOf("(") !== -1 && MATH_FUNCTIONS.some((fn)=>input.includes(`${fn}(`));
		}
		function addWhitespaceAroundMathOperators(input) {
		    // Bail early if there are no math functions in the input
		    if (!MATH_FUNCTIONS.some((fn)=>input.includes(fn))) {
		        return input;
		    }
		    let result = "";
		    let formattable = [];
		    let valuePos = null;
		    let lastValuePos = null;
		    for(let i = 0; i < input.length; i++){
		        let char = input.charCodeAt(i);
		        // Track if we see a number followed by a unit, then we know for sure that
		        // this is not a function call.
		        if (char >= ZERO && char <= NINE) {
		            valuePos = i;
		        } else if (valuePos !== null && (char === PERCENT || char >= LOWER_A && char <= LOWER_Z || char >= UPPER_A && char <= UPPER_Z)) {
		            valuePos = i;
		        } else {
		            lastValuePos = valuePos;
		            valuePos = null;
		        }
		        // Determine if we're inside a math function
		        if (char === OPEN_PAREN) {
		            result += input[i];
		            // Scan backwards to determine the function name. This assumes math
		            // functions are named with lowercase alphanumeric characters.
		            let start = i;
		            for(let j = i - 1; j >= 0; j--){
		                let inner = input.charCodeAt(j);
		                if (inner >= ZERO && inner <= NINE) {
		                    start = j // 0-9
		                    ;
		                } else if (inner >= LOWER_A && inner <= LOWER_Z) {
		                    start = j // a-z
		                    ;
		                } else {
		                    break;
		                }
		            }
		            let fn = input.slice(start, i);
		            // This is a known math function so start formatting
		            if (MATH_FUNCTIONS.includes(fn)) {
		                formattable.unshift(true);
		                continue;
		            } else if (formattable[0] && fn === "") {
		                formattable.unshift(true);
		                continue;
		            }
		            // This is not a known math function so don't format it
		            formattable.unshift(false);
		            continue;
		        } else if (char === CLOSE_PAREN) {
		            result += input[i];
		            formattable.shift();
		        } else if (char === COMMA && formattable[0]) {
		            result += `, `;
		            continue;
		        } else if (char === SPACE && formattable[0] && result.charCodeAt(result.length - 1) === SPACE) {
		            continue;
		        } else if ((char === ADD || char === MUL || char === DIV || char === SUB) && formattable[0]) {
		            let trimmed = result.trimEnd();
		            let prev = trimmed.charCodeAt(trimmed.length - 1);
		            let prevPrev = trimmed.charCodeAt(trimmed.length - 2);
		            let next = input.charCodeAt(i + 1);
		            // Do not add spaces for scientific notation, e.g.: `-3.4e-2`
		            if ((prev === LOWER_E || prev === UPPER_E) && prevPrev >= ZERO && prevPrev <= NINE) {
		                result += input[i];
		                continue;
		            } else if (prev === ADD || prev === MUL || prev === DIV || prev === SUB) {
		                result += input[i];
		                continue;
		            } else if (prev === OPEN_PAREN || prev === COMMA) {
		                result += input[i];
		                continue;
		            } else if (input.charCodeAt(i - 1) === SPACE) {
		                result += `${input[i]} `;
		            } else if (// Previous is a digit
		            prev >= ZERO && prev <= NINE || // Next is a digit
		            next >= ZERO && next <= NINE || // Previous is end of a function call (or parenthesized expression)
		            prev === CLOSE_PAREN || // Next is start of a parenthesized expression
		            next === OPEN_PAREN || // Next is an operator
		            next === ADD || next === MUL || next === DIV || next === SUB || // Previous position was a value (+ unit)
		            lastValuePos !== null && lastValuePos === i - 1) {
		                result += ` ${input[i]} `;
		            } else {
		                result += input[i];
		            }
		        } else {
		            result += input[i];
		        }
		    }
		    return result;
		} 
	} (mathOperators));
	return mathOperators;
}

var parseBoxShadowValue = {};

var splitAtTopLevelOnly = {};

/**
 * This splits a string on a top-level character.
 *
 * Regex doesn't support recursion (at least not the JS-flavored version).
 * So we have to use a tiny state machine to keep track of paren placement.
 *
 * Expected behavior using commas:
 * var(--a, 0 0 1px rgb(0, 0, 0)), 0 0 1px rgb(0, 0, 0)
 *       ─┬─             ┬  ┬    ┬
 *        x              x  x    ╰──────── Split because top-level
 *        ╰──────────────┴──┴───────────── Ignored b/c inside >= 1 levels of parens
 *
 * @param {string} input
 * @param {string} separator
 */

var hasRequiredSplitAtTopLevelOnly;

function requireSplitAtTopLevelOnly () {
	if (hasRequiredSplitAtTopLevelOnly) return splitAtTopLevelOnly;
	hasRequiredSplitAtTopLevelOnly = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "splitAtTopLevelOnly", {
		    enumerable: true,
		    get: function() {
		        return splitAtTopLevelOnly;
		    }
		});
		function splitAtTopLevelOnly(input, separator) {
		    let stack = [];
		    let parts = [];
		    let lastPos = 0;
		    let isEscaped = false;
		    for(let idx = 0; idx < input.length; idx++){
		        let char = input[idx];
		        if (stack.length === 0 && char === separator[0] && !isEscaped) {
		            if (separator.length === 1 || input.slice(idx, idx + separator.length) === separator) {
		                parts.push(input.slice(lastPos, idx));
		                lastPos = idx + separator.length;
		            }
		        }
		        isEscaped = isEscaped ? false : char === "\\";
		        if (char === "(" || char === "[" || char === "{") {
		            stack.push(char);
		        } else if (char === ")" && stack[stack.length - 1] === "(" || char === "]" && stack[stack.length - 1] === "[" || char === "}" && stack[stack.length - 1] === "{") {
		            stack.pop();
		        }
		    }
		    parts.push(input.slice(lastPos));
		    return parts;
		} 
	} (splitAtTopLevelOnly));
	return splitAtTopLevelOnly;
}

var hasRequiredParseBoxShadowValue;

function requireParseBoxShadowValue () {
	if (hasRequiredParseBoxShadowValue) return parseBoxShadowValue;
	hasRequiredParseBoxShadowValue = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    parseBoxShadowValue: function() {
		        return parseBoxShadowValue;
		    },
		    formatBoxShadowValue: function() {
		        return formatBoxShadowValue;
		    }
		});
		const _splitAtTopLevelOnly = requireSplitAtTopLevelOnly();
		let KEYWORDS = new Set([
		    "inset",
		    "inherit",
		    "initial",
		    "revert",
		    "unset"
		]);
		let SPACE = /\ +(?![^(]*\))/g // Similar to the one above, but with spaces instead.
		;
		let LENGTH = /^-?(\d+|\.\d+)(.*?)$/g;
		function parseBoxShadowValue(input) {
		    let shadows = (0, _splitAtTopLevelOnly.splitAtTopLevelOnly)(input, ",");
		    return shadows.map((shadow)=>{
		        let value = shadow.trim();
		        let result = {
		            raw: value
		        };
		        let parts = value.split(SPACE);
		        let seen = new Set();
		        for (let part of parts){
		            // Reset index, since the regex is stateful.
		            LENGTH.lastIndex = 0;
		            // Keyword
		            if (!seen.has("KEYWORD") && KEYWORDS.has(part)) {
		                result.keyword = part;
		                seen.add("KEYWORD");
		            } else if (LENGTH.test(part)) {
		                if (!seen.has("X")) {
		                    result.x = part;
		                    seen.add("X");
		                } else if (!seen.has("Y")) {
		                    result.y = part;
		                    seen.add("Y");
		                } else if (!seen.has("BLUR")) {
		                    result.blur = part;
		                    seen.add("BLUR");
		                } else if (!seen.has("SPREAD")) {
		                    result.spread = part;
		                    seen.add("SPREAD");
		                }
		            } else {
		                if (!result.color) {
		                    result.color = part;
		                } else {
		                    if (!result.unknown) result.unknown = [];
		                    result.unknown.push(part);
		                }
		            }
		        }
		        // Check if valid
		        result.valid = result.x !== undefined && result.y !== undefined;
		        return result;
		    });
		}
		function formatBoxShadowValue(shadows) {
		    return shadows.map((shadow)=>{
		        if (!shadow.valid) {
		            return shadow.raw;
		        }
		        return [
		            shadow.keyword,
		            shadow.x,
		            shadow.y,
		            shadow.blur,
		            shadow.spread,
		            shadow.color
		        ].filter(Boolean).join(" ");
		    }).join(", ");
		} 
	} (parseBoxShadowValue));
	return parseBoxShadowValue;
}

var hasRequiredDataTypes;

function requireDataTypes () {
	if (hasRequiredDataTypes) return dataTypes;
	hasRequiredDataTypes = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    normalize: function() {
		        return normalize;
		    },
		    normalizeAttributeSelectors: function() {
		        return normalizeAttributeSelectors;
		    },
		    url: function() {
		        return url;
		    },
		    number: function() {
		        return number;
		    },
		    percentage: function() {
		        return percentage;
		    },
		    length: function() {
		        return length;
		    },
		    lineWidth: function() {
		        return lineWidth;
		    },
		    shadow: function() {
		        return shadow;
		    },
		    color: function() {
		        return color;
		    },
		    image: function() {
		        return image;
		    },
		    gradient: function() {
		        return gradient;
		    },
		    position: function() {
		        return position;
		    },
		    familyName: function() {
		        return familyName;
		    },
		    genericName: function() {
		        return genericName;
		    },
		    absoluteSize: function() {
		        return absoluteSize;
		    },
		    relativeSize: function() {
		        return relativeSize;
		    }
		});
		const _color = requireColor();
		const _mathoperators = requireMathOperators();
		const _parseBoxShadowValue = requireParseBoxShadowValue();
		const _splitAtTopLevelOnly = requireSplitAtTopLevelOnly();
		let cssFunctions = [
		    "min",
		    "max",
		    "clamp",
		    "calc"
		];
		// Ref: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Types
		function isCSSFunction(value) {
		    return cssFunctions.some((fn)=>new RegExp(`^${fn}\\(.*\\)`).test(value));
		}
		// These properties accept a `<dashed-ident>` as one of the values. This means that you can use them
		// as: `timeline-scope: --tl;`
		//
		// Without the `var(--tl)`, in these cases we don't want to normalize the value, and you should add
		// the `var()` yourself.
		//
		// More info:
		// - https://drafts.csswg.org/scroll-animations/#propdef-timeline-scope
		// - https://developer.mozilla.org/en-US/docs/Web/CSS/timeline-scope#dashed-ident
		// - https://www.w3.org/TR/css-anchor-position-1
		//
		const AUTO_VAR_INJECTION_EXCEPTIONS = new Set([
		    // Concrete properties
		    "scroll-timeline-name",
		    "timeline-scope",
		    "view-timeline-name",
		    "font-palette",
		    "anchor-name",
		    "anchor-scope",
		    "position-anchor",
		    "position-try-options",
		    // Shorthand properties
		    "scroll-timeline",
		    "animation-timeline",
		    "view-timeline",
		    "position-try"
		]);
		function normalize(value, context = null, isRoot = true) {
		    let isVarException = context && AUTO_VAR_INJECTION_EXCEPTIONS.has(context.property);
		    if (value.startsWith("--") && !isVarException) {
		        return `var(${value})`;
		    }
		    // Keep raw strings if it starts with `url(`
		    if (value.includes("url(")) {
		        return value.split(/(url\(.*?\))/g).filter(Boolean).map((part)=>{
		            if (/^url\(.*?\)$/.test(part)) {
		                return part;
		            }
		            return normalize(part, context, false);
		        }).join("");
		    }
		    // Convert `_` to ` `, except for escaped underscores `\_`
		    value = value.replace(/([^\\])_+/g, (fullMatch, characterBefore)=>characterBefore + " ".repeat(fullMatch.length - 1)).replace(/^_/g, " ").replace(/\\_/g, "_");
		    // Remove leftover whitespace
		    if (isRoot) {
		        value = value.trim();
		    }
		    value = (0, _mathoperators.addWhitespaceAroundMathOperators)(value);
		    return value;
		}
		function normalizeAttributeSelectors(value) {
		    // Wrap values in attribute selectors with quotes
		    if (value.includes("=")) {
		        value = value.replace(/(=.*)/g, (_fullMatch, match)=>{
		            if (match[1] === "'" || match[1] === '"') {
		                return match;
		            }
		            // Handle regex flags on unescaped values
		            if (match.length > 2) {
		                let trailingCharacter = match[match.length - 1];
		                if (match[match.length - 2] === " " && (trailingCharacter === "i" || trailingCharacter === "I" || trailingCharacter === "s" || trailingCharacter === "S")) {
		                    return `="${match.slice(1, -2)}" ${match[match.length - 1]}`;
		                }
		            }
		            return `="${match.slice(1)}"`;
		        });
		    }
		    return value;
		}
		function url(value) {
		    return value.startsWith("url(");
		}
		function number(value) {
		    return !isNaN(Number(value)) || isCSSFunction(value);
		}
		function percentage(value) {
		    return value.endsWith("%") && number(value.slice(0, -1)) || isCSSFunction(value);
		}
		// Please refer to MDN when updating this list:
		// https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Values_and_units
		// https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries#container_query_length_units
		let lengthUnits = [
		    "cm",
		    "mm",
		    "Q",
		    "in",
		    "pc",
		    "pt",
		    "px",
		    "em",
		    "ex",
		    "ch",
		    "rem",
		    "lh",
		    "rlh",
		    "vw",
		    "vh",
		    "vmin",
		    "vmax",
		    "vb",
		    "vi",
		    "svw",
		    "svh",
		    "lvw",
		    "lvh",
		    "dvw",
		    "dvh",
		    "cqw",
		    "cqh",
		    "cqi",
		    "cqb",
		    "cqmin",
		    "cqmax"
		];
		let lengthUnitsPattern = `(?:${lengthUnits.join("|")})`;
		function length(value) {
		    return value === "0" || new RegExp(`^[+-]?[0-9]*\.?[0-9]+(?:[eE][+-]?[0-9]+)?${lengthUnitsPattern}$`).test(value) || isCSSFunction(value);
		}
		let lineWidths = new Set([
		    "thin",
		    "medium",
		    "thick"
		]);
		function lineWidth(value) {
		    return lineWidths.has(value);
		}
		function shadow(value) {
		    let parsedShadows = (0, _parseBoxShadowValue.parseBoxShadowValue)(normalize(value));
		    for (let parsedShadow of parsedShadows){
		        if (!parsedShadow.valid) {
		            return false;
		        }
		    }
		    return true;
		}
		function color(value) {
		    let colors = 0;
		    let result = (0, _splitAtTopLevelOnly.splitAtTopLevelOnly)(value, "_").every((part)=>{
		        part = normalize(part);
		        if (part.startsWith("var(")) return true;
		        if ((0, _color.parseColor)(part, {
		            loose: true
		        }) !== null) return colors++, true;
		        return false;
		    });
		    if (!result) return false;
		    return colors > 0;
		}
		function image(value) {
		    let images = 0;
		    let result = (0, _splitAtTopLevelOnly.splitAtTopLevelOnly)(value, ",").every((part)=>{
		        part = normalize(part);
		        if (part.startsWith("var(")) return true;
		        if (url(part) || gradient(part) || [
		            "element(",
		            "image(",
		            "cross-fade(",
		            "image-set("
		        ].some((fn)=>part.startsWith(fn))) {
		            images++;
		            return true;
		        }
		        return false;
		    });
		    if (!result) return false;
		    return images > 0;
		}
		let gradientTypes = new Set([
		    "conic-gradient",
		    "linear-gradient",
		    "radial-gradient",
		    "repeating-conic-gradient",
		    "repeating-linear-gradient",
		    "repeating-radial-gradient"
		]);
		function gradient(value) {
		    value = normalize(value);
		    for (let type of gradientTypes){
		        if (value.startsWith(`${type}(`)) {
		            return true;
		        }
		    }
		    return false;
		}
		let validPositions = new Set([
		    "center",
		    "top",
		    "right",
		    "bottom",
		    "left"
		]);
		function position(value) {
		    let positions = 0;
		    let result = (0, _splitAtTopLevelOnly.splitAtTopLevelOnly)(value, "_").every((part)=>{
		        part = normalize(part);
		        if (part.startsWith("var(")) return true;
		        if (validPositions.has(part) || length(part) || percentage(part)) {
		            positions++;
		            return true;
		        }
		        return false;
		    });
		    if (!result) return false;
		    return positions > 0;
		}
		function familyName(value) {
		    let fonts = 0;
		    let result = (0, _splitAtTopLevelOnly.splitAtTopLevelOnly)(value, ",").every((part)=>{
		        part = normalize(part);
		        if (part.startsWith("var(")) return true;
		        // If it contains spaces, then it should be quoted
		        if (part.includes(" ")) {
		            if (!/(['"])([^"']+)\1/g.test(part)) {
		                return false;
		            }
		        }
		        // If it starts with a number, it's invalid
		        if (/^\d/g.test(part)) {
		            return false;
		        }
		        fonts++;
		        return true;
		    });
		    if (!result) return false;
		    return fonts > 0;
		}
		let genericNames = new Set([
		    "serif",
		    "sans-serif",
		    "monospace",
		    "cursive",
		    "fantasy",
		    "system-ui",
		    "ui-serif",
		    "ui-sans-serif",
		    "ui-monospace",
		    "ui-rounded",
		    "math",
		    "emoji",
		    "fangsong"
		]);
		function genericName(value) {
		    return genericNames.has(value);
		}
		let absoluteSizes = new Set([
		    "xx-small",
		    "x-small",
		    "small",
		    "medium",
		    "large",
		    "x-large",
		    "xx-large",
		    "xxx-large"
		]);
		function absoluteSize(value) {
		    return absoluteSizes.has(value);
		}
		let relativeSizes = new Set([
		    "larger",
		    "smaller"
		]);
		function relativeSize(value) {
		    return relativeSizes.has(value);
		} 
	} (dataTypes));
	return dataTypes;
}

var validateFormalSyntax = {};

var hasRequiredValidateFormalSyntax;

function requireValidateFormalSyntax () {
	if (hasRequiredValidateFormalSyntax) return validateFormalSyntax;
	hasRequiredValidateFormalSyntax = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "backgroundSize", {
		    enumerable: true,
		    get: function() {
		        return backgroundSize;
		    }
		});
		const _dataTypes = requireDataTypes();
		const _splitAtTopLevelOnly = requireSplitAtTopLevelOnly();
		function backgroundSize(value) {
		    let keywordValues = [
		        "cover",
		        "contain"
		    ];
		    // the <length-percentage> type will probably be a css function
		    // so we have to use `splitAtTopLevelOnly`
		    return (0, _splitAtTopLevelOnly.splitAtTopLevelOnly)(value, ",").every((part)=>{
		        let sizes = (0, _splitAtTopLevelOnly.splitAtTopLevelOnly)(part, "_").filter(Boolean);
		        if (sizes.length === 1 && keywordValues.includes(sizes[0])) return true;
		        if (sizes.length !== 1 && sizes.length !== 2) return false;
		        return sizes.every((size)=>(0, _dataTypes.length)(size) || (0, _dataTypes.percentage)(size) || size === "auto");
		    });
		} 
	} (validateFormalSyntax));
	return validateFormalSyntax;
}

var hasRequiredPluginUtils;

function requirePluginUtils () {
	if (hasRequiredPluginUtils) return pluginUtils;
	hasRequiredPluginUtils = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		function _export(target, all) {
		    for(var name in all)Object.defineProperty(target, name, {
		        enumerable: true,
		        get: all[name]
		    });
		}
		_export(exports, {
		    updateAllClasses: function() {
		        return updateAllClasses;
		    },
		    asValue: function() {
		        return asValue;
		    },
		    parseColorFormat: function() {
		        return parseColorFormat;
		    },
		    asColor: function() {
		        return asColor;
		    },
		    asLookupValue: function() {
		        return asLookupValue;
		    },
		    typeMap: function() {
		        return typeMap;
		    },
		    coerceValue: function() {
		        return coerceValue;
		    },
		    getMatchingTypes: function() {
		        return getMatchingTypes;
		    }
		});
		const _escapeCommas = /*#__PURE__*/ _interop_require_default(requireEscapeCommas());
		const _withAlphaVariable = requireWithAlphaVariable();
		const _dataTypes = requireDataTypes();
		const _negateValue = /*#__PURE__*/ _interop_require_default(requireNegateValue());
		const _validateFormalSyntax = requireValidateFormalSyntax();
		const _featureFlags = requireFeatureFlags();
		function _interop_require_default(obj) {
		    return obj && obj.__esModule ? obj : {
		        default: obj
		    };
		}
		function updateAllClasses(selectors, updateClass) {
		    selectors.walkClasses((sel)=>{
		        sel.value = updateClass(sel.value);
		        if (sel.raws && sel.raws.value) {
		            sel.raws.value = (0, _escapeCommas.default)(sel.raws.value);
		        }
		    });
		}
		function resolveArbitraryValue(modifier, validate) {
		    if (!isArbitraryValue(modifier)) {
		        return undefined;
		    }
		    let value = modifier.slice(1, -1);
		    if (!validate(value)) {
		        return undefined;
		    }
		    return (0, _dataTypes.normalize)(value);
		}
		function asNegativeValue(modifier, lookup = {}, validate) {
		    let positiveValue = lookup[modifier];
		    if (positiveValue !== undefined) {
		        return (0, _negateValue.default)(positiveValue);
		    }
		    if (isArbitraryValue(modifier)) {
		        let resolved = resolveArbitraryValue(modifier, validate);
		        if (resolved === undefined) {
		            return undefined;
		        }
		        return (0, _negateValue.default)(resolved);
		    }
		}
		function asValue(modifier, options = {}, { validate =()=>true  } = {}) {
		    var _options_values;
		    let value = (_options_values = options.values) === null || _options_values === void 0 ? void 0 : _options_values[modifier];
		    if (value !== undefined) {
		        return value;
		    }
		    if (options.supportsNegativeValues && modifier.startsWith("-")) {
		        return asNegativeValue(modifier.slice(1), options.values, validate);
		    }
		    return resolveArbitraryValue(modifier, validate);
		}
		function isArbitraryValue(input) {
		    return input.startsWith("[") && input.endsWith("]");
		}
		function splitUtilityModifier(modifier) {
		    let slashIdx = modifier.lastIndexOf("/");
		    // If the `/` is inside an arbitrary, we want to find the previous one if any
		    // This logic probably isn't perfect but it should work for most cases
		    let arbitraryStartIdx = modifier.lastIndexOf("[", slashIdx);
		    let arbitraryEndIdx = modifier.indexOf("]", slashIdx);
		    let isNextToArbitrary = modifier[slashIdx - 1] === "]" || modifier[slashIdx + 1] === "[";
		    // Backtrack to the previous `/` if the one we found was inside an arbitrary
		    if (!isNextToArbitrary) {
		        if (arbitraryStartIdx !== -1 && arbitraryEndIdx !== -1) {
		            if (arbitraryStartIdx < slashIdx && slashIdx < arbitraryEndIdx) {
		                slashIdx = modifier.lastIndexOf("/", arbitraryStartIdx);
		            }
		        }
		    }
		    if (slashIdx === -1 || slashIdx === modifier.length - 1) {
		        return [
		            modifier,
		            undefined
		        ];
		    }
		    let arbitrary = isArbitraryValue(modifier);
		    // The modifier could be of the form `[foo]/[bar]`
		    // We want to handle this case properly
		    // without affecting `[foo/bar]`
		    if (arbitrary && !modifier.includes("]/[")) {
		        return [
		            modifier,
		            undefined
		        ];
		    }
		    return [
		        modifier.slice(0, slashIdx),
		        modifier.slice(slashIdx + 1)
		    ];
		}
		function parseColorFormat(value) {
		    if (typeof value === "string" && value.includes("<alpha-value>")) {
		        let oldValue = value;
		        return ({ opacityValue =1  })=>oldValue.replace(/<alpha-value>/g, opacityValue);
		    }
		    return value;
		}
		function unwrapArbitraryModifier(modifier) {
		    return (0, _dataTypes.normalize)(modifier.slice(1, -1));
		}
		function asColor(modifier, options = {}, { tailwindConfig ={}  } = {}) {
		    var _options_values;
		    if (((_options_values = options.values) === null || _options_values === void 0 ? void 0 : _options_values[modifier]) !== undefined) {
		        var _options_values1;
		        return parseColorFormat((_options_values1 = options.values) === null || _options_values1 === void 0 ? void 0 : _options_values1[modifier]);
		    }
		    // TODO: Hoist this up to getMatchingTypes or something
		    // We do this here because we need the alpha value (if any)
		    let [color, alpha] = splitUtilityModifier(modifier);
		    if (alpha !== undefined) {
		        var _options_values2, _tailwindConfig_theme, _tailwindConfig_theme_opacity;
		        var _options_values_color;
		        let normalizedColor = (_options_values_color = (_options_values2 = options.values) === null || _options_values2 === void 0 ? void 0 : _options_values2[color]) !== null && _options_values_color !== void 0 ? _options_values_color : isArbitraryValue(color) ? color.slice(1, -1) : undefined;
		        if (normalizedColor === undefined) {
		            return undefined;
		        }
		        normalizedColor = parseColorFormat(normalizedColor);
		        if (isArbitraryValue(alpha)) {
		            return (0, _withAlphaVariable.withAlphaValue)(normalizedColor, unwrapArbitraryModifier(alpha));
		        }
		        if (((_tailwindConfig_theme = tailwindConfig.theme) === null || _tailwindConfig_theme === void 0 ? void 0 : (_tailwindConfig_theme_opacity = _tailwindConfig_theme.opacity) === null || _tailwindConfig_theme_opacity === void 0 ? void 0 : _tailwindConfig_theme_opacity[alpha]) === undefined) {
		            return undefined;
		        }
		        return (0, _withAlphaVariable.withAlphaValue)(normalizedColor, tailwindConfig.theme.opacity[alpha]);
		    }
		    return asValue(modifier, options, {
		        validate: _dataTypes.color
		    });
		}
		function asLookupValue(modifier, options = {}) {
		    var _options_values;
		    return (_options_values = options.values) === null || _options_values === void 0 ? void 0 : _options_values[modifier];
		}
		function guess(validate) {
		    return (modifier, options)=>{
		        return asValue(modifier, options, {
		            validate
		        });
		    };
		}
		let typeMap = {
		    any: asValue,
		    color: asColor,
		    url: guess(_dataTypes.url),
		    image: guess(_dataTypes.image),
		    length: guess(_dataTypes.length),
		    percentage: guess(_dataTypes.percentage),
		    position: guess(_dataTypes.position),
		    lookup: asLookupValue,
		    "generic-name": guess(_dataTypes.genericName),
		    "family-name": guess(_dataTypes.familyName),
		    number: guess(_dataTypes.number),
		    "line-width": guess(_dataTypes.lineWidth),
		    "absolute-size": guess(_dataTypes.absoluteSize),
		    "relative-size": guess(_dataTypes.relativeSize),
		    shadow: guess(_dataTypes.shadow),
		    size: guess(_validateFormalSyntax.backgroundSize)
		};
		let supportedTypes = Object.keys(typeMap);
		function splitAtFirst(input, delim) {
		    let idx = input.indexOf(delim);
		    if (idx === -1) return [
		        undefined,
		        input
		    ];
		    return [
		        input.slice(0, idx),
		        input.slice(idx + 1)
		    ];
		}
		function coerceValue(types, modifier, options, tailwindConfig) {
		    if (options.values && modifier in options.values) {
		        for (let { type  } of types !== null && types !== void 0 ? types : []){
		            let result = typeMap[type](modifier, options, {
		                tailwindConfig
		            });
		            if (result === undefined) {
		                continue;
		            }
		            return [
		                result,
		                type,
		                null
		            ];
		        }
		    }
		    if (isArbitraryValue(modifier)) {
		        let arbitraryValue = modifier.slice(1, -1);
		        let [explicitType, value] = splitAtFirst(arbitraryValue, ":");
		        // It could be that this resolves to `url(https` which is not a valid
		        // identifier. We currently only support "simple" words with dashes or
		        // underscores. E.g.: family-name
		        if (!/^[\w-_]+$/g.test(explicitType)) {
		            value = arbitraryValue;
		        } else if (explicitType !== undefined && !supportedTypes.includes(explicitType)) {
		            return [];
		        }
		        if (value.length > 0 && supportedTypes.includes(explicitType)) {
		            return [
		                asValue(`[${value}]`, options),
		                explicitType,
		                null
		            ];
		        }
		    }
		    let matches = getMatchingTypes(types, modifier, options, tailwindConfig);
		    // Find first matching type
		    for (let match of matches){
		        return match;
		    }
		    return [];
		}
		function* getMatchingTypes(types, rawModifier, options, tailwindConfig) {
		    let modifiersEnabled = (0, _featureFlags.flagEnabled)(tailwindConfig, "generalizedModifiers");
		    let [modifier, utilityModifier] = splitUtilityModifier(rawModifier);
		    let canUseUtilityModifier = modifiersEnabled && options.modifiers != null && (options.modifiers === "any" || typeof options.modifiers === "object" && (utilityModifier && isArbitraryValue(utilityModifier) || utilityModifier in options.modifiers));
		    if (!canUseUtilityModifier) {
		        modifier = rawModifier;
		        utilityModifier = undefined;
		    }
		    if (utilityModifier !== undefined && modifier === "") {
		        modifier = "DEFAULT";
		    }
		    // Check the full value first
		    // TODO: Move to asValue… somehow
		    if (utilityModifier !== undefined) {
		        if (typeof options.modifiers === "object") {
		            var _options_modifiers;
		            var _options_modifiers_utilityModifier;
		            let configValue = (_options_modifiers_utilityModifier = (_options_modifiers = options.modifiers) === null || _options_modifiers === void 0 ? void 0 : _options_modifiers[utilityModifier]) !== null && _options_modifiers_utilityModifier !== void 0 ? _options_modifiers_utilityModifier : null;
		            if (configValue !== null) {
		                utilityModifier = configValue;
		            } else if (isArbitraryValue(utilityModifier)) {
		                utilityModifier = unwrapArbitraryModifier(utilityModifier);
		            }
		        }
		    }
		    for (let { type  } of types !== null && types !== void 0 ? types : []){
		        let result = typeMap[type](modifier, options, {
		            tailwindConfig
		        });
		        if (result === undefined) {
		            continue;
		        }
		        yield [
		            result,
		            type,
		            utilityModifier !== null && utilityModifier !== void 0 ? utilityModifier : null
		        ];
		    }
		} 
	} (pluginUtils));
	return pluginUtils;
}

var toColorValue = {};

var hasRequiredToColorValue;

function requireToColorValue () {
	if (hasRequiredToColorValue) return toColorValue;
	hasRequiredToColorValue = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "default", {
		    enumerable: true,
		    get: function() {
		        return toColorValue;
		    }
		});
		function toColorValue(maybeFunction) {
		    return typeof maybeFunction === "function" ? maybeFunction({}) : maybeFunction;
		} 
	} (toColorValue));
	return toColorValue;
}

var hasRequiredResolveConfig$2;

function requireResolveConfig$2 () {
	if (hasRequiredResolveConfig$2) return resolveConfig$1;
	hasRequiredResolveConfig$2 = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "default", {
		    enumerable: true,
		    get: function() {
		        return resolveConfig;
		    }
		});
		const _negateValue = /*#__PURE__*/ _interop_require_default(requireNegateValue());
		const _corePluginList = /*#__PURE__*/ _interop_require_default(requireCorePluginList());
		const _configurePlugins = /*#__PURE__*/ _interop_require_default(requireConfigurePlugins());
		const _colors = /*#__PURE__*/ _interop_require_default(requireColors());
		const _defaults = requireDefaults();
		const _toPath = requireToPath();
		const _normalizeConfig = requireNormalizeConfig();
		const _isPlainObject = /*#__PURE__*/ _interop_require_default(requireIsPlainObject());
		const _cloneDeep = requireCloneDeep();
		const _pluginUtils = requirePluginUtils();
		const _withAlphaVariable = requireWithAlphaVariable();
		const _toColorValue = /*#__PURE__*/ _interop_require_default(requireToColorValue());
		function _interop_require_default(obj) {
		    return obj && obj.__esModule ? obj : {
		        default: obj
		    };
		}
		function isFunction(input) {
		    return typeof input === "function";
		}
		function mergeWith(target, ...sources) {
		    let customizer = sources.pop();
		    for (let source of sources){
		        for(let k in source){
		            let merged = customizer(target[k], source[k]);
		            if (merged === undefined) {
		                if ((0, _isPlainObject.default)(target[k]) && (0, _isPlainObject.default)(source[k])) {
		                    target[k] = mergeWith({}, target[k], source[k], customizer);
		                } else {
		                    target[k] = source[k];
		                }
		            } else {
		                target[k] = merged;
		            }
		        }
		    }
		    return target;
		}
		const configUtils = {
		    colors: _colors.default,
		    negative (scale) {
		        // TODO: Log that this function isn't really needed anymore?
		        return Object.keys(scale).filter((key)=>scale[key] !== "0").reduce((negativeScale, key)=>{
		            let negativeValue = (0, _negateValue.default)(scale[key]);
		            if (negativeValue !== undefined) {
		                negativeScale[`-${key}`] = negativeValue;
		            }
		            return negativeScale;
		        }, {});
		    },
		    breakpoints (screens) {
		        return Object.keys(screens).filter((key)=>typeof screens[key] === "string").reduce((breakpoints, key)=>({
		                ...breakpoints,
		                [`screen-${key}`]: screens[key]
		            }), {});
		    }
		};
		function value(valueToResolve, ...args) {
		    return isFunction(valueToResolve) ? valueToResolve(...args) : valueToResolve;
		}
		function collectExtends(items) {
		    return items.reduce((merged, { extend  })=>{
		        return mergeWith(merged, extend, (mergedValue, extendValue)=>{
		            if (mergedValue === undefined) {
		                return [
		                    extendValue
		                ];
		            }
		            if (Array.isArray(mergedValue)) {
		                return [
		                    extendValue,
		                    ...mergedValue
		                ];
		            }
		            return [
		                extendValue,
		                mergedValue
		            ];
		        });
		    }, {});
		}
		function mergeThemes(themes) {
		    return {
		        ...themes.reduce((merged, theme)=>(0, _defaults.defaults)(merged, theme), {}),
		        // In order to resolve n config objects, we combine all of their `extend` properties
		        // into arrays instead of objects so they aren't overridden.
		        extend: collectExtends(themes)
		    };
		}
		function mergeExtensionCustomizer(merged, value) {
		    // When we have an array of objects, we do want to merge it
		    if (Array.isArray(merged) && (0, _isPlainObject.default)(merged[0])) {
		        return merged.concat(value);
		    }
		    // When the incoming value is an array, and the existing config is an object, prepend the existing object
		    if (Array.isArray(value) && (0, _isPlainObject.default)(value[0]) && (0, _isPlainObject.default)(merged)) {
		        return [
		            merged,
		            ...value
		        ];
		    }
		    // Override arrays (for example for font-families, box-shadows, ...)
		    if (Array.isArray(value)) {
		        return value;
		    }
		    // Execute default behaviour
		    return undefined;
		}
		function mergeExtensions({ extend , ...theme }) {
		    return mergeWith(theme, extend, (themeValue, extensions)=>{
		        // The `extend` property is an array, so we need to check if it contains any functions
		        if (!isFunction(themeValue) && !extensions.some(isFunction)) {
		            return mergeWith({}, themeValue, ...extensions, mergeExtensionCustomizer);
		        }
		        return (resolveThemePath, utils)=>mergeWith({}, ...[
		                themeValue,
		                ...extensions
		            ].map((e)=>value(e, resolveThemePath, utils)), mergeExtensionCustomizer);
		    });
		}
		/**
		 *
		 * @param {string} key
		 * @return {Iterable<string[] & {alpha: string | undefined}>}
		 */ function* toPaths(key) {
		    let path = (0, _toPath.toPath)(key);
		    if (path.length === 0) {
		        return;
		    }
		    yield path;
		    if (Array.isArray(key)) {
		        return;
		    }
		    let pattern = /^(.*?)\s*\/\s*([^/]+)$/;
		    let matches = key.match(pattern);
		    if (matches !== null) {
		        let [, prefix, alpha] = matches;
		        let newPath = (0, _toPath.toPath)(prefix);
		        newPath.alpha = alpha;
		        yield newPath;
		    }
		}
		function resolveFunctionKeys(object) {
		    // theme('colors.red.500 / 0.5') -> ['colors', 'red', '500 / 0', '5]
		    const resolvePath = (key, defaultValue)=>{
		        for (const path of toPaths(key)){
		            let index = 0;
		            let val = object;
		            while(val !== undefined && val !== null && index < path.length){
		                val = val[path[index++]];
		                let shouldResolveAsFn = isFunction(val) && (path.alpha === undefined || index <= path.length - 1);
		                val = shouldResolveAsFn ? val(resolvePath, configUtils) : val;
		            }
		            if (val !== undefined) {
		                if (path.alpha !== undefined) {
		                    let normalized = (0, _pluginUtils.parseColorFormat)(val);
		                    return (0, _withAlphaVariable.withAlphaValue)(normalized, path.alpha, (0, _toColorValue.default)(normalized));
		                }
		                if ((0, _isPlainObject.default)(val)) {
		                    return (0, _cloneDeep.cloneDeep)(val);
		                }
		                return val;
		            }
		        }
		        return defaultValue;
		    };
		    Object.assign(resolvePath, {
		        theme: resolvePath,
		        ...configUtils
		    });
		    return Object.keys(object).reduce((resolved, key)=>{
		        resolved[key] = isFunction(object[key]) ? object[key](resolvePath, configUtils) : object[key];
		        return resolved;
		    }, {});
		}
		function extractPluginConfigs(configs) {
		    let allConfigs = [];
		    configs.forEach((config)=>{
		        allConfigs = [
		            ...allConfigs,
		            config
		        ];
		        var _config_plugins;
		        const plugins = (_config_plugins = config === null || config === void 0 ? void 0 : config.plugins) !== null && _config_plugins !== void 0 ? _config_plugins : [];
		        if (plugins.length === 0) {
		            return;
		        }
		        plugins.forEach((plugin)=>{
		            if (plugin.__isOptionsFunction) {
		                plugin = plugin();
		            }
		            var _plugin_config;
		            allConfigs = [
		                ...allConfigs,
		                ...extractPluginConfigs([
		                    (_plugin_config = plugin === null || plugin === void 0 ? void 0 : plugin.config) !== null && _plugin_config !== void 0 ? _plugin_config : {}
		                ])
		            ];
		        });
		    });
		    return allConfigs;
		}
		function resolveCorePlugins(corePluginConfigs) {
		    const result = [
		        ...corePluginConfigs
		    ].reduceRight((resolved, corePluginConfig)=>{
		        if (isFunction(corePluginConfig)) {
		            return corePluginConfig({
		                corePlugins: resolved
		            });
		        }
		        return (0, _configurePlugins.default)(corePluginConfig, resolved);
		    }, _corePluginList.default);
		    return result;
		}
		function resolvePluginLists(pluginLists) {
		    const result = [
		        ...pluginLists
		    ].reduceRight((resolved, pluginList)=>{
		        return [
		            ...resolved,
		            ...pluginList
		        ];
		    }, []);
		    return result;
		}
		function resolveConfig(configs) {
		    let allConfigs = [
		        ...extractPluginConfigs(configs),
		        {
		            prefix: "",
		            important: false,
		            separator: ":"
		        }
		    ];
		    var _t_theme, _c_plugins;
		    return (0, _normalizeConfig.normalizeConfig)((0, _defaults.defaults)({
		        theme: resolveFunctionKeys(mergeExtensions(mergeThemes(allConfigs.map((t)=>{
		            return (_t_theme = t === null || t === void 0 ? void 0 : t.theme) !== null && _t_theme !== void 0 ? _t_theme : {};
		        })))),
		        corePlugins: resolveCorePlugins(allConfigs.map((c)=>c.corePlugins)),
		        plugins: resolvePluginLists(configs.map((c)=>{
		            return (_c_plugins = c === null || c === void 0 ? void 0 : c.plugins) !== null && _c_plugins !== void 0 ? _c_plugins : [];
		        }))
		    }, ...allConfigs));
		} 
	} (resolveConfig$1));
	return resolveConfig$1;
}

var getAllConfigs = {};

var config_full;
var hasRequiredConfig_full;

function requireConfig_full () {
	if (hasRequiredConfig_full) return config_full;
	hasRequiredConfig_full = 1;
	config_full = {
	  content: [],
	  presets: [],
	  darkMode: 'media', // or 'class'
	  theme: {
	    accentColor: ({ theme }) => ({
	      ...theme('colors'),
	      auto: 'auto',
	    }),
	    animation: {
	      none: 'none',
	      spin: 'spin 1s linear infinite',
	      ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
	      pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
	      bounce: 'bounce 1s infinite',
	    },
	    aria: {
	      busy: 'busy="true"',
	      checked: 'checked="true"',
	      disabled: 'disabled="true"',
	      expanded: 'expanded="true"',
	      hidden: 'hidden="true"',
	      pressed: 'pressed="true"',
	      readonly: 'readonly="true"',
	      required: 'required="true"',
	      selected: 'selected="true"',
	    },
	    aspectRatio: {
	      auto: 'auto',
	      square: '1 / 1',
	      video: '16 / 9',
	    },
	    backdropBlur: ({ theme }) => theme('blur'),
	    backdropBrightness: ({ theme }) => theme('brightness'),
	    backdropContrast: ({ theme }) => theme('contrast'),
	    backdropGrayscale: ({ theme }) => theme('grayscale'),
	    backdropHueRotate: ({ theme }) => theme('hueRotate'),
	    backdropInvert: ({ theme }) => theme('invert'),
	    backdropOpacity: ({ theme }) => theme('opacity'),
	    backdropSaturate: ({ theme }) => theme('saturate'),
	    backdropSepia: ({ theme }) => theme('sepia'),
	    backgroundColor: ({ theme }) => theme('colors'),
	    backgroundImage: {
	      none: 'none',
	      'gradient-to-t': 'linear-gradient(to top, var(--tw-gradient-stops))',
	      'gradient-to-tr': 'linear-gradient(to top right, var(--tw-gradient-stops))',
	      'gradient-to-r': 'linear-gradient(to right, var(--tw-gradient-stops))',
	      'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
	      'gradient-to-b': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
	      'gradient-to-bl': 'linear-gradient(to bottom left, var(--tw-gradient-stops))',
	      'gradient-to-l': 'linear-gradient(to left, var(--tw-gradient-stops))',
	      'gradient-to-tl': 'linear-gradient(to top left, var(--tw-gradient-stops))',
	    },
	    backgroundOpacity: ({ theme }) => theme('opacity'),
	    backgroundPosition: {
	      bottom: 'bottom',
	      center: 'center',
	      left: 'left',
	      'left-bottom': 'left bottom',
	      'left-top': 'left top',
	      right: 'right',
	      'right-bottom': 'right bottom',
	      'right-top': 'right top',
	      top: 'top',
	    },
	    backgroundSize: {
	      auto: 'auto',
	      cover: 'cover',
	      contain: 'contain',
	    },
	    blur: {
	      0: '0',
	      none: '',
	      sm: '4px',
	      DEFAULT: '8px',
	      md: '12px',
	      lg: '16px',
	      xl: '24px',
	      '2xl': '40px',
	      '3xl': '64px',
	    },
	    borderColor: ({ theme }) => ({
	      ...theme('colors'),
	      DEFAULT: theme('colors.gray.200', 'currentColor'),
	    }),
	    borderOpacity: ({ theme }) => theme('opacity'),
	    borderRadius: {
	      none: '0px',
	      sm: '0.125rem',
	      DEFAULT: '0.25rem',
	      md: '0.375rem',
	      lg: '0.5rem',
	      xl: '0.75rem',
	      '2xl': '1rem',
	      '3xl': '1.5rem',
	      full: '9999px',
	    },
	    borderSpacing: ({ theme }) => ({
	      ...theme('spacing'),
	    }),
	    borderWidth: {
	      DEFAULT: '1px',
	      0: '0px',
	      2: '2px',
	      4: '4px',
	      8: '8px',
	    },
	    boxShadow: {
	      sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
	      DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
	      md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
	      lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
	      xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
	      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
	      inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
	      none: 'none',
	    },
	    boxShadowColor: ({ theme }) => theme('colors'),
	    brightness: {
	      0: '0',
	      50: '.5',
	      75: '.75',
	      90: '.9',
	      95: '.95',
	      100: '1',
	      105: '1.05',
	      110: '1.1',
	      125: '1.25',
	      150: '1.5',
	      200: '2',
	    },
	    caretColor: ({ theme }) => theme('colors'),
	    colors: ({ colors }) => ({
	      inherit: colors.inherit,
	      current: colors.current,
	      transparent: colors.transparent,
	      black: colors.black,
	      white: colors.white,
	      slate: colors.slate,
	      gray: colors.gray,
	      zinc: colors.zinc,
	      neutral: colors.neutral,
	      stone: colors.stone,
	      red: colors.red,
	      orange: colors.orange,
	      amber: colors.amber,
	      yellow: colors.yellow,
	      lime: colors.lime,
	      green: colors.green,
	      emerald: colors.emerald,
	      teal: colors.teal,
	      cyan: colors.cyan,
	      sky: colors.sky,
	      blue: colors.blue,
	      indigo: colors.indigo,
	      violet: colors.violet,
	      purple: colors.purple,
	      fuchsia: colors.fuchsia,
	      pink: colors.pink,
	      rose: colors.rose,
	    }),
	    columns: {
	      auto: 'auto',
	      1: '1',
	      2: '2',
	      3: '3',
	      4: '4',
	      5: '5',
	      6: '6',
	      7: '7',
	      8: '8',
	      9: '9',
	      10: '10',
	      11: '11',
	      12: '12',
	      '3xs': '16rem',
	      '2xs': '18rem',
	      xs: '20rem',
	      sm: '24rem',
	      md: '28rem',
	      lg: '32rem',
	      xl: '36rem',
	      '2xl': '42rem',
	      '3xl': '48rem',
	      '4xl': '56rem',
	      '5xl': '64rem',
	      '6xl': '72rem',
	      '7xl': '80rem',
	    },
	    container: {},
	    content: {
	      none: 'none',
	    },
	    contrast: {
	      0: '0',
	      50: '.5',
	      75: '.75',
	      100: '1',
	      125: '1.25',
	      150: '1.5',
	      200: '2',
	    },
	    cursor: {
	      auto: 'auto',
	      default: 'default',
	      pointer: 'pointer',
	      wait: 'wait',
	      text: 'text',
	      move: 'move',
	      help: 'help',
	      'not-allowed': 'not-allowed',
	      none: 'none',
	      'context-menu': 'context-menu',
	      progress: 'progress',
	      cell: 'cell',
	      crosshair: 'crosshair',
	      'vertical-text': 'vertical-text',
	      alias: 'alias',
	      copy: 'copy',
	      'no-drop': 'no-drop',
	      grab: 'grab',
	      grabbing: 'grabbing',
	      'all-scroll': 'all-scroll',
	      'col-resize': 'col-resize',
	      'row-resize': 'row-resize',
	      'n-resize': 'n-resize',
	      'e-resize': 'e-resize',
	      's-resize': 's-resize',
	      'w-resize': 'w-resize',
	      'ne-resize': 'ne-resize',
	      'nw-resize': 'nw-resize',
	      'se-resize': 'se-resize',
	      'sw-resize': 'sw-resize',
	      'ew-resize': 'ew-resize',
	      'ns-resize': 'ns-resize',
	      'nesw-resize': 'nesw-resize',
	      'nwse-resize': 'nwse-resize',
	      'zoom-in': 'zoom-in',
	      'zoom-out': 'zoom-out',
	    },
	    divideColor: ({ theme }) => theme('borderColor'),
	    divideOpacity: ({ theme }) => theme('borderOpacity'),
	    divideWidth: ({ theme }) => theme('borderWidth'),
	    dropShadow: {
	      sm: '0 1px 1px rgb(0 0 0 / 0.05)',
	      DEFAULT: ['0 1px 2px rgb(0 0 0 / 0.1)', '0 1px 1px rgb(0 0 0 / 0.06)'],
	      md: ['0 4px 3px rgb(0 0 0 / 0.07)', '0 2px 2px rgb(0 0 0 / 0.06)'],
	      lg: ['0 10px 8px rgb(0 0 0 / 0.04)', '0 4px 3px rgb(0 0 0 / 0.1)'],
	      xl: ['0 20px 13px rgb(0 0 0 / 0.03)', '0 8px 5px rgb(0 0 0 / 0.08)'],
	      '2xl': '0 25px 25px rgb(0 0 0 / 0.15)',
	      none: '0 0 #0000',
	    },
	    fill: ({ theme }) => ({
	      none: 'none',
	      ...theme('colors'),
	    }),
	    flex: {
	      1: '1 1 0%',
	      auto: '1 1 auto',
	      initial: '0 1 auto',
	      none: 'none',
	    },
	    flexBasis: ({ theme }) => ({
	      auto: 'auto',
	      ...theme('spacing'),
	      '1/2': '50%',
	      '1/3': '33.333333%',
	      '2/3': '66.666667%',
	      '1/4': '25%',
	      '2/4': '50%',
	      '3/4': '75%',
	      '1/5': '20%',
	      '2/5': '40%',
	      '3/5': '60%',
	      '4/5': '80%',
	      '1/6': '16.666667%',
	      '2/6': '33.333333%',
	      '3/6': '50%',
	      '4/6': '66.666667%',
	      '5/6': '83.333333%',
	      '1/12': '8.333333%',
	      '2/12': '16.666667%',
	      '3/12': '25%',
	      '4/12': '33.333333%',
	      '5/12': '41.666667%',
	      '6/12': '50%',
	      '7/12': '58.333333%',
	      '8/12': '66.666667%',
	      '9/12': '75%',
	      '10/12': '83.333333%',
	      '11/12': '91.666667%',
	      full: '100%',
	    }),
	    flexGrow: {
	      0: '0',
	      DEFAULT: '1',
	    },
	    flexShrink: {
	      0: '0',
	      DEFAULT: '1',
	    },
	    fontFamily: {
	      sans: [
	        'ui-sans-serif',
	        'system-ui',
	        'sans-serif',
	        '"Apple Color Emoji"',
	        '"Segoe UI Emoji"',
	        '"Segoe UI Symbol"',
	        '"Noto Color Emoji"',
	      ],
	      serif: ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
	      mono: [
	        'ui-monospace',
	        'SFMono-Regular',
	        'Menlo',
	        'Monaco',
	        'Consolas',
	        '"Liberation Mono"',
	        '"Courier New"',
	        'monospace',
	      ],
	    },
	    fontSize: {
	      xs: ['0.75rem', { lineHeight: '1rem' }],
	      sm: ['0.875rem', { lineHeight: '1.25rem' }],
	      base: ['1rem', { lineHeight: '1.5rem' }],
	      lg: ['1.125rem', { lineHeight: '1.75rem' }],
	      xl: ['1.25rem', { lineHeight: '1.75rem' }],
	      '2xl': ['1.5rem', { lineHeight: '2rem' }],
	      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
	      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
	      '5xl': ['3rem', { lineHeight: '1' }],
	      '6xl': ['3.75rem', { lineHeight: '1' }],
	      '7xl': ['4.5rem', { lineHeight: '1' }],
	      '8xl': ['6rem', { lineHeight: '1' }],
	      '9xl': ['8rem', { lineHeight: '1' }],
	    },
	    fontWeight: {
	      thin: '100',
	      extralight: '200',
	      light: '300',
	      normal: '400',
	      medium: '500',
	      semibold: '600',
	      bold: '700',
	      extrabold: '800',
	      black: '900',
	    },
	    gap: ({ theme }) => theme('spacing'),
	    gradientColorStops: ({ theme }) => theme('colors'),
	    gradientColorStopPositions: {
	      '0%': '0%',
	      '5%': '5%',
	      '10%': '10%',
	      '15%': '15%',
	      '20%': '20%',
	      '25%': '25%',
	      '30%': '30%',
	      '35%': '35%',
	      '40%': '40%',
	      '45%': '45%',
	      '50%': '50%',
	      '55%': '55%',
	      '60%': '60%',
	      '65%': '65%',
	      '70%': '70%',
	      '75%': '75%',
	      '80%': '80%',
	      '85%': '85%',
	      '90%': '90%',
	      '95%': '95%',
	      '100%': '100%',
	    },
	    grayscale: {
	      0: '0',
	      DEFAULT: '100%',
	    },
	    gridAutoColumns: {
	      auto: 'auto',
	      min: 'min-content',
	      max: 'max-content',
	      fr: 'minmax(0, 1fr)',
	    },
	    gridAutoRows: {
	      auto: 'auto',
	      min: 'min-content',
	      max: 'max-content',
	      fr: 'minmax(0, 1fr)',
	    },
	    gridColumn: {
	      auto: 'auto',
	      'span-1': 'span 1 / span 1',
	      'span-2': 'span 2 / span 2',
	      'span-3': 'span 3 / span 3',
	      'span-4': 'span 4 / span 4',
	      'span-5': 'span 5 / span 5',
	      'span-6': 'span 6 / span 6',
	      'span-7': 'span 7 / span 7',
	      'span-8': 'span 8 / span 8',
	      'span-9': 'span 9 / span 9',
	      'span-10': 'span 10 / span 10',
	      'span-11': 'span 11 / span 11',
	      'span-12': 'span 12 / span 12',
	      'span-full': '1 / -1',
	    },
	    gridColumnEnd: {
	      auto: 'auto',
	      1: '1',
	      2: '2',
	      3: '3',
	      4: '4',
	      5: '5',
	      6: '6',
	      7: '7',
	      8: '8',
	      9: '9',
	      10: '10',
	      11: '11',
	      12: '12',
	      13: '13',
	    },
	    gridColumnStart: {
	      auto: 'auto',
	      1: '1',
	      2: '2',
	      3: '3',
	      4: '4',
	      5: '5',
	      6: '6',
	      7: '7',
	      8: '8',
	      9: '9',
	      10: '10',
	      11: '11',
	      12: '12',
	      13: '13',
	    },
	    gridRow: {
	      auto: 'auto',
	      'span-1': 'span 1 / span 1',
	      'span-2': 'span 2 / span 2',
	      'span-3': 'span 3 / span 3',
	      'span-4': 'span 4 / span 4',
	      'span-5': 'span 5 / span 5',
	      'span-6': 'span 6 / span 6',
	      'span-7': 'span 7 / span 7',
	      'span-8': 'span 8 / span 8',
	      'span-9': 'span 9 / span 9',
	      'span-10': 'span 10 / span 10',
	      'span-11': 'span 11 / span 11',
	      'span-12': 'span 12 / span 12',
	      'span-full': '1 / -1',
	    },
	    gridRowEnd: {
	      auto: 'auto',
	      1: '1',
	      2: '2',
	      3: '3',
	      4: '4',
	      5: '5',
	      6: '6',
	      7: '7',
	      8: '8',
	      9: '9',
	      10: '10',
	      11: '11',
	      12: '12',
	      13: '13',
	    },
	    gridRowStart: {
	      auto: 'auto',
	      1: '1',
	      2: '2',
	      3: '3',
	      4: '4',
	      5: '5',
	      6: '6',
	      7: '7',
	      8: '8',
	      9: '9',
	      10: '10',
	      11: '11',
	      12: '12',
	      13: '13',
	    },
	    gridTemplateColumns: {
	      none: 'none',
	      subgrid: 'subgrid',
	      1: 'repeat(1, minmax(0, 1fr))',
	      2: 'repeat(2, minmax(0, 1fr))',
	      3: 'repeat(3, minmax(0, 1fr))',
	      4: 'repeat(4, minmax(0, 1fr))',
	      5: 'repeat(5, minmax(0, 1fr))',
	      6: 'repeat(6, minmax(0, 1fr))',
	      7: 'repeat(7, minmax(0, 1fr))',
	      8: 'repeat(8, minmax(0, 1fr))',
	      9: 'repeat(9, minmax(0, 1fr))',
	      10: 'repeat(10, minmax(0, 1fr))',
	      11: 'repeat(11, minmax(0, 1fr))',
	      12: 'repeat(12, minmax(0, 1fr))',
	    },
	    gridTemplateRows: {
	      none: 'none',
	      subgrid: 'subgrid',
	      1: 'repeat(1, minmax(0, 1fr))',
	      2: 'repeat(2, minmax(0, 1fr))',
	      3: 'repeat(3, minmax(0, 1fr))',
	      4: 'repeat(4, minmax(0, 1fr))',
	      5: 'repeat(5, minmax(0, 1fr))',
	      6: 'repeat(6, minmax(0, 1fr))',
	      7: 'repeat(7, minmax(0, 1fr))',
	      8: 'repeat(8, minmax(0, 1fr))',
	      9: 'repeat(9, minmax(0, 1fr))',
	      10: 'repeat(10, minmax(0, 1fr))',
	      11: 'repeat(11, minmax(0, 1fr))',
	      12: 'repeat(12, minmax(0, 1fr))',
	    },
	    height: ({ theme }) => ({
	      auto: 'auto',
	      ...theme('spacing'),
	      '1/2': '50%',
	      '1/3': '33.333333%',
	      '2/3': '66.666667%',
	      '1/4': '25%',
	      '2/4': '50%',
	      '3/4': '75%',
	      '1/5': '20%',
	      '2/5': '40%',
	      '3/5': '60%',
	      '4/5': '80%',
	      '1/6': '16.666667%',
	      '2/6': '33.333333%',
	      '3/6': '50%',
	      '4/6': '66.666667%',
	      '5/6': '83.333333%',
	      full: '100%',
	      screen: '100vh',
	      svh: '100svh',
	      lvh: '100lvh',
	      dvh: '100dvh',
	      min: 'min-content',
	      max: 'max-content',
	      fit: 'fit-content',
	    }),
	    hueRotate: {
	      0: '0deg',
	      15: '15deg',
	      30: '30deg',
	      60: '60deg',
	      90: '90deg',
	      180: '180deg',
	    },
	    inset: ({ theme }) => ({
	      auto: 'auto',
	      ...theme('spacing'),
	      '1/2': '50%',
	      '1/3': '33.333333%',
	      '2/3': '66.666667%',
	      '1/4': '25%',
	      '2/4': '50%',
	      '3/4': '75%',
	      full: '100%',
	    }),
	    invert: {
	      0: '0',
	      DEFAULT: '100%',
	    },
	    keyframes: {
	      spin: {
	        to: {
	          transform: 'rotate(360deg)',
	        },
	      },
	      ping: {
	        '75%, 100%': {
	          transform: 'scale(2)',
	          opacity: '0',
	        },
	      },
	      pulse: {
	        '50%': {
	          opacity: '.5',
	        },
	      },
	      bounce: {
	        '0%, 100%': {
	          transform: 'translateY(-25%)',
	          animationTimingFunction: 'cubic-bezier(0.8,0,1,1)',
	        },
	        '50%': {
	          transform: 'none',
	          animationTimingFunction: 'cubic-bezier(0,0,0.2,1)',
	        },
	      },
	    },
	    letterSpacing: {
	      tighter: '-0.05em',
	      tight: '-0.025em',
	      normal: '0em',
	      wide: '0.025em',
	      wider: '0.05em',
	      widest: '0.1em',
	    },
	    lineHeight: {
	      none: '1',
	      tight: '1.25',
	      snug: '1.375',
	      normal: '1.5',
	      relaxed: '1.625',
	      loose: '2',
	      3: '.75rem',
	      4: '1rem',
	      5: '1.25rem',
	      6: '1.5rem',
	      7: '1.75rem',
	      8: '2rem',
	      9: '2.25rem',
	      10: '2.5rem',
	    },
	    listStyleType: {
	      none: 'none',
	      disc: 'disc',
	      decimal: 'decimal',
	    },
	    listStyleImage: {
	      none: 'none',
	    },
	    margin: ({ theme }) => ({
	      auto: 'auto',
	      ...theme('spacing'),
	    }),
	    lineClamp: {
	      1: '1',
	      2: '2',
	      3: '3',
	      4: '4',
	      5: '5',
	      6: '6',
	    },
	    maxHeight: ({ theme }) => ({
	      ...theme('spacing'),
	      none: 'none',
	      full: '100%',
	      screen: '100vh',
	      svh: '100svh',
	      lvh: '100lvh',
	      dvh: '100dvh',
	      min: 'min-content',
	      max: 'max-content',
	      fit: 'fit-content',
	    }),
	    maxWidth: ({ theme, breakpoints }) => ({
	      ...theme('spacing'),
	      none: 'none',
	      xs: '20rem',
	      sm: '24rem',
	      md: '28rem',
	      lg: '32rem',
	      xl: '36rem',
	      '2xl': '42rem',
	      '3xl': '48rem',
	      '4xl': '56rem',
	      '5xl': '64rem',
	      '6xl': '72rem',
	      '7xl': '80rem',
	      full: '100%',
	      min: 'min-content',
	      max: 'max-content',
	      fit: 'fit-content',
	      prose: '65ch',
	      ...breakpoints(theme('screens')),
	    }),
	    minHeight: ({ theme }) => ({
	      ...theme('spacing'),
	      full: '100%',
	      screen: '100vh',
	      svh: '100svh',
	      lvh: '100lvh',
	      dvh: '100dvh',
	      min: 'min-content',
	      max: 'max-content',
	      fit: 'fit-content',
	    }),
	    minWidth: ({ theme }) => ({
	      ...theme('spacing'),
	      full: '100%',
	      min: 'min-content',
	      max: 'max-content',
	      fit: 'fit-content',
	    }),
	    objectPosition: {
	      bottom: 'bottom',
	      center: 'center',
	      left: 'left',
	      'left-bottom': 'left bottom',
	      'left-top': 'left top',
	      right: 'right',
	      'right-bottom': 'right bottom',
	      'right-top': 'right top',
	      top: 'top',
	    },
	    opacity: {
	      0: '0',
	      5: '0.05',
	      10: '0.1',
	      15: '0.15',
	      20: '0.2',
	      25: '0.25',
	      30: '0.3',
	      35: '0.35',
	      40: '0.4',
	      45: '0.45',
	      50: '0.5',
	      55: '0.55',
	      60: '0.6',
	      65: '0.65',
	      70: '0.7',
	      75: '0.75',
	      80: '0.8',
	      85: '0.85',
	      90: '0.9',
	      95: '0.95',
	      100: '1',
	    },
	    order: {
	      first: '-9999',
	      last: '9999',
	      none: '0',
	      1: '1',
	      2: '2',
	      3: '3',
	      4: '4',
	      5: '5',
	      6: '6',
	      7: '7',
	      8: '8',
	      9: '9',
	      10: '10',
	      11: '11',
	      12: '12',
	    },
	    outlineColor: ({ theme }) => theme('colors'),
	    outlineOffset: {
	      0: '0px',
	      1: '1px',
	      2: '2px',
	      4: '4px',
	      8: '8px',
	    },
	    outlineWidth: {
	      0: '0px',
	      1: '1px',
	      2: '2px',
	      4: '4px',
	      8: '8px',
	    },
	    padding: ({ theme }) => theme('spacing'),
	    placeholderColor: ({ theme }) => theme('colors'),
	    placeholderOpacity: ({ theme }) => theme('opacity'),
	    ringColor: ({ theme }) => ({
	      DEFAULT: theme('colors.blue.500', '#3b82f6'),
	      ...theme('colors'),
	    }),
	    ringOffsetColor: ({ theme }) => theme('colors'),
	    ringOffsetWidth: {
	      0: '0px',
	      1: '1px',
	      2: '2px',
	      4: '4px',
	      8: '8px',
	    },
	    ringOpacity: ({ theme }) => ({
	      DEFAULT: '0.5',
	      ...theme('opacity'),
	    }),
	    ringWidth: {
	      DEFAULT: '3px',
	      0: '0px',
	      1: '1px',
	      2: '2px',
	      4: '4px',
	      8: '8px',
	    },
	    rotate: {
	      0: '0deg',
	      1: '1deg',
	      2: '2deg',
	      3: '3deg',
	      6: '6deg',
	      12: '12deg',
	      45: '45deg',
	      90: '90deg',
	      180: '180deg',
	    },
	    saturate: {
	      0: '0',
	      50: '.5',
	      100: '1',
	      150: '1.5',
	      200: '2',
	    },
	    scale: {
	      0: '0',
	      50: '.5',
	      75: '.75',
	      90: '.9',
	      95: '.95',
	      100: '1',
	      105: '1.05',
	      110: '1.1',
	      125: '1.25',
	      150: '1.5',
	    },
	    screens: {
	      sm: '640px',
	      md: '768px',
	      lg: '1024px',
	      xl: '1280px',
	      '2xl': '1536px',
	    },
	    scrollMargin: ({ theme }) => ({
	      ...theme('spacing'),
	    }),
	    scrollPadding: ({ theme }) => theme('spacing'),
	    sepia: {
	      0: '0',
	      DEFAULT: '100%',
	    },
	    skew: {
	      0: '0deg',
	      1: '1deg',
	      2: '2deg',
	      3: '3deg',
	      6: '6deg',
	      12: '12deg',
	    },
	    space: ({ theme }) => ({
	      ...theme('spacing'),
	    }),
	    spacing: {
	      px: '1px',
	      0: '0px',
	      0.5: '0.125rem',
	      1: '0.25rem',
	      1.5: '0.375rem',
	      2: '0.5rem',
	      2.5: '0.625rem',
	      3: '0.75rem',
	      3.5: '0.875rem',
	      4: '1rem',
	      5: '1.25rem',
	      6: '1.5rem',
	      7: '1.75rem',
	      8: '2rem',
	      9: '2.25rem',
	      10: '2.5rem',
	      11: '2.75rem',
	      12: '3rem',
	      14: '3.5rem',
	      16: '4rem',
	      20: '5rem',
	      24: '6rem',
	      28: '7rem',
	      32: '8rem',
	      36: '9rem',
	      40: '10rem',
	      44: '11rem',
	      48: '12rem',
	      52: '13rem',
	      56: '14rem',
	      60: '15rem',
	      64: '16rem',
	      72: '18rem',
	      80: '20rem',
	      96: '24rem',
	    },
	    stroke: ({ theme }) => ({
	      none: 'none',
	      ...theme('colors'),
	    }),
	    strokeWidth: {
	      0: '0',
	      1: '1',
	      2: '2',
	    },
	    supports: {},
	    data: {},
	    textColor: ({ theme }) => theme('colors'),
	    textDecorationColor: ({ theme }) => theme('colors'),
	    textDecorationThickness: {
	      auto: 'auto',
	      'from-font': 'from-font',
	      0: '0px',
	      1: '1px',
	      2: '2px',
	      4: '4px',
	      8: '8px',
	    },
	    textIndent: ({ theme }) => ({
	      ...theme('spacing'),
	    }),
	    textOpacity: ({ theme }) => theme('opacity'),
	    textUnderlineOffset: {
	      auto: 'auto',
	      0: '0px',
	      1: '1px',
	      2: '2px',
	      4: '4px',
	      8: '8px',
	    },
	    transformOrigin: {
	      center: 'center',
	      top: 'top',
	      'top-right': 'top right',
	      right: 'right',
	      'bottom-right': 'bottom right',
	      bottom: 'bottom',
	      'bottom-left': 'bottom left',
	      left: 'left',
	      'top-left': 'top left',
	    },
	    transitionDelay: {
	      0: '0s',
	      75: '75ms',
	      100: '100ms',
	      150: '150ms',
	      200: '200ms',
	      300: '300ms',
	      500: '500ms',
	      700: '700ms',
	      1000: '1000ms',
	    },
	    transitionDuration: {
	      DEFAULT: '150ms',
	      0: '0s',
	      75: '75ms',
	      100: '100ms',
	      150: '150ms',
	      200: '200ms',
	      300: '300ms',
	      500: '500ms',
	      700: '700ms',
	      1000: '1000ms',
	    },
	    transitionProperty: {
	      none: 'none',
	      all: 'all',
	      DEFAULT:
	        'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
	      colors: 'color, background-color, border-color, text-decoration-color, fill, stroke',
	      opacity: 'opacity',
	      shadow: 'box-shadow',
	      transform: 'transform',
	    },
	    transitionTimingFunction: {
	      DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
	      linear: 'linear',
	      in: 'cubic-bezier(0.4, 0, 1, 1)',
	      out: 'cubic-bezier(0, 0, 0.2, 1)',
	      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
	    },
	    translate: ({ theme }) => ({
	      ...theme('spacing'),
	      '1/2': '50%',
	      '1/3': '33.333333%',
	      '2/3': '66.666667%',
	      '1/4': '25%',
	      '2/4': '50%',
	      '3/4': '75%',
	      full: '100%',
	    }),
	    size: ({ theme }) => ({
	      auto: 'auto',
	      ...theme('spacing'),
	      '1/2': '50%',
	      '1/3': '33.333333%',
	      '2/3': '66.666667%',
	      '1/4': '25%',
	      '2/4': '50%',
	      '3/4': '75%',
	      '1/5': '20%',
	      '2/5': '40%',
	      '3/5': '60%',
	      '4/5': '80%',
	      '1/6': '16.666667%',
	      '2/6': '33.333333%',
	      '3/6': '50%',
	      '4/6': '66.666667%',
	      '5/6': '83.333333%',
	      '1/12': '8.333333%',
	      '2/12': '16.666667%',
	      '3/12': '25%',
	      '4/12': '33.333333%',
	      '5/12': '41.666667%',
	      '6/12': '50%',
	      '7/12': '58.333333%',
	      '8/12': '66.666667%',
	      '9/12': '75%',
	      '10/12': '83.333333%',
	      '11/12': '91.666667%',
	      full: '100%',
	      min: 'min-content',
	      max: 'max-content',
	      fit: 'fit-content',
	    }),
	    width: ({ theme }) => ({
	      auto: 'auto',
	      ...theme('spacing'),
	      '1/2': '50%',
	      '1/3': '33.333333%',
	      '2/3': '66.666667%',
	      '1/4': '25%',
	      '2/4': '50%',
	      '3/4': '75%',
	      '1/5': '20%',
	      '2/5': '40%',
	      '3/5': '60%',
	      '4/5': '80%',
	      '1/6': '16.666667%',
	      '2/6': '33.333333%',
	      '3/6': '50%',
	      '4/6': '66.666667%',
	      '5/6': '83.333333%',
	      '1/12': '8.333333%',
	      '2/12': '16.666667%',
	      '3/12': '25%',
	      '4/12': '33.333333%',
	      '5/12': '41.666667%',
	      '6/12': '50%',
	      '7/12': '58.333333%',
	      '8/12': '66.666667%',
	      '9/12': '75%',
	      '10/12': '83.333333%',
	      '11/12': '91.666667%',
	      full: '100%',
	      screen: '100vw',
	      svw: '100svw',
	      lvw: '100lvw',
	      dvw: '100dvw',
	      min: 'min-content',
	      max: 'max-content',
	      fit: 'fit-content',
	    }),
	    willChange: {
	      auto: 'auto',
	      scroll: 'scroll-position',
	      contents: 'contents',
	      transform: 'transform',
	    },
	    zIndex: {
	      auto: 'auto',
	      0: '0',
	      10: '10',
	      20: '20',
	      30: '30',
	      40: '40',
	      50: '50',
	    },
	  },
	  plugins: [],
	};
	return config_full;
}

var hasRequiredGetAllConfigs;

function requireGetAllConfigs () {
	if (hasRequiredGetAllConfigs) return getAllConfigs;
	hasRequiredGetAllConfigs = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "default", {
		    enumerable: true,
		    get: function() {
		        return getAllConfigs;
		    }
		});
		const _configfull = /*#__PURE__*/ _interop_require_default(requireConfig_full());
		const _featureFlags = requireFeatureFlags();
		function _interop_require_default(obj) {
		    return obj && obj.__esModule ? obj : {
		        default: obj
		    };
		}
		function getAllConfigs(config) {
		    var _config_presets;
		    const configs = ((_config_presets = config === null || config === void 0 ? void 0 : config.presets) !== null && _config_presets !== void 0 ? _config_presets : [
		        _configfull.default
		    ]).slice().reverse().flatMap((preset)=>getAllConfigs(preset instanceof Function ? preset() : preset));
		    const features = {
		        // Add experimental configs here...
		        respectDefaultRingColorOpacity: {
		            theme: {
		                ringColor: ({ theme  })=>({
		                        DEFAULT: "#3b82f67f",
		                        ...theme("colors")
		                    })
		            }
		        },
		        disableColorOpacityUtilitiesByDefault: {
		            corePlugins: {
		                backgroundOpacity: false,
		                borderOpacity: false,
		                divideOpacity: false,
		                placeholderOpacity: false,
		                ringOpacity: false,
		                textOpacity: false
		            }
		        }
		    };
		    const experimentals = Object.keys(features).filter((feature)=>(0, _featureFlags.flagEnabled)(config, feature)).map((feature)=>features[feature]);
		    return [
		        config,
		        ...experimentals,
		        ...configs
		    ];
		} 
	} (getAllConfigs));
	return getAllConfigs;
}

var hasRequiredResolveConfig$1;

function requireResolveConfig$1 () {
	if (hasRequiredResolveConfig$1) return resolveConfig$2;
	hasRequiredResolveConfig$1 = 1;
	(function (exports) {
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		Object.defineProperty(exports, "default", {
		    enumerable: true,
		    get: function() {
		        return resolveConfig;
		    }
		});
		const _resolveConfig = /*#__PURE__*/ _interop_require_default(requireResolveConfig$2());
		const _getAllConfigs = /*#__PURE__*/ _interop_require_default(requireGetAllConfigs());
		function _interop_require_default(obj) {
		    return obj && obj.__esModule ? obj : {
		        default: obj
		    };
		}
		function resolveConfig(...configs) {
		    let [, ...defaultConfigs] = (0, _getAllConfigs.default)(configs[0]);
		    return (0, _resolveConfig.default)([
		        ...configs,
		        ...defaultConfigs
		    ]);
		} 
	} (resolveConfig$2));
	return resolveConfig$2;
}

var resolveConfig_1;
var hasRequiredResolveConfig;

function requireResolveConfig () {
	if (hasRequiredResolveConfig) return resolveConfig_1;
	hasRequiredResolveConfig = 1;
	let resolveConfig = requireResolveConfig$1();
	resolveConfig_1 = (resolveConfig.__esModule ? resolveConfig : { default: resolveConfig }).default;
	return resolveConfig_1;
}

var resolveConfigExports = requireResolveConfig();
var resolveConfig = /*@__PURE__*/getDefaultExportFromCjs(resolveConfigExports);

const PREFIX_COLOR_PROP_MAP = {
    'bg-': `backgroundColor`,
    'border-': `borderColor`,
    'text-': `textColor`,
    'decoration-': `textDecorationColor`,
    'outline-': `outlineColor`,
};

const PLATFORMS = [`ios`, `android`, `windows`, `macos`, `web`];
function isPlatform(x) {
    return PLATFORMS.includes(x);
}
const ORIENTATIONS = [`portrait`, `landscape`];
function isOrientation(x) {
    return ORIENTATIONS.includes(x);
}
var ConfigType;
(function (ConfigType) {
    ConfigType["fontSize"] = "fontSize";
    ConfigType["lineHeight"] = "lineHeight";
})(ConfigType || (ConfigType = {}));
var Unit;
(function (Unit) {
    Unit["rem"] = "rem";
    Unit["em"] = "em";
    Unit["px"] = "px";
    Unit["percent"] = "%";
    Unit["vw"] = "vw";
    Unit["vh"] = "vh";
    Unit["deg"] = "deg";
    Unit["rad"] = "rad";
    Unit["none"] = "<no-css-unit>";
})(Unit || (Unit = {}));
function isString(value) {
    return typeof value === `string`;
}
function isObject(value) {
    return typeof value === `object`;
}

var _a;
function complete(style) {
    return { kind: `complete`, style };
}
function parseNumericValue(value, context = {}) {
    const { fractions } = context;
    if (fractions && value.includes(`/`)) {
        const [numerator = ``, denominator = ``] = value.split(`/`, 2);
        const parsedNumerator = parseNumericValue(numerator);
        const parsedDenominator = parseNumericValue(denominator);
        if (!parsedNumerator || !parsedDenominator) {
            return null;
        }
        return [parsedNumerator[0] / parsedDenominator[0], parsedDenominator[1]];
    }
    const number = parseFloat(value);
    if (Number.isNaN(number)) {
        return null;
    }
    const match = value.match(/(([a-z]{2,}|%))$/);
    if (!match) {
        return [number, Unit.none];
    }
    switch (match === null || match === void 0 ? void 0 : match[1]) {
        case `rem`:
            return [number, Unit.rem];
        case `px`:
            return [number, Unit.px];
        case `em`:
            return [number, Unit.em];
        case `%`:
            return [number, Unit.percent];
        case `vw`:
            return [number, Unit.vw];
        case `vh`:
            return [number, Unit.vh];
        case `deg`:
            return [number, Unit.deg];
        case `rad`:
            return [number, Unit.rad];
        default:
            return null;
    }
}
function getCompleteStyle(prop, value, context = {}) {
    const styleVal = parseStyleVal(value, context);
    return styleVal === null ? null : complete({ [prop]: styleVal });
}
function mergeStyle(prop, value, style) {
    const styleVal = parseStyleVal(value);
    if (styleVal !== null) {
        style[prop] = styleVal;
    }
    return style;
}
function getStyle(prop, value) {
    const styleVal = parseStyleVal(value);
    return styleVal === null ? null : { [prop]: styleVal };
}
function parseStyleVal(value, context = {}) {
    if (value === undefined) {
        return null;
    }
    const parsed = parseNumericValue(String(value), context);
    if (parsed) {
        return toStyleVal(...parsed, context);
    }
    else {
        return null;
    }
}
function toStyleVal(number, unit, context = {}) {
    const { isNegative, device } = context;
    switch (unit) {
        case Unit.rem:
            return number * 16 * (isNegative ? -1 : 1);
        case Unit.px:
            return number * (isNegative ? -1 : 1);
        case Unit.percent:
            return `${isNegative ? `-` : ``}${number}%`;
        case Unit.none:
            return number * (isNegative ? -1 : 1);
        case Unit.vw:
            if (!(device === null || device === void 0 ? void 0 : device.windowDimensions)) {
                warn(`\`vw\` CSS unit requires configuration with \`useDeviceContext()\``);
                return null;
            }
            return device.windowDimensions.width * (number / 100);
        case Unit.vh:
            if (!(device === null || device === void 0 ? void 0 : device.windowDimensions)) {
                warn(`\`vh\` CSS unit requires configuration with \`useDeviceContext()\``);
                return null;
            }
            return device.windowDimensions.height * (number / 100);
        case Unit.deg:
        case Unit.rad:
            return `${number * (isNegative ? -1 : 1)}${unit}`;
        default:
            return null;
    }
}
function toPx(value) {
    const parsed = parseNumericValue(value);
    if (!parsed) {
        return null;
    }
    const [number, unit] = parsed;
    switch (unit) {
        case Unit.rem:
            return number * 16;
        case Unit.px:
            return number;
        default:
            return null;
    }
}
const DIR_MAP = {
    t: `Top`,
    tr: `TopRight`,
    tl: `TopLeft`,
    b: `Bottom`,
    br: `BottomRight`,
    bl: `BottomLeft`,
    l: `Left`,
    r: `Right`,
    x: `Horizontal`,
    y: `Vertical`,
};
function getDirection(string) {
    return DIR_MAP[string !== null && string !== void 0 ? string : ``] || `All`;
}
function parseAndConsumeDirection(utilityFragment) {
    let direction = `All`;
    const consumed = utilityFragment.replace(/^-(t|b|r|l|tr|tl|br|bl)(-|$)/, (_, dir) => {
        direction = getDirection(dir);
        return ``;
    });
    return [consumed, direction];
}
function parseUnconfigged(value, context = {}) {
    if (value.includes(`/`)) {
        const style = unconfiggedStyleVal(value, { ...context, fractions: true });
        if (style)
            return style;
    }
    if (value[0] === `[`) {
        value = value.slice(1, -1);
    }
    return unconfiggedStyleVal(value, context);
}
function unconfiggedStyle(prop, value, context = {}) {
    const styleVal = parseUnconfigged(value, context);
    if (styleVal === null) {
        return null;
    }
    return complete({ [prop]: styleVal });
}
function unconfiggedStyleVal(value, context = {}) {
    if (value === `px`) {
        return 1;
    }
    const parsed = parseNumericValue(value, context);
    if (!parsed) {
        return null;
    }
    let [number, unit] = parsed;
    if (context.fractions) {
        unit = Unit.percent;
        number *= 100;
    }
    // not sure if this is the right approach, but this allows arbitrary
    // non-bracket numbers, like top-73 and it INFERS the meaning to be
    // tailwind's default scale for spacing, which is 1 = 0.25rem
    if (unit === Unit.none) {
        number = number / 4;
        unit = Unit.rem;
    }
    return toStyleVal(number, unit, context);
}
function isArbitraryValue(value) {
    return value.startsWith(`[`) && value.endsWith(`]`);
}
function consoleWarn(...args) {
    console.warn(...args); // eslint-disable-line no-console
}
function noopWarn(..._) {
    // ¯\_(ツ)_/¯
}
const warn = typeof process === `undefined` || ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.JEST_WORKER_ID) === undefined
    ? consoleWarn
    : noopWarn;

const defaultStyles = [
    [`aspect-square`, complete({ aspectRatio: 1 })],
    [`aspect-video`, complete({ aspectRatio: 16 / 9 })],
    [`items-center`, complete({ alignItems: `center` })],
    [`items-start`, complete({ alignItems: `flex-start` })],
    [`items-end`, complete({ alignItems: `flex-end` })],
    [`items-baseline`, complete({ alignItems: `baseline` })],
    [`items-stretch`, complete({ alignItems: `stretch` })],
    [`justify-start`, complete({ justifyContent: `flex-start` })],
    [`justify-end`, complete({ justifyContent: `flex-end` })],
    [`justify-center`, complete({ justifyContent: `center` })],
    [`justify-between`, complete({ justifyContent: `space-between` })],
    [`justify-around`, complete({ justifyContent: `space-around` })],
    [`justify-evenly`, complete({ justifyContent: `space-evenly` })],
    [`content-start`, complete({ alignContent: `flex-start` })],
    [`content-end`, complete({ alignContent: `flex-end` })],
    [`content-between`, complete({ alignContent: `space-between` })],
    [`content-around`, complete({ alignContent: `space-around` })],
    [`content-stretch`, complete({ alignContent: `stretch` })],
    [`content-center`, complete({ alignContent: `center` })],
    [`self-auto`, complete({ alignSelf: `auto` })],
    [`self-start`, complete({ alignSelf: `flex-start` })],
    [`self-end`, complete({ alignSelf: `flex-end` })],
    [`self-center`, complete({ alignSelf: `center` })],
    [`self-stretch`, complete({ alignSelf: `stretch` })],
    [`self-baseline`, complete({ alignSelf: `baseline` })],
    [`direction-inherit`, complete({ direction: `inherit` })],
    [`direction-ltr`, complete({ direction: `ltr` })],
    [`direction-rtl`, complete({ direction: `rtl` })],
    [`hidden`, complete({ display: `none` })],
    [`contents`, complete({ display: `contents` })],
    [`flex`, complete({ display: `flex` })],
    [`flex-row`, complete({ flexDirection: `row` })],
    [`flex-row-reverse`, complete({ flexDirection: `row-reverse` })],
    [`flex-col`, complete({ flexDirection: `column` })],
    [`flex-col-reverse`, complete({ flexDirection: `column-reverse` })],
    [`flex-wrap`, complete({ flexWrap: `wrap` })],
    [`flex-wrap-reverse`, complete({ flexWrap: `wrap-reverse` })],
    [`flex-nowrap`, complete({ flexWrap: `nowrap` })],
    [`flex-auto`, complete({ flexGrow: 1, flexShrink: 1, flexBasis: `auto` })],
    [`flex-initial`, complete({ flexGrow: 0, flexShrink: 1, flexBasis: `auto` })],
    [`flex-none`, complete({ flexGrow: 0, flexShrink: 0, flexBasis: `auto` })],
    [`overflow-hidden`, complete({ overflow: `hidden` })],
    [`overflow-visible`, complete({ overflow: `visible` })],
    [`overflow-scroll`, complete({ overflow: `scroll` })],
    [`absolute`, complete({ position: `absolute` })],
    [`relative`, complete({ position: `relative` })],
    [`italic`, complete({ fontStyle: `italic` })],
    [`not-italic`, complete({ fontStyle: `normal` })],
    [`oldstyle-nums`, fontVariant(`oldstyle-nums`)],
    [`small-caps`, fontVariant(`small-caps`)],
    [`lining-nums`, fontVariant(`lining-nums`)],
    [`tabular-nums`, fontVariant(`tabular-nums`)],
    [`proportional-nums`, fontVariant(`proportional-nums`)],
    [`font-thin`, complete({ fontWeight: `100` })],
    [`font-100`, complete({ fontWeight: `100` })],
    [`font-extralight`, complete({ fontWeight: `200` })],
    [`font-200`, complete({ fontWeight: `200` })],
    [`font-light`, complete({ fontWeight: `300` })],
    [`font-300`, complete({ fontWeight: `300` })],
    [`font-normal`, complete({ fontWeight: `normal` })],
    [`font-400`, complete({ fontWeight: `400` })],
    [`font-medium`, complete({ fontWeight: `500` })],
    [`font-500`, complete({ fontWeight: `500` })],
    [`font-semibold`, complete({ fontWeight: `600` })],
    [`font-600`, complete({ fontWeight: `600` })],
    [`font-bold`, complete({ fontWeight: `bold` })],
    [`font-700`, complete({ fontWeight: `700` })],
    [`font-extrabold`, complete({ fontWeight: `800` })],
    [`font-800`, complete({ fontWeight: `800` })],
    [`font-black`, complete({ fontWeight: `900` })],
    [`font-900`, complete({ fontWeight: `900` })],
    [`include-font-padding`, complete({ includeFontPadding: true })],
    [`remove-font-padding`, complete({ includeFontPadding: false })],
    // not sure if RN supports `max-width: none;`, but this should be equivalent
    [`max-w-none`, complete({ maxWidth: `99999%` })],
    [`text-left`, complete({ textAlign: `left` })],
    [`text-center`, complete({ textAlign: `center` })],
    [`text-right`, complete({ textAlign: `right` })],
    [`text-justify`, complete({ textAlign: `justify` })],
    [`text-auto`, complete({ textAlign: `auto` })], // RN only
    [`underline`, complete({ textDecorationLine: `underline` })],
    [`line-through`, complete({ textDecorationLine: `line-through` })],
    [`no-underline`, complete({ textDecorationLine: `none` })],
    [`uppercase`, complete({ textTransform: `uppercase` })],
    [`lowercase`, complete({ textTransform: `lowercase` })],
    [`capitalize`, complete({ textTransform: `capitalize` })],
    [`normal-case`, complete({ textTransform: `none` })],
    [`w-auto`, complete({ width: `auto` })],
    [`h-auto`, complete({ height: `auto` })],
    [`basis-auto`, complete({ flexBasis: `auto` })],
    [`flex-basis-auto`, complete({ flexBasis: `auto` })],
    [`align-auto`, complete({ verticalAlign: `auto` })],
    [`align-top`, complete({ verticalAlign: `top` })],
    [`align-bottom`, complete({ verticalAlign: `bottom` })],
    [`align-middle`, complete({ verticalAlign: `middle` })],
    [`cursor-auto`, complete({ cursor: `auto` })],
    [`cursor-pointer`, complete({ cursor: `pointer` })],
    [`box-border`, complete({ boxSizing: `border-box` })],
    [`box-content`, complete({ boxSizing: `content-box` })],
    [`outline`, complete({ outlineStyle: `solid` })],
    // default box-shadow implementations
    [
        `shadow-sm`,
        complete({
            shadowOffset: { width: 1, height: 1 },
            shadowColor: `#000`,
            shadowRadius: 1,
            shadowOpacity: 0.025,
            elevation: 1,
        }),
    ],
    [
        `shadow`,
        complete({
            shadowOffset: { width: 1, height: 1 },
            shadowColor: `#000`,
            shadowRadius: 1,
            shadowOpacity: 0.075,
            elevation: 2,
        }),
    ],
    [
        `shadow-md`,
        complete({
            shadowOffset: { width: 1, height: 1 },
            shadowColor: `#000`,
            shadowRadius: 3,
            shadowOpacity: 0.125,
            elevation: 3,
        }),
    ],
    [
        `shadow-lg`,
        complete({
            shadowOffset: { width: 1, height: 1 },
            shadowColor: `#000`,
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 8,
        }),
    ],
    [
        `shadow-xl`,
        complete({
            shadowOffset: { width: 1, height: 1 },
            shadowColor: `#000`,
            shadowOpacity: 0.19,
            shadowRadius: 20,
            elevation: 12,
        }),
    ],
    [
        `shadow-2xl`,
        complete({
            shadowOffset: { width: 1, height: 1 },
            shadowColor: `#000`,
            shadowOpacity: 0.25,
            shadowRadius: 30,
            elevation: 16,
        }),
    ],
    [
        `shadow-none`,
        complete({
            shadowOffset: { width: 0, height: 0 },
            shadowColor: `#000`,
            shadowRadius: 0,
            shadowOpacity: 0,
            elevation: 0,
        }),
    ],
];
function fontVariant(type) {
    return {
        kind: `dependent`,
        complete(style) {
            if (!style.fontVariant || !Array.isArray(style.fontVariant)) {
                style.fontVariant = [];
            }
            style.fontVariant.push(type);
        },
    };
}

class Cache {
    constructor(customStyles) {
        this.ir = new Map(defaultStyles);
        this.styles = new Map();
        this.prefixes = new Map();
        this.ir = new Map([...defaultStyles, ...(customStyles !== null && customStyles !== void 0 ? customStyles : [])]);
    }
    getStyle(key) {
        return this.styles.get(key);
    }
    setStyle(key, style) {
        this.styles.set(key, style);
    }
    getIr(key) {
        return this.ir.get(key);
    }
    setIr(key, ir) {
        this.ir.set(key, ir);
    }
    getPrefixMatch(key) {
        return this.prefixes.get(key);
    }
    setPrefixMatch(key, value) {
        this.prefixes.set(key, value);
    }
}

function lineHeight(value, config) {
    var _a;
    const parseValue = (_a = config === null || config === void 0 ? void 0 : config[value]) !== null && _a !== void 0 ? _a : (isArbitraryValue(value) ? value.slice(1, -1) : value);
    const parsed = parseNumericValue(parseValue);
    if (!parsed) {
        return null;
    }
    const [number, unit] = parsed;
    if (unit === Unit.none) {
        // we have a relative line-height like `2` for `leading-loose`
        return {
            kind: `dependent`,
            complete(style) {
                if (typeof style.fontSize !== `number`) {
                    return `relative line-height utilities require that font-size be set`;
                }
                style.lineHeight = style.fontSize * number;
            },
        };
    }
    const styleVal = toStyleVal(number, unit);
    return styleVal !== null ? complete({ lineHeight: styleVal }) : null;
}

function fontSize(value, config, context = {}) {
    var _a;
    if (value.includes(`/`)) {
        const [fontSizeValue = ``, lineHeightValue = ``] = value.split(`/`, 2);
        const lh = lineHeight(lineHeightValue, config === null || config === void 0 ? void 0 : config.lineHeight);
        const fs = fontSize(fontSizeValue, config, context);
        if ((fs === null || fs === void 0 ? void 0 : fs.kind) === `complete` && (lh === null || lh === void 0 ? void 0 : lh.kind) === `complete`) {
            return {
                kind: `complete`,
                style: { ...fs.style, ...lh.style },
            };
        }
    }
    const configValue = (_a = config === null || config === void 0 ? void 0 : config.fontSize) === null || _a === void 0 ? void 0 : _a[value];
    if (!configValue) {
        return unconfiggedStyle(`fontSize`, value, context);
    }
    if (typeof configValue === `string`) {
        return getCompleteStyle(`fontSize`, configValue);
    }
    let style = {};
    const [sizePart, otherProps] = configValue;
    const fontSizeStyle = getStyle(`fontSize`, sizePart);
    if (fontSizeStyle) {
        style = fontSizeStyle;
    }
    if (typeof otherProps === `string`) {
        return complete(mergeStyle(`lineHeight`, calculateLineHeight(otherProps, style), style));
    }
    const { lineHeight: lineHeight$1, letterSpacing, fontWeight } = otherProps;
    if (lineHeight$1) {
        mergeStyle(`lineHeight`, calculateLineHeight(lineHeight$1, style), style);
    }
    if (letterSpacing) {
        mergeStyle(`letterSpacing`, letterSpacing, style);
    }
    if (fontWeight) {
        mergeStyle(`fontWeight`, fontWeight, style);
    }
    return complete(style);
}
// calculates line-height for relative units
function calculateLineHeight(lineHeight, style) {
    const parsed = parseNumericValue(lineHeight);
    if (parsed) {
        const [number, unit] = parsed;
        if ((unit === Unit.none || unit === Unit.em) && typeof style.fontSize === `number`) {
            return style.fontSize * number;
        }
    }
    return lineHeight;
}

function spacing(type, direction, value, context, config) {
    let numericValue = ``;
    if (isArbitraryValue(value)) {
        numericValue = value.slice(1, -1);
    }
    else {
        const configValue = config === null || config === void 0 ? void 0 : config[value];
        if (!configValue) {
            const unconfigged = parseUnconfigged(value);
            if (unconfigged && typeof unconfigged === `number`) {
                return spacingStyle(unconfigged, Unit.px, direction, type, context);
            }
            return null;
        }
        else {
            numericValue = configValue;
        }
    }
    if (numericValue === `auto`) {
        return expand$1(direction, type, `auto`);
    }
    const parsed = parseNumericValue(numericValue);
    if (!parsed) {
        return null;
    }
    const [number, unit] = parsed;
    return spacingStyle(number, unit, direction, type, context);
}
function spacingStyle(number, unit, direction, type, context) {
    const pixels = toStyleVal(number, unit, context);
    if (pixels === null) {
        return null;
    }
    return expand$1(direction, type, pixels);
}
function expand$1(direction, type, value) {
    switch (direction) {
        case `All`:
            return {
                kind: `complete`,
                style: {
                    [`${type}Top`]: value,
                    [`${type}Right`]: value,
                    [`${type}Bottom`]: value,
                    [`${type}Left`]: value,
                },
            };
        case `Bottom`:
        case `Top`:
        case `Left`:
        case `Right`:
            return {
                kind: `complete`,
                style: {
                    [`${type}${direction}`]: value,
                },
            };
        case `Vertical`:
            return {
                kind: `complete`,
                style: {
                    [`${type}Top`]: value,
                    [`${type}Bottom`]: value,
                },
            };
        case `Horizontal`:
            return {
                kind: `complete`,
                style: {
                    [`${type}Left`]: value,
                    [`${type}Right`]: value,
                },
            };
        default:
            return null;
    }
}

function screens(input) {
    if (!input) {
        return {};
    }
    const screenData = Object.entries(input).reduce((acc, [screen, value]) => {
        const data = [0, Infinity, 0];
        const values = typeof value === `string` ? { min: value } : value;
        const minPx = values.min ? toPx(values.min) : 0;
        if (minPx === null) {
            warn(`invalid screen config value: ${screen}->min: ${values.min}`);
        }
        else {
            data[0] = minPx;
        }
        const maxPx = values.max ? toPx(values.max) : Infinity;
        if (maxPx === null) {
            warn(`invalid screen config value: ${screen}->max: ${values.max}`);
        }
        else {
            data[1] = maxPx;
        }
        acc[screen] = data;
        return acc;
    }, {});
    const values = Object.values(screenData);
    values.sort((a, b) => {
        const [minA, maxA] = a;
        const [minB, maxB] = b;
        if (maxA === Infinity || maxB === Infinity) {
            return minA - minB;
        }
        return maxA - maxB;
    });
    let order = 0;
    values.forEach((value) => (value[2] = order++));
    return screenData;
}

function fontFamily(value, config) {
    const configValue = config === null || config === void 0 ? void 0 : config[value];
    if (!configValue) {
        return null;
    }
    if (typeof configValue === `string`) {
        return complete({ fontFamily: configValue });
    }
    const firstFamily = configValue[0];
    if (!firstFamily) {
        return null;
    }
    return complete({ fontFamily: firstFamily });
}

function color(type, value, config) {
    var _a;
    if (!config) {
        return null;
    }
    // support opacity shorthand: `bg-red-200/50`
    let shorthandOpacity = undefined;
    if (value.includes(`/`)) {
        [value = ``, shorthandOpacity] = value.split(`/`, 2);
    }
    let color = ``;
    // arbitrary hex/rgb(a)/hsl(a) support: `bg-[#eaeaea]`, `text-[rgba(1, 1, 1, 0.5)]`, `text-[hsla(1, 1%, 1%, 0.5)]`
    if (value.startsWith(`[#`) || value.startsWith(`[rgb`) || value.startsWith(`[hsl`)) {
        color = value.slice(1, -1);
        // arbitrary named colors: `bg-[lemonchiffon]`
    }
    else if (isArbitraryValue(value) && value.slice(1, -1).match(/^[a-z]{3,}$/)) {
        color = value.slice(1, -1);
    }
    else {
        color = (_a = configColor(value, config)) !== null && _a !== void 0 ? _a : ``;
    }
    if (!color) {
        return null;
    }
    if (shorthandOpacity) {
        const opacity = Number(shorthandOpacity);
        if (!Number.isNaN(opacity)) {
            color = addOpacity(color, opacity / 100);
            return {
                // even though we know the bg opacity, return `dependent` to work around
                // subtle dark-mode ordering issue when combining shorthand & non-shorthand
                // @see https://github.com/jaredh159/tailwind-react-native-classnames/pull/269
                kind: `dependent`,
                complete(style) {
                    style[STYLE_PROPS[type].color] = color;
                },
            };
        }
    }
    // return a dependent style to support merging of classes
    // like `bg-red-800 bg-opacity-75`
    return {
        kind: `dependent`,
        complete(style) {
            const opacityProp = STYLE_PROPS[type].opacity;
            const opacity = style[opacityProp];
            if (typeof opacity === `number`) {
                color = addOpacity(color, opacity);
            }
            style[STYLE_PROPS[type].color] = color;
        },
    };
}
function colorOpacity(type, value) {
    const percentage = parseInt(value, 10);
    if (Number.isNaN(percentage)) {
        return null;
    }
    const opacity = percentage / 100;
    const style = { [STYLE_PROPS[type].opacity]: opacity };
    return { kind: `complete`, style };
}
function addOpacity(color, opacity) {
    if (color.startsWith(`#`)) {
        color = hexToRgba(color);
    }
    else if (color.startsWith(`rgb(`) || color.startsWith(`hsl(`)) {
        color = color.replace(/^rgb\(/, `rgba(`).replace(/^hsl\(/, `hsla(`);
        if (color.includes(`,`)) {
            color = color.replace(/\)$/, `, 1)`);
        }
        else {
            color = color.replace(/\)$/, ` / 1)`);
        }
    }
    return color.replace(/ ?\d*\.?(\d+)\)$/, ` ${opacity})`);
}
function removeOpacityHelpers(style) {
    for (const key in style) {
        if (key.startsWith(`__opacity_`)) {
            delete style[key];
        }
    }
}
const STYLE_PROPS = {
    bg: { opacity: `__opacity_bg`, color: `backgroundColor` },
    text: { opacity: `__opacity_text`, color: `color` },
    border: { opacity: `__opacity_border`, color: `borderColor` },
    borderTop: { opacity: `__opacity_border`, color: `borderTopColor` },
    borderBottom: { opacity: `__opacity_border`, color: `borderBottomColor` },
    borderLeft: { opacity: `__opacity_border`, color: `borderLeftColor` },
    borderRight: { opacity: `__opacity_border`, color: `borderRightColor` },
    shadow: { opacity: `__opacity_shadow`, color: `shadowColor` },
    decoration: { opacity: `__opacity_decoration`, color: `textDecorationColor` },
    outline: { opacity: `__opacity_decoration`, color: `outlineColor` },
    tint: { opacity: `__opacity_tint`, color: `tintColor` },
};
function hexToRgba(hex) {
    var _a, _b, _c;
    const orig = hex;
    hex = hex.replace(MATCH_SHORT_HEX, (_, r, g, b) => r + r + g + g + b + b);
    const result = MATCH_FULL_HEX.exec(hex);
    if (!result) {
        warn(`invalid config hex color value: ${orig}`);
        return `rgba(0, 0, 0, 1)`;
    }
    const r = parseInt((_a = result[1]) !== null && _a !== void 0 ? _a : ``, 16);
    const g = parseInt((_b = result[2]) !== null && _b !== void 0 ? _b : ``, 16);
    const b = parseInt((_c = result[3]) !== null && _c !== void 0 ? _c : ``, 16);
    return `rgba(${r}, ${g}, ${b}, 1)`;
}
function configColor(colorName, config) {
    const color = config[colorName];
    // the color is found at the current config level
    if (isString(color)) {
        return color;
    }
    else if (isObject(color) && isString(color.DEFAULT)) {
        return color.DEFAULT;
    }
    // search for a matching sub-string at the current config level
    let [colorNameStart = ``, ...colorNameRest] = colorName.split(`-`);
    while (colorNameStart !== colorName) {
        const subConfig = config[colorNameStart];
        if (isObject(subConfig)) {
            return configColor(colorNameRest.join(`-`), subConfig);
        }
        else if (colorNameRest.length === 0) {
            return null;
        }
        colorNameStart = `${colorNameStart}-${colorNameRest.shift()}`;
    }
    return null;
}
const MATCH_SHORT_HEX = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const MATCH_FULL_HEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

function border(value, theme) {
    let [rest, direction] = parseAndConsumeDirection(value);
    const config = theme === null || theme === void 0 ? void 0 : theme.borderWidth;
    const key = rest.replace(/^-/, ``);
    if (config && (config[key] !== undefined || key.match(/^(-?(\d)+)?$/))) {
        return borderWidth(key, direction, config);
    }
    rest = rest.replace(/^-/, ``);
    if ([`dashed`, `solid`, `dotted`].includes(rest)) {
        return complete({ borderStyle: rest });
    }
    let colorType = `border`;
    switch (direction) {
        case `Bottom`:
            colorType = `borderBottom`;
            break;
        case `Top`:
            colorType = `borderTop`;
            break;
        case `Left`:
            colorType = `borderLeft`;
            break;
        case `Right`:
            colorType = `borderRight`;
            break;
    }
    const colorStyle = color(colorType, rest, theme === null || theme === void 0 ? void 0 : theme.borderColor);
    if (colorStyle) {
        return colorStyle;
    }
    // Finally Handling Arbitrary Width Case
    // border-[20px] or border-[2.5rem]
    const prop = `border${direction === `All` ? `` : direction}Width`;
    rest = rest.replace(/^-/, ``);
    const numericValue = rest.slice(1, -1);
    const arbitraryWidth = unconfiggedStyle(prop, numericValue);
    // can't use % for border-radius in RN
    if (typeof (arbitraryWidth === null || arbitraryWidth === void 0 ? void 0 : arbitraryWidth.style[prop]) !== `number`) {
        return null;
    }
    return arbitraryWidth;
}
function borderWidth(value, direction, config) {
    if (!config) {
        return null;
    }
    value = value.replace(/^-/, ``);
    const key = value === `` ? `DEFAULT` : value;
    const configValue = config[key];
    if (configValue === undefined) {
        return null;
    }
    const prop = `border${direction === `All` ? `` : direction}Width`;
    return getCompleteStyle(prop, configValue);
}
function borderRadius(value, config) {
    if (!config) {
        return null;
    }
    let [rest, direction] = parseAndConsumeDirection(value);
    rest = rest.replace(/^-/, ``);
    if (rest === ``) {
        rest = `DEFAULT`;
    }
    const prop = `border${direction === `All` ? `` : direction}Radius`;
    const configValue = config[rest];
    if (configValue) {
        return expand(getCompleteStyle(prop, configValue));
    }
    const arbitrary = unconfiggedStyle(prop, rest);
    // can't use % for border-radius in RN
    if (typeof (arbitrary === null || arbitrary === void 0 ? void 0 : arbitrary.style[prop]) !== `number`) {
        return null;
    }
    return expand(arbitrary);
}
// RN only supports `borderRadius` + `border(top|bottom)(left|right)Radius`
function expand(ir) {
    if ((ir === null || ir === void 0 ? void 0 : ir.kind) !== `complete`)
        return ir;
    const top = ir.style.borderTopRadius;
    if (top !== undefined) {
        ir.style.borderTopLeftRadius = top;
        ir.style.borderTopRightRadius = top;
        delete ir.style.borderTopRadius;
    }
    const bottom = ir.style.borderBottomRadius;
    if (bottom !== undefined) {
        ir.style.borderBottomLeftRadius = bottom;
        ir.style.borderBottomRightRadius = bottom;
        delete ir.style.borderBottomRadius;
    }
    const left = ir.style.borderLeftRadius;
    if (left !== undefined) {
        ir.style.borderBottomLeftRadius = left;
        ir.style.borderTopLeftRadius = left;
        delete ir.style.borderLeftRadius;
    }
    const right = ir.style.borderRightRadius;
    if (right !== undefined) {
        ir.style.borderBottomRightRadius = right;
        ir.style.borderTopRightRadius = right;
        delete ir.style.borderRightRadius;
    }
    return ir;
}

function inset(type, value, isNegative, config) {
    let insetDir = null;
    if (type === `inset`) {
        value = value.replace(/^(x|y)-/, (_, dir) => {
            insetDir = dir === `x` ? `x` : `y`;
            return ``;
        });
    }
    if (value === `auto`) {
        return insetStyle(type, insetDir, value);
    }
    const configValue = config === null || config === void 0 ? void 0 : config[value];
    if (configValue) {
        const styleVal = parseStyleVal(configValue, { isNegative });
        if (styleVal !== null) {
            return insetStyle(type, insetDir, styleVal);
        }
    }
    const unconfigged = parseUnconfigged(value, { isNegative });
    if (unconfigged !== null) {
        return insetStyle(type, insetDir, unconfigged);
    }
    return null;
}
function insetStyle(type, dir, styleVal) {
    if (type !== `inset`) {
        return complete({ [type]: styleVal });
    }
    switch (dir) {
        case null:
            return complete({
                top: styleVal,
                left: styleVal,
                right: styleVal,
                bottom: styleVal,
            });
        case `y`:
            return complete({
                top: styleVal,
                bottom: styleVal,
            });
        case `x`:
            return complete({
                left: styleVal,
                right: styleVal,
            });
    }
}

function flexGrowShrink(type, value, config) {
    var _a;
    value = value.replace(/^-/, ``);
    if (isArbitraryValue(value)) {
        value = value.slice(1, -1);
    }
    const configKey = value === `` ? `DEFAULT` : value;
    const numericValue = Number((_a = config === null || config === void 0 ? void 0 : config[configKey]) !== null && _a !== void 0 ? _a : value);
    if (!Number.isNaN(numericValue)) {
        return complete({ [`flex${type}`]: numericValue });
    }
    return null;
}
function flex(value, config) {
    var _a, _b;
    value = (config === null || config === void 0 ? void 0 : config[value]) || value;
    if ([`min-content`, `revert`, `unset`].includes(value)) {
        // unsupported
        return null;
    }
    // @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex
    // MDN: One value, unitless number: flex-grow flex-basis is then equal to 0.
    if (value.match(/^\d+(\.\d+)?$/)) {
        return complete({
            flexGrow: Number(value),
            flexBasis: `0%`,
        });
    }
    // MDN: Two values (both integers): flex-grow | flex-basis
    let match = value.match(/^(\d+)\s+(\d+)$/);
    if (match) {
        return complete({
            flexGrow: Number(match[1]),
            flexShrink: Number(match[2]),
        });
    }
    // MDN: Two values: flex-grow | flex-basis
    match = value.match(/^(\d+)\s+([^ ]+)$/);
    if (match) {
        const flexBasis = parseStyleVal((_a = match[2]) !== null && _a !== void 0 ? _a : ``);
        if (!flexBasis) {
            return null;
        }
        return complete({
            flexGrow: Number(match[1]),
            flexBasis,
        });
    }
    // MDN: Three values: flex-grow | flex-shrink | flex-basis
    match = value.match(/^(\d+)\s+(\d+)\s+(.+)$/);
    if (match) {
        const flexBasis = parseStyleVal((_b = match[3]) !== null && _b !== void 0 ? _b : ``);
        if (!flexBasis) {
            return null;
        }
        return complete({
            flexGrow: Number(match[1]),
            flexShrink: Number(match[2]),
            flexBasis,
        });
    }
    return null;
}
function flexBasis(value, context = {}, config) {
    value = value.replace(/^-/, ``);
    const configValue = config === null || config === void 0 ? void 0 : config[value];
    if (configValue !== undefined) {
        return getCompleteStyle(`flexBasis`, configValue, context);
    }
    return unconfiggedStyle(`flexBasis`, value, context);
}
function gap(value, context = {}, config) {
    let gapStyle = `gap`;
    value = value.replace(/^-(x|y)-/, (_, dir) => {
        if (dir === `x`) {
            gapStyle = `columnGap`;
        }
        if (dir === `y`) {
            gapStyle = `rowGap`;
        }
        return ``;
    });
    value = value.replace(/^-/, ``);
    const configValue = config === null || config === void 0 ? void 0 : config[value];
    if (configValue !== undefined) {
        return getCompleteStyle(gapStyle, configValue, context);
    }
    return unconfiggedStyle(gapStyle, value, context);
}

function widthHeight(type, value, context = {}, config) {
    const configValue = config === null || config === void 0 ? void 0 : config[value];
    if (configValue !== undefined) {
        return getCompleteStyle(type, configValue, context);
    }
    return unconfiggedStyle(type, value, context);
}
function size(value, context = {}, theme) {
    const width = widthHeight(`width`, value, context, theme === null || theme === void 0 ? void 0 : theme.width);
    const height = widthHeight(`height`, value, context, theme === null || theme === void 0 ? void 0 : theme.height);
    if ((width === null || width === void 0 ? void 0 : width.kind) !== `complete` || (height === null || height === void 0 ? void 0 : height.kind) !== `complete`) {
        return null;
    }
    return complete({ ...width.style, ...height.style });
}
function minMaxWidthHeight(type, value, context = {}, config) {
    const styleVal = parseStyleVal(config === null || config === void 0 ? void 0 : config[value], context);
    if (styleVal) {
        return complete({ [type]: styleVal });
    }
    if (value === `screen`) {
        value = type.includes(`Width`) ? `100vw` : `100vh`;
    }
    return unconfiggedStyle(type, value, context);
}

function letterSpacing(value, isNegative, config) {
    const configValue = config === null || config === void 0 ? void 0 : config[value];
    if (configValue) {
        const parsed = parseNumericValue(configValue, { });
        if (!parsed) {
            return null;
        }
        const [number, unit] = parsed;
        if (unit === Unit.em) {
            return relativeLetterSpacing(number);
        }
        // @TODO, if we get a percentage based config value, theoretically we could
        // make a font-size dependent style as well, wait for someone to raise an issue
        if (unit === Unit.percent) {
            warn(`percentage-based letter-spacing configuration currently unsupported, switch to \`em\`s, or open an issue if you'd like to see support added.`);
            return null;
        }
        const styleVal = toStyleVal(number, unit, { isNegative });
        if (styleVal !== null) {
            return complete({ letterSpacing: styleVal });
        }
        return null;
    }
    return unconfiggedStyle(`letterSpacing`, value, { isNegative });
}
function relativeLetterSpacing(ems) {
    return {
        kind: `dependent`,
        complete(style) {
            const fontSize = style.fontSize;
            if (typeof fontSize !== `number` || Number.isNaN(fontSize)) {
                return `tracking-X relative letter spacing classes require font-size to be set`;
            }
            style.letterSpacing = Math.round((ems * fontSize + Number.EPSILON) * 100) / 100;
        },
    };
}

function opacity(value, config) {
    const configValue = config === null || config === void 0 ? void 0 : config[value];
    if (configValue) {
        const parsedConfig = parseNumericValue(String(configValue));
        if (parsedConfig) {
            return complete({ opacity: parsedConfig[0] });
        }
    }
    const parsedArbitrary = parseNumericValue(value);
    if (parsedArbitrary) {
        return complete({ opacity: parsedArbitrary[0] / 100 });
    }
    return null;
}

function shadowOpacity(value) {
    const percentage = parseInt(value, 10);
    if (Number.isNaN(percentage)) {
        return null;
    }
    return {
        kind: `complete`,
        style: { shadowOpacity: percentage / 100 },
    };
}
function shadowOffset(value) {
    if (value.includes(`/`)) {
        const [widthStr = ``, heightStr = ``] = value.split(`/`, 2);
        const width = offsetValue(widthStr);
        const height = offsetValue(heightStr);
        if (width === null || height === null) {
            return null;
        }
        return {
            kind: `complete`,
            style: {
                shadowOffset: {
                    width,
                    height,
                },
            },
        };
    }
    const number = offsetValue(value);
    if (number === null) {
        return null;
    }
    return {
        kind: `complete`,
        style: {
            shadowOffset: {
                width: number,
                height: number,
            },
        },
    };
}
function offsetValue(value) {
    const parsed = parseUnconfigged(value);
    return typeof parsed === `number` ? parsed : null;
}

const originPositions = [`left`, `center`, `right`, `top`, `bottom`];
function scale(value, context = {}, config) {
    let scaleAxis = ``;
    value = value.replace(/^(x|y)-/, (_, axis) => {
        scaleAxis = axis.toUpperCase();
        return ``;
    });
    let styleVal = null;
    if (config === null || config === void 0 ? void 0 : config[value]) {
        styleVal = parseStyleVal(config[value], context);
    }
    else if (isArbitraryValue(value)) {
        // arbitrary value should use the value as is
        // e.g `scale-[1.5]` should be 1.5
        const parsed = parseNumericValue(value.slice(1, -1));
        styleVal = parsed ? parsed[0] : null;
    }
    else {
        // unconfigged value should divide value by 100
        // e.g `scale-99` should be 0.99
        const parsed = parseNumericValue(value);
        styleVal = parsed ? parsed[0] / 100 : null;
    }
    return styleVal === null ? null : createStyle$1(styleVal, `scale`, scaleAxis);
}
function rotate(value, context = {}, config) {
    let rotateAxis = ``;
    value = value.replace(/^(x|y|z)-/, (_, axis) => {
        rotateAxis = axis.toUpperCase();
        return ``;
    });
    let styleVal = null;
    if (config === null || config === void 0 ? void 0 : config[value]) {
        styleVal = parseStyleVal(config[value], context);
    }
    else if (isArbitraryValue(value)) {
        styleVal = parseUnconfigged(value, context);
    }
    else {
        // unconfigged value should should be converted to degrees
        // e.g `rotate-99` should be `99deg`
        const parsed = parseNumericValue(value);
        styleVal = parsed ? toStyleVal(parsed[0], Unit.deg, context) : null;
    }
    return styleVal === null ? null : createStyle$1(styleVal, `rotate`, rotateAxis);
}
function skew(value, context = {}, config) {
    let skewAxis = ``;
    value = value.replace(/^(x|y)-/, (_, axis) => {
        skewAxis = axis.toUpperCase();
        return ``;
    });
    if (skewAxis === ``) {
        return null;
    }
    let styleVal = null;
    if (config === null || config === void 0 ? void 0 : config[value]) {
        styleVal = parseStyleVal(config[value], context);
    }
    else if (isArbitraryValue(value)) {
        styleVal = parseUnconfigged(value, context);
    }
    else {
        // unconfigged value should should be converted to degrees
        // e.g `skew-x-99` should be `99deg`
        const parsed = parseNumericValue(value);
        styleVal = parsed ? toStyleVal(parsed[0], Unit.deg, context) : null;
    }
    return styleVal === null ? null : createStyle$1(styleVal, `skew`, skewAxis);
}
function translate(value, context = {}, config) {
    var _a;
    let translateAxis = ``;
    value = value.replace(/^(x|y)-/, (_, axis) => {
        translateAxis = axis.toUpperCase();
        return ``;
    });
    if (translateAxis === ``) {
        return null;
    }
    const configValue = config === null || config === void 0 ? void 0 : config[value];
    const styleVal = configValue
        ? parseStyleVal(configValue, context)
        : parseUnconfigged(value, context);
    // using percentage values (non-numeric values) causes an error
    // if used in versions earlier than RN 0.75
    if (styleVal === null ||
        (isString(styleVal) &&
            ((_a = context.device) === null || _a === void 0 ? void 0 : _a.platform) !== `web` &&
            (!context.reactNativeVersion ||
                (context.reactNativeVersion.major === 0 &&
                    context.reactNativeVersion.minor < 75)))) {
        return null;
    }
    return createStyle$1(styleVal, `translate`, translateAxis);
}
function transformNone() {
    return {
        kind: `dependent`,
        complete(style) {
            style.transform = [];
        },
    };
}
function origin(value, context = {}, config) {
    const configValue = config === null || config === void 0 ? void 0 : config[value];
    if (configValue) {
        return complete({ transformOrigin: configValue });
    }
    if (!isArbitraryValue(value)) {
        return null;
    }
    const values = value.slice(1, -1).split(`_`);
    if (values.length === 0 || values.length > 3) {
        return null;
    }
    // the first value must be one of the positions, a percentage or a pixel value
    const firstOriginValue = parseOriginValue(values[0], originPositions, [Unit.px, Unit.percent], context);
    if (firstOriginValue === null) {
        return null;
    }
    const origin = [firstOriginValue];
    if (values.length >= 2) {
        // the second value must a position different from the first or `center`, a percentage or a pixel value
        const secondOriginValue = parseOriginValue(values[1], originPositions.filter((position) => position === `center` || position !== firstOriginValue), [Unit.px, Unit.percent], context);
        if (secondOriginValue === null) {
            return null;
        }
        origin.push(secondOriginValue);
    }
    if (values.length === 3) {
        // the third value must be a pixel value
        const thirdOriginValue = parseOriginValue(values[2], [], [Unit.px], context);
        if (thirdOriginValue === null) {
            return null;
        }
        origin.push(thirdOriginValue);
    }
    return complete({
        transformOrigin: origin.join(` `),
    });
}
function createStyle$1(styleVal, property, axis) {
    return {
        kind: `dependent`,
        complete(style) {
            var _a;
            let transform = (_a = style.transform) !== null && _a !== void 0 ? _a : [];
            const key = `${property}${axis}`;
            if (transform.length > 0) {
                transform = transform.filter((transformItem) => transformItem[key] === undefined);
            }
            transform.push({
                [key]: styleVal,
            });
            style.transform = transform;
        },
    };
}
function parseOriginValue(value, allowedPositions, allowedUnits, context = {}) {
    if (!value) {
        return null;
    }
    if (allowedPositions.includes(value)) {
        return value;
    }
    const parsedValue = parseNumericValue(value, context);
    return parsedValue === null || !allowedUnits.includes(parsedValue[1])
        ? null
        : `${parsedValue[0] * (context.isNegative ? -1 : 1)}${parsedValue[1]}`;
}

const ALLOWED_VALUES$2 = [`auto`, `none`, `box-only`, `box-none`];
function pointerEvents(value) {
    if (!ALLOWED_VALUES$2.includes(value))
        return null;
    return complete({
        pointerEvents: value,
    });
}

const ALLOWED_VALUES$1 = [`auto`, `text`, `none`, `contain`, `all`];
function userSelect(value) {
    if (!ALLOWED_VALUES$1.includes(value))
        return null;
    return complete({
        userSelect: value,
    });
}

const ALLOWED_VALUES = [`solid`, `double`, `dotted`, `dashed`];
function textDecorationStyle(value) {
    if (!ALLOWED_VALUES.includes(value))
        return null;
    return complete({
        textDecorationStyle: value,
    });
}

const ALLOWED_STYLE_VALUES = [`dotted`, `dashed`];
function outlineStyle(value) {
    if (!ALLOWED_STYLE_VALUES.includes(value))
        return null;
    return complete({
        outlineStyle: value,
    });
}
function outlineWidth(value, config) {
    const configValue = config === null || config === void 0 ? void 0 : config[value];
    if (configValue) {
        const parsedConfigValue = parseStyleVal(configValue);
        if (parsedConfigValue !== null) {
            return complete({
                outlineWidth: parsedConfigValue,
            });
        }
    }
    const parsedValue = parseUnconfigged(value);
    if (parsedValue !== null) {
        return complete({
            outlineWidth: parsedValue,
        });
    }
    return null;
}
function outlineOffset(value, isNegative, config) {
    const configValue = config === null || config === void 0 ? void 0 : config[value];
    if (configValue) {
        const parsedConfigValue = parseStyleVal(configValue);
        if (parsedConfigValue !== null) {
            return complete({
                outlineOffset: isNegative ? -parsedConfigValue : parsedConfigValue,
            });
        }
    }
    const parsedValue = parseUnconfigged(value);
    if (parsedValue !== null) {
        return complete({
            outlineOffset: isNegative ? -parsedValue : parsedValue,
        });
    }
    return null;
}

function filterBrightness(value, context = {}, config) {
    const styleVal = getBaseFilterStyleValue(value, context, config === null || config === void 0 ? void 0 : config[value]);
    return createStyle(`brightness`, styleVal);
}
function filterContrast(value, context = {}, config) {
    const styleVal = getBaseFilterStyleValue(value, context, config === null || config === void 0 ? void 0 : config[value]);
    return createStyle(`contrast`, styleVal);
}
function filterSaturate(value, context = {}, config) {
    const styleVal = getBaseFilterStyleValue(value, context, config === null || config === void 0 ? void 0 : config[value]);
    return createStyle(`saturate`, styleVal);
}
function filterGrayscale(value, context = {}, config) {
    const parsed = value.startsWith(`-`) ? value.slice(1) : `100`;
    const styleVal = getPercentageFilterStyleValue(parsed, context, config === null || config === void 0 ? void 0 : config[value]);
    return createStyle(`grayscale`, styleVal);
}
function filterInvert(value, context = {}, config) {
    const parsed = value.startsWith(`-`) ? value.slice(1) : `100`;
    const styleVal = getPercentageFilterStyleValue(parsed, context, config === null || config === void 0 ? void 0 : config[value]);
    return createStyle(`invert`, styleVal);
}
function filterSepia(value, context = {}, config) {
    const parsed = value.startsWith(`-`) ? value.slice(1) : `100`;
    const styleVal = getPercentageFilterStyleValue(parsed, context, config === null || config === void 0 ? void 0 : config[value]);
    return createStyle(`sepia`, styleVal);
}
function filterHueRotate(value, context = {}, config) {
    const configValue = config === null || config === void 0 ? void 0 : config[value];
    let styleVal;
    if (configValue) {
        styleVal = parseStyleVal(configValue, context);
    }
    else if (isArbitraryValue(value)) {
        const parsed = parseNumericValue(value.slice(1, -1));
        styleVal = parsed ? `${parsed[0]}${parsed[1]}` : null;
    }
    else {
        const parsed = parseNumericValue(value);
        styleVal = parsed ? `${parsed[0]}${parsed[1]}` : null;
    }
    return createStyle(`hueRotate`, styleVal);
}
function getBaseFilterStyleValue(value, context = {}, configValue) {
    if (configValue) {
        return parseStyleVal(configValue, context);
    }
    else if (isArbitraryValue(value)) {
        const parsed = parseNumericValue(value.slice(1, -1));
        return parsed ? parsed[0] : null;
    }
    else {
        const parsed = parseNumericValue(value);
        return parsed ? parsed[0] / 100 : null;
    }
}
function getPercentageFilterStyleValue(value, context = {}, configValue) {
    var _a;
    if (configValue) {
        const parsed = (_a = parseStyleVal(configValue, context)) === null || _a === void 0 ? void 0 : _a.toString().slice(0, -1);
        return parsed ? parseInt(parsed) / 100 : null;
    }
    else if (isArbitraryValue(value)) {
        const parsed = parseNumericValue(value.slice(1, -1));
        if (parsed === null) {
            return null;
        }
        if (Number.isInteger(parsed[0])) {
            return parsed[0] / 100;
        }
        return parsed[0];
    }
    else {
        const parsed = parseNumericValue(value);
        if (parsed === null) {
            return null;
        }
        if (Number.isInteger(parsed[0])) {
            return parsed[0] / 100;
        }
        return parsed[0];
    }
}
function createStyle(filterType, styleVal) {
    return {
        kind: `dependent`,
        complete(style) {
            updateFilterStyle(style, filterType, styleVal);
        },
    };
}
function updateFilterStyle(style, key, styleVal) {
    if (styleVal === null) {
        return;
    }
    const existingFilter = (style.filter || []);
    if (Array.isArray(existingFilter) && existingFilter) {
        style.filter = [...existingFilter, { [key]: styleVal }];
    }
    else {
        style.filter = existingFilter;
    }
}

class UtilityParser {
    constructor(input, config = {}, cache, device, reactNativeVersion) {
        var _a;
        this.config = config;
        this.cache = cache;
        this.position = 0;
        this.isNull = false;
        this.isNegative = false;
        this.context = {};
        this.context.device = device;
        this.context.reactNativeVersion = reactNativeVersion;
        const parts = input.trim().split(`:`);
        let prefixes = [];
        if (parts.length === 1) {
            this.string = input;
        }
        else {
            this.string = (_a = parts.pop()) !== null && _a !== void 0 ? _a : ``;
            prefixes = parts;
        }
        this.char = this.string[0];
        this.parsePrefixes(prefixes, device);
    }
    parse() {
        if (this.isNull) {
            return { kind: `null` };
        }
        // resolve things like ios:hidden, after prefix removed
        const cached = this.cache.getIr(this.rest);
        if (cached) {
            if (this.order !== undefined) {
                return { kind: `ordered`, order: this.order, styleIr: cached };
            }
            return cached;
        }
        this.parseIsNegative();
        const ir = this.parseUtility();
        if (!ir) {
            return { kind: `null` };
        }
        if (this.order !== undefined) {
            return { kind: `ordered`, order: this.order, styleIr: ir };
        }
        return ir;
    }
    parseUtility() {
        var _a, _b, _c, _d, _e;
        const theme = this.config.theme;
        let style = null;
        switch (this.char) {
            case `m`:
            case `p`: {
                const match = this.peekSlice(1, 3).match(/^(t|b|r|l|x|y)?-/);
                if (match) {
                    const prop = this.char === `m` ? `margin` : `padding`;
                    this.advance(((_b = (_a = match[0]) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + 1);
                    const spacingDirection = getDirection(match[1]);
                    const style = spacing(prop, spacingDirection, this.rest, this.context, (_c = this.config.theme) === null || _c === void 0 ? void 0 : _c[prop]);
                    if (style)
                        return style;
                }
            }
        }
        if (this.consumePeeked(`h-`)) {
            style = widthHeight(`height`, this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.height);
            if (style)
                return style;
        }
        if (this.consumePeeked(`w-`)) {
            style = widthHeight(`width`, this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.width);
            if (style)
                return style;
        }
        if (this.consumePeeked(`min-w-`)) {
            style = minMaxWidthHeight(`minWidth`, this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.minWidth);
            if (style)
                return style;
        }
        if (this.consumePeeked(`min-h-`)) {
            style = minMaxWidthHeight(`minHeight`, this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.minHeight);
            if (style)
                return style;
        }
        if (this.consumePeeked(`max-w-`)) {
            style = minMaxWidthHeight(`maxWidth`, this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.maxWidth);
            if (style)
                return style;
        }
        if (this.consumePeeked(`max-h-`)) {
            style = minMaxWidthHeight(`maxHeight`, this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.maxHeight);
            if (style)
                return style;
        }
        if (this.consumePeeked(`leading-`)) {
            style = lineHeight(this.rest, theme === null || theme === void 0 ? void 0 : theme.lineHeight);
            if (style)
                return style;
        }
        if (this.consumePeeked(`text-`)) {
            style = fontSize(this.rest, theme, this.context);
            if (style)
                return style;
            style = color(`text`, this.rest, theme === null || theme === void 0 ? void 0 : theme.textColor);
            if (style)
                return style;
            if (this.consumePeeked(`opacity-`)) {
                style = colorOpacity(`text`, this.rest);
                if (style)
                    return style;
            }
        }
        if (this.consumePeeked(`font-`)) {
            style = fontFamily(this.rest, theme === null || theme === void 0 ? void 0 : theme.fontFamily);
            if (style)
                return style;
        }
        if (this.consumePeeked(`aspect-`)) {
            if (this.consumePeeked(`ratio-`)) {
                warn(`\`aspect-ratio-{ratio}\` is deprecated, use \`aspect-{ratio}\` instead`);
            }
            style = getCompleteStyle(`aspectRatio`, this.rest, { fractions: true });
            if (style)
                return style;
        }
        if (this.consumePeeked(`tint-`)) {
            style = color(`tint`, this.rest, theme === null || theme === void 0 ? void 0 : theme.colors);
            if (style)
                return style;
        }
        if (this.consumePeeked(`bg-`)) {
            style = color(`bg`, this.rest, theme === null || theme === void 0 ? void 0 : theme.backgroundColor);
            if (style)
                return style;
            if (this.consumePeeked(`opacity-`)) {
                style = colorOpacity(`bg`, this.rest);
                if (style)
                    return style;
            }
        }
        if (this.consumePeeked(`border`)) {
            style = border(this.rest, theme);
            if (style)
                return style;
            if (this.consumePeeked(`-opacity-`)) {
                style = colorOpacity(`border`, this.rest);
                if (style)
                    return style;
            }
        }
        if (this.consumePeeked(`rounded`)) {
            style = borderRadius(this.rest, theme === null || theme === void 0 ? void 0 : theme.borderRadius);
            if (style)
                return style;
        }
        if (this.consumePeeked(`bottom-`)) {
            style = inset(`bottom`, this.rest, this.isNegative, theme === null || theme === void 0 ? void 0 : theme.inset);
            if (style)
                return style;
        }
        if (this.consumePeeked(`top-`)) {
            style = inset(`top`, this.rest, this.isNegative, theme === null || theme === void 0 ? void 0 : theme.inset);
            if (style)
                return style;
        }
        if (this.consumePeeked(`left-`)) {
            style = inset(`left`, this.rest, this.isNegative, theme === null || theme === void 0 ? void 0 : theme.inset);
            if (style)
                return style;
        }
        if (this.consumePeeked(`right-`)) {
            style = inset(`right`, this.rest, this.isNegative, theme === null || theme === void 0 ? void 0 : theme.inset);
            if (style)
                return style;
        }
        if (this.consumePeeked(`inset-`)) {
            style = inset(`inset`, this.rest, this.isNegative, theme === null || theme === void 0 ? void 0 : theme.inset);
            if (style)
                return style;
        }
        if (this.consumePeeked(`flex-`)) {
            if (this.consumePeeked(`basis`)) {
                style = flexBasis(this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.flexBasis);
            }
            else if (this.consumePeeked(`grow`)) {
                style = flexGrowShrink(`Grow`, this.rest, theme === null || theme === void 0 ? void 0 : theme.flexGrow);
            }
            else if (this.consumePeeked(`shrink`)) {
                style = flexGrowShrink(`Shrink`, this.rest, theme === null || theme === void 0 ? void 0 : theme.flexShrink);
            }
            else {
                style = flex(this.rest, theme === null || theme === void 0 ? void 0 : theme.flex);
            }
            if (style)
                return style;
        }
        if (this.consumePeeked(`basis`)) {
            style = flexBasis(this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.flexBasis);
            if (style)
                return style;
        }
        if (this.consumePeeked(`grow`)) {
            style = flexGrowShrink(`Grow`, this.rest, theme === null || theme === void 0 ? void 0 : theme.flexGrow);
            if (style)
                return style;
        }
        if (this.consumePeeked(`shrink`)) {
            style = flexGrowShrink(`Shrink`, this.rest, theme === null || theme === void 0 ? void 0 : theme.flexShrink);
            if (style)
                return style;
        }
        if (this.consumePeeked(`gap`)) {
            style = gap(this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.gap);
            if (style)
                return style;
        }
        if (this.consumePeeked(`shadow-color-opacity-`)) {
            style = colorOpacity(`shadow`, this.rest);
            if (style)
                return style;
        }
        if (this.consumePeeked(`shadow-opacity-`)) {
            style = shadowOpacity(this.rest);
            if (style)
                return style;
        }
        if (this.consumePeeked(`shadow-offset-`)) {
            style = shadowOffset(this.rest);
            if (style)
                return style;
        }
        if (this.consumePeeked(`shadow-radius-`)) {
            style = unconfiggedStyle(`shadowRadius`, this.rest);
            if (style)
                return style;
        }
        if (this.consumePeeked(`shadow-`)) {
            style = color(`shadow`, this.rest, theme === null || theme === void 0 ? void 0 : theme.colors);
            if (style)
                return style;
        }
        if (this.consumePeeked(`elevation-`)) {
            const elevation = parseInt(this.rest, 10);
            if (!Number.isNaN(elevation)) {
                return complete({ elevation });
            }
        }
        if (this.consumePeeked(`opacity-`)) {
            style = opacity(this.rest, theme === null || theme === void 0 ? void 0 : theme.opacity);
            if (style)
                return style;
        }
        if (this.consumePeeked(`tracking-`)) {
            style = letterSpacing(this.rest, this.isNegative, theme === null || theme === void 0 ? void 0 : theme.letterSpacing);
            if (style)
                return style;
        }
        if (this.consumePeeked(`z-`)) {
            const zIndex = Number((_e = (_d = theme === null || theme === void 0 ? void 0 : theme.zIndex) === null || _d === void 0 ? void 0 : _d[this.rest]) !== null && _e !== void 0 ? _e : this.rest);
            if (!Number.isNaN(zIndex)) {
                return complete({ zIndex: this.isNegative ? -zIndex : zIndex });
            }
        }
        if (this.consumePeeked(`size-`)) {
            style = size(this.rest, this.context, theme);
            if (style)
                return style;
        }
        if (this.consumePeeked(`scale-`)) {
            style = scale(this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.scale);
            if (style)
                return style;
        }
        if (this.consumePeeked(`rotate-`)) {
            style = rotate(this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.rotate);
            if (style)
                return style;
        }
        if (this.consumePeeked(`skew-`)) {
            style = skew(this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.skew);
            if (style)
                return style;
        }
        if (this.consumePeeked(`translate-`)) {
            style = translate(this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.translate);
            if (style)
                return style;
        }
        if (this.consumePeeked(`transform-none`)) {
            return transformNone();
        }
        if (this.consumePeeked(`origin-`)) {
            style = origin(this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.transformOrigin);
            if (style)
                return style;
        }
        if (this.consumePeeked(`pointer-events-`)) {
            style = pointerEvents(this.rest);
            if (style)
                return style;
        }
        if (this.consumePeeked(`select-`)) {
            style = userSelect(this.rest);
            if (style)
                return style;
        }
        if (this.consumePeeked(`decoration-`)) {
            style = textDecorationStyle(this.rest);
            if (style)
                return style;
            style = color(`decoration`, this.rest, theme === null || theme === void 0 ? void 0 : theme.colors);
            if (style)
                return style;
        }
        if (this.consumePeeked(`outline-`)) {
            if (this.consumePeeked(`offset-`)) {
                style = outlineOffset(this.rest, this.isNegative, theme === null || theme === void 0 ? void 0 : theme.outlineOffset);
                if (style)
                    return style;
            }
            style = outlineWidth(this.rest, theme === null || theme === void 0 ? void 0 : theme.outlineWidth);
            if (style)
                return style;
            style = outlineStyle(this.rest);
            if (style)
                return style;
            style = color(`outline`, this.rest, theme === null || theme === void 0 ? void 0 : theme.colors);
            if (style)
                return style;
        }
        if (this.consumePeeked(`brightness-`)) {
            style = filterBrightness(this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.brightness);
            if (style)
                return style;
        }
        if (this.consumePeeked(`contrast-`)) {
            style = filterContrast(this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.contrast);
            if (style)
                return style;
        }
        if (this.consumePeeked(`saturate-`)) {
            style = filterSaturate(this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.saturate);
            if (style)
                return style;
        }
        if (this.consumePeeked(`hue-rotate-`)) {
            style = filterHueRotate(this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.hueRotate);
            if (style)
                return style;
        }
        if (this.consumePeeked(`grayscale`)) {
            style = filterGrayscale(this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.grayscale);
            if (style)
                return style;
        }
        if (this.consumePeeked(`invert`)) {
            style = filterInvert(this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.invert);
            if (style)
                return style;
        }
        if (this.consumePeeked(`sepia`)) {
            style = filterSepia(this.rest, this.context, theme === null || theme === void 0 ? void 0 : theme.sepia);
            if (style)
                return style;
        }
        warn(`\`${this.isNegative ? `-` : ``}${this.rest}\` unknown or invalid utility`);
        return null;
    }
    handlePossibleArbitraryBreakpointPrefix(prefix) {
        var _a;
        // save the expense of running the regex with a quick sniff test
        if (prefix[0] !== `m`)
            return false;
        const match = prefix.match(/^(min|max)-(w|h)-\[([^\]]+)\]$/);
        if (!match)
            return false;
        if (!((_a = this.context.device) === null || _a === void 0 ? void 0 : _a.windowDimensions)) {
            this.isNull = true;
            return true;
        }
        const windowDims = this.context.device.windowDimensions;
        const [, type = ``, dir = ``, amount = ``] = match;
        const checkDimension = dir === `w` ? windowDims.width : windowDims.height;
        const parsedAmount = parseNumericValue(amount, this.context);
        if (parsedAmount === null) {
            this.isNull = true;
            return true;
        }
        const [bound, unit] = parsedAmount;
        if (unit !== `px`) {
            this.isNull = true;
        }
        if (type === `min` ? checkDimension >= bound : checkDimension <= bound) {
            this.incrementOrder();
        }
        else {
            this.isNull = true;
        }
        return true;
    }
    advance(amount = 1) {
        this.position += amount;
        this.char = this.string[this.position];
    }
    get rest() {
        return this.peekSlice(0, this.string.length);
    }
    peekSlice(begin, end) {
        return this.string.slice(this.position + begin, this.position + end);
    }
    consumePeeked(string) {
        if (this.peekSlice(0, string.length) === string) {
            this.advance(string.length);
            return true;
        }
        return false;
    }
    parsePrefixes(prefixes, device) {
        var _a, _b, _c, _d, _e;
        const widthBreakpoints = screens((_a = this.config.theme) === null || _a === void 0 ? void 0 : _a.screens);
        // loop through the prefixes ONE time, extracting useful info
        for (const prefix of prefixes) {
            if (widthBreakpoints[prefix]) {
                const breakpointOrder = (_b = widthBreakpoints[prefix]) === null || _b === void 0 ? void 0 : _b[2];
                if (breakpointOrder !== undefined) {
                    this.order = ((_c = this.order) !== null && _c !== void 0 ? _c : 0) + breakpointOrder;
                }
                const windowWidth = (_d = device.windowDimensions) === null || _d === void 0 ? void 0 : _d.width;
                if (windowWidth) {
                    const [min, max] = (_e = widthBreakpoints[prefix]) !== null && _e !== void 0 ? _e : [0, 0];
                    if (windowWidth < min || windowWidth >= max) {
                        // breakpoint does not match
                        this.isNull = true;
                    }
                }
                else {
                    this.isNull = true;
                }
            }
            else if (isPlatform(prefix)) {
                this.isNull = prefix !== device.platform;
            }
            else if (isOrientation(prefix)) {
                if (!device.windowDimensions) {
                    this.isNull = true;
                }
                else {
                    const deviceOrientation = device.windowDimensions.width > device.windowDimensions.height
                        ? `landscape`
                        : `portrait`;
                    if (deviceOrientation !== prefix) {
                        this.isNull = true;
                    }
                    else {
                        this.incrementOrder();
                    }
                }
            }
            else if (prefix === `retina`) {
                if (device.pixelDensity === 2) {
                    this.incrementOrder();
                }
                else {
                    this.isNull = true;
                }
            }
            else if (prefix === `dark`) {
                if (device.colorScheme !== `dark`) {
                    this.isNull = true;
                }
                else {
                    this.incrementOrder();
                }
            }
            else if (!this.handlePossibleArbitraryBreakpointPrefix(prefix)) {
                this.isNull = true;
            }
        }
    }
    parseIsNegative() {
        if (this.char === `-`) {
            this.advance();
            this.isNegative = true;
            this.context.isNegative = true;
        }
    }
    incrementOrder() {
        var _a;
        this.order = ((_a = this.order) !== null && _a !== void 0 ? _a : 0) + 1;
    }
}

function parseInputs(inputs) {
    let classNames = [];
    let styles = null;
    inputs.forEach((input) => {
        if (typeof input === `string`) {
            classNames = [...classNames, ...split(input)];
        }
        else if (Array.isArray(input)) {
            classNames = [...classNames, ...input.flatMap(split)];
        }
        else if (typeof input === `object` && input !== null) {
            for (const [key, value] of Object.entries(input)) {
                if (typeof value === `boolean`) {
                    classNames = [...classNames, ...(value ? split(key) : [])];
                }
                else if (styles) {
                    styles[key] = value;
                }
                else {
                    styles = { [key]: value };
                }
            }
        }
    });
    return [classNames.filter(Boolean).filter(unique), styles];
}
function split(str) {
    return str.trim().split(/\s+/);
}
function unique(className, index, classes) {
    return classes.lastIndexOf(className) === index;
}

function create$1(customConfig, platform, reactNativeVersion) {
    const config = resolveConfig(withContent(customConfig));
    const device = {
        platform,
    };
    const pluginUtils = getAddedUtilities(config.plugins);
    const customStringUtils = {};
    const customStyleUtils = Object.entries(pluginUtils)
        .map(([rawUtil, style]) => {
        const util = rawUtil.replace(/^\./, ``);
        if (typeof style === `string`) {
            // sacrifice functional purity to only iterate once
            customStringUtils[util] = style;
            return [util, { kind: `null` }];
        }
        return [util, complete(style)];
    })
        .filter(([, ir]) => ir.kind !== `null`);
    patchCustomFontUtils(customConfig, customStyleUtils, config);
    function deriveCacheGroup() {
        return ([
            device.colorScheme === `dark` ? `dark` : false,
            device.windowDimensions ? `w${device.windowDimensions.width}` : false,
            device.windowDimensions ? `h${device.windowDimensions.height}` : false,
            device.fontScale ? `fs${device.fontScale}` : false,
            device.pixelDensity === 2 ? `retina` : false,
        ]
            .filter(Boolean)
            .join(`--`) || `default`);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const tailwindFn = (strings, ...values) => {
        let str = ``;
        strings.forEach((string, i) => {
            var _a;
            str += string + ((_a = values[i]) !== null && _a !== void 0 ? _a : ``);
        });
        return style(str);
    };
    const contextCaches = {};
    let cache = new Cache();
    tailwindFn.memoBuster = ``;
    configureCache();
    function configureCache() {
        const cacheGroup = deriveCacheGroup();
        tailwindFn.memoBuster = `twrnc-memobuster-key--${cacheGroup}`;
        const existing = contextCaches[cacheGroup];
        if (existing) {
            cache = existing;
            return;
        }
        const newCache = new Cache(customStyleUtils);
        contextCaches[cacheGroup] = newCache;
        // set custom string utils into cache, so they are resolvable at all breakpoints
        for (const [key, value] of Object.entries(customStringUtils)) {
            newCache.setIr(key, complete(style(value)));
        }
        cache = newCache;
    }
    function style(...inputs) {
        let resolved = {};
        const dependents = [];
        const ordered = [];
        const [utilities, userStyle] = parseInputs(inputs);
        // check if we've seen this full set of classes before
        // if we have a cached copy, we can skip examining each utility
        const joined = utilities.join(` `);
        const cached = cache.getStyle(joined);
        if (cached) {
            return userStyle ? { ...cached, ...userStyle } : cached;
        }
        for (const utility of utilities) {
            let styleIr = cache.getIr(utility);
            if (!styleIr) {
                const parser = new UtilityParser(utility, config, cache, device, reactNativeVersion);
                styleIr = parser.parse();
            }
            switch (styleIr.kind) {
                case `complete`:
                    resolved = { ...resolved, ...styleIr.style };
                    cache.setIr(utility, styleIr);
                    break;
                case `dependent`:
                    dependents.push(styleIr);
                    break;
                case `ordered`:
                    ordered.push(styleIr);
                    break;
                case `null`:
                    cache.setIr(utility, styleIr);
                    break;
            }
        }
        if (ordered.length > 0) {
            ordered.sort((a, b) => a.order - b.order);
            for (const orderedStyle of ordered) {
                switch (orderedStyle.styleIr.kind) {
                    case `complete`:
                        resolved = { ...resolved, ...orderedStyle.styleIr.style };
                        break;
                    case `dependent`:
                        dependents.push(orderedStyle.styleIr);
                        break;
                }
            }
        }
        if (dependents.length > 0) {
            for (const dependent of dependents) {
                const error = dependent.complete(resolved);
                if (error) {
                    warn(error);
                }
            }
            removeOpacityHelpers(resolved);
        }
        // cache the full set of classes for future re-renders
        // it's important we cache BEFORE merging in userStyle below
        if (joined !== ``) {
            cache.setStyle(joined, resolved);
        }
        if (userStyle) {
            resolved = { ...resolved, ...userStyle };
        }
        return resolved;
    }
    function color(utils) {
        // Prefer prefix-specific colors within the theme config.
        // Only support theme objects which do not require a plugin. See:
        // https://v2.tailwindcss.com/docs/theme#configuration-reference
        // https://v3.tailwindcss.com/docs/theme#configuration-reference
        if (config.theme) {
            let color;
            // Iterate supported theme objects and try to find a match
            for (const key of Object.keys(PREFIX_COLOR_PROP_MAP)) {
                const prefix = key;
                const suffix = utils.slice(prefix.length);
                const themePropertyName = PREFIX_COLOR_PROP_MAP[prefix];
                const themeColors = config.theme[themePropertyName];
                if (suffix && utils.startsWith(prefix) && themeColors) {
                    color = configColor(suffix, themeColors);
                    if (color) {
                        return color;
                    }
                }
            }
            // Check `colors` if `utils` is not a computed value (e.g. `secondary opacity-50` or `white/25`)
            if (!/\s+/.test(utils) && !utils.includes(`/`) && config.theme.colors) {
                color = configColor(utils, config.theme.colors);
                if (color) {
                    return color;
                }
            }
        }
        // Fall back to attempting style parsing
        let toStyle = utils;
        if (!/^(bg-|text-|border-)/.test(utils)) {
            toStyle = utils
                .split(/\s+/g)
                .map((util) => util.replace(/^(bg|text|border)-/, ``))
                .map((util) => `bg-${util}`)
                .join(` `);
        }
        const styleObj = style(toStyle);
        const foundColorKey = [
            `backgroundColor`,
            `borderColor`,
            `borderLeftColor`,
            `borderRightColor`,
            `borderTopColor`,
            `borderBottomColor`,
            `color`,
        ].find((key) => typeof (styleObj === null || styleObj === void 0 ? void 0 : styleObj[key]) === `string`);
        if (foundColorKey) {
            return styleObj === null || styleObj === void 0 ? void 0 : styleObj[foundColorKey];
        }
        return undefined;
    }
    tailwindFn.style = style;
    tailwindFn.color = color;
    tailwindFn.prefixMatch = (...prefixes) => {
        const joined = prefixes.sort().join(`:`);
        const cached = cache.getPrefixMatch(joined);
        if (cached !== undefined) {
            return cached;
        }
        const parser = new UtilityParser(`${joined}:flex`, config, cache, device, reactNativeVersion);
        const ir = parser.parse();
        const prefixMatches = ir.kind !== `null`;
        cache.setPrefixMatch(joined, prefixMatches);
        return prefixMatches;
    };
    tailwindFn.setWindowDimensions = (newDimensions) => {
        device.windowDimensions = newDimensions;
        configureCache();
    };
    tailwindFn.setFontScale = (newFontScale) => {
        device.fontScale = newFontScale;
        configureCache();
    };
    tailwindFn.setPixelDensity = (newPixelDensity) => {
        device.pixelDensity = newPixelDensity;
        configureCache();
    };
    tailwindFn.setColorScheme = (newColorScheme) => {
        device.colorScheme = newColorScheme;
        configureCache();
    };
    tailwindFn.getColorScheme = () => device.colorScheme;
    tailwindFn.updateDeviceContext = (window, fontScale, pixelDensity, colorScheme) => {
        device.windowDimensions = window;
        device.fontScale = fontScale;
        device.pixelDensity = pixelDensity;
        if (colorScheme !== `skip`) {
            device.colorScheme = colorScheme;
        }
        configureCache();
    };
    return tailwindFn;
}
function withContent(config) {
    return {
        ...config,
        // prevent warnings from tailwind about not having a `content` prop
        // we don't need one because we have our own jit parser which
        // does not rely on knowing content paths to search
        content: [`_no_warnings_please`],
    };
}
// Allow override default font-<name> style
// @TODO: long-term, i'd like to think of a more generic way to allow
// custom configurations not to get masked by default utilities...
function patchCustomFontUtils(customConfig, customStyleUtils, config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    if (((_a = customConfig.theme) === null || _a === void 0 ? void 0 : _a.fontWeight) || ((_c = (_b = customConfig.theme) === null || _b === void 0 ? void 0 : _b.extend) === null || _c === void 0 ? void 0 : _c.fontWeight)) {
        [
            ...Object.entries((_e = (_d = customConfig.theme) === null || _d === void 0 ? void 0 : _d.fontWeight) !== null && _e !== void 0 ? _e : {}),
            ...Object.entries((_h = (_g = (_f = customConfig.theme) === null || _f === void 0 ? void 0 : _f.extend) === null || _g === void 0 ? void 0 : _g.fontWeight) !== null && _h !== void 0 ? _h : {}),
        ].forEach(([name, value]) => {
            customStyleUtils.push([`font-${name}`, complete({ fontWeight: String(value) })]);
        });
    }
    if (`object` === typeof ((_j = config.theme) === null || _j === void 0 ? void 0 : _j.fontFamily)) {
        [
            ...Object.entries((_l = (_k = customConfig.theme) === null || _k === void 0 ? void 0 : _k.fontFamily) !== null && _l !== void 0 ? _l : {}),
            ...Object.entries((_p = (_o = (_m = customConfig.theme) === null || _m === void 0 ? void 0 : _m.extend) === null || _o === void 0 ? void 0 : _o.fontFamily) !== null && _p !== void 0 ? _p : {}),
        ].forEach(([name, value]) => {
            const fontFamily = Array.isArray(value) ? value[0] : value;
            if (fontFamily) {
                customStyleUtils.push([`font-${name}`, complete({ fontFamily })]);
            }
        });
    }
}

// Apply default config and inject RN Platform and RN version
const create = (twConfig = {}) => {
    var _a;
    return create$1(twConfig, reactNative.Platform.OS, 
    // react-native-web does not expose a constants object
    // @see https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/Platform/index.js
    (_a = reactNative.Platform.constants) === null || _a === void 0 ? void 0 : _a.reactNativeVersion);
};
const tailwind = create();
tailwind.style;

/**
 * Tailwind utility for React Native using twrnc
 * Converts Tailwind className strings to React Native style objects
 */
// Inline Tailwind config with Dash brand colors for React Native
// Colors from src/styles/theme.pcss
const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        // Dash brand colors - matching Web version
        'dash-brand': '#4C7EFF',
        // Primary brand color
        'dash-brand-dim': '#96A7FF',
        // Dimmed brand color
        'dash-brand-dark': '#4D5895',
        // Dark brand color
        'dash-brand-darkness': '#13172A',
        // Darkest brand color
        'dash-mint': '#60F6D2',
        // Mint/teal color
        'dash-mint-hover': '#4DD4B1',
        // Mint hover state
        'dash-yellow-light': '#FEF3C7',
        // Light yellow
        'dash-yellow': '#FDE68A',
        // Yellow
        'dash-primary-die-subdued': '#0c1c3308',
        // Subdued color with alpha
        'dash-primary-dark-blue': '#0C1C33',
        // Dark blue
        // State colors
        'dash-green': '#40BF40',
        'dash-red': '#CD2E00',
        'dash-orange': '#F98F12'
      }
    }
  }
};
// Create a tailwind instance with React Native compatible colors
const tw = create(tailwindConfig);
/**
 * Helper to convert className string to React Native style object
 * @param className - Tailwind class names string
 * @returns React Native style object
 */
const cn = className => tw`${className}`;

const textStyles$1 = classVarianceAuthority.cva('', {
  variants: {
    variant: {
      body: 'text-base',
      caption: 'text-sm',
      label: 'text-xs'
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold'
    },
    color: {
      default: 'text-gray-900 dark:text-gray-100',
      blue: 'text-dash-brand',
      red: 'text-red-700 dark:text-red-400',
      gray: 'text-gray-600 dark:text-gray-400'
    },
    italic: {
      false: '',
      true: 'italic'
    },
    underline: {
      false: '',
      true: 'underline'
    },
    lineThrough: {
      false: '',
      true: 'line-through'
    },
    transform: {
      none: '',
      uppercase: 'uppercase',
      capitalize: 'capitalize'
    },
    opacity: {
      100: 'opacity-100',
      80: 'opacity-80',
      60: 'opacity-60',
      40: 'opacity-40'
    }
  },
  defaultVariants: {
    variant: 'body',
    weight: 'regular',
    color: 'default',
    italic: false,
    underline: false,
    lineThrough: false,
    transform: 'none',
    opacity: 100
  }
});
/**
 * React Native Text component with variants, weights, and styling options.
 * Uses twrnc for Tailwind-like styling converted to React Native styles.
 */
const Text = _a => {
  var {
      variant,
      weight,
      color,
      italic,
      underline,
      lineThrough,
      transform,
      opacity,
      className = '',
      style,
      children
    } = _a,
    props = tslib.__rest(_a, ["variant", "weight", "color", "italic", "underline", "lineThrough", "transform", "opacity", "className", "style", "children"]);
  const classes = textStyles$1({
    variant,
    weight,
    color,
    italic,
    underline,
    lineThrough,
    transform,
    opacity
  }) + (className ? ` ${className}` : '');
  // Convert Tailwind classes to React Native style object
  const textStyle = [cn(classes), style].filter(Boolean);
  return jsxRuntime.jsx(reactNative.Text, Object.assign({
    style: textStyle
  }, props, {
    children: children
  }));
};

const headingStyles = classVarianceAuthority.cva('font-bold text-gray-900 dark:text-gray-100', {
  variants: {
    level: {
      1: 'text-4xl',
      2: 'text-3xl',
      3: 'text-2xl',
      4: 'text-xl',
      5: 'text-lg',
      6: 'text-base'
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold'
    },
    color: {
      default: '',
      black: 'text-black dark:text-white',
      gray: 'text-gray-600 dark:text-gray-300',
      blue: 'text-blue-600 dark:text-blue-400',
      red: 'text-red-600 dark:text-red-400',
      green: 'text-green-600 dark:text-green-400'
    }
  },
  defaultVariants: {
    level: 1,
    weight: 'extrabold',
    color: 'default'
  }
});
/**
 * React Native Heading component with semantic levels and customizable styling.
 * Uses twrnc for Tailwind-like styling converted to React Native styles.
 */
const Heading = _a => {
  var {
      level,
      weight,
      color,
      className = '',
      style,
      children
    } = _a,
    props = tslib.__rest(_a, ["level", "weight", "color", "className", "style", "children"]);
  const classes = headingStyles({
    level,
    weight,
    color
  }) + (className ? ` ${className}` : '');
  // Convert Tailwind classes to React Native style object
  const headingStyle = [cn(classes), style].filter(Boolean);
  return jsxRuntime.jsx(reactNative.Text, Object.assign({
    style: headingStyle
  }, props, {
    children: children
  }));
};

const buttonStyles = classVarianceAuthority.cva('items-center justify-center flex-row min-h-11 transition-colors border border-transparent', {
  variants: {
    variant: {
      solid: '',
      outline: 'border-current bg-transparent',
      ghost: 'bg-transparent border-transparent'
    },
    colorScheme: {
      brand: '',
      mint: '',
      gray: '',
      red: '',
      lightBlue: '',
      lightGray: ''
    },
    size: {
      sm: 'px-3 py-2',
      md: 'px-[18px] py-3',
      lg: 'px-6 py-4',
      xl: 'px-[25px] py-5'
    },
    rounded: {
      default: '',
      full: 'rounded-full'
    },
    disabled: {
      false: '',
      true: 'opacity-50'
    }
  },
  compoundVariants: [
  // Border radius per size (when rounded is default)
  {
    size: 'sm',
    rounded: 'default',
    class: 'rounded-[10px]'
  }, {
    size: 'md',
    rounded: 'default',
    class: 'rounded-[14px]'
  }, {
    size: 'lg',
    rounded: 'default',
    class: 'rounded-[14px]'
  }, {
    size: 'xl',
    rounded: 'default',
    class: 'rounded-[16px]'
  },
  // Solid variants - brand
  {
    variant: 'solid',
    colorScheme: 'brand',
    disabled: false,
    class: 'bg-dash-brand'
  }, {
    variant: 'solid',
    colorScheme: 'mint',
    disabled: false,
    class: 'bg-dash-mint'
  }, {
    variant: 'solid',
    colorScheme: 'gray',
    disabled: false,
    class: 'bg-gray-200 dark:bg-gray-600'
  }, {
    variant: 'solid',
    colorScheme: 'red',
    disabled: false,
    class: 'bg-red-200 dark:bg-red-600'
  }, {
    variant: 'solid',
    colorScheme: 'lightBlue',
    disabled: false,
    class: 'bg-dash-brand/10 dark:bg-dash-brand/20'
  }, {
    variant: 'solid',
    colorScheme: 'lightGray',
    disabled: false,
    class: 'bg-gray-100 dark:bg-gray-700/20'
  },
  // Outline variants
  {
    variant: 'outline',
    colorScheme: 'brand',
    class: 'border-dash-brand'
  }, {
    variant: 'outline',
    colorScheme: 'mint',
    class: 'border-dash-mint'
  }, {
    variant: 'outline',
    colorScheme: 'gray',
    class: 'border-gray-700 dark:border-gray-300'
  }, {
    variant: 'outline',
    colorScheme: 'red',
    class: 'border-red-700 dark:border-red-400'
  }],
  defaultVariants: {
    variant: 'solid',
    colorScheme: 'brand',
    size: 'md',
    rounded: 'default',
    disabled: false
  }
});
const textStyles = classVarianceAuthority.cva('font-medium', {
  variants: {
    variant: {
      solid: '',
      outline: '',
      ghost: ''
    },
    colorScheme: {
      brand: '',
      mint: '',
      gray: '',
      red: '',
      lightBlue: '',
      lightGray: ''
    },
    size: {
      sm: 'text-sm',
      // 14px
      md: 'text-base',
      // 16px
      lg: 'text-base',
      // 16px
      xl: 'text-lg' // 18px
    }
  },
  compoundVariants: [
  // Solid text colors
  {
    variant: 'solid',
    colorScheme: 'brand',
    class: 'text-white'
  }, {
    variant: 'solid',
    colorScheme: 'mint',
    class: 'text-black'
  }, {
    variant: 'solid',
    colorScheme: 'gray',
    class: 'text-gray-700 dark:text-gray-100'
  }, {
    variant: 'solid',
    colorScheme: 'red',
    class: 'text-red-700 dark:text-red-100'
  }, {
    variant: 'solid',
    colorScheme: 'lightBlue',
    class: 'text-dash-brand'
  }, {
    variant: 'solid',
    colorScheme: 'lightGray',
    class: 'text-gray-900 dark:text-gray-300'
  },
  // Outline text colors
  {
    variant: 'outline',
    colorScheme: 'brand',
    class: 'text-dash-brand'
  }, {
    variant: 'outline',
    colorScheme: 'mint',
    class: 'text-dash-mint'
  }, {
    variant: 'outline',
    colorScheme: 'gray',
    class: 'text-gray-700 dark:text-gray-300'
  }, {
    variant: 'outline',
    colorScheme: 'red',
    class: 'text-red-700 dark:text-red-400'
  },
  // Ghost text colors
  {
    variant: 'ghost',
    colorScheme: 'brand',
    class: 'text-dash-brand'
  }],
  defaultVariants: {
    variant: 'solid',
    colorScheme: 'brand',
    size: 'md'
  }
});
/**
 * React Native Button component with variants, color schemes, sizes, and loading state.
 * Uses Pressable for touch interactions and twrnc for Tailwind styling.
 */
const Button = _a => {
  var {
      variant,
      colorScheme,
      size,
      rounded,
      disabled = false,
      loading = false,
      className = '',
      style,
      children,
      onPress
    } = _a,
    props = tslib.__rest(_a, ["variant", "colorScheme", "size", "rounded", "disabled", "loading", "className", "style", "children", "onPress"]);
  const isDisabled = disabled || loading;
  const buttonClasses = buttonStyles({
    variant,
    colorScheme,
    size,
    rounded,
    disabled: isDisabled
  }) + (className ? ` ${className}` : '');
  const textClasses = textStyles({
    variant,
    colorScheme,
    size
  });
  // Convert Tailwind classes to React Native style objects
  const buttonStyle = [cn(buttonClasses), style].filter(Boolean);
  const textStyle = cn(textClasses);
  return jsxRuntime.jsx(reactNative.Pressable, Object.assign({
    style: ({
      pressed
    }) => [...buttonStyle, pressed && !isDisabled && {
      opacity: 0.7
    }],
    disabled: isDisabled,
    onPress: onPress
  }, props, {
    children: loading ? jsxRuntime.jsx(reactNative.ActivityIndicator, {
      size: "small",
      color: variant === 'solid' && colorScheme === 'brand' ? '#fff' : '#3B82F6'
    }) : typeof children === 'string' ? jsxRuntime.jsx(reactNative.Text, {
      style: textStyle,
      children: children
    }) : children
  }));
};

const ArrowIcon = ({
  color = 'white',
  size = 14,
  onPress
}) => {
  return jsxRuntime.jsx(Svg, {
    width: size,
    height: size,
    viewBox: '0 0 9 14',
    fill: 'none',
    onPress: onPress,
    color: color,
    children: jsxRuntime.jsx(Svg.Path, {
      d: 'M7.29297 0.292893C7.68349 -0.0976311 8.31651 -0.0976311 8.70703 0.292893C9.09756 0.683418 9.09756 1.31643 8.70703 1.70696L3.41406 6.99992L8.70703 12.2929L8.77539 12.3691C9.09574 12.7618 9.07315 13.3408 8.70703 13.707C8.34092 14.0731 7.76191 14.0957 7.36914 13.7753L7.29297 13.707L0.585938 6.99992L7.29297 0.292893Z',
      fill: color
    })
  });
};
const CopyIcon = ({
  color = 'white',
  size = 16,
  onPress
}) => {
  return jsxRuntime.jsxs(Svg, {
    width: size,
    height: size,
    viewBox: '0 0 16 16',
    fill: 'none',
    onPress: onPress,
    color: color,
    children: [jsxRuntime.jsx(Svg.G, {
      clipPath: 'url(#clip0_3876_6767)',
      children: jsxRuntime.jsx(Svg.G, {
        clipPath: 'url(#clip1_3876_6767)',
        children: jsxRuntime.jsx(Svg.G, {
          clipPath: 'url(#clip2_3876_6767)',
          children: jsxRuntime.jsx(Svg.Path, {
            d: 'M11.4512 10.5645H5.28516V1.75586H9.32335L11.4512 3.88369V10.5645ZM12.332 3.51758L9.68945 0.875H5.28516H4.4043V1.75586V10.5645V11.4453H5.28516H11.4512H12.332V10.5645V3.51758ZM0.880859 4.39844H0V5.2793V14.0879V14.9688H0.880859H7.04688H7.92773V14.0879V12.3262H7.04688V14.0879H0.880859V5.2793H3.52344V4.39844H0.880859Z',
            fill: color
          })
        })
      })
    }), jsxRuntime.jsxs(Svg.Defs, {
      children: [jsxRuntime.jsx(Svg.ClipPath, {
        id: 'clip0_3876_6767',
        children: jsxRuntime.jsx(Svg.Rect, {
          width: '16',
          height: '16',
          fill: 'white'
        })
      }), jsxRuntime.jsx(Svg.ClipPath, {
        id: 'clip1_3876_6767',
        children: jsxRuntime.jsx(Svg.Rect, {
          width: '16',
          height: '14.25',
          fill: 'white',
          transform: 'translate(0 0.875)'
        })
      }), jsxRuntime.jsx(Svg.ClipPath, {
        id: 'clip2_3876_6767',
        children: jsxRuntime.jsx(Svg.Rect, {
          width: '12.332',
          height: '14.0938',
          fill: 'white',
          transform: 'translate(0 0.875)'
        })
      })]
    })]
  });
};
const SuccessIcon = ({
  color = '#1CC400',
  size = 18,
  onPress
}) => jsxRuntime.jsxs(Svg, {
  width: size,
  height: size,
  viewBox: '0 0 18 18',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: [jsxRuntime.jsx(Svg.Circle, {
    cx: '9',
    cy: '9',
    r: '9',
    fill: color,
    fillOpacity: '.2'
  }), jsxRuntime.jsx(Svg.Path, {
    d: 'M5 8.5L8 11.5L13.5 6',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round'
  })]
});
const ErrorIcon = ({
  color = '#F45858',
  size = 18,
  onPress
}) => jsxRuntime.jsxs(Svg, {
  width: size,
  height: size,
  viewBox: '0 0 18 18',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: [jsxRuntime.jsx(Svg.Rect, {
    width: '18',
    height: '18',
    rx: '4',
    fill: color,
    fillOpacity: '.2'
  }), jsxRuntime.jsx(Svg.Path, {
    d: 'M9.06951 10L9.0695 4.86092',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round'
  }), jsxRuntime.jsx(Svg.Path, {
    d: 'M9.06951 13L9.06951 13.0102',
    stroke: color,
    strokeWidth: '2',
    strokeLinecap: 'round'
  })]
});
const CheckIcon = ({
  color = '#4C7EFF',
  size = 20,
  onPress
}) => {
  return jsxRuntime.jsxs(Svg, {
    width: size,
    height: size,
    viewBox: '0 0 20 20',
    fill: 'none',
    onPress: onPress,
    children: [jsxRuntime.jsx(Svg.Circle, {
      cx: '10',
      cy: '10',
      r: '10',
      fill: 'rgba(12, 28, 51, 0.05)'
    }), jsxRuntime.jsx(Svg.Path, {
      d: 'M6.33 10L8.83 12.5L13.67 7.67',
      stroke: color,
      strokeWidth: '1.5',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    })]
  });
};
const CrossIcon = ({
  color = '#0C1C33',
  size = 16,
  onPress
}) => jsxRuntime.jsx(Svg, {
  width: size,
  height: size * 17 / 16,
  viewBox: '0 0 16 17',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: jsxRuntime.jsx(Svg.Path, {
    d: 'M13.5693 3.40266L13.0973 2.93066L8 8.02866L2.90266 2.93066L2.43066 3.40266L7.52866 8.5L2.43066 13.5973L2.90266 14.0693L8 8.97133L13.0973 14.0693L13.5693 13.5973L8.47133 8.5L13.5693 3.40266Z',
    fill: color
  })
});
const PlusIcon = ({
  color = '#4C7EFF',
  size = 17,
  onPress
}) => jsxRuntime.jsx(Svg, {
  width: size,
  height: size * 16 / 17,
  viewBox: '0 0 17 16',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: jsxRuntime.jsx(Svg.Path, {
    d: 'M15.1667 7.66665H8.83337V1.33331H8.16671V7.66665H1.83337V8.33331H8.16671V14.6666H8.83337V8.33331H15.1667V7.66665Z',
    fill: color
  })
});
const ChevronIcon = ({
  color = '#0C1C33',
  size = 12,
  onPress
}) => jsxRuntime.jsx(Svg, {
  width: size,
  height: size,
  viewBox: '0 0 12 12',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: jsxRuntime.jsx(Svg.Path, {
    d: 'M6 8.9395L1.65149 4.59099L2.18149 4.06049L6 7.879L9.8185 4.06049L10.3485 4.59099L6 8.9395Z',
    fill: color
  })
});
const SearchIcon = ({
  color = '#0C1C33',
  size = 16,
  onPress
}) => jsxRuntime.jsx(Svg, {
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: jsxRuntime.jsx(Svg.Path, {
    d: 'M14.569 14.0977L10.6623 10.191C11.5815 9.14938 12.0591 7.79092 11.9941 6.40327C11.9292 5.01564 11.3267 3.70776 10.3143 2.75659C9.30178 1.80542 7.95892 1.28563 6.56994 1.30729C5.18095 1.32895 3.85492 1.89036 2.87264 2.87264C1.89036 3.85492 1.32895 5.18095 1.30729 6.56994C1.28563 7.95892 1.80542 9.30178 2.75659 10.3143C3.70776 11.3267 5.01564 11.9292 6.40327 11.9941C7.79092 12.0591 9.14938 11.5815 10.191 10.6623L14.0977 14.569L14.569 14.0977ZM6.66665 11.3333C5.74364 11.3333 4.84138 11.0596 4.07396 10.5468C3.30653 10.0341 2.70839 9.30518 2.35518 8.45245C2.00197 7.59978 1.90956 6.66145 2.08962 5.7562C2.26968 4.85095 2.71414 4.01943 3.36678 3.36678C4.01943 2.71414 4.85095 2.26968 5.7562 2.08962C6.66145 1.90956 7.59978 2.00197 8.45245 2.35518C9.30518 2.70839 10.0341 3.30653 10.5468 4.07396C11.0596 4.84138 11.3333 5.74364 11.3333 6.66665C11.3319 7.90385 10.8398 9.09005 9.96492 9.96492C9.09005 10.8398 7.90385 11.3319 6.66665 11.3333Z',
    fill: color
  })
});
const InfoCircleIcon = ({
  color = '#4C7EFF',
  size = 19,
  onPress
}) => jsxRuntime.jsxs(Svg, {
  width: size,
  height: size,
  viewBox: '0 0 19 19',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: [jsxRuntime.jsxs(Svg.G, {
    clipPath: 'url(#clip0_1166_258)',
    children: [jsxRuntime.jsx(Svg.Path, {
      d: 'M9.5 5.5H9.51ZM9.5 8.5V13.5ZM18.5 9.5C18.5 14.4706 14.4706 18.5 9.5 18.5C4.52944 18.5 0.5 14.4706 0.5 9.5C0.5 4.52944 4.52944 0.5 9.5 0.5C14.4706 0.5 18.5 4.52944 18.5 9.5Z',
      fill: color,
      fillOpacity: '0.05'
    }), jsxRuntime.jsx(Svg.Path, {
      d: 'M18 9.5C18 4.80558 14.1945 1 9.5 1C4.80558 1 1 4.80558 1 9.5C1 14.1945 4.80558 18 9.5 18C14.1945 18 18 14.1945 18 9.5ZM9 13.5V8.5C9 8.22386 9.22386 8 9.5 8C9.77614 8 10 8.22386 10 8.5V13.5C10 13.7761 9.77614 14 9.5 14C9.22386 14 9 13.7761 9 13.5ZM9.50977 5C9.78591 5 10.0098 5.22386 10.0098 5.5C10.0098 5.77614 9.78591 6 9.50977 6H9.5C9.22386 6 9 5.77614 9 5.5C9 5.22386 9.22386 5 9.5 5H9.50977ZM19 9.5C19 14.7467 14.7467 19 9.5 19C4.2533 19 0 14.7467 0 9.5C0 4.2533 4.2533 0 9.5 0C14.7467 0 19 4.2533 19 9.5Z',
      fill: color
    })]
  }), jsxRuntime.jsx(Svg.Defs, {
    children: jsxRuntime.jsx(Svg.ClipPath, {
      id: 'clip0_1166_258',
      children: jsxRuntime.jsx(Svg.Rect, {
        width: '19',
        height: '19',
        fill: 'white'
      })
    })
  })]
});
const EyeOpenIcon = ({
  color = 'currentColor',
  size = 16,
  onPress
}) => jsxRuntime.jsx(Svg, {
  width: size,
  height: size * 10 / 16,
  viewBox: '0 0 16 10',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: jsxRuntime.jsx(Svg.Path, {
    d: 'M7.89888 0C6.24409 0.000806406 4.62351 0.471042 3.22533 1.35609C1.82715 2.24114 0.708743 3.50469 0 5C0.708092 6.49578 1.82635 7.75974 3.22468 8.64489C4.623 9.53004 6.24392 9.99999 7.89888 9.99999C9.55378 9.99999 11.1747 9.53004 12.573 8.64489C13.9713 7.75974 15.0896 6.49578 15.7977 5C15.089 3.50469 13.9706 2.24114 12.5724 1.35609C11.1742 0.471042 9.55364 0.000806406 7.89888 0ZM7.89888 8.98344C6.52084 8.97755 5.16914 8.60565 3.98212 7.90571C2.79509 7.20576 1.81538 6.20297 1.14327 5C1.81083 3.7931 2.78951 2.78709 3.97757 2.08654C5.16561 1.38601 6.51964 1.01653 7.89888 1.01653C9.27804 1.01653 10.6321 1.38601 11.8201 2.08654C13.0082 2.78709 13.9868 3.7931 14.6545 5C13.9823 6.20297 13.0026 7.20576 11.8156 7.90571C10.6285 8.60565 9.27689 8.97755 7.89888 8.98344ZM7.89888 2.51693C7.40772 2.51693 6.92767 2.66256 6.51934 2.93541C6.11101 3.20825 5.79274 3.59605 5.60481 4.0498C5.41687 4.50349 5.3677 5.00271 5.46351 5.48439C5.55932 5.96606 5.7958 6.4085 6.14306 6.7558C6.49033 7.10303 6.93275 7.33953 7.41443 7.43535C7.8961 7.53117 8.39533 7.48197 8.84909 7.29406C9.30277 7.10608 9.69059 6.78785 9.96342 6.3795C10.2362 5.97114 10.3819 5.4911 10.3819 5C10.3819 4.34146 10.1203 3.70989 9.65461 3.24421C9.189 2.77854 8.55742 2.51693 7.89888 2.51693ZM7.89888 6.46658C7.60878 6.46658 7.32525 6.38058 7.08407 6.21937C6.8429 6.05822 6.65492 5.82918 6.54392 5.56123C6.43291 5.29322 6.40387 4.99837 6.46045 4.7139C6.51704 4.42942 6.65675 4.16805 6.8618 3.96299C7.06693 3.75786 7.32823 3.61818 7.61271 3.5616C7.89726 3.50501 8.1921 3.53405 8.46011 3.64504C8.72806 3.75603 8.9571 3.94402 9.11825 4.18519C9.27939 4.42637 9.36546 4.7099 9.36546 5C9.36498 5.38884 9.21034 5.76161 8.93542 6.03654C8.66043 6.31146 8.28765 6.4661 7.89888 6.46658Z',
    fill: color
  })
});
const EyeClosedIcon = ({
  color = 'currentColor',
  size = 16,
  onPress
}) => jsxRuntime.jsxs(Svg, {
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'none',
  onPress: onPress,
  color: color,
  children: [jsxRuntime.jsx(Svg.Path, {
    d: 'M7.89888 3C6.24409 3.00081 4.62351 3.47104 3.22533 4.35609C1.82715 5.24114 0.708743 6.50469 0 8C0.708092 9.49578 1.82635 10.7597 3.22468 11.6449C4.623 12.53 6.24392 13 7.89888 13C9.55378 13 11.1747 12.53 12.573 11.6449C13.9713 10.7597 15.0896 9.49578 15.7977 8C15.089 6.50469 13.9706 5.24114 12.5724 4.35609C11.1742 3.47104 9.55364 3.00081 7.89888 3ZM7.89888 11.9834C6.52084 11.9776 5.16914 11.6056 3.98212 10.9057C2.79509 10.2058 1.81538 9.20297 1.14327 8C1.81083 6.7931 2.78951 5.78709 3.97757 5.08654C5.16561 4.38601 6.51964 4.01653 7.89888 4.01653C9.27804 4.01653 10.6321 4.38601 11.8201 5.08654C13.0082 5.78709 13.9868 6.7931 14.6545 8C13.9823 9.20297 13.0026 10.2058 11.8156 10.9057C10.6285 11.6056 9.27689 11.9776 7.89888 11.9834Z',
    fill: color
  }), jsxRuntime.jsx(Svg.Line, {
    x1: '1',
    y1: '15',
    x2: '15',
    y2: '1',
    stroke: color,
    strokeWidth: '1.5',
    strokeLinecap: 'round'
  })]
});
// Export all icons as a collection
const Icons = {
  ArrowIcon,
  CopyIcon,
  SuccessIcon,
  ErrorIcon,
  CheckIcon,
  CrossIcon,
  PlusIcon,
  ChevronIcon,
  SearchIcon,
  InfoCircleIcon,
  EyeOpenIcon,
  EyeClosedIcon
};

const inputStyles = classVarianceAuthority.cva('w-full font-normal text-sm leading-[17px]', {
  variants: {
    colorScheme: {
      default: '',
      brand: '',
      error: '',
      success: '',
      'light-gray': ''
    },
    size: {
      sm: 'px-3 py-2 rounded-[10px]',
      md: 'px-4 py-3 rounded-[12px]',
      xl: 'px-4 py-[18px] rounded-[14px]'
    },
    variant: {
      outlined: 'border',
      filled: 'border-0'
    },
    disabled: {
      false: '',
      true: 'opacity-60'
    }
  },
  compoundVariants: [
  // Outlined variant colors
  {
    variant: 'outlined',
    colorScheme: 'default',
    class: 'border-[rgba(17,17,17,0.32)] bg-white'
  }, {
    variant: 'outlined',
    colorScheme: 'brand',
    class: 'border-dash-brand/30 bg-white'
  }, {
    variant: 'outlined',
    colorScheme: 'error',
    class: 'border-red-500 bg-white'
  }, {
    variant: 'outlined',
    colorScheme: 'success',
    class: 'border-green-500 bg-white'
  }, {
    variant: 'outlined',
    colorScheme: 'light-gray',
    class: 'border-gray-500/50 bg-white'
  },
  // Filled variant colors
  {
    variant: 'filled',
    colorScheme: 'default',
    class: 'bg-dash-brand/15'
  }, {
    variant: 'filled',
    colorScheme: 'brand',
    class: 'bg-dash-brand/15'
  }, {
    variant: 'filled',
    colorScheme: 'error',
    class: 'bg-red-500/15'
  }, {
    variant: 'filled',
    colorScheme: 'success',
    class: 'bg-green-500/15'
  }, {
    variant: 'filled',
    colorScheme: 'light-gray',
    class: 'bg-gray-100'
  }],
  defaultVariants: {
    colorScheme: 'default',
    size: 'xl',
    variant: 'outlined',
    disabled: false
  }
});
/**
 * React Native Input component that adapts to various color schemes, sizes, variants, and states.
 * For password inputs (secureTextEntry), includes a toggleable eye icon.
 * Supports prefix text or elements before input content.
 *
 * @example
 * <Input
 *   secureTextEntry
 *   placeholder="Enter password"
 *   colorScheme="brand"
 *   size="xl"
 *   prefix="https://"
 * />
 */
const Input = _a => {
  var {
      className = '',
      colorScheme,
      size,
      variant,
      error = false,
      success = false,
      disabled = false,
      secureTextEntry = false,
      prefix,
      prefixStyle,
      showPasswordToggle = true,
      style,
      textStyle
    } = _a,
    props = tslib.__rest(_a, ["className", "colorScheme", "size", "variant", "error", "success", "disabled", "secureTextEntry", "prefix", "prefixStyle", "showPasswordToggle", "style", "textStyle"]);
  const [showPassword, setShowPassword] = react.useState(false);
  // Determine color scheme based on state
  let finalColorScheme = colorScheme;
  if (error) finalColorScheme = 'error';else if (success) finalColorScheme = 'success';
  const classes = inputStyles({
    colorScheme: finalColorScheme,
    size,
    variant,
    disabled
  }) + (className ? ` ${className}` : '');
  const isPassword = secureTextEntry;
  const shouldShowToggle = isPassword && showPasswordToggle;
  const hasPrefix = Boolean(prefix);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Convert Tailwind classes to React Native style objects
  const inputStyle = [cn(classes), style].filter(Boolean);
  const inputTextStyle = [{
    color: '#111111',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '300'
  }, textStyle].filter(Boolean);
  // Adjust padding for password toggle button and prefix
  const containerStyle = {};
  if (shouldShowToggle) containerStyle.paddingRight = 40;
  if (hasPrefix) containerStyle.paddingLeft = 70; // Extra space for prefix
  // Default prefix style
  const defaultPrefixStyle = {
    color: 'rgba(17, 17, 17, 0.6)',
    fontSize: 14,
    lineHeight: 17
  };
  // Render prefix element
  const renderPrefix = () => {
    if (!hasPrefix) return null;
    return jsxRuntime.jsx(reactNative.View, {
      style: {
        position: 'absolute',
        left: 16,
        height: '100%',
        justifyContent: 'center',
        zIndex: 10,
        pointerEvents: 'none'
      },
      children: typeof prefix === 'string' ? jsxRuntime.jsx(reactNative.Text, {
        style: [defaultPrefixStyle, prefixStyle],
        children: prefix
      }) : prefix
    });
  };
  if (isPassword || hasPrefix) {
    return jsxRuntime.jsxs(reactNative.View, {
      style: {
        position: 'relative'
      },
      children: [renderPrefix(), jsxRuntime.jsx(reactNative.TextInput, Object.assign({
        style: [inputStyle, containerStyle, inputTextStyle],
        editable: !disabled,
        secureTextEntry: isPassword && !showPassword,
        placeholderTextColor: "rgba(17, 17, 17, 0.6)"
      }, props)), shouldShowToggle && jsxRuntime.jsx(reactNative.TouchableOpacity, {
        style: {
          position: 'absolute',
          right: 16,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0.5
        },
        onPress: togglePasswordVisibility,
        activeOpacity: 0.7,
        children: showPassword ? jsxRuntime.jsx(EyeClosedIcon, {
          size: 16,
          color: '#0C1C33'
        }) : jsxRuntime.jsx(EyeOpenIcon, {
          size: 16,
          color: '#0C1C33'
        })
      })]
    });
  }
  // Regular input without prefix or password
  return jsxRuntime.jsx(reactNative.TextInput, Object.assign({
    style: [inputStyle, inputTextStyle],
    editable: !disabled,
    placeholderTextColor: "rgba(17, 17, 17, 0.6)"
  }, props));
};

const tabsRootStyles = classVarianceAuthority.cva('flex-col w-full', {
  variants: {
    theme: {
      light: '',
      dark: ''
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const tabsListStyles = classVarianceAuthority.cva('flex-row relative', {
  variants: {
    theme: {
      light: '',
      dark: ''
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const tabsTriggerStyles = classVarianceAuthority.cva(['flex-row items-center justify-center relative', 'font-light transition-all'], {
  variants: {
    theme: {
      light: '',
      dark: ''
    },
    active: {
      true: '',
      false: ''
    },
    size: {
      sm: 'text-sm px-0 pr-3 pb-2',
      lg: 'text-xl px-0 pr-4 pb-3',
      xl: 'text-2xl px-0 pr-[14px] pb-[10px]'
    }
  },
  compoundVariants: [{
    theme: 'light',
    active: true,
    class: 'text-dash-primary-dark-blue'
  }, {
    theme: 'light',
    active: false,
    class: 'text-[rgba(12,28,51,0.35)]'
  }, {
    theme: 'dark',
    active: true,
    class: 'text-white'
  }, {
    theme: 'dark',
    active: false,
    class: 'text-gray-400'
  }],
  defaultVariants: {
    theme: 'light',
    active: false,
    size: 'xl'
  }
});
const tabsContentStyles = classVarianceAuthority.cva('', {
  variants: {
    theme: {
      light: '',
      dark: ''
    },
    size: {
      sm: 'mt-2',
      lg: 'mt-3',
      xl: 'mt-4'
    }
  },
  defaultVariants: {
    theme: 'light',
    size: 'xl'
  }
});
/**
 * React Native Tabs component with sleek underline style matching Figma design.
 * Features horizontal scrolling, light/dark theme support, and touch interactions.
 */
const Tabs = ({
  items,
  value,
  defaultValue,
  onValueChange,
  size = 'xl',
  theme = 'light',
  className = '',
  listClassName = '',
  triggerClassName = '',
  contentClassName = '',
  style,
  listStyle,
  triggerStyle,
  contentStyle
}) => {
  var _a;
  const [internalValue, setInternalValue] = react.useState(defaultValue || ((_a = items[0]) === null || _a === void 0 ? void 0 : _a.value) || '');
  // Use controlled value if provided, otherwise use internal state
  const currentValue = value !== undefined ? value : internalValue;
  const handleValueChange = newValue => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(newValue);
  };
  const rootClasses = tabsRootStyles({
    theme
  }) + (className ? ` ${className}` : '');
  const listClasses = tabsListStyles({
    theme
  }) + (listClassName ? ` ${listClassName}` : '');
  const contentClasses = tabsContentStyles({
    theme,
    size
  }) + (contentClassName ? ` ${contentClassName}` : '');
  const rootStyle = [cn(rootClasses), style].filter(Boolean);
  const listStyleCombined = [cn(listClasses), listStyle].filter(Boolean);
  const contentStyleCombined = [cn(contentClasses), contentStyle].filter(Boolean);
  // Border color based on theme
  const borderColor = theme === 'light' ? 'rgba(12, 28, 51, 0.15)' : 'rgba(156, 163, 175, 0.5)';
  const activeBorderColor = '#4C7EFF';
  return jsxRuntime.jsxs(reactNative.View, {
    style: rootStyle,
    children: [jsxRuntime.jsxs(reactNative.View, {
      style: {
        position: 'relative'
      },
      children: [jsxRuntime.jsx(reactNative.ScrollView, {
        horizontal: true,
        showsHorizontalScrollIndicator: false,
        style: listStyleCombined,
        contentContainerStyle: {
          flexDirection: 'row'
        },
        children: items.map(item => {
          const isActive = currentValue === item.value;
          const triggerClasses = tabsTriggerStyles({
            theme,
            active: isActive,
            size
          }) + (triggerClassName ? ` ${triggerClassName}` : '');
          const triggerStyleCombined = [cn(triggerClasses), triggerStyle].filter(Boolean);
          // Get text size based on size prop
          let fontSize = 24; // xl
          let lineHeight = 33; // xl (1.366)
          if (size === 'sm') {
            fontSize = 14;
            lineHeight = 18; // 1.25
          } else if (size === 'lg') {
            fontSize = 20;
            lineHeight = 26; // 1.3
          }
          // Text color based on theme and active state
          let textColor = 'rgba(12, 28, 51, 0.35)'; // light inactive
          if (theme === 'light' && isActive) {
            textColor = '#0C1C33'; // light active
          } else if (theme === 'dark' && isActive) {
            textColor = '#FFFFFF'; // dark active
          } else if (theme === 'dark' && !isActive) {
            textColor = 'rgba(156, 163, 175, 1)'; // dark inactive
          }
          const textStyle = {
            fontSize,
            lineHeight,
            color: textColor,
            fontWeight: isActive ? '500' : '300'
          };
          return jsxRuntime.jsxs(reactNative.TouchableOpacity, {
            disabled: item.disabled,
            onPress: () => !item.disabled && handleValueChange(item.value),
            activeOpacity: 0.8,
            style: triggerStyleCombined,
            children: [jsxRuntime.jsx(reactNative.Text, {
              style: textStyle,
              children: item.label
            }), isActive && jsxRuntime.jsx(reactNative.View, {
              style: {
                position: 'absolute',
                bottom: 0,
                left: -4,
                right: size === 'sm' ? 12 : size === 'lg' ? 16 : 14,
                height: 1,
                backgroundColor: activeBorderColor,
                zIndex: 10
              }
            })]
          }, item.value);
        })
      }), jsxRuntime.jsx(reactNative.View, {
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: borderColor
        }
      })]
    }), items.map(item => {
      if (currentValue !== item.value) return null;
      return jsxRuntime.jsx(reactNative.View, {
        style: contentStyleCombined,
        children: item.content
      }, item.value);
    })]
  });
};

/**
 * Dash Logo component for React Native with customizable size and color
 * Original aspect ratio: 30:25 (1.2:1)
 *
 * Color can be set via:
 * - color prop (default: #4C7EFF)
 *
 * Container supports:
 * - containerPadding: padding around the logo
 * - containerSize: width/height of the container
 * - containerClassName: Tailwind classes for the container
 * - containerStyle: Additional style object for the container
 */
const DashLogo = ({
  color = '#4C7EFF',
  size,
  width,
  height,
  className = '',
  onPress,
  containerPadding,
  containerSize,
  containerClassName = '',
  containerStyle
}) => {
  const logoWidth = width || size || 30;
  const logoHeight = height || (size ? size * 25 / 30 : 25);
  const baseContainerClasses = 'flex justify-center items-center';
  const containerClasses = containerClassName ? `${baseContainerClasses} ${containerClassName}` : baseContainerClasses;
  const inlineContainerStyle = Object.assign({
    padding: containerPadding,
    width: containerSize,
    height: containerSize
  }, containerStyle);
  const combinedContainerStyle = [cn(containerClasses), inlineContainerStyle].filter(Boolean);
  const logoElement = jsxRuntime.jsxs(Svg, {
    width: logoWidth,
    height: logoHeight,
    viewBox: '0 0 30 25',
    fill: 'none',
    children: [jsxRuntime.jsx(Svg.Path, {
      d: 'M19.6465 0C29.2466 2.13767e-05 30.9542 5.2464 29.585 12.6006C28.6773 17.5547 26.3845 21.3391 22.5537 23.1084C20.8153 23.9084 19.1848 24.3555 15.3389 24.3555H4.44629L5.33887 19.293H14.9229C20.6921 19.3084 22.2159 16.8009 22.9697 14.6162C23.2467 13.8008 23.9084 11.2619 23.9238 9.76953C23.9699 6.84642 22.5383 5.07715 17.6768 5.07715L7.81543 5.06152L8.72363 0H19.6465Z',
      fill: color
    }), jsxRuntime.jsx(Svg.Path, {
      d: 'M15.2002 9.63184C15.2002 9.63184 15.0775 10.232 14.7236 11.709C14.4621 12.8321 14.0462 14.6934 11.1846 14.6934H0C0.00327153 14.6775 0.12745 14.0734 0.476562 12.6162C0.73811 11.493 1.15435 9.63184 4.01562 9.63184H15.2002Z',
      fill: color
    })]
  });
  if (onPress) {
    return jsxRuntime.jsx(reactNative.Pressable, {
      style: combinedContainerStyle,
      onPress: onPress,
      children: logoElement
    });
  }
  return jsxRuntime.jsx(reactNative.View, {
    style: combinedContainerStyle,
    children: logoElement
  });
};

exports.ArrowIcon = ArrowIcon;
exports.Button = Button;
exports.CheckIcon = CheckIcon;
exports.ChevronIcon = ChevronIcon;
exports.CopyIcon = CopyIcon;
exports.CrossIcon = CrossIcon;
exports.DashLogo = DashLogo;
exports.ErrorIcon = ErrorIcon;
exports.EyeClosedIcon = EyeClosedIcon;
exports.EyeOpenIcon = EyeOpenIcon;
exports.Heading = Heading;
exports.Icons = Icons;
exports.InfoCircleIcon = InfoCircleIcon;
exports.Input = Input;
exports.PlusIcon = PlusIcon;
exports.SearchIcon = SearchIcon;
exports.SuccessIcon = SuccessIcon;
exports.Tabs = Tabs;
exports.Text = Text;
exports.cn = cn;
exports.tw = tw;
//# sourceMappingURL=index.cjs.js.map
