const itemId = localStorage.getItem("itemId");
const itemDetails = document.getElementById("item");

const fetchItemDetails = async () => {
  const itemResponse = await fetch(
    `https://655cdb4e25b76d9884fe10bf.mockapi.io/SaleItems/${itemId}`
  );
  const item = await itemResponse.json();
  console.log(item);

  const itemDetailsWrapper = document.createElement("div");
  itemDetailsWrapper.setAttribute("class", "item-wrapper");

  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.setAttribute("class", "buttons-wrapper");

  const itemDetailsImage = document.createElement("img");
  itemDetailsImage.src = item.item_image;

  const itemDetailsTitle = document.createElement("h1");
  itemDetailsTitle.textContent = item.item_name;

  const itemDetailsLocation = document.createElement("h2");
  itemDetailsLocation.textContent = `Miestas: ${item.item_location}`;

  const itemDetailsDescription = document.createElement("p");
  itemDetailsDescription.textContent = item.item_description;

  const itemDetailsCost = document.createElement("h3");
  itemDetailsCost.textContent = `Kaina: ${Number(item.item_cost).toFixed(2)} €`;

  const backToBtn = document.createElement("button");
  backToBtn.setAttribute("class", "backTo-btn-wrapper");
  backToBtn.textContent = "Grįžti";

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "delete-btn-wrapper");
  deleteBtn.textContent = " Pašalinti skelbimą!";

  const deletionNotice = document.createElement("div");
  deletionNotice.setAttribute("class", "message-wrapper");

  itemDetails.append(itemDetailsWrapper, buttonsWrapper, deletionNotice);

  buttonsWrapper.append(backToBtn, deleteBtn);

  itemDetailsWrapper.append(
    itemDetailsImage,
    itemDetailsTitle,
    itemDetailsLocation,
    itemDetailsDescription,
    itemDetailsCost
  );

  backToBtn.addEventListener("click", () => {
    window.location.replace("./index.html");
  });

  deleteBtn.addEventListener("click", async () => {
    try {
      const itemResponse = await fetch(
        `https://655cdb4e25b76d9884fe10bf.mockapi.io/SaleItems/${itemId}`,
        { method: "DELETE" }
      );
      const item = await itemResponse.json();

      if (itemResponse) {
        deletionNotice.textContent = "Skelbimas pašalintas!!";
        deletionNotice.style.color = "green";
        setTimeout(() => {
          window.location.replace("./index.html");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      deletionNotice.textContent = "Sistemos klaida!!!";
      deletionNotice.style.color = "red";
    }
  });
};

fetchItemDetails();
