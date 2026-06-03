import { Button } from "@/components/ui/button"
import { Loader2, Mail, Trash2 } from "lucide-react"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </section>
  )
}

/** Button 컴포넌트 쇼케이스 */
export default function ButtonPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Button</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          6가지 variant와 4가지 size, 아이콘 버튼 예제
        </p>
      </div>

      <Section title="Variant">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </Section>

      <Section title="Size">
        <Button size="xs">Extra Small</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
      </Section>

      <Section title="아이콘 조합">
        <Button>
          <Mail />
          이메일 보내기
        </Button>
        <Button variant="destructive">
          <Trash2 />
          삭제
        </Button>
        <Button size="icon" variant="outline" aria-label="메일">
          <Mail />
        </Button>
        <Button size="icon-sm" variant="ghost" aria-label="삭제">
          <Trash2 />
        </Button>
      </Section>

      <Section title="로딩 상태">
        <Button disabled>
          <Loader2 className="animate-spin" />
          처리 중...
        </Button>
        <Button variant="outline" disabled>
          <Loader2 className="animate-spin" />
          저장 중
        </Button>
      </Section>

      <Section title="Disabled">
        <Button disabled>Default</Button>
        <Button variant="secondary" disabled>Secondary</Button>
        <Button variant="outline" disabled>Outline</Button>
        <Button variant="destructive" disabled>Destructive</Button>
      </Section>
    </div>
  )
}
