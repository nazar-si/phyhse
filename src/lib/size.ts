import type { sizeType } from "./types"
const Size = (size: sizeType) => typeof size == "number"
    ? `${size / 4}rem`
    : size
        ? size
        : ""

export default Size;