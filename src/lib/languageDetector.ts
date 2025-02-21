/* eslint-disable @typescript-eslint/no-explicit-any */

export const detectLanguage = async (text: string): Promise<any> => {
  const languageDetectorCapabilities =
    await self.ai.languageDetector.capabilities()
  const canDetect = languageDetectorCapabilities.capabilities
  let detector

  if (canDetect === "no") {
    throw new Error("Language detection is not available.")
  }

  if (canDetect === "readily") {
    detector = await self.ai.languageDetector.create()
  } else {
    detector = await self.ai.languageDetector.create({
      monitor(m: any) {
        m.addEventListener("downloadprogress", () => {})
      },
    })
    await detector.ready
  }

  const detectedLanguage = await detector.detect(text)
  return detectedLanguage
}
