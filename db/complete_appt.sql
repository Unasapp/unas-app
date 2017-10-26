update
  appointments
set
  tip = $2,
  total = $3,
  product_id = $4,
  qty = $5,
  pay_mth = $6,
  status = $7
where 
    a_id = $1;
update
	products
set
	quantity = (quantity - $5)
where
	p_id = $4

