export const summarizeContent = async (content: string) => {
  const options = {
    sharedContext: "This is a plain-text",
    type: "key-points",
    format: "markdown",
    length: "medium",
  }

  const available = (await self.ai.summarizer.capabilities()).available
  let summarizer

  if (available === "no") {
    throw new Error("Summarizer API is not available")
  }

  if (available === "readily") {
    summarizer = await self.ai.summarizer.create(options)
  } else {
    summarizer = await self.ai.summarizer.create(options)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    summarizer.addEventListener("downloadprogress", (e: any) => {
      console.log(`Downloaded ${e.loaded} of ${e.total} bytes`)
    })
    await summarizer.ready
  }

  const summary = await summarizer.summarize(content)
  return summary
}
