let obj=JSON.parse($response.body.replace(/\"vipOnly\":\w+/g,'"vipOnly":false').replace(/\"iOS\":\w+/g,'"iOS":true').replace(/\"Android\":\w+/g,'"Android":true'));let requestUrl=$request.url;if(/^https:\/\/cdn-bm\.camera360\.com\/api\/mix\/recovery?/.test(requestUrl)){obj.data.errorCode=0;obj.data.orderList=[{product_id:"com.vstudio.MIX.subscription.auto.year",quantity:"1",transaction_id:"666666666666666",original_transaction_id:"666666666666666",web_order_line_item_id:"666666666666666",in_app_ownership_type:"PURCHASED",is_in_intro_offer_period:"false",is_trial_period:"false",expires_date:"2222-02-02 02:02:02 Etc/GMT",expires_date_pst:"2222-02-02 02:02:02 America/Los_Angeles",expires_date_ms:"7955085722000",original_purchase_date_ms:"1692026680000",purchase_date_ms:"1697699768000",},];obj.data.autoBindingUserId="1111111111";obj.data.pendingRenewalInfo=[{product_id:"com.vstudio.MIX.subscription.auto.year",original_transaction_id:"666666666666666",auto_renew_product_id:"com.vstudio.MIX.subscription.auto.year",auto_renew_status:"1",},]}else if(/^https:\/\/cdn-bm\.camera360\.com\/api\/iap\/check-receipt?/.test(requestUrl)){obj.data.purchaseTime=1692026680;obj.data.giftVip=0;obj.data.isTrialPeriod=0;obj.data.originalTransactionId="666666666666666";obj.data.appleExpireTime=7955085722;obj.data.productId="vip_yearly";obj.data.appleVip=1;obj.data.expireTime=7955085722;obj.data.errorCode=0;obj.data.operationVip=1;obj.data.sandbox=0;}$done({body:JSON.stringify(obj)});