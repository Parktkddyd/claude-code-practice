import Link from "next/link"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

const SHOWCASE_ITEMS = [
  {
    href: "/examples/button",
    title: "Button",
    description: "variant(6종) · size(4종) · 아이콘 · disabled 상태 예제",
    badge: "컴포넌트",
  },
  {
    href: "/examples/card",
    title: "Card",
    description: "기본 카드, 헤더/푸터 조합, 액션 버튼 포함 카드 예제",
    badge: "컴포넌트",
  },
  {
    href: "/examples/input",
    title: "Input",
    description: "기본 입력, placeholder, disabled, 에러 상태, Label 조합 예제",
    badge: "컴포넌트",
  },
  {
    href: "/examples/badge",
    title: "Badge",
    description: "variant(6종) 전체 예제",
    badge: "컴포넌트",
  },
  {
    href: "/examples/forms/login",
    title: "로그인 폼",
    description: "React Hook Form + Zod 유효성 검사 조합 폼 예제",
    badge: "폼 예제",
  },
  {
    href: "/register",
    title: "회원가입 데모",
    description: "Card · Input · Button · Badge · Form 컴포넌트를 조합한 최종 데모",
    badge: "최종 데모",
  },
]

/** 스타터킷 쇼케이스 인덱스 페이지 */
export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Next.js Starter Kit
        </h1>
        <p className="mt-2 text-muted-foreground">
          Next.js 16 · Tailwind CSS v4 · shadcn/ui · React Hook Form · Zod
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SHOWCASE_ITEMS.map(({ href, title, description, badge }) => (
          <Link key={href} href={href} className="group block">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{title}</CardTitle>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {badge}
                  </span>
                </div>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-xs text-primary group-hover:underline">
                  예제 보기 →
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
