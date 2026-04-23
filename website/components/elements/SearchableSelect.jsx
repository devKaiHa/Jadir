import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const SearchableSelect = ({
  className = "",
  inputClassName = "",
  menuClassName = "",
  optionClassName = "",
  label,
  labelWidth = "20",
  height = "2.5",
  placeholder,
  options,
  selectedValue,
  selectedLabel,
  onChange,
  onInputChange,
  disabled,
  error,
  getOptionLabel = (option) => option.name,
  disableTyping = false,
  onKeyDown,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const rootRef = useRef(null);
  const inputRef = useRef(null);

  // menu positioning state (for fixed dropdown)
  const [menuRect, setMenuRect] = useState({
    top: 0,
    left: 0,
    width: 0,
    maxHeight: 192, // 48 * 4
  });

  useEffect(() => {
    setIsOpen(false);
  }, [disableTyping]);
  const filteredOptions = useMemo(() => {
    const q = (searchQuery || "").toLowerCase().trim();

    if (!q) return options?.data || [];

    return options?.data?.filter((option) => {
      const optionLabel = getOptionLabel(option)?.toLowerCase?.() || "";
      const name = option?.name?.toLowerCase?.() || "";
      const latinName = option?.latinName?.toLowerCase?.() || "";
      // const sku = option?.sku?.toString()?.toLowerCase?.() || "";
      // const counter = option?.counter?.toString()?.toLowerCase?.() || "";

      // qr can be array OR string (old data)
      const qrMatch = Array.isArray(option?.qr)
        ? option.qr.some((code) =>
            code?.toString()?.toLowerCase?.().includes(q),
          )
        : option?.qr?.toString()?.toLowerCase?.().includes(q);

      return (
        optionLabel.includes(q) ||
        name.includes(q) ||
        latinName.includes(q) ||
        // sku.includes(q) ||
        // counter.includes(q) ||
        qrMatch
      );
    });
  }, [getOptionLabel, options, searchQuery]);

  // Show label of selected value in input
  useEffect(() => {
    if (!isOpen) {
      if (selectedLabel) {
        setSearchQuery(selectedLabel);
      } else if (selectedValue && typeof selectedValue === "object") {
        setSearchQuery(getOptionLabel(selectedValue));
      } else if (selectedValue) {
        const selectedOption = options?.data?.find(
          (opt) => opt.id === selectedValue || opt._id === selectedValue,
        );
        setSearchQuery(selectedOption ? getOptionLabel(selectedOption) : "");
      }
    }
  }, [isOpen, selectedValue, selectedLabel, getOptionLabel, options]);

  const handleSelect = (option) => {
    onChange?.(option);
    setSearchQuery(getOptionLabel(option));
    setIsOpen(false);
  };

  // Compute menu position relative to viewport (fixed)
  const updateMenuPosition = () => {
    const el = inputRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const viewportH = window.innerHeight;

    const desiredMaxH = 192; // tailwind max-h-48
    const spaceBelow = viewportH - r.bottom - 8;
    const spaceAbove = r.top - 8;

    // prefer below; if not enough, open upwards
    const openUp = spaceBelow < 140 && spaceAbove > spaceBelow;

    const maxHeight = Math.max(
      120,
      Math.min(desiredMaxH, openUp ? spaceAbove : spaceBelow),
    );

    setMenuRect({
      left: r.left,
      width: r.width,
      top: openUp ? Math.max(8, r.top - maxHeight - 8) : r.bottom + 6,
      maxHeight,
    });
  };

  // Keep position correct when opening + while scrolling/resizing
  useLayoutEffect(() => {
    if (!isOpen) return;
    updateMenuPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, searchQuery]);

  useEffect(() => {
    if (!isOpen) return;

    const onScrollOrResize = () => updateMenuPosition();
    window.addEventListener("resize", onScrollOrResize, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, {
      passive: true,
      capture: true,
    });

    return () => {
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, { capture: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target)) setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${className}`.trim()} ref={rootRef}>
      <div className="input-group flex items-center">
        {label && (
          <span
            className="btn btn-input text-left border-r-0 rounded-r-none px-3"
            style={{
              width: `${labelWidth}%`,
              height: `${height}rem`,
              minHeight: 0,
              lineHeight: "normal",
              paddingTop: "0.25rem",
              paddingBottom: "0.25rem",
            }}
          >
            {label}
          </span>
        )}

        <div className="relative" style={{ width: `${100 - labelWidth}%` }}>
          <input
            ref={inputRef}
            type="text"
            disabled={disabled}
            className={`input w-full border rounded-l-none p-2 ${
              error ? "border-danger" : "border-gray-300"
            } ${inputClassName}`.trim()}
            style={{
              height: `${height}rem`,
              minHeight: 0,
              lineHeight: "normal",
              paddingTop: "0.25rem",
              paddingBottom: "0.25rem",
            }}
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsOpen(true);
              onInputChange?.(e.target.value);
            }}
            onFocus={() => {
              if (!disabled) setIsOpen(true);
            }}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>

      {/* FIX: render menu as FIXED so it is not clipped by table/overflow containers */}
      {isOpen && !disabled && (
        <div
          className={`bg-white flex flex-col border rounded-lg py-2 shadow-lg z-[9999] ${menuClassName}`.trim()}
          style={{
            position: "fixed",
            top: menuRect.top,
            left: menuRect.left,
            width: menuRect.width,
            maxHeight: menuRect.maxHeight,
            overflowY: "auto",
          }}
        >
          {filteredOptions?.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.id || option._id}
                className={`cursor-pointer px-4 py-2 hover:bg-gray-100 text-xs ${optionClassName}`.trim()}
                onClick={() => handleSelect(option)}
              >
                {getOptionLabel(option)}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500 text-xs">
              No options found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
