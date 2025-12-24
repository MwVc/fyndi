fetch("/api/some-protected-route", {
  method: "POST",
  headers: {
    "X-CSRF-Token": getCookie("csrf_token"),
  },
  credentials: "include",
});
