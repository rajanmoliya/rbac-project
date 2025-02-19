const {
  createProject,
  updateProject,
  deleteProject,
  allProjects,
  paginateProjects,
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

router.get(
  "/paginate",
  authMiddleware,
  checkRole(["admin", "manager", "viewer"]),
  paginateProjects
);
// http://localhost:3000/api/projects/paginate?page=1&limit=3

module.exports = router;
