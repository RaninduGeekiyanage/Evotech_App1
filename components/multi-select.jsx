"use client";

import {
  Combobox,
  ComboboxAnchor,
  ComboboxBadgeItem,
  ComboboxBadgeList,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import * as React from "react";

export function MultiSelect({ list, label, placeholder, onValueChange }) {
  const [value, setValue] = useState([]);

  return (
    <Combobox
      value={value}
      onValueChange={(val) => {
        setValue(val);
        onValueChange(val);
      }}
      className="w-full"
      multiple
    >
      {label && <ComboboxLabel>{label}</ComboboxLabel>}
      <ComboboxAnchor className="h-full min-h-10 flex-wrap px-3 py-2">
        <ComboboxBadgeList>
          {value.map((item) => {
            const option = list.find((trick) => trick.value === item);
            if (!option) return null;

            return (
              <ComboboxBadgeItem 
              key={item} 
              value={item}
              className="border bg-blue-50"
              >
                {option.label}                
              </ComboboxBadgeItem>
            );
          })}
        </ComboboxBadgeList>
        <ComboboxInput
          placeholder={placeholder}
          className="h-auto min-w-20 flex-1 mr-5"
        />
        <ComboboxTrigger className="absolute top-3 right-2">
          <ChevronDown className="h-4 w-4" />
        </ComboboxTrigger>
      </ComboboxAnchor>
      <ComboboxContent>
        <ComboboxEmpty>No Items found</ComboboxEmpty>
        {list.map((item) => (
          <ComboboxItem key={item.value} value={item.value}>
            {item.label}
          </ComboboxItem>
        ))}
      </ComboboxContent>
    </Combobox>
  );
}