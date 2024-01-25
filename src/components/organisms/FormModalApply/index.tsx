"use client";

import React, {FC} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {formApplySchema} from "@/lib/form-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import Image from "next/image";
import {Separator} from "@/components/ui/separator";
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
import {Textarea} from "@/components/ui/textarea";
import UploadField from "../UploadField";
import {useSession} from "next-auth/react";
import {supabaseUploadFile} from "@/lib/supabase";
import {useToast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";

interface FormModalApplyProps {
  image: string | undefined;
  roles: string | undefined;
  location: string | undefined;
  jobType: string | undefined;
  industry: string | undefined;
  id: string | undefined;
}

const FormModalApply: FC<FormModalApplyProps> = ({
  image,
  roles,
  location,
  jobType,
  industry,
  id,
}) => {
  const form = useForm<z.infer<typeof formApplySchema>>({
    resolver: zodResolver(formApplySchema),
  });

  const {toast} = useToast();
  const router = useRouter();

  const {data: session} = useSession();

  const onSubmit = async (val: z.infer<typeof formApplySchema>) => {
    try {
      const {filename, error} = await supabaseUploadFile(
        val.resume,
        "applicant"
      );

      const reqData = {
        userId: session?.user.id,
        jobId: id,
        resume: filename,
        coverLetter: val.coverLetter,
        linkedIn: val.linkedIn,
        phone: val.phone,
        portfolio: val.portfolio,
        previousJobTitle: val.previousJobTitle,
      };

      if (error) {
        throw "Error";
      };

      await fetch("/api/jobs/apply", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(reqData),
      });

      await toast({
        title: "Success",
        description: "Apply job success!",
      });

      router.replace("/");
    } catch (error) {
      console.log(error);

      toast({
        title: "Error",
        description: "Something went wrong! Please try again",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-lg px-12 py-6" size="lg">
          Apply
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <div>
          <div className="inline-flex items-center gap-4">
            <div>
              <Image src={image!!} alt={image!!} width={60} height={60} />
            </div>
            <div>
              <div className="text-lg font-semibold">{roles}</div>
              <div className="text-gray-500">
                {industry} . {location} . {jobType}
              </div>
            </div>
          </div>

          <Separator className="my-5" />

          <div className="mb-5">
            <div className="font-semibold text-lg">Submit your application</div>
            <div className="text-gray-500 text-sm mt-2">
              The following is required and will only be shared with Nomad
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Lee Mihyun" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="leemihyun@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="0812345666" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="previousJobTitle"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Current of previous job title</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              <h2 className="font-semibold">LINKS</h2>

              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="linkedIn"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>LinkedIn URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="linkedin.com/leemihyun"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="portfolio"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Portfolio URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="leemihyun.my.id/portfolio"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="coverLetter"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add a cover letter or anything else you want to share"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <UploadField form={form} />

              <Button className="w-full">Submit Application</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormModalApply;
