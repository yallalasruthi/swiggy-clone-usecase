import { loadPartial } from "./fetch.js";

export function loadItems(items, restaurantName) {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");
  const location = urlParams.get("location");

  loadPartial("views/items-list.html").then(() => {
    const itemList = document.getElementById("info-div");
    const restaurantNameElement = document.getElementById("restaurant-name");

    if (itemList && restaurantNameElement) {
      restaurantNameElement.textContent = name;
      itemList.innerHTML = ""; 

      const groupedItems = groupItemsByCategory(items);

      Object.keys(groupedItems).forEach((category) => {
        const categoryDiv = document.createElement("div");
        categoryDiv.classList.add("category");

        const categoryTitle = document.createElement("h3");
        categoryTitle.classList.add("category-title");
        categoryTitle.textContent = category;
        categoryDiv.appendChild(categoryTitle);

        const categoryItems = document.createElement("ul");
        categoryItems.classList.add("category-items");

        groupedItems[category].forEach((item) => {
          const itemLi = document.createElement("li");
          const contentSpan = document.createElement("span");
          const itemInfoDiv = document.createElement("div");
          const categoryHeader = document.createElement("h2");
          categoryHeader.innerHTML = item.name;
          itemInfoDiv.appendChild(categoryHeader);

          const spanEle = document.createElement("span");
          spanEle.innerHTML = `${item.price} - Price: ${item.offerTag}`;
          itemInfoDiv.appendChild(spanEle);

          const discriptionEle = document.createElement("div");
          discriptionEle.innerHTML = item.description;
          itemInfoDiv.appendChild(discriptionEle);

          const imageEle = document.createElement("img");
          imageEle.src = item.itemImage;
          contentSpan.appendChild(imageEle);
          contentSpan.appendChild(itemInfoDiv);

          itemLi.appendChild(contentSpan);

          const addToCartButton = document.createElement("button");
          addToCartButton.textContent = "Add";
          addToCartButton.addEventListener("click", () => {
            addToCart(item); 
          });
          itemLi.appendChild(addToCartButton);

          categoryItems.appendChild(itemLi);
        });

        categoryDiv.appendChild(categoryItems);
        itemList.appendChild(categoryDiv);

        categoryTitle.addEventListener("click", () => {
          categoryItems.classList.toggle("collapsed");
        });

        categoryItems.classList.add("collapsed");
      });
    }
  });
}

function groupItemsByCategory(items) {
  const groupedItems = {};

  items.forEach((item) => {
    if (!groupedItems[item.category]) {
      groupedItems[item.category] = [];
    }
    groupedItems[item.category].push(item);
  });

  return groupedItems;
}
