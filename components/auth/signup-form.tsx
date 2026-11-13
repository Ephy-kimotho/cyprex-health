"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, type Path } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signupSchema, type SignupInput } from "@/lib/schemas/auth"

const fields: {
  name: Path<SignupInput>
  label: string
  type: string
  autoComplete: string
}[] = [
  {
    name: "firstName",
    label: "First name",
    type: "text",
    autoComplete: "given-name",
  },
  {
    name: "lastName",
    label: "Last name",
    type: "text",
    autoComplete: "family-name",
  },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  {
    name: "password",
    label: "Password",
    type: "password",
    autoComplete: "new-password",
  },
  {
    name: "confirmPassword",
    label: "Confirm password",
    type: "password",
    autoComplete: "new-password",
  },
]

export function SignupForm() {
  const router = useRouter()
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  // TODO: replace with the real sign-up call once the API exists.
  function onSubmit() {
    router.push("/dashboard")
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-semibold">Create an account</h2>
        <p className="text-sm text-muted-foreground">
          It takes a minute, then you can book your first visit.
        </p>
      </div>

      <FieldGroup className="grid gap-4 sm:grid-cols-2">
        {fields.map(({ name, label, type, autoComplete }) => (
          <Controller
            key={name}
            control={form.control}
            name={name}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                className={
                  name === "firstName" || name === "lastName"
                    ? undefined
                    : "sm:col-span-2"
                }
              >
                <FieldLabel htmlFor={name}>{label}</FieldLabel>
                <Input
                  {...field}
                  id={name}
                  type={type}
                  autoComplete={autoComplete}
                  className="h-10"
                  aria-invalid={fieldState.invalid}
                />
                <FieldError errors={[fieldState.error]} />
              </Field>
            )}
          />
        ))}
      </FieldGroup>

      <Button type="submit" size="lg" className="h-11 rounded-full">
        Create account
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Log in
        </Link>
      </p>
    </form>
  )
}
