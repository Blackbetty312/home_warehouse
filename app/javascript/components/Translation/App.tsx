import Axios from "axios";
import React, { useState } from "react";
import Input from "./Input";
interface TranslationProps {
  data: {
    key: string;
    locale_original: string;
    locale_target: string;
    value_original: string;
    value_target: string;
  }[];
}

const csrf = document.querySelector("meta[name='csrf-token']")?.getAttribute("content");

const App = (props: TranslationProps) => {
  const [data, setData] = useState(props.data);
  const sourceLocale = data[0].locale_original;
  const targetLocale = data[0].locale_target;
  const [selectedCell, setSelectedCell] = useState<null | {
    key: string;
    locale: string;
  }>(null);

  const onClickCell = (key: string, locale: string) => {
    setSelectedCell({ key, locale });
  };

  const onConfirmCell = (newVal: string, key: string, locale: string) => {
    Axios({
      method: 'PATCH',
      url: '/translations',
      data: { i18n_backend_active_record_translation: {
        locale,
        key,
        value: newVal
      } },
      headers: {
        accept: 'application/json',
        "X-CSRF-Token": csrf,
      }
    })
      .then((res) => {
        setSelectedCell(null);
        updateData(key, locale, newVal);
        toastr.success("Zaktualizowano", "Success", { closeButton: true, progressBar: true })
      })
      .catch((err) => {
        console.log(err)
      })
    console.log("onConfirmCell ", newVal, key, locale);
  };

  const updateData = (key: string, locale: string, newVal: string) => {
    const rowData = data.find((d) => d.key === key);
    if (!rowData) {
      return;
    }
    if (rowData.locale_original === locale) {
      rowData.value_original = newVal;
    }
    if (rowData.locale_target === locale) {
      rowData.value_target = newVal;
    }
    const newData = data.map((d) => {
      if (d.key === key) {
        return rowData;
      }
      return d;
    })
    setData(newData);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        Translations for {sourceLocale} - {targetLocale}
      </h1>
      <div className="overflow-x-auto">
        <table className="translation-table table-fixed">
          <thead>
            <tr>
              <th className="first_header px-4 py-2 bg-gray-100 dark:bg-gray-700 w-1/3">
                Translation Key
              </th>
              <th className="px-4 py-2 bg-gray-100 w-1/3 dark:bg-gray-700">
                Value {sourceLocale}
              </th>
              <th className="px-4 py-2 bg-gray-100 w-1/3 dark:bg-gray-700">
                Value {targetLocale}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              return (
                <tr className="" key={`key-${row.key}`}>
                  <td className="border-b border-b-gray-700 dark:border-b-gray-200 w-1/3">
                    {row.key}
                  </td>
                  {selectedCell?.key === row.key &&
                    selectedCell?.locale === row.locale_original ? (
                    <td className="border-b border-b-gray-700 dark:border-b-gray-200 w-1/3">
                      <Input
                        placeholder=""
                        inputText={row.value_original}
                        onEnter={(newVal) =>
                          onConfirmCell(newVal, row.key, row.locale_original)
                        }
                      />
                    </td>
                  ) : (
                    <td
                      onClick={() => onClickCell(row.key, row.locale_original)}
                      className="border-b border-b-gray-700 dark:border-b-gray-200 w-1/3"
                    >
                      {row.value_original}
                    </td>
                  )}

                  {selectedCell?.key === row.key &&
                    selectedCell?.locale === row.locale_target ? (
                    <td className="border-b border-b-gray-700 dark:border-b-gray-200 w-1/3">
                      <Input
                        placeholder=""
                        inputText={row.value_target}
                        onEnter={(newVal) =>
                          onConfirmCell(newVal, row.key, row.locale_target)
                        }
                      />
                    </td>
                  ) : (
                    <td
                      onClick={() => onClickCell(row.key, row.locale_target)}
                      className="border-b border-b-gray-700 dark:border-b-gray-200 w-1/3"
                    >
                      {row.value_target}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
