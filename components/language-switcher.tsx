"use client";

import { RiEnglishInput } from "react-icons/ri";
import { MdTranslate } from "react-icons/md";
import ReactCountryFlag from "react-country-flag";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

const languages = [
  {
    code: "gb",
    name: "English",
    icon: RiEnglishInput,
  },
  {
    code: "vn",
    name: "Tiếng Việt",
    icon: MdTranslate,
  },
];

export function LanguageSwitcher() {
  const changeLanguage = (locale: string) => {
    console.log(locale);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MdTranslate size={16} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {languages.map((lang) => {
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="cursor-pointer"
            >
              <ReactCountryFlag countryCode={lang.code.toUpperCase()} />
              {lang.name}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
