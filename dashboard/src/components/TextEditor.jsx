/* eslint-disable react/prop-types */
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DEFAULT_CLASS_NAME = "bg-white text-black min-h-[180px] w-full pb-[3rem]";

export const TextEditor = ({
  value,
  onChange,
  className,
  classes,
  placeholder,
  enableImage = true,
  enableColor = false,
  enableBackground = false,
  enableDirection = false,
  language,
  dir,
  modules,
  formats,
  ...props
}) => {
  const isRtl = dir === "rtl" || language === "ar";
  const editorClassName = [
    className || classes || DEFAULT_CLASS_NAME,
    isRtl ? "rtl-editor" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const toolbar = [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
  ];

  if (enableDirection) {
    toolbar.push([{ direction: "rtl" }]);
  }

  if (enableColor || enableBackground) {
    const colorControls = [];

    if (enableColor) colorControls.push({ color: [] });
    if (enableBackground) colorControls.push({ background: [] });

    toolbar.push(colorControls);
  }

  const mediaControls = ["link"];

  if (enableImage) {
    mediaControls.push("image");
  }

  toolbar.push(mediaControls, ["clean"]);

  const defaultModules = {
    toolbar: {
      container: toolbar,
    },
  };

  const defaultFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    ...(enableImage ? ["image"] : []),
    ...(enableColor ? ["color"] : []),
    ...(enableBackground ? ["background"] : []),
    ...(enableDirection ? ["direction"] : []),
  ];

  return (
    <ReactQuill
      modules={modules || defaultModules}
      formats={formats || defaultFormats}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={editorClassName}
      {...props}
    />
  );
};
