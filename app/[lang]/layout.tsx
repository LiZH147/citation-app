import { getTranslations } from "@/app/lib/translations";

// generateStaticParams and generateMetadata are already defined in the root layout
// This layout just provides language-specific context to children
export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  // Simply pass through - page components handle their own translation lookups
  return <>{children}</>;
}