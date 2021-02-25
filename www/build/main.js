webpackJsonp([0],{

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_details_product_details__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_search__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cart_cart__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_woocommerce__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, toastCtrl, modalCtrl, WP) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.WP = WP;
        this.searchQuery = "";
        this.page = 1;
        this.WooCommerce = WP.init();
        this.loadMoreProducts(null);
        this.WooCommerce.getAsync("products").then(function (data) {
            console.log(JSON.parse(data.body));
            _this.products = JSON.parse(data.body).products;
        }, function (err) {
            console.log(err);
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setInterval(function () {
            if (_this.productSlides.getActiveIndex() == _this.productSlides.length() - 1)
                _this.productSlides.slideTo(0);
            _this.productSlides.slideNext();
        }, 3000);
    };
    HomePage.prototype.loadMoreProducts = function (event) {
        var _this = this;
        console.log(event);
        if (event == null) {
            this.page = 1;
            this.moreProducts = [];
        }
        else
            this.page++;
        this.WooCommerce.getAsync("products?page=" + this.page).then(function (data) {
            console.log(JSON.parse(data.body));
            _this.moreProducts = _this.moreProducts.concat(JSON.parse(data.body).products);
            if (event != null) {
                event.complete();
            }
            if (JSON.parse(data.body).products.length < 10) {
                if (event)
                    event.complete();
                _this.toastCtrl.create({
                    message: "No more products!",
                    duration: 5000
                }).present();
            }
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.openProductPage = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__product_details_product_details__["a" /* ProductDetails */], { "product": product });
    };
    HomePage.prototype.onSearch = function (event) {
        if (this.searchQuery.length > 0) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__search_search__["a" /* Search */], { "searchQuery": this.searchQuery });
        }
    };
    HomePage.prototype.openCart = function () {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__cart_cart__["a" /* Cart */]).present();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('productSlides'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Slides */])
    ], HomePage.prototype, "productSlides", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/yaxinliu/Desktop/MajorProject/src/pages/home/home.html"*/`<ion-header >\n  <ion-navbar  color="danger">\n    <button ion-button menuToggle>\n      <ion-icon color="light" name="menu"></ion-icon>\n    </button>\n    <ion-title *ngIf="!isSearchbarOpened">Home</ion-title>\n    <ion-searchbar *ngIf="isSearchbarOpened" showCancelButton="true" (ionCancel)="isSearchbarOpened=false" [(ngModel)]="searchQuery" (search)="onSearch($event)"></ion-searchbar>\n    <ion-buttons end>\n      <button ion-fab color="danger"  *ngIf="!isSearchbarOpened" (click)="isSearchbarOpened=true">\n        <ion-icon name="search"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-buttons end>\n      <button ion-fab  color="danger" (click)="openCart()">\n        <ion-icon name="cart"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n\n<ion-grid>\n  <ion-row>\n    <ion-slides #productSlides>\n      <ion-slide *ngFor="let product of products">\n        <ion-card no-padding>\n          <img [src]="product.featured_src"/>\n          <h1 padding center>{{ product.title }}</h1>\n          <p center padding [innerHTML]="product.short_description"></p>\n        </ion-card>\n      </ion-slide>\n    </ion-slides>\n  </ion-row>\n</ion-grid>\n \n\n<ion-grid>\n  <ion-item > \n    <ion-row>\n      <ion-col col-6 *ngFor="let product of moreProducts" text-wrap (click)="openProductPage(product)">\n        <ion-card>\n          <img [src]="product.featured_src"/>\n\n        <ion-card-content>\n          <ion-card-title>\n           <h2> {{ product.title }}</h2>\n           <p><span [innerHTML]="product.price_html"></span></p>\n          </ion-card-title>\n        </ion-card-content>\n      </ion-card>\n    \n      </ion-col>\n    </ion-row>\n  </ion-item>\n</ion-grid>\n\n\n<ion-infinite-scroll (ionInfinite)="loadMoreProducts($event)">\n  <ion-infinite-scroll-content></ion-infinite-scroll-content>\n</ion-infinite-scroll>\n</ion-content>\n`/*ion-inline-end:"/Users/yaxinliu/Desktop/MajorProject/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_woocommerce__["a" /* WoocommerceProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductDetails; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__cart_cart__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_woocommerce__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProductDetails = /** @class */ (function () {
    function ProductDetails(navCtrl, navParams, storage, toastCtrl, modalCtrl, WP) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.WP = WP;
        this.reviews = [];
        this.product = this.navParams.get("product");
        console.log(this.product);
        this.WooCommerce = WP.init();
        this.WooCommerce.getAsync('products/' + this.product.id + '/reviews').then(function (data) {
            _this.reviews = JSON.parse(data.body).product_reviews;
            console.log(_this.reviews);
        }, function (err) {
            console.log(err);
        });
    }
    ProductDetails.prototype.addToCart = function (product) {
        var _this = this;
        this.storage.get("cart").then(function (data) {
            if (data == undefined || data.length == 0) {
                data = [];
                data.push({
                    "product": product,
                    "qty": 1,
                    "amount": parseFloat(product.price)
                });
            }
            else {
                var added = 0;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].product.id == product.id) {
                        console.log("Product is already in the cart");
                        var qty = data[i].qty;
                        data[i].qty = qty + 1;
                        data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
                        added = 1;
                    }
                }
                if (added == 0) {
                    data.push({
                        "product": product,
                        "qty": 1,
                        "amount": parseFloat(product.price)
                    });
                }
            }
            _this.storage.set("cart", data).then(function () {
                console.log("Cart Updated");
                console.log(data);
                _this.toastCtrl.create({
                    message: "Cart Updated",
                    duration: 3000
                }).present();
            });
        });
    };
    ProductDetails.prototype.openCart = function () {
        this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__cart_cart__["a" /* Cart */]).present();
    };
    ProductDetails = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-product-details',template:/*ion-inline-start:"/Users/yaxinliu/Desktop/MajorProject/src/pages/product-details/product-details.html"*/`<ion-header>\n  <ion-navbar  color="danger">\n    <ion-title>{{ product.title }}</ion-title>\n    \n    <ion-buttons right top edge (click)="openCart()">\n      <button ion-fab color="danger"><ion-icon name="cart"></ion-icon></button>\n    </ion-buttons>\n    \n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card>\n    <ion-slides autoplay="3000" loop="true">\n      <ion-slide *ngFor="let image of product.images">\n        <img [src]="image.src" />\n      </ion-slide>\n    </ion-slides>\n\n    <ion-card-content>\n      <ion-card-title>\n        {{ product.title }} &nbsp;\n        <ion-chip *ngFor="let category of product.categories" style="margin-left: 5px;">\n          <ion-label color="danger"> {{ category }} </ion-label>\n        </ion-chip>\n      </ion-card-title>\n\n      <p [innerHTML]="product.description"></p>\n \n      <button ion-button icon-left block outline color="danger" (click)="addToCart(product)">\n        <ion-icon name="basket"></ion-icon> Add to Cart for {{product.price}}\n      </button>\n    </ion-card-content>\n  </ion-card>\n\n  <ion-card *ngIf="product.attributes.length > 0">\n    <ion-card-content>\n\n      <ion-card-title>\n        Specifications\n      </ion-card-title>\n\n      <ion-grid>\n        <ion-row *ngFor="let attribute of product.attributes">\n          <ion-col col-4>\n            {{ attribute.name}}\n          </ion-col>\n          <ion-col col-8>\n            <span *ngFor="let option of attribute.options"> {{ option }}</span>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n\n    </ion-card-content>\n  </ion-card>\n\n\n\n  <ion-card *ngIf="reviews.length > 0">\n    <ion-card-content>\n      <ion-card-title>\n        Reviews\n      </ion-card-title>\n\n      <ion-grid>\n        <ion-row *ngFor="let review of reviews">\n          <ion-col col-4>\n            <b>{{ review.reviewer_name }}</b><br/>\n            <span *ngIf="review.rating >= 1">\n            <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n          </span>\n            <span *ngIf="review.rating >= 2">\n            <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n          </span>\n            <span *ngIf="review.rating >= 3">\n            <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n          </span>\n            <span *ngIf="review.rating >= 4">\n            <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n          </span>\n            <span *ngIf="review.rating >= 5">\n            <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n          </span>\n          </ion-col>\n\n          <ion-col col-8>\n            {{ review.review }}\n          </ion-col>\n\n        </ion-row>\n      </ion-grid>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n`/*ion-inline-end:"/Users/yaxinliu/Desktop/MajorProject/src/pages/product-details/product-details.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_woocommerce__["a" /* WoocommerceProvider */]])
    ], ProductDetails);
    return ProductDetails;
}());

