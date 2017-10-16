insert into barbers (b_first, b_last, b_email, password, color, b_phone, shop, rate, type)
  values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
returning *
