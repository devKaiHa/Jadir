import { useEffect, useMemo, useRef, useState } from "react";

const defaultGetOptionValue = (option) => option?.id || option?._id || "";

const defaultGetOptionLabel = (option) =>
  option?.name?.en ||
  option?.name?.ar ||
  option?.name?.tr ||
  option?.title?.en ||
  option?.title?.ar ||
  option?.title?.tr ||
  option?.name ||
  option?.title ||
  "";

const MultiSelect = ({
  options = [],
  selected = [],
  onChange,
  placeholder = "Select items",
  error,
  emptyMessage = "No items found",
  getOptionValue = defaultGetOptionValue,
  getOptionLabel = defaultGetOptionLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalizedSelected = useMemo(
    () =>
      selected.filter(Boolean).map((item) => ({
        ...item,
        _multiSelectValue: getOptionValue(item),
        _multiSelectLabel: getOptionLabel(item),
      })),
    [getOptionLabel, getOptionValue, selected],
  );

  const selectedValueSet = useMemo(
    () => new Set(normalizedSelected.map((item) => item._multiSelectValue)),
    [normalizedSelected],
  );

  const normalizedOptions = useMemo(
    () =>
      options
        .filter(Boolean)
        .map((option) => ({
          ...option,
          _multiSelectValue: getOptionValue(option),
          _multiSelectLabel: getOptionLabel(option),
        }))
        .filter(
          (option) =>
            option._multiSelectValue && option._multiSelectLabel !== undefined,
        ),
    [getOptionLabel, getOptionValue, options],
  );

  const filteredOptions = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return normalizedOptions.filter((option) =>
      option._multiSelectLabel.toLowerCase().includes(term),
    );
  }, [normalizedOptions, searchTerm]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    if (!isOpen) setIsOpen(true);
  };

  const handleItemToggle = (item) => {
    const itemValue = item._multiSelectValue;
    const exists = selectedValueSet.has(itemValue);

    const nextSelected = exists
      ? normalizedSelected.filter(
          (selectedItem) => selectedItem._multiSelectValue !== itemValue,
        )
      : [...normalizedSelected, item];

    onChange?.(
      nextSelected.map(
        ({ _multiSelectValue, _multiSelectLabel, ...originalItem }) =>
          originalItem,
      ),
    );
    setSearchTerm("");
  };

  const handleRemoveItem = (item) => {
    onChange?.(
      normalizedSelected
        .filter(
          (selectedItem) =>
            selectedItem._multiSelectValue !== item._multiSelectValue,
        )
        .map(
          ({ _multiSelectValue, _multiSelectLabel, ...originalItem }) =>
            originalItem,
        ),
    );
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="input-group flex items-center">
        <div className="relative w-full">
          <div
            className={`flex min-h-[40px] flex-wrap items-center gap-1 rounded-r-md border p-1 cursor-text ${
              error ? "border-danger" : "border-gray-300"
            }`}
            onClick={toggleDropdown}
          >
            {normalizedSelected.map((item) => (
              <span
                key={item._multiSelectValue}
                className="badge badge-outline badge-primary flex items-center gap-1 p-1"
              >
                {item._multiSelectLabel}
                <button
                  type="button"
                  className="text-sm"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRemoveItem(item);
                  }}
                >
                  &times;
                </button>
              </span>
            ))}

            <input
              type="text"
              className="flex-grow px-1 text-xs focus:outline-none"
              placeholder={placeholder}
              value={searchTerm}
              onChange={handleInputChange}
              onClick={(event) => event.stopPropagation()}
            />
          </div>

          {isOpen && (
            <ul className="absolute top-full left-0 z-[999] mt-1 max-h-48 w-full overflow-y-auto rounded border bg-white shadow">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <li
                    key={option._multiSelectValue}
                    className={`cursor-pointer px-4 py-2 text-xs hover:bg-gray-100 ${
                      selectedValueSet.has(option._multiSelectValue)
                        ? "bg-gray-200"
                        : ""
                    }`}
                    onClick={() => handleItemToggle(option)}
                  >
                    {option._multiSelectLabel}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-sm text-gray-500">
                  {emptyMessage}
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSelect;
