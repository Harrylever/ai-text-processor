const MaxWidth = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative max-w-5xl mx-auto px-8 sm:px-6 2xl:px-0">
      <div>{children}</div>
    </div>
  )
}

export default MaxWidth
