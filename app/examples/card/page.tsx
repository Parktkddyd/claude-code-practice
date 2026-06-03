import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

/** Card 컴포넌트 쇼케이스 */
export default function CardPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Card</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          기본 카드, 헤더/푸터 조합, 액션 버튼 포함 카드 예제
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">기본 카드</h2>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>카드 제목</CardTitle>
            <CardDescription>카드에 대한 간단한 설명을 여기에 작성합니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">카드 본문 내용입니다.</p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">푸터 포함 카드</h2>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>알림 설정</CardTitle>
            <CardDescription>이메일 알림 수신 여부를 설정합니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              마케팅 이메일, 보안 알림, 업데이트 소식을 받을 수 있습니다.
            </p>
          </CardContent>
          <CardFooter className="gap-2">
            <Button size="sm" variant="outline">취소</Button>
            <Button size="sm">저장</Button>
          </CardFooter>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">액션 포함 카드</h2>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>프로젝트 현황</CardTitle>
            <CardDescription>최근 업데이트된 프로젝트 목록입니다.</CardDescription>
            <CardAction>
              <Badge variant="secondary">3개</Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="space-y-2">
            {["Starter Kit", "Admin Dashboard", "Landing Page"].map((name) => (
              <div key={name} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
                <span className="text-sm">{name}</span>
                <Badge variant="outline">진행 중</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">Small 사이즈 카드</h2>
        <div className="flex flex-wrap gap-3">
          {["TypeScript", "React", "Next.js"].map((tech) => (
            <Card key={tech} size="sm" className="w-36">
              <CardHeader>
                <CardTitle>{tech}</CardTitle>
                <CardDescription>기술 스택</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
