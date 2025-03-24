import debug from "debug";

export const applicationDebug = debug(`${process.env.DEBUG}`);
