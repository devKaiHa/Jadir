import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.snow.css";

const BlogLangForm = ({ language, value = {}, onChange }) => {
  const [localValue, setLocalValue] = useState({
    title: value.title || "",
    excerpt: value.excerpt || "",
    authorRole: value.authorRole || "",
    content: value.content || "",
  });

  useEffect(() => {
    setLocalValue((prev) => ({
      title: value.title || prev.title,
      excerpt: value.excerpt || prev.excerpt,
      authorRole: value.authorRole || prev.authorRole,
      content: value.content || prev.content,
    }));
  }, [value.title, value.excerpt, value.authorRole, value.content]);

  const handleChange = (key, val) => {
    setLocalValue((prev) => {
      const updated = { ...prev, [key]: val };
      onChange?.(language, updated);
      return updated;
    });
  };

  return (
    <div className="card-table scrollable-x-auto pb-3">
      <table className="table-auto w-full text-sm text-gray-600">
        <tbody>
          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Title ({language})
                </span>
                <input
                  name="title"
                  type="text"
                  value={localValue.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder={`Enter title in ${language.toUpperCase()}`}
                  className="input"
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Excerpt ({language})
                </span>
                <div className="w-full">
                  <ReactQuill
                    value={localValue.excerpt}
                    onChange={(value) => handleChange("excerpt", value)}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link"],
                        ["clean"],
                      ],
                    }}
                    formats={[
                      "header",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "list",
                      "bullet",
                      "link",
                    ]}
                    className="bg-white text-black min-h-[220px]"
                  />
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Author Role ({language})
                </span>
                <input
                  name="authorRole"
                  type="text"
                  value={localValue.authorRole}
                  onChange={(e) => handleChange("authorRole", e.target.value)}
                  placeholder={`Enter author role in ${language.toUpperCase()}`}
                  className="input"
                />
              </div>
            </td>
          </tr>

          <tr>
            <td className="p-2 pt-4">
              <div className="input-group">
                <span className="btn btn-input w-[20%] capitalize">
                  Content ({language})
                </span>
                <div className="w-full">
                  <ReactQuill
                    value={localValue.content}
                    onChange={(value) => handleChange("content", value)}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline", "strike"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["link", "image"],
                        ["clean"],
                      ],
                    }}
                    formats={[
                      "header",
                      "bold",
                      "italic",
                      "underline",
                      "strike",
                      "list",
                      "bullet",
                      "link",
                      "image",
                    ]}
                    className="bg-white text-black min-h-[500px]"
                  />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BlogLangForm;
