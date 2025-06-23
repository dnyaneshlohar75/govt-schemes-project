// Step 1: Create a New Component for the Script
// Create a file named ChatbaseWidget.js inside your src folder.
import { useEffect } from "react";

function ChatBase() {
  useEffect(() => {
    const script = document.createElement("script");

    script.innerHTML = `
      (function(){
        if(!window.chatbase || window.chatbase("getState") !== "initialized"){
          window.chatbase = (...arguments_) => {
            if(!window.chatbase.q) window.chatbase.q = [];
            window.chatbase.q.push(arguments_);
          };
          window.chatbase = new Proxy(window.chatbase, {
            get(target, prop) {
              if (prop === "q") return target.q;
              return (...args) => target(prop, ...args);
            }
          });
        }
        const onLoad = function() {
          const scriptTag = document.createElement("script");
          scriptTag.src = "https://www.chatbase.co/embed.min.js";
          scriptTag.id = "JSczCzpDEfDbOBb72GShR";  // Chatbase Bot ID
          scriptTag.domain = "www.chatbase.co";
          document.body.appendChild(scriptTag);
        };
        if (document.readyState === "complete") {
          onLoad();
        } else {
          window.addEventListener("load", onLoad);
        }
      })();
    `;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}

export default ChatBase;