//# sourceMappingURL=product-details.js.map

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cart; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__checkout_checkout__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(237);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Cart = /** @class */ (function () {
    function Cart(navCtrl, navParams, storage, viewCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.cartItems = [];
        this.showEmptyCartMessage = false;
        this.total = 0.0;
        this.storage.ready().then(function () {
            _this.storage.get("cart").then(function (data) {
                _this.cartItems = data;
                console.log(_this.cartItems);
                if (_this.cartItems.length > 0) {
                    _this.cartItems.forEach(function (item, index) {
                        _this.total = _this.total + (item.product.price * item.qty);
                    });
                }
                else {
                    _this.showEmptyCartMessage = true;
                }
            });
        });
    }
    Cart.prototype.removeFromCart = function (item, i) {
        var _this = this;
        var price = item.product.price;
        var qty = item.qty;
        this.cartItems.splice(i, 1);
        this.storage.set("cart", this.cartItems).then(function () {
            _this.total = _this.total - (price * qty);
        });
        if (this.cartItems.length == 0) {
            this.showEmptyCartMessage = true;
        }
    };
    Cart.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    Cart.prototype.checkout = function () {
        var _this = this;
        this.storage.get("userLoginInfo").then(function (data) {
            if (data != null) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__checkout_checkout__["a" /* Checkout */]);
            }
            else {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* Login */], { next: __WEBPACK_IMPORTED_MODULE_3__checkout_checkout__["a" /* Checkout */] });
            }
        });
    };
    Cart.prototype.changeQty = function (item, i, change) {
        var _this = this;
        var price;
        if (!item.variation)
            price = item.product.price;
        else
            price = parseFloat(item.variation.price);
        var qty = item.qty;
        if (change < 0 && item.qty == 1) {
            return;
        }
        qty = qty + change;
        item.qty = qty;
        item.amount = qty * price;
        this.cartItems[i] = item;
        this.storage.set("cart", this.cartItems).then(function () {
            _this.toastCtrl.create({
                message: "Cart Updated.",
                duration: 2000,
                showCloseButton: true
            }).present();
        });
        this.total = (parseFloat(this.total.toString()) + (parseFloat(price.toString()) * change));
    };
    Cart = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-cart',template:/*ion-inline-start:"/Users/yaxinliu/Desktop/MajorProject/src/pages/cart/cart.html"*/`<ion-header>\n  <ion-navbar  color="danger">\n    <ion-title>Cart</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-card >\n    <div [hidden]="!showEmptyCartMessage"> \n      <ion-row>\n          <ion-icon class="empty-cart" name="cart"></ion-icon>\n      </ion-row>\n      <h4>Your Cart is empty!</h4>\n    </div>\n  </ion-card>\n\n  <ion-card *ngFor="let item of cartItems; let i = index">\n    <ion-item>\n      <ion-thumbnail item-left>\n        <img [src]="item.product.featured_src" style="width: 60px !important; height: 60px !important;"/>\n      </ion-thumbnail>\n      <h2>{{ item.product.title }}</h2>\n      <p>{{ item.qty }} • {{ item.product.price }}</p>\n      <button ion-button clear item-right color="danger" (click)="removeFromCart(item, i)">\n        <ion-icon name="close-circle"></ion-icon>\n      </button>\n    </ion-item>\n\n    <ion-item class="compact">\n      <ion-row no-padding>\n        <ion-col col-8>\n          <button ion-button icon-only clear color="danger" (click)="changeQty(item, i, -1)">\n            <ion-icon name="remove-circle"></ion-icon>\n          </button>\n          <button ion-button clear color="danger"> {{ item.qty }} </button>\n          <button ion-button icon-only clear color="danger" (click)="changeQty(item, i, 1)">\n            <ion-icon name="add-circle"></ion-icon>\n          </button>\n        </ion-col>\n        <ion-col col-4 style="text-align: right;">\n          <button ion-button small outline (click)="removeFromCart(item, i)" color="danger" style="width: 64px;">Remove</button>\n        </ion-col>\n      </ion-row>\n    </ion-item>\n  </ion-card>\n\n  <ion-card>\n          <ion-row>\n            <ion-col col-2></ion-col>\n            <ion-col col-4><b>TOTAL</b></ion-col>\n            <ion-col col-3></ion-col>\n            <ion-col col-3 style="text-align: right"><b> {{ total }} </b></ion-col>\n          </ion-row>\n  </ion-card>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-grid>\n      <ion-row>\n        <ion-col>\n          <button ion-button color="danger" outline block (click)="closeModal()">Back</button>\n        </ion-col>\n        <ion-col>\n          <button ion-button color="danger" block (click)="checkout()">Checkout</button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-toolbar>\n</ion-footer>\n`/*ion-inline-end:"/Users/yaxinliu/Desktop/MajorProject/src/pages/cart/cart.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]])
    ], Cart);
    return Cart;
}());

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 237:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__signup_signup__ = __webpack_require__(238);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var Login = /** @class */ (function () {
    function Login(navCtrl, navParams, http, toastCtrl, alertCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.username = "";
        this.password = "";
    }
    Login.prototype.login = function () {
        var _this = this;
        this.http.get("http://localhost:8080/test/public_html/api/auth/generate_auth_cookie/?insecure=cool&username=" + this.username + "&password=" + this.password)
            .subscribe(function (res) {
            console.log(res.json());
            var response = res.json();
            if (response.error) {
                _this.toastCtrl.create({
                    message: response.error,
                    duration: 5000
                }).present();
                return;
            }
            _this.storage.set("userLoginInfo", response).then(function (data) {
                _this.alertCtrl.create({
                    title: "Login Successful",
                    message: "You have been logged in successfully.",
                    buttons: [{
                            text: "OK",
                            handler: function () {
                                if (_this.navParams.get("next")) {
                                    _this.navCtrl.push(_this.navParams.get("next"));
                                }
                                else {
                                    _this.navCtrl.pop();
                                }
                            }
                        }]
                }).present();
            });
        });
    };
    Login.prototype.signUp = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__signup_signup__["a" /* Signup */]);
    };
    Login = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/yaxinliu/Desktop/MajorProject/src/pages/login/login.html"*/`<ion-header>\n  <ion-navbar color="danger">\n    <ion-title>Login</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-card >\n    <img src="./assets/imgs/Logo.jpg" />\n  </ion-card>\n\n  <ion-list>\n    <ion-item>\n      <ion-label floating>Username</ion-label>\n      <ion-input type="text" [(ngModel)]="username"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input type="password" [(ngModel)]="password"></ion-input>\n    </ion-item>\n  </ion-list>\n\n  <button ion-button class="login-btn" (click)="login()">Login</button>\n  <button ion-button clear block color="danger" (click)="signUp()">No Account? Sign Up Here</button>\n\n</ion-content>`/*ion-inline-end:"/Users/yaxinliu/Desktop/MajorProject/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], Login);
    return Login;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 238:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Signup; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_woocommerce__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Signup = /** @class */ (function () {
    function Signup(navCtrl, navParams, toastCtrl, alertCtrl, WP) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.WP = WP;
        this.newUser = {};
        this.newUser.billing_address = {};
        this.newUser.shipping_address = {};
        this.billing_shipping_same = false;
        this.WooCommerce = WP.init();
    }
    Signup.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Signup');
    };
    Signup.prototype.setBillingToShipping = function () {
        this.billing_shipping_same = !this.billing_shipping_same;
    };
    Signup.prototype.checkEmail = function () {
        var _this = this;
        var validEmail = false;
        var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg.test(this.newUser.email)) {
            this.WooCommerce.getAsync('customers/email/' + this.newUser.email).then(function (data) {
                var res = (JSON.parse(data.body));
                if (res.errors) {
                    validEmail = true;
                    _this.toastCtrl.create({
                        message: "Congratulations. Valid Email.",
                        duration: 3000
                    }).present();
                }
                else {
                    validEmail = false;
                    _this.toastCtrl.create({
                        message: "Email already registered.",
                        showCloseButton: true
                    }).present();
                }
                console.log(validEmail);
            });
        }
        else {
            validEmail = false;
            this.toastCtrl.create({
                message: "Invalid Email.",
                showCloseButton: true
            }).present();
            console.log(validEmail);
        }
    };
    Signup.prototype.signup = function () {
        var _this = this;
        var customerData = {
            customer: {}
        };
        customerData.customer = {
            "email": this.newUser.email,
            "first_name": this.newUser.first_name,
            "last_name": this.newUser.last_name,
            "username": this.newUser.username,
            "password": this.newUser.password,
            "billing_address": {
                "first_name": this.newUser.first_name,
                "last_name": this.newUser.last_name,
                "address": this.newUser.billing_address.address,
                "postcode": this.newUser.billing_address.postcode,
                "country": this.newUser.billing_address.country,
                "email": this.newUser.email,
                "phone": this.newUser.billing_address.phone
            },
            "shipping_address": {
                "first_name": this.newUser.first_name,
                "last_name": this.newUser.last_name,
                "address": this.newUser.shipping_address.address,
                "postcode": this.newUser.shipping_address.postcode,
                "country": this.newUser.shipping_address.country
            }
        };
        if (this.billing_shipping_same) {
            this.newUser.shipping_address = this.newUser.shipping_address;
        }
        this.WooCommerce.postAsync('customers', customerData).then(function (data) {
            console.log(JSON.parse(data.body));
            var response = (JSON.parse(data.body));
            if (response.customer) {
                _this.alertCtrl.create({
                    title: "Account Created",
                    message: "Your account has been created successfully! Please login.",
                    buttons: [{
                            text: "Login",
                            handler: function () {
                            }
                        }]
                }).present();
            }
            else if (response.errors) {
                _this.toastCtrl.create({
                    message: response.errors[0].message,
                    showCloseButton: true
                }).present();
            }
        });
    };
    Signup = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/Users/yaxinliu/Desktop/MajorProject/src/pages/signup/signup.html"*/`<ion-header>\n  <ion-navbar  color="danger">\n    <ion-title>Sign Up</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-list>\n    <ion-item-divider color="danger">Personal Details</ion-item-divider>\n    <ion-item>\n      <ion-label>First Name</ion-label>\n      <ion-input type="text" [(ngModel)]="newUser.first_name"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Last Name</ion-label>\n      <ion-input type="text" [(ngModel)]="newUser.last_name"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Email</ion-label>\n      <ion-input type="email" [(ngModel)]="newUser.email" (blur)="checkEmail()"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Username</ion-label>\n      <ion-input type="text" [(ngModel)]="newUser.username"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Password</ion-label>\n      <ion-input type="password" [(ngModel)]="newUser.password"></ion-input>\n    </ion-item>\n\n    <ion-item-divider color="danger">Billing Details</ion-item-divider>\n\n    <ion-item>\n      <ion-label>Address</ion-label>\n      <ion-textarea type="text" maxlength="80" [(ngModel)]="newUser.billing_address.address"></ion-textarea>\n    </ion-item>\n    <ion-item>\n      <ion-label>Country</ion-label>\n      <ion-select [(ngModel)]="newUser.billing_address.country">\n        <ion-option value="Singapore" selected="true">Singapore</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Postal Code</ion-label>\n      <ion-input type="number" clearInput [(ngModel)]="newUser.billing_address.postcode"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Phone</ion-label>\n      <ion-input type="tel" clearInput [(ngModel)]="newUser.billing_address.phone"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label>Same Shipping Details</ion-label>\n      <ion-checkbox (ionChange)="setBillingToShipping()"></ion-checkbox>\n    </ion-item>\n\n    <ion-item-divider color="danger" *ngIf="!billing_shipping_same">Shipping Details</ion-item-divider>\n\n    <ion-item *ngIf="!billing_shipping_same">\n      <ion-label>Address Line</ion-label>\n      <ion-textarea type="text" maxlength="80" [(ngModel)]="newUser.shipping_address.address"></ion-textarea>\n    </ion-item>\n    <ion-item *ngIf="!billing_shipping_same">\n      <ion-label>Country</ion-label>\n      <ion-select [(ngModel)]="newUser.shipping_address.country">\n        <ion-option value="Singapore" selected="true">Singapore</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item *ngIf="!billing_shipping_same">\n      <ion-label>Postal Code</ion-label>\n      <ion-input type="number" clearInput [(ngModel)]="newUser.shipping_address.postcode"></ion-input>        \n    </ion-item>\n    <ion-item *ngIf="!billing_shipping_same">\n      <ion-label>Phone</ion-label>\n      <ion-input type="tel" clearInput [(ngModel)]="newUser.shipping_address.phone"></ion-input>        \n    </ion-item>\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n  <button ion-button block color="danger" (click)="signup()">Sign Up</button>\n</ion-footer>\n`/*ion-inline-end:"/Users/yaxinliu/Desktop/MajorProject/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_woocommerce__["a" /* WoocommerceProvider */]])
    ], Signup);
    return Signup;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 272:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 272;

