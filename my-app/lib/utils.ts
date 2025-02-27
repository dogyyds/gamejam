import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDateRange(
    startDate: string,
    endDate: string,
    options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
    }
) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // 如果是同一天，只显示一次日期
    if (
        start.getFullYear() === end.getFullYear() &&
        start.getMonth() === end.getMonth() &&
        start.getDate() === end.getDate()
    ) {
        return start.toLocaleDateString("zh-CN", options);
    }

    // 如果是同一个月，只显示一次年月
    if (
        start.getFullYear() === end.getFullYear() &&
        start.getMonth() === end.getMonth()
    ) {
        return `${start.toLocaleDateString("zh-CN", {
            month: "short",
            year: "numeric",
        })} ${start.getDate()}日 - ${end.getDate()}日`;
    }

    return `${start.toLocaleDateString("zh-CN", options)} - ${end.toLocaleDateString(
        "zh-CN",
        options
    )}`;
}

export function truncate(str: string, length: number): string {
    if (str.length <= length) return str;
    return str.slice(0, length) + "...";
}

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
}
