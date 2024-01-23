"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {formLoginSchema} from "@/lib/form-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import Link from "next/link";
import React, {FC} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = ({}) => {
  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema),
  });

  const onSubmit = (val: z.infer<typeof formLoginSchema>) => {
    console.log(val);
  };

  return (
    <div>
      <div className="text-3xl text-center font-semibold mb-7">
        Welcome Back, Dude!
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="hanhyojoo@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">Login</Button>
        </form>
      </Form>

      <div className="text-gray-500 text-sm mt-6">
        Don`t have an account? {" "}
        <Link href='/register' className="text-primary font-medium" >Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;
