"use client"

import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { IMessage, TLang } from "@/typings"
import { summarizeContent } from "@/lib/summarizer"
import { translateText } from "@/lib/translator"

const DetectedLangMap: Record<TLang, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  pt: "Portuguese",
  ru: "Russian",
  tr: "Turkish",
}

const MessageDisplay = ({ message }: { message: IMessage }) => {
  const [expectedLanguage, setExpectedLanguage] = useState<TLang>("en")
  const [isTranslating, setIsTranslating] = useState(false)
  const [translatedMessage, setTranslatedMessage] = useState<string | null>(
    null
  )
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [summarizedMessage, setSummarizedMessage] = useState<string | null>(
    null
  )
  const [timeTakenForSummarizing, setTimeTakenForSummarizing] =
    useState<number>(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isSummarizing) {
      interval = setInterval(() => {
        setTimeTakenForSummarizing((prev) => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isSummarizing])

  const handleSummarizeMessage = async () => {
    try {
      setIsSummarizing(true)
      const result = await summarizeContent(message.content)
      console.log(result)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSummarizing(false)
      setTimeTakenForSummarizing(0)
    }
  }

  const handleTranslateText = async () => {
    try {
      setIsTranslating(true)
      const result = await translateText(
        message.content,
        message.language,
        expectedLanguage
      )

      setTranslatedMessage(result)
    } catch (error) {
      console.error(error)
    } finally {
      setIsTranslating(false)
    }
  }

  return (
    <div className="mb-4">
      <div className="w-full">
        <p className="text-lg">{message.content}</p>
      </div>
      {message.language && (
        <div className="mt-1 text-xs text-gray-500">
          Detected language: {DetectedLangMap[message.language]}
        </div>
      )}
      {message.content.length > 150 && message.language === "en" && (
        <div className="flex items-center gap-3">
          <Button
            disabled={isSummarizing || isTranslating}
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={handleSummarizeMessage}
          >
            {isSummarizing ? "summarizing" : "Summarize"}
          </Button>
          {timeTakenForSummarizing > 20 && (
            <p className="text-gray-300 text-xs">
              Summarization is taking longer than expected...
            </p>
          )}
        </div>
      )}

      <div className="mt-2 flex items-center space-x-2">
        <Select
          value={expectedLanguage}
          onValueChange={(e: TLang) => setExpectedLanguage(e)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue>Select language</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="pt">Portuguese</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="ru">Russian</SelectItem>
            <SelectItem value="tr">Turkish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          disabled={isTranslating || isSummarizing}
          size="sm"
          onClick={handleTranslateText}
        >
          {isTranslating ? "translating..." : "Translate"}
        </Button>
      </div>

      {summarizedMessage && (
        <div className="mt-2 p-2 bg-yellow-100 rounded">
          Summary: {summarizedMessage}
        </div>
      )}
      {translatedMessage && (
        <div className="mt-2 p-2 bg-green-100 rounded">
          Translation: {translatedMessage}
        </div>
      )}
    </div>
  )
}

export default MessageDisplay
