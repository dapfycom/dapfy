"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSmartContractInteraction } from "@/services/sc";
import { BytesValue } from "@multiversx/sdk-core/out";
import { useFormik } from "formik";
import * as yup from "yup";
import { useGetHeroTagAvailability } from "../../utils/hook";

export default function HeroTagForm() {
  const formik = useFormik({
    initialValues: {
      herotag: "",
    },
    onSubmit: async (values) => {
      console.log("submitting");

      try {
        getSmartContractInteraction(
          "erd1qqqqqqqqqqqqqpgqz0ycyug2rqtpyrh5p33y9vqjv95s3xmaqpnq7uz3qq"
        ).scCall({
          functionName: "register",
          gasL: 600000000,
          arg: [BytesValue.fromUTF8(values.herotag + ".elrond")],
        });
      } catch (error) {
        console.log({ error });
      }
    },
    validationSchema: yup.object({
      herotag: yup
        .string()
        .required("Herotag is required")
        .matches(
          /^[a-z0-9]+$/i,
          "Herotag should contain alphanumeric characters (a-z and 0-9 only)"
        ),
    }),
  });

  const { isLoading, herotagInfo, error } = useGetHeroTagAvailability(
    formik.values.herotag
  );

  return (
    <Card className="w-[350px] text-left">
      <CardHeader>
        <CardTitle> Herotag generator </CardTitle>
        <CardDescription>
          Your herotag should contain alphanumeric characters (a-z and 0-9
          only).
        </CardDescription>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="herotag">Herotag</Label>
              <Input
                id="herotag"
                placeholder="Herotag of your wallet"
                onChange={formik.handleChange}
                name="herotag"
              />
              {formik.errors.herotag ||
                (herotagInfo && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.herotag || "This herotag is already taken"}
                  </p>
                ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="submit"
            disabled={!!formik.errors.herotag || !!herotagInfo || isLoading}
          >
            {isLoading ? "Loading..." : "Generate"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
