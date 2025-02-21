import TextProcessorContainer from "@/components/text-processor-container"
import MaxWidth from "@/components/ui/max-width"

export default function Home() {
  return (
    <section className="pt-16">
      <MaxWidth>
        <div>
          <div className="flex items-center justify-center">
            <h2 className="text-center text-5xl font-bold font-rubik">
              AI Text Processor
            </h2>
          </div>

          <TextProcessorContainer />
        </div>
      </MaxWidth>
    </section>
  )
}
