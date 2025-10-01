"use client";

import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import React__default, { useState, useEffect, createContext, useContext, useRef, useLayoutEffect, useMemo, useCallback } from 'react';
import * as ReactDOM from 'react-dom';
import ReactDOM__default from 'react-dom';
import { cva } from 'class-variance-authority';
import { __rest, __assign, __spreadArray } from 'tslib';

// packages/react/context/src/create-context.tsx
function createContext2(rootComponentName, defaultContext) {
  const Context = React.createContext(defaultContext);
  const Provider = (props) => {
    const { children, ...context } = props;
    const value = React.useMemo(() => context, Object.values(context));
    return /* @__PURE__ */ jsx(Context.Provider, { value, children });
  };
  Provider.displayName = rootComponentName + "Provider";
  function useContext2(consumerName) {
    const context = React.useContext(Context);
    if (context) return context;
    if (defaultContext !== void 0) return defaultContext;
    throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
  }
  return [Provider, useContext2];
}
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = React.createContext(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const value = React.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const context = React.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return React.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return React.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return React.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}

// packages/react/compose-refs/src/compose-refs.tsx
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return React.useCallback(composeRefs(...refs), refs);
}

// src/slot.tsx
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = React.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = React.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (React.Children.count(newElement) > 1) return React.Children.only(null);
          return React.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: React.isValidElement(newElement) ? React.cloneElement(newElement, void 0, newChildren) : null });
    }
    return /* @__PURE__ */ jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
// @__NO_SIDE_EFFECTS__
function createSlotClone(ownerName) {
  const SlotClone = React.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (React.isValidElement(children)) {
      const childrenRef = getElementRef$3(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== React.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return React.cloneElement(children, props2);
    }
    return React.Children.count(children) > 1 ? React.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function isSlottable(child) {
  return React.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef$3(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}

function createCollection(name) {
  const PROVIDER_NAME = name + "CollectionProvider";
  const [createCollectionContext, createCollectionScope] = createContextScope(PROVIDER_NAME);
  const [CollectionProviderImpl, useCollectionContext] = createCollectionContext(
    PROVIDER_NAME,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  );
  const CollectionProvider = (props) => {
    const { scope, children } = props;
    const ref = React__default.useRef(null);
    const itemMap = React__default.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ jsx(CollectionProviderImpl, { scope, itemMap, collectionRef: ref, children });
  };
  CollectionProvider.displayName = PROVIDER_NAME;
  const COLLECTION_SLOT_NAME = name + "CollectionSlot";
  const CollectionSlotImpl = createSlot(COLLECTION_SLOT_NAME);
  const CollectionSlot = React__default.forwardRef(
    (props, forwardedRef) => {
      const { scope, children } = props;
      const context = useCollectionContext(COLLECTION_SLOT_NAME, scope);
      const composedRefs = useComposedRefs(forwardedRef, context.collectionRef);
      return /* @__PURE__ */ jsx(CollectionSlotImpl, { ref: composedRefs, children });
    }
  );
  CollectionSlot.displayName = COLLECTION_SLOT_NAME;
  const ITEM_SLOT_NAME = name + "CollectionItemSlot";
  const ITEM_DATA_ATTR = "data-radix-collection-item";
  const CollectionItemSlotImpl = createSlot(ITEM_SLOT_NAME);
  const CollectionItemSlot = React__default.forwardRef(
    (props, forwardedRef) => {
      const { scope, children, ...itemData } = props;
      const ref = React__default.useRef(null);
      const composedRefs = useComposedRefs(forwardedRef, ref);
      const context = useCollectionContext(ITEM_SLOT_NAME, scope);
      React__default.useEffect(() => {
        context.itemMap.set(ref, { ref, ...itemData });
        return () => void context.itemMap.delete(ref);
      });
      return /* @__PURE__ */ jsx(CollectionItemSlotImpl, { ...{ [ITEM_DATA_ATTR]: "" }, ref: composedRefs, children });
    }
  );
  CollectionItemSlot.displayName = ITEM_SLOT_NAME;
  function useCollection(scope) {
    const context = useCollectionContext(name + "CollectionConsumer", scope);
    const getItems = React__default.useCallback(() => {
      const collectionNode = context.collectionRef.current;
      if (!collectionNode) return [];
      const orderedNodes = Array.from(collectionNode.querySelectorAll(`[${ITEM_DATA_ATTR}]`));
      const items = Array.from(context.itemMap.values());
      const orderedItems = items.sort(
        (a, b) => orderedNodes.indexOf(a.ref.current) - orderedNodes.indexOf(b.ref.current)
      );
      return orderedItems;
    }, [context.collectionRef, context.itemMap]);
    return getItems;
  }
  return [
    { Provider: CollectionProvider, Slot: CollectionSlot, ItemSlot: CollectionItemSlot },
    useCollection,
    createCollectionScope
  ];
}

// src/primitive.tsx
function composeEventHandlers$2(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}

// packages/react/use-layout-effect/src/use-layout-effect.tsx
var useLayoutEffect2 = globalThis?.document ? React.useLayoutEffect : () => {
};

// src/use-controllable-state.tsx
var useInsertionEffect = React[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
function useControllableState({
  prop,
  defaultProp,
  onChange = () => {
  },
  caller
}) {
  const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
    defaultProp,
    onChange
  });
  const isControlled = prop !== void 0;
  const value = isControlled ? prop : uncontrolledProp;
  {
    const isControlledRef = React.useRef(prop !== void 0);
    React.useEffect(() => {
      const wasControlled = isControlledRef.current;
      if (wasControlled !== isControlled) {
        const from = wasControlled ? "controlled" : "uncontrolled";
        const to = isControlled ? "controlled" : "uncontrolled";
        console.warn(
          `${caller} is changing from ${from} to ${to}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        );
      }
      isControlledRef.current = isControlled;
    }, [isControlled, caller]);
  }
  const setValue = React.useCallback(
    (nextValue) => {
      if (isControlled) {
        const value2 = isFunction(nextValue) ? nextValue(prop) : nextValue;
        if (value2 !== prop) {
          onChangeRef.current?.(value2);
        }
      } else {
        setUncontrolledProp(nextValue);
      }
    },
    [isControlled, prop, setUncontrolledProp, onChangeRef]
  );
  return [value, setValue];
}
function useUncontrolledState({
  defaultProp,
  onChange
}) {
  const [value, setValue] = React.useState(defaultProp);
  const prevValueRef = React.useRef(value);
  const onChangeRef = React.useRef(onChange);
  useInsertionEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  React.useEffect(() => {
    if (prevValueRef.current !== value) {
      onChangeRef.current?.(value);
      prevValueRef.current = value;
    }
  }, [value, prevValueRef]);
  return [value, setValue, onChangeRef];
}
function isFunction(value) {
  return typeof value === "function";
}

// src/primitive.tsx
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot = createSlot(`Primitive.${node}`);
  const Node = React.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});
function dispatchDiscreteCustomEvent(target, event) {
  if (target) ReactDOM.flushSync(() => target.dispatchEvent(event));
}

function useStateMachine$2(initialState, machine) {
  return React.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}

// src/presence.tsx
var Presence$2 = (props) => {
  const { present, children } = props;
  const presence = usePresence$2(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : React.Children.only(children);
  const ref = useComposedRefs(presence.ref, getElementRef$2(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? React.cloneElement(child, { ref }) : null;
};
Presence$2.displayName = "Presence";
function usePresence$2(present) {
  const [node, setNode] = React.useState();
  const stylesRef = React.useRef(null);
  const prevPresentRef = React.useRef(present);
  const prevAnimationNameRef = React.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine$2(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  React.useEffect(() => {
    const currentAnimationName = getAnimationName$2(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect2(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName$2(styles);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || styles?.display === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName$2(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName$2(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: React.useCallback((node2) => {
      stylesRef.current = node2 ? getComputedStyle(node2) : null;
      setNode(node2);
    }, [])
  };
}
function getAnimationName$2(styles) {
  return styles?.animationName || "none";
}
function getElementRef$2(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}

// packages/react/id/src/id.tsx
var useReactId = React[" useId ".trim().toString()] || (() => void 0);
var count$2 = 0;
function useId(deterministicId) {
  const [id, setId] = React.useState(useReactId());
  useLayoutEffect2(() => {
    setId((reactId) => reactId ?? String(count$2++));
  }, [deterministicId]);
  return (id ? `radix-${id}` : "");
}

var COLLAPSIBLE_NAME = "Collapsible";
var [createCollapsibleContext, createCollapsibleScope] = createContextScope(COLLAPSIBLE_NAME);
var [CollapsibleProvider, useCollapsibleContext] = createCollapsibleContext(COLLAPSIBLE_NAME);
var Collapsible = React.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeCollapsible,
      open: openProp,
      defaultOpen,
      disabled,
      onOpenChange,
      ...collapsibleProps
    } = props;
    const [open, setOpen] = useControllableState({
      prop: openProp,
      defaultProp: defaultOpen ?? false,
      onChange: onOpenChange,
      caller: COLLAPSIBLE_NAME
    });
    return /* @__PURE__ */ jsx(
      CollapsibleProvider,
      {
        scope: __scopeCollapsible,
        disabled,
        contentId: useId(),
        open,
        onOpenToggle: React.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
        children: /* @__PURE__ */ jsx(
          Primitive.div,
          {
            "data-state": getState$3(open),
            "data-disabled": disabled ? "" : void 0,
            ...collapsibleProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Collapsible.displayName = COLLAPSIBLE_NAME;
var TRIGGER_NAME$5 = "CollapsibleTrigger";
var CollapsibleTrigger = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeCollapsible, ...triggerProps } = props;
    const context = useCollapsibleContext(TRIGGER_NAME$5, __scopeCollapsible);
    return /* @__PURE__ */ jsx(
      Primitive.button,
      {
        type: "button",
        "aria-controls": context.contentId,
        "aria-expanded": context.open || false,
        "data-state": getState$3(context.open),
        "data-disabled": context.disabled ? "" : void 0,
        disabled: context.disabled,
        ...triggerProps,
        ref: forwardedRef,
        onClick: composeEventHandlers$2(props.onClick, context.onOpenToggle)
      }
    );
  }
);
CollapsibleTrigger.displayName = TRIGGER_NAME$5;
var CONTENT_NAME$7 = "CollapsibleContent";
var CollapsibleContent = React.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...contentProps } = props;
    const context = useCollapsibleContext(CONTENT_NAME$7, props.__scopeCollapsible);
    return /* @__PURE__ */ jsx(Presence$2, { present: forceMount || context.open, children: ({ present }) => /* @__PURE__ */ jsx(CollapsibleContentImpl, { ...contentProps, ref: forwardedRef, present }) });
  }
);
CollapsibleContent.displayName = CONTENT_NAME$7;
var CollapsibleContentImpl = React.forwardRef((props, forwardedRef) => {
  const { __scopeCollapsible, present, children, ...contentProps } = props;
  const context = useCollapsibleContext(CONTENT_NAME$7, __scopeCollapsible);
  const [isPresent, setIsPresent] = React.useState(present);
  const ref = React.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const heightRef = React.useRef(0);
  const height = heightRef.current;
  const widthRef = React.useRef(0);
  const width = widthRef.current;
  const isOpen = context.open || isPresent;
  const isMountAnimationPreventedRef = React.useRef(isOpen);
  const originalStylesRef = React.useRef(void 0);
  React.useEffect(() => {
    const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
    return () => cancelAnimationFrame(rAF);
  }, []);
  useLayoutEffect2(() => {
    const node = ref.current;
    if (node) {
      originalStylesRef.current = originalStylesRef.current || {
        transitionDuration: node.style.transitionDuration,
        animationName: node.style.animationName
      };
      node.style.transitionDuration = "0s";
      node.style.animationName = "none";
      const rect = node.getBoundingClientRect();
      heightRef.current = rect.height;
      widthRef.current = rect.width;
      if (!isMountAnimationPreventedRef.current) {
        node.style.transitionDuration = originalStylesRef.current.transitionDuration;
        node.style.animationName = originalStylesRef.current.animationName;
      }
      setIsPresent(present);
    }
  }, [context.open, present]);
  return /* @__PURE__ */ jsx(
    Primitive.div,
    {
      "data-state": getState$3(context.open),
      "data-disabled": context.disabled ? "" : void 0,
      id: context.contentId,
      hidden: !isOpen,
      ...contentProps,
      ref: composedRefs,
      style: {
        [`--radix-collapsible-content-height`]: height ? `${height}px` : void 0,
        [`--radix-collapsible-content-width`]: width ? `${width}px` : void 0,
        ...props.style
      },
      children: isOpen && children
    }
  );
});
function getState$3(open) {
  return open ? "open" : "closed";
}
var Root$3 = Collapsible;
var Trigger$4 = CollapsibleTrigger;
var Content$4 = CollapsibleContent;

// packages/react/direction/src/direction.tsx
var DirectionContext = React.createContext(void 0);
function useDirection(localDir) {
  const globalDir = React.useContext(DirectionContext);
  return localDir || globalDir || "ltr";
}

var ACCORDION_NAME = "Accordion";
var ACCORDION_KEYS = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
var [Collection$2, useCollection$2, createCollectionScope$2] = createCollection(ACCORDION_NAME);
var [createAccordionContext, createAccordionScope] = createContextScope(ACCORDION_NAME, [
  createCollectionScope$2,
  createCollapsibleScope
]);
var useCollapsibleScope = createCollapsibleScope();
var Accordion$1 = React__default.forwardRef(
  (props, forwardedRef) => {
    const { type, ...accordionProps } = props;
    const singleProps = accordionProps;
    const multipleProps = accordionProps;
    return /* @__PURE__ */ jsx(Collection$2.Provider, { scope: props.__scopeAccordion, children: type === "multiple" ? /* @__PURE__ */ jsx(AccordionImplMultiple, { ...multipleProps, ref: forwardedRef }) : /* @__PURE__ */ jsx(AccordionImplSingle, { ...singleProps, ref: forwardedRef }) });
  }
);
Accordion$1.displayName = ACCORDION_NAME;
var [AccordionValueProvider, useAccordionValueContext] = createAccordionContext(ACCORDION_NAME);
var [AccordionCollapsibleProvider, useAccordionCollapsibleContext] = createAccordionContext(
  ACCORDION_NAME,
  { collapsible: false }
);
var AccordionImplSingle = React__default.forwardRef(
  (props, forwardedRef) => {
    const {
      value: valueProp,
      defaultValue,
      onValueChange = () => {
      },
      collapsible = false,
      ...accordionSingleProps
    } = props;
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue ?? "",
      onChange: onValueChange,
      caller: ACCORDION_NAME
    });
    return /* @__PURE__ */ jsx(
      AccordionValueProvider,
      {
        scope: props.__scopeAccordion,
        value: React__default.useMemo(() => value ? [value] : [], [value]),
        onItemOpen: setValue,
        onItemClose: React__default.useCallback(() => collapsible && setValue(""), [collapsible, setValue]),
        children: /* @__PURE__ */ jsx(AccordionCollapsibleProvider, { scope: props.__scopeAccordion, collapsible, children: /* @__PURE__ */ jsx(AccordionImpl, { ...accordionSingleProps, ref: forwardedRef }) })
      }
    );
  }
);
var AccordionImplMultiple = React__default.forwardRef((props, forwardedRef) => {
  const {
    value: valueProp,
    defaultValue,
    onValueChange = () => {
    },
    ...accordionMultipleProps
  } = props;
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? [],
    onChange: onValueChange,
    caller: ACCORDION_NAME
  });
  const handleItemOpen = React__default.useCallback(
    (itemValue) => setValue((prevValue = []) => [...prevValue, itemValue]),
    [setValue]
  );
  const handleItemClose = React__default.useCallback(
    (itemValue) => setValue((prevValue = []) => prevValue.filter((value2) => value2 !== itemValue)),
    [setValue]
  );
  return /* @__PURE__ */ jsx(
    AccordionValueProvider,
    {
      scope: props.__scopeAccordion,
      value,
      onItemOpen: handleItemOpen,
      onItemClose: handleItemClose,
      children: /* @__PURE__ */ jsx(AccordionCollapsibleProvider, { scope: props.__scopeAccordion, collapsible: true, children: /* @__PURE__ */ jsx(AccordionImpl, { ...accordionMultipleProps, ref: forwardedRef }) })
    }
  );
});
var [AccordionImplProvider, useAccordionContext] = createAccordionContext(ACCORDION_NAME);
var AccordionImpl = React__default.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, disabled, dir, orientation = "vertical", ...accordionProps } = props;
    const accordionRef = React__default.useRef(null);
    const composedRefs = useComposedRefs(accordionRef, forwardedRef);
    const getItems = useCollection$2(__scopeAccordion);
    const direction = useDirection(dir);
    const isDirectionLTR = direction === "ltr";
    const handleKeyDown = composeEventHandlers$2(props.onKeyDown, (event) => {
      if (!ACCORDION_KEYS.includes(event.key)) return;
      const target = event.target;
      const triggerCollection = getItems().filter((item) => !item.ref.current?.disabled);
      const triggerIndex = triggerCollection.findIndex((item) => item.ref.current === target);
      const triggerCount = triggerCollection.length;
      if (triggerIndex === -1) return;
      event.preventDefault();
      let nextIndex = triggerIndex;
      const homeIndex = 0;
      const endIndex = triggerCount - 1;
      const moveNext = () => {
        nextIndex = triggerIndex + 1;
        if (nextIndex > endIndex) {
          nextIndex = homeIndex;
        }
      };
      const movePrev = () => {
        nextIndex = triggerIndex - 1;
        if (nextIndex < homeIndex) {
          nextIndex = endIndex;
        }
      };
      switch (event.key) {
        case "Home":
          nextIndex = homeIndex;
          break;
        case "End":
          nextIndex = endIndex;
          break;
        case "ArrowRight":
          if (orientation === "horizontal") {
            if (isDirectionLTR) {
              moveNext();
            } else {
              movePrev();
            }
          }
          break;
        case "ArrowDown":
          if (orientation === "vertical") {
            moveNext();
          }
          break;
        case "ArrowLeft":
          if (orientation === "horizontal") {
            if (isDirectionLTR) {
              movePrev();
            } else {
              moveNext();
            }
          }
          break;
        case "ArrowUp":
          if (orientation === "vertical") {
            movePrev();
          }
          break;
      }
      const clampedIndex = nextIndex % triggerCount;
      triggerCollection[clampedIndex].ref.current?.focus();
    });
    return /* @__PURE__ */ jsx(
      AccordionImplProvider,
      {
        scope: __scopeAccordion,
        disabled,
        direction: dir,
        orientation,
        children: /* @__PURE__ */ jsx(Collection$2.Slot, { scope: __scopeAccordion, children: /* @__PURE__ */ jsx(
          Primitive.div,
          {
            ...accordionProps,
            "data-orientation": orientation,
            ref: composedRefs,
            onKeyDown: disabled ? void 0 : handleKeyDown
          }
        ) })
      }
    );
  }
);
var ITEM_NAME$2 = "AccordionItem";
var [AccordionItemProvider, useAccordionItemContext] = createAccordionContext(ITEM_NAME$2);
var AccordionItem = React__default.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, value, ...accordionItemProps } = props;
    const accordionContext = useAccordionContext(ITEM_NAME$2, __scopeAccordion);
    const valueContext = useAccordionValueContext(ITEM_NAME$2, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    const triggerId = useId();
    const open = value && valueContext.value.includes(value) || false;
    const disabled = accordionContext.disabled || props.disabled;
    return /* @__PURE__ */ jsx(
      AccordionItemProvider,
      {
        scope: __scopeAccordion,
        open,
        disabled,
        triggerId,
        children: /* @__PURE__ */ jsx(
          Root$3,
          {
            "data-orientation": accordionContext.orientation,
            "data-state": getState$2(open),
            ...collapsibleScope,
            ...accordionItemProps,
            ref: forwardedRef,
            disabled,
            open,
            onOpenChange: (open2) => {
              if (open2) {
                valueContext.onItemOpen(value);
              } else {
                valueContext.onItemClose(value);
              }
            }
          }
        )
      }
    );
  }
);
AccordionItem.displayName = ITEM_NAME$2;
var HEADER_NAME = "AccordionHeader";
var AccordionHeader = React__default.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...headerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(HEADER_NAME, __scopeAccordion);
    return /* @__PURE__ */ jsx(
      Primitive.h3,
      {
        "data-orientation": accordionContext.orientation,
        "data-state": getState$2(itemContext.open),
        "data-disabled": itemContext.disabled ? "" : void 0,
        ...headerProps,
        ref: forwardedRef
      }
    );
  }
);
AccordionHeader.displayName = HEADER_NAME;
var TRIGGER_NAME$4 = "AccordionTrigger";
var AccordionTrigger = React__default.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...triggerProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(TRIGGER_NAME$4, __scopeAccordion);
    const collapsibleContext = useAccordionCollapsibleContext(TRIGGER_NAME$4, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return /* @__PURE__ */ jsx(Collection$2.ItemSlot, { scope: __scopeAccordion, children: /* @__PURE__ */ jsx(
      Trigger$4,
      {
        "aria-disabled": itemContext.open && !collapsibleContext.collapsible || void 0,
        "data-orientation": accordionContext.orientation,
        id: itemContext.triggerId,
        ...collapsibleScope,
        ...triggerProps,
        ref: forwardedRef
      }
    ) });
  }
);
AccordionTrigger.displayName = TRIGGER_NAME$4;
var CONTENT_NAME$6 = "AccordionContent";
var AccordionContent = React__default.forwardRef(
  (props, forwardedRef) => {
    const { __scopeAccordion, ...contentProps } = props;
    const accordionContext = useAccordionContext(ACCORDION_NAME, __scopeAccordion);
    const itemContext = useAccordionItemContext(CONTENT_NAME$6, __scopeAccordion);
    const collapsibleScope = useCollapsibleScope(__scopeAccordion);
    return /* @__PURE__ */ jsx(
      Content$4,
      {
        role: "region",
        "aria-labelledby": itemContext.triggerId,
        "data-orientation": accordionContext.orientation,
        ...collapsibleScope,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ["--radix-accordion-content-height"]: "var(--radix-collapsible-content-height)",
          ["--radix-accordion-content-width"]: "var(--radix-collapsible-content-width)",
          ...props.style
        }
      }
    );
  }
);
AccordionContent.displayName = CONTENT_NAME$6;
function getState$2(open) {
  return open ? "open" : "closed";
}
var Root2$5 = Accordion$1;
var Item$2 = AccordionItem;
var Trigger2 = AccordionTrigger;
var Content2$2 = AccordionContent;

const ThemeContext = /*#__PURE__*/createContext(undefined);
/**
 * Provides theme context to its descendants and syncs theme with localStorage
 * and the root HTML element's class list ('light' or 'dark').
 *
 * @param initialTheme - Optional initial theme override.
 * @param children - React children.
 */
const ThemeProvider = ({
  initialTheme,
  children
}) => {
  /**
   * Retrieve stored theme from localStorage, if available.
   */
  const getStoredTheme = () => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('theme');
    return stored != null && (stored === 'light' || stored === 'dark') ? stored : null;
  };
  const [theme, setThemeState] = useState(() => {
    var _a;
    return (_a = initialTheme !== null && initialTheme !== void 0 ? initialTheme : getStoredTheme()) !== null && _a !== void 0 ? _a : 'light';
  });
  // Sync theme changes to document <html> class and localStorage.
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
    try {
      localStorage.setItem('theme', theme);
    } catch (_a) {
      // Ignore localStorage.
    }
  }, [theme]);
  /**
   * Update theme state explicitly.
   * @param newTheme - The theme to set ('light' or 'dark').
   */
  const setTheme = newTheme => {
    setThemeState(newTheme);
  };
  /**
   * Toggle between 'light' and 'dark' theme.
   */
  const toggleTheme = () => {
    setThemeState(current => current === 'light' ? 'dark' : 'light');
  };
  return jsx(ThemeContext.Provider, {
    value: {
      theme,
      setTheme,
      toggleTheme
    },
    children: children
  });
};
/**
 * Hook to access the theme context.
 * @returns ThemeContextValue - Contains `theme`, `setTheme`, and `toggleTheme`.
 * @throws If used outside of a ThemeProvider.
 */
function useTheme() {
  const context = useContext(ThemeContext);
  if (context == null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

const ArrowIcon = ({
  color = 'white',
  size = 14,
  className = '',
  onClick
}) => {
  return jsx("svg", {
    width: size,
    height: size,
    viewBox: '0 0 9 14',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className: className,
    onClick: onClick,
    color: color,
    children: jsx("path", {
      d: 'M7.29297 0.292893C7.68349 -0.0976311 8.31651 -0.0976311 8.70703 0.292893C9.09756 0.683418 9.09756 1.31643 8.70703 1.70696L3.41406 6.99992L8.70703 12.2929L8.77539 12.3691C9.09574 12.7618 9.07315 13.3408 8.70703 13.707C8.34092 14.0731 7.76191 14.0957 7.36914 13.7753L7.29297 13.707L0.585938 6.99992L7.29297 0.292893Z',
      fill: 'currentColor'
    })
  });
};
const CopyIcon = ({
  color = 'white',
  size = 16,
  className = '',
  onClick
}) => {
  return jsxs("svg", {
    width: size,
    height: size,
    viewBox: '0 0 16 16',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className: className,
    onClick: onClick,
    color: color,
    children: [jsx("g", {
      clipPath: 'url(#clip0_3876_6767)',
      children: jsx("g", {
        clipPath: 'url(#clip1_3876_6767)',
        children: jsx("g", {
          clipPath: 'url(#clip2_3876_6767)',
          children: jsx("path", {
            d: 'M11.4512 10.5645H5.28516V1.75586H9.32335L11.4512 3.88369V10.5645ZM12.332 3.51758L9.68945 0.875H5.28516H4.4043V1.75586V10.5645V11.4453H5.28516H11.4512H12.332V10.5645V3.51758ZM0.880859 4.39844H0V5.2793V14.0879V14.9688H0.880859H7.04688H7.92773V14.0879V12.3262H7.04688V14.0879H0.880859V5.2793H3.52344V4.39844H0.880859Z',
            fill: 'currentColor'
          })
        })
      })
    }), jsxs("defs", {
      children: [jsx("clipPath", {
        id: 'clip0_3876_6767',
        children: jsx("rect", {
          width: '16',
          height: '16',
          fill: 'white'
        })
      }), jsx("clipPath", {
        id: 'clip1_3876_6767',
        children: jsx("rect", {
          width: '16',
          height: '14.25',
          fill: 'white',
          transform: 'translate(0 0.875)'
        })
      }), jsx("clipPath", {
        id: 'clip2_3876_6767',
        children: jsx("rect", {
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
  className = '',
  onClick
}) => jsxs("svg", {
  width: size,
  height: size,
  viewBox: '0 0 18 18',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: [jsx("circle", {
    cx: '9',
    cy: '9',
    r: '9',
    fill: 'currentColor',
    fillOpacity: '.2'
  }), jsx("path", {
    d: 'M5 8.5L8 11.5L13.5 6',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round'
  })]
});
const ErrorIcon = ({
  color = '#F45858',
  size = 18,
  className = '',
  onClick
}) => jsxs("svg", {
  width: size,
  height: size,
  viewBox: '0 0 18 18',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: [jsx("rect", {
    width: '18',
    height: '18',
    rx: '4',
    fill: 'currentColor',
    fillOpacity: '.2'
  }), jsx("path", {
    d: 'M9.06951 10L9.0695 4.86092',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round'
  }), jsx("path", {
    d: 'M9.06951 13L9.06951 13.0102',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round'
  })]
});
const QueuedIcon = ({
  color = '#F4A358',
  size = 18,
  className = '',
  onClick
}) => jsxs("svg", {
  width: size,
  height: size,
  viewBox: '0 0 18 18',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: [jsx("rect", {
    width: '18',
    height: '18',
    rx: '4',
    fill: 'currentColor',
    fillOpacity: '.2'
  }), jsx("path", {
    d: 'M11.6756 12.6482C11.8311 12.8601 12.1306 12.9075 12.3268 12.7326C13.1311 12.0158 13.6857 11.055 13.9009 9.99071C14.1476 8.77034 13.9301 7.50182 13.2909 6.43333C12.6518 5.36484 11.637 4.57324 10.4451 4.2134C9.25315 3.85356 7.96985 3.95136 6.84622 4.48768C5.72259 5.024 4.83949 5.96024 4.36966 7.11325C3.89983 8.26626 3.87708 9.55308 4.30587 10.722C4.73466 11.8909 5.58412 12.8577 6.6881 13.4334C7.65084 13.9355 8.74673 14.1085 9.80981 13.934C10.0691 13.8914 10.2207 13.6287 10.1537 13.3746C10.0867 13.1205 9.82636 12.9718 9.56614 13.0086C8.7336 13.1262 7.88063 12.982 7.12813 12.5896C6.23429 12.1235 5.5465 11.3406 5.19933 10.3942C4.85216 9.44781 4.87057 8.40592 5.25098 7.47237C5.63138 6.53882 6.3464 5.78078 7.25616 5.34654C8.16592 4.91231 9.20497 4.83312 10.17 5.12447C11.1351 5.41582 11.9567 6.05674 12.4742 6.92186C12.9917 7.78698 13.1678 8.81405 12.9681 9.80215C12.7999 10.634 12.3756 11.3878 11.7605 11.9612C11.5683 12.1404 11.5202 12.4362 11.6756 12.6482Z',
    fill: 'currentColor'
  })]
});
const PooledIcon = ({
  color = '#008DE4',
  size = 18,
  className = '',
  onClick
}) => jsxs("svg", {
  width: size,
  height: size,
  viewBox: '0 0 18 18',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: [jsx("rect", {
    width: '18',
    height: '18',
    rx: '4',
    fill: 'currentColor',
    fillOpacity: '.2'
  }), jsx("path", {
    d: 'M14 7L12.4328 6.01491C11.4484 5.39611 10.1941 5.40565 9.21918 6.03935V6.03935C8.30752 6.63193 7.14565 6.6816 6.18674 6.16899L4 5',
    stroke: 'currentColor',
    strokeLinecap: 'round'
  }), jsx("path", {
    d: 'M14 10L12.4328 9.01491C11.4484 8.39611 10.1941 8.40565 9.21918 9.03935V9.03935C8.30752 9.63193 7.14565 9.6816 6.18674 9.16899L4 8',
    stroke: 'currentColor',
    strokeLinecap: 'round'
  }), jsx("path", {
    d: 'M14 13L12.4328 12.0149C11.4484 11.3961 10.1941 11.4057 9.21918 12.0393V12.0393C8.30752 12.6319 7.14565 12.6816 6.18674 12.169L4 11',
    stroke: 'currentColor',
    strokeLinecap: 'round'
  })]
});
const BroadcastedIcon = ({
  color = '#008DE4',
  size = 18,
  className = '',
  onClick
}) => jsxs("svg", {
  width: size,
  height: size,
  viewBox: '0 0 18 18',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: [jsx("rect", {
    width: '18',
    height: '18',
    rx: '4',
    fill: 'currentColor',
    fillOpacity: '.2'
  }), jsx("path", {
    d: 'M4.86093 8.74967L12.5 8.74993M12.5 8.74993L9.5 5.74993M12.5 8.74993L9.5 11.7499',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  })]
});
const CalendarIcon = ({
  color = 'currentColor',
  size = 14,
  className = '',
  onClick
}) => jsx("svg", {
  width: size,
  height: size * 14 / 12,
  viewBox: '0 0 12 14',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: jsx("path", {
    fill: 'currentColor',
    d: 'M3.42857 0.143066V0.571638V1.85735H8.57143V0.571638V0.143066H9.42857V0.571638V1.85735H11.1429H12V2.71449V4.42878V5.28592V13.0002V13.8574H11.1429H0.857143H0V13.0002V5.28592V4.42878V2.71449V1.85735H0.857143H2.57143V0.571638V0.143066H3.42857ZM11.1429 5.28592H0.857143V13.0002H11.1429V5.28592ZM11.1429 2.71449H0.857143V4.42878H11.1429V2.71449Z'
  })
});
const EyeOpenIcon = ({
  color = 'currentColor',
  size = 16,
  className = '',
  onClick
}) => jsx("svg", {
  width: size,
  height: size * 10 / 16,
  viewBox: '0 0 16 10',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: jsx("path", {
    d: 'M7.89888 0C6.24409 0.000806406 4.62351 0.471042 3.22533 1.35609C1.82715 2.24114 0.708743 3.50469 0 5C0.708092 6.49578 1.82635 7.75974 3.22468 8.64489C4.623 9.53004 6.24392 9.99999 7.89888 9.99999C9.55378 9.99999 11.1747 9.53004 12.573 8.64489C13.9713 7.75974 15.0896 6.49578 15.7977 5C15.089 3.50469 13.9706 2.24114 12.5724 1.35609C11.1742 0.471042 9.55364 0.000806406 7.89888 0ZM7.89888 8.98344C6.52084 8.97755 5.16914 8.60565 3.98212 7.90571C2.79509 7.20576 1.81538 6.20297 1.14327 5C1.81083 3.7931 2.78951 2.78709 3.97757 2.08654C5.16561 1.38601 6.51964 1.01653 7.89888 1.01653C9.27804 1.01653 10.6321 1.38601 11.8201 2.08654C13.0082 2.78709 13.9868 3.7931 14.6545 5C13.9823 6.20297 13.0026 7.20576 11.8156 7.90571C10.6285 8.60565 9.27689 8.97755 7.89888 8.98344ZM7.89888 2.51693C7.40772 2.51693 6.92767 2.66256 6.51934 2.93541C6.11101 3.20825 5.79274 3.59605 5.60481 4.0498C5.41687 4.50349 5.3677 5.00271 5.46351 5.48439C5.55932 5.96606 5.7958 6.4085 6.14306 6.7558C6.49033 7.10303 6.93275 7.33953 7.41443 7.43535C7.8961 7.53117 8.39533 7.48197 8.84909 7.29406C9.30277 7.10608 9.69059 6.78785 9.96342 6.3795C10.2362 5.97114 10.3819 5.4911 10.3819 5C10.3819 4.34146 10.1203 3.70989 9.65461 3.24421C9.189 2.77854 8.55742 2.51693 7.89888 2.51693ZM7.89888 6.46658C7.60878 6.46658 7.32525 6.38058 7.08407 6.21937C6.8429 6.05822 6.65492 5.82918 6.54392 5.56123C6.43291 5.29322 6.40387 4.99837 6.46045 4.7139C6.51704 4.42942 6.65675 4.16805 6.8618 3.96299C7.06693 3.75786 7.32823 3.61818 7.61271 3.5616C7.89726 3.50501 8.1921 3.53405 8.46011 3.64504C8.72806 3.75603 8.9571 3.94402 9.11825 4.18519C9.27939 4.42637 9.36546 4.7099 9.36546 5C9.36498 5.38884 9.21034 5.76161 8.93542 6.03654C8.66043 6.31146 8.28765 6.4661 7.89888 6.46658Z',
    fill: 'currentColor'
  })
});
const EyeClosedIcon = ({
  color = 'currentColor',
  size = 16,
  className = '',
  onClick
}) => jsxs("svg", {
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: [jsx("path", {
    d: 'M7.89888 3C6.24409 3.00081 4.62351 3.47104 3.22533 4.35609C1.82715 5.24114 0.708743 6.50469 0 8C0.708092 9.49578 1.82635 10.7597 3.22468 11.6449C4.623 12.53 6.24392 13 7.89888 13C9.55378 13 11.1747 12.53 12.573 11.6449C13.9713 10.7597 15.0896 9.49578 15.7977 8C15.089 6.50469 13.9706 5.24114 12.5724 4.35609C11.1742 3.47104 9.55364 3.00081 7.89888 3ZM7.89888 11.9834C6.52084 11.9776 5.16914 11.6056 3.98212 10.9057C2.79509 10.2058 1.81538 9.20297 1.14327 8C1.81083 6.7931 2.78951 5.78709 3.97757 5.08654C5.16561 4.38601 6.51964 4.01653 7.89888 4.01653C9.27804 4.01653 10.6321 4.38601 11.8201 5.08654C13.0082 5.78709 13.9868 6.7931 14.6545 8C13.9823 9.20297 13.0026 10.2058 11.8156 10.9057C10.6285 11.6056 9.27689 11.9776 7.89888 11.9834Z',
    fill: 'currentColor'
  }), jsx("line", {
    x1: '1',
    y1: '15',
    x2: '15',
    y2: '1',
    stroke: 'currentColor',
    strokeWidth: '1.5',
    strokeLinecap: 'round'
  })]
});
const CheckIcon = ({
  color = '#4C7EFF',
  size = 20,
  className = '',
  onClick
}) => {
  return jsxs("svg", {
    width: size,
    height: size,
    viewBox: '0 0 20 20',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    className: className,
    onClick: onClick,
    children: [jsx("circle", {
      cx: '10',
      cy: '10',
      r: '10',
      fill: 'rgba(12, 28, 51, 0.05)'
    }), jsx("path", {
      d: 'M6.33 10L8.83 12.5L13.67 7.67',
      stroke: color,
      strokeWidth: '1.5',
      strokeLinecap: 'round',
      strokeLinejoin: 'round'
    })]
  });
};
const KeyIcon = ({
  color = '#4C7EFF',
  size = 16,
  className = '',
  onClick
}) => jsx("svg", {
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: jsx("path", {
    d: 'M14.0002 5.41699C14.0002 3.25388 12.2463 1.5 10.0832 1.5C7.9202 1.50018 6.16715 3.25399 6.16715 5.41699C6.16716 5.59622 6.17916 5.7722 6.2023 5.94434C6.22418 6.10708 6.24295 6.25021 6.25406 6.36523C6.26445 6.47287 6.27504 6.6168 6.25406 6.76367C6.22507 6.96632 6.17504 7.11454 6.07535 7.29297C5.95896 7.50119 5.76828 7.68206 5.62027 7.83008L1.64469 11.8047C1.57287 11.8765 1.53632 11.9136 1.5109 11.9414C1.49222 11.9619 1.49456 11.9619 1.50211 11.9502C1.50495 11.9368 1.50339 11.9359 1.50211 11.9639C1.5004 12.0015 1.50015 12.0531 1.50015 12.1543V13.5059C1.50016 13.7356 1.50047 13.8631 1.50797 13.9551C1.50902 13.968 1.51085 13.9788 1.51187 13.9873C1.52057 13.9884 1.5316 13.9911 1.54508 13.9922C1.63709 13.9997 1.76453 14 1.9943 14H3.34586C3.44746 14 3.49953 13.9998 3.53726 13.998C3.54201 13.9978 3.54587 13.9973 3.54898 13.9971C3.55141 13.9949 3.55495 13.9927 3.55875 13.9893C3.58663 13.9638 3.62368 13.9272 3.69547 13.8555L7.67008 9.88086C7.81809 9.73284 7.999 9.54119 8.20719 9.4248C8.38512 9.32541 8.53299 9.27507 8.73551 9.24609C8.88263 9.22498 9.02721 9.23569 9.13492 9.24609C9.24997 9.25721 9.39308 9.27596 9.55582 9.29785C9.72785 9.32099 9.90386 9.33299 10.0832 9.33301C12.2462 9.33301 14 7.57995 14.0002 5.41699ZM10.091 4.66699C10.5052 4.66699 10.841 5.00278 10.841 5.41699C10.8408 5.83106 10.5051 6.16699 10.091 6.16699H10.0832C9.66921 6.16682 9.33334 5.83095 9.33316 5.41699C9.33316 5.00289 9.6691 4.66717 10.0832 4.66699H10.091ZM15.5002 5.41699C15.5 8.40838 13.0746 10.833 10.0832 10.833C9.83693 10.833 9.59389 10.8172 9.35562 10.7852C9.18091 10.7617 9.07081 10.747 8.99039 10.7393C8.96929 10.7372 8.95363 10.736 8.94254 10.7354C8.93816 10.7391 8.93249 10.744 8.92594 10.75C8.88376 10.7884 8.82825 10.8438 8.73062 10.9414L4.75601 14.916C4.64689 15.0251 4.50896 15.1701 4.33707 15.2754C4.23454 15.3382 4.12482 15.3878 4.0109 15.4248L3.89566 15.458C3.69989 15.505 3.50042 15.5 3.34586 15.5H1.9943C1.78913 15.5 1.59017 15.5009 1.42301 15.4873C1.24693 15.4729 1.04068 15.4383 0.834139 15.333C0.546975 15.1866 0.312669 14.9536 0.16617 14.666C0.0609559 14.4595 0.0272345 14.2532 0.01285 14.0771C-0.00078215 13.91 0.000154127 13.711 0.000154698 13.5059V12.1543C0.000154157 11.9998 -0.00485276 11.8004 0.0421469 11.6045L0.07535 11.4893C0.112444 11.375 0.162926 11.2656 0.225741 11.1631C0.330953 10.9914 0.474786 10.8535 0.584139 10.7441L4.55875 6.76953C4.65638 6.67189 4.71173 6.6164 4.75015 6.57422C4.75616 6.56762 4.76002 6.56104 4.76383 6.55664C4.76313 6.54561 4.76287 6.5302 4.7609 6.50977C4.75313 6.42933 4.73848 6.3192 4.715 6.14453C4.68297 5.90629 4.66716 5.66325 4.66715 5.41699C4.66715 2.42556 7.09178 0.000176003 10.0832 0C13.0747 0 15.5002 2.42545 15.5002 5.41699Z',
    fill: 'currentColor'
  })
});
const ProtectedMessageIcon = ({
  color = '#4C7EFF',
  size = 16,
  className = '',
  onClick
}) => jsx("svg", {
  width: size,
  height: size * 15 / 16,
  viewBox: '0 0 16 15',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: jsx("path", {
    d: 'M14.25 3.59962C14.25 3.13294 14.2498 2.8257 14.2314 2.59083C14.2137 2.36397 14.1823 2.26919 14.1563 2.21583C14.0746 2.04851 13.947 1.91824 13.7979 1.83887C13.7575 1.8175 13.6783 1.78743 13.4688 1.76954C13.2487 1.75077 12.9591 1.75001 12.5107 1.75001H3.48926C3.04091 1.75001 2.75133 1.75077 2.53125 1.76954C2.32167 1.78743 2.24247 1.81749 2.20215 1.83887C2.05308 1.91822 1.92543 2.04846 1.84375 2.21583C1.81772 2.2692 1.78632 2.36397 1.76856 2.59083C1.75019 2.8257 1.75 3.13294 1.75 3.59962V9.7754C1.75 10.2421 1.75019 10.5493 1.76856 10.7842C1.78632 11.0111 1.81773 11.1058 1.84375 11.1592C1.92545 11.3266 2.05315 11.4569 2.20215 11.5361C2.24247 11.5575 2.32166 11.5876 2.53125 11.6055C2.75132 11.6242 3.04091 11.625 3.48926 11.625H11.3018C11.4998 11.625 11.6723 11.6231 11.8457 11.6484C11.9885 11.6694 12.1304 11.7041 12.2666 11.752C12.4318 11.81 12.5843 11.8917 12.7617 11.9844L14.25 12.7607V3.59962ZM9.58301 5.50977C8.99673 5.43171 8.46424 5.20517 8 4.85645C7.53578 5.20517 7.0033 5.43171 6.41699 5.50977C6.41699 5.61046 6.41699 5.70806 6.41699 5.792C6.41699 7.2248 7.1403 8.31967 8 8.72462C8.8597 8.31967 9.58301 7.2248 9.58301 5.792V5.50977ZM11.083 5.792C11.083 7.83144 9.95571 9.69432 8.22852 10.2461C8.08008 10.2935 7.91992 10.2935 7.77149 10.2461C6.04429 9.69432 4.91699 7.83144 4.91699 5.792V4.792C4.91701 4.3778 5.25279 4.042 5.66699 4.042H5.95801C6.52078 4.042 7.01918 3.8118 7.44238 3.3418C7.58461 3.18384 7.78744 3.09376 8 3.09376C8.21256 3.09376 8.41539 3.18383 8.55762 3.3418C8.9808 3.8118 9.47924 4.042 10.042 4.042H10.333C10.7472 4.042 11.083 4.37779 11.083 4.792V5.792ZM15.75 14C15.75 14.2623 15.613 14.5057 15.3887 14.6416C15.1643 14.7775 14.8848 14.7865 14.6523 14.665L12.0674 13.3145C11.8531 13.2026 11.8096 13.1811 11.7695 13.167L11.6289 13.1328C11.5879 13.1268 11.5413 13.125 11.3018 13.125H3.48926C3.06658 13.125 2.702 13.1261 2.40332 13.1006C2.09499 13.0743 1.78953 13.016 1.49707 12.8604C1.06073 12.6282 0.711683 12.2604 0.495118 11.8164C0.351702 11.5223 0.298056 11.2151 0.273439 10.9004C0.249466 10.5935 0.250001 10.2182 0.250001 9.7754V3.59962C0.250001 3.15678 0.249465 2.78146 0.273439 2.47462C0.298057 2.15985 0.3517 1.85274 0.495118 1.5586C0.711701 1.11453 1.06081 0.746854 1.49707 0.514655C1.78953 0.359048 2.09499 0.300742 2.40332 0.274421C2.702 0.248928 3.06659 0.250007 3.48926 0.250007H12.5107C12.9334 0.250007 13.298 0.248928 13.5967 0.274421C13.905 0.30074 14.2105 0.359048 14.5029 0.514655C14.9391 0.746836 15.2883 1.11446 15.5049 1.5586C15.6483 1.85274 15.7019 2.15986 15.7266 2.47462C15.7505 2.78146 15.75 3.15679 15.75 3.59962V14Z',
    fill: 'currentColor'
  })
});
const SmartphoneIcon = ({
  color = '#4C7EFF',
  size = 12,
  className = '',
  onClick
}) => jsx("svg", {
  width: size,
  height: size * 16 / 12,
  viewBox: '0 0 12 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: jsx("path", {
    d: 'M9.58301 3.48926C9.58301 3.04131 9.58257 2.75009 9.56446 2.52832C9.54705 2.31531 9.51704 2.23247 9.49512 2.18946C9.41795 2.03817 9.29498 1.91507 9.14356 1.83789C9.10056 1.81598 9.01772 1.78596 8.80469 1.76856C8.58301 1.75047 8.29228 1.75 7.84473 1.75H3.48926C3.04133 1.75 2.75008 1.75044 2.52832 1.76856C2.31531 1.78596 2.23248 1.81597 2.18946 1.83789C2.03815 1.91507 1.91507 2.03815 1.83789 2.18946C1.81597 2.23248 1.78596 2.31531 1.76856 2.52832C1.75044 2.75008 1.75 3.04132 1.75 3.48926V12.5107C1.75 12.9587 1.75044 13.2499 1.76856 13.4717C1.78596 13.6847 1.81598 13.7675 1.83789 13.8105C1.9151 13.9619 2.0382 14.085 2.18946 14.1621C2.23248 14.184 2.31532 14.214 2.52832 14.2314C2.75008 14.2496 3.04132 14.25 3.48926 14.25H7.84473C8.29228 14.25 8.58301 14.2495 8.80469 14.2314C9.01771 14.214 9.10056 14.184 9.14356 14.1621L9.25196 14.0957C9.35389 14.0215 9.4373 13.9239 9.49512 13.8105C9.51703 13.7676 9.54705 13.6847 9.56446 13.4717C9.58257 13.2499 9.58301 12.9587 9.58301 12.5107V3.48926ZM5.67481 11.917C6.08886 11.9172 6.42481 12.2529 6.42481 12.667C6.42463 13.0809 6.08875 13.4168 5.67481 13.417H5.667C5.25289 13.417 4.91717 13.0811 4.917 12.667C4.917 12.2528 5.25278 11.917 5.667 11.917H5.67481ZM6.44434 2.58301C6.85844 2.58301 7.19416 2.91895 7.19434 3.33301C7.19434 3.74722 6.85855 4.08301 6.44434 4.08301H4.88868C4.47456 4.08289 4.13868 3.74715 4.13868 3.33301C4.13885 2.91902 4.47467 2.58313 4.88868 2.58301H6.44434ZM11.083 12.5107C11.083 12.9339 11.0838 13.2968 11.0596 13.5938C11.0377 13.8613 10.9926 14.1258 10.8828 14.3818L10.832 14.4912C10.611 14.925 10.258 15.278 9.82422 15.499C9.5346 15.6465 9.2324 15.7016 8.92676 15.7266C8.62989 15.7508 8.2676 15.75 7.84473 15.75H3.48926C3.06611 15.75 2.70325 15.7508 2.40625 15.7266C2.10051 15.7016 1.79849 15.6466 1.50879 15.499C1.07488 15.278 0.721999 14.925 0.50098 14.4912C0.353385 14.2015 0.29842 13.8995 0.273441 13.5938C0.249186 13.2968 0.250003 12.9339 0.250003 12.5107V3.48926C0.250003 3.06611 0.249185 2.70324 0.273441 2.40625C0.298421 2.10051 0.353384 1.79849 0.50098 1.50879C0.722018 1.07496 1.07496 0.722018 1.50879 0.50098C1.7985 0.353384 2.10051 0.298421 2.40625 0.273441C2.70325 0.249185 3.06611 0.250003 3.48926 0.250003H7.84473C8.2676 0.250003 8.62989 0.249218 8.92676 0.273441C9.2324 0.298413 9.5346 0.353484 9.82422 0.50098C10.2579 0.721978 10.611 1.07494 10.832 1.50879L10.8828 1.61817C10.9926 1.87421 11.0377 2.13869 11.0596 2.40625C11.0838 2.70325 11.083 3.0661 11.083 3.48926V12.5107Z',
    fill: 'currentColor'
  })
});
const CrossIcon = ({
  color = '#0C1C33',
  size = 16,
  className = '',
  onClick
}) => jsx("svg", {
  width: size,
  height: size * 17 / 16,
  viewBox: '0 0 16 17',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: jsx("path", {
    d: 'M13.5693 3.40266L13.0973 2.93066L8 8.02866L2.90266 2.93066L2.43066 3.40266L7.52866 8.5L2.43066 13.5973L2.90266 14.0693L8 8.97133L13.0973 14.0693L13.5693 13.5973L8.47133 8.5L13.5693 3.40266Z',
    fill: 'currentColor'
  })
});
const WalletIcon = ({
  color = '#0C1C33',
  size = 16,
  className = '',
  onClick
}) => jsx("svg", {
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: jsx("path", {
    d: 'M12.6667 2.66666H3.33333C2.80289 2.66666 2.29419 2.87737 1.91911 3.25244C1.54404 3.62752 1.33333 4.13622 1.33333 4.66666V11.3333C1.33333 11.8637 1.54404 12.3725 1.91911 12.7475C2.29419 13.1226 2.80289 13.3333 3.33333 13.3333H12.6667C13.1971 13.3333 13.7058 13.1226 14.0809 12.7475C14.4559 12.3725 14.6667 11.8637 14.6667 11.3333V4.66666C14.6667 4.13622 14.4559 3.62752 14.0809 3.25244C13.7058 2.87737 13.1971 2.66666 12.6667 2.66666ZM13.6667 9.66666H11.3333C10.8913 9.66666 10.4674 9.49106 10.1548 9.17852C9.84226 8.86592 9.66666 8.44199 9.66666 7.99999C9.66666 7.55799 9.84226 7.13406 10.1548 6.82146C10.4674 6.50892 10.8913 6.33332 11.3333 6.33332H13.6667V9.66666ZM13.6667 5.33332H11.3333C10.6261 5.33332 9.94779 5.61428 9.44773 6.11437C8.94759 6.61447 8.66666 7.29272 8.66666 7.99999C8.66666 8.70726 8.94759 9.38552 9.44773 9.88559C9.94779 10.3857 10.6261 10.6667 11.3333 10.6667H13.6667V11.3333C13.6663 11.5985 13.5609 11.8527 13.3735 12.0401C13.186 12.2276 12.9318 12.333 12.6667 12.3333H3.33333C3.0682 12.333 2.81402 12.2276 2.62655 12.0401C2.43908 11.8527 2.33363 11.5985 2.33333 11.3333V4.66666C2.33363 4.40153 2.43908 4.14735 2.62655 3.95988C2.81402 3.77241 3.0682 3.66696 3.33333 3.66666H12.6667C12.9318 3.66696 13.186 3.77241 13.3735 3.95988C13.5609 4.14735 13.6663 4.40153 13.6667 4.66666V5.33332ZM10.7333 7.99999C10.7333 8.11866 10.7685 8.23466 10.8345 8.33332C10.9004 8.43199 10.9941 8.50892 11.1037 8.55432C11.2133 8.59972 11.334 8.61159 11.4504 8.58846C11.5668 8.56532 11.6737 8.50819 11.7576 8.42426C11.8415 8.34032 11.8987 8.23346 11.9218 8.11706C11.9449 8.00066 11.9331 7.87999 11.8877 7.77039C11.8423 7.66072 11.7653 7.56706 11.6667 7.50112C11.568 7.43519 11.452 7.39999 11.3333 7.39999C11.1742 7.39999 11.0216 7.46319 10.9091 7.57572C10.7965 7.68826 10.7333 7.84086 10.7333 7.99999Z',
    fill: 'currentColor'
  })
});
const PlusIcon = ({
  color = '#4C7EFF',
  size = 17,
  className = '',
  onClick
}) => jsx("svg", {
  width: size,
  height: size * 16 / 17,
  viewBox: '0 0 17 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: jsx("path", {
    d: 'M15.1667 7.66665H8.83337V1.33331H8.16671V7.66665H1.83337V8.33331H8.16671V14.6666H8.83337V8.33331H15.1667V7.66665Z',
    fill: 'currentColor'
  })
});
const FilterIcon = ({
  color = '#0C1C33',
  size = 16,
  className = '',
  onClick
}) => jsx("svg", {
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: jsx("path", {
    d: 'M9.7725 12.4346V8.4707C9.77253 8.14729 9.87686 7.83238 10.0704 7.57324L12.8887 3.79883C13.135 3.46908 12.8999 3 12.4883 3H4.50297C4.08918 3 3.85471 3.47362 4.10551 3.80273L6.97367 7.56738C7.17261 7.82859 7.28031 8.14821 7.28031 8.47656V13.0273C7.28053 13.3803 7.63675 13.6224 7.96488 13.4922L9.45707 12.8994C9.64752 12.8238 9.77249 12.6395 9.7725 12.4346ZM10.7725 12.4346C10.7725 13.0493 10.3976 13.6022 9.82621 13.8291L8.33402 14.4209C7.34935 14.8119 6.28053 14.0867 6.28031 13.0273V8.47656C6.28031 8.36707 6.24414 8.25994 6.17777 8.17285L3.30961 4.40918C2.55722 3.42182 3.26161 2 4.50297 2H12.4883C13.7229 2 14.4291 3.40823 13.6905 4.39746L10.8721 8.17188C10.8076 8.25823 10.7725 8.36293 10.7725 8.4707V12.4346Z',
    fill: 'currentColor'
  })
});
const EditIcon = ({
  color = '#0C1C33',
  size = 16,
  className = '',
  onClick
}) => jsx("svg", {
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: jsx("path", {
    d: 'M9.7725 12.4346V8.4707C9.77253 8.14729 9.87686 7.83238 10.0704 7.57324L12.8887 3.79883C13.135 3.46908 12.8999 3 12.4883 3H4.50297C4.08918 3 3.85471 3.47362 4.10551 3.80273L6.97367 7.56738C7.17261 7.82859 7.28031 8.14821 7.28031 8.47656V13.0273C7.28053 13.3803 7.63675 13.6224 7.96488 13.4922L9.45707 12.8994C9.64752 12.8238 9.77249 12.6395 9.7725 12.4346ZM10.7725 12.4346C10.7725 13.0493 10.3976 13.6022 9.82621 13.8291L8.33402 14.4209C7.34935 14.8119 6.28053 14.0867 6.28031 13.0273V8.47656C6.28031 8.36707 6.24414 8.25994 6.17777 8.17285L3.30961 4.40918C2.55722 3.42182 3.26161 2 4.50297 2H12.4883C13.7229 2 14.4291 3.40823 13.6905 4.39746L10.8721 8.17188C10.8076 8.25823 10.7725 8.36293 10.7725 8.4707V12.4346Z',
    fill: 'currentColor'
  })
});
const DeleteIcon = ({
  color = '#0C1C33',
  size = 11,
  className = '',
  onClick
}) => jsxs("svg", {
  width: size,
  height: size,
  viewBox: '0 0 11 11',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: [jsx("g", {
    clipPath: 'url(#clip0_106_23)',
    children: jsx("path", {
      d: 'M8.75 2.66706H2.25V7.83308C2.25 8.30882 2.25052 8.63222 2.27344 8.88191C2.29567 9.12381 2.33543 9.25067 2.3877 9.34187C2.51141 9.55763 2.71615 9.74365 2.98047 9.86335C3.10415 9.91928 3.26908 9.95784 3.55469 9.97859C3.84502 9.99967 4.21761 10.0001 4.75 10.0001H6.25C6.78241 10.0001 7.15498 9.99967 7.44531 9.97859C7.73089 9.95784 7.89582 9.91928 8.01953 9.86335C8.28385 9.74365 8.4886 9.55763 8.6123 9.34187C8.66457 9.25068 8.70433 9.12381 8.72656 8.88191C8.74948 8.63222 8.75 8.30882 8.75 7.83308V2.66706ZM3.75 8.27741V4.38874C3.75012 4.1127 3.97393 3.88874 4.25 3.88874C4.52607 3.88874 4.74988 4.1127 4.75 4.38874V8.27741C4.75 8.55356 4.52614 8.77741 4.25 8.77741C3.97386 8.77741 3.75 8.55356 3.75 8.27741ZM6.25 8.27741V4.38874C6.25012 4.1127 6.47393 3.88874 6.75 3.88874C7.02607 3.88874 7.24988 4.1127 7.25 4.38874V8.27741C7.25 8.55356 7.02614 8.77741 6.75 8.77741C6.47386 8.77741 6.25 8.55356 6.25 8.27741ZM4.48633 1.00886C4.36289 1.01585 4.29382 1.02778 4.2334 1.0489C4.11036 1.09191 4.00791 1.16023 3.93164 1.24128C3.87684 1.29953 3.83794 1.37933 3.72656 1.66706H7.27344C7.16206 1.37938 7.12317 1.29955 7.06836 1.24128C6.99206 1.16021 6.88962 1.0919 6.7666 1.0489C6.70618 1.02778 6.63711 1.01585 6.51367 1.00886L5.93359 1.00007H5.06641L4.48633 1.00886ZM9.75 7.83308C9.75 8.29045 9.75078 8.66763 9.72266 8.9737C9.6938 9.28763 9.6316 9.57357 9.47949 9.83894C9.24373 10.2502 8.87373 10.5737 8.43262 10.7735C8.15527 10.8991 7.85689 10.951 7.51758 10.9757C7.18262 11 6.76766 11.0001 6.25 11.0001H4.75C4.23235 11.0001 3.81739 11 3.48242 10.9757C3.14311 10.951 2.84472 10.8991 2.56738 10.7735C2.12629 10.5737 1.75629 10.2502 1.52051 9.83894C1.36841 9.57357 1.3062 9.28763 1.27734 8.9737C1.24922 8.66764 1.25 8.29045 1.25 7.83308V2.66706H0.5C0.223966 2.66706 0.000175928 2.44305 0 2.16706C0 1.89092 0.223858 1.66706 0.5 1.66706H2.65332L2.70117 1.54011C2.85006 1.14308 2.96609 0.807677 3.20312 0.555734C3.39526 0.351554 3.63705 0.198657 3.90332 0.105538C4.22353 -0.00639754 4.58678 6.87183e-05 5.06641 6.96102e-05H5.93359L6.27246 0.00104617C6.59201 0.0043687 6.85648 0.0215742 7.09668 0.105538C7.36298 0.198667 7.60475 0.351572 7.79688 0.555734C8.03384 0.807649 8.1499 1.14302 8.29883 1.54011L8.34668 1.66706H10.5C10.7761 1.66706 11 1.89092 11 2.16706C10.9998 2.44305 10.776 2.66706 10.5 2.66706H9.75V7.83308Z',
      fill: 'currentColor'
    })
  }), jsx("defs", {
    children: jsx("clipPath", {
      id: 'clip0_106_23',
      children: jsx("rect", {
        width: '11',
        height: '11.0001',
        fill: 'white'
      })
    })
  })]
});
const ChevronIcon = ({
  color = '#0C1C33',
  size = 12,
  className = '',
  onClick
}) => jsx("svg", {
  width: size,
  height: size,
  viewBox: '0 0 12 12',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: jsx("path", {
    d: 'M6 8.9395L1.65149 4.59099L2.18149 4.06049L6 7.879L9.8185 4.06049L10.3485 4.59099L6 8.9395Z',
    fill: 'currentColor'
  })
});
const BurgerMenuIcon = ({
  color = '#0C1C33',
  size = 24,
  className = '',
  onClick
}) => jsx("svg", {
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: jsx("path", {
    d: 'M4 7V8.07143H20V7H4ZM4 12.5357H20V11.4643H4V12.5357ZM4 17H20V15.9286H4V17Z',
    fill: 'currentColor'
  })
});
const KebabMenuIcon = ({
  color = '#0C1C33',
  size = 2,
  className = '',
  onClick
}) => jsxs("svg", {
  width: size,
  height: size * 12 / 2,
  viewBox: '0 0 2 12',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: [jsx("path", {
    d: 'M0 11C4.82823e-08 10.4477 0.447715 10 1 10C1.55228 10 2 10.4477 2 11C2 11.5523 1.55228 12 1 12C0.447715 12 -4.82823e-08 11.5523 0 11Z',
    fill: 'currentColor'
  }), jsx("path", {
    d: 'M0 6C4.82823e-08 5.44771 0.447715 5 1 5C1.55228 5 2 5.44772 2 6C2 6.55228 1.55228 7 1 7C0.447715 7 -4.82823e-08 6.55228 0 6Z',
    fill: 'currentColor'
  }), jsx("path", {
    d: 'M0 1C4.82823e-08 0.447715 0.447715 -4.82823e-08 1 0C1.55228 4.82823e-08 2 0.447715 2 1C2 1.55228 1.55228 2 1 2C0.447715 2 -4.82823e-08 1.55228 0 1Z',
    fill: 'currentColor'
  })]
});
const CircleProcessIcon = ({
  color = '#4C7EFF',
  size = 20,
  className = '',
  onClick
}) => jsxs("svg", {
  width: size,
  height: size * 21 / 20,
  viewBox: '0 0 20 21',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: [jsxs("g", {
    clipPath: 'url(#clip0_13_9)',
    children: [jsx("path", {
      d: 'M18.7533 4.27841C18.9677 5.07861 18.4928 5.90112 17.6926 6.11553C16.8924 6.32994 16.0699 5.85507 15.8555 5.05487C15.6411 4.25467 16.116 3.43216 16.9162 3.21775C17.7164 3.00334 18.5389 3.47821 18.7533 4.27841Z',
      fill: 'currentColor'
    }), jsx("path", {
      d: 'M4.14428 15.4398C4.3587 16.24 3.88382 17.0625 3.08362 17.2769C2.28342 17.4913 1.46092 17.0165 1.24651 16.2163C1.03209 15.4161 1.50697 14.5936 2.30717 14.3792C3.10737 14.1647 3.92987 14.6396 4.14428 15.4398Z',
      fill: 'currentColor'
    }), jsx("path", {
      d: 'M17.7273 8.1769C17.5844 7.64343 17.9009 7.0951 18.4344 6.95216C18.9679 6.80921 19.5162 7.1258 19.6592 7.65926C20.1711 9.56968 20.1047 11.589 19.469 13.4619C18.8332 15.3346 17.657 16.9774 16.0879 18.1814C14.5188 19.3854 12.6272 20.0965 10.6536 20.2259C8.68013 20.3552 6.71249 19.8968 4.99974 18.908C4.52157 18.6319 4.35791 18.0203 4.63376 17.5421C4.9099 17.0638 5.52134 16.9 5.99964 17.1761C7.3699 17.9672 8.94453 18.3341 10.5234 18.2307C12.1022 18.1271 13.6147 17.557 14.8699 16.5939C16.1251 15.6307 17.0663 14.3171 17.5749 12.8189C18.0835 11.3206 18.1368 9.70524 17.7273 8.1769Z',
      fill: 'currentColor'
    }), jsx("path", {
      d: 'M2.27249 12.3179C2.41543 12.8514 2.09885 13.3997 1.56538 13.5426C1.03192 13.6856 0.483582 13.369 0.34064 12.8355C-0.171256 10.9251 -0.104905 8.90577 0.530843 7.03292C1.16659 5.16014 2.34283 3.51743 3.91186 2.31344C5.48097 1.10942 7.37261 0.398263 9.34619 0.268908C11.3197 0.139621 13.2873 0.59796 15.0001 1.58681C15.4782 1.86289 15.6419 2.47446 15.366 2.95269C15.0899 3.43099 14.4785 3.59482 14.0002 3.31868C12.6299 2.52756 11.0553 2.16065 9.4764 2.26413C7.89763 2.36766 6.38508 2.93776 5.12986 3.90092C3.87467 4.86412 2.93347 6.17774 2.42489 7.67594C1.9163 9.17422 1.86298 10.7896 2.27249 12.3179Z',
      fill: 'currentColor'
    }), jsx("path", {
      d: 'M13.9999 10.2473C13.9999 12.4565 12.209 14.2473 9.9999 14.2473C7.79076 14.2473 5.9999 12.4565 5.9999 10.2473C5.9999 8.0382 7.79076 6.24734 9.9999 6.24734C12.209 6.24734 13.9999 8.0382 13.9999 10.2473Z',
      fill: 'currentColor'
    })]
  }), jsx("defs", {
    children: jsx("clipPath", {
      id: 'clip0_13_9',
      children: jsx("rect", {
        width: '19.9998',
        height: '19.9998',
        fill: 'white',
        transform: 'translate(0 0.247498)'
      })
    })
  })]
});
const CreditsIcon = ({
  color = '#4C7EFF',
  size = 14,
  className = '',
  onClick
}) => jsxs("svg", {
  width: size,
  height: size * 20 / 14,
  viewBox: '0 0 14 20',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: [jsxs("g", {
    clipPath: 'url(#clip0_14_24)',
    children: [jsx("path", {
      d: 'M7.21466 18.0451C6.70232 18.0451 6.21497 18.0067 5.7526 17.9299C4.85417 17.7808 4.05008 17.4868 3.34031 17.0479C2.26527 16.3761 1.43805 15.4426 0.858639 14.2474C0.286213 13.0523 0 11.6662 0 10.0892C0 8.51211 0.286213 7.12602 0.858639 5.93086C1.43805 4.73571 2.26527 3.80575 3.34031 3.14099C4.05008 2.69743 4.85417 2.4003 5.7526 2.24959C6.21497 2.17202 6.70232 2.13324 7.21466 2.13324C7.88445 2.13324 8.51123 2.19887 9.09499 2.33012C10.0262 2.5395 10.8479 2.91587 11.5602 3.45922C12.719 4.33614 13.5323 5.52069 14 7.01287L11.4555 7.72359C11.1623 6.72645 10.6632 5.94854 9.95812 5.38986C9.25305 4.82411 8.33857 4.54123 7.21466 4.54123C6.20244 4.54123 5.35777 4.77107 4.68063 5.23074C4.01047 5.69042 3.50436 6.3375 3.1623 7.17198C2.82723 7.9994 2.6562 8.97179 2.64921 10.0892C2.64921 11.2065 2.81675 12.1824 3.15183 13.0169C3.49389 13.8443 4.00349 14.4879 4.68063 14.9476C5.35777 15.4072 6.20244 15.6371 7.21466 15.6371C8.33857 15.6371 9.25305 15.3542 9.95812 14.7884C10.6632 14.2227 11.1623 13.4448 11.4555 12.4547L14 13.1654C13.5323 14.6576 12.719 15.8457 11.5602 16.7297C10.8479 17.2687 10.0262 17.6421 9.09499 17.8498C8.51123 17.98 7.88445 18.0451 7.21466 18.0451Z',
      fill: 'currentColor'
    }), jsx("path", {
      d: 'M7.21466 18.0451C6.70232 18.0451 6.21497 18.0067 5.7526 17.9299V20H9.09499V17.8498C8.51123 17.98 7.88445 18.0451 7.21466 18.0451Z',
      fill: 'currentColor'
    }), jsx("path", {
      d: 'M5.7526 2.24959C6.21497 2.17202 6.70232 2.13324 7.21466 2.13324C7.88445 2.13324 8.51123 2.19887 9.09499 2.33012V0H5.7526V2.24959Z',
      fill: 'currentColor'
    })]
  }), jsx("defs", {
    children: jsx("clipPath", {
      id: 'clip0_14_24',
      children: jsx("rect", {
        width: '14',
        height: '20',
        fill: 'white'
      })
    })
  })]
});
const WebIcon = ({
  color = '#4C7EFF',
  size = 16,
  className = '',
  onClick
}) => jsx("svg", {
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: jsx("path", {
    d: 'M8.00001 1.33334C6.68148 1.33334 5.39254 1.72434 4.29621 2.45688C3.19988 3.18942 2.3454 4.23061 1.84082 5.44879C1.33623 6.66694 1.20421 8.00741 1.46144 9.30061C1.71868 10.5938 2.35362 11.7817 3.28597 12.7141C4.21832 13.6464 5.4062 14.2813 6.69941 14.5386C7.99261 14.7958 9.33308 14.6638 10.5512 14.1592C11.7694 13.6546 12.8106 12.8001 13.5431 11.7038C14.2757 10.6075 14.6667 9.31854 14.6667 8.00001C14.6667 7.12454 14.4942 6.25762 14.1592 5.44879C13.8242 4.63995 13.3331 3.90502 12.7141 3.28596C12.095 2.66691 11.3601 2.17584 10.5512 1.84081C9.74241 1.50578 8.87548 1.33334 8.00001 1.33334ZM12.9973 5.33334H10.8857C10.699 4.36613 10.3231 3.44532 9.77948 2.62381C11.1587 3.08299 12.31 4.05243 12.9973 5.33334ZM13.6667 8.00001C13.6669 8.56501 13.5823 9.12681 13.4157 9.66668H11.0577C11.1297 9.11401 11.1661 8.55734 11.1667 8.00001C11.1661 7.44268 11.1297 6.88601 11.0577 6.33334H13.4157C13.5823 6.87321 13.6669 7.43501 13.6667 8.00001ZM8.00001 13.6667C7.18488 13.6667 6.47708 12.4514 6.11794 10.6667H9.88208C9.52294 12.4514 8.81514 13.6667 8.00001 13.6667ZM5.96081 9.66668C5.8353 8.55908 5.8353 7.44094 5.96081 6.33334H10.0392C10.1025 6.88661 10.1339 7.44308 10.1333 8.00001C10.1339 8.55694 10.1025 9.11341 10.0392 9.66668H5.96081ZM2.33334 8.00001C2.33313 7.43501 2.41772 6.87321 2.58428 6.33334H4.94234C4.79701 7.43968 4.79701 8.56034 4.94234 9.66668H2.58428C2.41772 9.12681 2.33313 8.56501 2.33334 8.00001ZM8.00001 2.33334C8.81514 2.33334 9.52294 3.54854 9.88208 5.33334H6.11794C6.47708 3.54854 7.18488 2.33334 8.00001 2.33334ZM6.22054 2.62381C5.67696 3.44532 5.30101 4.36613 5.11428 5.33334H3.00274C3.69004 4.05243 4.84132 3.08299 6.22054 2.62381ZM3.00274 10.6667H5.11428C5.301 11.6339 5.67695 12.5547 6.22054 13.3762C4.84134 12.917 3.69005 11.9475 3.00274 10.6667ZM9.77948 13.3762C10.3231 12.5547 10.699 11.6339 10.8857 10.6667H12.9973C12.3099 11.9475 11.1587 12.917 9.77948 13.3762Z',
    fill: 'currentColor'
  })
});
const ChainSmallIcon = ({
  color = '#0C1C33',
  size = 17,
  className = '',
  onClick
}) => jsx("svg", {
  width: size,
  height: size * 13 / 17,
  viewBox: '0 0 17 13',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: jsx("path", {
    d: 'M6.22948 11.2552C6.03745 11.4435 5.88884 11.5696 5.73696 11.6618C4.99352 12.1127 4.07756 12.1127 3.33413 11.6618C3.06016 11.4956 2.79682 11.2188 2.27013 10.6655C1.74343 10.1121 1.48008 9.83542 1.32192 9.54752C0.892693 8.76639 0.892693 7.80399 1.32192 7.02286C1.48008 6.73505 1.74343 6.45834 2.27013 5.90494L4.53554 3.52467C5.06224 2.97127 5.32558 2.69457 5.59953 2.52839C6.34298 2.0774 7.25895 2.0774 8.00238 2.52838C8.27631 2.69457 8.53966 2.97127 9.06636 3.52467C9.59306 4.07807 9.85641 4.35476 10.0146 4.64261C10.4438 5.42374 10.4438 6.38614 10.0146 7.16727C9.9269 7.32683 9.80691 7.48302 9.62758 7.68474M7.37244 5.31526C7.19311 5.51698 7.07313 5.67317 6.98542 5.83273C6.55623 6.61386 6.55623 7.57626 6.98542 8.35739C7.14361 8.64529 7.40696 8.92199 7.93366 9.47532C8.46036 10.0287 8.72372 10.3054 8.99764 10.4716C9.74108 10.9226 10.657 10.9226 11.4005 10.4716C11.6745 10.3054 11.9378 10.0287 12.4645 9.47532L14.7299 7.09506C15.2566 6.54166 15.52 6.26495 15.6781 5.97714C16.1073 5.19601 16.1073 4.2336 15.6781 3.45247C15.52 3.16463 15.2566 2.88792 14.7299 2.33452C14.2032 1.78113 13.9399 1.50443 13.6659 1.33824C12.9224 0.887253 12.0065 0.887253 11.2631 1.33824C11.1112 1.43038 10.9626 1.55647 10.7705 1.74484',
    stroke: 'currentColor',
    strokeLinecap: 'round'
  })
});
const SettingsIcon = ({
  color = '#0C1C33',
  size = 17,
  className = '',
  onClick
}) => jsx("svg", {
  width: size,
  height: size,
  viewBox: '0 0 17 17',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: jsx("path", {
    d: 'M8.5 3.08333C8.5 4.23392 7.56725 5.16667 6.41667 5.16667C5.26607 5.16667 4.33333 4.23392 4.33333 3.08333M8.5 3.08333C8.5 1.93274 7.56725 1 6.41667 1C5.26607 1 4.33333 1.93274 4.33333 3.08333M8.5 3.08333H16M4.33333 3.08333H1M14.3333 8.5C14.3333 9.65058 13.4006 10.5833 12.25 10.5833C11.0994 10.5833 10.1667 9.65058 10.1667 8.5M14.3333 8.5C14.3333 7.34942 13.4006 6.41667 12.25 6.41667C11.0994 6.41667 10.1667 7.34942 10.1667 8.5M14.3333 8.5H16M10.1667 8.5H1M6.83333 13.9167C6.83333 15.0672 5.90059 16 4.75 16C3.59941 16 2.66667 15.0672 2.66667 13.9167M6.83333 13.9167C6.83333 12.7661 5.90059 11.8333 4.75 11.8333C3.59941 11.8333 2.66667 12.7661 2.66667 13.9167M6.83333 13.9167H16M2.66667 13.9167H1',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  })
});
const ShieldSmallIcon = ({
  color = '#0C1C33',
  size = 15,
  className = '',
  onClick
}) => jsx("svg", {
  width: size,
  height: size * 17 / 15,
  viewBox: '0 0 15 17',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: jsx("path", {
    d: 'M4.875 8.51877L6.625 10.2023L10.125 6.83521M14.5 8.51877C14.5 12.274 9.7225 14.9952 8.06123 15.8279C7.88159 15.918 7.79172 15.963 7.66712 15.9864C7.57 16.0045 7.43 16.0045 7.33288 15.9864C7.20828 15.963 7.11841 15.918 6.93877 15.8279C5.27746 14.9952 0.5 12.274 0.5 8.51877V5.33482C0.5 4.66181 0.5 4.32531 0.614415 4.03605C0.715486 3.78051 0.879732 3.5525 1.09295 3.37173C1.33431 3.1671 1.66182 3.04895 2.31685 2.81264L7.00842 1.1201C7.19034 1.05448 7.28125 1.02166 7.37488 1.00865C7.45783 0.997117 7.54217 0.997117 7.62512 1.00865C7.71875 1.02166 7.80966 1.05448 7.99158 1.1201L12.6831 2.81264C13.3382 3.04895 13.6657 3.1671 13.907 3.37173C14.1202 3.5525 14.2845 3.78051 14.3855 4.03605C14.5 4.32531 14.5 4.66181 14.5 5.33482V8.51877Z',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  })
});
const QuestionMessageIcon = ({
  color = '#0C1C33',
  size = 17,
  className = '',
  onClick
}) => jsx("svg", {
  width: size,
  height: size,
  viewBox: '0 0 17 17',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: jsx("path", {
    d: 'M15.5 8.5C15.5 4.63401 12.366 1.5 8.5 1.5C4.63401 1.5 1.5 4.63401 1.5 8.5C1.5 9.61866 1.76197 10.6746 2.22754 11.6113C2.42563 12.0098 2.42445 12.5262 2.37402 12.9814C2.32099 13.4602 2.19994 13.9782 2.06641 14.4463C1.95449 14.8386 1.82896 15.2054 1.72363 15.5H8.5C12.366 15.5 15.5 12.366 15.5 8.5ZM8.47754 11.125C8.75368 11.125 8.97754 11.3489 8.97754 11.625C8.97754 11.9011 8.75368 12.125 8.47754 12.125H8.46973C8.19358 12.125 7.96973 11.9011 7.96973 11.625C7.96973 11.3489 8.19358 11.125 8.46973 11.125H8.47754ZM9.63574 7.04199C9.63574 6.39782 9.11386 5.87526 8.46973 5.875C7.92679 5.875 7.46839 6.24673 7.33887 6.75C7.26985 7.01714 6.99773 7.17813 6.73047 7.10938C6.46304 7.04055 6.30227 6.76743 6.37109 6.5C6.61172 5.5658 7.45964 4.875 8.46973 4.875C9.66615 4.87526 10.6357 5.84554 10.6357 7.04199C10.6356 7.69162 10.3249 8.12528 9.96191 8.47559C9.78884 8.64261 9.5883 8.80642 9.40137 8.96191C9.20811 9.12267 9.01442 9.28736 8.82324 9.47852C8.62798 9.67378 8.3105 9.67378 8.11523 9.47852C7.9203 9.28332 7.9203 8.96668 8.11523 8.77148C8.34062 8.5461 8.56445 8.35745 8.76172 8.19336C8.96533 8.024 9.12822 7.89036 9.26758 7.75586C9.52941 7.50314 9.63566 7.31249 9.63574 7.04199ZM16.5 8.5C16.5 12.9183 12.9183 16.5 8.5 16.5H1.00098C0.833871 16.5 0.677709 16.4163 0.584961 16.2773C0.492224 16.1383 0.474797 15.9619 0.539062 15.8076L0.540039 15.8066C0.540039 15.8066 0.540917 15.8034 0.541992 15.8008C0.544161 15.7955 0.54735 15.7872 0.551758 15.7764C0.560575 15.7547 0.574209 15.7217 0.59082 15.6797C0.624076 15.5955 0.671372 15.4732 0.726562 15.3232C0.837449 15.022 0.979061 14.6115 1.10449 14.1719C1.23071 13.7294 1.33653 13.2714 1.38086 12.8711C1.42778 12.4473 1.39393 12.1812 1.33203 12.0566C0.799214 10.9847 0.5 9.77661 0.5 8.5C0.5 4.08172 4.08172 0.5 8.5 0.5C12.9183 0.500003 16.5 4.08173 16.5 8.5Z',
    fill: 'currentColor'
  })
});
const CheckmarkIcon = ({
  color = '#1CC400',
  size = 27,
  className = '',
  onClick
}) => jsx("svg", {
  width: size,
  height: size * 21 / 27,
  viewBox: '0 0 27 21',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: jsx("path", {
    d: 'M25.235 0.341283C25.5909 -0.0640896 26.2219 -0.115686 26.6442 0.225963C27.0664 0.567654 27.1201 1.17343 26.7643 1.57886L10.0094 20.6667L0.253533 10.1585C-0.11396 9.76268 -0.0776687 9.15652 0.334587 8.8037C0.746855 8.45088 1.37822 8.48572 1.74572 8.88152L9.96642 17.7358L25.235 0.341283Z',
    fill: 'currentColor'
  })
});
const FingerprintIcon = ({
  color = '#4C7EFF',
  size = 16,
  className = '',
  onClick
}) => jsxs("svg", {
  width: size,
  height: size * 18 / 16,
  viewBox: '0 0 16 18',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: [jsx("g", {
    clipPath: 'url(#clip0_344_10)',
    children: jsx("path", {
      d: 'M7.49902 10.7754C7.49902 10.4994 7.72307 10.2756 7.99902 10.2754C8.27517 10.2754 8.49902 10.4992 8.49902 10.7754C8.49919 13.2206 10.3867 15.1621 12.666 15.1621C12.7316 15.1621 12.7771 15.1568 12.8877 15.1504C13.1632 15.1344 13.3998 15.3446 13.416 15.6201C13.432 15.8957 13.2219 16.1323 12.9463 16.1484C12.8892 16.1518 12.7698 16.1621 12.666 16.1621C9.7913 16.1621 7.49919 13.7288 7.49902 10.7754ZM9.83301 10.7754C9.83301 9.67981 8.99005 8.83105 7.99902 8.83105C7.00815 8.83115 6.16602 9.67988 6.16602 10.7754C6.16615 13.2329 7.40072 15.3789 9.24219 16.5811C9.47341 16.732 9.53863 17.0422 9.3877 17.2734C9.23675 17.5047 8.92654 17.5699 8.69531 17.4189C6.57168 16.0326 5.16615 13.5716 5.16602 10.7754C5.16602 9.17145 6.41301 7.83115 7.99902 7.83105C9.58521 7.83105 10.833 9.1714 10.833 10.7754C10.8332 11.8706 11.6753 12.7185 12.666 12.7188C13.6569 12.7188 14.4998 11.8708 14.5 10.7754C14.5 6.98027 11.5681 3.94339 8 3.94336C4.43197 3.94336 1.5 6.98025 1.5 10.7754C1.50003 11.642 1.59311 12.4863 1.76367 13.3008C1.82027 13.5711 1.64626 13.836 1.37598 13.8926C1.1058 13.949 0.840761 13.776 0.78418 13.5059C0.60006 12.6266 0.500029 11.7135 0.5 10.7754C0.5 6.47198 3.83668 2.94336 8 2.94336C12.1634 2.94339 15.5 6.47199 15.5 10.7754C15.4998 12.3792 14.252 13.7188 12.666 13.7188C11.0801 13.7185 9.83322 12.3791 9.83301 10.7754ZM12.1641 10.7754C12.1641 8.33008 10.2774 6.38782 7.99805 6.3877C5.71856 6.3877 3.83105 8.33001 3.83105 10.7754C3.83114 12.7587 4.42559 14.5927 5.43359 16.0986C5.5871 16.328 5.52599 16.6383 5.29688 16.792C5.06741 16.9456 4.75615 16.8847 4.60254 16.6553C3.48649 14.988 2.83114 12.9608 2.83105 10.7754C2.83105 7.82181 5.1232 5.3877 7.99805 5.3877C10.8728 5.38782 13.1641 7.82189 13.1641 10.7754C13.1638 11.0513 12.9401 11.2754 12.6641 11.2754C12.3881 11.2753 12.1643 11.0513 12.1641 10.7754ZM7.99902 0.5C10.7552 0.500054 13.2178 1.77254 14.8965 3.76855C15.0742 3.9799 15.0473 4.2959 14.8359 4.47363C14.6246 4.65118 14.3095 4.62331 14.1318 4.41211C12.6279 2.62378 10.4372 1.50005 7.99902 1.5C5.5607 1.5 3.37008 2.62381 1.86621 4.41211C1.6886 4.62332 1.37345 4.65099 1.16211 4.47363C0.950784 4.29592 0.922919 3.9799 1.10059 3.76855C2.77924 1.77236 5.24256 0.5 7.99902 0.5Z',
      fill: 'currentColor'
    })
  }), jsx("defs", {
    children: jsx("clipPath", {
      id: 'clip0_344_10',
      children: jsx("rect", {
        width: '15',
        height: '17.0003',
        fill: 'white',
        transform: 'translate(0.5 0.5)'
      })
    })
  })]
});
const FaceIcon = ({
  color = '#4C7EFF',
  size = 16,
  className = '',
  onClick
}) => jsxs("svg", {
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: [jsx("g", {
    clipPath: 'url(#clip0_344_11)',
    children: jsx("path", {
      d: 'M0.5 13.4443V11.8887C0.500117 11.6126 0.72393 11.3887 1 11.3887C1.27607 11.3887 1.49988 11.6126 1.5 11.8887V13.4443C1.5 14.0273 1.97269 14.5 2.55566 14.5H4.11133C4.38737 14.5001 4.61133 14.7239 4.61133 15C4.61133 15.2761 4.38737 15.4999 4.11133 15.5H2.55566C1.42042 15.5 0.5 14.5796 0.5 13.4443ZM14.5 13.4443V11.8887C14.5001 11.6126 14.7239 11.3887 15 11.3887C15.2761 11.3887 15.4999 11.6126 15.5 11.8887V13.4443C15.5 14.5796 14.5796 15.5 13.4443 15.5H11.8887C11.6126 15.4999 11.3887 15.2761 11.3887 15C11.3887 14.7239 11.6126 14.5001 11.8887 14.5H13.4443C14.0273 14.5 14.5 14.0273 14.5 13.4443ZM12.167 8C12.167 5.69881 10.3012 3.83301 8 3.83301C5.69881 3.83301 3.83301 5.69881 3.83301 8C3.83301 10.3012 5.69881 12.167 8 12.167C10.3012 12.167 12.167 10.3012 12.167 8ZM9.53516 8.55859C9.70911 8.40443 9.97277 8.3884 10.166 8.5332C10.3869 8.69889 10.4323 9.01248 10.2666 9.2334L9.86621 8.93262C10.2294 9.205 10.2636 9.23094 10.2666 9.2334L10.2637 9.23633C10.2627 9.23759 10.262 9.23953 10.2607 9.24121C10.2581 9.24469 10.2541 9.24874 10.25 9.25391C10.2418 9.2643 10.2307 9.2784 10.2168 9.29492C10.189 9.32801 10.1497 9.37253 10.0996 9.4248C9.99965 9.52911 9.85378 9.66639 9.66504 9.80371C9.28904 10.0772 8.72095 10.3661 8 10.3662C7.2789 10.3662 6.71101 10.0772 6.33496 9.80371C6.14601 9.66628 5.99945 9.52919 5.89941 9.4248C5.8493 9.3725 5.80999 9.328 5.78223 9.29492C5.76831 9.27835 5.75726 9.26431 5.74902 9.25391C5.74508 9.24892 5.74189 9.24462 5.73926 9.24121C5.73791 9.23947 5.73634 9.23762 5.73535 9.23633L5.73438 9.23438L5.7334 9.2334C5.56773 9.01251 5.61215 8.6989 5.83301 8.5332C6.05389 8.36754 6.3675 8.41199 6.5332 8.63281C6.53579 8.63608 6.54133 8.64243 6.54883 8.65137C6.56387 8.66929 6.58845 8.69831 6.62207 8.7334C6.6897 8.80392 6.79138 8.89948 6.92285 8.99512C7.18846 9.18829 7.55443 9.36621 8 9.36621C8.44541 9.36613 8.81062 9.18823 9.07617 8.99512C9.20793 8.89929 9.31027 8.80399 9.37793 8.7334C9.41155 8.69831 9.43613 8.66929 9.45117 8.65137C9.45853 8.64259 9.46326 8.63604 9.46582 8.63281L9.4668 8.63184L9.53516 8.55859ZM6.6748 5.87012C7.04474 5.90742 7.33383 6.21987 7.33398 6.59961C7.33398 7.00454 7.00548 7.33286 6.60059 7.33301C6.22088 7.33301 5.90862 7.04465 5.87109 6.6748L5.86719 6.59961L5.87109 6.52539C5.90846 6.15538 6.22076 5.86621 6.60059 5.86621L6.6748 5.87012ZM9.47461 5.87012C9.84447 5.90747 10.1336 6.21994 10.1338 6.59961C10.1338 7.0045 9.80523 7.3328 9.40039 7.33301C9.02064 7.33301 8.70839 7.04466 8.6709 6.6748L8.66699 6.59961L8.6709 6.52539C8.7083 6.15544 9.02057 5.86621 9.40039 5.86621L9.47461 5.87012ZM0.5 4.11133V2.55566C0.5 1.42041 1.42041 0.5 2.55566 0.5H4.11133C4.38737 0.500117 4.61133 0.72393 4.61133 1C4.61133 1.27607 4.38737 1.49988 4.11133 1.5H2.55566C1.9727 1.5 1.5 1.9727 1.5 2.55566V4.11133C1.49988 4.38737 1.27607 4.61133 1 4.61133C0.72393 4.61133 0.500117 4.38737 0.5 4.11133ZM14.5 4.11133V2.55566C14.5 1.97269 14.0273 1.5 13.4443 1.5H11.8887C11.6126 1.49988 11.3887 1.27607 11.3887 1C11.3887 0.72393 11.6126 0.500117 11.8887 0.5H13.4443C14.5796 0.5 15.5 1.42042 15.5 2.55566V4.11133C15.4999 4.38737 15.2761 4.61133 15 4.61133C14.7239 4.61133 14.5001 4.38737 14.5 4.11133ZM13.167 8C13.167 10.8535 10.8535 13.167 8 13.167C5.14653 13.167 2.83301 10.8535 2.83301 8C2.83301 5.14653 5.14653 2.83301 8 2.83301C10.8535 2.83301 13.167 5.14653 13.167 8Z',
      fill: 'currentColor'
    })
  }), jsx("defs", {
    children: jsx("clipPath", {
      id: 'clip0_344_11',
      children: jsx("rect", {
        width: '15',
        height: '15',
        fill: 'white',
        transform: 'translate(0.5 0.5)'
      })
    })
  })]
});
const SignIcon = ({
  color = '#4C7EFF',
  size = 18,
  className = '',
  onClick
}) => jsxs("svg", {
  width: size,
  height: size * 13 / 18,
  viewBox: '0 0 18 13',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: [jsx("g", {
    clipPath: 'url(#clip0_404_64)',
    children: jsx("path", {
      d: 'M6.53027 0.0273435C7.08771 -0.064076 7.65575 0.0700326 8.16992 0.458984C8.67255 0.839261 9.10671 1.44872 9.46094 2.28906C9.70475 2.86745 9.86928 3.44788 9.96484 4.02344L12.3721 3.07227C12.5375 3.00706 12.7255 3.03455 12.8652 3.14453C13.005 3.25462 13.0755 3.43124 13.0508 3.60742L12.6865 6.20117H14.333C14.6092 6.20117 14.833 6.42503 14.833 6.70117C14.8328 6.97717 14.609 7.20117 14.333 7.20117H12.1113C11.9666 7.20117 11.8284 7.13851 11.7334 7.0293C11.6384 6.92006 11.5961 6.7742 11.6162 6.63086L11.9404 4.31836L10.0635 5.06055C10.1447 8.55694 7.72656 11.6369 4.75879 12.957C4.60413 13.0258 4.42514 13.0112 4.2832 12.9189C4.14133 12.8267 4.05566 12.6692 4.05566 12.5V8.7373C4.05566 8.04264 4.04844 7.56746 4.20117 7.14844C4.32988 6.79566 4.53978 6.47777 4.81445 6.22461C5.14264 5.92224 5.58129 5.75801 6.2041 5.51172L9.00977 4.40137C8.93516 3.83402 8.78323 3.25698 8.53906 2.67773C8.22671 1.93672 7.88311 1.49648 7.56641 1.25684C7.26128 1.02602 6.96815 0.96947 6.69238 1.01465C6.09985 1.11187 5.42697 1.72075 5.01465 2.68066C4.9056 2.93422 4.61204 3.05129 4.3584 2.94238C4.1048 2.83345 3.98699 2.53977 4.0957 2.28613C4.57227 1.17664 5.45614 0.203579 6.53027 0.0273435ZM1.88867 9.69238C2.16481 9.69238 2.38867 9.91624 2.38867 10.1924C2.38863 10.4685 2.16479 10.6924 1.88867 10.6924H1C0.723883 10.6924 0.500041 10.4685 0.5 10.1924C0.5 9.91624 0.723858 9.69238 1 9.69238H1.88867ZM17 9.69238C17.2761 9.69238 17.5 9.91624 17.5 10.1924C17.5 10.4685 17.2761 10.6924 17 10.6924H11.667C11.3909 10.6924 11.167 10.4685 11.167 10.1924C11.167 9.91624 11.3908 9.69238 11.667 9.69238H17ZM5.05566 11.6855C7.28061 10.4175 8.96508 8.05948 9.05957 5.45703L6.57129 6.44141C5.8732 6.71747 5.65071 6.81396 5.49219 6.95996C5.33693 7.10307 5.21561 7.28491 5.14062 7.49023C5.06293 7.70324 5.05566 7.96355 5.05566 8.7373V11.6855Z',
      fill: 'currentColor'
    })
  }), jsx("defs", {
    children: jsx("clipPath", {
      id: 'clip0_404_64',
      children: jsx("rect", {
        width: '17',
        height: '13.0002',
        fill: 'white',
        transform: 'translate(0.5 -0.000210285)'
      })
    })
  })]
});
const SignLockIcon = ({
  color = '#E93636',
  size = 18,
  className = '',
  onClick
}) => jsxs("svg", {
  width: size,
  height: size * 14 / 18,
  viewBox: '0 0 18 14',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: [jsx("g", {
    clipPath: 'url(#clip0_404_76)',
    children: jsx("path", {
      d: 'M16.4932 11.5049C16.4897 11.4621 16.4855 11.4414 16.4834 11.4336C16.4586 11.3831 16.3971 11.3181 16.2861 11.2793C16.2232 11.2574 16.1232 11.25 15.667 11.25H13C12.5431 11.25 12.4428 11.2573 12.3799 11.2793C12.2693 11.3181 12.2084 11.3832 12.1836 11.4336C12.1815 11.4413 12.1773 11.462 12.1738 11.5049C12.1674 11.5847 12.167 11.6922 12.167 11.875C12.167 12.0578 12.1674 12.1653 12.1738 12.2451C12.1773 12.288 12.1815 12.3087 12.1836 12.3164C12.2084 12.3668 12.2693 12.4319 12.3799 12.4707C12.4428 12.4927 12.5431 12.5 13 12.5H15.667C16.1232 12.5 16.2232 12.4926 16.2861 12.4707C16.3971 12.4319 16.4586 12.3669 16.4834 12.3164C16.4855 12.3086 16.4897 12.2879 16.4932 12.2451C16.4996 12.1653 16.5 12.0578 16.5 11.875C16.5 11.6922 16.4996 11.5847 16.4932 11.5049ZM2.98437 0.523437C4.10616 0.362393 5.1695 1.01348 5.89453 2.51855C6.1364 3.02066 6.30201 3.52585 6.40039 4.02832L8.83691 3.18555C9.00301 3.1282 9.18671 3.16239 9.32129 3.27539C9.45592 3.38847 9.52202 3.56371 9.49414 3.7373L9.1416 5.92578H10.7773C11.0535 5.92578 11.2773 6.14964 11.2773 6.42578C11.2773 6.7019 11.0535 6.92578 10.7773 6.92578H8.55566C8.40921 6.92578 8.2698 6.86147 8.1748 6.75C8.07994 6.63862 8.03841 6.49114 8.06152 6.34668L8.37305 4.40332L6.50781 5.04883C6.55819 8.15173 4.10509 10.8278 1.18164 11.9658C1.02786 12.0257 0.854016 12.0062 0.717773 11.9131C0.581503 11.8199 0.5 11.6651 0.5 11.5V8.03516C0.499995 7.49897 0.489733 7.08066 0.652343 6.70996C0.786092 6.40516 0.999951 6.1403 1.26758 5.93262C1.58317 5.68773 2.00072 5.55065 2.60156 5.34277L5.44434 4.3584C5.36773 3.89678 5.22244 3.42607 4.99414 2.95215C4.38598 1.68972 3.6718 1.43557 3.12695 1.51367C2.50982 1.60227 1.84792 2.14387 1.44922 2.95605C1.32748 3.20381 1.02712 3.30623 0.779297 3.18457C0.531506 3.06284 0.429116 2.76249 0.550781 2.51465C1.04096 1.51619 1.93493 0.67416 2.98437 0.523437ZM9.44434 8.75C9.72048 8.75 9.94434 8.97386 9.94434 9.25C9.94434 9.52614 9.72048 9.75 9.44434 9.75H7.66699C7.39085 9.75 7.16699 9.52614 7.16699 9.25C7.16699 8.97386 7.39085 8.75 7.66699 8.75H9.44434ZM15.6113 10C15.6113 9.52394 15.1217 9 14.333 9C13.5445 9.00014 13.0557 9.524 13.0557 10V10.25H15.6113V10ZM16.6113 10.333C16.613 10.3336 16.6146 10.3344 16.6162 10.335L16.7363 10.3828C17.0101 10.5066 17.2447 10.7151 17.3809 10.9922C17.4533 11.14 17.4793 11.289 17.4902 11.4248C17.5007 11.5541 17.5 11.7086 17.5 11.875C17.5 12.0414 17.5007 12.1959 17.4902 12.3252C17.4793 12.461 17.4533 12.609 17.3809 12.7568C17.2447 13.0339 17.0101 13.2434 16.7363 13.3672L16.6162 13.415C16.4183 13.4842 16.192 13.4977 15.9346 13.5H12.7324C12.475 13.4977 12.2487 13.4841 12.0508 13.415C11.7262 13.3016 11.4408 13.0747 11.2852 12.7578C11.2128 12.6101 11.1877 12.461 11.1768 12.3252C11.1663 12.1959 11.167 12.0414 11.167 11.875C11.167 11.7086 11.1663 11.5541 11.1768 11.4248C11.1877 11.289 11.2128 11.1409 11.2852 10.9932C11.4408 10.6763 11.7262 10.4484 12.0508 10.335C12.0524 10.3344 12.054 10.3336 12.0557 10.333V10C12.0557 8.81927 13.1581 8.00015 14.333 8C15.508 8 16.6113 8.81916 16.6113 10V10.333ZM1.5 10.7324C3.72796 9.63149 5.37826 7.6016 5.50098 5.39648L2.92871 6.28711C2.25442 6.5204 2.03397 6.60389 1.88086 6.72266C1.73431 6.83638 1.62998 6.97184 1.56836 7.1123C1.51002 7.24545 1.5 7.40909 1.5 8.03516V10.7324Z',
      fill: 'currentColor'
    })
  }), jsx("defs", {
    children: jsx("clipPath", {
      id: 'clip0_404_76',
      children: jsx("rect", {
        width: '17.0005',
        height: '13.0005',
        fill: 'white',
        transform: 'translate(0.499533 0.499527)'
      })
    })
  })]
});
const LockIcon = ({
  color = '#E93636',
  size = 8,
  className = '',
  onClick
}) => jsxs("svg", {
  width: size,
  height: size * 10 / 8,
  viewBox: '0 0 8 10',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: [jsx("g", {
    clipPath: 'url(#clip0_404_71)',
    children: jsx("path", {
      d: 'M6.5 6.24414C6.5 5.86411 6.50017 5.60437 6.48633 5.40332C6.47272 5.20598 6.44735 5.10448 6.41797 5.03613C6.34685 4.8709 6.23984 4.75273 6.12695 4.68457C6.09177 4.66338 6.02689 4.63665 5.83887 4.62305C5.68428 4.61185 5.48725 4.61133 5.2002 4.61133H2.7998C2.51275 4.61133 2.31573 4.61185 2.16113 4.62305C1.97305 4.63665 1.9082 4.66339 1.87305 4.68457C1.76015 4.75274 1.65315 4.87091 1.58203 5.03613C1.55265 5.10448 1.52728 5.20597 1.51367 5.40332C1.49983 5.60437 1.5 5.86412 1.5 6.24414V6.86621C1.5 7.24654 1.49981 7.50688 1.51367 7.70801C1.52726 7.90512 1.5527 8.00587 1.58203 8.07422C1.65315 8.23965 1.76006 8.35853 1.87305 8.42676C1.90443 8.44566 1.96075 8.46998 2.10938 8.48438C2.26726 8.49966 2.4752 8.5 2.7998 8.5H5.2002C5.52481 8.5 5.73274 8.49966 5.89062 8.48438C6.03919 8.46999 6.09553 8.44567 6.12695 8.42676C6.23993 8.35854 6.34685 8.23966 6.41797 8.07422C6.44731 8.00587 6.47274 7.90512 6.48633 7.70801C6.50019 7.50688 6.5 7.24654 6.5 6.86621V6.24414ZM3.5 7V6.11133C3.5 5.83519 3.72386 5.61133 4 5.61133C4.27614 5.61133 4.5 5.83519 4.5 6.11133V7C4.5 7.27614 4.27614 7.5 4 7.5C3.72386 7.5 3.5 7.27614 3.5 7ZM5.375 3.22266C5.375 2.18852 4.68314 1.5 4 1.5C3.31686 1.5 2.625 2.18852 2.625 3.22266V3.61133H5.375V3.22266ZM6.375 3.70996C6.46629 3.73936 6.5572 3.7754 6.64453 3.82812C6.95488 4.01555 7.19235 4.3053 7.33691 4.6416C7.4301 4.85839 7.46634 5.08681 7.4834 5.33398C7.50018 5.57745 7.5 5.87787 7.5 6.24414V6.86621C7.5 7.23241 7.50016 7.53291 7.4834 7.77637C7.46635 8.02369 7.43016 8.25283 7.33691 8.46973C7.19239 8.80584 6.95466 9.09482 6.64453 9.28223C6.43528 9.40858 6.21339 9.45758 5.9873 9.47949C5.77009 9.50053 5.50539 9.5 5.2002 9.5H2.7998C2.49462 9.5 2.22991 9.50053 2.0127 9.47949C1.78662 9.45758 1.56472 9.4086 1.35547 9.28223C1.04535 9.09483 0.807617 8.80585 0.663086 8.46973C0.569851 8.25283 0.533651 8.02369 0.516602 7.77637C0.499842 7.53291 0.5 7.23241 0.5 6.86621V6.24414C0.5 5.87787 0.499818 5.57745 0.516602 5.33398C0.533661 5.08681 0.569902 4.85839 0.663086 4.6416C0.807663 4.3053 1.04514 4.01555 1.35547 3.82812C1.4428 3.77539 1.53371 3.73936 1.625 3.70996V3.22266C1.625 1.8022 2.61208 0.5 4 0.5C5.38791 0.5 6.375 1.8022 6.375 3.22266V3.70996Z',
      fill: 'currentColor'
    })
  }), jsx("defs", {
    children: jsx("clipPath", {
      id: 'clip0_404_71',
      children: jsx("rect", {
        width: '7',
        height: '9',
        fill: 'white',
        transform: 'translate(0.5 0.5)'
      })
    })
  })]
});
const PendingIcon = ({
  color = '#F49A58',
  size = 11,
  className = '',
  onClick
}) => jsxs("svg", {
  width: size,
  height: size,
  viewBox: '0 0 11 11',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  onClick: onClick,
  color: color,
  children: [jsx("g", {
    clipPath: 'url(#clip0_405_81)',
    children: jsx("path", {
      d: 'M7.74672 8.71921C7.90214 8.93112 8.20171 8.97852 8.3979 8.80367C9.20215 8.08688 9.7568 7.12601 9.97194 6.06176C10.2186 4.84138 10.0011 3.57287 9.362 2.50438C8.72286 1.43588 7.70807 0.644286 6.51614 0.284445C5.32422 -0.0753959 4.04092 0.0224086 2.91729 0.558725C1.79366 1.09504 0.910553 2.03128 0.440724 3.18429C-0.0291052 4.33731 -0.051851 5.62413 0.376936 6.79302C0.805723 7.96192 1.65519 8.92878 2.75916 9.50447C3.72191 10.0065 4.81779 10.1796 5.88088 10.0051C6.1402 9.96249 6.29175 9.69977 6.22474 9.44566C6.15772 9.19155 5.89743 9.04286 5.63721 9.07962C4.80466 9.19721 3.9517 9.05305 3.1992 8.66064C2.30536 8.19452 1.61757 7.41168 1.2704 6.46527C0.923226 5.51886 0.941642 4.47697 1.32205 3.54342C1.70245 2.60986 2.41747 1.85182 3.32723 1.41759C4.23699 0.983351 5.27603 0.904162 6.24109 1.19551C7.20615 1.48686 8.02779 2.12779 8.54528 2.99291C9.06277 3.85803 9.23887 4.8851 9.03913 5.87319C8.87097 6.70504 8.44663 7.45887 7.83162 8.03221C7.63939 8.21141 7.59129 8.50729 7.74672 8.71921Z',
      fill: 'currentColor'
    })
  }), jsx("defs", {
    children: jsx("clipPath", {
      id: 'clip0_405_81',
      children: jsx("rect", {
        width: '10',
        height: '10',
        fill: 'white',
        transform: 'translate(0.0710678 0.071064)'
      })
    })
  })]
});

const accordionRootStyles = cva(`
    w-full
    rounded-[1rem]
    overflow-hidden
  `, {
  variants: {
    theme: {
      light: 'bg-dash-primary-dark-blue/[0.05]',
      dark: 'bg-gray-800/20'
    },
    border: {
      true: 'ring-1 ring-dash-primary-dark-blue/10',
      false: ''
    }
  },
  defaultVariants: {
    theme: 'light',
    border: false
  }
});
const accordionItemStyles = cva(`
    border-none
    outline-none
  `);
const accordionTriggerStyles = cva(`
    w-full
    p-[0.875rem]
    flex
    items-center
    justify-between
    font-dash-main
    font-medium
    text-[0.875rem]
    leading-[1.366]
    text-dash-primary-dark-blue
    bg-transparent
    border-none
    outline-none
    cursor-pointer
    transition-all
    duration-300
    ease-in-out
    hover:bg-dash-primary-dark-blue/[0.01]
  `, {
  variants: {
    theme: {
      light: 'text-dash-primary-dark-blue hover:bg-dash-primary-dark-blue/[0.05]',
      dark: 'text-white hover:bg-white/5'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const accordionContentStyles = cva(`
  overflow-hidden
  will-change-[height]
  data-[state=open]:h-[var(--radix-accordion-content-height)]
  data-[state=closed]:h-0
`);
const accordionContentInnerStyles = cva(`
  p-[0.875rem]
  space-y-[0.625rem]
`);
const separatorStyles = cva(`
  mx-[0.875rem]
  h-px
  bg-dash-primary-dark-blue/10
  transition-opacity
  duration-300
  ease-in-out
`, {
  variants: {
    theme: {
      light: 'bg-dash-primary-dark-blue/10',
      dark: 'bg-white/10'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const chevronStyles = cva(`
  w-4
  h-4
  transition-transform
  duration-300
  ease-in-out
  transform
  group-data-[state=open]:rotate-180
`);
/**
 * Accordion component based on Radix UI with smooth animations.
 * Displays custom content in an expandable format.
 */
const Accordion = ({
  title,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
  className = '',
  rightElement,
  showSeparator = false,
  border = false
}) => {
  const {
    theme
  } = useTheme();
  const isControlled = open !== undefined;
  const rootClasses = accordionRootStyles({
    theme,
    border
  }) + (className ? ` ${className}` : '');
  return jsx(Root2$5, {
    type: 'single',
    collapsible: true,
    className: rootClasses,
    value: isControlled ? open ? 'item-1' : undefined : undefined,
    defaultValue: defaultOpen ? 'item-1' : undefined,
    onValueChange: value => {
      if (onOpenChange) {
        onOpenChange(value === 'item-1');
      }
    },
    children: jsxs(Item$2, {
      value: 'item-1',
      className: `AccordionItem ${accordionItemStyles()} group`,
      children: [jsxs(Trigger2, {
        className: `${accordionTriggerStyles({
          theme
        })}`,
        children: [jsx("div", {
          className: 'w-full text-left',
          children: title
        }), jsxs("div", {
          className: 'flex items-center gap-3',
          children: [rightElement && jsx("div", {
            children: rightElement
          }), jsx(ChevronIcon, {
            className: chevronStyles()
          })]
        })]
      }), showSeparator && jsx("div", {
        className: `${separatorStyles({
          theme
        })} group-data-[state=closed]:opacity-0 group-data-[state=open]:opacity-100`
      }), jsx(Content2$2, {
        forceMount: true,
        className: accordionContentStyles(),
        children: jsx("div", {
          className: accordionContentInnerStyles(),
          children: children
        })
      })]
    })
  });
};

const Badge = ({
  children,
  variant = 'default',
  color = 'blue',
  size = 'sm',
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium transition-colors';
  // Size classes
  const sizeClasses = {
    xxs: 'px-1 py-1 text-xs gap-2',
    sm: 'px-[2.125rem] py-[0.625rem] text-xs',
    xl: 'px-[2.25rem] py-4 text-lg'
  };
  // Color and variant combination classes
  const getVariantClasses = () => {
    const colorMap = {
      blue: {
        default: 'text-[#4C7EFF]',
        flat: 'bg-[rgba(76,126,255,0.15)] text-[#4C7EFF]',
        solid: 'bg-[#4C7EFF] text-white',
        bordered: 'outline outline-1 outline-[#4C7EFF] text-[#4C7EFF]'
      },
      white: {
        default: 'text-white',
        flat: 'bg-[rgba(255,255,255,0.15)] text-white',
        solid: 'bg-white text-[#0C1C33]',
        bordered: 'outline outline-1 outline-white text-white'
      },
      gray: {
        default: 'text-[#0C1C33]',
        flat: 'bg-[rgba(12,28,51,0.15)] text-[#0C1C33]',
        solid: 'bg-[#0C1C33] text-white',
        bordered: 'outline outline-1 outline-[#0C1C33] text-[#0C1C33]'
      },
      'light-gray': {
        default: 'text-[#6B7280]',
        flat: 'bg-[#0C1C33]/5 text-[#0C1C33]',
        solid: 'bg-[#0C1C33]/15 text-[#0C1C33]',
        bordered: 'outline outline-1 outline-[#6B7280] text-[#6B7280]'
      },
      turquoise: {
        default: 'text-[#60F6D2]',
        flat: 'bg-[rgba(96,246,210,0.15)] text-[#60F6D2]',
        solid: 'bg-[#60F6D2] text-[#0C1C33]',
        bordered: 'outline outline-1 outline-[#60F6D2] text-[#60F6D2]'
      },
      red: {
        default: 'text-[#CD2E00]',
        flat: 'bg-[rgba(205,46,0,0.15)] text-[#CD2E00]',
        solid: 'bg-[#CD2E00] text-white',
        bordered: 'outline outline-1 outline-[#CD2E00] text-[#CD2E00]'
      },
      orange: {
        default: 'text-[#F98F12]',
        flat: 'bg-[rgba(249,143,18,0.15)] text-[#F98F12]',
        solid: 'bg-[#F98F12] text-white',
        bordered: 'outline outline-1 outline-[#F98F12] text-[#F98F12]'
      }
    };
    return colorMap[color][variant];
  };
  const classes = [baseClasses, sizeClasses[size], getVariantClasses(), className].filter(Boolean).join(' ');
  return jsx("span", {
    className: classes,
    children: children
  });
};

const styles = cva(`
    dash-btn-base
    select-none
    min-h-11
    flex
    items-center
    capitalize
    transition-colors
    hover:cursor-pointer
    justify-center
    font-dash-main
  `, {
  variants: {
    theme: {
      light: '',
      dark: ''
    },
    variant: {
      solid: '',
      outline: 'dash-btn-outline border !bg-transparent'
    },
    colorScheme: {
      brand: '',
      mint: '',
      gray: '',
      red: '',
      lightBlue: '',
      lightGray: ''
    },
    state: {
      active: 'active:-translate-y-[-1px]',
      disabled: 'hover:!cursor-not-allowed'
    },
    size: {
      sm: 'dash-block-sm',
      md: 'dash-block-md',
      xl: 'dash-block-xl'
    }
  },
  compoundVariants: [
  // solid variant color schemes - light theme
  {
    variant: 'solid',
    colorScheme: 'brand',
    theme: 'light',
    class: '!bg-dash-brand text-white hover:!bg-dash-brand/80'
  }, {
    variant: 'solid',
    colorScheme: 'mint',
    theme: 'light',
    class: '!bg-dash-mint !text-black hover:!bg-dash-mint/80'
  }, {
    variant: 'solid',
    colorScheme: 'gray',
    theme: 'light',
    class: '!bg-gray-200 !text-gray-700 hover:!bg-gray-300'
  }, {
    variant: 'solid',
    colorScheme: 'red',
    theme: 'light',
    class: '!bg-red-200 !text-red-700 hover:!bg-red-300'
  }, {
    variant: 'solid',
    colorScheme: 'lightBlue',
    theme: 'light',
    class: '!bg-dash-brand/10 !text-dash-brand hover:!bg-dash-brand/20'
  }, {
    variant: 'solid',
    colorScheme: 'lightGray',
    theme: 'light',
    class: '!bg-[rgba(12,28,51,0.03)] !text-[#0C1C33] hover:!bg-[rgba(12,28,51,0.06)]'
  },
  // solid variant color schemes - dark theme
  {
    variant: 'solid',
    colorScheme: 'brand',
    theme: 'dark',
    class: '!bg-dash-brand !text-white hover:!bg-dash-brand/80'
  }, {
    variant: 'solid',
    colorScheme: 'mint',
    theme: 'dark',
    class: '!bg-dash-mint !text-black hover:!bg-dash-mint/80'
  }, {
    variant: 'solid',
    colorScheme: 'gray',
    theme: 'dark',
    class: '!bg-gray-600 !text-gray-100 hover:!bg-gray-500'
  }, {
    variant: 'solid',
    colorScheme: 'red',
    theme: 'dark',
    class: '!bg-red-600 !text-red-100 hover:!bg-red-500'
  }, {
    variant: 'solid',
    colorScheme: 'lightBlue',
    theme: 'dark',
    class: '!bg-dash-brand/20 !text-dash-brand hover:!bg-dash-brand/30'
  }, {
    variant: 'solid',
    colorScheme: 'lightGray',
    theme: 'dark',
    class: '!bg-gray-700/20 !text-gray-300 hover:!bg-gray-600/30'
  },
  // outline variant - light theme
  {
    variant: 'outline',
    state: 'disabled',
    theme: 'light',
    class: 'opacity-40'
  }, {
    variant: 'outline',
    state: 'disabled',
    theme: 'dark',
    class: 'opacity-50'
  }, {
    variant: 'outline',
    colorScheme: 'brand',
    theme: 'light',
    class: '!text-dash-brand !border-dash-brand hover:!bg-dash-brand/10'
  }, {
    variant: 'outline',
    colorScheme: 'brand',
    theme: 'dark',
    class: '!text-dash-brand !border-dash-brand hover:!bg-dash-brand/20'
  }, {
    variant: 'outline',
    colorScheme: 'mint',
    theme: 'light',
    class: '!text-dash-mint !border-dash-mint hover:!bg-dash-mint/10'
  }, {
    variant: 'outline',
    colorScheme: 'mint',
    theme: 'dark',
    class: '!text-dash-mint !border-dash-mint hover:!bg-dash-mint/20'
  }, {
    variant: 'outline',
    colorScheme: 'gray',
    theme: 'light',
    class: '!text-gray-700 !border-gray-700 hover:!bg-gray-200/50'
  }, {
    variant: 'outline',
    colorScheme: 'gray',
    theme: 'dark',
    class: '!text-gray-300 !border-gray-300 hover:!bg-gray-600/20'
  }, {
    variant: 'outline',
    colorScheme: 'red',
    theme: 'light',
    class: '!text-red-700 hover:!bg-red-300/20'
  }, {
    variant: 'outline',
    colorScheme: 'red',
    theme: 'dark',
    class: '!text-red-400 hover:!bg-red-500/20'
  }, {
    variant: 'outline',
    colorScheme: 'lightBlue',
    theme: 'light',
    class: '!text-dash-brand/60 !border-dash-brand/60 hover:!bg-dash-brand/5'
  }, {
    variant: 'outline',
    colorScheme: 'lightBlue',
    theme: 'dark',
    class: '!text-dash-brand/80 !border-dash-brand/80 hover:!bg-dash-brand/10'
  }, {
    variant: 'outline',
    colorScheme: 'lightGray',
    theme: 'light',
    class: '!text-[#0C1C33] !border-[#0C1C33]/20 hover:!bg-[rgba(12,28,51,0.03)]'
  }, {
    variant: 'outline',
    colorScheme: 'lightGray',
    theme: 'dark',
    class: '!text-gray-300 !border-gray-600/50 hover:!bg-gray-700/10'
  },
  // solid variant - light theme
  {
    variant: 'solid',
    colorScheme: 'brand',
    state: 'disabled',
    theme: 'light',
    class: '!bg-dash-brand/10 !text-dash-brand-dim'
  }, {
    variant: 'solid',
    colorScheme: 'brand',
    state: 'disabled',
    theme: 'dark',
    class: '!bg-dash-brand/20 !text-dash-brand/60'
  }, {
    variant: 'solid',
    colorScheme: 'mint',
    state: 'disabled',
    theme: 'light',
    class: '!bg-dash-mint/30 !text-black/60'
  }, {
    variant: 'solid',
    colorScheme: 'mint',
    state: 'disabled',
    theme: 'dark',
    class: '!bg-dash-mint/20 !text-gray-400'
  }, {
    variant: 'solid',
    colorScheme: 'red',
    state: 'disabled',
    theme: 'light',
    class: '!bg-red-300/30 !text-black/60'
  }, {
    variant: 'solid',
    colorScheme: 'red',
    state: 'disabled',
    theme: 'dark',
    class: '!bg-red-500/20 !text-gray-400'
  }, {
    variant: 'solid',
    colorScheme: 'lightBlue',
    state: 'disabled',
    theme: 'light',
    class: '!bg-dash-brand/5 !text-dash-brand/40'
  }, {
    variant: 'solid',
    colorScheme: 'lightBlue',
    state: 'disabled',
    theme: 'dark',
    class: '!bg-dash-brand/10 !text-dash-brand/50'
  }, {
    variant: 'solid',
    colorScheme: 'lightGray',
    state: 'disabled',
    theme: 'light',
    class: '!bg-[#0C1C33]/5 !text-[#0C1C33]/40'
  }, {
    variant: 'solid',
    colorScheme: 'lightGray',
    state: 'disabled',
    theme: 'dark',
    class: '!bg-gray-700/20 !text-gray-500'
  }],
  defaultVariants: {
    theme: 'light',
    variant: 'solid',
    colorScheme: 'brand',
    state: 'active',
    size: 'md'
  }
});
/**
 * Button with solid or outline style, color schemes, disabled state,
 * press animation, and customizable size. Supports light/dark theme.
 */
const Button = _a => {
  var {
      children,
      variant,
      colorScheme,
      size,
      disabled = false,
      className = ''
    } = _a,
    props = __rest(_a, ["children", "variant", "colorScheme", "size", "disabled", "className"]);
  const {
    theme
  } = useTheme();
  const state = disabled ? 'disabled' : 'active';
  const classes = styles({
    theme,
    variant,
    colorScheme,
    size,
    state
  }) + (className !== '' ? ` ${className}` : '');
  return jsx("button", Object.assign({
    className: classes,
    disabled: disabled
  }, props, {
    children: children
  }));
};

const input = cva('w-full transition-all font-inter placeholder:text-opacity-60 text-[0.875rem] leading-[1.0625rem]', {
  variants: {
    theme: {
      light: 'text-[#111111] placeholder:text-[rgba(17,17,17,0.6)]',
      dark: 'text-white placeholder:text-gray-400'
    },
    colorScheme: {
      default: 'focus:ring-blue-500/20',
      brand: 'focus:ring-dash-brand/20',
      error: 'focus:ring-red-500/20',
      success: 'focus:ring-green-500/20',
      'light-gray': 'focus:ring-[#6B7280]/20'
    },
    size: {
      sm: 'dash-block-sm font-light',
      md: 'dash-block-md font-light',
      xl: 'dash-block-xl font-light'
    },
    variant: {
      outlined: 'outline outline-1 outline-offset-[-1px]',
      filled: 'border-none'
    },
    disabled: {
      false: '',
      true: 'opacity-60 cursor-not-allowed'
    }
  },
  compoundVariants: [
  // Outlined variant colors
  {
    variant: 'outlined',
    colorScheme: 'default',
    class: 'outline-[rgba(17,17,17,0.32)] focus:outline-[rgba(17,17,17,0.6)]'
  }, {
    variant: 'outlined',
    colorScheme: 'brand',
    class: 'outline-dash-brand/30 focus:outline-dash-brand'
  }, {
    variant: 'outlined',
    colorScheme: 'error',
    class: 'outline-red-500 focus:outline-red-500'
  }, {
    variant: 'outlined',
    colorScheme: 'success',
    class: 'outline-green-500 focus:outline-green-500'
  }, {
    variant: 'outlined',
    colorScheme: 'light-gray',
    class: 'outline-[#6B7280]/50 focus:outline-[#6B7280]'
  },
  // Outlined variant with focus ring
  {
    variant: 'outlined',
    class: 'focus:ring-2'
  },
  // Outlined variant background
  {
    variant: 'outlined',
    theme: 'light',
    class: 'bg-white'
  }, {
    variant: 'outlined',
    theme: 'dark',
    class: 'bg-gray-800'
  },
  // Filled variant colors
  {
    variant: 'filled',
    colorScheme: 'default',
    class: 'bg-[rgba(76,126,255,0.15)] focus:bg-[rgba(76,126,255,0.2)]'
  }, {
    variant: 'filled',
    colorScheme: 'brand',
    class: 'bg-dash-brand/15 focus:bg-dash-brand/20'
  }, {
    variant: 'filled',
    colorScheme: 'error',
    class: 'bg-red-500/15 focus:bg-red-500/20'
  }, {
    variant: 'filled',
    colorScheme: 'success',
    class: 'bg-green-500/15 focus:bg-green-500/20'
  }, {
    variant: 'filled',
    colorScheme: 'light-gray',
    class: 'bg-[#0C1C33]/5 focus:bg-[#0C1C33]/10'
  },
  // Filled variant with focus ring
  {
    variant: 'filled',
    class: 'focus:ring-2'
  }],
  defaultVariants: {
    theme: 'light',
    colorScheme: 'default',
    size: 'xl',
    variant: 'outlined',
    disabled: false
  }
});
/**
 * A versatile input component that adapts to light/dark theme,
 * supports various color schemes, sizes, variants, and states.
 * For password inputs, includes a toggleable eye icon.
 * Supports prefix text or elements before input content.
 *
 * @example
 * <Input
 *   type='password'
 *   placeholder='Enter password'
 *   colorScheme='brand'
 *   size='xl'
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
      type,
      prefix,
      prefixClassName = '',
      showPasswordToggle = true
    } = _a,
    props = __rest(_a, ["className", "colorScheme", "size", "variant", "error", "success", "disabled", "type", "prefix", "prefixClassName", "showPasswordToggle"]);
  const {
    theme
  } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [prefixWidth, setPrefixWidth] = useState(0);
  const prefixRef = useRef(null);
  // Determine color scheme based on state
  let finalColorScheme = colorScheme;
  if (error) finalColorScheme = 'error';else if (success) finalColorScheme = 'success';
  const classes = input({
    theme,
    colorScheme: finalColorScheme,
    size,
    variant,
    disabled
  }) + ' ' + className;
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  const hasPrefix = Boolean(prefix);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // Measure actual prefix width
  useEffect(() => {
    if (prefixRef.current) {
      const width = prefixRef.current.offsetWidth;
      // Convert px to rem (assuming 16px base) and add base padding (1rem) + extra space (0.5rem)
      setPrefixWidth(width / 16 + 1.5);
    }
  }, [prefix]);
  // Render with prefix
  if (hasPrefix) {
    return jsxs("div", {
      className: 'relative',
      children: [jsx("div", {
        ref: prefixRef,
        className: `absolute left-4 top-1/2 -translate-y-1/2 z-10 text-[0.875rem] opacity-60 pointer-events-none select-none ${prefixClassName}`,
        children: prefix
      }), jsx("input", Object.assign({
        className: `${classes}${isPassword && showPasswordToggle ? ' pr-12' : ''}`,
        style: {
          paddingLeft: prefixWidth ? `${prefixWidth}rem` : '1rem'
        },
        disabled: disabled,
        type: inputType
      }, props)), isPassword && showPasswordToggle && jsx("button", {
        type: 'button',
        className: 'absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-70 transition-opacity cursor-pointer focus:outline-none',
        onClick: togglePasswordVisibility,
        tabIndex: -1,
        children: showPassword ? jsx(EyeClosedIcon, {
          size: 16,
          color: '#0C1C33'
        }) : jsx(EyeOpenIcon, {
          size: 16,
          color: '#0C1C33'
        })
      })]
    });
  }
  // Render password input without prefix
  if (isPassword) {
    return jsxs("div", {
      className: 'relative',
      children: [jsx("input", Object.assign({
        className: classes + (showPasswordToggle ? ' pr-12' : ''),
        disabled: disabled,
        type: inputType
      }, props)), showPasswordToggle && jsx("button", {
        type: 'button',
        className: 'absolute right-4 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-70 transition-opacity cursor-pointer focus:outline-none',
        onClick: togglePasswordVisibility,
        tabIndex: -1,
        children: showPassword ? jsx(EyeClosedIcon, {
          size: 16,
          color: '#0C1C33'
        }) : jsx(EyeOpenIcon, {
          size: 16,
          color: '#0C1C33'
        })
      })]
    });
  }
  // Regular input without prefix
  return jsx("input", Object.assign({
    className: classes,
    disabled: disabled,
    type: inputType
  }, props));
};

const textareaContainer = cva('relative flex items-baseline transition-all w-full', {
  variants: {
    theme: {
      light: 'bg-white',
      dark: 'bg-gray-800'
    },
    hasValue: {
      true: '',
      false: ''
    },
    colorScheme: {
      default: 'focus-within:ring-blue-500/20',
      brand: 'focus-within:ring-dash-brand/20',
      error: 'focus-within:ring-red-500/20',
      success: 'focus-within:ring-green-500/20'
    },
    size: {
      sm: 'dash-block-sm',
      md: 'dash-block-md',
      xl: 'dash-block-xl'
    },
    variant: {
      outlined: 'outline outline-1 outline-offset-[-1px]'
    },
    isValid: {
      true: '',
      false: '',
      null: ''
    },
    disabled: {
      false: '',
      true: 'opacity-60 cursor-not-allowed'
    }
  },
  compoundVariants: [
  // Outlined variant colors
  {
    variant: 'outlined',
    colorScheme: 'default',
    class: 'outline-[rgba(17,17,17,0.32)] focus-within:outline-[rgba(17,17,17,0.6)]'
  }, {
    variant: 'outlined',
    colorScheme: 'brand',
    class: 'outline-dash-brand/30 focus-within:outline-dash-brand'
  }, {
    variant: 'outlined',
    colorScheme: 'error',
    isValid: false,
    class: 'outline-red-500 focus-within:outline-red-500'
  }, {
    variant: 'outlined',
    colorScheme: 'success',
    isValid: true,
    class: 'outline-green-500 focus-within:outline-green-500'
  },
  // Outlined variant with focus ring
  {
    variant: 'outlined',
    class: 'focus-within:ring-2'
  },
  // Add extra padding for PASTE button when no value
  {
    hasValue: false,
    size: 'sm',
    class: 'pr-[70px]'
  }, {
    hasValue: false,
    size: 'md',
    class: 'pr-[70px]'
  }, {
    hasValue: false,
    size: 'xl',
    class: 'pr-[70px]'
  }],
  defaultVariants: {
    theme: 'light',
    hasValue: false,
    colorScheme: 'default',
    size: 'xl',
    variant: 'outlined',
    isValid: null,
    disabled: false
  }
});
const textarea = cva('w-full bg-transparent outline-none resize-none transition-all text-[0.875rem] leading-[1.0625rem] placeholder:text-opacity-60', {
  variants: {
    theme: {
      light: 'text-[#111111] placeholder:text-[rgba(17,17,17,0.6)]',
      dark: 'text-white placeholder:text-gray-400'
    },
    font: {
      main: 'font-dash-main',
      grotesque: 'font-dash-grotesque'
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold'
    },
    size: {
      sm: '',
      md: '',
      xl: ''
    },
    disabled: {
      false: '',
      true: 'cursor-not-allowed'
    }
  },
  defaultVariants: {
    theme: 'light',
    font: 'main',
    weight: 'light',
    size: 'xl',
    disabled: false
  }
});
/**
 * A versatile textarea component that adapts to light/dark theme,
 * supports various color schemes, sizes, variants, and states.
 * Includes optional paste functionality and validation.
 *
 * @example
 * <Textarea
 *   placeholder='Enter your message'
 *   colorScheme='brand'
 *   size='xl'
 *   font='grotesque'
 *   weight='medium'
 *   rows={4}
 *   showPasteButton={true}
 * />
 */
const Textarea = _a => {
  var _b, _c;
  var {
      className = '',
      onChange,
      showPasteButton = true,
      validator = null,
      rows = 3,
      size = 'xl',
      variant = 'outlined',
      colorScheme = 'default',
      font = 'main',
      weight = 'light',
      error = false,
      success = false,
      disabled = false
    } = _a,
    props = __rest(_a, ["className", "onChange", "showPasteButton", "validator", "rows", "size", "variant", "colorScheme", "font", "weight", "error", "success", "disabled"]);
  const {
    theme
  } = useTheme();
  const [value, setValue] = useState((_c = (_b = props.value) !== null && _b !== void 0 ? _b : props.defaultValue) !== null && _c !== void 0 ? _c : '');
  const [isValid, setIsValid] = useState(null);
  const textareaRef = useRef(null);
  const handleChange = e => {
    const newValue = e.target.value;
    setValue(newValue);
    if (typeof onChange === 'function') {
      onChange(newValue);
    }
    validateInput(newValue);
  };
  const validateInput = input => {
    if (validator === null) {
      setIsValid(null);
      return;
    }
    if (typeof validator === 'function') {
      setIsValid(validator(input));
    } else {
      setIsValid(Boolean(validator));
    }
  };
  const handlePaste = () => {
    navigator.clipboard.readText().then(text => {
      if (text !== '') {
        setValue(text);
        if (textareaRef.current != null) {
          textareaRef.current.value = text;
        }
        if (onChange != null) {
          onChange(text);
        }
        validateInput(text);
      }
    }).catch(err => {
      console.error('Failed to read clipboard contents: ', err);
    });
  };
  const hasValue = value !== '';
  // Determine color scheme based on state
  let finalColorScheme = colorScheme;
  let finalIsValid = isValid;
  if (error) {
    finalColorScheme = 'error';
    finalIsValid = false;
  } else if (success) {
    finalColorScheme = 'success';
    finalIsValid = true;
  }
  const containerClasses = textareaContainer({
    theme,
    hasValue,
    colorScheme: finalColorScheme,
    size,
    variant,
    isValid: finalIsValid,
    disabled
  });
  const textareaClasses = textarea({
    theme,
    font,
    weight,
    size,
    disabled
  }) + ' ' + className;
  return jsxs("div", {
    className: containerClasses,
    children: [jsx("textarea", Object.assign({
      ref: textareaRef,
      value: value,
      onChange: handleChange,
      rows: rows,
      className: textareaClasses,
      disabled: disabled
    }, props)), showPasteButton && !hasValue && !disabled && jsx(Button, {
      colorScheme: 'brand',
      size: 'sm',
      onClick: handlePaste,
      className: `absolute top-1/2 !-translate-y-1/2 ${size === 'sm' ? 'right-3' : size === 'md' ? 'right-[1.125rem]' : 'right-[1.5625rem]'}`,
      children: "PASTE"
    })]
  });
};

const textStyles = cva('', {
  variants: {
    reset: {
      false: 'inline whitespace-normal',
      true: ''
    },
    theme: {
      light: 'text-gray-900',
      dark: 'text-gray-100'
    },
    color: {
      default: '',
      blue: '!text-dash-brand',
      'blue-dark': '!text-dash-brand-dark dark:text-dash-brand-dim',
      red: 'text-red-700'
    },
    size: {
      xs: 'text-[0.625rem]',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl'
    },
    weight: {
      normal: 'font-normal',
      500: 'font-medium',
      bold: 'font-bold'
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
      0: 'opacity-0',
      10: 'opacity-10',
      20: 'opacity-20',
      30: 'opacity-30',
      40: 'opacity-40',
      50: 'opacity-50',
      60: 'opacity-60',
      70: 'opacity-70',
      80: 'opacity-80',
      90: 'opacity-90',
      100: 'opacity-100'
    },
    monospace: {
      false: '',
      true: 'font-grotesque'
    },
    dim: {
      false: '',
      true: '!opacity-60'
    }
  },
  defaultVariants: {
    reset: false,
    theme: 'light',
    color: 'default',
    size: 'md',
    weight: 'normal',
    italic: false,
    underline: false,
    lineThrough: false,
    transform: 'none',
    opacity: 100,
    monospace: false,
    dim: false
  }
});
/**
 * A versatile text component with size, color, weight, decoration,
 * transform, opacity, monospace, dimming, and theme-aware defaults.
 */
const Text = _a => {
  var {
      as,
      className = '',
      children
    } = _a,
    variantProps = __rest(_a, ["as", "className", "children"]);
  const {
    theme
  } = useTheme();
  const classes = textStyles(Object.assign(Object.assign({}, variantProps), {
    theme
  })) + (className !== '' ? ` ${className}` : '');
  const Component = as !== null && as !== void 0 ? as : 'span';
  return jsx(Component, {
    className: classes,
    children: children
  });
};

const valueCard = cva('flex items-center transition-all outline outline-1 outline-offset-[-1px]', {
  variants: {
    theme: {
      light: 'outline-gray-200',
      dark: 'bg-gray-800/50 outline-gray-400'
    },
    colorScheme: {
      default: '',
      transparent: 'bg-transparent',
      green: 'text-green-500 bg-green-200 outline-green-400',
      lightBlue: 'bg-dash-brand-dim/10 !outline-dash-brand/20',
      white: 'bg-white',
      lightGray: 'bg-dash-primary-die-subdued',
      yellow: 'bg-dash-yellow-light !outline-dash-yellow'
    },
    size: {
      sm: 'dash-block-sm',
      md: 'dash-block-md',
      xl: 'dash-block-xl'
    },
    clickable: {
      false: '',
      true: 'cursor-pointer transition-colors active:translate-y-px active:opacity-90'
    },
    loading: {
      false: '',
      true: 'animate-pulse'
    },
    border: {
      false: '!outline-none',
      true: ''
    }
  },
  compoundVariants: [
  // default scheme hover
  {
    theme: 'light',
    colorScheme: 'default',
    clickable: true,
    class: 'hover:bg-gray-200/50'
  }, {
    theme: 'dark',
    colorScheme: 'default',
    clickable: true,
    class: 'hover:bg-gray-700/50'
  },
  // transparent scheme hover
  {
    theme: 'light',
    colorScheme: 'transparent',
    clickable: true,
    class: 'hover:bg-gray-100'
  }, {
    theme: 'dark',
    colorScheme: 'transparent',
    clickable: true,
    class: 'hover:bg-gray-900'
  },
  // green scheme hover
  {
    theme: 'light',
    colorScheme: 'green',
    clickable: true,
    class: 'hover:bg-green-300'
  }, {
    theme: 'dark',
    colorScheme: 'green',
    clickable: true,
    class: 'hover:bg-green-400'
  },
  // green lightBlue
  {
    colorScheme: 'lightBlue',
    clickable: true,
    class: 'hover:bg-dash-brand/15'
  },
  // white
  {
    theme: 'light',
    colorScheme: 'white',
    clickable: true,
    class: 'hover:bg-gray-100'
  }, {
    theme: 'dark',
    colorScheme: 'white',
    clickable: true,
    class: 'hover:bg-gray-100'
  },
  // lightGray scheme hover
  {
    theme: 'light',
    colorScheme: 'lightGray',
    clickable: true,
    class: 'hover:bg-dash-primary-die'
  }, {
    theme: 'dark',
    colorScheme: 'lightGray',
    clickable: true,
    class: 'hover:bg-gray-600'
  },
  // yellow scheme hover
  {
    colorScheme: 'yellow',
    clickable: true,
    class: 'hover:bg-dash-yellow'
  }],
  defaultVariants: {
    theme: 'light',
    colorScheme: 'default',
    size: 'md',
    clickable: false,
    loading: false,
    border: true
  }
});
/**
 * A card container that adapts to light/dark theme,
 * supports various color schemes, sizes, clickability,
 * loading state, and optional border styling.
 *
 * @example
 * <ValueCard colorScheme="green" border as={Link} link="/foo">
 *   Go
 * </ValueCard>
 */
const ValueCard = _a => {
  var {
      as,
      link = '',
      colorScheme,
      size,
      clickable = false,
      loading,
      border,
      className = '',
      children
    } = _a,
    props = __rest(_a, ["as", "link", "colorScheme", "size", "clickable", "loading", "border", "className", "children"]);
  const {
    theme
  } = useTheme();
  const isClickable = Boolean(link !== '' || clickable);
  const classes = valueCard({
    theme,
    colorScheme,
    size,
    clickable: isClickable,
    loading,
    border
  }) + ' ' + String(className);
  // choose element: custom `as`, or <a> if link, else <div>
  const Component = as !== null && as !== void 0 ? as : link !== '' ? 'a' : 'div';
  const mergedProps = Object.assign(Object.assign({}, props), {
    className: classes
  });
  if (link !== '') mergedProps.href = link;
  return jsx(Component, Object.assign({}, mergedProps, {
    children: children
  }));
};

// packages/core/number/src/number.ts
function clamp$1(value, [min, max]) {
  return Math.min(max, Math.max(min, value));
}

// packages/core/primitive/src/primitive.tsx
function composeEventHandlers$1(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}

// packages/react/use-callback-ref/src/use-callback-ref.tsx
function useCallbackRef$1(callback) {
  const callbackRef = React.useRef(callback);
  React.useEffect(() => {
    callbackRef.current = callback;
  });
  return React.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}

// packages/react/use-escape-keydown/src/use-escape-keydown.tsx
function useEscapeKeydown(onEscapeKeyDownProp, ownerDocument = globalThis?.document) {
  const onEscapeKeyDown = useCallbackRef$1(onEscapeKeyDownProp);
  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onEscapeKeyDown(event);
      }
    };
    ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [onEscapeKeyDown, ownerDocument]);
}

var DISMISSABLE_LAYER_NAME$1 = "DismissableLayer";
var CONTEXT_UPDATE$1 = "dismissableLayer.update";
var POINTER_DOWN_OUTSIDE$1 = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE$1 = "dismissableLayer.focusOutside";
var originalBodyPointerEvents$1;
var DismissableLayerContext$1 = React.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
var DismissableLayer$1 = React.forwardRef(
  (props, forwardedRef) => {
    const {
      disableOutsidePointerEvents = false,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
      ...layerProps
    } = props;
    const context = React.useContext(DismissableLayerContext$1);
    const [node, setNode] = React.useState(null);
    const ownerDocument = node?.ownerDocument ?? globalThis?.document;
    const [, force] = React.useState({});
    const composedRefs = useComposedRefs(forwardedRef, (node2) => setNode(node2));
    const layers = Array.from(context.layers);
    const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
    const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
    const index = node ? layers.indexOf(node) : -1;
    const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
    const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
    const pointerDownOutside = usePointerDownOutside$1((event) => {
      const target = event.target;
      const isPointerDownOnBranch = [...context.branches].some((branch) => branch.contains(target));
      if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
      onPointerDownOutside?.(event);
      onInteractOutside?.(event);
      if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    const focusOutside = useFocusOutside$1((event) => {
      const target = event.target;
      const isFocusInBranch = [...context.branches].some((branch) => branch.contains(target));
      if (isFocusInBranch) return;
      onFocusOutside?.(event);
      onInteractOutside?.(event);
      if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    useEscapeKeydown((event) => {
      const isHighestLayer = index === context.layers.size - 1;
      if (!isHighestLayer) return;
      onEscapeKeyDown?.(event);
      if (!event.defaultPrevented && onDismiss) {
        event.preventDefault();
        onDismiss();
      }
    }, ownerDocument);
    React.useEffect(() => {
      if (!node) return;
      if (disableOutsidePointerEvents) {
        if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
          originalBodyPointerEvents$1 = ownerDocument.body.style.pointerEvents;
          ownerDocument.body.style.pointerEvents = "none";
        }
        context.layersWithOutsidePointerEventsDisabled.add(node);
      }
      context.layers.add(node);
      dispatchUpdate$1();
      return () => {
        if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) {
          ownerDocument.body.style.pointerEvents = originalBodyPointerEvents$1;
        }
      };
    }, [node, ownerDocument, disableOutsidePointerEvents, context]);
    React.useEffect(() => {
      return () => {
        if (!node) return;
        context.layers.delete(node);
        context.layersWithOutsidePointerEventsDisabled.delete(node);
        dispatchUpdate$1();
      };
    }, [node, context]);
    React.useEffect(() => {
      const handleUpdate = () => force({});
      document.addEventListener(CONTEXT_UPDATE$1, handleUpdate);
      return () => document.removeEventListener(CONTEXT_UPDATE$1, handleUpdate);
    }, []);
    return /* @__PURE__ */ jsx(
      Primitive.div,
      {
        ...layerProps,
        ref: composedRefs,
        style: {
          pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
          ...props.style
        },
        onFocusCapture: composeEventHandlers$1(props.onFocusCapture, focusOutside.onFocusCapture),
        onBlurCapture: composeEventHandlers$1(props.onBlurCapture, focusOutside.onBlurCapture),
        onPointerDownCapture: composeEventHandlers$1(
          props.onPointerDownCapture,
          pointerDownOutside.onPointerDownCapture
        )
      }
    );
  }
);
DismissableLayer$1.displayName = DISMISSABLE_LAYER_NAME$1;
var BRANCH_NAME$1 = "DismissableLayerBranch";
var DismissableLayerBranch$1 = React.forwardRef((props, forwardedRef) => {
  const context = React.useContext(DismissableLayerContext$1);
  const ref = React.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  React.useEffect(() => {
    const node = ref.current;
    if (node) {
      context.branches.add(node);
      return () => {
        context.branches.delete(node);
      };
    }
  }, [context.branches]);
  return /* @__PURE__ */ jsx(Primitive.div, { ...props, ref: composedRefs });
});
DismissableLayerBranch$1.displayName = BRANCH_NAME$1;
function usePointerDownOutside$1(onPointerDownOutside, ownerDocument = globalThis?.document) {
  const handlePointerDownOutside = useCallbackRef$1(onPointerDownOutside);
  const isPointerInsideReactTreeRef = React.useRef(false);
  const handleClickRef = React.useRef(() => {
  });
  React.useEffect(() => {
    const handlePointerDown = (event) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        let handleAndDispatchPointerDownOutsideEvent2 = function() {
          handleAndDispatchCustomEvent$1(
            POINTER_DOWN_OUTSIDE$1,
            handlePointerDownOutside,
            eventDetail,
            { discrete: true }
          );
        };
        const eventDetail = { originalEvent: event };
        if (event.pointerType === "touch") {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
          ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
        } else {
          handleAndDispatchPointerDownOutsideEvent2();
        }
      } else {
        ownerDocument.removeEventListener("click", handleClickRef.current);
      }
      isPointerInsideReactTreeRef.current = false;
    };
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("click", handleClickRef.current);
    };
  }, [ownerDocument, handlePointerDownOutside]);
  return {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true
  };
}
function useFocusOutside$1(onFocusOutside, ownerDocument = globalThis?.document) {
  const handleFocusOutside = useCallbackRef$1(onFocusOutside);
  const isFocusInsideReactTreeRef = React.useRef(false);
  React.useEffect(() => {
    const handleFocus = (event) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        const eventDetail = { originalEvent: event };
        handleAndDispatchCustomEvent$1(FOCUS_OUTSIDE$1, handleFocusOutside, eventDetail, {
          discrete: false
        });
      }
    };
    ownerDocument.addEventListener("focusin", handleFocus);
    return () => ownerDocument.removeEventListener("focusin", handleFocus);
  }, [ownerDocument, handleFocusOutside]);
  return {
    onFocusCapture: () => isFocusInsideReactTreeRef.current = true,
    onBlurCapture: () => isFocusInsideReactTreeRef.current = false
  };
}
function dispatchUpdate$1() {
  const event = new CustomEvent(CONTEXT_UPDATE$1);
  document.dispatchEvent(event);
}
function handleAndDispatchCustomEvent$1(name, handler, detail, { discrete }) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail });
  if (handler) target.addEventListener(name, handler, { once: true });
  if (discrete) {
    dispatchDiscreteCustomEvent(target, event);
  } else {
    target.dispatchEvent(event);
  }
}

var count$1 = 0;
function useFocusGuards$1() {
  React.useEffect(() => {
    const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard$1());
    document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard$1());
    count$1++;
    return () => {
      if (count$1 === 1) {
        document.querySelectorAll("[data-radix-focus-guard]").forEach((node) => node.remove());
      }
      count$1--;
    };
  }, []);
}
function createFocusGuard$1() {
  const element = document.createElement("span");
  element.setAttribute("data-radix-focus-guard", "");
  element.tabIndex = 0;
  element.style.outline = "none";
  element.style.opacity = "0";
  element.style.position = "fixed";
  element.style.pointerEvents = "none";
  return element;
}

var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
var EVENT_OPTIONS$1 = { bubbles: false, cancelable: true };
var FOCUS_SCOPE_NAME = "FocusScope";
var FocusScope = React.forwardRef((props, forwardedRef) => {
  const {
    loop = false,
    trapped = false,
    onMountAutoFocus: onMountAutoFocusProp,
    onUnmountAutoFocus: onUnmountAutoFocusProp,
    ...scopeProps
  } = props;
  const [container, setContainer] = React.useState(null);
  const onMountAutoFocus = useCallbackRef$1(onMountAutoFocusProp);
  const onUnmountAutoFocus = useCallbackRef$1(onUnmountAutoFocusProp);
  const lastFocusedElementRef = React.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setContainer(node));
  const focusScope = React.useRef({
    paused: false,
    pause() {
      this.paused = true;
    },
    resume() {
      this.paused = false;
    }
  }).current;
  React.useEffect(() => {
    if (trapped) {
      let handleFocusIn2 = function(event) {
        if (focusScope.paused || !container) return;
        const target = event.target;
        if (container.contains(target)) {
          lastFocusedElementRef.current = target;
        } else {
          focus(lastFocusedElementRef.current, { select: true });
        }
      }, handleFocusOut2 = function(event) {
        if (focusScope.paused || !container) return;
        const relatedTarget = event.relatedTarget;
        if (relatedTarget === null) return;
        if (!container.contains(relatedTarget)) {
          focus(lastFocusedElementRef.current, { select: true });
        }
      }, handleMutations2 = function(mutations) {
        const focusedElement = document.activeElement;
        if (focusedElement !== document.body) return;
        for (const mutation of mutations) {
          if (mutation.removedNodes.length > 0) focus(container);
        }
      };
      document.addEventListener("focusin", handleFocusIn2);
      document.addEventListener("focusout", handleFocusOut2);
      const mutationObserver = new MutationObserver(handleMutations2);
      if (container) mutationObserver.observe(container, { childList: true, subtree: true });
      return () => {
        document.removeEventListener("focusin", handleFocusIn2);
        document.removeEventListener("focusout", handleFocusOut2);
        mutationObserver.disconnect();
      };
    }
  }, [trapped, container, focusScope.paused]);
  React.useEffect(() => {
    if (container) {
      focusScopesStack.add(focusScope);
      const previouslyFocusedElement = document.activeElement;
      const hasFocusedCandidate = container.contains(previouslyFocusedElement);
      if (!hasFocusedCandidate) {
        const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS$1);
        container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        container.dispatchEvent(mountEvent);
        if (!mountEvent.defaultPrevented) {
          focusFirst$1(removeLinks(getTabbableCandidates(container)), { select: true });
          if (document.activeElement === previouslyFocusedElement) {
            focus(container);
          }
        }
      }
      return () => {
        container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
        setTimeout(() => {
          const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS$1);
          container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          container.dispatchEvent(unmountEvent);
          if (!unmountEvent.defaultPrevented) {
            focus(previouslyFocusedElement ?? document.body, { select: true });
          }
          container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
          focusScopesStack.remove(focusScope);
        }, 0);
      };
    }
  }, [container, onMountAutoFocus, onUnmountAutoFocus, focusScope]);
  const handleKeyDown = React.useCallback(
    (event) => {
      if (!loop && !trapped) return;
      if (focusScope.paused) return;
      const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
      const focusedElement = document.activeElement;
      if (isTabKey && focusedElement) {
        const container2 = event.currentTarget;
        const [first, last] = getTabbableEdges(container2);
        const hasTabbableElementsInside = first && last;
        if (!hasTabbableElementsInside) {
          if (focusedElement === container2) event.preventDefault();
        } else {
          if (!event.shiftKey && focusedElement === last) {
            event.preventDefault();
            if (loop) focus(first, { select: true });
          } else if (event.shiftKey && focusedElement === first) {
            event.preventDefault();
            if (loop) focus(last, { select: true });
          }
        }
      }
    },
    [loop, trapped, focusScope.paused]
  );
  return /* @__PURE__ */ jsx(Primitive.div, { tabIndex: -1, ...scopeProps, ref: composedRefs, onKeyDown: handleKeyDown });
});
FocusScope.displayName = FOCUS_SCOPE_NAME;
function focusFirst$1(candidates, { select = false } = {}) {
  const previouslyFocusedElement = document.activeElement;
  for (const candidate of candidates) {
    focus(candidate, { select });
    if (document.activeElement !== previouslyFocusedElement) return;
  }
}
function getTabbableEdges(container) {
  const candidates = getTabbableCandidates(container);
  const first = findVisible(candidates, container);
  const last = findVisible(candidates.reverse(), container);
  return [first, last];
}
function getTabbableCandidates(container) {
  const nodes = [];
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode()) nodes.push(walker.currentNode);
  return nodes;
}
function findVisible(elements, container) {
  for (const element of elements) {
    if (!isHidden(element, { upTo: container })) return element;
  }
}
function isHidden(node, { upTo }) {
  if (getComputedStyle(node).visibility === "hidden") return true;
  while (node) {
    if (upTo !== void 0 && node === upTo) return false;
    if (getComputedStyle(node).display === "none") return true;
    node = node.parentElement;
  }
  return false;
}
function isSelectableInput(element) {
  return element instanceof HTMLInputElement && "select" in element;
}
function focus(element, { select = false } = {}) {
  if (element && element.focus) {
    const previouslyFocusedElement = document.activeElement;
    element.focus({ preventScroll: true });
    if (element !== previouslyFocusedElement && isSelectableInput(element) && select)
      element.select();
  }
}
var focusScopesStack = createFocusScopesStack();
function createFocusScopesStack() {
  let stack = [];
  return {
    add(focusScope) {
      const activeFocusScope = stack[0];
      if (focusScope !== activeFocusScope) {
        activeFocusScope?.pause();
      }
      stack = arrayRemove(stack, focusScope);
      stack.unshift(focusScope);
    },
    remove(focusScope) {
      stack = arrayRemove(stack, focusScope);
      stack[0]?.resume();
    }
  };
}
function arrayRemove(array, item) {
  const updatedArray = [...array];
  const index = updatedArray.indexOf(item);
  if (index !== -1) {
    updatedArray.splice(index, 1);
  }
  return updatedArray;
}
function removeLinks(items) {
  return items.filter((item) => item.tagName !== "A");
}

/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */

const sides = ['top', 'right', 'bottom', 'left'];
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = v => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
const oppositeAlignmentMap = {
  start: 'end',
  end: 'start'
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === 'function' ? value(param) : value;
}
function getSide(placement) {
  return placement.split('-')[0];
}
function getAlignment(placement) {
  return placement.split('-')[1];
}
function getOppositeAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}
function getAxisLength(axis) {
  return axis === 'y' ? 'height' : 'width';
}
const yAxisSides = /*#__PURE__*/new Set(['top', 'bottom']);
function getSideAxis(placement) {
  return yAxisSides.has(getSide(placement)) ? 'y' : 'x';
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === 'x' ? alignment === (rtl ? 'end' : 'start') ? 'right' : 'left' : alignment === 'start' ? 'bottom' : 'top';
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, alignment => oppositeAlignmentMap[alignment]);
}
const lrPlacement = ['left', 'right'];
const rlPlacement = ['right', 'left'];
const tbPlacement = ['top', 'bottom'];
const btPlacement = ['bottom', 'top'];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case 'top':
    case 'bottom':
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case 'left':
    case 'right':
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === 'start', rtl);
  if (alignment) {
    list = list.map(side => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, side => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== 'number' ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}

function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === 'y';
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case 'top':
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case 'bottom':
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case 'right':
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case 'left':
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case 'start':
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case 'end':
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 *
 * This export does not have any `platform` interface logic. You will need to
 * write one for the platform you are using Floating UI with.
 */
const computePosition$1 = async (reference, floating, config) => {
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform
  } = config;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
  let rects = await platform.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === 'object') {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};

/**
 * Resolves with an object of overflow side offsets that determine how much the
 * element is overflowing a given clipping boundary on each side.
 * - positive = overflowing the boundary by that number of pixels
 * - negative = how many pixels left before it will overflow
 * - 0 = lies flush with the boundary
 * @see https://floating-ui.com/docs/detectOverflow
 */
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === 'floating' ? 'reference' : 'floating';
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform.getClippingRect({
    element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || (await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating))),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === 'floating' ? {
    x,
    y,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
  const offsetScale = (await (platform.isElement == null ? void 0 : platform.isElement(offsetParent))) ? (await (platform.getScale == null ? void 0 : platform.getScale(offsetParent))) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow$3 = options => ({
  name: 'arrow',
  options,
  async fn(state) {
    const {
      x,
      y,
      placement,
      rects,
      platform,
      elements,
      middlewareData
    } = state;
    // Since `element` is required, we don't Partial<> the type.
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x,
      y
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform.getDimensions(element);
    const isYAxis = axis === 'y';
    const minProp = isYAxis ? 'top' : 'left';
    const maxProp = isYAxis ? 'bottom' : 'right';
    const clientProp = isYAxis ? 'clientHeight' : 'clientWidth';
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;

    // DOM platform can return `window` as the `offsetParent`.
    if (!clientSize || !(await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent)))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;

    // If the padding is large enough that it causes the arrow to no longer be
    // centered, modify the padding so that it is centered.
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);

    // Make sure the arrow doesn't overflow the floating element if the center
    // point is outside the floating element's bounds.
    const min$1 = minPadding;
    const max = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset = clamp(min$1, center, max);

    // If the reference is small enough that the arrow's padding causes it to
    // to point to nothing for an aligned placement, adjust the offset of the
    // floating element itself. To ensure `shift()` continues to take action,
    // a single reset is performed when this is true.
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset,
        centerOffset: center - offset - alignmentOffset,
        ...(shouldAddOffset && {
          alignmentOffset
        })
      },
      reset: shouldAddOffset
    };
  }
});

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip$2 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'flip',
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = 'bestFit',
        fallbackAxisSideDirection = 'none',
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);

      // If a reset by the arrow was caused due to an alignment offset being
      // added, we should skip any logic now since `flip()` has already done its
      // work.
      // https://github.com/floating-ui/floating-ui/issues/2549#issuecomment-1719601643
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== 'none';
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides[0]], overflow[sides[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];

      // One or more sides is overflowing.
      if (!overflows.every(side => side <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === 'alignment' ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow ||
          // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every(d => d.overflows[0] > 0 && getSideAxis(d.placement) === initialSideAxis)) {
            // Try next placement and re-run the lifecycle.
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }

        // First, find the candidates that fit on the mainAxis side of overflow,
        // then find the placement that fits the best on the main crossAxis side.
        let resetPlacement = (_overflowsData$filter = overflowsData.filter(d => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;

        // Otherwise fallback.
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case 'bestFit':
              {
                var _overflowsData$filter2;
                const placement = (_overflowsData$filter2 = overflowsData.filter(d => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = getSideAxis(d.placement);
                    return currentSideAxis === initialSideAxis ||
                    // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === 'y';
                  }
                  return true;
                }).map(d => [d.placement, d.overflows.filter(overflow => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement) {
                  resetPlacement = placement;
                }
                break;
              }
            case 'initialPlacement':
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};

function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some(side => overflow[side] >= 0);
}
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide$2 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'hide',
    options,
    async fn(state) {
      const {
        rects
      } = state;
      const {
        strategy = 'referenceHidden',
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case 'referenceHidden':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              elementContext: 'reference'
            });
            const offsets = getSideOffsets(overflow, rects.reference);
            return {
              data: {
                referenceHiddenOffsets: offsets,
                referenceHidden: isAnySideFullyClipped(offsets)
              }
            };
          }
        case 'escaped':
          {
            const overflow = await detectOverflow(state, {
              ...detectOverflowOptions,
              altBoundary: true
            });
            const offsets = getSideOffsets(overflow, rects.floating);
            return {
              data: {
                escapedOffsets: offsets,
                escaped: isAnySideFullyClipped(offsets)
              }
            };
          }
        default:
          {
            return {};
          }
      }
    }
  };
};

const originSides = /*#__PURE__*/new Set(['left', 'top']);

// For type backwards-compatibility, the `OffsetOptions` type was also
// Derivable.

async function convertValueToCoords(state, options) {
  const {
    placement,
    platform,
    elements
  } = state;
  const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === 'y';
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);

  // eslint-disable-next-line prefer-const
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === 'number' ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === 'number') {
    crossAxis = alignment === 'end' ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset$2 = function (options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: 'offset',
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);

      // If the placement is the same and the arrow caused an alignment offset
      // then we don't need to change the positioning coordinates.
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift$2 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'shift',
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: _ref => {
            let {
              x,
              y
            } = _ref;
            return {
              x,
              y
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === 'y' ? 'top' : 'left';
        const maxSide = mainAxis === 'y' ? 'bottom' : 'right';
        const min = mainAxisCoord + overflow[minSide];
        const max = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min, mainAxisCoord, max);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === 'y' ? 'top' : 'left';
        const maxSide = crossAxis === 'y' ? 'bottom' : 'right';
        const min = crossAxisCoord + overflow[minSide];
        const max = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min, crossAxisCoord, max);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};
/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift$2 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    options,
    fn(state) {
      const {
        x,
        y,
        placement,
        rects,
        middlewareData
      } = state;
      const {
        offset = 0,
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const rawOffset = evaluate(offset, state);
      const computedOffset = typeof rawOffset === 'number' ? {
        mainAxis: rawOffset,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...rawOffset
      };
      if (checkMainAxis) {
        const len = mainAxis === 'y' ? 'height' : 'width';
        const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
        const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
        if (mainAxisCoord < limitMin) {
          mainAxisCoord = limitMin;
        } else if (mainAxisCoord > limitMax) {
          mainAxisCoord = limitMax;
        }
      }
      if (checkCrossAxis) {
        var _middlewareData$offse, _middlewareData$offse2;
        const len = mainAxis === 'y' ? 'width' : 'height';
        const isOriginSide = originSides.has(getSide(placement));
        const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
        const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
        if (crossAxisCoord < limitMin) {
          crossAxisCoord = limitMin;
        } else if (crossAxisCoord > limitMax) {
          crossAxisCoord = limitMax;
        }
      }
      return {
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      };
    }
  };
};

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size$2 = function (options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: 'size',
    options,
    async fn(state) {
      var _state$middlewareData, _state$middlewareData2;
      const {
        placement,
        rects,
        platform,
        elements
      } = state;
      const {
        apply = () => {},
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === 'y';
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === 'top' || side === 'bottom') {
        heightSide = side;
        widthSide = alignment === ((await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating))) ? 'start' : 'end') ? 'left' : 'right';
      } else {
        widthSide = side;
        heightSide = alignment === 'end' ? 'top' : 'bottom';
      }
      const maximumClippingHeight = height - overflow.top - overflow.bottom;
      const maximumClippingWidth = width - overflow.left - overflow.right;
      const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
      const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if ((_state$middlewareData = state.middlewareData.shift) != null && _state$middlewareData.enabled.x) {
        availableWidth = maximumClippingWidth;
      }
      if ((_state$middlewareData2 = state.middlewareData.shift) != null && _state$middlewareData2.enabled.y) {
        availableHeight = maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};

function hasWindow() {
  return typeof window !== 'undefined';
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || '').toLowerCase();
  }
  // Mocked nodes in testing environments may not be instances of Node. By
  // returning `#document` an infinite loop won't occur.
  // https://github.com/floating-ui/floating-ui/issues/2317
  return '#document';
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === 'undefined') {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
const invalidOverflowDisplayValues = /*#__PURE__*/new Set(['inline', 'contents']);
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !invalidOverflowDisplayValues.has(display);
}
const tableElements = /*#__PURE__*/new Set(['table', 'td', 'th']);
function isTableElement(element) {
  return tableElements.has(getNodeName(element));
}
const topLayerSelectors = [':popover-open', ':modal'];
function isTopLayer(element) {
  return topLayerSelectors.some(selector => {
    try {
      return element.matches(selector);
    } catch (_e) {
      return false;
    }
  });
}
const transformProperties = ['transform', 'translate', 'scale', 'rotate', 'perspective'];
const willChangeValues = ['transform', 'translate', 'scale', 'rotate', 'perspective', 'filter'];
const containValues = ['paint', 'layout', 'strict', 'content'];
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  // https://drafts.csswg.org/css-transforms-2/#individual-transforms
  return transformProperties.some(value => css[value] ? css[value] !== 'none' : false) || (css.containerType ? css.containerType !== 'normal' : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== 'none' : false) || !webkit && (css.filter ? css.filter !== 'none' : false) || willChangeValues.some(value => (css.willChange || '').includes(value)) || containValues.some(value => (css.contain || '').includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === 'undefined' || !CSS.supports) return false;
  return CSS.supports('-webkit-backdrop-filter', 'none');
}
const lastTraversableNodeNames = /*#__PURE__*/new Set(['html', 'body', '#document']);
function isLastTraversableNode(node) {
  return lastTraversableNodeNames.has(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === 'html') {
    return node;
  }
  const result =
  // Step into the shadow DOM of the parent of a slotted node.
  node.assignedSlot ||
  // DOM Element detected.
  node.parentNode ||
  // ShadowRoot detected.
  isShadowRoot(node) && node.host ||
  // Fallback.
  getDocumentElement(node);
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

function getCssDimensions(element) {
  const css = getComputedStyle$1(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}

function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}

function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;

  // 0, NaN, or Infinity should always fallback to 1.

  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}

const noOffsets = /*#__PURE__*/createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}

function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}

// If <html> has a CSS width greater than the viewport, then this will be
// incorrect for RTL.
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}

function getHTMLOffset(documentElement, scroll, ignoreScrollbarX) {
  if (ignoreScrollbarX === void 0) {
    ignoreScrollbarX = false;
  }
  const htmlRect = documentElement.getBoundingClientRect();
  const x = htmlRect.left + scroll.scrollLeft - (ignoreScrollbarX ? 0 :
  // RTL <body> scrollbar.
  getWindowScrollBarX(documentElement, htmlRect));
  const y = htmlRect.top + scroll.scrollTop;
  return {
    x,
    y
  };
}

function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === 'fixed';
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll, true) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}

function getClientRects(element) {
  return Array.from(element.getClientRects());
}

// Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable.
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === 'rtl') {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}

const absoluteOrFixed = /*#__PURE__*/new Set(['absolute', 'fixed']);
// Returns the inner client rect, subtracting scrollbars if present.
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === 'fixed');
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === 'viewport') {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === 'document') {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === 'fixed' || hasFixedPositionAncestor(parentNode, stopNode);
}

// A "clipping ancestor" is an `overflow` element with the characteristic of
// clipping (or hiding) child elements. This returns all clipping ancestors
// of the given element up the tree.
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter(el => isElement(el) && getNodeName(el) !== 'body');
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === 'fixed';
  let currentNode = elementIsFixed ? getParentNode(element) : element;

  // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === 'fixed') {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === 'static' && !!currentContainingBlockComputedStyle && absoluteOrFixed.has(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      // Drop non-containing blocks.
      result = result.filter(ancestor => ancestor !== currentNode);
    } else {
      // Record last containing block for next iteration.
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}

// Gets the maximum area that the element is visible in due to any number of
// clipping ancestors.
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === 'clippingAncestors' ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}

function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}

function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === 'fixed';
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);

  // If the <body> scrollbar appears on the left (e.g. RTL systems). Use
  // Firefox with layout.scrollbar.side = 3 in about:config to test this.
  function setLeftRTLScrollbarOffset() {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      setLeftRTLScrollbarOffset();
    }
  }
  if (isFixed && !isOffsetParentAnElement && documentElement) {
    setLeftRTLScrollbarOffset();
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}

function isStaticPositioned(element) {
  return getComputedStyle$1(element).position === 'static';
}

function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === 'fixed') {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;

  // Firefox returns the <html> element as the offsetParent if it's non-static,
  // while Chrome and Safari return the <body> element. The <body> element must
  // be used to perform the correct calculations even if the <html> element is
  // non-static.
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}

// Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.
function getOffsetParent(element, polyfill) {
  const win = getWindow(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}

const getElementRects = async function (data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};

function isRTL(element) {
  return getComputedStyle$1(element).direction === 'rtl';
}

const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};

function rectsAreEqual(a, b) {
  return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}

// https://samthor.au/2021/observing-dom/
function observeMove(element, onMove) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          // If the reference is clipped, the ratio is 0. Throttle the refresh
          // to prevent an infinite loop of updates.
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1000);
        } else {
          refresh(false, ratio);
        }
      }
      if (ratio === 1 && !rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        // It's possible that even though the ratio is reported as 1, the
        // element is not actually fully within the IntersectionObserver's root
        // area anymore. This can happen under performance constraints. This may
        // be a bug in the browser's IntersectionObserver implementation. To
        // work around this, we compare the element's bounding rect now with
        // what it was at the time we created the IntersectionObserver. If they
        // are not equal then the element moved, so we refresh.
        refresh();
      }
      isFirstUpdate = false;
    }

    // Older browsers don't support a `document` as the root and will throw an
    // error.
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}

/**
 * Automatically updates the position of the floating element when necessary.
 * Should only be called when the floating element is mounted on the DOM or
 * visible on the screen.
 * @returns cleanup function that should be invoked when the floating element is
 * removed from the DOM or hidden from the screen.
 * @see https://floating-ui.com/docs/autoUpdate
 */
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === 'function',
    layoutShift = typeof IntersectionObserver === 'function',
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...(referenceEl ? getOverflowAncestors(referenceEl) : []), ...getOverflowAncestors(floating)] : [];
  ancestors.forEach(ancestor => {
    ancestorScroll && ancestor.addEventListener('scroll', update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener('resize', update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver(_ref => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        // Prevent update loops when using the `size` middleware.
        // https://github.com/floating-ui/floating-ui/issues/1740
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach(ancestor => {
      ancestorScroll && ancestor.removeEventListener('scroll', update);
      ancestorResize && ancestor.removeEventListener('resize', update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset$1 = offset$2;

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift$1 = shift$2;

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip$1 = flip$2;

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size$1 = size$2;

/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide$1 = hide$2;

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow$2 = arrow$3;

/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift$1 = limitShift$2;

/**
 * Computes the `x` and `y` coordinates that will place the floating element
 * next to a given reference element.
 */
const computePosition = (reference, floating, options) => {
  // This caches the expensive `getClippingElementAncestors` function so that
  // multiple lifecycle resets re-use the same result. It only lives for a
  // single call. If other functions become expensive, we can add them as well.
  const cache = new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

var isClient = typeof document !== 'undefined';

var noop = function noop() {};
var index = isClient ? useLayoutEffect : noop;

// Fork of `fast-deep-equal` that only does the comparisons we need and compares
// functions
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === 'function' && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === 'object') {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0;) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0;) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0;) {
      const key = keys[i];
      if (key === '_owner' && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}

function getDPR(element) {
  if (typeof window === 'undefined') {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}

function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}

function useLatestRef(value) {
  const ref = React.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}

/**
 * Provides data to position a floating element.
 * @see https://floating-ui.com/docs/useFloating
 */
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = 'bottom',
    strategy = 'absolute',
    middleware = [],
    platform,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = React.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = React.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = React.useState(null);
  const [_floating, _setFloating] = React.useState(null);
  const setReference = React.useCallback(node => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = React.useCallback(node => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = React.useRef(null);
  const floatingRef = React.useRef(null);
  const dataRef = React.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef(whileElementsMounted);
  const platformRef = useLatestRef(platform);
  const openRef = useLatestRef(open);
  const update = React.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config.platform = platformRef.current;
    }
    computePosition(referenceRef.current, floatingRef.current, config).then(data => {
      const fullData = {
        ...data,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: openRef.current !== false
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        ReactDOM.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData(data => ({
        ...data,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = React.useRef(false);
  index(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = React.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = React.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = React.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...(getDPR(elements.floating) >= 1.5 && {
          willChange: 'transform'
        })
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return React.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow$1 = options => {
  function isRef(value) {
    return {}.hasOwnProperty.call(value, 'current');
  }
  return {
    name: 'arrow',
    options,
    fn(state) {
      const {
        element,
        padding
      } = typeof options === 'function' ? options(state) : options;
      if (element && isRef(element)) {
        if (element.current != null) {
          return arrow$2({
            element: element.current,
            padding
          }).fn(state);
        }
        return {};
      }
      if (element) {
        return arrow$2({
          element,
          padding
        }).fn(state);
      }
      return {};
    }
  };
};

/**
 * Modifies the placement by translating the floating element along the
 * specified axes.
 * A number (shorthand for `mainAxis` or distance), or an axes configuration
 * object may be passed.
 * @see https://floating-ui.com/docs/offset
 */
const offset = (options, deps) => ({
  ...offset$1(options),
  options: [options, deps]
});

/**
 * Optimizes the visibility of the floating element by shifting it in order to
 * keep it in view when it will overflow the clipping boundary.
 * @see https://floating-ui.com/docs/shift
 */
const shift = (options, deps) => ({
  ...shift$1(options),
  options: [options, deps]
});

/**
 * Built-in `limiter` that will stop `shift()` at a certain point.
 */
const limitShift = (options, deps) => ({
  ...limitShift$1(options),
  options: [options, deps]
});

/**
 * Optimizes the visibility of the floating element by flipping the `placement`
 * in order to keep it in view when the preferred placement(s) will overflow the
 * clipping boundary. Alternative to `autoPlacement`.
 * @see https://floating-ui.com/docs/flip
 */
const flip = (options, deps) => ({
  ...flip$1(options),
  options: [options, deps]
});

/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
const size = (options, deps) => ({
  ...size$1(options),
  options: [options, deps]
});

/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
const hide = (options, deps) => ({
  ...hide$1(options),
  options: [options, deps]
});

/**
 * Provides data to position an inner element of the floating element so that it
 * appears centered to the reference element.
 * This wraps the core `arrow` middleware to allow React refs as the element.
 * @see https://floating-ui.com/docs/arrow
 */
const arrow = (options, deps) => ({
  ...arrow$1(options),
  options: [options, deps]
});

// src/arrow.tsx
var NAME$1 = "Arrow";
var Arrow$2 = React.forwardRef((props, forwardedRef) => {
  const { children, width = 10, height = 5, ...arrowProps } = props;
  return /* @__PURE__ */ jsx(
    Primitive.svg,
    {
      ...arrowProps,
      ref: forwardedRef,
      width,
      height,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: props.asChild ? children : /* @__PURE__ */ jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Arrow$2.displayName = NAME$1;
var Root$2 = Arrow$2;

// packages/react/use-size/src/use-size.tsx
function useSize(element) {
  const [size, setSize] = React.useState(void 0);
  useLayoutEffect2(() => {
    if (element) {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) {
          return;
        }
        if (!entries.length) {
          return;
        }
        const entry = entries[0];
        let width;
        let height;
        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry["borderBoxSize"];
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
          width = borderSize["inlineSize"];
          height = borderSize["blockSize"];
        } else {
          width = element.offsetWidth;
          height = element.offsetHeight;
        }
        setSize({ width, height });
      });
      resizeObserver.observe(element, { box: "border-box" });
      return () => resizeObserver.unobserve(element);
    } else {
      setSize(void 0);
    }
  }, [element]);
  return size;
}

var POPPER_NAME$1 = "Popper";
var [createPopperContext$1, createPopperScope$1] = createContextScope(POPPER_NAME$1);
var [PopperProvider$1, usePopperContext$1] = createPopperContext$1(POPPER_NAME$1);
var Popper$1 = (props) => {
  const { __scopePopper, children } = props;
  const [anchor, setAnchor] = React.useState(null);
  return /* @__PURE__ */ jsx(PopperProvider$1, { scope: __scopePopper, anchor, onAnchorChange: setAnchor, children });
};
Popper$1.displayName = POPPER_NAME$1;
var ANCHOR_NAME$2 = "PopperAnchor";
var PopperAnchor$1 = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopper, virtualRef, ...anchorProps } = props;
    const context = usePopperContext$1(ANCHOR_NAME$2, __scopePopper);
    const ref = React.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    React.useEffect(() => {
      context.onAnchorChange(virtualRef?.current || ref.current);
    });
    return virtualRef ? null : /* @__PURE__ */ jsx(Primitive.div, { ...anchorProps, ref: composedRefs });
  }
);
PopperAnchor$1.displayName = ANCHOR_NAME$2;
var CONTENT_NAME$5 = "PopperContent";
var [PopperContentProvider$1, useContentContext$1] = createPopperContext$1(CONTENT_NAME$5);
var PopperContent$1 = React.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopePopper,
      side = "bottom",
      sideOffset = 0,
      align = "center",
      alignOffset = 0,
      arrowPadding = 0,
      avoidCollisions = true,
      collisionBoundary = [],
      collisionPadding: collisionPaddingProp = 0,
      sticky = "partial",
      hideWhenDetached = false,
      updatePositionStrategy = "optimized",
      onPlaced,
      ...contentProps
    } = props;
    const context = usePopperContext$1(CONTENT_NAME$5, __scopePopper);
    const [content, setContent] = React.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
    const [arrow$1, setArrow] = React.useState(null);
    const arrowSize = useSize(arrow$1);
    const arrowWidth = arrowSize?.width ?? 0;
    const arrowHeight = arrowSize?.height ?? 0;
    const desiredPlacement = side + (align !== "center" ? "-" + align : "");
    const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : { top: 0, right: 0, bottom: 0, left: 0, ...collisionPaddingProp };
    const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
    const hasExplicitBoundaries = boundary.length > 0;
    const detectOverflowOptions = {
      padding: collisionPadding,
      boundary: boundary.filter(isNotNull$1),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: hasExplicitBoundaries
    };
    const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: desiredPlacement,
      whileElementsMounted: (...args) => {
        const cleanup = autoUpdate(...args, {
          animationFrame: updatePositionStrategy === "always"
        });
        return cleanup;
      },
      elements: {
        reference: context.anchor
      },
      middleware: [
        offset({ mainAxis: sideOffset + arrowHeight, alignmentAxis: alignOffset }),
        avoidCollisions && shift({
          mainAxis: true,
          crossAxis: false,
          limiter: sticky === "partial" ? limitShift() : void 0,
          ...detectOverflowOptions
        }),
        avoidCollisions && flip({ ...detectOverflowOptions }),
        size({
          ...detectOverflowOptions,
          apply: ({ elements, rects, availableWidth, availableHeight }) => {
            const { width: anchorWidth, height: anchorHeight } = rects.reference;
            const contentStyle = elements.floating.style;
            contentStyle.setProperty("--radix-popper-available-width", `${availableWidth}px`);
            contentStyle.setProperty("--radix-popper-available-height", `${availableHeight}px`);
            contentStyle.setProperty("--radix-popper-anchor-width", `${anchorWidth}px`);
            contentStyle.setProperty("--radix-popper-anchor-height", `${anchorHeight}px`);
          }
        }),
        arrow$1 && arrow({ element: arrow$1, padding: arrowPadding }),
        transformOrigin$1({ arrowWidth, arrowHeight }),
        hideWhenDetached && hide({ strategy: "referenceHidden", ...detectOverflowOptions })
      ]
    });
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement$1(placement);
    const handlePlaced = useCallbackRef$1(onPlaced);
    useLayoutEffect2(() => {
      if (isPositioned) {
        handlePlaced?.();
      }
    }, [isPositioned, handlePlaced]);
    const arrowX = middlewareData.arrow?.x;
    const arrowY = middlewareData.arrow?.y;
    const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
    const [contentZIndex, setContentZIndex] = React.useState();
    useLayoutEffect2(() => {
      if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
    }, [content]);
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref: refs.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...floatingStyles,
          transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: contentZIndex,
          ["--radix-popper-transform-origin"]: [
            middlewareData.transformOrigin?.x,
            middlewareData.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...middlewareData.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: props.dir,
        children: /* @__PURE__ */ jsx(
          PopperContentProvider$1,
          {
            scope: __scopePopper,
            placedSide,
            onArrowChange: setArrow,
            arrowX,
            arrowY,
            shouldHideArrow: cannotCenterArrow,
            children: /* @__PURE__ */ jsx(
              Primitive.div,
              {
                "data-side": placedSide,
                "data-align": placedAlign,
                ...contentProps,
                ref: composedRefs,
                style: {
                  ...contentProps.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: !isPositioned ? "none" : void 0
                }
              }
            )
          }
        )
      }
    );
  }
);
PopperContent$1.displayName = CONTENT_NAME$5;
var ARROW_NAME$3 = "PopperArrow";
var OPPOSITE_SIDE$1 = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
var PopperArrow$1 = React.forwardRef(function PopperArrow2(props, forwardedRef) {
  const { __scopePopper, ...arrowProps } = props;
  const contentContext = useContentContext$1(ARROW_NAME$3, __scopePopper);
  const baseSide = OPPOSITE_SIDE$1[contentContext.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ jsx(
      "span",
      {
        ref: contentContext.onArrowChange,
        style: {
          position: "absolute",
          left: contentContext.arrowX,
          top: contentContext.arrowY,
          [baseSide]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[contentContext.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: `rotate(180deg)`,
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[contentContext.placedSide],
          visibility: contentContext.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ jsx(
          Root$2,
          {
            ...arrowProps,
            ref: forwardedRef,
            style: {
              ...arrowProps.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
PopperArrow$1.displayName = ARROW_NAME$3;
function isNotNull$1(value) {
  return value !== null;
}
var transformOrigin$1 = (options) => ({
  name: "transformOrigin",
  options,
  fn(data) {
    const { placement, rects, middlewareData } = data;
    const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
    const isArrowHidden = cannotCenterArrow;
    const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
    const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement$1(placement);
    const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[placedAlign];
    const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
    const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
    let x = "";
    let y = "";
    if (placedSide === "bottom") {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${-arrowHeight}px`;
    } else if (placedSide === "top") {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${rects.floating.height + arrowHeight}px`;
    } else if (placedSide === "right") {
      x = `${-arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    } else if (placedSide === "left") {
      x = `${rects.floating.width + arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    }
    return { data: { x, y } };
  }
});
function getSideAndAlignFromPlacement$1(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
var Root2$4 = Popper$1;
var Anchor$1 = PopperAnchor$1;
var Content$3 = PopperContent$1;
var Arrow$1 = PopperArrow$1;

var PORTAL_NAME$3 = "Portal";
var Portal$3 = React.forwardRef((props, forwardedRef) => {
  const { container: containerProp, ...portalProps } = props;
  const [mounted, setMounted] = React.useState(false);
  useLayoutEffect2(() => setMounted(true), []);
  const container = containerProp || mounted && globalThis?.document?.body;
  return container ? ReactDOM__default.createPortal(/* @__PURE__ */ jsx(Primitive.div, { ...portalProps, ref: forwardedRef }), container) : null;
});
Portal$3.displayName = PORTAL_NAME$3;

// packages/react/use-previous/src/use-previous.tsx
function usePrevious(value) {
  const ref = React.useRef({ value, previous: value });
  return React.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}

// src/visually-hidden.tsx
var VISUALLY_HIDDEN_STYLES = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
});
var NAME = "VisuallyHidden";
var VisuallyHidden = React.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsx(
      Primitive.span,
      {
        ...props,
        ref: forwardedRef,
        style: { ...VISUALLY_HIDDEN_STYLES, ...props.style }
      }
    );
  }
);
VisuallyHidden.displayName = NAME;

var getDefaultParent = function (originalTarget) {
    if (typeof document === 'undefined') {
        return null;
    }
    var sampleTarget = Array.isArray(originalTarget) ? originalTarget[0] : originalTarget;
    return sampleTarget.ownerDocument.body;
};
var counterMap = new WeakMap();
var uncontrolledNodes = new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function (node) {
    return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function (parent, targets) {
    return targets
        .map(function (target) {
        if (parent.contains(target)) {
            return target;
        }
        var correctedTarget = unwrapHost(target);
        if (correctedTarget && parent.contains(correctedTarget)) {
            return correctedTarget;
        }
        console.error('aria-hidden', target, 'in not contained inside', parent, '. Doing nothing');
        return null;
    })
        .filter(function (x) { return Boolean(x); });
};
/**
 * Marks everything except given node(or nodes) as aria-hidden
 * @param {Element | Element[]} originalTarget - elements to keep on the page
 * @param [parentNode] - top element, defaults to document.body
 * @param {String} [markerName] - a special attribute to mark every node
 * @param {String} [controlAttribute] - html Attribute to control
 * @return {Undo} undo command
 */
var applyAttributeToOthers = function (originalTarget, parentNode, markerName, controlAttribute) {
    var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
    if (!markerMap[markerName]) {
        markerMap[markerName] = new WeakMap();
    }
    var markerCounter = markerMap[markerName];
    var hiddenNodes = [];
    var elementsToKeep = new Set();
    var elementsToStop = new Set(targets);
    var keep = function (el) {
        if (!el || elementsToKeep.has(el)) {
            return;
        }
        elementsToKeep.add(el);
        keep(el.parentNode);
    };
    targets.forEach(keep);
    var deep = function (parent) {
        if (!parent || elementsToStop.has(parent)) {
            return;
        }
        Array.prototype.forEach.call(parent.children, function (node) {
            if (elementsToKeep.has(node)) {
                deep(node);
            }
            else {
                try {
                    var attr = node.getAttribute(controlAttribute);
                    var alreadyHidden = attr !== null && attr !== 'false';
                    var counterValue = (counterMap.get(node) || 0) + 1;
                    var markerValue = (markerCounter.get(node) || 0) + 1;
                    counterMap.set(node, counterValue);
                    markerCounter.set(node, markerValue);
                    hiddenNodes.push(node);
                    if (counterValue === 1 && alreadyHidden) {
                        uncontrolledNodes.set(node, true);
                    }
                    if (markerValue === 1) {
                        node.setAttribute(markerName, 'true');
                    }
                    if (!alreadyHidden) {
                        node.setAttribute(controlAttribute, 'true');
                    }
                }
                catch (e) {
                    console.error('aria-hidden: cannot operate on ', node, e);
                }
            }
        });
    };
    deep(parentNode);
    elementsToKeep.clear();
    lockCount++;
    return function () {
        hiddenNodes.forEach(function (node) {
            var counterValue = counterMap.get(node) - 1;
            var markerValue = markerCounter.get(node) - 1;
            counterMap.set(node, counterValue);
            markerCounter.set(node, markerValue);
            if (!counterValue) {
                if (!uncontrolledNodes.has(node)) {
                    node.removeAttribute(controlAttribute);
                }
                uncontrolledNodes.delete(node);
            }
            if (!markerValue) {
                node.removeAttribute(markerName);
            }
        });
        lockCount--;
        if (!lockCount) {
            // clear
            counterMap = new WeakMap();
            counterMap = new WeakMap();
            uncontrolledNodes = new WeakMap();
            markerMap = {};
        }
    };
};
/**
 * Marks everything except given node(or nodes) as aria-hidden
 * @param {Element | Element[]} originalTarget - elements to keep on the page
 * @param [parentNode] - top element, defaults to document.body
 * @param {String} [markerName] - a special attribute to mark every node
 * @return {Undo} undo command
 */
var hideOthers = function (originalTarget, parentNode, markerName) {
    if (markerName === void 0) { markerName = 'data-aria-hidden'; }
    var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
    var activeParentNode = getDefaultParent(originalTarget);
    if (!activeParentNode) {
        return function () { return null; };
    }
    // we should not hide aria-live elements - https://github.com/theKashey/aria-hidden/issues/10
    // and script elements, as they have no impact on accessibility.
    targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll('[aria-live], script')));
    return applyAttributeToOthers(targets, activeParentNode, markerName, 'aria-hidden');
};

var zeroRightClassName = 'right-scroll-bar-position';
var fullWidthClassName = 'width-before-scroll-bar';
var noScrollbarsClassName = 'with-scroll-bars-hidden';
/**
 * Name of a CSS variable containing the amount of "hidden" scrollbar
 * ! might be undefined ! use will fallback!
 */
var removedBarSizeVariable = '--removed-body-scroll-bar-size';

/**
 * Assigns a value for a given ref, no matter of the ref format
 * @param {RefObject} ref - a callback function or ref object
 * @param value - a new value
 *
 * @see https://github.com/theKashey/use-callback-ref#assignref
 * @example
 * const refObject = useRef();
 * const refFn = (ref) => {....}
 *
 * assignRef(refObject, "refValue");
 * assignRef(refFn, "refValue");
 */
function assignRef(ref, value) {
    if (typeof ref === 'function') {
        ref(value);
    }
    else if (ref) {
        ref.current = value;
    }
    return ref;
}

/**
 * creates a MutableRef with ref change callback
 * @param initialValue - initial ref value
 * @param {Function} callback - a callback to run when value changes
 *
 * @example
 * const ref = useCallbackRef(0, (newValue, oldValue) => console.log(oldValue, '->', newValue);
 * ref.current = 1;
 * // prints 0 -> 1
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 * @see https://github.com/theKashey/use-callback-ref#usecallbackref---to-replace-reactuseref
 * @returns {MutableRefObject}
 */
function useCallbackRef(initialValue, callback) {
    var ref = useState(function () { return ({
        // value
        value: initialValue,
        // last callback
        callback: callback,
        // "memoized" public interface
        facade: {
            get current() {
                return ref.value;
            },
            set current(value) {
                var last = ref.value;
                if (last !== value) {
                    ref.value = value;
                    ref.callback(value, last);
                }
            },
        },
    }); })[0];
    // update callback
    ref.callback = callback;
    return ref.facade;
}

var useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
var currentValues = new WeakMap();
/**
 * Merges two or more refs together providing a single interface to set their value
 * @param {RefObject|Ref} refs
 * @returns {MutableRefObject} - a new ref, which translates all changes to {refs}
 *
 * @see {@link mergeRefs} a version without buit-in memoization
 * @see https://github.com/theKashey/use-callback-ref#usemergerefs
 * @example
 * const Component = React.forwardRef((props, ref) => {
 *   const ownRef = useRef();
 *   const domRef = useMergeRefs([ref, ownRef]); // 👈 merge together
 *   return <div ref={domRef}>...</div>
 * }
 */
function useMergeRefs(refs, defaultValue) {
    var callbackRef = useCallbackRef(null, function (newValue) {
        return refs.forEach(function (ref) { return assignRef(ref, newValue); });
    });
    // handle refs changes - added or removed
    useIsomorphicLayoutEffect(function () {
        var oldValue = currentValues.get(callbackRef);
        if (oldValue) {
            var prevRefs_1 = new Set(oldValue);
            var nextRefs_1 = new Set(refs);
            var current_1 = callbackRef.current;
            prevRefs_1.forEach(function (ref) {
                if (!nextRefs_1.has(ref)) {
                    assignRef(ref, null);
                }
            });
            nextRefs_1.forEach(function (ref) {
                if (!prevRefs_1.has(ref)) {
                    assignRef(ref, current_1);
                }
            });
        }
        currentValues.set(callbackRef, refs);
    }, [refs]);
    return callbackRef;
}

function ItoI(a) {
    return a;
}
function innerCreateMedium(defaults, middleware) {
    if (middleware === void 0) { middleware = ItoI; }
    var buffer = [];
    var assigned = false;
    var medium = {
        read: function () {
            if (assigned) {
                throw new Error('Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.');
            }
            if (buffer.length) {
                return buffer[buffer.length - 1];
            }
            return defaults;
        },
        useMedium: function (data) {
            var item = middleware(data, assigned);
            buffer.push(item);
            return function () {
                buffer = buffer.filter(function (x) { return x !== item; });
            };
        },
        assignSyncMedium: function (cb) {
            assigned = true;
            while (buffer.length) {
                var cbs = buffer;
                buffer = [];
                cbs.forEach(cb);
            }
            buffer = {
                push: function (x) { return cb(x); },
                filter: function () { return buffer; },
            };
        },
        assignMedium: function (cb) {
            assigned = true;
            var pendingQueue = [];
            if (buffer.length) {
                var cbs = buffer;
                buffer = [];
                cbs.forEach(cb);
                pendingQueue = buffer;
            }
            var executeQueue = function () {
                var cbs = pendingQueue;
                pendingQueue = [];
                cbs.forEach(cb);
            };
            var cycle = function () { return Promise.resolve().then(executeQueue); };
            cycle();
            buffer = {
                push: function (x) {
                    pendingQueue.push(x);
                    cycle();
                },
                filter: function (filter) {
                    pendingQueue = pendingQueue.filter(filter);
                    return buffer;
                },
            };
        },
    };
    return medium;
}
// eslint-disable-next-line @typescript-eslint/ban-types
function createSidecarMedium(options) {
    if (options === void 0) { options = {}; }
    var medium = innerCreateMedium(null);
    medium.options = __assign({ async: true, ssr: false }, options);
    return medium;
}

var SideCar$1 = function (_a) {
    var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
    if (!sideCar) {
        throw new Error('Sidecar: please provide `sideCar` property to import the right car');
    }
    var Target = sideCar.read();
    if (!Target) {
        throw new Error('Sidecar medium not found');
    }
    return React.createElement(Target, __assign({}, rest));
};
SideCar$1.isSideCarExport = true;
function exportSidecar(medium, exported) {
    medium.useMedium(exported);
    return SideCar$1;
}

var effectCar = createSidecarMedium();

var nothing = function () {
    return;
};
/**
 * Removes scrollbar from the page and contain the scroll within the Lock
 */
var RemoveScroll = React.forwardRef(function (props, parentRef) {
    var ref = React.useRef(null);
    var _a = React.useState({
        onScrollCapture: nothing,
        onWheelCapture: nothing,
        onTouchMoveCapture: nothing,
    }), callbacks = _a[0], setCallbacks = _a[1];
    var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? 'div' : _b, gapMode = props.gapMode, rest = __rest(props, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]);
    var SideCar = sideCar;
    var containerRef = useMergeRefs([ref, parentRef]);
    var containerProps = __assign(__assign({}, rest), callbacks);
    return (React.createElement(React.Fragment, null,
        enabled && (React.createElement(SideCar, { sideCar: effectCar, removeScrollBar: removeScrollBar, shards: shards, noRelative: noRelative, noIsolation: noIsolation, inert: inert, setCallbacks: setCallbacks, allowPinchZoom: !!allowPinchZoom, lockRef: ref, gapMode: gapMode })),
        forwardProps ? (React.cloneElement(React.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef }))) : (React.createElement(Container, __assign({}, containerProps, { className: className, ref: containerRef }), children))));
});
RemoveScroll.defaultProps = {
    enabled: true,
    removeScrollBar: true,
    inert: false,
};
RemoveScroll.classNames = {
    fullWidth: fullWidthClassName,
    zeroRight: zeroRightClassName,
};

var getNonce = function () {
    if (typeof __webpack_nonce__ !== 'undefined') {
        return __webpack_nonce__;
    }
    return undefined;
};

function makeStyleTag() {
    if (!document)
        return null;
    var tag = document.createElement('style');
    tag.type = 'text/css';
    var nonce = getNonce();
    if (nonce) {
        tag.setAttribute('nonce', nonce);
    }
    return tag;
}
function injectStyles(tag, css) {
    // @ts-ignore
    if (tag.styleSheet) {
        // @ts-ignore
        tag.styleSheet.cssText = css;
    }
    else {
        tag.appendChild(document.createTextNode(css));
    }
}
function insertStyleTag(tag) {
    var head = document.head || document.getElementsByTagName('head')[0];
    head.appendChild(tag);
}
var stylesheetSingleton = function () {
    var counter = 0;
    var stylesheet = null;
    return {
        add: function (style) {
            if (counter == 0) {
                if ((stylesheet = makeStyleTag())) {
                    injectStyles(stylesheet, style);
                    insertStyleTag(stylesheet);
                }
            }
            counter++;
        },
        remove: function () {
            counter--;
            if (!counter && stylesheet) {
                stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
                stylesheet = null;
            }
        },
    };
};

/**
 * creates a hook to control style singleton
 * @see {@link styleSingleton} for a safer component version
 * @example
 * ```tsx
 * const useStyle = styleHookSingleton();
 * ///
 * useStyle('body { overflow: hidden}');
 */
var styleHookSingleton = function () {
    var sheet = stylesheetSingleton();
    return function (styles, isDynamic) {
        React.useEffect(function () {
            sheet.add(styles);
            return function () {
                sheet.remove();
            };
        }, [styles && isDynamic]);
    };
};

/**
 * create a Component to add styles on demand
 * - styles are added when first instance is mounted
 * - styles are removed when the last instance is unmounted
 * - changing styles in runtime does nothing unless dynamic is set. But with multiple components that can lead to the undefined behavior
 */
var styleSingleton = function () {
    var useStyle = styleHookSingleton();
    var Sheet = function (_a) {
        var styles = _a.styles, dynamic = _a.dynamic;
        useStyle(styles, dynamic);
        return null;
    };
    return Sheet;
};

var zeroGap = {
    left: 0,
    top: 0,
    right: 0,
    gap: 0,
};
var parse = function (x) { return parseInt(x || '', 10) || 0; };
var getOffset = function (gapMode) {
    var cs = window.getComputedStyle(document.body);
    var left = cs[gapMode === 'padding' ? 'paddingLeft' : 'marginLeft'];
    var top = cs[gapMode === 'padding' ? 'paddingTop' : 'marginTop'];
    var right = cs[gapMode === 'padding' ? 'paddingRight' : 'marginRight'];
    return [parse(left), parse(top), parse(right)];
};
var getGapWidth = function (gapMode) {
    if (gapMode === void 0) { gapMode = 'margin'; }
    if (typeof window === 'undefined') {
        return zeroGap;
    }
    var offsets = getOffset(gapMode);
    var documentWidth = document.documentElement.clientWidth;
    var windowWidth = window.innerWidth;
    return {
        left: offsets[0],
        top: offsets[1],
        right: offsets[2],
        gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0]),
    };
};

var Style = styleSingleton();
var lockAttribute = 'data-scroll-locked';
// important tip - once we measure scrollBar width and remove them
// we could not repeat this operation
// thus we are using style-singleton - only the first "yet correct" style will be applied.
var getStyles = function (_a, allowRelative, gapMode, important) {
    var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
    if (gapMode === void 0) { gapMode = 'margin'; }
    return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
        allowRelative && "position: relative ".concat(important, ";"),
        gapMode === 'margin' &&
            "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
        gapMode === 'padding' && "padding-right: ".concat(gap, "px ").concat(important, ";"),
    ]
        .filter(Boolean)
        .join(''), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
};
var getCurrentUseCounter = function () {
    var counter = parseInt(document.body.getAttribute(lockAttribute) || '0', 10);
    return isFinite(counter) ? counter : 0;
};
var useLockAttribute = function () {
    React.useEffect(function () {
        document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
        return function () {
            var newCounter = getCurrentUseCounter() - 1;
            if (newCounter <= 0) {
                document.body.removeAttribute(lockAttribute);
            }
            else {
                document.body.setAttribute(lockAttribute, newCounter.toString());
            }
        };
    }, []);
};
/**
 * Removes page scrollbar and blocks page scroll when mounted
 */
var RemoveScrollBar = function (_a) {
    var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? 'margin' : _b;
    useLockAttribute();
    /*
     gap will be measured on every component mount
     however it will be used only by the "first" invocation
     due to singleton nature of <Style
     */
    var gap = React.useMemo(function () { return getGapWidth(gapMode); }, [gapMode]);
    return React.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? '!important' : '') });
};

var passiveSupported = false;
if (typeof window !== 'undefined') {
    try {
        var options = Object.defineProperty({}, 'passive', {
            get: function () {
                passiveSupported = true;
                return true;
            },
        });
        // @ts-ignore
        window.addEventListener('test', options, options);
        // @ts-ignore
        window.removeEventListener('test', options, options);
    }
    catch (err) {
        passiveSupported = false;
    }
}
var nonPassive = passiveSupported ? { passive: false } : false;

var alwaysContainsScroll = function (node) {
    // textarea will always _contain_ scroll inside self. It only can be hidden
    return node.tagName === 'TEXTAREA';
};
var elementCanBeScrolled = function (node, overflow) {
    if (!(node instanceof Element)) {
        return false;
    }
    var styles = window.getComputedStyle(node);
    return (
    // not-not-scrollable
    styles[overflow] !== 'hidden' &&
        // contains scroll inside self
        !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === 'visible'));
};
var elementCouldBeVScrolled = function (node) { return elementCanBeScrolled(node, 'overflowY'); };
var elementCouldBeHScrolled = function (node) { return elementCanBeScrolled(node, 'overflowX'); };
var locationCouldBeScrolled = function (axis, node) {
    var ownerDocument = node.ownerDocument;
    var current = node;
    do {
        // Skip over shadow root
        if (typeof ShadowRoot !== 'undefined' && current instanceof ShadowRoot) {
            current = current.host;
        }
        var isScrollable = elementCouldBeScrolled(axis, current);
        if (isScrollable) {
            var _a = getScrollVariables(axis, current), scrollHeight = _a[1], clientHeight = _a[2];
            if (scrollHeight > clientHeight) {
                return true;
            }
        }
        current = current.parentNode;
    } while (current && current !== ownerDocument.body);
    return false;
};
var getVScrollVariables = function (_a) {
    var scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
    return [
        scrollTop,
        scrollHeight,
        clientHeight,
    ];
};
var getHScrollVariables = function (_a) {
    var scrollLeft = _a.scrollLeft, scrollWidth = _a.scrollWidth, clientWidth = _a.clientWidth;
    return [
        scrollLeft,
        scrollWidth,
        clientWidth,
    ];
};
var elementCouldBeScrolled = function (axis, node) {
    return axis === 'v' ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function (axis, node) {
    return axis === 'v' ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function (axis, direction) {
    /**
     * If the element's direction is rtl (right-to-left), then scrollLeft is 0 when the scrollbar is at its rightmost position,
     * and then increasingly negative as you scroll towards the end of the content.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft
     */
    return axis === 'h' && direction === 'rtl' ? -1 : 1;
};
var handleScroll = function (axis, endTarget, event, sourceDelta, noOverscroll) {
    var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
    var delta = directionFactor * sourceDelta;
    // find scrollable target
    var target = event.target;
    var targetInLock = endTarget.contains(target);
    var shouldCancelScroll = false;
    var isDeltaPositive = delta > 0;
    var availableScroll = 0;
    var availableScrollTop = 0;
    do {
        if (!target) {
            break;
        }
        var _a = getScrollVariables(axis, target), position = _a[0], scroll_1 = _a[1], capacity = _a[2];
        var elementScroll = scroll_1 - capacity - directionFactor * position;
        if (position || elementScroll) {
            if (elementCouldBeScrolled(axis, target)) {
                availableScroll += elementScroll;
                availableScrollTop += position;
            }
        }
        var parent_1 = target.parentNode;
        // we will "bubble" from ShadowDom in case we are, or just to the parent in normal case
        // this is the same logic used in focus-lock
        target = (parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1);
    } while (
    // portaled content
    (!targetInLock && target !== document.body) ||
        // self content
        (targetInLock && (endTarget.contains(target) || endTarget === target)));
    // handle epsilon around 0 (non standard zoom levels)
    if (isDeltaPositive &&
        ((Math.abs(availableScroll) < 1) || (false))) {
        shouldCancelScroll = true;
    }
    else if (!isDeltaPositive &&
        ((Math.abs(availableScrollTop) < 1) || (false))) {
        shouldCancelScroll = true;
    }
    return shouldCancelScroll;
};

var getTouchXY = function (event) {
    return 'changedTouches' in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function (event) { return [event.deltaX, event.deltaY]; };
var extractRef = function (ref) {
    return ref && 'current' in ref ? ref.current : ref;
};
var deltaCompare = function (x, y) { return x[0] === y[0] && x[1] === y[1]; };
var generateStyle = function (id) { return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n"); };
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
    var shouldPreventQueue = React.useRef([]);
    var touchStartRef = React.useRef([0, 0]);
    var activeAxis = React.useRef();
    var id = React.useState(idCounter++)[0];
    var Style = React.useState(styleSingleton)[0];
    var lastProps = React.useRef(props);
    React.useEffect(function () {
        lastProps.current = props;
    }, [props]);
    React.useEffect(function () {
        if (props.inert) {
            document.body.classList.add("block-interactivity-".concat(id));
            var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
            allow_1.forEach(function (el) { return el.classList.add("allow-interactivity-".concat(id)); });
            return function () {
                document.body.classList.remove("block-interactivity-".concat(id));
                allow_1.forEach(function (el) { return el.classList.remove("allow-interactivity-".concat(id)); });
            };
        }
        return;
    }, [props.inert, props.lockRef.current, props.shards]);
    var shouldCancelEvent = React.useCallback(function (event, parent) {
        if (('touches' in event && event.touches.length === 2) || (event.type === 'wheel' && event.ctrlKey)) {
            return !lastProps.current.allowPinchZoom;
        }
        var touch = getTouchXY(event);
        var touchStart = touchStartRef.current;
        var deltaX = 'deltaX' in event ? event.deltaX : touchStart[0] - touch[0];
        var deltaY = 'deltaY' in event ? event.deltaY : touchStart[1] - touch[1];
        var currentAxis;
        var target = event.target;
        var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? 'h' : 'v';
        // allow horizontal touch move on Range inputs. They will not cause any scroll
        if ('touches' in event && moveDirection === 'h' && target.type === 'range') {
            return false;
        }
        var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
        if (!canBeScrolledInMainDirection) {
            return true;
        }
        if (canBeScrolledInMainDirection) {
            currentAxis = moveDirection;
        }
        else {
            currentAxis = moveDirection === 'v' ? 'h' : 'v';
            canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
            // other axis might be not scrollable
        }
        if (!canBeScrolledInMainDirection) {
            return false;
        }
        if (!activeAxis.current && 'changedTouches' in event && (deltaX || deltaY)) {
            activeAxis.current = currentAxis;
        }
        if (!currentAxis) {
            return true;
        }
        var cancelingAxis = activeAxis.current || currentAxis;
        return handleScroll(cancelingAxis, parent, event, cancelingAxis === 'h' ? deltaX : deltaY);
    }, []);
    var shouldPrevent = React.useCallback(function (_event) {
        var event = _event;
        if (!lockStack.length || lockStack[lockStack.length - 1] !== Style) {
            // not the last active
            return;
        }
        var delta = 'deltaY' in event ? getDeltaXY(event) : getTouchXY(event);
        var sourceEvent = shouldPreventQueue.current.filter(function (e) { return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta); })[0];
        // self event, and should be canceled
        if (sourceEvent && sourceEvent.should) {
            if (event.cancelable) {
                event.preventDefault();
            }
            return;
        }
        // outside or shard event
        if (!sourceEvent) {
            var shardNodes = (lastProps.current.shards || [])
                .map(extractRef)
                .filter(Boolean)
                .filter(function (node) { return node.contains(event.target); });
            var shouldStop = shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation;
            if (shouldStop) {
                if (event.cancelable) {
                    event.preventDefault();
                }
            }
        }
    }, []);
    var shouldCancel = React.useCallback(function (name, delta, target, should) {
        var event = { name: name, delta: delta, target: target, should: should, shadowParent: getOutermostShadowParent(target) };
        shouldPreventQueue.current.push(event);
        setTimeout(function () {
            shouldPreventQueue.current = shouldPreventQueue.current.filter(function (e) { return e !== event; });
        }, 1);
    }, []);
    var scrollTouchStart = React.useCallback(function (event) {
        touchStartRef.current = getTouchXY(event);
        activeAxis.current = undefined;
    }, []);
    var scrollWheel = React.useCallback(function (event) {
        shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
    }, []);
    var scrollTouchMove = React.useCallback(function (event) {
        shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
    }, []);
    React.useEffect(function () {
        lockStack.push(Style);
        props.setCallbacks({
            onScrollCapture: scrollWheel,
            onWheelCapture: scrollWheel,
            onTouchMoveCapture: scrollTouchMove,
        });
        document.addEventListener('wheel', shouldPrevent, nonPassive);
        document.addEventListener('touchmove', shouldPrevent, nonPassive);
        document.addEventListener('touchstart', scrollTouchStart, nonPassive);
        return function () {
            lockStack = lockStack.filter(function (inst) { return inst !== Style; });
            document.removeEventListener('wheel', shouldPrevent, nonPassive);
            document.removeEventListener('touchmove', shouldPrevent, nonPassive);
            document.removeEventListener('touchstart', scrollTouchStart, nonPassive);
        };
    }, []);
    var removeScrollBar = props.removeScrollBar, inert = props.inert;
    return (React.createElement(React.Fragment, null,
        inert ? React.createElement(Style, { styles: generateStyle(id) }) : null,
        removeScrollBar ? React.createElement(RemoveScrollBar, { noRelative: props.noRelative, gapMode: props.gapMode }) : null));
}
function getOutermostShadowParent(node) {
    var shadowParent = null;
    while (node !== null) {
        if (node instanceof ShadowRoot) {
            shadowParent = node.host;
            node = node.host;
        }
        node = node.parentNode;
    }
    return shadowParent;
}

var SideCar = exportSidecar(effectCar, RemoveScrollSideCar);

var ReactRemoveScroll = React.forwardRef(function (props, ref) { return (React.createElement(RemoveScroll, __assign({}, props, { ref: ref, sideCar: SideCar }))); });
ReactRemoveScroll.classNames = RemoveScroll.classNames;

var OPEN_KEYS = [" ", "Enter", "ArrowUp", "ArrowDown"];
var SELECTION_KEYS = [" ", "Enter"];
var SELECT_NAME = "Select";
var [Collection$1, useCollection$1, createCollectionScope$1] = createCollection(SELECT_NAME);
var [createSelectContext, createSelectScope] = createContextScope(SELECT_NAME, [
  createCollectionScope$1,
  createPopperScope$1
]);
var usePopperScope$1 = createPopperScope$1();
var [SelectProvider, useSelectContext] = createSelectContext(SELECT_NAME);
var [SelectNativeOptionsProvider, useSelectNativeOptionsContext] = createSelectContext(SELECT_NAME);
var Select$1 = (props) => {
  const {
    __scopeSelect,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    value: valueProp,
    defaultValue,
    onValueChange,
    dir,
    name,
    autoComplete,
    disabled,
    required,
    form
  } = props;
  const popperScope = usePopperScope$1(__scopeSelect);
  const [trigger, setTrigger] = React.useState(null);
  const [valueNode, setValueNode] = React.useState(null);
  const [valueNodeHasChildren, setValueNodeHasChildren] = React.useState(false);
  const direction = useDirection(dir);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: SELECT_NAME
  });
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
    caller: SELECT_NAME
  });
  const triggerPointerDownPosRef = React.useRef(null);
  const isFormControl = trigger ? form || !!trigger.closest("form") : true;
  const [nativeOptionsSet, setNativeOptionsSet] = React.useState(/* @__PURE__ */ new Set());
  const nativeSelectKey = Array.from(nativeOptionsSet).map((option) => option.props.value).join(";");
  return /* @__PURE__ */ jsx(Root2$4, { ...popperScope, children: /* @__PURE__ */ jsxs(
    SelectProvider,
    {
      required,
      scope: __scopeSelect,
      trigger,
      onTriggerChange: setTrigger,
      valueNode,
      onValueNodeChange: setValueNode,
      valueNodeHasChildren,
      onValueNodeHasChildrenChange: setValueNodeHasChildren,
      contentId: useId(),
      value,
      onValueChange: setValue,
      open,
      onOpenChange: setOpen,
      dir: direction,
      triggerPointerDownPosRef,
      disabled,
      children: [
        /* @__PURE__ */ jsx(Collection$1.Provider, { scope: __scopeSelect, children: /* @__PURE__ */ jsx(
          SelectNativeOptionsProvider,
          {
            scope: props.__scopeSelect,
            onNativeOptionAdd: React.useCallback((option) => {
              setNativeOptionsSet((prev) => new Set(prev).add(option));
            }, []),
            onNativeOptionRemove: React.useCallback((option) => {
              setNativeOptionsSet((prev) => {
                const optionsSet = new Set(prev);
                optionsSet.delete(option);
                return optionsSet;
              });
            }, []),
            children
          }
        ) }),
        isFormControl ? /* @__PURE__ */ jsxs(
          SelectBubbleInput,
          {
            "aria-hidden": true,
            required,
            tabIndex: -1,
            name,
            autoComplete,
            value,
            onChange: (event) => setValue(event.target.value),
            disabled,
            form,
            children: [
              value === void 0 ? /* @__PURE__ */ jsx("option", { value: "" }) : null,
              Array.from(nativeOptionsSet)
            ]
          },
          nativeSelectKey
        ) : null
      ]
    }
  ) });
};
Select$1.displayName = SELECT_NAME;
var TRIGGER_NAME$3 = "SelectTrigger";
var SelectTrigger = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, disabled = false, ...triggerProps } = props;
    const popperScope = usePopperScope$1(__scopeSelect);
    const context = useSelectContext(TRIGGER_NAME$3, __scopeSelect);
    const isDisabled = context.disabled || disabled;
    const composedRefs = useComposedRefs(forwardedRef, context.onTriggerChange);
    const getItems = useCollection$1(__scopeSelect);
    const pointerTypeRef = React.useRef("touch");
    const [searchRef, handleTypeaheadSearch, resetTypeahead] = useTypeaheadSearch((search) => {
      const enabledItems = getItems().filter((item) => !item.disabled);
      const currentItem = enabledItems.find((item) => item.value === context.value);
      const nextItem = findNextItem(enabledItems, search, currentItem);
      if (nextItem !== void 0) {
        context.onValueChange(nextItem.value);
      }
    });
    const handleOpen = (pointerEvent) => {
      if (!isDisabled) {
        context.onOpenChange(true);
        resetTypeahead();
      }
      if (pointerEvent) {
        context.triggerPointerDownPosRef.current = {
          x: Math.round(pointerEvent.pageX),
          y: Math.round(pointerEvent.pageY)
        };
      }
    };
    return /* @__PURE__ */ jsx(Anchor$1, { asChild: true, ...popperScope, children: /* @__PURE__ */ jsx(
      Primitive.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": context.contentId,
        "aria-expanded": context.open,
        "aria-required": context.required,
        "aria-autocomplete": "none",
        dir: context.dir,
        "data-state": context.open ? "open" : "closed",
        disabled: isDisabled,
        "data-disabled": isDisabled ? "" : void 0,
        "data-placeholder": shouldShowPlaceholder(context.value) ? "" : void 0,
        ...triggerProps,
        ref: composedRefs,
        onClick: composeEventHandlers$1(triggerProps.onClick, (event) => {
          event.currentTarget.focus();
          if (pointerTypeRef.current !== "mouse") {
            handleOpen(event);
          }
        }),
        onPointerDown: composeEventHandlers$1(triggerProps.onPointerDown, (event) => {
          pointerTypeRef.current = event.pointerType;
          const target = event.target;
          if (target.hasPointerCapture(event.pointerId)) {
            target.releasePointerCapture(event.pointerId);
          }
          if (event.button === 0 && event.ctrlKey === false && event.pointerType === "mouse") {
            handleOpen(event);
            event.preventDefault();
          }
        }),
        onKeyDown: composeEventHandlers$1(triggerProps.onKeyDown, (event) => {
          const isTypingAhead = searchRef.current !== "";
          const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
          if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
          if (isTypingAhead && event.key === " ") return;
          if (OPEN_KEYS.includes(event.key)) {
            handleOpen();
            event.preventDefault();
          }
        })
      }
    ) });
  }
);
SelectTrigger.displayName = TRIGGER_NAME$3;
var VALUE_NAME = "SelectValue";
var SelectValue = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, className, style, children, placeholder = "", ...valueProps } = props;
    const context = useSelectContext(VALUE_NAME, __scopeSelect);
    const { onValueNodeHasChildrenChange } = context;
    const hasChildren = children !== void 0;
    const composedRefs = useComposedRefs(forwardedRef, context.onValueNodeChange);
    useLayoutEffect2(() => {
      onValueNodeHasChildrenChange(hasChildren);
    }, [onValueNodeHasChildrenChange, hasChildren]);
    return /* @__PURE__ */ jsx(
      Primitive.span,
      {
        ...valueProps,
        ref: composedRefs,
        style: { pointerEvents: "none" },
        children: shouldShowPlaceholder(context.value) ? /* @__PURE__ */ jsx(Fragment, { children: placeholder }) : children
      }
    );
  }
);
SelectValue.displayName = VALUE_NAME;
var ICON_NAME = "SelectIcon";
var SelectIcon = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, children, ...iconProps } = props;
    return /* @__PURE__ */ jsx(Primitive.span, { "aria-hidden": true, ...iconProps, ref: forwardedRef, children: children || "\u25BC" });
  }
);
SelectIcon.displayName = ICON_NAME;
var PORTAL_NAME$2 = "SelectPortal";
var SelectPortal = (props) => {
  return /* @__PURE__ */ jsx(Portal$3, { asChild: true, ...props });
};
SelectPortal.displayName = PORTAL_NAME$2;
var CONTENT_NAME$4 = "SelectContent";
var SelectContent = React.forwardRef(
  (props, forwardedRef) => {
    const context = useSelectContext(CONTENT_NAME$4, props.__scopeSelect);
    const [fragment, setFragment] = React.useState();
    useLayoutEffect2(() => {
      setFragment(new DocumentFragment());
    }, []);
    if (!context.open) {
      const frag = fragment;
      return frag ? ReactDOM.createPortal(
        /* @__PURE__ */ jsx(SelectContentProvider, { scope: props.__scopeSelect, children: /* @__PURE__ */ jsx(Collection$1.Slot, { scope: props.__scopeSelect, children: /* @__PURE__ */ jsx("div", { children: props.children }) }) }),
        frag
      ) : null;
    }
    return /* @__PURE__ */ jsx(SelectContentImpl, { ...props, ref: forwardedRef });
  }
);
SelectContent.displayName = CONTENT_NAME$4;
var CONTENT_MARGIN = 10;
var [SelectContentProvider, useSelectContentContext] = createSelectContext(CONTENT_NAME$4);
var CONTENT_IMPL_NAME = "SelectContentImpl";
var Slot$2 = createSlot("SelectContent.RemoveScroll");
var SelectContentImpl = React.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSelect,
      position = "item-aligned",
      onCloseAutoFocus,
      onEscapeKeyDown,
      onPointerDownOutside,
      //
      // PopperContent props
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      avoidCollisions,
      //
      ...contentProps
    } = props;
    const context = useSelectContext(CONTENT_NAME$4, __scopeSelect);
    const [content, setContent] = React.useState(null);
    const [viewport, setViewport] = React.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [selectedItemText, setSelectedItemText] = React.useState(
      null
    );
    const getItems = useCollection$1(__scopeSelect);
    const [isPositioned, setIsPositioned] = React.useState(false);
    const firstValidItemFoundRef = React.useRef(false);
    React.useEffect(() => {
      if (content) return hideOthers(content);
    }, [content]);
    useFocusGuards$1();
    const focusFirst = React.useCallback(
      (candidates) => {
        const [firstItem, ...restItems] = getItems().map((item) => item.ref.current);
        const [lastItem] = restItems.slice(-1);
        const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
        for (const candidate of candidates) {
          if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
          candidate?.scrollIntoView({ block: "nearest" });
          if (candidate === firstItem && viewport) viewport.scrollTop = 0;
          if (candidate === lastItem && viewport) viewport.scrollTop = viewport.scrollHeight;
          candidate?.focus();
          if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
        }
      },
      [getItems, viewport]
    );
    const focusSelectedItem = React.useCallback(
      () => focusFirst([selectedItem, content]),
      [focusFirst, selectedItem, content]
    );
    React.useEffect(() => {
      if (isPositioned) {
        focusSelectedItem();
      }
    }, [isPositioned, focusSelectedItem]);
    const { onOpenChange, triggerPointerDownPosRef } = context;
    React.useEffect(() => {
      if (content) {
        let pointerMoveDelta = { x: 0, y: 0 };
        const handlePointerMove = (event) => {
          pointerMoveDelta = {
            x: Math.abs(Math.round(event.pageX) - (triggerPointerDownPosRef.current?.x ?? 0)),
            y: Math.abs(Math.round(event.pageY) - (triggerPointerDownPosRef.current?.y ?? 0))
          };
        };
        const handlePointerUp = (event) => {
          if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) {
            event.preventDefault();
          } else {
            if (!content.contains(event.target)) {
              onOpenChange(false);
            }
          }
          document.removeEventListener("pointermove", handlePointerMove);
          triggerPointerDownPosRef.current = null;
        };
        if (triggerPointerDownPosRef.current !== null) {
          document.addEventListener("pointermove", handlePointerMove);
          document.addEventListener("pointerup", handlePointerUp, { capture: true, once: true });
        }
        return () => {
          document.removeEventListener("pointermove", handlePointerMove);
          document.removeEventListener("pointerup", handlePointerUp, { capture: true });
        };
      }
    }, [content, onOpenChange, triggerPointerDownPosRef]);
    React.useEffect(() => {
      const close = () => onOpenChange(false);
      window.addEventListener("blur", close);
      window.addEventListener("resize", close);
      return () => {
        window.removeEventListener("blur", close);
        window.removeEventListener("resize", close);
      };
    }, [onOpenChange]);
    const [searchRef, handleTypeaheadSearch] = useTypeaheadSearch((search) => {
      const enabledItems = getItems().filter((item) => !item.disabled);
      const currentItem = enabledItems.find((item) => item.ref.current === document.activeElement);
      const nextItem = findNextItem(enabledItems, search, currentItem);
      if (nextItem) {
        setTimeout(() => nextItem.ref.current.focus());
      }
    });
    const itemRefCallback = React.useCallback(
      (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
        const isSelectedItem = context.value !== void 0 && context.value === value;
        if (isSelectedItem || isFirstValidItem) {
          setSelectedItem(node);
          if (isFirstValidItem) firstValidItemFoundRef.current = true;
        }
      },
      [context.value]
    );
    const handleItemLeave = React.useCallback(() => content?.focus(), [content]);
    const itemTextRefCallback = React.useCallback(
      (node, value, disabled) => {
        const isFirstValidItem = !firstValidItemFoundRef.current && !disabled;
        const isSelectedItem = context.value !== void 0 && context.value === value;
        if (isSelectedItem || isFirstValidItem) {
          setSelectedItemText(node);
        }
      },
      [context.value]
    );
    const SelectPosition = position === "popper" ? SelectPopperPosition : SelectItemAlignedPosition;
    const popperContentProps = SelectPosition === SelectPopperPosition ? {
      side,
      sideOffset,
      align,
      alignOffset,
      arrowPadding,
      collisionBoundary,
      collisionPadding,
      sticky,
      hideWhenDetached,
      avoidCollisions
    } : {};
    return /* @__PURE__ */ jsx(
      SelectContentProvider,
      {
        scope: __scopeSelect,
        content,
        viewport,
        onViewportChange: setViewport,
        itemRefCallback,
        selectedItem,
        onItemLeave: handleItemLeave,
        itemTextRefCallback,
        focusSelectedItem,
        selectedItemText,
        position,
        isPositioned,
        searchRef,
        children: /* @__PURE__ */ jsx(ReactRemoveScroll, { as: Slot$2, allowPinchZoom: true, children: /* @__PURE__ */ jsx(
          FocusScope,
          {
            asChild: true,
            trapped: context.open,
            onMountAutoFocus: (event) => {
              event.preventDefault();
            },
            onUnmountAutoFocus: composeEventHandlers$1(onCloseAutoFocus, (event) => {
              context.trigger?.focus({ preventScroll: true });
              event.preventDefault();
            }),
            children: /* @__PURE__ */ jsx(
              DismissableLayer$1,
              {
                asChild: true,
                disableOutsidePointerEvents: true,
                onEscapeKeyDown,
                onPointerDownOutside,
                onFocusOutside: (event) => event.preventDefault(),
                onDismiss: () => context.onOpenChange(false),
                children: /* @__PURE__ */ jsx(
                  SelectPosition,
                  {
                    role: "listbox",
                    id: context.contentId,
                    "data-state": context.open ? "open" : "closed",
                    dir: context.dir,
                    onContextMenu: (event) => event.preventDefault(),
                    ...contentProps,
                    ...popperContentProps,
                    onPlaced: () => setIsPositioned(true),
                    ref: composedRefs,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...contentProps.style
                    },
                    onKeyDown: composeEventHandlers$1(contentProps.onKeyDown, (event) => {
                      const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
                      if (event.key === "Tab") event.preventDefault();
                      if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key);
                      if (["ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
                        const items = getItems().filter((item) => !item.disabled);
                        let candidateNodes = items.map((item) => item.ref.current);
                        if (["ArrowUp", "End"].includes(event.key)) {
                          candidateNodes = candidateNodes.slice().reverse();
                        }
                        if (["ArrowUp", "ArrowDown"].includes(event.key)) {
                          const currentElement = event.target;
                          const currentIndex = candidateNodes.indexOf(currentElement);
                          candidateNodes = candidateNodes.slice(currentIndex + 1);
                        }
                        setTimeout(() => focusFirst(candidateNodes));
                        event.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }
);
SelectContentImpl.displayName = CONTENT_IMPL_NAME;
var ITEM_ALIGNED_POSITION_NAME = "SelectItemAlignedPosition";
var SelectItemAlignedPosition = React.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, onPlaced, ...popperProps } = props;
  const context = useSelectContext(CONTENT_NAME$4, __scopeSelect);
  const contentContext = useSelectContentContext(CONTENT_NAME$4, __scopeSelect);
  const [contentWrapper, setContentWrapper] = React.useState(null);
  const [content, setContent] = React.useState(null);
  const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
  const getItems = useCollection$1(__scopeSelect);
  const shouldExpandOnScrollRef = React.useRef(false);
  const shouldRepositionRef = React.useRef(true);
  const { viewport, selectedItem, selectedItemText, focusSelectedItem } = contentContext;
  const position = React.useCallback(() => {
    if (context.trigger && context.valueNode && contentWrapper && content && viewport && selectedItem && selectedItemText) {
      const triggerRect = context.trigger.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const valueNodeRect = context.valueNode.getBoundingClientRect();
      const itemTextRect = selectedItemText.getBoundingClientRect();
      if (context.dir !== "rtl") {
        const itemTextOffset = itemTextRect.left - contentRect.left;
        const left = valueNodeRect.left - itemTextOffset;
        const leftDelta = triggerRect.left - left;
        const minContentWidth = triggerRect.width + leftDelta;
        const contentWidth = Math.max(minContentWidth, contentRect.width);
        const rightEdge = window.innerWidth - CONTENT_MARGIN;
        const clampedLeft = clamp$1(left, [
          CONTENT_MARGIN,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(CONTENT_MARGIN, rightEdge - contentWidth)
        ]);
        contentWrapper.style.minWidth = minContentWidth + "px";
        contentWrapper.style.left = clampedLeft + "px";
      } else {
        const itemTextOffset = contentRect.right - itemTextRect.right;
        const right = window.innerWidth - valueNodeRect.right - itemTextOffset;
        const rightDelta = window.innerWidth - triggerRect.right - right;
        const minContentWidth = triggerRect.width + rightDelta;
        const contentWidth = Math.max(minContentWidth, contentRect.width);
        const leftEdge = window.innerWidth - CONTENT_MARGIN;
        const clampedRight = clamp$1(right, [
          CONTENT_MARGIN,
          Math.max(CONTENT_MARGIN, leftEdge - contentWidth)
        ]);
        contentWrapper.style.minWidth = minContentWidth + "px";
        contentWrapper.style.right = clampedRight + "px";
      }
      const items = getItems();
      const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
      const itemsHeight = viewport.scrollHeight;
      const contentStyles = window.getComputedStyle(content);
      const contentBorderTopWidth = parseInt(contentStyles.borderTopWidth, 10);
      const contentPaddingTop = parseInt(contentStyles.paddingTop, 10);
      const contentBorderBottomWidth = parseInt(contentStyles.borderBottomWidth, 10);
      const contentPaddingBottom = parseInt(contentStyles.paddingBottom, 10);
      const fullContentHeight = contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
      const minContentHeight = Math.min(selectedItem.offsetHeight * 5, fullContentHeight);
      const viewportStyles = window.getComputedStyle(viewport);
      const viewportPaddingTop = parseInt(viewportStyles.paddingTop, 10);
      const viewportPaddingBottom = parseInt(viewportStyles.paddingBottom, 10);
      const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN;
      const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;
      const selectedItemHalfHeight = selectedItem.offsetHeight / 2;
      const itemOffsetMiddle = selectedItem.offsetTop + selectedItemHalfHeight;
      const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
      const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;
      const willAlignWithoutTopOverflow = contentTopToItemMiddle <= topEdgeToTriggerMiddle;
      if (willAlignWithoutTopOverflow) {
        const isLastItem = items.length > 0 && selectedItem === items[items.length - 1].ref.current;
        contentWrapper.style.bottom = "0px";
        const viewportOffsetBottom = content.clientHeight - viewport.offsetTop - viewport.offsetHeight;
        const clampedTriggerMiddleToBottomEdge = Math.max(
          triggerMiddleToBottomEdge,
          selectedItemHalfHeight + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (isLastItem ? viewportPaddingBottom : 0) + viewportOffsetBottom + contentBorderBottomWidth
        );
        const height = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge;
        contentWrapper.style.height = height + "px";
      } else {
        const isFirstItem = items.length > 0 && selectedItem === items[0].ref.current;
        contentWrapper.style.top = "0px";
        const clampedTopEdgeToTriggerMiddle = Math.max(
          topEdgeToTriggerMiddle,
          contentBorderTopWidth + viewport.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (isFirstItem ? viewportPaddingTop : 0) + selectedItemHalfHeight
        );
        const height = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom;
        contentWrapper.style.height = height + "px";
        viewport.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewport.offsetTop;
      }
      contentWrapper.style.margin = `${CONTENT_MARGIN}px 0`;
      contentWrapper.style.minHeight = minContentHeight + "px";
      contentWrapper.style.maxHeight = availableHeight + "px";
      onPlaced?.();
      requestAnimationFrame(() => shouldExpandOnScrollRef.current = true);
    }
  }, [
    getItems,
    context.trigger,
    context.valueNode,
    contentWrapper,
    content,
    viewport,
    selectedItem,
    selectedItemText,
    context.dir,
    onPlaced
  ]);
  useLayoutEffect2(() => position(), [position]);
  const [contentZIndex, setContentZIndex] = React.useState();
  useLayoutEffect2(() => {
    if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
  }, [content]);
  const handleScrollButtonChange = React.useCallback(
    (node) => {
      if (node && shouldRepositionRef.current === true) {
        position();
        focusSelectedItem?.();
        shouldRepositionRef.current = false;
      }
    },
    [position, focusSelectedItem]
  );
  return /* @__PURE__ */ jsx(
    SelectViewportProvider,
    {
      scope: __scopeSelect,
      contentWrapper,
      shouldExpandOnScrollRef,
      onScrollButtonChange: handleScrollButtonChange,
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref: setContentWrapper,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: contentZIndex
          },
          children: /* @__PURE__ */ jsx(
            Primitive.div,
            {
              ...popperProps,
              ref: composedRefs,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...popperProps.style
              }
            }
          )
        }
      )
    }
  );
});
SelectItemAlignedPosition.displayName = ITEM_ALIGNED_POSITION_NAME;
var POPPER_POSITION_NAME = "SelectPopperPosition";
var SelectPopperPosition = React.forwardRef((props, forwardedRef) => {
  const {
    __scopeSelect,
    align = "start",
    collisionPadding = CONTENT_MARGIN,
    ...popperProps
  } = props;
  const popperScope = usePopperScope$1(__scopeSelect);
  return /* @__PURE__ */ jsx(
    Content$3,
    {
      ...popperScope,
      ...popperProps,
      ref: forwardedRef,
      align,
      collisionPadding,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...popperProps.style,
        // re-namespace exposed content custom properties
        ...{
          "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-select-content-available-width": "var(--radix-popper-available-width)",
          "--radix-select-content-available-height": "var(--radix-popper-available-height)",
          "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    }
  );
});
SelectPopperPosition.displayName = POPPER_POSITION_NAME;
var [SelectViewportProvider, useSelectViewportContext] = createSelectContext(CONTENT_NAME$4, {});
var VIEWPORT_NAME = "SelectViewport";
var SelectViewport = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, nonce, ...viewportProps } = props;
    const contentContext = useSelectContentContext(VIEWPORT_NAME, __scopeSelect);
    const viewportContext = useSelectViewportContext(VIEWPORT_NAME, __scopeSelect);
    const composedRefs = useComposedRefs(forwardedRef, contentContext.onViewportChange);
    const prevScrollTopRef = React.useRef(0);
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: `[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}`
          },
          nonce
        }
      ),
      /* @__PURE__ */ jsx(Collection$1.Slot, { scope: __scopeSelect, children: /* @__PURE__ */ jsx(
        Primitive.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...viewportProps,
          ref: composedRefs,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...viewportProps.style
          },
          onScroll: composeEventHandlers$1(viewportProps.onScroll, (event) => {
            const viewport = event.currentTarget;
            const { contentWrapper, shouldExpandOnScrollRef } = viewportContext;
            if (shouldExpandOnScrollRef?.current && contentWrapper) {
              const scrolledBy = Math.abs(prevScrollTopRef.current - viewport.scrollTop);
              if (scrolledBy > 0) {
                const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
                const cssMinHeight = parseFloat(contentWrapper.style.minHeight);
                const cssHeight = parseFloat(contentWrapper.style.height);
                const prevHeight = Math.max(cssMinHeight, cssHeight);
                if (prevHeight < availableHeight) {
                  const nextHeight = prevHeight + scrolledBy;
                  const clampedNextHeight = Math.min(availableHeight, nextHeight);
                  const heightDiff = nextHeight - clampedNextHeight;
                  contentWrapper.style.height = clampedNextHeight + "px";
                  if (contentWrapper.style.bottom === "0px") {
                    viewport.scrollTop = heightDiff > 0 ? heightDiff : 0;
                    contentWrapper.style.justifyContent = "flex-end";
                  }
                }
              }
            }
            prevScrollTopRef.current = viewport.scrollTop;
          })
        }
      ) })
    ] });
  }
);
SelectViewport.displayName = VIEWPORT_NAME;
var GROUP_NAME$1 = "SelectGroup";
var [SelectGroupContextProvider, useSelectGroupContext] = createSelectContext(GROUP_NAME$1);
var SelectGroup = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...groupProps } = props;
    const groupId = useId();
    return /* @__PURE__ */ jsx(SelectGroupContextProvider, { scope: __scopeSelect, id: groupId, children: /* @__PURE__ */ jsx(Primitive.div, { role: "group", "aria-labelledby": groupId, ...groupProps, ref: forwardedRef }) });
  }
);
SelectGroup.displayName = GROUP_NAME$1;
var LABEL_NAME = "SelectLabel";
var SelectLabel = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...labelProps } = props;
    const groupContext = useSelectGroupContext(LABEL_NAME, __scopeSelect);
    return /* @__PURE__ */ jsx(Primitive.div, { id: groupContext.id, ...labelProps, ref: forwardedRef });
  }
);
SelectLabel.displayName = LABEL_NAME;
var ITEM_NAME$1 = "SelectItem";
var [SelectItemContextProvider, useSelectItemContext] = createSelectContext(ITEM_NAME$1);
var SelectItem = React.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSelect,
      value,
      disabled = false,
      textValue: textValueProp,
      ...itemProps
    } = props;
    const context = useSelectContext(ITEM_NAME$1, __scopeSelect);
    const contentContext = useSelectContentContext(ITEM_NAME$1, __scopeSelect);
    const isSelected = context.value === value;
    const [textValue, setTextValue] = React.useState(textValueProp ?? "");
    const [isFocused, setIsFocused] = React.useState(false);
    const composedRefs = useComposedRefs(
      forwardedRef,
      (node) => contentContext.itemRefCallback?.(node, value, disabled)
    );
    const textId = useId();
    const pointerTypeRef = React.useRef("touch");
    const handleSelect = () => {
      if (!disabled) {
        context.onValueChange(value);
        context.onOpenChange(false);
      }
    };
    if (value === "") {
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    }
    return /* @__PURE__ */ jsx(
      SelectItemContextProvider,
      {
        scope: __scopeSelect,
        value,
        disabled,
        textId,
        isSelected,
        onItemTextChange: React.useCallback((node) => {
          setTextValue((prevTextValue) => prevTextValue || (node?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ jsx(
          Collection$1.ItemSlot,
          {
            scope: __scopeSelect,
            value,
            disabled,
            textValue,
            children: /* @__PURE__ */ jsx(
              Primitive.div,
              {
                role: "option",
                "aria-labelledby": textId,
                "data-highlighted": isFocused ? "" : void 0,
                "aria-selected": isSelected && isFocused,
                "data-state": isSelected ? "checked" : "unchecked",
                "aria-disabled": disabled || void 0,
                "data-disabled": disabled ? "" : void 0,
                tabIndex: disabled ? void 0 : -1,
                ...itemProps,
                ref: composedRefs,
                onFocus: composeEventHandlers$1(itemProps.onFocus, () => setIsFocused(true)),
                onBlur: composeEventHandlers$1(itemProps.onBlur, () => setIsFocused(false)),
                onClick: composeEventHandlers$1(itemProps.onClick, () => {
                  if (pointerTypeRef.current !== "mouse") handleSelect();
                }),
                onPointerUp: composeEventHandlers$1(itemProps.onPointerUp, () => {
                  if (pointerTypeRef.current === "mouse") handleSelect();
                }),
                onPointerDown: composeEventHandlers$1(itemProps.onPointerDown, (event) => {
                  pointerTypeRef.current = event.pointerType;
                }),
                onPointerMove: composeEventHandlers$1(itemProps.onPointerMove, (event) => {
                  pointerTypeRef.current = event.pointerType;
                  if (disabled) {
                    contentContext.onItemLeave?.();
                  } else if (pointerTypeRef.current === "mouse") {
                    event.currentTarget.focus({ preventScroll: true });
                  }
                }),
                onPointerLeave: composeEventHandlers$1(itemProps.onPointerLeave, (event) => {
                  if (event.currentTarget === document.activeElement) {
                    contentContext.onItemLeave?.();
                  }
                }),
                onKeyDown: composeEventHandlers$1(itemProps.onKeyDown, (event) => {
                  const isTypingAhead = contentContext.searchRef?.current !== "";
                  if (isTypingAhead && event.key === " ") return;
                  if (SELECTION_KEYS.includes(event.key)) handleSelect();
                  if (event.key === " ") event.preventDefault();
                })
              }
            )
          }
        )
      }
    );
  }
);
SelectItem.displayName = ITEM_NAME$1;
var ITEM_TEXT_NAME = "SelectItemText";
var SelectItemText = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, className, style, ...itemTextProps } = props;
    const context = useSelectContext(ITEM_TEXT_NAME, __scopeSelect);
    const contentContext = useSelectContentContext(ITEM_TEXT_NAME, __scopeSelect);
    const itemContext = useSelectItemContext(ITEM_TEXT_NAME, __scopeSelect);
    const nativeOptionsContext = useSelectNativeOptionsContext(ITEM_TEXT_NAME, __scopeSelect);
    const [itemTextNode, setItemTextNode] = React.useState(null);
    const composedRefs = useComposedRefs(
      forwardedRef,
      (node) => setItemTextNode(node),
      itemContext.onItemTextChange,
      (node) => contentContext.itemTextRefCallback?.(node, itemContext.value, itemContext.disabled)
    );
    const textContent = itemTextNode?.textContent;
    const nativeOption = React.useMemo(
      () => /* @__PURE__ */ jsx("option", { value: itemContext.value, disabled: itemContext.disabled, children: textContent }, itemContext.value),
      [itemContext.disabled, itemContext.value, textContent]
    );
    const { onNativeOptionAdd, onNativeOptionRemove } = nativeOptionsContext;
    useLayoutEffect2(() => {
      onNativeOptionAdd(nativeOption);
      return () => onNativeOptionRemove(nativeOption);
    }, [onNativeOptionAdd, onNativeOptionRemove, nativeOption]);
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Primitive.span, { id: itemContext.textId, ...itemTextProps, ref: composedRefs }),
      itemContext.isSelected && context.valueNode && !context.valueNodeHasChildren ? ReactDOM.createPortal(itemTextProps.children, context.valueNode) : null
    ] });
  }
);
SelectItemText.displayName = ITEM_TEXT_NAME;
var ITEM_INDICATOR_NAME = "SelectItemIndicator";
var SelectItemIndicator = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...itemIndicatorProps } = props;
    const itemContext = useSelectItemContext(ITEM_INDICATOR_NAME, __scopeSelect);
    return itemContext.isSelected ? /* @__PURE__ */ jsx(Primitive.span, { "aria-hidden": true, ...itemIndicatorProps, ref: forwardedRef }) : null;
  }
);
SelectItemIndicator.displayName = ITEM_INDICATOR_NAME;
var SCROLL_UP_BUTTON_NAME = "SelectScrollUpButton";
var SelectScrollUpButton = React.forwardRef((props, forwardedRef) => {
  const contentContext = useSelectContentContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
  const viewportContext = useSelectViewportContext(SCROLL_UP_BUTTON_NAME, props.__scopeSelect);
  const [canScrollUp, setCanScrollUp] = React.useState(false);
  const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
  useLayoutEffect2(() => {
    if (contentContext.viewport && contentContext.isPositioned) {
      let handleScroll2 = function() {
        const canScrollUp2 = viewport.scrollTop > 0;
        setCanScrollUp(canScrollUp2);
      };
      const viewport = contentContext.viewport;
      handleScroll2();
      viewport.addEventListener("scroll", handleScroll2);
      return () => viewport.removeEventListener("scroll", handleScroll2);
    }
  }, [contentContext.viewport, contentContext.isPositioned]);
  return canScrollUp ? /* @__PURE__ */ jsx(
    SelectScrollButtonImpl,
    {
      ...props,
      ref: composedRefs,
      onAutoScroll: () => {
        const { viewport, selectedItem } = contentContext;
        if (viewport && selectedItem) {
          viewport.scrollTop = viewport.scrollTop - selectedItem.offsetHeight;
        }
      }
    }
  ) : null;
});
SelectScrollUpButton.displayName = SCROLL_UP_BUTTON_NAME;
var SCROLL_DOWN_BUTTON_NAME = "SelectScrollDownButton";
var SelectScrollDownButton = React.forwardRef((props, forwardedRef) => {
  const contentContext = useSelectContentContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
  const viewportContext = useSelectViewportContext(SCROLL_DOWN_BUTTON_NAME, props.__scopeSelect);
  const [canScrollDown, setCanScrollDown] = React.useState(false);
  const composedRefs = useComposedRefs(forwardedRef, viewportContext.onScrollButtonChange);
  useLayoutEffect2(() => {
    if (contentContext.viewport && contentContext.isPositioned) {
      let handleScroll2 = function() {
        const maxScroll = viewport.scrollHeight - viewport.clientHeight;
        const canScrollDown2 = Math.ceil(viewport.scrollTop) < maxScroll;
        setCanScrollDown(canScrollDown2);
      };
      const viewport = contentContext.viewport;
      handleScroll2();
      viewport.addEventListener("scroll", handleScroll2);
      return () => viewport.removeEventListener("scroll", handleScroll2);
    }
  }, [contentContext.viewport, contentContext.isPositioned]);
  return canScrollDown ? /* @__PURE__ */ jsx(
    SelectScrollButtonImpl,
    {
      ...props,
      ref: composedRefs,
      onAutoScroll: () => {
        const { viewport, selectedItem } = contentContext;
        if (viewport && selectedItem) {
          viewport.scrollTop = viewport.scrollTop + selectedItem.offsetHeight;
        }
      }
    }
  ) : null;
});
SelectScrollDownButton.displayName = SCROLL_DOWN_BUTTON_NAME;
var SelectScrollButtonImpl = React.forwardRef((props, forwardedRef) => {
  const { __scopeSelect, onAutoScroll, ...scrollIndicatorProps } = props;
  const contentContext = useSelectContentContext("SelectScrollButton", __scopeSelect);
  const autoScrollTimerRef = React.useRef(null);
  const getItems = useCollection$1(__scopeSelect);
  const clearAutoScrollTimer = React.useCallback(() => {
    if (autoScrollTimerRef.current !== null) {
      window.clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  }, []);
  React.useEffect(() => {
    return () => clearAutoScrollTimer();
  }, [clearAutoScrollTimer]);
  useLayoutEffect2(() => {
    const activeItem = getItems().find((item) => item.ref.current === document.activeElement);
    activeItem?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [getItems]);
  return /* @__PURE__ */ jsx(
    Primitive.div,
    {
      "aria-hidden": true,
      ...scrollIndicatorProps,
      ref: forwardedRef,
      style: { flexShrink: 0, ...scrollIndicatorProps.style },
      onPointerDown: composeEventHandlers$1(scrollIndicatorProps.onPointerDown, () => {
        if (autoScrollTimerRef.current === null) {
          autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
        }
      }),
      onPointerMove: composeEventHandlers$1(scrollIndicatorProps.onPointerMove, () => {
        contentContext.onItemLeave?.();
        if (autoScrollTimerRef.current === null) {
          autoScrollTimerRef.current = window.setInterval(onAutoScroll, 50);
        }
      }),
      onPointerLeave: composeEventHandlers$1(scrollIndicatorProps.onPointerLeave, () => {
        clearAutoScrollTimer();
      })
    }
  );
});
var SEPARATOR_NAME = "SelectSeparator";
var SelectSeparator = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...separatorProps } = props;
    return /* @__PURE__ */ jsx(Primitive.div, { "aria-hidden": true, ...separatorProps, ref: forwardedRef });
  }
);
SelectSeparator.displayName = SEPARATOR_NAME;
var ARROW_NAME$2 = "SelectArrow";
var SelectArrow = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSelect, ...arrowProps } = props;
    const popperScope = usePopperScope$1(__scopeSelect);
    const context = useSelectContext(ARROW_NAME$2, __scopeSelect);
    const contentContext = useSelectContentContext(ARROW_NAME$2, __scopeSelect);
    return context.open && contentContext.position === "popper" ? /* @__PURE__ */ jsx(Arrow$1, { ...popperScope, ...arrowProps, ref: forwardedRef }) : null;
  }
);
SelectArrow.displayName = ARROW_NAME$2;
var BUBBLE_INPUT_NAME = "SelectBubbleInput";
var SelectBubbleInput = React.forwardRef(
  ({ __scopeSelect, value, ...props }, forwardedRef) => {
    const ref = React.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const prevValue = usePrevious(value);
    React.useEffect(() => {
      const select = ref.current;
      if (!select) return;
      const selectProto = window.HTMLSelectElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        selectProto,
        "value"
      );
      const setValue = descriptor.set;
      if (prevValue !== value && setValue) {
        const event = new Event("change", { bubbles: true });
        setValue.call(select, value);
        select.dispatchEvent(event);
      }
    }, [prevValue, value]);
    return /* @__PURE__ */ jsx(
      Primitive.select,
      {
        ...props,
        style: { ...VISUALLY_HIDDEN_STYLES, ...props.style },
        ref: composedRefs,
        defaultValue: value
      }
    );
  }
);
SelectBubbleInput.displayName = BUBBLE_INPUT_NAME;
function shouldShowPlaceholder(value) {
  return value === "" || value === void 0;
}
function useTypeaheadSearch(onSearchChange) {
  const handleSearchChange = useCallbackRef$1(onSearchChange);
  const searchRef = React.useRef("");
  const timerRef = React.useRef(0);
  const handleTypeaheadSearch = React.useCallback(
    (key) => {
      const search = searchRef.current + key;
      handleSearchChange(search);
      (function updateSearch(value) {
        searchRef.current = value;
        window.clearTimeout(timerRef.current);
        if (value !== "") timerRef.current = window.setTimeout(() => updateSearch(""), 1e3);
      })(search);
    },
    [handleSearchChange]
  );
  const resetTypeahead = React.useCallback(() => {
    searchRef.current = "";
    window.clearTimeout(timerRef.current);
  }, []);
  React.useEffect(() => {
    return () => window.clearTimeout(timerRef.current);
  }, []);
  return [searchRef, handleTypeaheadSearch, resetTypeahead];
}
function findNextItem(items, search, currentItem) {
  const isRepeated = search.length > 1 && Array.from(search).every((char) => char === search[0]);
  const normalizedSearch = isRepeated ? search[0] : search;
  const currentItemIndex = currentItem ? items.indexOf(currentItem) : -1;
  let wrappedItems = wrapArray$1(items, Math.max(currentItemIndex, 0));
  const excludeCurrentItem = normalizedSearch.length === 1;
  if (excludeCurrentItem) wrappedItems = wrappedItems.filter((v) => v !== currentItem);
  const nextItem = wrappedItems.find(
    (item) => item.textValue.toLowerCase().startsWith(normalizedSearch.toLowerCase())
  );
  return nextItem !== currentItem ? nextItem : void 0;
}
function wrapArray$1(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root2$3 = Select$1;
var Trigger$3 = SelectTrigger;
var Value = SelectValue;
var Icon = SelectIcon;
var Portal$2 = SelectPortal;
var Content2$1 = SelectContent;
var Viewport = SelectViewport;
var Item$1 = SelectItem;
var ItemText = SelectItemText;

const selectTrigger = cva('w-full transition-all font-inter appearance-none cursor-pointer relative text-[0.875rem] leading-[1.0625rem] focus:ring-2 inline-flex items-center justify-between', {
  variants: {
    theme: {
      light: 'text-[#0C1C33] bg-white',
      dark: 'text-white bg-gray-800'
    },
    colorScheme: {
      default: 'focus:ring-blue-500/20',
      brand: 'focus:ring-dash-brand/20',
      error: 'focus:ring-red-500/20',
      success: 'focus:ring-green-500/20'
    },
    size: {
      sm: 'dash-block-sm',
      md: 'dash-block-md',
      xl: 'dash-block-xl'
    },
    border: {
      true: 'outline outline-1 outline-offset-[-1px]',
      false: ''
    },
    disabled: {
      false: '',
      true: 'opacity-60 cursor-not-allowed'
    }
  },
  compoundVariants: [
  // Outline colors by colorScheme - only when border is true
  {
    colorScheme: 'default',
    border: true,
    class: 'outline-[rgba(12,28,51,0.35)] focus:outline-[rgba(12,28,51,0.6)]'
  }, {
    colorScheme: 'brand',
    border: true,
    class: 'outline-dash-brand/30 focus:outline-dash-brand'
  }, {
    colorScheme: 'error',
    border: true,
    class: 'outline-red-500 focus:outline-red-500'
  }, {
    colorScheme: 'success',
    border: true,
    class: 'outline-green-500 focus:outline-green-500'
  }],
  defaultVariants: {
    theme: 'light',
    colorScheme: 'default',
    size: 'xl',
    border: true,
    disabled: false
  }
});
const selectContent = cva('overflow-hidden z-50 rounded-md shadow-lg min-w-[var(--radix-select-trigger-width)] w-full', {
  variants: {
    theme: {
      light: 'bg-white border border-gray-200',
      dark: 'bg-gray-800 border border-gray-700'
    }
  }
});
const selectItem = cva('relative flex cursor-pointer select-none items-center outline-none focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50', {
  variants: {
    theme: {
      light: 'text-gray-900 focus:bg-gray-100',
      dark: 'text-gray-100 focus:bg-gray-700'
    },
    size: {
      sm: 'dash-block-sm',
      md: 'dash-block-md',
      xl: 'dash-block-xl'
    }
  }
});
const selectIcon = cva('pointer-events-none flex items-center justify-center transition-transform', {
  variants: {
    size: {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      xl: 'w-4 h-4'
    }
  }
});
// Arrow icon
const ChevronDownIcon$2 = ({
  className
}) => jsx("svg", {
  width: "15",
  height: "15",
  viewBox: "0 0 15 15",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  className: className,
  children: jsx("path", {
    d: "m4.93179 5.43179c0.20081-0.20081 0.52632-0.20081 0.72713 0l2.34108 2.34108 2.34108-2.34108c0.20081-0.20081 0.52632-0.20081 0.72713 0s0.20081 0.52632 0 0.72713l-2.70455 2.70455c-0.20081 0.20081-0.52632 0.20081-0.72713 0l-2.70455-2.70455c-0.20081-0.20081-0.20081-0.52632 0-0.72713z",
    fill: "currentColor",
    fillRule: "evenodd",
    clipRule: "evenodd"
  })
});
/**
 * A versatile select component built on Radix UI that adapts to light/dark theme,
 * supports various color schemes, sizes, variants, states, and HTML content in options.
 *
 * @example
 * <Select
 *   options={[
 *     {value: 'id1', label: 'Option 1'},
 *     {value: 'id2', label: 'Option 2', content: <div><strong>Option 2</strong><br/>Description</div>}
 *   ]}
 *   colorScheme="default"
 *   size="xl"
 *   border={true}
 * />
 */
const Select = _a => {
  var {
      className = '',
      colorScheme,
      size,
      error = false,
      success = false,
      border = true,
      disabled = false,
      options = [],
      showArrow = true,
      value,
      defaultValue,
      onChange,
      placeholder = 'Select an option...',
      name
    } = _a;
    __rest(_a, ["className", "colorScheme", "size", "error", "success", "border", "disabled", "options", "showArrow", "value", "defaultValue", "onChange", "placeholder", "name"]);
  const {
    theme
  } = useTheme();
  // Determine color scheme based on state
  let finalColorScheme = colorScheme;
  if (error) finalColorScheme = 'error';else if (success) finalColorScheme = 'success';
  const triggerClasses = selectTrigger({
    theme,
    colorScheme: finalColorScheme,
    size,
    border,
    disabled
  }) + ' ' + className;
  const contentClasses = selectContent({
    theme
  });
  const itemClasses = selectItem({
    theme,
    size
  });
  const iconClasses = selectIcon({
    size
  });
  return jsxs(Root2$3, {
    value: value,
    defaultValue: defaultValue,
    onValueChange: onChange,
    disabled: disabled,
    name: name,
    children: [jsxs(Trigger$3, {
      className: triggerClasses,
      children: [jsx("div", {
        className: 'w-full flex-1 text-left',
        children: jsx(Value, {
          placeholder: placeholder
        })
      }), showArrow && jsx(Icon, {
        asChild: true,
        children: jsx(ChevronDownIcon$2, {
          className: iconClasses
        })
      })]
    }), jsx(Portal$2, {
      children: jsx(Content2$1, {
        className: contentClasses,
        position: 'popper',
        sideOffset: 5,
        children: jsx(Viewport, {
          children: options.map(option => jsx(Item$1, {
            value: option.value,
            className: itemClasses,
            disabled: option.disabled,
            children: jsx("div", {
              className: 'w-full flex-1 text-left',
              children: jsx(ItemText, {
                className: 'w-full',
                children: option.content || option.label
              })
            })
          }, option.value))
        })
      })
    })]
  });
};

const overlaySelectTrigger = cva('w-full transition-all font-inter appearance-none cursor-pointer relative text-[0.875rem] leading-[1.0625rem] inline-flex items-center justify-between', {
  variants: {
    theme: {
      light: 'text-dash-primary-dark-blue',
      dark: 'text-white'
    },
    colorScheme: {
      default: '',
      brand: '',
      error: '',
      success: '',
      gray: '',
      lightGray: ''
    },
    size: {
      sm: 'dash-block-sm',
      md: 'dash-block-md',
      xl: 'dash-block-xl'
    },
    border: {
      true: 'outline outline-1 outline-offset-[-1px]',
      false: ''
    },
    disabled: {
      false: '',
      true: 'opacity-60 cursor-not-allowed'
    },
    filled: {
      false: '',
      true: ''
    }
  },
  compoundVariants: [{
    colorScheme: 'default',
    border: true,
    class: 'outline-[rgba(12,28,51,0.35)] focus:outline-[rgba(12,28,51,0.6)]'
  }, {
    colorScheme: 'brand',
    border: true,
    class: 'outline-dash-brand/30 focus:outline-dash-brand'
  }, {
    colorScheme: 'error',
    border: true,
    class: 'outline-red-500 focus:outline-red-500'
  }, {
    colorScheme: 'success',
    border: true,
    class: 'outline-green-500 focus:outline-green-500'
  }, {
    colorScheme: 'gray',
    border: true,
    theme: 'light',
    class: 'outline-[rgba(12,28,51,0.20)] focus:outline-[rgba(12,28,51,0.35)]'
  }, {
    colorScheme: 'gray',
    border: true,
    theme: 'dark',
    class: 'outline-gray-600/50 focus:outline-gray-500'
  }, {
    colorScheme: 'lightGray',
    border: true,
    theme: 'light',
    class: 'outline-dash-primary-dark-blue/[0.05] focus:outline-dash-primary-dark-blue/[0.05]'
  }, {
    colorScheme: 'lightGray',
    border: true,
    theme: 'dark',
    class: 'outline-dash-primary-dark-blue/[0.05] focus:outline-dash-primary-dark-blue/[0.05]'
  }, {
    colorScheme: 'gray',
    border: false,
    theme: 'light',
    class: 'bg-[rgba(12,28,51,0.03)]'
  }, {
    colorScheme: 'gray',
    border: false,
    theme: 'dark',
    class: 'bg-gray-700/20'
  },
  // New lightGray scheme using dash-primary-dark-blue with 3% base and 5% hover
  {
    colorScheme: 'lightGray',
    border: false,
    theme: 'light',
    class: 'bg-dash-primary-dark-blue/[0.03] hover:bg-dash-primary-dark-blue/[0.05]'
  }, {
    colorScheme: 'lightGray',
    border: false,
    theme: 'dark',
    class: 'bg-dash-primary-dark-blue/[0.03] hover:bg-dash-primary-dark-blue/[0.05]'
  }, {
    colorScheme: 'lightGray',
    filled: true,
    theme: 'light',
    class: 'bg-dash-primary-dark-blue/[0.03] hover:bg-dash-primary-dark-blue/[0.05]'
  }, {
    colorScheme: 'lightGray',
    filled: true,
    theme: 'dark',
    class: 'bg-dash-primary-dark-blue/[0.03] hover:bg-dash-primary-dark-blue/[0.05]'
  },
  // Default background when not filled
  {
    filled: false,
    theme: 'light',
    class: 'bg-white'
  }, {
    filled: false,
    theme: 'dark',
    class: 'bg-gray-800'
  },
  // Filled variants
  {
    colorScheme: 'default',
    filled: true,
    theme: 'light',
    class: 'bg-white text-gray-900'
  }, {
    colorScheme: 'default',
    filled: true,
    theme: 'dark',
    class: 'bg-gray-700 text-white'
  }, {
    colorScheme: 'brand',
    filled: true,
    theme: 'light',
    class: 'bg-blue-50 text-blue-700'
  }, {
    colorScheme: 'brand',
    filled: true,
    theme: 'dark',
    class: 'bg-blue-900/30 text-blue-300'
  }, {
    colorScheme: 'error',
    filled: true,
    theme: 'light',
    class: 'bg-red-50 text-red-700'
  }, {
    colorScheme: 'error',
    filled: true,
    theme: 'dark',
    class: 'bg-red-500/20 text-red-400'
  }, {
    colorScheme: 'success',
    filled: true,
    theme: 'light',
    class: 'bg-green-50 text-green-700'
  }, {
    colorScheme: 'success',
    filled: true,
    theme: 'dark',
    class: 'bg-green-500/20 text-green-400'
  }, {
    colorScheme: 'gray',
    filled: true,
    theme: 'light',
    class: 'bg-gray-200 text-gray-800'
  }, {
    colorScheme: 'gray',
    filled: true,
    theme: 'dark',
    class: 'bg-gray-600 text-gray-200'
  }],
  defaultVariants: {
    theme: 'light',
    colorScheme: 'default',
    size: 'xl',
    border: true,
    disabled: false,
    filled: false
  }
});
const overlayContent$1 = cva('absolute z-50 min-w-full overflow-hidden shadow-lg', {
  variants: {
    theme: {
      light: 'bg-white border border-[rgba(12,28,51,0.05)]',
      dark: 'bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.15)] backdrop-blur-[256px]'
    },
    size: {
      sm: 'rounded-[0.625rem]',
      md: 'rounded-[0.875rem]',
      xl: 'rounded-[1rem]'
    }
  }
});
const overlayItem$1 = cva('relative flex cursor-pointer select-none items-center outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 rounded-none', {
  variants: {
    theme: {
      light: 'text-[#0C1C33] hover:bg-gray-50',
      dark: 'text-white hover:bg-[rgba(255,255,255,0.1)]'
    },
    size: {
      sm: 'dash-block-sm',
      md: 'dash-block-md',
      xl: 'dash-block-xl'
    }
  }
});
// Arrow icon
const ChevronDownIcon$1 = ({
  className
}) => jsx("svg", {
  width: '15',
  height: '15',
  viewBox: '0 0 15 15',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  children: jsx("path", {
    d: 'm4.93179 5.43179c0.20081-0.20081 0.52632-0.20081 0.72713 0l2.34108 2.34108 2.34108-2.34108c0.20081-0.20081 0.52632-0.20081 0.72713 0s0.20081 0.52632 0 0.72713l-2.70455 2.70455c-0.20081 0.20081-0.52632 0.20081-0.72713 0l-2.70455-2.70455c-0.20081-0.20081-0.20081-0.52632 0-0.72713z',
    fill: 'currentColor',
    fillRule: 'evenodd',
    clipRule: 'evenodd'
  })
});
/**
 * Overlay select component that opens above the trigger with overlay positioning.
 * Simple select component without additional button functionality.
 */
const OverlaySelect = _a => {
  var {
      className = '',
      colorScheme,
      size,
      error = false,
      success = false,
      border = true,
      filled = false,
      disabled = false,
      options = [],
      showArrow = true,
      value,
      defaultValue,
      onValueChange,
      placeholder = 'Select an option...',
      name,
      overlayLabel,
      maxHeight = '200px'
    } = _a;
    __rest(_a, ["className", "colorScheme", "size", "error", "success", "border", "filled", "disabled", "options", "showArrow", "value", "defaultValue", "onValueChange", "placeholder", "name", "overlayLabel", "maxHeight"]);
  const {
    theme
  } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  // Determine color scheme based on state
  let finalColorScheme = colorScheme;
  if (error) finalColorScheme = 'error';else if (success) finalColorScheme = 'success';
  const triggerClasses = overlaySelectTrigger({
    theme,
    colorScheme: finalColorScheme,
    size,
    border,
    filled,
    disabled
  }) + ' ' + className;
  const contentClasses = overlayContent$1({
    theme,
    size
  });
  const itemClasses = overlayItem$1({
    theme,
    size
  });
  const selectedOption = options.find(opt => opt.value === value);
  const handleOptionClick = optionValue => {
    onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(optionValue);
    setIsOpen(false);
  };
  return jsxs("div", {
    className: 'relative',
    children: [jsxs("button", {
      ref: triggerRef,
      type: 'button',
      className: triggerClasses,
      onClick: () => !disabled && setIsOpen(!isOpen),
      disabled: disabled,
      name: name,
      children: [jsx("div", {
        className: 'w-full flex-1 text-left',
        children: selectedOption ? selectedOption.content || selectedOption.label : jsx("span", {
          className: theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
          children: placeholder
        })
      }), showArrow && jsx(ChevronDownIcon$1, {
        className: `transition-transform ${isOpen ? 'rotate-180' : ''} ${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`
      })]
    }), isOpen && jsxs(Fragment, {
      children: [jsx("div", {
        className: 'fixed inset-0 z-40',
        onClick: () => setIsOpen(false)
      }), jsxs("div", {
        className: `${contentClasses} top-0 left-0 right-0`,
        style: {
          maxHeight
        },
        children: [overlayLabel && jsxs("div", {
          className: `${itemClasses} font-medium border-b rounded-b-none cursor-pointer ${theme === 'dark' ? 'border-[rgba(255,255,255,0.15)]' : 'border-[rgba(12,28,51,0.05)]'}`,
          onClick: () => setIsOpen(false),
          children: [jsx("div", {
            className: 'w-full flex-1',
            children: overlayLabel
          }), jsx("div", {
            className: 'flex items-center pl-1',
            children: jsx(CrossIcon, {
              size: 16,
              color: theme === 'dark' ? '#FFFFFF' : '#0C1C33',
              className: 'cursor-pointer'
            })
          })]
        }), jsx("div", {
          className: 'overflow-y-auto',
          style: {
            maxHeight: `calc(${maxHeight} - ${overlayLabel ? '50px' : '0px'})`
          },
          children: options.map((option, index) => jsx("div", {
            className: `${itemClasses} ${option.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${index < options.length - 1 ? `border-b ${theme === 'dark' ? 'border-[rgba(255,255,255,0.15)]' : 'border-[rgba(12,28,51,0.05)]'}` : ''}`,
            onClick: () => !option.disabled && handleOptionClick(option.value),
            children: jsx("div", {
              className: 'w-full flex-1 text-left',
              children: option.content || option.label
            })
          }, option.value))
        })]
      })]
    })]
  });
};

const overlayMenuTrigger = cva('w-full transition-all font-inter appearance-none cursor-pointer relative text-[0.875rem] leading-[1.0625rem] inline-flex items-center justify-between', {
  variants: {
    theme: {
      light: 'text-dash-primary-dark-blue',
      dark: 'text-white'
    },
    colorScheme: {
      default: '',
      brand: '',
      error: '',
      success: '',
      gray: '',
      lightGray: ''
    },
    size: {
      sm: 'dash-block-sm',
      md: 'dash-block-md',
      xl: 'dash-block-xl'
    },
    border: {
      true: 'outline outline-1 outline-offset-[-1px]',
      false: ''
    },
    disabled: {
      false: '',
      true: 'opacity-60 cursor-not-allowed'
    },
    filled: {
      false: '',
      true: ''
    }
  },
  compoundVariants: [{
    colorScheme: 'default',
    border: true,
    class: 'outline-[rgba(12,28,51,0.35)] focus:outline-[rgba(12,28,51,0.6)]'
  }, {
    colorScheme: 'brand',
    border: true,
    class: 'outline-dash-brand/30 focus:outline-dash-brand'
  }, {
    colorScheme: 'error',
    border: true,
    class: 'outline-red-500 focus:outline-red-500'
  }, {
    colorScheme: 'success',
    border: true,
    class: 'outline-green-500 focus:outline-green-500'
  }, {
    colorScheme: 'gray',
    border: true,
    theme: 'light',
    class: 'outline-[rgba(12,28,51,0.20)] focus:outline-[rgba(12,28,51,0.35)]'
  }, {
    colorScheme: 'gray',
    border: true,
    theme: 'dark',
    class: 'outline-gray-600/50 focus:outline-gray-500'
  }, {
    colorScheme: 'lightGray',
    border: true,
    theme: 'light',
    class: 'outline-dash-primary-dark-blue/[0.05] focus:outline-dash-primary-dark-blue/[0.05]'
  }, {
    colorScheme: 'lightGray',
    border: true,
    theme: 'dark',
    class: 'outline-dash-primary-dark-blue/[0.05] focus:outline-dash-primary-dark-blue/[0.05]'
  }, {
    colorScheme: 'gray',
    border: false,
    theme: 'light',
    class: 'bg-[rgba(12,28,51,0.03)]'
  }, {
    colorScheme: 'gray',
    border: false,
    theme: 'dark',
    class: 'bg-gray-700/20'
  },
  // New lightGray scheme using dash-primary-dark-blue with 3% base and 5% hover
  {
    colorScheme: 'lightGray',
    border: false,
    theme: 'light',
    class: 'bg-dash-primary-dark-blue/[0.03] hover:bg-dash-primary-dark-blue/[0.05]'
  }, {
    colorScheme: 'lightGray',
    border: false,
    theme: 'dark',
    class: 'bg-dash-primary-dark-blue/[0.03] hover:bg-dash-primary-dark-blue/[0.05]'
  }, {
    colorScheme: 'lightGray',
    filled: true,
    theme: 'light',
    class: 'bg-dash-primary-dark-blue/[0.03] hover:bg-dash-primary-dark-blue/[0.05]'
  }, {
    colorScheme: 'lightGray',
    filled: true,
    theme: 'dark',
    class: 'bg-dash-primary-dark-blue/[0.03] hover:bg-dash-primary-dark-blue/[0.05]'
  },
  // Default background when not filled
  {
    filled: false,
    theme: 'light',
    class: 'bg-white'
  }, {
    filled: false,
    theme: 'dark',
    class: 'bg-gray-800'
  },
  // Filled variants
  {
    colorScheme: 'default',
    filled: true,
    theme: 'light',
    class: 'bg-white text-gray-900'
  }, {
    colorScheme: 'default',
    filled: true,
    theme: 'dark',
    class: 'bg-gray-700 text-white'
  }, {
    colorScheme: 'brand',
    filled: true,
    theme: 'light',
    class: 'bg-blue-50 text-blue-700'
  }, {
    colorScheme: 'brand',
    filled: true,
    theme: 'dark',
    class: 'bg-blue-900/30 text-blue-300'
  }, {
    colorScheme: 'error',
    filled: true,
    theme: 'light',
    class: 'bg-red-50 text-red-700'
  }, {
    colorScheme: 'error',
    filled: true,
    theme: 'dark',
    class: 'bg-red-500/20 text-red-400'
  }, {
    colorScheme: 'success',
    filled: true,
    theme: 'light',
    class: 'bg-green-50 text-green-700'
  }, {
    colorScheme: 'success',
    filled: true,
    theme: 'dark',
    class: 'bg-green-500/20 text-green-400'
  }, {
    colorScheme: 'gray',
    filled: true,
    theme: 'light',
    class: 'bg-gray-200 text-gray-800'
  }, {
    colorScheme: 'gray',
    filled: true,
    theme: 'dark',
    class: 'bg-gray-600 text-gray-200'
  }],
  defaultVariants: {
    theme: 'light',
    colorScheme: 'default',
    size: 'xl',
    border: true,
    disabled: false,
    filled: false
  }
});
const overlayContent = cva('absolute z-50 min-w-full overflow-hidden shadow-lg', {
  variants: {
    theme: {
      light: 'bg-white border border-[rgba(12,28,51,0.05)]',
      dark: 'bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.15)] backdrop-blur-[256px]'
    },
    size: {
      sm: 'rounded-[0.625rem]',
      md: 'rounded-[0.875rem]',
      xl: 'rounded-[1rem]'
    }
  }
});
const overlayItem = cva('relative flex cursor-pointer select-none items-center outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 rounded-none', {
  variants: {
    theme: {
      light: 'text-[#0C1C33] hover:bg-gray-50',
      dark: 'text-white hover:bg-[rgba(255,255,255,0.1)]'
    },
    size: {
      sm: 'dash-block-sm',
      md: 'dash-block-md',
      xl: 'dash-block-xl'
    }
  }
});
// Arrow icon
const ChevronDownIcon = ({
  className
}) => jsx("svg", {
  width: '15',
  height: '15',
  viewBox: '0 0 15 15',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  className: className,
  children: jsx("path", {
    d: 'm4.93179 5.43179c0.20081-0.20081 0.52632-0.20081 0.72713 0l2.34108 2.34108 2.34108-2.34108c0.20081-0.20081 0.52632-0.20081 0.72713 0s0.20081 0.52632 0 0.72713l-2.70455 2.70455c-0.20081 0.20081-0.52632 0.20081-0.72713 0l-2.70455-2.70455c-0.20081-0.20081-0.20081-0.52632 0-0.72713z',
    fill: 'currentColor',
    fillRule: 'evenodd',
    clipRule: 'evenodd'
  })
});
/**
 * Overlay menu component that opens above the trigger with overlay positioning.
 * Supports custom content items with onClick handlers.
 */
const OverlayMenu = _a => {
  var {
      className = '',
      colorScheme,
      size,
      error = false,
      success = false,
      border = true,
      filled = false,
      disabled = false,
      items = [],
      showArrow = true,
      name,
      overlayLabel,
      maxHeight = '200px',
      triggerContent,
      placeholder = 'Menu',
      showItemBorders = true
    } = _a,
    props = __rest(_a, ["className", "colorScheme", "size", "error", "success", "border", "filled", "disabled", "items", "showArrow", "name", "overlayLabel", "maxHeight", "triggerContent", "placeholder", "showItemBorders"]);
  const {
    theme
  } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);
  // Determine color scheme based on state
  let finalColorScheme = colorScheme;
  if (error) finalColorScheme = 'error';else if (success) finalColorScheme = 'success';
  const triggerClasses = overlayMenuTrigger({
    theme,
    colorScheme: finalColorScheme,
    size,
    border,
    filled,
    disabled
  }) + ' ' + className;
  const contentClasses = overlayContent({
    theme,
    size
  });
  const itemClasses = overlayItem({
    theme,
    size
  });
  const handleItemClick = item => {
    if (!item.disabled && item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };
  return jsxs("div", {
    className: 'relative',
    children: [jsxs("button", Object.assign({
      ref: triggerRef,
      type: 'button',
      className: triggerClasses,
      onClick: () => !disabled && setIsOpen(!isOpen),
      disabled: disabled,
      name: name
    }, props, {
      children: [jsx("div", {
        className: 'w-full flex-1 text-left',
        children: triggerContent || jsx("span", {
          className: theme === 'dark' ? 'text-gray-400' : 'text-gray-500',
          children: placeholder
        })
      }), showArrow && jsx(ChevronDownIcon, {
        className: `transition-transform ${isOpen ? 'rotate-180' : ''} ${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`
      })]
    })), isOpen && jsxs(Fragment, {
      children: [jsx("div", {
        className: 'fixed inset-0 z-40',
        onClick: () => setIsOpen(false)
      }), jsxs("div", {
        className: `${contentClasses} top-0 left-0 right-0 overflow-y-auto`,
        style: {
          maxHeight
        },
        children: [overlayLabel && jsxs("div", {
          className: `${itemClasses} font-medium border-b rounded-b-none cursor-pointer ${theme === 'dark' ? 'border-[rgba(255,255,255,0.15)]' : 'border-[rgba(12,28,51,0.05)]'}`,
          onClick: () => setIsOpen(false),
          children: [jsx("div", {
            className: 'w-full flex-1',
            children: overlayLabel
          }), jsx("div", {
            className: 'flex items-center pl-1',
            children: jsx(CrossIcon, {
              size: 16,
              color: theme === 'dark' ? '#FFFFFF' : '#0C1C33',
              className: 'cursor-pointer'
            })
          })]
        }), jsx("div", {
          children: items.map((item, index) => jsx("div", {
            className: `${itemClasses} ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${index < items.length - 1 ? `border-b ${theme === 'dark' ? 'border-[rgba(255,255,255,0.15)]' : 'border-[rgba(12,28,51,0.05)]'}` : ''}`,
            onClick: () => handleItemClick(item),
            children: jsx("div", {
              className: 'w-full flex-1',
              children: item.content
            })
          }, item.id))
        })]
      })]
    })]
  });
};

const switchContainer = cva('flex transition-all duration-200 font-inter gap-2', {
  variants: {
    theme: {
      light: 'bg-white border border-gray-100',
      dark: 'bg-dash-primary-dark-blue/10 outline outline-1 outline-white/15 outline-offset-[-1px]'
    },
    size: {
      sm: 'p-1 rounded-xl',
      md: 'p-2 rounded-2xl',
      xl: 'p-3 rounded-3xl'
    },
    disabled: {
      false: '',
      true: 'opacity-60 cursor-not-allowed'
    }
  },
  compoundVariants: [
  // Light theme shadows
  {
    theme: 'light',
    size: 'sm',
    class: 'shadow-sm'
  }, {
    theme: 'light',
    size: 'md',
    class: 'shadow-lg'
  }, {
    theme: 'light',
    size: 'xl',
    class: 'shadow-xl'
  },
  // Dark theme shadows with brand color
  {
    theme: 'dark',
    size: 'sm',
    class: 'shadow-sm shadow-dash-brand/10'
  }, {
    theme: 'dark',
    size: 'md',
    class: 'shadow-lg shadow-dash-brand/10'
  }, {
    theme: 'dark',
    size: 'xl',
    class: 'shadow-xl shadow-dash-brand/10'
  }],
  defaultVariants: {
    theme: 'light',
    size: 'md',
    disabled: false
  }
});
const switchButton = cva('flex-1 text-center transition-all duration-200 font-medium whitespace-nowrap cursor-pointer font-dash-main', {
  variants: {
    theme: {
      light: '',
      dark: ''
    },
    size: {
      sm: 'py-1 px-2 rounded-lg text-sm',
      md: 'py-2 px-3 rounded-[0.625rem] text-[1rem]',
      xl: 'py-3 px-6 rounded-2xl text-lg font-semibold'
    },
    selected: {
      true: '',
      false: ''
    },
    disabled: {
      false: '',
      true: 'cursor-not-allowed opacity-50'
    }
  },
  compoundVariants: [
  // Selected state - light theme
  {
    theme: 'light',
    selected: true,
    class: 'bg-dash-brand text-white'
  },
  // Selected state - dark theme
  {
    theme: 'dark',
    selected: true,
    class: 'bg-dash-brand text-white'
  },
  // Unselected state - light theme
  {
    theme: 'light',
    selected: false,
    disabled: false,
    class: 'text-dash-brand hover:bg-dash-brand/10 active:bg-dash-brand/20'
  },
  // Unselected state - dark theme
  {
    theme: 'dark',
    selected: false,
    disabled: false,
    class: 'text-dash-brand hover:bg-dash-brand/10 active:bg-dash-brand/20'
  },
  // Disabled state - light theme
  {
    theme: 'light',
    selected: false,
    disabled: true,
    class: 'text-gray-400'
  },
  // Disabled state - dark theme
  {
    theme: 'dark',
    selected: false,
    disabled: true,
    class: 'text-gray-500'
  }],
  defaultVariants: {
    theme: 'light',
    size: 'md',
    selected: false,
    disabled: false
  }
});
/**
 * A switch component for selecting between multiple options.
 * Supports individual option disabling, hover states, and responsive sizing.
 * Uses dash design system sizing and theming with automatic light/dark mode.
 * @example
 * // With disabled options
 * <Switch
 *   options={[
 *     { label: 'Basic', value: 'basic' },
 *     { label: 'Pro', value: 'pro', disabled: true },
 *     { label: 'Free', value: 'free' }
 *   ]}
 *   value="basic"
 *   onChange={(value) => console.log(value)}
 * />
 */
function Switch({
  options,
  value,
  onChange,
  size = 'md',
  className = '',
  disabled = false
}) {
  const {
    theme
  } = useTheme();
  const containerClasses = switchContainer({
    theme,
    size,
    disabled
  }) + ' ' + className;
  return jsx("div", {
    className: containerClasses,
    children: options.map((option, index) => {
      const isSelected = option.value === value;
      const isOptionDisabled = disabled || option.disabled;
      return jsx("button", {
        onClick: () => !isOptionDisabled && onChange(option.value),
        disabled: isOptionDisabled,
        className: switchButton({
          theme,
          size,
          selected: isSelected,
          disabled: isOptionDisabled
        }),
        children: option.label
      }, index);
    })
  });
}

// 9 different colors only for easy distinction (also a sweet spot for collisions)
const COLORS_NB = 9;
const DEFAULT_SATURATION = 95;
const DEFAULT_LIGHTNESS = 45;

const MAGIC_NUMBER = 5;


/**
 * @type {(str: string) => number}
 */
function simpleHash(str) {
    return str.split('')
        .reduce((hash, char) => (hash ^ char.charCodeAt(0)) * -5, MAGIC_NUMBER)
        >>> 2 // 32 bit unsigned integer conversion disregarding last 2 bits for better randomness
}

/**
 * @type {import('.').minidenticon}
 */
function minidenticon(seed="", saturation=DEFAULT_SATURATION, lightness=DEFAULT_LIGHTNESS, hashFn=simpleHash) {
    const hash = hashFn(seed);
    // console.log("%c" + hash.toString(2).padStart(32, "0"), "font-family:monospace") // uncomment to debug
    const hue = (hash % COLORS_NB) * (360 / COLORS_NB);
    return [...Array(seed ? 25 : 0)].reduce((acc, e, i) =>
        // testing the 15 lowest weight bits of the hash
        hash & (1 << (i % 15)) ?
            acc + `<rect x="${i > 14 ? 7 - ~~(i / 5) : ~~(i / 5)}" y="${i % 5}" width="1" height="1"/>`
        : acc,
        // xmlns attribute added in case of SVG file generation https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg#sect1
        `<svg viewBox="-1.5 -1.5 8 8" xmlns="http://www.w3.org/2000/svg" fill="hsl(${hue} ${saturation}% ${lightness}%)">`
    )
    + '</svg>'
}

/**
 * @type {void}
 */
// declared as a pure function to be tree-shaken by the bundler
    /*@__PURE__*/globalThis.customElements?.get('minidenticon-svg') ? null :
        globalThis.customElements?.define('minidenticon-svg',
            class MinidenticonSvg extends HTMLElement {
                static observedAttributes = ['username', 'saturation', 'lightness']
                // private fields to allow Terser mangling
                static #memoized = {}
                #isConnected = false
                connectedCallback() {
                    this.#setContent();
                    this.#isConnected = true;
                }
                // attributeChangedCallback() is called for every observed attribute before connectedCallback()
                attributeChangedCallback() { if (this.#isConnected) this.#setContent(); }
                #setContent() {
                    const args = MinidenticonSvg.observedAttributes
                                    .map(key => this.getAttribute(key) || undefined);
                    const memoKey = args.join(',');
                    this.innerHTML = MinidenticonSvg.#memoized[memoKey] ??=
                        // @ts-ignore
                        minidenticon(...args);
                }
            }
        );

/**
 * Avatar component that creates unique identicons from usernames
 * with customizable appearance.
 */
const Avatar = _a => {
  var {
      username,
      className = '',
      saturation = 50,
      lightness = 50
    } = _a,
    props = __rest(_a, ["username", "className", "saturation", "lightness"]);
  const svgURI = useMemo(() => 'data:image/svg+xml;utf8,' + encodeURIComponent(minidenticon(username, saturation, lightness)), [username, saturation, lightness]);
  const containerClasses = `relative inline-block ${className}`.trim();
  const imageClasses = 'w-full h-full';
  return jsx("div", {
    className: containerClasses,
    children: jsx("img", Object.assign({
      src: svgURI,
      alt: username || '',
      className: imageClasses
    }, props))
  });
};

const iconComponents = {
  check: CheckIcon
};
const List$1 = ({
  items,
  iconType = 'check',
  className = '',
  size = 'sm'
}) => {
  const {
    theme
  } = useTheme();
  const IconComponent = iconComponents[iconType];
  return jsx("ul", {
    className: `space-y-5 w-full ${className}`,
    children: items.map((item, index) => jsxs("li", {
      className: 'flex items-start gap-4',
      children: [jsx(IconComponent, {
        size: 20,
        className: 'flex-shrink-0',
        color: theme === 'dark' ? '#4C7EFF' : '#4C7EFF'
      }), jsxs("div", {
        className: 'flex flex-col gap-1',
        children: [jsx(Text, {
          size: size,
          weight: 500,
          children: item.text
        }), item.description && jsx(Text, {
          size: 'xs',
          dim: true,
          className: 'opacity-75',
          children: item.description
        })]
      })]
    }, index))
  });
};

const bigNumberStyles = cva('inline-flex whitespace-nowrap gap-1', {
  variants: {
    theme: {
      light: 'text-gray-900',
      dark: 'text-gray-100'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
/**
 * Splits a numeric string into groups of three characters for display.
 * Supports two variants:
 * - `space`: groups separated by gap
 * - `comma`: groups separated by commas, with decimal part after `.`
 * Supports light/dark theme.
 */
const BigNumber = ({
  children,
  variant = 'space',
  className = ''
}) => {
  const {
    theme
  } = useTheme();
  if (children === undefined || children === null) return null;
  const str = children.toString();
  if (variant === 'space') {
    // group digits every 3, right to left
    const groups = str.split('').reverse().reduce((acc, char, idx) => {
      if (idx % 3 === 0) acc.unshift('');
      acc[0] = char + acc[0];
      return acc;
    }, []);
    return jsx("span", {
      className: `${bigNumberStyles({
        theme
      })} ${className}`,
      children: groups.map((grp, i) => jsx("span", {
        children: grp
      }, i))
    });
  } else {
    // comma variant
    const [intPart, fracPart] = str.split('.');
    const groups = intPart.split('').reverse().reduce((acc, char, idx) => {
      if (idx % 3 === 0) acc.unshift('');
      acc[0] = char + acc[0];
      return acc;
    }, []);
    return jsxs("span", {
      className: `${bigNumberStyles({
        theme
      })} ${className}`,
      children: [groups.map((grp, i) => jsxs("span", {
        children: [jsx("span", {
          children: grp
        }), i < groups.length - 1 && jsx("span", {
          children: ","
        })]
      }, i)), fracPart != null && jsxs(Fragment, {
        children: [jsx("span", {
          children: "."
        }), jsx("span", {
          children: fracPart
        })]
      })]
    });
  }
};

const usePassiveLayoutEffect = React__default[typeof document !== 'undefined' && document.createElement !== void 0 ? 'useLayoutEffect' : 'useEffect'];

const useLatest = current => {
  const storedValue = React.useRef(current);
  React.useEffect(() => {
    storedValue.current = current;
  });
  return storedValue;
};

/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */


/**
 * A React hook that fires a callback whenever ResizeObserver detects a change to its size
 *
 * @param target A React ref created by `useRef()` or an HTML element
 * @param callback Invoked with a single `ResizeObserverEntry` any time
 *   the `target` resizes
 */

function _ref() {}
function useResizeObserver(target, callback, options = {}) {
  const resizeObserver = getResizeObserver(options.polyfill);
  const storedCallback = useLatest(callback);
  usePassiveLayoutEffect(() => {
    let didUnsubscribe = false;
    const targetEl = target && 'current' in target ? target.current : target;
    if (!targetEl) return _ref;
    function cb(entry, observer) {
      if (didUnsubscribe) return;
      storedCallback.current(entry, observer);
    }
    resizeObserver.subscribe(targetEl, cb);
    return () => {
      didUnsubscribe = true;
      resizeObserver.unsubscribe(targetEl, cb);
    };
  }, [target, resizeObserver, storedCallback]);
  return resizeObserver.observer;
}
function createResizeObserver(polyfill) {
  let ticking = false;
  let allEntries = [];
  const callbacks = new Map();
  const observer = new (polyfill || window.ResizeObserver)((entries, obs) => {
    allEntries = allEntries.concat(entries);
    function _ref2() {
      const triggered = new Set();
      for (let i = 0; i < allEntries.length; i++) {
        if (triggered.has(allEntries[i].target)) continue;
        triggered.add(allEntries[i].target);
        const cbs = callbacks.get(allEntries[i].target);
        cbs === null || cbs === void 0 ? void 0 : cbs.forEach(cb => cb(allEntries[i], obs));
      }
      allEntries = [];
      ticking = false;
    }
    if (!ticking) {
      window.requestAnimationFrame(_ref2);
    }
    ticking = true;
  });
  return {
    observer,
    subscribe(target, callback) {
      var _callbacks$get;
      observer.observe(target);
      const cbs = (_callbacks$get = callbacks.get(target)) !== null && _callbacks$get !== void 0 ? _callbacks$get : [];
      cbs.push(callback);
      callbacks.set(target, cbs);
    },
    unsubscribe(target, callback) {
      var _callbacks$get2;
      const cbs = (_callbacks$get2 = callbacks.get(target)) !== null && _callbacks$get2 !== void 0 ? _callbacks$get2 : [];
      if (cbs.length === 1) {
        observer.unobserve(target);
        callbacks.delete(target);
        return;
      }
      const cbIndex = cbs.indexOf(callback);
      if (cbIndex !== -1) cbs.splice(cbIndex, 1);
      callbacks.set(target, cbs);
    }
  };
}
let _resizeObserver;
const getResizeObserver = polyfill => !_resizeObserver ? _resizeObserver = createResizeObserver(polyfill) : _resizeObserver;

/**
 * Hook for debouncing values with extended functionality
 *
 * @param value - Value to debounce
 * @param options - Configuration options
 * @returns Object with debounced value and control methods
 */
const useDebounce = (value, options) => {
  // Backward compatibility support - if number is passed, it's delay
  const config = typeof options === 'number' ? {
    delay: options
  } : options;
  const {
    delay,
    callback,
    immediate = false
  } = config;
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isPending, setIsPending] = useState(false);
  const timeoutRef = useRef(null);
  const isFirstRun = useRef(true);
  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setIsPending(false);
    }
  }, []);
  const flush = useCallback(() => {
    cancel();
    setDebouncedValue(value);
    callback === null || callback === void 0 ? void 0 : callback(value);
    setIsPending(false);
  }, [value, callback, cancel]);
  useEffect(() => {
    // If immediate === true and this is first run, set value immediately
    if (immediate && isFirstRun.current) {
      setDebouncedValue(value);
      callback === null || callback === void 0 ? void 0 : callback(value);
      isFirstRun.current = false;
      return;
    }
    isFirstRun.current = false;
    setIsPending(true);
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      callback === null || callback === void 0 ? void 0 : callback(value);
      setIsPending(false);
      timeoutRef.current = null;
    }, delay);
    timeoutRef.current = handler;
    return () => {
      clearTimeout(handler);
      setIsPending(false);
    };
  }, [value, delay, callback, immediate]);
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  return {
    debouncedValue,
    flush,
    cancel,
    isPending
  };
};

const notActiveStyles = cva('text-sm', {
  variants: {
    theme: {
      light: 'text-gray-400',
      dark: 'text-gray-500'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
function NotActive(_a) {
  var {
      children,
      className
    } = _a,
    props = __rest(_a, ["children", "className"]);
  const {
    theme
  } = useTheme();
  return jsx("span", Object.assign({
    className: `${notActiveStyles({
      theme
    })} ${className !== null && className !== void 0 ? className : ''}`
  }, props, {
    children: children !== null && children !== void 0 ? children : 'n/a'
  }));
}

// src/primitive.tsx
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return function handleEvent(event) {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      return ourEventHandler?.(event);
    }
  };
}

var DISMISSABLE_LAYER_NAME = "DismissableLayer";
var CONTEXT_UPDATE = "dismissableLayer.update";
var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var originalBodyPointerEvents;
var DismissableLayerContext = React.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
});
var DismissableLayer = React.forwardRef(
  (props, forwardedRef) => {
    const {
      disableOutsidePointerEvents = false,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      onDismiss,
      ...layerProps
    } = props;
    const context = React.useContext(DismissableLayerContext);
    const [node, setNode] = React.useState(null);
    const ownerDocument = node?.ownerDocument ?? globalThis?.document;
    const [, force] = React.useState({});
    const composedRefs = useComposedRefs(forwardedRef, (node2) => setNode(node2));
    const layers = Array.from(context.layers);
    const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
    const highestLayerWithOutsidePointerEventsDisabledIndex = layers.indexOf(highestLayerWithOutsidePointerEventsDisabled);
    const index = node ? layers.indexOf(node) : -1;
    const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
    const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
    const pointerDownOutside = usePointerDownOutside((event) => {
      const target = event.target;
      const isPointerDownOnBranch = [...context.branches].some((branch) => branch.contains(target));
      if (!isPointerEventsEnabled || isPointerDownOnBranch) return;
      onPointerDownOutside?.(event);
      onInteractOutside?.(event);
      if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    const focusOutside = useFocusOutside((event) => {
      const target = event.target;
      const isFocusInBranch = [...context.branches].some((branch) => branch.contains(target));
      if (isFocusInBranch) return;
      onFocusOutside?.(event);
      onInteractOutside?.(event);
      if (!event.defaultPrevented) onDismiss?.();
    }, ownerDocument);
    useEscapeKeydown((event) => {
      const isHighestLayer = index === context.layers.size - 1;
      if (!isHighestLayer) return;
      onEscapeKeyDown?.(event);
      if (!event.defaultPrevented && onDismiss) {
        event.preventDefault();
        onDismiss();
      }
    }, ownerDocument);
    React.useEffect(() => {
      if (!node) return;
      if (disableOutsidePointerEvents) {
        if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
          originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
          ownerDocument.body.style.pointerEvents = "none";
        }
        context.layersWithOutsidePointerEventsDisabled.add(node);
      }
      context.layers.add(node);
      dispatchUpdate();
      return () => {
        if (disableOutsidePointerEvents && context.layersWithOutsidePointerEventsDisabled.size === 1) {
          ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
        }
      };
    }, [node, ownerDocument, disableOutsidePointerEvents, context]);
    React.useEffect(() => {
      return () => {
        if (!node) return;
        context.layers.delete(node);
        context.layersWithOutsidePointerEventsDisabled.delete(node);
        dispatchUpdate();
      };
    }, [node, context]);
    React.useEffect(() => {
      const handleUpdate = () => force({});
      document.addEventListener(CONTEXT_UPDATE, handleUpdate);
      return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
    }, []);
    return /* @__PURE__ */ jsx(
      Primitive.div,
      {
        ...layerProps,
        ref: composedRefs,
        style: {
          pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
          ...props.style
        },
        onFocusCapture: composeEventHandlers(props.onFocusCapture, focusOutside.onFocusCapture),
        onBlurCapture: composeEventHandlers(props.onBlurCapture, focusOutside.onBlurCapture),
        onPointerDownCapture: composeEventHandlers(
          props.onPointerDownCapture,
          pointerDownOutside.onPointerDownCapture
        )
      }
    );
  }
);
DismissableLayer.displayName = DISMISSABLE_LAYER_NAME;
var BRANCH_NAME = "DismissableLayerBranch";
var DismissableLayerBranch = React.forwardRef((props, forwardedRef) => {
  const context = React.useContext(DismissableLayerContext);
  const ref = React.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  React.useEffect(() => {
    const node = ref.current;
    if (node) {
      context.branches.add(node);
      return () => {
        context.branches.delete(node);
      };
    }
  }, [context.branches]);
  return /* @__PURE__ */ jsx(Primitive.div, { ...props, ref: composedRefs });
});
DismissableLayerBranch.displayName = BRANCH_NAME;
function usePointerDownOutside(onPointerDownOutside, ownerDocument = globalThis?.document) {
  const handlePointerDownOutside = useCallbackRef$1(onPointerDownOutside);
  const isPointerInsideReactTreeRef = React.useRef(false);
  const handleClickRef = React.useRef(() => {
  });
  React.useEffect(() => {
    const handlePointerDown = (event) => {
      if (event.target && !isPointerInsideReactTreeRef.current) {
        let handleAndDispatchPointerDownOutsideEvent2 = function() {
          handleAndDispatchCustomEvent(
            POINTER_DOWN_OUTSIDE,
            handlePointerDownOutside,
            eventDetail,
            { discrete: true }
          );
        };
        const eventDetail = { originalEvent: event };
        if (event.pointerType === "touch") {
          ownerDocument.removeEventListener("click", handleClickRef.current);
          handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
          ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
        } else {
          handleAndDispatchPointerDownOutsideEvent2();
        }
      } else {
        ownerDocument.removeEventListener("click", handleClickRef.current);
      }
      isPointerInsideReactTreeRef.current = false;
    };
    const timerId = window.setTimeout(() => {
      ownerDocument.addEventListener("pointerdown", handlePointerDown);
    }, 0);
    return () => {
      window.clearTimeout(timerId);
      ownerDocument.removeEventListener("pointerdown", handlePointerDown);
      ownerDocument.removeEventListener("click", handleClickRef.current);
    };
  }, [ownerDocument, handlePointerDownOutside]);
  return {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => isPointerInsideReactTreeRef.current = true
  };
}
function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
  const handleFocusOutside = useCallbackRef$1(onFocusOutside);
  const isFocusInsideReactTreeRef = React.useRef(false);
  React.useEffect(() => {
    const handleFocus = (event) => {
      if (event.target && !isFocusInsideReactTreeRef.current) {
        const eventDetail = { originalEvent: event };
        handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, eventDetail, {
          discrete: false
        });
      }
    };
    ownerDocument.addEventListener("focusin", handleFocus);
    return () => ownerDocument.removeEventListener("focusin", handleFocus);
  }, [ownerDocument, handleFocusOutside]);
  return {
    onFocusCapture: () => isFocusInsideReactTreeRef.current = true,
    onBlurCapture: () => isFocusInsideReactTreeRef.current = false
  };
}
function dispatchUpdate() {
  const event = new CustomEvent(CONTEXT_UPDATE);
  document.dispatchEvent(event);
}
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
  const target = detail.originalEvent.target;
  const event = new CustomEvent(name, { bubbles: false, cancelable: true, detail });
  if (handler) target.addEventListener(name, handler, { once: true });
  if (discrete) {
    dispatchDiscreteCustomEvent(target, event);
  } else {
    target.dispatchEvent(event);
  }
}

var count = 0;
function useFocusGuards() {
  React.useEffect(() => {
    const edgeGuards = document.querySelectorAll("[data-radix-focus-guard]");
    document.body.insertAdjacentElement("afterbegin", edgeGuards[0] ?? createFocusGuard());
    document.body.insertAdjacentElement("beforeend", edgeGuards[1] ?? createFocusGuard());
    count++;
    return () => {
      if (count === 1) {
        document.querySelectorAll("[data-radix-focus-guard]").forEach((node) => node.remove());
      }
      count--;
    };
  }, []);
}
function createFocusGuard() {
  const element = document.createElement("span");
  element.setAttribute("data-radix-focus-guard", "");
  element.tabIndex = 0;
  element.style.outline = "none";
  element.style.opacity = "0";
  element.style.position = "fixed";
  element.style.pointerEvents = "none";
  return element;
}

var POPPER_NAME = "Popper";
var [createPopperContext, createPopperScope] = createContextScope(POPPER_NAME);
var [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME);
var Popper = (props) => {
  const { __scopePopper, children } = props;
  const [anchor, setAnchor] = React.useState(null);
  return /* @__PURE__ */ jsx(PopperProvider, { scope: __scopePopper, anchor, onAnchorChange: setAnchor, children });
};
Popper.displayName = POPPER_NAME;
var ANCHOR_NAME$1 = "PopperAnchor";
var PopperAnchor = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopper, virtualRef, ...anchorProps } = props;
    const context = usePopperContext(ANCHOR_NAME$1, __scopePopper);
    const ref = React.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const anchorRef = React.useRef(null);
    React.useEffect(() => {
      const previousAnchor = anchorRef.current;
      anchorRef.current = virtualRef?.current || ref.current;
      if (previousAnchor !== anchorRef.current) {
        context.onAnchorChange(anchorRef.current);
      }
    });
    return virtualRef ? null : /* @__PURE__ */ jsx(Primitive.div, { ...anchorProps, ref: composedRefs });
  }
);
PopperAnchor.displayName = ANCHOR_NAME$1;
var CONTENT_NAME$3 = "PopperContent";
var [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME$3);
var PopperContent = React.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopePopper,
      side = "bottom",
      sideOffset = 0,
      align = "center",
      alignOffset = 0,
      arrowPadding = 0,
      avoidCollisions = true,
      collisionBoundary = [],
      collisionPadding: collisionPaddingProp = 0,
      sticky = "partial",
      hideWhenDetached = false,
      updatePositionStrategy = "optimized",
      onPlaced,
      ...contentProps
    } = props;
    const context = usePopperContext(CONTENT_NAME$3, __scopePopper);
    const [content, setContent] = React.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setContent(node));
    const [arrow$1, setArrow] = React.useState(null);
    const arrowSize = useSize(arrow$1);
    const arrowWidth = arrowSize?.width ?? 0;
    const arrowHeight = arrowSize?.height ?? 0;
    const desiredPlacement = side + (align !== "center" ? "-" + align : "");
    const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : { top: 0, right: 0, bottom: 0, left: 0, ...collisionPaddingProp };
    const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
    const hasExplicitBoundaries = boundary.length > 0;
    const detectOverflowOptions = {
      padding: collisionPadding,
      boundary: boundary.filter(isNotNull),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: hasExplicitBoundaries
    };
    const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: desiredPlacement,
      whileElementsMounted: (...args) => {
        const cleanup = autoUpdate(...args, {
          animationFrame: updatePositionStrategy === "always"
        });
        return cleanup;
      },
      elements: {
        reference: context.anchor
      },
      middleware: [
        offset({ mainAxis: sideOffset + arrowHeight, alignmentAxis: alignOffset }),
        avoidCollisions && shift({
          mainAxis: true,
          crossAxis: false,
          limiter: sticky === "partial" ? limitShift() : void 0,
          ...detectOverflowOptions
        }),
        avoidCollisions && flip({ ...detectOverflowOptions }),
        size({
          ...detectOverflowOptions,
          apply: ({ elements, rects, availableWidth, availableHeight }) => {
            const { width: anchorWidth, height: anchorHeight } = rects.reference;
            const contentStyle = elements.floating.style;
            contentStyle.setProperty("--radix-popper-available-width", `${availableWidth}px`);
            contentStyle.setProperty("--radix-popper-available-height", `${availableHeight}px`);
            contentStyle.setProperty("--radix-popper-anchor-width", `${anchorWidth}px`);
            contentStyle.setProperty("--radix-popper-anchor-height", `${anchorHeight}px`);
          }
        }),
        arrow$1 && arrow({ element: arrow$1, padding: arrowPadding }),
        transformOrigin({ arrowWidth, arrowHeight }),
        hideWhenDetached && hide({ strategy: "referenceHidden", ...detectOverflowOptions })
      ]
    });
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
    const handlePlaced = useCallbackRef$1(onPlaced);
    useLayoutEffect2(() => {
      if (isPositioned) {
        handlePlaced?.();
      }
    }, [isPositioned, handlePlaced]);
    const arrowX = middlewareData.arrow?.x;
    const arrowY = middlewareData.arrow?.y;
    const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
    const [contentZIndex, setContentZIndex] = React.useState();
    useLayoutEffect2(() => {
      if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
    }, [content]);
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref: refs.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...floatingStyles,
          transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: contentZIndex,
          ["--radix-popper-transform-origin"]: [
            middlewareData.transformOrigin?.x,
            middlewareData.transformOrigin?.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...middlewareData.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: props.dir,
        children: /* @__PURE__ */ jsx(
          PopperContentProvider,
          {
            scope: __scopePopper,
            placedSide,
            onArrowChange: setArrow,
            arrowX,
            arrowY,
            shouldHideArrow: cannotCenterArrow,
            children: /* @__PURE__ */ jsx(
              Primitive.div,
              {
                "data-side": placedSide,
                "data-align": placedAlign,
                ...contentProps,
                ref: composedRefs,
                style: {
                  ...contentProps.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: !isPositioned ? "none" : void 0
                }
              }
            )
          }
        )
      }
    );
  }
);
PopperContent.displayName = CONTENT_NAME$3;
var ARROW_NAME$1 = "PopperArrow";
var OPPOSITE_SIDE = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
};
var PopperArrow = React.forwardRef(function PopperArrow2(props, forwardedRef) {
  const { __scopePopper, ...arrowProps } = props;
  const contentContext = useContentContext(ARROW_NAME$1, __scopePopper);
  const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ jsx(
      "span",
      {
        ref: contentContext.onArrowChange,
        style: {
          position: "absolute",
          left: contentContext.arrowX,
          top: contentContext.arrowY,
          [baseSide]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[contentContext.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: `rotate(180deg)`,
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[contentContext.placedSide],
          visibility: contentContext.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ jsx(
          Root$2,
          {
            ...arrowProps,
            ref: forwardedRef,
            style: {
              ...arrowProps.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
PopperArrow.displayName = ARROW_NAME$1;
function isNotNull(value) {
  return value !== null;
}
var transformOrigin = (options) => ({
  name: "transformOrigin",
  options,
  fn(data) {
    const { placement, rects, middlewareData } = data;
    const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
    const isArrowHidden = cannotCenterArrow;
    const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
    const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
    const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
    const noArrowAlign = { start: "0%", center: "50%", end: "100%" }[placedAlign];
    const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
    const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
    let x = "";
    let y = "";
    if (placedSide === "bottom") {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${-arrowHeight}px`;
    } else if (placedSide === "top") {
      x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
      y = `${rects.floating.height + arrowHeight}px`;
    } else if (placedSide === "right") {
      x = `${-arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    } else if (placedSide === "left") {
      x = `${rects.floating.width + arrowHeight}px`;
      y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
    }
    return { data: { x, y } };
  }
});
function getSideAndAlignFromPlacement(placement) {
  const [side, align = "center"] = placement.split("-");
  return [side, align];
}
var Root2$2 = Popper;
var Anchor = PopperAnchor;
var Content$2 = PopperContent;
var Arrow = PopperArrow;

function useStateMachine$1(initialState, machine) {
  return React.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}

// src/presence.tsx
var Presence$1 = (props) => {
  const { present, children } = props;
  const presence = usePresence$1(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : React.Children.only(children);
  const ref = useComposedRefs(presence.ref, getElementRef$1(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? React.cloneElement(child, { ref }) : null;
};
Presence$1.displayName = "Presence";
function usePresence$1(present) {
  const [node, setNode] = React.useState();
  const stylesRef = React.useRef(null);
  const prevPresentRef = React.useRef(present);
  const prevAnimationNameRef = React.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine$1(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  React.useEffect(() => {
    const currentAnimationName = getAnimationName$1(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect2(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName$1(styles);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || styles?.display === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName$1(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName$1(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: React.useCallback((node2) => {
      stylesRef.current = node2 ? getComputedStyle(node2) : null;
      setNode(node2);
    }, [])
  };
}
function getAnimationName$1(styles) {
  return styles?.animationName || "none";
}
function getElementRef$1(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}

var POPOVER_NAME = "Popover";
var [createPopoverContext, createPopoverScope] = createContextScope(POPOVER_NAME, [
  createPopperScope
]);
var usePopperScope = createPopperScope();
var [PopoverProvider, usePopoverContext] = createPopoverContext(POPOVER_NAME);
var Popover = (props) => {
  const {
    __scopePopover,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = false
  } = props;
  const popperScope = usePopperScope(__scopePopover);
  const triggerRef = React.useRef(null);
  const [hasCustomAnchor, setHasCustomAnchor] = React.useState(false);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: POPOVER_NAME
  });
  return /* @__PURE__ */ jsx(Root2$2, { ...popperScope, children: /* @__PURE__ */ jsx(
    PopoverProvider,
    {
      scope: __scopePopover,
      contentId: useId(),
      triggerRef,
      open,
      onOpenChange: setOpen,
      onOpenToggle: React.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      hasCustomAnchor,
      onCustomAnchorAdd: React.useCallback(() => setHasCustomAnchor(true), []),
      onCustomAnchorRemove: React.useCallback(() => setHasCustomAnchor(false), []),
      modal,
      children
    }
  ) });
};
Popover.displayName = POPOVER_NAME;
var ANCHOR_NAME = "PopoverAnchor";
var PopoverAnchor = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...anchorProps } = props;
    const context = usePopoverContext(ANCHOR_NAME, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const { onCustomAnchorAdd, onCustomAnchorRemove } = context;
    React.useEffect(() => {
      onCustomAnchorAdd();
      return () => onCustomAnchorRemove();
    }, [onCustomAnchorAdd, onCustomAnchorRemove]);
    return /* @__PURE__ */ jsx(Anchor, { ...popperScope, ...anchorProps, ref: forwardedRef });
  }
);
PopoverAnchor.displayName = ANCHOR_NAME;
var TRIGGER_NAME$2 = "PopoverTrigger";
var PopoverTrigger = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...triggerProps } = props;
    const context = usePopoverContext(TRIGGER_NAME$2, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    const trigger = /* @__PURE__ */ jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState$1(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
    return context.hasCustomAnchor ? trigger : /* @__PURE__ */ jsx(Anchor, { asChild: true, ...popperScope, children: trigger });
  }
);
PopoverTrigger.displayName = TRIGGER_NAME$2;
var PORTAL_NAME$1 = "PopoverPortal";
var [PortalProvider$1, usePortalContext$1] = createPopoverContext(PORTAL_NAME$1, {
  forceMount: void 0
});
var PopoverPortal = (props) => {
  const { __scopePopover, forceMount, children, container } = props;
  const context = usePopoverContext(PORTAL_NAME$1, __scopePopover);
  return /* @__PURE__ */ jsx(PortalProvider$1, { scope: __scopePopover, forceMount, children: /* @__PURE__ */ jsx(Presence$1, { present: forceMount || context.open, children: /* @__PURE__ */ jsx(Portal$3, { asChild: true, container, children }) }) });
};
PopoverPortal.displayName = PORTAL_NAME$1;
var CONTENT_NAME$2 = "PopoverContent";
var PopoverContent = React.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext$1(CONTENT_NAME$2, props.__scopePopover);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = usePopoverContext(CONTENT_NAME$2, props.__scopePopover);
    return /* @__PURE__ */ jsx(Presence$1, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsx(PopoverContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsx(PopoverContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
PopoverContent.displayName = CONTENT_NAME$2;
var Slot$1 = createSlot("PopoverContent.RemoveScroll");
var PopoverContentModal = React.forwardRef(
  (props, forwardedRef) => {
    const context = usePopoverContext(CONTENT_NAME$2, props.__scopePopover);
    const contentRef = React.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    const isRightClickOutsideRef = React.useRef(false);
    React.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsx(ReactRemoveScroll, { as: Slot$1, allowPinchZoom: true, children: /* @__PURE__ */ jsx(
      PopoverContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          event.preventDefault();
          if (!isRightClickOutsideRef.current) context.triggerRef.current?.focus();
        }),
        onPointerDownOutside: composeEventHandlers(
          props.onPointerDownOutside,
          (event) => {
            const originalEvent = event.detail.originalEvent;
            const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
            const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
            isRightClickOutsideRef.current = isRightClick;
          },
          { checkForDefaultPrevented: false }
        ),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault(),
          { checkForDefaultPrevented: false }
        )
      }
    ) });
  }
);
var PopoverContentNonModal = React.forwardRef(
  (props, forwardedRef) => {
    const context = usePopoverContext(CONTENT_NAME$2, props.__scopePopover);
    const hasInteractedOutsideRef = React.useRef(false);
    const hasPointerDownOutsideRef = React.useRef(false);
    return /* @__PURE__ */ jsx(
      PopoverContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          props.onCloseAutoFocus?.(event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          props.onInteractOutside?.(event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = context.triggerRef.current?.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var PopoverContentImpl = React.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopePopover,
      trapFocus,
      onOpenAutoFocus,
      onCloseAutoFocus,
      disableOutsidePointerEvents,
      onEscapeKeyDown,
      onPointerDownOutside,
      onFocusOutside,
      onInteractOutside,
      ...contentProps
    } = props;
    const context = usePopoverContext(CONTENT_NAME$2, __scopePopover);
    const popperScope = usePopperScope(__scopePopover);
    useFocusGuards();
    return /* @__PURE__ */ jsx(
      FocusScope,
      {
        asChild: true,
        loop: true,
        trapped: trapFocus,
        onMountAutoFocus: onOpenAutoFocus,
        onUnmountAutoFocus: onCloseAutoFocus,
        children: /* @__PURE__ */ jsx(
          DismissableLayer,
          {
            asChild: true,
            disableOutsidePointerEvents,
            onInteractOutside,
            onEscapeKeyDown,
            onPointerDownOutside,
            onFocusOutside,
            onDismiss: () => context.onOpenChange(false),
            children: /* @__PURE__ */ jsx(
              Content$2,
              {
                "data-state": getState$1(context.open),
                role: "dialog",
                id: context.contentId,
                ...popperScope,
                ...contentProps,
                ref: forwardedRef,
                style: {
                  ...contentProps.style,
                  // re-namespace exposed content custom properties
                  ...{
                    "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                    "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                    "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                    "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                    "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                  }
                }
              }
            )
          }
        )
      }
    );
  }
);
var CLOSE_NAME$1 = "PopoverClose";
var PopoverClose = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...closeProps } = props;
    const context = usePopoverContext(CLOSE_NAME$1, __scopePopover);
    return /* @__PURE__ */ jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
PopoverClose.displayName = CLOSE_NAME$1;
var ARROW_NAME = "PopoverArrow";
var PopoverArrow = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopePopover, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopePopover);
    return /* @__PURE__ */ jsx(Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef });
  }
);
PopoverArrow.displayName = ARROW_NAME;
function getState$1(open) {
  return open ? "open" : "closed";
}
var Root2$1 = Popover;
var Trigger$2 = PopoverTrigger;
var Portal$1 = PopoverPortal;
var Content2 = PopoverContent;
var Arrow2 = PopoverArrow;

/**
 * Copy a string to the clipboard and invoke a callback with the result.
 *
 * @param copyText  The text to copy. Defaults to empty string.
 * @param callback  Optional callback that will be called with { status: true } on success,
 *                  or { status: false, message: error } on failure.
 */
function copyToClipboard(copyText = '', callback) {
  navigator.clipboard.writeText(copyText).then(() => {
    const result = {
      status: true
    };
    callback === null || callback === void 0 ? void 0 : callback(result);
  }).catch(err => {
    const result = {
      status: false,
      message: err
    };
    callback === null || callback === void 0 ? void 0 : callback(result);
  });
}

const copyBtn = cva('p-0 flex-shrink-0 h-[max-content] min-w-0 bg-transparent transition-colors', {
  variants: {
    theme: {
      light: 'hover:text-gray-600 active:text-gray-800',
      dark: 'hover:text-gray-300 active:text-gray-100'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const CopyButton = _a => {
  var {
      text,
      className,
      onCopy
    } = _a,
    props = __rest(_a, ["text", "className", "onCopy"]);
  const {
    theme
  } = useTheme();
  const [open, setOpen] = useState(false);
  const handleCopy = e => {
    e.stopPropagation();
    e.preventDefault();
    copyToClipboard(text, onCopy);
    setOpen(true);
    setTimeout(() => setOpen(false), 1000);
  };
  return jsxs(Root2$1, {
    open: open,
    children: [jsx(Trigger$2, {
      asChild: true,
      children: jsx("button", Object.assign({
        type: 'button',
        className: `${copyBtn({
          theme
        })} ${className !== null && className !== void 0 ? className : ''} hover:cursor-pointer`,
        onClick: handleCopy
      }, props, {
        children: jsx(CopyIcon, {
          className: 'w-4 h-4 transition',
          color: theme === 'light' ? '#000000' : '#ffffff'
        })
      }))
    }), jsx(Portal$1, {
      children: jsxs(Content2, {
        className: 'bg-white text-gray-900 text-sm px-2 py-1 rounded shadow-lg',
        side: 'top',
        sideOffset: 5,
        children: ["Copied", jsx(Arrow2, {
          className: 'fill-white'
        })]
      })
    })]
  });
};

/** CVA for the root container, now with light/dark theme */
const identifier = cva('flex items-center font-dash-grotesque text-sm font-normal break-all', {
  variants: {
    theme: {
      light: 'text-gray-900',
      dark: 'text-white'
    },
    ellipsis: {
      false: '',
      true: 'overflow-hidden'
    },
    highlight: {
      default: '',
      dim: '',
      highlight: '',
      first: '',
      last: '',
      both: ''
    }
  },
  defaultVariants: {
    theme: 'light',
    ellipsis: false,
    highlight: 'default'
  }
});
/** CVA for each symbol span: inherits root color or dims */
const symbol = cva('flex-1', {
  variants: {
    dim: {
      false: 'text-inherit',
      true: 'text-gray-500'
    }
  },
  defaultVariants: {
    dim: false
  }
});
/** Highlight‐modes config */
const highlightModes = {
  default: {
    first: true,
    middle: false,
    last: true
  },
  dim: {
    first: false,
    middle: false,
    last: false
  },
  highlight: {
    first: true,
    middle: true,
    last: true
  },
  first: {
    first: true,
    middle: false,
    last: false
  },
  last: {
    first: false,
    middle: false,
    last: true
  },
  both: {
    first: true,
    middle: false,
    last: true
  }
};
const HighlightedID = ({
  children,
  mode
}) => {
  if (children == null || children === '') return jsx(NotActive, {});
  const text = String(children);
  const count = 5;
  const first = text.slice(0, count);
  const middle = text.slice(count, text.length - count);
  const last = text.slice(-5);
  const cfg = highlightModes[mode];
  return jsxs(Fragment, {
    children: [jsx("span", {
      className: symbol({
        dim: !cfg.first
      }),
      children: first
    }), jsx("span", {
      className: symbol({
        dim: !cfg.middle
      }),
      children: middle
    }), jsx("span", {
      className: symbol({
        dim: !cfg.last
      }),
      children: last
    })]
  });
};
const MiddleEllipsisText = ({
  children,
  edgeChars
}) => {
  if (children == null || children === '') return jsx(NotActive, {});
  const text = String(children);
  if (text.length <= edgeChars * 2) {
    return jsx(Fragment, {
      children: text
    });
  }
  const first = text.slice(0, edgeChars);
  const last = text.slice(-edgeChars);
  return jsxs(Fragment, {
    children: [jsx("span", {
      children: first
    }), jsx("span", {
      className: 'opacity-50',
      children: "\u2026"
    }), jsx("span", {
      children: last
    })]
  });
};
/**
 * Identifier component shows an ID string with optional highlighting, avatar,
 * copy button, dynamic line adjustment, and multi-line clamp.
 */
const Identifier = ({
  children,
  ellipsis = false,
  highlight = undefined,
  avatar = false,
  copyButton = false,
  linesAdjustment = true,
  maxLines = 0,
  className,
  middleEllipsis = false,
  edgeChars = 4
}) => {
  const {
    theme
  } = useTheme();
  const symbolsRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [charWidth, setCharWidth] = useState(0);
  const [linesMaxWidth, setLinesMaxWidth] = useState('none');
  const [widthCounted, setWidthCounted] = useState(false);
  const prevWinRef = useRef(null);
  const [winWidth, setWinWidth] = useState(0);
  const {
    debouncedValue: debouncedWin,
    cancel: cancelDebounce
  } = useDebounce(winWidth, {
    delay: 500,
    callback: newWidth => {
      // Log window width changes for debugging (optional)
      // console.log('Window width debounced to:', newWidth)
    }
  });
  if ((ellipsis !== null && ellipsis !== void 0 ? ellipsis : false) || maxLines > 0 || middleEllipsis) linesAdjustment = false;
  useResizeObserver(symbolsRef, entry => {
    setContainerWidth(entry.contentRect.width);
  });
  const measureChar = useCallback(() => {
    if (symbolsRef.current == null || !linesAdjustment) return 0;
    const temp = document.createElement('span');
    const styles = getComputedStyle(symbolsRef.current);
    temp.style.position = 'absolute';
    temp.style.visibility = 'hidden';
    temp.style.fontFamily = styles.fontFamily;
    temp.style.fontSize = styles.fontSize;
    temp.style.fontWeight = styles.fontWeight;
    temp.textContent = 'A';
    document.body.appendChild(temp);
    const w = temp.getBoundingClientRect().width;
    document.body.removeChild(temp);
    return w > 0 ? w : 0;
  }, [linesAdjustment]);
  useEffect(() => {
    if (symbolsRef.current == null || !linesAdjustment) return;
    const measuredWidth = measureChar();
    setCharWidth(measuredWidth > 0 ? measuredWidth : 0);
  }, [measureChar]);
  const updateSize = () => {
    var _a;
    if (widthCounted) return;
    const len = (_a = children === null || children === void 0 ? void 0 : children.length) !== null && _a !== void 0 ? _a : 0;
    if (charWidth === 0 || containerWidth === 0 || len === 0) {
      setLinesMaxWidth('none');
      return;
    }
    const spacingF = 0.1625;
    const perLine = Math.floor(containerWidth / charWidth + spacingF);
    if (perLine <= len / 8 || perLine > len) {
      setLinesMaxWidth('none');
      return;
    }
    const lines = Math.max(Math.ceil(len / perLine), 1);
    const adjust = 0.7;
    const width = charWidth * (len / lines + adjust);
    setLinesMaxWidth(`${width}px`);
    setWidthCounted(true);
  };
  useEffect(() => {
    if (!linesAdjustment) return;
    if (debouncedWin !== prevWinRef.current || !widthCounted || prevWinRef.current === null) {
      updateSize();
    }
    prevWinRef.current = debouncedWin;
  }, [charWidth, containerWidth, debouncedWin]);
  useEffect(() => {
    if (!linesAdjustment) return;
    let prev = window.innerWidth;
    const handler = () => {
      const cur = window.innerWidth;
      if (cur !== prev) {
        setWinWidth(cur);
        setWidthCounted(false);
        prev = cur;
      }
    };
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
      // Cancel pending debounce on unmount
      cancelDebounce();
    };
  }, [cancelDebounce]);
  const rootClass = identifier({
    theme,
    ellipsis,
    highlight
  }) + (className != null && className !== '' ? ` ${className}` : '');
  const clampStyles = maxLines > 0 ? {
    display: '-webkit-box',
    WebkitLineClamp: maxLines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  } : {};
  const symbolContainerClass = ellipsis === true ? 'flex-1 overflow-hidden whitespace-nowrap text-ellipsis' : 'flex-1 leading-[1rem]';
  return jsxs("div", {
    className: rootClass,
    children: [(avatar !== null && avatar !== void 0 ? avatar : false) && children != null && children !== '' && jsx(Avatar, {
      username: children,
      className: 'w-6 h-6 mr-2 flex-shrink-0'
    }), jsx("div", {
      ref: symbolsRef,
      className: symbolContainerClass,
      style: Object.assign(Object.assign({}, widthCounted && maxLines === 0 ? {
        maxWidth: linesMaxWidth
      } : {}), clampStyles),
      children: children != null && children !== '' && middleEllipsis ? jsx(MiddleEllipsisText, {
        edgeChars: edgeChars,
        children: children
      }) : children != null && children !== '' && highlight != null ? jsx(HighlightedID, {
        mode: highlight,
        children: children
      }) : children !== null && children !== void 0 ? children : jsx(NotActive, {})
    }), (copyButton !== null && copyButton !== void 0 ? copyButton : false) && children != null && children !== '' && jsx(CopyButton, {
      className: 'ml-3',
      text: children
    })]
  });
};

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-[2.375rem] leading-[1.3]',
  '3xl': 'text-[3rem] leading-[1.2]'
};
const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold'
};
const colorClasses = {
  light: {
    black: 'text-black',
    gray: 'text-gray-600',
    blue: 'text-blue-600',
    red: 'text-red-600',
    green: 'text-green-600'
  },
  dark: {
    black: 'text-white',
    gray: 'text-gray-300',
    blue: 'text-blue-400',
    red: 'text-red-400',
    green: 'text-green-400'
  }
};
const Heading = ({
  as = 'h1',
  size = '2xl',
  weight = 'extrabold',
  color = 'black',
  className = '',
  children
}) => {
  const {
    theme
  } = useTheme();
  const Component = as;
  const classes = [sizeClasses[size], weightClasses[weight], colorClasses[theme][color], 'tracking-[-0.4px]', className].filter(Boolean).join(' ');
  return jsx(Component, {
    className: classes,
    children: children
  });
};

/**
 * Returns the number of whole days between two dates.
 * Rounds up any partial day.
 *
 * @param startDate - The start date (Date | ISO string | timestamp)
 * @param endDate   - The end date (Date | ISO string | timestamp)
 * @returns Number of days difference, or 0 if either date is missing/invalid
 */
/**
 * Returns a human-readable difference between two dates.
 *
 * - `default`: largest unit with suffix (`"2d ago"`, `"5h left"`, etc.)
 * - `detailed`: full breakdown as `"Xd:Yh:Zm"`
 *
 * If inputs are invalid, returns `"n/a"` or `"Invalid format"`.
 *
 * @param startDate - The start date (Date | ISO string | timestamp)
 * @param endDate   - The end date (Date | ISO string | timestamp)
 * @param format    - `'default'` or `'detailed'`
 * @returns A string describing the time delta
 */
function getTimeDelta(startDate, endDate, format = 'default') {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'n/a';
  }
  const diffMs = end.getTime() - start.getTime();
  const isFuture = diffMs > 0;
  const absMs = Math.abs(diffMs);
  const days = Math.floor(absMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(absMs % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  const minutes = Math.floor(absMs % (1000 * 60 * 60) / (1000 * 60));
  const seconds = Math.floor(absMs % (1000 * 60) / 1000);
  if (format === 'default') {
    const suffix = isFuture ? 'left' : 'ago';
    if (days > 0) {
      return `${days}d ${suffix}`;
    }
    if (hours > 0) {
      return `${hours}h ${suffix}`;
    }
    if (minutes > 0) {
      return `${minutes} min. ${suffix}`;
    }
    return `${seconds} sec. ${suffix}`;
  }
  if (format === 'detailed') {
    return `${days}d:${hours}h:${minutes}m`;
  }
  return 'Invalid format';
}

const wrapperStyles$1 = cva('inline', {
  variants: {
    theme: {
      light: 'text-gray-900',
      dark: 'text-gray-100'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
/**
 * TimeDelta component renews a human-readable delta string periodically,
 * and optionally wraps it in a tooltip showing the exact date/time.
 * Supports light/dark theme.
 */
const TimeDelta = ({
  startDate,
  endDate,
  // showTimestampTooltip = true,
  // tooltipDate,
  format = 'default'
}) => {
  const {
    theme
  } = useTheme();
  const [timeDelta, setTimeDelta] = useState(null);
  // const tooltipDateObj = new Date(tooltipDate ?? endDate)
  useEffect(() => {
    if (endDate == null) {
      setTimeDelta(null);
      return;
    }
    let timeoutId;
    const updateDelta = () => {
      const start = startDate != null ? new Date(startDate) : new Date();
      const end = new Date(endDate);
      setTimeDelta(getTimeDelta(start, end, format));
      const now = new Date();
      const diffMs = Math.abs(end.getTime() - now.getTime());
      if (diffMs > 60000) {
        const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
        timeoutId = setTimeout(updateDelta, msToNextMinute);
      } else {
        timeoutId = setTimeout(updateDelta, 1000);
      }
    };
    updateDelta();
    return () => clearTimeout(timeoutId);
  }, [startDate, endDate, format]);
  if (timeDelta == null || timeDelta === '') {
    return jsx(NotActive, {});
  }
  // const showTooltip = showTimestampTooltip && format !== 'detailed' && !isNaN(tooltipDateObj.getTime())
  const content = jsx("span", {
    className: wrapperStyles$1({
      theme
    }),
    children: timeDelta
  });
  // if (showTooltip) {
  //   return (
  //     <Tooltip
  //       placement="top"
  //       content={
  //         <span className={tooltipContentStyles()}>
  //           {tooltipDateObj.toLocaleDateString()}{' '}{tooltipDateObj.toLocaleTimeString()}
  //         </span>
  //       }
  //     >
  //       {content}
  //     </Tooltip>
  //   )
  // }
  return content;
};

const wrapperStyles = cva('');
const infoContainer = cva('flex flex-wrap items-center whitespace-nowrap -mt-1 -mb-1');
const itemStyles = cva('mt-1 mb-1 mr-2 last:mr-0');
const dateTextStyles = cva('text-[0.813rem]', {
  variants: {
    theme: {
      light: 'text-gray-900',
      dark: 'text-gray-100'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const deltaContainerStyles = cva('inline-block px-[10px] py-[3px] border rounded-[4px] text-[0.688rem]', {
  variants: {
    theme: {
      light: 'border-[rgba(147,170,178,0.4)] text-[var(--chakra-colors-gray-250)]',
      dark: 'border-gray-600 text-gray-400'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
/**
 * DateBlock component displays a date, optional calendar icon,
 * and relative time via TimeDelta. It can also show an optional
 * tooltip with the relative time when hovered. Supports light/dark theme.
 */
const DateBlock = ({
  timestamp,
  format = 'all',
  showTime = false,
  // showRelativeTooltip = false,
  className = ''
}) => {
  const {
    theme
  } = useTheme();
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return null;
  const modes = {
    all: {
      calendarIcon: true,
      date: true,
      delta: true
    },
    deltaOnly: {
      calendarIcon: false,
      date: false,
      delta: true
    },
    dateOnly: {
      calendarIcon: false,
      date: true,
      delta: false
    }
  };
  const options = Object.assign({
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }, showTime ? {
    hour: '2-digit',
    minute: '2-digit'
  } : {});
  const formattedDate = date.toLocaleDateString('en-GB', options);
  // const tooltipContent = showRelativeTooltip
  //   ? <TimeDelta endDate={timestamp} showTimestampTooltip={false} />
  //   : null
  const content = jsxs("div", {
    className: infoContainer(),
    children: [modes[format].calendarIcon && jsx(CalendarIcon, {
      className: `${itemStyles()} w-[12px] h-[14px]`,
      color: theme === 'dark' ? '#9CA3AF' : '#93AAB2'
    }), modes[format].date && jsx("div", {
      className: `${itemStyles()} ${dateTextStyles({
        theme
      })}`,
      children: formattedDate
    }), modes[format].delta && jsx("div", {
      className: `${itemStyles()} ${deltaContainerStyles({
        theme
      })}`,
      children: jsx(TimeDelta, {
        endDate: date,
        showTimestampTooltip: format !== 'all'
      })
    })]
  });
  const wrapperClass = `${wrapperStyles()} ${className !== '' ? ` ${className}` : ''}`;
  return jsx("div", {
    className: wrapperClass,
    children: content
  });
  // return tooltipContent ? (
  //   <Tooltip placement="top" content={tooltipContent}>
  //     <div className={wrapperClass}>{content}</div>
  //   </Tooltip>
  // ) : (
  //   <div className={wrapperClass}>{content}</div>
  // )
};

/**
 * Renders an icon corresponding to the given `status`.
 * If `status` is not recognized, returns null.
 * Colors adapt to light/dark theme unless overridden.
 */
const TransactionStatusIcon = _a => {
  var {
      status,
      color
    } = _a,
    props = __rest(_a, ["status", "color"]);
  const {
    theme
  } = useTheme();
  const map = {
    SUCCESS: SuccessIcon,
    FAIL: ErrorIcon,
    QUEUED: QueuedIcon,
    POOLED: PooledIcon,
    BROADCASTED: BroadcastedIcon
  };
  const IconComponent = map[status];
  // Default colors based on theme, if no color override provided
  const defaultColors = {
    light: {
      SUCCESS: '#1CC400',
      FAIL: '#F45858',
      QUEUED: '#F4A358',
      POOLED: '#008DE4',
      BROADCASTED: '#008DE4'
    },
    dark: {
      SUCCESS: '#22D32E',
      FAIL: '#FF6B6B',
      QUEUED: '#FFB366',
      POOLED: '#42A5F5',
      BROADCASTED: '#42A5F5'
    }
  };
  const iconColor = color !== null && color !== void 0 ? color : defaultColors[theme][status];
  return IconComponent != null ? jsx(IconComponent, Object.assign({
    color: iconColor
  }, props)) : null;
};

function ProgressStepBar({
  currentStep,
  totalSteps,
  className = ''
}) {
  const {
    theme
  } = useTheme();
  return jsx("div", {
    className: `flex gap-2 w-full ${className}`,
    children: Array.from({
      length: totalSteps
    }, (_, index) => jsx("div", {
      className: `h-1.5 rounded-2xl flex-1 transition-colors ${index < currentStep ? theme === 'dark' ? 'bg-[var(--color-dash-brand-dim)]' : 'bg-[var(--color-dash-brand)]' : theme === 'dark' ? 'bg-gray-700' : 'bg-[rgba(76,126,255,0.16)]'}`
    }, index))
  });
}

/**
 * Dash Logo component with customizable size and color
 * Original aspect ratio: 30:25 (1.2:1)
 *
 * Color can be set via:
 * - color prop (takes precedence)
 * - CSS class with text color (e.g., "text-dash-primary-dark-blue")
 *
 * SVG is wrapped in a container that centers the logo and supports:
 * - containerPadding: padding around the logo
 * - containerSize: width/height of the container
 * - containerClassName: CSS class for the container
 * - minWidth/minHeight: min-content (adapts to logo size)
 */
const DashLogo = ({
  color,
  size,
  width,
  height,
  className = '',
  onClick,
  containerPadding,
  containerSize,
  containerClassName = ''
}) => {
  const logoWidth = width || size || 30;
  const logoHeight = height || (size ? size * 25 / 30 : 25);
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 'min-content',
    minHeight: 'min-content',
    padding: typeof containerPadding === 'number' ? `${containerPadding}px` : containerPadding,
    width: typeof containerSize === 'number' ? `${containerSize}px` : containerSize,
    height: typeof containerSize === 'number' ? `${containerSize}px` : containerSize,
    cursor: onClick ? 'pointer' : 'default'
  };
  return jsx("div", {
    className: containerClassName,
    style: containerStyle,
    onClick: onClick,
    children: jsxs("svg", {
      width: logoWidth,
      height: logoHeight,
      viewBox: '0 0 30 25',
      fill: 'none',
      xmlns: 'http://www.w3.org/2000/svg',
      className: `text-dash-brand ${className}`,
      style: {
        color: color || 'var(--color-dash-brand, #4C7EFF)'
      },
      children: [jsx("path", {
        d: 'M19.6465 0C29.2466 2.13767e-05 30.9542 5.2464 29.585 12.6006C28.6773 17.5547 26.3845 21.3391 22.5537 23.1084C20.8153 23.9084 19.1848 24.3555 15.3389 24.3555H4.44629L5.33887 19.293H14.9229C20.6921 19.3084 22.2159 16.8009 22.9697 14.6162C23.2467 13.8008 23.9084 11.2619 23.9238 9.76953C23.9699 6.84642 22.5383 5.07715 17.6768 5.07715L7.81543 5.06152L8.72363 0H19.6465Z',
        fill: color || 'currentColor'
      }), jsx("path", {
        d: 'M15.2002 9.63184C15.2002 9.63184 15.0775 10.232 14.7236 11.709C14.4621 12.8321 14.0462 14.6934 11.1846 14.6934H0C0.00327153 14.6775 0.12745 14.0734 0.476562 12.6162C0.73811 11.493 1.15435 9.63184 4.01562 9.63184H15.2002Z',
        fill: color || 'currentColor'
      })]
    })
  });
};

function useStateMachine(initialState, machine) {
  return React.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}

// src/presence.tsx
var Presence = (props) => {
  const { present, children } = props;
  const presence = usePresence(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : React.Children.only(children);
  const ref = useComposedRefs(presence.ref, getElementRef(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? React.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
  const [node, setNode] = React.useState();
  const stylesRef = React.useRef(null);
  const prevPresentRef = React.useRef(present);
  const prevAnimationNameRef = React.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  React.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect2(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || styles?.display === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(event.animationName);
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: React.useCallback((node2) => {
      stylesRef.current = node2 ? getComputedStyle(node2) : null;
      setNode(node2);
    }, [])
  };
}
function getAnimationName(styles) {
  return styles?.animationName || "none";
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}

var DIALOG_NAME = "Dialog";
var [createDialogContext, createDialogScope] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog = (props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const triggerRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DIALOG_NAME
  });
  return /* @__PURE__ */ jsx(
    DialogProvider,
    {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: useId(),
      titleId: useId(),
      descriptionId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: React.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children
    }
  );
};
Dialog.displayName = DIALOG_NAME;
var TRIGGER_NAME$1 = "DialogTrigger";
var DialogTrigger = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME$1, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers$1(props.onClick, context.onOpenToggle)
      }
    );
  }
);
DialogTrigger.displayName = TRIGGER_NAME$1;
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
  forceMount: void 0
});
var DialogPortal = (props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME, __scopeDialog);
  return /* @__PURE__ */ jsx(PortalProvider, { scope: __scopeDialog, forceMount, children: React.Children.map(children, (child) => /* @__PURE__ */ jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsx(Portal$3, { asChild: true, container, children: child }) })) });
};
DialogPortal.displayName = PORTAL_NAME;
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay = React.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsx(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
  }
);
DialogOverlay.displayName = OVERLAY_NAME;
var Slot = createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ jsx(
        Primitive.div,
        {
          "data-state": getState(context.open),
          ...overlayProps,
          ref: forwardedRef,
          style: { pointerEvents: "auto", ...overlayProps.style }
        }
      ) })
    );
  }
);
var CONTENT_NAME$1 = "DialogContent";
var DialogContent = React.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME$1, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME$1, props.__scopeDialog);
    return /* @__PURE__ */ jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsx(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsx(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
DialogContent.displayName = CONTENT_NAME$1;
var DialogContentModal = React.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME$1, props.__scopeDialog);
    const contentRef = React.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
    React.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsx(
      DialogContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers$1(props.onCloseAutoFocus, (event) => {
          event.preventDefault();
          context.triggerRef.current?.focus();
        }),
        onPointerDownOutside: composeEventHandlers$1(props.onPointerDownOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: composeEventHandlers$1(
          props.onFocusOutside,
          (event) => event.preventDefault()
        )
      }
    );
  }
);
var DialogContentNonModal = React.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME$1, props.__scopeDialog);
    const hasInteractedOutsideRef = React.useRef(false);
    const hasPointerDownOutsideRef = React.useRef(false);
    return /* @__PURE__ */ jsx(
      DialogContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          props.onCloseAutoFocus?.(event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          props.onInteractOutside?.(event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = context.triggerRef.current?.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var DialogContentImpl = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME$1, __scopeDialog);
    const contentRef = React.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    useFocusGuards$1();
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        FocusScope,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: /* @__PURE__ */ jsx(
            DismissableLayer$1,
            {
              role: "dialog",
              id: context.contentId,
              "aria-describedby": context.descriptionId,
              "aria-labelledby": context.titleId,
              "data-state": getState(context.open),
              ...contentProps,
              ref: composedRefs,
              onDismiss: () => context.onOpenChange(false)
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(TitleWarning, { titleId: context.titleId }),
        /* @__PURE__ */ jsx(DescriptionWarning, { contentRef, descriptionId: context.descriptionId })
      ] })
    ] });
  }
);
var TITLE_NAME = "DialogTitle";
var DialogTitle = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsx(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }
);
DialogTitle.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
    return /* @__PURE__ */ jsx(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
  }
);
DialogDescription.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose";
var DialogClose = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers$1(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
DialogClose.displayName = CLOSE_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME$1,
  titleName: TITLE_NAME,
  docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
  React.useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      if (!hasTitle) console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);
  return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning = ({ contentRef, descriptionId }) => {
  const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
  const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
  React.useEffect(() => {
    const describedById = contentRef.current?.getAttribute("aria-describedby");
    if (descriptionId && describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription) console.warn(MESSAGE);
    }
  }, [MESSAGE, contentRef, descriptionId]);
  return null;
};
var Root$1 = Dialog;
var Trigger$1 = DialogTrigger;
var Portal = DialogPortal;
var Overlay = DialogOverlay;
var Content$1 = DialogContent;
var Title = DialogTitle;
var Close = DialogClose;

const overlayStyles = cva(`
    fixed
    inset-0
    z-50
    bg-black/80
    data-[state=open]:animate-in
    data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0
    data-[state=open]:fade-in-0
  `, {
  variants: {
    theme: {
      light: '',
      dark: ''
    }
  }
});
const contentStyles = cva(`
    fixed
    left-[50%]
    top-[50%]
    z-50
    w-full
    translate-x-[-50%]
    translate-y-[-50%]
    flex
    flex-col
    gap-4
    p-6
    shadow-lg
    duration-200
    data-[state=open]:animate-in
    data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0
    data-[state=open]:fade-in-0
    data-[state=closed]:zoom-out-95
    data-[state=open]:zoom-in-95
    data-[state=closed]:slide-out-to-left-1/2
    data-[state=closed]:slide-out-to-top-[48%]
    data-[state=open]:slide-in-from-left-1/2
    data-[state=open]:slide-in-from-top-[48%]
    sm:rounded-lg
    font-dash-main
  `, {
  variants: {
    theme: {
      light: 'bg-white border-gray-200',
      dark: 'bg-gray-950 border-gray-800'
    },
    size: {
      sm: 'dash-block-sm',
      md: 'dash-block-md',
      xl: 'dash-block-xl'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});
const headerStyles = cva(`
    flex
    flex-row
    justify-between
    items-center
    gap-1
    w-full
  `);
const titleStyles = cva(`
    text-2xl
    font-medium
    leading-[1.366]
    tracking-[-0.03em]
    flex-1
    font-dash-main
  `, {
  variants: {
    theme: {
      light: 'text-[#0C1C33]',
      dark: 'text-gray-50'
    }
  }
});
const closeButtonStyles = cva(`
    rounded-sm
    opacity-70
    transition-opacity
    hover:opacity-100
    focus:outline-none
    disabled:pointer-events-none
    cursor-pointer
    flex-shrink-0
  `, {
  variants: {
    theme: {
      light: 'text-[#0C1C33] hover:text-gray-700',
      dark: 'text-gray-400 hover:text-gray-200'
    }
  }
});
const DashDialog = ({
  open,
  onOpenChange,
  title,
  showCloseButton = true,
  size = 'md',
  children,
  className = '',
  trigger
}) => {
  const {
    theme
  } = useTheme();
  const DialogContent = jsxs(Portal, {
    children: [jsx(Overlay, {
      className: overlayStyles({
        theme
      })
    }), jsxs(Content$1, {
      "aria-describedby": undefined,
      className: `${contentStyles({
        theme,
        size
      })} ${className}`,
      children: [(title || showCloseButton) && jsxs("div", {
        className: headerStyles(),
        children: [title && jsx(Title, {
          className: titleStyles({
            theme
          }),
          children: title
        }), showCloseButton && jsxs(Close, {
          className: closeButtonStyles({
            theme
          }),
          children: [jsx("div", {
            className: 'w-8 h-8 flex items-center justify-center',
            children: jsx(CrossIcon, {
              size: 16
            })
          }), jsx("span", {
            className: 'sr-only',
            children: "Close"
          })]
        })]
      }), children]
    })]
  });
  if (trigger) {
    // Uncontrolled mode with trigger
    return jsxs(Root$1, {
      onOpenChange: onOpenChange,
      children: [jsx(Trigger$1, {
        asChild: true,
        children: trigger
      }), DialogContent]
    });
  }
  // Controlled mode
  return jsx(Root$1, {
    open: open,
    onOpenChange: onOpenChange,
    children: DialogContent
  });
};

var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = React.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = React.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = React.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = React.useState(false);
  const handleEntryFocus = useCallbackRef$1(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = React.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = React.useState(0);
  React.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: React.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: React.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: React.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: React.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers$1(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers$1(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers$1(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = React.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    React.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers$1(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers$1(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers$1(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;

var TABS_NAME = "Tabs";
var [createTabsContext, createTabsScope] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = React.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers$1(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers$1(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers$1(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent = React.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = React.useRef(isSelected);
    React.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList;
var Trigger = TabsTrigger;
var Content = TabsContent;

const tabsRootStyles = cva('flex flex-col w-full', {
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
const tabsListStyles = cva('flex relative overflow-x-auto scrollbar-hide after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:transition-colors', {
  variants: {
    theme: {
      light: 'after:bg-[rgba(12,28,51,0.15)]',
      dark: 'after:bg-gray-600/50'
    }
  },
  defaultVariants: {
    theme: 'light'
  }
});
const tabsTriggerStyles = cva(['flex items-center justify-center relative', 'font-dash-main font-light', 'transition-all duration-200 ease-in-out cursor-pointer', 'hover:opacity-80', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500', 'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:opacity-50', 'whitespace-nowrap flex-shrink-0', 'after:absolute after:bottom-0 after:left-[-0.25rem] after:w-full after:h-[1px] after:bg-transparent after:transition-colors after:duration-200 after:z-10'], {
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
      sm: 'text-sm leading-[1.25] tracking-[-0.02em] px-0 pr-3 pb-2 after:right-3',
      lg: 'text-xl leading-[1.3] tracking-[-0.025em] px-0 pr-4 pb-3 after:right-4',
      xl: 'text-2xl leading-[1.366] tracking-[-0.03em] px-0 pr-[0.875rem] pb-[10px] after:right-[0.875rem]'
    }
  },
  compoundVariants: [{
    theme: 'light',
    active: true,
    class: 'text-dash-primary-dark-blue [text-shadow:0.2px_0_0_currentColor,_-0.2px_0_0_currentColor] after:!bg-[#4C7EFF]'
  }, {
    theme: 'light',
    active: false,
    class: 'text-[rgba(12,28,51,0.35)]'
  }, {
    theme: 'dark',
    active: true,
    class: 'text-white [text-shadow:0.2px_0_0_currentColor,_-0.2px_0_0_currentColor] after:!bg-[#4C7EFF]'
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
const tabsContentStyles = cva('focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500', {
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
 * Tabs component with sleek underline style matching Figma design.
 * Built on radix-ui with light/dark theme support and keyboard navigation.
 */
const Tabs = ({
  items,
  value,
  defaultValue,
  onValueChange,
  size = 'xl',
  className = '',
  listClassName = '',
  triggerClassName = '',
  contentClassName = ''
}) => {
  var _a;
  const {
    theme
  } = useTheme();
  const [internalValue, setInternalValue] = React__default.useState(defaultValue || ((_a = items[0]) === null || _a === void 0 ? void 0 : _a.value) || '');
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
  return jsxs(Root2, {
    className: rootClasses,
    value: currentValue,
    onValueChange: handleValueChange,
    children: [jsx(List, {
      className: listClasses,
      children: items.map(item => {
        const isActive = currentValue === item.value;
        const triggerClasses = tabsTriggerStyles({
          theme,
          active: isActive,
          size
        }) + (triggerClassName ? ` ${triggerClassName}` : '');
        return jsx(Trigger, {
          value: item.value,
          disabled: item.disabled,
          className: triggerClasses,
          children: item.label
        }, item.value);
      })
    }), items.map(item => jsx(Content, {
      value: item.value,
      className: contentClasses,
      children: item.content
    }, item.value))]
  });
};

export { Accordion, ArrowIcon, Avatar, Badge, BigNumber, BroadcastedIcon, BurgerMenuIcon, Button, CalendarIcon, ChainSmallIcon, CheckIcon, CheckmarkIcon, ChevronIcon, CircleProcessIcon, CopyButton, CopyIcon, CreditsIcon, CrossIcon, DashLogo, DateBlock, DeleteIcon, DashDialog as Dialog, EditIcon, ErrorIcon, EyeClosedIcon, EyeOpenIcon, FaceIcon, FilterIcon, FingerprintIcon, Heading, Identifier, Input, KebabMenuIcon, KeyIcon, List$1 as List, LockIcon, NotActive, OverlayMenu, OverlaySelect, PendingIcon, PlusIcon, PooledIcon, ProgressStepBar, ProtectedMessageIcon, QuestionMessageIcon, QueuedIcon, Select, SettingsIcon, ShieldSmallIcon, SignIcon, SignLockIcon, SmartphoneIcon, SuccessIcon, Switch, Tabs, Text, Textarea, ThemeProvider, TimeDelta, TransactionStatusIcon, ValueCard, WalletIcon, WebIcon, useTheme };
//# sourceMappingURL=index.esm.js.map
