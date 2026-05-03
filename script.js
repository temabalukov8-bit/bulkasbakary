// товары
const товары = [
    { id: 1, название: "Наполеон", цена: 1450, картинка: "https://img.freepik.com/premium-photo/delicious-homemade-napoleon-cake_185193-24135.jpg" },
    { id: 2, название: "Медовик", цена: 1250, картинка: "https://ir.ozone.ru/s3/multimedia-1-e/7524940262.jpg" },
    { id: 3, название: "Красный бархат", цена: 1600, картинка: "https://avatars.mds.yandex.net/get-mpic/15034155/2a00000198db7897943d1eb9caa85b359003/orig" },
    { id: 4, название: "Чизкейк", цена: 1380, картинка: "https://img.freepik.com/free-photo/strawberry-cheesecake-isolated-white-background_123827-29176.jpg" },
    { id: 5, название: "Прага", цена: 1550, картинка: "https://gudermes.loveflowers24.ru/wp-content/uploads/2023/12/tort-praga.jpg" },
    { id: 6, название: "Капкейк Ванильный", цена: 210, картинка: "https://i.pinimg.com/736x/30/f7/1e/30f71e858b43e05c7e2a05096780a7d2.jpg" },
    { id: 7, название: "Капкейк Шоколадный", цена: 230, картинка: "https://avatars.mds.yandex.net/i?id=8fa7fadf69a10f0b4a073a0d2839e4be_l-5221753-images-thumbs&n=13" },
    { id: 8, название: "Капкейк Карамельный", цена: 240, картинка: "https://avatars.mds.yandex.net/i?id=1120d5973ea4b537a31463ef29519941fc1cc86e-4859680-images-thumbs&n=13" },
    { id: 9, название: "Капкейк Фисташковый", цена: 260, картинка: "https://p.turbosquid.com/ts-thumb/8i/SlRY6k/UC/pistachio_cupcake_hd/jpg/1752693021/1920x1080/fit_q87/c19f61e5e738b8d758b39c9ff992da330734e773/pistachio_cupcake_hd.jpg" },
    { id: 10, название: "Печенье Шоколадное", цена: 320, картинка: "https://api.magonline.ru/thumbnail/740x740/00/334/334.png" },
    { id: 11, название: "Печенье Овсяное", цена: 280, картинка: "https://main-cdn.sbermegamarket.ru/big1/hlr-system/568/406/302/321/193/7/100050459482b0.jpg" },
    { id: 12, название: "Печенье Имбирное", цена: 290, картинка: "https://img.freepik.com/premium-vector/christmas-gingerbread-cookie-shape-heart-with-icing-isolated-white-background_81863-11272.jpg" },
    { id: 13, название: "Эклер", цена: 180, картинка: "https://avatars.mds.yandex.net/i?id=e43ebe928a619783540a00d1904e70fc561b367e-13280984-images-thumbs&n=13" },
    { id: 14, название: "Тирамису", цена: 350, картинка: "https://static.vecteezy.com/system/resources/previews/026/516/970/large_2x/delicious-tiramisu-isolated-on-white-background-free-photo.jpg" },
    { id: 15, название: "Корзиночка", цена: 160, картинка: "https://avatars.mds.yandex.net/i?id=470e2e94a003d37308b5d1288d97aad919da6ed2-5709707-images-thumbs&n=13" },
    { id: 16, название: "Макаронс", цена: 450, картинка: "https://i.pinimg.com/474x/b2/3f/83/b23f833c4690e5219b167b23c1034a6f.jpg" }
];

let корзина = [];

function показатьТовары() {
    let список = document.getElementById("productsList");
    let html = "";
    for (let i = 0; i < товары.length; i++) {
        let т = товары[i];
        html += `<div class="card">
            <div class="cardImage"><img src="${т.картинка}"></div>
            <h3>${т.название}</h3>
            <div class="price">${т.цена} руб.</div>
            <button class="addBtn" onclick="добавить(${т.id})">В корзину</button>
        </div>`;
    }
    список.innerHTML = html;
}

