


import { useTranslation } from "react-i18next";

const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const isSpanish = i18n.language === "es";

  const toggleLanguage = () => {
    const newLang = isSpanish ? "en" : "es";
    i18n.changeLanguage(newLang);
    localStorage.setItem("pawkon-lang", newLang); // persiste la elección
  };

  return (
    <label className="switch cursor-pointer relative flex w-[6.7rem] scale-75 overflow-hidden p-2">
      <input
        type="checkbox"
        checked={isSpanish}
        onChange={toggleLanguage}
        className="peer hidden"
      />
      <div className="absolute -right-26 z-1 flex h-12 w-24 skew-x-12 items-center justify-center text-lg duration-500 peer-checked:right-1"
        style={{ color: "#051d1b" }}
      >
        <span className="-skew-x-12 font-bold">ES</span>
      </div>
      <div
        className="z-0 h-12 w-24 -skew-x-12 duration-500 peer-checked:skew-x-12"
        style={{
          border: "1px solid #72cf2a",
          backgroundColor: isSpanish ? "#72cf2a" : "transparent",
        }}
      ></div>
      <div className="absolute left-[0.3rem] flex h-12 w-24 -skew-x-12 items-center justify-center text-lg duration-500 peer-checked:-left-26"
        style={{ color: "#fffef0" }}
      >
        <span className="skew-x-12 font-bold">EN</span>
      </div>
    </label>
  );
};

export default LanguageSwitch;