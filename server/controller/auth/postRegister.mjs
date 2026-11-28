import registerUser, {
  DuplicateEmailError,
} from "../../service/auth/registerUser.mjs";
import { ValidationError } from "../../model/product.mjs";

export default async function postRegister(httpRequest) {
  try {
    const { user, accessToken } = await registerUser(httpRequest.body);
    return { headers: {}, statusCode: 201, body: { user, accessToken } };
  } catch (err) {
    if (err instanceof ValidationError) {
      return { headers: {}, statusCode: 400, body: { error: err.message } };
    }
    if (err instanceof DuplicateEmailError) {
      return { headers: {}, statusCode: 409, body: { error: err.message } };
    }
    throw err;
  }
}
