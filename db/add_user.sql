insert into users (first_name, last_name, email, password, type, shop_id)
  values ($1, $2, $3, $4, $5, 1)
returning *
