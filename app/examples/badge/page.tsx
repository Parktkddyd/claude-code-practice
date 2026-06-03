import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Info } from "lucide-react"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </section>
  )
}

/** Badge 컴포넌트 쇼케이스 */
export default function BadgePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Badge</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          6가지 variant 및 아이콘 조합 예제
        </p>
      </div>

      <Section title="Variant">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="ghost">Ghost</Badge>
        <Badge variant="link">Link</Badge>
      </Section>

      <Section title="아이콘 조합">
        <Badge variant="default">
          <CheckCircle />
          완료
        </Badge>
        <Badge variant="destructive">
          <AlertCircle />
          오류
        </Badge>
        <Badge variant="secondary">
          <Info />
          정보
        </Badge>
      </Section>

      <Section title="실제 사용 예시">
        <Badge variant="default">신규</Badge>
        <Badge variant="secondary">베타</Badge>
        <Badge variant="outline">v1.0.0</Badge>
        <Badge variant="destructive">삭제됨</Badge>
        <Badge variant="ghost">선택사항</Badge>
      </Section>
    </div>
  )
}
