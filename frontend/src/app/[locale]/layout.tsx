import "@/app/globals.css";
import { FC, ReactNode } from "react";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import QueryProvider from "@/components/providers/QueryProvider";
import { Locale, localeConfig } from "@/localization/localeConfig";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { getDictionary } from "@/localization/getDictionary";




type RootLayoutProps = {
    children: ReactNode;
    params: Promise<{ locale: Locale }>;
};

const layout: FC<RootLayoutProps> = async ({ children, params }) => {
    const locale = (await params).locale
    const dictionary = await getDictionary(locale)

    return (
        <html>
            <body className="w-full">
                <SessionProvider>
                    <LocaleProvider dictionary={dictionary}>
                        <QueryProvider>
                            {children}
                            <Toaster />
                            <NextTopLoader color="#3563E9" height={4} showSpinner={false} />
                        </QueryProvider>
                    </LocaleProvider>
                </SessionProvider>
            </body>
        </html>
    )
}

export default layout

export const generateStaticParams = () => {
    return localeConfig.locales.map(locale => ({ locale }));
};
