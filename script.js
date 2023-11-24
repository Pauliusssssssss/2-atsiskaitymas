const allCards = document.getElementById("cardsWrapper");

const fetchItems = async () => {
  const itemsResponse = await fetch(
    "https://655cdb4e25b76d9884fe10bf.mockapi.io/SaleItems"
  );
  const items = await itemsResponse.json();
  console.log(items);

  items.sort((a, b) => (a.item_cost > b.item_cost ? 1 : -1));

  items.forEach((item) => {
    const itemCard = document.createElement("div");
    itemCard.setAttribute("class", "card-wrapper");
    allCards.append(itemCard);

    itemCard.addEventListener("click", () => {
      localStorage.setItem("itemId", item.id);
      window.location.replace("./details-ad.html");
    });

    const imageWrapper = document.createElement("div");
    imageWrapper.setAttribute("class", "image-wrapper");

    const information = document.createElement("div");
    information.setAttribute("class", "information-wrapper");

    const itemImage = document.createElement("img");
    itemImage.src = item.item_image;

    const itemTitle = document.createElement("h3");
    itemTitle.textContent = item.item_name;

    const itemDescription = document.createElement("p");
    itemDescription.textContent = item.item_description;

    const itemLocation = document.createElement("h4");
    itemLocation.textContent = item.item_location;

    itemCard.append(imageWrapper, information);

    imageWrapper.append(itemImage);

    information.append(itemTitle, itemDescription, itemLocation);
  });
};

fetchItems();
