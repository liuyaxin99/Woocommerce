import { Component } from '@angular/core';
import {NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as WC from 'woocommerce-api';
import { HomePage } from '../home/home';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import{ WoocommerceProvider } from '../../providers/woocommerce'


@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class Checkout {

  WooCommerce: any;
  newOrder: any;
  paymentMethods: any[];
  paymentMethod: any;
  billing_shipping_same: boolean;
  userInfo: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage, 
    public alertCtrl: AlertController, 
    public payPal: PayPal,
    private WP: WoocommerceProvider) {

    this.newOrder = {};
    this.newOrder.billing_address = {};
    this.newOrder.shipping_address = {};
    this.billing_shipping_same = false;

    this.paymentMethods = [
      { method_id: "bacs", method_title: "Direct Bank Transfer" },
      { method_id: "cheque", method_title: "Cheque Payment" },
      { method_id: "cod", method_title: "Cash on Delivery" },
      { method_id: "paypal", method_title: "PayPal" }];

      this.WooCommerce = WP.init();

      this.storage.get("userLoginInfo").then((userLoginInfo) => {

        this.userInfo = userLoginInfo.user;

        let email = userLoginInfo.user.email;
  
        this.WooCommerce.getAsync("customers/email/"+email).then((data) => {
  
          this.newOrder = JSON.parse(data.body).customer;
          console.log(this.newOrder);
        })
      })
  }

  setBillingToShipping() {
    this.billing_shipping_same = !this.billing_shipping_same;

    if (this.billing_shipping_same) {
      this.newOrder.shipping_address = this.newOrder.billing_address;
    }
  }


  placeOrder() {

    let orderItems: any[] = [];
    let data: any = {};

    let paymentData: any = {};

    this.paymentMethods.forEach((element, index) => {
      if (element.method_id == this.paymentMethod) {
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
      }).then(() => {
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        })).then(() => {

          this.storage.get("cart").then((cart) => {

            let total = 0.00;
            cart.forEach((element, index) => {

              if(element.variation){
                orderItems.push({ product_id: element.product.id, variation_id: element.variation.id, quantity: element.qty });
                total = total + (element.variation.price * element.qty);
              } else {
                orderItems.push({ product_id: element.product.id, quantity: element.qty });
                total = total + (element.product.price * element.qty);
              }
            });

          let payment = new PayPalPayment(total.toString(), 'USD', 'Description', 'sale');
          this.payPal.renderSinglePaymentUI(payment).then((response) => {
            alert(JSON.stringify(response));


            data.line_items = orderItems;
            let orderData: any = {};

            orderData.order = data;

            this.WooCommerce.postAsync('orders', orderData.order).then((data) => {
              alert("Order placed successfully!");

              let response = (JSON.parse(data.body));

              this.alertCtrl.create({
                title: "Order Placed Successfully",
                message: "Your order has been placed successfully. Your order number is " + response.order_number,
                buttons: [{
                  text: "OK",
                  handler: () => {
                    this.navCtrl.push('HomePage');
                  }
                }]
              }).present();
            })

          })
      
          }, () => {
          });
        }, () => {
        });
      }, () => {
      });


    } else{
      this.storage.get("cart").then((cart) => {
        cart.forEach((element, index) => {
          orderItems.push({
            product_id: element.product.id,
            quantity:element.qty
          });
        });

        data.line_items = orderItems;

        let orderData: any = {};

        orderData.order = data;

        this.WooCommerce.postAsync("orders", orderData).then((data) => {

        console.log(JSON.parse(data.body).order);

         let response = (JSON.parse(data.body).order);

         this.alertCtrl.create({
           title:"Order Placed Successfully",
           message:"Your order has been placed successfully. Your order number is " + response.order_number,
           buttons:[{
             text:"OK",
             handler:() => {
               this.navCtrl.setRoot(HomePage);
             }
           }]
         }).present();
        })

      })
    }
  }
}
