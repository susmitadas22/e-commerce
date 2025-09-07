import Image from "next/image";
import { images } from "~/assets/images";
import { svgs } from "~/assets/svgs";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { signIn } from "~/lib/auth";

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Welcome back</h1>
                    <p className="text-balance text-muted-foreground">
                      Login to your account to continue
                    </p>
                  </div>
                </div>
                <div className="my-12">
                  <form
                    action={async () => {
                      "use server";
                      await signIn("google", { redirectTo: "/" });
                    }}
                  >
                    <Button
                      type="submit"
                      className="mt-6 w-full"
                      size="lg"
                      variant="outline"
                    >
                      <Image
                        src={svgs.google}
                        alt="Google"
                        width={16}
                        height={16}
                        className="mr-2"
                      />
                      Continue with Google
                    </Button>
                  </form>
                </div>
              </div>
              <div className="relative hidden bg-muted md:block">
                <Image
                  src={images.e_commerce}
                  alt="Freelancer"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
