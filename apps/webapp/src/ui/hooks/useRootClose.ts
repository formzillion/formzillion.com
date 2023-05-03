import { useEffect, useCallback } from "react";
import { findDOMNode } from "react-dom";

const domContains = (context: any, node: any) => {
  if (context.contains) {
    return context.contains(node);
  } else if (context.compareDocumentPosition) {
    return context === node || !!(context.compareDocumentPosition(node) & 16);
  }
  if (node) {
    do {
      if (node === context) {
        return true;
      }
    } while ((node = node.parentNode));
  }
  return false;
};

const getRefTarget = (ref: any) => {
  return ref && ("current" in ref ? ref.current : ref);
};

function getDOMNode(elementOrRef: any) {
  const element =
    elementOrRef?.root || elementOrRef?.child || getRefTarget(elementOrRef);

  if (element?.nodeType && typeof element?.nodeName === "string") {
    return element;
  }

  return element;
}

function isLeftClickEvent(e: any) {
  return e?.button === 0;
}

function isModifiedEvent(e: any) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e?.shiftKey);
}

function onEventListener(
  target: any,
  eventType: any,
  listener: any,
  options = false
) {
  target.addEventListener(eventType, listener, options);

  return {
    off() {
      target.removeEventListener(eventType, listener, options);
    },
  };
}

function useRootClose(
  onRootClose: any,
  { disabled, triggerTarget, overlayTarget }: any
) {
  const handleDocumentMouseDown = useCallback(
    (event: any) => {
      const triggerElement = getDOMNode(triggerTarget);
      const overlayElement = getDOMNode(overlayTarget);

      if (triggerElement && domContains(triggerElement, event.target)) {
        return;
      }

      if (overlayElement && domContains(overlayElement, event.target)) {
        return;
      }

      if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
        return;
      }

      onRootClose?.(event);
    },
    [onRootClose, triggerTarget, overlayTarget]
  );

  useEffect(() => {
    const currentTarget = getDOMNode(triggerTarget);

    if (disabled || !currentTarget) return;

    const doc = () =>
      (currentTarget && currentTarget.ownerDocument) || document;
    const onDocumentMouseDownListener = onEventListener(
      doc(),
      "mousedown",
      handleDocumentMouseDown,
      true
    );

    return () => {
      onDocumentMouseDownListener?.off();
    };
  }, [triggerTarget, disabled, onRootClose, handleDocumentMouseDown]);
}

export default useRootClose;
