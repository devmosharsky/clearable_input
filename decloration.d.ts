declare const process : {
    env: {
        NODE_ENV: string
    }
}

declare module '*.scss' {
    const content: {[className: string]: string};
    export default content;
}

declare const module: {
    hot?: {
        accept(): void;
    }
}