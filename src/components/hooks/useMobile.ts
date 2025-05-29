import { useEffect, useState } from "react";

interface PlatformInfo {
    isMobile: boolean;
    isIOS: boolean;
    isAndroid: boolean;
    isDesktop: boolean;
    userAgent: string;
}

export default function useMobile(): PlatformInfo {
    const [platformInfo, setPlatformInfo] = useState<PlatformInfo>({
        isMobile: false,
        isIOS: false,
        isAndroid: false,
        isDesktop: false,
        userAgent: navigator.userAgent,
    });

    useEffect(() => {
        const checkPlatform = () => {
            const userAgent = navigator.userAgent;
            const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
            const isAndroid = /Android/i.test(userAgent);

            setPlatformInfo({
                isMobile: isIOS || isAndroid,
                isDesktop: !isIOS && !isAndroid,
                isIOS,
                isAndroid,
                userAgent,
            });
        };

        checkPlatform();
        window.addEventListener("resize", checkPlatform);
        return () => window.removeEventListener("resize", checkPlatform);
    }, []);

    return {
        isMobile: platformInfo.isMobile,
        isIOS: platformInfo.isIOS,
        isAndroid: platformInfo.isAndroid,
        isDesktop: platformInfo.isDesktop,
        userAgent: platformInfo.userAgent,
    };
}
