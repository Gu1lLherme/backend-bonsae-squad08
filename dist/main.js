"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
require("./processo-importacao/schemas/processo-importacao.schema");
async function bootstrap() {
    console.log(' Bootstrap iniciado');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    console.log(' AppModule carregado');
    await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
//# sourceMappingURL=main.js.map