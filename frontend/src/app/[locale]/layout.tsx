import "@/app/globals.css";
import { FC, Suspense } from "react";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { Toaster } from "react-hot-toast";
import { getDictionary } from "@/localization/getDictionary";
import { Locale, localeConfig } from "@/localization/localeConfig";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import NextTopLoader from "nextjs-toploader";
import QueryProvider from "@/components/providers/QueryProvider";




type RootLayoutProps = {
    children: React.ReactNode;
    params: Promise<{ locale: Locale }>;
};


const layout: FC<RootLayoutProps> = async ({ children, params }) => {
    const locale = (await params).locale
    const dictionary = await getDictionary(locale)

    return (
        <html>
            <body className="w-full">
                <SessionProvider>
                    <QueryProvider>
                        <LocaleProvider dictionary={dictionary} >
                            <Suspense>
                                {children}
                            </Suspense>
                            <Toaster />
                            <NextTopLoader color="#3563E9" height={4} showSpinner={false} />
                        </LocaleProvider>
                    </QueryProvider>
                </SessionProvider>
            </body>
        </html>
    )
}

export default layout


export const generateStaticParams = () => {
    return localeConfig.locales.map(locale => ({ locale }));
};