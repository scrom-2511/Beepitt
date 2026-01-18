import { Router } from 'express';
import { checkLoggedIn } from '../controllers/checkLoggedIn';
import { otpValidateController } from '../controllers/otpValidator.controller';
import { signinController } from '../controllers/Signin.Controller';
import { signupController } from '../controllers/Signup.Controller';
import { updateProfileController } from '../controllers/updateProfileController';
import { updateTimeZoneAndPreferencesController } from '../controllers/updateTimeZoneAndPreferences.controller';
import { isLoggedIn } from '../middlewares/isLoggedIn';

export const userRouter = Router();

userRouter.get('/isLoggedIn', isLoggedIn, checkLoggedIn);
userRouter.post('/signup', signupController);
userRouter.post('/signin', signinController);
// userRouter.post("/validateOtp", (req, res) => {
//   validateOtpController(req, res);
// });
userRouter.post('/profileDetailsUpdate', isLoggedIn, updateProfileController);
userRouter.post(
  '/updateTimeZoneAndPreferences',
  isLoggedIn,
  updateTimeZoneAndPreferencesController,
);
userRouter.post('/otpValidator', isLoggedIn, otpValidateController);