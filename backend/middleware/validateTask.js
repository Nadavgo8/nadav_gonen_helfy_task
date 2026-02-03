// backend/middleware/validateTask.js

const PRIORITIES = new Set(["low", "medium", "high"]);
const MSG = {
  VALIDATION: "Validation error",
  TITLE: "title must be at least 2 characters",
  DESCRIPTION: "description must be at least 2 characters",
  PRIORITY: "priority must be one of: low, medium, high",
  COMPLETED: "completed must be a boolean",
  EMPTY_BODY: "request body is required",
};
const ASSUMPTIONS = {
  titleMinLen: 2,
  descriptionMinLen: 2};
export function validateCreateTask(req, res, next) {
  const { title, description, priority } = req.body || {};
  const errors = [];

  if (typeof title !== "string" || title.trim().length < ASSUMPTIONS.titleMinLen) {
    errors.push("title must be at least 2 characters");
  }
  if (typeof description !== "string" || description.trim().length < ASSUMPTIONS.descriptionMinLen) {
    errors.push("description must be at least 2 characters");
  }
  if (!PRIORITIES.has(priority)) {
    errors.push("priority must be one of: low, medium, high");
  }

  if (errors.length) {
    return res.status(400).json({ message: "Validation error", errors });
  }

  next();
}

export function validateUpdateTask(req, res, next) {
  const { title, description, priority, completed } = req.body || {};
  const errors = [];

  if (title !== undefined && (typeof title !== "string" || title.trim().length < ASSUMPTIONS.titleMinLen)) {
    errors.push("title must be at least 2 characters");
  }
  if (description !== undefined && (typeof description !== "string" || description.trim().length < ASSUMPTIONS.descriptionMinLen)) {
    errors.push("description must be at least 2 characters");
  }
  if (priority !== undefined && !PRIORITIES.has(priority)) {
    errors.push("priority must be one of: low, medium, high");
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    errors.push("completed must be a boolean");
  }

  if (errors.length) {
    return res.status(400).json({ message: "Validation error", errors });
  }

  next();
}
