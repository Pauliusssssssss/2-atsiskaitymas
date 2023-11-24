const item_image = document.getElementById("item_image");
const item_name = document.getElementById("item_name");
const item_location = document.getElementById("item_location");
const item_description = document.getElementById("item_description");
const item_cost = document.getElementById("item_cost");
const backToBtn = document.getElementById("backToButton");
const submitBtn = document.getElementById("submitButton");
const submitMessage = document.getElementById("messageAfterSubmit");
const minLength = 3;

const addNewItem = async () => {
  if (
    !item_image.value ||
    !item_name.value ||
    !item_location.value ||
    !item_description.value ||
    !item_cost.value
  ) {
    submitMessage.textContent =
      "Skelbimas nesukurtas! Patikrinkite ar visos vietos užpildytos!";
    submitMessage.style.color = "red";
    item_image.style.border = "2px solid red";
    item_name.style.border = "2px solid red";
    item_location.style.border = "2px solid red";
    item_description.style.border = "2px solid red";
    item_cost.style.border = "2px solid red";
  } else if (item_name.value.length <= minLength) {
    submitMessage.textContent =
      "Skelbimas nesukurtas! Prekės pavadinimas per trumpas!";
    submitMessage.style.color = "red";
    item_name.style.border = "2px solid red";
  } else {
    const newItem = {
      item_image: item_image.value,
      item_name: item_name.value,
      item_location: item_location.value,
      item_description: item_description.value,
      item_cost: item_cost.value,
    };

    const itemResponse = await fetch(
      "https://655cdb4e25b76d9884fe10bf.mockapi.io/SaleItems",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      }
    );
    if (itemResponse) {
      submitMessage.textContent = "Skelbimas sėkmingai sukurtas!";
      submitMessage.style.color = "green";

      setTimeout(() => {
        window.location.replace("./index.html");
      }, 3000);
    }
  }
};
backToBtn.addEventListener("click", () => {
  window.location.replace("./index.html");
});
submitBtn.addEventListener("click", addNewItem);
