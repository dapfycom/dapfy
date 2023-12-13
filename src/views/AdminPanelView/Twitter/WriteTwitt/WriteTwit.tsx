"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { writeTweet } from "@/services/rest/dapfy-api/twit";
import toast from "react-hot-toast";

const FormSchema = z.object({
  twit: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function WriteTwit() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      twit: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.promise(writeTweet(data.twit), {
      loading: "Writing tweet...",
      success: "Tweet written!",
      error: "Error writing tweet",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="twit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twit</FormLabel>
              <FormControl>
                <Input placeholder="Dapfy is twitter!" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Twit</Button>
      </form>
    </Form>
  );
}
