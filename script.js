import { loadItems } from "./displayItems.js";

fetch("restuarants-list.json")
  .then((response) => response.json())
  .then((restaurants) => {
    const restaurantList = document.getElementById("restaurant-list");
    if (restaurantList) {
      restaurantList.innerHTML = "";

      restaurants.restaurants.forEach((restaurant) => {
        const restaurantDiv = document.createElement("div");
        restaurantDiv.classList.add("place");
        restaurantDiv.dataset.id = restaurant.id;

        const statusHTML =
          restaurant.restaurantStatus != undefined &&
          restaurant.restaurantStatus.length != 0
            ? `<div class="status restaurant-status">
                           <div class="status-title">${restaurant.restaurantStatus}</div>
                       </div>`
            : "";

        restaurantDiv.innerHTML = `
        <a class="place-link">
            <div class="list-item">
                <div class="item-content">
                    <div class="top-img">
                        <img src="${
                          restaurant.imgURL
                        }" alt="restuarant data" style="max-width: 600px; height: 175px; margin: 0px; width: 300px;">
                    </div>
                    
                    ${statusHTML}

                    <div class="place-name-div">
                        <div class="name">${restaurant.name}</div>
                        <div class="food-items" title="${restaurant.cuisines.join(
                          ", "
                        )}">
                        ${restaurant.cuisines.join(", ")}
                        </div>
                    </div>
                    <div class="info-div">
                        <div class="rating">
                            <span class="icon-star"><i class="fa-solid fa-star"></i></span>
                            <span>${restaurant.rating}</span>
                        </div>
                        <div>•</div>
                        <div>${restaurant.deliveryTime}</div>
                        <div>•</div>
                        <div class="price">${restaurant.CostForTwo}</div>
                    </div>
                    <div class="offer-div">
                        <span class="icon-offer-filled"><i class="fa-solid fa-tag"></i></span>
                        <span class="offer-text">${restaurant.offerTag}</span>
                    </div>
                </div>
                <div class="quick-view">
                    <span role="button" aria-label="Open" class="view-btn">QUICK VIEW</span>
                </div>
            </div>
        </a>
    `;

        restaurantList.appendChild(restaurantDiv);

        restaurantDiv.addEventListener("click", () => {
          const restaurantName = restaurant.name;
          const restaurantLocation = restaurant.location;
          const restaurantId = restaurant.id;
          const url = new URL(window.location);
          url.searchParams.set("name", restaurantName);
          url.searchParams.set("location", restaurantLocation);
          window.history.pushState({ page: "details" }, "", url);
          loadItems(restaurant.items, restaurantName);
        });
      });
    }
  });
