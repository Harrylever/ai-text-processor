/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    ai: {
      summarizer: {
        capabilities: () => Promise<{
          available: "no" | "readily" | "after-download"
        }>
        create: (options: any) => Promise<any>
      }
      languageDetector: {
        capabilities: () => Promise<{
          capabilities: "no" | "readily" | "after-download"
        }>
        create: (options?: { monitor?: (m: any) => void }) => Promise<any>
      }
      translator: {
        capabilities: () => Promise<{
          languagePairAvailable: (source: string, target: string) => boolean
        }>
        create: (options: {
          sourceLanguage: string
          targetLanguage: string
          monitor?: (m: any) => void
        }) => Promise<any>
      }
    }
  }
}

export interface IMessage {
  id: string
  content: string
  language: TLang
  summary?: string
  translation?: string
}

export type TLang = "en" | "pt" | "es" | "ru" | "tr" | "fr"
