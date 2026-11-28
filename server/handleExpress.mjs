// Adapter between Express and plain controllers.
// A controller receives a small request object and returns
// { headers, statusCode, body }. It never touches `res`, so it is easy to test
// and does not depend on Express.
export default function handleExpress(controller) {
  return async (req, res) => {
    const { body, query, params, ip, method, path, cookies, user } = req;
    try {
      const response = await controller({
        body,
        query,
        params,
        ip,
        method,
        path,
        cookies,
        user,
      });
      res.set(response.headers || {});
      res.status(response.statusCode).json(response.body);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong" });
    }
  };
}
