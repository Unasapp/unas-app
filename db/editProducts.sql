update products
  set
    product = $1,
    price = $2,
    type = $3,
    quantity = $4
  where
    p_id = $5
  and 
    shop_id = $6
