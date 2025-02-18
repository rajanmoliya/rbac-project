const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = req.user.id;

    const project = await Project.create({
      title,
      description,
      user,
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
    const { title, description } = req.body;
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        msg: "Project not found",
      });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description },
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
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
