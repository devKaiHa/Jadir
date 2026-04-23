import { useMemo, useState } from "react";
import countries from "../config/countries.json";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

export function CountrySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selected = countries.find((c) => c.code === value);

  const getCountryName = (country) => country.name_en;

  const filtered = useMemo(() => {
    if (!search) return countries;

    const q = search.toLowerCase();

    return countries.filter(
      (c) =>
        c.name_en.toLowerCase().includes(q) ||
        c.name_ar?.toLowerCase().includes(q) ||
        c.dialCode.includes(search),
    );
  }, [countries, search]);

  return (
    <div dir="ltr" className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="h-11 w-full flex items-center justify-between rounded-lg border border-input bg-background px-3 text-sm text-start py-0 hover:bg-muted/30 transition"
      >
        <span className="truncate flex items-center gap-1">
          {selected ? (
            <>
              <span>{selected.flag}</span>
              <span>{selected.name_en}</span>
            </>
          ) : (
            "Select country"
          )}
        </span>

        {open ? (
          <ChevronUp className="h-4 w-4 jadir-icon-gold transition" />
        ) : (
          <ChevronDown className="h-4 w-4 jadir-icon-gold transition" />
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="w-full absolute z-50 mt-1 rounded-lg border bg-background shadow-lg overflow-hidden">
          {/* Search */}
          <input
            autoFocus
            placeholder="Search country or code"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full border-b px-3 text-sm focus:outline-none text-start"
          />

          {/* List */}
          <div className="max-h-64 overflow-y-auto">
            {filtered.length === 0 && (
              <p className="px-3 py-2 text-sm text-jadir-muted">No results</p>
            )}

            {filtered.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  onChange(c.code);
                  setOpen(false);
                  setSearch("");
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-sm text-start hover:bg-muted/40 transition ${value === c.code && "bg-muted/30"}`}
              >
                <span>{c.flag}</span>

                <span className="flex-1 truncate">{getCountryName(c)}</span>

                {value === c.code && (
                  <Check className="h-4 w-4 jadir-icon-gold" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