/***/ }),

/***/ 313:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 313;

/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Menu; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cart_cart__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__products_by_category_products_by_category__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_woocommerce__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var Menu = /** @class */ (function () {
    function Menu(navCtrl, navParams, storage, modalCtrl, WP) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.WP = WP;
        this.homePage = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.categories = [];
        this.user = [];
        this.WooCommerce = WP.init();
        this.WooCommerce.getAsync("products/categories").then(function (data) {
            console.log(JSON.parse(data.body).product_categories);
            var temp = JSON.parse(data.body).product_categories;
            for (var i = 0; i < temp.length; i++) {
                if (temp[i].parent == 0) {
                    if (temp[i].slug == "clothing") {
                        temp[i].icon = "shirt-outline";
                    }
                    if (temp[i].slug == "music") {
                        temp[i].icon = "musical-notes-ouline";
                    }
                    if (temp[i].slug == "uncategorized") {
                        temp[i].icon = "apps-outline";
                    }
                    _this.categories.push(temp[i]);
                }
            }
        }, function (err) {
            console.log(err);
        });
    }
    Menu.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.get("userLoginInfo").then(function (userLoginInfo) {
                if (userLoginInfo != null) {
                    console.log("User logged in...");
                    _this.user = userLoginInfo.user;
                    console.log(_this.user);
                    _this.loggedIn = true;
                }
                else {
                    console.log("No user found.");
                    _this.user = {};
                    _this.loggedIn = false;
                }
            });
        });
    };
    Menu.prototype.openCategoryPage = function (category) {
        this.childNavCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_6__products_by_category_products_by_category__["a" /* ProductsByCategory */], { "category": category });
    };
    Menu.prototype.openPage = function (pageName) {
        var _this = this;
        if (pageName == "signup") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* Signup */]);
        }
        if (pageName == "login") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* Login */]);
        }
        if (pageName == 'logout') {
            this.storage.remove("userLoginInfo").then(function () {
                _this.user = {};
                _this.loggedIn = false;
            });
        }
        if (pageName == 'cart') {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__cart_cart__["a" /* Cart */]);
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */])
    ], Menu.prototype, "childNavCtrl", void 0);
    Menu = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-menu',template:/*ion-inline-start:"/Users/yaxinliu/Desktop/MajorProject/src/pages/menu/menu.html"*/`<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar color="danger">\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content class="card-background-page" >\n\n    <ion-card>\n      <img src="./assets/imgs/Logo.jpg"/>\n      <div class="card-title"> WOOSHOP</div>\n    </ion-card>\n\n    <ion-list>\n      <ion-item-divider color="danger">Shop </ion-item-divider>\n      <ion-item *ngFor="let category of categories" text-wrap (click) ="openCategoryPage(category)" menuClose>\n        <ion-icon [name]="category.icon" item-left large></ion-icon>\n        <h2> {{ category.name }}</h2>\n        <p> {{ category.description }} </p>\n      </ion-item>\n\n      <ion-item-divider color="danger">Account</ion-item-divider>\n      <ion-item (click)="openPage(\'signup\')" menuClose *ngIf="!loggedIn" >\n        <ion-icon name="md-clipboard" item-left large></ion-icon>\n        <h2>Sign Up</h2>\n      </ion-item>\n      <ion-item (click)="openPage(\'login\')" menuClose  *ngIf="!loggedIn">\n        <ion-icon name="log-in" item-left large></ion-icon>\n        <h2>Login</h2>\n      </ion-item>\n\n      <ion-item *ngIf="loggedIn" menuClose>\n        <ion-icon name="contact" item-left large></ion-icon>\n        <h2>{{ (this.user.firstname == \'\' ? this.user.username : this.user.firstname) || "" }}</h2>\n      </ion-item>\n      <ion-item *ngIf="loggedIn" (click)="openPage(\'cart\')" menuClose>\n        <ion-icon name="cart" item-left large></ion-icon>\n        <h2>Cart</h2>\n      </ion-item>\n      <ion-item *ngIf="loggedIn" (click)="openPage(\'logout\')" menuClose>\n        <ion-icon name="log-out" item-left large></ion-icon>\n        <h2>Logout</h2>\n      </ion-item>\n    \n      </ion-list>\n  </ion-content>\n\n</ion-menu>\n<ion-nav #content [root]="homePage"></ion-nav>`/*ion-inline-end:"/Users/yaxinliu/Desktop/MajorProject/src/pages/menu/menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_8__providers_woocommerce__["a" /* WoocommerceProvider */]])
    ], Menu);
    return Menu;
}());

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Checkout; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_paypal__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_woocommerce__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var Checkout = /** @class */ (function () {
    function Checkout(navCtrl, navParams, storage, alertCtrl, payPal, WP) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.payPal = payPal;
        this.WP = WP;
        this.newOrder = {};
        this.newOrder.billing_address = {};
        this.newOrder.shipping_address = {};
        this.billing_shipping_same = false;
        this.paymentMethods = [
            { method_id: "bacs", method_title: "Direct Bank Transfer" },
            { method_id: "cheque", method_title: "Cheque Payment" },
            { method_id: "cod", method_title: "Cash on Delivery" },
            { method_id: "paypal", method_title: "PayPal" }
        ];
        this.WooCommerce = WP.init();
        this.storage.get("userLoginInfo").then(function (userLoginInfo) {
            _this.userInfo = userLoginInfo.user;
            var email = userLoginInfo.user.email;
            _this.WooCommerce.getAsync("customers/email/" + email).then(function (data) {
                _this.newOrder = JSON.parse(data.body).customer;
                console.log(_this.newOrder);
            });
        });
    }
    Checkout.prototype.setBillingToShipping = function () {
        this.billing_shipping_same = !this.billing_shipping_same;
        if (this.billing_shipping_same) {
            this.newOrder.shipping_address = this.newOrder.billing_address;
        }
    };
    Checkout.prototype.placeOrder = function () {
        var _this = this;
        var orderItems = [];
        var data = {};
        var paymentData = {};
        this.paymentMethods.forEach(function (element, index) {
            if (element.method_id == _this.paymentMethod) {
                paymentData = element;
            }
        });
        data = {
            payment_method: paymentData.method_id,
            payment_method_title: paymentData.method_title,
            set_paid: true,
            billing_address: this.newOrder.billing_address,
            shipping_address: this.newOrder.shipping_address,
            customer_id: this.userInfo.id || '',
            line_items: orderItems
        };
        if (paymentData.method_id == "paypal") {
            this.payPal.init({
                PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
                PayPalEnvironmentSandbox: 'AVgZEzWzEcdaXm3taNr7iqNTRIi94i0WA8IHzpqpZXIJmP3U6L_2LgEUIS_aIIPfIrtkQl5Tm0J0p1km'
            }).then(function () {
                _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new __WEBPACK_IMPORTED_MODULE_4__ionic_native_paypal__["b" /* PayPalConfiguration */]({})).then(function () {
                    _this.storage.get("cart").then(function (cart) {
                        var total = 0.00;
                        cart.forEach(function (element, index) {
                            if (element.variation) {
                                orderItems.push({ product_id: element.product.id, variation_id: element.variation.id, quantity: element.qty });
                                total = total + (element.variation.price * element.qty);
                            }
                            else {
                                orderItems.push({ product_id: element.product.id, quantity: element.qty });
                                total = total + (element.product.price * element.qty);
                            }
                        });
                        var payment = new __WEBPACK_IMPORTED_MODULE_4__ionic_native_paypal__["c" /* PayPalPayment */](total.toString(), 'USD', 'Description', 'sale');
                        _this.payPal.renderSinglePaymentUI(payment).then(function (response) {
                            alert(JSON.stringify(response));
                            data.line_items = orderItems;
                            var orderData = {};
                            orderData.order = data;
                            _this.WooCommerce.postAsync('orders', orderData.order).then(function (data) {
                                alert("Order placed successfully!");
                                var response = (JSON.parse(data.body));
                                _this.alertCtrl.create({
                                    title: "Order Placed Successfully",
                                    message: "Your order has been placed successfully. Your order number is " + response.order_number,
                                    buttons: [{
                                            text: "OK",
                                            handler: function () {
                                                _this.navCtrl.push('HomePage');
                                            }
                                        }]
                                }).present();
                            });
                        });
                    }, function () {
                    });
                }, function () {
                });
            }, function () {
            });
        }
        else {
            this.storage.get("cart").then(function (cart) {
                cart.forEach(function (element, index) {
                    orderItems.push({
                        product_id: element.product.id,
                        quantity: element.qty
                    });
                });
                data.line_items = orderItems;
                var orderData = {};
                orderData.order = data;
                _this.WooCommerce.postAsync("orders", orderData).then(function (data) {
                    console.log(JSON.parse(data.body).order);
                    var response = (JSON.parse(data.body).order);
                    _this.alertCtrl.create({
                        title: "Order Placed Successfully",
                        message: "Your order has been placed successfully. Your order number is " + response.order_number,
                        buttons: [{
                                text: "OK",
                                handler: function () {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                                }
                            }]
                    }).present();
                });
            });
        }
    };
    Checkout = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-checkout',template:/*ion-inline-start:"/Users/yaxinliu/Desktop/MajorProject/src/pages/checkout/checkout.html"*/`<ion-header>\n  <ion-navbar  color="danger">\n    <ion-title>Checkout</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n    <ion-list>\n      <ion-item-divider color="danger">Personal Details</ion-item-divider>\n      <ion-item>\n        <ion-label>First Name</ion-label>\n        <ion-input type="text" [(ngModel)]="newOrder.billing_address.first_name"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Last Name</ion-label>\n        <ion-input type="text" [(ngModel)]="newOrder.billing_address.last_name"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Email</ion-label>\n        <ion-input readonly type="email" [(ngModel)]="newOrder.email"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Username</ion-label>\n        <ion-input readonly type="text" [(ngModel)]="newOrder.username"></ion-input>\n      </ion-item>\n\n      <ion-item-divider color="danger">Billing Details</ion-item-divider>\n\n      <ion-item>\n        <ion-label>Address</ion-label>\n        <ion-textarea type="text" maxlength="80" [(ngModel)]="newOrder.billing_address.address"></ion-textarea>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Country</ion-label>\n        <ion-select [(ngModel)]="newOrder.billing_address.country">\n          <ion-option value="Singapore" selected="true">Singapore</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Postal Code</ion-label>\n        <ion-input type="number" clearInput [(ngModel)]="newOrder.billing_address.postcode"></ion-input>        \n      </ion-item>\n\n      <ion-item>\n        <ion-label>Phone</ion-label>\n        <ion-input type="tel" clearInput [(ngModel)]="newOrder.billing_address.phone"></ion-input>        \n      </ion-item>\n\n      <ion-item>\n        <ion-label>Same Shipping Details</ion-label>\n        <ion-checkbox (ionChange)="setBillingToShipping()"></ion-checkbox>\n      </ion-item>\n\n      <ion-item-divider color="danger" *ngIf="!billing_shipping_same">Shipping Details</ion-item-divider>\n      \n      <ion-item *ngIf="!billing_shipping_same">\n        <ion-label>First Name</ion-label>\n        <ion-input type="text" [(ngModel)]="newOrder.shipping_address.first_name"></ion-input>\n      </ion-item>\n\n      <ion-item *ngIf="!billing_shipping_same">\n        <ion-label>Last Name</ion-label>\n        <ion-input type="text" [(ngModel)]="newOrder.shipping_address.last_name"></ion-input>\n      </ion-item>\n      \n      <ion-item *ngIf="!billing_shipping_same">\n        <ion-label>Address</ion-label>\n        <ion-textarea type="text" maxlength="80" [(ngModel)]="newOrder.shipping_address.address"></ion-textarea>\n      </ion-item>\n\n      <ion-item *ngIf="!billing_shipping_same">\n        <ion-label>Country</ion-label>\n        <ion-select [(ngModel)]="newOrder.shipping_address.country">\n          <ion-option value="Singapore" selected="true">Singapore</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item *ngIf="!billing_shipping_same">\n        <ion-label>Postal Code</ion-label>\n        <ion-input type="number" clearInput [(ngModel)]="newOrder.shipping_address.postcode"></ion-input>        \n      </ion-item>\n\n      <ion-item *ngIf="!billing_shipping_same">\n        <ion-label>Phone</ion-label>\n        <ion-input type="tel" clearInput [(ngModel)]="newOrder.shipping_address.phone"></ion-input>        \n      </ion-item>\n\n      <ion-item-divider color="danger">Payment Details</ion-item-divider>\n\n      <ion-item>\n        <ion-label>Payment Method</ion-label>\n        <ion-select [(ngModel)]="paymentMethod">\n          <ion-option *ngFor="let p of paymentMethods" value="{{p.method_id}}">{{ p.method_title }}</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-list>\n</ion-content>\n\n<ion-footer>\n  <button ion-button block color="danger" (click)="placeOrder()">Place Order</button>\n</ion-footer>`/*ion-inline-end:"/Users/yaxinliu/Desktop/MajorProject/src/pages/checkout/checkout.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_paypal__["a" /* PayPal */],
            __WEBPACK_IMPORTED_MODULE_5__providers_woocommerce__["a" /* WoocommerceProvider */]])
    ], Checkout);
    return Checkout;
}());

