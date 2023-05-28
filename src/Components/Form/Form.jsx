import { useEffect, useState, useRef } from "react";
import "./Form.css";
const Form = () => {
  let passMatch = useRef();

  const [form, setForm] = useState({
    Email: "",
    userName: "",
    Password: "",
    LastName: "",
  });
  const [passConf, setPassConf] = useState("");
  const [isMatch, setIsMatch] = useState(null);
  passMatch.current = form.Password.length;
  const PasswordRegex =
    /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])(?=.*[@#$%*?!&])[A-Za-z\d@$!%*?&]{10,28}$/;
  useEffect(() => {
    if (form.Password.length) {
      setIsMatch(PasswordRegex.test(form.Password));
    }
  }, [form.Password]);
  return (
    <form>
      <fieldset>
        <legend>Sign Up</legend>
        <p>
          <label htmlFor="username">User Name</label>
          <input
            id="username"
            autoComplete="false"
            onChange={(e) =>
              setForm((prevEle) => ({ ...prevEle, userName: e.target.value }))
            }
            placeholder="User Name"
            value={form.userName}
          />
        </p>
        <p>
          <label htmlFor="lastname">Last Name</label>
          <input
            id="lastname"
            autoComplete="false"
            onChange={(e) =>
              setForm((prevEle) => ({ ...prevEle, LastName: e.target.value }))
            }
            placeholder="Last Name"
            value={form.LastName}
          />
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <input
            autoComplete="false"
            onChange={(e) =>
              setForm((prevEle) => ({ ...prevEle, Email: e.target.value }))
            }
            id="email"
            type="email"
            placeholder="Email"
            value={form.Email}
          />
        </p>
        <p className="PasswordDiv">
          <label htmlFor="password">Password {isMatch ? "✅" : null}</label>
          <input
            autoComplete="false"
            type="password"
            id="password"
            onChange={(e) =>
              setForm((prevEle) => ({ ...prevEle, Password: e.target.value }))
            }
            className={
              !isMatch & (passMatch.current > 0)
                ? "notValid"
                : isMatch && "valid"
            }
            placeholder="Password"
            value={form.Password}
          />
          {!isMatch & (passMatch.current > 0) ? (
            <div className="alert">
              <p>
                {" "}
                at least 8 chars inlcudes one of @$!%*?& uppercase letter
                lowercase letter number{" "}
              </p>
            </div>
          ) : null}
        </p>
        <p>
          <label htmlFor="passConf">
            Password Confirmation{" "}
            {(passConf === form.Password) & (passConf?.length > 0)
              ? "✅"
              : null}
          </label>
          <input
            autoComplete="false"
            type="password"
            id="passConf"
            className={
              (passConf === form.Password) & (passConf?.length > 0)
                ? "valid"
                : passConf?.length > 0
                ? "notValid"
                : null
            }
            onChange={(e) => setPassConf(e.target.value)}
            placeholder="Password Confirmation"
            value={passConf}
          />
        </p>
        <div className="buttonDiv">
          <button
            type="submit"
            disabled={
              !(
                passConf == form.Password &&
                passConf > 0 &&
                form.Password > 0 &&
                isMatch
              )
            }
          >
            Submit
          </button>
        </div>
      </fieldset>
    </form>
  );
};
export default Form;
