"use client"

import { useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"

import { registerSchema, type RegisterFormValues } from "@/lib/validations"
import { logger } from "@/lib/logger"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card"

/** 회원가입 최종 데모 — 모든 컴포넌트 조합 */
export default function RegisterPage() {
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(values: RegisterFormValues) {
    logger.debug("회원가입 데이터 제출", { email: values.email, name: values.name })
    alert(`가입 완료! 환영합니다, ${values.name}님.`)
    form.reset()
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">회원가입 데모</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Card · Input · Button · Badge · Form 컴포넌트를 조합한 최종 데모
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>회원가입</CardTitle>
          <CardDescription>아래 정보를 입력하여 계정을 생성하세요.</CardDescription>
          <CardAction>
            <Badge variant="secondary">데모</Badge>
          </CardAction>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="홍길동"
                        aria-invalid={!!form.formState.errors.name}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@example.com"
                        aria-invalid={!!form.formState.errors.email}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="8자 이상, 영문+숫자 포함"
                        aria-invalid={!!form.formState.errors.password}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      영문자와 숫자를 포함하여 8자 이상 입력해주세요.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호 확인</FormLabel>
                    <FormControl>
                      <Input
                        ref={confirmPasswordRef}
                        type="password"
                        placeholder="비밀번호 재입력"
                        aria-invalid={!!form.formState.errors.confirmPassword}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex-col gap-2">
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
                aria-busy={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    가입 중...
                  </>
                ) : (
                  "가입하기"
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={() => form.reset()}
              >
                초기화
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
