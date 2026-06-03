"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { loginSchema, type LoginFormValues } from "@/lib/validations"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

/** 로그인 폼 예제 — React Hook Form + Zod */
export default function LoginFormPage() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  /** 추후 Auth 연결 시 이 핸들러에 API 호출 추가 */
  function onSubmit(values: LoginFormValues) {
    console.log("로그인 폼 데이터:", values)
    alert(`제출된 이메일: ${values.email}`)
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">로그인 폼 예제</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          React Hook Form + Zod 유효성 검사 조합 예제
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>로그인</CardTitle>
          <CardDescription>이메일과 비밀번호를 입력해주세요.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
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
                        placeholder="비밀번호 입력"
                        aria-invalid={!!form.formState.errors.password}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                로그인
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
