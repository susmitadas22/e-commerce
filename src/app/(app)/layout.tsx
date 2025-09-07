import { auth } from "~/lib/auth";
import { Header } from "../_components/header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <>
      <Header user={session?.user} />
      {children}
    </>
  );
}
