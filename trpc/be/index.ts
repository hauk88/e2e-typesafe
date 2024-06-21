import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import cors from "cors";
import { publicProcedure, router } from "./trpc";
const appRouter = router({
  greeting: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async (opts) => {
      const { input } = opts;
      return { greeting: `Hello ${input.name}` };
    }),
});
export type AppRouter = typeof appRouter;
const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
});
server.listen(3000);
