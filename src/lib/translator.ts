/* eslint-disable @typescript-eslint/no-explicit-any */

import { TLang } from "@/typings"

export const translateText = async (
  text: string,
  sourceLanguage: TLang,
  targetLanguage: TLang
): Promise<any> => {
  if (typeof self === "undefined" || !self.ai?.translator) {
    throw new Error("Translation is not supported in this environment.")
  }

  const translatorCapabilities = await self.ai.translator.capabilities()
  const isLanguagePairAvailable = translatorCapabilities.languagePairAvailable(
    sourceLanguage,
    targetLanguage
  )

  if (!isLanguagePairAvailable) {
    throw new Error(
      `Translation from ${sourceLanguage} to ${targetLanguage} is not available.`
    )
  }

  const translator = await self.ai.translator.create({
    sourceLanguage,
    targetLanguage,
    monitor(m: any) {
      m.addEventListener("downloadprogress", (e: any) => {
        console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`)
      })
    },
  })
  await translator.ready

  const translatedText = await translator.translate(text)
  return translatedText
}
