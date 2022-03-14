import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import summary from "rollup-plugin-summary";

/** @type {import("rollup-plugin-terser").Options} */
const terserOptions = {
    warnings: true,
    ecma: 2020,
    compress: {
        unsafe: true,
        passes: 2,
    },
    output: {
        comments: false,
        inline_script: false,
    },
    keep_classnames: true,
    module: true,
};

/** @type {import("rollup").RollupOptions[]} */
const config = [
    {
        input: [
            "fallback-dom.ts",
            "query-selector.ts",
            "xml-serializer.ts",
        ],
        output: {
            dir: "./",
            sourcemap: true,
            format: "esm",
        },
        plugins: [
            typescript(),
            summary(),
            terser(terserOptions),
        ]
    },
    {
        input: "fallback-dom.ts",
        output: {
            dir: "./umd",
            sourcemap: true,
            format: "umd",
            name: "fallbackDom",
        },
        plugins: [
            typescript({ declaration: true, declarationDir: "./umd" }),
            terser(terserOptions),
        ]
    },
    {
        input: "query-selector.ts",
        output: {
            dir: "./umd",
            sourcemap: true,
            format: "umd",
            name: "querySelector",
        },
        plugins: [
            typescript({ declaration: true, declarationDir: "./umd" }),
            terser(terserOptions),
        ]
    },
    {
        input: "xml-serializer.ts",
        output: {
            dir: "./umd",
            sourcemap: true,
            format: "umd",
            name: "xmlSerializer",
        },
        plugins: [
            typescript({ declaration: true, declarationDir: "./umd" }),
            terser(terserOptions),
        ]
    },
];

export default config;
