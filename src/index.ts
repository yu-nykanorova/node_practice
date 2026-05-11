import express, { NextFunction, Request, Response } from "express";

import { ApiError } from "./errors/api-error";
import { userRouter } from "./routers/user.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);

// app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const users = await read();
//     res.send(users);
//   } catch (e) {
//     next(e);
//   }
// });
//
// app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { name, email, password } = req.body;
//
//     if (!name || name.length < 3) {
//       throw new ApiError(
//         "Name is required and should be at least 3 characters long",
//         400,
//       );
//     }
//     if (!email || !email.includes("@")) {
//       throw new ApiError("Email is required and should be valid", 400);
//     }
//     if (!password || password.length < 6) {
//       throw new ApiError(
//         "Password is required and should be at least 6 characters long",
//         400,
//       );
//     }
//
//     const users = await read();
//
//     if (users.find((user) => user.email === email)) {
//       throw new ApiError("This email is already in use", 409);
//     }
//
//     const id = users.length ? users[users.length - 1].id + 1 : 1;
//     const newUser = { id, name, email, password };
//     users.push(newUser);
//
//     await write(users);
//
//     res.status(201).send(newUser);
//   } catch (e) {
//     next(e);
//   }
// });
//
// app.get(
//   "/users/:userId",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = Number(req.params.userId);
//
//       if (Number.isNaN(userId)) {
//         throw new ApiError("User must be an integer", 400);
//       }
//
//       const users = await read();
//
//       const user = users.find((user) => user.id === userId);
//       if (!user) {
//         throw new ApiError("User not found", 404);
//       }
//       res.send(user);
//     } catch (e) {
//       next(e);
//     }
//   },
// );
//
// app.put(
//   "/users/:userId",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = Number(req.params.userId);
//
//       if (Number.isNaN(userId)) {
//         throw new ApiError("User must be an integer", 400);
//       }
//
//       const users = await read();
//
//       const userIndex = users.findIndex((user) => user.id === userId);
//       if (userIndex === -1) {
//         throw new ApiError("User not found", 404);
//       }
//       const { name, email, password } = req.body;
//
//       if (!name || name.length < 3) {
//         throw new ApiError(
//           "Name is required and should be at least 3 characters long",
//           400,
//         );
//       }
//       if (!email || !email.includes("@")) {
//         throw new ApiError("Email is required and should be valid", 400);
//       }
//       if (!password || password.length < 6) {
//         throw new ApiError(
//           "Password is required and should be at least 6 characters long",
//           400,
//         );
//       }
//
//       users[userIndex].name = name;
//       users[userIndex].email = email;
//       users[userIndex].password = password;
//
//       await write(users);
//
//       res.status(201).send(users[userIndex]);
//     } catch (e) {
//       next(e);
//     }
//   },
// );
//
// app.delete(
//   "/users/:userId",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const userId = Number(req.params.userId);
//
//       if (Number.isNaN(userId)) {
//         throw new ApiError("User must be an integer", 400);
//       }
//
//       const users = await read();
//
//       const userIndex = users.findIndex((user) => user.id === userId);
//       if (userIndex === -1) {
//         throw new ApiError("No such user", 404);
//       }
//       users.splice(userIndex, 1);
//
//       await write(users);
//
//       res.sendStatus(204);
//     } catch (e) {
//       next(e);
//     }
//   },
// );

app.use((error: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).send(error.message);
});

// потрапляють необроблені помилки, наприклад в асинхронному коді
process.on("uncaughtException", (error) => {
  console.error("uncaughtException", error.message, error.stack);
  process.exit(1);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
