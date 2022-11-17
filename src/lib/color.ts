import colors from "$lib/chronix.color.json";
import type { colorType } from "./types";


export const isDark = () => document.body.classList.contains("dark");

export const mix = (color_1: string, color_2: string, weight: number = 50): string => {
    if (color_1[0] == "#")
        color_1 = color_1.slice(1)
    if (color_2[0] == "#")
        color_2 = color_2.slice(1)

    let val1 = parseInt(color_1, 16);
    let val2 = parseInt(color_2, 16);
    let color = "";

    for (let i = 0; i < 3; i++) {
        let ex1 = Math.floor(val1 % 256);
        let ex2 = Math.floor(val2 % 256);
        let v = Math.round(ex1 - (ex1 - ex2) * weight / 100).toString(16);
        while (v.length < 2) v = "0" + v;
        color = v + color;
        val1 = Math.floor(val1 / 256);
        val2 = Math.floor(val2 / 256);
    }

    return "#" + color;
};






export const ColorExplicit = (name: colorType, value: number = 500, alpha: number = null) => {
    if (!name) return "#0000";
    let a = "";
    if (alpha) {
        a = Math.floor(alpha * 255 / 100).toString(16);
        while (a.length < 2) a = "0" + a;
    }
    if (name[0] == "#") return name + (name.length == 5 || name.length == 9 ? "" : a);

    if ([50, 100, 200, 300, 400, 500, 600, 700, 800, 900].includes(value)) {
        let res = colors[name][value]
        if (res.includes("var"))
            return `rgba(${res} / ${a ? parseInt(a, 16) / 256 : 1})`;
        return colors[name][value] + a
    }
    let tar = Math.max(50, Math.floor(value / 100) * 100);
    let next = tar == 50 ? 100 : tar + 100;
    let exp = value >= 100 ? value - tar : (value - tar) * 2;
    return mix(colors[name][tar], colors[name][next], exp);
}

const Color = (query: colorType, alpha: number = null, noAlpha = false) => {
    if (!query) {
        return ColorExplicit("");
    }
    let a = query.split(/-|\//)
    let nalpha = parseInt(query.includes("-") ? a[2] : a[1])
    return ColorExplicit(a[0], parseInt(query.includes("-") ? a[1] : "500"), !noAlpha && alpha || noAlpha && alpha && !nalpha ? alpha : nalpha)
}

export default Color;