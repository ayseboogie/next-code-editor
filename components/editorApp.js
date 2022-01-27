import { useEffect, useState } from "react";
import Editor from "./editor";
import { useLocalStorage } from "./useLocalStorage";
import * as style from "./editor.module.css";
import cn from "classnames";

const EditorApp = () => {
  //html
  const [html, setHtml] = useLocalStorage(
    "html",
    `<div class="container">
  <div class="card">
     <img class="frontside___button" id="toggleCard"  src="https://ayseimg.s3.amazonaws.com/ayseSiteOriginal.png" alt="frontside" /> 
    <div class="backside__form">
      <img  class="backside__img" src="https://ayseimg.s3.amazonaws.com/back+of+card.png" alt="backside" />
     </div>
  </div>
</div>`
  );
  //css
  const [css, setCss] = useLocalStorage(
    "css",
    `html {
  height: 100%
}

body {
  position: relative;
  min-height: 100%;
  background: #1F2937;
}
img {
  max-width: 100%;
}

 /* Intro animation */
@keyframes intro {
  from {
    opacity: 0;
    top: 0;
  }
  to {
    opacity: 1;
    top: 50%;
  }
}

.container {
  position: absolute;
  width: 90%;
  left: 50%;
  vertical-align: center;
  transform: translate(-50%,-60%);
  animation: intro .7s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
@media (min-width: 600px) {
    .container {
        width: 50%;
        transform: translate(-50%,-90%);
    }
}
@media (min-width: 800px) {
    .container {
        width: 50%;
        transform: translate(-50%,-70%);
    }
}
@media (min-width: 1500px) {
    .container {
        transform: translate(-30%,-70%);
    }
}

.card {
  max-width: 400px;
  position: relative;
}
@media (min-width: 2000px) {
    .card {
  max-width: 640px;
\t}
}
.card--open .backside__form {
  visibility: visible;
  height: auto;
  opacity: 1;
  transform: translateY(6em);
  padding-top: 10em;
}
@media (min-width: 2000px) {
    .card--open .backside__form {
  transform: translateY(14em);
  padding-top: 10em;
}
}

.frontside___button {
  position: absolute;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  width: 100%;
  display: block;
  transition: transform .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.backside__form {
  position: relative;
  visibility: hidden;
  width: 100%;
  border-radius: .25em;
  transition: 
    opacity .4s ease-in-out,
    height .4s ease-in-out,
    transform .4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
    padding .4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}`
  );
  //js
  const [js, setJs] = useLocalStorage(
    "js",
    `document.getElementById('toggleCard').addEventListener('click', function () {
  [].map.call(document.querySelectorAll('.card'), function(el) {
    el.classList.toggle('card--open');
  });
});`
  );
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html lang="en">
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 200);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className={cn("bg-zinc-500", style.topPane)}>
        <Editor
          className="px-2 py-3 md:w-1/3 md:pl-3 md:pr-2"
          language="xml"
          editorTitle="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          className="px-2 py-3 md:w-1/3 md:px-2"
          language="css"
          editorTitle="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          className="px-2 py-3 md:w-1/3 md:pl-1 md:pr-3"
          language="javascript"
          editorTitle="JS"
          value={js}
          onChange={setJs}
        />
      </div>
      <div style={{ height: "68vh" }}>
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          height="100%"
          width="100%"
        />
      </div>
    </>
  );
};

export default EditorApp;
