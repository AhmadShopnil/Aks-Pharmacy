import Container from "../Common/Container";

export  function PageContainer({ title, children }) {
  return (
    <section className="bg-gray-50 min-h-screen py-12">
      <Container className="">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          {title}
        </h1>
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10 space-y-6 text-gray-700 leading-relaxed">
          {children}
        </div>
      </Container>
    </section>
  )
}