import { z } from "zod"

/** 이메일 필드 공통 스키마 */
export const emailSchema = z
  .string()
  .min(1, "이메일을 입력해주세요.")
  .email("올바른 이메일 형식이 아닙니다.")

/** 비밀번호 필드 공통 스키마 (8자 이상, 영문+숫자 조합) */
export const passwordSchema = z
  .string()
  .min(8, "비밀번호는 8자 이상이어야 합니다.")
  .regex(/[a-zA-Z]/, "영문자를 포함해야 합니다.")
  .regex(/[0-9]/, "숫자를 포함해야 합니다.")

/** 이름 필드 공통 스키마 */
export const nameSchema = z
  .string()
  .min(2, "이름은 2자 이상이어야 합니다.")
  .max(20, "이름은 20자 이하여야 합니다.")

/** 로그인 폼 스키마 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "비밀번호를 입력해주세요."),
})

/** 회원가입 폼 스키마 */
export const registerSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  })

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
