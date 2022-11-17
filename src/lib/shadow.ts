import type { shadowType } from "./types";

const Shadow = (size: shadowType, offset: number = 1) => {
    return size == "xs" ?
        `0 ${offset}px ${offset * 2}px 0 rgb(0 0 0 / 0.05)` : size == `sm` ?
            `0 ${offset}px ${offset * 3}px 0 rgb(0 0 0 / 0.1), 0 ${offset}px ${offset * 2}px -${offset}px rgb(0 0 0 / 0.1)` : size == `md` ?
                `0 ${offset * 4}px ${offset * 6}px -${offset}px rgb(0 0 0 / 0.07), 0 ${offset * 2}px ${offset * 4}px -${offset * 2}px rgb(0 0 0 / 0.07)` : size == `lg` ?
                    `0 ${offset * 10}px ${offset * 15}px -${offset * 3}px rgb(0 0 0 / 0.1), 0 ${offset * 4}px ${offset * 6}px -${offset * 4}px rgb(0 0 0 / 0.1)` : size == `xl` ? `0 ${offset * 20}px ${offset * 25}px -${offset * 5}px rgb(0 0 0 / 0.1), 0 ${offset * 8}px ${offset * 10}px -${offset * 6}px rgb(0 0 0 / 0.1)` : `none`
}

export default Shadow;