function добавить(id) {
    for (let i = 0; i < корзина.length; i++) {
        if (корзина[i].id === id) {
            корзина[i].кол++;
            обновить();
            return;
        }
    }
    for (let i = 0; i < товары.length; i++) {
        if (товары[i].id === id) {
            корзина.push({ id: id, название: товары[i].название, цена: товары[i].цена, кол: 1 });
            break;
        }
    }
    обновить();
}

function обновить() {
    let сумма = 0;
    for (let i = 0; i < корзина.length; i++) {
        сумма += корзина[i].кол;
    }
    document.getElementById("cartCount").innerText = сумма;
    
    let конт = document.getElementById("cartItems");
    if (!конт) return;
    
    if (корзина.length === 0) {
        конт.innerHTML = "<p style='text-align:center; padding:15px;'>Корзина пуста</p>";
        document.getElementById("totalAmount").innerText = "Итого: 0 руб.";
        return;
    }
    
    let html = "";
    let всего = 0;
    for (let i = 0; i < корзина.length; i++) {
        let т = корзина[i];
        let суммаТовара = т.цена * т.кол;
        всего += суммаТовара;
        html += `<div class="cartItem">
            <div><b>${т.название}</b><br>${т.цена} руб. x ${т.кол} = ${суммаТовара} руб.</div>
            <div>
                <button onclick="увеличить(${т.id})">+</button>
                <button onclick="уменьшить(${т.id})">-</button>
                <button onclick="удалить(${т.id})">X</button>
            </div>
        </div>`;
    }
    конт.innerHTML = html;
    document.getElementById("totalAmount").innerText = "Итого: " + всего + " руб.";
}

function увеличить(id) {
    for (let i = 0; i < корзина.length; i++) {
        if (корзина[i].id === id) {
            корзина[i].кол++;
            обновить();
            return;
        }
    }
}

function заказать() {
    if (корзина.length === 0) return;
    корзина = [];
    обновить();
    document.getElementById("modal").style.display = "none";
}

function удалить(id) {
    for (let i = 0; i < корзина.length; i++) {
        if (корзина[i].id === id) {
            корзина.splice(i, 1);
            обновить();
            return;
        }
    }
}

function уменьшить(id) {
    for (let i = 0; i < корзина.length; i++) {
        if (корзина[i].id === id) {
            корзина[i].кол--;
            if (корзина[i].кол === 0) {
                корзина.splice(i, 1);
            }
            обновить();
            return;
        }
    }
}

function очистить() {
    корзина = [];
    обновить();
}

function настроитьМодалку() {
    let мод = document.getElementById("modal");
    document.getElementById("openCart").onclick = function() { обновить(); мод.style.display = "block"; };
    document.getElementById("closeCart").onclick = function() { мод.style.display = "none"; };
    document.getElementById("clearCart").onclick = function() { очистить(); };
    document.getElementById("orderCart").onclick = function() { заказать(); };
    window.onclick = function(e) { if (e.target === мод) мод.style.display = "none"; };
}

let отзывы = [];

function показатьОтзывы() {
    let список = document.getElementById("reviewsList");
    if (отзывы.length === 0) {
        список.innerHTML = "<div class='emptyReviews'>Пока нет отзывов. Будьте первым!</div>";
        return;
    }
    let html = "";
    for (let i = 0; i < отзывы.length; i++) {
        html += `<div class="reviewItem">
            <div class="reviewName">${отзывы[i].имя}</div>
            <div class="reviewText">${отзывы[i].текст}</div>
            <div class="reviewDate">${отзывы[i].дата}</div>
        </div>`;
    }
    список.innerHTML = html;
}

function добавитьОтзыв() {
    let имя = document.getElementById("reviewName").value;
    let текст = document.getElementById("reviewText").value;
    if (имя === "" || текст === "") return;
    let дата = new Date();
    let датаСтрока = дата.getDate() + "." + (дата.getMonth() + 1) + "." + дата.getFullYear();
    отзывы.unshift({ имя: имя, текст: текст, дата: датаСтрока });
    document.getElementById("reviewName").value = "";
    document.getElementById("reviewText").value = "";
    показатьОтзывы();
}

function настроитьОтзывы() {
    document.getElementById("addReviewBtn").onclick = добавитьОтзыв;
    показатьОтзывы();
}
показатьТовары();
настроитьМодалку();
настроитьОтзывы();