//# sourceMappingURL=checkout.js.map

/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Search; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_details_product_details__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_woocommerce__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var Search = /** @class */ (function () {
    function Search(navCtrl, navParams, toastCtrl, WP) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.WP = WP;
        this.searchQuery = "";
        this.products = [];
        this.page = 2;
        console.log(this.navParams.get("searchQuery"));
        this.searchQuery = this.navParams.get("searchQuery");
        this.WooCommerce = WP.init();
        this.WooCommerce.getAsync("products?filter[q]=" + this.searchQuery).then(function (searchData) {
            _this.products = JSON.parse(searchData.body).products;
        });
    }
    Search.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad Search');
    };
    Search.prototype.loadMoreProducts = function (event) {
        var _this = this;
        this.WooCommerce.getAsync("products?filter[q]=" + this.searchQuery + "&page=" + this.page).then(function (searchData) {
            _this.products = _this.products.concat(JSON.parse(searchData.body).products);
            if (JSON.parse(searchData.body).products.length < 10) {
                event.enable(false);
                _this.toastCtrl.create({
                    message: "No more products!",
                    duration: 5000
                }).present();
            }
            event.complete();
            _this.page++;
        });
    };
    Search.prototype.openProductPage = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__product_details_product_details__["a" /* ProductDetails */], { "product": product });
    };
    Search = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"/Users/yaxinliu/Desktop/MajorProject/src/pages/search/search.html"*/`<ion-header>\n  <ion-navbar  color="danger">\n    <ion-title>search: {{ searchQuery }}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item *ngFor="let product of products" text-wrap  (click)="openProductPage(product)">\n      <ion-thumbnail item-left>\n        <img [src]="product.featured_src" />\n      </ion-thumbnail>\n      <h2> {{ product.title }} </h2>\n      <p>\n        <span [innerHTML]="product.short_description.substr(0, 50) + \'...\'"></span>\n        <span [innerHTML]="product.price_html"></span>\n        <span *ngIf="product.average_rating >= 1">\n          <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n        </span>\n        <span *ngIf="product.average_rating >= 2">\n          <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n        </span>\n        <span *ngIf="product.average_rating >= 3">\n          <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n        </span>\n        <span *ngIf="product.average_rating >= 4">\n          <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n        </span>\n        <span *ngIf="product.average_rating >= 5">\n          <ion-icon style="color: #d4af37" small name="star"></ion-icon>\n        </span>\n      </p>\n\n      <button ion-button icon clear item-right>\n        <ion-icon name="arrow-forward"></ion-icon>\n      </button>\n    </ion-item>\n  </ion-list>\n\n   <ion-infinite-scroll (ionInfinite)="loadMoreProducts($event)">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n  \n</ion-content>`/*ion-inline-end:"/Users/yaxinliu/Desktop/MajorProject/src/pages/search/search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_woocommerce__["a" /* WoocommerceProvider */]])
    ], Search);
    return Search;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductsByCategory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__product_details_product_details__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_woocommerce__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(130);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ProductsByCategory = /** @class */ (function () {
    function ProductsByCategory(navCtrl, navParams, WP) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.WP = WP;
        this.page = 1;
        this.category = this.navParams.get("category");
        this.WooCommerce = WP.init();
        this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug).then(function (data) {
            console.log(JSON.parse(data.body));
            _this.products = JSON.parse(data.body).products;
        }, function (err) {
            console.log(err);
        });
    }
    ProductsByCategory.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProductsByCategory');
    };
    ProductsByCategory.prototype.loadMoreProducts = function (event) {
        var _this = this;
        this.page++;
        console.log("Getting page " + this.page);
        this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" + this.page).then(function (data) {
            var temp = (JSON.parse(data.body).products);
            _this.products = _this.products.concat(JSON.parse(data.body).products);
            console.log(_this.products);
            event.complete();
            if (temp.length < 10)
                event.enable(false);
        });
    };
    ProductsByCategory.prototype.openProductPage = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__product_details_product_details__["a" /* ProductDetails */], { "product": product });
    };
    ProductsByCategory.prototype.goBack = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    ProductsByCategory = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-products-by-category',template:/*ion-inline-start:"/Users/yaxinliu/Desktop/MajorProject/src/pages/products-by-category/products-by-category.html"*/`<ion-header>\n  <ion-navbar  color="danger">\n    <button ion-button menuToggle>\n      <ion-icon color="light" name="menu"></ion-icon>\n    </button>\n\n    <ion-title>Products By category</ion-title>\n\n    <ion-buttons end>\n      <button ion-fab color="danger" (click)=goBack()>\n        <ion-icon name="arrow-back"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-list>\n    <ion-item *ngFor="let product of products" text-wrap (click)="openProductPage(product)">\n      <ion-thumbnail item-left>\n        <img [src]="product.featured_src"/>\n      </ion-thumbnail>\n\n      <h2> {{ product.title }}</h2>\n  \n      <p>\n        <span [innerHTML]="product.short_description.substr(0, 50) + \'...\'"></span>\n        <span [innerHTML]="product.price_html"></span>\n      </p>\n  \n      <button ion-button icon clear item-right>\n        <ion-icon name="arrow-forward"></ion-icon>\n      </button>\n  \n    </ion-item>\n  </ion-list>\n  <ion-infinite-scroll (ionInfinite)="loadMoreProducts($event)">\n    <ion-infinite-scroll-content></ion-infinite-scroll-content>\n  </ion-infinite-scroll>\n\n</ion-content>\n`/*ion-inline-end:"/Users/yaxinliu/Desktop/MajorProject/src/pages/products-by-category/products-by-category.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_woocommerce__["a" /* WoocommerceProvider */]])
    ], ProductsByCategory);
    return ProductsByCategory;
}());

