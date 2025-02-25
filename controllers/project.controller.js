const { asyncHandler } = require("../middlewares/errorHandler");
const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    // const user = req.user.id;

    const project = await Project.create({
      title,
      description,
      user: req.user.id,
    });

    await project.save();

    res.status(201).json({
      msg: "Project created successfully",
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        msg: "Project not found",
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );

    await updatedProject.save();

    res.status(200).json({
      msg: "Project updated successfully",
      data: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        msg: "Project not found",
      });
    }

    res.status(200).json({
      msg: "Project deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.allProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    if (!projects) {
      return res.status(404).json({
        msg: "No projects found",
      });
    }

    res.status(200).json({
      msg: "All projects",
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

exports.paginateProjects = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  results.next = endIndex < (await Project.countDocuments().exec());
  results.previous = startIndex > 0;

  results.results = await Project.find().limit(limit).skip(startIndex).exec();

  res.status(200).json({
    msg: "Paginated projects",
    limit,
    page,
    data: results,
  });
});
