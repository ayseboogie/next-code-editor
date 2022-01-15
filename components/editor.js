import "codemirror/lib/codemirror.css";
import "codemirror/theme/tomorrow-night-bright.css";
import { Controlled as ControlledEditor } from "react-codemirror2-react-17";

let languageLoaded = false;
if (typeof window !== "undefined" && typeof window.navigator !== "undefined") {
  require("codemirror/mode/xml/xml");
  require("codemirror/mode/css/css");
  require("codemirror/mode/javascript/javascript");
  languageLoaded = true;
}

const Editor = (props) => {
  const { language, editorTitle, value, onChange, className } = props;

  function handleChange(editor, data, value) {
    onChange(value);
  }

  return (
    // <div className="flex grow basis-0 flex-col p-2">
    <div className={className}>
      <div className="flex justify-between text-white rounded-t-lg py-2 pr-2 pl-4 bg-zinc-700">
        {editorTitle}
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="grow rounded-b-lg overflow-hidden text-left"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: "tomorrow-night-bright",
          lineNumbers: true,
        }}
      />
    </div>
  );
};

export default Editor;
