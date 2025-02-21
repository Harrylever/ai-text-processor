"use client"

import { FormEvent, useState } from "react"
import { Send } from "lucide-react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { IMessage } from "@/typings"
import MessageDisplay from "./message-display"
import { Card, CardContent, CardFooter } from "./ui/card"
import { detectLanguage } from "@/lib/languageDetector"
import { generate16BitId } from "@/lib/utils"

const TextProcessorContainer = () => {
  const [inputText, setInputText] = useState("")
  const [messages, setMessages] = useState<IMessage[]>([])

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const detectedLanguages = await detectLanguage(inputText)

      if (Array.isArray(detectedLanguages) && detectLanguage.length > 0) {
        const message: IMessage = {
          id: generate16BitId().toString(),
          content: inputText.trim(),
          language: detectedLanguages[0].detectedLanguage,
        }
        setMessages((prev) => [...prev, message])
        setInputText("")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="my-6 w-full">
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="h-[60vh] overflow-y-auto p-4">
          {messages.map((message) => (
            <MessageDisplay key={message.id} message={message} />
          ))}
        </CardContent>

        <CardFooter className="mt-2 border-t border-black/15">
          <form
            onSubmit={handleSendMessage}
            className="w-full flex pt-4 px-4 gap-4"
          >
            <Textarea
              placeholder="Enter your message here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />

            <Button
              type="submit"
              className="h-[40px] w-[40px] flex items-center justify-center bg-black"
            >
              <Send className="text-white" size={20} />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

export default TextProcessorContainer
