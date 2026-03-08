import { Hono } from "hono";
import { cors } from "hono/cors";
import type { ApiResponse } from "shared";

export const app = new Hono()

.use(cors())

.get("/", (c) => {
	return c.text("Hello Hono!");
})

.get("/hello", async (c) => {
	const data: ApiResponse = {
		message: "Hello BHVR!",
		success: true,
	};

	return c.json(data, { status: 200 });
});

export default {
  port: process.env.PORT || 3000,
  fetch: app.fetch,
};