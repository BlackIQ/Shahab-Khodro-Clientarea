const forms = {
  login: {
    phone: {
      type: "text",
      label: "شماره همراه",
      placeholder: "شماره همراه خود را وارد کنید",
      secure: false,
    },
    password: {
      type: "text",
      label: "رمز",
      placeholder: "رمز خود را وارد کنید",
      secure: true,
    },
  },
  register: {
    name: {
      type: "text",
      label: "نام و نام خانوادگی",
      placeholder: "نام و نام خانوادگی خود را وارد کنید",
      secure: false,
    },
    phone: {
      type: "text",
      label: "شماره همراه",
      placeholder: "شماره همراه خود را وارد کنید",
      secure: false,
    },
    email: {
      type: "text",
      label: "ایمیل",
      placeholder: "ایمیل خود را وارد کنید",
      secure: false,
    },
    password: {
      type: "text",
      label: "رمز",
      placeholder: "رمز خود را وارد کنید",
      secure: true,
    },
  },
};

export default forms;
