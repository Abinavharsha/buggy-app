export default function errorMiddleware(err, req, res, next) {
  console.error("[error]", err);

  res.status(500).json({
    error: "Internal Server Error"
  });
}