//# sourceMappingURL=products-by-category.js.map

/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(547);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(590);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_menu_menu__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_products_by_category_products_by_category__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_product_details_product_details__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_checkout_checkout__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_search_search__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__angular_http__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_paypal__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_storage__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_woocommerce__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_menu_menu__["a" /* Menu */],
                __WEBPACK_IMPORTED_MODULE_6__pages_products_by_category_products_by_category__["a" /* ProductsByCategory */],
                __WEBPACK_IMPORTED_MODULE_7__pages_product_details_product_details__["a" /* ProductDetails */],
                __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__["a" /* Cart */],
                __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__["a" /* Signup */],
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* Login */],
                __WEBPACK_IMPORTED_MODULE_11__pages_checkout_checkout__["a" /* Checkout */],
                __WEBPACK_IMPORTED_MODULE_12__pages_search_search__["a" /* Search */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_15__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_17__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_menu_menu__["a" /* Menu */],
                __WEBPACK_IMPORTED_MODULE_6__pages_products_by_category_products_by_category__["a" /* ProductsByCategory */],
                __WEBPACK_IMPORTED_MODULE_7__pages_product_details_product_details__["a" /* ProductDetails */],
                __WEBPACK_IMPORTED_MODULE_8__pages_cart_cart__["a" /* Cart */],
                __WEBPACK_IMPORTED_MODULE_9__pages_signup_signup__["a" /* Signup */],
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login__["a" /* Login */],
                __WEBPACK_IMPORTED_MODULE_11__pages_checkout_checkout__["a" /* Checkout */],
                __WEBPACK_IMPORTED_MODULE_12__pages_search_search__["a" /* Search */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_paypal__["a" /* PayPal */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_18__providers_woocommerce__["a" /* WoocommerceProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 590:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_menu_menu__ = __webpack_require__(356);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_menu_menu__["a" /* Menu */];
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/yaxinliu/Desktop/MajorProject/src/app/app.html"*/`\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>`/*ion-inline-end:"/Users/yaxinliu/Desktop/MajorProject/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WoocommerceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_woocommerce_api__ = __webpack_require__(601);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_woocommerce_api___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_woocommerce_api__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WoocommerceProvider = /** @class */ (function () {
    function WoocommerceProvider() {
        this.WooCommerce = __WEBPACK_IMPORTED_MODULE_1_woocommerce_api__({
            url: "http://localhost:8080/test/public_html",
            consumerKey: "ck_5d84df6c2e904eccfe269afc5fb39d5537fdb72d",
            consumerSecret: "cs_cff3efd1e245e54f5e375826455474eefae802ab"
        });
        this.WooCommerceV2 = __WEBPACK_IMPORTED_MODULE_1_woocommerce_api__({
            url: "http://localhost:8080/test/public_html",
            consumerKey: "ck_5d84df6c2e904eccfe269afc5fb39d5537fdb72d",
            consumerSecret: "cs_cff3efd1e245e54f5e375826455474eefae802ab",
            wpAPI: true,
            version: "wc/v2"
        });
    }
    WoocommerceProvider.prototype.init = function (v2) {
        if (v2 == true) {
            return this.WooCommerceV2;
        }
        else {
            return this.WooCommerce;
        }
    };
    WoocommerceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], WoocommerceProvider);
    return WoocommerceProvider;
}());

//# sourceMappingURL=woocommerce.js.map

/***/ }),

/***/ 616:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 618:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 648:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 649:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 715:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[428]);
//# sourceMappingURL=main.js.map