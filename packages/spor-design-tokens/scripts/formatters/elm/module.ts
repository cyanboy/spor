import { Format, Named, formatHelpers } from "style-dictionary";

export const elmFormatter: Named<Format> = {
  name: "elm/module",
  formatter: function(opts) {
    const fileHeader = formatHelpers.fileHeader({
      file: opts.file,
      formatting: {
        prefix: defaultIndentation,
        lineSeparator: '\n',
        header: '{-\n',
        footer: '\n-}'
      }
    });
    
    return [
      "module Vy.Spor.DesignTokens exposing (tokens)",
      "",
      fileHeader,
      "",
      "tokens =",
      defaultIndentation +
        "{ " +
        jsonToRecord(opts.dictionary.properties, defaultIndentation) +
        defaultIndentation +
        "}",
    ].join("\n");
  },
};

function jsonToRecord(object: any, indentation: String): String {
  let result = "";
  for (const key in object) {
    let value = object[key];

    let encodedValue = encodeValue(value, indentation);

    result += indentation + ", " + elmify(key) + " = " + encodedValue + "\n";
  }

  return result.substr(indentation.length + 2);
}

function encodeValue(value: any, indentation: String): String {
  const valueType = Array.isArray(value) ? "array" : typeof value;

  if (valueType === "number") {
    return value.toString();
  } else if (valueType === "boolean") {
    return value ? "True" : "False";
  } else if (valueType === "string") {
    return `"${value.replaceAll('"', '\\"')}"`;
  } else if (valueType === "object") {
    const nextIndentation = indentation + defaultIndentation;
    return (
      "\n" +
      nextIndentation +
      "{ " +
      jsonToRecord(value, nextIndentation) +
      nextIndentation +
      "}"
    );
  } else if (valueType === "array") {
    return (
      "[ " +
      value.map((v: any) => encodeValue(v, indentation)).join(", ") +
      " ]"
    );
  }

  throw "Cannot handle type: " + valueType;
}

const defaultIndentation = "    ";

function elmify(str: String): String {
  // reserved keywords
  if (str === "type") {
    return "type_";
  }

  // key starts with digit
  if (/^\d+$/.test(str[0])) {
    return "i" + str;
  }

  return str;
}

