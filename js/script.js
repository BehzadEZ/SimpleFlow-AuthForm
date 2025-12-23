document.addEventListener("DOMContentLoaded", () => {
  const inputGroups = document.querySelectorAll(".input-group");
  const validateStatus = document.querySelectorAll(".text-validate p");
  const btnSub = document.querySelector(".submit-btn");
  const textSus = document.querySelector(".Successfully-text");
  const textUnSus = document.querySelector(".Unsuccessfully-text");
  const form = document.querySelector(".auth-form")
  const formState = {
    username: false,
    fullname: false,
    email: false,
    password: false,
  };
  btnSub.addEventListener("click", (e) => {
    e.preventDefault();

    if (
      formState.username &&
      formState.fullname &&
      formState.email &&
      formState.password
    ) {
      const data = {
        username: document.querySelector(".username-input").value.trim(),
        fullname: document.querySelector(".fullname-input").value.trim(),
        email: document.querySelector(".email-input").value.trim(),
        password: document.querySelector(".password-input").value.trim(),
      };
      const passLength = data.password.length;

      data.password = "*".repeat(passLength);

      console.log("✅ User Data:", data);
      textUnSus.style.display = "none";
      textSus.style.display = "inline";
      form.reset();
    } else {
      console.log("❌ فرم هنوز کامل و معتبر نیست");
      textSus.style.display = "none";
      textUnSus.style.display = "inline";
    }
  });

  inputGroups.forEach((group) => {
    const input = group.querySelector("input");
    const errors = group.querySelectorAll(".error-text-validation");

    input.addEventListener("input", () => {
      const value = input.value.trim();

      // reset
      input.style.borderColor = "rgba(70,95,241,.4)";
      errors.forEach((e) => (e.style.display = "none"));

      /* ================= USERNAME ================= */
      if (input.classList.contains("username-input")) {
        formState.username = false;

        if (value === "") {
          errors[0].style.display = "inline";
          input.style.borderColor = "red";
          return;
        }
        if (value.length < 3 || value.length > 15) {
          errors[1].style.display = "inline";
          input.style.borderColor = "red";
          return;
        }
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
          errors[2].style.display = "inline";
          input.style.borderColor = "red";
          return;
        }

        formState.username = true;
      }

      /* ================= FULLNAME ================= */
      if (input.classList.contains("fullname-input")) {
        formState.fullname = false;

        if (value === "") {
          errors[0].style.display = "inline";
          input.style.borderColor = "red";
          return;
        }
        if (value.length < 3) {
          errors[1].style.display = "inline";
          input.style.borderColor = "red";
          return;
        }
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          errors[2].style.display = "inline";
          input.style.borderColor = "red";
          return;
        }

        formState.fullname = true;
      }

      /* ================= EMAIL ================= */
      if (input.classList.contains("email-input")) {
        formState.email = false;

        if (value === "") {
          errors[0].style.display = "inline";
          input.style.borderColor = "red";
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors[1].style.display = "inline";
          input.style.borderColor = "red";
          return;
        }

        formState.email = true;
      }

      /* ================= PASSWORD ================= */
      if (input.classList.contains("password-input")) {
        formState.password = false;
        let hasError = false;
        const hasNumberOrSymbol = /[\d\W]/.test(value);

        validateStatus.forEach((item) => {
          item.classList.remove("green", "red");
          item.style.color = "#000000ff";
        });

        // Required
        if (value === "") {
          errors[0].style.display = "inline";
          hasError = true;
        }

        // Weak / length
        if (value.length >= 8) {
          validateStatus[0].classList.add("green");
        } else {
          validateStatus[0].classList.add("red");
          errors[1].style.display = "inline";
          hasError = true;
        }

        // At least 8 chars
        if (value.length >= 8) {
          validateStatus[1].classList.add("green");
        } else {
          validateStatus[1].classList.add("red");
          hasError = true;
        }

        // Number or symbol
        if (hasNumberOrSymbol) {
          validateStatus[2].classList.add("green");
          validateStatus[3].classList.add("green");
        } else {
          validateStatus[2].classList.add("red");
          validateStatus[3].classList.add("red");
          errors[2].style.display = "inline";
          hasError = true;
        }

        if (hasError) {
          input.style.borderColor = "red";
        } else {
          formState.password = true;
        }
      }
    });
  });
});
