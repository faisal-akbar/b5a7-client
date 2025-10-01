"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@/context/UserContext";
import { loginUser } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FieldValues, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Container } from "../Container";
import { Heading } from "../Heading";
import { SubHeading } from "../SubHeading";
import { AuthIllustration } from "./AuthIllustration";
import { loginSchema } from "./LoginValidation";

export const SignIn = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "super@next.com", password: "ph@123456" },
  });

  const { setIsLoading } = useUser();

  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await loginUser(data);
      setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);

        router.push("/dashboard");
      } else {
        toast.error(res?.message);
      }
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <Container className="min-h-[calc(100vh-8rem)] py-10 md:py-20">
      <div className="grid grid-cols-1 gap-10 px-4 md:grid-cols-2 md:px-8 lg:gap-40">
        <div>
          <Heading className="mt-4 text-left lg:text-4xl">
            Welcome back!
          </Heading>
          <SubHeading as="p" className="mt-4 max-w-xl text-left">
            Enter your email and password to access your account.
          </SubHeading>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 flex flex-col gap-8"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="mt-4 border-none focus:ring-gray-300"
                        placeholder="john@example.com"
                        {...field}
                        value={field.value || ""}
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="mt-4 border-none focus:ring-gray-300"
                        type="password"
                        placeholder="********"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging..." : "Login"}
              </Button>
            </form>
          </Form>
        </div>
        <AuthIllustration />
      </div>
    </Container>
  );
};
