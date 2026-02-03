export function notFound(req, res, next) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  console.error(err);

  const status = err.statusCode || 500;
  const message = status >= 500 ? "Internal server error" : (err.message || "Error");

  res.status(status).json({ message });
}
