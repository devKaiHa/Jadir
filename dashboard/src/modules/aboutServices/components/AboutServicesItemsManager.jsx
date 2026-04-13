import Tabs from "../../../components/Global/Tabs";
import AboutServiceGeneralTab from "./AboutServiceGeneralTab";
import AboutServiceLangForm from "./AboutServiceLangForm";

const AboutServicesItemsManager = ({
  items = [],
  onAddItem,
  onRemoveItem,
  onChangeGeneralField,
  onChangeLangField,
  onAddContentLine,
  onRemoveContentLine,
  onChangeContentLine,
}) => {
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header flex items-center justify-between">
          <h3 className="card-title">About Services Items</h3>

          <button className="btn btn-primary" onClick={onAddItem}>
            Add Item
          </button>
        </div>
      </div>

      {!items.length && (
        <div className="card">
          <div className="card-body py-10 text-center text-gray-500">
            No items added yet
          </div>
        </div>
      )}

      {items.map((item, index) => {
        const tabConfig = [
          {
            key: `general_${item._id}`,
            label: "General Info",
            icon: "ki-outline ki-setting-2",
            content: (
              <AboutServiceGeneralTab
                item={item}
                index={index}
                onRemove={() => onRemoveItem(item._id)}
                onChangeField={(key, value) =>
                  onChangeGeneralField(item._id, key, value)
                }
              />
            ),
          },
          ...["en", "ar", "tr"].map((lang) => ({
            key: `${item._id}_${lang}`,
            label: lang.toUpperCase(),
            icon: "ki-outline ki-clipboard",
            content: (
              <AboutServiceLangForm
                language={lang}
                item={item}
                onChangeField={(field, value) =>
                  onChangeLangField(item._id, field, lang, value)
                }
                onAddContentLine={() => onAddContentLine(item._id, lang)}
                onRemoveContentLine={(lineIndex) =>
                  onRemoveContentLine(item._id, lang, lineIndex)
                }
                onChangeContentLine={(lineIndex, value) =>
                  onChangeContentLine(item._id, lang, lineIndex, value)
                }
              />
            ),
          })),
        ];

        return (
          <div key={item._id} className="card p-4">
            <div className="mb-4">
              <h3 className="card-title">Item #{index + 1}</h3>
            </div>

            <Tabs tabs={tabConfig} />
          </div>
        );
      })}
    </div>
  );
};

export default AboutServicesItemsManager;
