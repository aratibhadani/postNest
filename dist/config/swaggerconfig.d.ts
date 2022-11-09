declare const swaggerTags: {
    user: string;
    root: string;
    auth: string;
    post: string;
    artical: string;
};
declare const swaggerConfig: Omit<import("@nestjs/swagger").OpenAPIObject, "paths">;
export { swaggerConfig, swaggerTags };
