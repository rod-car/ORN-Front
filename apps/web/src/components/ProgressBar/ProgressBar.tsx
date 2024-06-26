import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
    barColors: {
        "0": "tomato",
        "1.0": "tomato"
    },
    barThickness: 5,
    shadowBlur: 2
});

export function ProgressBar(): ReactNode {
    const [loading, setLoading] = useState(false)
    const location = useLocation();

    useEffect(() => {
        setLoading(true)
        const timeoutId = setTimeout(() => {
            setLoading(false)
        }, 1000)
        return () => clearTimeout(timeoutId)
    }, [location]);

    return <>{loading && <TopBarProgress />}</>
}