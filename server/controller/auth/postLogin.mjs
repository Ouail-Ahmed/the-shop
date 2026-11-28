import loginUser, {
  InvalidCredentialsError,
} from "../../service/auth/loginUser.mjs";

export default async function postLogin(httpRequest) {
  try {
    const { user, accessToken } = await loginUser(httpRequest.body);
    return { headers: {}, statusCode: 200, body: { user, accessToken } };
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return { headers: {}, statusCode: 401, body: { error: err.message } };
    }
    throw err;
  }
}
