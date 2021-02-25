import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';


@Injectable()
export class WoocommerceProvider {

  WooCommerce: any;
  WooCommerceV2: any;

  constructor() {
    this.WooCommerce = WC({
      url:"http://localhost:8080/test/public_html",
      consumerKey:"ck_5d84df6c2e904eccfe269afc5fb39d5537fdb72d",
      consumerSecret:"cs_cff3efd1e245e54f5e375826455474eefae802ab"
    });
    
    this.WooCommerceV2 = WC({
      url:"http://localhost:8080/test/public_html",
      consumerKey:"ck_5d84df6c2e904eccfe269afc5fb39d5537fdb72d",
      consumerSecret:"cs_cff3efd1e245e54f5e375826455474eefae802ab",
      wpAPI: true,
      version: "wc/v2"
    });
  }


  init(v2?: boolean){
    if(v2 == true){
      return this.WooCommerceV2;
    } else {
      return this.WooCommerce;
    }
  }
}