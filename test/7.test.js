const test = require("node:test");
const assert = require("node:assert");
const { loader } = require("./helpers.js");

test("Disable default form behaviour", async () => {
  const { $ } = await loader;
  const form = $("form");

  assert.ok(
    form.hasAttribute("novalidate"),
    `<form> should have the \`novalidate\` attribute set, but got:
  
  ${form.outerHTML.replace(form.innerHTML, "...")}
`
  );

  $("#name").setCustomValidity("test error");

  await new Promise((resolve, reject) => {
    form.addEventListener("submit", (event) => {
      const prevented = event.defaultPrevented;
      if (!prevented) {
        event.preventDefault();
        reject(
          `<form> should prevent default submission if any fields are invalid`
        );
      }
      resolve();
    });

    $("button").click();
  });
});
