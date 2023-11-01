import { Container } from "@/components/container"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container>
      {children}
    </Container>
  )
}
