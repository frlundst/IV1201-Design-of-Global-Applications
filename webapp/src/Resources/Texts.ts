export interface TextObject {
    code: string;
    [key: string]: string;
}

export const Texts = [
    {
        code: "View.Login.Title",
        en: "Login",
        sv: "Logga in"
    },
    {
        code: "View.Login.Email",
        en: "Email Adress",
        sv: "E-post"
    },
    {
        code: "View.Login.Password",
        en: "Password",
        sv: "Lösenord"
    },
    {
        code: "View.Login.RememberMe",
        en: "Remember me",
        sv: "Kom ihåg mig"
    },
    {
        code: "View.Login.SignIn",
        en: "Sign In",
        sv: "Logga In"
    },
    {
        code: "View.Login.ForgotPassword",
        en: "Forgot Password?",
        sv: "Glömt Lösenord?"
    },
    {
        code: "View.Login.DontHaveAnAccount",
        en: "Don't have an account? Sign Up",
        sv: "Har du inget konto? Skapa ett"
    },
] as TextObject[];