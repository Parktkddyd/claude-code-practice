import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-medium text-muted-foreground">{title}</h2>
      <div className="flex flex-col gap-3 max-w-sm">{children}</div>
    </section>
  )
}

/** Input 컴포넌트 쇼케이스 */
export default function InputPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Input</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          기본 입력 필드, 상태별 예제, Label 조합
        </p>
      </div>

      <Section title="기본">
        <Input placeholder="텍스트를 입력하세요." />
      </Section>

      <Section title="타입별">
        <Input type="text" placeholder="text" />
        <Input type="email" placeholder="email@example.com" />
        <Input type="password" placeholder="비밀번호" />
        <Input type="number" placeholder="숫자 입력" />
        <Input type="search" placeholder="검색어 입력" />
      </Section>

      <Section title="Label 조합">
        <div className="space-y-1.5">
          <Label htmlFor="email-example">이메일</Label>
          <Input id="email-example" type="email" placeholder="email@example.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pw-example">비밀번호</Label>
          <Input id="pw-example" type="password" placeholder="비밀번호 입력" />
        </div>
      </Section>

      <Section title="에러 상태 (aria-invalid)">
        <div className="space-y-1.5">
          <Label htmlFor="error-input">이메일</Label>
          <Input
            id="error-input"
            type="email"
            defaultValue="잘못된형식"
            aria-invalid="true"
          />
          <p className="text-xs font-medium text-destructive">
            올바른 이메일 형식이 아닙니다.
          </p>
        </div>
      </Section>

      <Section title="Disabled">
        <Input disabled placeholder="비활성화된 입력 필드" />
        <Input disabled defaultValue="수정 불가 값" />
      </Section>
    </div>
  )
}
