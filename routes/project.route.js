const {
  createProject,
  updateProject,
  deleteProject,
  allProjects,
} = require("../controllers/project.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const checkRole = require("../middlewares/checkRole.middleware");

const router = require("express").Router();

router.post("/create", authMiddleware, checkRole("admin"), createProject);

router.put(
  "/update/:id",
  authMiddleware,
  checkRole(["manager", "admin"]),
  updateProject
);

router.delete("/delete/:id", authMiddleware, checkRole("admin"), deleteProject);

router.get(
  "/all",
  authMiddleware,
  checkRole(["admin", "manager", "viewer"]),
  allProjects
);

module.exports = router;
