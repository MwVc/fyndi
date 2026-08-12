import passport from "passport";

export default passport.authenticate("google", {
  scope: ["email", "profile"],
  session: false,
  prompt: "select_account consent", // force google to show account selection & permission screen
});
