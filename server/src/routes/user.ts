import { Router } from "express";
import { v4 as uuid } from "uuid";
import { Op } from "sequelize/types";
import User from "../schemas/user";

const router = Router();

// 유저 목록
router.get("/", async (req, res) => {
  try {
    const result = await User.findAndCountAll({
      where: {
        id: {
          [Op.ne]: req.session.userId,
        },
      },
    });
  } catch (e) {}
});

// 세션 조회

router.get("/me", async (req, res) => {
  try {
    res.json({
      username: req.session.username,
      userId: req.session.userId,
      isLogged: req.session.isLogged,
    });
  } catch (e) {}
});

// 로그인

router.post("/login", async (req, res) => {
  try {
    const userId = uuid();
    const username = req.body.usernmae;

    const user = await User.create({
      id: userId,
      username,
    });

    req.session.username = username;
    req.session.userId = userId;
    req.session.isLogged = true;

    req.session.save(() => {
      res.json({
        statusText: "OK",
        data: user,
      });
    });
  } catch (e) {}
});

// 로그아웃

router.post("/logout", async (req, res) => {
  try {
    delete req.session.user;

    req.session.save(() => {
      res.redirect("/");
    });
  } catch (e) {}
});

export default router;
