"use client"
import React from 'react'

const DeleteCode = () => {
  return (
    <Form {...form}>
    {contextHolder}
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 my-auto px-4 sm:p-0 sm:mx-4"
    >
      <div className="flex flex-col justify-center items-center">
        <Image
          src="/assets/icons/mark.svg"
          alt="SignIn"
          width={50}
          height={50}
        />

        <div className="my-4">
          <h1 className="text-2xl font-bold sm:text-4xl text-center">
            Sign In To Dashboard
          </h1>
        </div>
      </div>
      <CustomFormField
        control={form.control}
        Lucide={<User className="dark:text-dark-600" />}
        placeholder="enter your email"
        label="email address"
        fieldType={FormFieldType.INPUT}
        name="email"
        error={form.formState.errors.email}
        state
      />

      <CustomFormField
        control={form.control}
        Lucide={<KeyRound className="dark:text-dark-600" />}
        placeholder="enter password"
        label="password"
        fieldType={FormFieldType.PASSWORD}
        type={state ? "text" : "password"}
        error={form.formState.errors.password}
        children={
          <>
            {state ? (
              <Eye
                onClick={() => setState(false)}
                size="20px"
                cursor="pointer"
              />
            ) : (
              <EyeOff
                onClick={() => setState(true)}
                size="20px"
                cursor="pointer"
              />
            )}
          </>
        }
        name="password"
      />

      <SubmitButton
        isLoading={isLoading}
        className="bg-[#6366f1] w-full text-slate-50"
      >
        Sign in
      </SubmitButton>

      <div className="flex justify-between">
        <p className="text-sm text-slate-500">doesn't have account?</p>
        <Link href={"/register"}>
          <p className="text-sky-700 text-sm hover:underline">create one</p>
        </Link>
      </div>
    </form>
  </Form>
  )
}

export default DeleteCode
