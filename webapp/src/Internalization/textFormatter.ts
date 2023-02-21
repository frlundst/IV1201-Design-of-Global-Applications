import { Texts } from "../Resources/Texts";

export const textFormatter = (code: string, language: string ): string => {
    let result = "{No text found}";

    Texts.forEach(obj => {
        if (obj.code === code) {
            result = obj[language] ?? "{No text found}";
        }
    })

    return result;
}
    