// getLanguageContent.js
// export function useLanguageContent(content, lang, defaultLang = 'en') {
export function useLanguageContent(content, lang = "en") {
  if (!content || typeof content !== "object") {
    console.warn("Invalid content provided to getLanguageContent");
    return null;
  }

  if (content[lang]) {
    return content[lang];
  }

  const availableLanguages = Object.keys(content);

  if (availableLanguages.length > 0) {
    console.warn(
      `Neither '${lang}' nor '${lang}' found, using '${availableLanguages[0]}'`
    );
    return content[availableLanguages[0]];
  }

  return null;
}
